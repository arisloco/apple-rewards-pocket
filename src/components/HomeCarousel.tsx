
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface HomeCarouselProps {
  items: CarouselItem[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ items }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0 aspect-[16/9] relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-white/80" />
      <CarouselNext className="right-2 bg-white/80" />
    </Carousel>
  );
};

export default HomeCarousel;
