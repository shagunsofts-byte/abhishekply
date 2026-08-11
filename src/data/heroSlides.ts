import { SITE_CONFIG } from "./siteConfig";
export interface HeroSlide {
  id: number;
  title: string;
  highlightKeyword: string;
  subtitle: string;
  type: "image" | "video";
  desktopImage?: string;
  mobileImage?: string;
  video?: string;
  poster?: string;
  primaryButton: string;
  secondaryButton: string;
  primaryLink: string;
  secondaryLink: string;
}
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Plywood\nFor Timeless Interiors.",
    highlightKeyword: "Premium Plywood",
    subtitle: "Discover premium plywood crafted for strength, elegance and long-lasting performance.",
    type: "video",
    video: "https://res.cloudinary.com/dmvd2eacs/video/upload/q_auto,f_auto/v1785738264/Cream_Brown_Reminder_Minimalist_Interior_Design_Video_lnrwvo.mp4",
    poster: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_57_AM_2_x8mq7x.png",
    primaryButton: "Explore Plywood",
    secondaryButton: "Get Quote",
    primaryLink: "/products/plywood",
    secondaryLink: `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I would like to get a quote.`
  },
  {
    id: 2,
    title: "Modern Modular Kitchens\nDesigned For Everyday Luxury.",
    highlightKeyword: "Modern Kitchens",
    subtitle: "Premium materials and flawless finishes for beautiful kitchens.",
    type: "image",
    desktopImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_57_AM_2_x8mq7x.png",
    mobileImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_57_AM_2_x8mq7x.png",
    primaryButton: "Explore Kitchens",
    secondaryButton: "Book Consultation",
    primaryLink: "/products/interiors",
    secondaryLink: `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I would like to get a quote.`
  },
  {
    id: 3,
    title: "Premium Doors &\nArchitectural Hardware.",
    highlightKeyword: "Luxury Doors",
    subtitle: "Elegant doors, premium locks, handles and fittings for modern homes.",
    type: "image",
    desktopImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_57_AM_1_jy35dt.png",
    mobileImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_57_AM_1_jy35dt.png",
    primaryButton: "Explore Hardware",
    secondaryButton: "Visit Showroom",
    primaryLink: "/products/hardware",
    secondaryLink: `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I would like to get a quote.`
  },
  {
    id: 4,
    title: "Everything Your\nDream Interior Needs.",
    highlightKeyword: "Interior Solutions",
    subtitle: "From plywood to premium hardware —\neverything under one roof.",
    type: "image",
    desktopImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_48_AM_zsfqv1.png",
    mobileImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738256/ChatGPT_Image_Aug_3_2026_11_51_48_AM_zsfqv1.png",
    primaryButton: "View Products",
    secondaryButton: "Contact Us",
    primaryLink: "/products",
    secondaryLink: `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I would like to get a quote.`
  },
  {
    id: 5,
    title: "Elevate Your Living\nWith Timeless Elegance.",
    highlightKeyword: "Timeless Elegance",
    subtitle: "Explore our curated collection of premium veneers and laminates.",
    type: "image",
    desktopImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738255/ChatGPT_Image_Aug_3_2026_11_51_51_AM_paboii.png",
    mobileImage: "https://res.cloudinary.com/dmvd2eacs/image/upload/q_auto,f_auto/v1785738255/ChatGPT_Image_Aug_3_2026_11_51_51_AM_paboii.png",
    primaryButton: "View Collection",
    secondaryButton: "Get Quote",
    primaryLink: "/products/veneers",
    secondaryLink: `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi, I would like to get a quote.`
  }
];
