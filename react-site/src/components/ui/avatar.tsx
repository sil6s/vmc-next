import Image from "next/image";
import * as React from "react";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  size?: number;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "", size = 56, ...props }, ref) => (
    <div ref={ref} className={cn("ui-avatar", className)} style={{ width: size, height: size }} {...props}>
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} />
      ) : (
        <UserRound aria-hidden="true" size={Math.max(22, Math.round(size * 0.42))} />
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

export { Avatar };
