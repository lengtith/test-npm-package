import React, { ReactNode } from "react";

export type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

type TableCellProps = TableCellBaseProps & {
  align?: "inherit" | "left" | "right" | "center" | "justify";
  children?: ReactNode;
  className?: string;
  scope?: string;
  variant?: "head" | "subhead" | "body" | "footer";
};

const TableCell: React.FC<TableCellProps> = ({
  align = "inherit",
  children,
  className,
  scope,
  variant = "body",
  ...props
}) => {
  const variantClasses =
    variant === "head"
      ? "font-bold"
      : variant === "subhead"
      ? "font-medium"
      : variant === "footer"
      ? "text-sm"
      : "text-base";
  const alignClasses =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : align === "center"
      ? "text-center"
      : align === "justify"
      ? "text-justify"
      : "";
  const combinedClassName = `${
    className ?? ""
  } ${variantClasses} ${alignClasses}`.trim();

  const Component = variant === "head" ? "th" : "td";
  const additionalProps = variant === "head" && scope ? { scope } : {};

  return (
    <Component className={combinedClassName} {...additionalProps} {...props}>
      {children}
    </Component>
  );
};

export { TableCell };
