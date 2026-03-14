import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import avatarAndrew from "@/assets/avatar-andrew.png";
import avatarJim from "@/assets/avatar-jim.png";
import avatarPrateek from "@/assets/avatar-prateek.png";
import slideCodegreen from "@/assets/slide-codegreen.png";
import slideOnePercent from "@/assets/slide-onepercentplanet.png";
import slideIwbi from "@/assets/slide-iwbi.png";

const testimonials = [
  {
    headline: "Launched a new website in",
    highlight: "25 days",
    quote:
      '"The Certainly process and range of accessible experts is unbeatable. In less than a month, and for half the price of other quotes -- we launched a beautiful, easy to edit website -- on time. It\'s a great value."',
    name: "Andrew Dimitriou",
    title: "Sr. Director, CodeGreen",
    avatar: avatarAndrew,
    image: slideCodegreen,
  },
  {
    headline: "Automating",
    highlight: "1000s of hours of outreach",
    quote:
      '"Big shout out to the team at Certainly for the assist on our CRM audit and segmentation issues with our existing customer base. Their work is positioning us for a very effective business development season."',
    name: "Jim Lehnhoff",
    title: "Director of Business Development, 1% for the Planet",
    avatar: avatarJim,
    image: slideOnePercent,
  },
  {
    headline: "A campaign funnel that converted",
    highlight: "105%",
    quote:
      '"The experts at Certainly have been instrumental to the success of the WELL program and the growth of the IWBI community. They\'re the "secret sauce" behind many of our technical interventions."',
    name: "Prateek Khanna",
    title: "COO/CTO, International WELL Building Institute",
    avatar: avatarPrateek,
    image: slideIwbi,
  },
];

export const TestimonialsSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      className="bg-forest-green py-20 md:py-28 relative grain overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 fade-in-up">
          <span className="section-label section-label-light">Client stories</span>
        </div>

        <Carousel setApi={setApi} className="w-full fade-in-up">
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  {/* Left Content */}
                  <div className="space-y-6 md:space-y-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.08]">
                      {item.headline}{" "}
                      <em className="text-cream/90">{item.highlight}</em>
                    </h2>

                    {/* Large decorative quote mark */}
                    <div className="relative">
                      <span className="absolute -top-6 -left-2 text-7xl font-serif text-cream/15 leading-none select-none">
                        &ldquo;
                      </span>
                      <p className="text-lg md:text-xl text-cream/80 leading-relaxed pl-6 border-l-2 border-cream/20">
                        {item.quote}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-cream/20 flex-shrink-0">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center bg-cream/10 text-cream font-semibold text-lg">
                            {item.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {item.name}
                        </p>
                        <p className="text-cream/60 text-sm">{item.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden shadow-2xl">
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
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === idx
                    ? "bg-cream w-8"
                    : "bg-cream/25 hover:bg-cream/40 w-2"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              className="rounded-full border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream hover:border-cream/40 h-10 w-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              className="rounded-full border-cream/25 bg-transparent text-cream hover:bg-cream/10 hover:text-cream hover:border-cream/40 h-10 w-10"
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
