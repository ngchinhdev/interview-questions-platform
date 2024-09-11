"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "../button";

const LoginButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setDataProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setDataProviders();
  }, []);

  return (
    providers &&
    Object.values(providers).map((provider) => (
      <Button
        key={provider.name}
        onClick={() => signIn(provider.id)}
        variant="outline"
        className={className}
      >
        {children}
      </Button>
    ))
  );
};

export default LoginButton;
