import { Card, CardContent } from "@/components/ui/card";
import iwbiImage from "@/assets/case-iwbi.jpg";
import codegreenImage from "@/assets/case-codegreen.jpg";
import drvnImage from "@/assets/case-drvn.jpg";

const cases = [
  {
    title: "International WELL Building Institute",
    description: "Partnered to elevate their global certification programs and digital presence, strengthening their position as the world's leading health and wellness building standard.",
    image: iwbiImage
  },
  {
    title: "Pinchin / CodeGreen",
    description: "Partnered with multiple teams across this international brand to introduce new artifacts for their brand and strengthen their market position in sustainable building solutions.",
    image: codegreenImage
  },
  {
    title: "DRVN Golf Fitness",
    description: "Built a recurring credential from a niche course, creating new revenue streams for coaches worldwide and establishing a recognized standard in golf fitness training.",
    image: drvnImage
  }
];

export const FeaturedWorkSection = () => {
  return (
    <section className="py-24 bg-forest-green px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
            Stories of Trust
          </h2>
          <p className="text-xl text-primary-foreground/80">
            A few transformations we've helped bring to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <Card key={index} className="border-none bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-semibold text-primary-foreground">
                    {caseStudy.title}
                  </h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {caseStudy.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
