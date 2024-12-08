import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="bg-gradient-to-r from-green-300 to-cyan-400 inline-block text-transparent bg-clip-text uppercase text-3xl font-bold tracking-wider"
    >
      CineMatch
    </Link>
  );
};

export default Logo;
