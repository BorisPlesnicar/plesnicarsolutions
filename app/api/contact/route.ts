import type { NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: "Ungültige Eingabe." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY ist nicht gesetzt.");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "E-Mail-Service nicht konfiguriert. Bitte RESEND_API_KEY in .env.local eintragen." 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Plesnicar Solutions Kontaktformular <onboarding@resend.dev>",
      to: "plesnicaroffice@gmail.com",
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff1900; border-bottom: 2px solid #ff1900; padding-bottom: 10px;">
            Neue Kontaktanfrage
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Nachricht:</h3>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-left: 4px solid #ff1900; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
        </div>
      `,
      text: `Neue Kontaktanfrage\n\nName: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error("Resend Fehler:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Fehler beim Versenden: ${error.message || "Unbekannter Fehler"}` 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("E-Mail erfolgreich versendet:", data?.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Fehler beim Versenden der Nachricht: ${errorMessage}` 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

