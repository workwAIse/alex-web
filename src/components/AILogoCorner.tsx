'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRef } from 'lottie-react';

const LOGO_SIZE = 96;

export default function AILogoCorner() {
  const lottieRef = useRef<LottieRef['current']>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const path = '/AI logo Foriday.json';
    const url = path.includes(' ')
      ? path.split('/').map((s) => encodeURIComponent(s)).join('/')
      : path;
    fetch(url)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  useEffect(() => {
    if (!animationData || !lottieRef.current) return;
    lottieRef.current.play();
  }, [animationData]);

  if (!animationData) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 pointer-events-none flex items-center justify-center"
      style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
      />
    </div>
  );
}
