import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ConfirmBeforeTestModal from '@app/pages/HomePage/LandingPage/ConfirmBeforeTestModal';
import { RootState } from '@app/redux/store';

type Point = {
  label: string;
  desc: string;
};

type Props = {
  steps: Point[];
  activeStep: number;
};

export default function StepScreen({ steps, activeStep }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );
    if (pathRef.current) observer.observe(pathRef.current);
    return () => observer.disconnect();
  }, []);

  const getPoints = (width: number, height: number): { x: number; y: number }[] => {
    const isMobile = width < 768;

    if (isMobile) {
      const startY = height * 0.4;
      const endY = height * 0.8;
      const gapY = (endY - startY) / (steps.length - 1);

      return steps.map((_, i) => ({
        x: i * ((0.9 * width) / 9 / steps.length) + (1 / 9) * width,
        y: startY + i * gapY,
      }));
    } else {
      const x = (6 / 9) * width;
      const y = (7 / 10) * height;
      const gapX = x / (steps.length - 1);
      const gapY = y / steps.length;
      return steps.map((_, i) => ({
        x:
          i === 0
            ? (1 / 9) * width
            : i === steps.length - 1
            ? (7 / 9) * width
            : gapX * i + (1 / 9) * width,
        y: i === 0 ? y : i === steps.length - 1 ? height - y : y - i * gapY,
      }));
    }
  };

  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: window.innerHeight });
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const points = getPoints(dimensions.width, dimensions.height);

  const generateSmoothPath = (pts: { x: number; y: number }[]): string => {
    if (pts.length < 2) return '';

    const extendedPts = [...pts];
    if (pts.length > 1) {
      const firstPoint = pts[0];
      const secondPoint = pts[1];
      const dx = secondPoint.x - firstPoint.x;
      const dy = secondPoint.y - firstPoint.y;
      extendedPts.unshift({
        x: firstPoint.x - dx * 0.2,
        y: firstPoint.y - dy * 0.1,
      });
    }

    if (pts.length > 1) {
      const lastPoint = pts[pts.length - 1];
      const secondLastPoint = pts[pts.length - 2];
      const dx = lastPoint.x - secondLastPoint.x;
      const dy = lastPoint.y - secondLastPoint.y;
      extendedPts.push({
        x: lastPoint.x + dx * 0.2,
        y: lastPoint.y + dy * 0.1,
      });
    }

    const path = [`M ${extendedPts[0].x} ${extendedPts[0].y}`];
    for (let i = 0; i < extendedPts.length - 1; i++) {
      const p0 = extendedPts[i];
      const p1 = extendedPts[i + 1];
      const dx = (p1.x - p0.x) / (dimensions.width < 768 ? 0.2 : 2);
      const dy = (p1.y - p0.y) / 4;
      path.push(`C ${p0.x + dx} ${p0.y - dy}, ${p1.x - dx} ${p1.y + dy}, ${p1.x} ${p1.y}`);
    }
    return path.join(' ');
  };

  const pathD = generateSmoothPath(points);

  return (
    <div className='relative bg-white h-screen'>
      <div className='absolute top-10 left-0 px-5 md:top-28 md:left-28 z-10 md:w-[380px] xl:w-[480px]'>
        <div className='flex items-center justify-center h-full'>
          <div className='flex flex-col gap-4'>
            <span className='text-black text-2xl md:text-4xl xl:text-6xl text-center md:text-left font-[1000]'>
              {t('HOMEPAGE.STEP_SCREEN_HEADER.TITLE')}
            </span>
            <span className='text-[#64607D] text-base xl:text-xl text-center md:text-left font-[500]'>
              {t('HOMEPAGE.STEP_SCREEN_HEADER.SUBTITLE')}
            </span>
            <div className='flex items-center justify-center md:justify-start'>
              <Button
                onClick={() => {
                  isAuth ? setIsOpen(true) : navigate('/login');
                }}
                className='!h-12 mdL:min-h-14 !text-white font-bold !uppercase !rounded-full shadow-light slide-in-left bg-primary border !border-primary px-8 text-base smM:text-xl cursor-pointer hover:bg-white hover:!text-primary transition-all duration-300'
              >
                {isAuth ? t('HOMEPAGE_LOGIN.START') : t('HOMEPAGE.BUTTON')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex-1 overflow-visible' ref={containerRef}>
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className='w-full h-screen'
          preserveAspectRatio='none'
        >
          <defs>
            <style>
              {`
              @keyframes drawLine {
                to {
                  stroke-dashoffset: 0;
                }
              }
              .animate-draw {
                stroke-dasharray: 2800;
                stroke-dashoffset: 2200;
                animation: drawLine 3s ease-out forwards;
              }
            `}
            </style>
          </defs>

          <path
            d={pathD}
            stroke='rgba(249, 115, 22, 0.3)'
            strokeWidth='16'
            fill='none'
            filter='blur(6px)'
          />

          <path
            ref={pathRef}
            d={pathD}
            stroke='#f97316'
            strokeWidth='4'
            fill='none'
            className={`transition-all duration-1000 ease-out ${animate ? ' animate-draw' : ''}`}
          />

          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x + 2}
                cy={p.y + 2}
                r='20'
                fill={
                  activeStep === idx + 1 ? 'rgba(249, 115, 22, 0.3)' : 'rgba(209, 213, 219, 0.3)'
                }
                stroke='rgba(255, 255, 255, 0.3)'
                strokeWidth='2'
                filter='blur(2px)'
              />

              <circle
                cx={p.x}
                cy={p.y}
                r='20'
                fill={activeStep === idx + 1 ? '#f97316' : '#d1d5db'}
                stroke='white'
                strokeWidth='2'
              >
                <title>{steps[idx].label + ': ' + steps[idx].desc}</title>
              </circle>

              <text
                x={p.x}
                y={p.y + 8}
                textAnchor='middle'
                fill='white'
                fontSize='22'
                fontWeight='bold'
              >
                {idx + 1}
              </text>

              <foreignObject
                x={dimensions.width < 768 ? p.x + 30 : p.x - 30}
                y={dimensions.width < 768 ? p.y - 70 : p.y - 100}
                width={
                  dimensions.width < 768
                    ? dimensions.width * 0.7
                    : dimensions.width / (steps.length + 2)
                }
                height={dimensions.width < 768 ? '200' : '500'}
              >
                <div className='rounded-lg p-4 relative'>
                  <div
                    className={`flex items-center space-x-3 ${
                      dimensions.width < 768 ? 'mt-8' : 'mt-36 xl:mt-48'
                    }`}
                  >
                    <div className='flex-1 relative z-20'>
                      <h3
                        className={`font-bold text-gray-900 mb-1 ${
                          dimensions.width < 768 ? 'text-lg' : 'text-xl xl:text-3xl'
                        }`}
                      >
                        {steps[idx].label}
                      </h3>
                      <p
                        className={`text-gray-600/90 leading-relaxed ${
                          dimensions.width < 768 ? 'text-sm' : 'text-base xl:text-2xl'
                        }`}
                      >
                        {steps[idx].desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute ${
                      dimensions.width < 768 ? 'top-2 right-0' : 'top-12 xl:top-24 right-0'
                    } !z-2`}
                  >
                    <span
                      className={`font-[1000] text-gray-300/60 rounded-full flex items-center justify-center text-shadow-lg ${
                        dimensions.width < 768 ? 'text-[80px]' : 'text-[150px]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>
      {isOpen && <ConfirmBeforeTestModal open={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
