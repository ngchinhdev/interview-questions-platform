import "@/styles/global.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { ThemeProvider } from "@/components/ui/theme-provider";
import ContentWrapper from "@components/ui/content-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModalQuestionProvider from "@components/providers/modal-question-provider";
import Footer from "@components/footer";
import { ReactQueryProvider } from "@components/providers/react-query-provider";
import Header from "@components/header";
import SSProvider from "@components/providers/session-provider";

export const metadata: Metadata = {
  title: "Interview Questions Platform",
  description: "This is layout of Interview Questions Platform",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SSProvider>
            <ReactQueryProvider>
              <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <ContentWrapper>
                  <Header />
                </ContentWrapper>
              </div>
              <ContentWrapper>
                {" "}
                {children}
                <Footer />
              </ContentWrapper>
            </ReactQueryProvider>
          </SSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
