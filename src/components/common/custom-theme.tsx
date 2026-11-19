"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
// Convert HSL → HEX
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

interface ThemeCustomizerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({
  isOpen,
  onOpenChange,
}: ThemeCustomizerProps) {
  const [hue, setHue] = useState(274);
  const [saturation, setSaturation] = useState(66);
  const [lightness, setLightness] = useState(24);

  const DEFAULT_HUE = 274;
  const DEFAULT_SAT = 66;
  const DEFAULT_LIGHT = 24;

  // Generated colors
  const primaryHex = hslToHex(hue, saturation, lightness);
  const secondaryHex = hslToHex(
    hue,
    Math.max(0, saturation - 30),
    Math.min(100, lightness + 20),
  );
  const accentHex = hslToHex((hue + 30) % 360, saturation, lightness);

  // Apply theme to CSS variables
  const applyThemeToCSSVariables = (
    primary: string,
    secondary: string,
    accent: string,
  ) => {
    const root = document.documentElement;

    // Always apply these -- even in light mode
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--secondary", secondary);
    root.style.setProperty("--accent", accent);

    // Gradient ONLY in dark mode
    if (root.classList.contains("dark")) {
      root.style.setProperty("--background-from", primary);
      root.style.setProperty("--background-via", secondary);
      root.style.setProperty("--background-to", accent);
    } else {
      root.style.removeProperty("--background-from");
      root.style.removeProperty("--background-via");
      root.style.removeProperty("--background-to");
    }
  };

  // Live update when sliders move
  useEffect(() => {
    applyThemeToCSSVariables(primaryHex, secondaryHex, accentHex);
  }, [hue, saturation, lightness]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      try {
        const theme = JSON.parse(saved);

        if (theme?.primary_color) {
          // Convert HEX → HSL (from primary color)
          const { h, s, l } = hexToHsl(theme.primary_color);

          setHue(h);
          setSaturation(s);
          setLightness(l);

          applyThemeToCSSVariables(
            theme.primary_color,
            theme.secondary_color,
            theme.accent_color,
          );
        }
      } catch (error) {
        console.error("Error parsing saved theme:", error);
      }
    } else {
      // No saved theme → apply default slider values
      applyThemeToCSSVariables(primaryHex, secondaryHex, accentHex);
    }
  }, []);

  // SAVE theme to API + LocalStorage
  const handleApply = async () => {
    const payload = {
      primary_color: primaryHex,
      secondary_color: secondaryHex,
      accent_color: accentHex,
    };

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const res = await fetch(`${BASE_URL}/user/theme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error("Failed to save theme");
        return;
      }
      toast.success("Theme saved");
      const updatedTheme = await getUserTheme();
      if (updatedTheme) {
        localStorage.setItem("theme", JSON.stringify(updatedTheme));
      }

      onOpenChange(false);
    } catch (err) {
      toast.error("Could not save theme");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("theme");
    setHue(DEFAULT_HUE);
    setSaturation(DEFAULT_SAT);
    setLightness(DEFAULT_LIGHT);
    const defaultPrimary = hslToHex(DEFAULT_HUE, DEFAULT_SAT, DEFAULT_LIGHT);
    const defaultSecondary = hslToHex(
      DEFAULT_HUE,
      Math.max(0, DEFAULT_SAT - 30),
      Math.min(100, DEFAULT_LIGHT + 20),
    );
    const defaultAccent = hslToHex(
      (DEFAULT_HUE + 30) % 360,
      DEFAULT_SAT,
      DEFAULT_LIGHT,
    );

    // Apply real default theme
    applyThemeToCSSVariables(defaultPrimary, defaultSecondary, defaultAccent);
    onOpenChange(false);
    toast.success("Theme reset");
  };

  const getUserTheme = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const res = await fetch(`${BASE_URL}/user/theme`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch theme");
      }

      const data = await res.json();
      localStorage.setItem("theme", JSON.stringify(data));

      return data;
    } catch (error) {
      toast.error("GET USER THEME ERROR");
      return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-4 bg-card border border-border">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-4">
          <div>
            <Label>Hue</Label>
            <Slider
              value={[hue]}
              max={360}
              onValueChange={(v) => {
                const value = Array.isArray(v) ? v[0] : v;
                setHue(value);
              }}
              trackClassName="hue-slider-track"
              thumbClassName="custom-thumb"
            />
            <p className="text-xs">{hue}°</p>
          </div>

          <div>
            <Label>Saturation</Label>
            <Slider
              value={[saturation]}
              max={100}
              onValueChange={(v) => {
                const value = Array.isArray(v) ? v[0] : v;
                setSaturation(value);
              }}
              trackClassName="dark-slider-track"
              thumbClassName="custom-thumb"
            />

            <p className="text-xs">{saturation}%</p>
          </div>

          <div>
            <Label>Lightness</Label>
            <Slider
              value={[lightness]}
              min={20}
              max={80}
              onValueChange={(v) => {
                const value = Array.isArray(v) ? v[0] : v;
                setLightness(value);
              }}
              trackClassName="dark-slider-track"
              thumbClassName="custom-thumb"
            />
            <p className="text-xs">{lightness}%</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Primary */}
          <div className="flex-1">
            <div
              className="h-20 rounded-md border"
              style={{ backgroundColor: primaryHex }}
            />
            <p className="text-xs text-center mt-1">{primaryHex}</p>
          </div>

          {/* Secondary */}
          <div className="flex-1">
            <div
              className="h-20 rounded-md border"
              style={{ backgroundColor: secondaryHex }}
            />
            <p className="text-xs text-center mt-1">{secondaryHex}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            className="border-b-gray-500/70 flex-1 text-black bg-gray-200"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="flex-1 text-light"
            style={{ backgroundColor: primaryHex }}
            onClick={handleApply}
          >
            Save Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
