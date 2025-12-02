import { useState } from "react";
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
  return <footer className="bg-forest-green text-primary-foreground py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-serif font-bold">Certainly Cooperative</h3>
          </div>

          {/* Social Links */}
          <div>
            <a href="https://www.linkedin.com/company/certainlycoop" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/80 transition-colors" aria-label="LinkedIn">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Subscribe to Seeking Certainty</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Periodic insights on credential strategy, trust marketing, and the future of authority online.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="bg-background/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
                maxLength={255}
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>
            © 2025 Certainly Cooperative — 
            <a href="#" className="hover:text-primary-foreground/90 ml-1">Privacy Policy</a> — 
            <a href="#" className="hover:text-primary-foreground/90 ml-1">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>;
};