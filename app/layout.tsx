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
                <ModalQuestionProvider>
                  <h1 className="mx-auto mt-8 w-[80%] scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
                    Explore & Share
                    <br />
                    Interview Knowledge and Experience
                  </h1>
                  <div className="mx-auto mt-9 flex w-[700px] gap-3">
                    <Input
                      type="text"
                      placeholder="Search questions by tag or username"
                      className="h-12 px-6"
                    />
                    <Button variant="default" className="h-12 w-28">
                      Search
                    </Button>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <Select>
                      <SelectTrigger className="h-[35px] w-[110px] outline-none focus:ring-0">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="questionAsc">
                          Question ascending
                        </SelectItem>
                        <SelectItem value="questionDesc">
                          Question descending
                        </SelectItem>
                        <SelectItem value="dateAsc">Date ascending</SelectItem>
                        <SelectItem value="dateDesc">
                          Date descending
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {children}
                </ModalQuestionProvider>
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
