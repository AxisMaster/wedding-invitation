import { Router, type IRouter } from "express";
import { SubmitRsvpBody, SubmitRsvpResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const successResponse = (stored: boolean) =>
  SubmitRsvpResponse.parse({ received: true, stored });

router.post("/rsvp", async (req, res): Promise<void> => {
  const parsed = SubmitRsvpBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn("Rejected invalid RSVP submission");
    res.status(400).json({ error: "Please check your RSVP details and try again." });
    return;
  }

  const { fullName, attendance, guests, message, website } = parsed.data;

  // Silently accept honeypot submissions without storing or logging their data.
  if (website.trim()) {
    res.json(successResponse(false));
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl && !supabaseKey) {
    req.log.info(
      { attendance, guestCount: guests },
      "RSVP received in demo mode; personal details were not retained",
    );
    res.json(successResponse(false));
    return;
  }

  if (!supabaseUrl || !supabaseKey) {
    req.log.error("Supabase RSVP storage is only partially configured");
    res.status(503).json({ error: "RSVP storage is not configured correctly." });
    return;
  }

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/wedding_rsvps`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          attendance,
          guests,
          message: message?.trim() || null,
        }),
      },
    );

    if (!response.ok) {
      req.log.error(
        { status: response.status },
        "Supabase rejected an RSVP submission",
      );
      res.status(502).json({ error: "We couldn't save your RSVP. Please try again." });
      return;
    }

    res.json(successResponse(true));
  } catch (error) {
    req.log.error({ err: error }, "Could not reach Supabase RSVP storage");
    res.status(502).json({ error: "We couldn't save your RSVP. Please try again." });
  }
});

export default router;
