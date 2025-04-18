import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const itemVariants = {
  hidden: { x: -100, opacity: 0, scale: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
  exit: { x: -100, opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};
export default function AnimatedParagraph({ text }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.p
            key={text}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-lg text-gray-800"
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
