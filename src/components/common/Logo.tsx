import { Link } from "react-router-dom";
import path from "../../constants/path";

const Logo = () => {
  return (
    <Link
      to={path.HOME}
      className="bg-gradient-to-r from-green-300 to-cyan-400 inline-block text-transparent bg-clip-text uppercase text-xl sm:text-2xl md:text-3xl font-bold tracking-wider"
    >
      CineMatch
    </Link>
  );
};

export default Logo;
