import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const random = (min, max) => Math.random() * (max - min) + min;

    // particles
    const particles = [];
    const NUM = Math.floor((w * h) / 80000);

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: random(0, w),
        y: random(0, h),
        vx: random(-0.6, 0.6),
        vy: random(-0.6, 0.6),
        r: random(1, 3),
      });
    }
    particlesRef.current = particles;

    const mouse = { x: w / 2, y: h / 2 };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    function step() {
      ctx.clearRect(0, 0, w, h);

      for (let p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = dx * dx + dy * dy;

        if (dist < 20000) {
          const f = (1 - Math.sqrt(dist) / 140) * 0.05;
          p.vx += dx * f;
          p.vy += dy * f;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(step);
    }

    step();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden />;
}