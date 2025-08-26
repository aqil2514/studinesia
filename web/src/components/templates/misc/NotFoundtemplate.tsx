"use client";
import GridContainer from "@/components/layouts/containers/GridContainer";
import MainContainer from "@/components/layouts/containers/MainContainer";
import Sidebar from "@/components/layouts/Sidebar";
import NotFoundMain from "@/components/organisms/pages/not-found/NotFoundMain";
import { rubik } from "@/config/fonts";

export default function NotFoundTemplate() {
  return (
    <MainContainer className={`${rubik.className} px-4 py-12`}>
      <GridContainer>
        <NotFoundMain />

        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
