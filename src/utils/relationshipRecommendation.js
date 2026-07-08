/**
 * Relationship Recommendation — the final human-readable output layer.
 *
 * Pipeline position:
 *
 *   Relationship Needs
 *       ↓
 *   Relationship Strategy
 *       ↓
 *   Relationship Reasoner / Intervention
 *       ↓
 *   Relationship Recommendation   ← this file
 *
 * Responsibilities:
 *   - Convert internal strategy and intervention decisions into plain-language guidance.
 *   - Select appropriate tone, timing, and framing for the relationship context.
 *   - Preserve user agency — guidance only, never commands.
 *   - Never contradict the strategy or intervention.
 *   - Never generate actual messages to send.
 *   - Never optimize for engagement or activity frequency.
 *
 * This layer does NOT decide what to do. That is the Strategy and Reasoner's job.
 * This layer decides how to express what has already been decided.
 *
 * TODO: AI will later replace the deterministic text templates in this layer with:
 *   - Personalized language adapted to how this user communicates.
 *   - Culturally aware framing.
 *   - Relationship-type-specific tone and vocabulary.
 *   - Communication-style-specific phrasing (direct vs. indirect, verbal vs. written).
 *   - Feedback-loop-calibrated language that learns from what the user finds helpful.
 */

// ---------------------------------------------------------------------------
// Tone vocabulary
// ---------------------------------------------------------------------------

const TONE = {
  soft:        "soft",
  warm:        "warm",
  encouraging: "encouraging",
  calm:        "calm",
  playful:     "playful",
  neutral:     "neutral",
};

// ---------------------------------------------------------------------------
// Timing vocabulary
// ---------------------------------------------------------------------------

const TIMING = {
  now:                  "now",
  today:                "today",
  tomorrow:             "tomorrow",
  afterConflictSettles: "after conflict settles",
  afterTheyRespond:     "after they respond",
  wait:                 "wait",
};

// ---------------------------------------------------------------------------
// Tone modifier based on relationship type
//
// TODO: AI will adapt tone more precisely — considering the user's own
//       communication preference and the partner's known receptiveness.
// ---------------------------------------------------------------------------

function toneForRelationshipType(baseType, defaultTone) {
  const t = (baseType || "").toLowerCase();
  if (t === "couple")     return TONE.warm;
  if (t === "friend")     return TONE.warm;
  if (t === "project")    return TONE.encouraging;
  if (t === "mentor")     return TONE.calm;
  if (t === "healthcare") return TONE.calm;
  return defaultTone;
}

// ---------------------------------------------------------------------------
// Strategy → recommendation template map
//
// Each entry defines:
//   title          — short human title
//   summary        — one sentence context
//   recommendation — plain-language guidance (no actual messages)
//   defaultTone
//   defaultTiming
//   reasoning      — why this strategy was chosen
//   alternatives   — backup plain-language suggestions
//   avoid          — concrete actions to avoid
//
// TODO: AI will replace these fixed templates with generated text that is
//       personalized, context-aware, and calibrated from outcome signals.
// ---------------------------------------------------------------------------

