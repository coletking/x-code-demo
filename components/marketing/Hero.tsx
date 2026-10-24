"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Heart, Stethoscope, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";
import { FloatingStatCard, FloatingChecklist } from "@/components/marketing/FloatingCard";

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

const avatarSeeds = ["dr-amaka", "dr-tunde", "dr-chidi"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-[28rem] w-[28rem] animate-float-slow rounded-full bg-gold-200/40 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 animate-float-slower rounded-full bg-primary-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 animate-float-slow rounded-full bg-gold-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 w-full max-w-md justify-self-center pb-6 pr-6 lg:order-1 lg:justify-self-start"
        >
          <ServiceVisual
            category="medical"
            icon={Stethoscope}
            seed="luxe-hero-physician"
            alt="Physician consulting with a patient at The Luxe Medical Clinic"
            size="hero"
            className="shadow-2xl shadow-primary-950/10"
          />
          <FloatingStatCard
            icon={Heart}
            value="97%"
            label="Patient satisfaction"
            delay={0.5}
            className="-top-4 -left-4 sm:-left-8"
          />
          <FloatingChecklist
            items={["HMO & insurance accepted", "Same-week appointments"]}
            delay={0.7}
            className="bottom-0 right-0"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-1 max-w-xl lg:order-2"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-900/10 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-primary-700 shadow-sm">
              <Stethoscope size={14} className="text-gold-600" />
              Physician-led primary care &amp; aesthetics
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl leading-[1.08] text-primary-950 sm:text-5xl lg:text-5xl xl:text-6xl"
          >
            Whole-person medical care,
            <br />
            delivered with <span className="text-gold-600">luxury precision.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-900/65 sm:text-lg"
          >
            From general consultations, diagnostics and chronic care, to
            advanced skin and aesthetic treatments — The Luxe Medical Clinic
            brings it all under one experienced, physician-led roof.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <LinkButton href="/account/book" size="lg">
              Book an Appointment
              <ArrowRight size={18} />
            </LinkButton>
            <LinkButton href="/services" size="lg" variant="outline">
              Explore Services
            </LinkButton>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatarSeeds.map((seed) => (
                <span
                  key={seed}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm"
                >
                  <Image
                    src={`https://picsum.photos/seed/${seed}/80/80`}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
              ))}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-xs font-semibold text-primary-800 shadow-sm">
                <Users size={14} />
              </span>
            </div>
            <p className="text-sm text-primary-900/60">
              <span className="font-semibold text-primary-900">35+ years</span> combined
              physician experience
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
