"use client";

import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/ui/customs/toggle-mode";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LoginButton from "./ui/customs/login-button";
import { Link } from "@navigation/navigation";

const NavHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between gap-3">
      <ModeToggle />

      <>
        {session?.user && (
          <Button asChild variant="link">
            <Link href="/form/create">Tạo câu hỏi mới</Link>
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
              <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton>Đăng nhập</LoginButton>
        )}
      </>
    </div>
  );
};

export default NavHeader;
