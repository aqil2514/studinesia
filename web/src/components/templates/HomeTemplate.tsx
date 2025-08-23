"use client";

import MainContainer from "../layouts/containers/MainContainer";
import HeroCard from "../molecules/cards/HeroCard";
import { Separator } from "../ui/separator";
import SearchCard from "../molecules/cards/SearchCard";
import NewestArticleSection from "../organisms/section/NewestArticleSection";
import ImageNavigations from "../molecules/navigations/ImageNavigations";
import CategoryNavigation from "../molecules/navigations/CategoryNavigation";
import CategoryArticleSection from "../organisms/section/CategoryArticleSection";

export default function HomeTemplate() {
  return (
    <MainContainer className="space-y-4">
      <HeroCard />
      <Separator />

      <CategoryNavigation />
      <CategoryArticleSection category_id="3"  />

      <SearchCard />
      <NewestArticleSection />
      
      <ImageNavigations />
    </MainContainer>
  );
}
