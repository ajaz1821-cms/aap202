import { useMemo, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Instagram,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type Shoe = {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  color: string;
  image: string;
  badge?: string;
};

const products: Shoe[] = [
  { id: 1, name: "The Sunday Court", type: "Leather court sneaker", category: "Everyday", price: 128, color: "Butter / Wine", image: "/manus-storage/aap202-court_03b95a74.jpg", badge: "Best seller" },
  { id: 2, name: "Cloudline 02", type: "Everyday running shoe", category: "Running", price: 154, color: "Mist / Cobalt", image: "/manus-storage/aap202-runner_33b8d0ff.jpg", badge: "New color" },
  { id: 3, name: "Ridge Runner", type: "All-terrain trail shoe", category: "Trail", price: 168, color: "Moss / Ember", image: "/manus-storage/aap202-trail_c2bab48d.jpg" },
  { id: 4, name: "After Hours", type: "Hand-finished leather loafer", category: "Dress", price: 190, color: "Espresso", image: "/manus-storage/aap202-loafer_f7f452a0.jpg", badge: "Small batch" },
];

const categories = [
  { name: "Everyday", count: "Made for the long way home", tone: "category-sun", mark: "01" },
  { name: "Running", count: "A little more bounce", tone: "category-sky", mark: "02" },
  { name: "Trail", count: "Find your outside", tone: "category-moss", mark: "03" },
  { name: "Dress", count: "Good shoes, no occasion", tone: "category-rose", mark: "04" },
];

const filters = ["All shoes", "Everyday", "Running", "Trail", "Dress"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All shoes");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeFilter === "All shoes" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.type} ${product.color}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeFilter, query]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const addToBag = (shoe: Shoe) => {
    setCartCount((count) => count + 1);
    showNotice(`${shoe.name} added to your bag`);
  };

  const toggleSaved = (shoe: Shoe) => {
    const exists = saved.includes(shoe.id);
    setSaved((items) => exists ? items.filter((id) => id !== shoe.id) : [...items, shoe.id]);
    showNotice(exists ? "Removed from your saved shoes" : `${shoe.name} saved for later`);
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <main className="storefront">
      <div className="announcement"><Sparkles size={13} strokeWidth={1.8} /><span>Good shoes, good journeys — free shipping over $100</span><ArrowUpRight size={13} /></div>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Stride and Form home"><span className="wordmark-icon">s<span>·</span>f</span><span>STRIDE<span className="wordmark-amp">&</span>FORM</span></a>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop all</a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Find your stride</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our point of view</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-trigger" aria-label="Search shoes" onClick={() => setSearchOpen((open) => !open)}><Search size={19} /></button>
          <button className="bag-button" aria-label={`Open shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}><span className="bag-label">Bag</span><ShoppingBag size={18} /><span className="bag-count">{cartCount}</span></button>
          <button className="icon-button menu-trigger" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      {searchOpen && <div className="search-panel"><Search size={19} /><input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Try ‘running’ or ‘leather’" aria-label="Search shoe collection" /><button className="icon-button" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(""); }}><X size={18} /></button></div>}

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Independent footwear, thoughtfully made</div>
          <h1>Take the<br /><em>long way</em><br />home.</h1>
          <p className="hero-description">Good shoes change the pace of everything. Meet the pairs made to move with you, wherever the day wanders.</p>
          <div className="hero-cta-row"><a className="button button-dark" href="#shop">Shop the collection <ArrowRight size={17} /></a><span className="hero-note">Designed to go places.<br />Built to stay a while.</span></div>
          <div className="hero-proof"><div className="proof-stars" aria-label="Rated 4.9 out of 5">★★★★★</div><span>4.9 / 5 from 2,400+ happy feet</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img className="hero-image" src="/manus-storage/aap202-hero_81488a54.jpg" alt="A sculptural running shoe in a warm, sunlit studio" /><div className="hero-image-shade" /></div>
          <div className="hero-stamp"><span>WALK</span><span>YOUR</span><span>OWN</span><span>WAY</span></div>
          <div className="hero-product-note"><span className="note-line" /><div><b>Meet the Sunday Court</b><small>Your new everyday, upgraded.</small></div><a href="#shop" aria-label="Explore the Sunday Court"><ArrowUpRight size={18} /></a></div>
          <div className="hero-index">S/F — 2026 <span>01 / 04</span></div>
        </div>
        <a className="scroll-cue" href="#collections"><span>Scroll to explore</span><ArrowDown size={15} /></a>
      </section>

      <div className="ticker" aria-label="Our values"><div className="ticker-track">{Array.from({ length: 2 }, (_, group) => <span className="ticker-group" key={group}><span>MADE FOR THE MILES</span><i>✳</i><span>BETTER BY DESIGN</span><i>✳</i><span>COMFORT WITHOUT COMPROMISE</span><i>✳</i><span>MADE FOR THE MILES</span><i>✳</i></span>)}</div></div>

      <section className="collection-section section-shell" id="collections">
        <div className="section-heading"><div><div className="eyebrow">A good place to start <span className="eyebrow-rule" /></div><h2>What’s your <em>kind</em> of day?</h2></div><p>Four thoughtful takes on the shoes you reach for most. Pick a mood, we’ll find your pair.</p></div>
        <div className="category-grid">{categories.map((category) => <a className={`category-card ${category.tone}`} href="#shop" key={category.name} onClick={() => setActiveFilter(category.name)}><span className="category-number">{category.mark} / CATEGORY</span><span className="category-mark" aria-hidden="true">{category.mark === "01" ? "↗" : category.mark === "02" ? "〰" : category.mark === "03" ? "⌁" : "⌂"}</span><div className="category-bottom"><div><h3>{category.name}</h3><p>{category.count}</p></div><span className="category-arrow"><ArrowUpRight size={18} /></span></div></a>)}</div>
      </section>

      <section className="shop-section section-shell" id="shop">
        <div className="section-heading shop-heading"><div><div className="eyebrow">The good stuff <span className="eyebrow-rule" /></div><h2>Pairs with <em>personality.</em></h2></div><a href="#shop" className="text-link" onClick={(event) => { event.preventDefault(); setActiveFilter("All shoes"); setQuery(""); }}>See all four <ArrowRight size={16} /></a></div>
        <div className="shop-controls"><div className="filter-list" role="tablist" aria-label="Filter shoes by style">{filters.map((filter) => <button key={filter} role="tab" aria-selected={activeFilter === filter} className={`filter-pill ${activeFilter === filter ? "filter-active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><span className="result-count">{visibleProducts.length} considered pairs</span></div>
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((shoe, index) => <article className="product-card" key={shoe.id} style={{ "--card-index": index } as CSSProperties}><div className="product-image-wrap"><img src={shoe.image} alt={`${shoe.name} — ${shoe.type}`} className="product-image" loading="lazy" />{shoe.badge && <span className="product-badge">{shoe.badge}</span>}<button className={`save-button ${saved.includes(shoe.id) ? "is-saved" : ""}`} aria-label={saved.includes(shoe.id) ? `Remove ${shoe.name} from saved shoes` : `Save ${shoe.name}`} onClick={() => toggleSaved(shoe)}><Heart size={17} fill={saved.includes(shoe.id) ? "currentColor" : "none"} /></button><button className="quick-add" onClick={() => addToBag(shoe)}><span>Add to bag</span><span className="quick-add-icon"><ArrowUpRight size={16} /></span></button></div><div className="product-meta"><div><span className="product-type">{shoe.type}</span><h3>{shoe.name}</h3><span className="product-color"><i className={`swatch swatch-${shoe.category.toLowerCase()}`} />{shoe.color}</span></div><strong>${shoe.price}</strong></div></article>)}</div> : <div className="empty-results"><span>Nothing in this lane just yet.</span><button className="text-link" onClick={() => { setActiveFilter("All shoes"); setQuery(""); }}>See all shoes <ArrowRight size={16} /></button></div>}
      </section>

      <section className="story-section" id="story"><div className="story-orbit orbit-one" /><div className="story-orbit orbit-two" /><div className="story-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> A little less, a little better</div><h2>Keep good<br />company.<br /><em>Underfoot.</em></h2><p>We make the shoes you don’t have to think about. Thoughtful materials. Considered comfort. Nothing extra, except the extra mile.</p><a href="#shop" className="button button-light">Meet your next pair <ArrowUpRight size={17} /></a></div><div className="story-aside"><span className="story-aside-mark">S/F</span><p>Not a trend.<br />Not a treadmill.<br /><i>Your kind of movement.</i></p><span className="story-aside-small">Designed with intention<br />Worn on repeat</span></div><span className="story-vertical">THE EVERYDAY, ELEVATED — EST. 2026</span></section>

      <section className="promise-row section-shell"><div className="promise-intro"><span>THE S/F PROMISE</span><h2>Feel good.<br /><em>Go farther.</em></h2></div><div className="promise-item"><span className="promise-index">01</span><h3>Comfort, considered.</h3><p>Thoughtful cushioning and feet-first fit. The sort of comfort you notice by not noticing.</p></div><div className="promise-item"><span className="promise-index">02</span><h3>Better materials.</h3><p>Durable, responsibly selected materials made to look better with every mile.</p></div><div className="promise-item"><span className="promise-index">03</span><h3>Room to change your mind.</h3><p>Try them at home. Send them back within 30 days if they’re not your kind of pair.</p></div></section>

      <section className="newsletter-section"><div className="newsletter-sparkle">✳</div><div className="newsletter-copy"><div className="eyebrow">A note from the good side</div><h2>Fresh steps.<br /><em>Occasional emails.</em></h2><p>New pairs, thoughtful stories, and the odd reason to get outside. Never noise.</p></div><form className="newsletter-form" onSubmit={submitNewsletter}><label htmlFor="email-signup">Your email address</label><div className="email-input-row"><input id="email-signup" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button aria-label="Subscribe to our newsletter" type="submit">{subscribed ? <Check size={20} /> : <ArrowRight size={20} />}</button></div><small>{subscribed ? "You’re on the list. We’ll be in touch." : "By subscribing, you agree to hear from us. Unsubscribe anytime."}</small></form></section>

      <footer className="site-footer"><div className="footer-top"><a href="#top" className="wordmark footer-wordmark"><span className="wordmark-icon">s<span>·</span>f</span><span>STRIDE<span className="wordmark-amp">&</span>FORM</span></a><span className="footer-tagline">A better way to get there.</span><a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram"><Instagram size={18} /></a></div><div className="footer-bottom"><span>© 2026 Stride & Form. Take the long way.</span><div><a href="#story">Our story</a><a href="mailto:hello@strideandform.example">Get in touch</a><a href="#top">Back to top ↑</a></div><span className="footer-location">MADE FOR WHEREVER</span></div></footer>

      {notice && <div className="toast-note" role="status"><Check size={16} />{notice}</div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">Your next adventure</span><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={20} /></button></div>{cartCount ? <div className="drawer-body"><div className="drawer-shoe-icon"><ShoppingBag size={27} /></div><h3>Looking good already.</h3><p>{cartCount} {cartCount === 1 ? "pair" : "pairs"} in your bag. Checkout is a demo for now, but your next great walk is getting closer.</p><button className="button button-dark drawer-checkout" onClick={() => { setCartOpen(false); showNotice("Checkout is coming soon — thanks for exploring!"); }}>Continue to checkout <ArrowRight size={17} /></button><button className="drawer-keep-shopping" onClick={() => setCartOpen(false)}>Keep looking around</button></div> : <div className="drawer-body"><div className="drawer-shoe-icon"><ShoppingBag size={27} /></div><h3>Room for one good pair.</h3><p>Your bag’s taking a breather. Find a pair that feels like you.</p><button className="button button-dark drawer-checkout" onClick={() => setCartOpen(false)}>Explore the collection <ArrowRight size={17} /></button></div>}<div className="drawer-footer">FREE SHIPPING OVER $100 <span>✳</span> EASY 30-DAY RETURNS</div></aside></div>}
    </main>
  );
}
