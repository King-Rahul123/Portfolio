import React, { useEffect, useRef, useState } from 'react';
import './portfolio.css';

function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    images[fileName] = r(key).default || r(key);
  });
  return images;
}
const images = importAll(require.context('../picture', false, /\.(png|jpe?g|svg)$/));

export default function Portfolio({
  name = 'Rahul Kumar Adak',
  role = 'Full-stack Developer • UI/UX Enthusiast',
  avatar = images['RKA.jpg'],
  projects = [],
  techs = []
}) {
  
  techs = [
    { id: 1, name: "C", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" },
    { id: 2, name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { id: 3, name: "HTML", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
    { id: 4, name: "CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
    { id: 5, name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
    { id: 6, name: "ReactJS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
    { id: 7, name: "Node.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
    { id: 8, name: "Django", logo: "https://www.svgrepo.com/show/353657/django-icon.svg" },
    { id: 9, name: "Firebase", logo: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
    { id: 10, name: "MySQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" }
  ];

  projects = [
    {
      id: 1,
      title: "Portfolio Hub",
      description: "A dynamic portfolio generator that lets users create a fully designed, personalized portfolio by simply entering their details. Includes real-time preview, theme customization, and instant export for sharing or hosting.",
      tags: ["React", "Bootstrap", "Python", "Firebase"],
      logo: images['portfolio_generator.png'],
      github: "https://github.com/your-username/portfolio-hub",
      demo: "https://portfolio-hub.example.com"
    },

    {
      id: 2,
      title: "Ecommerce Site",
      description: "A full-fledged e-commerce platform featuring product browsing, cart management, secure authentication, and an admin dashboard for analytics and inventory control. Built for responsive UI and smooth user experience.",
      tags: ["Node.js", "MongoDB", "React", "Express"],
      logo: "https://cdn-icons-png.flaticon.com/512/3523/3523886.png",
      github: "https://github.com/your-username/ecommerce-site",
      demo: "https://ecommerce-site.example.com"
    }
  ];

  const canvasRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [introLines, setIntroLines] = useState([]);
  const [typedRole, setTypedRole] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [flipped, setFlipped] = useState({});
  const timeoutsRef = useRef({});

  // toggle flip when user clicks (front -> back or back -> front)
  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
    // clear any pending timeout for this card
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  };

  // open links without letting the click propagate to the card (so it won't flip)
  const openLink = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // call on mouse enter to cancel auto-flip
  const handleMouseEnter = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  };

  // call on mouse leave to schedule auto flip-back
  const handleMouseLeave = (id) => {
    // give a small delay to avoid reactive flipping when the cursor briefly leaves
    if (timeoutsRef.current[id]) clearTimeout(timeoutsRef.current[id]);
    timeoutsRef.current[id] = setTimeout(() => {
      setFlipped(prev => ({ ...prev, [id]: false }));
      delete timeoutsRef.current[id];
    }, 700); // 700ms delay before flipping back
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      // use smooth scroll. We still set activeSection above to ensure UI updates even if scroll event
      // does not fire or is too small.
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 18; 
        const rotateX = ((y / rect.height) - 0.5) * -18;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1.5
    }));

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, w, h);
      ctx.filter = 'blur(3px)';

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, '#FFD700');
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const lines = [
      `// ${name} — Portfolio`,
      'console.log("Loading...")',
      'console.log("Ready!")'
    ];

    let mounted = true;
    let currentLine = 0;
    let charIndex = 0;

    function typeNextChar() {
      if (!mounted) return;

      charIndex++;
      if (charIndex <= lines[currentLine].length) {
        setIntroLines(lines.slice(0, currentLine).concat([lines[currentLine].slice(0, charIndex)]));
        setTimeout(typeNextChar, 25);
      } else {
        currentLine++;
        charIndex = 0;
        if (currentLine < lines.length) {
          setTimeout(typeNextChar, 250);
        } else {
          setTimeout(() => mounted && setIntroVisible(false), 500);
        }
      }
    }

    setTimeout(() => typeNextChar(), 200);
    return () => (mounted = false);
  }, [name]);
  
  // ✅ Typewriter animation for the role
  useEffect(() => {
    let index = 0;
    const speed = 50; // typing speed

    function typeRole() {
      if (index < role.length) {
        setTypedRole(role.slice(0, index + 1));
        index++;
        setTimeout(typeRole, speed);
      }
    }

    // Start after intro disappears
    if (!introVisible) {
      setTimeout(typeRole, 300);
    }
  }, [introVisible, role]);

  // Replace your existing scroll-useEffect with this (more robust detection)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    function handleScroll() {
      // Anchor point inside viewport to judge "closest" section
      const anchorY = window.scrollY + window.innerHeight * 0.3;

      let closest = null;
      let minDistance = Infinity;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const secTopAbsolute = window.scrollY + rect.top;
        const distance = Math.abs(secTopAbsolute - anchorY);

        if (distance < minDistance) {
          minDistance = distance;
          closest = sec.id;
        }
      });

      if (closest && closest !== activeSection) {
        setActiveSection(closest);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to initialize correctly (in case the page isn't at the top)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="portfolio-root">
      <canvas ref={canvasRef} className="portfolio-canvas" />

      {introVisible && (
        <div className="intro-overlay">
          <div className="intro-box">
            <pre className="intro-code">
              {introLines.map((line, i) => (
                <div key={i}>
                  {line}
                  {i === introLines.length - 1 && <span className="cursor" />}
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {!introVisible && (
        <div className="portfolio-content">
          <header className="navbar">
            <div className="nav-left">
              <h2 className="nav-logo">RKA</h2>
            </div>

            <nav className="nav-links">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === "home" ? "active-link" : ""}>Home</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === "about" ? "active-link" : ""}>About</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === "skills" ? "active-link" : ""}>Skills</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === "projects" ? "active-link" : ""}>Projects</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === "contact" ? "active-link" : ""}>Contact</a>
            </nav>
          </header>

          <section id='home' className='section'>
            <div className="title-bar">
              <h1 className="title">{name}</h1>
              <p className="subtitle">{typedRole}</p>
            </div>

            <div className="title-bar">
              <h1 className='title'>Welcome</h1>
              <p className="text-light">Thanks for visiting my portfolio. Scroll down to explore my work and skills.</p>
            </div>
          </section>

          <section id='about' className="about">
            <img src={avatar} className="avatar" alt="Avatar" />
            <div>
              <h2 className="section-title">About Me</h2>
              <p className="text-light">
                I’m a full-stack developer with a strong focus on building fast, modern, and intuitive web applications.
                My core journey began with programming fundamentals in C and Python, which shaped my problem-solving approach and logical thinking.
              </p>
              <p className="text-light">
                On the front-end, I work with HTML, CSS, JavaScript, and ReactJS, crafting elegant interfaces that feel smooth and responsive.
                On the back-end, I develop robust application logic using Node.js and Django, ensuring performance, scalability, and security.
              </p>
              <p className='text-light'>
                I also work with databases like Firebase and SQL (PHP MySQL) for managing data, authentication, cloud functions, and real-time updates.
              </p>
              <p className="text-light">
                I enjoy transforming ideas into clean, functional products—combining creativity with strong technical foundations.
                Every project I build is a chance to learn, improve, and push my skills to the next level.
              </p>

              <button className='resume-btn' style={{width:'20%'}}>Resume</button>
            </div>
          </section>

          <section id='skills'>
            <h2 className="section-title">Tech Skills</h2>
            <div className="tech-list">
              {techs.map((t) => (
                <div key={t.id} className="tech-item">
                  <img src={t.logo} alt={t.name} className="tech-icon" />
                  <span className="tech-tooltip">{t.name}</span>
                </div>
              ))}
            </div>
            <hr />
          </section>

          <section id='projects'>
            <h2 className="section-title center">Projects</h2>
            <div className="projects">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className={`project-card flip-card ${flipped[p.id] ? "flipped" : ""}`}
                  onClick={() => toggleFlip(p.id)}
                  onMouseEnter={() => handleMouseEnter(p.id)}
                  onMouseLeave={() => handleMouseLeave(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(p.id); }}
                  aria-pressed={!!flipped[p.id]}
                >
                  <div className="flip-card-inner">
                    {/* FRONT */}
                    <div className="flip-card-front">
                      <img src={p.logo} alt={`${p.title} logo`} className="project-logo" />
                      <h3 className="project-title">{p.title}</h3>

                      <div className="project-links" onClick={(e) => e.stopPropagation()}>
                        {p.github && (
                          <button
                            className="icon-btn"
                            onClick={(e) => openLink(e, p.github)}
                            aria-label={`${p.title} GitHub`}
                            title="Open GitHub"
                          >
                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png" alt="github" />
                          </button>
                        )}
                        {p.demo && (
                          <button
                            className="icon-btn"
                            onClick={(e) => openLink(e, p.demo)}
                            aria-label={`${p.title} Demo`}
                            title="Open Demo"
                          >
                            <img src="https://cdn-icons-png.flaticon.com/512/3183/3183404.png" alt="demo" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* BACK — no description, solid non-transparent background */}
                    <div className="flip-card-back">
                      <div className="project-back-inner">
                        <h3 className="project-title">{p.title}</h3>

                        <p className="project-desc">{p.description}</p>

                        <div className="project-tags">
                          {p.tags.map((t, i) => (
                            <span key={t} className="tag">{t}{i < p.tags.length - 1 ? " • " : ""}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id='contact'>
            <h2 className="section-title center">Contact Me</h2>

            {/* Contact Form */}
            <form className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>

              <div className="form-group">
                <label>Your Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea placeholder="Write your message..." rows="4" required></textarea>
              </div>

              <button type="submit" className="contact-btn" style={{width:'100%'}}>Send Message</button>
            </form>
            {/* ✅ Social Media Icons */}
            <div className="social-icons">
              <a href="https://wa.me/8145322318" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
              </a>

              <a href="https://facebook.com/share/1Baiegjrux/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
              </a>

              <a href="https://instagram.com/rahul_adak1" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
              </a>

              <a href="https://linkedin.com/in/rahul-adak-b93463303" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" />
              </a>

              <a href="https://github.com/King-Rahul123" target="" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png" style={{ background: 'white', borderRadius: '50%'}} alt="GitHub" />
              </a>
            </div>

            {/* Your Details */}
            <div className="contact-details">
              <h3 className="details-title">My Contact Info</h3>

              <p><strong>Name:</strong> Rahul Kumar Adak</p>
              <p><strong>Email:</strong> adakrahul15@gmail.com</p>
              <p><strong>Phone:</strong> +91 8145322318</p>
              <p><strong>Location:</strong> Paschim Medinipur, India</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}