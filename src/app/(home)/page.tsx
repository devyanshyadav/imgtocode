"use client";
import DevButton from "@/components/dev-components/dev-button";
import DevInput from "@/components/dev-components/dev-input";
import DevLaserInput from "@/components/dev-components/dev-laser-input";
import PromptInput from "@/components/home-cmps/prompt-input";
import UpdatePrompt from "@/components/home-cmps/update-prompt";
import UploadImg from "@/components/home-cmps/upload-img";
import OutputPlayground from "@/components/output-cmps/output-playground";
import useZustStore from "@/lib/zust-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const page = () => {
  const { code} = useZustStore();

  useGSAP(() => {
    if (code) {
      gsap.to(".PromptContainer", {
        x: "-200%",
        duration: 1,
      });

      gsap.to(".UploadContainer", {
        x: "200%",
        duration: 1,
      });

      gsap.to(".CodePlayground", {
        display: "grid",
      });
      gsap.to(".MainContainer", {
        display: "none",
      });

      gsap.to(".CodePlayground", {
        scale: 1,
        duration:1,
      });
    }
  }, [code]);
  return (
    <>
      <section className="MainContainer grid min-h-[90vh] grid-cols-2 gap-5 *:py-24 border-b border-ACCENT/50  ">
        <div className="PromptContainer space-y-4 grid place-content-center md:w-[80%]">
          <h1 className="text-5xl font-bold">Transform your UI to Code</h1>
          <p className="opacity-80">
            AI Powered UI to Code Convertor that helps you build beautiful,
            accessible, and performant user interfaces.
          </p>
          <br />
          <PromptInput />
        </div>
        <div className="h-full UploadContainer bg-cover bg-center flex items-center justify-center bg-[url(/assets/mesh-bg-light.png)] dark:bg-[url(/assets/mesh-bg.png)]">
          <UploadImg />
        </div>
      </section>
      <OutputPlayground />
    </>
  );
};

export default page;
