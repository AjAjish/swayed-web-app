import { useEffect, useState, useMemo, Suspense, lazy } from "react";

const ThreeCoffeeMotion = lazy(() => import("./ThreeCoffeeMotion").then((module) => ({ default: module.ThreeCoffeeMotion })));

function ThreeLoadingFallback() {
  return (
    <div className="three-motion three-loading" aria-hidden="true">
      <div className="static-coffee-scene" />
    </div>
  );
}

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

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
    // { name: "Cold Milo", price: null, desc: "Rich, creamy, chocolaty Milo topped with extra Milo for ultimate indulgence." },
  ],
  "Hot Drinks": [
    { name: "Poondu Milk Hot", price: null, desc: "Creamy milk and savory garlic for a soothing, healthy and unique warm drink." },
    { name: "Hot Chocolate", price: null, desc: "Velvety chocolate and warm milk — the ultimate cozy treat." },
    { name: "Hot Milo", price: null, desc: "Warm, malty Milo for a comforting and familiar hot beverage." },
    // { name: "Hot Milk", price: null, desc: "Simple, warm, creamy milk that soothes and satisfies with every sip." },
  ],
  "Buns & Pastries": [
    { name: "Bun Butter Jam", price: null, desc: "Generously spread with creamy butter and sweet, luscious jam — timeless comfort." },
    { name: "Bun Nutella", price: null, desc: "Soft bun with creamy Nutella and rich butter — heavenly indulgence." },
    { name: "Malai Bun", price: null, desc: "Soft, fluffy bun filled with rich, smooth malai for a divine treat." },
  ],
  "Savoury Snacks": [
    { name: "Samosa (4 pcs)", price: null, desc: "Crispy pastry stuffed with spiced, savory potatoes — a beloved classic." },
    { name: "Veg Puff", price: null, desc: "Flaky pastry filled with a savory blend of fresh vegetables and aromatic spices." },
    { name: "Channa Puff", price: null, desc: "Flaky pastry filled with flavorful, spiced channa — satisfying and savory." },
  ],
  Maggi: [
    { name: "Classic Maggi", price: null, desc: "Comforting instant noodles with rich, savory seasoning for a quick satisfying meal." },
    { name: "Chilli Cheese Maggi", price: null, desc: "Fiery noodles topped with melted cheese — bold, spicy comfort food." },
  ],
  "Biscuits & Rusks": [
    { name: "Butter Cookies (6 nos)", price: null, desc: "Famous crispy-sweet biscuits — the perfect chai companion." },
    { name: "Chocolate Biscuits (6 nos)", price: null, desc: "Crispy chocolate biscuits — rich chocolatey flavour in every bite." },
    { name: "Walnut Cake (6 nos)", price: null, desc: "Golden, light and airy rusk — the ideal companion for chai or coffee." },
    { name: "Tea Cake", price: null, desc: "Moist, tender cake with rich buttery flavour — perfect with chai." },
  ],
  // Momos: [
  //   { name: "Veg Momo (6 nos)", price: null, desc: "Tender steamed dumplings filled with savory fresh vegetables and aromatic spices." },
  //   { name: "Corn Cheese Momo (6 nos)", price: null, desc: "Creamy sweet corn and melted cheese — indulgent steamed dumplings." },
  //   { name: "Paneer Momo (6 nos)", price: null, desc: "Delicately steamed dumplings filled with spiced, creamy paneer." },
  // ],
};

