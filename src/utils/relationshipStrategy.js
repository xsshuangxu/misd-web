/**
 * Relationship Strategy — the approach layer between Needs and Intervention.
 *
 * Pipeline position:
 *
 *   Relationship Needs
 *       ↓
 *   Relationship Strategy   ← this file
 *       ↓
 *   Relationship Reasoner / Intervention
 *       ↓
 *   Recommendation
 *
 * Responsibilities:
 *   - Decide the overall APPROACH for this relationship moment.
 *   - Determine what approaches to AVOID.
 *   - Assess the RISK LEVEL of acting at all.
 *
 * This layer does NOT:
 *   - Generate user-facing language (that is Recommendation's job).
 *   - Select a specific action (that is Intervention's job).
 *   - Read raw signals — messages, memories, reflections, plans (that is Signal Interpretation's job).
 *   - Optimize for activity frequency or engagement metrics.
 *
 * Inputs:  Relationship Needs, Relationship State, Relationship Context, Participant Models.
 * Outputs: { strategy, rationale, riskLevel, confidence, avoid, updatedAt }
 *
 * TODO: Replace deterministic strategy selection with AI reasoning that holds
 *       the tension between participant needs simultaneously and selects strategy
 *       based on trajectory direction, participant model completeness, and
 *       relationship stage — not just the primary need.
 */

/**
 * Strategy catalogue.
 *
 * reduce_pressure      — actively reduce demands on the relationship; fewer asks, less expectation
 * create_safety        — prioritize emotional safety before any deeper engagement
 * gentle_repair        — carefully move toward reconnection after difficulty
 * shared_momentum      — build on existing positive energy with a shared direction
 * deepen_understanding — invest in knowing each other more fully
 * protect_space        — honor and preserve the need for distance or autonomy
 * acknowledge_effort   — recognize contribution or effort without asking for more
 * wait_and_observe     — do not act; gather more signal before deciding
 * celebrate_progress   — mark and appreciate what has been built together
 */
const STRATEGIES = [
  "reduce_pressure",
  "create_safety",
  "gentle_repair",
  "shared_momentum",
  "deepen_understanding",
  "protect_space",
  "acknowledge_effort",
  "wait_and_observe",
  "celebrate_progress",
];

// Risk levels reflect the probability that acting makes things worse.
// "low"    — acting is likely safe
// "medium" — acting may help but requires care
// "high"   — acting carries meaningful risk; consider wait_and_observe instead
const RISK = { low: "low", medium: "medium", high: "high" };

/**
 * Derive a strategy modifier from the emotional safety dimension of state.
 * Low safety pushes all strategies toward more protective approaches.
 *
 * TODO: AI should weight this modifier dynamically based on how quickly
 *       safety has declined (velocity matters as much as current level).
 *
 * @param {string} emotionalSafety - "low" | "medium" | "high"
 * @returns {"conservative" | "neutral" | "open"}
 */
function safetyPosture(emotionalSafety) {
  if (emotionalSafety === "low") return "conservative";
  if (emotionalSafety === "high") return "open";
  return "neutral";
}

/**
 * Derive a space modifier from participant models.
 * If any participant has high needForSpace, strategies should avoid pushing connection.
 *
 * TODO: AI should distinguish between temporary high space need (situational stress)
 *       and structural high space need (avoidant tendency), and adjust strategy
 *       persistence accordingly.
 *
 * @param {object[]} participantModels
 * @returns {boolean}
 */
function anyParticipantNeedsSpace(participantModels) {
  return participantModels.some((p) => p.needForSpace === "high");
}

/**
 * Strategies that should never be recommended when emotional safety is low.
 * Attempting depth, momentum, or celebration when safety is absent tends to
 * create pressure rather than connection.
 */
const UNSAFE_WHEN_LOW_SAFETY = [
  "deepen_understanding",
  "shared_momentum",
  "celebrate_progress",
  "gentle_repair",
];

/**
 * generateRelationshipStrategy
 *
 * Maps relationship needs, state, context, and participant models to a
 * recommended strategic approach.
 *
 * @param {object} options
 * @param {object}   options.relationshipContext   - from createRelationshipContext()
 * @param {object[]} options.participantModels     - from createParticipantModel()
 * @param {object}   options.relationshipState     - from generateRelationshipState()
 * @param {object}   options.relationshipNeeds     - { primaryNeed, participantNeeds, tensions }
 *
 * @returns {{
 *   strategy: string,
 *   rationale: string,
 *   riskLevel: string,
 *   confidence: number,
 *   avoid: string[],
 *   updatedAt: string
 * }}
 */
