import { motion } from "framer-motion";
import { type GuessLineProps } from "../types/interfaces";

const WORD_LENGTH = 6;

const GuessLine = ({ guess, isFinal, solution }: GuessLineProps) => {
  const squares = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i] ?? "";
    let colorClass = "bg-white/10 border-white/20";

    if (isFinal) {
      if (letter === solution[i]) {
        colorClass = "bg-emerald-500 border-emerald-400";
      } else if (solution.includes(letter) && letter !== "") {
        colorClass = "bg-amber-400 border-amber-300";
      } else {
        colorClass = "bg-slate-600 border-slate-500";
      }
    }

    squares.push(
      <motion.div
        key={i}
        className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center text-white font-bold text-xl uppercase shadow-md ${colorClass}`}
        initial={isFinal ? { rotateX: 0 } : false}
        animate={isFinal ? { rotateX: 360 } : {}}
        transition={{ delay: i * 0.1, duration: 0.4, ease: "easeInOut" }}>
        {letter}
      </motion.div>,
    );
  }

  return <div className="flex justify-center gap-2 py-1">{squares}</div>;
};

export default GuessLine;
