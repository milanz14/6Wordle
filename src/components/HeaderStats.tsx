import { words } from "../data/words";

const HeaderStats = () => {
  return (
    <p className="text-slate-400 text-sm tracking-widest mt-1">
      {words.length} words in library
    </p>
  );
};

export default HeaderStats;
