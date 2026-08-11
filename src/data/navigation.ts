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
          { label: 'BWP Grade Plywood', href: '/products/plywood?type=bwp' },
          { label: 'BWR Grade Plywood', href: '/products/plywood?type=bwr' },
          { label: 'MR Grade Plywood', href: '/products/plywood?type=mr' },
          { label: 'Fire Retardant', href: '/products/plywood?type=fr' },
          { label: 'Calibrated Plywood', href: '/products/plywood?type=calibrated' },
          { label: 'Marine Plywood', href: '/products/plywood?type=marine' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1572186789495-2c8ee0134468?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'laminates',
        title: 'Laminates',
        subItems: [
          { label: 'High Gloss', href: '/products/laminates?type=high-gloss' },
          { label: 'Suede Finish', href: '/products/laminates?type=suede' },
          { label: 'Textured', href: '/products/laminates?type=textured' },
          { label: 'Woodgrains', href: '/products/laminates?type=woodgrains' },
          { label: 'Solid Colors', href: '/products/laminates?type=solid' },
          { label: 'Anti-Bacterial', href: '/products/laminates?type=antibacterial' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'veneers',
        title: 'Veneers',
        subItems: [
          { label: 'Natural Veneers', href: '/products/veneers?type=natural' },
          { label: 'Recon Veneers', href: '/products/veneers?type=recon' },
          { label: 'Teak Wood', href: '/products/veneers?type=teak' },
          { label: 'Smoked Veneers', href: '/products/veneers?type=smoked' },
          { label: 'Dyed Veneers', href: '/products/veneers?type=dyed' },
          { label: 'Metallic', href: '/products/veneers?type=metallic' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'doors',
        title: 'Doors',
        subItems: [
          { label: 'Flush Doors', href: '/products/doors?type=flush' },
          { label: 'Panel Doors', href: '/products/doors?type=panel' },
          { label: 'Veneered Doors', href: '/products/doors?type=veneered' },
          { label: 'Laminated Doors', href: '/products/doors?type=laminated' },
          { label: 'Fire Resistant Doors', href: '/products/doors?type=fire' },
          { label: 'Custom Doors', href: '/products/doors?type=custom' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1558025211-536412e87311?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'hardware',
        title: 'Hardware',
        subItems: [
          { label: 'Door Handles', href: '/products/hardware?type=handles' },
          { label: 'Hinges & Channels', href: '/products/hardware?type=hinges' },
          { label: 'Locks & Security', href: '/products/hardware?type=locks' },
          { label: 'Kitchen Hardware', href: '/products/hardware?type=kitchen' },
          { label: 'Wardrobe Fittings', href: '/products/hardware?type=wardrobe' },
          { label: 'Glass Fittings', href: '/products/hardware?type=glass' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'more',
        title: 'More',
        subItems: [
          { label: 'MDF Boards', href: '/products/interiors?type=mdf' },
          { label: 'Particle Boards', href: '/products/interiors?type=particle' },
          { label: 'Edge Banding', href: '/products/interiors?type=edge' },
          { label: 'Adhesives', href: '/products/interiors?type=adhesives' },
          { label: 'Acrylic Sheets', href: '/products/interiors?type=acrylic' },
          { label: 'Louvers', href: '/products/interiors?type=louvers' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: "Brands",
    href: "/products",
    type: "mega",
    columns: [
      {
        id: 'century',
        title: 'CenturyPly',
        subItems: [
          { label: 'Club Prime', href: '/products?brand=century&series=club-prime' },
          { label: 'Sainik 710', href: '/products?brand=century&series=sainik' },
          { label: 'Architect Ply', href: '/products?brand=century&series=architect' },
          { label: 'Century Doors', href: '/products?brand=century&series=doors' },
          { label: 'Century Laminates', href: '/products?brand=century&series=laminates' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'greenply',
        title: 'Greenply',
        subItems: [
          { label: 'Green Club Plus', href: '/products?brand=greenply&series=club-plus' },
          { label: 'Green Gold', href: '/products?brand=greenply&series=gold' },
          { label: 'Ecotec', href: '/products?brand=greenply&series=ecotec' },
          { label: 'Green Doors', href: '/products?brand=greenply&series=doors' },
          { label: 'Greenlam', href: '/products?brand=greenlam' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'merino',
        title: 'Merino',
        subItems: [
          { label: 'Laminates', href: '/products?brand=merino&type=laminates' },
          { label: 'Gloss Panels', href: '/products?brand=merino&type=gloss' },
          { label: 'Matte Panels', href: '/products?brand=merino&type=matte' },
          { label: 'Compact Boards', href: '/products?brand=merino&type=compact' },
          { label: 'Restroom Cubicles', href: '/products?brand=merino&type=cubicles' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1558025211-16315582f3fb?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'hettich',
        title: 'Hettich',
        subItems: [
          { label: 'Hinges', href: '/products?brand=hettich&type=hinges' },
          { label: 'Drawer Systems', href: '/products?brand=hettich&type=drawers' },
          { label: 'Sliding Systems', href: '/products?brand=hettich&type=sliding' },
          { label: 'Kitchen Baskets', href: '/products?brand=hettich&type=baskets' },
          { label: 'Handles & Knobs', href: '/products?brand=hettich&type=handles' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'hafele',
        title: 'Hafele',
        subItems: [
          { label: 'Architectural Hardware', href: '/products?brand=hafele&type=arch' },
          { label: 'Kitchen Fittings', href: '/products?brand=hafele&type=kitchen' },
          { label: 'Sliding Solutions', href: '/products?brand=hafele&type=sliding' },
          { label: 'Lighting Systems', href: '/products?brand=hafele&type=lighting' },
          { label: 'Appliances', href: '/products?brand=hafele&type=appliances' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'godrej',
        title: 'Godrej',
        subItems: [
          { label: 'Main Door Locks', href: '/products?brand=godrej&type=main-door' },
          { label: 'Digital Locks', href: '/products?brand=godrej&type=digital' },
          { label: 'Padlocks', href: '/products?brand=godrej&type=padlocks' },
          { label: 'Safes & Lockers', href: '/products?brand=godrej&type=safes' },
          { label: 'Kitchen Accessories', href: '/products?brand=godrej&type=kitchen' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: "Interiors",
    href: "/products/interiors",
    type: "mega",
    columns: [
      {
        id: 'kitchen',
        title: 'Modular Kitchen',
        subItems: [
          { label: 'L-Shaped Kitchens', href: '/products/interiors?type=kitchen&layout=l-shape' },
          { label: 'U-Shaped Kitchens', href: '/products/interiors?type=kitchen&layout=u-shape' },
          { label: 'Parallel Kitchens', href: '/products/interiors?type=kitchen&layout=parallel' },
          { label: 'Island Kitchens', href: '/products/interiors?type=kitchen&layout=island' },
          { label: 'Straight Kitchens', href: '/products/interiors?type=kitchen&layout=straight' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'bedroom',
        title: 'Bedroom',
        subItems: [
          { label: 'Master Bedroom', href: '/products/interiors?type=bedroom&room=master' },
          { label: 'Guest Bedroom', href: '/products/interiors?type=bedroom&room=guest' },
          { label: 'Kids Bedroom', href: '/products/interiors?type=bedroom&room=kids' },
          { label: 'Beds & Headboards', href: '/products/interiors?type=bedroom&furniture=beds' },
          { label: 'Side Tables', href: '/products/interiors?type=bedroom&furniture=tables' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'wardrobes',
        title: 'Wardrobes',
        subItems: [
          { label: 'Swing Door', href: '/products/interiors?type=wardrobes&style=swing' },
          { label: 'Sliding Door', href: '/products/interiors?type=wardrobes&style=sliding' },
          { label: 'Walk-in Closets', href: '/products/interiors?type=wardrobes&style=walk-in' },
          { label: 'Glass Wardrobes', href: '/products/interiors?type=wardrobes&style=glass' },
          { label: 'Loft Units', href: '/products/interiors?type=wardrobes&style=loft' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1595526114101-97d812ce3c96?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'living',
        title: 'Living Room',
        subItems: [
          { label: 'TV Units', href: '/products/interiors?type=living&furniture=tv-unit' },
          { label: 'Partitions & Jali', href: '/products/interiors?type=living&furniture=partitions' },
          { label: 'Wall Paneling', href: '/products/interiors?type=living&furniture=paneling' },
          { label: 'Display Cabinets', href: '/products/interiors?type=living&furniture=cabinets' },
          { label: 'Shoe Racks', href: '/products/interiors?type=living&furniture=shoe-racks' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'pooja',
        title: 'Pooja Room',
        subItems: [
          { label: 'Wall Mounted Mandir', href: '/products/interiors?type=pooja&style=wall' },
          { label: 'Floor Standing', href: '/products/interiors?type=pooja&style=floor' },
          { label: 'CNC Backpanels', href: '/products/interiors?type=pooja&style=cnc' },
          { label: 'Storage Drawers', href: '/products/interiors?type=pooja&style=storage' },
          { label: 'Custom Designs', href: '/products/interiors?type=pooja&style=custom' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200&auto=format&fit=crop'
      },
      {
        id: 'services',
        title: 'Our Services',
        subItems: [
          { label: 'Consultation', href: '/products/interiors?service=consultation' },
          { label: '3D Design & Render', href: '/products/interiors?service=3d-design' },
          { label: 'Material Selection', href: '/products/interiors?service=materials' },
          { label: 'Execution', href: '/products/interiors?service=execution' },
          { label: 'Maintenance', href: '/products/interiors?service=maintenance' }
        ],
        hoverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
];