import Loading from "@/app/loading";
import Divider from "@/components/atoms/divider/Divider";
import { rubik } from "@/config/fonts";
import { getCategory } from "@/lib/api-client/category.api";
import { mapCategoryToNavigationWithImage } from "@/lib/mapper/category.map";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function ImageNavigations() {
  const { data, isLoading } = useSWR("category", () =>
    getCategory({ limit: 6 })
  );

  if (!data || isLoading) return <Loading />;

  const images = data.map(mapCategoryToNavigationWithImage);

  return (
    <div className="w-full space-y-6 px-4">
      {/* Header Section */}
      <div className="text-center">
        <h3
          className={`${rubik.className} text-3xl font-semibold text-gray-700`}
        >
          Kategori
        </h3>
        <Divider className="border-2 border-orange-400 w-1/6 mx-auto" />
      </div>

      {/* Image Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.slice(0, 4).map((image, index) => (
          <Link
            key={index}
            href={`/category/${image.link}`}
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <figure className="relative aspect-[16/10] w-full">
              <Image
                fill
                alt={`${image.subTitleLabel} image`}
                src={image.imageUrl}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
