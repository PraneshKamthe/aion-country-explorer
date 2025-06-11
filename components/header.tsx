"use client";

import { useAuthStore } from "@/store/auth";
import { useFavoritesStore } from "@/store/favorites";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, LogOut, User, Globe, Cloud } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { favorites } = useFavoritesStore();
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AION Country Explorer</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-1"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Favorites</span>
                    {favorites.length > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </Button>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.username}</span>
                </div>

                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
