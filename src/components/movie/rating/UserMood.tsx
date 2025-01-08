import { Divider, Typography } from "@mui/material";
import React from "react";
import { moodData } from "../../../constants/mood";
import { cn } from "../../../utils/cn";

type Props = {
  title: string;
  mood: number[];
  setMood: React.Dispatch<React.SetStateAction<number[]>>;
};

const UserMood = ({ title, mood, setMood }: Props) => {
  const handleChangeMood = (index: number, value: number) => {
    const newMood = [...mood];
    newMood[index] = value;
    setMood(newMood);
  };

  return (
    <div className="space-y-4 mt-4">
      <Typography variant="h4" color="primary" fontWeight="bold">
        Mood
      </Typography>
      <Typography variant="body1" fontWeight={"600"} color="primary" className="italic">
        How did {title} make you feel?
      </Typography>
      <div>
        {moodData.map((item, index) => (
          <div key={item.name} className="space-y-4">
            <div className="flex items-center space-x-5 md:space-x-10 space-y-5">
              <div className="text-base min-w-20 md:min-w-28 md:text-lg font-bold">{item.name}</div>
              <div className="grid grid-cols-[repeat(4,2.5rem)] md:grid-cols-[repeat(6,3.5rem)] gap-y-2 md:gap-y-4 justify-between items-center w-full min-h-20 py-2 md:py-4">
                {item.icon.map((icon, idx) => (
                  <label
                    key={idx}
                    className={cn(
                      "group relative inline-flex justify-center items-center whitespace-nowrap p-1 rounded-full transform hover:bg-white hover:scale-110 hover:md:scale-125 duration-150 transition ease-in-out hover:drop-shadow-xl cursor-pointer",
                      mood[index] === idx ? "drop-shadow-xl bg-white scale-110 md:scale-125" : "",
                    )}
                    onClick={() => handleChangeMood(index, idx)}
                  >
                    <img src={icon} alt="icon" className="w-8 h-8 md:w-12 md:h-12 cursor-pointer" />
                  </label>
                ))}
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMood;
