import { cn } from "../../utils/cn";

type Props = {
  text: string;
  className?: string;
};

const TextGradient = ({ text, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-green-300 to-cyan-400 inline-block text-transparent bg-clip-text font-bold tracking-wider",
        className,
      )}
    >
      {text}
    </div>
  );
};

export default TextGradient;
