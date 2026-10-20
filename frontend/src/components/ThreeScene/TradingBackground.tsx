'use client';

import React, { useEffect, useRef } from 'react';

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  width: number;
  isBullish: boolean;
  pulseOffset: number;
}

export default function TradingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCandles();
    };

    window.addEventListener('resize', handleResize);

    // Color definitions matching the user's swatches
    const TEAL_BODY = 'rgba(0, 125, 109, 0.22)';
    const TEAL_WICK = 'rgba(0, 125, 109, 0.4)';
    const TERRACOTTA_BODY = 'rgba(200, 138, 117, 0.22)';
    const TERRACOTTA_WICK = 'rgba(200, 138, 117, 0.4)';
    const GRID_COLOR = 'rgba(215, 202, 188, 0.25)';
    const LINE_COLOR = 'rgba(142, 158, 184, 0.35)';

    let candles: Candle[] = [];
    let linePoints: { x: number; y: number; vy: number }[] = [];

    const initCandles = () => {
      candles = [];
      linePoints = [];
      const candleCount = Math.floor(width / 38);
      let currentPrice = height * 0.48;

      for (let i = 0; i < candleCount; i++) {
        const delta = (Math.random() - 0.48) * 45;
        const open = currentPrice;
        const close = open + delta;
        const high = Math.min(open, close) - Math.random() * 25;
        const low = Math.max(open, close) + Math.random() * 25;
        const isBullish = close < open; // On canvas, smaller Y is higher price

        candles.push({
          x: i * 38 + 20,
          open,
          close,
          high,
          low,
          width: 14,
          isBullish,
          pulseOffset: Math.random() * Math.PI * 2,
        });

        linePoints.push({
          x: i * 38 + 20,
          y: (open + close) / 2,
          vy: (Math.random() - 0.5) * 0.3,
        });

        currentPrice = close;
        if (currentPrice < height * 0.2) currentPrice = height * 0.3;
        if (currentPrice > height * 0.75) currentPrice = height * 0.65;
      }
    };

    initCandles();

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle financial grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = GRID_COLOR;

      // Vertical grid lines with coordinate markers
      for (let x = 0; x < width; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(150, 135, 125, 0.35)';
        ctx.fillText(`+${Math.floor(x * 1.8)}`, x + 4, 18);
      }

      // Horizontal price lines
      for (let y = 0; y < height; y += 90) {
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(150, 135, 125, 0.35)';
        ctx.fillText(`${(1.085 + (height - y) * 0.00015).toFixed(4)}`, 8, y - 4);
      }

      // 2. Draw smooth moving technical trendline (Slate Blue)
      ctx.beginPath();
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < linePoints.length; i++) {
        const pt = linePoints[i];
        const dynamicY = pt.y + Math.sin(time + i * 0.2) * 8;
        if (i === 0) {
          ctx.moveTo(pt.x, dynamicY);
        } else {
          const prevPt = linePoints[i - 1];
          const prevY = prevPt.y + Math.sin(time + (i - 1) * 0.2) * 8;
          const xc = (prevPt.x + pt.x) / 2;
          const yc = (prevY + dynamicY) / 2;
          ctx.quadraticCurveTo(prevPt.x, prevY, xc, yc);
        }
      }
      ctx.stroke();

      // 3. Draw ambient candlesticks
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const floatY = Math.sin(time * 0.8 + c.pulseOffset) * 4;

        const open = c.open + floatY;
        const close = c.close + floatY;
        const high = c.high + floatY;
        const low = c.low + floatY;

        const bodyY = Math.min(open, close);
        const bodyHeight = Math.max(Math.abs(close - open), 3);

        // Wick
        ctx.strokeStyle = c.isBullish ? TEAL_WICK : TERRACOTTA_WICK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x, high);
        ctx.lineTo(c.x, low);
        ctx.stroke();

        // Body
        ctx.fillStyle = c.isBullish ? TEAL_BODY : TERRACOTTA_BODY;
        ctx.strokeStyle = c.isBullish ? 'rgba(0, 125, 109, 0.6)' : 'rgba(200, 138, 117, 0.6)';
        ctx.lineWidth = 1;
        ctx.fillRect(c.x - c.width / 2, bodyY, c.width, bodyHeight);
        ctx.strokeRect(c.x - c.width / 2, bodyY, c.width, bodyHeight);
      }

      // 4. Subtle glowing ping on the most recent candle
      const lastCandle = candles[candles.length - 2];
      if (lastCandle) {
        const pulse = (Math.sin(time * 3) + 1) / 2;
        ctx.beginPath();
        ctx.arc(lastCandle.x, lastCandle.close, 4 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 125, 109, ${0.4 - pulse * 0.25})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(lastCandle.x, lastCandle.close, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#007D6D';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="absolute inset-0 trading-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/40 to-[#FAF7F2] pointer-events-none" />
    </div>
  );
}
