"use client";
import React, { useCallback, useState, useEffect } from "react";
import { PiFilePdfFill } from "react-icons/pi";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdImage } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { RxUpload } from "react-icons/rx";
import DevButton from "./dev-button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadedFile {
  file: FileWithPreview;
  progress: number;
  preview?: string;
}

interface FileDropzoneProps {
  onDrop?: (acceptedFiles: File[]) => void;
  onSubmit?: () => void;
  maxSize?: number;
  accept?: string[];
  maxFiles?: number;
  disabled?: boolean;
  showLimitError?: boolean;
}

const DevFileUploader = ({
  onDrop,
  onSubmit,
  maxSize = 5242880,
  accept = ["image/*", "application/pdf"],
  maxFiles = 5,
  disabled = false,
  showLimitError = true,
}: FileDropzoneProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((fileObj) => {
        if (fileObj.preview) {
          URL.revokeObjectURL(fileObj.preview);
        }
      });
    };
  }, []);

  const createPreview = (file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFileLimitExceeded(false);

      const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);
      const remainingSlots = maxFiles - uploadedFiles.length;
      const filesToAdd = validFiles.slice(0, remainingSlots);

      if (filesToAdd.length > 0) {
        const newFiles = filesToAdd.map((file) => ({
          file,
          progress: 0,
          preview: createPreview(file),
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);

        newFiles.forEach((fileObj) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            if (progress > 100) {
              clearInterval(interval);
              return;
            }
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.file === fileObj.file ? { ...f, progress } : f
              )
            );
          }, 300);
        });

        if (onDrop) {
          onDrop(filesToAdd);
        }
      }

      if (
        uploadedFiles.length + filesToAdd.length >= maxFiles &&
        showLimitError
      ) {
        setFileLimitExceeded(true);
      }
    },
    [maxSize, maxFiles, onDrop, uploadedFiles.length]
  );

  const removeFile = (fileToRemove: FileWithPreview) => {
    setUploadedFiles((files) => {
      const fileObj = files.find((f) => f.file === fileToRemove);
      if (fileObj?.preview) {
        URL.revokeObjectURL(fileObj.preview);
      }
      return files.filter((f) => f.file !== fileToRemove);
    });
  };

  const clearAllFiles = () => {
    uploadedFiles.forEach((fileObj) => {
      if (fileObj.preview) {
        URL.revokeObjectURL(fileObj.preview);
      }
    });
    setUploadedFiles([]);
    setFileLimitExceeded(false);
  };

  const handleFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <MdImage />;
    if (fileType === "application/pdf") return <PiFilePdfFill />;
    return <GoFileDirectoryFill />;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  useGSAP(
    () => {
      gsap.to(".splitCover", {
        scaleX: 1 - uploadedFiles[0]?.progress / 100,
        ease: "power1.inOut",
      });
    },
    {
      dependencies: [uploadedFiles],
    }
  );

  return (
    <div className="w-full  bg-LIGHT dark:bg-DARK rounded-xl border-ACCENT/40 p-3 flex flex-col gap-3 max-h-[500px] overflow-hidden">
      {uploadedFiles.length !== maxFiles && (
        <>
          <div
            className={`
              relative rounded-lg border-2 border-ACCENT/50 aspect-video grid place-content-center border-dashed p-3 text-center hover:border-ACCENT transition-colors
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${isDragActive ? "border-ACCENT bg-ACCENT/20" : ""}
              ${
                fileLimitExceeded
                  ? "border-red-500 bg-red-500/30"
                  : "border-ACCENT/50"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragActive(false);
              const files = Array.from(e.dataTransfer.files);
              handleDrop(files);
            }}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  handleDrop(Array.from(e.target.files));
                }
              }}
              accept={accept.join(",")}
              multiple={maxFiles > 1}
              disabled={disabled}
            />

            <div className="flex items-center flex-col justify-center gap-2">
              <RxUpload className="text-5xl" />
              <p>Drag and drop image here</p>
              <button
                className="bg-ACCENT p-1.5 px-4 rounded-lg text-white"
                disabled={disabled}
              >
                Browse
              </button>
            </div>
          </div>

          {fileLimitExceeded && (
            <p className="text-red-500 text-sm text-center">
              File limit exceeded. You can only add up to {maxFiles} files at
              once.
            </p>
          )}
        </>
      )}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3 flex-grow relative overflow-auto overflow-x-hidden">
          {uploadedFiles.map((fileObj, index) => (
            <div
              key={index}
              className="border-2 border-ACCENT/20 relative p-3 rounded-xl overflow-hidden flex flex-col"
            >
              {/* <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                <span className="flex-shrink-0 text-lg">
                    {handleFileIcon(fileObj.file.type)}
                  </span>
                  <span className="text-sm text-ellipsis overflow-hidden flex-grow">
                    {fileObj.file.name}
                    </span>
                </div>
                <button
                  className="absolute top-1 hover:text-red-500 right-1"
                  onClick={() => removeFile(fileObj.file)}
                >
                <IoCloseSharp />
                </button>
                </div> */}
              {fileObj.preview && (
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 splitCover rounded-xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 scale-x-100 origin-right z-30" />
                  <DevButton
                  size="sm"
                  asIcon
                  rounded="full"
                  className="absolute z-20 top-1 hover:text-red-500 right-1"
                  onClick={() => removeFile(fileObj.file)}
                >
                <IoCloseSharp />
                </DevButton>
                  <Image
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-contain bg-gray-100"
                  />
                </div>
              )}
              <div className="relative h-2 mt-2 w-full bg-gray-200 rounded mb-2">
                <div
                  style={{ width: `${fileObj.progress}%` }}
                  className="absolute top-0 left-0 h-full bg-ACCENT rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {uploadedFiles.length > 0 && (
        <div className="flex justify-between">
          <DevButton rounded="full" onClick={onSubmit}>
            Do Magic
          </DevButton>
          <DevButton
            rounded="full"
            className="!text-red-500 !bg-red-500/30"
            onClick={clearAllFiles}
          >
            Clear
          </DevButton>
        </div>
      )} */}
    </div>
  );
};

export default DevFileUploader;
