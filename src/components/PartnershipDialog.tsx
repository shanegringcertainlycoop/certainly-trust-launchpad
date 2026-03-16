import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface PartnershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
}

export const PartnershipDialog = ({ open, onOpenChange, serviceName }: PartnershipDialogProps) => {
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
        service: serviceName,
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
              service: serviceName,
            },
          },
        })
        .catch((err) => console.error("Failed to send notification:", err));

      toast({
        title: "Thank you!",
        description: "We've received your message and will be in touch soon.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            {serviceName ? `Interested in ${serviceName}? ` : ""}
            Tell us about your needs and we'll get back to you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dialog-name">Name *</Label>
            <Input
              id="dialog-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              required
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialog-email">Email *</Label>
            <Input
              id="dialog-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialog-company">Company</Label>
            <Input
              id="dialog-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your organization (optional)"
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialog-message">How can we help? *</Label>
            <Textarea
              id="dialog-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your certification program and what you're looking for..."
              required
              maxLength={1000}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
