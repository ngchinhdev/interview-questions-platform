import "@/styles/global.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/ui/theme-provider";
import ContentWrapper from "@components/ui/customs/content-wrapper";

import Footer from "@components/footer";
import { ReactQueryProvider } from "@components/providers/react-query-provider";
import Header from "@components/header";
import SSProvider from "@components/providers/session-provider";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Interview Questions Platform",
  description: "This is layout of Interview Questions Platform",
};

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: string;
  };
}) => {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className="!pointer-events-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SSProvider>
              <ReactQueryProvider>
                <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <ContentWrapper>
                    <Header />
                  </ContentWrapper>
                </div>
                <ContentWrapper>
                  {children}
                  <Footer />
                </ContentWrapper>
              </ReactQueryProvider>
            </SSProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
