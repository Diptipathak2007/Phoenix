import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Snackbar = ({ snackbar, onClose }) => {
  // Animation variants
  const snackbarVariant = {
    hidden: { 
      x: -20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      },
    },
    exit: {
      x: -10,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Auto-dismiss
  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        onClose();
      }, snackbar.timeOut);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open, onClose, snackbar.timeOut]);

  return (
    <AnimatePresence>
      {snackbar.open && (
        <motion.div
          key={snackbar.key}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={snackbarVariant}
          className={`
            fixed bottom-8 left-8
            px-5 py-3 rounded-lg flex items-center
            bg-red-400/90 backdrop-blur-sm
            text-white shadow-lg z-50
            min-w-[280px] max-w-[calc(100vw-4rem)]
            border-l-4 border-red-500
          `}
        >
          <span className="flex-grow font-medium text-sm">
            {snackbar.message}
          </span>
          <button 
            onClick={onClose}
            className="ml-3 text-white hover:text-gray-100 text-lg"
            aria-label="Close"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Snackbar.propTypes = {
  snackbar: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;