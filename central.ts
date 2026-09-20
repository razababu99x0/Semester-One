import type { Chapter, Topic } from "@/types/content";

const T = (t: Topic) => t;

export const central: Chapter = {
  id: "central",
  unit: 4,
  title: "Orbit and Central-Force Planetarium",
  subtitle: "Unit IV — Collisions, scattering, central forces and orbits",
  portal: "A domed planetarium where masses collide, particles scatter and planets sweep equal areas.",
  accent: "#c8a8ff",
  blurb:
    "When forces point along the line joining two bodies, angular momentum is conserved and the motion becomes beautifully predictable. Here you will move masses to find the centre of mass, collide bodies in two dimensions, aim particles at a nucleus and fly a satellite into orbit.",
  topics: [
    T({
      id: "lab-frame",
      title: "Laboratory Frame",
      minutes: 8,
      awaken: {
        hook: "In the laboratory, the target usually sits still and waits to be hit. That simple choice shapes every equation that follows.",
        curiosity: "Why do experimenters and theorists often use different frames for the same collision?",
        realWorld: "Particle accelerators, nuclear scattering experiments, crash testing.",
        objective: "Define the laboratory frame and write collision quantities in it.",
      },
      understand: {
        simple: "The laboratory frame is the frame of the apparatus: the target is at rest and the projectile comes in with some velocity. Everything you actually measure — angles, energies, times — is measured here.",
        analogy: "Watching a game of carrom from your chair: the struck piece is initially still and you see everything from the table's frame.",
        demo: "Fire the projectile at the stationary target and read the laboratory-frame angles.",
        eli5: "The frame of the person doing the experiment.",
      },
      definition: {
        formal:
          "The laboratory (L) frame is the frame in which the target particle is initially at rest and the measuring instruments are fixed. In it the total momentum before collision is p⃗ = m₁u⃗₁, and the scattering angle θ_L and recoil angle φ_L are measured relative to the incident direction.",
        conditions: ["Target initially at rest.", "Detectors fixed in this frame.", "Non-relativistic treatment unless stated."],
        vocabulary: [
          { term: "Projectile", meaning: "Incoming particle of mass m₁ and speed u₁." },
          { term: "Target", meaning: "Particle m₂ initially at rest." },
          { term: "Scattering angle θ_L", meaning: "Angle between the outgoing projectile and the incident direction." },
        ],
        units: "Velocities m s⁻¹, momentum kg m s⁻¹, energies J or MeV.",
        assumptions: ["Isolated two-body system during the collision.", "External forces negligible during the interaction."],
      },
      sim: "collision-2d",
      simBrief: "Set masses and speeds and read the laboratory-frame angles directly.",
      staticFallback:
        "Static diagram: projectile m₁ moving right towards a stationary m₂; after the collision m₁ leaves at angle θ_L above the axis and m₂ recoils at φ_L below it.",
      steps: ["Place the target at rest.", "Give the projectile velocity u₁.", "Apply momentum conservation in two dimensions.", "Apply the energy condition (elastic or with Q value).", "Solve for the outgoing angles and speeds."],
      formulas: [
        {
          tex: "\\vec{p}_{total}=m_1\\vec{u}_1,\\qquad E_{total}=\\frac{1}{2}m_1u_1^{2}",
          name: "Initial quantities in the laboratory frame",
          where: [
            { sym: "m_1", meaning: "projectile mass", unit: "kg" },
            { sym: "u_1", meaning: "incident speed", unit: "m s⁻¹" },
          ],
          conditions: ["Target initially at rest."],
          rearranged: ["v_{cm}=\\frac{m_1u_1}{m_1+m_2}"],
        },
      ],
      examples: [
        {
          title: "Simple: centre-of-mass velocity",
          problem: "A 2 kg mass at 6 m s⁻¹ strikes a stationary 4 kg mass. Find v_cm.",
          steps: ["v_cm = m₁u₁/(m₁ + m₂) = 12/6."],
          answer: "2 m s⁻¹ along the incident direction",
        },
        {
          title: "Exam style: kinetic energy split",
          problem: "For the same collision, what fraction of the kinetic energy is available for internal processes?",
          steps: [
            "Total KE = ½(2)(36) = 36 J.",
            "KE of the centre of mass = ½(6)(2²) = 12 J, which cannot be removed.",
            "Available (C-frame) energy = 36 − 12 = 24 J.",
          ],
          answer: "24 J, i.e. m₂/(m₁+m₂) = 2/3 of the incident energy",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Fixed-target accelerators use the laboratory frame; colliders instead make the lab frame coincide with the centre-of-mass frame." },
        { where: "Engineering", detail: "Vehicle crash tests are analysed in the laboratory frame of the test facility." },
      ],
      mistakes: [
        {
          wrong: "Assuming all incident kinetic energy is available for reactions.",
          why: "Momentum conservation forces the centre of mass to keep moving, locking away part of the energy.",
          right: "Only the centre-of-mass-frame kinetic energy is available.",
          trick: "The centre of mass never stops.",
        },
      ],
      exam: {
        definition: "The laboratory frame is the frame of the measuring apparatus in which the target is initially at rest.",
        derivation: [
          "Before collision: p⃗ = m₁u⃗₁, target at rest.",
          "Centre-of-mass velocity v⃗_cm = m₁u⃗₁/(m₁ + m₂).",
          "Available energy = total KE − KE of the centre of mass.",
          "= ½m₁u₁²·m₂/(m₁ + m₂) = ½μu₁², with μ the reduced mass.",
        ],
        keyFormula: "v_{cm}=\\frac{m_1u_1}{m_1+m_2}",
        twoMark: { q: "Define the laboratory frame.", a: "The frame fixed to the experimental apparatus in which the target particle is initially at rest." },
        fiveMark: { q: "Show that the energy available in a fixed-target collision is ½μu₁².", a: "Total KE = ½m₁u₁². The centre of mass carries ½(m₁+m₂)v_cm² = ½m₁²u₁²/(m₁+m₂). Subtracting gives ½u₁²m₁m₂/(m₁+m₂) = ½μu₁², where μ is the reduced mass." },
        numerical: { q: "A 4 kg body at 10 m s⁻¹ hits a stationary 6 kg body. Find v_cm and the available energy.", a: "v_cm = 40/10 = 4 m s⁻¹; μ = 2.4 kg; available energy = ½(2.4)(100) = 120 J." },
        checklist: ["Definition", "v_cm formula", "Reduced mass", "Available energy", "Lab vs collider"],
      },
      quiz: [
        { id: "p1a", level: "basic", q: "In the laboratory frame the target is initially", options: ["moving", "at rest", "rotating", "accelerating"], answer: 1, hint: "That is the defining feature.", explain: "The target is at rest before the collision." },
        { id: "p1b", level: "basic", q: "v_cm for m₁ striking a stationary m₂ is", options: ["m₁u₁/m₂", "m₁u₁/(m₁+m₂)", "u₁/2", "m₂u₁/m₁"], answer: 1, hint: "Total momentum over total mass.", explain: "v_cm = p_total/M." },
        { id: "p1c", level: "basic", q: "Reduced mass μ equals", options: ["m₁+m₂", "m₁m₂/(m₁+m₂)", "m₁−m₂", "2m₁m₂"], answer: 1, hint: "Standard definition.", explain: "μ = m₁m₂/(m₁+m₂)." },
        { id: "p1d", level: "application", q: "Energy available in a fixed-target collision is", options: ["½m₁u₁²", "½μu₁²", "½m₂u₁²", "zero"], answer: 1, hint: "Subtract centre-of-mass energy.", explain: "½μu₁² is available for internal processes." },
        { id: "p1e", level: "application", q: "For m₁ ≪ m₂, the available energy approaches", options: ["zero", "the full incident energy", "half", "double"], answer: 1, hint: "μ → m₁.", explain: "A heavy target hardly recoils, so nearly all energy is available." },
        { id: "p1f", level: "challenge", q: "Colliders are preferred over fixed targets because", options: ["they are cheaper", "the lab frame is the centre-of-mass frame, so all energy is available", "they use less power", "they need no detectors"], answer: 1, hint: "Total momentum zero.", explain: "With zero total momentum, none of the energy is locked in centre-of-mass motion." },
      ],
      summary: {
        points: [
          "Lab frame = apparatus frame, target at rest.",
          "All measured angles and energies are lab-frame quantities.",
          "v_cm = m₁u₁/(m₁+m₂).",
          "Available energy = ½μu₁².",
          "Colliders eliminate the wasted centre-of-mass energy.",
        ],
        recap: ["v_{cm}=\\frac{m_1u_1}{m_1+m_2}", "\\mu=\\frac{m_1m_2}{m_1+m_2}"],
        memoryMap: ["Apparatus", "Target at rest", "Momentum", "v_cm", "Available energy"],
      },
    }),
    T({
      id: "cm-frame",
      title: "Centre-of-Mass Frame",
      minutes: 10,
      awaken: {
        hook: "Move with the centre of mass and the collision becomes symmetric: two particles approach, touch, and leave back-to-back.",
        curiosity: "Why does a messy collision look so tidy from one particular moving viewpoint?",
        realWorld: "Nuclear reaction analysis, particle physics, astrophysical two-body problems.",
        objective: "Transform between L- and C-frames and exploit the symmetry of the C-frame.",
      },
      understand: {
        simple: "In the centre-of-mass frame the total momentum is zero. The particles always move in exactly opposite directions, before and after the collision, which makes the mathematics far simpler.",
        analogy: "Two skaters pushing apart always move opposite ways as seen from their common centre of mass.",
        demo: "Toggle the view from L to C and watch the collision become symmetric.",
        eli5: "Ride along with the centre of mass and everything is back-to-back.",
      },
      definition: {
        formal:
          "The centre-of-mass (C) frame is the frame in which the total linear momentum is zero, moving with velocity v⃗_cm = Σm_iv⃗_i/Σm_i relative to the laboratory. In it, the two particles have equal and opposite momenta before and after an elastic collision, and their speeds are unchanged by the collision.",
        conditions: ["Isolated system, so v⃗_cm is constant.", "For elastic collisions speeds in the C-frame are unchanged."],
        vocabulary: [
          { term: "C-frame", meaning: "Zero-momentum frame, also called the centre-of-momentum frame." },
          { term: "Scattering angle θ_C", meaning: "Angle turned by the relative velocity in the C-frame." },
        ],
        units: "Standard mechanical SI units.",
        assumptions: ["No external forces during the collision.", "Non-relativistic velocity addition."],
      },
      sim: "collision-2d",
      simBrief: "Switch between L-frame and C-frame views of the same collision.",
      staticFallback:
        "Static diagram: in the C-frame the two particles approach head-on with equal and opposite momenta and separate at angle θ_C, still exactly back-to-back.",
      steps: ["Compute v⃗_cm.", "Subtract it from every velocity to enter the C-frame.", "Apply the symmetric collision rules.", "Add v⃗_cm back to return to the laboratory frame."],
      prediction: "In the C-frame, what is the total momentum after the collision?",
      formulas: [
        {
          tex: "\\vec{v}_{cm}=\\frac{m_1\\vec{u}_1+m_2\\vec{u}_2}{m_1+m_2}",
          name: "Velocity of the centre of mass",
          where: [{ sym: "\\vec{u}_i", meaning: "laboratory velocities before collision", unit: "m s⁻¹" }],
          conditions: ["Isolated system."],
          rearranged: ["\\vec{u}_i^{\\,C}=\\vec{u}_i-\\vec{v}_{cm}", "\\tan\\theta_L=\\frac{\\sin\\theta_C}{\\cos\\theta_C+m_1/m_2}"],
        },
      ],
      examples: [
        {
          title: "Simple: transform to the C-frame",
          problem: "m₁ = 2 kg at 9 m s⁻¹ strikes m₂ = 4 kg at rest. Find both C-frame velocities.",
          steps: ["v_cm = 18/6 = 3 m s⁻¹.", "u₁ᶜ = 9 − 3 = 6 m s⁻¹.", "u₂ᶜ = 0 − 3 = −3 m s⁻¹.", "Check: 2(6) + 4(−3) = 0."],
          answer: "+6 m s⁻¹ and −3 m s⁻¹, total momentum zero",
        },
        {
          title: "Exam style: relation between angles",
          problem: "Derive the relation between the laboratory and centre-of-mass scattering angles for elastic scattering.",
          steps: [
            "In the C-frame the projectile leaves with speed u₁ᶜ at angle θ_C.",
            "Transform back: v_x = u₁ᶜcos θ_C + v_cm, v_y = u₁ᶜ sin θ_C.",
            "tan θ_L = u₁ᶜ sin θ_C/(u₁ᶜcos θ_C + v_cm).",
            "With u₁ᶜ = m₂u₁/(m₁+m₂) and v_cm = m₁u₁/(m₁+m₂), the ratio v_cm/u₁ᶜ = m₁/m₂.",
          ],
          answer: "tan θ_L = sin θ_C/(cos θ_C + m₁/m₂)",
        },
      ],
      realLife: [
        { where: "Space", detail: "Binary star orbits are analysed about their common centre of mass." },
        { where: "Technology", detail: "Collider design maximises centre-of-mass energy, the quantity that matters for creating new particles." },
      ],
      mistakes: [
        {
          wrong: "Believing the C-frame is always at rest in the laboratory.",
          why: "It moves with constant velocity v⃗_cm unless the total momentum happens to be zero in the lab.",
          right: "Compute v⃗_cm and remember it never changes for an isolated system.",
          trick: "Zero momentum, not zero motion.",
        },
      ],
      exam: {
        definition: "The centre-of-mass frame is the frame in which the total momentum of the system is zero; it moves with velocity v⃗_cm relative to the laboratory.",
        derivation: [
          "Total momentum in the lab: P⃗ = m₁u⃗₁ + m₂u⃗₂.",
          "Define v⃗_cm = P⃗/(m₁ + m₂).",
          "In the frame moving with v⃗_cm, each velocity becomes u⃗ᵢ − v⃗_cm.",
          "Total momentum there = P⃗ − (m₁+m₂)v⃗_cm = 0.",
        ],
        keyFormula: "\\tan\\theta_L=\\frac{\\sin\\theta_C}{\\cos\\theta_C+m_1/m_2}",
        twoMark: { q: "What is special about the centre-of-mass frame?", a: "The total linear momentum is zero, so the two particles always move with equal and opposite momenta." },
        fiveMark: { q: "Obtain the relation between scattering angles in the L- and C-frames and discuss the special cases.", a: "Relation as derived. If m₁ = m₂ then θ_L = θ_C/2 and the maximum laboratory scattering angle is 90°. If m₁ ≪ m₂ then θ_L ≈ θ_C. If m₁ > m₂ there is a maximum possible laboratory scattering angle." },
        numerical: { q: "For equal masses with θ_C = 90°, find θ_L.", a: "tan θ_L = sin 90°/(cos 90° + 1) = 1, so θ_L = 45°." },
        checklist: ["Definition and v_cm", "Transformation rule", "Angle relation", "Equal-mass special case", "Constancy of v_cm"],
      },
      quiz: [
        { id: "p2a", level: "basic", q: "In the C-frame the total momentum is", options: ["maximum", "zero", "m₁u₁", "conserved but non-zero"], answer: 1, hint: "That is its definition.", explain: "The centre-of-mass frame is the zero-momentum frame." },
        { id: "p2b", level: "basic", q: "v⃗_cm for an isolated system is", options: ["zero", "constant", "increasing", "random"], answer: 1, hint: "No external force.", explain: "It remains constant throughout the collision." },
        { id: "p2c", level: "basic", q: "In an elastic collision, C-frame speeds after the collision are", options: ["zero", "unchanged", "doubled", "halved"], answer: 1, hint: "Energy plus zero momentum.", explain: "Only the directions change." },
        { id: "p2d", level: "application", q: "For equal masses and θ_C = 60°, θ_L is", options: ["30°", "60°", "45°", "90°"], answer: 0, hint: "θ_L = θ_C/2 for equal masses.", explain: "tan θ_L = sin60/(cos60+1) = tan30°." },
        { id: "p2e", level: "application", q: "For m₁ ≪ m₂, θ_L is approximately", options: ["θ_C/2", "θ_C", "2θ_C", "90°"], answer: 1, hint: "v_cm is small.", explain: "The centre of mass barely moves, so the two frames nearly coincide." },
        { id: "p2f", level: "challenge", q: "If m₁ > m₂, the laboratory scattering angle", options: ["can reach 180°", "has a maximum less than 90°", "is always 90°", "is zero"], answer: 1, hint: "Draw the velocity triangle.", explain: "sin θ_L,max = m₂/m₁, so heavy projectiles cannot be scattered backwards." },
      ],
      summary: {
        points: [
          "C-frame has zero total momentum.",
          "v⃗_cm is constant for an isolated system.",
          "Collisions look symmetric in the C-frame.",
          "tan θ_L = sin θ_C/(cos θ_C + m₁/m₂).",
          "Equal masses give θ_L = θ_C/2.",
        ],
        recap: ["\\vec{v}_{cm}=\\frac{m_1\\vec{u}_1+m_2\\vec{u}_2}{m_1+m_2}", "\\tan\\theta_L=\\frac{\\sin\\theta_C}{\\cos\\theta_C+m_1/m_2}"],
        memoryMap: ["Zero momentum", "Symmetric", "Transform", "Angles", "Back to lab"],
      },
      assemble: { prompt: "Assemble the centre-of-mass velocity.", tokens: ["\\vec{v}_{cm}", "=", "\\frac{m_1\\vec{u}_1+m_2\\vec{u}_2}{m_1+m_2}"] },
    }),
    T({
      id: "centre-of-mass",
      title: "Centre of Mass",
      minutes: 10,
      awaken: {
        hook: "Throw a spanner across the room: it tumbles wildly, yet one invisible point traces a perfect parabola.",
        curiosity: "Can the centre of mass of an object lie outside the object itself?",
        realWorld: "High jumping, vehicle stability, rocket design, gymnastics.",
        objective: "Compute the centre of mass of discrete and continuous systems and use its motion theorem.",
      },
      understand: {
        simple: "The centre of mass is the mass-weighted average position of a system. External forces make it accelerate exactly as if all the mass were concentrated there.",
        analogy: "Balancing a ruler on one finger: the balance point is the centre of mass.",
        demo: "Drag the masses; the centre-of-mass marker follows the weighted average instantly.",
        eli5: "The average place where the mass is.",
      },
      definition: {
        formal:
          "For discrete masses, R⃗_cm = Σm_i r⃗_i/Σm_i; for a continuous body, R⃗_cm = (1/M)∫r⃗ dm. The centre of mass obeys M d²R⃗_cm/dt² = ΣF⃗_ext, so internal forces cannot change its motion.",
        conditions: ["Masses measured in the same frame.", "Centre of mass coincides with centre of gravity only in a uniform gravitational field."],
        vocabulary: [
          { term: "Centre of gravity", meaning: "Point where the total weight acts; equals the centre of mass in a uniform field." },
          { term: "Internal forces", meaning: "Forces between parts of the system; they cancel in pairs." },
        ],
        units: "Metres for position, kg for mass.",
        assumptions: ["Rigid or deformable body treated as a mass distribution.", "Non-relativistic."],
      },
      sim: "centre-of-mass",
      simBrief: "Drag masses and change their values; the centre of mass updates live.",
      staticFallback:
        "Static diagram: two masses on a line, 2 kg at x = 0 and 6 kg at x = 4 m, with the centre of mass marked at x = 3 m, closer to the heavier mass.",
      steps: ["List masses and positions.", "Multiply each mass by its position.", "Sum and divide by the total mass.", "Repeat for each coordinate.", "Use symmetry to shortcut where possible."],
      prediction: "If one mass is made three times heavier, will the centre of mass move towards it or away?",
      formulas: [
        {
          tex: "\\vec{R}_{cm}=\\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}",
          name: "Centre of mass of a discrete system",
          where: [
            { sym: "m_i", meaning: "individual mass", unit: "kg" },
            { sym: "\\vec{r}_i", meaning: "its position vector", unit: "m" },
          ],
          conditions: ["All positions measured in the same frame."],
          rearranged: ["\\vec{R}_{cm}=\\frac{1}{M}\\int \\vec{r}\\,dm", "M\\vec{A}_{cm}=\\sum \\vec{F}_{ext}"],
        },
      ],
      examples: [
        {
          title: "Simple: two-mass system",
          problem: "Find the centre of mass of 2 kg at x = 0 and 6 kg at x = 4 m.",
          steps: ["R = (2×0 + 6×4)/8 = 24/8."],
          answer: "x = 3 m, closer to the heavier mass",
        },
        {
          title: "Exam style: centre of mass of a uniform rod segment",
          problem: "Find the centre of mass of a uniform semicircular wire of radius R.",
          steps: [
            "Use symmetry: it lies on the axis of symmetry.",
            "Linear density λ = M/(πR); element at angle θ has y = R sin θ, dm = λR dθ.",
            "y_cm = (1/M)∫₀^π λR²sin θ dθ = (λR²/M)(2).",
            "Substituting λ gives y_cm = 2R/π.",
          ],
          answer: "y_cm = 2R/π ≈ 0.64R, outside the wire itself",
        },
      ],
      realLife: [
        { where: "Sports", detail: "A Fosbury-flop high jumper arches so that the centre of mass can pass below the bar." },
        { where: "Vehicles", detail: "A low centre of mass improves cornering stability and resists roll-over." },
        { where: "Space", detail: "Spacecraft are balanced about the centre of mass so thrusters do not induce unwanted spin." },
      ],
      mistakes: [
        {
          wrong: "Assuming the centre of mass must lie inside the body.",
          why: "For a ring, a horseshoe or a boomerang it lies in empty space.",
          right: "It is a weighted average point, not a material point.",
          trick: "Average, not atom.",
        },
      ],
      exam: {
        definition: "The centre of mass of a system is the point whose position is the mass-weighted average of all the particle positions; the system responds to external forces as if all its mass were concentrated there.",
        derivation: [
          "For particle i: m_i a⃗_i = F⃗_i^ext + Σ_j F⃗_ij (internal).",
          "Sum over all particles; internal forces cancel in pairs by Newton's third law.",
          "Σm_i a⃗_i = ΣF⃗^ext.",
          "But Σm_i a⃗_i = M d²R⃗_cm/dt².",
          "Hence M A⃗_cm = ΣF⃗^ext.",
        ],
        keyFormula: "M\\vec{A}_{cm}=\\sum \\vec{F}_{ext}",
        twoMark: { q: "Define centre of mass.", a: "The mass-weighted mean position of a system, R⃗_cm = Σm_i r⃗_i/Σm_i." },
        fiveMark: { q: "Show that internal forces cannot change the motion of the centre of mass, and give an example.", a: "Proof as in the derivation. Example: an exploding shell — the fragments fly apart, but the centre of mass continues along the original parabolic trajectory until a fragment lands." },
        numerical: { q: "Find the centre of mass of three 1 kg masses at (0,0), (4,0) and (0,3) m.", a: "x = 4/3 m, y = 1 m." },
        checklist: ["Discrete and continuous formulas", "Motion theorem", "Centre of gravity distinction", "Symmetry shortcuts", "Exploding-shell example"],
      },
      quiz: [
        { id: "p3a", level: "basic", q: "The centre of mass of a uniform ring lies", options: ["on the ring", "at its centre", "outside the plane", "undefined"], answer: 1, hint: "Symmetry.", explain: "At the geometric centre, in empty space." },
        { id: "p3b", level: "basic", q: "Internal forces can change", options: ["the centre-of-mass motion", "nothing about the centre of mass", "the total mass", "the external force"], answer: 1, hint: "Third law pairs cancel.", explain: "Only external forces accelerate the centre of mass." },
        { id: "p3c", level: "basic", q: "For equal masses the centre of mass lies", options: ["at the midpoint", "at the heavier mass", "outside", "at the origin"], answer: 0, hint: "Equal weighting.", explain: "The average of two equal-weighted positions is the midpoint." },
        { id: "p3d", level: "application", q: "For 1 kg at x = 0 and 3 kg at x = 8 m, x_cm is", options: ["4 m", "6 m", "2 m", "8 m"], answer: 1, hint: "(0 + 24)/4.", explain: "x_cm = 6 m." },
        { id: "p3e", level: "application", q: "An exploding shell's centre of mass", options: ["stops", "continues on the original parabola", "moves up", "splits"], answer: 1, hint: "Explosion forces are internal.", explain: "Only gravity acts externally, so the parabola continues." },
        { id: "p3f", level: "challenge", q: "Centre of mass and centre of gravity differ when", options: ["the body is large and the field is non-uniform", "the body is small", "mass is uniform", "never"], answer: 0, hint: "Think of a very tall structure.", explain: "In a non-uniform gravitational field the weighted average of weight differs from that of mass." },
      ],
      summary: {
        points: [
          "R⃗_cm is the mass-weighted mean position.",
          "It may lie outside the body.",
          "M A⃗_cm = ΣF⃗_ext.",
          "Internal forces cannot move it.",
          "It coincides with the centre of gravity in a uniform field.",
        ],
        recap: ["\\vec{R}_{cm}=\\frac{\\sum m_i\\vec{r}_i}{\\sum m_i}", "M\\vec{A}_{cm}=\\sum\\vec{F}_{ext}"],
        memoryMap: ["Masses", "Positions", "Weighted average", "External forces", "Motion theorem"],
      },
    }),
    T({
      id: "two-dimensional-collision",
      title: "Two-Dimensional Collisions",
      minutes: 12,
      awaken: {
        hook: "On a carrom board or a snooker table, every shot is a two-dimensional collision solved in real time by your brain.",
        curiosity: "Why do equal-mass billiard balls always separate at 90° after an elastic glancing collision?",
        realWorld: "Billiards, vehicle crashes, molecular collisions, nuclear physics.",
        objective: "Apply momentum and energy conservation to collisions in a plane.",
      },
      understand: {
        simple: "Momentum is conserved along both axes. If the collision is elastic, kinetic energy is conserved too, which gives a third equation and fixes the outcome once one angle is known.",
        analogy: "Splitting a bill two ways: the totals must match in both currencies (x and y momentum) simultaneously.",
        demo: "Adjust masses, speed and impact parameter and watch the outgoing angles and speeds change.",
        eli5: "Add up momentum sideways and forwards; both must stay the same.",
      },
      definition: {
        formal:
          "In a two-dimensional collision, conservation of momentum gives m₁u⃗₁ + m₂u⃗₂ = m₁v⃗₁ + m₂v⃗₂ (two scalar equations). For an elastic collision, ½m₁u₁² + ½m₂u₂² = ½m₁v₁² + ½m₂v₂². With four unknowns (two speeds, two angles) and three equations, one additional quantity such as the impact parameter or one scattering angle must be specified.",
        conditions: ["Isolated system during the collision.", "Elastic means no kinetic energy converted to internal forms."],
        vocabulary: [
          { term: "Impact parameter b", meaning: "Perpendicular distance between the incident line and the target centre." },
          { term: "Elastic collision", meaning: "Kinetic energy conserved." },
          { term: "Inelastic collision", meaning: "Some kinetic energy converted; coefficient of restitution e < 1." },
        ],
        units: "Speeds m s⁻¹, angles in degrees or radians, momentum kg m s⁻¹.",
        assumptions: ["Point particles or smooth spheres.", "Short-range interaction so external forces act negligibly during impact."],
      },
      sim: "collision-2d",
      simBrief: "Set masses, speed and impact parameter; run the collision and read the outgoing angles.",
      staticFallback:
        "Static diagram: before and after snapshots of a glancing collision with momentum triangles drawn for the x and y directions; for equal masses the outgoing paths are perpendicular.",
      steps: ["Draw the before and after diagrams.", "Resolve momentum along two perpendicular axes.", "Write the energy equation if the collision is elastic.", "Count unknowns and supply the extra datum.", "Solve and check the totals."],
      prediction: "Two identical balls collide elastically and glancingly. What will be the angle between them afterwards?",
      formulas: [
        {
          tex: "m_1u_1=m_1v_1\\cos\\theta+m_2v_2\\cos\\phi,\\qquad 0=m_1v_1\\sin\\theta-m_2v_2\\sin\\phi",
          name: "Momentum conservation in two dimensions (target at rest)",
          where: [
            { sym: "\\theta", meaning: "scattering angle of the projectile", unit: "degree" },
            { sym: "\\phi", meaning: "recoil angle of the target", unit: "degree" },
          ],
          conditions: ["Target initially at rest.", "Isolated system."],
          rearranged: ["\\theta+\\phi=90^{\\circ}\\ (\\text{equal masses, elastic})"],
        },
      ],
      examples: [
        {
          title: "Simple: equal-mass elastic collision",
          problem: "A ball strikes an identical stationary ball elastically and is deflected by 30°. Find the recoil angle.",
          steps: ["For equal masses in an elastic collision, θ + φ = 90°.", "φ = 90° − 30°."],
          answer: "60° on the other side of the incident direction",
        },
        {
          title: "Exam style: prove the 90° rule",
          problem: "Show that equal-mass elastic collisions with one body initially at rest produce perpendicular outgoing paths.",
          steps: [
            "Momentum: u⃗ = v⃗₁ + v⃗₂.",
            "Energy: u² = v₁² + v₂².",
            "Square the momentum equation: u² = v₁² + v₂² + 2v⃗₁·v⃗₂.",
            "Comparing gives v⃗₁·v⃗₂ = 0, so the outgoing velocities are perpendicular (provided neither is zero).",
          ],
          answer: "θ + φ = 90° for equal masses in an elastic collision",
        },
      ],
      realLife: [
        { where: "Sports", detail: "Snooker and carrom players use the 90° rule instinctively for equal-mass balls." },
        { where: "Vehicles", detail: "Accident reconstruction uses two-dimensional momentum conservation to recover pre-impact speeds." },
        { where: "Technology", detail: "Neutron moderation in reactors relies on collisions with light nuclei." },
      ],
      mistakes: [
        {
          wrong: "Applying kinetic-energy conservation to an inelastic collision.",
          why: "Energy goes into deformation, heat and sound.",
          right: "Momentum is always conserved; energy only in elastic collisions.",
          trick: "Momentum always, energy sometimes.",
        },
        {
          wrong: "Using the 90° rule for unequal masses.",
          why: "The proof depends on equal masses.",
          right: "Solve the general equations for unequal masses.",
          trick: "Equal masses only.",
        },
      ],
      exam: {
        definition: "A two-dimensional collision is one in which the particles move in a plane; momentum is conserved along both axes and kinetic energy is conserved as well if the collision is elastic.",
        derivation: [
          "Resolve momentum along the incident direction and perpendicular to it.",
          "m₁u₁ = m₁v₁cos θ + m₂v₂cos φ.",
          "0 = m₁v₁sin θ − m₂v₂sin φ.",
          "For an elastic collision add ½m₁u₁² = ½m₁v₁² + ½m₂v₂².",
          "Three equations with four unknowns: one more datum is needed.",
        ],
        keyFormula: "\\theta+\\phi=90^{\\circ}\\ (m_1=m_2,\\ \\text{elastic})",
        twoMark: { q: "How many independent equations describe an elastic two-dimensional collision?", a: "Three: two momentum components plus the kinetic-energy equation; a fourth datum such as one angle or the impact parameter must be supplied." },
        fiveMark: { q: "Prove that two equal masses separate at right angles after an elastic collision when one is initially at rest.", a: "Proof as in the worked example, via squaring the momentum equation and comparing with the energy equation." },
        numerical: { q: "A 2 kg body at 5 m s⁻¹ hits a stationary 2 kg body and moves off at 37° with 4 m s⁻¹. Find the other body's speed.", a: "Perpendicular momentum: 2(4)sin37° = 2 v₂ sin φ with φ = 53°, so v₂ = 4(0.602)/0.799 ≈ 3.0 m s⁻¹." },
        checklist: ["Momentum in both directions", "Energy condition for elastic", "Counting unknowns", "90° rule and its limits", "Coefficient of restitution"],
      },
      quiz: [
        { id: "p4a", level: "basic", q: "In every collision the conserved quantity is", options: ["kinetic energy", "momentum", "speed", "angle"], answer: 1, hint: "Always true for isolated systems.", explain: "Momentum is conserved in all collisions." },
        { id: "p4b", level: "basic", q: "An elastic collision conserves", options: ["momentum only", "kinetic energy only", "both momentum and kinetic energy", "neither"], answer: 2, hint: "Definition of elastic.", explain: "Both are conserved." },
        { id: "p4c", level: "basic", q: "For equal masses, elastic, one at rest, θ + φ equals", options: ["45°", "90°", "180°", "60°"], answer: 1, hint: "The billiards rule.", explain: "The outgoing velocities are perpendicular." },
        { id: "p4d", level: "application", q: "The coefficient of restitution for a perfectly inelastic collision is", options: ["1", "0", "0.5", "∞"], answer: 1, hint: "Bodies stick together.", explain: "e = 0 means no separation velocity." },
        { id: "p4e", level: "application", q: "In a two-dimensional elastic collision the number of unknowns is", options: ["2", "3", "4", "5"], answer: 2, hint: "Two speeds and two angles.", explain: "Four unknowns need four pieces of information." },
        { id: "p4f", level: "challenge", q: "A light particle striking a much heavier stationary one is scattered", options: ["forward only", "through angles up to 180°", "at 90° always", "not at all"], answer: 1, hint: "Think of a ball bouncing off a wall.", explain: "With m₁ ≪ m₂ the projectile can be back-scattered through nearly 180°." },
      ],
      summary: {
        points: [
          "Momentum conserved along both axes.",
          "Energy also conserved if elastic.",
          "Four unknowns need four pieces of data.",
          "Equal masses, elastic: θ + φ = 90°.",
          "Restitution coefficient quantifies inelasticity.",
        ],
        recap: ["m_1\\vec{u}_1=m_1\\vec{v}_1+m_2\\vec{v}_2", "\\theta+\\phi=90^{\\circ}"],
        memoryMap: ["Before", "Resolve", "Conserve", "Solve", "After"],
      },
      assemble: { prompt: "Assemble momentum conservation for a collision.", tokens: ["m_1\\vec{u}_1", "+", "m_2\\vec{u}_2", "=", "m_1\\vec{v}_1", "+", "m_2\\vec{v}_2"] },
    }),
    T({
      id: "scattering-angle",
      title: "Scattering Angle",
      minutes: 9,
      awaken: {
        hook: "Aim slightly off-centre and the deflection changes completely. The scattering angle is a fingerprint of the force law.",
        curiosity: "How can measuring deflection angles reveal the structure of something you can never see?",
        realWorld: "Rutherford's nuclear experiment, electron microscopy, radar cross-sections.",
        objective: "Relate the scattering angle to the impact parameter and the interaction.",
      },
      understand: {
        simple: "The scattering angle is how much the projectile's direction is turned by the interaction. A head-on approach turns it most; a distant pass barely deflects it.",
        analogy: "Rolling a marble past a magnet: the closer it passes, the more its path bends.",
        demo: "Drag the impact parameter and watch the scattering angle change continuously.",
        eli5: "How much the path bends.",
      },
      definition: {
        formal:
          "The scattering angle θ is the angle between the initial and final directions of the projectile's velocity. It depends on the impact parameter b, the interaction potential and the relative energy. In the C-frame, for a repulsive Coulomb interaction, tan(θ_C/2) = k q₁q₂/(2Eb) with E the relative kinetic energy.",
        conditions: ["Measured from the incident direction.", "L- and C-frame values differ unless the target is very heavy."],
        vocabulary: [
          { term: "Impact parameter b", meaning: "Perpendicular offset of the incident line from the scattering centre." },
          { term: "Recoil angle φ", meaning: "Angle at which the target moves after the collision." },
          { term: "Head-on collision", meaning: "b = 0, giving maximum deflection." },
        ],
        units: "Angles in degrees or radians; b in metres (or fm in nuclear physics).",
        assumptions: ["Central force.", "Single scattering event.", "Classical trajectories."],
      },
      sim: "rutherford",
      simBrief: "Change the impact parameter and energy; the trajectory and scattering angle update live.",
      staticFallback:
        "Static diagram: several hyperbolic trajectories past a fixed repulsive centre; small b gives a large deflection, large b gives a nearly straight path.",
      steps: ["Fix the target and the interaction.", "Choose the impact parameter b.", "Integrate the orbit or use the standard formula.", "Read the asymptotic deflection angle.", "Repeat for a range of b to build the angular distribution."],
      prediction: "As b increases towards infinity, what happens to the scattering angle?",
      formulas: [
        {
          tex: "\\tan\\frac{\\theta_C}{2}=\\frac{k q_1 q_2}{2Eb}",
          name: "Coulomb scattering angle (C-frame)",
          where: [
            { sym: "b", meaning: "impact parameter", unit: "m" },
            { sym: "E", meaning: "relative kinetic energy", unit: "J" },
            { sym: "k", meaning: "1/4πε₀", unit: "N m² C⁻²" },
          ],
          conditions: ["Repulsive inverse-square force.", "Classical, non-relativistic treatment."],
          rearranged: ["b=\\frac{k q_1 q_2}{2E}\\cot\\frac{\\theta_C}{2}"],
        },
      ],
      examples: [
        {
          title: "Simple: limiting cases",
          problem: "What scattering angle corresponds to b = 0 and to very large b?",
          steps: ["b = 0 gives tan(θ/2) → ∞, so θ → 180°.", "Large b gives tan(θ/2) → 0, so θ → 0."],
          answer: "Head-on: back-scattering at 180°; distant pass: almost no deflection",
        },
        {
          title: "Exam style: impact parameter for a given angle",
          problem: "For alpha particles of 5 MeV on gold (Z = 79), find b for 90° scattering.",
          steps: [
            "b = (kq₁q₂/2E)cot(45°) = kq₁q₂/2E.",
            "q₁q₂ = (2e)(79e) = 158e².",
            "k e² = 1.44 MeV·fm, so k q₁q₂ = 227.5 MeV·fm.",
            "b = 227.5/(2 × 5) fm.",
          ],
          answer: "b ≈ 22.8 fm",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Rutherford backscattering spectrometry identifies thin-film composition from scattering angles." },
        { where: "Space", detail: "Gravitational slingshots are attractive-force scattering events used to redirect spacecraft." },
      ],
      mistakes: [
        {
          wrong: "Confusing the laboratory and centre-of-mass scattering angles.",
          why: "They differ unless the target is much heavier than the projectile.",
          right: "Use tan θ_L = sin θ_C/(cos θ_C + m₁/m₂) to convert.",
          trick: "State the frame with the angle.",
        },
      ],
      exam: {
        definition: "The scattering angle is the angle through which the direction of motion of the projectile is turned as a result of the interaction.",
        derivation: [
          "For a central force, angular momentum L = μ v_∞ b is conserved.",
          "Energy conservation gives the radial equation of motion.",
          "Integrating the orbit equation between the asymptotes gives the deflection.",
          "For the Coulomb potential the orbit is a hyperbola, yielding tan(θ_C/2) = kq₁q₂/(2Eb).",
        ],
        keyFormula: "b=\\frac{k q_1 q_2}{2E}\\cot\\frac{\\theta_C}{2}",
        twoMark: { q: "Define impact parameter and scattering angle.", a: "The impact parameter is the perpendicular distance from the scattering centre to the undeflected incident line; the scattering angle is the angle between the initial and final directions of motion." },
        fiveMark: { q: "Discuss how the scattering angle varies with impact parameter for a repulsive Coulomb field.", a: "θ decreases monotonically as b increases: b = 0 gives 180° back-scattering, while b → ∞ gives θ → 0. Small-angle scattering is therefore overwhelmingly more likely, which is why Rutherford's rare large-angle events implied a tiny massive nucleus." },
        numerical: { q: "If b is doubled at fixed energy, how does tan(θ/2) change?", a: "It halves, so the scattering angle decreases." },
        checklist: ["Definitions", "b–θ relation", "Limiting cases", "Frame dependence", "Link to Rutherford"],
      },
      quiz: [
        { id: "p5a", level: "basic", q: "The impact parameter is measured", options: ["along the path", "perpendicular to the incident line", "after the collision", "in radians"], answer: 1, hint: "Perpendicular offset.", explain: "It is the perpendicular distance from the centre to the incident line." },
        { id: "p5b", level: "basic", q: "A head-on collision has b equal to", options: ["0", "1", "∞", "b_max"], answer: 0, hint: "No offset.", explain: "b = 0 gives maximum deflection." },
        { id: "p5c", level: "basic", q: "As b increases, the scattering angle", options: ["increases", "decreases", "stays the same", "oscillates"], answer: 1, hint: "Distant passes barely bend.", explain: "θ falls monotonically with b for a Coulomb field." },
        { id: "p5d", level: "application", q: "tan(θ_C/2) is proportional to", options: ["bE", "1/(bE)", "b/E", "E/b²"], answer: 1, hint: "Look at the formula.", explain: "tan(θ/2) = kq₁q₂/(2Eb)." },
        { id: "p5e", level: "application", q: "Doubling the energy at fixed b", options: ["doubles θ", "reduces the deflection", "has no effect", "reverses the direction"], answer: 1, hint: "Faster particles are deflected less.", explain: "tan(θ/2) ∝ 1/E." },
        { id: "p5f", level: "challenge", q: "Back-scattering at nearly 180° in Rutherford's experiment implied", options: ["a diffuse atom", "a small massive nucleus", "electrons at the centre", "no nucleus"], answer: 1, hint: "Only a concentrated charge can turn an alpha around.", explain: "A spread-out positive charge could never produce such large deflections." },
      ],
      summary: {
        points: [
          "Scattering angle measures how much the path bends.",
          "It is controlled by the impact parameter and energy.",
          "b = 0 gives 180°; large b gives ~0°.",
          "tan(θ_C/2) = kq₁q₂/(2Eb) for Coulomb scattering.",
          "L- and C-frame angles differ for comparable masses.",
        ],
        recap: ["\\tan\\frac{\\theta_C}{2}=\\frac{kq_1q_2}{2Eb}", "b=\\frac{kq_1q_2}{2E}\\cot\\frac{\\theta_C}{2}"],
        memoryMap: ["Aim", "Impact parameter", "Bend", "Angle", "Force law"],
      },
    }),
    T({
      id: "recoil-angle",
      title: "Recoil Angle and Velocities in C- and L-Frames",
      minutes: 10,
      awaken: {
        hook: "Every scattered projectile leaves a recoiling target behind. Track both and the collision is fully mapped.",
        curiosity: "Why can a heavy projectile never be scattered backwards by a light target?",
        realWorld: "Nuclear recoil detection, dark-matter detectors, billiards.",
        objective: "Compute recoil angles and transform velocities between the C- and L-frames.",
      },
      understand: {
        simple: "In the C-frame the two particles always fly apart back to back. Adding the centre-of-mass velocity back converts this simple picture into the angles you measure in the laboratory.",
        analogy: "Watching fireworks from a moving car: the symmetric burst looks skewed because of your own motion.",
        demo: "Switch between frames and watch the symmetric C-frame pattern turn into the skewed L-frame pattern.",
        eli5: "Add the centre-of-mass velocity back to get real-world angles.",
      },
      definition: {
        formal:
          "For a target initially at rest, the recoil angle in the laboratory is φ_L = (π − θ_C)/2 for an elastic collision. Velocity transformations are v⃗_L = v⃗_C + v⃗_cm for each particle, with C-frame speeds u₁ᶜ = m₂u₁/(m₁+m₂) and u₂ᶜ = m₁u₁/(m₁+m₂) unchanged in magnitude by an elastic collision.",
        conditions: ["Elastic collision.", "Target at rest in the laboratory before impact."],
        vocabulary: [
          { term: "Recoil", meaning: "Motion of the initially stationary target after the collision." },
          { term: "Back-to-back", meaning: "Opposite directions in the C-frame." },
        ],
        units: "Angles in degrees; velocities in m s⁻¹.",
        assumptions: ["Classical mechanics.", "No internal excitation for the elastic case."],
      },
      sim: "collision-2d",
      simBrief: "Read θ_L and φ_L for any mass ratio and compare with the C-frame values.",
      staticFallback:
        "Static velocity-triangle diagram: the C-frame outgoing velocity added to v⃗_cm gives the laboratory velocity; the geometry immediately shows the maximum laboratory scattering angle when m₁ > m₂.",
      steps: ["Compute v_cm and the C-frame speeds.", "Choose θ_C.", "Draw the velocity triangle for each particle.", "Add v⃗_cm.", "Read off the laboratory angles and speeds."],
      formulas: [
        {
          tex: "\\phi_L=\\frac{\\pi-\\theta_C}{2},\\qquad \\tan\\theta_L=\\frac{\\sin\\theta_C}{\\cos\\theta_C+m_1/m_2}",
          name: "Recoil and scattering angles",
          where: [
            { sym: "\\theta_C", meaning: "C-frame scattering angle", unit: "rad" },
            { sym: "\\phi_L", meaning: "laboratory recoil angle", unit: "rad" },
          ],
          conditions: ["Elastic collision with target initially at rest."],
          rearranged: ["v_2=\\frac{2m_1u_1}{m_1+m_2}\\cos\\phi_L"],
        },
      ],
      examples: [
        {
          title: "Simple: recoil angle",
          problem: "For θ_C = 60°, find the laboratory recoil angle.",
          steps: ["φ_L = (180° − 60°)/2."],
          answer: "60°",
        },
        {
          title: "Exam style: maximum laboratory scattering angle",
          problem: "Show that for m₁ > m₂ there is a maximum laboratory scattering angle, and find it for m₁ = 4m₂.",
          steps: [
            "In the velocity triangle, the laboratory velocity is v⃗_cm plus a C-frame velocity of fixed magnitude u₁ᶜ.",
            "Since v_cm > u₁ᶜ when m₁ > m₂, the tip of the vector traces a circle that does not enclose the origin.",
            "The maximum angle satisfies sin θ_max = u₁ᶜ/v_cm = m₂/m₁.",
            "For m₁ = 4m₂: sin θ_max = 0.25.",
          ],
          answer: "θ_max = 14.5°; heavier projectiles are confined to forward angles",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Dark-matter and neutron detectors identify events by measuring nuclear recoil energy and direction." },
        { where: "Sports", detail: "Predicting where the struck ball goes in carrom or snooker is exactly a recoil-angle calculation." },
      ],
      mistakes: [
        {
          wrong: "Using φ_L = (π − θ_C)/2 for inelastic collisions.",
          why: "The relation assumes C-frame speeds are unchanged, which requires elasticity.",
          right: "For inelastic collisions solve the momentum and energy equations directly.",
          trick: "Elastic only.",
        },
      ],
      exam: {
        definition: "The recoil angle is the laboratory angle at which the initially stationary target moves after the collision; for an elastic collision φ_L = (π − θ_C)/2.",
        derivation: [
          "In the C-frame the target moves opposite to the projectile, at angle π − θ_C, with speed v_cm.",
          "Transforming to the laboratory adds v⃗_cm, of the same magnitude.",
          "The resulting triangle is isosceles.",
          "Hence the laboratory recoil angle is half the exterior angle: φ_L = (π − θ_C)/2.",
        ],
        keyFormula: "\\phi_L=\\frac{\\pi-\\theta_C}{2}",
        twoMark: { q: "Write the relation between recoil angle and C-frame scattering angle.", a: "φ_L = (π − θ_C)/2 for an elastic collision with the target initially at rest." },
        fiveMark: { q: "Obtain the relations between L- and C-frame angles and discuss the three mass cases.", a: "Using the velocity triangles: tan θ_L = sin θ_C/(cos θ_C + m₁/m₂) and φ_L = (π − θ_C)/2. If m₁ < m₂, all laboratory angles up to 180° are possible; if m₁ = m₂, θ_L = θ_C/2 with a maximum of 90°; if m₁ > m₂, sin θ_max = m₂/m₁ limits the scattering to forward angles." },
        numerical: { q: "For equal masses with θ_C = 90°, find both laboratory angles.", a: "θ_L = 45° and φ_L = 45°, consistent with θ_L + φ_L = 90°." },
        checklist: ["Velocity triangle method", "Recoil formula", "Angle transformation", "Maximum angle for heavy projectiles", "Elastic assumption"],
      },
      quiz: [
        { id: "p6a", level: "basic", q: "In the C-frame the two particles move", options: ["in the same direction", "back to back", "at 90°", "randomly"], answer: 1, hint: "Zero total momentum.", explain: "Their momenta are equal and opposite." },
        { id: "p6b", level: "basic", q: "φ_L equals", options: ["θ_C", "(π − θ_C)/2", "π − θ_C", "θ_C/2"], answer: 1, hint: "Isosceles triangle.", explain: "φ_L = (π − θ_C)/2 for elastic collisions." },
        { id: "p6c", level: "basic", q: "The laboratory velocity is obtained by", options: ["subtracting v_cm", "adding v⃗_cm to the C-frame velocity", "doubling it", "reversing it"], answer: 1, hint: "Galilean addition.", explain: "v⃗_L = v⃗_C + v⃗_cm." },
        { id: "p6d", level: "application", q: "For m₁ = m₂ elastic, θ_L + φ_L equals", options: ["45°", "90°", "180°", "θ_C"], answer: 1, hint: "The billiards rule.", explain: "The outgoing velocities are perpendicular." },
        { id: "p6e", level: "application", q: "For m₁ = 2m₂, the maximum laboratory scattering angle is", options: ["30°", "45°", "60°", "90°"], answer: 0, hint: "sin θ_max = m₂/m₁.", explain: "sin θ_max = 0.5, so θ_max = 30°." },
        { id: "p6f", level: "challenge", q: "A very light projectile on a heavy target can be scattered", options: ["only forward", "up to nearly 180°", "at exactly 90°", "not at all"], answer: 1, hint: "Bouncing off a wall.", explain: "With m₁ ≪ m₂, v_cm is small and all angles are accessible." },
      ],
      summary: {
        points: [
          "C-frame motion is always back-to-back.",
          "φ_L = (π − θ_C)/2 for elastic collisions.",
          "Laboratory velocities come from adding v⃗_cm.",
          "Equal masses give θ_L + φ_L = 90°.",
          "Heavy projectiles have a maximum scattering angle sin⁻¹(m₂/m₁).",
        ],
        recap: ["\\phi_L=\\frac{\\pi-\\theta_C}{2}", "\\sin\\theta_{max}=\\frac{m_2}{m_1}"],
        memoryMap: ["C-frame", "Velocity triangle", "Add v_cm", "Lab angles", "Mass ratio"],
      },
    }),
    T({
      id: "cross-section",
      title: "Cross-Section",
      minutes: 10,
      awaken: {
        hook: "Physicists measure the 'size' of an interaction in units of area — even when nothing is actually touching.",
        curiosity: "How can a force that reaches to infinity have a finite effective area?",
        realWorld: "Nuclear reactors, radiation shielding, particle detectors, atmospheric chemistry.",
        objective: "Define total and differential cross-sections and compute them from the b–θ relation.",
      },
      understand: {
        simple: "The cross-section is the effective target area that a projectile must hit to produce a given outcome. A bigger cross-section means the event happens more often.",
        analogy: "Throwing darts at a board: the probability of hitting the bullseye is proportional to its area.",
        demo: "Fire many particles at random impact parameters and watch the angular distribution build up.",
        eli5: "The effective size of the target for a particular result.",
      },
      definition: {
        formal:
          "The differential cross-section dσ/dΩ is defined so that the number of particles scattered per unit time into solid angle dΩ equals (incident flux) × (dσ/dΩ) × dΩ. For a classical central force with a monotonic b(θ), dσ/dΩ = (b/sin θ)|db/dθ|. The total cross-section is σ = ∫(dσ/dΩ)dΩ.",
        conditions: ["Thin target so each particle scatters at most once.", "Uniform incident beam.", "Azimuthal symmetry for the quoted formula."],
        vocabulary: [
          { term: "Barn", meaning: "Unit of cross-section, 1 b = 10⁻²⁸ m²." },
          { term: "Solid angle dΩ", meaning: "2π sin θ dθ for azimuthally symmetric scattering, in steradians." },
          { term: "Flux", meaning: "Particles per unit area per unit time." },
        ],
        units: "σ in m² or barns; dσ/dΩ in m² sr⁻¹.",
        assumptions: ["Classical trajectories.", "Single-scattering (thin target) approximation."],
      },
      sim: "rutherford",
      simBrief: "Fire a beam with randomly distributed impact parameters and accumulate the angular histogram.",
      staticFallback:
        "Static diagram: an annular ring of radius b and width db in the incident beam maps onto a cone of scattering angles between θ and θ + dθ; equating the two areas gives the differential cross-section.",
      steps: ["Find b(θ) from the dynamics.", "Consider the annulus 2πb db of the incident beam.", "It maps to the solid angle 2π sin θ dθ.", "Equate and solve for dσ/dΩ.", "Integrate over angles for the total cross-section."],
      prediction: "For Coulomb scattering, will the differential cross-section be larger at small or at large angles?",
      formulas: [
        {
          tex: "\\frac{d\\sigma}{d\\Omega}=\\frac{b}{\\sin\\theta}\\left|\\frac{db}{d\\theta}\\right|",
          name: "Classical differential cross-section",
          where: [
            { sym: "b", meaning: "impact parameter for the angle θ", unit: "m" },
            { sym: "d\\Omega", meaning: "element of solid angle", unit: "sr" },
          ],
          conditions: ["Monotonic b(θ).", "Azimuthal symmetry."],
          rearranged: ["\\sigma=\\int \\frac{d\\sigma}{d\\Omega}d\\Omega"],
          dimensional: "[\\sigma]=L^{2}",
        },
      ],
      examples: [
        {
          title: "Simple: hard-sphere cross-section",
          problem: "Find the total cross-section for a point particle striking a hard sphere of radius R.",
          steps: ["Any impact parameter b < R results in a collision.", "Effective area = πR²."],
          answer: "σ = πR²",
        },
        {
          title: "Exam style: Rutherford differential cross-section",
          problem: "Derive dσ/dΩ for Coulomb scattering.",
          steps: [
            "b = (kq₁q₂/2E)cot(θ/2).",
            "db/dθ = −(kq₁q₂/4E)cosec²(θ/2).",
            "Substitute into dσ/dΩ = (b/sin θ)|db/dθ|.",
            "Using sin θ = 2 sin(θ/2)cos(θ/2) gives the Rutherford formula.",
          ],
          answer: "dσ/dΩ = (kq₁q₂/4E)²cosec⁴(θ/2)",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Neutron absorption cross-sections determine reactor control-rod materials." },
        { where: "Engineering", detail: "Radiation shielding thickness is computed from attenuation cross-sections." },
      ],
      mistakes: [
        {
          wrong: "Thinking the cross-section is the physical size of the particle.",
          why: "It is an effective interaction area that depends on energy and on the process considered.",
          right: "Cross-section is a probability measure expressed in units of area.",
          trick: "Area of chance, not of matter.",
        },
      ],
      exam: {
        definition: "The differential cross-section is the effective target area per unit solid angle for scattering into a given direction; the total cross-section is its integral over all angles.",
        derivation: [
          "Particles with impact parameters between b and b + db pass through an annulus of area 2πb db.",
          "They emerge between θ and θ + dθ, into solid angle dΩ = 2π sin θ dθ.",
          "Equating: (dσ/dΩ)2π sin θ dθ = 2πb db.",
          "Hence dσ/dΩ = (b/sin θ)|db/dθ|.",
        ],
        keyFormula: "\\frac{d\\sigma}{d\\Omega}=\\frac{b}{\\sin\\theta}\\left|\\frac{db}{d\\theta}\\right|",
        twoMark: { q: "Define cross-section and give its unit.", a: "It is the effective area presented by a target for a specified interaction; the SI unit is m², and the barn (10⁻²⁸ m²) is commonly used in nuclear physics." },
        fiveMark: { q: "Derive the classical expression for the differential cross-section and apply it to hard spheres.", a: "Derivation as above. For hard-sphere scattering of radius R, b = R cos(θ/2), giving dσ/dΩ = R²/4, which is isotropic and integrates to σ = πR²." },
        numerical: { q: "Convert 0.5 barn to m².", a: "0.5 × 10⁻²⁸ = 5 × 10⁻²⁹ m²." },
        checklist: ["Definition", "Annulus-to-cone mapping", "Formula", "Barn unit", "Rutherford result"],
      },
      quiz: [
        { id: "p7a", level: "basic", q: "The SI unit of cross-section is", options: ["m", "m²", "m³", "sr"], answer: 1, hint: "It is an area.", explain: "Cross-sections are areas, measured in m² or barns." },
        { id: "p7b", level: "basic", q: "One barn equals", options: ["10⁻²⁴ m²", "10⁻²⁸ m²", "10⁻³⁰ m²", "10⁻¹⁵ m²"], answer: 1, hint: "Nuclear scale.", explain: "1 b = 10⁻²⁸ m²." },
        { id: "p7c", level: "basic", q: "A larger cross-section means the process is", options: ["less likely", "more likely", "impossible", "slower"], answer: 1, hint: "Bigger target.", explain: "Probability scales with the effective area." },
        { id: "p7d", level: "application", q: "For a hard sphere of radius R, σ equals", options: ["2πR", "πR²", "4πR²", "R²"], answer: 1, hint: "Projected area.", explain: "σ = πR²." },
        { id: "p7e", level: "application", q: "The element of solid angle for azimuthal symmetry is", options: ["sin θ dθ", "2π sin θ dθ", "dθ", "2π dθ"], answer: 1, hint: "Integrate over azimuth.", explain: "dΩ = 2π sin θ dθ." },
        { id: "p7f", level: "challenge", q: "The Rutherford total cross-section diverges because", options: ["the formula is wrong", "the Coulomb force has infinite range, so small-angle scattering is unbounded", "energy is infinite", "the nucleus is large"], answer: 1, hint: "Look at θ → 0.", explain: "cosec⁴(θ/2) diverges at small angles; real screening by atomic electrons cuts it off." },
      ],
      summary: {
        points: [
          "Cross-section is an effective area measuring probability.",
          "dσ/dΩ = (b/sin θ)|db/dθ|.",
          "Total cross-section integrates over all solid angles.",
          "1 barn = 10⁻²⁸ m².",
          "Rutherford scattering diverges at small angles because of the infinite range of the Coulomb force.",
        ],
        recap: ["\\frac{d\\sigma}{d\\Omega}=\\frac{b}{\\sin\\theta}\\left|\\frac{db}{d\\theta}\\right|", "\\sigma=\\pi R^{2}"],
        memoryMap: ["Beam", "Annulus", "Solid angle", "Ratio", "Probability"],
      },
    }),
    T({
      id: "rutherford-scattering",
      title: "Rutherford Scattering",
      minutes: 13,
      awaken: {
        hook: "Rutherford said it was as if you had fired a shell at tissue paper and it bounced back at you. The atom had a nucleus.",
        curiosity: "What could possibly turn a fast alpha particle right around?",
        realWorld: "Discovery of the nucleus, materials analysis, ion-beam techniques.",
        objective: "Derive and interpret the Rutherford scattering formula.",
      },
      understand: {
        simple: "Alpha particles fired at a thin gold foil mostly passed straight through, but a tiny fraction came back. Only a very small, very dense, positively charged core could do that.",
        analogy: "Rolling marbles at a curtain: nearly all pass through, but the rare rebound reveals a hidden metal bead.",
        demo: "Fire alphas at a range of impact parameters and accumulate the characteristic cosec⁴(θ/2) distribution.",
        eli5: "Most go straight through; a few bounce back, proving there is a tiny hard centre.",
      },
      definition: {
        formal:
          "For non-relativistic point charges interacting through the Coulomb force, the differential cross-section is dσ/dΩ = (Z₁Z₂e²/16πε₀E)²cosec⁴(θ/2), where E is the kinetic energy of the incident particle and θ the scattering angle. The trajectory is a hyperbola with the nucleus at the external focus.",
        conditions: [
          "Point-like, spinless charges interacting only through the Coulomb force.",
          "Single scattering in a thin foil.",
          "Non-relativistic energies and no nuclear-force contact (below the Coulomb barrier).",
        ],
        vocabulary: [
          { term: "Distance of closest approach", meaning: "r_min = kq₁q₂/E for a head-on collision." },
          { term: "cosec⁴ law", meaning: "Strong preference for small-angle scattering." },
        ],
        units: "Energies in MeV, distances in fm, cross-sections in barns.",
        assumptions: ["Nucleus effectively fixed (heavy target).", "Electron screening neglected.", "Classical mechanics adequate for these energies."],
      },
      sim: "rutherford",
      simBrief: "Set energy and impact parameter; watch the hyperbolic path and collect the angular distribution.",
      staticFallback:
        "Static diagram: alpha particles incident on a gold nucleus with hyperbolic trajectories; those with small impact parameters are deflected through large angles, and a histogram shows the steep cosec⁴(θ/2) distribution.",
      steps: ["Assume a fixed point nucleus with charge Z₂e.", "Use conservation of energy and angular momentum.", "Solve the orbit equation to obtain a hyperbola.", "Relate b to θ.", "Convert to a differential cross-section."],
      prediction: "If the alpha energy is doubled, how does the number scattered at 90° change?",
      formulas: [
        {
          tex: "\\frac{d\\sigma}{d\\Omega}=\\left(\\frac{Z_1Z_2e^{2}}{16\\pi\\varepsilon_0 E}\\right)^{2}\\frac{1}{\\sin^{4}(\\theta/2)}",
          name: "Rutherford scattering formula",
          where: [
            { sym: "Z_1,Z_2", meaning: "atomic numbers of projectile and target", unit: "dimensionless" },
            { sym: "E", meaning: "kinetic energy of the projectile", unit: "J or MeV" },
            { sym: "\\theta", meaning: "scattering angle", unit: "degree" },
          ],
          conditions: ["Coulomb interaction only.", "Thin target, single scattering."],
          rearranged: ["r_{min}=\\frac{Z_1Z_2e^{2}}{4\\pi\\varepsilon_0 E}\\ (\\text{head-on})"],
        },
      ],
      examples: [
        {
          title: "Simple: distance of closest approach",
          problem: "Find r_min for a 5 MeV alpha particle hitting a gold nucleus head-on (Z = 79).",
          steps: ["r_min = kZ₁Z₂e²/E.", "kZ₁Z₂e² = 1.44 × 2 × 79 MeV·fm = 227.5 MeV·fm.", "r_min = 227.5/5."],
          answer: "≈ 45.5 fm, far larger than the nuclear radius, so the alpha never touches the nucleus",
        },
        {
          title: "Exam style: angular dependence",
          problem: "Compare the scattering rates at 30° and 90°.",
          steps: [
            "Ratio = sin⁴(45°)/sin⁴(15°).",
            "sin45° = 0.7071 ⇒ 0.25; sin15° = 0.2588 ⇒ 0.00448.",
            "Ratio ≈ 55.8.",
          ],
          answer: "About 56 times more particles at 30° than at 90°",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Rutherford backscattering spectrometry measures thin-film thickness and composition." },
        { where: "Engineering", detail: "Ion implantation in semiconductor fabrication is modelled with scattering cross-sections." },
      ],
      mistakes: [
        {
          wrong: "Claiming Rutherford's model explained atomic stability.",
          why: "A classical orbiting electron would radiate and spiral into the nucleus; Bohr's quantum postulates were needed.",
          right: "Rutherford established the nucleus; stability required quantum theory.",
          trick: "Nucleus yes, stability no.",
        },
      ],
      exam: {
        definition: "Rutherford scattering is the elastic Coulomb scattering of charged particles by nuclei, with dσ/dΩ ∝ cosec⁴(θ/2) and ∝ 1/E².",
        derivation: [
          "Angular momentum L = mvb is conserved for the central Coulomb force.",
          "Energy conservation with U = kq₁q₂/r gives the orbit as a hyperbola.",
          "The asymptotic deflection satisfies tan(θ/2) = kq₁q₂/(2Eb).",
          "So b = (kq₁q₂/2E)cot(θ/2) and |db/dθ| = (kq₁q₂/4E)cosec²(θ/2).",
          "Substituting into dσ/dΩ = (b/sin θ)|db/dθ| gives the cosec⁴ formula.",
        ],
        keyFormula: "\\frac{d\\sigma}{d\\Omega}\\propto \\frac{1}{E^{2}\\sin^{4}(\\theta/2)}",
        twoMark: { q: "State the main conclusion of Rutherford's scattering experiment.", a: "Atoms contain a very small, dense, positively charged nucleus that holds almost all the mass, surrounded by mostly empty space." },
        fiveMark: { q: "Derive the Rutherford scattering formula and discuss its dependence on energy and angle.", a: "Derivation as above. The cross-section falls as 1/E² and as cosec⁴(θ/2), so small-angle scattering dominates overwhelmingly and large-angle events are rare but decisive evidence for a compact nucleus." },
        numerical: { q: "By what factor does the Rutherford cross-section change if E is doubled?", a: "It falls to one quarter, since dσ/dΩ ∝ 1/E²." },
        checklist: ["Formula and its factors", "Hyperbolic trajectory", "Distance of closest approach", "Experimental conclusions", "Limitations of the model"],
      },
      quiz: [
        { id: "p8a", level: "basic", q: "Rutherford's experiment used", options: ["electrons on gas", "alpha particles on gold foil", "neutrons on lead", "protons on water"], answer: 1, hint: "Geiger and Marsden, 1909.", explain: "Alpha particles were fired at a thin gold foil." },
        { id: "p8b", level: "basic", q: "dσ/dΩ varies with angle as", options: ["cosec²(θ/2)", "cosec⁴(θ/2)", "sin θ", "cos θ"], answer: 1, hint: "Fourth power.", explain: "The characteristic cosec⁴(θ/2) dependence." },
        { id: "p8c", level: "basic", q: "The cross-section depends on energy as", options: ["E", "E²", "1/E", "1/E²"], answer: 3, hint: "Squared denominator.", explain: "dσ/dΩ ∝ 1/E²." },
        { id: "p8d", level: "application", q: "Most alpha particles passed through undeflected, showing that", options: ["the atom is solid", "the atom is mostly empty space", "alphas are heavy", "gold is thin"], answer: 1, hint: "Rare deflections.", explain: "Only a tiny fraction of the area is occupied by nuclei." },
        { id: "p8e", level: "application", q: "The distance of closest approach for a head-on collision is", options: ["kq₁q₂/E", "E/kq₁q₂", "kq₁q₂E", "b"], answer: 0, hint: "All kinetic energy converts to potential energy.", explain: "r_min = kq₁q₂/E." },
        { id: "p8f", level: "challenge", q: "Rutherford's model could not explain", options: ["large-angle scattering", "the existence of a nucleus", "why orbiting electrons do not radiate away their energy", "the mass of the atom"], answer: 2, hint: "Classical electrodynamics.", explain: "Accelerating charges radiate, so classical atoms would collapse; quantum theory resolved this." },
      ],
      summary: {
        points: [
          "Alpha scattering revealed the atomic nucleus.",
          "dσ/dΩ ∝ cosec⁴(θ/2)/E².",
          "Trajectories are hyperbolas in the Coulomb field.",
          "r_min = kq₁q₂/E for head-on approach.",
          "The model needed quantum theory for atomic stability.",
        ],
        recap: ["\\frac{d\\sigma}{d\\Omega}=\\left(\\frac{Z_1Z_2e^{2}}{16\\pi\\varepsilon_0E}\\right)^{2}\\csc^{4}\\frac{\\theta}{2}", "r_{min}=\\frac{kq_1q_2}{E}"],
        memoryMap: ["Alpha beam", "Gold foil", "Rare rebounds", "Nucleus", "cosec⁴ law"],
      },
      assemble: { prompt: "Assemble the distance of closest approach.", tokens: ["r_{min}", "=", "\\frac{Z_1Z_2e^{2}}{4\\pi\\varepsilon_0 E}"] },
    }),
    T({
      id: "central-forces",
      title: "Central Forces",
      minutes: 11,
      awaken: {
        hook: "Gravity, the Coulomb force and a stretched spring share one property: they always point along the line joining the two bodies.",
        curiosity: "Why does that single property force the motion to stay in a plane forever?",
        realWorld: "Planetary orbits, atomic structure, satellite motion, molecular binding.",
        objective: "Define central forces and derive the conservation laws they imply.",
      },
      understand: {
        simple: "A central force points towards or away from a fixed centre and depends only on distance. It exerts no torque about that centre, so angular momentum is conserved and the motion stays in a plane.",
        analogy: "A ball on a string whirled around your hand: the pull is always towards your hand, so the ball stays in one plane.",
        demo: "Launch a particle in a 1/r² field and watch the plane and angular momentum stay fixed.",
        eli5: "Force always towards the centre means flat, predictable orbits.",
      },
      definition: {
        formal:
          "A central force is F⃗ = f(r)r̂, directed along the line joining the particle to a fixed centre, with magnitude depending only on r. Torque about the centre is τ⃗ = r⃗×F⃗ = 0, so angular momentum L⃗ is constant in both magnitude and direction; the motion therefore lies in the plane perpendicular to L⃗. If f(r) derives from a potential, the force is conservative and energy is conserved.",
        conditions: [
          "Force magnitude depends only on r.",
          "Direction strictly radial.",
          "Any central force conserves angular momentum; only those expressible as −dU/dr also conserve energy (which covers all f(r) forces in practice).",
        ],
        vocabulary: [
          { term: "Effective potential", meaning: "U_eff = U(r) + L²/2μr², combining the real potential with the centrifugal barrier." },
          { term: "Areal velocity", meaning: "dA/dt = L/2μ, constant for central forces." },
        ],
        units: "Force in N, L in kg m² s⁻¹, U in J.",
        assumptions: ["Two-body problem reducible to one body of reduced mass μ.", "Isolated system."],
      },
      sim: "central-orbit",
      simBrief: "Choose the force law exponent and initial conditions; watch the resulting orbit shape.",
      staticFallback:
        "Static diagram: effective potential curve U_eff(r) showing the centrifugal barrier at small r, the minimum corresponding to a circular orbit, and horizontal energy lines giving bounded (elliptical) or unbounded (hyperbolic) motion.",
      steps: ["Write F⃗ = f(r)r̂.", "Show τ⃗ = 0, so L⃗ is constant.", "Conclude the motion is planar.", "Use polar coordinates with L = μr²θ̇.", "Reduce to a one-dimensional problem in r with the effective potential."],
      prediction: "If a particle is moved inward at fixed angular momentum, will it speed up or slow down in its angular motion?",
      formulas: [
        {
          tex: "\\vec{F}=f(r)\\hat{r},\\qquad \\vec{L}=\\mu r^{2}\\dot{\\theta}\\,\\hat{z}=\\text{constant}",
          name: "Central force and conserved angular momentum",
          where: [
            { sym: "\\mu", meaning: "reduced mass", unit: "kg" },
            { sym: "\\dot{\\theta}", meaning: "angular velocity", unit: "rad s⁻¹" },
          ],
          conditions: ["Purely radial force.", "Isolated two-body system."],
          rearranged: ["U_{eff}(r)=U(r)+\\frac{L^{2}}{2\\mu r^{2}}", "\\frac{dA}{dt}=\\frac{L}{2\\mu}"],
        },
      ],
      examples: [
        {
          title: "Simple: circular orbit condition",
          problem: "Find the radius of a circular orbit in a gravitational field for given L.",
          steps: ["Circular orbit sits at the minimum of U_eff.", "dU_eff/dr = GMμ/r² − L²/μr³ = 0.", "r = L²/(GMμ²)."],
          answer: "r = L²/(GMμ²)",
        },
        {
          title: "Exam style: prove planar motion",
          problem: "Show that motion under a central force is confined to a plane.",
          steps: [
            "L⃗ = r⃗×p⃗.",
            "dL⃗/dt = r⃗×F⃗ = r⃗×f(r)r̂ = 0 because the vectors are parallel.",
            "So L⃗ is a fixed vector.",
            "Since r⃗·L⃗ = 0 always, r⃗ lies in the fixed plane perpendicular to L⃗.",
          ],
          answer: "Motion is confined to the plane perpendicular to the constant L⃗",
        },
      ],
      realLife: [
        { where: "Space", detail: "All planetary and satellite orbits are central-force problems." },
        { where: "Technology", detail: "Electron orbits in the Bohr model and ion traps use central-force analysis." },
      ],
      mistakes: [
        {
          wrong: "Treating the centrifugal term in U_eff as a real force.",
          why: "It is a bookkeeping device from the angular part of the kinetic energy.",
          right: "Call it the centrifugal barrier in the effective one-dimensional problem.",
          trick: "Effective, not actual.",
        },
      ],
      exam: {
        definition: "A central force is one that is always directed along the line joining the particle to a fixed point, with magnitude depending only on the distance from that point.",
        derivation: [
          "τ⃗ = r⃗×F⃗ = r⃗×f(r)r̂ = 0.",
          "Hence dL⃗/dt = 0 and L⃗ is constant.",
          "Constant direction of L⃗ confines the motion to a plane.",
          "In polar coordinates L = μr²θ̇, so the areal velocity dA/dt = L/2μ is constant — Kepler's second law.",
          "Energy: E = ½μṙ² + L²/2μr² + U(r).",
        ],
        keyFormula: "E=\\frac{1}{2}\\mu\\dot{r}^{2}+\\frac{L^{2}}{2\\mu r^{2}}+U(r)",
        twoMark: { q: "Name two quantities conserved in central-force motion.", a: "Angular momentum (in magnitude and direction) and total mechanical energy." },
        fiveMark: { q: "Show that central-force motion is planar and obeys the law of equal areas.", a: "Zero torque gives constant L⃗, which fixes the plane. In polar coordinates the area swept in time dt is dA = ½r²dθ, so dA/dt = ½r²θ̇ = L/2μ, a constant — the law of equal areas." },
        numerical: { q: "A 2 kg particle moves in a circle of radius 3 m at 4 m s⁻¹. Find L about the centre.", a: "L = mvr = 2 × 4 × 3 = 24 kg m² s⁻¹." },
        checklist: ["Definition", "Zero torque and constant L", "Planar motion", "Effective potential", "Equal-areas law"],
      },
      quiz: [
        { id: "p9a", level: "basic", q: "A central force is always directed", options: ["tangentially", "along the radius", "perpendicular to r⃗", "upward"], answer: 1, hint: "Along the line joining the bodies.", explain: "F⃗ = f(r)r̂." },
        { id: "p9b", level: "basic", q: "Central forces conserve", options: ["momentum only", "angular momentum", "speed", "nothing"], answer: 1, hint: "Zero torque.", explain: "Angular momentum about the force centre is conserved." },
        { id: "p9c", level: "basic", q: "Motion under a central force is", options: ["three-dimensional", "planar", "always circular", "always closed"], answer: 1, hint: "Fixed L⃗ direction.", explain: "The motion stays in the plane perpendicular to L⃗." },
        { id: "p9d", level: "application", q: "The effective potential includes the term", options: ["L²/2μr²", "L²/2μr", "μr²/2", "L/r"], answer: 0, hint: "Centrifugal barrier.", explain: "It comes from the angular kinetic energy." },
        { id: "p9e", level: "application", q: "Constant areal velocity is", options: ["Kepler's first law", "Kepler's second law", "Kepler's third law", "Newton's law"], answer: 1, hint: "Equal areas in equal times.", explain: "It follows directly from conservation of angular momentum." },
        { id: "p9f", level: "challenge", q: "Closed, non-precessing orbits occur only for force laws", options: ["1/r² and r", "1/r only", "any f(r)", "1/r³"], answer: 0, hint: "Bertrand's theorem.", explain: "Only the inverse-square and linear (Hooke) laws give closed bound orbits for all initial conditions." },
      ],
      summary: {
        points: [
          "Central forces are radial with magnitude depending only on r.",
          "They exert no torque, so L⃗ is conserved.",
          "Motion is confined to a plane.",
          "Areal velocity L/2μ is constant.",
          "The problem reduces to one dimension with U_eff.",
        ],
        recap: ["\\vec{F}=f(r)\\hat{r}", "U_{eff}=U(r)+\\frac{L^{2}}{2\\mu r^{2}}"],
        memoryMap: ["Radial force", "No torque", "Constant L", "Plane", "Effective potential"],
      },
    }),
    T({
      id: "central-orbit-equation",
      title: "General Equation of a Central Orbit",
      minutes: 12,
      awaken: {
        hook: "One change of variable, u = 1/r, turns a tangled orbit problem into a familiar oscillator equation.",
        curiosity: "Why do inverse-square forces produce perfect ellipses rather than some messier curve?",
        realWorld: "Orbit determination, spacecraft trajectory design, atomic physics.",
        objective: "Derive the orbit differential equation and solve it for an inverse-square force.",
      },
      understand: {
        simple: "Instead of tracking distance against time, track the reciprocal of distance against angle. With that substitution the equation becomes a simple harmonic equation whose solution is a conic section.",
        analogy: "Choosing better coordinates is like turning a map the right way up: the route suddenly looks straightforward.",
        demo: "Vary the force exponent and see how orbits change from closed ellipses to precessing rosettes.",
        eli5: "Use u = 1/r and the orbit maths becomes easy.",
      },
      definition: {
        formal:
          "For a central force f(r) with u = 1/r and angular momentum L, the orbit satisfies d²u/dθ² + u = −μ f(1/u)/(L²u²). For the attractive inverse-square force f(r) = −k/r², this becomes d²u/dθ² + u = μk/L², whose solution u = (μk/L²)(1 + e cos θ) is a conic section of eccentricity e.",
        conditions: ["Central force.", "L ≠ 0 (otherwise the motion is purely radial).", "Non-relativistic."],
        vocabulary: [
          { term: "Binet equation", meaning: "The orbit equation in terms of u = 1/r." },
          { term: "Eccentricity e", meaning: "Shape parameter: 0 circle, <1 ellipse, 1 parabola, >1 hyperbola." },
          { term: "Semi-latus rectum", meaning: "l = L²/μk, the orbit scale parameter." },
        ],
        units: "r in m, θ in rad, L in kg m² s⁻¹.",
        assumptions: ["Two-body problem reduced with μ.", "No perturbations from other bodies."],
      },
      sim: "central-orbit",
      simBrief: "Set the force-law exponent and initial conditions; the orbit is integrated and drawn.",
      staticFallback:
        "Static diagram: conic sections sharing one focus — circle (e = 0), ellipse (e = 0.6), parabola (e = 1) and hyperbola (e = 1.4) — all solutions of the same orbit equation at different energies.",
      steps: ["Write the radial equation in polar coordinates.", "Use L = μr²θ̇ to eliminate time.", "Substitute u = 1/r.", "Obtain the Binet equation.", "Solve for the given force law and identify the conic."],
      prediction: "For an inverse-square force, what shape will a bound orbit have?",
      formulas: [
        {
          tex: "\\frac{d^{2}u}{d\\theta^{2}}+u=-\\frac{\\mu}{L^{2}u^{2}}f\\left(\\frac{1}{u}\\right)",
          name: "Binet orbit equation",
          where: [
            { sym: "u", meaning: "1/r", unit: "m⁻¹" },
            { sym: "L", meaning: "angular momentum", unit: "kg m² s⁻¹" },
          ],
          conditions: ["Central force.", "L ≠ 0."],
          rearranged: ["r=\\frac{l}{1+e\\cos\\theta},\\quad l=\\frac{L^{2}}{\\mu k}", "e=\\sqrt{1+\\frac{2EL^{2}}{\\mu k^{2}}}"],
        },
      ],
      examples: [
        {
          title: "Simple: circular orbit",
          problem: "Show that e = 0 corresponds to a circular orbit and find the required energy.",
          steps: ["e = 0 gives r = l, a constant.", "From e² = 1 + 2EL²/μk², e = 0 needs E = −μk²/2L².", "This is the minimum of the effective potential."],
          answer: "Circular orbit at r = L²/μk with E = −μk²/2L²",
        },
        {
          title: "Exam style: derive the conic solution",
          problem: "Solve the orbit equation for f(r) = −k/r².",
          steps: [
            "Substituting gives d²u/dθ² + u = μk/L², a constant.",
            "The general solution is u = μk/L² + A cos(θ − θ₀).",
            "Write A = (μk/L²)e and set θ₀ = 0.",
            "Then 1/r = (μk/L²)(1 + e cos θ), i.e. r = l/(1 + e cos θ).",
          ],
          answer: "A conic section with focus at the force centre",
        },
      ],
      realLife: [
        { where: "Space", detail: "Mission planners compute transfer trajectories directly from this conic solution." },
        { where: "Technology", detail: "Orbit determination software fits observed positions to conic elements." },
      ],
      mistakes: [
        {
          wrong: "Assuming every central force gives a closed orbit.",
          why: "Only inverse-square and linear forces do (Bertrand's theorem); others give precessing rosettes.",
          right: "Check the force law before assuming a closed ellipse.",
          trick: "Two laws close, the rest precess.",
        },
      ],
      exam: {
        definition: "The general equation of a central orbit is the Binet equation d²u/dθ² + u = −μf(1/u)/(L²u²), where u = 1/r.",
        derivation: [
          "Radial equation: μ(r̈ − rθ̇²) = f(r).",
          "Angular momentum L = μr²θ̇ gives θ̇ = L/μr².",
          "With u = 1/r, ṙ = −(L/μ)du/dθ and r̈ = −(L²u²/μ²)d²u/dθ².",
          "Substituting and simplifying gives the Binet equation.",
          "For f = −k/r² = −ku², the right-hand side is the constant μk/L².",
        ],
        keyFormula: "r=\\frac{l}{1+e\\cos\\theta}",
        twoMark: { q: "Write the differential equation of a central orbit.", a: "d²u/dθ² + u = −μf(1/u)/(L²u²) with u = 1/r." },
        fiveMark: { q: "Derive the orbit equation and show that an inverse-square attractive force gives a conic section.", a: "Derivation as above; the solution r = l/(1 + e cos θ) with l = L²/μk is the polar equation of a conic with one focus at the centre of force, elliptical when e < 1." },
        numerical: { q: "Find e for E = 0.", a: "e = √(1 + 0) = 1, a parabolic (escape) orbit." },
        checklist: ["Binet equation", "Substitution u = 1/r", "Conic solution", "Eccentricity–energy relation", "Bertrand's theorem"],
      },
      quiz: [
        { id: "p10a", level: "basic", q: "The substitution used in the orbit equation is", options: ["u = r", "u = 1/r", "u = r²", "u = θ"], answer: 1, hint: "Reciprocal distance.", explain: "u = 1/r linearises the equation for inverse-square forces." },
        { id: "p10b", level: "basic", q: "For an inverse-square force the orbit is", options: ["a spiral", "a conic section", "a straight line", "a rosette"], answer: 1, hint: "Circle, ellipse, parabola or hyperbola.", explain: "All solutions are conics with a focus at the force centre." },
        { id: "p10c", level: "basic", q: "e = 0 corresponds to", options: ["a circle", "an ellipse", "a parabola", "a hyperbola"], answer: 0, hint: "Constant r.", explain: "Zero eccentricity is a circular orbit." },
        { id: "p10d", level: "application", q: "For a bound orbit the total energy is", options: ["positive", "zero", "negative", "infinite"], answer: 2, hint: "Escape needs E ≥ 0.", explain: "Bound orbits (e < 1) have E < 0." },
        { id: "p10e", level: "application", q: "The semi-latus rectum l equals", options: ["L²/μk", "μk/L²", "L/μk", "k/L"], answer: 0, hint: "From the solution.", explain: "l = L²/μk." },
        { id: "p10f", level: "challenge", q: "A force law slightly different from 1/r² produces", options: ["a closed ellipse", "a precessing orbit", "a straight line", "no orbit"], answer: 1, hint: "Bertrand's theorem.", explain: "The apsides rotate, giving a rosette; Mercury's perihelion precession is a famous real example." },
      ],
      summary: {
        points: [
          "The Binet equation describes any central orbit.",
          "u = 1/r turns it into a linear equation for inverse-square forces.",
          "Solutions are conic sections r = l/(1 + e cos θ).",
          "e is fixed by the energy and angular momentum.",
          "Only special force laws give closed orbits.",
        ],
        recap: ["\\frac{d^{2}u}{d\\theta^{2}}+u=-\\frac{\\mu}{L^{2}u^{2}}f(1/u)", "r=\\frac{l}{1+e\\cos\\theta}"],
        memoryMap: ["Polar equation", "u = 1/r", "Binet", "Conic", "Eccentricity"],
      },
      assemble: { prompt: "Assemble the polar equation of a conic orbit.", tokens: ["r", "=", "\\frac{l}{1+e\\cos\\theta}"] },
    }),
    T({
      id: "kepler-laws",
      title: "Kepler's Laws",
      minutes: 12,
      awaken: {
        hook: "Kepler spent years on Mars's orbit and found three rules that Newton later showed follow from a single force law.",
        curiosity: "Why do distant planets not merely take longer — they take disproportionately longer?",
        realWorld: "Planetary motion, satellite design, exoplanet detection, mission planning.",
        objective: "State Kepler's three laws and connect them to gravitation and angular momentum.",
      },
      understand: {
        simple: "Planets move on ellipses with the Sun at one focus; they sweep equal areas in equal times, so they move faster when closer; and the square of the period is proportional to the cube of the semi-major axis.",
        analogy: "A skater pulling in their arms spins faster — the same conservation of angular momentum that speeds a planet near perihelion.",
        demo: "Watch the swept-area indicator stay constant as the planet races through perihelion.",
        eli5: "Ellipses, equal areas, and T² ∝ a³.",
      },
      definition: {
        formal:
          "First law: every planet moves in an ellipse with the Sun at one focus. Second law: the radius vector sweeps equal areas in equal times (dA/dt = L/2μ constant). Third law: T² = 4π²a³/G(M + m) ≈ 4π²a³/GM for m ≪ M.",
        conditions: [
          "Two-body approximation; other planets' perturbations neglected.",
          "Non-relativistic; Mercury's perihelion precession needs general relativity.",
          "The third law's constant depends on the total mass.",
        ],
        vocabulary: [
          { term: "Semi-major axis a", meaning: "Half the longest diameter of the ellipse." },
          { term: "Perihelion / aphelion", meaning: "Nearest / farthest points from the Sun." },
          { term: "Areal velocity", meaning: "Rate of sweeping area, constant for central forces." },
        ],
        units: "a in m or AU, T in s or years, G = 6.674 × 10⁻¹¹ N m² kg⁻².",
        assumptions: ["Point masses or spherically symmetric bodies.", "Isolated two-body system."],
      },
      sim: "kepler",
      simBrief: "Set the eccentricity and watch equal areas being swept in equal times; the T²/a³ ratio is displayed.",
      staticFallback:
        "Static diagram: an elliptical orbit with the Sun at one focus, two shaded sectors of equal area near perihelion and aphelion spanning equal times, with the longer perihelion arc showing the greater speed.",
      steps: ["Start from the conic solution of the orbit equation.", "Identify the ellipse and its focus.", "Use constant areal velocity for the second law.", "Integrate over one period for the third law.", "Check with real planetary data."],
      prediction: "If a planet's semi-major axis is four times Earth's, what is its orbital period?",
      formulas: [
        {
          tex: "T^{2}=\\frac{4\\pi^{2}a^{3}}{G(M+m)}",
          name: "Kepler's third law",
          where: [
            { sym: "a", meaning: "semi-major axis", unit: "m" },
            { sym: "T", meaning: "orbital period", unit: "s" },
            { sym: "M,m", meaning: "masses of the two bodies", unit: "kg" },
          ],
          conditions: ["Two-body system.", "Usually m ≪ M for planets."],
          rearranged: ["\\frac{dA}{dt}=\\frac{L}{2\\mu}=\\text{constant}", "r=\\frac{a(1-e^{2})}{1+e\\cos\\theta}"],
          dimensional: "[T^{2}]=\\text{s}^{2},\\ [a^{3}/GM]=\\text{s}^{2}",
        },
      ],
      examples: [
        {
          title: "Simple: period from distance",
          problem: "A planet orbits at 4 AU from the Sun. Find its period in years.",
          steps: ["T² = a³ in solar-system units.", "T² = 64, so T = 8."],
          answer: "8 years",
        },
        {
          title: "Exam style: derive the third law for a circular orbit",
          problem: "Derive T² ∝ a³ for a circular orbit of radius a.",
          steps: [
            "Gravity provides the centripetal force: GMm/a² = mω²a.",
            "So ω² = GM/a³.",
            "With ω = 2π/T: 4π²/T² = GM/a³.",
            "Hence T² = 4π²a³/GM.",
          ],
          answer: "T² = 4π²a³/GM, the third law (exact for circles, and valid with a as the semi-major axis for ellipses)",
        },
      ],
      realLife: [
        { where: "Space", detail: "Geostationary altitude is computed directly from Kepler's third law with T = 1 sidereal day." },
        { where: "Technology", detail: "Exoplanet masses and orbits are inferred by applying these laws to observed wobbles and transits." },
      ],
      mistakes: [
        {
          wrong: "Using the orbital radius instead of the semi-major axis in the third law.",
          why: "For eccentric orbits the instantaneous radius varies; the law uses a.",
          right: "Always use the semi-major axis.",
          trick: "a, not r.",
        },
        {
          wrong: "Thinking the Sun is at the centre of the ellipse.",
          why: "The first law places it at a focus, which is offset from the centre by ae.",
          right: "Sun at a focus.",
          trick: "Focus, not centre.",
        },
      ],
      exam: {
        definition: "Kepler's laws: (1) elliptical orbits with the Sun at a focus; (2) equal areas in equal times; (3) T² ∝ a³.",
        derivation: [
          "The second law follows from constant angular momentum: dA/dt = L/2μ.",
          "The first law follows from solving the orbit equation for an inverse-square force.",
          "For the third law, the ellipse area is πab, so T = πab/(L/2μ) = 2πμab/L.",
          "Using b = a√(1−e²) and l = b²/a = L²/μk gives T² = 4π²μa³/k.",
          "With k = GMm and μ = mM/(M+m), T² = 4π²a³/G(M+m).",
        ],
        keyFormula: "T^{2}=\\frac{4\\pi^{2}a^{3}}{GM}",
        twoMark: { q: "State Kepler's second law and the conservation law behind it.", a: "The radius vector sweeps equal areas in equal times; it follows from conservation of angular momentum for a central force." },
        fiveMark: { q: "State and derive Kepler's three laws from Newton's law of gravitation.", a: "Derivation as above: the conic solution gives the first law, constant areal velocity gives the second, and integrating over the ellipse area gives the third with the constant 4π²/G(M+m)." },
        numerical: { q: "Find the radius of a geostationary orbit (T = 86164 s, GM = 3.986 × 10¹⁴ m³ s⁻²).", a: "a = (GMT²/4π²)^{1/3} ≈ 4.22 × 10⁷ m, i.e. about 35 800 km above the surface." },
        checklist: ["All three statements", "Link to angular momentum", "Third-law constant", "Semi-major axis usage", "Geostationary calculation"],
      },
      quiz: [
        { id: "p11a", level: "basic", q: "Kepler's first law states orbits are", options: ["circles", "ellipses with the Sun at a focus", "parabolas", "spirals"], answer: 1, hint: "Focus, not centre.", explain: "Ellipses with the Sun at one focus." },
        { id: "p11b", level: "basic", q: "The second law follows from conservation of", options: ["energy", "angular momentum", "mass", "charge"], answer: 1, hint: "Central force, zero torque.", explain: "Constant L gives constant areal velocity." },
        { id: "p11c", level: "basic", q: "Kepler's third law states", options: ["T ∝ a", "T² ∝ a³", "T³ ∝ a²", "T ∝ a²"], answer: 1, hint: "Squares and cubes.", explain: "T² = 4π²a³/GM." },
        { id: "p11d", level: "application", q: "A planet is fastest at", options: ["aphelion", "perihelion", "both equally", "the semi-minor axis"], answer: 1, hint: "Equal areas with a shorter radius.", explain: "Closest approach requires the greatest speed." },
        { id: "p11e", level: "application", q: "A planet at 9 AU has a period of", options: ["9 years", "27 years", "81 years", "3 years"], answer: 1, hint: "T = a^{3/2}.", explain: "9^{1.5} = 27 years." },
        { id: "p11f", level: "challenge", q: "Kepler's third law constant depends on", options: ["only the planet's mass", "the total mass M + m", "the eccentricity", "the period"], answer: 1, hint: "Look at the exact form.", explain: "T² = 4π²a³/G(M+m); for planets m ≪ M so it appears to depend only on the Sun." },
      ],
      summary: {
        points: [
          "Orbits are ellipses with the Sun at a focus.",
          "Equal areas are swept in equal times.",
          "T² = 4π²a³/G(M+m).",
          "Planets move fastest at perihelion.",
          "All three laws follow from inverse-square gravity.",
        ],
        recap: ["\\frac{dA}{dt}=\\text{constant}", "T^{2}=\\frac{4\\pi^{2}a^{3}}{G(M+m)}"],
        memoryMap: ["Ellipse", "Focus", "Equal areas", "T² ∝ a³", "Gravity"],
      },
      assemble: { prompt: "Assemble Kepler's third law.", tokens: ["T^{2}", "=", "\\frac{4\\pi^{2}a^{3}}{GM}"] },
    }),
    T({
      id: "artificial-satellites",
      title: "Artificial Satellites",
      minutes: 12,
      awaken: {
        hook: "A satellite is simply an object falling forever and missing the Earth, exactly as Newton imagined with his cannon on a mountain.",
        curiosity: "Why does a satellite not fall down, when gravity is the only force acting on it?",
        realWorld: "Communications, GPS, weather monitoring, Earth observation, the ISS.",
        objective: "Compute orbital and escape speeds, periods, altitudes and energies for satellites.",
      },
      understand: {
        simple: "A satellite is falling all the time, but it also moves sideways fast enough that the ground curves away just as quickly. Gravity supplies exactly the centripetal force needed.",
        analogy: "Newton's cannonball: fire it fast enough and it never lands.",
        demo: "Adjust the launch speed and watch the orbit change from a crashing arc to a circle, an ellipse and finally an escape trajectory.",
        eli5: "Fall down while moving sideways fast enough to keep missing the ground.",
      },
      definition: {
        formal:
          "For a circular orbit of radius r about a body of mass M, gravity supplies the centripetal force: GMm/r² = mv²/r, so v_orb = √(GM/r) and T = 2π√(r³/GM). The total energy is E = −GMm/2r, and escape speed from radius r is v_esc = √(2GM/r) = √2 v_orb.",
        conditions: [
          "Spherically symmetric primary body.",
          "Atmospheric drag neglected (valid well above about 300 km for short durations).",
          "Two-body approximation.",
        ],
        vocabulary: [
          { term: "Geostationary orbit", meaning: "Circular equatorial orbit with a period of one sidereal day, radius ≈ 42 200 km." },
          { term: "Low Earth orbit (LEO)", meaning: "Typically 200–2000 km altitude." },
          { term: "Escape velocity", meaning: "Minimum speed for an unbound trajectory, 11.2 km s⁻¹ at Earth's surface." },
        ],
        units: "v in m s⁻¹, r in m, T in s, GM_Earth = 3.986 × 10¹⁴ m³ s⁻².",
        assumptions: ["No thrust after insertion.", "Point-mass gravity; oblateness effects ignored."],
      },
      sim: "satellite",
      simBrief: "Set the altitude and launch speed; the orbit, period and energy are computed and drawn.",
      staticFallback:
        "Static diagram: Newton's cannon on a mountain with five trajectories — short arcs falling back, a circular orbit, an ellipse, a parabola at escape speed and a hyperbola beyond it.",
      steps: ["Equate gravity to the centripetal requirement.", "Solve for the orbital speed.", "Find the period from T = 2πr/v.", "Compute total energy E = −GMm/2r.", "Compare with the escape condition E = 0."],
      prediction: "If a satellite is boosted to a higher orbit, will its orbital speed increase or decrease?",
      formulas: [
        {
          tex: "v_{orb}=\\sqrt{\\frac{GM}{r}},\\qquad T=2\\pi\\sqrt{\\frac{r^{3}}{GM}}",
          name: "Circular orbit speed and period",
          where: [
            { sym: "r", meaning: "orbital radius from the centre of the Earth", unit: "m" },
            { sym: "GM", meaning: "gravitational parameter", unit: "m³ s⁻²" },
          ],
          conditions: ["Circular orbit.", "No drag."],
          rearranged: ["v_{esc}=\\sqrt{\\frac{2GM}{r}}", "E=-\\frac{GMm}{2r}"],
        },
      ],
      examples: [
        {
          title: "Simple: low Earth orbit speed",
          problem: "Find the orbital speed at 400 km altitude (r = 6.78 × 10⁶ m).",
          steps: ["v = √(3.986 × 10¹⁴/6.78 × 10⁶).", "= √(5.88 × 10⁷)."],
          answer: "≈ 7.67 km s⁻¹, with a period of about 93 minutes",
        },
        {
          title: "Exam style: geostationary orbit",
          problem: "Find the radius and altitude of a geostationary orbit.",
          steps: [
            "T = 86164 s (one sidereal day).",
            "r = (GMT²/4π²)^{1/3}.",
            "= (3.986 × 10¹⁴ × 7.42 × 10⁹/39.48)^{1/3}.",
            "r ≈ 4.22 × 10⁷ m.",
            "Altitude = r − R_E ≈ 4.22 × 10⁷ − 6.37 × 10⁶.",
          ],
          answer: "r ≈ 42 200 km, altitude ≈ 35 800 km",
        },
      ],
      realLife: [
        { where: "Technology", detail: "GPS satellites orbit at about 20 200 km with a period of half a sidereal day." },
        { where: "Weather", detail: "Geostationary weather satellites stay over the same point and image continuously." },
        { where: "Space", detail: "The ISS at about 400 km must be periodically reboosted because of residual atmospheric drag." },
      ],
      mistakes: [
        {
          wrong: "Saying astronauts float because there is no gravity in orbit.",
          why: "Gravity at 400 km is about 89% of its surface value; they float because they are in continuous free fall.",
          right: "Weightlessness is free fall, not absence of gravity.",
          trick: "Falling, not gravity-free.",
        },
        {
          wrong: "Thinking a higher orbit means a faster satellite.",
          why: "v = √(GM/r) decreases with r, even though the period increases.",
          right: "Higher orbits are slower but longer.",
          trick: "Higher, slower, longer.",
        },
      ],
      exam: {
        definition: "An artificial satellite is a human-made object placed in orbit, held by gravity providing exactly the centripetal force required for its path.",
        derivation: [
          "For a circular orbit: GMm/r² = mv²/r.",
          "Hence v = √(GM/r).",
          "Period T = 2πr/v = 2π√(r³/GM), which is Kepler's third law.",
          "Kinetic energy = ½mv² = GMm/2r; potential energy = −GMm/r.",
          "Total E = −GMm/2r, negative and therefore bound.",
        ],
        keyFormula: "E=-\\frac{GMm}{2r}",
        twoMark: { q: "What is escape velocity from the Earth's surface?", a: "v_esc = √(2GM/R) ≈ 11.2 km s⁻¹, independent of the mass of the escaping object." },
        fiveMark: { q: "Derive expressions for the orbital speed, period and total energy of a satellite, and find the geostationary altitude.", a: "Derivation as above; setting T = 86164 s gives r ≈ 42 200 km, i.e. about 35 800 km above the equator." },
        numerical: { q: "Find the total energy of a 1000 kg satellite at r = 7 × 10⁶ m.", a: "E = −GMm/2r = −(3.986 × 10¹⁴ × 1000)/(1.4 × 10⁷) ≈ −2.85 × 10¹⁰ J." },
        checklist: ["Orbital speed and period", "Energy expression", "Escape speed", "Geostationary parameters", "Weightlessness explanation"],
      },
      quiz: [
        { id: "p12a", level: "basic", q: "Orbital speed varies with radius as", options: ["√r", "1/√r", "r", "1/r"], answer: 1, hint: "v = √(GM/r).", explain: "Higher orbits are slower." },
        { id: "p12b", level: "basic", q: "Escape speed is greater than orbital speed by a factor", options: ["2", "√2", "1/2", "4"], answer: 1, hint: "Compare the formulas.", explain: "v_esc = √2 v_orb." },
        { id: "p12c", level: "basic", q: "Total energy of a bound satellite is", options: ["positive", "zero", "negative", "infinite"], answer: 2, hint: "E = −GMm/2r.", explain: "Bound orbits have negative total energy." },
        { id: "p12d", level: "application", q: "A geostationary satellite has a period of", options: ["12 h", "24 h (one sidereal day)", "90 min", "1 month"], answer: 1, hint: "It matches Earth's rotation.", explain: "About 23 h 56 min." },
        { id: "p12e", level: "application", q: "Astronauts float in the ISS because", options: ["there is no gravity", "they are in free fall", "they are far from Earth", "of magnetism"], answer: 1, hint: "Gravity is still about 89% of surface value.", explain: "Both the station and the astronauts fall together." },
        { id: "p12f", level: "challenge", q: "To move to a higher orbit a satellite must", options: ["slow down immediately and stay slow", "fire its engine to add energy, ending up slower but higher", "do nothing", "increase mass"], answer: 1, hint: "Energy increases, speed decreases.", explain: "Adding energy raises the orbit; the final circular speed is lower than before — the classic orbital-mechanics paradox." },
      ],
      summary: {
        points: [
          "Gravity provides the centripetal force for orbit.",
          "v = √(GM/r), T = 2π√(r³/GM).",
          "E = −GMm/2r for a circular orbit.",
          "v_esc = √2 × v_orb.",
          "Geostationary altitude ≈ 35 800 km.",
        ],
        recap: ["v_{orb}=\\sqrt{\\frac{GM}{r}}", "v_{esc}=\\sqrt{\\frac{2GM}{r}}"],
        memoryMap: ["Free fall", "Sideways speed", "Circular orbit", "Energy", "Escape"],
      },
      assemble: { prompt: "Assemble the escape velocity formula.", tokens: ["v_{esc}", "=", "\\sqrt{\\frac{2GM}{r}}"] },
    }),
    T({
      id: "velocities-c-l-frames",
      title: "Velocities in C- and L-Frames: Worked Synthesis",
      minutes: 9,
      awaken: {
        hook: "Everything in this chapter comes down to one skill: switching viewpoints without losing the physics.",
        curiosity: "Can one collision really be described by two completely different-looking pictures?",
        realWorld: "Nuclear physics data analysis, accelerator experiments, engineering impact studies.",
        objective: "Convert fluently between laboratory and centre-of-mass descriptions of a collision.",
      },
      understand: {
        simple: "Subtract the centre-of-mass velocity to get the simple symmetric picture; add it back to get what the detector sees. That is the whole technique.",
        analogy: "Translating between two languages that describe the same event.",
        demo: "Run the collision and flip between frames to see the two descriptions of one event.",
        eli5: "Minus v_cm to simplify, plus v_cm to return.",
      },
      definition: {
        formal:
          "With the target at rest, v⃗_cm = m₁u⃗₁/(m₁+m₂). The C-frame speeds are u₁ᶜ = m₂u₁/(m₁+m₂) and u₂ᶜ = m₁u₁/(m₁+m₂) = v_cm. For elastic collisions these magnitudes are unchanged by the collision; only the common direction θ_C changes. Laboratory velocities follow from v⃗_L = v⃗_C + v⃗_cm.",
        conditions: ["Isolated two-body system.", "Elastic collision for unchanged C-frame speeds."],
        vocabulary: [
          { term: "Velocity triangle", meaning: "Graphical construction adding v⃗_cm to the C-frame velocity." },
          { term: "Q value", meaning: "Energy released or absorbed in an inelastic or reactive collision." },
        ],
        units: "m s⁻¹ for velocities, J or MeV for energies.",
        assumptions: ["Non-relativistic.", "No external forces during impact."],
      },
      sim: "collision-2d",
      simBrief: "Use the frame toggle to compare the same collision in both frames, with numeric readouts.",
      staticFallback:
        "Static diagram: the velocity-triangle construction — a circle of radius u₁ᶜ centred at the tip of v⃗_cm; every point on the circle is a possible laboratory velocity for the scattered projectile.",
      steps: ["Compute v_cm.", "Compute the C-frame speeds.", "Choose θ_C.", "Draw the velocity triangle.", "Read the laboratory speeds and angles."],
      formulas: [
        {
          tex: "v_1^{L}=\\sqrt{(u_1^{C})^{2}+v_{cm}^{2}+2u_1^{C}v_{cm}\\cos\\theta_C}",
          name: "Laboratory speed of the scattered projectile",
          where: [
            { sym: "u_1^{C}", meaning: "C-frame speed of the projectile", unit: "m s⁻¹" },
            { sym: "v_{cm}", meaning: "centre-of-mass speed", unit: "m s⁻¹" },
          ],
          conditions: ["Elastic collision.", "Target initially at rest."],
          rearranged: ["u_1^{C}=\\frac{m_2u_1}{m_1+m_2}", "v_{cm}=\\frac{m_1u_1}{m_1+m_2}"],
        },
      ],
      examples: [
        {
          title: "Simple: equal masses, 90° C-frame scattering",
          problem: "For m₁ = m₂ and u₁ = 10 m s⁻¹, find the laboratory speed of the projectile when θ_C = 90°.",
          steps: ["v_cm = 5 m s⁻¹, u₁ᶜ = 5 m s⁻¹.", "v₁ᴸ = √(25 + 25 + 0) = √50."],
          answer: "≈ 7.07 m s⁻¹ at θ_L = 45°",
        },
        {
          title: "Exam style: full transformation",
          problem: "m₁ = 1 kg at 12 m s⁻¹ strikes m₂ = 3 kg at rest elastically with θ_C = 180°. Find the laboratory velocities.",
          steps: [
            "v_cm = 12/4 = 3 m s⁻¹; u₁ᶜ = 9 m s⁻¹; u₂ᶜ = 3 m s⁻¹.",
            "θ_C = 180° reverses the C-frame velocities.",
            "v₁ᴸ = −9 + 3 = −6 m s⁻¹ (backwards).",
            "v₂ᴸ = 3 + 3 = 6 m s⁻¹ (forwards).",
            "Check momentum: 1(−6) + 3(6) = 12. ✔",
          ],
          answer: "Projectile rebounds at 6 m s⁻¹; target moves forward at 6 m s⁻¹",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Detector data are recorded in the laboratory frame but theory is computed in the centre-of-mass frame." },
        { where: "Engineering", detail: "Impact analysis in crash testing uses the same transformation to separate rigid-body motion from deformation." },
      ],
      mistakes: [
        {
          wrong: "Forgetting to add v⃗_cm back after solving in the C-frame.",
          why: "The answer then describes a frame no detector occupies.",
          right: "Always transform back before comparing with measurements.",
          trick: "Come home to the lab.",
        },
      ],
      exam: {
        definition: "C-frame velocities are obtained by subtracting v⃗_cm from the laboratory velocities; the reverse transformation adds it back.",
        derivation: [
          "v⃗ᶜ = v⃗ᴸ − v⃗_cm for every particle.",
          "For a target at rest: u₁ᶜ = u₁ − v_cm = m₂u₁/(m₁+m₂), u₂ᶜ = −v_cm.",
          "Elastic collisions preserve these magnitudes, rotating them by θ_C.",
          "Adding v⃗_cm gives the laboratory velocity, with magnitude from the cosine rule.",
        ],
        keyFormula: "\\vec{v}^{L}=\\vec{v}^{C}+\\vec{v}_{cm}",
        twoMark: { q: "How do you convert a C-frame velocity to a laboratory velocity?", a: "Add the centre-of-mass velocity vectorially: v⃗ᴸ = v⃗ᶜ + v⃗_cm." },
        fiveMark: { q: "For a general elastic collision with the target at rest, obtain the laboratory speed of the scattered projectile as a function of θ_C.", a: "Using the cosine rule on the velocity triangle: v₁ᴸ = √[(u₁ᶜ)² + v_cm² + 2u₁ᶜv_cm cos θ_C], with u₁ᶜ = m₂u₁/(m₁+m₂) and v_cm = m₁u₁/(m₁+m₂)." },
        numerical: { q: "For m₁ = m₂ and θ_C = 180°, find the laboratory velocities.", a: "The projectile stops (v₁ᴸ = 0) and the target moves off with the full initial speed — the classic head-on equal-mass result." },
        checklist: ["Transformation rule", "C-frame speeds", "Cosine-rule formula", "Momentum check", "Return to the laboratory frame"],
      },
      quiz: [
        { id: "p13a", level: "basic", q: "To enter the C-frame you", options: ["add v_cm", "subtract v⃗_cm", "double the velocities", "reverse them"], answer: 1, hint: "Make total momentum zero.", explain: "Subtract the centre-of-mass velocity from every velocity." },
        { id: "p13b", level: "basic", q: "In an elastic collision the C-frame speeds", options: ["change", "stay the same", "become zero", "double"], answer: 1, hint: "Only directions rotate.", explain: "Magnitudes are unchanged." },
        { id: "p13c", level: "basic", q: "u₁ᶜ equals", options: ["m₁u₁/(m₁+m₂)", "m₂u₁/(m₁+m₂)", "u₁", "u₁/2"], answer: 1, hint: "Subtract v_cm from u₁.", explain: "u₁ − m₁u₁/(m₁+m₂) = m₂u₁/(m₁+m₂)." },
        { id: "p13d", level: "application", q: "For equal masses head-on (θ_C = 180°), the projectile", options: ["stops", "rebounds at u₁", "continues at u₁", "moves at u₁/2"], answer: 0, hint: "Classic result.", explain: "The projectile stops and the target moves off with the initial speed." },
        { id: "p13e", level: "application", q: "The magnitude of u₂ᶜ equals", options: ["u₁", "v_cm", "zero", "2v_cm"], answer: 1, hint: "Target at rest in the lab.", explain: "0 − v_cm has magnitude v_cm." },
        { id: "p13f", level: "challenge", q: "The velocity triangle construction shows that for m₁ > m₂", options: ["all angles are possible", "there is a maximum laboratory scattering angle", "the projectile stops", "energy is lost"], answer: 1, hint: "Circle does not enclose the origin.", explain: "sin θ_max = m₂/m₁ limits the scattering to forward angles." },
      ],
      summary: {
        points: [
          "v⃗ᶜ = v⃗ᴸ − v⃗_cm and back again.",
          "C-frame speeds are unchanged in elastic collisions.",
          "Velocity triangles give laboratory speeds and angles.",
          "Equal-mass head-on collisions exchange velocities.",
          "Always verify momentum conservation at the end.",
        ],
        recap: ["\\vec{v}^{C}=\\vec{v}^{L}-\\vec{v}_{cm}", "v_1^{L}=\\sqrt{(u_1^{C})^{2}+v_{cm}^{2}+2u_1^{C}v_{cm}\\cos\\theta_C}"],
        memoryMap: ["Lab", "Subtract v_cm", "Solve", "Add v_cm", "Lab again"],
      },
    }),
  ],
};
