'use client'
import CodePlayground from "@/components/output-cmps/editor";
import React from "react";

const OutputPlayground = () => {
  return (
    <section className="md:py-5 none scale-0 mx-auto origin-bottom w-full CodePlayground">
      <CodePlayground />
    </section>
  );
};

export default OutputPlayground;
