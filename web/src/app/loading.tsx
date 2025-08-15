import MainContainer from "@/components/layouts/containers/MainContainer";

export default function Loading() {
  return (
    <MainContainer className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600" />
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </MainContainer>
  );
}