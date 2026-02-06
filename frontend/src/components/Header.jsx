import { useState } from "react";

export default function Header({ name, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-all duration-300 bg-white/50 backdrop-blur-md ${menuOpen ? "h-auto pb-4" : "h-16"}`}>
        <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">

          <div className="text-amber-400 md:text-4xl text-2xl font-bold font-serif">{name.split(" ")[0]}</div>

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 md:gap-6 text-gray-800 font-medium">
            <a href="#" className="hover:text-amber-500">Home</a>
            <a href="#about" className="hover:text-amber-500">About</a>
            <a href="#skills" className="hover:text-amber-500">Skills</a>
            <a href="#projects" className="hover:text-amber-500">Projects</a>
            <a href="#contact" className="hover:text-amber-500">Contact</a>
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

          <a href="#" className="block px-6 py-4 text-black" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" className="block px-6 py-4 text-black" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" className="block px-6 py-4 text-black" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" className="block px-6 py-4 text-black" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" className="block px-6 py-4 text-black" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </>
  );
}
