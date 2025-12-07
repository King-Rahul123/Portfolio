import React, {useEffect, useRef, useState} from 'react';
import './portfolio.css';
import ProjectsFlip from './projects';

function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    images[fileName] = r(key).default || r(key);
  });
  return images;
}
const images = importAll(require.context('../picture', false, /\.(png|jpe?g|svg|pdf)$/));

export default function Portfolio(){
    const name = 'Rahul Kumar Adak';
    const title = 'Full‑Stack Developer';
    const about = `I'm a passionate developer who enjoys building polished web apps and developer tools. I work with Python, React, Node, HTML, CSS, JS, Django, Firebase and other databases. I do some projects with creative design and make it simpler.`;
    
    const techs = [
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

    const projects = [
        {
            id: 1,
            title: "Portfolio Hub",
            description: "A dynamic portfolio generator that lets users create a fully designed, personalized portfolio by simply entering their details. Includes real-time preview, theme customization, and instant export for sharing or hosting.",
            tags: ["React", "Bootstrap", "Python", "Firebase"],
            p:'WORKING ON PROCESS',
            logo: images['portfolio_generator.png'],
            github: "https://github.com/your-username/portfolio-hub",
            demo: "#"
        },
        {
            id: 2,
            title:'RideNGo',
            description:'RideNGo is a simple and fast platform for booking tourist buses and cars for any trip. It offers easy booking, affordable rides, and a reliable travel experience.',
            p:'WORKING ON PROCESS',
            tags:['Django'],
            logo: images['RideNGo.jpeg'],
            github: "",
            demo: "",
        },
        {
            id: 3,
            title:'SIDD AI',
            description:'SIDD AI is an advanced voice-controlled personal assistant designed for real-time system control and intelligent interaction. It understands spoken commands, performs system and app-level actions, and responds with human-like conversation.',
            // p:'WORKING ON PROCESS',
            tags:['Python'],
            logo: images['Sidd_Ai.png'],
            github: "https://github.com/King-Rahul123/SIDD_AI",
            demo: "",
        },
        // {
        //     id: 3,
        //     title:'Skill Badge Fetcher',
        //     description:'Dynamically shows icons for skills (like GitHub README badges) and uses them in portfolio cards.',
        //     tags:['React','API'],
        //     logo: "",
        //     github: "",
        //     demo: "",
        // },
    ];

    // theme
    const [theme, setTheme] = useState('dark');
    useEffect(()=>{document.documentElement.setAttribute('data-theme', theme);},[theme]);

    // particle canvas refs
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    // parallax refs
    const heroRef = useRef(null);

    useEffect(()=>{
        // init canvas particles
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        function random(min,max){return Math.random()*(max-min)+min}

        const particles = [];
        const NUM = Math.floor((w*h)/80000); // density scalable
        for(let i=0;i<NUM;i++){
        particles.push({
            x:random(0,w), y:random(0,h), vx:random(-0.25,0.25), vy:random(-0.25,0.25), r:random(1,3), life:random(60,240)
        });
        }
        particlesRef.current = particles;

        let mouse = {x:w/2,y:h/2,ax:0,ay:0};

        function onMove(e){
        mouse.x = e.clientX; mouse.y = e.clientY;
        }
        function onTouch(e){ if(e.touches && e.touches[0]){ mouse.x=e.touches[0].clientX; mouse.y=e.touches[0].clientY; }}

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onTouch,{passive:true});

        function step(){
            ctx.clearRect(0,0,w,h);
            for(let p of particles) {
                // attraction to mouse
                const dx = mouse.x - p.x; const dy = mouse.y - p.y; const d2 = dx*dx+dy*dy;
                if(d2 < 20000){ // within proximity
                const f = (1 - (Math.sqrt(d2)/140)) * 0.06;
                p.vx += dx * f;
                p.vy += dy * f;
                }
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.98; p.vy *= 0.98;

                // wrap
                if(p.x < -10) p.x = w+10; if(p.x > w+10) p.x = -10;
                if(p.y < -10) p.y = h+10; if(p.y > h+10) p.y = -10;

                // draw glow
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                ctx.fill();

                // subtle trail
                ctx.beginPath();
                ctx.fillStyle = 'rgba(123,97,255,0.08)';
                ctx.arc(p.x, p.y, p.r*5, 0, Math.PI*2);
                ctx.fill();
            }

            // lines between close particles
            for(let i=0;i<particles.length;i++){
                for(let j=i+1;j<particles.length;j++){
                    const a=particles[i], b=particles[j];
                    const dx=a.x-b.x, dy=a.y-b.y, dist=dx*dx+dy*dy;
                    if(dist<9000){
                        const alpha = 0.08 - dist/9000*0.08;
                        ctx.strokeStyle = `rgba(127,200,255,${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
                    }
                }
            }
            animationRef.current = requestAnimationFrame(step);
        }
        step();

        function onResize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
        window.addEventListener('resize', onResize);

        return ()=>{
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onTouch);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationRef.current);
        };
    },[]);

    // parallax hover for cards / profile
    useEffect(()=>{
        const root = heroRef.current;
        if(!root) return;
        const elems = root.querySelectorAll('.card, .profile-card');
        function onMove(e){
        const rect = root.getBoundingClientRect();
        const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
        const mx = e.clientX; const my = e.clientY;
        const dx = (mx - cx) / rect.width; const dy = (my - cy) / rect.height;
        elems.forEach(el=>{
            const depth = el.classList.contains('profile-card')?12:8;
            el.style.transform = `translate3d(${dx*depth}px, ${dy*depth}px, 0) rotateX(${dy*depth}deg) rotateY(${dx*depth}deg)`;
        });
        }
        function onLeave(){ elems.forEach(el=>el.style.transform='none'); }
        root.addEventListener('mousemove', onMove);
        root.addEventListener('mouseleave', onLeave);
        return ()=>{ root.removeEventListener('mousemove', onMove); root.removeEventListener('mouseleave', onLeave); };
    },[]);

    // compute projectsDone
    const projectsDone = projects.length ? Math.max(...projects.map(p => p.id)) : 0;

    return (
        <div className="portfolio-root">
            <canvas ref={canvasRef} className="particles-canvas" aria-hidden />

            <header className="topbar">
                <div className="header-flex">
                    <div className="logo"><img src={images['RKA_logo.png']} alt="RKA_Logo"/> {name.split(' ')[0]}</div>
                    <nav className="nav">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact" className="cta">Contact</a>
                        <button className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?'☀️':'🌙'}</button>
                    </nav>
                </div>
            </header>

            <main className="hero" ref={heroRef}>
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1 className="name-3d">{name}</h1>
                        <p className="lead">{title}</p>
                        <p className="about">{about}</p>
                        <div className="hero-actions">
                            <a className="btn" href="#projects">View Projects</a>
                        </div>
                        <div className="socials">
                            <a href="https://github.com/King-Rahul123">GitHub</a>
                            <a href="https://linkedin.com/in/rahul-adak-b93463303">LinkedIn</a>
                            <a href={images['CV.pdf']}>Resume</a>
                        </div>
                    </div>

                    <aside className="profile-card glass">
                        <img src={images['RKA.jpg']} alt="RKA"  className="avatar"/>
                        <h3>{name}</h3>
                        <p className="small">Full‑Stack Developer</p>
                        <div className="stats">
                            <div>
                                <strong>{projectsDone}{projectsDone >= 10 ? '+' : ' '}</strong>
                                <span>Projects</span>
                            </div>
                            <div>
                                <strong>5+</strong>
                                <span>Templates</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <section id="about" className="section container">
                <h2>About</h2>
                <p>
                    I’m a full-stack developer with a strong focus on building fast, modern, and intuitive web applications.
                    My core journey began with programming fundamentals in C and Python, which shaped my problem-solving approach and logical thinking.
                </p>
                <p>
                    On the front-end, I work with HTML, CSS, JavaScript, and ReactJS, crafting elegant interfaces that feel smooth and responsive.
                    On the back-end, I develop robust application logic using Node.js and Django, ensuring performance, scalability, and security.
                </p>
                <p>
                    I also work with databases like Firebase and SQL (PHP MySQL) for managing data, authentication, cloud functions, and real-time updates.
                </p>
                <p>
                    I enjoy transforming ideas into clean, functional products—combining creativity with strong technical foundations.
                    Every project I build is a chance to learn, improve, and push my skills to the next level.
                </p>
            </section>

            <section id="skills" className="section container">
                <h2>Tech Skills</h2>
                <div className="skills-grid">
                    {techs.map((t)=> (
                        <div key={t.id}>
                            <img src={t.logo} alt={t.name} className="tech-icon" />
                            <span className="tech-tooltip">{t.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section id="projects" className="section container">
                <h2 className='center'>Projects</h2>
                <ProjectsFlip projects={projects} />
            </section>

            <section id="contact" className="section container contact-section">
                <h2>Contact</h2>
                <form className="contact-form" onSubmit={(e)=>{e.preventDefault(); alert('Form submitted — implement backend');}}>
                    <input placeholder="Your name" required />
                    <input type="email" placeholder="Email" required />
                    <textarea placeholder="Message" rows={5} required />
                    <button className="btn">Send Message</button>
                </form>

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

                    <a href="https://github.com/King-Rahul123" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png" style={{ background: 'white', borderRadius: '50%'}} alt="GitHub" />
                    </a>
                </div>

                <div className="contact-details">
                    <h3 className="details-title">My Contact Info</h3>
                    <p><strong>Name:</strong> Rahul Kumar Adak</p>
                    <p><strong>Email:</strong> adakrahul15@gmail.com</p>
                    <p><strong>Phone:</strong> +91 8145322318</p>
                    <p><strong>Location:</strong> Paschim Medinipur, India</p>
                </div>
            </section>
        </div>
    );
}