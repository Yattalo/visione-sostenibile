/* eslint-disable @typescript-eslint/no-explicit-any */
import { internalMutation, internalAction, query } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { v } from "convex/values";

function replaceTokens(input: string, variables: Record<string, string>): string {
  return input.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key: string) => {
    return variables[key] ?? "";
  });
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function parseVariablesJson(variablesJson?: string): Record<string, string> {
  if (!variablesJson) return {};
  try {
    const parsed = JSON.parse(variablesJson) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value === undefined || value === null) {
        out[key] = "";
      } else {
        out[key] = String(value);
      }
    }
    return out;
  } catch {
    return {};
  }
}

function siteUrl(): string {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.visionesostenibile.it"
  );
}

function wrapBrandLayout(contentHtml: string, previewTitle: string): string {
  const logo = `${siteUrl()}/VS_logo_completo_colori.svg`;
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;background:#f3f4f6;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:20px 24px;background:#0f3d2e;">
                <img src="${logo}" alt="Visione Sostenibile" style="height:34px;display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                ${contentHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.4;color:#6b7280;">
                ${previewTitle}<br/>
                Visione Sostenibile - Torino
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

function parseRecipients(input?: string): string[] {
  if (!input) return [];
  return input
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export const logQueued = internalMutation({
  args: {
    to: v.string(),
    subject: v.string(),
    templateKey: v.optional(v.string()),
    html: v.string(),
    text: v.optional(v.string()),
    relatedType: v.optional(v.string()),
    relatedId: v.optional(v.string()),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailDeliveries", {
      ...args,
      status: "queued",
      provider: "resend",
      createdAt: Date.now(),
    });
  },
});

export const finalizeDelivery = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    status: v.string(),
    error: v.optional(v.string()),
    providerMessageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.deliveryId, {
      status: args.status,
      error: args.error,
      providerMessageId: args.providerMessageId,
      sentAt: args.status === "sent" ? Date.now() : undefined,
    });
    return { success: true };
  },
});

async function sendViaResend(payload: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return {
      ok: false,
      skipped: true,
      error: "RESEND_API_KEY o EMAIL_FROM non configurati",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; error?: { message?: string } }
    | null;

  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      error:
        data?.message ||
        data?.error?.message ||
        `Invio fallito (status ${response.status})`,
    };
  }

  return {
    ok: true,
    skipped: false,
    messageId: data?.id,
  };
}

async function deliverTemplateEmail(ctx: any, args: {
  to: string;
  templateKey: string;
  variables?: Record<string, string>;
  relatedType?: string;
  relatedId?: string;
  createdBy?: string;
  crmContactId?: string;
}): Promise<{ success: boolean; error?: string; deliveryId?: any }> {
  await ctx.runMutation(api.emailTemplates.ensureDefaults, {});

  const template: any = await ctx.runQuery(internal.emailTemplates.getByKeyInternal as any, {
    key: args.templateKey,
  });

  if (!template || !template.isActive) {
    return { success: false, error: `Template non trovato: ${args.templateKey}` };
  }

  const variables = {
    ...args.variables,
    currentYear: String(new Date().getFullYear()),
  };

  const subject = replaceTokens(template.subject, variables);
  const bodyHtml = replaceTokens(template.html, variables);
  const fullHtml = wrapBrandLayout(bodyHtml, template.name);
  const text = template.text
    ? replaceTokens(template.text, variables)
    : stripHtml(bodyHtml);

  const deliveryId: any = await ctx.runMutation(internal.emails.logQueued as any, {
    to: args.to,
    subject,
    templateKey: template.key,
    html: fullHtml,
    text,
    relatedType: args.relatedType,
    relatedId: args.relatedId,
    createdBy: args.createdBy,
  });

  const sent = await sendViaResend({
    to: args.to,
    subject,
    html: fullHtml,
    text,
  });

  if (!sent.ok) {
    await ctx.runMutation(internal.emails.finalizeDelivery as any, {
      deliveryId,
      status: sent.skipped ? "skipped" : "failed",
      error: sent.error,
    });
    return { success: false, error: sent.error };
  }

  await ctx.runMutation(internal.emails.finalizeDelivery as any, {
    deliveryId,
    status: "sent",
    providerMessageId: sent.messageId,
  });

  await ctx.runMutation(internal.crm.logEmailActivity as any, {
    contactId: args.crmContactId as any,
    email: args.to,
    title: `Email inviata: ${subject}`,
    description: `Template ${template.key}`,
    payload: JSON.stringify({
      templateKey: template.key,
      deliveryId,
      providerMessageId: sent.messageId,
    }),
    createdBy: args.createdBy,
  });

  return { success: true, deliveryId };
}