const STRATEGY_TEMPLATES = {

  protect_space: {
    title:          "Give Them Space",
    summary:        "They may benefit from room to breathe right now more than active engagement.",
    recommendation: "Let the conversation rest for now. Reach out when they initiate, or after a natural pause — not from urgency.",
    defaultTone:    TONE.soft,
    defaultTiming:  TIMING.tomorrow,
    reasoning: [
      "At least one participant has a high need for space right now.",
      "Reaching out before they are ready can increase pressure rather than connection.",
    ],
    alternatives: [
      "Send a short, low-expectation message with no question attached.",
      "Focus on your own part of the relationship without waiting for a response.",
    ],
    avoid: [
      "Do not send multiple messages if you have not received a reply.",
      "Do not interpret silence as rejection.",
      "Do not make them feel guilty for needing distance.",
    ],
  },

  create_safety: {
    title:          "Create Space for Safety",
    summary:        "Emotional safety needs to be established before anything deeper can happen.",
    recommendation: "Keep today's interaction low-stakes. Ask nothing heavy. Be present without expectation.",
    defaultTone:    TONE.calm,
    defaultTiming:  TIMING.today,
    reasoning: [
      "Emotional safety is the foundation all other connection is built on.",
      "Acting without safety risks creating more distance, not less.",
    ],
    alternatives: [
      "Acknowledge something small they did recently without asking for anything in return.",
      "Be predictably available — not persistently available.",
    ],
    avoid: [
      "Do not bring up unresolved issues.",
      "Do not ask for commitments or clarity right now.",
      "Do not frame safety-building as a step toward something else.",
    ],
  },

  gentle_repair: {
    title:          "Reconnect Gently",
    summary:        "Conditions are stable enough for a careful step toward reconnection.",
    recommendation: "Open the door without forcing it. A short, honest, low-pressure message is enough — acknowledge the gap without demanding resolution.",
    defaultTone:    TONE.warm,
    defaultTiming:  TIMING.today,
    reasoning: [
      "Emotional state has stabilized enough for repair to be possible.",
      "Small, consistent repair actions are more durable than big gestures.",
    ],
    alternatives: [
      "Share something that reminded you of them — no commentary needed.",
      "Name the gap without assigning blame: 'I noticed we have been quiet.'",
    ],
    avoid: [
      "Do not open with a question that requires a difficult answer.",
      "Do not turn repair into a conversation about what went wrong.",
      "Do not expect an immediate full resolution.",
    ],
  },

  reduce_pressure: {
    title:          "Ease the Pressure",
    summary:        "The relationship may be carrying more weight than it can hold right now.",
    recommendation: "Remove one expectation or ask from today's interaction. Less is genuinely more here.",
    defaultTone:    TONE.calm,
    defaultTiming:  TIMING.now,
    reasoning: [
      "High emotional pressure reduces the capacity for genuine connection.",
      "Reducing demands is an act of care, not withdrawal.",
    ],
    alternatives: [
      "Cancel or postpone anything that feels obligatory rather than meaningful.",
      "Let a planned conversation happen naturally instead of scheduling it.",
    ],
    avoid: [
      "Do not add new topics or requests.",
      "Do not interpret reduced pressure as giving up on the relationship.",
    ],
  },

  shared_momentum: {
    title:          "Build Momentum Together",
    summary:        "You are in a position to move forward on something shared.",
    recommendation: "Pick one small thing you have been meaning to do together and take the first step — not the whole journey.",
    defaultTone:    TONE.encouraging,
    defaultTiming:  TIMING.today,
    reasoning: [
      "Shared action is one of the most reliable ways to renew relational energy.",
      "Starting small keeps the bar low enough to actually begin.",
    ],
    alternatives: [
      "Revisit a plan that has been sitting incomplete and move it one step forward.",
      "Name something you are both looking forward to — even if it is distant.",
    ],
    avoid: [
      "Do not introduce multiple new directions at once.",
      "Do not frame momentum as catching up on what has been missed.",
    ],
  },

  deepen_understanding: {
    title:          "Go Deeper Together",
    summary:        "Conditions are right for a richer investment in knowing each other.",
    recommendation: "Ask one question you have been curious about but have not yet asked. Listen without steering the answer.",
    defaultTone:    TONE.warm,
    defaultTiming:  TIMING.today,
    reasoning: [
      "Both emotional safety and stability are sufficient to support deeper exchange.",
      "Understanding deepens connection more durably than shared activity alone.",
    ],
    alternatives: [
      "Share something about yourself that they may not know yet.",
      "Revisit a conversation you started but did not finish.",
    ],
    avoid: [
      "Do not use depth as an opportunity to surface complaints.",
      "Do not treat their answer as confirmation of something you already assumed.",
    ],
  },

  acknowledge_effort: {
    title:          "Acknowledge Their Effort",
    summary:        "Recognition of what they have contributed may be exactly what is needed.",
    recommendation: "Name something specific they have done recently — not to praise, but to show you noticed.",
    defaultTone:    TONE.warm,
    defaultTiming:  TIMING.now,
    reasoning: [
      "Feeling seen for effort — not just outcomes — strengthens trust.",
      "Acknowledgment without an ask feels genuinely generous.",
    ],
    alternatives: [
      "Write it down before you say it — specificity matters more than length.",
      "Acknowledge privately rather than publicly if they value quiet recognition.",
    ],
    avoid: [
      "Do not attach acknowledgment to a request.",
      "Do not make it comparative ('you did this better than before').",
    ],
  },

  wait_and_observe: {
    title:          "Observe and Wait",
    summary:        "There is not yet enough clarity to recommend a specific action.",
    recommendation: "Hold off on initiating anything new. Pay attention to what is already unfolding without trying to change it.",
    defaultTone:    TONE.neutral,
    defaultTiming:  TIMING.wait,
    reasoning: [
      "Acting on insufficient signal risks creating problems that do not yet exist.",
      "Waiting is a genuine and sometimes optimal relationship posture.",
    ],
    alternatives: [
      "Note what you are noticing — patterns often become clearer when written down.",
      "Revisit this in a few days when more signal is available.",
    ],
    avoid: [
      "Do not confuse waiting with disengaging.",
      "Do not fill the silence with activity just to feel like you are doing something.",
    ],
  },

  celebrate_progress: {
    title:          "Celebrate What You Have Built",
    summary:        "Something worth marking has happened in this relationship.",
    recommendation: "Acknowledge the progress — not with a grand gesture, but with a specific, honest recognition of what has shifted.",
    defaultTone:    TONE.warm,
    defaultTiming:  TIMING.now,
    reasoning: [
      "Marking progress reinforces the sense that this relationship is moving in a meaningful direction.",
      "Celebration does not need to be large to be felt.",
    ],
    alternatives: [
      "Share what this moment means to you without requiring them to match your energy.",
      "Create a small shared memory to mark the moment.",
    ],
    avoid: [
      "Do not oversell the moment or set expectations for what comes next.",
      "Do not celebrate progress as evidence that past difficulty was resolved — it may still need attention.",
    ],
  },

};

