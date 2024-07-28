import LanguageCard from "@components/ui/language-card";

const Home = () => {
  return (
    <div>
      <h1 className="mt-8 text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl w-[80%] mx-auto">
        Choose a Programming Language to Explore for Your Next Interview
      </h1>
      <div className="mt-8 grid gap-8 grid-cols-4">
        <LanguageCard />
        <LanguageCard />
        <LanguageCard />
        <LanguageCard />
        <LanguageCard />
      </div>
    </div>
  );
};

export default Home;
