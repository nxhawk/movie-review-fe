import { moodData } from "../../../constants/mood";
import { cn } from "../../../utils/cn";

type Props = {
  mood: number[];
  className?: string;
};

const UserCutMood = ({ mood, className }: Props) => {
  return (
    <div className="flex items-center justify-between">
      {moodData.map((item, index) => {
        if (mood[index] === -1) return null;
        return (
          <div
            className={cn(
              "!mx-0 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-[#032541] rounded-full hover:scale-125 duration-150 transition ease-in-out hover:z-40 !-ml-[0.75rem]",
              `z-[${7 - index}]`,
              className,
            )}
            key={item.name}
          >
            <img src={item.icon[mood[index]]} alt="icon" className="w-6 h-6 md:w-7 md:h-7" />
          </div>
        );
      })}
    </div>
  );
};

export default UserCutMood;
