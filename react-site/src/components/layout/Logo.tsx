import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "", href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={`logo ${className}`} aria-label="Veterinary Medical Centers home">
      <Image
        className="logo-image"
        src="/images/vmc-logo-refined.svg"
        alt=""
        width={300}
        height={100}
        priority
      />
    </Link>
  );
}
