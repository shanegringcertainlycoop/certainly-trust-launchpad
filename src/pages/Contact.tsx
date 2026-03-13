import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("partnership_inquiries").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message,
      });

      if (error) throw error;

      supabase.functions
        .invoke("send-notification", {
          body: {
            type: "partnership_inquiry",
            data: {
              name: formData.name,
              email: formData.email,
              company: formData.company,
              message: formData.message,
            },
          },
        })
        .catch((err) => console.error("Failed to send notification:", err));

      toast({
        title: "Thank you!",
        description: "We've received your inquiry and will be in touch soon.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Contact"
        description="Connect with Certainly Cooperative. Tell us about your certification program and we'll share how we can help with marketing, operations, or technology."
        path="/contact"
      />
      <Header />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="font-sans text-sm uppercase tracking-widest text-foreground/60 mb-4">
                Get in Touch
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-6">
                Let's talk about your certification program
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                Whether you're looking to grow your candidate pipeline, modernize your digital presence, or streamline operations — we'd love to hear what you're working on.
              </p>
              <div className="space-y-4 text-foreground/70">
                <p>
                  <span className="font-semibold text-near-black">Email:</span>{" "}
                  <a
                    href="mailto:hello@certainly.coop"
                    className="text-primary hover:underline"
                  >
                    hello@certainly.coop
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-near-black">LinkedIn:</span>{" "}
                  <a
                    href="https://www.linkedin.com/company/certainlycoop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @certainlycoop
                  </a>
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    required
                    maxLength={255}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your organization (optional)"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">How can we help? *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your certification program and what you're looking for..."
                    required
                    maxLength={1000}
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
