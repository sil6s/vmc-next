export const site = {
  name: "Veterinary Medical Center",
  shortName: "VMC",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vmcnky.com",
  tagline: "Fort Thomas & Independence, Kentucky",
  legal: "Fear-Free Certified. Licensed in KY and OH.",
  email: "information@nky.vet",
  portalExternalUrl: "https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2",
  pharmacyExternalUrl: "https://nky-vet.ourvet.com/",
  googleTagManagerId: "GTM-K9VSFT44",
  socialImage: "/images/vmc-social-media.jpg",
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
      mapUrl: "https://www.google.com/maps/search/?api=1&query=2000%20Memorial%20Parkway%20Fort%20Thomas%20KY%2041075"
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
      mapUrl: "https://www.google.com/maps/search/?api=1&query=4147%20Madison%20Pike%20Independence%20KY%2041051"
    }
  ]
} as const;

export type SiteLocation = (typeof site.locations)[number];

export function absoluteUrl(path = "/") {
  return new URL(path, site.siteUrl).toString();
}
