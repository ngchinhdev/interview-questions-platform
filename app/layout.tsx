import "@/styles/global.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import Image from "next/image";

import { ThemeProvider } from "@/components/ui/theme-provider";
import logo from "@/public/images/logo.png";
import ContentWrapper from "@components/ui/content-wrapper";
import Link from "next/link";
import NavHeader from "@components/nav-header";

export const metadata: Metadata = {
  title: "Interview Questions Platform",
  description: "This is layout of Interview Questions Platform",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <ContentWrapper>
              <header className="flex items-center py-2 justify-between">
                <Link href="/">
                  {/* <Image src={logo} alt="Logo" width={100} height={50} /> */}
                  Logo
                </Link>
                <NavHeader />
              </header>
            </ContentWrapper>
          </div>
          <ContentWrapper>{children}</ContentWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
