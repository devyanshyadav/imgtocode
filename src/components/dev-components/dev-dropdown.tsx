"use client";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DropDownProps = {
  children: React.ReactNode;
  button: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  contentProps?: Omit<
    React.ComponentProps<typeof DropdownMenu.Content>,
    "side"
  >;
} & Omit<React.ComponentProps<typeof DropdownMenu.Root>, "children">;

const DevDropdown = ({
  children,
  button,
  position = "bottom",
  contentProps,
  ...props
}: DropDownProps) => {
  return (
    <DropdownMenu.Root modal={false} {...props}>
      <DropdownMenu.Trigger className="outline-0" asChild>
        {button}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          {...contentProps}
          sideOffset={3}
          side={position}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          className={`bg-LIGHT origin-[var(--radix-dropdown-menu-content-transform-origin)] z-50 showDropDown dark:bg-DARK rounded-lg border-ACCENT/30 border p-1 ${contentProps?.className}`}
        >
          {/* Remove DropdownMenu.Item wrapper to allow custom click handling */}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DevDropdown;