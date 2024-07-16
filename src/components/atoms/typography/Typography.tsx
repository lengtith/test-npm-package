import React from "react";
import { twMerge } from "tailwind-merge";

export interface TypographyProps {
  fontSize?:
  | "base"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
  className?: string;
  as?:
  "p"
  | "span"
  | "b"
  | "i"
  | "u"
  | "abbr"
  | "cite"
  | "del"
  | "em"
  | "ins"
  | "mark"
  | "s"
  | "samp"
  | "sub"
  | "sup";
  textAlign?: "left" | "right" | "center" | "justify";
  variant?: "primary" | "title" | "link";
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  [key: string]: any; // Allow any other props
}

const Typography: React.FC<TypographyProps> = ({
  fontSize = "md",
  className = "",
  as: Component = "p",
  textAlign = "left",
  variant = "primary",
  href,
  children,
  onClick,
  ...props
}) => {
  const fontSizeClass = `text-${fontSize}`;
  const textAlignClass = `text-${textAlign}`;

  const variantClassMap = {
    primary: 'text-gray-500',
    link: 'text-blue-500 hover:text-blue-400 underline underline-offset-2 cursor-pointer',
    title: 'text-black font-semibold',
  };

  const variantClass = variantClassMap[variant];

  const combinedClasses = twMerge(
    fontSizeClass,
    textAlignClass,
    variantClass,
    className
  );

  return (
    <Component onClick={onClick} className={combinedClasses} {...props}>
      {variant === "link" && href ? (
        <a target="_blank" href={href} rel="noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </Component>
  );
};

export default Typography;
