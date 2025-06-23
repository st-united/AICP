export const smoothScrollTo = (targetY: number, duration = 1200) => {
  const startY = window.scrollY;
  const distanceY = targetY - startY;
  let startTime: number | null = null;

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));
    window.scrollTo(0, startY + distanceY * easeInOut);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
