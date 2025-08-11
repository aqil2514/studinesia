"use client";

import { dummyArticleSummaries } from "@/mocks/articles";
import MainContainer from "../layouts/containers/MainContainer";
import HeroCard from "../molecules/cards/HeroCard";
import LabelCard from "../molecules/navigations/LabelNavigation";
import { LabelNavigations } from "../../mocks/LabelNavigations";
import { Separator } from "../ui/separator";
import SearchCard from "../molecules/cards/SearchCard";
import LabelArticleSection from "../organisms/section/LabelArticleSection";
import NewestArticleSection from "../organisms/section/NewestArticleSection";
import ImageNavigations from "../molecules/navigations/ImageNavigations";
import { dummyNavigationsWithImage } from "@/mocks/labelWithImage";

export default function HomeTemplate() {
  return (
    <MainContainer className="space-y-4">
      <HeroCard />
      <Separator />
      <LabelCard labels={LabelNavigations} />
      <LabelArticleSection
        articles={dummyArticleSummaries}
        title="Label 1"
        slug="label-1"
      />
      <SearchCard />
      <NewestArticleSection articles={dummyArticleSummaries} />
      <ImageNavigations imageNavigations={dummyNavigationsWithImage} />
    </MainContainer>
  );
}
