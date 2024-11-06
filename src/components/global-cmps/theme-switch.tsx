"use client";
import { useTheme } from "next-themes";
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import DevButton from "../dev-components/dev-button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
      <DevButton
        rounded="full"
        asIcon
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? <MdWbSunny /> : <IoMdMoon />}
      </DevButton>
  );
}
