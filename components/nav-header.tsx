"use client";

import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/ui/customs/toggle-mode";
import { Button } from "@/components/ui/button";
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
import LoginButton from "./ui/customs/login-button";
import { useLocale } from "next-intl";
import { Link } from "@navigation/navigation";

const NavHeader = () => {
  const { data: session } = useSession();
  const locale = useLocale();

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
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton>Login</LoginButton>
        )}
      </>
    </div>
  );
};

export default NavHeader;
