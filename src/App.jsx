import { useState, useEffect, useRef } from "react";
import "./index.css";

/* ── Real Unsplash images ─────────────────────────────────────── */
const IMG = {
  hero:  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
  about: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80",
  ],
};

/* ── Custom Cursor ────────────────────────────────────────────── */
function Cursor() {
  const cRef = useRef(), rRef = useRef();
  useEffect(() => {
    const move = e => {
      if (cRef.current) { cRef.current.style.left = e.clientX + "px"; cRef.current.style.top = e.clientY + "px"; }
      if (rRef.current) { rRef.current.style.left = e.clientX + "px"; rRef.current.style.top = e.clientY + "px"; }
    };
    const over = () => { cRef.current?.classList.add("expand"); rRef.current?.classList.add("expand"); };
    const out  = () => { cRef.current?.classList.remove("expand"); rRef.current?.classList.remove("expand"); };
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<><div className="cursor" ref={cRef} /><div className="cursor-ring" ref={rRef} /></>);
}

/* ── Theme Toggle ─────────────────────────────────────────────── */
function ThemeToggle({ theme, toggle }) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className="t-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="t-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

/* ── Navbar ───────────────────────────────────────────────────── */
function Navbar({ menuOpen, setMenuOpen, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Services", "Gallery", "Testimonials", "Contact"];
  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#home" className="nav-logo">
          POP <span className="nav-logo-dot" />
        </a>
        <ul className="nav-links">
          {links.map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}
        </ul>
        <div className="nav-right">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <a href="#booking" className="nav-cta">Book Now</a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px,6px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-6px)" : "none" }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="#booking" className="mob-cta" onClick={() => setMenuOpen(false)}>Book Now</a>
        <button className="mob-toggle" onClick={() => { toggleTheme(); setMenuOpen(false); }}>
          {theme === "dark" ? "☀️  Switch to Light" : "🌙  Switch to Dark"}
        </button>
      </div>
    </>
  );
}

