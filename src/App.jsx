import { useState, useEffect, useRef } from "react";

// ── Tailwind CDN is loaded externally ──────────────────────────────────────
// Google Fonts: Playfair Display + DM Sans

const menuData = {
  "Milk Chai's": [
    { name: "Classic Dum Chai", price: 20, desc: "Premium tea leaves and silky milk — unparalleled satisfaction in every sip." },
    { name: "Ginger Tea", price: null, desc: "Robust Indian spices and creamy milk delivering pure bliss in every warm cup." },
    { name: "Spice Masala Chai", price: null, desc: "A symphony of rich spices and robust tea creating an invigorating sensation." },
    { name: "Elaichi Chai", price: null, desc: "Fragrant cardamom and robust milk chai enchanting your senses with every sip." },
    { name: "Bombay Cutting Chai", price: null, desc: "Bold and flavorful — captures the vibrant spirit of Mumbai." },
    { name: "Gulkand Chai", price: null, desc: "Floral rose-infused gulkand meets the richness of milk chai for pure indulgence." },
    { name: "Saffroni Swayed Chai", price: null, desc: "Aromatic saffron meets a perfect blend of tea for opulent, royal indulgence." },
  ],
  "Black Tea / Chai": [
    { name: "Kattan Chai", price: null, desc: "A dark, intense brew enjoyed without milk — bold and pure." },
    { name: "Lemon Chia Chai", price: null, desc: "Zesty tangy lemon with chia seeds in a revitalizing, refreshing brew." },
    { name: "Lemon Ginger Chai", price: null, desc: "Vibrant lemon and spicy ginger — energizing and aromatic in every sip." },
  ],
  "Coffee": [
    { name: "Filter Coffee", price: null, desc: "Traditional Chennai Filter Coffee — rich, aromatic, authentic." },
    { name: "Black Coffee", price: null, desc: "Pure, robust flavour crafted to perfection for a bold experience." },
    { name: "Chukku Kaapi with Milk", price: null, desc: "Freshly brewed coffee and warming spices for a comforting revitalising sip." },
    { name: "Chocolate Coffee", price: null, desc: "Rich coffee meets decadent chocolate for a creamy, delightful treat." },
  ],
  "Cold Drinks": [
    { name: "Cold Badam Milk", price: null, desc: "Chilled, creamy almond goodness with subtle sweetness — perfect cool-down." },
    { name: "Cold Rose Milk", price: null, desc: "Refreshing creamy milk and fragrant rose essence for a floral delight." },
    { name: "Cold Coffee", price: null, desc: "Smooth, chilled brew perfectly blended for a refreshing experience." },
    { name: "Cold Milo", price: null, desc: "Rich, creamy, chocolaty Milo topped with extra Milo for ultimate indulgence." },
  ],
  "Hot Drinks": [
    { name: "Poondu Milk Hot", price: null, desc: "Creamy milk and savory garlic for a soothing, healthy and unique warm drink." },
    { name: "Hot Chocolate", price: null, desc: "Velvety chocolate and warm milk — the ultimate cozy treat." },
    { name: "Hot Milo", price: null, desc: "Warm, malty Milo for a comforting and familiar hot beverage." },
    { name: "Hot Milk", price: null, desc: "Simple, warm, creamy milk that soothes and satisfies with every sip." },
  ],
  "Buns & Pastries": [
    { name: "Bun Butter Jam", price: null, desc: "Generously spread with creamy butter and sweet, luscious jam — timeless comfort." },
    { name: "Bun Nutella", price: null, desc: "Soft bun with creamy Nutella and rich butter — heavenly indulgence." },
    { name: "Malai Bun", price: null, desc: "Soft, fluffy bun filled with rich, smooth malai for a divine treat." },
  ],
  "Savoury Snacks": [
    { name: "Samosa (4 pcs)", price: null, desc: "Crispy pastry stuffed with spiced, savory potatoes — a beloved classic." },
    { name: "Veg Puff", price: null, desc: "Flaky pastry filled with a savory blend of fresh vegetables and aromatic spices." },
    { name: "Paneer Puff", price: null, desc: "Flaky pastry filled with flavorful, spiced paneer — satisfying and savory." },
  ],
  "Maggi": [
    { name: "Classic Maggi", price: null, desc: "Comforting instant noodles with rich, savory seasoning for a quick satisfying meal." },
    { name: "Chilli Cheese Maggi", price: null, desc: "Fiery noodles topped with melted cheese — bold, spicy comfort food." },
  ],
  "Biscuits & Rusks": [
    { name: "Osmania Biscuits (6 nos)", price: null, desc: "Famous crispy-sweet biscuits — the perfect chai companion." },
    { name: "Peanut Biscuits (6 nos)", price: null, desc: "Crunchy delight packed with rich, nutty flavour." },
    { name: "Chocolate Biscuits (6 nos)", price: null, desc: "Crispy chocolate biscuits — rich chocolatey flavour in every bite." },
    { name: "Fruit Biscuits (6 nos)", price: null, desc: "Crispy texture with fruity sweetness — packed with bits of real fruit." },
    { name: "Fine Rusk (6 nos)", price: null, desc: "Golden, light and airy rusk — the ideal companion for chai or coffee." },
    { name: "Tea Cake", price: null, desc: "Moist, tender cake with rich buttery flavour — perfect with chai." },
  ],
  "Momos": [
    { name: "Veg Momo (6 nos)", price: null, desc: "Tender steamed dumplings filled with savory fresh vegetables and aromatic spices." },
    { name: "Corn Cheese Momo (6 nos)", price: null, desc: "Creamy sweet corn and melted cheese — indulgent steamed dumplings." },
    { name: "Paneer Momo (6 nos)", price: null, desc: "Delicately steamed dumplings filled with spiced, creamy paneer." },
  ],
};