const galleryImages = [
  { src: "/images/gallery/badam milk.png", label: "Badam Milk" },
  { src: "/images/gallery/bottled water.png", label: "Bottled Water" },
  { src: "/images/gallery/chees in poth.png", label: "Cheese in Pot" },
  { src: "/images/gallery/cheese breads.png", label: "Cheese Breads" },
  { src: "/images/gallery/cheese maggi.png", label: "Cheese Maggi" },
  { src: "/images/gallery/chilli cheese breads.png", label: "Chilli Cheese Breads" },
  { src: "/images/gallery/cold beverages.png", label: "Cold Beverages" },
  { src: "/images/gallery/dum.jpeg", label: "Dum Chai" },
  { src: "/images/gallery/garlic breads.png", label: "Garlic Breads" },
  { src: "/images/gallery/infusion water.png", label: "Infusion Water" },
  { src: "/images/gallery/irani chai.jpeg", label: "Irani Chai" },
  { src: "/images/gallery/jam breads.png", label: "Jam Breads" },
  { src: "/images/gallery/jasmine tea.png", label: "Jasmine Tea" },
  { src: "/images/gallery/kesar badam.png", label: "Kesar Badam" },
  { src: "/images/gallery/lemon grass tea.png", label: "Lemon Grass Tea" },
  { src: "/images/gallery/masala peanut.png", label: "Masala Peanut" },
  { src: "/images/gallery/peppermint 42(2).png", label: "Peppermint" },
  { src: "/images/gallery/pori kadala poha.png", label: "Pori Kadala Poha" },
  { src: "/images/gallery/protein channa.png", label: "Protein Channa" },
  { src: "/images/gallery/samosa small eat.png", label: "Samosa" },
  { src: "/images/gallery/TMP sundal poha.png", label: "Sundal Poha" },
  { src: "/images/gallery/tulsi tea.png", label: "Tulsi Tea" },
];

const menuCategoryImages = {
  "Milk Chai's": [
    "/images/Milk Chai's/dum chai.png",
    "/images/Milk Chai's/ginger chai.png",
    "/images/Milk Chai's/masala chai.png",
    "/images/Milk Chai's/elaichi chai.png",
    "/images/Milk Chai's/bombay chai.png",
    "/images/Milk Chai's/gulkand chai.png",
    "/images/Milk Chai's/saffroni chai.png",
    // "/images/Milk Chai's/IRANI CHAI.png",
  ],
  "Black Tea / Chai": [
    "/images/chai/kattan chai.png",
    "/images/chai/lemon chai.png",
    "/images/chai/lemon ginger chai.png",
  ],
  Coffee: [
    "/images/coffee/filter coffee.png",
    "/images/coffee/black coffee.png",
    "/images/coffee/chukku coffee.png",
    "/images/coffee/chocolate coffee.png", 
  ],
  "Cold Drinks": [
    "/images/cold drinks/badam cold drink.png",
    "/images/cold drinks/rose milk.png",
    "/images/cold drinks/cold coffee.png",
  ],
  "Hot Drinks": [
    "/images/hot drinks/garlic drink.png",
    "/images/hot drinks/chocolate hot drink.png",
    "/images/hot drinks/milo hot drink.png",
  ],
  "Buns & Pastries": [
    "/images/bun/butter jam.png",
    "/images/bun/nutella buns.png",
    "/images/bun/chesse maska buns.png",
    // "/images/bun/cream buns.png",
  ],
  "Savoury Snacks": [
    "/images/snacks/samosa big.png",
    "/images/snacks/veg puff.png",
    "/images/snacks/channa puff.png",
  ],
  Maggi: [
    "/images/maggi/classic maggi.png",
    "/images/maggi/chilli cheese magi.png",
  ],
  "Biscuits & Rusks": [
    "/images/cookies/butter cookies.png",
    "/images/cookies/cookies.png",
    "/images/cookies/walnut cake.png",
    "/images/cookies/tea cake.png",
  ],
};

const heroShots = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=420&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=420&q=80",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=420&q=80",
];

