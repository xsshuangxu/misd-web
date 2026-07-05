# MisD Relationship Intelligence Architecture

> **Version:** Alpha  
> **Status:** Living document — update as architecture evolves  
> **Purpose:** Defines the conceptual pipeline from raw relationship signals to AI-generated insight and back.

---

## Core Principles

**1. MisD does not optimize for activity frequency.**  
More messages, more memories, more plans — none of these are goals. A quiet relationship that is deeply understood is better served than a busy one that is misread.

**2. MisD optimizes for relationship understanding and quality.**  
The system exists to help people understand what is actually happening in their relationships, and to support quality over quantity in every dimension.

**3. AI should not interfere with relationships.**  
The system surfaces understanding and options. It does not make decisions for people, push behavior, or create dependency. Every recommendation preserves the user's full agency.

**4. AI should understand real needs.**  
This includes psychological complexity: attachment patterns, conflict style, the need for safety, the need for space, hidden intentions, and moments where inaction is the right intervention.

**5. Recommendations should be useful, gentle, contextual, and preserve user agency.**  
A recommendation that is logically correct but emotionally wrong will cause harm. Framing, timing, and tone are part of the intervention itself — not cosmetic.

**6. The system should learn from outcomes and feed them back as new signals.**  
Every recommendation generates a response — acted on or ignored, helpful or not. These outcomes are signals. The pipeline is a loop, not a line.

---

## The Pipeline

```
Raw Signals
    ↓
Signal Interpretation
    ↓
Participant Models
    ↓
Relationship Model
    ↓
Relationship State
    ↓
Trajectory Analysis
    ↓
Needs Resolution
    ↓
Intervention Reasoning
    ↓
Recommendation
    ↓
Outcome / New Signals (feeds back to top)
```

---

## Layer Definitions

---

### 1. Raw Signals

**Responsibility**  
Collect everything observable without interpretation. This layer records facts, not meaning.

**Inputs**
- Messages (count, length, who initiated, response latency)
- Memories (photos, captions, timestamps)
- Reflections (text, mood rating, timestamp)
- Plans (created, completed, abandoned, owner, due date)
- Profile fields (relationship type, shared goal, shared interests, description)
- Edit and deletion history
- Recency and frequency patterns

**Outputs**  
A structured, timestamped event log. No inference applied.

**Why it exists**  
All higher layers must be traceable to observable facts. The system must never confuse what happened with what it means. Raw signals are the ground truth.

**Deterministic or AI**  
Fully deterministic. This is data collection only.

---

### 2. Signal Interpretation

**Responsibility**  
Give raw signals meaning in context. The same signal can mean opposite things depending on who these people are and what kind of relationship this is.

A three-day silence after an argument means something different from a three-day silence during a calm week. Frequent short messages between an anxious person and an avoidant one may signal distress, not connection.

**Inputs**
- Raw signal log
- Relationship type
- Known participant tendencies (if provided)

**Outputs**  
Interpreted signals — annotated events with probable meaning and confidence level.  
Example: `{ event: "silence_3_days", context: "post_conflict", interpretation: "possible_withdrawal", confidence: "medium" }`

**Why it exists**  
Raw signals without interpretation cannot drive meaningful reasoning. This layer is the bridge between data and understanding. Without it, the system would treat all silences, all message bursts, and all plan abandonments as equivalent.

**Deterministic or AI**  
Starts deterministic with simple context rules. Should become AI-generated — this is where language understanding and contextual judgment matter most.

---

### 3. Participant Models

**Responsibility**  
Model each person as an individual — not just as half of a pair. Every person brings their own psychology to a relationship. These tendencies interact with context and with each other.

**Inputs**
- User-provided profile fields (relationship type, tendencies, needs)
- Behavioral patterns inferred from signals (initiation frequency, response times, reflection sentiment over time)

**Outputs**  
A model per participant:
```
{
  attachmentTendency,   // secure | anxious | avoidant | disorganized
  conflictStyle,        // approach | avoid | escalate | withdraw
  needForSpace,         // low | medium | high
  needForSafety,        // low | medium | high
  communicationMode,    // verbal | behavioral | written
  emotionalRegulationStyle
}
```

