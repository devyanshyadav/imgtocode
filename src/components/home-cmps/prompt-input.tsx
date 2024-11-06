"use client";
import React, { useState } from "react";
import DevLaserInput from "../dev-components/dev-laser-input";
import DevButton from "../dev-components/dev-button";
import useZustStore from "@/lib/zust-store";
import { TxtModal } from "@/lib/txt-modal";
import { RiLoader4Line } from "react-icons/ri";
import { InputPrompt } from "@/lib/prompts";

const PromptInput = () => {
  const { setCode, setLoading, File, isLoading,setUserInputPrompt } = useZustStore();
  const [userPrompt, setUserPrompt] = useState("");
  const handlePrompt = async () => {
    if (!userPrompt.trim()) return;
    const Prompt = InputPrompt(userPrompt);
    setLoading(true);
    const result = await TxtModal(Prompt);
    setCode(result as string);
    setUserInputPrompt( userPrompt );
    setLoading(false);
    setUserPrompt("")
  };
  return (
   <form action={handlePrompt}>

    <DevLaserInput
     placeholder="Create a dashboard component"
      scale="lg"
      value={userPrompt}
      disabled={File ? true : false}
      type="text"
      onChange={(e) => setUserPrompt(e.target.value)}
      className="pr-1 pl-4"
      reverseIcon
      icon={
        <DevButton type="submit" rounded="full">
          Do Magic
          {userPrompt && isLoading && <RiLoader4Line className="animate-spin text-xl" />}
        </DevButton>
      }
    />
   </form>
  );
};

export default PromptInput;
