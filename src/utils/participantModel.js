/**
 * Participant Model — long-lived, stable understanding of one person in a World.
 *
 * This is NOT a user profile or settings object.
 * This is NOT dynamic relationship state.
 *
 * A Participant Model captures what is durably true about one person as they
 * show up in this specific relationship: how they attach, how they communicate,
 * how they handle conflict, what they need to feel safe, and what triggers them.
 *
 * Two people can have the same attachment style in general but behave very
 * differently within a specific relationship context. This model is always
 * relationship-scoped — it describes a participant as they are in this World,
 * not as they are in every relationship they have.
 *
 * In the future, AI will continuously update these models by reading signals
 * across all modules — chat tone and reciprocity, reflection sentiment and
 * stability, memory content, plan behavior, and profile context. For now,
 * models are seeded from a simple participant object and left as "unknown"
 * until signal data is available.
 *
 * Participant Models feed into:
 *   - Relationship Context   (who are these people to each other?)
 *   - Relationship Needs     (what does each person need right now?)
 *   - Intervention Reasoning (how should a recommendation be framed for this person?)
 */

/**
 * Participant Model schema.
 *
 * name                    — display name of this participant
 *
 * role                    — their role in this World
 *                           e.g. "partner" | "friend" | "family" | "teammate" | "mentor" | "mentee" | "other"
 *
 * attachmentStyle         — their dominant attachment tendency in this relationship
 *                           e.g. "secure" | "anxious" | "avoidant" | "disorganized" | "unknown"
 *                           // TODO: AI should infer from message initiation patterns, response latency,
 *                           //        and post-conflict behavior.
 *
 * conflictStyle           — how they tend to respond when things go wrong
 *                           e.g. "approach" | "avoid" | "escalate" | "withdraw" | "freeze" | "unknown"
 *                           // TODO: AI should infer from message tone after low-rated reflections
 *                           //        and communication gaps.
 *
 * communicationPreference — how they prefer to communicate
 *                           e.g. "verbal" | "written" | "behavioral" | "mixed" | "unknown"
 *
 * needForSafety           — how strongly this person needs to feel emotionally safe before opening up
 *                           e.g. "low" | "medium" | "high" | "unknown"
 *                           // TODO: AI should calibrate this from how quickly they open up vs. withdraw.
 *
 * needForSpace            — how strongly this person needs autonomy and alone time
 *                           e.g. "low" | "medium" | "high" | "unknown"
 *                           // TODO: AI should calibrate from silence patterns and response latency trends.
 *
 * stressResponse          — what they tend to do when under stress in this relationship
 *                           e.g. "reach out" | "withdraw" | "overfunction" | "underfunction" | "unknown"
 *                           // TODO: AI should infer from behavior patterns correlated with low-mood reflections.
 *
 * repairPreference        — how they prefer to reconnect after conflict or distance
 *                           e.g. "direct-conversation" | "time-and-silence" | "small-gestures" | "humor" | "unknown"
 *                           // TODO: AI should infer from post-gap behavior patterns.
 *
 * loveLanguage            — what makes them feel most valued in this relationship
 *                           e.g. "words-of-affirmation" | "quality-time" | "acts-of-service" |
 *                                "physical-touch" | "gifts" | "unknown"
 *
 * decisionStyle           — how they approach decisions in this relationship
 *                           e.g. "deliberate" | "spontaneous" | "consensus-seeking" | "independent" | "unknown"
 *
 * emotionalTriggers       — known topics or situations that tend to cause difficulty
 *                           Array of strings. Populated over time.
 *                           // TODO: AI should identify triggers from message tone shifts and
 *                           //        reflection content analysis.
 *
 * supportPreference       — what kind of support they prefer when struggling
 *                           e.g. "listening" | "advice" | "distraction" | "presence" | "space" | "unknown"
 *
 * updatedAt               — ISO timestamp of the last model update
 */

/**
 * Create a default Participant Model from a simple participant descriptor.
 *
 * @param {object} participant - a simple object with at minimum { name, role }
 * @returns {object} a Participant Model with all fields initialized
 *
 * @example
 * createParticipantModel({ name: "Elizabeth", role: "partner" })
 */
export function createParticipantModel(participant = {}) {
  return {
    // Identity
    name: participant.name || "Unknown",
    role: participant.role || "other",

    // Attachment and conflict
    attachmentStyle: "unknown",
    conflictStyle: "unknown",

    // Communication
    communicationPreference: "unknown",

    // Core needs
    needForSafety: "unknown",
    needForSpace: "unknown",

    // Stress and repair
    stressResponse: "unknown",
    repairPreference: "unknown",

    // Values and style
    loveLanguage: "unknown",
    decisionStyle: "unknown",

    // Dynamic fields — built up over time from signal analysis
    // TODO: AI should populate and revise emotionalTriggers from message tone shifts
    //        and reflection content as signals accumulate.
    emotionalTriggers: [],

    supportPreference: "unknown",

    updatedAt: new Date().toISOString(),
  };
}
