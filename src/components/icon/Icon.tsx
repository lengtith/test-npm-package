import React from "react";
import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "./sabaicode-icon.json";
import { twMerge } from "tailwind-merge";

interface Props extends IconProps {
  icon: string;
}

const Icon = ({ icon, className, size = "size-5", ...props }: Props) => {
  const finalClassName = twMerge(` ${size}`, className);

  return (
    <IcoMoon
      iconSet={iconSet}
      icon={icon}
      className={finalClassName}
      {...props}
    />);
};

export default Icon;
