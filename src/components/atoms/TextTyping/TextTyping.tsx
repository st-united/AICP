import { useEffect, useState, useRef } from 'react';

type TextTypingProps = {
  text?: string;
  speed?: number;
  className?: string;
};

export const TextTyping = ({ text, speed = 100, className }: TextTypingProps) => {
  const [displayed, setDisplayed] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    if (!text) return;

    intervalRef.current = setInterval(() => {
      setDisplayed(text.substring(0, index + 1));
      index++;
      if (index >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return <div className={className}>{displayed}</div>;
};
