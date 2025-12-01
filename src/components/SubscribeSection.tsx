import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const SubscribeSection = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Success feedback
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our next edition of Seeking Certainty soon."
    });

    // Reset form
    setFirstName("");
    setEmail("");
  };

  return (
    <section id="contact" className="py-24 bg-cream px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
          Subscribe to Seeking Certainty
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          Periodic insights on credential strategy, trust marketing, and the future of authority online.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white border-border"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-border"
          />
          <Button type="submit" variant="cta" size="lg" className="w-full">
            Submit
          </Button>
        </form>

        <p className="text-sm text-foreground/60 mt-8">
          Built by creators. Owned by contributors. Scaled through trust.
        </p>
      </div>
    </section>
  );
};
