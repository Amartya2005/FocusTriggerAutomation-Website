import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./Logo.module.css";

type LogoProps = {
  /** Rendered height in CSS pixels; width follows the artwork's aspect ratio. */
  height: number;
  /** Place the logo on a light tile in the artwork's own background colour (for dark surfaces). */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
};

/** The official FocusTrigger Automation logo, unaltered apart from background removal. */
export function Logo({ height, onDark = false, priority = false, className }: LogoProps) {
  const width = Math.round((site.logo.width / site.logo.height) * height);
  return (
    <span className={[styles.logo, onDark && styles.tile, className].filter(Boolean).join(" ")}>
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={styles.image}
      />
    </span>
  );
}