const categoryIcons = {
  "Milk Chai's": "🍵",
  "Black Tea / Chai": "🫖",
  "Coffee": "☕",
  "Cold Drinks": "🧊",
  "Hot Drinks": "🌡️",
  "Buns & Pastries": "🥐",
  "Savoury Snacks": "🥟",
  "Maggi": "🍜",
  "Biscuits & Rusks": "🍪",
  "Momos": "🥢",
};

// ── Particle Background ───────────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: "50%",
            background: `rgba(180,120,60,${Math.random() * 0.25 + 0.05})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatUp ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About", "Menu", "Gallery", "Contact"];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(252,248,244,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(120,60,20,0.08)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(180,120,60,0.15)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#b5651d,#8b4513)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>☕</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "#4a2c0a", letterSpacing: 0.5, lineHeight: 1 }}>Swayed Over</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#b5651d", letterSpacing: 3, textTransform: "uppercase" }}>Coffee</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 500, letterSpacing: 1,
                textTransform: "uppercase", color: "#4a2c0a", textDecoration: "none",
                transition: "color 0.2s", opacity: 0.8,
              }}
              onMouseEnter={e => { e.target.style.color = "#b5651d"; e.target.style.opacity = 1; }}
              onMouseLeave={e => { e.target.style.color = "#4a2c0a"; e.target.style.opacity = 0.8; }}
            >
              {link}
            </a>
          ))}
          <a
            href="https://wa.me/919003019030"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#b5651d", color: "#fff", padding: "9px 20px", borderRadius: 50,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: 1, textTransform: "uppercase", textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
              boxShadow: "0 4px 16px rgba(181,101,29,0.3)",
            }}
            onMouseEnter={e => { e.target.style.background = "#8b4513"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#b5651d"; e.target.style.transform = "translateY(0)"; }}
          >
            Order Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-hamburger"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#4a2c0a" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(252,248,244,0.98)", padding: "12px 24px 20px", borderTop: "1px solid rgba(180,120,60,0.15)" }}>
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "10px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#4a2c0a", textDecoration: "none", borderBottom: "1px solid rgba(180,120,60,0.1)" }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #2c1a0e 0%, #4a2c0a 40%, #7a4520 70%, #b5651d 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80') center/cover", opacity: 0.12 }} />

      <Particles />

      <div style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "6px 18px", marginBottom: 28 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#f5c842" }}>
            ✦ Purasaiwakkam, Chennai ✦
          </span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 8vw, 88px)", color: "#fff", lineHeight: 1.1, marginBottom: 24, fontWeight: 700 }}>
          Breakfast Café<br />
          <span style={{ color: "#f5c842", fontStyle: "italic" }}>Freshly Brewed</span>
        </h1>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Start your day with freshly brewed coffee, homemade pastries & a warm cup of milk chai at <strong style={{ color: "#f5c842" }}>swayedovercoffee</strong>.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#menu"
            style={{
              background: "#f5c842", color: "#2c1a0e", padding: "14px 36px", borderRadius: 50,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5,
              textTransform: "uppercase", textDecoration: "none",
              boxShadow: "0 8px 32px rgba(245,200,66,0.4)", transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            View Menu
          </a>
          <a
            href="https://wa.me/919003019030"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "2px solid rgba(255,255,255,0.4)", color: "#fff", padding: "14px 36px", borderRadius: 50,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 1.5,
              textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
          {[["10+", "Chai Varieties"], ["Fresh", "Daily Pastries"], ["09 AM", "Opens Daily"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#f5c842", fontWeight: 700 }}>{num}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <div style={{ width: 24, height: 40, border: "2px solid rgba(255,255,255,0.3)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: "#f5c842", borderRadius: 2, animation: "scrollDot 1.5s infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: "#faf6f1", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b5651d", marginBottom: 16 }}>
            ✦ Our Story
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 50px)", color: "#2c1a0e", lineHeight: 1.2, marginBottom: 24 }}>
            Where Every Cup<br /><em>Tells a Story</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6b4226", lineHeight: 1.9, marginBottom: 20 }}>
            Nestled at 113, PH Road, Purasaiwakkam, Chennai, swayedovercoffee is a breakfast café crafted with love. We believe mornings should begin with something extraordinary — whether that's a Saffroni Swayed Chai, a frothy cold coffee, or a warm Bun Butter Jam.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6b4226", lineHeight: 1.9, marginBottom: 32 }}>
            From the first sip of Traditional Filter Coffee to the last bite of a crispy Osmania Biscuit, every item is prepared fresh, every day. Come as a stranger, leave as family.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Fresh Daily", "Authentic Recipes", "Warm Ambiance"].map(tag => (
              <span key={tag} style={{ background: "#fff", border: "1px solid rgba(181,101,29,0.25)", borderRadius: 50, padding: "8px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b5651d", letterSpacing: 0.5 }}>
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
            "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80",
            "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
          ].map((src, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16, overflow: "hidden", height: i % 2 === 0 ? 200 : 160,
                boxShadow: "0 8px 24px rgba(120,60,20,0.12)",
                transform: i === 1 ? "translateY(24px)" : i === 3 ? "translateY(-16px)" : "none",
                transition: "transform 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = `translateY(${i === 1 ? "20px" : i === 3 ? "-20px" : "-4px"})`}
              onMouseLeave={e => e.currentTarget.style.transform = `translateY(${i === 1 ? "24px" : i === 3 ? "-16px" : "0"})`}
            >
              <img src={src} alt="café" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery / Snapshots ───────────────────────────────────────────────────
function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80", label: "Fresh Brew" },
    { src: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&q=80", label: "Masala Chai" },
    { src: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80", label: "Morning Pastries" },
    { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", label: "Latte Art" },
    { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", label: "Cozy Corners" },
    { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80", label: "Café Vibes" },
  ];

  return (
    <section id="gallery" style={{ background: "#2c1a0e", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b5651d", marginBottom: 16 }}>✦ Gallery</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 50px)", color: "#fff", lineHeight: 1.2 }}>
            Snapshots from<br /><em style={{ color: "#f5c842" }}>swayedovercoffee</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {images.map((img, i) => (
            <div
              key={i}
              style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: i === 0 || i === 5 ? 280 : 220, cursor: "pointer" }}
              onMouseEnter={e => {
                e.currentTarget.querySelector("img").style.transform = "scale(1.08)";
                e.currentTarget.querySelector(".overlay").style.opacity = 1;
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector("img").style.transform = "scale(1)";
                e.currentTarget.querySelector(".overlay").style.opacity = 0;
              }}
            >
              <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
              <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(44,26,14,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#f5c842", fontSize: 18, fontStyle: "italic" }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Video section */}
        <div style={{ marginTop: 60, borderRadius: 20, overflow: "hidden", position: "relative", background: "#1a0d06", padding: 40, textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b5651d", marginBottom: 16 }}>✦ Featured Video</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>
            Check out this great video featuring freshly brewed coffee and delicious homemade pastries, perfect for enjoying with a warm cup of milk chai.
          </p>
          <div style={{ position: "relative", paddingBottom: "42%", height: 0, borderRadius: 12, overflow: "hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0"
              title="swayedovercoffee video"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", borderRadius: 12 }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Menu ──────────────────────────────────────────────────────────────────
function MenuSection() {
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="menu" style={{ background: "#faf6f1", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b5651d", marginBottom: 16 }}>✦ Our Menu</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 50px)", color: "#2c1a0e", lineHeight: 1.2 }}>
            Menu & <em>Price List</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6b4226", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
            From aromatic chai to crispy snacks — everything brewed and baked with love.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 20px", borderRadius: 50, border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
                transition: "all 0.25s",
                background: activeCategory === cat ? "#b5651d" : "#fff",
                color: activeCategory === cat ? "#fff" : "#4a2c0a",
                boxShadow: activeCategory === cat ? "0 4px 16px rgba(181,101,29,0.35)" : "0 2px 8px rgba(120,60,20,0.08)",
                transform: activeCategory === cat ? "scale(1.04)" : "scale(1)",
              }}
            >
              {categoryIcons[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {menuData[activeCategory].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 20px rgba(120,60,20,0.07)",
                border: "1px solid rgba(181,101,29,0.1)",
                transition: "transform 0.25s, box-shadow 0.25s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(120,60,20,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(120,60,20,0.07)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#2c1a0e", fontWeight: 600, lineHeight: 1.3, flex: 1 }}>
                  {item.name}
                </h3>
                {item.price && (
                  <span style={{ background: "#fdf3e3", color: "#b5651d", borderRadius: 50, padding: "4px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, marginLeft: 8, whiteSpace: "nowrap" }}>
                    ₹{item.price}
                  </span>
                )}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#7a5c40", lineHeight: 1.7 }}>
                {item.desc}
              </p>
              <div style={{ marginTop: 16, height: 2, background: "linear-gradient(90deg, #b5651d22 0%, transparent 100%)", borderRadius: 2 }} />
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 40, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9a7050", fontStyle: "italic" }}>
          * Prices may vary. Please contact us for the full updated price list.
        </p>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hello! I'm ${form.name} (${form.email}). ${form.message}`;
    window.open(`https://wa.me/919003019030?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      style={{
        background: "linear-gradient(160deg, #1a0d06 0%, #2c1a0e 50%, #3d200d 100%)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* animated bg decoration */}
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(181,101,29,0.06)", top: -100, right: -100, animation: "floatUp 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(245,200,66,0.04)", bottom: -80, left: -80, animation: "floatUp 10s ease-in-out infinite reverse" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b5651d", marginBottom: 16 }}>✦ Find Us</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 50px)", color: "#fff", lineHeight: 1.2 }}>
            Come Grab <em style={{ color: "#f5c842" }}>a Cup!</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", marginTop: 16, maxWidth: 560, margin: "16px auto 0" }}>
            Have a question? Ready to order? Message us on WhatsApp or use the form below.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Info */}
          <div>
            {/* Map embed */}
            <div style={{ borderRadius: 16, overflow: "hidden", height: 240, marginBottom: 28, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <iframe
                src="https://maps.google.com/maps?q=113+PH+Road+Purasaiwakkam+Chennai&output=embed"
                title="Swayed Over Coffee Location"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>

            {/* Details */}
            {[
              { icon: "📍", label: "Address", value: "113, PH Road, Purasaiwakkam, Chennai, Tamil Nadu, India" },
              { icon: "📞", label: "Phone", value: "9003019030" },
              { icon: "✉️", label: "Email", value: "swayedovercoffee@gmail.com" },
              { icon: "⏰", label: "Hours", value: "Monday – Sunday: 09:00 AM – 05:00 PM" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(181,101,29,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#b5651d", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <a href="https://www.instagram.com/swayedovercoffee?igsh=ZDVkaXc4czIxamd6" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 16px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#fff", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                📸 Instagram
              </a>
              <a href="https://swayedovercoffee.com" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 16px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#fff", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                ▶️ YouTube
              </a>
              <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 50, padding: "8px 16px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#25d366", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,0.15)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 36, backdropFilter: "blur(12px)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 24, fontWeight: 600 }}>Send a Message</h3>
            {[
              { field: "name", label: "Your Name", type: "text", placeholder: "e.g. Priya S." },
              { field: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
            ].map(({ field, label, type, placeholder }) => (
              <div key={field} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b5651d", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  required
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#b5651d"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
                />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b5651d", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Message</label>
              <textarea
                rows={4}
                placeholder="Tell us what you need — delivery, pickup, a custom order..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#b5651d"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%", background: "#25d366", color: "#fff", border: "none", borderRadius: 50, padding: "14px 24px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                boxShadow: "0 6px 24px rgba(37,211,102,0.35)", transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1da851"}
              onMouseLeave={e => e.currentTarget.style.background = "#25d366"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {sent ? "Redirecting to WhatsApp ✓" : "Message on WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0f0704", borderTop: "1px solid rgba(181,101,29,0.2)", padding: "32px 24px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#b5651d,#8b4513)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>☕</div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#b5651d", fontWeight: 600 }}>swayedovercoffee</span>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5 }}>
        Copyright © 2026 swayedovercoffee — All Rights Reserved.
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
        113, PH Road, Purasaiwakkam, Chennai, Tamil Nadu, India
      </p>
    </footer>
  );
}

// ── Floating WhatsApp button ──────────────────────────────────────────────
function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/919003019030"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 999,
        width: 58, height: 58, borderRadius: "50%",
        background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hovered ? "0 8px 32px rgba(37,211,102,0.6)" : "0 4px 20px rgba(37,211,102,0.4)",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transition: "all 0.25s ease",
        textDecoration: "none",
      }}
    >
      {/* Pulse ring */}
      <div style={{
        position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
        border: "2px solid #25d366", animation: "whatsappPulse 2s ease-out infinite",
      }} />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #faf6f1;
          width: 100vw;
          min-width: 100vw;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        main {
          width: 100vw;
          min-width: 100vw;
          margin: 0;
          padding: 0;
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
        @keyframes scrollDot {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(16px); }
        }
        @keyframes whatsappPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .desktop-nav { display: flex !important; }
        .mobile-hamburger { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }

        /* About & contact grid responsive */
        @media (max-width: 860px) {
          #about > div,
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #gallery > div > div:first-of-type + div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Gallery />
        <MenuSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}