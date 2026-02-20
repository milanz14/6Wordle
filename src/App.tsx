import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl, Howler } from "howler";

import "./styles/App.css";
import { words } from "./data/words";
import GuessLine from "./components/GuessLine";
import Header from "./components/Header";

import lose from "./assets/fx/lose.mp3";
import submit from "./assets/fx/submit.mp3";
import win from "./assets/fx/win.mp3";

function App(): JSX.Element {
  const [gameWord, setGameWord] = useState<string>("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const guessInputRef = useRef<HTMLInputElement>(null);
  const gameWordRef = useRef<string>("");
  const guessedWordRef = useRef<string>("");

  Howler.volume(0.05);

  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length);
    gameWordRef.current = words[randIdx];
    setGameWord(words[randIdx]);
  }, []);

  const soundSubmit = new Howl({ src: submit });
  const soundLose = new Howl({ src: lose });
  const soundWin = new Howl({ src: win });

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const wordForGuess = guessInputRef.current!.value.toLowerCase().trim();

    if (!wordForGuess) {
      triggerShake();
      alert("You must provide a guess!");
    } else if (wordForGuess.length !== 6) {
      triggerShake();
      alert("Must be a 6 letter word.");
    } else if (words.indexOf(wordForGuess) === -1) {
      triggerShake();
      alert("Not a valid word in the list.");
    } else {
      guessedWordRef.current = wordForGuess;
      checkGuessedWord();
      soundSubmit.play();
    }

    guessInputRef.current!.value = "";
  };

  const checkGuessedWord = (): void => {
    if (guessedWordRef.current === gameWordRef.current) {
      handleGuesses();
      setIsCorrectAnswer(true);
      soundWin.play();
      setIsGameOver(true);
      return;
    }
    handleGuesses();
  };

  const handleGuesses = (): void => {
    setCount((c) => c + 1);
    const newGuesses = [...guesses];
    newGuesses[newGuesses.findIndex((val) => val === "")] =
      guessedWordRef.current;
    setGuesses(newGuesses);
    if (count === 5) {
      soundLose.play();
      setIsGameOver(true);
    }
  };

  const handleResetGame = () => window.location.reload();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-950 px-4 py-8">
      <Header />

      <AnimatePresence mode="wait">
        {!isGameOver ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 shadow-xl mb-4 ${isShaking ? "shake" : ""}`}>
            <input
              ref={guessInputRef}
              disabled={isGameOver}
              placeholder="Enter guess..."
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 w-52 text-center tracking-widest uppercase"
            />
            <button
              type="submit"
              disabled={isGameOver}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200">
              Guess
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-10 py-8 shadow-xl mb-4 text-white">
            {isCorrectAnswer ? (
              <p className="text-2xl font-bold text-emerald-400">
                🎉 Correct! You got it in {count}{" "}
                {count === 1 ? "try" : "tries"}!
              </p>
            ) : (
              <>
                <p className="text-2xl font-bold text-rose-400">
                  Out of tries! Sorry!
                </p>
                <p className="text-slate-300">
                  The word was{" "}
                  <span className="text-white font-black tracking-widest text-xl">
                    {gameWord.toUpperCase()}
                  </span>
                </p>
              </>
            )}
            <button
              onClick={handleResetGame}
              className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-10 py-3 rounded-xl transition-colors duration-200 mt-2">
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
        {guesses.map((guess: string, idx: number) => {
          const isCurrentGuess =
            idx === guesses.findIndex((val) => val === null);
          return (
            <GuessLine
              key={idx}
              guess={isCurrentGuess ? guessedWordRef.current : (guess ?? "")}
              isFinal={!isCurrentGuess && guess !== ""}
              solution={gameWord}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
