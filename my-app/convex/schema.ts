import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { taskSystemTables } from "./taskSystem/schema";

export default defineSchema({
  // Task System (UCA orchestration layer)
  ...taskSystemTables,

  // ── Visione Sostenibile domain tables ──
  pages: defineTable({
    slug: v.string(),
    title: v.string(),
    metaDescription: v.optional(v.string()),
    content: v.optional(v.string()),
    heroTitle: v.optional(v.string()),
    heroSubtitle: v.optional(v.string()),
    heroImage: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.boolean(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active", ["isActive"]),

  services: defineTable({
    slug: v.string(),
    title: v.string(),
    shortDescription: v.string(),
    fullDescription: v.optional(v.string()),
    icon: v.optional(v.string()),
    image: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    order: v.number(),
    isActive: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active_order", ["isActive", "order"]),

  gallery: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    mediaType: v.optional(v.union(v.literal("image"), v.literal("video"))),
    storageId: v.optional(v.id("_storage")),
    mimeType: v.optional(v.string()),
    fileName: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
    category: v.optional(v.string()),
    serviceId: v.optional(v.id("services")),
    order: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_category", ["category", "isActive", "order"])
    .index("by_service", ["serviceId"])
    .index("by_active", ["isActive", "order"]),

  reviews: defineTable({
    authorName: v.string(),
    authorLocation: v.optional(v.string()),
    authorPhoto: v.optional(v.string()),
    rating: v.number(),
    text: v.string(),
    date: v.optional(v.string()),
    isApproved: v.boolean(),
    order: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_approved", ["isApproved", "order"])
    .index("by_rating", ["isApproved", "rating"]),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    serviceInterest: v.optional(v.string()),
    isRead: v.boolean(),
    isReplied: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_date", ["createdAt"])
    .index("by_read", ["isRead"])
    .index("by_email_date", ["email", "createdAt"]),

  shareEvents: defineTable({
    eventName: v.union(v.literal("share_clicked"), v.literal("share_landing")),
    serviceSlug: v.string(),
    channel: v.optional(v.string()),
    pagePath: v.string(),
    createdAt: v.number(),
  })
    .index("by_date", ["createdAt"])
    .index("by_event_date", ["eventName", "createdAt"])
    .index("by_service_date", ["serviceSlug", "createdAt"]),

  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverStorageId: v.optional(v.id("_storage")),
    coverMimeType: v.optional(v.string()),
    coverFileName: v.optional(v.string()),
    coverSizeBytes: v.optional(v.number()),
    category: v.string(),
    author: v.string(),
    publishedAt: v.number(),
    readTime: v.string(),
    isPublished: v.boolean(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category", "isPublished"])
    .index("by_published", ["isPublished", "publishedAt"]),

  projects: defineTable({
    slug: v.string(),
    title: v.string(),
    location: v.string(),
    region: v.string(),
    area_mq: v.optional(v.number()),
    type: v.string(),
    tags: v.array(v.string()),
    has_photos: v.boolean(),
    has_renders: v.boolean(),
    photo_count: v.number(),
    render_count: v.number(),
    hero_image: v.optional(v.string()),
    hero_alt: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    photos: v.array(
      v.object({
        src: v.string(),
        thumb: v.string(),
        alt: v.string(),
        caption: v.string(),
        type: v.union(v.literal("hero"), v.literal("gallery"), v.literal("render")),
        dimensions: v.optional(v.string()),
      })
    ),
    renders: v.array(
      v.object({
        src: v.string(),
        thumb: v.string(),
        alt: v.string(),
        caption: v.string(),
        type: v.union(v.literal("hero"), v.literal("gallery"), v.literal("render")),
        dimensions: v.optional(v.string()),
      })
    ),
    features: v.array(v.string()),
    description: v.string(),
    order: v.number(),
    isActive: v.boolean(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active_order", ["isActive", "order"])
    .index("by_tag", ["isActive"]),

  adminSessions: defineTable({
    token: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_token", ["token"])
    .index("by_active", ["isActive", "expiresAt"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"]),

  // ── Email system (templates + deliveries) ──
  emailTemplates: defineTable({
    key: v.string(),
    name: v.string(),
    category: v.string(), // transactional | newsletter | custom
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    isSystem: v.boolean(),
    isActive: v.boolean(),
    updatedAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_category", ["category", "updatedAt"])
    .index("by_updated", ["updatedAt"]),

  emailDeliveries: defineTable({
    to: v.string(),
    subject: v.string(),
    templateKey: v.optional(v.string()),
    html: v.string(),
    text: v.optional(v.string()),
    status: v.string(), // queued | sent | failed | skipped
    provider: v.optional(v.string()),
    providerMessageId: v.optional(v.string()),
    error: v.optional(v.string()),
    relatedType: v.optional(v.string()), // contactSubmission | lead | crmContact
    relatedId: v.optional(v.string()),
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
    sentAt: v.optional(v.number()),
  })
    .index("by_date", ["createdAt"])
    .index("by_to_date", ["to", "createdAt"])
    .index("by_status_date", ["status", "createdAt"]),

  // ── Basic CRM ──
  crmContacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    source: v.string(), // contact_form | quiz | manual
    status: v.string(), // new | contacted | qualified | archived
    tags: v.array(v.string()),
    notes: v.optional(v.string()),
    lastInteractionAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status", "lastInteractionAt"])
    .index("by_last_interaction", ["lastInteractionAt"]),

  crmActivities: defineTable({
    contactId: v.id("crmContacts"),
    type: v.string(), // contact_form | quiz_completion | email_sent | note
    title: v.string(),
    description: v.optional(v.string()),
    payload: v.optional(v.string()), // json string
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_contact_date", ["contactId", "createdAt"])
    .index("by_type_date", ["type", "createdAt"]),

  // ── Lead Magnet / Micro-funnel ──
  leads: defineTable({
    quizAnswers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
        score: v.number(),
      })
    ),
    totalScore: v.number(),
    scorecardId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    isContacted: v.boolean(),
    notes: v.optional(v.string()),
  })
    .index("by_scorecardId", ["scorecardId"])
    .index("by_email", ["email"])
    .index("by_date", ["createdAt"])
    .index("by_contacted", ["isContacted", "createdAt"]),

  quizSubmissions: defineTable({
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
      })
    ),
    resultProfile: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.string(),
    createdAt: v.number(),
  })
    .index("by_date", ["createdAt"])
    .index("by_profile", ["resultProfile"]),
});
