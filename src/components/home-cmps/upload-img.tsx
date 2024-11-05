"use client";

import React, { useState } from "react";
import DevFileUploader, { UploadedFile } from "../dev-components/dev-uploader";
import useZustStore from "@/lib/zust-store";
import { useRouter } from "next/navigation";
import { ImageTxtModal } from "@/lib/img-txt-modal";
import { UploadPrompt } from "@/lib/prompts";

const UploadImg = () => {
  const { setFile, setCode, setLoading, setError } = useZustStore();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrop = async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      const result = await ImageTxtModal(acceptedFiles[0], UploadPrompt);
      setCode(result);
      setFile(acceptedFiles[0]);
      setLoading(false);
      setUploadedFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process file");
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:!w-[80%]">
      <DevFileUploader
        accept={["image/*"]}
        maxSize={5242880}
        maxFiles={1}
        showLimitError={false}
        onDrop={handleDrop}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </div>
  );
};

export default UploadImg;
