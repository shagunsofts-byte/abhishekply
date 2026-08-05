import { Product } from '../hooks/useFirebase';

export const CATEGORIES = [
  "Plywood",
  "Laminates",
  "Doors",
  "Hardware",
  "Interiors"
];
export const BRANDS = [
  "CenturyPly",
  "Greenply",
  "Merino",
  "Greenlam",
  "Dorset",
  "Godrej",
  "Hettich",
  "Hafele",
  "Abhishek Premium"
];
export const PRODUCTS: Product[] = [
  {
    "slug": "premium-marine-plywood",
    "name": "Premium Marine Plywood",
    "category": "Plywood",
    "subcategory": "marine-plywood",
    "brand": "CenturyPly",
    "description": "High-quality marine grade plywood with BWP (Boiling Water Proof) standards, ideal for exterior applications and wet areas.",
    "shortDescription": "BWP grade marine plywood for maximum water resistance.",
    "features": [
      "100% Boiling Water Proof",
      "Borer and Termite Proof",
      "High Density"
    ],
    "material": "Hardwood",
    "sizes": [
      "8x4 ft",
      "7x4 ft",
      "6x4 ft"
    ],
    "finish": "Raw",
    "id": "premium-marine-plywood",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "bwp-grade-plywood",
    "name": "BWP Grade Plywood",
    "category": "Plywood",
    "subcategory": "bwp-grade",
    "brand": "Greenply",
    "description": "Boiling Water Proof grade plywood designed for use in furniture and interior applications requiring water resistance.",
    "shortDescription": "Water resistant plywood for kitchens and bathrooms.",
    "features": [
      "Water Resistant",
      "Termite Proof",
      "Durable"
    ],
    "material": "Hardwood",
    "sizes": [
      "8x4 ft",
      "7x4 ft"
    ],
    "finish": "Raw",
    "id": "bwp-grade-plywood",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1610486001228-2624a9a0eef0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610486001228-2624a9a0eef0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610486001228-2624a9a0eef0?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1610486001228-2624a9a0eef0?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "bwr-grade-plywood",
    "name": "BWR Grade Plywood",
    "category": "Plywood",
    "subcategory": "bwr-grade",
    "brand": "CenturyPly",
    "description": "Boiling Water Resistant plywood suitable for indoor furniture and semi-wet areas.",
    "shortDescription": "Water resistant plywood for general interior furniture.",
    "features": [
      "Boiling Water Resistant",
      "Strong Core",
      "Cost-effective"
    ],
    "material": "Mixed Wood",
    "sizes": [
      "8x4 ft",
      "7x4 ft"
    ],
    "finish": "Raw",
    "id": "bwr-grade-plywood",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "mr-grade-plywood",
    "name": "MR Grade Plywood",
    "category": "Plywood",
    "subcategory": "mr-grade",
    "brand": "Greenply",
    "description": "Moisture Resistant grade plywood for dry interior applications, wardrobes, and living room furniture.",
    "shortDescription": "Moisture resistant plywood for interior use.",
    "features": [
      "Moisture Resistant",
      "Smooth Surface",
      "Lightweight"
    ],
    "material": "Softwood/Mixed",
    "sizes": [
      "8x4 ft",
      "7x4 ft"
    ],
    "finish": "Raw",
    "id": "mr-grade-plywood",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1621516086884-bb7a4ebad0f2?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "high-gloss-laminates",
    "name": "High Gloss Laminates",
    "category": "Laminates",
    "subcategory": "high-gloss",
    "brand": "Greenlam",
    "description": "Premium high gloss laminates providing a mirror-like finish for modern interiors and modular kitchens.",
    "shortDescription": "Mirror-finish high gloss laminates.",
    "features": [
      "Scratch Resistant",
      "Easy to Clean",
      "UV Resistant"
    ],
    "material": "Decorative Paper and Resin",
    "sizes": [
      "8x4 ft"
    ],
    "finish": "High Gloss",
    "colors": [
      "Snow White",
      "Jet Black",
      "Ruby Red"
    ],
    "id": "high-gloss-laminates",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "matte-laminates",
    "name": "Matte Laminates",
    "category": "Laminates",
    "subcategory": "matte",
    "brand": "Merino",
    "description": "Elegant matte finish laminates that offer a subtle, sophisticated look without glare, perfect for wardrobes and desks.",
    "shortDescription": "Sophisticated matte finish laminates.",
    "features": [
      "Anti-Fingerprint",
      "Low Glare",
      "Durable"
    ],
    "material": "Decorative Paper and Resin",
    "sizes": [
      "8x4 ft"
    ],
    "finish": "Matte",
    "colors": [
      "Charcoal",
      "Beige",
      "Navy Blue"
    ],
    "id": "matte-laminates",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "wooden-texture-laminates",
    "name": "Wooden Texture Laminates",
    "category": "Laminates",
    "subcategory": "woodgrains",
    "brand": "CenturyPly",
    "description": "Authentic wood grain texture laminates bringing the natural warmth of wood to your interior spaces.",
    "shortDescription": "Natural wood grain textured laminates.",
    "features": [
      "Realistic Wood Grain",
      "Scratch Resistant",
      "Moisture Resistant"
    ],
    "material": "Decorative Paper and Resin",
    "sizes": [
      "8x4 ft"
    ],
    "finish": "Textured",
    "colors": [
      "Walnut",
      "Oak",
      "Teak"
    ],
    "id": "wooden-texture-laminates",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "acrylic-laminates",
    "name": "Acrylic Laminates",
    "category": "Laminates",
    "subcategory": "acrylic",
    "brand": "Greenlam",
    "description": "Ultra-premium acrylic laminates with superior depth and gloss, creating a luxurious aesthetic for high-end kitchens.",
    "shortDescription": "Ultra-premium high depth acrylic laminates.",
    "features": [
      "High Depth Gloss",
      "Scratch Resistant",
      "Color Fastness"
    ],
    "material": "Acrylic",
    "sizes": [
      "8x4 ft"
    ],
    "finish": "Acrylic Gloss",
    "colors": [
      "Pearl White",
      "Metallic Silver",
      "Burgundy"
    ],
    "id": "acrylic-laminates",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "flush-door",
    "name": "Flush Door",
    "category": "Doors",
    "subcategory": "flush-doors",
    "brand": "CenturyPly",
    "description": "Strong and durable flush doors offering a plain, smooth surface. Suitable for both residential and commercial applications.",
    "shortDescription": "Durable and smooth flush doors.",
    "features": [
      "Solid Core",
      "Termite Proof",
      "Weather Resistant"
    ],
    "material": "Wood and Blockboard",
    "sizes": [
      "80x32 inch",
      "80x36 inch"
    ],
    "finish": "Raw (Paintable)",
    "id": "flush-door",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "wpc-door",
    "name": "WPC Door",
    "category": "Doors",
    "subcategory": "wpc-doors",
    "brand": "Abhishek Premium",
    "description": "Wood Plastic Composite (WPC) doors that are 100% waterproof and termite proof, ideal for bathrooms.",
    "shortDescription": "100% waterproof WPC doors.",
    "features": [
      "100% Waterproof",
      "Termite Proof",
      "Fire Retardant"
    ],
    "material": "Wood Plastic Composite",
    "sizes": [
      "80x30 inch",
      "80x32 inch"
    ],
    "finish": "Prefinished",
    "id": "wpc-door",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1534349762230-e0cb9cb415a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534349762230-e0cb9cb415a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534349762230-e0cb9cb415a2?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1534349762230-e0cb9cb415a2?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "veneer-door",
    "name": "Veneer Door",
    "category": "Doors",
    "subcategory": "veneer-doors",
    "brand": "Greenply",
    "description": "Premium doors finished with natural wood veneer, providing an elegant and luxurious aesthetic.",
    "shortDescription": "Elegant natural wood veneer doors.",
    "features": [
      "Natural Wood Look",
      "Solid Core",
      "Polished Finish"
    ],
    "material": "Wood and Veneer",
    "sizes": [
      "80x32 inch",
      "80x36 inch"
    ],
    "finish": "Veneer",
    "colors": [
      "Teak",
      "Walnut"
    ],
    "id": "veneer-door",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "laminate-door",
    "name": "Laminate Door",
    "category": "Doors",
    "subcategory": "laminate-doors",
    "brand": "CenturyPly",
    "description": "Ready-to-use doors with pre-pressed decorative laminates, available in various colors and patterns.",
    "shortDescription": "Ready-to-use decorative laminate doors.",
    "features": [
      "Scratch Resistant",
      "Easy Maintenance",
      "Pre-finished"
    ],
    "material": "Wood and Laminate",
    "sizes": [
      "80x32 inch",
      "80x36 inch"
    ],
    "finish": "Laminated",
    "colors": [
      "Woodgrain",
      "Solid Color"
    ],
    "id": "laminate-door",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "main-door-handle",
    "name": "Main Door Handle",
    "category": "Hardware",
    "subcategory": "door-handles",
    "brand": "Godrej",
    "description": "Premium heavy-duty main door handles offering security and an elegant entrance statement.",
    "shortDescription": "Premium heavy-duty main door handles.",
    "features": [
      "Corrosion Resistant",
      "Heavy Duty",
      "Ergonomic Grip"
    ],
    "material": "Stainless Steel / Brass",
    "sizes": [
      "12 inch",
      "18 inch",
      "24 inch"
    ],
    "finish": "Antique Brass / SS",
    "colors": [
      "Antique Brass",
      "Brushed Steel"
    ],
    "id": "main-door-handle",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "pull-handle",
    "name": "Pull Handle",
    "category": "Hardware",
    "subcategory": "door-handles",
    "brand": "Dorset",
    "description": "Sleek and modern pull handles for interior doors, glass doors, and commercial spaces.",
    "shortDescription": "Modern pull handles for interior doors.",
    "features": [
      "Modern Design",
      "Easy Installation",
      "Durable Finish"
    ],
    "material": "Stainless Steel",
    "sizes": [
      "8 inch",
      "12 inch"
    ],
    "finish": "Matte Black / SS",
    "colors": [
      "Matte Black",
      "Stainless Steel"
    ],
    "id": "pull-handle",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "mortise-lock",
    "name": "Mortise Lock",
    "category": "Hardware",
    "subcategory": "locks",
    "brand": "Godrej",
    "description": "High-security mortise locks suitable for main doors and bedroom doors with premium key mechanisms.",
    "shortDescription": "High-security mortise locks.",
    "features": [
      "High Security",
      "Smooth Mechanism",
      "Durable"
    ],
    "material": "Brass / Steel",
    "finish": "Satin / Antique",
    "id": "mortise-lock",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "inter-lock",
    "name": "Inter Lock",
    "category": "Hardware",
    "subcategory": "locks",
    "brand": "Godrej",
    "description": "Reliable interlocking systems for enhanced safety and security in residential and commercial premises.",
    "shortDescription": "Reliable interlocking systems.",
    "features": [
      "Tamper Proof",
      "Heavy Duty",
      "Easy Operation"
    ],
    "material": "Steel",
    "finish": "Powder Coated",
    "id": "inter-lock",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "door-aldrop",
    "name": "Door Aldrop",
    "category": "Hardware",
    "subcategory": "door-fittings",
    "brand": "Dorset",
    "description": "Traditional and modern door aldrops for securing double doors and main entrances.",
    "shortDescription": "Secure door aldrops for main entrances.",
    "features": [
      "Heavy Duty",
      "Rust Proof",
      "Smooth Slide"
    ],
    "material": "Stainless Steel",
    "sizes": [
      "10 inch",
      "12 inch"
    ],
    "finish": "SS / Antique",
    "id": "door-aldrop",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "tower-bolt",
    "name": "Tower Bolt",
    "category": "Hardware",
    "subcategory": "door-fittings",
    "brand": "Dorset",
    "description": "Sturdy tower bolts for securing doors and windows from the inside.",
    "shortDescription": "Sturdy tower bolts for doors and windows.",
    "features": [
      "Rust Proof",
      "Smooth Operation",
      "Durable"
    ],
    "material": "Stainless Steel / Brass",
    "sizes": [
      "4 inch",
      "6 inch",
      "8 inch"
    ],
    "finish": "SS / Brass",
    "id": "tower-bolt",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "ss-hinges",
    "name": "SS Hinges",
    "category": "Hardware",
    "subcategory": "door-fittings",
    "brand": "Hettich",
    "description": "High-quality stainless steel hinges ensuring smooth and squeak-free operation of doors.",
    "shortDescription": "High-quality stainless steel door hinges.",
    "features": [
      "Corrosion Resistant",
      "Ball Bearing",
      "Heavy Load Capacity"
    ],
    "material": "Stainless Steel 304",
    "sizes": [
      "4x3 inch",
      "5x3 inch"
    ],
    "finish": "Satin SS",
    "id": "ss-hinges",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "door-stopper",
    "name": "Door Stopper",
    "category": "Hardware",
    "subcategory": "door-fittings",
    "brand": "Hafele",
    "description": "Magnetic and mechanical door stoppers to prevent wall damage and hold doors open.",
    "shortDescription": "Magnetic and mechanical door stoppers.",
    "features": [
      "Strong Magnet",
      "Rubber Buffer",
      "Floor/Wall Mount"
    ],
    "material": "Stainless Steel / Zinc Alloy",
    "finish": "SS / Matte Black",
    "id": "door-stopper",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "tandem-box",
    "name": "Tandem Box",
    "category": "Hardware",
    "subcategory": "kitchen-hardware",
    "brand": "Hettich",
    "description": "Smooth-gliding tandem box drawer systems for modern modular kitchens, offering high weight capacity.",
    "shortDescription": "Smooth tandem box drawer systems for kitchens.",
    "features": [
      "Soft Close",
      "High Load Capacity",
      "Full Extension"
    ],
    "material": "Steel",
    "sizes": [
      "500mm",
      "550mm"
    ],
    "finish": "Anthracite / Grey",
    "id": "tandem-box",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "kitchen-basket",
    "name": "Kitchen Basket",
    "category": "Hardware",
    "subcategory": "kitchen-hardware",
    "brand": "Hafele",
    "description": "Stainless steel wire baskets for organized storage of utensils, plates, and jars in modular kitchens.",
    "shortDescription": "Stainless steel wire baskets for kitchens.",
    "features": [
      "Rust Proof",
      "Optimum Storage",
      "Easy to Clean"
    ],
    "material": "Stainless Steel 304",
    "sizes": [
      "15 inch",
      "17 inch",
      "21 inch"
    ],
    "finish": "Chrome Plated",
    "id": "kitchen-basket",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "modular-kitchen",
    "name": "Modular Kitchen",
    "category": "Interiors",
    "subcategory": "modular-kitchen",
    "brand": "Abhishek Premium",
    "description": "Custom-designed modular kitchens maximizing space efficiency with premium finishes and hardware.",
    "shortDescription": "Custom-designed modular kitchens.",
    "features": [
      "Custom Layout",
      "Premium Hardware",
      "Space Efficient"
    ],
    "material": "Plywood / HDHMR",
    "finish": "Acrylic / Laminate / PU",
    "colors": [
      "Customizable"
    ],
    "id": "modular-kitchen",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "wardrobe-interior",
    "name": "Wardrobe Interior",
    "category": "Interiors",
    "subcategory": "wardrobes",
    "brand": "Abhishek Premium",
    "description": "Tailor-made wardrobe interior solutions with sliding or openable doors and optimized storage accessories.",
    "shortDescription": "Tailor-made wardrobe interior solutions.",
    "features": [
      "Custom Storage",
      "Sliding/Openable",
      "Soft Close Hinges"
    ],
    "material": "Plywood / Blockboard",
    "finish": "Laminate / Veneer",
    "colors": [
      "Customizable"
    ],
    "id": "wardrobe-interior",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "bedroom-interior",
    "name": "Bedroom Interior",
    "category": "Interiors",
    "subcategory": "bedrooms",
    "brand": "Abhishek Premium",
    "description": "Complete bedroom interior solutions including beds, side tables, dressers, and wall paneling.",
    "shortDescription": "Complete bedroom interior solutions.",
    "features": [
      "Cohesive Design",
      "Comfortable",
      "Custom Lighting"
    ],
    "material": "Mixed Materials",
    "finish": "Customizable",
    "colors": [
      "Customizable"
    ],
    "id": "bedroom-interior",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  },
  {
    "slug": "tv-unit",
    "name": "TV Unit",
    "category": "Interiors",
    "subcategory": "living-room",
    "brand": "Abhishek Premium",
    "description": "Modern and contemporary TV units with hidden wire management and elegant display shelves.",
    "shortDescription": "Modern and contemporary TV units.",
    "features": [
      "Wire Management",
      "Floating/Floor Standing",
      "Display Shelves"
    ],
    "material": "Plywood / Laminate",
    "finish": "Matte / Gloss / Woodgrain",
    "colors": [
      "Customizable"
    ],
    "id": "tv-unit",
    "priceLabel": "Price on Request",
    "price": null,
    "images": [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    "inStock": true
  }
];
