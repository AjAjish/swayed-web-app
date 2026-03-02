import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
  Coffee: [
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
  Maggi: [
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
  Momos: [
    { name: "Veg Momo (6 nos)", price: null, desc: "Tender steamed dumplings filled with savory fresh vegetables and aromatic spices." },
    { name: "Corn Cheese Momo (6 nos)", price: null, desc: "Creamy sweet corn and melted cheese — indulgent steamed dumplings." },
    { name: "Paneer Momo (6 nos)", price: null, desc: "Delicately steamed dumplings filled with spiced, creamy paneer." },
  ],
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80", label: "Fresh Brew" },
  { src: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&q=80", label: "Masala Chai" },
  { src: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=900&q=80", label: "Morning Pastries" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80", label: "Cozy Corners" },
  { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80", label: "Latte Art" },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=80", label: "Cafe Vibes" },
];

const heroShots = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=420&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=420&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=420&q=80",
];

function ThreeCoffeeMotion() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const container = mountRef.current;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    const ambientLight = new THREE.AmbientLight(0xffe4c8, 0.75);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffb163, 1.1, 36);
    warmLight.position.set(4, 5, 9);
    scene.add(warmLight);

    const coolLight = new THREE.PointLight(0xc4d8ff, 0.5, 30);
    coolLight.position.set(-5, -3, 7);
    scene.add(coolLight);

    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x6c3c1f,
      metalness: 0.2,
      roughness: 0.5,
    });
    const beanGeometry = new THREE.SphereGeometry(0.16, 16, 16);
    const beansGroup = new THREE.Group();
    const beans = [];

    for (let index = 0; index < 42; index += 1) {
      const mesh = new THREE.Mesh(beanGeometry, beanMaterial);
      const radius = 2.1 + Math.random() * 3.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.8;
      mesh.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius * 0.55,
      );
      mesh.scale.setScalar(0.8 + Math.random() * 0.9);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      mesh.userData = {
        speed: 0.2 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      };
      beans.push(mesh);
      beansGroup.add(mesh);
    }
    scene.add(beansGroup);

    const steamGeometry = new THREE.BufferGeometry();
    const steamCount = 160;
    const steamPositions = new Float32Array(steamCount * 3);
    for (let index = 0; index < steamCount; index += 1) {
      const i3 = index * 3;
      steamPositions[i3] = (Math.random() - 0.5) * 7;
      steamPositions[i3 + 1] = Math.random() * 6 - 2.5;
      steamPositions[i3 + 2] = (Math.random() - 0.5) * 4;
    }
    steamGeometry.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));

    const steamMaterial = new THREE.PointsMaterial({
      color: 0xf3d8bc,
      size: 0.08,
      transparent: true,
      opacity: 0.46,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steam = new THREE.Points(steamGeometry, steamMaterial);
    steam.position.y = -1.8;
    scene.add(steam);

    const clock = new THREE.Clock();
    let frameId;

    const onResize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    onResize();
    window.addEventListener("resize", onResize);

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      beansGroup.rotation.y = elapsed * 0.11;
      beansGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

      beans.forEach((bean, index) => {
        const { speed, phase } = bean.userData;
        bean.position.y += Math.sin(elapsed * speed + phase + index * 0.1) * 0.0026;
        bean.rotation.x += 0.01;
        bean.rotation.y += 0.006;
      });

      const positionAttr = steamGeometry.getAttribute("position");
      for (let index = 0; index < steamCount; index += 1) {
        const i3 = index * 3;
        let x = positionAttr.array[i3];
        let y = positionAttr.array[i3 + 1];
        x += Math.sin(elapsed * 0.4 + index * 0.13) * 0.0019;
        y += 0.008 + Math.sin(elapsed + index) * 0.001;
        if (y > 3.7) {
          y = -2.5;
          x = (Math.random() - 0.5) * 7;
        }
        positionAttr.array[i3] = x;
        positionAttr.array[i3 + 1] = y;
      }
      positionAttr.needsUpdate = true;

      steam.rotation.y = elapsed * 0.08;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      beanGeometry.dispose();
      beanMaterial.dispose();
      steamGeometry.dispose();
      steamMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="three-motion" ref={mountRef} aria-hidden="true" />;
}

function Nav({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Menu", "menu"],
    ["Gallery", "gallery"],
    ["Contact", "contact"],
  ];

  return (
    <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="container nav-row">
        <a href="#home" className="brand">
          <img src="/logo.jpeg" alt="Swayed Over Coffee" className="brand-logo" />
          <div>
            <div className="brand-title">Swayed Over</div>
            <div className="brand-subtitle">Coffee</div>
          </div>
        </a>

        <div className="nav-links desktop-only">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="nav-cta desktop-only">
          <button type="button" className="theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer" className="solid-btn">
            Order Now
          </a>
        </div>

        <div className="mobile-actions mobile-only">
          <button type="button" className="theme-btn mobile-theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner mobile-menu-card">
            {links.map(([label, id]) => (
              <a key={id} className="mobile-link" href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a
              href="https://wa.me/919003019030"
              target="_blank"
              rel="noopener noreferrer"
              className="solid-btn mobile-order"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-padding">
      <div className="hero-backdrop" />
      <ThreeCoffeeMotion />
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">✦ Purasaiwakkam, Chennai</div>
          <h1>
            Breakfast Cafe
            <span>Freshly Brewed</span>
          </h1>
          <p>
            Start your day with freshly brewed coffee, homemade pastries, and a warm cup of milk chai at swayedovercoffee.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="solid-btn">View Menu</a>
            <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer" className="ghost-btn">WhatsApp Us</a>
          </div>

          <div className="hero-shot-row" aria-hidden="true">
            {heroShots.map((src) => (
              <img key={src} src={src} alt="Coffee moments" />
            ))}
          </div>
        </div>

        <div className="hero-card">
          <h3>Today at Swayed</h3>
          <ul>
            <li><span>10+ Chai Varieties</span><strong>Daily</strong></li>
            <li><span>Fresh Buns & Pastries</span><strong>Housemade</strong></li>
            <li><span>Opening Time</span><strong>09:00 AM</strong></li>
          </ul>

          <div className="coffee-visual" aria-hidden="true">
            <div className="smoke-clouds">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className={`smoke smoke-${index + 1}`} />
              ))}
            </div>
            <div className="cup" />
            <div className="cup-base" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const storyCards = [
    {
      title: "The Beginning",
      text: "In 2010, swayedovercoffee was founded by Jane and John Doe. With a passion for great coffee and delicious food, they built a welcoming gathering spot that quickly became a favorite.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    },
    {
      title: "Expansion and Growth",
      text: "Over the years, we expanded with a full kitchen, talented chefs and baristas, and an evolving menu sourced from trusted local farmers and suppliers.",
      image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80",
    },
    {
      title: "Our Philosophy",
      text: "We serve high-quality food and drinks in a warm environment, using local and sustainable ingredients whenever possible to keep every cup and plate meaningful.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container about-modern-wrap">
        <div className="about-head">
          <div className="eyebrow">✦ Our Story</div>
          <h2>Our Journey Through the Years</h2>
          <p>
            A modern story wall that highlights our journey, growth, and philosophy — each chapter presented on curated café imagery.
          </p>
        </div>

        <div className="story-image-grid">
          {storyCards.map((card, index) => (
            <article
              key={card.title}
              className={`story-image-card story-image-card-${index + 1} ${index === 0 ? "align-left" : index === 1 ? "align-center" : "align-right"}`}
              style={{ backgroundImage: `url('${card.image}')` }}
            >
              <div className="story-overlay">
                <span className="story-kicker">Chapter {String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const [pricedOnly, setPricedOnly] = useState(false);

  const currentItems = menuData[activeCategory];
  const visibleItems = currentItems.filter((item) => {
    const query = search.trim().toLowerCase();
    const textMatch =
      query.length === 0 ||
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query);
    const priceMatch = !pricedOnly || item.price;
    return textMatch && priceMatch;
  });

  return (
    <section id="menu" className="section-padding section-alt">
      <div className="container">
        <div className="centered-head">
          <div className="eyebrow">✦ Our Menu</div>
          <h2>Menu & Price List</h2>
          <p>From aromatic chai to crispy snacks — brewed and baked with love.</p>
        </div>

        <div className="chips-wrap">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${activeCategory === category ? "chip-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category} <small>({menuData[category].length})</small>
            </button>
          ))}
        </div>

        <div className="menu-toolbar">
          <div className="menu-search-wrap">
            <span className="menu-search-icon">Search</span>
            <input
              className="menu-search"
              type="text"
              placeholder="Search drinks, snacks, pastries..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="menu-tools-right">
            <button
              type="button"
              className={`chip menu-filter-toggle ${pricedOnly ? "chip-active" : ""}`}
              onClick={() => setPricedOnly((value) => !value)}
            >
              {pricedOnly ? "✔" : "○"} Show only priced
            </button>
            <div className="menu-count">{visibleItems.length} items</div>
          </div>
        </div>

        <div className="menu-grid">
          {visibleItems.map((item) => (
            <article key={item.name} className="menu-card">
              <div className="menu-card-head">
                <h3>{item.name}</h3>
                {item.price ? <span>₹{item.price}</span> : <span className="price-pending">Ask Price</span>}
              </div>
              <p>{item.desc}</p>
              <div className="menu-card-foot">
                <span className="menu-category-tag">{activeCategory}</span>
                <a
                  href={`https://wa.me/919003019030?text=${encodeURIComponent(`Hi, I want to order ${item.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn menu-mini-btn"
                >
                  Order Item
                </a>
              </div>
            </article>
          ))}
        </div>

        {visibleItems.length === 0 && (
          <div className="menu-empty">
            <h3>No items found</h3>
            <p>Try a different keyword or switch off the priced-only filter.</p>
            <button type="button" className="ghost-btn" onClick={() => { setSearch(""); setPricedOnly(false); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Gallery() {
  const looped = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        <div className="centered-head">
          <div className="eyebrow">✦ Gallery</div>
          <h2>Snapshots from swayedovercoffee</h2>
          <p>Fresh brews, cozy corners, and comforting food moments.</p>
        </div>

        <div className="gallery-marquee-wrap">
          <div className="gallery-marquee">
            <div className="gallery-track">
              {looped.map((image, index) => (
                <figure key={`row1-${image.src}-${index}`} className="gallery-item gallery-marquee-item">
                  <img src={image.src} alt={image.label} />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="gallery-marquee reverse">
            <div className="gallery-track slower">
              {looped.map((image, index) => (
                <figure key={`row2-${image.src}-${index}`} className="gallery-item gallery-marquee-item">
                  <img src={image.src} alt={image.label} />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = `Hello! I'm ${form.name} (${form.email}). ${form.message}`;
    window.open(`https://wa.me/919003019030?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding section-alt">
      <div className="container contact-grid">
        <div className="contact-panel">
          <div className="eyebrow">✦ Find Us</div>
          <h2>Come Grab a Cup</h2>
          <p>Have a question or want to place an order? Message us on WhatsApp anytime.</p>

          <div className="detail-list">
            <div><strong>Address:</strong> 113, PH Road, Purasaiwakkam, Chennai</div>
            <div><strong>Phone:</strong> 9003019030</div>
            <div><strong>Email:</strong> swayedovercoffee@gmail.com</div>
            <div><strong>Hours:</strong> Monday – Sunday, 09:00 AM – 05:00 PM</div>
          </div>

          <div className="contact-actions">
            <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer" className="solid-btn">WhatsApp</a>
            <a href="https://www.instagram.com/swayedovercoffee?igsh=ZDVkaXc4czIxamd6" target="_blank" rel="noopener noreferrer" className="ghost-btn">Instagram</a>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          <label>
            Your Name
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="e.g. Priya S."
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="your@email.com"
            />
          </label>

          <label>
            Message
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Tell us what you need..."
            />
          </label>

          <button type="submit" className="solid-btn">Message on WhatsApp</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 swayedovercoffee — All Rights Reserved.</p>
        <p>113, PH Road, Purasaiwakkam, Chennai, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer" className="fab" aria-label="Open WhatsApp">
      💬
    </a>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("swayed-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("swayed-theme", theme);
  }, [theme]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --bg: #faf6f1;
          --bg-elevated: #ffffff;
          --bg-soft: #f2e8dd;
          --text: #2a1c12;
          --muted: #6e4f3a;
          --brand: #b5651d;
          --brand-strong: #8b4513;
          --stroke: rgba(181, 101, 29, 0.18);
          --shadow: 0 16px 34px rgba(34, 16, 8, 0.08);
        }

        :root[data-theme='dark'] {
          --bg: #130c08;
          --bg-elevated: #1f1510;
          --bg-soft: #2a1d15;
          --text: #f6e6d4;
          --muted: #c8a989;
          --brand: #f0a856;
          --brand-strong: #dc8f3a;
          --stroke: rgba(240, 168, 86, 0.24);
          --shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
        }

        #root {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          text-align: left;
        }

        .container {
          width: min(1120px, calc(100% - 2rem));
          margin: 0 auto;
        }

        .section-padding { padding: 96px 0; }
        .section-alt { background: var(--bg-soft); }

        .eyebrow {
          color: var(--brand);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.72rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
          margin: 0;
        }

        h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.2;
          margin-bottom: 0.8rem;
        }

        p { color: var(--muted); line-height: 1.8; }

        .nav-shell {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background: color-mix(in srgb, var(--bg) 80%, transparent);
          border-bottom: 1px solid var(--stroke);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .nav-shell.is-scrolled {
          background: color-mix(in srgb, var(--bg-elevated) 88%, transparent);
          box-shadow: 0 10px 26px rgba(10, 10, 10, 0.12);
          border-color: color-mix(in srgb, var(--brand) 28%, transparent);
        }

        .nav-row {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--stroke);
        }

        .brand-title { font-weight: 700; }
        .brand-subtitle { font-size: 0.68rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--brand); }

        .nav-links {
          display: flex;
          gap: 0.45rem;
          align-items: center;
          padding: 0.34rem;
          border-radius: 999px;
          background: color-mix(in srgb, var(--bg-elevated) 76%, transparent);
          border: 1px solid var(--stroke);
        }

        .nav-link {
          padding: 0.5rem 0.9rem;
          border-radius: 999px;
          text-decoration: none;
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }

        .nav-link:hover {
          color: var(--text);
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          transform: translateY(-1px);
        }

        .nav-cta { display: flex; gap: 0.75rem; align-items: center; }

        .solid-btn,
        .ghost-btn,
        .theme-btn,
        .menu-toggle,
        .chip {
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 0.72rem 1rem;
          font-size: 0.86rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          text-decoration: none;
          transition: 0.22s ease;
        }

        .solid-btn {
          background: linear-gradient(135deg, var(--brand), var(--brand-strong));
          color: #fff;
          box-shadow: var(--shadow);
        }
        .solid-btn:hover { transform: translateY(-1px); }

        .ghost-btn,
        .theme-btn {
          background: transparent;
          border-color: var(--stroke);
          color: var(--text);
        }
        .ghost-btn:hover,
        .theme-btn:hover,
        .chip:hover {
          background: color-mix(in srgb, var(--brand) 12%, transparent);
        }

        .desktop-only { display: flex; }
        .mobile-only { display: none; }
        .mobile-actions {
          align-items: center;
          gap: 0.45rem;
        }

        .mobile-theme-btn {
          width: 42px;
          height: 42px;
          padding: 0;
          display: grid;
          place-items: center;
          font-size: 1rem;
        }

        .hero {
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top right, color-mix(in srgb, var(--brand) 28%, transparent), transparent 36%), var(--bg);
        }

        .three-motion {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.9;
          mix-blend-mode: screen;
        }

        :root[data-theme='light'] .three-motion {
          opacity: 0.75;
          mix-blend-mode: multiply;
        }

        .three-motion canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }

        .hero-backdrop {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(0,0,0,0.2), rgba(0,0,0,0));
          pointer-events: none;
          z-index: 0;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.45;
          pointer-events: none;
          animation: orbFloat 12s ease-in-out infinite;
          z-index: 0;
        }

        .orb-1 {
          width: 220px;
          height: 220px;
          top: 10%;
          right: 10%;
          background: color-mix(in srgb, var(--brand) 42%, transparent);
        }

        .orb-2 {
          width: 170px;
          height: 170px;
          bottom: 12%;
          right: 28%;
          animation-delay: 2.6s;
          background: color-mix(in srgb, var(--text) 20%, transparent);
        }

        .orb-3 {
          width: 140px;
          height: 140px;
          top: 24%;
          left: 6%;
          animation-delay: 4.2s;
          background: color-mix(in srgb, var(--brand) 28%, transparent);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          min-height: calc(100vh - 72px);
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          align-items: center;
          gap: 2rem;
        }

        .hero h1 {
          font-size: clamp(2.4rem, 7vw, 4.8rem);
          line-height: 1.04;
          margin-bottom: 1rem;
        }

        .hero h1 span {
          display: block;
          color: var(--brand);
          font-style: italic;
        }

        .hero p { max-width: 58ch; margin-bottom: 1.4rem; }
        .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        .hero-shot-row {
          display: flex;
          align-items: center;
          margin-top: 1.4rem;
          gap: 0.6rem;
        }

        .hero-shot-row img {
          width: 72px;
          height: 72px;
          border-radius: 14px;
          object-fit: cover;
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow);
          animation: shotFloat 6s ease-in-out infinite;
        }

        .hero-shot-row img:nth-child(2) {
          animation-delay: 1.4s;
          transform: translateY(-6px);
        }

        .hero-shot-row img:nth-child(3) {
          animation-delay: 2.5s;
        }

        .hero-card {
          background: color-mix(in srgb, var(--bg-elevated) 84%, transparent);
          border: 1px solid var(--stroke);
          border-radius: 20px;
          padding: 1.4rem;
          box-shadow: var(--shadow);
        }

        .hero-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.9rem;
        }

        .hero-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.7rem;
        }

        .hero-card li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid var(--stroke);
          border-radius: 12px;
          padding: 0.78rem 0.88rem;
        }

        .hero-card li span { color: var(--muted); }

        .coffee-visual {
          position: relative;
          margin-top: 1rem;
          height: 140px;
          display: grid;
          place-items: end center;
          overflow: hidden;
        }

        .smoke-clouds {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .smoke {
          position: absolute;
          bottom: 38px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--text) 24%, transparent);
          filter: blur(1px);
          opacity: 0;
          animation: smokeRise 4.8s ease-in infinite;
        }

        .smoke-1 { left: 44%; animation-delay: 0s; }
        .smoke-2 { left: 48%; animation-delay: 0.5s; }
        .smoke-3 { left: 52%; animation-delay: 1.1s; }
        .smoke-4 { left: 46%; animation-delay: 1.6s; }
        .smoke-5 { left: 50%; animation-delay: 2.2s; }
        .smoke-6 { left: 54%; animation-delay: 2.9s; }
        .smoke-7 { left: 47%; animation-delay: 3.4s; }
        .smoke-8 { left: 51%; animation-delay: 4s; }

        .cup {
          width: 126px;
          height: 70px;
          border-radius: 0 0 26px 26px;
          border: 2px solid var(--stroke);
          border-top: 6px solid color-mix(in srgb, var(--brand) 45%, transparent);
          background: linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 70%, var(--brand) 30%), var(--bg-elevated));
          position: relative;
          box-shadow: inset 0 -10px 18px color-mix(in srgb, var(--brand) 15%, transparent);
        }

        .cup::after {
          content: "";
          position: absolute;
          right: -16px;
          top: 18px;
          width: 18px;
          height: 22px;
          border: 2px solid var(--stroke);
          border-left: none;
          border-radius: 0 12px 12px 0;
        }

        .cup-base {
          width: 160px;
          height: 14px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--brand) 30%, transparent);
          margin-top: 8px;
          animation: cupFloat 3.6s ease-in-out infinite;
        }

        @keyframes smokeRise {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.38;
          }
          70% {
            opacity: 0.22;
          }
          100% {
            transform: translateY(-88px) translateX(18px) scale(1.8);
            opacity: 0;
          }
        }

        @keyframes cupFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes shotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-12px, 12px) scale(1.04); }
          65% { transform: translate(8px, -10px) scale(0.96); }
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .about-modern-wrap {
          display: grid;
          gap: 1.25rem;
        }

        .about-head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto;
        }

        .story-image-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .story-image-card {
          min-height: 320px;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          background-size: cover;
          background-position: center;
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow);
          animation: drift 10s ease-in-out infinite;
          transition: transform 0.24s ease, box-shadow 0.24s ease;
        }

        .story-image-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 36px rgba(8, 8, 8, 0.18);
        }

        .story-image-card-2 { min-height: 360px; animation-delay: 1.4s; }
        .story-image-card-3 { min-height: 330px; animation-delay: 2.4s; }

        .story-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.24) 50%, rgba(0, 0, 0, 0.02));
        }

        .story-image-card.align-left .story-overlay {
          text-align: left;
          align-items: flex-start;
        }

        .story-image-card.align-center .story-overlay {
          text-align: center;
          align-items: center;
        }

        .story-image-card.align-right .story-overlay {
          text-align: right;
          align-items: flex-end;
        }

        .story-kicker {
          display: inline-flex;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 999px;
          padding: 0.26rem 0.52rem;
          margin-bottom: 0.5rem;
          background: rgba(0, 0, 0, 0.22);
        }

        .story-overlay h3 {
          color: #fff;
          margin-bottom: 0.4rem;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
        }

        .story-overlay p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.65;
          max-width: 30ch;
        }

        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .centered-head {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 1.7rem;
        }

        .chips-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          margin-bottom: 1.4rem;
        }

        .chip small {
          opacity: 0.8;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .menu-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .menu-search-wrap {
          flex: 1;
          min-width: 230px;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          border: 1px solid var(--stroke);
          border-radius: 14px;
          padding: 0.62rem 0.78rem;
          background: var(--bg-elevated);
          box-shadow: var(--shadow);
        }

        .menu-search-icon {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .menu-search {
          width: 100%;
          border: none;
          background: transparent;
          color: var(--text);
          outline: none;
          font: inherit;
        }

        .menu-search::placeholder {
          color: color-mix(in srgb, var(--muted) 70%, transparent);
        }

        .menu-tools-right {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-wrap: wrap;
        }

        .menu-filter-toggle {
          padding-inline: 0.86rem;
        }

        .menu-count {
          border: 1px solid var(--stroke);
          border-radius: 999px;
          padding: 0.5rem 0.85rem;
          color: var(--muted);
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--bg-elevated);
        }

        .chip {
          background: var(--bg-elevated);
          border-color: var(--stroke);
          color: var(--muted);
        }

        .chip-active {
          background: linear-gradient(135deg, var(--brand), var(--brand-strong));
          color: #fff;
          border-color: transparent;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.95rem;
        }

        .menu-card {
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: var(--shadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .menu-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px rgba(10, 10, 10, 0.14);
        }

        .menu-card-head {
          display: flex;
          justify-content: space-between;
          gap: 0.7rem;
          margin-bottom: 0.4rem;
        }

        .menu-card h3 { font-size: 1.1rem; }

        .menu-card-head span {
          background: color-mix(in srgb, var(--brand) 18%, transparent);
          color: var(--brand);
          border-radius: 999px;
          padding: 0.2rem 0.56rem;
          height: fit-content;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .menu-card p { margin: 0; font-size: 0.92rem; }

        .price-pending {
          color: var(--muted);
          background: color-mix(in srgb, var(--text) 8%, transparent);
        }

        .menu-card-foot {
          margin-top: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
        }

        .menu-category-tag {
          font-size: 0.75rem;
          color: var(--muted);
          border: 1px solid var(--stroke);
          border-radius: 999px;
          padding: 0.3rem 0.52rem;
          background: color-mix(in srgb, var(--bg) 80%, transparent);
        }

        .menu-mini-btn {
          font-size: 0.78rem;
          padding: 0.42rem 0.65rem;
        }

        .menu-empty {
          margin-top: 1.1rem;
          border: 1px dashed var(--stroke);
          border-radius: 16px;
          text-align: center;
          padding: 1.2rem;
          background: color-mix(in srgb, var(--bg-elevated) 84%, transparent);
        }

        .menu-empty h3 {
          margin-bottom: 0.35rem;
          font-size: 1.2rem;
        }

        .menu-empty p {
          margin: 0 0 0.9rem;
        }

        .gallery-marquee-wrap {
          display: grid;
          gap: 1rem;
        }

        .gallery-marquee {
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid var(--stroke);
          background: color-mix(in srgb, var(--bg-elevated) 86%, transparent);
          box-shadow: var(--shadow);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .gallery-track {
          display: flex;
          width: max-content;
          gap: 0.9rem;
          padding: 0.9rem;
          animation: marqueeMove 34s linear infinite;
        }

        .gallery-track.slower {
          animation-duration: 42s;
        }

        .gallery-marquee.reverse .gallery-track {
          animation-direction: reverse;
        }

        @keyframes marqueeMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .gallery-marquee-item {
          min-width: 260px;
          width: 260px;
          flex: 0 0 auto;
        }

        .gallery-item {
          margin: 0;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid var(--stroke);
        }

        .gallery-item img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .gallery-item:hover img { transform: scale(1.06); }

        .gallery-item figcaption {
          position: absolute;
          inset: auto 0 0 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
          color: #fff;
          padding: 1.2rem 0.85rem 0.8rem;
          font-size: 0.86rem;
        }

        .contact-panel,
        .form-card {
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 18px;
          padding: 1.3rem;
          box-shadow: var(--shadow);
        }

        .detail-list { display: grid; gap: 0.55rem; margin: 1rem 0; color: var(--muted); }
        .contact-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

        .form-card {
          display: grid;
          gap: 0.85rem;
        }

        .form-card h3 { font-size: 1.55rem; }

        .form-card label {
          display: grid;
          gap: 0.4rem;
          font-size: 0.84rem;
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .form-card input,
        .form-card textarea {
          border: 1px solid var(--stroke);
          border-radius: 12px;
          background: var(--bg);
          color: var(--text);
          font: inherit;
          font-size: 0.92rem;
          padding: 0.76rem 0.8rem;
          outline: none;
        }

        .form-card input:focus,
        .form-card textarea:focus { border-color: var(--brand); }

        .form-card .solid-btn {
          width: 100%;
          text-align: center;
        }

        .footer {
          border-top: 1px solid var(--stroke);
          background: var(--bg-elevated);
          padding: 1.1rem 0;
        }

        .footer-inner {
          color: var(--muted);
          font-size: 0.86rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .fab {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          text-decoration: none;
          font-size: 1.3rem;
          color: #fff;
          background: #25d366;
          box-shadow: 0 10px 24px rgba(37, 211, 102, 0.38);
          z-index: 55;
        }

        .mobile-menu {
          border-top: 1px solid var(--stroke);
          background: color-mix(in srgb, var(--bg-elevated) 90%, transparent);
        }

        .mobile-menu-inner {
          display: grid;
          gap: 0.7rem;
          padding: 0.9rem 0;
        }

        .mobile-menu-card {
          margin: 0.85rem auto 1rem;
          padding: 0.9rem;
          border-radius: 16px;
          border: 1px solid var(--stroke);
          background: color-mix(in srgb, var(--bg-elevated) 94%, transparent);
          box-shadow: var(--shadow);
        }

        .mobile-link {
          border: 1px solid var(--stroke);
          border-radius: 12px;
          padding: 0.7rem 0.8rem;
          text-decoration: none;
          color: var(--muted);
          font-weight: 500;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .mobile-link:hover {
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          color: var(--text);
        }

        .mobile-order {
          margin-top: 0.2rem;
          justify-content: center;
          display: inline-flex;
        }

        @media (max-width: 960px) {
          .hero-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .story-image-grid {
            grid-template-columns: 1fr;
          }

          .story-image-card {
            min-height: 260px;
          }

          .story-image-card-2,
          .story-image-card-3 {
            min-height: 260px;
          }

          .story-image-card.align-right .story-overlay,
          .story-image-card.align-center .story-overlay,
          .story-image-card.align-left .story-overlay {
            text-align: left;
            align-items: flex-start;
          }

          .hero-grid { min-height: auto; }
          .hero-orb { opacity: 0.32; }
          .three-motion { opacity: 0.58; }
        }

        @media (max-width: 860px) {
          .desktop-only { display: none; }
          .mobile-only { display: flex; }
          .section-padding { padding: 82px 0; }
          .gallery-marquee-item {
            min-width: 210px;
            width: 210px;
          }
          .menu-toggle {
            width: 42px;
            height: 42px;
            padding: 0;
            display: grid;
            place-items: center;
            border-color: var(--stroke);
            color: var(--text);
            background: transparent;
          }
          .footer-inner { flex-direction: column; }
        }
      `}</style>

      <Nav theme={theme} toggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
