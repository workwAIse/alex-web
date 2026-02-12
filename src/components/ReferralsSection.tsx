"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { ReferralItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const REFERRALS: ReferralItem[] = [
  {
    text: "Working with Alex was a great experience. Delivered on time and the code quality was excellent.",
    role: "Engineering Lead",
  },
  {
    text: "Clear communication and solid technical decisions. Would recommend for any frontend or full-stack work.",
    role: "Product Manager",
  },
  {
    text: "Brought structure and best practices to our codebase. The team learned a lot.",
    role: "CTO",
  },
  {
    text: "Reliable, responsive, and always willing to go the extra mile. A pleasure to work with.",
    role: "Startup Founder",
  },
];

const firstColumn = REFERRALS.slice(0, 2);
const secondColumn = REFERRALS.slice(2, 4);

export default function ReferralsSection() {
  return (
    <section className="relative mt-0 mb-20 overflow-hidden" id="referrals">
      <AuroraBackground
        className="h-auto min-h-[640px] w-full py-16 px-6 md:py-24 md:px-8"
        showRadialGradient={true}
      >
        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
              What people say
            </h2>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
