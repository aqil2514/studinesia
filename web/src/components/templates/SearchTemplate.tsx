"use client";
import { ArticleSummary } from "@/@types/article";
import MainContainer from "../layouts/containers/MainContainer";
import { rubik } from "@/config/fonts";
import SearchHeader from "../organisms/search/SearchHeader";
import SearchBody from "../organisms/search/SearchBody";
import GridContainer from "../layouts/containers/GridContainer";
import Sidebar from "../layouts/Sidebar";

interface Props {
  articles: ArticleSummary[];
  query: string;
}

export default function SearchTemplate({ articles, query }: Props) {
  return (
    <MainContainer className={`${rubik.className} px-4 py-12`}>
      <GridContainer>
        <div>
          <SearchHeader query={query} />

          <SearchBody articles={articles} query={query} />
        </div>

        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
