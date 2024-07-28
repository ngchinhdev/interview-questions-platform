import Image from "next/image";
import React from "react";

const LanguageCard = () => {
  return (
    <div className="bg-background/95 border relative aspect-square rounded-lg p-5">
      <Image
        src="https://dabeng.github.io/img/reactjs.png"
        alt="km"
        className="w-full h-full z-20 relative"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
      <span className="absolute bottom-0 right-0 py-2 px-3 opacity-80 text-base">
        20 questions
      </span>
    </div>
  );
};

export default LanguageCard;
