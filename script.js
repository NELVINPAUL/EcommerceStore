import { useState, useEffect, useContext, createContext, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "new-arrivals", label: "New Arrivals", icon: "✨" },
  { id: "sale", label: "Sale", icon: "🏷️" },
  { id: "bikinis", label: "Bikinis", icon: "👙" },
  { id: "all-sports", label: "All Sports", icon: "🏊" },
  { id: "women", label: "Women's Swimwear", icon: "👗" },
  { id: "men", label: "Men's Swimwear", icon: "🩲" },
  { id: "kids", label: "Kids", icon: "🧒" },
  { id: "accessories", label: "Accessories", icon: "🕶️" },
  { id: "personalize", label: "Personalize", icon: "🎨" },
];

const SUBCATEGORIES = {
  women: ["Women's Swimwear", "Maternity Swimsuits"],
  men: ["Men's Swimwear"],
  kids: ["Boys Swimwear", "Boys Swimsuits", "Girls Swimsuits"],
};

const INITIAL_PRODUCTS = [
  // Bikinis
  { id: 1, name: "Tropicana Triangle Bikini", price: 4200, salePrice: null, category: "bikinis", subcategory: null, sizes: ["XS","S","M","L","XL"], colors: ["Coral","Navy","Black"], rating: 4.8, reviews: 124, stock: 45, image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80", images: ["https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80","https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80"], description: "Vibrant triangle bikini perfect for the beach. Adjustable ties for the perfect fit.", material: "80% Nylon, 20% Spandex", badge: "new-arrivals", featured: true },
  { id: 2, name: "Sunset Halter Bikini", price: 3800, salePrice: 2850, category: "bikinis", subcategory: null, sizes: ["XS","S","M","L"], colors: ["Sunset Orange","White","Sage"], rating: 4.6, reviews: 87, stock: 20, image: "https://images.unsplash.com/photo-1619447823196-44d23fc4cc50?w=600&q=80", images: ["https://images.unsplash.com/photo-1619447823196-44d23fc4cc50?w=600&q=80"], description: "Halter neck bikini with adjustable straps. UV protective fabric.", material: "78% Polyester, 22% Elastane", badge: "sale", featured: true },
  { id: 3, name: "Wave Rider Sports Bikini", price: 5500, salePrice: null, category: "bikinis", subcategory: null, sizes: ["XS","S","M","L","XL","2XL"], colors: ["Teal","Black","Hot Pink"], rating: 4.9, reviews: 203, stock: 60, image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80", images: ["https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&q=80"], description: "High-performance sports bikini with stay-put design. Ideal for active water sports.", material: "82% Nylon, 18% Lycra", badge: "best-seller", featured: true },
  { id: 4, name: "Boho Ruffle Bikini Set", price: 4600, salePrice: 3680, category: "bikinis", subcategory: null, sizes: ["S","M","L","XL"], colors: ["Floral Pink","Blue","Yellow"], rating: 4.7, reviews: 156, stock: 30, image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=600&q=80", images: ["https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=600&q=80"], description: "Bohemian style ruffle bikini with tropical print. Mix and match friendly.", material: "75% Polyester, 25% Spandex", badge: "sale", featured: false },

  // Women's Swimwear
  { id: 5, name: "Classic One-Piece Swimsuit", price: 5800, salePrice: null, category: "women", subcategory: "Women's Swimwear", sizes: ["XS","S","M","L","XL","2XL"], colors: ["Navy","Black","Red"], rating: 4.9, reviews: 312, stock: 80, image: "https://images.unsplash.com/photo-1545236080-7ef3fdde76e0?w=600&q=80", images: ["https://images.unsplash.com/photo-1545236080-7ef3fdde76e0?w=600&q=80"], description: "Timeless one-piece swimsuit with flattering cut and UV50+ protection.", material: "80% Nylon, 20% Lycra", badge: "best-seller", featured: true },
  { id: 6, name: "Sporty Racerback One-Piece", price: 6200, salePrice: null, category: "women", subcategory: "Women's Swimwear", sizes: ["XS","S","M","L","XL"], colors: ["Royal Blue","Black","Emerald"], rating: 4.8, reviews: 189, stock: 55, image: "https://images.unsplash.com/photo-1566441831133-21af3ad31d2e?w=600&q=80", images: ["https://images.unsplash.com/photo-1566441831133-21af3ad31d2e?w=600&q=80"], description: "Performance racerback design for lap swimming and water sports.", material: "85% Polyester, 15% Spandex", badge: "new-arrivals", featured: true },
  { id: 7, name: "Floral Wrap Swimsuit", price: 5200, salePrice: 3900, category: "women", subcategory: "Women's Swimwear", sizes: ["S","M","L","XL","2XL"], colors: ["Tropical Floral","Monochrome"], rating: 4.6, reviews: 98, stock: 25, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80"], description: "Beautiful floral wrap one-piece with adjustable wrap front.", material: "78% Nylon, 22% Elastane", badge: "sale", featured: false },

  // Maternity Swimsuits
  { id: 8, name: "Bloom Maternity Swimsuit", price: 6500, salePrice: null, category: "women", subcategory: "Maternity Swimsuits", sizes: ["S","M","L","XL","2XL"], colors: ["Dusty Rose","Navy","Sage Green"], rating: 4.9, reviews: 267, stock: 40, image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80", images: ["https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80"], description: "Designed for expecting mothers. Stretchy fabric accommodates growing belly. Extra support built in.", material: "90% Nylon, 10% Spandex - Chlorine Resistant", badge: "best-seller", featured: true },
  { id: 9, name: "Mama Glow Tankini Set", price: 5900, salePrice: 4425, category: "women", subcategory: "Maternity Swimsuits", sizes: ["S","M","L","XL"], colors: ["Aqua","Black","Coral"], rating: 4.8, reviews: 143, stock: 35, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"], description: "Two-piece tankini with ruched belly panel. Comfortable and stylish for all stages.", material: "85% Polyester, 15% Lycra", badge: "sale", featured: false },

  // Men's Swimwear
  { id: 10, name: "Pro Swim Jammer", price: 4800, salePrice: null, category: "men", subcategory: "Men's Swimwear", sizes: ["S","M","L","XL","2XL","3XL"], colors: ["Black","Navy","Red"], rating: 4.8, reviews: 234, stock: 70, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80", images: ["https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80"], description: "Competition-grade jammers with body-hugging compression fit. Reduces drag in water.", material: "78% Polyester, 22% Spandex", badge: "best-seller", featured: true },
  { id: 11, name: "Boardshorts Classic", price: 3500, salePrice: 2625, category: "men", subcategory: "Men's Swimwear", sizes: ["S","M","L","XL","2XL","3XL"], colors: ["Navy Print","Tropical","Solid Black"], rating: 4.6, reviews: 178, stock: 90, image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80", images: ["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80"], description: "Casual boardshorts with quick-dry technology. Side pockets with Velcro closure.", material: "100% Polyester Quick-Dry", badge: "sale", featured: true },
  { id: 12, name: "Sport Swim Trunks", price: 4200, salePrice: null, category: "men", subcategory: "Men's Swimwear", sizes: ["S","M","L","XL","2XL"], colors: ["Ocean Blue","Forest Green","Charcoal"], rating: 4.7, reviews: 156, stock: 60, image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80", images: ["https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80"], description: "Versatile swim trunks that go from pool to beach to street. Elastic waistband with drawstring.", material: "82% Nylon, 18% Spandex", badge: "new-arrivals", featured: false },

  // Boys Swimwear
  { id: 13, name: "Dino Splash Swim Shorts", price: 2200, salePrice: null, category: "kids", subcategory: "Boys Swimwear", sizes: ["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Dino Green","Blue","Red"], rating: 4.9, reviews: 312, stock: 100, image: "https://images.unsplash.com/photo-1576613109753-27804de2ceba?w=600&q=80", images: ["https://images.unsplash.com/photo-1576613109753-27804de2ceba?w=600&q=80"], description: "Fun dinosaur print swim shorts. UV50+ sun protection. Quick drying.", material: "100% Polyester UPF 50+", badge: "best-seller", featured: true },
  { id: 14, name: "Boys Performance Jammer", price: 2800, salePrice: 2100, category: "kids", subcategory: "Boys Swimsuits", sizes: ["6-7Y","8-9Y","10-11Y","12-13Y","14-15Y"], colors: ["Navy","Black","Blue"], rating: 4.8, reviews: 89, stock: 50, image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80", images: ["https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80"], description: "Training jammers for young swimmers. Chlorine resistant and long-lasting.", material: "80% Nylon, 20% Lycra Chlorine Resistant", badge: "sale", featured: false },
  { id: 15, name: "Ocean Adventure Wetsuit", price: 5500, salePrice: null, category: "kids", subcategory: "Boys Swimwear", sizes: ["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Blue/Black","Red/Black"], rating: 4.7, reviews: 67, stock: 30, image: "https://images.unsplash.com/photo-1599600893851-c4e6b3a7d09d?w=600&q=80", images: ["https://images.unsplash.com/photo-1599600893851-c4e6b3a7d09d?w=600&q=80"], description: "Full body wetsuit for young adventurers. 2mm neoprene for warmth.", material: "2mm Neoprene", badge: "new-arrivals", featured: false },

  // Girls Swimsuits
  { id: 16, name: "Mermaid Dream One-Piece", price: 2600, salePrice: null, category: "kids", subcategory: "Girls Swimsuits", sizes: ["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"], colors: ["Mermaid Blue","Coral Pink","Purple"], rating: 4.9, reviews: 445, stock: 120, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80"], description: "Magical mermaid scale print one-piece. UV protection built in for beach days.", material: "80% Nylon, 20% Spandex UPF 40+", badge: "best-seller", featured: true },
  { id: 17, name: "Rainbow Ruffle Bikini - Kids", price: 2400, salePrice: 1800, category: "kids", subcategory: "Girls Swimsuits", sizes: ["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], colors: ["Rainbow","Pink","Aqua"], rating: 4.8, reviews: 213, stock: 75, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80"], description: "Adorable ruffle bikini set for little ones. Adjustable straps grow with them.", material: "78% Polyester, 22% Spandex", badge: "sale", featured: false },

  // Accessories
  { id: 18, name: "UV Shield Sunglasses", price: 1800, salePrice: null, category: "accessories", subcategory: null, sizes: ["One Size"], colors: ["Black","Tortoise","Rose Gold"], rating: 4.7, reviews: 189, stock: 200, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"], description: "UV400 polarized sunglasses. Lightweight frame, perfect for beach and pool.", material: "TR90 Frame, Polarized Lenses", badge: "new-arrivals", featured: true },
  { id: 19, name: "Beach Mesh Tote Bag", price: 2200, salePrice: 1650, category: "accessories", subcategory: null, sizes: ["One Size"], colors: ["Natural","Navy","Blush"], rating: 4.6, reviews: 134, stock: 80, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80", images: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80"], description: "Spacious mesh tote with inner zip pocket. Wet-friendly material for beach days.", material: "100% Cotton Mesh", badge: "sale", featured: false },
  { id: 20, name: "Waterproof Cap", price: 1500, salePrice: null, category: "accessories", subcategory: null, sizes: ["S/M","L/XL"], colors: ["Black","Blue","Pink"], rating: 4.8, reviews: 267, stock: 150, image: "https://images.unsplash.com/photo-1560096271-c6f4512e3b71?w=600&q=80", images: ["https://images.unsplash.com/photo-1560096271-c6f4512e3b71?w=600&q=80"], description: "Silicone swim cap with anti-slip inner lining. Fits all hair types.", material: "100% Silicone", badge: "best-seller", featured: false },
  { id: 21, name: "Premium Swim Goggles", price: 2800, salePrice: 2100, category: "accessories", subcategory: null, sizes: ["Adult","Junior"], colors: ["Clear","Tinted","Mirror"], rating: 4.9, reviews: 356, stock: 120, image: "https://images.unsplash.com/photo-1542466086-8e0f0aa0e7a8?w=600&q=80", images: ["https://images.unsplash.com/photo-1542466086-8e0f0aa0e7a8?w=600&q=80"], description: "Anti-fog, UV protection swim goggles. Adjustable nose bridge and silicone seal.", material: "Polycarbonate Lens, Silicone Gasket", badge: "sale", featured: true },

  // All Sports
  { id: 22, name: "Triathlon Suit Women", price: 8500, salePrice: null, category: "all-sports", subcategory: null, sizes: ["XS","S","M","L","XL"], colors: ["Black/Neon","Blue/Silver"], rating: 4.9, reviews: 78, stock: 25, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80", images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80"], description: "Professional triathlon suit. Aerodynamic design, quick-dry fabric, minimal drag.", material: "85% Polyamide, 15% Elastane", badge: "new-arrivals", featured: true },
  { id: 23, name: "Open Water Wetsuit", price: 12500, salePrice: 9375, category: "all-sports", subcategory: null, sizes: ["XS","S","M","L","XL","2XL"], colors: ["Black/Yellow","Black/Blue"], rating: 4.8, reviews: 112, stock: 20, image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80", images: ["https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80"], description: "3mm neoprene full wetsuit for open water swimming and triathlon.", material: "3mm Yamamoto Neoprene", badge: "sale", featured: false },
];

const INITIAL_ORDERS = [
  { id: "ORD-001", user: "jane.doe@email.com", date: "2024-01-15", items: [{ productId: 1, qty: 2, size: "M", color: "Coral" }], total: 8400, status: "delivered", shipping: { name: "Jane Doe", address: "123 Beach Rd, Nairobi", phone: "+254712345678" } },
  { id: "ORD-002", user: "john.smith@email.com", date: "2024-01-18", items: [{ productId: 10, qty: 1, size: "L", color: "Black" }, { productId: 18, qty: 1, size: "One Size", color: "Black" }], total: 6600, status: "processing", shipping: { name: "John Smith", address: "456 Pool Lane, Mombasa", phone: "+254798765432" } },
  { id: "ORD-003", user: "mary.k@email.com", date: "2024-01-20", items: [{ productId: 5, qty: 1, size: "XL", color: "Navy" }], total: 5800, status: "shipped", shipping: { name: "Mary K", address: "789 Wave Ave, Kisumu", phone: "+254723456789" } },
];

// ─── CONTEXT ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

function useApp() { return useContext(AppContext); }

// ─── UTILS ──────────────────────────────────────────────────────────────────
const fmt = (n) => `KSh ${n.toLocaleString()}`;
const badge = (b) => ({ "new-arrivals": "#0ea5e9", "sale": "#ef4444", "best-seller": "#f59e0b", "personalize": "#8b5cf6" })[b] || null;
const badgeLabel = (b) => ({ "new-arrivals": "NEW", "sale": "SALE", "best-seller": "BEST SELLER" })[b] || "";

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function StarRating({ rating, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: 14 }}>★</span>
      ))}
      <span style={{ fontSize: 12, color: "#6b7280" }}>({count})</span>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const colors = { success: "#10b981", error: "#ef4444", info: "#0ea5e9" };
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, background: colors[type] || "#1f2937", color: "#fff", padding: "12px 20px", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.2)", zIndex: 9999, display: "flex", alignItems: "center", gap: 12, fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, animation: "slideUp 0.3s ease" }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>×</button>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const { addToCart, addToWishlist, wishlist } = useApp();
  const inWishlist = wishlist.some(w => w.id === product.id);
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "all 0.3s ease", cursor: "pointer", position: "relative" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
    >
      <div style={{ position: "relative", overflow: "hidden" }} onClick={() => onClick(product)}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: 260, objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = ""}
        />
        {product.badge && badge(product.badge) && (
          <div style={{ position: "absolute", top: 12, left: 12, background: badge(product.badge), color: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
            {badgeLabel(product.badge)}
            {product.badge === "sale" && discount > 0 && ` -${discount}%`}
          </div>
        )}
        <button onClick={e => { e.stopPropagation(); addToWishlist(product); }}
          style={{ position: "absolute", top: 12, right: 12, background: inWishlist ? "#ef4444" : "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.2s" }}>
          {inWishlist ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{product.subcategory || product.category}</p>
        <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: 1.3, cursor: "pointer" }} onClick={() => onClick(product)}>{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviews} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: product.salePrice ? "#ef4444" : "#111827" }}>{fmt(product.salePrice || product.price)}</span>
          {product.salePrice && <span style={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through" }}>{fmt(product.price)}</span>}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
          {product.colors.slice(0,3).map(c => (
            <span key={c} style={{ background: "#f3f4f6", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "#374151" }}>{c}</span>
          ))}
          {product.colors.length > 3 && <span style={{ background: "#f3f4f6", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "#374151" }}>+{product.colors.length - 3}</span>}
        </div>
        <button onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
          style={{ width: "100%", marginTop: 12, padding: "10px", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.target.style.opacity = "0.85"}
          onMouseLeave={e => e.target.style.opacity = "1"}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const { addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, maxWidth: 860, width: "100%", maxHeight: "90vh", overflow: "auto", display: "grid", gridTemplateColumns: "1fr 1fr" }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 0 0 20px" }} />
          {product.badge && badge(product.badge) && (
            <div style={{ position: "absolute", top: 16, left: 16, background: badge(product.badge), color: "#fff", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              {badgeLabel(product.badge)}{product.badge === "sale" && discount > 0 && ` -${discount}%`}
            </div>
          )}
        </div>
        <div style={{ padding: 32, overflowY: "auto" }}>
          <button onClick={onClose} style={{ float: "right", background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>×</button>
          <p style={{ color: "#9ca3af", textTransform: "uppercase", fontSize: 12, letterSpacing: 1, margin: "0 0 8px" }}>{product.subcategory || product.category}</p>
          <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, color: "#111827" }}>{product.name}</h2>
          <StarRating rating={product.rating} count={product.reviews} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: product.salePrice ? "#ef4444" : "#111827" }}>{fmt(product.salePrice || product.price)}</span>
            {product.salePrice && <><span style={{ color: "#9ca3af", textDecoration: "line-through", fontSize: 18 }}>{fmt(product.price)}</span><span style={{ background: "#fef2f2", color: "#ef4444", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>-{discount}%</span></>}
          </div>
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Color: <span style={{ fontWeight: 400 }}>{selectedColor}</span></p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: "6px 14px", borderRadius: 20, border: selectedColor === c ? "2px solid #0ea5e9" : "2px solid #e5e7eb", background: selectedColor === c ? "#eff6ff" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: selectedColor === c ? 600 : 400 }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Size: <span style={{ fontWeight: 400 }}>{selectedSize}</span></p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{ padding: "6px 14px", borderRadius: 8, border: selectedSize === s ? "2px solid #0ea5e9" : "2px solid #e5e7eb", background: selectedSize === s ? "#eff6ff" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: selectedSize === s ? 600 : 400 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "8px 14px", border: "none", background: "#f9fafb", cursor: "pointer", fontSize: 16 }}>−</button>
              <span style={{ padding: "8px 16px", fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ padding: "8px 14px", border: "none", background: "#f9fafb", cursor: "pointer", fontSize: 16 }}>+</button>
            </div>
            <button onClick={() => { addToCart(product, selectedSize, selectedColor, qty); onClose(); }}
              style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              🛒 Add to Cart
            </button>
          </div>
          <div style={{ marginTop: 24, borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
            <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #f3f4f6" }}>
              {["description","material","shipping"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontWeight: tab === t ? 700 : 400, color: tab === t ? "#0ea5e9" : "#6b7280", borderBottom: tab === t ? "3px solid #0ea5e9" : "3px solid transparent", fontSize: 13, textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 14, color: "#374151", lineHeight: 1.7 }}>
              {tab === "description" && <p>{product.description}</p>}
              {tab === "material" && <p><strong>Material:</strong> {product.material}</p>}
              {tab === "shipping" && <div><p>🚚 <strong>Standard Delivery:</strong> 3–5 business days (KSh 350)</p><p>⚡ <strong>Express Delivery:</strong> 1–2 business days (KSh 800)</p><p>🔄 <strong>Free Returns:</strong> Within 30 days</p></div>}
            </div>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 8, fontSize: 13, color: "#6b7280" }}>
            <span>✓ {product.stock} in stock</span>
            <span>•</span>
            <span>✓ Free returns</span>
            <span>•</span>
            <span>✓ Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ setPage, setCategory }) {
  const { cart, user, setUser, wishlist } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, zIndex: 500, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      {/* Top bar */}
      <div style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", textAlign: "center", padding: "8px 0", fontSize: 13, fontWeight: 500 }}>
        🌊 Free shipping on orders over KSh 5,000 | 30-Day Returns | Use code <strong>SWIM20</strong> for 20% off
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, minWidth: "fit-content" }}>
          <div style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🌊</div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: "#0284c7", letterSpacing: -0.5 }}>AquaVibe</div>
            <div style={{ fontSize: 9, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" }}>Swimwear & Sports</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, position: "relative", maxWidth: 480 }}>
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search swimwear, styles, sizes..." style={{ width: "100%", padding: "10px 16px 10px 42px", borderRadius: 12, border: "2px solid #f3f4f6", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "#f9fafb" }}
            onFocus={e => e.target.style.borderColor = "#0ea5e9"} onBlur={e => e.target.style.borderColor = "#f3f4f6"}
          />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
        </div>

        {/* Nav icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setPage("wishlist")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11, color: "#6b7280", position: "relative" }}>
            <span style={{ fontSize: 22 }}>🤍</span>
            {wishlist.length > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{wishlist.length}</span>}
          </button>
          <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 11, color: "#6b7280", position: "relative" }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#0ea5e9", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
          </button>
          {user ? (
            <div style={{ position: "relative" }}>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f3f4f6", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer" }}>
                <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #0ea5e9, #0284c7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>{user.name[0]}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{user.name.split(" ")[0]}</span>
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", right: 0, top: 48, background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", border: "1px solid #f3f4f6", minWidth: 180, overflow: "hidden", zIndex: 600 }}>
                  {[{ label: "My Account", icon: "👤", page: "account" }, { label: "My Orders", icon: "📦", page: "orders" }, { label: "Wishlist", icon: "🤍", page: "wishlist" }, ...(user.role === "admin" ? [{ label: "Admin Panel", icon: "⚙️", page: "admin" }] : [])].map(item => (
                    <button key={item.label} onClick={() => { setPage(item.page); setMenuOpen(false); }} style={{ width: "100%", padding: "12px 16px", border: "none", background: "none", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      {item.icon} {item.label}
                    </button>
                  ))}
                  <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #f3f4f6" }} />
                  <button onClick={() => { setUser(null); setMenuOpen(false); setPage("home"); }} style={{ width: "100%", padding: "12px 16px", border: "none", background: "none", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#ef4444" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setPage("login")} style={{ padding: "9px 20px", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Sign In</button>
          )}
        </div>
      </div>

      {/* Category Nav */}
      <nav style={{ borderTop: "1px solid #f3f4f6", overflowX: "auto" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => { setCategory(cat.id); setPage("shop"); }}
              style={{ padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#374151", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6, borderBottom: "3px solid transparent", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#0ea5e9"; e.currentTarget.style.borderBottomColor = "#0ea5e9"; e.currentTarget.style.background = "#f0f9ff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.background = "none"; }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

function HomePage({ setPage, setCategory, setSelectedProduct }) {
  const { products } = useApp();
  const featured = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.badge === "new-arrivals").slice(0, 4);
  const onSale = products.filter(p => p.badge === "sale").slice(0, 4);
  const bestSellers = products.filter(p => p.badge === "best-seller").slice(0, 4);

  const heroCategories = [
    { label: "Women's Swimwear", img: "https://images.unsplash.com/photo-1545236080-7ef3fdde76e0?w=400&q=80", cat: "women" },
    { label: "Men's Swimwear", img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80", cat: "men" },
    { label: "Kids' Swimwear", img: "https://images.unsplash.com/photo-1576613109753-27804de2ceba?w=400&q=80", cat: "kids" },
    { label: "Sports", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80", cat: "all-sports" },
    { label: "Accessories", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", cat: "accessories" },
    { label: "Bikinis", img: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&q=80", cat: "bikinis" },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90" alt="Beach" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
          <span style={{ background: "#0ea5e9", color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", display: "inline-block", width: "fit-content", marginBottom: 16 }}>Summer 2024 Collection</span>
          <h1 style={{ color: "#fff", fontSize: 56, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, fontFamily: "Sora, sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>Dive Into<br />Summer Style</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, margin: "0 0 32px", maxWidth: 440 }}>Discover premium swimwear for every body, every occasion, every adventure.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => { setCategory(null); setPage("shop"); }} style={{ padding: "14px 32px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Shop Collection</button>
            <button onClick={() => { setCategory("sale"); setPage("shop"); }} style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", backdropFilter: "blur(8px)" }}>View Sale 🏷️</button>
          </div>
        </div>
      </div>

      {/* USPs */}
      <div style={{ background: "#f0f9ff", borderBottom: "1px solid #e0f2fe" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[["🚚","Free Shipping","On orders over KSh 5,000"],["🔄","Easy Returns","30-day hassle-free returns"],["🛡️","Secure Payment","100% secure checkout"],["📏","Size Guide","Find your perfect fit"]].map(([icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px", borderRight: "1px solid #bae6fd" }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div><div style={{ fontWeight: 700, fontSize: 14, color: "#0c4a6e" }}>{title}</div><div style={{ fontSize: 12, color: "#0369a1" }}>{sub}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        {/* Category Grid */}
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>Shop by Category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 56 }}>
          {heroCategories.map(hc => (
            <div key={hc.cat} onClick={() => { setCategory(hc.cat); setPage("shop"); }} style={{ cursor: "pointer", borderRadius: 16, overflow: "hidden", position: "relative", aspectRatio: "1", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
              onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.08)"}
              onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = ""}>
              <img src={hc.img} alt={hc.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
              <p style={{ position: "absolute", bottom: 10, left: 0, right: 0, color: "#fff", fontWeight: 700, fontSize: 13, textAlign: "center", padding: "0 6px", lineHeight: 1.2 }}>{hc.label}</p>
            </div>
          ))}
        </div>

        {/* Featured */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0, fontFamily: "Sora, sans-serif" }}>⭐ Featured</h2>
            <button onClick={() => { setCategory(null); setPage("shop"); }} style={{ color: "#0ea5e9", background: "none", border: "1px solid #0ea5e9", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          </div>
        </div>

        {/* Promo Banner */}
        <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", marginBottom: 56, height: 260 }}>
          <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80" alt="Beach promo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span style={{ color: "#fbbf24", fontSize: 14, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Limited Time Offer</span>
            <h2 style={{ color: "#fff", fontSize: 42, fontWeight: 900, margin: 0, fontFamily: "Sora, sans-serif", textAlign: "center" }}>Summer Sale — Up to 30% Off</h2>
            <button onClick={() => { setCategory("sale"); setPage("shop"); }} style={{ padding: "14px 36px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Shop Sale 🏷️</button>
          </div>
        </div>

        {/* New Arrivals */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0, fontFamily: "Sora, sans-serif" }}>✨ New Arrivals</h2>
            <button onClick={() => { setCategory("new-arrivals"); setPage("shop"); }} style={{ color: "#0ea5e9", background: "none", border: "1px solid #0ea5e9", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          </div>
        </div>

        {/* Best Sellers */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0, fontFamily: "Sora, sans-serif" }}>🔥 Best Sellers</h2>
            <button onClick={() => { setCategory(null); setPage("shop"); }} style={{ color: "#0ea5e9", background: "none", border: "1px solid #0ea5e9", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {bestSellers.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          </div>
        </div>

        {/* On Sale */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0, fontFamily: "Sora, sans-serif" }}>🏷️ On Sale</h2>
            <button onClick={() => { setCategory("sale"); setPage("shop"); }} style={{ color: "#ef4444", background: "none", border: "1px solid #ef4444", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {onSale.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          </div>
        </div>

        {/* Instagram / Social */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#0ea5e9", fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" }}>Follow Us</p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", margin: "8px 0 24px", fontFamily: "Sora, sans-serif" }}>@AquaVibe on Instagram</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
            {["photo-1570976447640-ac859083963f","photo-1619447823196-44d23fc4cc50","photo-1531983412531-1f49a365ffed","photo-1545236080-7ef3fdde76e0","photo-1568702846914-96b305d2aaeb","photo-1576613109753-27804de2ceba"].map((ph, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", cursor: "pointer" }}>
                <img src={`https://images.unsplash.com/${ph}?w=300&q=80`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.target.style.transform = ""} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#0c1929", color: "#94a3b8", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ background: "#0ea5e9", color: "#fff", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌊</div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>AquaVibe</span>
            </div>
            <p style={{ lineHeight: 1.7, fontSize: 14 }}>Kenya's premier swimwear destination. From the coast to the pool, we have your perfect swim style.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["Facebook","Instagram","Twitter","TikTok"].map(s => (
                <button key={s} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>{s}</button>
              ))}
            </div>
          </div>
          {[["Shop",["New Arrivals","Sale","Bikinis","Women's","Men's","Kids'","Accessories"]],["Help",["FAQ","Shipping","Returns","Size Guide","Contact Us"]],["Company",["About Us","Careers","Press","Privacy Policy","Terms"]]].map(([title, links]) => (
            <div key={title}>
              <h4 style={{ color: "#fff", marginBottom: 16, fontSize: 15 }}>{title}</h4>
              {links.map(l => <p key={l} style={{ margin: "8px 0", fontSize: 14, cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
          <span>© 2024 AquaVibe. All rights reserved.</span>
          <div style={{ display: "flex", gap: 12 }}>
            {["💳 Visa","💳 Mastercard","📱 M-Pesa","🏧 Airtel Money"].map(p => <span key={p} style={{ background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 6, fontSize: 12 }}>{p}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

function ShopPage({ activeCategory, setSelectedProduct }) {
  const { products } = useApp();
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 20000, sizes: [], colors: [], subcategory: null });

  const getFiltered = () => {
    let list = [...products];
    if (activeCategory === "new-arrivals") list = list.filter(p => p.badge === "new-arrivals");
    else if (activeCategory === "sale") list = list.filter(p => p.badge === "sale");
    else if (activeCategory) list = list.filter(p => p.category === activeCategory);
    list = list.filter(p => (p.salePrice || p.price) >= filters.minPrice && (p.salePrice || p.price) <= filters.maxPrice);
    if (filters.subcategory) list = list.filter(p => p.subcategory === filters.subcategory);
    if (sort === "price-asc") list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    else if (sort === "price-desc") list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") list.sort((a, b) => (b.badge === "new-arrivals" ? 1 : -1));
    return list;
  };

  const filtered = getFiltered();
  const subs = activeCategory && SUBCATEGORIES[activeCategory];
  const catLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || "All Products";

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "240px 1fr", gap: 32 }}>
      {/* Sidebar filters */}
      <aside>
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "sticky", top: 140 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#111827" }}>🔧 Filters</h3>
          
          {subs && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 10 }}>Category</p>
              <button onClick={() => setFilters(f => ({ ...f, subcategory: null }))} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 12px", border: "none", borderRadius: 8, background: !filters.subcategory ? "#eff6ff" : "none", color: !filters.subcategory ? "#0ea5e9" : "#374151", cursor: "pointer", fontSize: 13, fontWeight: !filters.subcategory ? 700 : 400, marginBottom: 4 }}>All</button>
              {subs.map(s => (
                <button key={s} onClick={() => setFilters(f => ({ ...f, subcategory: f.subcategory === s ? null : s }))} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 12px", border: "none", borderRadius: 8, background: filters.subcategory === s ? "#eff6ff" : "none", color: filters.subcategory === s ? "#0ea5e9" : "#374151", cursor: "pointer", fontSize: 13, fontWeight: filters.subcategory === s ? 700 : 400, marginBottom: 4 }}>{s}</button>
              ))}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 10 }}>Price Range</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))} style={{ width: "50%", padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13 }} />
              <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))} style={{ width: "50%", padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13 }} />
            </div>
          </div>

          <button onClick={() => setFilters({ minPrice: 0, maxPrice: 20000, sizes: [], colors: [], subcategory: null })} style={{ width: "100%", padding: "8px", background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#374151", fontWeight: 600 }}>Clear Filters</button>
        </div>
      </aside>

      {/* Products */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#111827", fontFamily: "Sora, sans-serif" }}>{catLabel}</h1>
            <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: 14 }}>{filtered.length} products</p>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, cursor: "pointer" }}>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 60 }}>🏊</div>
            <p style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>No products found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function CartPage({ setPage }) {
  const { cart, setCart, addToast } = useApp();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((a, b) => a + (b.salePrice || b.price) * b.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SWIM20") { setDiscount(Math.round(subtotal * 0.2)); setCouponApplied(true); addToast("Coupon applied! 20% off", "success"); }
    else addToast("Invalid coupon code", "error");
  };

  if (cart.length === 0) return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 80 }}>🛒</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginTop: 16 }}>Your cart is empty</h2>
      <p style={{ color: "#6b7280" }}>Looks like you haven't added anything yet.</p>
      <button onClick={() => setPage("shop")} style={{ marginTop: 24, padding: "14px 36px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Continue Shopping</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 24px", fontFamily: "Sora, sans-serif" }}>Shopping Cart ({cart.reduce((a,b)=>a+b.qty,0)} items)</h1>
        {cart.map(item => (
          <div key={`${item.id}-${item.size}-${item.color}`} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 16, display: "flex", gap: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 10 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600 }}>{item.name}</h3>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 8px" }}>Size: {item.size} | Color: {item.color}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
                  <button onClick={() => { if (item.qty === 1) setCart(c => c.filter(i => !(i.id === item.id && i.size === item.size && i.color === item.color))); else setCart(c => c.map(i => i.id === item.id && i.size === item.size && i.color === item.color ? { ...i, qty: i.qty - 1 } : i)); }} style={{ border: "none", background: "#f9fafb", padding: "6px 12px", cursor: "pointer", fontSize: 16 }}>−</button>
                  <span style={{ padding: "6px 14px", fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => setCart(c => c.map(i => i.id === item.id && i.size === item.size && i.color === item.color ? { ...i, qty: i.qty + 1 } : i))} style={{ border: "none", background: "#f9fafb", padding: "6px 12px", cursor: "pointer", fontSize: 16 }}>+</button>
                </div>
                <span style={{ fontWeight: 700, color: "#111827", fontSize: 18 }}>{fmt((item.salePrice || item.price) * item.qty)}</span>
                <button onClick={() => setCart(c => c.filter(i => !(i.id === item.id && i.size === item.size && i.color === item.color)))} style={{ background: "#fef2f2", border: "none", color: "#ef4444", padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontSize: 18 }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", position: "sticky", top: 140 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>Order Summary</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#10b981" }}><span>Discount</span><span>-{fmt(discount)}</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span>Shipping</span><span>{shipping === 0 ? <span style={{ color: "#10b981" }}>FREE</span> : fmt(shipping)}</span></div>
            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{fmt(total)}</span></div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code (SWIM20)" style={{ flex: 1, padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: 13 }} disabled={couponApplied} />
            <button onClick={applyCoupon} disabled={couponApplied} style={{ padding: "10px 16px", background: couponApplied ? "#10b981" : "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{couponApplied ? "✓" : "Apply"}</button>
          </div>
          <button onClick={() => setPage("checkout")} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 12 }}>Proceed to Checkout →</button>
          <button onClick={() => setPage("shop")} style={{ width: "100%", padding: "12px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Continue Shopping</button>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {["💳 Visa","💳 Mastercard","📱 M-Pesa","🏧 Airtel Money"].map(p => <span key={p} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 6, fontSize: 11, color: "#6b7280" }}>{p}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ setPage }) {
  const { cart, setCart, user, orders, setOrders, addToast } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "", city: "", county: "", method: "mpesa" });
  const subtotal = cart.reduce((a, b) => a + (b.salePrice || b.price) * b.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 350;

  const placeOrder = () => {
    const order = {
      id: `ORD-${Date.now()}`,
      user: form.email,
      date: new Date().toISOString().split("T")[0],
      items: cart.map(i => ({ productId: i.id, qty: i.qty, size: i.size, color: i.color })),
      total: subtotal + shipping,
      status: "processing",
      shipping: { name: form.name, address: `${form.address}, ${form.city}, ${form.county}`, phone: form.phone }
    };
    setOrders([...orders, order]);
    setCart([]);
    addToast("Order placed successfully! 🎉", "success");
    setStep(3);
  };

  if (step === 3) return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 80 }}>🎉</div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginTop: 16 }}>Order Placed!</h2>
      <p style={{ color: "#6b7280", fontSize: 16 }}>Thank you for shopping with AquaVibe. You'll receive a confirmation email shortly.</p>
      <button onClick={() => setPage("home")} style={{ marginTop: 24, padding: "14px 36px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Back to Home</button>
    </div>
  );

  const inp = (label, field, type = "text") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>{label}</label>
      <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontSize: 14, boxSizing: "border-box" }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 350px", gap: 32 }}>
      <div>
        {/* Steps */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
          {["Shipping","Payment","Confirm"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= i+1 ? "#0ea5e9" : "#e5e7eb", color: step >= i+1 ? "#fff" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{i+1}</div>
                <span style={{ fontWeight: step === i+1 ? 700 : 400, color: step === i+1 ? "#0ea5e9" : "#9ca3af", fontSize: 14 }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 40, height: 2, background: step > i+1 ? "#0ea5e9" : "#e5e7eb", margin: "0 8px" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ margin: "0 0 20px", fontWeight: 700 }}>Shipping Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {inp("Full Name", "name")}
              {inp("Email", "email", "email")}
            </div>
            {inp("Phone Number", "phone", "tel")}
            {inp("Street Address", "address")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {inp("City", "city")}
              {inp("County", "county")}
            </div>
            <button onClick={() => setStep(2)} style={{ width: "100%", padding: "14px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 8 }}>Continue to Payment →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <h2 style={{ margin: "0 0 20px", fontWeight: 700 }}>Payment Method</h2>
            {[["mpesa","📱 M-Pesa"],["airtel","🏧 Airtel Money"],["card","💳 Credit/Debit Card"],["cash","💵 Cash on Delivery"]].map(([val, label]) => (
              <label key={val} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, border: `2px solid ${form.method === val ? "#0ea5e9" : "#e5e7eb"}`, borderRadius: 12, marginBottom: 12, cursor: "pointer", background: form.method === val ? "#f0f9ff" : "#fff" }}>
                <input type="radio" value={val} checked={form.method === val} onChange={() => setForm(f => ({ ...f, method: val }))} />
                <span style={{ fontWeight: 600 }}>{label}</span>
              </label>
            ))}
            {form.method === "mpesa" && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: 14 }}>📱 You will receive an M-Pesa prompt on your phone to complete payment for <strong>KSh {(subtotal + shipping).toLocaleString()}</strong></p>
              </div>
            )}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>← Back</button>
              <button onClick={placeOrder} style={{ flex: 2, padding: "14px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Place Order 🎉</button>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", height: "fit-content", position: "sticky", top: 140 }}>
        <h3 style={{ margin: "0 0 16px", fontWeight: 700 }}>Order Summary</h3>
        {cart.map(item => (
          <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f3f4f6" }}>
            <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{item.name}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>x{item.qty} · {item.size}</p>
            </div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{fmt((item.salePrice || item.price) * item.qty)}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}><span>Shipping</span><span>{shipping === 0 ? "FREE" : fmt(shipping)}</span></div>
        <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "12px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{fmt(subtotal + shipping)}</span></div>
      </div>
    </div>
  );
}

function LoginPage({ setPage }) {
  const { setUser, addToast } = useApp();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const USERS = [
    { email: "admin@aquavibe.co.ke", password: "admin123", name: "Admin User", role: "admin" },
    { email: "jane@example.com", password: "pass123", name: "Jane Doe", role: "user" },
  ];

  const handleSubmit = () => {
    if (mode === "login") {
      const found = USERS.find(u => u.email === form.email && u.password === form.password);
      if (found) { setUser(found); addToast(`Welcome back, ${found.name}!`, "success"); setPage("home"); }
      else addToast("Invalid email or password", "error");
    } else {
      if (!form.name || !form.email || !form.password) { addToast("Please fill all fields", "error"); return; }
      setUser({ email: form.email, name: form.name, role: "user" });
      addToast("Account created! Welcome!", "success");
      setPage("home");
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 180px)", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: 40, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌊</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: "8px 0 4px", fontFamily: "Sora, sans-serif" }}>AquaVibe</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{mode === "login" ? "Sign in to your account" : "Create a new account"}</p>
        </div>
        <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["login","signup"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: 10, background: mode === m ? "#fff" : "none", color: mode === m ? "#0ea5e9" : "#6b7280", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }}>{m === "login" ? "Sign In" : "Sign Up"}</button>
          ))}
        </div>
        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>Full Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Doe" style={{ width: "100%", padding: "12px 16px", border: "2px solid #e5e7eb", borderRadius: 12, fontSize: 14, boxSizing: "border-box" }} />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>Email</label>
          <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "12px 16px", border: "2px solid #e5e7eb", borderRadius: 12, fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 6 }}>Password</label>
          <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" type="password" style={{ width: "100%", padding: "12px 16px", border: "2px solid #e5e7eb", borderRadius: 12, fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <button onClick={handleSubmit} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </button>
        {mode === "login" && (
          <div style={{ marginTop: 20, padding: 14, background: "#f0f9ff", borderRadius: 10, fontSize: 13, color: "#0369a1" }}>
            <strong>Demo accounts:</strong><br />
            👤 User: jane@example.com / pass123<br />
            ⚙️ Admin: admin@aquavibe.co.ke / admin123
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistPage({ setSelectedProduct }) {
  const { wishlist, setWishlist, addToCart } = useApp();
  if (wishlist.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 64 }}>🤍</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginTop: 16 }}>Your Wishlist is Empty</h2>
    </div>
  );
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>My Wishlist ❤️ ({wishlist.length})</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {wishlist.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
      </div>
    </div>
  );
}

function AccountPage({ setPage }) {
  const { user, orders } = useApp();
  const userOrders = orders.filter(o => o.user === user?.email);
  const statusColor = { delivered: "#10b981", shipped: "#0ea5e9", processing: "#f59e0b", cancelled: "#ef4444" };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>My Account</h1>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", height: "fit-content" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #0ea5e9, #0284c7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 28, margin: "0 auto 12px" }}>{user?.name[0]}</div>
            <h3 style={{ margin: "0 0 4px", fontWeight: 700 }}>{user?.name}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{user?.email}</p>
            {user?.role === "admin" && <span style={{ background: "#fef3c7", color: "#d97706", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Admin</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: 12, background: "#f0f9ff", borderRadius: 10, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: "#374151" }}>Orders</span>
              <span style={{ fontWeight: 700, color: "#0ea5e9" }}>{userOrders.length}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Order History</h2>
          {userOrders.length === 0 ? <p style={{ color: "#9ca3af" }}>No orders yet.</p> : userOrders.map(o => (
            <div key={o.id} style={{ background: "#fff", borderRadius: 14, padding: 20, marginBottom: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{o.id}</span>
                  <span style={{ color: "#9ca3af", fontSize: 13, marginLeft: 12 }}>{o.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ background: `${statusColor[o.status]}20`, color: statusColor[o.status], padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>{o.status}</span>
                  <span style={{ fontWeight: 700 }}>{fmt(o.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────

function AdminPanel() {
  const { products, setProducts, orders, setOrders } = useApp();
  const [tab, setTab] = useState("dashboard");
  const [editProduct, setEditProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", salePrice: "", category: "bikinis", subcategory: "", sizes: "XS,S,M,L,XL", colors: "Black,White", stock: 10, description: "", material: "", badge: "", image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80", featured: false });

  const totalRevenue = orders.reduce((a, b) => a + b.total, 0);
  const totalOrders = orders.length;

  const saveProduct = () => {
    const p = { ...newProduct, id: editProduct ? editProduct.id : Date.now(), price: Number(newProduct.price), salePrice: newProduct.salePrice ? Number(newProduct.salePrice) : null, sizes: typeof newProduct.sizes === "string" ? newProduct.sizes.split(",").map(s => s.trim()) : newProduct.sizes, colors: typeof newProduct.colors === "string" ? newProduct.colors.split(",").map(c => c.trim()) : newProduct.colors, stock: Number(newProduct.stock), rating: editProduct?.rating || 4.5, reviews: editProduct?.reviews || 0, images: [newProduct.image] };
    if (editProduct) setProducts(ps => ps.map(pp => pp.id === editProduct.id ? p : pp));
    else setProducts(ps => [...ps, p]);
    setShowProductForm(false); setEditProduct(null);
    setNewProduct({ name: "", price: "", salePrice: "", category: "bikinis", subcategory: "", sizes: "XS,S,M,L,XL", colors: "Black,White", stock: 10, description: "", material: "", badge: "", image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80", featured: false });
  };

  const inp = (label, field, type = "text") => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#374151", marginBottom: 5 }}>{label}</label>
      <input type={type} value={newProduct[field]} onChange={e => setNewProduct(f => ({ ...f, [field]: type === "checkbox" ? e.target.checked : e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "2px solid #e5e7eb", borderRadius: 9, fontSize: 13, boxSizing: "border-box" }} />
    </div>
  );

  const statusColor = { delivered: "#10b981", shipped: "#0ea5e9", processing: "#f59e0b", cancelled: "#ef4444" };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 140px)" }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: "#0c1929", color: "#94a3b8", display: "flex", flexDirection: "column", padding: "24px 0" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: 0 }}>⚙️ Admin Panel</p>
        </div>
        {[["dashboard","📊","Dashboard"],["products","📦","Products"],["orders","🛒","Orders"],["categories","🏷️","Categories"]].map(([t, icon, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "13px 20px", border: "none", background: tab === t ? "rgba(14,165,233,0.15)" : "none", color: tab === t ? "#0ea5e9" : "#94a3b8", textAlign: "left", cursor: "pointer", borderLeft: `3px solid ${tab === t ? "#0ea5e9" : "transparent"}`, display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: tab === t ? 700 : 400 }}>
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 32, background: "#f8fafc", overflowY: "auto" }}>
        {tab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>Dashboard</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {[[`KSh ${totalRevenue.toLocaleString()}`, "Total Revenue", "💰", "#0ea5e9"],[totalOrders, "Total Orders", "📦", "#8b5cf6"],[products.length, "Products", "👙", "#10b981"],[orders.filter(o => o.status === "processing").length, "Pending Orders", "⏳", "#f59e0b"]].map(([val, label, icon, color]) => (
                <div key={label} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#111827" }}>{val}</p>
                      <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{label}</p>
                    </div>
                    <span style={{ fontSize: 32 }}>{icon}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 18 }}>Recent Orders</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                    {["Order ID","Customer","Date","Total","Status"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(-5).reverse().map(o => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                      <td style={{ padding: "12px", fontSize: 13, fontWeight: 600 }}>{o.id}</td>
                      <td style={{ padding: "12px", fontSize: 13 }}>{o.user}</td>
                      <td style={{ padding: "12px", fontSize: 13, color: "#6b7280" }}>{o.date}</td>
                      <td style={{ padding: "12px", fontSize: 13, fontWeight: 700 }}>{fmt(o.total)}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ background: `${statusColor[o.status]}20`, color: statusColor[o.status], padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "capitalize" }}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0, fontFamily: "Sora, sans-serif" }}>Products ({products.length})</h1>
              <button onClick={() => { setEditProduct(null); setShowProductForm(true); }} style={{ padding: "10px 20px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>+ Add Product</button>
            </div>

            {showProductForm && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 20px", fontWeight: 700 }}>{editProduct ? "Edit Product" : "Add New Product"}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  {inp("Product Name", "name")}
                  {inp("Price (KSh)", "price", "number")}
                  {inp("Sale Price (KSh, optional)", "salePrice", "number")}
                  {inp("Stock", "stock", "number")}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#374151", marginBottom: 5 }}>Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct(f => ({ ...f, category: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "2px solid #e5e7eb", borderRadius: 9, fontSize: 13 }}>
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 12, color: "#374151", marginBottom: 5 }}>Badge</label>
                    <select value={newProduct.badge} onChange={e => setNewProduct(f => ({ ...f, badge: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "2px solid #e5e7eb", borderRadius: 9, fontSize: 13 }}>
                      <option value="">None</option>
                      <option value="new-arrivals">New Arrivals</option>
                      <option value="sale">Sale</option>
                      <option value="best-seller">Best Seller</option>
                    </select>
                  </div>
                </div>
                {inp("Sizes (comma-separated)", "sizes")}
                {inp("Colors (comma-separated)", "colors")}
                {inp("Image URL", "image")}
                {inp("Description", "description")}
                {inp("Material", "material")}
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={saveProduct} style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Save Product</button>
                  <button onClick={() => { setShowProductForm(false); setEditProduct(null); }} style={{ padding: "10px 20px", background: "#f3f4f6", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #f3f4f6" }}>
                    {["Product","Category","Price","Stock","Badge","Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                      <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>{p.subcategory || ""}</p>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, textTransform: "capitalize" }}>{p.category}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13 }}>{p.salePrice ? <><span style={{ color: "#ef4444", fontWeight: 700 }}>{fmt(p.salePrice)}</span> <span style={{ color: "#9ca3af", textDecoration: "line-through", fontSize: 11 }}>{fmt(p.price)}</span></> : fmt(p.price)}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13 }}><span style={{ color: p.stock < 20 ? "#ef4444" : "#10b981", fontWeight: 600 }}>{p.stock}</span></td>
                      <td style={{ padding: "12px 16px" }}>{p.badge && <span style={{ background: `${badge(p.badge)}20`, color: badge(p.badge), padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{badgeLabel(p.badge)}</span>}</td>
                      <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                        <button onClick={() => { setEditProduct(p); setNewProduct({ ...p, sizes: p.sizes.join(","), colors: p.colors.join(","), salePrice: p.salePrice || "" }); setShowProductForm(true); }} style={{ padding: "5px 12px", background: "#eff6ff", color: "#0ea5e9", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Edit</button>
                        <button onClick={() => setProducts(ps => ps.filter(pp => pp.id !== p.id))} style={{ padding: "5px 12px", background: "#fef2f2", color: "#ef4444", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>Orders</h1>
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "2px solid #f3f4f6" }}>
                    {["Order ID","Customer","Date","Items","Total","Status","Action"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                      <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: 14 }}>{o.id}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13 }}>{o.user}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#6b7280" }}>{o.date}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13 }}>{o.items.reduce((a, b) => a + b.qty, 0)} items</td>
                      <td style={{ padding: "14px 16px", fontWeight: 700 }}>{fmt(o.total)}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <select value={o.status} onChange={e => setOrders(os => os.map(oo => oo.id === o.id ? { ...oo, status: e.target.value } : oo))} style={{ padding: "5px 10px", border: `2px solid ${statusColor[o.status]}`, borderRadius: 8, color: statusColor[o.status], background: `${statusColor[o.status]}15`, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                          {["processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button style={{ padding: "5px 12px", background: "#f3f4f6", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 13 }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 24, fontFamily: "Sora, sans-serif" }}>Categories</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {CATEGORIES.map(cat => {
                const count = products.filter(p => p.category === cat.id || (cat.id === "new-arrivals" && p.badge === "new-arrivals") || (cat.id === "sale" && p.badge === "sale")).length;
                return (
                  <div key={cat.id} style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 36 }}>{cat.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{cat.label}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>{count} products</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 32, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 18 }}>Subcategories</h2>
              {Object.entries(SUBCATEGORIES).map(([cat, subs]) => (
                <div key={cat} style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, color: "#0ea5e9", textTransform: "capitalize", marginBottom: 8 }}>{cat}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {subs.map(s => <span key={s} style={{ background: "#f0f9ff", color: "#0284c7", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
  };

  const removeToast = (id) => setToasts(t => t.filter(tt => tt.id !== id));

  const addToCart = (product, size, color, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size && i.color === color);
      if (existing) return prev.map(i => i.id === product.id && i.size === size && i.color === color ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, size, color, qty }];
    });
    addToast(`${product.name} added to cart!`, "success");
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(w => w.id === product.id)) { addToast("Removed from wishlist", "info"); return prev.filter(w => w.id !== product.id); }
      addToast("Added to wishlist ❤️", "success");
      return [...prev, product];
    });
  };

  const setCategory = (cat) => { setActiveCategory(cat); };

  const handleSetPage = (p) => {
    if (p !== "login" && p !== "home" && !user && (p === "checkout" || p === "account" || p === "admin")) { setPage("login"); return; }
    if (p === "admin" && user?.role !== "admin") { addToast("Admin access required", "error"); return; }
    setPage(p);
  };

  const ctx = { cart, setCart, wishlist, setWishlist, user, setUser, products, setProducts, orders, setOrders, addToCart, addToWishlist, addToast };

  return (
    <AppContext.Provider value={ctx}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body { margin: 0; background: #f8fafc; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      {page !== "admin" && <Header setPage={handleSetPage} setCategory={setCategory} />}

      <main>
        {page === "home" && <HomePage setPage={handleSetPage} setCategory={setCategory} setSelectedProduct={setSelectedProduct} />}
        {page === "shop" && <ShopPage activeCategory={activeCategory} setSelectedProduct={setSelectedProduct} />}
        {page === "cart" && <CartPage setPage={handleSetPage} />}
        {page === "checkout" && <CheckoutPage setPage={handleSetPage} />}
        {page === "login" && <LoginPage setPage={handleSetPage} />}
        {page === "wishlist" && <WishlistPage setSelectedProduct={setSelectedProduct} />}
        {page === "account" && user && <AccountPage setPage={handleSetPage} />}
        {page === "orders" && user && <AccountPage setPage={handleSetPage} />}
        {page === "admin" && user?.role === "admin" && <AdminPanel />}
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 9999 }}>
        {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />)}
      </div>
    </AppContext.Provider>
  );
}
