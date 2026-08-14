export type MegaMenuCategory = {
  id: string;
  title: string;
  hoverImage: string;
  subItems: { label: string; href: string }[];
};

export type MenuItem = {
  title: string;
  type: 'link' | 'mega';
  href?: string;
  columns?: MegaMenuCategory[];
};

export const NAVIGATION_DATA: MenuItem[] = [
  { title: 'Home', type: 'link', href: '/' },
  {
    title: 'Products',
    type: 'mega',
    columns: [
      {
        id: 'plywood',
        title: 'Plywood',
        hoverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'BWP Grade', href: '/products/plywood?type=bwp' },
          { label: 'BWR Grade', href: '/products/plywood?type=bwr' },
          { label: 'MR Grade', href: '/products/plywood?type=mr' },
          { label: 'Fire Retardant', href: '/products/plywood?type=fr' },
          { label: 'Marine Plywood', href: '/products/plywood?type=marine' },
          { label: 'Calibrated Plywood', href: '/products/plywood?type=calibrated' },
        ],
      },
      {
        id: 'laminates',
        title: 'Laminates',
        hoverImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'High Gloss', href: '/products/laminates?type=high-gloss' },
          { label: 'Suede Finish', href: '/products/laminates?type=suede' },
          { label: 'Textured', href: '/products/laminates?type=textured' },
          { label: 'Woodgrains', href: '/products/laminates?type=woodgrains' },
          { label: 'Solid Colors', href: '/products/laminates?type=solid' },
          { label: 'Anti-Bacterial', href: '/products/laminates?type=antibacterial' },
        ],
      },
      {
        id: 'veneers',
        title: 'Veneers',
        hoverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Natural Veneers', href: '/products/veneers?type=teak' },
          { label: 'Recon Veneers', href: '/products/veneers?type=recon' },
          { label: 'Smoked Veneers', href: '/products/veneers?type=smoked' },
          { label: 'Dyed Veneers', href: '/products/veneers?type=dyed' },
          { label: 'Metallic Veneers', href: '/products/veneers?type=metallic' },
        ],
      },
      {
        id: 'doors',
        title: 'Doors',
        hoverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Flush Doors', href: '/products/doors?type=flush' },
          { label: 'Panel Doors', href: '/products/doors?type=panel' },
          { label: 'Veneered Doors', href: '/products/doors?type=veneered' },
          { label: 'Laminated Doors', href: '/products/doors?type=laminated' },
          { label: 'Fire Rated Doors', href: '/products/doors?type=fire' },
          { label: 'Custom Doors', href: '/products/doors?type=custom' },
        ],
      },
      {
        id: 'hardware',
        title: 'Hardware',
        hoverImage: 'https://images.unsplash.com/photo-1558211583-05bdfa91b29c?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Door Handles', href: '/products/hardware?type=handles' },
          { label: 'Hinges & Channels', href: '/products/hardware?type=hinges' },
          { label: 'Locks & Security', href: '/products/hardware?type=locks' },
          { label: 'Kitchen Hardware', href: '/products/hardware?type=kitchen' },
          { label: 'Wardrobe Fittings', href: '/products/hardware?type=wardrobe' },
          { label: 'Glass Fittings', href: '/products/hardware?type=glass' },
        ],
      },
      {
        id: 'more',
        title: 'More',
        hoverImage: 'https://images.unsplash.com/photo-1595428773960-e33e37fcc36e?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'MDF Boards', href: '/products/plywood?type=mdf' },
          { label: 'Particle Boards', href: '/products/plywood?type=particle' },
          { label: 'Edge Bands', href: '/products/laminates?type=edge-bands' },
          { label: 'Adhesives', href: '/products/hardware?type=adhesives' },
          { label: 'Acrylic Sheets', href: '/products/laminates?type=acrylic' },
          { label: 'Louvers & Jaali', href: '/products/interiors?type=louvers' },
        ],
      },
    ],
  },
  {
    title: 'Brands',
    type: 'mega',
    columns: [
      {
        id: 'century',
        title: 'CenturyPly',
        hoverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Club Prime', href: '/products?brand=century&series=club-prime' },
          { label: 'Sainik 710', href: '/products?brand=century&series=sainik-710' },
          { label: 'Fire Retardant', href: '/products?brand=century&series=fr' },
          { label: 'Laminates', href: '/products?brand=century&series=laminates' },
          { label: 'View All', href: '/products?brand=century' },
        ],
      },
      {
        id: 'greenply',
        title: 'Greenply',
        hoverImage: 'https://images.unsplash.com/photo-1572186789495-2c8ee0134468?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Club Plus BWR', href: '/products?brand=greenply&series=club-plus' },
          { label: 'MR Grade', href: '/products?brand=greenply&series=mr' },
          { label: 'Calibrated', href: '/products?brand=greenply&series=calibrated' },
          { label: 'Green Doors', href: '/products?brand=greenply&series=doors' },
          { label: 'View All', href: '/products?brand=greenply' },
        ],
      },
      {
        id: 'merino',
        title: 'Merino',
        hoverImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'High Gloss', href: '/products?brand=merino&series=high-gloss' },
          { label: 'Textured', href: '/products?brand=merino&series=textured' },
          { label: 'Solid Colors', href: '/products?brand=merino&series=solid' },
          { label: 'Gloss Panels', href: '/products?brand=merino&series=panels' },
          { label: 'View All', href: '/products?brand=merino' },
        ],
      },
      {
        id: 'hettich',
        title: 'Hettich',
        hoverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Soft-Close Hinges', href: '/products?brand=hettich&series=hinges' },
          { label: 'Tandem Boxes', href: '/products?brand=hettich&series=tandem' },
          { label: 'Drawer Systems', href: '/products?brand=hettich&series=drawers' },
          { label: 'Sliding Systems', href: '/products?brand=hettich&series=sliding' },
          { label: 'View All', href: '/products?brand=hettich' },
        ],
      },
      {
        id: 'godrej',
        title: 'Godrej',
        hoverImage: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Digital Locks', href: '/products?brand=godrej&series=digital-locks' },
          { label: 'Mortise Locks', href: '/products?brand=godrej&series=mortise' },
          { label: 'Main Door Locks', href: '/products?brand=godrej&series=main-door' },
          { label: 'Safes & Lockers', href: '/products?brand=godrej&series=safes' },
          { label: 'View All', href: '/products?brand=godrej' },
        ],
      },
      {
        id: 'hafele',
        title: 'Häfele',
        hoverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Glass Fittings', href: '/products?brand=hafele&series=glass' },
          { label: 'Architectural Hardware', href: '/products?brand=hafele&series=architectural' },
          { label: 'Lighting Systems', href: '/products?brand=hafele&series=lighting' },
          { label: 'Appliances', href: '/products?brand=hafele&series=appliances' },
          { label: 'View All', href: '/products?brand=hafele' },
        ],
      },
    ],
  },
  {
    title: 'Interiors',
    type: 'mega',
    columns: [
      {
        id: 'kitchen',
        title: 'Modular Kitchen',
        hoverImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'L-Shape Kitchen', href: '/products/interiors?type=kitchen&layout=l-shape' },
          { label: 'U-Shape Kitchen', href: '/products/interiors?type=kitchen&layout=u-shape' },
          { label: 'Parallel Kitchen', href: '/products/interiors?type=kitchen&layout=parallel' },
          { label: 'Island Kitchen', href: '/products/interiors?type=kitchen&layout=island' },
          { label: 'Straight Kitchen', href: '/products/interiors?type=kitchen&layout=straight' },
        ],
      },
      {
        id: 'bedroom',
        title: 'Bedroom',
        hoverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Master Bedroom', href: '/products/interiors?type=bedroom&room=master' },
          { label: 'Kids Bedroom', href: '/products/interiors?type=bedroom&room=kids' },
          { label: 'Guest Bedroom', href: '/products/interiors?type=bedroom&room=guest' },
          { label: 'Study Room', href: '/products/interiors?type=bedroom&room=study' },
        ],
      },
      {
        id: 'wardrobes',
        title: 'Wardrobes',
        hoverImage: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Swing Wardrobes', href: '/products/interiors?type=wardrobes&style=swing' },
          { label: 'Sliding Wardrobes', href: '/products/interiors?type=wardrobes&style=sliding' },
          { label: 'Walk-in Closets', href: '/products/interiors?type=wardrobes&style=walk-in' },
          { label: 'Glass Wardrobes', href: '/products/interiors?type=wardrobes&style=glass' },
          { label: 'Loft Wardrobes', href: '/products/interiors?type=wardrobes&style=loft' },
        ],
      },
      {
        id: 'living',
        title: 'Living Room',
        hoverImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'TV Units', href: '/products/interiors?type=living&item=tv-unit' },
          { label: 'Wall Paneling', href: '/products/interiors?type=living&item=paneling' },
          { label: 'False Ceiling', href: '/products/interiors?type=living&item=ceiling' },
          { label: 'Crockery Units', href: '/products/interiors?type=living&item=crockery' },
        ],
      },
      {
        id: 'pooja',
        title: 'Pooja Room',
        hoverImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Wall Mounted', href: '/products/interiors?type=pooja&style=wall-mounted' },
          { label: 'Floor Standing', href: '/products/interiors?type=pooja&style=floor' },
          { label: 'Corner Units', href: '/products/interiors?type=pooja&style=corner' },
          { label: 'CNC Design', href: '/products/interiors?type=pooja&style=cnc' },
        ],
      },
      {
        id: 'services',
        title: 'Services',
        hoverImage: 'https://images.unsplash.com/photo-1595526114101-97d812ce3c96?q=80&w=1200&auto=format&fit=crop',
        subItems: [
          { label: 'Free Site Visit', href: '/products/interiors?service=site-visit' },
          { label: '3D Design', href: '/products/interiors?service=3d-design' },
          { label: 'Installation', href: '/products/interiors?service=installation' },
          { label: 'AMC Support', href: '/products/interiors?service=amc' },
        ],
      },
    ],
  },
];
