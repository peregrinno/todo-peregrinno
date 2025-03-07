import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "@/context/task-context";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo Peregrinno",
  description: "Gerenciador de tarefas com armazenamento local",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <TaskProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
