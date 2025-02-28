import type { Metadata } from "next";
import "./globals.css";
import { Righteous } from "next/font/google";
import NavigationBar from "@/components/NavigationBar";
import getServerSession from "next-auth";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import * as motion from "motion/react-client";


const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmoquiz",
  description: "Challenge your space knowledge!",
  icons: "/svg.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const session = await getServerSession();
  const session = await auth();
  console.log("session from LAYOUT :>> ", session);

  console.log("RootLayout :>> ");
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              zIndex: -1, // Puts the video behind content
            }}
          >
            <source src="/video2.mp4" type="video/mp4" />
          </video>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <motion.h1
                initial={{ textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} // No glow initially
                animate={{
                  textShadow: "0px 0px 12px rgba(255, 255, 255, 0.6)",
                }} // Softer glow
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className={`homeTitle ${righteous.className}`}
              >
                Cosmoquiz
              </motion.h1>
            </Link>
            <NavigationBar sessionProp={session} />
            {children}
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
