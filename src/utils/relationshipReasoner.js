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

// ---------------------------------------------------------------------------
// Relationship Reasoner V1
//
// This layer sits between Relationship Needs and Recommendation.
//
// It does NOT generate user-facing language.
// It determines: what should happen, why, how confident we are, and whether
// no intervention is the right call.
//
// The Recommendation layer (not yet implemented) is responsible for translating
// these structured outputs into gentle, contextual, user-facing language.
//
// TODO: Replace all deterministic rules below with LLM reasoning that reads
//       relationshipContext, both participantModels, state, and needs together
//       and produces a calibrated intervention with natural language rationale.
// ---------------------------------------------------------------------------

/**
 * Intervention catalogue.
 * Each entry defines a known intervention type, its default confidence ceiling,
 * and whether it tends toward "when not to act" territory.
 *
 * TODO: AI will extend and weight this catalogue dynamically from outcome signals.
 */
const INTERVENTIONS = {
  allow_rest: {
    id: "allow_rest",
    defaultConfidence: 0.85,
    whenNotToAct: true,
  },
  gentle_reconnect: {
    id: "gentle_reconnect",
    defaultConfidence: 0.74,
    whenNotToAct: false,
  },
  acknowledge_effort: {
    id: "acknowledge_effort",
    defaultConfidence: 0.78,
    whenNotToAct: false,
  },
  create_shared_moment: {
    id: "create_shared_moment",
    defaultConfidence: 0.70,
    whenNotToAct: false,
  },
  revisit_shared_goal: {
    id: "revisit_shared_goal",
    defaultConfidence: 0.72,
    whenNotToAct: false,
  },
  reduce_pressure: {
    id: "reduce_pressure",
    defaultConfidence: 0.80,
    whenNotToAct: true,
  },
  observe_and_wait: {
    id: "observe_and_wait",
    defaultConfidence: 0.65,
    whenNotToAct: true,
  },
  no_action_needed: {
    id: "no_action_needed",
    defaultConfidence: 0.90,
    whenNotToAct: true,
  },
};

/**
 * Map a primary need to an intervention and rationale.
 * Returns { interventionId, rationale, confidence, alternatives }.
 *
 * TODO: AI should replace this mapping with contextual reasoning that
 *       weighs the tension between participantA needs, participantB needs,
 *       and relationship needs simultaneously — rather than resolving on
 *       primaryNeed alone.
 */
