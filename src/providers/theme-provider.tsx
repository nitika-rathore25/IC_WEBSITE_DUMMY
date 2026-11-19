"use client"
import * as React from "react"

type Theme = "dark" | "light"
type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}
const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "Talknact-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => ((typeof window !== "undefined" && localStorage.getItem(storageKey)) as Theme) || defaultTheme,
  )

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    // 🔥 Reapply saved user theme colors ON EACH THEME SWITCH
    const saved = localStorage.getItem("user_theme")
    if (saved) {
      const userTheme = JSON.parse(saved)
      root.style.setProperty("--primary", userTheme.primary_color)
      root.style.setProperty("--secondary", userTheme.secondary_color)
      root.style.setProperty("--accent", userTheme.accent_color)

      if (theme === "dark") {
        root.style.setProperty("--background-from", userTheme.primary_color)
        root.style.setProperty("--background-via", userTheme.secondary_color)
        root.style.setProperty("--background-to", userTheme.accent_color)
      } else {
        root.style.removeProperty("--background-from")
        root.style.removeProperty("--background-via")
        root.style.removeProperty("--background-to")
      }
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
