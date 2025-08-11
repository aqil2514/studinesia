import { NavigationWithImage } from "@/@types/navigation";
import Divider from "@/components/atoms/divider/Divider";
import { rubik } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imageNavigations: NavigationWithImage[];
}

export default function ImageNavigations({ imageNavigations }: Props) {
  return (
    <div className="w-full space-y-6 px-4">
      {/* Header Section */}
      <div className="text-center">
        <h3 className={`${rubik.className} text-3xl font-semibold text-gray-700`}>
          Finansial
        </h3>
        <Divider className="border-2 border-orange-400 w-1/6 mx-auto" />
      </div>

      {/* Image Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imageNavigations.map((image, index) => (
          <Link
            key={index}
            href={image.link}
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <figure className="relative">
              <Image
                width={380}
                height={250}
                alt={`${image.subTitleLabel} image`}
                src={image.imageUrl}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Caption */}
              <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className={`${rubik.className} text-lg font-semibold`}>
                  {image.label}
                </p>
                {image.subTitleLabel && (
                  <p className="text-sm text-gray-300">{image.subTitleLabel}</p>
                )}
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}
