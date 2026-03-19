"use client";
import React, { useRef, useEffect } from 'react';

/**
 * SOVEREIGN NEURO-PULSE ENGINE v4.0 - ACTIVE MOUSE INTERACTION
 * - Magnetic Navigation: Dots aggressively steer toward and orbit the cursor.
 * - Synaptic Bridge: High-intensity lines connecting nodes to the mouse.
 * - Velocity Physics: Dots accelerate when the mouse moves fast.
 * - Global Pulse: Tactile ripple shockwaves.
 */
export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 55 : 125;
    const mouse = { x: -2000, y: -2000, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.lastX;
      mouse.vy = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleMouseDown = (e: MouseEvent) => { 
      mouse.active = true; 
      ripples.push(new Ripple(e.clientX, e.clientY));
    };

    const handleMouseUp = () => { mouse.active = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const onExternalPulse = (e: any) => {
      const { x, y, color = 'rgba(29, 78, 216,' } = e.detail || {};
      ripples.push(new Ripple(x || window.innerWidth / 2, y || window.innerHeight / 2, color));
    };
    window.addEventListener('heritage-pulse', onExternalPulse);

    class Ripple {
      x: number; y: number; r: number; opacity: number; color: string;
      constructor(x: number, y: number, color = 'rgba(29, 78, 216,') {
        this.x = x; this.y = y; this.r = 0; this.opacity = 1;
        this.color = color;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${this.color} ${this.opacity})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      update() {
        this.r += 12;
        this.opacity -= 0.02;
      }
    }

    class Particle {
      x: number; y: number; dx: number; dy: number; size: number; baseSize: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.dx = (Math.random() - 0.5) * 1.5;
        this.dy = (Math.random() - 0.5) * 1.5;
        this.baseSize = Math.random() * 2.5 + 2.5;
        this.size = this.baseSize;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#1e40af';
        ctx.fill();
        
        // Active node glow
        const mdx = this.x - mouse.x;
        const mdy = this.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150 || mouse.active) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${mouse.active ? 0.3 : 0.15})`;
          ctx.fill();
        }
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // ACTIVE MOUSE PULL: Dots move with the cursor
        if (dist < 350) {
          const force = mouse.active ? 0.15 : 0.08;
          this.dx += (dx / dist) * force;
          this.dy += (dy / dist) * force;
          
          // Add velocity influence from mouse movement
          this.dx += mouse.vx * 0.02;
          this.dy += mouse.vy * 0.02;
          
          this.size = this.baseSize * 1.4;
        } else {
          this.size = this.baseSize;
        }

        // Apply friction
        this.dx *= 0.96;
        this.dy *= 0.96;

        if (this.x > canvas!.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas!.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx; this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ripples = ripples.filter(r => r.opacity > 0);
      ripples.forEach(r => { r.update(); r.draw(); });

      particles.forEach((p, index) => {
        p.update();
        
        // Connect to Mouse (Synaptic Bridge)
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 250) {
          ctx.beginPath();
          const alpha = (1 - mdist / 250) * 0.5;
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Connect to other Particles
        for (let j = index + 1; j < particles.length; j++) {
          const pdx = p.x - particles[j].x;
          const pdy = p.y - particles[j].y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < 180) {
            ctx.beginPath();
            const alpha = (1 - pdist / 180) * 0.35;
            ctx.strokeStyle = `rgba(29, 78, 216, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize(); init(); animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('heritage-pulse', onExternalPulse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
