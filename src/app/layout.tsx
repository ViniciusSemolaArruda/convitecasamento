import type {
  Metadata,
  Viewport,
} from "next";

import WeddingMusic from "@/components/WeddingMusic/WeddingMusic";

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Mylena e Nerivaldo | Nosso Casamento",

  description:
    "Você está convidado para celebrar conosco este momento especial.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eee8df",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <WeddingMusic />

        {children}
      </body>
    </html>
  );
}