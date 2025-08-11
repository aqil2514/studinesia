import { NavigationWithBackground } from "@/@types/navigation";
import { rubik } from "@/config/fonts";
import Link from "next/link";

interface LabelCardProps {
  labels: NavigationWithBackground[];
}

export default function LabelCard({ labels }: LabelCardProps) {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {labels.map((label, index) => (
        <Link
          key={index + 1}
          href={label.link}
          style={{ backgroundColor: label.backgroundColor }}
          className={`${rubik.className} w-full p-15 text-white text-center font-bold hover:-translate-y-4 hover:opacity-80 duration-400`}
        >
          {label.label}
        </Link>
      ))}
    </div>
  );
}
