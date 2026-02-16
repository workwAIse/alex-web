import type { Metadata } from "next";
import { Archivo, Caveat, Geist, Geist_Mono, Lora, Montserrat, Oswald, Poppins, Roboto } from "next/font/google";
import SectionCursorLoader from "@/components/SectionCursorLoader";
import FluidMenuNav from "@/components/FluidMenuNav";
import MobileWarning from "@/components/MobileWarning";
import "@fontsource-variable/climate-crisis/year.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${montserrat.variable} ${lora.variable} ${roboto.variable} ${caveat.variable} ${oswald.variable} ${archivo.variable} font-sans antialiased`}
      >
        {children}
        <SectionCursorLoader />
        <FluidMenuNav />
        <MobileWarning />
      </body>
    </html>
  );
}
