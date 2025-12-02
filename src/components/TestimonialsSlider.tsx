import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import avatarAndrew from "@/assets/avatar-andrew.png";
import slideCodegreen from "@/assets/slide-codegreen.png";
import slideOnePercent from "@/assets/slide-onepercentplanet.png";
import caseIwbi from "@/assets/case-iwbi.jpg";

const testimonials = [
  {
    headline: "Launched a new website in",
    highlight: "25 days",
    quote: '"The Certainly process and range of accessible experts is unbeatable. In less than a month, and for half the price of other quotes -- we launched a beautiful, easy to edit website -- on time. It\'s a great value."',
    name: "Andrew Dimitriou",
    title: "Sr. Director, CodeGreen",
    avatar: avatarAndrew,
    image: slideCodegreen,
  },
  {
    headline: "Automating",
    highlight: "1000s of hours of outreach",
    quote: '"Big shout out to the team at Certainly for the assist on our CRM audit and segmentation issues with our existing customer base. Their work is positioning us for a very effective business development season."',
    name: "Jim Lehnhoff",
    title: "Director of Business Development, 1% for the Planet",
    avatar: null,
    image: slideOnePercent,
  },
  {
    headline: "Built trust with",
    highlight: "50+ certifications",
    quote: '"The credential program Certainly developed has become the gold standard in our industry. It\'s helped us establish authority and build lasting trust with our stakeholders."',
    name: "Michael Torres",
    title: "VP of Programs, IWBI",
    avatar: "/logos/iwbi.png",
    image: caseIwbi,
  },
];

export const TestimonialsSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-[#E8F5E9] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  {/* Left Content */}
                  <div className="space-y-6 md:space-y-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-near-black leading-tight">
                      {item.headline}{" "}
                      <span className="text-forest-green italic">{item.highlight}</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                      {item.quote}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-forest-green/20 flex items-center justify-center">
                        {item.avatar ? (
                          <img 
                            src={item.avatar} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-forest-green font-semibold text-lg">
                            {item.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-near-black">{item.name}</p>
                        <p className="text-foreground/70 italic">{item.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Image */}
                  <div className="relative">
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                      <img 
                        src={item.image} 
                        alt={`${item.name} case study`}
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Status Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === idx
                    ? "bg-forest-green w-8"
                    : "bg-forest-green/30 hover:bg-forest-green/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Arrows */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="rounded-full border-forest-green/30 hover:bg-forest-green hover:text-white hover:border-forest-green"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="rounded-full border-forest-green/30 hover:bg-forest-green hover:text-white hover:border-forest-green"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
