import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BEEHIIV_PUBLICATION_ID = "pub_032815a3-09de-4fe3-8ddd-29887c80a61d";
const BEEHIIV_SUBSCRIBE_URL = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      throw new Error("Email is required");
    }

    const apiKey = Deno.env.get("BEEHIIV_API_KEY");

    if (apiKey) {
      // Use the official API if key is available
      const res = await fetch(BEEHIIV_SUBSCRIBE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Beehiiv API error:", res.status, body);
        throw new Error(`Beehiiv API returned ${res.status}`);
      }

      console.log("Subscribed via Beehiiv API:", email);
    } else {
      // Fallback: use the public embed form endpoint
      const formData = new URLSearchParams();
      formData.append("email", email);

      const res = await fetch(
        "https://seeking-certainty.beehiiv.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          redirect: "manual",
        }
      );

      // Beehiiv returns a 302 redirect on success
      if (res.status !== 302 && res.status !== 200) {
        const body = await res.text();
        console.error("Beehiiv form error:", res.status, body);
        throw new Error(`Beehiiv subscribe returned ${res.status}`);
      }

      console.log("Subscribed via Beehiiv form:", email);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in beehiiv-subscribe:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
