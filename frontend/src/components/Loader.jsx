import { useEffect, useMemo, useState } from "react";
import "../Loader.css";

export default function Loader({ onFinish }) {
  const lines = useMemo(
    () => [
      "> initializing system...",
      "> access granted ✔",
      "",
      "> welcome to the portfolio...",
    ],
    []
  );

  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // ✅ All lines finished → fade + exit
    if (lineIndex >= lines.length) {
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 800);

      const finishTimer = setTimeout(() => {
        onFinish?.(); // unmount AFTER fade completes
      }, 1400); // 800ms wait + 600ms fade

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }

    // ⌨️ Typing characters
    if (charIndex < lines[lineIndex].length) {
      const t = setTimeout(() => {
        setDisplayedText(prev => prev + lines[lineIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 40);

      return () => clearTimeout(t);
    }

    // ↵ New line
    const t = setTimeout(() => {
      setDisplayedText(prev => prev + "\n");
      setLineIndex(prev => prev + 1);
      setCharIndex(0);
    }, 300);

    return () => clearTimeout(t);
  }, [charIndex, lineIndex, lines, onFinish]);

  // lock body scroll while loader is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className={`hacker-screen ${fadeOut ? "fade-out" : ""}`}>
      <pre className="terminal-text terminal-box border border-yellow-400">
        {displayedText}
        <span className="cursor">█</span>
      </pre>
    </div>
  );
}