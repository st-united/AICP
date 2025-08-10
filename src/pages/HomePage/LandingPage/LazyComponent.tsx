import { ReactNode, useCallback, useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type LazySectionProps = {
  children: ReactNode;
  className?: string;
};

const LazyComponent = ({ children, className }: LazySectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  useEffect(() => {
    if (measureRef.current && height === null) {
      setHeight(measureRef.current.offsetHeight);
    }
  }, [height]);

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      sectionRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  return (
    <div ref={setRefs} className={className}>
      {height === null && <div ref={measureRef}>{children}</div>}
      {height !== null && !inView && <div style={{ height }} />}
      {height !== null && inView && children}
    </div>
  );
};

export default LazyComponent;
