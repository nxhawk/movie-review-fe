import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import toast from "react-hot-toast";

type Props = {
  watchListId: string;
  name: string;
  description?: string;
  email: string;
};

const HeaderAuthor = ({ watchListId, name, description, email }: Props) => {
  const [open, setOpen] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (textRef.current) {
      try {
        const textToCopy = textRef.current.textContent || "";
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard");
      } catch (error) {
        console.error("Lỗi khi sao chép:", error);
        toast.error("Error when copying");
      }
    }
  };

  return (
    <div>
      <div className="bg-[#053c69]">
        <div className="w-full md:max-w-[1400px] flex flex-col justify-center p-5 md:px-10">
          <Link className="text-white text-3xl font-bold w-fit" to={dynamicPath.WATCHLIST_DETAIL(watchListId)}>
            {name}
          </Link>
          <span className="my-4 [&>p]:p-0 text-md md:text-xl text-white">
            <p>{description}</p>
          </span>
          <div className="flex items-center">
            <span className="text-md md:text-2xl text-white">
              A list by&nbsp;
              <span className="text-white opacity-75 font-semibold">{email}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex bg-[#032541] py-2 px-8">
        <div className="text-gray-500 font-bold cursor-pointer" onClick={() => setOpen(true)}>
          Share
        </div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span className="line-clamp-1">Share {name}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="text-gray-700">URL</div>
                <div
                  className="border hover:border-gray-400 py-0.5 px-2 rounded-lg cursor-pointer"
                  onClick={handleCopy}
                >
                  <InsertLinkIcon />
                </div>
              </div>
              <div ref={textRef} className="text-gray-600 border rounded-lg px-3 py-1">
                {window.location.href}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setOpen(false)} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default HeaderAuthor;
