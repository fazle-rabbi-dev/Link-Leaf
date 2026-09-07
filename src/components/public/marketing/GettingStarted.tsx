"use client"
import { PROCESS_STEPS } from "@/constants/marketing"
import SectionHeader from "./SectionHeader"
import { motion } from "motion/react" // react specific

const GettingStarted = () => {
  return (
    <section className="max-body mt-24">
      <SectionHeader
        heading="Getting Started"
        paragraph="Follow our straightforward onboarding sequence to share your custom page."
      />

      <div className="mt-20 grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
        {PROCESS_STEPS?.map(({ id, stepNumber, title, description }, index) => (
          <motion.div
            key={id}
            className="space-y-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // staggered animation based on index
            viewport={{ once: false }} // animate only once, not every time it enters view
          >
            <div className="inline rounded-full bg-primary p-3 text-center font-semibold text-white">
              {stepNumber}
            </div>
            <h3 className="mt-8 font-semibold">{title}</h3>
            <p>{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default GettingStarted
