"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Settings, ListTodo } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import packageInfo from '../package.json';

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ToDo Peregrinno <Badge variant="outline">v{packageInfo.version}</Badge></h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas tarefas de forma simples e eficiente
        </p>
        <div className="flex mt-4 space-x-2">
          <Link href="/" className={pathname === "/" ? "pointer-events-none" : ""}>
            <Button variant={pathname === "/" ? "default" : "outline"} size="sm">
              <ListTodo className="h-4 w-4 mr-2" />
              Tarefas
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant={pathname === "/settings" ? "default" : "outline"} size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </header>
  );
}