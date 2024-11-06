//TSX code
"use client";
import React, { useState } from "react";
import DevButton from "./dev-button";

type ClipboardProps = {
  textClip: string;
  setCopy?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  beforeCopy?: React.ReactNode;
  afterCopy?: React.ReactNode;
};

const DevClipboard = ({
  textClip,
  beforeCopy = "Copy",
  afterCopy = "Copied",
  className,
}: ClipboardProps) => {
  const [copy, setCopy] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textClip);
      if (setCopy) {
        setCopy(true);
        setTimeout(() => setCopy(false), 1000); // Reset copied state after 1 seconds
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <DevButton
      className={className}
      asIcon
      rounded="full"
      size="lg"
      onClick={copyToClipboard}
    >
      {copy ? afterCopy : beforeCopy}
    </DevButton>
  );
};

export default DevClipboard;
