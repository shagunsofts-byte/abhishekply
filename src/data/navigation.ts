import { SITE_CONFIG } from './siteConfig';

export type MegaMenuCategory = {
  id: string;
  title: string;
  subItems: { label: string; href: string }[];
  hoverImage: string;
};

export type MenuItem = {
  title: string;
  href: string;
  type: 'link' | 'mega';
  columns?: MegaMenuCategory[];
};

export const NAVIGATION_DATA: MenuItem[] = [
  {
    title: "Home",
    href: "/",
    type: "link"
  },
  {
    title: "Products",
    href: "/products",
    type: "mega",
    columns: [
      {
        id: 'plywood',
        title: 'Plywood',
        subItems: [
          { label: 'Marine Plywood', href: '/products/plywood/marine-plywood' },
          { label: 'BWP Grade', href: '/products/plywood/bwp-grade' },
          { label: 'BWR Grade', href: '/products/plywood/bwr-grade' },
          { label: 'MR Grade', href: '/products/plywood/mr-grade' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1572186789495-2c8ee0134468?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'laminates',
        title: 'Laminates',
        subItems: [
          { label: 'High Gloss Finish', href: '/products/laminates/high-gloss' },
          { label: 'Matte Finish', href: '/products/laminates/matte' },
          { label: 'Wooden Texture', href: '/products/laminates/woodgrains' },
          { label: 'Acrylic', href: '/products/laminates/acrylic' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'doors',
        title: 'Doors',
        subItems: [
          { label: 'Flush Doors', href: '/products/doors/flush-doors' },
          { label: 'WPC Doors', href: '/products/doors/wpc-doors' },
          { label: 'Veneer Doors', href: '/products/doors/veneer-doors' },
          { label: 'Laminate Doors', href: '/products/doors/laminate-doors' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'hardware',
        title: 'Hardware',
        subItems: [
          { label: 'Door Handles', href: '/products/hardware/door-handles' },
          { label: 'Locks', href: '/products/hardware/locks' },
          { label: 'Door Fittings', href: '/products/hardware/door-fittings' },
          { label: 'Kitchen Hardware', href: '/products/hardware/kitchen-hardware' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: "Interiors",
    href: "/products/interiors",
    type: "mega",
    columns: [
      {
        id: 'interiors',
        title: 'Interiors',
        subItems: [
          { label: 'Modular Kitchens', href: '/products/interiors/modular-kitchen' },
          { label: 'Wardrobes', href: '/products/interiors/wardrobes' },
          { label: 'Bedrooms', href: '/products/interiors/bedrooms' },
          { label: 'TV Units', href: '/products/interiors/living-room' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: "About",
    href: "/about",
    type: "mega",
    columns: [
      {
        id: 'about-us',
        title: 'About Us',
        subItems: [
          { label: 'Our Story', href: '/about' },
          { label: 'Contact Us', href: '#contact' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
];
