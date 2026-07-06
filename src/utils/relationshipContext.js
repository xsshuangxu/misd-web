/**
 * Relationship Context — long-lived, stable understanding of a World.
 *
 * This is NOT dynamic relationship state (which changes frequently).
 * This is NOT a recommendation or insight.
 *
 * Relationship Context captures what is durably true about this relationship:
 * who these people are to each other, how they operate, what they are building,
 * where they are strong, and where they are fragile.
 *
 * In the future, AI will continuously update this context by reading relationship
 * signals (messages, reflections, memories, plans) and revising each field as
 * understanding deepens. For now, it is seeded from the user-provided Profile.
 *
 * This context becomes the long-term memory passed to AI reasoning layers.
 */

/**
 * Relationship Context schema.
 *
 * relationshipType      — the category of this relationship
 *                         e.g. "Couple" | "Friend" | "Family" | "Project" | "Mentor" | "Healthcare" | "Custom"
 *
 * stage                 — the developmental phase of this relationship
 *                         e.g. "forming" | "deepening" | "stable" | "strained" | "repairing" | "unknown"
 *                         // TODO: AI should infer and update stage from signal patterns over time.
 *
 * sharedGoal            — what both participants are working toward together
 *                         Seeded from Profile. Should be revisited periodically.
 *
 * currentStrength       — the most prominent strength of this relationship right now
 *                         // TODO: AI should derive this from reflections, memories, and message tone.
 *
 * currentChallenge      — the most active difficulty or friction in this relationship
 *                         // TODO: AI should surface this from declining mood trends, plan abandonment,
 *                         //        and communication pattern changes.
 *
 * currentRisk           — a latent risk that has not yet become a problem but could
 *                         // TODO: AI should identify risks from trajectory analysis and participant
 *                         //        models (e.g. avoidant pattern + increasing silence = drift risk).
 *
 * communicationStyle    — how this relationship tends to communicate
 *                         e.g. "direct" | "indirect" | "mixed" | "written-preferred" | "unknown"
 *                         // TODO: AI should infer from message patterns and profile context.
 *
 * repairStyle           — how this relationship tends to recover after difficulty
 *                         e.g. "quick-verbal" | "slow-behavioral" | "avoidant" | "unknown"
 *                         // TODO: AI should infer from post-conflict signal patterns.
 *
 * sharedIdentity        — a phrase or sentence describing what makes this relationship unique
 *                         Seeded from the user's relationship description in Profile.
 *                         // TODO: AI should refine this over time from accumulated signals.
 *
 * lastMeaningfulMoment  — a description of the last interaction or event that felt significant
 *                         // TODO: AI should identify this from memory captions, high-rated reflections,
 *                         //        or notable message exchanges.
 *
 * updatedAt             — ISO timestamp of the last context update
 */

/**
 * Build a default Relationship Context from an existing Profile object.
 *
 * Profile fields (set by the user in the Profile module):
 *   profile.relType      — relationship type
 *   profile.goal         — current shared goal
 *   profile.description  — one-sentence relationship description
 *   profile.interests    — comma-separated shared interests
 *
 * Fields that cannot be seeded from Profile are left as null,
 * ready to be filled by future AI signal analysis.
 *
 * @param {object} profile - the profile object from App.jsx state
 * @returns {object} a Relationship Context object
 */
export function createRelationshipContext(profile = {}) {
  return {
    // Seeded from Profile
    relationshipType: profile.relType || null,
    sharedGoal: profile.goal || null,
    sharedIdentity: profile.description || null,

    // Deterministic default — no signal data available yet
    stage: "unknown",

    // Requires AI signal analysis to populate meaningfully
    // TODO: Derive currentStrength from high-rated reflections and positive memory captions.
    currentStrength: null,

    // TODO: Derive currentChallenge from declining mood trends, abandoned plans, or communication drop-off.
    currentChallenge: null,

    // TODO: Derive currentRisk from trajectory analysis and participant model interaction patterns.
    currentRisk: null,

    // TODO: Infer communicationStyle from message balance, length trends, and initiation patterns.
    communicationStyle: "unknown",

    // TODO: Infer repairStyle from signal patterns following low-mood reflections or message silences.
    repairStyle: "unknown",

    // TODO: Identify lastMeaningfulMoment from memory captions or high-rated reflections.
    lastMeaningfulMoment: null,

    updatedAt: new Date().toISOString(),
  };
}
