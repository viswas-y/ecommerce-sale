export interface BrandConfig {
  name: string;
  tagline: string;
  logoText: string;
  announcementBar: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  hours: string;
  socials: {
    instagram: string;
    pinterest: string;
    twitter: string;
    facebook: string;
  };
}

export const brand: BrandConfig = {
  name: "NOVARA",
  tagline: "Designed for what matters.",
  logoText: "NOVARA",
  announcementBar: "Free shipping on orders over $100 • Easy 30-day returns",
  contactEmail: "hello@novaradesign.com",
  contactPhone: "+1 (800) 555-0199",
  contactAddress: "720 Editorial Ave, Suite 100, New York, NY 10001",
  hours: "Monday – Friday: 9am – 6pm EST",
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com"
  }
};
