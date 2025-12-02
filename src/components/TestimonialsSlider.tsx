import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import caseCodegreen from "@/assets/case-codegreen.jpg";
import caseDrvn from "@/assets/case-drvn.jpg";
import caseIwbi from "@/assets/case-iwbi.jpg";

const testimonials = [
  {
    headline: "Launched a new website in",
    highlight: "25 days",
    quote: '"The Certainly process and range of accessible experts is unbeatable. In less than a month, and for half the price of other quotes -- we launched a beautiful, easy to edit website -- on time. It\'s a great value."',
    name: "Andrew Dimitriou",
    title: "Sr. Director, CodeGreen",
    avatar: "/logos/codegreen.png",
    image: caseCodegreen,
  },
  {
    headline: "Increased engagement by",
    highlight: "300%",
    quote: '"Working with Certainly transformed our digital presence. Their strategic approach to brand building delivered measurable results that exceeded our expectations."',
    name: "Sarah Chen",
    title: "Marketing Director, DRVN",
    avatar: "/logos/drvn.png",
    image: caseDrvn,
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
                      <div className="w-14 h-14 rounded-full bg-[#B8E6C1] flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-near-black">{item.name}</p>
                        <p className="text-foreground/70 italic">{item.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Image */}
                  <div className="relative">
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => api?.scrollTo(idx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                            current === idx
                              ? "bg-forest-green text-white"
                              : "bg-white/80 text-near-black hover:bg-white"
                          }`}
                        >
                          {idx === 0 ? "D" : idx === 1 ? "I" : "C"}
                        </button>
                      ))}
                    </div>
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
      </div>
    </section>
  );
};
