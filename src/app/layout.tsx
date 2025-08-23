import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@/lib/providers/query-client-provider";
import { mono, sans, serif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "AI Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sans.geist.variable,
          mono.geistMono.variable,
          serif.instrumentSerif.variable,
          "bg-background font-sans text-foreground-light leading-relaxed antialiased",
        )}
      >
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
