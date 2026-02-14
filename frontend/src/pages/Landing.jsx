import {useEffect, useRef, useState} from 'react';

import Background from '../components/ParticalsBackground';
import Header from "../components/Header";
import ProjectsFlip from "../components/projects_flip";
import Projects from "../components/Projects";
import techs from "../components/Skills";
import Achivements from '../components/Achivements';

export default function Portfolio({ LoaderDone = true }){
    const name = 'Rahul Kumar Adak';
    const title = 'Full‑Stack Developer';
    const about = `I'm a passionate developer who enjoys building polished web apps and developer tools. I work with Python, React, Node, HTML, CSS, JS, Django, Firebase and other databases. I do some projects with creative design and make it simpler.`;

    // typing effect for about text
    const [typedAbout, setTypedAbout] = useState('');
    const [aboutIndex, setAboutIndex] = useState(0);

    //scrolling behaviour for projects section
    const projectsScrollRef = useRef(null);
    const [atEnd, setAtEnd] = useState(false);

    useEffect(() => {
    if (!LoaderDone) return; // wait until loader finishes
    if (aboutIndex < about.length) {
        const timeout = setTimeout(() => {
        setTypedAbout(prev => prev + about[aboutIndex]);
        setAboutIndex(prev => prev + 1);
        }, 25); // typing speed (lower = faster)

        return () => clearTimeout(timeout);
    }
    }, [aboutIndex, about, LoaderDone]);

    // theme
    const [theme, setTheme] = useState('dark');
    useEffect(()=>{document.documentElement.setAttribute('data-theme', theme);},[theme]);

    // parallax refs const heroRef = useRef(null);
    const heroRef = useRef(null);

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

    // Project scroll logic
    useEffect(() => {
        const el = projectsScrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const isAtEnd =
            Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
            setAtEnd(isAtEnd);
        };

        el.addEventListener('scroll', handleScroll);
        handleScroll(); // initial check

        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    // observe section/footer and keep them visible once revealed
    useEffect(() => {
        if (!LoaderDone) return; // wait until loader finishes

        const elems = document.querySelectorAll('section, footer');
        if (!elems || elems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                    // do not remove 'visible' when leaving viewport to avoid blank gaps
                });
            },
            { threshold: 0.18 }
        );

        elems.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [LoaderDone]);

    // compute projectsDone
    const projectsDone = Projects.length ? Math.max(...Projects.map(p => p.id)) : 0;

    return (
        <div className="portfolio-root">
            <Background />
            <Header name={name} theme={theme} setTheme={setTheme} />

            <main className="hero md:mt-30 md:mb-10" ref={heroRef}>
                <div className="hero-inner">
                    <div className="flex-1 text-left">

                        <h1 className="name-3d text-4xl md:text-5xl font-serif">{name}</h1>
                        <p className="lead">{title}</p>
                        <p className="about">
                            {typedAbout}
                        </p>
                        
                        <div className="mt-8">
                            <a className="btn" href="#projects">View Projects</a>
                        </div>
                        <div className="socials">
                            <a href="https://github.com/King-Rahul123">GitHub</a>
                            <a href="https://linkedin.com/in/rahul-adak-b93463303">LinkedIn</a>
                            <a href="/assets/CV.pdf">Resume</a>
                        </div>
                    </div>

                    <aside className="profile-card glass">
                        <div className='flex justify-center mb-6 mt-4'>
                            <img src="/assets/RKA.jpg" alt="RKA"  className="avatar border border-yellow-400 shadow-[0_0_15px_rgba(255,208,0,0.8)] hover:shadow-[0_0_30px_rgba(255,208,0,1)] transition-all duration-500"/>
                        </div>
                        <h2 className='text-center font-serif text-lg'>{name}</h2>
                        <p className="small text-center">Full‑Stack Developer</p>
                        <div className="stats">
                            <div>
                                <strong>{projectsDone}{projectsDone >= 5 ? '+' : ' '}</strong>
                                <span>Projects</span>
                            </div>
                            <div>
                                <strong>5+</strong>
                                <span>Achievements</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <section id="about" className="section container">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8 md:mt-20 text-yellow-400 p-3">About</h2>
                <div className='grid md:grid-cols-2 pl-20 pr-30 gap-10 items-center'>
                    <div className="flex justify-center">
                        <img src="/assets/RKA.jpg" alt="About me" className="w-60 h-75 border-yellow-300 border-dashed border rounded-b-full rounded-t-full object-cover shadow-lg drop-shadow-[0_0_18px_rgba(255,208,0,0.8)]" />
                    </div>
                    <div className='p-5 text-lg space-y-3'>
                        <p>
                            I’m a full-stack developer with a strong focus on building fast, modern, and intuitive web applications.
                            My core journey began with programming fundamentals in C and Python, which shaped my problem-solving approach and logical thinking.
                        </p>
                        <p>
                            On the front-end, I work with HTML, CSS, JavaScript, and ReactJS, crafting elegant interfaces that feel smooth and responsive.
                            On the back-end, I develop robust application logic using Node.js and Django, ensuring performance, scalability, and security.
                        </p>
                    </div>
                </div>
            </section>

            <section id="skills" className="section container max-w-5xl overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 md:mt-20 text-yellow-400 p-3">Tech Skills</h2>
                <div className="relative w-full overflow-hidden p-10">
                    <div className=" flex md:gap-12 gap-6 items-center w-max animate-[scrollSkills_28s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...techs, ...techs].map((t, i) => (
                        <div key={`${t.id}-${i}`} className="group relative flex flex-col items-center">
                            <img src={t.logo} alt={t.name} className="md:w-15 md:h-15 h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-125 drop-shadow-lg group-hover:drop-shadow-[0_0_18px_rgba(255,208,0,0.8)]"/>
                            <span className="absolute -bottom-8 px-3 py-1 text-xs rounded-full bg-black/80 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                                {t.name}
                            </span>
                        </div>
                    ))}
                </div>
                {/* edge fade */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-(--bg) via-transparent to-(--bg)" /></div>
            </section>

            <section id="projects" className="section container max-w-7xl mx-auto overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 md:mt-20 text-yellow-400 p-3">Projects</h2>
                <div className="relative">
                    <div className='hidden md:flex items-center gap-4'>
                        <div ref={projectsScrollRef} id="projects-scroll" className="hidden md:flex flex-nowrap gap-6 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden flex-1">
                            {Projects.map((p) => (
                                <div key={p.id} className="min-w-70 max-w-90">
                                    <ProjectsFlip projects={[p]} />
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="md:hidden flex flex-col gap-6">
                        {Projects.slice(0, 5).map((p) => (
                            <ProjectsFlip key={p.id} projects={[p]} />
                        ))}

                        {Projects.length > 5 && (
                            <div className="flex justify-center pt-4">
                                <a href="/projects" className="btn px-6 py-3 whitespace-nowrap">View More</a>
                            </div>
                        )}
                    </div>

                    {Projects.length > 4 && (
                    <>
                        {!atEnd && (
                        <button onClick={() => projectsScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth', })}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur text-white hover:bg-yellow-400 hover:text-black transition shadow-lg"
                            aria-label="Scroll projects">
                            &#8594;
                        </button>
                        )}

                        {/* More button (only when at end) */}
                        {atEnd && (
                            <a href="/projects" className="btn px-6 py-3 whitespace-nowrap shrink-0">View More</a>
                        )}
                    </>
                    )}
                </div>
            </section>

            <section id='achievements' className="container">
                <h2 className="md:text-5xl text-4xl font-bold font-serif mb-10 md:mt-20 text-yellow-400 p-3">Achievements</h2>
                {/* <Achievements /> */}
                {/* <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass p-5 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">Hacktoberfest 2023</h3>
                        <p className="text-gray-300">Contributed to open source projects and earned the Hacktoberfest 2023 t-shirt and badge.</p>
                    </div>
                    <div className="glass p-5 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">Top Performer at CodeChef</h3>
                        <p className="text-gray-300">Achieved a top 10% ranking in multiple CodeChef contests, demonstrating strong problem-solving skills.</p>
                    </div>
                </div> */}
            </section>

            <section id="contact" className="contact-section container">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-3 md:mt-20 text-yellow-400 p-3">Get In Touch</h2>
                <p className="contact-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you.</p>

                <div className="contact-grid">
                    {/* ---- Left: Contact Info ---- */}
                    <div className="md:flex flex-col gap-5 border border-yellow-400/8 hidden glass p-8">
                        <div className='space-y-4'>
                            <h3 className="text-2xl font-serif text-yellow-400 font-semibold">Let's Connect</h3>
                            <p className="text-sm">Feel free to reach out through the channels below. I typically respond within 24 hours.</p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <a href="mailto:adakrahul15@gmail.com" className="contact-detail-item">
                                <span className="contact-icon-wrap email"><i className="fas fa-envelope"></i></span>
                                <div>
                                    <span className="contact-detail-label">Email</span>
                                    <span className="contact-detail-value">adakrahul15@gmail.com</span>
                                </div>
                            </a>
                            <a href="tel:+918145322318" className="contact-detail-item">
                                <span className="contact-icon-wrap phone"><i className="fas fa-phone"></i></span>
                                <div>
                                    <span className="contact-detail-label">Phone</span>
                                    <span className="contact-detail-value">+91 81453 22318</span>
                                </div>
                            </a>
                            <a href="https://wa.me/9903052224" target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                                <span className="contact-icon-wrap whatsapp"><i className="fab fa-whatsapp"></i></span>
                                <div>
                                    <span className="contact-detail-label">WhatsApp</span>
                                    <span className="contact-detail-value">+91 99030 52224</span>
                                </div>
                            </a>
                        </div>

                        <hr className="contact-divider" />

                        <div className="contact-social-row flex gap-4">
                            <a href="https://github.com/King-Rahul123" target="_blank" rel="noopener noreferrer" className="contact-social-btn group hover:bg-[#24292e] hover:shadow-gray-500/20" title="GitHub">
                                <i className="fab fa-github group-hover:text-white text-2xl"></i>
                            </a>

                            <a href="https://linkedin.com/in/rahul-adak-b93463303" target="_blank" rel="noopener noreferrer" className="contact-social-btn group hover:bg-[#0077B5] hover:shadow-blue-500/30" title="LinkedIn">
                                <i className="fab fa-linkedin group-hover:text-blue-500 text-2xl"></i>
                            </a>

                            <a href="https://facebook.com/share/1Baiegjrux/" target="_blank" rel="noopener noreferrer" className="contact-social-btn group hover:bg-blue-700 hover:shadow-blue-600/30" title="Facebook">
                                <i className="fab fa-facebook group-hover:text-blue-700 text-2xl"></i>
                            </a>

                            <a href="https://instagram.com/rahul_adak1" target="_blank" rel="noopener noreferrer" className="contact-social-btn group hover:bg-linear-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:shadow-pink-500/30" title="Instagram">
                                <i className="fab fa-instagram group-hover:bg-linear-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text group-hover:text-transparent text-2xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* ---- Right: Contact Form ---- */}
                    <form className="contact-form glass" onSubmit={(e) => { e.preventDefault(); alert('Form submitted — implement backend'); }}>
                        <div className="contact-form-row">
                            <div className="contact-field">
                                <label htmlFor="cf-name">Full Name</label>
                                <div className="contact-input-wrap">
                                    <i className="fas fa-user"></i>
                                    <input id="cf-name" type="text" placeholder="Enter your Name...." required />
                                </div>
                            </div>
                            <div className="contact-field">
                                <label htmlFor="cf-email">Email Address</label>
                                <div className="contact-input-wrap">
                                    <i className="fas fa-at"></i>
                                    <input id="cf-email" type="email" placeholder="abc@example.com" required />
                                </div>
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="cf-subject">Subject</label>
                            <div className="contact-input-wrap">
                                <i className="fas fa-tag"></i>
                                <input id="cf-subject" type="text" placeholder="Project Collaboration" />
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="cf-message">Message</label>
                            <div className="contact-input-wrap textarea-wrap">
                                <i className="fas fa-comment-dots"></i>
                                <textarea id="cf-message" placeholder="Tell me about your project..." rows={5} required></textarea>
                            </div>
                        </div>

                        <button type="submit" className="contact-submit-btn">
                            <span>Send Message</span>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </section>

            
            
            
            <footer className="footer relative mt-32 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400/60 to-transparent" />
                <div className="absolute top-0 -translate-x-1/2 w-150 h-50 bg-yellow-400/8 blur-3xl rounded-full pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
                    
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-yellow-400/20">R</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-serif">Rahul Kumar Adak</h3>
                                    <p className="text-sm text-yellow-400/80">Full-Stack Developer</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                                Crafting modern, high-performance web applications with clean architecture, 
                                smooth interactions, and a relentless focus on user experience.
                            </p>
                        
                            {/* Social Icons */}
                            <div className="flex gap-3 pt-2">
                                <a href="https://github.com/King-Rahul123" target="_blank" rel="noopener noreferrer" 
                                className="footer-social-btn group" title="GitHub">
                                    <i className="fab fa-github transition-all duration-300 group-hover:scale-110"></i>
                                </a>
                                <a href="https://linkedin.com/in/rahul-adak-b93463303" target="_blank" rel="noopener noreferrer" 
                                className="footer-social-btn linkedin group" title="LinkedIn">
                                    <i className="fab fa-linkedin-in transition-all duration-300 group-hover:scale-110"></i>
                                </a>
                                <a href="https://facebook.com/share/1Baiegjrux/" target="_blank" rel="noopener noreferrer" 
                                className="footer-social-btn facebook group" title="Facebook">
                                    <i className="fab fa-facebook-f transition-all duration-300 group-hover:scale-110"></i>
                                </a>
                                <a href="https://instagram.com/rahul_adak1" target="_blank" rel="noopener noreferrer" 
                                className="footer-social-btn instagram group" title="Instagram">
                                    <i className="fab fa-instagram transition-all duration-300 group-hover:scale-110"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="text-center">
                            <h4 className="footer-heading">Quick Links</h4>
                            <nav className="flex flex-col gap-1 items-center">
                                <a href="#about" className="footer-link"><i className="fas fa-chevron-right text-[10px] mr-2 text-yellow-400/60"></i>About</a>
                                <a href="#skills" className="footer-link"><i className="fas fa-chevron-right text-[10px] mr-2 text-yellow-400/60"></i>Skills</a>
                                <a href="#projects" className="footer-link"><i className="fas fa-chevron-right text-[10px] mr-2 text-yellow-400/60"></i>Projects</a>
                                <a href="#achievements" className="footer-link"><i className="fas fa-chevron-right text-[10px] mr-2 text-yellow-400/60"></i>Achievements</a>
                                <a href="#contact" className="footer-link"><i className="fas fa-chevron-right text-[10px] mr-2 text-yellow-400/60"></i>Contact</a>
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="text-center">
                            <h4 className="footer-heading">Get In Touch</h4>
                            <div className="space-y-4 items-center justify-center flex flex-col">
                                <a href="mailto:adakrahul15@gmail.com" className="footer-contact-item group">
                                    <span className="footer-contact-icon"><i className="fas fa-envelope"></i></span>
                                    <span className="group-hover:text-yellow-400 transition-colors">adakrahul15@gmail.com</span>
                                </a>
                                <a href="tel:+918145322318" className="footer-contact-item group">
                                    <span className="footer-contact-icon phone"><i className="fas fa-phone"></i></span>
                                    <span className="group-hover:text-blue-400 transition-colors">+91 81453 22318</span>
                                </a>
                                <a href="https://wa.me/9903052224" target="_blank" rel="noopener noreferrer" className="footer-contact-item group">
                                    <span className="footer-contact-icon whatsapp"><i className="fab fa-whatsapp"></i></span>
                                    <span className="group-hover:text-green-400 transition-colors">+91 99030 52224</span>
                                </a>
                            </div>

                            {/* Download Resume Button */}
                            <a href="/assets/CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-linear-to-r from-yellow-400/15 to-amber-500/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium hover:bg-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                                <i className="fas fa-download"></i>
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-14 pt-2 border-t border-white/8">
                        {/* Scroll To Top Button */}
                        <div className="flex justify-center">
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group fixed items-center px-3 py-2 rounded-full border border-yellow-400/20 bg-black/40 backdrop-blur-md text-yellow-400 font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                                <i className="fas fa-arrow-up transition-transform duration-300 group-hover:-translate-y-1"></i>
                            </button>
                        </div>
                        
                        <div className="text-center mt-12">
                            <p className="text-sm text-gray-500">
                                © {new Date().getFullYear()} <span className="text-yellow-400/80">Rahul Kumar Adak</span>. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>      
            </footer>
        </div>
    );
}