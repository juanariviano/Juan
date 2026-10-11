import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const FADE_MS = 1400;
const MAX_POINTS = 2400;
const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';
// Starting a drag on any of these keeps normal text selection.
const TEXTY = "p, h1, h2, h3, li, dt, dd, mark, a, button, input, textarea, figcaption, [role='dialog']";
const SPARK_CHARS = ["✦", "✧", "•"];
const INK = { light: "17, 17, 17", dark: "242, 242, 242" };

// Pencil pose per state: lean angle (deg) and scale, pivoting on the graphite tip.
const POSE = {
  idle: { rotate: 32, scale: 1 },
  hover: { rotate: 20, scale: 1.08 },
  down: { rotate: 42, scale: 0.94 },
};

/**
 * A pencil that trails the mouse. Hold the button and drag to scribble on the
 * page; strokes fade out like graphite after ~1.4s. Desktop pointers only.
 */
export default function PencilCursor() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [sparks, setSparks] = useState([]);
  const canvasRef = useRef(null);
  const pencilRef = useRef(null);
  const inkRef = useRef(INK.light);

  useEffect(() => {
    inkRef.current = theme === "dark" ? INK.dark : INK.light;
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return undefined;
    const canvas = canvasRef.current;
    const pencil = pencilRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !pencil || !ctx) return undefined;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let visible = false;
    let down = false;
    let hovering = false;
    let points = [];
    let frame;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addPoint = (x, y, start = false) => {
      points.push({ x, y, start, time: performance.now() });
      if (points.length > MAX_POINTS) points = points.slice(-MAX_POINTS);
    };

    const onMove = (e) => {
      visible = true;
      target.x = e.clientX;
      target.y = e.clientY;
      hovering = Boolean(e.target instanceof Element && e.target.closest(INTERACTIVE));
      if (!down) return;
      // Coalesced events give smoother lines on fast flicks.
      const samples = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (samples.length ? samples : [e]).forEach((s) => addPoint(s.clientX, s.clientY));
    };

    const onDown = (e) => {
      if (e.button !== 0 || e.pointerType !== "mouse") return;
      down = true;
      // Scribbling from blank paper shouldn't paint a text selection across the page.
      if (!(e.target instanceof Element && e.target.closest(TEXTY))) {
        document.documentElement.style.userSelect = "none";
      }
      addPoint(e.clientX, e.clientY, true);
      const angle = Math.random() * Math.PI * 2;
      const spark = {
        id: `${e.timeStamp}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        tx: `${Math.round(Math.cos(angle) * 16)}px`,
        ty: `${Math.round(Math.sin(angle) * 16 - 8)}px`,
        char: SPARK_CHARS[Math.floor(Math.random() * SPARK_CHARS.length)],
      };
      setSparks((prev) => [...prev.slice(-4), spark]);
      setTimeout(() => setSparks((prev) => prev.filter((s) => s.id !== spark.id)), 750);
    };

    const onUp = () => {
      down = false;
      document.documentElement.style.userSelect = "";
    };
    const onLeave = () => {
      visible = false;
      onUp();
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.35;
      current.y += (target.y - current.y) * 0.35;

      const pose = down ? POSE.down : hovering ? POSE.hover : POSE.idle;
      pencil.style.opacity = visible ? (down ? "1" : "0.9") : "0";
      pencil.style.transform = `translate3d(${current.x - 11}px, ${current.y - 30}px, 0) rotate(${pose.rotate}deg) scale(${pose.scale})`;

      const now = performance.now();
      while (points.length && now - points[0].time > FADE_MS) points.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1.7;
        for (let i = 1; i < points.length; i += 1) {
          const a = points[i - 1];
          const b = points[i];
          if (b.start) continue;
          const alpha = Math.max(0, (1 - (now - b.time) / FADE_MS) * 0.55);
          ctx.strokeStyle = `rgba(${inkRef.current}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("blur", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.userSelect = "";
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduce]);

  if (!enabled || reduce) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[45] h-full w-full"
      />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[46] overflow-hidden">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute animate-sparkle font-hand text-sm text-nb-ink2"
            style={{ left: spark.x, top: spark.y, "--tx": spark.tx, "--ty": spark.ty }}
          >
            {spark.char}
          </span>
        ))}
      </div>

      <div
        ref={pencilRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[110] h-8 w-[22px] opacity-0 will-change-transform"
        style={{ transformOrigin: "11px 30px", transition: "opacity 0.25s ease-out" }}
      >
        <svg
          viewBox="0 0 22 32"
          className="h-full w-full drop-shadow-[0_2px_3px_var(--nb-shadow)]"
        >
          {/* graphite tip */}
          <path d="M11 30l-1.6-4.4h3.2z" className="fill-nb-ink" />
          {/* sharpened wood */}
          <path d="M9.4 25.6L8 20.5h6l-1.4 5.1z" className="fill-nb-hl2 stroke-nb-ink" strokeWidth="0.6" />
          {/* hexagonal body: three shades of grey */}
          <rect x="8" y="7" width="2" height="13.5" className="fill-nb-ink3" />
          <rect x="10" y="7" width="2" height="13.5" className="fill-nb-card" />
          <rect x="12" y="7" width="2" height="13.5" className="fill-nb-ink2" />
          <rect x="8" y="7" width="6" height="13.5" fill="none" className="stroke-nb-ink" strokeWidth="0.6" />
          {/* ferrule + eraser */}
          <rect x="8" y="4" width="6" height="3" className="fill-nb-ink3 stroke-nb-ink" strokeWidth="0.6" />
          <path d="M8 4c0-2.6 6-2.6 6 0z" className="fill-nb-ink" />
        </svg>
      </div>
    </>
  );
}
