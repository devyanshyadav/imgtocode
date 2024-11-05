import React from "react";
import ThemeSwitch from "./theme-switch";
import Link from "next/link";
import GoBack from "./Back";

const Header = async () => {
  return (
    <header className="w-full flex-shrink-0 bg-LIGHT dark:bg-DARK p-3">
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">ImgToCode</Link>
        <div className="flex items-center justify-center gap-2">
          <GoBack/>
        <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