export function generateRelationshipStrategy({
  relationshipContext = {},
  participantModels = [],
  relationshipState = {},
  relationshipNeeds = {},
} = {}) {
  const primaryNeed = relationshipNeeds?.primaryNeed || null;
  const safety = relationshipState?.emotionalSafety || "medium";
  const stability = relationshipState?.emotionalStability || "medium";
  const posture = safetyPosture(safety);
  const spaceNeeded = anyParticipantNeedsSpace(participantModels);
  const stage = relationshipContext?.stage || "unknown";

  // Build the avoid list first — these strategies are counterproductive
  // regardless of what need is identified.
  const avoid = [];

  if (posture === "conservative") {
    avoid.push(...UNSAFE_WHEN_LOW_SAFETY);
  }
  if (spaceNeeded) {
    // Pushing shared momentum or depth when a participant needs space
    // tends to create resistance rather than connection.
    if (!avoid.includes("shared_momentum")) avoid.push("shared_momentum");
    if (!avoid.includes("deepen_understanding")) avoid.push("deepen_understanding");
  }
  if (stage === "strained" || stage === "repairing") {
    // Celebrating progress during a strained period reads as tone-deaf.
    if (!avoid.includes("celebrate_progress")) avoid.push("celebrate_progress");
  }

  // No primary need identified — not enough signal to commit to a strategy.
  // TODO: AI should attempt strategy inference from context even when
  //       primaryNeed is null, using trajectory direction and participant
  //       model patterns as signal.
  if (!primaryNeed) {
    return {
      strategy: "wait_and_observe",
      rationale: "Primary need is not yet resolved. Observing is safer than acting on insufficient signal.",
      riskLevel: RISK.low,
      confidence: 0.70,
      avoid,
      updatedAt: new Date().toISOString(),
    };
  }

  // ---------------------------------------------------------------------------
  // Primary need → strategy mapping
  //
  // TODO: AI will replace this switch with contextual reasoning that weighs
  //       primaryNeed, participantNeeds, tensions, and the avoid list together.
  // ---------------------------------------------------------------------------

  switch (primaryNeed) {

    case "space":
    case "rest":
      return {
        strategy: "protect_space",
        rationale: "A participant needs space. Protecting that need is the highest-value action right now.",
        riskLevel: RISK.low,
        confidence: 0.85,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    case "safety":
      return {
        strategy: "create_safety",
        rationale: "Emotional safety is the precondition for all other strategies. It must be established first.",
        riskLevel: RISK.low,
        confidence: 0.83,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    case "repair":
      // If emotional safety is low, repair attempts risk backfiring.
      // Reduce pressure first; repair becomes viable once safety recovers.
      // TODO: AI should assess whether the safety deficit is acute or structural
      //       and adjust the repair timeline accordingly.
      if (posture === "conservative") {
        return {
          strategy: "reduce_pressure",
          rationale: "Repair is the right direction, but emotional safety is too low to initiate it safely. Reducing pressure creates the conditions for repair.",
          riskLevel: RISK.medium,
          confidence: 0.76,
          avoid,
          updatedAt: new Date().toISOString(),
        };
      }
      if (stability === "low") {
        return {
          strategy: "create_safety",
          rationale: "Emotional stability is insufficient for repair. Building safety is the prior step.",
          riskLevel: RISK.medium,
          confidence: 0.72,
          avoid,
          updatedAt: new Date().toISOString(),
        };
      }
      return {
        strategy: "gentle_repair",
        rationale: "Conditions are stable enough to begin careful reconnection.",
        riskLevel: RISK.medium,
        confidence: 0.74,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    case "acknowledgment":
      return {
        strategy: "acknowledge_effort",
        rationale: "Recognizing effort or contribution strengthens connection without adding pressure.",
        riskLevel: RISK.low,
        confidence: 0.79,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    case "clarity":
      // Clarity about direction is best addressed through shared momentum —
      // but only if safety and stability are sufficient.
      if (posture === "conservative" || stability === "low") {
        return {
          strategy: "wait_and_observe",
          rationale: "Clarity is needed but conditions are not stable enough to pursue it actively. Waiting avoids adding noise.",
          riskLevel: RISK.medium,
          confidence: 0.68,
          avoid,
          updatedAt: new Date().toISOString(),
        };
      }
      return {
        strategy: "shared_momentum",
        rationale: "Rebuilding shared direction is the right response to a clarity deficit when conditions are stable.",
        riskLevel: RISK.medium,
        confidence: 0.71,
        avoid: avoid.includes("shared_momentum")
          ? avoid
          : [...avoid],
        updatedAt: new Date().toISOString(),
      };

    case "depth":
      // Deepening understanding requires both safety and stability.
      if (posture === "conservative" || stability === "low" || spaceNeeded) {
        return {
          strategy: "wait_and_observe",
          rationale: "Depth requires both participants to be ready. Current conditions are not sufficient.",
          riskLevel: RISK.high,
          confidence: 0.65,
          avoid,
          updatedAt: new Date().toISOString(),
        };
      }
      return {
        strategy: "deepen_understanding",
        rationale: "Relationship is stable and safe enough to support a richer investment in mutual understanding.",
        riskLevel: RISK.medium,
        confidence: 0.73,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    case "celebration":
      // Celebrating during a strained or repairing stage is risky.
      if (avoid.includes("celebrate_progress") || stability === "low") {
        return {
          strategy: "acknowledge_effort",
          rationale: "Full celebration is premature given current relational conditions. Acknowledgment is more appropriate.",
          riskLevel: RISK.medium,
          confidence: 0.69,
          avoid,
          updatedAt: new Date().toISOString(),
        };
      }
      return {
        strategy: "celebrate_progress",
        rationale: "Conditions are positive. Marking progress reinforces what is working.",
        riskLevel: RISK.low,
        confidence: 0.78,
        avoid,
        updatedAt: new Date().toISOString(),
      };

    default:
      // TODO: AI should handle unrecognized or compound needs rather than
      //       falling back to wait_and_observe.
      return {
        strategy: "wait_and_observe",
        rationale: "Need pattern is not recognized. Waiting for clearer signal is the safest posture.",
        riskLevel: RISK.low,
        confidence: 0.62,
        avoid,
        updatedAt: new Date().toISOString(),
      };
  }
}

// Exported for external validation or testing.
export { STRATEGIES };
