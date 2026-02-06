import { useEffect, useMemo, useState } from "react";
import "../Intro.css";

export default function Intro({ onFinish }) {
  const lines = useMemo(() => [
    "> initializing system...",
    "> access granted ✔",
    "",
    "> welcome to the portfolio...",
  ], []);

  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      // start fade out after typing ends
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 800);

      // switch page after fade
      const finishTimer = setTimeout(() => {
        onFinish?.();
      }, 1400);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
      };
    }

    if (charIndex < lines[lineIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + lines[lineIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + "\n");
        setLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines, onFinish]);

  return (
    <div className={`hacker-screen ${fadeOut ? "fade-out" : ""}`}>
      <pre className="terminal-text border p-10">
        {displayedText}
        <span className="cursor">█</span>
      </pre>
    </div>
  );
}
