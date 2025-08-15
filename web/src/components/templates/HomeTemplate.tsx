"use client";

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
import useSWR from "swr";
import { getPublishedArticles } from "@/lib/api-client/article.api";
import Loading from "@/app/loading";
import { Article } from "@/@types/article";
import { mapArticleToSummarized } from "@/lib/mapper/article.map";

export default function HomeTemplate() {
  const { data, isLoading } = useSWR("articles", getPublishedArticles);

  if (!data || isLoading) return <Loading />;

  const articles: Article[] = data.articles;
  const summarizedArticles = articles.map(mapArticleToSummarized);
  return (
    <MainContainer className="space-y-4">
      <HeroCard />
      <Separator />
      <LabelCard labels={LabelNavigations} />
      <LabelArticleSection
        articles={summarizedArticles}
        title="Label 1"
        slug="label-1"
      />
      <SearchCard />
      <NewestArticleSection articles={summarizedArticles} />
      <ImageNavigations imageNavigations={dummyNavigationsWithImage} />
    </MainContainer>
  );
}
