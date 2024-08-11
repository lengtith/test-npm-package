import React from "react";
import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "./sabaicode-icon.json";
import { twMerge } from "tailwind-merge";

export type IconName =
  "arrowDown"
  | "arrowUp"
  | "course"
  | "add"
  | "cancel"
  | "class"
  | "coach"
  | "contact"
  | "dashboard"
  | "dropdown"
  | "invoice"
  | "item"
  | "list"
  | "material"
  | "menu"
  | "report"
  | "scholarship"
  | "search"
  | "student"
  | "clock"
  | "document-text"
  | "academic-cap"
  | "arrow-long-left"
  | "chart-bar-square"
  | "clock-1"
  | "drag"
  | "dropdown-1"
  | "filter"
  | "link"
  | "list-bullet"
  | "menu-1"
  | "pencil"
  | "pencil-square"
  | "tick"
  | "trash"
  | "upload"
  | "email"
  | "phone"
  | "arrow-up-tray"
  | "image"
  | "video"
  | "excel"
  | "word"
  | "pdf"
  | "power-point"
  | "logout"
  | "user"
  | "close";

export interface Props extends IconProps {
  icon: IconName | string;
}

const Icon = ({ icon, className, ...props }: Props) => {

  return (
    <IcoMoon
      iconSet={iconSet}
      icon={icon}
      className={twMerge(className)}
      size={props.size || 24}
      {...props}
    />);
};

export default Icon;
