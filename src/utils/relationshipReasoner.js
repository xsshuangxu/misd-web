// TODO: Replace deterministic reasoning with LLM reasoning.

import { generateRelationshipState } from "./relationshipState.js";

const DEFAULTS = {
  couple: {
    title: "Relationship Insight",
    summary: "Your connection looks steady.",
    recommendation: "Take a moment to appreciate how far you've come together.",
  },
  project: {
    title: "Collaboration Insight",
    summary: "Your collaboration is ongoing.",
    recommendation: "Align on one clear next step to keep momentum.",
  },
  friend: {
    title: "Friendship Insight",
    summary: "Your friendship is alive.",
    recommendation: "A quick check-in can go a long way.",
  },
  default: {
    title: "Relationship Insight",
    summary: "This world is taking shape.",
    recommendation: "Keep building — small consistent moments matter most.",
  },
};

function getDefault(profile) {
  const type = (profile?.relType || "").toLowerCase();
  if (type === "couple") return DEFAULTS.couple;
  if (type === "project") return DEFAULTS.project;
  if (type === "friend") return DEFAULTS.friend;
  return DEFAULTS.default;
}

export function generateInsight({ profile = {}, messages = [], reflections = [], plans = [], memories = [] }) {
  const state = generateRelationshipState({ messages, reflections, plans, memories });

  // Rule A: emotional health is low
  if (state.emotionalHealth === "low") {
    return {
      title: "Emotional Check-in",
      summary: "This relationship seems to be under some emotional pressure.",
      recommendation:
        "Choose one small positive interaction instead of solving everything at once.",
    };
  }

  // Rule B: future alignment is low (incomplete plans dominate)
  if (state.futureAlignment === "low") {
    return {
      title: "Shared Goals",
      summary: "You have shared goals waiting to be completed.",
      recommendation:
        "Finishing one existing plan is likely more meaningful than creating another.",
    };
  }

  // Rule C: no shared experience yet
  if (state.sharedExperience === "low" && memories.length === 0) {
    return {
      title: "Memory Capture",
      summary: "No shared memories have been added yet.",
      recommendation: "Capture one small everyday moment together.",
    };
  }

  // Rule D: low momentum overall
  if (state.momentum === "low") {
    return {
      title: "Momentum",
      summary: "Activity in this world has been quiet.",
      recommendation: "A small action — a message, a plan, a memory — is enough to restart.",
    };
  }

  // Rule E: fall back to tone based on relationship type
  return getDefault(profile);
}
