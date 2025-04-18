import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const divVariants = {
  hidden: { x: -100, opacity: 0, scale: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    x: -100,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

export default function DivAnimation({ children, className = "" }) {
  const ref = useRef();
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <motion.div
            variants={divVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
