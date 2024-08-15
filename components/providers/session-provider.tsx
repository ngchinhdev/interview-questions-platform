"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ISSProvider {
  children: ReactNode;
  session?: Session;
}

const SSProvider = ({ children, session }: ISSProvider) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default SSProvider;
