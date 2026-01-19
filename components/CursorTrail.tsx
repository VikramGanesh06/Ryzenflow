import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  radius: number;
  vx: number;
  vy: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const animationFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const lastMouseTimeRef = useRef(Date.now());
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Disable on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Smooth cursor gradient - pink → purple → teal
    const createGradient = (x: number, y: number) => {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 100);
      gradient.addColorStop(0, 'rgba(244, 114, 182, 0.8)'); // Pink
      gradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.5)'); // Purple
      gradient.addColorStop(1, 'rgba(94, 234, 212, 0.1)'); // Teal
      return gradient;
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const timeDelta = Math.min(now - lastMouseTimeRef.current, 50);
      lastMouseTimeRef.current = now;

      const newX = e.clientX;
      const newY = e.clientY;

      // Calculate velocity
      const dx = newX - lastMousePosRef.current.x;
      const dy = newY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
      mouseRef.current.vx = dx / timeDelta;
      mouseRef.current.vy = dy / timeDelta;

      // Create trail points based on movement speed
      const speed = distance;
      const pointCount = Math.min(Math.ceil(speed / 3), 5);

      for (let i = 0; i < pointCount; i++) {
        const t = i / pointCount;
        const x = lastMousePosRef.current.x + dx * t;
        const y = lastMousePosRef.current.y + dy * t;

        // Radius decreases with speed (faster movement = bigger trail)
        const radius = 8 + speed * 0.4;

        trailPointsRef.current.push({
          x,
          y,
          age: 0,
          radius,
          vx: mouseRef.current.vx * 0.3,
          vy: mouseRef.current.vy * 0.3
        });
      }

      // Limit trail points for performance
      if (trailPointsRef.current.length > 800) {
        trailPointsRef.current = trailPointsRef.current.slice(-600);
      }

      lastMousePosRef.current = { x: newX, y: newY };
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect instead of full clear (creates blur/trail effect)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail points
      const points = trailPointsRef.current;

      for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i];

        // Age the point
        point.age += 0.02;

        // Apply gentle physics (velocity decay)
        point.vx *= 0.95;
        point.vy *= 0.95;

        // Update position based on velocity
        point.x += point.vx;
        point.y += point.vy;

        // Calculate opacity based on age (fade out)
        const opacity = Math.max(0, 1 - point.age);

        // Draw point with glow effect
        ctx.save();
        ctx.globalAlpha = opacity;

        // Outer glow (soft blur effect)
        ctx.shadowColor = `rgba(244, 114, 182, ${0.5 * opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw circle with gradient
        const gradient = createGradient(point.x, point.y);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.globalAlpha = opacity * 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Remove dead points
        if (point.age > 1) {
          points.splice(i, 1);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen'
      }}
    />
  );
};