// ---------------------------------------------------------------------------
// generateRelationshipRecommendation
// ---------------------------------------------------------------------------

/**
 * Convert strategy and intervention decisions into a human-readable recommendation.
 *
 * @param {object} options
 * @param {object}   options.relationshipContext  - from createRelationshipContext()
 * @param {object[]} options.participantModels    - from createParticipantModel() (unused in V1, reserved for AI)
 * @param {object}   options.relationshipState    - from generateRelationshipState()
 * @param {object}   options.relationshipNeeds    - { primaryNeed, ... }
 * @param {object}   options.strategyResult       - from generateRelationshipStrategy()
 * @param {object}   options.reasonerResult       - from reasonRelationship()
 *
 * @returns {{
 *   title: string,
 *   summary: string,
 *   recommendation: string,
 *   confidence: number,
 *   tone: string,
 *   timing: string,
 *   reasoning: string[],
 *   alternatives: string[],
 *   avoid: string[],
 *   metadata: object
 * }}
 *
 * TODO: AI will replace fixed text templates with generated language that is
 *       personalized per user, adapted to relationship type, communication style,
 *       cultural context, and calibrated from outcome signals over time.
 */
export function generateRelationshipRecommendation({
  relationshipContext = {},
  participantModels = [], // eslint-disable-line no-unused-vars
  relationshipState = {}, // eslint-disable-line no-unused-vars
  relationshipNeeds = {},
  strategyResult = {},
  reasonerResult = {},
} = {}) {
  const strategy   = strategyResult?.strategy   || "wait_and_observe";
  const intervention = reasonerResult?.intervention || "observe_and_wait";
  const confidence   = reasonerResult?.confidence   ?? 0.60;
  const whenNotToAct = reasonerResult?.whenNotToAct ?? false;
  const primaryNeed  = relationshipNeeds?.primaryNeed || null;
  const stage        = relationshipContext?.stage || "unknown";
  const relType      = relationshipContext?.relationshipType || null;

  // Retrieve the base template for this strategy.
  // Fall back to wait_and_observe if the strategy is unrecognized.
  // TODO: AI should generate a template dynamically when the strategy is novel
  //       or when no template closely matches the current context.
  const template = STRATEGY_TEMPLATES[strategy] || STRATEGY_TEMPLATES["wait_and_observe"];

  // Adapt tone to relationship type.
  // TODO: AI will also adapt tone to the receiving participant's communication
  //       preference and to what has worked for this user in the past.
  const tone = toneForRelationshipType(relType, template.defaultTone);

  // Adapt timing: if the reasoner flagged whenNotToAct, push timing out.
  // TODO: AI will calibrate timing from trajectory velocity — a fast-moving
  //       deterioration needs a different timeline than a slow drift.
  const timing = whenNotToAct
    ? (template.defaultTiming === TIMING.now ? TIMING.today : template.defaultTiming)
    : template.defaultTiming;

  // Merge the avoid list from both the strategy result and the template.
  // The strategy result avoid list contains strategy IDs; the template avoid
  // list contains plain-language actions. Both are included for completeness.
  const avoidStrategies = (strategyResult?.avoid || []).map(
    (s) => `Avoid the "${s.replace(/_/g, " ")}" approach right now.`
  );
  const avoid = [...template.avoid, ...avoidStrategies];

  return {
    title:          template.title,
    summary:        template.summary,
    recommendation: template.recommendation,
    confidence,
    tone,
    timing,
    reasoning:      template.reasoning,
    alternatives:   template.alternatives,
    avoid,
    metadata: {
      strategy,
      intervention,
      stage,
      primaryNeed,
    },
  };
}
