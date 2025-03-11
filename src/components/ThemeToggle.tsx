"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [iconTheme, setIconTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setIconTheme(resolvedTheme as "dark" | "light"); // 🔹 Устанавливаем начальную тему
    }
  }, [resolvedTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const newTheme = iconTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setIconTheme(newTheme); // 🔹 Обновляем иконку мгновенно
      }}
      aria-label="Toggle theme"
    >
      {iconTheme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}
