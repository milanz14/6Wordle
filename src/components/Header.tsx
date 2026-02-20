import HeaderStats from "./HeaderStats.tsx";

const Header = () => {
  return (
    <header className="flex flex-col items-center mb-4">
      <h1 className="text-6xl font-black tracking-widest bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        6Wordle
      </h1>
      <HeaderStats />
    </header>
  );
};

export default Header;
