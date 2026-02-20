import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast = ({ message, visible }: ToastProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-rose-500/90 backdrop-blur-md text-white font-semibold px-6 py-3 rounded-2xl shadow-xl border border-rose-400/50 text-sm tracking-wide whitespace-nowrap">
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
