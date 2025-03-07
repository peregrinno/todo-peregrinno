import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "@/context/task-context";
import { CategoryProvider } from "@/context/category-context";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    <html lang="pt-BR" className={geistSans.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <CategoryProvider>
              <div className="container mx-auto py-6 px-4">
                <Navigation />
                <main>
                  {children}
                </main>
              </div>
              <Toaster richColors position="bottom-right" />
            </CategoryProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}