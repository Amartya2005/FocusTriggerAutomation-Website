import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Use on dark sections so secondary/text variants keep their contrast. */
  onDark?: boolean;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function buttonClasses({ variant = "primary", size = "md", onDark, className }: CommonProps) {
  return [styles.button, styles[variant], styles[size], onDark && styles.onDark, className]
    .filter(Boolean)
    .join(" ");
}

/**
 * Renders a Next.js link for internal paths, a plain anchor for external or
 * `mailto:`/`tel:` links, and a native `<button>` when no `href` is given.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { children, variant, size, onDark, className, href, ...rest } = props;
    const classes = buttonClasses({ children, variant, size, onDark, className });

    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { children, variant, size, onDark, className, type = "button", ...rest } = props;

  return (
    <button type={type} className={buttonClasses({ children, variant, size, onDark, className })} {...rest}>
      {children}
    </button>
  );
}
