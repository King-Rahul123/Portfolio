import React, { useState } from 'react';

export default function ProjectsFlip({ projects = [] }) {
    const [flipped, setFlipped] = useState(null); // store id of flipped project

    function toggle(id) {
        setFlipped((prev) => (prev === id ? null : id));
    }

    return (
        <div className="projects-grid">
        {projects.map((p) => (
            <div key={p.id} className={`flip-card gradient-border ${flipped === p.id ? 'flipped' : ''}`} onClick={() => toggle(p.id)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(p.id); }} aria-pressed={flipped === p.id} >
                <div className="flip-card-inner">
                    {/* FRONT */}
                    <div className="flip-card-front glass">
                        <div className="project-logo-wrap">
                            {p.logo ? (
                            // if logo is an image URL or imported image
                            <img src={p.logo} alt={`${p.title} logo`} className="project-logo" />
                            ) : (
                            // fallback: first two letters
                            <div className="project-fallback">{(p.title || '').slice(0,2).toUpperCase()}</div>
                            )}
                        </div>
                        <h3 className="card-title">{p.title}</h3>
                        <div className="tags" aria-hidden>
                            {p.tags && p.tags.map((t) => (
                                <span key={`${p.id}-${t}`} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* BACK */}
                    <div className="flip-card-back glass">
                        <div className="back-inner">
                            <h3 className="card-title">{p.title}</h3>
                            <p className="project-desc">{p.description}</p>
                            <p className='status'>{p.p}</p>
                            <div className="card-actions">
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