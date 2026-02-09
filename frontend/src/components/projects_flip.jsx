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
                <div key={p.id} className={`flip-card gradient-border ${flipped === p.id ? "flipped" : ""}`} onClick={() => toggle(p.id)} role="button" tabIndex={0} onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle(p.id);
                }} aria-pressed={flipped === p.id}>
                    <div className="flip-card-inner">
                        {/* FRONT */}
                        <div className="flip-card-front glass">
                            <div className="project-logo-wrap">
                                {p.logo ? (
                                <img src={p.logo} alt={`${p.title} logo`} className="project-logo bg-white rounded-2xl"/>
                                ) : (
                                <div className="project-fallback flex items-center justify-center text-center px-2">
                                    <span className="text-sm font-semibold leading-tight line-clamp-2">
                                        {(p.title || "").toLowerCase()}
                                    </span>
                                </div>
                                )}
                            </div>

                            <h3 className="text-blue-600 font-bold mb-2 text-lg font-serif ">{p.title}</h3>
                            <div aria-hidden>
                                {p.tags?.map((t) => (
                                <span key={`${p.id}-${t}`} className="tag mt-1">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* BACK */}
                        <div className="flip-card-back glass">
                            <div className="text-center">
                                <h3 className="p-2 text-blue-700 font-bold font-serif text-xl">{p.title}</h3>
                                <p className="mb-3 text-black text-sm">{p.description}</p>
                                <p className='text-red-600'>{p.p}</p>
                                <div className="mt-5">
                                    <a className="link" href={p.demo || '#'} onClick={(e)=>p.demo?null:e.preventDefault()}>Demo</a>
                                    <a className="link" href={p.github || '#'} onClick={(e)=>p.github?null:e.preventDefault()}>Source</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}