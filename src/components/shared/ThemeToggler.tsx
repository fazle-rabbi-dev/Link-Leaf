"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <span className="opacity-0" />

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="outline"
    >
      {isDarkMode ? <Sun /> : <Moon />}
      <span>{isDarkMode ? "Light" : "Dark"}</span>
    </Button>
  )
}

export default ThemeToggler
