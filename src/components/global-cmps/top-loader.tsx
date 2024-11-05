"use client";
import useZustStore from "@/lib/zust-store";
import React from "react";

const TopLoader = () => {
  const { isLoading } = useZustStore();
  return isLoading ? (
    <div className="absolute inset-x-0 -bottom-1.5">
      <span className="beam-loader"></span>
    </div>
  ) : null;
};

export default TopLoader;