/* ── Marquee Strip ────────────────────────────────────────────── */
function Marquee() {
  const items = ["Weddings","Corporate Events","Gala Dinners","Outdoor Parties","Concerts","Award Ceremonies","Private Celebrations","Festivals"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span className="m-item" key={i}>
            <span className="m-dot">✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-blob1" />
      <div className="hero-blob2" />
      <div className="hero-grid-overlay" />

      {/* LEFT */}
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-dot" />
          Premium Event Experiences
        </div>
        <h1 className="hero-title">
          Where Every<br />
          <em>Moment</em> Becomes<br />
          A Masterpiece
        </h1>
        <p className="hero-sub">
          POP Interiors crafts extraordinary events that transcend the ordinary — from intimate gatherings to grand celebrations, every detail is an art form.
        </p>
        <div className="hero-btns">
          <a href="#booking" className="btn-green">Plan Your Event →</a>
          <a href="#gallery" className="btn-outline">View Our Work</a>
        </div>
        <div className="hero-stats-row">
          {[["500+","Events Crafted"],["12+","Years Experience"],["98%","Satisfaction Rate"]].map(([n,l]) => (
            <div className="h-stat" key={l}>
              <div className="h-stat-n">{n}</div>
              <div className="h-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="hero-img-frame">
          <img src={IMG.hero} alt="Luxury event setup" loading="eager" />
        </div>
        <div className="hero-fc1">
          <div className="fc-n">500+</div>
          <div className="fc-l">Events Delivered</div>
        </div>
        <div className="hero-fc2">
          <div className="fc-n2">98%</div>
          <div className="fc-l2">Happy Clients</div>
        </div>
      </div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div className="reveal"><span className="eyebrow">Our Story</span></div>
        <h2 className="sec-title reveal d1">Crafting <em>Unforgettable</em><br />Experiences</h2>
        <p className="sec-sub reveal d2">From boutique studio to Kenya's most sought-after event management company — we believe every event tells a story, and we are the authors.</p>

        <div className="about-grid">
          <div className="about-img-wrap reveal">
            <div className="about-img-main">
              <img src={IMG.about} alt="POP Interiors team" loading="lazy" />
            </div>
            <div className="about-badge-card">
              <div className="ab-n">12+</div>
              <div className="ab-l">Years of Excellence</div>
            </div>
            <div className="about-accent-card">
              {["Bespoke Design","Premium Vendors","Flawless Execution"].map(t => (
                <div className="ac-row" key={t}><span className="ac-dot" />{t}</div>
              ))}
            </div>
          </div>

          <div>
            <p className="about-p reveal d1">
              Founded with a passion for perfection, POP Interiors has grown from a boutique event studio into one of Kenya's most sought-after event management companies. We believe every event tells a story — and we are the authors.
            </p>
            <p className="about-p reveal d2">
              Our team of dedicated designers, coordinators, and creatives bring years of expertise to every engagement. From the first consultation to the final farewell, we orchestrate experiences that leave lasting impressions.
            </p>
            <div className="qualities reveal d3">
              {["Bespoke Design","Flawless Execution","Premium Vendors","24/7 Support","Creative Vision","Budget Mastery"].map(q => (
                <div className="q-item" key={q}>
                  <span className="q-check">✓</span>{q}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }} className="reveal d4">
              <a href="#services" className="btn-green">Explore Services →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────────── */
function Services() {
  const svcs = [
    { icon:"💒", num:"01", title:"Weddings & Ceremonies",  desc:"Your love story deserves a stage as beautiful as your bond. We design weddings that are deeply personal, visually stunning, and emotionally resonant." },
    { icon:"🏛️", num:"02", title:"Corporate Events",       desc:"From high-stakes conferences to galas, we deliver corporate events that impress stakeholders and inspire teams through seamless execution." },
    { icon:"🎵", num:"03", title:"Concerts & Festivals",   desc:"Our expertise in large-scale productions ensures every performance is a spectacle — staging, sound, lighting, and crowd management perfected." },
    { icon:"🎂", num:"04", title:"Private Celebrations",   desc:"Birthdays, anniversaries, baby showers — we pour the same meticulous attention to detail into every private celebration, no matter the scale." },
    { icon:"🍽️", num:"05", title:"Gala Dinners & Awards",  desc:"Sophisticated gala evenings and award ceremonies that honour achievement in style — from venue dressing to impeccable catering." },
    { icon:"🌿", num:"06", title:"Outdoor & Garden Events", desc:"Nature as your backdrop. We transform outdoor spaces into breathtaking venues with custom structures, lighting, and contingency planning." },
  ];
  return (
    <section className="services-section" id="services">
      <div className="services-inner">
        <div className="reveal"><span className="eyebrow">What We Do</span></div>
        <h2 className="sec-title reveal d1">Our <em>Signature</em> Services</h2>
        <p className="sec-sub reveal d2">World-class event management tailored to every occasion and every dream.</p>
        <div className="services-grid">
          {svcs.map((s, i) => (
            <div className="svc-card reveal" key={s.num} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="svc-num">{s.num}</div>
              <div className="svc-icon-wrap">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <a href="#booking" className="svc-link">Enquire Now →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ──────────────────────────────────────────────────── */
function Gallery() {
  const items = [
    { cls:"big",  label:"Grand Wedding Ceremony",  img: IMG.gallery[0] },
    { cls:"tall", label:"Corporate Gala Night",    img: IMG.gallery[1] },
    { cls:"wide", label:"Concert & Stage",         img: IMG.gallery[2] },
    { cls:"sq",   label:"Intimate Dinner",         img: IMG.gallery[3] },
    { cls:"sq",   label:"Award Ceremony",          img: IMG.gallery[4] },
    { cls:"sq",   label:"Outdoor Festival",        img: IMG.gallery[5] },
    { cls:"med",  label:"Birthday Celebration",    img: IMG.gallery[6] },
    { cls:"med",  label:"Garden Party",            img: IMG.gallery[7] },
    { cls:"med",  label:"Wedding Decor",           img: IMG.gallery[8] },
  ];
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-inner">
        <div className="reveal"><span className="eyebrow">Our Portfolio</span></div>
        <h2 className="sec-title reveal d1">Events We've <em>Brought to Life</em></h2>
        <p className="sec-sub reveal d2">A glimpse into our world of meticulously crafted events — every image a story, every moment perfected.</p>
        <div className="gallery-grid">
          {items.map((item, i) => (
            <div className={`g-item ${item.cls} reveal`} key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
              <img src={item.img} alt={item.label} loading="lazy" />
              <div className="g-overlay">
                <span className="g-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────────── */
function Testimonials() {
  const list = [
    { q:"POP Interiors turned our wedding into a fairy tale. Every detail was beyond what we imagined. The team's passion and professionalism were evident in every single element of the day.", name:"Amara & David Ochieng", role:"Wedding Clients", init:"A" },
    { q:"Our annual company gala was the most impressive one yet. POP Interiors understood our brand, our people, and delivered an experience that generated buzz for months afterward.", name:"Christine Waweru", role:"CEO, Greenfield Corp", init:"C" },
    { q:"From outdoor lighting to catering — every element was flawless. None as thoughtfully executed as the garden party POP Interiors organised for us. Exceptional in every way.", name:"James Kamau", role:"Private Client", init:"J" },
  ];
  return (
    <section className="testi-section" id="testimonials">
      <div className="testi-inner">
        <div className="reveal"><span className="eyebrow">Kind Words</span></div>
        <h2 className="sec-title reveal d1">What Our <em>Clients</em> Say</h2>
        <p className="sec-sub reveal d2">Real stories from clients who trusted us with their most important moments.</p>
        <div className="testi-grid">
          {list.map((t, i) => (
            <div className="testi-card reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
              <span className="tq-mark">"</span>
              <div className="stars">★★★★★</div>
              <p className="testi-text">"{t.q}"</p>
              <div className="testi-author">
                <div className="testi-av">{t.init}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Booking ──────────────────────────────────────────────────── */
function Booking() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", eventType:"", date:"", guests:"", venue:"", budget:"", message:"" });
  const [done, setDone] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const sub = e => { e.preventDefault(); setDone(true); setTimeout(() => setDone(false), 5000); };

  const infos = [
    { icon:"📍", lbl:"Visit Us",      val:"Westlands Business District, Nairobi, Kenya" },
    { icon:"📞", lbl:"Call Us",       val:"+254 705 806 720  /  254 798 326 733· Mon–Fri, 8am–7pm   Sun: 9:00am - 1:00pm" },
    { icon:"✉️", lbl:"Email Us",      val:"popbylui@gmail.com" },
    { icon:"⏰", lbl:"Response Time", val:"We'll be in touch within 24 hours of your enquiry." },
  ];

  return (
    <section className="book-section" id="booking">
      <div className="book-inner">
        <div className="reveal"><span className="eyebrow">Start Planning</span></div>
        <h2 className="sec-title reveal d1">Book Your <em>Dream Event</em></h2>
        <p className="sec-sub reveal d2">Tell us your vision and let us bring it to life — beautifully.</p>
        <div className="book-grid">
          {/* Info */}
          <div>
            {infos.map((info, i) => (
              <div className="book-info reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="book-icon">{info.icon}</div>
                <div>
                  <div className="book-lbl">{info.lbl}</div>
                  <div className="book-val">{info.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="form-card reveal d2">
            {done ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <div className="success-ttl">Thank You!</div>
                <p className="success-txt">Your enquiry has been received. Our team will be in touch within 24 hours to begin planning your perfect event.</p>
              </div>
            ) : (
              <form className="the-form" onSubmit={sub}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" name="name" value={form.name} onChange={set} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={set} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={set} placeholder="+254 700 000 000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Type *</label>
                    <select className="form-select" name="eventType" value={form.eventType} onChange={set} required>
                      <option value="">Select event type</option>
                      <option>Wedding & Ceremony</option>
                      <option>Corporate Event</option>
                      <option>Concert & Festival</option>
                      <option>Private Celebration</option>
                      <option>Gala Dinner & Awards</option>
                      <option>Outdoor & Garden Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Event Date</label>
                    <input className="form-input" type="date" name="date" value={form.date} onChange={set} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expected Guests</label>
                    <select className="form-select" name="guests" value={form.guests} onChange={set}>
                      <option value="">Select range</option>
                      <option>1 – 50 guests</option>
                      <option>50 – 150 guests</option>
                      <option>150 – 300 guests</option>
                      <option>300 – 500 guests</option>
                      <option>500+ guests</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Venue</label>
                    <input className="form-input" name="venue" value={form.venue} onChange={set} placeholder="Do you have a venue in mind?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Approximate Budget</label>
                    <select className="form-select" name="budget" value={form.budget} onChange={set}>
                      <option value="">Select range</option>
                      <option>Under KES 100,000</option>
                      <option>KES 100,000 – 300,000</option>
                      <option>KES 300,000 – 600,000</option>
                      <option>KES 600,000 – 1,000,000</option>
                      <option>Above KES 1,000,000</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Tell Us More</label>
                  <textarea className="form-textarea" name="message" value={form.message} onChange={set} placeholder="Share your vision, theme ideas, or any special requirements..." />
                </div>
                <button type="submit" className="btn-green" style={{ width:"100%", justifyContent:"center", border:"none", fontSize:14 }}>
                  Submit Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const sub = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  const details = [
    { lbl:"Email",    val:"popbylui@gmail.com" },
    { lbl:"Phone",    val:"+254 705 806 720 / 254 798 326 733" },
    { lbl:"Location", val:"Westlands, Nairobi, Kenya" },
    { lbl:"Hours",    val:"Mon–Fri: 8:00am – 7:00pm   Sun : 9:00am – 1:00pm" },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="reveal"><span className="eyebrow">Get In Touch</span></div>
        <h2 className="sec-title reveal d1">Let's Start a <em>Conversation</em></h2>
        <p className="sec-sub reveal d2">Whether you have a question or want to discuss your next event — we're always happy to hear from you.</p>

        <div className="contact-grid" style={{ marginTop: 56 }}>
          <div>
            {details.map((d, i) => (
              <div className="c-detail reveal" key={d.lbl} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="c-label">{d.lbl}</div>
                <div className="c-val">{d.val}</div>
              </div>
            ))}
          </div>

          <div className="form-card reveal d2">
            {sent ? (
              <div className="form-success">
                <div className="success-icon">💬</div>
                <div className="success-ttl">Message Sent!</div>
                <p className="success-txt">Thank you for reaching out. We'll be in touch very soon.</p>
              </div>
            ) : (
              <form className="the-form" onSubmit={sub}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" value={form.name} onChange={set} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={set} placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" name="message" value={form.message} onChange={set} placeholder="How can we help you?" required />
                </div>
                <button type="submit" className="btn-green" style={{ width:"100%", justifyContent:"center", border:"none", fontSize:14 }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">POP <span className="f-dot" /></div>
          <p className="footer-desc">Creating extraordinary events across Kenya and beyond. Every detail, every moment, every memory — crafted with excellence.</p>
        </div>
        <div>
          <div className="footer-hd">Services</div>
          <ul className="footer-links">
            {["Weddings","Corporate Events","Concerts","Private Parties","Gala Dinners","Outdoor Events"].map(s => (
              <li key={s}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-hd">Company</div>
          <ul className="footer-links">
            {["About Us","Our Portfolio","Testimonials","Book an Event","Contact Us"].map(s => (
              <li key={s}><a href={`#${s.toLowerCase().replace(/ /g,"-")}`}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-hd">Contact</div>
          <ul className="footer-links">
            <li><a href="#">popbylui@gmail.com</a></li>
            <li><a href="#">+254 705 806 720 / 254 798 326 733</a></li>
            <li><a href="#">Westlands, Nairobi</a></li>
            <li><a href="#">Mon–Fri: 8am – 7pm   Sun : 9:00am – 1:00pm</a></li>
          </ul>
        </div>
      </div>
      <div className="green-divider" />
      <div className="footer-bottom" style={{ marginTop: 28 }}>
        <p className="footer-copy">© 2026 <span>POP Interiors</span>. All rights reserved. Crafted with passion in Nairobi.</p>
        <div className="social-links">
          {["f","in","ig","tw"].map(s => <a key={s} href="#" className="social-link">{s}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ── Scroll Reveal ────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── App ──────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  useScrollReveal();

  return (
    <>
      <Cursor />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <About />
      <div className="divider" />
      <Services />
      <div className="divider" />
      <Gallery />
      <Testimonials />
      <Booking />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}
