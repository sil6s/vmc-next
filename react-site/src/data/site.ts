export const canonicalSiteUrl = "https://nky.vet";

function normalizedPublicUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname === "www.nky.vet") {
      url.hostname = "nky.vet";
    }
    if (url.hostname === "nky.vet") {
      url.protocol = "https:";
      url.hash = "";
      return url.toString().replace(/\/$/, "");
    }
    if (url.hostname.endsWith(".vercel.app") || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return canonicalSiteUrl;
    }
  } catch {
    return canonicalSiteUrl;
  }

  return canonicalSiteUrl;
}

export function publicUrl(path = "/") {
  const url = new URL(path, canonicalSiteUrl);
  return url.toString();
}

export function canonicalUrl(value = "/") {
  try {
    const url = new URL(value, canonicalSiteUrl);
    if (url.hostname === "www.nky.vet") {
      url.hostname = "nky.vet";
    }
    if (url.hostname.endsWith(".vercel.app") || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return publicUrl(`${url.pathname}${url.search}`);
    }
    if (url.hostname === "nky.vet") {
      url.protocol = "https:";
    }
    return url.toString();
  } catch {
    return publicUrl("/");
  }
}

export const site = {
  name: "Veterinary Medical Centers",
  shortName: "VMC",
  siteUrl: normalizedPublicUrl(process.env.NEXT_PUBLIC_SITE_URL || canonicalSiteUrl),
  tagline: "Fort Thomas & Independence, Kentucky",
  legal: "Fear-Free Certified. Licensed in KY and OH.",
  email: "information@nky.vet",
  portalExternalUrl: "/patient-portal-online-booking/",
  pharmacyExternalUrl: "https://nky-vet.ourvet.com/pet/",
  googleTagManagerId: "GTM-K9VSFT44",
  socialImage: "/images/vmc-social-media.jpg",
  sameAs: [
    "https://www.facebook.com/vetmedicalcenters/",
    "https://www.instagram.com/veterinarymedicalcenters/",
    "https://share.google/GeJuAWRtZTyn3SR1E",
    "https://share.google/Rl2PewRXhXu44c9Ny"
  ],
  locations: [
    {
      id: "fort-thomas",
      name: "Fort Thomas",
      address: "2000 Memorial Parkway, Fort Thomas, KY 41075",
      street: "2000 Memorial Parkway",
      city: "Fort Thomas",
      state: "KY",
      zip: "41075",
      phone: "(859) 442-4420",
      tel: "+18594424420",
      hours: ["Monday-Friday: 8:00 AM-6:00 PM", "Saturday: rotating, call ahead", "Sunday: closed"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=2000%20Memorial%20Parkway%20Fort%20Thomas%20KY%2041075",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.1521619508326!2d-84.451514!3d39.09150229999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841b1a7e3329491%3A0x119f88cd62b7876a!2sVeterinary%20Medical%20Center%20of%20Fort%20Thomas!5e1!3m2!1sen!2sus!4v1778540199005!5m2!1sen!2sus"
    },
    {
      id: "independence",
      name: "Independence",
      address: "4147 Madison Pike, Independence, KY 41051",
      street: "4147 Madison Pike",
      city: "Independence",
      state: "KY",
      zip: "41051",
      phone: "(859) 356-2242",
      tel: "+18593562242",
      hours: ["Monday-Friday: 8:00 AM-6:00 PM", "Saturday: closed", "Sunday: closed"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=4147%20Madison%20Pike%20Independence%20KY%2041051",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.3055732336893!2d-84.53607532350952!3d38.992127371703965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841b99b3991ff85%3A0xf082d1850fda3d80!2sVeterinary%20Medical%20Center%20of%20Independence!5e1!3m2!1sen!2sus!4v1778540210538!5m2!1sen!2sus"
    }
  ]
} as const;

export type SiteLocation = (typeof site.locations)[number];

export function absoluteUrl(path = "/") {
  return canonicalUrl(path);
}
