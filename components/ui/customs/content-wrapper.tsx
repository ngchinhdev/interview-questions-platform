import React, { ReactNode } from "react";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-screen-xl mx-auto px-10">{children}</div>;
};

export default ContentWrapper;
