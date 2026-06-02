"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useStore, type UserRole } from "@/lib/store";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, GraduationCap, ShieldCheck, LogOut, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const hydrate = useStore((s) => s.hydrate);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    hydrate();
  }, [hydrate]);
  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const navLinks: { label: string; href: string; roles?: UserRole[] }[] = [
    { label: "Programs", href: "/programs" },
    ...(user
      ? user.role === "ADMIN"
        ? [
            { label: "Admin", href: "/admin", roles: ["ADMIN"] as UserRole[] },
            { label: "Emails", href: "/admin/emails", roles: ["ADMIN"] as UserRole[] },
          ]
        : [
            { label: "Dashboard", href: "/dashboard", roles: ["STUDENT"] as UserRole[] },
          ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <GraduationCap className="h-6 w-6 text-brand" />
          <span>Harbour.Space</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks
            .filter((l) => !l.roles || (user && l.roles.includes(user.role)))
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  pathname === l.href ? "text-brand" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline">{user.firstName}</span>
                {user.role === "ADMIN" && (
                  <ShieldCheck className="h-4 w-4 text-brand" />
                )}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="inline-flex h-9 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
