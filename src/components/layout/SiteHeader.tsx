"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { headerCta, isActivePath, primaryNav, site, type NavItem } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import styles from "./SiteHeader.module.css";

const DESKTOP_QUERY = "(min-width: 768px)";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuId = useId();

  // Close every menu after navigation (covers link clicks and back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenSubmenu(null);
  }

  // The mobile panel is irrelevant at desktop widths; close it if the viewport grows.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // While the mobile panel is open: lock page scroll and let Escape close it
  // wherever focus is (the Menu button or a link inside the panel).
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  // Close an open desktop submenu when the user clicks elsewhere.
  useEffect(() => {
    if (!openSubmenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenSubmenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openSubmenu]);

  function handleMobileBlur(event: FocusEvent<HTMLDivElement>) {
    // Close when keyboard focus leaves the header entirely (e.g. tabbing past the last link).
    const next = event.relatedTarget as Node | null;
    if (next && !headerRef.current?.contains(next)) setMobileOpen(false);
  }

  return (
    <header ref={headerRef} className={styles.header}>
      <Container className={styles.bar}>
        <Link href="/" className={styles.wordmark} aria-label={`${site.logo.alt} — home`}>
          <Logo height={44} priority className={styles.logo} />
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul role="list" className={styles.navList}>
            {primaryNav.map((item) =>
              item.children ? (
                <DesktopSubmenu
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  open={openSubmenu === item.href}
                  onOpenChange={(open) => setOpenSubmenu(open ? item.href : null)}
                />
              ) : (
                <li key={item.href}>
                  <NavAnchor item={item} pathname={pathname} className={styles.navLink} />
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={headerCta.href} className={styles.cta} aria-current={pathname === headerCta.href ? "page" : undefined}>
            {headerCta.label}
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <MenuIcon open={mobileOpen} />
            <span>Menu</span>
          </button>
        </div>
      </Container>

      <div
        id={mobileMenuId}
        className={styles.mobilePanel}
        hidden={!mobileOpen}
        onBlur={handleMobileBlur}
      >
        <Container>
          <nav aria-label="Main menu">
            <ul role="list" className={styles.mobileList}>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavAnchor item={item} pathname={pathname} className={styles.mobileLink} />
                  {item.children && (
                    <ul role="list" className={styles.mobileSubList}>
                      {item.children
                        .filter((child) => child.href !== item.href)
                        .map((child) => (
                          <li key={child.href}>
                            <NavAnchor item={child} pathname={pathname} className={styles.mobileSubLink} />
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Button href={headerCta.href} size="lg" className={styles.mobileCta}>
              {headerCta.label}
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}

type NavAnchorProps = {
  item: { label: string; href: string };
  pathname: string;
  className: string;
};

function NavAnchor({ item, pathname, className }: NavAnchorProps) {
  return (
    <Link
      href={item.href}
      className={className}
      aria-current={pathname === item.href ? "page" : undefined}
      data-active={isActivePath(pathname, item.href) || undefined}
    >
      {item.label}
    </Link>
  );
}

type DesktopSubmenuProps = {
  item: NavItem;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Disclosure-style submenu: the top-level label stays a real link, and a
 * separate toggle button reveals the child links (click, tap or keyboard).
 */
function DesktopSubmenu({ item, pathname, open, onOpenChange }: DesktopSubmenuProps) {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const submenuId = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      onOpenChange(false);
      toggleRef.current?.focus();
    }
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) onOpenChange(false);
  }

  return (
    <li className={styles.submenuItem} onKeyDown={handleKeyDown} onBlur={handleBlur}>
      <NavAnchor item={item} pathname={pathname} className={styles.navLink} />
      <button
        ref={toggleRef}
        type="button"
        className={styles.submenuToggle}
        aria-expanded={open}
        aria-controls={submenuId}
        onClick={() => onOpenChange(!open)}
      >
        <span className="visually-hidden">{`${item.label} submenu`}</span>
        <ChevronIcon />
      </button>
      <div id={submenuId} className={styles.submenu} hidden={!open}>
        <ul role="list" className={styles.submenuList}>
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={styles.submenuLink}
                aria-current={pathname === child.href ? "page" : undefined}
                onClick={() => onOpenChange(false)}
              >
                <span className={styles.submenuLabel}>{child.label}</span>
                {child.description && <span className={styles.submenuDescription}>{child.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none">
      {open ? (
        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      ) : (
        <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      )}
    </svg>
  );
}
