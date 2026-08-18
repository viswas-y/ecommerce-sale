import { Product } from "../types";

export const products: Product[] = [
  // FASHION (8 products)
  {
    id: "prod-1",
    name: "Minimalist Linen Trench",
    slug: "minimalist-linen-trench",
    sku: "FSH-TRN-01",
    description: "An open-front trench coat draped from a heavy organic linen-cotton blend. Features dropped shoulders, deep welt pockets, and an adjustable self-tie belt. Built to layer elegantly across changing seasons.",
    price: 245,
    salePrice: 195,
    rating: 4.8,
    reviewsCount: 34,
    category: "Fashion",
    brand: "Novara Atelier",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Oatmeal", "Charcoal", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 25,
    specifications: {
      "Material": "60% Organic Linen, 40% Long-staple Cotton",
      "Origin": "Ethically woven in Portugal",
      "Care": "Dry clean recommended or hand wash cold and flat dry",
      "Fit": "Relaxed, editorial drape"
    },
    tags: ["outerwear", "linen", "autumn", "essential"],
    status: "In Stock",
    isFeatured: true,
    isNew: true
  },
  {
    id: "prod-2",
    name: "Classic Silk Slip Dress",
    slug: "classic-silk-slip-dress",
    sku: "FSH-SLP-02",
    description: "Cut on the bias from luxurious 19mm mulberry silk, this slip dress features a delicate cowl neckline, adjustable spaghetti straps, and a clean finished hem. Extremely soft against the skin.",
    price: 180,
    rating: 4.9,
    reviewsCount: 42,
    category: "Fashion",
    brand: "Novara Atelier",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Emerald", "Champagne", "Noir"],
    sizes: ["XS", "S", "M", "L"],
    stock: 14,
    specifications: {
      "Material": "100% 19mm Mulberry Silk",
      "Origin": "Sewn in Hangzhou",
      "Care": "Hand wash cold with silk detergent",
      "Fit": "Bias cut, contours body lines"
    },
    tags: ["dress", "silk", "evening", "minimalist"],
    status: "In Stock",
    isBestSeller: true
  },
  {
    id: "prod-3",
    name: "Merino Wool Knit Mockneck",
    slug: "merino-wool-knit-mockneck",
    sku: "FSH-KNT-03",
    description: "An incredibly soft mockneck sweater knitted from extra-fine Australian merino wool. Ribbed collar, cuffs, and hem define this structural layer that offers warmth without bulk.",
    price: 125,
    rating: 4.7,
    reviewsCount: 18,
    category: "Fashion",
    brand: "Novara Studio",
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Heather Grey", "Ivory", "Camel"],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    specifications: {
      "Material": "100% Extra-fine Merino Wool",
      "Origin": "Knitted in Melbourne",
      "Care": "Hand wash cold, dry flat"
    },
    tags: ["sweater", "wool", "mockneck", "winter"],
    status: "Low Stock",
    isNew: true
  },
  {
    id: "prod-4",
    name: "Oversized Organic Cotton Tee",
    slug: "oversized-organic-cotton-tee",
    sku: "FSH-TEE-04",
    description: "A heavy-weight organic cotton tee featuring a vintage crew neck, dropped shoulder seams, and a dry-hand feel. Pre-shrunk and built to maintain its structure through countless wash cycles.",
    price: 45,
    rating: 4.6,
    reviewsCount: 89,
    category: "Fashion",
    brand: "Novara Essentials",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Chalk White", "Slate", "Sage"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    specifications: {
      "Material": "100% Organic Ring-spun Cotton (240 GSM)",
      "Origin": "Ethically built in India",
      "Care": "Machine wash cold, tumble dry low"
    },
    tags: ["tee", "cotton", "basic", "unisex"],
    status: "In Stock"
  },
  {
    id: "prod-5",
    name: "Tailored Wool Trouser",
    slug: "tailored-wool-trouser",
    sku: "FSH-TRS-05",
    description: "High-waisted tailored trousers with front pleats, pressed creases, and a wide-leg profile. Crafted from traceably sourced lightweight wool crepe.",
    price: 165,
    rating: 4.5,
    reviewsCount: 22,
    category: "Fashion",
    brand: "Novara Atelier",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Black", "Taupe"],
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    specifications: {
      "Material": "98% Responsible Wool Standard Wool, 2% Elastane",
      "Origin": "Made in Romania",
      "Care": "Dry clean only"
    },
    tags: ["trousers", "wool", "office", "tailored"],
    status: "In Stock"
  },
  {
    id: "prod-6",
    name: "Cropped Denim Jacket",
    slug: "cropped-denim-jacket",
    sku: "FSH-JKT-06",
    description: "A boxy, slightly cropped denim jacket made from 13.5oz Italian selvedge denim. Finished with custom brushed metal hardware.",
    price: 140,
    salePrice: 110,
    rating: 4.7,
    reviewsCount: 15,
    category: "Fashion",
    brand: "Novara Denim",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Raw Indigo", "Washed Charcoal"],
    sizes: ["S", "M", "L"],
    stock: 0,
    specifications: {
      "Material": "100% Selvedge Organic Cotton Denim",
      "Origin": "Crafted in Italy"
    },
    tags: ["denim", "jacket", "indigo"],
    status: "Out of Stock"
  },
  {
    id: "prod-7",
    name: "Structured Cotton Poplin Shirt",
    slug: "structured-cotton-poplin-shirt",
    sku: "FSH-SHT-07",
    description: "Crisp cotton poplin button-down featuring long cuffs, curved hemline, and structured point collar. The perfect base layer for suiting or smart casual wear.",
    price: 85,
    rating: 4.8,
    reviewsCount: 31,
    category: "Fashion",
    brand: "Novara Atelier",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["White", "Sky Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 32,
    specifications: {
      "Material": "100% GOTS Certified Organic Cotton Poplin",
      "Origin": "Made in Portugal"
    },
    tags: ["shirt", "poplin", "office", "classic"],
    status: "In Stock"
  },
  {
    id: "prod-8",
    name: "Ribbed Modal Tank Top",
    slug: "ribbed-modal-tank-top",
    sku: "FSH-TNK-08",
    description: "A body-hugging rib tank top made from silky, high-stretch modal and organic cotton. Finished with comfortable flat-locked seams.",
    price: 38,
    rating: 4.6,
    reviewsCount: 56,
    category: "Fashion",
    brand: "Novara Essentials",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Ivory", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    stock: 50,
    specifications: {
      "Material": "48% Modal, 48% Organic Cotton, 4% Spandex"
    },
    tags: ["tank", "modal", "layering"],
    status: "In Stock"
  },

  // ELECTRONICS (6 products)
  {
    id: "prod-9",
    name: "Acoustic H1 Over-Ear Headphones",
    slug: "acoustic-h1-over-ear-headphones",
    sku: "ELC-HDF-01",
    description: "Studio-reference headphones featuring custom 40mm beryllium drivers, active hybrid noise cancellation, and luxury lambskin leather accents. Delivers neutral audio reproduction for purists.",
    price: 399,
    salePrice: 349,
    rating: 4.9,
    reviewsCount: 65,
    category: "Electronics",
    brand: "Novara Sound",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Space Black", "Sand Silver"],
    sizes: ["One Size"],
    stock: 15,
    specifications: {
      "Driver Unit": "40mm Dynamic Beryllium Dome",
      "ANC": "Hybrid active noise cancellation up to 38dB",
      "Battery Life": "Up to 32 hours playback with ANC active",
      "Connectivity": "Bluetooth 5.2, AAC, aptX Adaptive, and 3.5mm wired input"
    },
    tags: ["audio", "headphones", "wireless", "premium"],
    status: "In Stock",
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "prod-10",
    name: "Studio Desk Mechanical Keyboard",
    slug: "studio-desk-mechanical-keyboard",
    sku: "ELC-KYB-02",
    description: "Compact 75% hot-swappable keyboard mounted on an solid anodized aluminum chassis. Pre-lubed linear switches and thick PBT keycaps provide a buttery, dampened typing response.",
    price: 185,
    rating: 4.8,
    reviewsCount: 29,
    category: "Electronics",
    brand: "Novara Workspace",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Frosted Grey", "Alabaster White"],
    sizes: ["75% Layout"],
    stock: 6,
    specifications: {
      "Switches": "Pre-lubed custom Linear Gold Switches (50g actuation)",
      "Keycaps": "Dye-sublimated Cherry profile PBT keycaps",
      "Mounting": "Gasket mount with silicone dampening layers"
    },
    tags: ["workspace", "keyboard", "mechanical", "minimalist"],
    status: "Low Stock",
    isNew: true
  },
  {
    id: "prod-11",
    name: "Omni Pro Charge Dock",
    slug: "omni-pro-charge-dock",
    sku: "ELC-CHG-03",
    description: "A solid walnut and aluminum multi-device charging stand. Integrates fast MagSafe wireless power for phone, watch, and earbuds.",
    price: 95,
    rating: 4.6,
    reviewsCount: 41,
    category: "Electronics",
    brand: "Novara Workspace",
    images: [
      "https://images.unsplash.com/photo-1622445262465-2481c457487f?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["American Walnut", "Stained Oak"],
    sizes: ["Standard"],
    stock: 22,
    specifications: {
      "Materials": "FSC Walnut Wood, Aerospace Aluminum, Felt base",
      "Charging": "15W MagSafe Phone, 5W Watch, 5W AirPods"
    },
    tags: ["charger", "wireless", "wood", "desk-accessory"],
    status: "In Stock"
  },
  {
    id: "prod-12",
    name: "Acoustic Mini Bluetooth Speaker",
    slug: "acoustic-mini-bluetooth-speaker",
    sku: "ELC-SPK-04",
    description: "Pocket-sized Bluetooth 5.1 speaker with a warm acoustic signature. Encased in a custom woven wool-grille, IPX6 water resistant.",
    price: 110,
    rating: 4.7,
    reviewsCount: 19,
    category: "Electronics",
    brand: "Novara Sound",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Warm Grey", "Moss Green"],
    sizes: ["Standard"],
    stock: 18,
    specifications: {
      "Battery": "12 hours runtime",
      "Drivers": "2x 45mm neodymium speaker drivers + passive radiator"
    },
    tags: ["speaker", "audio", "portable", "waterproof"],
    status: "In Stock"
  },
  {
    id: "prod-13",
    name: "Minimalist desk light",
    slug: "minimalist-desk-light",
    sku: "ELC-LGT-05",
    description: "Dimmable high-CRI LED desk lamp featuring an rotatable arm, touch control, and premium powder-coated steel framework.",
    price: 150,
    rating: 4.5,
    reviewsCount: 14,
    category: "Electronics",
    brand: "Novara Workspace",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Matt Black", "Mist White"],
    sizes: ["Standard"],
    stock: 10,
    specifications: {
      "LED Lifespan": "50,000 hours",
      "Brightness": "Up to 800 Lumens, 2700K - 5000K variable tone"
    },
    tags: ["lamp", "led", "desk", "lighting"],
    status: "In Stock"
  },
  {
    id: "prod-14",
    name: "Carbon fiber laptop cover",
    slug: "carbon-fiber-laptop-cover",
    sku: "ELC-SLV-06",
    description: "Slim, weather-resistant laptop sleeve layered with recycled carbon fiber weave and wool-felt lining. Protects from drops and scratches.",
    price: 75,
    rating: 4.8,
    reviewsCount: 38,
    category: "Electronics",
    brand: "Novara Workspace",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Charcoal Carbon", "Raw Slate"],
    sizes: ["14 inch", "16 inch"],
    stock: 30,
    specifications: {
      "Exterior": "High-durability Carbon Fiber & Nylon composite",
      "Interior": "100% Natural Merino Felt padding"
    },
    tags: ["sleeve", "laptop", "bag", "carbon-fiber"],
    status: "In Stock"
  },

  // HOME & LIVING (4 products)
  {
    id: "prod-15",
    name: "Soren Bouclé Accent Chair",
    slug: "soren-boucle-accent-chair",
    sku: "HOM-CHR-01",
    description: "Sculptural accent chair wrapped in premium heavy-texture white bouclé fabric. Supported by hidden solid walnut structural legs, providing a cozy but architecturally striking profile.",
    price: 680,
    rating: 4.9,
    reviewsCount: 16,
    category: "Home & Living",
    brand: "Novara Casa",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Cream Bouclé", "Charcoal Tweed"],
    sizes: ["Standard"],
    stock: 4,
    specifications: {
      "Dimensions": "H 78cm x W 82cm x D 80cm",
      "Frame": "FSC-certified kiln-dried solid ash",
      "Upholstery": "80% Wool, 20% Acrylic high-density Bouclé weave"
    },
    tags: ["furniture", "chair", "boucle", "living-room"],
    status: "Low Stock",
    isFeatured: true
  },
  {
    id: "prod-16",
    name: "Modernist Oak Sideboard",
    slug: "modernist-oak-sideboard",
    sku: "HOM-SDB-02",
    description: "A long sideboard crafted in certified red oak. Flat panels slide smoothly to reveal adjustable interior storage shelves and media wire routing portals.",
    price: 1200,
    rating: 4.8,
    reviewsCount: 8,
    category: "Home & Living",
    brand: "Novara Casa",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Natural White Oak", "Smoked Oak"],
    sizes: ["180cm Width"],
    stock: 3,
    specifications: {
      "Wood Source": "Sustainably managed North American forests",
      "Hardware": "Soft-close German drawer runners"
    },
    tags: ["sideboard", "furniture", "oak", "living-room"],
    status: "Low Stock"
  },
  {
    id: "prod-17",
    name: "Architectural Travertine Side Table",
    slug: "architectural-travertine-side-table",
    sku: "HOM-TBL-03",
    description: "Carved from premium Italian silver travertine. Features a circular honed tabletop floating on intersecting structural pillars.",
    price: 340,
    rating: 4.7,
    reviewsCount: 11,
    category: "Home & Living",
    brand: "Novara Casa",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Honed Ivory Travertine"],
    sizes: ["45cm Height"],
    stock: 7,
    specifications: {
      "Material": "100% Silver Travertine Stone",
      "Weight": "24kg"
    },
    tags: ["table", "travertine", "stone", "sculptural"],
    status: "In Stock"
  },
  {
    id: "prod-18",
    name: "Organic Waffle Bedding Set",
    slug: "organic-waffle-bedding-set",
    sku: "HOM-BED-04",
    description: "Luxuriously soft duvet cover and pillowcase set made from organic cotton weave. Deep waffle texture on the top face, smooth percale underneath.",
    price: 210,
    rating: 4.9,
    reviewsCount: 45,
    category: "Home & Living",
    brand: "Novara Casa",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Sage", "Clay", "Pebble"],
    sizes: ["Queen", "King"],
    stock: 18,
    specifications: {
      "Material": "100% GOTS Certified Long-Staple Cotton",
      "Density": "300 Thread Count liner"
    },
    tags: ["bedding", "cotton", "waffle-weave", "bedroom"],
    status: "In Stock",
    isBestSeller: true
  },

  // BEAUTY & COSMETICS (4 products)
  {
    id: "prod-19",
    name: "Botanical Elixir Facial Serum",
    slug: "botanical-elixir-facial-serum",
    sku: "BTY-SRM-01",
    description: "An intensive antioxidant-rich facial treatment containing cold-pressed marula, squalane, and rosehip seed extract. Calms redness, locks in deep cellular moisture, and leaves a soft satin glow.",
    price: 68,
    rating: 4.8,
    reviewsCount: 92,
    category: "Beauty & Cosmetics",
    brand: "Novara Botanicals",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Glass Amber Dropper"],
    sizes: ["50 ml"],
    stock: 80,
    specifications: {
      "Ingredients": "Organic Squalane, Sclerocarya Birrea (Marula) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Vitamin E",
      "Skin Type": "Suitable for all skin types, including sensitive skin",
      "Application": "Apply 3-4 drops morning and night on damp skin"
    },
    tags: ["serum", "botanical", "skincare", "vegan"],
    status: "In Stock",
    isFeatured: true
  },
  {
    id: "prod-20",
    name: "Sea Silt Clarifying Mud Mask",
    slug: "sea-silt-clarifying-mud-mask",
    sku: "BTY-MSK-02",
    description: "Formulated with mineral-dense glacial sea clay, activated charcoal powder, and organic aloe vera extract. Gently lifts out impurities and purifies pores.",
    price: 45,
    rating: 4.7,
    reviewsCount: 54,
    category: "Beauty & Cosmetics",
    brand: "Novara Botanicals",
    images: [
      "https://images.unsplash.com/photo-1567894192231-d22d9c12214d?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Glass Jar"],
    sizes: ["100 ml"],
    stock: 55,
    specifications: {
      "Formulation": "99% Natural clay base",
      "Frequency": "Use 1-2 times weekly"
    },
    tags: ["mask", "clay", "pore-refining"],
    status: "In Stock"
  },

  // ACCESSORIES (4 products)
  {
    id: "prod-21",
    name: "Studio Leather Tote Bag",
    slug: "studio-leather-tote-bag",
    sku: "ACC-TOT-01",
    description: "An elegant, structured shoulder bag made from premium full-grain Italian leather. Features a spacious main compartment lined with durable linen lining and a zipped sleeve for a 14\" laptop.",
    price: 290,
    rating: 4.9,
    reviewsCount: 78,
    category: "Accessories",
    brand: "Novara Leather",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Cognac", "Black", "Tan"],
    sizes: ["Medium"],
    stock: 10,
    specifications: {
      "Leather": "100% Vegetable-Tanned Italian Cowhide",
      "Hardware": "Brushed Solid Brass zip",
      "Dimensions": "W 36cm x H 30cm x D 14cm"
    },
    tags: ["leather", "tote", "bag", "handbag"],
    status: "In Stock",
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "prod-22",
    name: "Classic Chronograph Watch",
    slug: "classic-chronograph-watch",
    sku: "ACC-WCH-02",
    description: "Minimalist timepiece featuring a Japanese quartz movement, matte-finish casing, and a stitched Italian calfskin leather strap.",
    price: 220,
    salePrice: 180,
    rating: 4.7,
    reviewsCount: 23,
    category: "Accessories",
    brand: "Novara Watchmaking",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Silver/Black Band", "Gold/Brown Band"],
    sizes: ["40mm Casing"],
    stock: 14,
    specifications: {
      "Movement": "Miyota Japanese Quartz Chronograph",
      "Glass": "Scratch-resistant Sapphire Crystal",
      "Water Resistance": "5 ATM"
    },
    tags: ["watch", "chronograph", "leather", "classic"],
    status: "In Stock"
  },

  // SHOES (4 products)
  {
    id: "prod-23",
    name: "City Walk Leather Sneaker",
    slug: "city-walk-leather-sneaker",
    sku: "SHS-SNK-01",
    description: "An elegant court sneaker constructed with butter-soft calfskin leather, lined with breathable calfskin lining, and set on a stitched natural rubber cupsole. Perfect for all-day city walks.",
    price: 175,
    rating: 4.8,
    reviewsCount: 62,
    category: "Shoes",
    brand: "Novara Footwear",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Chalk", "Nude", "Navy Accent"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 18,
    specifications: {
      "Upper": "100% Italian Nappa Calfskin",
      "Lining": "Premium vegetable-tanned lining",
      "Sole": "70% Natural Rubber compound, hand-stitched"
    },
    tags: ["sneakers", "leather-shoes", "unisex", "comfort"],
    status: "In Stock",
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "prod-24",
    name: "Suede Chelsea Boots",
    slug: "suede-chelsea-boots",
    sku: "SHS-BTS-02",
    description: "Classic Chelsea boots handmade from velvety English split-suede leather. Features flexible elastic goring panels and a durable crepe-rubber sole.",
    price: 260,
    rating: 4.9,
    reviewsCount: 31,
    category: "Shoes",
    brand: "Novara Footwear",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop"
    ],
    colors: ["Sand Suede", "Chocolate Suede"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 5,
    specifications: {
      "Upper": "Premium CF Stead English Calf Suede",
      "Sole": "Natural Crepe sole"
    },
    tags: ["boots", "chelsea", "suede", "winter"],
    status: "Low Stock",
    isNew: true
  }
];
