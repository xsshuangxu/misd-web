// TODO: Replace deterministic scoring with AI reasoning.

/**
 * Score bands: "low" | "medium" | "high"
 *
 * communication     — based on message count
 * emotionalHealth   — based on average reflection rating
 * sharedExperience  — based on memory count
 * futureAlignment   — based on completed vs incomplete plans
 * momentum          — based on overall recent activity (messages + memories + reflections)
 */

function band(value, low, high) {
  if (value <= low) return "low";
  if (value >= high) return "high";
  return "medium";
}

export function generateRelationshipState({
  messages = [],
  reflections = [],
  plans = [],
  memories = [],
} = {}) {
  // Communication: how much has been exchanged
  const communication = band(messages.length, 3, 10);

  // Emotional Health: average reflection rating (1-5 scale)
  const emotionalHealth =
    reflections.length === 0
      ? "medium"
      : band(
          reflections.reduce((sum, r) => sum + r.rating, 0) / reflections.length,
          2,
          4
        );

  // Shared Experience: number of captured memories
  const sharedExperience = band(memories.length, 0, 3);

  // Future Alignment: ratio of completed to total plans
  const totalPlans = plans.length;
  const completedPlans = plans.filter((p) => p.completed).length;
  let futureAlignment;
  if (totalPlans === 0) {
    futureAlignment = "medium";
  } else {
    const ratio = completedPlans / totalPlans;
    futureAlignment = ratio >= 0.7 ? "high" : ratio >= 0.3 ? "medium" : "low";
  }

  // Momentum: combined recent activity signals
  const activityScore = messages.length + memories.length * 2 + reflections.length * 2;
  const momentum = band(activityScore, 4, 14);

  return { communication, emotionalHealth, sharedExperience, futureAlignment, momentum };
}
