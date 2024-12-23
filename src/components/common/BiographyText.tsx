import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Props = {
  text: string;
};

const BiographyText = ({ text }: Props) => {
  const bioRef = React.useRef<HTMLDivElement | null>(null);
  const [isTextClamped, setIsTextClamped] = React.useState(true);

  React.useEffect(() => {
    if (bioRef.current) {
      const isClamped = bioRef.current.scrollHeight > bioRef.current.clientHeight;
      setIsTextClamped(isClamped);
    }
  }, []);

  return (
    <div className="relative">
      {isTextClamped ? (
        <div
          ref={bioRef}
          className="mt-2 font-sans line-clamp-[7] overflow-hidden"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <div className="mt-2 font-sans" dangerouslySetInnerHTML={{ __html: text }} />
      )}
      {isTextClamped && (
        <div
          className="absolute bottom-0 right-0 w-full flex justify-end"
          style={{ zIndex: 10, background: "linear-gradient(to right,rgba(255,255,255,0)0,#fff 85%)" }}
        >
          <button className="text-[#01B4E4] flex font-bold " onClick={() => setIsTextClamped(false)}>
            Read More
            <KeyboardArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default BiographyText;
