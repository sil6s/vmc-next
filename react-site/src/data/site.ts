export const site = {
  name: "Veterinary Medical Center",
  shortName: "VMC",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nky.vet",
  tagline: "Fort Thomas & Independence, Kentucky",
  legal: "Fear-Free Certified. Licensed in KY and OH.",
  email: "information@nky.vet",
  portalExternalUrl: "https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2",
  pharmacyExternalUrl: "https://nky-vet.ourvet.com/pet/",
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
  return new URL(path, site.siteUrl).toString();
}
