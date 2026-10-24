"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarCheck, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 animate-gradient-pan opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #0f211f 0%, #1d3b37 28%, #275b53 50%, #543720 72%, #0f211f 100%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="absolute -top-24 -left-24 h-96 w-96 animate-float-slow rounded-full bg-primary-500/30 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-[26rem] w-[26rem] animate-float-slower rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-slow rounded-full bg-primary-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(15,33,31,0.55)_80%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-5 py-28 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 w-full max-w-md justify-self-center lg:order-1 lg:justify-self-start"
        >
          <ServiceVisual category="medical" icon={Stethoscope} size="hero" className="shadow-2xl shadow-primary-950/40" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-1 max-w-xl lg:order-2"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-200 backdrop-blur-sm">
              <Sparkles size={14} className="text-gold-300" />
              Physician-led primary care &amp; aesthetics
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-5xl xl:text-6xl"
          >
            Whole-person medical care,
            <br />
            delivered with <span className="text-gold-300">luxury precision.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-100/80 sm:text-lg"
          >
            From general consultations, diagnostics and chronic care, to
            advanced skin and aesthetic treatments — The Luxe Medical Clinic
            brings it all under one experienced, physician-led roof.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <LinkButton href="/account/book" size="lg" variant="secondary">
              Book an Appointment
              <ArrowRight size={18} />
            </LinkButton>
            <LinkButton
              href="/services"
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10"
            >
              Explore Services
            </LinkButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-primary-100/70"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold-300" /> HMO &amp; insurance accepted
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck size={16} className="text-gold-300" /> Same-week appointments
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