**Why it exists**  
Without individual models, the system cannot distinguish between a healthy quiet period and avoidant withdrawal. Two people with identical behavior logs may need completely different interventions depending on who they are.

**Deterministic or AI**  
Starts with user-provided context. AI should eventually infer and refine participant models from behavioral patterns — but with careful guardrails, because mischaracterizing a person is harmful.

---

### 4. Relationship Model

**Responsibility**  
Model the relationship itself as a distinct entity — not the sum of two individuals, but the emergent dynamic between them. A relationship has its own history, patterns, strengths, fault lines, developmental stage, and implicit agreements.

**Inputs**
- Both participant models
- Interpreted signal history
- Relationship type
- Profile context (shared goals, shared interests, relationship description)

**Outputs**
```
{
  developmentalStage,  // forming | deepening | stable | strained | repairing
  corePattern,         // the dominant dynamic between participants
  strengths,           // what this relationship does well
  vulnerabilities,     // where it is fragile
  implicitContract,    // unspoken agreements this relationship operates by
  relationshipType
}
```

**Why it exists**  
This is the layer most relationship tools skip entirely. Without a model of the relationship as its own entity, recommendations are generic. Two avoidant people in a long-term stable relationship need very different guidance than two avoidant people in early conflict.

**Deterministic or AI**  
Primarily AI. This requires holding multiple signals in context simultaneously and making judgment calls that resist simple rules.

---

### 5. Relationship State

**Responsibility**  
Answer: where is this relationship right now, across dimensions that actually matter for relationship health?

Not activity metrics. Relational dimensions — the qualities that describe how a relationship is functioning.

**Inputs**
- Relationship model
- Recent interpreted signals

**Outputs**  
Scored dimensions, each `"low" | "medium" | "high"`:
```
{
  connectionDepth,     // how known do these people feel to each other right now?
  emotionalSafety,     // can both people be honest without fear?
  intentionality,      // are they actively choosing this relationship or on autopilot?
  repairCapacity,      // can they recover after difficulty?
  growthOrientation    // are they building something together, or only maintaining?
}
```

**Why it exists**  
State is the honest snapshot of where things stand today. Every intervention must begin from an accurate read of current state — not an idealized or averaged one.

**Deterministic or AI**  
Hybrid. Dimensions are defined deterministically. Scoring should become AI-weighted to handle nuance and edge cases.

---

### 6. Trajectory Analysis

**Responsibility**  
Answer: where is this relationship naturally moving, without any intervention?

State tells you where you are. Trajectory tells you the direction and velocity. A relationship with medium emotional safety that is declining is fundamentally different from one that is slowly recovering.

**Inputs**
- Relationship state over time (multiple snapshots)
- Recent signal patterns
- Participant models

**Outputs**
```
{
  direction,    // deepening | stable | drifting | deteriorating
  velocity,     // slow | moderate | fast
  confidence,   // low | medium | high
  keyDrivers    // which signals are most responsible for the direction
}
```

**Why it exists**  
Intervention timing is everything. The same action taken at different points in a trajectory produces different outcomes. A system that cannot read direction will give advice that arrives too late, too early, or unnecessarily.

**Deterministic or AI**  
AI. Trajectory requires pattern recognition across time that simple rules cannot reliably capture.

---

### 7. Needs Resolution

**Responsibility**  
Answer: what do both participants and the relationship itself need right now?

This is the hardest layer. Each participant has individual needs. The relationship has its own needs as an entity. These are often in tension — one person needs space, the other needs closeness. The system must hold both simultaneously, and surface tensions rather than suppress them.

**Inputs**
- Both participant models
- Relationship state
- Trajectory
- Relationship type

**Outputs**
```
{
  participantA: [needs],
  participantB: [needs],
  relationship:  [needs],
  tensions:      [conflicts between individual and relational needs]
}
```

Where needs may include: `safety`, `depth`, `autonomy`, `repair`, `celebration`, `rest`, `clarity`, `action`, `presence`, `acknowledgment`.

