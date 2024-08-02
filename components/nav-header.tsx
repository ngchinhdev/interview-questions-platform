"use client";

import React, { useEffect, useState } from "react";
import {
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";

const NavHeader = () => {
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
  console.log(providers && Object.values(providers));
  return (
    <div className="flex items-center gap-3 justify-between">
      <ModeToggle />
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            variant="outline"
          >
            Login
          </Button>
        ))}
    </div>
  );
};

export default NavHeader;
