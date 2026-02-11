'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Lottie, { type LottieRef } from 'lottie-react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOTTIE_TRIGGER_SIZE = 48;
const LOTTIE_CENTER_SIZE = 96;

function LottiePlayer({
  src,
  isOpen,
  size,
  className,
}: {
  src: string;
  isOpen: boolean;
  size: number;
  className?: string;
}) {
  const lottieRef = useRef<LottieRef['current']>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const path = src.startsWith('/') ? src : `/${src}`;
    const url = path.includes(' ')
      ? path.split('/').map((s) => encodeURIComponent(s)).join('/')
      : path;
    fetch(url)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [src]);

  useEffect(() => {
    if (!animationData || !lottieRef.current) return;
    const api = lottieRef.current;
    const direction = isOpen ? 1 : -1;
    api.setDirection(direction);
    api.play();
  }, [isOpen, animationData]);

  if (!animationData) return null;

  return (
    <span
      className={cn('flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        style={{ width: size, height: size }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
      />
    </span>
  );
}

const CONSTANTS = {
  itemSize: 48,
  containerSize: 250,
  openStagger: 0.02,
  closeStagger: 0.07
};

const STYLES: Record<string, Record<string, string>> = {
  trigger: {
    container:
      'rounded-full flex items-center bg-foreground justify-center cursor-pointer outline-none ring-0 hover:brightness-125 transition-all duration-100 z-50',
    active: 'bg-foreground'
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-muted hover:bg-muted/50 cursor-pointer',
    label: 'text-xs text-foreground absolute top-full left-1/2 -translate-x-1/2 mt-1'
  }
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta) + 0;
  return { x, y };
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  totalItems: number;
  isOpen: boolean;
  onItemClick?: (href: string) => void;
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, onItemClick }: MenuItemProps) => {
  const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(href);
    }
  };

  return (
    <a href={href} className={STYLES.item.container} onClick={handleClick}>
      <motion.span
        role="button"
        tabIndex={0}
        animate={{
          x: isOpen ? x : 0,
          y: isOpen ? y : 0
        }}
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 0.1,
            delay: 0
          }
        }}
        transition={{
          delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        style={{
          height: CONSTANTS.itemSize - 2,
          width: CONSTANTS.itemSize - 2
        }}
        className={STYLES.item.container}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {icon}
        {hovering && <p className={STYLES.item.label}>{label}</p>}
      </motion.span>
    </a>
  );
};

interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => Promise<void>;
  onCloseComplete?: () => void;
  onTriggerClickWhenClosed?: () => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  /** When set, use this Lottie JSON path as the trigger (replaces open/close icons); plays forward when open, reverse when closed */
  lottieTriggerSrc?: string;
  /** Ref to expose runCloseAnimation for programmatic close (e.g. when item is clicked) */
  closeAnimationRef?: React.MutableRefObject<(() => Promise<void>) | null>;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  onCloseComplete,
  onTriggerClickWhenClosed,
  openIcon,
  closeIcon,
  lottieTriggerSrc,
  closeAnimationRef
}: MenuTriggerProps) => {
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.15;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop'
      }
    });
    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        width: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        ...(lottieTriggerSrc
          ? {}
          : {
              backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.max(
                100 - i * 10,
                40
              )}%, var(--background))`
            }),
        transition: {
          duration: CONSTANTS.closeStagger / 2,
          ease: 'linear'
        }
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({
      translateX: 0,
      transition: {
        duration: 0
      }
    });

    animate.start({
      height: CONSTANTS.itemSize,
      width: CONSTANTS.itemSize,
      ...(lottieTriggerSrc ? {} : { backgroundColor: 'var(--foreground)' }),
      transition: {
        duration: 0.1,
        ease: 'backInOut'
      }
    });
  };

  React.useEffect(() => {
    if (closeAnimationRef) closeAnimationRef.current = closeAnimation;
  }, [closeAnimationRef]);

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        animate={animate}
        style={{
          height: CONSTANTS.itemSize,
          width: CONSTANTS.itemSize
        }}
        className={cn(
          STYLES.trigger.container,
          isOpen && STYLES.trigger.active,
          lottieTriggerSrc && 'bg-transparent hover:bg-transparent'
        )}
        onClick={async () => {
          if (isOpen) {
            setIsOpen(false);
            await closeAnimationCallback();
            await closeAnimation();
            onCloseComplete?.();
          } else {
            if (onTriggerClickWhenClosed) {
              onTriggerClickWhenClosed();
            } else {
              setIsOpen(true);
            }
          }
        }}
      >
        {lottieTriggerSrc ? (
          <LottiePlayer src={lottieTriggerSrc} isOpen={isOpen} size={LOTTIE_TRIGGER_SIZE} />
        ) : (
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.span
                key="menu-close"
                initial={{
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)'
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                transition={{
                  duration: 0.2
                }}
              >
                {closeIcon}
              </motion.span>
            ) : (
              <motion.span
                key="menu-open"
                initial={{
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)'
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                transition={{
                  duration: 0.2
                }}
              >
                {openIcon}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </motion.button>
    </motion.div>
  );
};

interface CircleMenuProps {
  items: Array<{ label: string; icon: React.ReactNode; href: string }>;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  /** Public path to a Lottie JSON file to use as the trigger icon (replaces open/close icons); plays forward when open, reverse when closed */
  lottieTriggerSrc?: string;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes (for controlled mode) */
  onOpenChange?: (open: boolean) => void;
  /** Called when close animation fully completes */
  onCloseComplete?: () => void;
  /** When provided, item clicks call this instead of following href (enables custom close-then-navigate) */
  onItemClick?: (href: string) => void;
  /** When provided, trigger click while closed calls this instead of opening (e.g. for "move to center then open") */
  onTriggerClickWhenClosed?: () => void;
}

export type CircleMenuRef = {
  /** Run close animation and resolve when done (use when closing from item click) */
  requestClose: () => Promise<void>;
};

const CircleMenu = forwardRef<CircleMenuRef, CircleMenuProps>(function CircleMenu({
  items,
  openIcon = <Menu size={18} className="text-background" />,
  closeIcon = <X size={18} className="text-background" />,
  lottieTriggerSrc,
  open: controlledOpen,
  onOpenChange,
  onCloseComplete,
  onItemClick,
  onTriggerClickWhenClosed
}, ref) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggerCloseAnimationRef = useRef<(() => Promise<void>) | null>(null);

  const setIsOpen = (open: boolean) => {
    if (!isControlled) setInternalOpen(open);
    onOpenChange?.(open);
  };

  const animate = useAnimationControls();

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: 'blur(1px)',
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: 'linear'
      }
    });
    await animate.start({
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0
      }
    });
  };

  const requestClose = async () => {
    setIsOpen(false);
    await closeAnimationCallback();
    await triggerCloseAnimationRef.current?.();
    onCloseComplete?.();
  };

  useImperativeHandle(ref, () => ({ requestClose }), [onCloseComplete]);

  return (
    <div
      style={{
        width: CONSTANTS.containerSize,
        height: CONSTANTS.containerSize
      }}
      className="relative flex items-center justify-center place-self-center"
    >
      {/* When using Lottie, show a larger center piece when open so the whole hub is the Lottie */}
      {lottieTriggerSrc && isOpen && (
        <div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <LottiePlayer
            src={lottieTriggerSrc}
            isOpen={isOpen}
            size={LOTTIE_CENTER_SIZE}
          />
        </div>
      )}
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        onCloseComplete={onCloseComplete}
        onTriggerClickWhenClosed={onTriggerClickWhenClosed}
        openIcon={openIcon}
        closeIcon={closeIcon}
        lottieTriggerSrc={lottieTriggerSrc}
        closeAnimationRef={triggerCloseAnimationRef}
      />
      <motion.div
        animate={animate}
        className={cn('absolute inset-0 z-0 flex items-center justify-center')}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              icon={item.icon}
              label={item.label}
              href={item.href}
              index={index}
              totalItems={items.length}
              isOpen={isOpen}
              onItemClick={onItemClick}
            />
          );
        })}
      </motion.div>
    </div>
  );
});

export { CircleMenu };