function resolveNeedToIntervention(primaryNeed, relationshipContext, relationshipState) {
  // TODO: AI will use relationshipContext.relationshipType to modulate tone and approach.
  void relationshipContext;
  const safety = relationshipState?.emotionalSafety || "medium";
  const stability = relationshipState?.emotionalStability || "medium";

  switch (primaryNeed) {
    case "space":
      return {
        interventionId: "allow_rest",
        rationale: "Current interaction frequency may be increasing pressure rather than reducing it.",
        confidence: INTERVENTIONS.allow_rest.defaultConfidence,
        alternatives: ["observe_and_wait"],
      };

    case "repair":
      // If emotional safety is low, repair attempts may backfire.
      // TODO: AI should read post-conflict behavioral patterns from participantModels
      //       to determine whether repair is safe to initiate or should wait.
      if (safety === "low") {
        return {
          interventionId: "reduce_pressure",
          rationale: "Repair opportunity may exist, but emotional safety is insufficient to initiate safely.",
          confidence: 0.76,
          alternatives: ["observe_and_wait", "allow_rest"],
        };
      }
      return {
        interventionId: "gentle_reconnect",
        rationale: "Repair opportunity detected after emotional stabilization.",
        confidence: INTERVENTIONS.gentle_reconnect.defaultConfidence,
        alternatives: ["acknowledge_effort"],
      };

    case "depth":
      return {
        interventionId: "create_shared_moment",
        rationale: "Relationship has sufficient stability to support a deeper shared experience.",
        confidence: INTERVENTIONS.create_shared_moment.defaultConfidence,
        alternatives: ["revisit_shared_goal"],
      };

    case "clarity":
      return {
        interventionId: "revisit_shared_goal",
        rationale: "Shared direction may have drifted. Revisiting the shared goal can reorient.",
        confidence: INTERVENTIONS.revisit_shared_goal.defaultConfidence,
        alternatives: ["gentle_reconnect"],
      };

    case "acknowledgment":
      return {
        interventionId: "acknowledge_effort",
        rationale: "Recognition of recent effort or contribution may strengthen connection.",
        confidence: INTERVENTIONS.acknowledge_effort.defaultConfidence,
        alternatives: ["create_shared_moment"],
      };

    case "safety":
      // If safety is already low, any active intervention risks making it worse.
      // TODO: AI should assess whether safety deficit is acute or structural,
      //       and route accordingly — structural deficits need participant model revision,
      //       not a single intervention.
      return {
        interventionId: "reduce_pressure",
        rationale: "Emotional safety is the precondition for all other interventions. Reduce pressure first.",
        confidence: INTERVENTIONS.reduce_pressure.defaultConfidence,
        alternatives: ["allow_rest"],
      };

    case "rest":
      return {
        interventionId: "allow_rest",
        rationale: "Both participants may benefit from low-demand presence rather than active engagement.",
        confidence: INTERVENTIONS.allow_rest.defaultConfidence,
        alternatives: ["observe_and_wait"],
      };

    case "celebration":
      // Celebration is appropriate only when stability is medium or high.
      // TODO: AI should check trajectory direction — celebrating during a declining
      //       trajectory can feel hollow or tone-deaf.
      if (stability === "low") {
        return {
          interventionId: "acknowledge_effort",
          rationale: "Full celebration may feel incongruent with current emotional state. Acknowledgment is safer.",
          confidence: 0.68,
          alternatives: ["gentle_reconnect"],
        };
      }
      return {
        interventionId: "create_shared_moment",
        rationale: "Relationship is in a positive state. A shared moment can reinforce momentum.",
        confidence: 0.77,
        alternatives: ["acknowledge_effort"],
      };

    default:
      // TODO: AI should handle unrecognized needs by inferring from context rather
      //       than falling through to observe_and_wait.
      return {
        interventionId: "observe_and_wait",
        rationale: "Need pattern is not yet clear enough to recommend a specific intervention.",
        confidence: INTERVENTIONS.observe_and_wait.defaultConfidence,
        alternatives: ["no_action_needed"],
      };
  }
}

/**
 * reasonRelationship — the core Relationship Reasoner.
 *
 * Determines what intervention (if any) is appropriate given the current
 * relationship context, participant models, state, and resolved needs.
 *
 * @param {object} options
 * @param {object} options.relationshipContext   - output of createRelationshipContext()
 * @param {object[]} options.participantModels   - array of createParticipantModel() outputs
 * @param {object} options.relationshipState     - output of generateRelationshipState()
 * @param {object} options.relationshipNeeds     - { primaryNeed, participantNeeds, tensions }
 *
 * @returns {{
 *   intervention: string,
 *   rationale: string,
 *   confidence: number,
 *   alternatives: string[],
 *   whenNotToAct: boolean,
 *   updatedAt: string
 * }}
 */
export function reasonRelationship({
  relationshipContext = {},
  // TODO: participantModels will be read by AI to adjust intervention confidence
  //       and detect need tensions between participants.
  participantModels = [], // eslint-disable-line no-unused-vars
  relationshipState = {},
  relationshipNeeds = {},
}) {
  const primaryNeed = relationshipNeeds?.primaryNeed || null;

  // If no needs are resolved, the system does not have enough signal to act.
  // TODO: AI should attempt to infer needs from context even when primaryNeed is null.
  if (!primaryNeed) {
    return {
      intervention: INTERVENTIONS.observe_and_wait.id,
      rationale: "Insufficient signal to resolve a primary need. Observation is the safest posture.",
      confidence: INTERVENTIONS.observe_and_wait.defaultConfidence,
      alternatives: ["no_action_needed"],
      whenNotToAct: true,
      updatedAt: new Date().toISOString(),
    };
  }

  const { interventionId, rationale, confidence, alternatives } = resolveNeedToIntervention(
    primaryNeed,
    relationshipContext,
    relationshipState
  );

  const meta = INTERVENTIONS[interventionId] || INTERVENTIONS.observe_and_wait;

  // TODO: AI should adjust confidence based on:
  //       - how well the participantModels are populated (sparse models = lower confidence)
  //       - whether the trajectory direction supports or contradicts the intervention
  //       - whether there are unresolved tensions between participant needs

  return {
    intervention: interventionId,
    rationale,
    confidence,
    alternatives,
    whenNotToAct: meta.whenNotToAct,
    updatedAt: new Date().toISOString(),
  };
}