function Nav({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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
    <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`} role="banner">
      <nav className="container nav-row" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Swayed Over Coffee - Home">
          <img src="/logo.jpeg" alt="" className="brand-logo" aria-hidden="true" />
          <div>
            <div className="brand-title">Swayed Over</div>
            <div className="brand-subtitle">Coffee</div>
          </div>
        </a>

        <div className="nav-links desktop-only" role="navigation" aria-label="Primary">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="nav-cta desktop-only">
          <button type="button" className="theme-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={theme === "dark"}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span className="theme-btn-text">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <a href="https://wa.me/919003019030" target="_blank" rel="noopener noreferrer" className="solid-btn" aria-label="Order now on WhatsApp">
            <WhatsAppIcon />
            <span>Order Now</span>
          </a>
        </div>

        <div className="mobile-actions mobile-only" role="navigation" aria-label="Mobile actions">
          <button type="button" className="theme-btn mobile-theme-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={theme === "dark"}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="container mobile-menu-inner mobile-menu-card">
            {links.map(([label, id]) => (
              <a key={id} className="mobile-link" href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a
              href="https://wa.me/919003019030"
              target="_blank"
              rel="noopener noreferrer"
              className="solid-btn mobile-order"
              aria-label="Order now on WhatsApp"
            >
              <WhatsAppIcon />
              <span>Order Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-padding" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true" />
      <Suspense fallback={<ThreeLoadingFallback />}>
        <ThreeCoffeeMotion />
      </Suspense>
      <div className="hero-orb orb-1" aria-hidden="true" />
      <div className="hero-orb orb-2" aria-hidden="true" />
      <div className="hero-orb orb-3" aria-hidden="true" />
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Purasaiwakkam, Chennai</div>
          <h1 id="hero-title">
            Breakfast Cafe
            <span>Freshly Brewed</span>
          </h1>
          <p>
            Start your day with freshly brewed coffee, homemade pastries, and a warm cup of milk chai at swayedovercoffee.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="solid-btn">
              <span>View Menu</span>
              <ArrowRightIcon />
            </a>
            <a href="https://wa.me/919884630841" target="_blank" rel="noopener noreferrer" className="ghost-btn" aria-label="Contact us on WhatsApp">
              <WhatsAppIcon />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="hero-shot-row" aria-hidden="true">
            {heroShots.map((src) => (
              <img key={src} src={src} alt="Coffee moments" loading="lazy" />
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
      text: "In 2010, swayedovercoffee was founded by Shagul Nizamudeen. With a passion for great coffee and delicious food, they built a welcoming gathering spot that quickly became a favorite.",
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
    <section id="about" className="section-padding" aria-labelledby="about-title">
      <div className="container about-modern-wrap">
        <div className="about-head">
          <div className="eyebrow">Our Story</div>
          <h2 id="about-title">Our Journey Through the Years</h2>
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
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Generate search suggestions from item names and descriptions
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.trim().toLowerCase();
    const allItems = Object.values(menuData).flat();
    const matches = allItems
      .filter((item) =>
        item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map((item) => item.name);
    return [...new Set(matches)];
  }, [search]);

  const getMenuImage = (category, index) => {
    const images = menuCategoryImages[category] || [];
    if (images.length === 0) return null;
    return images[index % images.length];
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <section id="menu" className="section-padding section-alt" aria-labelledby="menu-title">
      <div className="container">
        <div className="centered-head">
          <div className="eyebrow">Our Menu</div>
          <h2 id="menu-title">Menu & Price List</h2>
          <p>From aromatic chai to crispy snacks — brewed and baked with love.</p>
        </div>

        <div className="chips-wrap" role="tablist" aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`menu-panel-${category.replace(/\s+/g, "-").toLowerCase()}`}
              id={`tab-${category.replace(/\s+/g, "-").toLowerCase()}`}
              className={`chip ${activeCategory === category ? "chip-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category} <small>({menuData[category].length})</small>
            </button>
          ))}
        </div>

        <div className="menu-toolbar">
          <div className="menu-search-wrap" role="search">
            <label htmlFor="menu-search" className="menu-search-icon visually-hidden">Search menu</label>
            <SearchIcon aria-hidden="true" />
            <input
              id="menu-search"
              className="menu-search"
              type="search"
              placeholder="Search drinks, snacks, pastries..."
              value={search}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleSearchBlur}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="menu-suggestions"
              aria-expanded={showSuggestions && suggestions.length > 0}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul id="menu-suggestions" className="search-suggestions" role="listbox">
                {suggestions.map((suggestion) => (
                  <li key={suggestion} role="option" onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="menu-tools-right">
            <button
              type="button"
              className={`chip menu-filter-toggle ${pricedOnly ? "chip-active" : ""}`}
              onClick={() => setPricedOnly((value) => !value)}
              aria-pressed={pricedOnly}
            >
              {pricedOnly ? "✔" : "○"} Show only priced
            </button>
            <div className="menu-count" aria-live="polite">{visibleItems.length} items</div>
          </div>
        </div>

        <div className="menu-grid" role="tabpanel" id={`menu-panel-${activeCategory.replace(/\s+/g, "-").toLowerCase()}`} aria-labelledby={`tab-${activeCategory.replace(/\s+/g, "-").toLowerCase()}`}>
          {visibleItems.map((item, index) => {
            const bgImage = getMenuImage(activeCategory, index);
            return (
            <article
              key={item.name}
              className={`menu-card ${bgImage ? "menu-card-image" : ""}`}
              style={bgImage ? { backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.26)), url("${bgImage}")` } : undefined}
            >
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
                  aria-label={`Order ${item.name} on WhatsApp`}
                >
                  <WhatsAppIcon />
                  <span>Order</span>
                </a>
              </div>
            </article>
            );
          })}
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
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section id="gallery" className="section-padding" aria-labelledby="gallery-title">
      <div className="container">
        <div className="centered-head">
          <div className="eyebrow">Gallery</div>
          <h2 id="gallery-title">Snapshots from swayedovercoffee</h2>
          <p>Fresh brews, cozy corners, and comforting food moments.</p>
        </div>

        <div className="gallery-marquee-wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusIn={() => setPaused(true)} onFocusOut={() => setPaused(false)}>
          <div className="gallery-marquee" role="region" aria-label="Gallery images" aria-roledescription="marquee">
            <div className="gallery-track" style={{ animationPlayState: paused || prefersReducedMotion ? "paused" : "running" }}>
              {looped.map((image, index) => (
                <figure key={`row1-${image.src}-${index}`} className="gallery-item gallery-marquee-item">
                  <img src={image.src} alt={image.label} loading="lazy" />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="gallery-marquee reverse" role="region" aria-label="Gallery images (reverse)" aria-roledescription="marquee">
            <div className="gallery-track slower" style={{ animationPlayState: paused || prefersReducedMotion ? "paused" : "running" }}>
              {looped.map((image, index) => (
                <figure key={`row2-${image.src}-${index}`} className="gallery-item gallery-marquee-item">
                  <img src={image.src} alt={image.label} loading="lazy" />
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
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, submitting, success, error

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus("submitting");
    try {
      const text = `Hello! I'm ${form.name} (${form.email}). ${form.message}`;
      window.open(`https://wa.me/919884630841?text=${encodeURIComponent(text)}`, "_blank");
      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <MapPinIcon />,
      label: "Address",
      value: "113, PH Road, Purasaiwakkam, Chennai, Tamil Nadu 600084",
      href: "https://maps.google.com/?q=113,+PH+Road,+Purasaiwakkam,+Chennai",
      external: true,
    },
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: "+91 98846 30841",
      href: "tel:+919884630841",
      external: false,
    },
    {
      icon: <MailIcon />,
      label: "Email",
      value: "swayedovercoffee@gmail.com",
      href: "mailto:swayedovercoffee@gmail.com",
      external: false,
    },
    {
      icon: <ClockIcon />,
      label: "Hours",
      value: "Mon – Sun, 9:00 AM – 5:00 PM",
      href: null,
      external: false,
    },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: "https://wa.me/919884630841",
      color: "#25d366",
      bg: "rgba(37, 211, 102, 0.12)",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/swayedovercoffee?igsh=ZDVkaXc4czIxamd6",
      color: "#e4405f",
      bg: "rgba(228, 64, 95, 0.12)",
    },
  ];

  return (
    <section id="contact" className="section-padding" aria-labelledby="contact-title">
      <div className="container">
        <div className="centered-head" style={{ marginBottom: "3rem" }}>
          <div className="eyebrow">Contact Us</div>
          <h2 id="contact-title">Let's Start a Conversation</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto" }}>
            Have a question, feedback, or want to place a bulk order? We'd love to hear from you.
            Reach out through any channel below or send us a message directly.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Panel */}
          <div className="contact-info-panel">
            <div className="info-card">
              <h3>Visit Us</h3>
              <p className="info-desc">Find us at our cozy corner in Purasaiwakkam. Walk in for a fresh brew or call ahead for takeaway.</p>

              <div className="contact-details">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="contact-detail"
                    aria-label={item.href ? `${item.label}: ${item.value}` : undefined}
                  >
                    <span className="detail-icon" style={{ color: "var(--brand)" }}>{item.icon}</span>
                    <div className="detail-content">
                      <span className="detail-label">{item.label}</span>
                      <span className="detail-value">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="social-links">
                <h4>Follow Our Journey</h4>
                <div className="social-row">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      style={{
                        borderColor: social.color,
                        background: social.bg,
                      }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <span style={{ color: social.color }}>{social.icon}</span>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="map-placeholder" aria-label="Map showing Swayed Over Coffee location">
              <div className="map-content">
                <MapPinIcon style={{ width: "48px", height: "48px", opacity: 0.5, marginBottom: "0.75rem" }} />
                <p style={{ color: "var(--muted)", margin: 0, fontWeight: 500 }}>113, PH Road, Purasaiwakkam</p>
                <p style={{ color: "var(--muted)", margin: "0.25rem 0 0", fontSize: "0.875rem" }}>Chennai, Tamil Nadu 600084</p>
                <a
                  href="https://maps.google.com/?q=113,+PH+Road,+Purasaiwakkam,+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                  style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--brand)", fontWeight: 600, fontSize: "0.875rem" }}
                >
                  Open in Google Maps <ArrowRightIcon style={{ width: "16px", height: "16px" }} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel">
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p className="form-subtitle">We typically respond within a few hours during business hours.</p>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, name: event.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    onBlur={() => {
                      if (!form.name.trim()) setErrors((prev) => ({ ...prev, name: "Name is required" }));
                    }}
                    placeholder="e.g. Priya S."
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, email: event.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    onBlur={() => {
                      if (!form.email.trim()) setErrors((prev) => ({ ...prev, email: "Email is required" }));
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
                    }}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error" role="alert">
                      <span aria-hidden="true">⚠</span> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="form-label">
                  Message <span className="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, message: event.target.value }));
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  onBlur={() => {
                    if (!form.message.trim()) setErrors((prev) => ({ ...prev, message: "Message is required" }));
                    else if (form.message.trim().length < 10) setErrors((prev) => ({ ...prev, message: "Message must be at least 10 characters" }));
                  }}
                  placeholder="Tell us what you need... (minimum 10 characters)"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : "message-hint"}
                  className={errors.message ? "input-error" : ""}
                />
                {errors.message ? (
                  <p id="message-error" className="form-error" role="alert">
                    <span aria-hidden="true">⚠</span> {errors.message}
                  </p>
                ) : (
                  <p id="message-hint" className="form-hint">
                    {form.message.length} / 10 minimum characters
                  </p>
                )}
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="solid-btn form-submit-btn"
                  disabled={submitStatus === "submitting"}
                  style={{ width: "100%", minHeight: "52px", fontSize: "1rem" }}
                >
                  {submitStatus === "submitting" && (
                    <>
                      <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite", marginRight: "0.5rem" }}>
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  )}
                  {submitStatus !== "submitting" && (
                    <>
                      <WhatsAppIcon />
                      <span>Send via WhatsApp</span>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="submit-success" role="status" aria-live="polite">
                    <CheckIcon style={{ color: "var(--brand)" }} />
                    <span>Message ready! WhatsApp will open with your message.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="submit-error" role="alert">
                    <span style={{ color: "var(--destructive, #dc2626)" }}>⚠</span>
                    <span>Something went wrong. Please try again or contact us directly.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Quick FAQ / Trust Signals */}
        <div className="contact-trust" style={{ marginTop: "4rem" }}>
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.25rem" }}>Why reach out to us?</h3>
          <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            <div className="trust-item" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "color-mix(in srgb, var(--brand) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--brand)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Quick Response</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0 }}>We reply within hours during business hours</p>
            </div>
            <div className="trust-item" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "color-mix(in srgb, var(--brand) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--brand)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Privacy First</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0 }}>Your data is never shared or sold</p>
            </div>
            <div className="trust-item" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "color-mix(in srgb, var(--brand) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--brand)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 8h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h1" />
                  <path d="M11 8V5c0-1.5 1-2 2-2s2 .5 2 2v3" />
                  <path d="M7 16h10" />
                  <path d="M9 12v4" />
                  <path d="M15 12v4" />
                </svg>
              </div>
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Coffee Expertise</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0 }}>Ask us anything about our brews & menu</p>
            </div>
            <div className="trust-item" style={{ textAlign: "center", padding: "1.5rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "color-mix(in srgb, var(--brand) 12%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--brand)" }}>
                <StarIcon />
              </div>
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Loved by Locals</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0 }}>1000+ happy customers since 2010</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p>© 2026 swayedovercoffee — All Rights Reserved.</p>
        <p>113, PH Road, Purasaiwakkam, Chennai, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a href="https://wa.me/919884630841" target="_blank" rel="noopener noreferrer" className="fab" aria-label="Chat with us on WhatsApp">
      <WhatsAppIcon />
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
          --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
          --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
          --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
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
          --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
          --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
          --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          button, a, input, textarea, select, .chip, .menu-card, .gallery-item, .contact-detail, .trust-item, .social-btn, .map-link, .mobile-order, .form-submit-btn {
            transition: background-color 0.01ms, color 0.01ms, border-color 0.01ms, opacity 0.01ms !important;
          }
        }

        :focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }

        :focus:not(:focus-visible) {
          outline: none;
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
          transition: background 0.25s var(--ease-out), border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
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
          transition: color 0.2s var(--ease-out), background 0.2s var(--ease-out), transform 0.2s var(--ease-out);
          min-height: 44px;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          color: var(--text);
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .nav-links {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
            padding: 1rem;
          }
          .nav-link {
            min-height: 48px;
            justify-content: center;
          }
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
          transition: all 0.22s var(--ease-out);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .solid-btn {
          background: linear-gradient(135deg, var(--brand), var(--brand-strong));
          color: #fff;
          box-shadow: var(--shadow);
          min-height: 44px;
        }
        .solid-btn:hover { transform: translateY(-1px); }

        .ghost-btn,
        .theme-btn {
          background: transparent;
          border-color: var(--stroke);
          color: var(--text);
          min-height: 44px;
        }
        .ghost-btn:hover,
        .theme-btn:hover,
        .chip:hover {
          background: color-mix(in srgb, var(--brand) 12%, transparent);
        }

        .theme-btn-text { display: none; }
        .desktop-only .theme-btn-text { display: inline; }

        @media (max-width: 860px) {
          .solid-btn,
          .ghost-btn {
            min-height: 48px;
          }
        }

        .desktop-only { display: flex; }
        .mobile-only { display: none; }
        .mobile-actions {
          align-items: center;
          gap: 0.45rem;
        }

        .mobile-theme-btn {
          width: 48px;
          height: 48px;
          padding: 0;
          display: grid;
          place-items: center;
        }

        .menu-toggle {
          width: 48px;
          height: 48px;
          padding: 0;
          display: grid;
          place-items: center;
          background: transparent;
          border-color: var(--stroke);
          color: var(--text);
        }
        .menu-toggle:hover {
          background: color-mix(in srgb, var(--brand) 12%, transparent);
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
          animation: orbFloat 12s linear infinite;
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
          animation: shotFloat 6s linear infinite;
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
          animation: smokeRise 4.8s linear infinite;
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
          animation: cupFloat 3.6s linear infinite;
        }

        @keyframes smokeRise {
          0% {
            transform: translateY(0) translateX(0) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          70% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-88px) translateX(18px) scale(1.2);
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

        .three-motion-static {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--brand) 15%, transparent) 0%, transparent 40%),
                      radial-gradient(circle at 70% 60%, color-mix(in srgb, var(--brand) 10%, transparent) 0%, transparent 35%),
                      var(--bg);
        }

        .static-coffee-scene {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
        }

        .static-coffee-scene::before {
          content: "";
          width: 200px;
          height: 200px;
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--brand) 35%, transparent) 0%, transparent 60%);
          filter: blur(60px);
          opacity: 0.4;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb,
          .smoke,
          .cup-base,
          .hero-shot-row img,
          .story-image-card,
          .gallery-track {
            animation: none !important;
          }
          .hero-orb { opacity: 0.25; }
          .smoke { opacity: 0; }
          .cup-base { animation: none; }
          .hero-shot-row img { transform: none; }
          .story-image-card { transform: none; }
          .gallery-track { animation: none; transform: translateX(-50%); }
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
          animation: drift 10s linear infinite;
          transition: transform 0.24s var(--ease-out), box-shadow 0.24s var(--ease-out);
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

        .menu-search-wrap {
          position: relative;
        }

        .menu-search-icon {
          position: absolute;
          left: 0.78rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          opacity: 0.7;
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .menu-search {
          padding-left: 2.4rem;
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

        .search-suggestions {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 12px;
          box-shadow: var(--shadow);
          list-style: none;
          padding: 0.4rem;
          margin: 0;
          z-index: 10;
          max-height: 200px;
          overflow-y: auto;
        }

        .search-suggestions li {
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          cursor: pointer;
          color: var(--text);
          font-size: 0.9rem;
          transition: background 0.15s var(--ease-out);
        }
        .search-suggestions li:hover,
        .search-suggestions li:focus {
          background: color-mix(in srgb, var(--brand) 12%, transparent);
          outline: none;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .chip {
          background: var(--bg-elevated);
          border-color: var(--stroke);
          color: var(--muted);
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        .chip-active {
          background: linear-gradient(135deg, var(--brand), var(--brand-strong));
          color: #fff;
          border-color: transparent;
        }

        @media (max-width: 860px) {
          .chip {
            min-height: 48px;
            padding: 0.75rem 1rem;
          }
          .menu-filter-toggle {
            min-height: 48px;
          }
          .menu-count {
            min-height: 48px;
            display: flex;
            align-items: center;
          }
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
          transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
        }

        .menu-card-image {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .menu-card-image h3,
        .menu-card-image p,
        .menu-card-image .menu-category-tag {
          color: #fff;
        }

        .menu-card-image .menu-category-tag {
          border-color: rgba(255, 255, 255, 0.34);
          background: rgba(0, 0, 0, 0.24);
        }

        .menu-card-image .ghost-btn {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.38);
        }

        .menu-card-image .ghost-btn:hover {
          background: rgba(255, 255, 255, 0.16);
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
          font-size: 0.8rem;
          padding: 0.6rem 0.85rem;
          min-height: 44px;
        }

        @media (max-width: 860px) {
          .menu-mini-btn {
            min-height: 48px;
            padding: 0.75rem 1rem;
          }
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
          transition: transform 0.2s var(--ease-out);
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
          font-size: 1rem;
          padding: 1rem 1rem;
          outline: none;
          min-height: 48px;
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
          gap: 0.5rem;
          padding: 1rem 0;
        }

        .mobile-menu-card {
          margin: 0.5rem auto 1rem;
          padding: 1rem;
          border-radius: 16px;
          border: 1px solid var(--stroke);
          background: color-mix(in srgb, var(--bg-elevated) 94%, transparent);
          box-shadow: var(--shadow);
        }

        .mobile-link {
          border: 1px solid var(--stroke);
          border-radius: 12px;
          padding: 1rem 1.2rem;
          text-decoration: none;
          color: var(--muted);
          font-weight: 500;
          font-size: 1rem;
          transition: background 0.2s var(--ease-out), color 0.2s var(--ease-out);
          min-height: 48px;
          display: flex;
          align-items: center;
        }

        .mobile-link:hover {
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          color: var(--text);
        }

        .mobile-order {
          margin-top: 0.5rem;
          justify-content: center;
          display: inline-flex;
          min-height: 52px;
          padding: 1rem 2rem;
        }

        /* Enhanced Contact Section Styles */
        .contact-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .contact-info-panel {
          display: grid;
          gap: 1.5rem;
        }

        .info-card {
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }

        .info-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.35rem;
          color: var(--text);
        }

        .info-desc {
          margin: 0 0 1.5rem;
          color: var(--muted);
          line-height: 1.7;
        }

        .contact-details {
          display: grid;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--stroke);
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s var(--ease-out), background 0.2s var(--ease-out), transform 0.2s var(--ease-out);
        }

        .contact-detail:hover {
          border-color: var(--brand);
          background: color-mix(in srgb, var(--brand) 6%, transparent);
          transform: translateX(4px);
        }

        .detail-icon {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }

        .detail-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: var(--brand);
        }

        .detail-value {
          font-size: 0.9rem;
          color: var(--text);
          word-break: break-word;
        }

        .social-links {
          padding-top: 1.5rem;
          border-top: 1px solid var(--stroke);
        }

        .social-links h4 {
          margin: 0 0 1rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 600;
        }

        .social-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          border-radius: 999px;
          border: 1px solid;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .map-placeholder {
          background: var(--bg-soft);
          border: 1px solid var(--stroke);
          border-radius: 20px;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .map-placeholder::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H0v4H0v2h4v4h2v-4h4v-2H6zM6 6V0H0v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .map-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem;
        }

        .map-link {
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .map-link:hover {
          opacity: 0.8;
        }

        .contact-form-panel {
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow);
          position: sticky;
          top: 100px;
        }

        .form-header {
          margin-bottom: 1.5rem;
        }

        .form-header h3 {
          margin: 0 0 0.5rem;
          font-size: 1.35rem;
        }

        .form-subtitle {
          margin: 0;
          color: var(--muted);
          font-size: 0.9rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field {
          display: grid;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .required {
          color: var(--brand);
        }

        .form-field input,
        .form-field textarea {
          border: 1px solid var(--stroke);
          border-radius: 12px;
          background: var(--bg);
          color: var(--text);
          font: inherit;
          font-size: 1rem;
          padding: 1rem 1rem;
          outline: none;
          min-height: 48px;
          transition: border-color 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
        }

        .form-field input:hover,
        .form-field textarea:hover {
          border-color: color-mix(in srgb, var(--brand) 40%, var(--stroke));
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
        }

        .form-field input.input-error,
        .form-field textarea.input-error {
          border-color: var(--destructive, #dc2626);
        }

        .form-field input.input-error:focus,
        .form-field textarea.input-error:focus {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--destructive, #dc2626) 20%, transparent);
        }

        .form-error {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin: 0;
          font-size: 0.8rem;
          color: var(--destructive, #dc2626);
        }

        .form-hint {
          margin: 0;
          font-size: 0.75rem;
          color: var(--muted);
          text-align: right;
        }

        .form-submit {
          margin-top: 0.5rem;
        }

        .submit-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.875rem 1rem;
          background: color-mix(in srgb, var(--brand) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--brand) 30%, transparent);
          border-radius: 12px;
          color: var(--brand);
          font-weight: 500;
          font-size: 0.9rem;
          animation: fadeIn 0.3s var(--ease-out);
        }

        .submit-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.875rem 1rem;
          background: color-mix(in srgb, var(--destructive, #dc2626) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--destructive, #dc2626) 30%, transparent);
          border-radius: 12px;
          color: var(--destructive, #dc2626);
          font-weight: 500;
          font-size: 0.9rem;
          animation: fadeIn 0.3s var(--ease-out);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          display: inline-block;
        }

        .contact-trust {
          padding: 2rem;
          background: var(--bg-elevated);
          border: 1px solid var(--stroke);
          border-radius: 20px;
          box-shadow: var(--shadow);
        }

        /* Press feedback — :active states */
        .nav-link:active,
        .solid-btn:active,
        .ghost-btn:active,
        .theme-btn:active,
        .menu-toggle:active,
        .chip:active,
        .mobile-link:active,
        .contact-detail:active,
        .trust-item:active {
          transform: scale(0.97);
          transition: transform 160ms var(--ease-out);
        }

        .menu-card:active {
          transform: scale(0.99) translateY(-1px);
          transition: transform 160ms var(--ease-out), box-shadow 160ms var(--ease-out);
        }

        .gallery-item:active img {
          transform: scale(1.02);
          transition: transform 160ms var(--ease-out);
        }

        .form-field input:active,
        .form-field textarea:active {
          transform: scale(0.995);
          transition: transform 120ms var(--ease-out);
        }

        .social-btn:active,
        .map-link:active,
        .mobile-order:active,
        .form-submit-btn:active {
          transform: scale(0.97);
          transition: transform 160ms var(--ease-out);
        }

        @media (max-width: 960px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }

          .contact-form-panel {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .info-card,
          .contact-form-panel {
            padding: 1.5rem;
          }

          .contact-detail {
            padding: 0.875rem;
          }

          .social-row {
            flex-direction: column;
          }

          .social-btn {
            justify-content: center;
          }
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
