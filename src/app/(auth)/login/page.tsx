"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, Sparkles, Sun, Moon } from "lucide-react"
import { loginUser, persistAuthData } from "./api"
import { useTheme } from "@/providers/theme-provider"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { ok, data } = await loginUser(username, password)

      if (ok) {
        persistAuthData(data)
        router.push("/dashboard")
      } else {
        setError(data?.detail || data?.message || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#764899] via-[#431566] to-[#764899] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl p-4">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-[#431566] to-[#661560] rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-light" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Talknact</CardTitle>
          <CardDescription className="text-gray-300">Sign in to access your project dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-600" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/10 py-2 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-600" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 py-2 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                  required
                />
              </div>
            </div>
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-linear-to-r min-h-10 from-[#431566] to-[#661560] text-light font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}