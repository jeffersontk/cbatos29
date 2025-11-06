"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // mantido por compatibilidade (não se aplica ao Next)
};

const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, activeClassName, pendingClassName: _ignored, href, children, ...rest }, ref) => {
    const pathname = usePathname();
    const isActive =
      typeof href === "string"
        ? pathname === href || pathname?.startsWith(String(href))
        : pathname === href.pathname;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        aria-current={isActive ? "page" : undefined}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";
export { NavLink };
