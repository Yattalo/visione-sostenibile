/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as authHelpers from "../authHelpers.js";
import type * as blog from "../blog.js";
import type * as blogComments from "../blogComments.js";
import type * as blogSeed from "../blogSeed.js";
import type * as contacts from "../contacts.js";
import type * as crm from "../crm.js";
import type * as editorial from "../editorial.js";
import type * as emailDispatch from "../emailDispatch.js";
import type * as emailTemplates from "../emailTemplates.js";
import type * as emails from "../emails.js";
import type * as gallery from "../gallery.js";
import type * as gallerySeed from "../gallerySeed.js";
import type * as http from "../http.js";
import type * as leads from "../leads.js";
import type * as media from "../media.js";
import type * as pages from "../pages.js";
import type * as partners from "../partners.js";
import type * as projects from "../projects.js";
import type * as projectsSeed from "../projectsSeed.js";
import type * as quiz from "../quiz.js";
import type * as reviews from "../reviews.js";
import type * as services from "../services.js";
import type * as settings from "../settings.js";
import type * as shareEvents from "../shareEvents.js";
import type * as taskSystem_agentOps from "../taskSystem/agentOps.js";
import type * as taskSystem_agents from "../taskSystem/agents.js";
import type * as taskSystem_contextEntries from "../taskSystem/contextEntries.js";
import type * as taskSystem_cronManager from "../taskSystem/cronManager.js";
import type * as taskSystem_driftEvents from "../taskSystem/driftEvents.js";
import type * as taskSystem_heartbeats from "../taskSystem/heartbeats.js";
import type * as taskSystem_hooks from "../taskSystem/hooks.js";
import type * as taskSystem_http from "../taskSystem/http.js";
import type * as taskSystem_memory from "../taskSystem/memory.js";
import type * as taskSystem_orchestrator from "../taskSystem/orchestrator.js";
import type * as taskSystem_skills from "../taskSystem/skills.js";
import type * as taskSystem_taskDefinitions from "../taskSystem/taskDefinitions.js";
import type * as taskSystem_tasks from "../taskSystem/tasks.js";
import type * as uploads from "../uploads.js";
import type * as userHelpers from "../userHelpers.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  authHelpers: typeof authHelpers;
  blog: typeof blog;
  blogComments: typeof blogComments;
  blogSeed: typeof blogSeed;
  contacts: typeof contacts;
  crm: typeof crm;
  editorial: typeof editorial;
  emailDispatch: typeof emailDispatch;
  emailTemplates: typeof emailTemplates;
  emails: typeof emails;
  gallery: typeof gallery;
  gallerySeed: typeof gallerySeed;
  http: typeof http;
  leads: typeof leads;
  media: typeof media;
  pages: typeof pages;
  partners: typeof partners;
  projects: typeof projects;
  projectsSeed: typeof projectsSeed;
  quiz: typeof quiz;
  reviews: typeof reviews;
  services: typeof services;
  settings: typeof settings;
  shareEvents: typeof shareEvents;
  "taskSystem/agentOps": typeof taskSystem_agentOps;
  "taskSystem/agents": typeof taskSystem_agents;
  "taskSystem/contextEntries": typeof taskSystem_contextEntries;
  "taskSystem/cronManager": typeof taskSystem_cronManager;
  "taskSystem/driftEvents": typeof taskSystem_driftEvents;
  "taskSystem/heartbeats": typeof taskSystem_heartbeats;
  "taskSystem/hooks": typeof taskSystem_hooks;
  "taskSystem/http": typeof taskSystem_http;
  "taskSystem/memory": typeof taskSystem_memory;
  "taskSystem/orchestrator": typeof taskSystem_orchestrator;
  "taskSystem/skills": typeof taskSystem_skills;
  "taskSystem/taskDefinitions": typeof taskSystem_taskDefinitions;
  "taskSystem/tasks": typeof taskSystem_tasks;
  uploads: typeof uploads;
  userHelpers: typeof userHelpers;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