**Why it exists**  
Recommendations without a model of needs produce advice that sounds reasonable but lands wrong. If one participant needs space and the other needs reassurance, the right intervention must address the underlying tension — not just the surface behavior.

**Deterministic or AI**  
AI. Needs resolution requires holding multiple perspectives simultaneously and reasoning about their interaction.

---

### 8. Intervention Reasoning

**Responsibility**  
Given the full picture — state, trajectory, participant models, relationship model, needs, tensions — identify the smallest action with the highest probability of positive movement.

Not the most dramatic action. Not the most obvious one. The highest-leverage one. This layer must also reason explicitly about whether any intervention is appropriate at all. Some relationships need rest. Some need the participants to sit with discomfort rather than resolve it prematurely.

**Inputs**  
All previous layers.

**Outputs**
```
{
  intervention,     // what to do
  rationale,        // why this, why now
  confidence,       // how certain the system is
  alternatives,     // other valid options
  whenNotToAct      // flag: true if inaction is the right call
}
```

**Why it exists**  
This is the purpose of everything above it. Without this layer, the system produces analysis but no direction. Without everything above it, this layer produces direction without understanding.

**Deterministic or AI**  
AI. This is the core reasoning step and requires genuine contextual judgment.

---

### 9. Recommendation

**Responsibility**  
Translate the intervention into language the user can actually receive — framed appropriately for the relationship type, the user's emotional state, and the moment.

A recommendation that is logically correct but emotionally wrong will be rejected or cause harm. Tone, specificity, and framing are not cosmetic — they are part of the intervention itself.

**Inputs**
- Intervention output
- Participant model for the receiving user
- Relationship type

**Outputs**
```
{
  title,
  summary,
  recommendation
}
```
This is the structure rendered in the AI Insight card in `World.jsx`.

**Why it exists**  
The final mile matters. The same insight delivered as a blunt observation versus a gentle prompt produces different responses. The system must understand who it is talking to and adjust accordingly.

**Deterministic or AI**  
AI, with deterministic guardrails:
- Never frame an insight as a diagnosis
- Never assign blame to either participant
- Always preserve the user's agency and right to disagree

---

### 10. Outcome / New Signals

**Responsibility**  
Close the loop. Every recommendation generates a response — acted on or ignored, helpful or not, felt as accurate or off-base. These outcomes are signals that flow back into the pipeline.

**Inputs**
- Whether the recommendation was acknowledged
- Subsequent behavior changes (if any)
- Direct feedback if the user provides it
- Next state snapshot (did the relationship improve, stabilize, or decline?)

**Outputs**  
New entries in the raw signal log. Updated confidence weights for the models above.

**Why it exists**  
A static system that gives the same quality of advice on day one as on day one thousand has not learned anything. The pipeline is a loop. Every interaction deepens the system's understanding of this specific relationship — not relationships in general.

**Deterministic or AI**  
Hybrid. Signal collection is deterministic. Model updating from outcomes is AI.

---

## Current Implementation Status

| Layer | Status |
|---|---|
| Raw Signals | Partial — messages, memories, reflections, plans, profile collected |
| Signal Interpretation | Not yet implemented |
| Participant Models | Not yet — profile captures relationship type only |
| Relationship Model | Not yet |
| Relationship State | V1 implemented (count-based), V2 redesign pending |
| Trajectory Analysis | Not yet |
| Needs Resolution | Not yet |
| Intervention Reasoning | V1 deterministic rules in `relationshipReasoner.js` |
| Recommendation | Rendered in `World.jsx` AI Insight card |
| Outcome / New Signals | Not yet |

---

## File Map

```
src/
  utils/
    relationshipState.js      — Layer 5 (current V1)
    relationshipReasoner.js   — Layer 8 (current V1, deterministic)
  components/
    World.jsx                 — Layer 9 rendering (AI Insight card)
  docs/
    relationshipArchitecture.md — this document
```

---

*This document should be updated as each layer is implemented or redesigned.*
