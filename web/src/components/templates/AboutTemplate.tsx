"use client";
import GridContainer from "../layouts/containers/GridContainer";
import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";
import AboutMain from "../organisms/pages/about/AboutMain";

export default function AboutTemplate() {
  return (
    <MainContainer>
      <GridContainer>
        <AboutMain />
        <Sidebar />
      </GridContainer>
    </MainContainer>
  );
}
