import React, { useState, useRef, useEffect } from 'react';

export default function ProjectsFlip({ projects = [] }) {
    const [flipped, setFlipped] = useState(null); // store id of flipped project
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    function toggle(id) {
        setFlipped((prev) => (prev === id ? null : id));
    }

    // 🔁 AUTO SCROLL
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const start = () => {
            intervalRef.current = setInterval(() => {
                slider.scrollBy({ left: 300, behavior: "smooth" });

                // loop back
                if (
                    slider.scrollLeft + slider.clientWidth >=
                    slider.scrollWidth - 10
                ) {
                    setTimeout(() => {
                        slider.scrollTo({ left: 0, behavior: "smooth" });
                    }, 600);
                }
            }, 3000);
        };

        const stop = () => clearInterval(intervalRef.current);

        start();
        slider.addEventListener("mouseenter", stop);
        slider.addEventListener("mouseleave", start);
        slider.addEventListener("touchstart", stop);
        slider.addEventListener("touchend", start);

        return () => {
            stop();
            slider.removeEventListener("mouseenter", stop);
            slider.removeEventListener("mouseleave", start);
            slider.removeEventListener("touchstart", stop);
            slider.removeEventListener("touchend", start);
        };
    }, []);

    return (
        <div ref={sliderRef}>
            {projects.map((p) => (
                <div key={p.id} className={`flip-card group ${flipped === p.id ? "flipped" : ""}`} onClick={() => toggle(p.id)} role="button" tabIndex={0} onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle(p.id);
                }} aria-pressed={flipped === p.id}>
                    <div className="flip-card-inner">
                        {/* FRONT */}
                        <div className="flip-card-front relative rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-amber-400/20 shadow-xl shadow-amber-500/10 hover:shadow-amber-400/25 transition-all duration-500">
                            {/* Gradient glow */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
                            
                            <div className="project-logo-wrap relative mb-3">
                                {p.logo ? (
                                <div className="relative">
                                    <img src={p.logo} alt={`${p.title} logo`} className="w-20 h-20 object-contain bg-white rounded-xl p-1.5 shadow-lg ring-2 ring-amber-400/30 group-hover:ring-amber-400/60 transition-all duration-300 group-hover:scale-105"/>
                                </div>
                                ) : (
                                <div className="w-fit h-20 flex items-center justify-center text-center px-2 rounded-xl bg-linear-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-lg shadow-amber-500/40 group-hover:shadow-amber-400/60 transition-all duration-300 group-hover:scale-105">
                                    <span className="text-xs font-bold text-slate-900 leading-tight line-clamp-2 uppercase tracking-wide">
                                        {(p.title || "").toLowerCase()}
                                    </span>
                                </div>
                                )}
                            </div>

                            <h3 className="text-base font-bold font-serif text-amber-400 group-hover:text-yellow-300 transition-colors duration-300 mb-2">{p.title}</h3>
                            <div className="flex flex-wrap gap-1.5 justify-center" aria-hidden>
                                {p.tags?.map((t) => (
                                    <span key={`${p.id}-${t}`} className="project-tag px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/25 hover:bg-amber-400/25 transition-all duration-300">{t}</span>
                                ))}
                            </div>
                            
                            {/* Click hint */}
                            <div className="click-hint absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                <i className="fas fa-hand-pointer text-[8px]"></i>
                                <span>Tap to flip</span>
                            </div>
                        </div>

                        {/* BACK */}
                        <div className="flip-card-back relative rounded-2xl bg-linear-to-br from-white via-amber-50/50 to-orange-50/30 border border-amber-200 shadow-xl overflow-hidden">
                            {/* Decorative accents */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-amber-400/30 to-orange-500/20 rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-linear-to-tr from-yellow-400/30 to-amber-500/20 rounded-tr-full"></div>
                            
                            <div className="text-center relative z-10 p-3 flex flex-col h-full justify-center">
                                <h3 className="text-lg font-bold font-serif text-black mb-2">{p.title}</h3>
                                <p className="text-black/70 text-xs leading-relaxed line-clamp-3 mb-2">{p.description}</p>
                                {p.p && <p className='text-[10px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block mx-auto mb-2 border border-orange-200'>{p.p}</p>}
                                <div className="flex gap-2 justify-center mt-auto">
                                    <a className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${p.demo ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-400/40 hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} href={p.demo || '#'} onClick={(e)=>p.demo?null:e.preventDefault()}>
                                        <i className="fas fa-external-link-alt text-[10px]"></i>Demo
                                    </a>
                                    <a className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${p.github ? 'bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} href={p.github || '#'} onClick={(e)=>p.github?null:e.preventDefault()}>
                                        <i className="fab fa-github text-[10px]"></i>Source
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}