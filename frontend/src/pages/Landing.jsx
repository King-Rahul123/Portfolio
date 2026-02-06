import {useEffect, useRef, useState} from 'react';
import Header from "../components/Header";
import ProjectsFlip from "../components/projects_flip";
import Projects from "../components/Projects";
import techs from "../components/Skills";

export default function Portfolio(){
    const name = 'Rahul Kumar Adak';
    const title = 'Full‑Stack Developer';
    const about = `I'm a passionate developer who enjoys building polished web apps and developer tools. I work with Python, React, Node, HTML, CSS, JS, Django, Firebase and other databases. I do some projects with creative design and make it simpler.`;


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
        return ()=>{ 
            root.removeEventListener('mousemove', onMove);
            root.removeEventListener('mouseleave', onLeave); 
        };
    },[]);

    // compute projectsDone
    const projectsDone = Projects.length ? Math.max(...Projects.map(p => p.id)) : 0;

    return (
        <div className="portfolio-root">
            <canvas ref={canvasRef} className="particles-canvas" aria-hidden />
            <Header name={name} theme={theme} setTheme={setTheme} />

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
                            <a href="/assets/CV.pdf">Resume</a>
                        </div>
                    </div>

                    <aside className="profile-card glass">
                        <img src="/assets/RKA.jpg" alt="RKA"  className="avatar"/>
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
                <h2 className="text-4xl font-bold font-serif mb-3 text-yellow-400 p-3">About</h2>
                <div className='p-5 text-lg space-y-3'>
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
                        I enjoy transforming ideas into clean, functional products—combining creativity with strong technical foundations.
                        Every project I build is a chance to learn, improve, and push my skills to the next level.
                    </p>
                </div>
            </section>

            <section id="skills" className="section container overflow-hidden">
                <h2 className="text-4xl font-bold font-serif mb-6 text-yellow-400 p-3">Tech Skills</h2>
                <div className="relative w-full overflow-hidden p-10">
                    <div className=" flex gap-14 items-center w-max animate-[scrollSkills_28s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...techs, ...techs].map((t, i) => (
                        <div key={`${t.id}-${i}`} className="group relative flex flex-col items-center">
                            <img src={t.logo} alt={t.name} className="w-15 h-15 object-contain transition-transform duration-300 group-hover:scale-125 drop-shadow-lg group-hover:drop-shadow-[0_0_18px_rgba(255,208,0,0.8)]"/>
                            <span className="absolute -bottom-8 px-3 py-1 text-xs rounded-full bg-black/80 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                                {t.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* edge fade */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-(--bg) via-transparent to-(--bg)" /></div>
            </section>

            <section id="projects" className="container">
                <h2 className="text-4xl font-bold font-serif mb-5 text-yellow-400 p-3">Projects</h2>
                <ProjectsFlip projects={Projects} />
            </section>

            <section id="contact" className="container contact-section">
                <h2 className="text-4xl font-bold font-serif mb-3 text-yellow-400 p-3">Contact</h2>
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

            </section>

            <div className="mt-16 w-full max-w-4xl mx-auto">
                <h3 className="text-3xl font-semibold mb-10 text-yellow-400 text-center tracking-wide">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                    {/* Name */}
                    <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-gray-400"><i className='fas fa-user'></i> Full Name</p>
                        <p className="text-lg font-medium text-white">Rahul Kumar Adak</p>
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-gray-400"><i className='fas fa-map-marker-alt'></i> Location</p>
                        <p className="text-lg font-medium text-white">Paschim Medinipur, India</p>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-gray-400"><i className='fas fa-envelope'></i> Email</p>
                        <a href="mailto:adakrahul15@gmail.com" className="text-lg font-medium text-white hover:text-yellow-400 transition-colors">adakrahul15@gmail.com</a>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <p className="text-sm uppercase tracking-wider text-gray-400"><i className='fas fa-phone'></i> Phone</p>
                        <a href="tel:+918145322318" className="text-lg font-medium text-white hover:text-yellow-400 transition-colors">+91 81453 22318</a>
                    </div>
                </div>

                {/* Availability line */}
                <p className="mt-8 text-center text-sm text-gray-400">
                    Available for full-time roles, freelance projects, and long-term collaborations.
                </p>
                </div>
        </div>
    );
}