import { useEffect, useState, useRef } from 'react';

type TypingTextProps = {
  text?: string;
  speed?: number;
  className?: string;
};

const TypingText = ({ text, speed = 100, className }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const characters = Array.from(text || '');
    if (!text || characters.length === 0) return;
    intervalRef.current = setInterval(() => {
      setDisplayed(characters.slice(0, index + 1).join(''));
      index++;
      if (index >= characters.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return <div className={className}>{displayed}</div>;
};

export default TypingText;
