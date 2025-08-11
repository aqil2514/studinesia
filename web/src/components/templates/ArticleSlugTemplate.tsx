import MainContainer from "../layouts/containers/MainContainer";
import Sidebar from "../layouts/Sidebar";

export default function ArticleSlugTemplate(){
    return(
        <MainContainer className="grid grid-cols-1 md:grid-cols-[75%_auto] gap-4 pt-4 px-4">
            <main>
                Artikel
            </main>

            <Sidebar />
        </MainContainer>
    )
}