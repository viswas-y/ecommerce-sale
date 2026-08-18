import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Art of Slow Living: Curating a Minimalist Space",
    slug: "art-of-slow-living-minimalist-space",
    summary: "How to craft a serene, functional environment by choosing intentional items that balance form, light, and natural textures.",
    coverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    category: "Design",
    author: {
      name: "Evelyn Reed",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      role: "Lead Interior Designer"
    },
    date: "August 12, 2026",
    readingTime: "5 min read",
    tags: ["interiors", "minimalism", "slow-living", "home"],
    isFeatured: true,
    content: `<p>In an age defined by constant connectivity and rapid consumption, our homes have become the ultimate sanctuary. Crafting a space that promotes tranquility, mindfulness, and comfort is no longer just a design trend—it is a vital practice for our well-being.</p>
    <p>Slow living is an approach to life that emphasizes mindfulness, quality over quantity, and an appreciation for the details. When translated to our physical spaces, it means curating environments filled with objects that carry story, utility, and refined craftsmanship.</p>
    <h3>1. Embrace Negative Space</h3>
    <p>We often feel pressured to fill every empty wall and tabletop. However, negative space (the empty areas around objects) gives your room breathing room. It allows the eyes to rest and highlights the pieces that truly matter, like a beautifully crafted travertine coffee table or a single textured bouclé accent chair.</p>
    <h3>2. Focus on Tactile Materials</h3>
    <p>When visual clutter is reduced, texture becomes the language of your space. Introduce raw, organic materials that age gracefully:</p>
    <ul>
      <li>Honed travertine and cold marble</li>
      <li>FSC-certified oak and walnut wood with rich natural grains</li>
      <li>Tactile textiles like heavy linen, wool bouclé, and organic cotton waffles</li>
    </ul>
    <h3>3. Let Light Direct the Layout</h3>
    <p>Natural light is the most powerful element in interior design. Arrange your seating to celebrate morning light, and use warm, low-CRI LED lamps (2700K) to construct cozy pockets of light in the evening instead of harsh overhead panels.</p>`
  },
  {
    id: "post-2",
    title: "Building an Ethical Capsule Wardrobe for the Modern Citizen",
    slug: "building-ethical-capsule-wardrobe",
    summary: "Discover how to simplify your dressing routine with 12 high-quality, interchangeable garments built from sustainable organic fibers.",
    coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
    author: {
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
      role: "Creative Director"
    },
    date: "July 28, 2026",
    readingTime: "4 min read",
    tags: ["fashion", "capsule-wardrobe", "sustainability"],
    content: `<p>A capsule wardrobe is a collection of a few essential items of clothing that don't go out of fashion, which can then be augmented with seasonal pieces. The goal is simple: dress effortlessly, reduce decision fatigue, and support ethical garment manufacturing.</p>
    <p>By shifting our perspective from "buying for the moment" to "investing for the decade," we build a deeper connection with our clothing and significantly reduce textile waste.</p>
    <h3>The Golden Dozen: Essential Pillars</h3>
    <p>Your base capsule wardrobe should consist of versatile items that can easily transition from casual weekend wear to structured office environments:</p>
    <ul>
      <li><strong>The Organic Tee:</strong> Boxy, heavyweight cotton shirts in white, slate, and clay.</li>
      <li><strong>The Tailored Trouser:</strong> High-waisted wool trousers that contour elegantly.</li>
      <li><strong>The Linen Trench:</strong> A fluid, open-front layer for breezy transition months.</li>
      <li><strong>The Premium Sneaker:</strong> A clean, minimalist leather low-top that works with denim or suiting.</li>
    </ul>`
  },
  {
    id: "post-3",
    title: "Sourcing Organic Botanicals: The Science of Clean Skincare",
    slug: "sourcing-organic-botanicals-skincare",
    summary: "Inside our search for cold-pressed active ingredients that nourish cells without synthetic preservatives.",
    coverImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
    category: "Beauty",
    author: {
      name: "Dr. Clara Mendoza",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
      role: "Head of R&D"
    },
    date: "June 15, 2026",
    readingTime: "6 min read",
    tags: ["skincare", "clean-beauty", "botanicals"],
    content: `<p>Clean skincare is more than a marketing phrase—it is a chemical standard that respects the biology of the skin barrier. Our skin is our largest organ, absorbing much of what we place on it.</p>
    <p>Traditional cosmetics rely on parabens, silicones, and synthetic fragrance to build shelf-stability and artificial textures. Modern botanical skincare focuses on cold-pressed plant extracts that deliver concentrated vitamins, essential fatty acids, and antioxidants directly to the cells.</p>`
  }
];
