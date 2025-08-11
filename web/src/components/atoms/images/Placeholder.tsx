import Image from "next/image";

interface PlaceholderProps {
  width: number;
  height: number;
  className?:string;
}

export default function Placeholder({ height, width, className }: PlaceholderProps) {
  return (
    <Image
      height={height}
      width={width}
      alt="Placeholder Image"
      src={`https://placehold.co/${width}x${height}.png`}
      className={className}
    />
  );
}
