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
import { FixCodePrompt, UpdatePrompt, UploadPrompt } from "@/lib/prompts";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import DevClipboard from "../dev-components/dev-clipboard";
import { LuCopy } from "react-icons/lu";

const Toolbar = () => {
  const { File, code, setCode, setLoading } = useZustStore();
  const [update, setUpdate] = useState("");

  const handleFixCode = async () => {
    setLoading(true);
    const Prompt = FixCodePrompt(code);
    const result = await TxtModal(Prompt);
    setCode(result as string);
    setLoading(false);
  };

  const handleUpdatePrompt = async () => {
    if (!update.trim()) return;
    setLoading(true);
    const Prompt = UpdatePrompt(update, code);
    const result = await TxtModal(Prompt);
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
      <form action={handleUpdatePrompt}>
        <DevInput
          placeholder="Add functionalities"
          value={update}
          reverseIcon
          onChange={(e) => setUpdate(e.target.value)}
          icon={
            <DevButton type="submit" rounded="full" size="sm">
              update
            </DevButton>
          }
        />
      </form>
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
      <DevTooltip defaultOpen={code ? false : true} tipData="Copy Code">
        <div>
        <DevClipboard textClip={code.replace(/^```.+?\n|```$/gm, '')} className="!text-black" afterCopy={<LuCopy/>} beforeCopy={<IoCopyOutline/>} />
        </div>
      </DevTooltip>
    </div>
  );
};

export default Toolbar;
