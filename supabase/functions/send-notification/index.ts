import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const NOTIFICATION_EMAIL = "shane.gring@certainly.coop";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PartnershipInquiry {
  type: "partnership_inquiry";
  data: {
    name: string;
    email: string;
    company?: string;
    message: string;
    service?: string;
  };
}

interface NewsletterSubscription {
  type: "newsletter_subscription";
  data: {
    email: string;
  };
}

type NotificationRequest = PartnershipInquiry | NewsletterSubscription;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const notification: NotificationRequest = await req.json();
    console.log("Processing notification:", notification.type);

    let emailHtml = "";
    let subject = "";

    if (notification.type === "partnership_inquiry") {
      const { name, email, company, message, service } = notification.data;
      subject = `New Partnership Inquiry${service ? ` - ${service}` : ""}`;
      emailHtml = `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;
    } else if (notification.type === "newsletter_subscription") {
      const { email } = notification.data;
      subject = "New Newsletter Subscription";
      emailHtml = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    const emailResponse = await resend.emails.send({
      from: "Certainly Cooperative <notifications@certainly.coop>",
      to: [NOTIFICATION_EMAIL],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
