import { useEffect, useRef } from "react";

const CURRENCY_SYMBOLS = [
  "$", "€", "£", "¥", "₹", "₿", "₩", "₣", "₴", "฿",
  "₺", "₦", "¢", "₮", "₱"
];

export default function Networkkk() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    let mouse = { x: -9999, y: -9999 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Globe parameters
    const TOTAL_NODES = 32;

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
      rx: 0,
      ry: 0,
    }));

    let rotY = 0;
    const rotX = 0.2;
    const ROTATION_SPEED = 0.003;

    const MAX_EDGE_DOT = 0.5;
    const REPULSION_RADIUS = 120;
    const REPULSION_STRENGTH = 20;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // 🔥 Black Background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, W, H);

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

      // White edges
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dot =
      nodes[i].nx * nodes[j].nx +
      nodes[i].ny * nodes[j].ny +
      nodes[i].nz * nodes[j].nz;

    if (dot > MAX_EDGE_DOT) {
      const pi = projected[i];
      const pj = projected[j];

      ctx.beginPath();
      ctx.moveTo(pi.sx + nodes[i].rx, pi.sy + nodes[i].ry);
      ctx.lineTo(pj.sx + nodes[j].rx, pj.sy + nodes[j].ry);

      // 🔥 Brighter white lines
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2.5;

      // ✨ Optional glow effect (recommended)
      ctx.shadowColor = "white";
      ctx.shadowBlur = 8;

      ctx.stroke();

      // Reset shadow so nodes don't glow too much
      ctx.shadowBlur = 0;
    }
  }
}

      const time = performance.now() / 1000;

      nodes.forEach((node, i) => {
        const p = projected[i];
        if (p.depth < 0.04) return;

        // Mouse Repulsion
        let dx = p.sx - mouse.x;
        let dy = p.sy - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0;
        let targetY = 0;

        if (dist < REPULSION_RADIUS) {
          const force =
            (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;

          targetX = (dx / dist) * force;
          targetY = (dy / dist) * force;
        }

        node.rx += (targetX - node.rx) * 0.15;
        node.ry += (targetY - node.ry) * 0.15;

        const pulse =
          0.9 + 0.1 * Math.sin(time * 1.8 + node.pulsePhase);

        // 🔥 Increased size
        const nodeR = (12 + p.scale * 18) * pulse;

        const x = p.sx + node.rx;
        const y = p.sy + node.ry;

        // White solid circle
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Black text inside
        const fontSize = Math.max(12, Math.floor(nodeR * 0.9));
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText(node.symbol, x, y);
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 50,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}