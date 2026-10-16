import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isLocale, isLocalizedStaticPath, isPublicLocalePath } from "@/lib/i18n";
import { retiredBlogRedirects } from "@/data/blogRedirects";

export async function proxy(request: NextRequest) {
  // Retired blog posts (October 2026): permanent redirect to the closest new article, guide, or service page.
  const retired = request.nextUrl.pathname.match(/^\/(?:resources|blog)\/([a-z0-9-]+)\/?$/);
  if (retired && retiredBlogRedirects[retired[1]]) {
    return NextResponse.redirect(new URL(retiredBlogRedirects[retired[1]], request.url), 308);
  }

  const requestHeaders = new Headers(request.headers);
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const requestedLocale = segments[0];
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const remainingSegments = segments.slice(1);
  const unprefixedPath =
    locale === "en"
      ? request.nextUrl.pathname
      : remainingSegments.length
        ? `/${remainingSegments.join("/")}${request.nextUrl.pathname.endsWith("/") ? "/" : ""}`
        : "/";
  const shouldRewrite = locale !== "en" && isPublicLocalePath(unprefixedPath || "/");

  requestHeaders.set("x-vmc-locale", locale);
  requestHeaders.set("x-vmc-pathname", unprefixedPath || "/");
  requestHeaders.set("x-vmc-page-translated", isLocalizedStaticPath(unprefixedPath || "/") ? "true" : "false");

  const nextUrl = shouldRewrite ? request.nextUrl.clone() : undefined;
  if (nextUrl) {
    nextUrl.pathname = unprefixedPath || "/";
  }

  let supabaseResponse = nextUrl
    ? NextResponse.rewrite(nextUrl, { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = nextUrl
            ? NextResponse.rewrite(nextUrl, { request: { headers: requestHeaders } })
            : NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // Refresh session — do not remove this
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
