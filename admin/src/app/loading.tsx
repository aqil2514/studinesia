import MainContainer from "@/components/layouts/Container/MainContainer";

export default function Loading() {
  return (
    <MainContainer>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted-foreground border-t-transparent" />
        <p className="text-sm text-muted-foreground">Memuat konten...</p>
      </div>
    </MainContainer>
  );
}
