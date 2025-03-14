import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

interface Props {
  banners:
    | {
        id: string;
        createdAt: Date;
        title: string;
        imageString: string;
      }[]
    | {
        error: string;
      };
}
const Slider = ({ banners }: Props) => {
  return (
    <Carousel>
      <CarouselContent>
        {Array.isArray(banners) ? (
          banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[60vh] lg:h-[80vh]">
                <img
                  src={banner.imageString}
                  alt={banner.title}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error: {banners.error || "Failed to load banners."}
            </p>
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious className="-mr-3" />
      <CarouselNext className="-mr-3" />
    </Carousel>
  );
};

export default Slider;
