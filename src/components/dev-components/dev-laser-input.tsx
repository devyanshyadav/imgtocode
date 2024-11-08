//TSX code
"use client";
import React, { useState } from "react";

type LaserInputProps = {
  scale?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "full";
  laserColor?: string;
  laserActiveOnClick?: boolean;
  reverseIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
} & React.ComponentProps<"input">;

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const DevLaserInput = ({
  scale = "md",
  rounded = "full",
  laserActiveOnClick = true,
  reverseIcon = false,
  icon,
  className,
  ...props
}: LaserInputProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [childPosition, setChildPosition] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const [childColor, setChildColor] = useState(
    `bg-gradient-to-r from-transparent via-ACCENT to-transparent`
  );
  const handleMouseMove = (e: React.MouseEvent) => {
    const parentRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - parentRect.left - 50;

    if (x < 0) {
      setChildPosition(0);
      setChildColor(`bg-gradient-to-r from-ACCENT via-ACCENT to-transparent`);
    } else if (x > parentRect.width - 100) {
      setChildPosition(parentRect.width - 96);
      setChildColor(`bg-gradient-to-r from-transparent via-ACCENT to-ACCENT`);
    } else {
      setChildPosition(x);
      setChildColor(
        `bg-gradient-to-r from-transparent via-ACCENT to-transparent`
      );
    }
  };
  const InputSizes = {
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };
  const InputRoundness = {
    none: "rounded-none",
    sm: "rounded-md",
    md: "rounded-xl",
    full: "rounded-full",
  };
  const InputSize = InputSizes[scale] || InputSizes.md;
  const InputRounded = InputRoundness[rounded] || InputRoundness.md;

  return (
    <div
      className={cn(InputSize, InputRounded, "relative w-full overflow-hidden")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span
        className={cn(
          "absolute top-0 bottom-0 rounded-lg ",
          active ? "bg-ACCENT" : childColor,
          isHovered || (active && laserActiveOnClick) ? "block" : "hidden",
          active ? "w-full  transition-all  duration-200 opacity-50" : "w-24"
        )}
        style={{
          left: `${active ? 0 : childPosition}px`,
        }}
      />

      <div
        className={cn(
          InputRounded,
          "absolute text-sm px-2 inset-[2px] flex items-center justify-center flex-grow border-2 border-ACCENT/50 bg-LIGHT dark:bg-DARK gap-2  outline outline-ACCENT/20",
          reverseIcon && "flex-row-reverse",
          className
        )}
      >
        {icon && <span className={cn("z-10 ACCENT")}>{icon}</span>}
        <input
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          spellCheck="false"
          {...props}
          className="w-full outline-0 bg-transparent"
        />
      </div>
    </div>
  );
};

export default DevLaserInput;
