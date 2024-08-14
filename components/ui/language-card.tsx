import Image from "next/image";
import React from "react";

const LanguageCard = () => {
  return (
    <div className="relative aspect-square rounded-lg border bg-background/95 p-5">
      <Image
        src="https://dabeng.github.io/img/reactjs.png"
        alt="km"
        className="relative z-20 h-full w-full"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
      <span className="absolute bottom-0 right-0 px-3 py-2 text-base opacity-80">
        20 questions
      </span>
    </div>
  );
};

export default LanguageCard;
