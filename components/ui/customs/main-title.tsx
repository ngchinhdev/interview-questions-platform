"use client";

import { useTranslations } from "next-intl";

const MainTitle = () => {
  const t = useTranslations("homePage");

  return (
    <h1 className="mx-auto mt-8 w-[80%] scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
      {t("mainTitleAbove")}
      <br />
      {t("mainTitleUnder")}
    </h1>
  );
};

export default MainTitle;
