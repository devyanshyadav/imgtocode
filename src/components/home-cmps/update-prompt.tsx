'use client'
import React, { useState } from 'react'
import DevInput from '../dev-components/dev-input'
import DevButton from '../dev-components/dev-button'
import { VscBracketError } from "react-icons/vsc";
import DevTooltip from '../dev-components/dev-tooltip';
import useZustStore from '@/lib/zust-store';
import { TxtModal } from '@/lib/txt-modal';
import { ImageTxtModal } from '@/lib/img-txt-modal';
import { GrPowerReset } from "react-icons/gr";
import { UploadPrompt } from '@/lib/prompts';

const UpdatePrompt = () => {
    const { File,code, setCode, setLoading } = useZustStore();
    const [update, setUpdate] = useState("")

    const handleFixCode = async() => {
        const Prompt=`This is the jsx code there is an error in this code so that fix that error: ${code} ,If code is basically correct then comment the all lucide tag icons because icons used may be not there in lucide and at the end give me proper jsx code only no other additional useless text`
        const result = await TxtModal(Prompt);
        setCode(result as string);
        
    }

    const handleUpdatePrompt = async() => {
        if(!update) return;
        const result = await TxtModal(`This is the code to be update:${code} and this is the what you have to update:${update} and at the end give me proper jsx code only no other additional useless text and don't remove any comments if it is there`);
        setCode(result as string);
    }

    const Regenerate = async() => {
        const result = File ? await ImageTxtModal(File as File,UploadPrompt) : await TxtModal(UploadPrompt);
        setCode(result as string);
    }
  return (
    <div className="bg-red-300 flex items-center justify-center gap-2 rounded-t-xl p-3 absolute bottom-0 left-1/2 -translate-x-1/2">
    <DevInput reverseIcon onChange={(e) => setUpdate(e.target.value)} icon={<DevButton onClick={handleUpdatePrompt} rounded="full" size='sm'>update</DevButton>} />
    <DevTooltip tipData="Fix Code">
    <DevButton onClick={handleFixCode} asIcon rounded="full" size='lg' className='!text-black'><VscBracketError /></DevButton>
    </DevTooltip>
    <DevTooltip tipData="Regenerate">
    <DevButton onClick={Regenerate} asIcon rounded="full" size='lg' className='!text-black'><GrPowerReset /></DevButton>
    </DevTooltip>
    </div>
  )
}

export default UpdatePrompt