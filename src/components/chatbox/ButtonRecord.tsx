import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const ButtonRecord = ({ setQuery, setIsRecording, open }: Props) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  React.useEffect(() => {
    if (!open) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!browserSupportsSpeechRecognition) {
    return <span></span>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setQuery(transcript);
    setIsRecording(false);
  };

  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      {!listening ? (
        <IconButton aria-label="record" onClick={handleStartListening}>
          <MicIcon fontSize="inherit" />
        </IconButton>
      ) : (
        <>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <IconButton aria-label="record" onClick={handleStopListening}>
            <RadioButtonCheckedIcon fontSize="inherit" color="error" />
          </IconButton>
        </>
      )}
    </span>
  );
};

export default ButtonRecord;
