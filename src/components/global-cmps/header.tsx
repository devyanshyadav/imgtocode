import React from "react";
import ThemeSwitch from "./theme-switch";
import Link from "next/link";
import GoBack from "./Back";
import TopLoader from "./top-loader";
import { MdOutlineCodeOff } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import DevButton from "../dev-components/dev-button";

const Header = async () => {
  return (
    <header className="w-full border-b border-ACCENT/20 relative flex-shrink-0 bg-LIGHT dark:bg-DARK p-3">
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-white to-ACCENT inline-block text-transparent bg-clip-text">ImgToCode<MdOutlineCodeOff className="inline-block text-ACCENT text-4xl"/></Link>
        <div className="flex items-center justify-center gap-2">
          <GoBack/>
        <ThemeSwitch />
        <DevButton href="https://github.com/devyanshyadav/imgtocode" asIcon rounded="full" size="lg" className="!bg-black scale-105"><FaGithub/></DevButton>
        </div>
      </div>
      <TopLoader/>
    </header>
  );
};

export default Header;
