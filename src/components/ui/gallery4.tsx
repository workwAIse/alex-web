"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/useMediaQuery";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  /** Optional node (e.g. View Source button) to render in the header row */
  action?: React.ReactNode;
}

function GalleryCard({ item }: { item: Gallery4Item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl"
      aria-label={`Open ${item.title} in new tab`}
    >
      <div className="group relative h-full min-h-[14rem] w-full max-w-full overflow-hidden rounded-xl aspect-[5/4]">
        <img
          src={item.image}
          alt={item.title}
          className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-primary-foreground md:p-5">
          <div className="mb-2 pt-2 text-lg font-semibold md:mb-3 md:pt-3">
            {item.title}
          </div>
          <div className="mb-6 line-clamp-2 text-sm md:mb-8">
            {item.description}
          </div>
          <div className="flex items-center text-sm">
            Read more{" "}
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  );
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items,
  action,
}: Gallery4Props) => {
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setScrollSnapCount(carouselApi.scrollSnapList().length);
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    carouselApi.on("reInit", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
      carouselApi.off("reInit", updateSelection);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || isMobile) return;
    const handleResize = () => carouselApi.reInit();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [carouselApi, isMobile]);

  const needsScroll = canScrollPrev || canScrollNext;

  if (isMobile) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-0">
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="text-2xl font-medium">{title}</h2>
            <p className="max-w-lg text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-0">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          {needsScroll ? (
            <>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium md:text-3xl">{title}</h2>
                <p className="max-w-lg text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    carouselApi?.scrollPrev();
                  }}
                  disabled={!canScrollPrev}
                  className="h-9 w-9 rounded-full border-zinc-300 dark:border-zinc-600 disabled:pointer-events-auto"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    carouselApi?.scrollNext();
                  }}
                  disabled={!canScrollNext}
                  className="h-9 w-9 rounded-full border-zinc-300 dark:border-zinc-600 disabled:pointer-events-auto"
                  aria-label="Next slide"
                >
                  <ArrowRight className="size-5" />
                </Button>
                {action}
              </div>
            </>
          ) : (
            <div className="flex w-full justify-end">{action}</div>
          )}
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[288px] pl-4 md:max-w-[324px] lg:pl-5"
              >
                <GalleryCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {needsScroll && scrollSnapCount > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: scrollSnapCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-primary" : "bg-primary/20"
                }`}
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { Gallery4 };
