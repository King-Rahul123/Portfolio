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

            <section id="contact" className="container contact-section">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-3 md:mt-20 text-yellow-400 p-3">Contact</h2>
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

            <footer className="footer mt-32 bg-linear-to-b from-yellow-400/10 to-black/40 backdrop-blur-xl border-t border-white/10 px-6 pt-16 pb-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div className="flex flex-col gap-5 mt-auto">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-1">Rahul Kumar Adak</h3>
                        <p className="text-sm text-gray-400 mb-4">Full-Stack Developer</p>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-md">
                            I design and build modern, high-performance web applications with clean
                            architecture, smooth UI, and a strong focus on user experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <nav className="flex flex-col">
                            <a href="#about">About</a>
                            <a href="#skills">Skills</a>
                            <a href="#projects">Projects</a>
                            <a href="#achievements">Achievements</a>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className='flex flex-col gap-2 mt-auto'>
                        <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
                        <div className="flex flex-col gap-3 text-gray-400 text-sm">
                            <a href="mailto:adakrahul15@gmail.com" className="hover:text-amber-500 transition"><i className="fas fa-envelope"></i> adakrahul15@gmail.com</a>
                            <a href="tel:+918145322318" className="hover:text-blue-500 transition"><i className="fas fa-phone"></i> +91 81453 22318 </a>
                            <a href="" className='hover:text-green-500 transition'><i className='fab fa-whatsapp'></i> +91 81453 22318</a>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-4 mt-5 flex-wrap text-lg text-white justify-center">
                            <a href="https://github.com/King-Rahul123" title="GitHub" target="_blank" rel="noopener noreferrer" className="group">
                                <i className="fab fa-github text-xl transition-all duration-300 ease-out group-hover:text-yellow-400 group-hover:scale-125 inline-block"></i>
                            </a>
                            <a href="https://linkedin.com/in/rahul-adak-b93463303" title='LinkedIn' target="_blank" className='group'>
                                <i className="fab fa-linkedin text-xl transition-all duration-300 ease-out group-hover:text-blue-500 group-hover:scale-125 inline-block"></i>
                            </a>
                            <a href="/assets/CV.pdf" title='Resume' target="_blank" className='group'>
                                <i className="fas fa-file-text text-xl transition-all duration-300 ease-out group-hover:text-yellow-400 group-hover:scale-125 inline-block"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Rahul Kumar Adak — Built with React & Tailwind
                </div>
            </footer>
        </div>
    );
}