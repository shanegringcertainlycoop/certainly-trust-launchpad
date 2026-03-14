import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email("Invalid email address").max(255);
export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email: validation.data });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
          });
        } else {
          throw error;
        }
      } else {
        // Send notification email (don't wait for it)
        supabase.functions.invoke("send-notification", {
          body: {
            type: "newsletter_subscription",
            data: { email: validation.data },
          },
        }).catch(err => console.error("Failed to send notification:", err));

        toast({
          title: "Thanks for subscribing!",
          description: "You'll receive our next edition of Seeking Certainty soon."
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="bg-forest-green text-primary-foreground py-16 px-6 md:px-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 hover-scale inline-block">
              Certainly Cooperative
            </h3>
            <div className="mt-6">
              <a 
                href="https://www.linkedin.com/company/certainlycoop" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-lg font-medium hover:text-accent transition-all duration-300 group"
                aria-label="Follow us on LinkedIn"
              >
                <span className="relative">
                  LinkedIn
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Newsletter Subscribe */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-300">
              <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Subscribe to Seeking Certainty
              </h4>
              <p className="text-base md:text-lg text-primary-foreground/90 mb-6 leading-relaxed max-w-2xl">
                Periodic insights on credential strategy, trust marketing, and the future of authority online.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="flex-1 bg-background/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-12 text-base focus:border-accent focus:ring-accent"
                  maxLength={255}
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="lg"
                  className="whitespace-nowrap h-12 px-8 font-semibold hover-scale"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Legal & Copyright */}
        <div className="pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p className="order-2 sm:order-1">
              © {new Date().getFullYear()} Certainly Cooperative
            </p>
            <div className="flex items-center gap-1 order-1 sm:order-2">
              <Link
                to="/privacy"
                className="px-3 py-1 hover:text-primary-foreground transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-3 right-3 h-px bg-primary-foreground scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <span className="text-primary-foreground/40">•</span>
              <Link
                to="/terms"
                className="px-3 py-1 hover:text-primary-foreground transition-colors relative group"
              >
                Terms of Use
                <span className="absolute bottom-0 left-3 right-3 h-px bg-primary-foreground scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};