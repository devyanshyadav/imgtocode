"use client";
import React, { useState } from "react";
import DevInput from "../dev-components/dev-input";
import DevButton from "../dev-components/dev-button";
import { VscBracketError } from "react-icons/vsc";
import DevTooltip from "../dev-components/dev-tooltip";
import useZustStore from "@/lib/zust-store";
import { TxtModal } from "@/lib/txt-modal";
import { ImageTxtModal } from "@/lib/img-txt-modal";
import { GrPowerReset } from "react-icons/gr";
import { UploadPrompt } from "@/lib/prompts";

const UpdatePrompt = () => {
  const { File, code, setCode, setLoading } = useZustStore();
  const [update, setUpdate] = useState("");

  const handleFixCode = async () => {
    setLoading(true);
    const Prompt = `This is the JSX code. There is an error in this code, so please fix that error: ${code}. If the code is basically correct, then comment out all Lucide tag icons because the icons used may not be available in Lucide. At the end, provide the proper JSX code only, with no additional unnecessary text.`;
    const result = await TxtModal(Prompt);
    setCode(result as string);
    setLoading(false);
  };

  const handleUpdatePrompt = async () => {
    if (!update.trim()) return;
    setLoading(true);

    const result = await TxtModal(
      `This is the code to be updated: ${code}. This is what you have to update: ${update}. At the end, please provide the proper JSX code only, with no other additional text. Do not remove any comments if they are present.`
    );
    setUpdate("");
    setCode(result as string);
    setLoading(false);
  };

  const Regenerate = async () => {
    setLoading(true);

    const result = File
      ? await ImageTxtModal(File as File, UploadPrompt)
      : await TxtModal(UploadPrompt);
    setCode(result as string);
    setLoading(false);
  };

  return (
    <div className="bg-ACCENT/50 UpdatePromptContainer border border-ACCENT/20 border-b-0 flex items-center justify-center gap-2 rounded-t-2xl p-3 absolute bottom-0 left-1/2 -translate-x-1/2 pb-5 z-50">
      <DevInput
        placeholder="Add functionalities"
        value={update}
        reverseIcon
        onChange={(e) => setUpdate(e.target.value)}
        icon={
          <DevButton onClick={handleUpdatePrompt} rounded="full" size="sm">
            update
          </DevButton>
        }
      />
      <DevTooltip defaultOpen={code ? false : true} tipData="Fix Code">
        <DevButton
          onClick={handleFixCode}
          asIcon
          rounded="full"
          size="lg"
          className="!text-black"
        >
          <VscBracketError className="text-xl" />
        </DevButton>
      </DevTooltip>
      <DevTooltip defaultOpen={code ? false : true} tipData="Regenerate">
        <DevButton
          onClick={Regenerate}
          asIcon
          rounded="full"
          size="lg"
          className="!text-black"
        >
          <GrPowerReset />
        </DevButton>
      </DevTooltip>
    </div>
  );
};

export default UpdatePrompt;
