import { ReactNode, useCallback, useRef, useEffect, useState, useMemo } from 'react';
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
    rootMargin: '50px',
  });

  useEffect(() => {
    if (measureRef.current && height === null) {
      setHeight(measureRef.current.offsetHeight);
    }
  }, []);

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      sectionRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  const renderContent = useMemo(() => {
    if (height === null) {
      return <div ref={measureRef}>{children}</div>;
    }

    if (!inView) {
      return <div style={{ height }} />;
    }

    return children;
  }, [height, inView, children]);

  return (
    <div ref={setRefs} className={className}>
      {renderContent}
    </div>
  );
};

export default LazyComponent;
