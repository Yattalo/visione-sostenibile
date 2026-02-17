/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as blog from "../blog.js";
import type * as contacts from "../contacts.js";
import type * as gallery from "../gallery.js";
import type * as http from "../http.js";
import type * as pages from "../pages.js";
import type * as projects from "../projects.js";
import type * as reviews from "../reviews.js";
import type * as services from "../services.js";
import type * as shareEvents from "../shareEvents.js";
import type * as taskSystem_agentOps from "../taskSystem/agentOps.js";
import type * as taskSystem_http from "../taskSystem/http.js";
import type * as taskSystem_orchestrator from "../taskSystem/orchestrator.js";
import type * as taskSystem_taskDefinitions from "../taskSystem/taskDefinitions.js";
import type * as taskSystem_tasks from "../taskSystem/tasks.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  blog: typeof blog;
  contacts: typeof contacts;
  gallery: typeof gallery;
  http: typeof http;
  pages: typeof pages;
  projects: typeof projects;
  reviews: typeof reviews;
  services: typeof services;
  shareEvents: typeof shareEvents;
  "taskSystem/agentOps": typeof taskSystem_agentOps;
  "taskSystem/http": typeof taskSystem_http;
  "taskSystem/orchestrator": typeof taskSystem_orchestrator;
  "taskSystem/taskDefinitions": typeof taskSystem_taskDefinitions;
  "taskSystem/tasks": typeof taskSystem_tasks;
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
