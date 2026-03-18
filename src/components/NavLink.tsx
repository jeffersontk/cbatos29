"use client";

import { forwardRef } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
};

const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, activeClassName, exact = false, href, children, ...rest }, ref) => {
    const pathname = usePathname();
    const isActive =
      typeof href === "string"
        ? exact
          ? pathname === href
          : pathname === href || pathname?.startsWith(`${href}/`)
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
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
