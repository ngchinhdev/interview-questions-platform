"use client";

import React, { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  useSession,
} from "next-auth/react";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers/index";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const NavHeader = () => {
  const { data: session } = useSession();
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
    <div className="flex items-center justify-between gap-3">
      <ModeToggle />

      <>
        {session?.user && (
          <Button asChild variant="link">
            <Link href="/create-question">Create Question</Link>
          </Button>
        )}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user.image} />
                <AvatarFallback>{session.user.username}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              variant="outline"
            >
              Login
            </Button>
          ))
        )}
      </>
    </div>
  );
};

export default NavHeader;