export const deliverTemplate = internalAction({
  args: {
    to: v.string(),
    templateKey: v.string(),
    variablesJson: v.optional(v.string()),
    relatedType: v.optional(v.string()),
    relatedId: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    crmContactId: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<any> => {
    return await deliverTemplateEmail(ctx, {
      to: args.to,
      templateKey: args.templateKey,
      variables: parseVariablesJson(args.variablesJson),
      relatedType: args.relatedType,
      relatedId: args.relatedId,
      createdBy: args.createdBy,
      crmContactId: args.crmContactId,
    });
  },
});

export const deliverRaw = internalAction({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    relatedType: v.optional(v.string()),
    relatedId: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    crmContactId: v.optional(v.string()),
    wrapBrand: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<any> => {
    const html = args.wrapBrand === false
      ? args.html
      : wrapBrandLayout(args.html, "Messaggio Visione Sostenibile");
    const text = args.text ?? stripHtml(args.html);

    const deliveryId: any = await ctx.runMutation(internal.emails.logQueued as any, {
      to: args.to,
      subject: args.subject,
      html,
      text,
      relatedType: args.relatedType,
      relatedId: args.relatedId,
      createdBy: args.createdBy,
    });

    const sent = await sendViaResend({
      to: args.to,
      subject: args.subject,
      html,
      text,
    });

    if (!sent.ok) {
      await ctx.runMutation(internal.emails.finalizeDelivery as any, {
        deliveryId,
        status: sent.skipped ? "skipped" : "failed",
        error: sent.error,
      });
      return { success: false, error: sent.error };
    }

    await ctx.runMutation(internal.emails.finalizeDelivery as any, {
      deliveryId,
      status: "sent",
      providerMessageId: sent.messageId,
    });

    await ctx.runMutation(internal.crm.logEmailActivity as any, {
      contactId: args.crmContactId as any,
      email: args.to,
      title: `Email inviata: ${args.subject}`,
      description: "Invio one-shot",
      payload: JSON.stringify({ deliveryId, providerMessageId: sent.messageId }),
      createdBy: args.createdBy,
    });

    return { success: true, deliveryId };
  },
});

export const sendContactFormNotifications = internalAction({
  args: {
    submissionId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    serviceInterest: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const adminRecipients = parseRecipients(process.env.ADMIN_NOTIFICATION_EMAIL);

    const common = {
      name: args.name,
      email: args.email,
      phone: args.phone || "Non fornito",
      subject: args.subject || "Richiesta dal sito",
      message: args.message,
      serviceInterest: args.serviceInterest || "Generico",
    };

    for (const to of adminRecipients) {
      await deliverTemplateEmail(ctx, {
        to,
        templateKey: "transactional-contact-admin",
        variables: common,
        relatedType: "contactSubmission",
        relatedId: args.submissionId,
        createdBy: "system",
      });
    }

    await deliverTemplateEmail(ctx, {
      to: args.email,
      templateKey: "transactional-contact-customer",
      variables: common,
      relatedType: "contactSubmission",
      relatedId: args.submissionId,
      createdBy: "system",
    });

    return { success: true };
  },
});

export const sendQuizNotifications = internalAction({
  args: {
    leadId: v.string(),
    scorecardId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    resultProfile: v.string(),
  },
  handler: async (ctx, args) => {
    const adminRecipients = parseRecipients(process.env.ADMIN_NOTIFICATION_EMAIL);
    const scorecardUrl = `${siteUrl()}/scorecard/${args.scorecardId}`;

    const common = {
      name: args.name,
      email: args.email,
      phone: args.phone || "Non fornito",
      resultProfile: args.resultProfile,
      scorecardId: args.scorecardId,
      scorecardUrl,
    };

    for (const to of adminRecipients) {
      await deliverTemplateEmail(ctx, {
        to,
        templateKey: "transactional-quiz-admin",
        variables: common,
        relatedType: "lead",
        relatedId: args.leadId,
        createdBy: "system",
      });
    }

    await deliverTemplateEmail(ctx, {
      to: args.email,
      templateKey: "transactional-quiz-customer",
      variables: common,
      relatedType: "lead",
      relatedId: args.leadId,
      createdBy: "system",
    });

    return { success: true };
  },
});

export const listDeliveries = query({
  args: {
    to: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 200, 500);

    if (args.to) {
      const email = args.to.trim().toLowerCase();
      return await ctx.db
        .query("emailDeliveries")
        .withIndex("by_to_date", (q) => q.eq("to", email))
        .order("desc")
        .take(limit);
    }

    if (args.status) {
      return await ctx.db
        .query("emailDeliveries")
        .withIndex("by_status_date", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(limit);
    }

    return await ctx.db
      .query("emailDeliveries")
      .withIndex("by_date")
      .order("desc")
      .take(limit);
  },
});

export const previewFromTemplate = query({
  args: {
    subject: v.string(),
    html: v.string(),
    variablesJson: v.optional(v.string()),
    templateName: v.optional(v.string()),
  },
  handler: async (_, args) => {
    const variables = parseVariablesJson(args.variablesJson);
    const renderedSubject = replaceTokens(args.subject, variables);
    const renderedHtml = replaceTokens(args.html, variables);

    return {
      subject: renderedSubject,
      html: wrapBrandLayout(renderedHtml, args.templateName ?? "Anteprima template"),
      text: stripHtml(renderedHtml),
    };
  },
});
