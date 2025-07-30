// components/LazySection.tsx
import { ReactNode, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type LazySectionProps = {
  children: ReactNode;
  className?: string;
};

const LazyComponent = ({ children, className }: LazySectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      sectionRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  return (
    <div ref={setRefs} className={className}>
      {inView && children}
    </div>
  );
};

export default LazyComponent;
