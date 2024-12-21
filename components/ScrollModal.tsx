import { motion, AnimatePresence } from "motion/react";

interface ScrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ScrollModal({
  isOpen,
  onClose,
  children,
}: ScrollModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-30"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.2,
              },
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 20,
              transition: {
                duration: 0.15,
              },
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#f4e4bc] relative w-[90vw] max-w-2xl max-h-[80vh] rounded-lg shadow-2xl 
                     overflow-y-auto p-8 mx-4 border-2 border-[#d4b48c] text-black"
            style={{
              backgroundImage: `
                radial-gradient(at 50% 0%, rgba(255,255,255,0.5) 0%, transparent 75%),
                radial-gradient(at 100% 0%, rgba(255,236,209,0.4) 0%, transparent 50%)
              `,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.15 },
              }}
              className="text-center text-brown-800"
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
