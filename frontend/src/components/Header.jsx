import { useState } from "react";

export default function Header({ name, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  function onNavClick(e){
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    // close mobile menu if open
    setMenuOpen(false);

    if(!href || href === '#' || href === '/'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.startsWith('#')){
      const id = href.slice(1);
      const el = document.getElementById(id) || document.querySelector(href);
      if (!el) return;
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  
  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-all duration-300 bg-white/50 backdrop-blur-md ${menuOpen ? "h-auto pb-4" : "h-16"}`}>
        <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">

          <div className="text-amber-400 md:text-4xl text-2xl font-bold font-serif">{name.split(" ")[0]}</div>

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 md:gap-6 text-black font-medium">
            <a href="#" onClick={onNavClick} className="hover:text-amber-500">Home</a>
            <a href="#about" onClick={onNavClick} className="hover:text-amber-500">About</a>
            <a href="#skills" onClick={onNavClick} className="hover:text-amber-500">Skills</a>
            <a href="#projects" onClick={onNavClick} className="hover:text-amber-500">Projects</a>
            <a href="#achivements" onClick={onNavClick} className="hover:text-amber-500">Achivements</a>
            <a href="#contact" onClick={onNavClick} className="hover:text-amber-500">Contact</a>
          </nav>
          
          <button className="hidden md:flex text-xl" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{theme === "dark" ? "☀️" : "🌙"}</button>

          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed top-18 left-0 w-full z-40 md:hidden bg-white/50 backdrop-blur-md shadow-md">

          <div className="px-6 py-3 border-b flex items-center">
            <button className="text-xl" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☀️ Dark" : "🌙 Light"}</button>
            <button className="text-xl ml-auto" onClick={() => setMenuOpen(false)}>&#10005;</button>
          </div>

          <a href="#" onClick={onNavClick} className="block px-6 py-4 text-black">Home</a>
          <a href="#about" onClick={onNavClick} className="block px-6 py-4 text-black">About</a>
          <a href="#skills" onClick={onNavClick} className="block px-6 py-4 text-black">Skills</a>
          <a href="#projects" onClick={onNavClick} className="block px-6 py-4 text-black">Projects</a>
          <a href="#achivements" onClick={onNavClick} className="block px-6 py-4 text-black">Achivements  </a>
          <a href="#contact" onClick={onNavClick} className="block px-6 py-4 text-black">Contact</a>
        </div>
      )}
    </>
  );
}
