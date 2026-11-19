"use client";

import { Button } from "@/components/ui/button";
import {
  LogOut,
  Sun,
  Moon,
  Palette,
  User,
  Settings,
  CreditCard,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeCustomizer } from "./custom-theme";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type Organization = {
  subscription: number;
};

export interface BreadcrumbCrumb {
  label: string;
  onClick?: () => void;
}

interface HeaderProps {
  breadcrumb?: BreadcrumbCrumb[];
  showBackButton?: boolean;
  backLabel?: string;
  onBack?: () => void;
}

export default function Header({

  breadcrumb,
  showBackButton = false,
  backLabel = "Back",
  onBack,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const router = useRouter();
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [initials, setInitials] = useState("");
  const [role, setRole] = useState<string>("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decoded = JSON.parse(jsonPayload);
      setRole(decoded.role);
      setUsername(decoded.sub);

      const name = decoded.sub.toUpperCase();
      const init = name
        .split(" ")
        .map((n: string) => n[0])
        .join("");
      setInitials(init);
    } catch (err) {}
  }, []);

  const fetchAllOrganizations = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(`${BASE_URL}/organisations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load organizations");
      }

      const mappedOrganizations = data.map((org: any) => ({
        subscription: org.credits || 0,
      }));
      setOrganizations(mappedOrganizations);
    } catch (err) {
    } finally {
    }
  };

  const truncateText = (text: string, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleBack = () => {
    if (onBack) return onBack();
    router.push("/dashboard");
  };
    
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("theme");
    router.push("/");
  };

  return (
    <>
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Left: logo + title, breadcrumb is conditional */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-r from-primary to-accent border border-gray-300/40 rounded-lg flex items-center justify-center">
                <span className="text-light font-bold text-sm">T</span>
              </div>
              <div className="flex items-center">
                <h1 className="text-lg font-bold text-white">Talknact</h1>

                {breadcrumb && breadcrumb.length > 0 && (
                  <>
                    <span className="mx-2 text-gray-300">|</span>
                    <div className="flex items-center space-x-2">
                      {breadcrumb.map((crumb, i) => {
                        const isLast = i === breadcrumb.length - 1;
                        return (
                          <div key={i} className="flex items-center space-x-2">
                            {isLast ? (
                              <h2 className="text-lg font-semibold text-white">
                                {crumb.label}
                              </h2>
                            ) : (
                              <>
                                <button
                                  onClick={crumb.onClick}
                                  className="flex items-center space-x-1 dark:text-gray-100 dark:hover:text-gray-200 transition-colors text-sm"
                                >
                                  <span>{crumb.label}</span>
                                </button>
                                <ChevronRight className="h-4 w-4 text-gray-300" />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: actions - shared, with optional back button */}
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  size="sm"
                  className="dark:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {backLabel}
                </Button>
              )}

              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="bg-white/10 border-gray-300/40 text-white hover:bg-white/20 hover:border-gray-300/40"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {(role === "superadmin" || role === "org_owner") && (
                <Button
                  onClick={() => setIsThemeOpen(true)}
                  variant="default"
                  size="sm"
                  className="bg-linear-to-r from-primary to-accent text-light border border-gray-300/40"
                >
                  <Palette className="h-4 w-4 mr-1" />
                  Customize Theme
                </Button>
              )}

              <DropdownMenu
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
              >
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="default"
                      size="sm"
                      title="User Settings"
                      className="bg-linear-to-r from-primary to-accent text-light border border-gray-300/40"
                    />
                  }
                >
                  <Settings className="h-4 w-4 mr-1" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-linear-to-r from-primary to-accent text-light"
                >
                  {role !== "superadmin" && (
                    <DropdownMenuItem
                      onClick={() => {
                        setIsCreditsOpen(true);
                        fetchAllOrganizations();
                      }}
                      className="hover:bg-gray-200/90 cursor-pointer hover:text-gray-600"
                    >
                      <CreditCard className="h-4 w-4" />
                      Credits
                    </DropdownMenuItem>
                  )}

                  {role !== "platform_user" && (
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/user");
                      }}
                      className="hover:bg-gray-200/90 cursor-pointer hover:text-gray-600"
                    >
                      <User className="h-4 w-4" />
                      User Management
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu
                open={isAccountOpen}
                onOpenChange={setIsAccountOpen}
              >
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="default"
                      size="sm"
                      title="Account"
                      className="bg-linear-to-r from-primary to-accent text-light border border-gray-300/40 flex items-center justify-center"
                    />
                  }
                >
                  <span className="font-bold text-sm">{initials}</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44 bg-linear-to-r from-primary to-accent text-light"
                >
                  <div
                    className="px-3 py-2 text-sm font-semibold"
                    title={username}
                  >
                    {truncateText(username, 15)}
                  </div>

                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout();
                    }}
                    className="cursor-pointer text-light hover:bg-gray-300/60"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <ThemeCustomizer isOpen={isThemeOpen} onOpenChange={setIsThemeOpen} />

      <Dialog open={isCreditsOpen} onOpenChange={setIsCreditsOpen}>
        <DialogContent className="p-4 dark:bg-linear-to-r from-primary to-accent text-white border border-gray-300/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Credits
            </DialogTitle>
          </DialogHeader>
          <div className="p-2 justify-center text-center">
            <span className="font-bold text-gray-400">
              Remaining Credits: $
              {Number(organizations[0]?.subscription ?? 0).toFixed(2)}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}