"use client";

import React from "react";
import { UserCircle } from "lucide-react";
import { motion } from "motion/react";

export type ReferralItem = { text: string; role: string };

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ReferralItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-foreground/10 bg-background shadow-lg shadow-primary/10 max-w-xs w-full"
                  key={i}
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-muted shrink-0">
                      <UserCircle className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 opacity-60">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
