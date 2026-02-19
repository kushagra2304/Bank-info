import { useEffect, useRef } from "react";

const CURRENCY_SYMBOLS = ["$", "€", "£", "¥", "₹", "₿", "₩", "₣", "₴", "฿", "₺", "₦", "¢", "₮", "₱"];

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Globe parameters ---
    const TOTAL_NODES = 32;

    // Place nodes on a sphere using Fibonacci sphere distribution
    function fibonacciSphere(count) {
      const points = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        points.push({
          x: Math.cos(theta) * radius,
          y: y,
          z: Math.sin(theta) * radius,
        });
      }
      return points;
    }

    const spherePoints = fibonacciSphere(TOTAL_NODES);

    const nodes = spherePoints.map((p, i) => ({
      nx: p.x,
      ny: p.y,
      nz: p.z,
      symbol: CURRENCY_SYMBOLS[i % CURRENCY_SYMBOLS.length],
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Rotation angles
    let rotY = 0;
    const rotX = 0.2; // slight tilt like the image

    const ROTATION_SPEED = 0.003;

    const MAX_EDGE_DOT = 0.5;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      rotY += ROTATION_SPEED;

      const globeR = Math.min(W, H) * 0.60;
      const cx = W / 2;
      const cy = H / 2;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes.map((node) => {
        const x1 = node.nx * cosY - node.nz * sinY;
        const z1 = node.nx * sinY + node.nz * cosY;
        const y1 = node.ny;

        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const fov = 2.2;
        const scale = fov / (fov + z2 + 1);

        const sx = cx + x1 * globeR * scale;
        const sy = cy + y2 * globeR * scale;

        const depth = (z2 + 1) / 2;

        return { sx, sy, z2, depth, scale };
      });

      // --- Draw edges ---
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dot =
            nodes[i].nx * nodes[j].nx +
            nodes[i].ny * nodes[j].ny +
            nodes[i].nz * nodes[j].nz;

          if (dot > MAX_EDGE_DOT) {
            const pi = projected[i];
            const pj = projected[j];

            const avgDepth = (pi.depth + pj.depth) / 2;
            const alpha = 0.06 + avgDepth * 0.55;

            ctx.beginPath();
            ctx.moveTo(pi.sx, pi.sy);
            ctx.lineTo(pj.sx, pj.sy);
            ctx.strokeStyle = `rgba(90, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.6 + avgDepth * 0.7;
            ctx.stroke();
          }
        }
      }

      // --- Draw nodes ---
      const time = performance.now() / 1000;
      nodes.forEach((node, i) => {
        const p = projected[i];
        if (p.depth < 0.04) return;

        const pulse = 0.88 + 0.12 * Math.sin(time * 1.8 + node.pulsePhase);
        const nodeR = (5 + p.scale * 11) * pulse;
        const alpha = 0.12 + p.depth * 0.88;

        // Outer soft glow
        const glowR = nodeR * 3;
        const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, glowR);
        glow.addColorStop(0, `rgba(20, 170, 255, ${0.28 * alpha})`);
        glow.addColorStop(1, `rgba(0, 80, 180, 0)`);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node core
        const core = ctx.createRadialGradient(
          p.sx - nodeR * 0.28, p.sy - nodeR * 0.28, nodeR * 0.05,
          p.sx, p.sy, nodeR
        );
        core.addColorStop(0, `rgba(190, 245, 255, ${alpha})`);
        core.addColorStop(0.55, `rgba(0, 155, 225, ${alpha * 0.9})`);
        core.addColorStop(1, `rgba(0, 50, 150, ${alpha * 0.75})`);

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        // Node border
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, nodeR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(170, 235, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 0.9 + p.depth * 0.9;
        ctx.stroke();

        // Currency symbol
        const fontSize = Math.max(7, Math.floor(nodeR * 1.05));
        ctx.font = `700 ${fontSize}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = `rgba(0, 220, 255, ${alpha})`;
        ctx.shadowBlur = 5;
        ctx.fillText(node.symbol, p.sx, p.sy);
        ctx.shadowBlur = 0;
      });

      // Atmosphere ring
      const atmo = ctx.createRadialGradient(cx, cy, globeR * 0.9, cx, cy, globeR * 1.1);
      atmo.addColorStop(0, "rgba(0, 140, 255, 0.0)");
      atmo.addColorStop(0.6, "rgba(0, 100, 255, 0.03)");
      atmo.addColorStop(1, "rgba(0, 60, 180, 0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, globeR * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, #010c1e 0%, #000408 100%)",
      }}
    />
  );
}