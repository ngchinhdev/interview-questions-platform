import { Link } from "lucide-react";
import React from "react";
import NavHeader from "./nav-header";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-2">
      <Link href="/">
        {/* <Image src={logo} alt="Logo" width={100} height={50} /> */}
        Logo
      </Link>
      <NavHeader />
    </header>
  );
};

export default Header;
