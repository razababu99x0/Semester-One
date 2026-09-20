import type { Chapter, Topic } from "@/types/content";

const T = (t: Topic) => t;

export const dynamics: Chapter = {
  id: "dynamics",
  unit: 3,
  title: "Dynamics Arena",
  subtitle: "Unit III — Frames of reference and rotating-Earth effects",
  portal: "A turning arena where the floor itself rotates and paths bend before your eyes.",
  accent: "#7aa2ff",
  blurb:
    "Physics looks different depending on who is watching. In this arena you will ride rotating platforms, trace Coriolis-curved paths, weigh yourself at different latitudes, and swing a Foucault pendulum that quietly proves the Earth turns.",
  topics: [
    T({
      id: "frame-of-reference",
      title: "Frame of Reference",
      minutes: 9,
      awaken: {
        hook: "You are sitting still — and also moving at about 30 km/s around the Sun. Both statements are true.",
        curiosity: "Is there any way to decide who is 'really' moving?",
        realWorld: "GPS, air-traffic control, ballistics, animation and game engines.",
        objective: "Define a frame of reference and transform positions and velocities between frames.",
      },
      understand: {
        simple: "A frame of reference is the coordinate system plus clock that an observer uses. Positions and velocities are only meaningful once you say which frame you are using.",
        analogy: "A ball dropped in a moving train falls straight down for the passenger but along a curve for someone on the platform. Same ball, two descriptions.",
        demo: "Switch the observer between the platform and the train and watch the same motion redraw itself.",
        eli5: "A frame is 'from whose point of view'.",
      },
      definition: {
        formal:
          "A frame of reference is a rigid coordinate system together with a clock, relative to which positions, velocities and accelerations are measured. If frame S′ has position R⃗(t) relative to S, then r⃗ = r⃗′ + R⃗ and v⃗ = v⃗′ + V⃗ for the classical (Galilean) transformation.",
        conditions: ["Speeds small compared with c for the Galilean form.", "Frames must have a defined relative motion."],
        vocabulary: [
          { term: "Origin", meaning: "Reference point of the coordinate system." },
          { term: "Relative velocity", meaning: "Velocity of one object measured in another's frame." },
          { term: "Galilean transformation", meaning: "r⃗′ = r⃗ − V⃗t, t′ = t." },
        ],
        units: "Positions in m, velocities in m s⁻¹, time in s.",
        assumptions: ["Absolute time (classical mechanics).", "Rigid, non-deforming coordinate axes."],
      },
      sim: "reference-frame",
      simBrief: "Toggle between the ground observer and the moving-train observer for the same falling ball.",
      staticFallback:
        "Static diagram: a ball dropped inside a train. In the train frame its path is a straight vertical line; in the ground frame it is a parabola, because the horizontal velocity of the train is added.",
      steps: ["Choose the frame and its origin.", "Write the position of the object in that frame.", "Use r⃗ = r⃗′ + R⃗ to convert.", "Differentiate to relate velocities and accelerations."],
      prediction: "Will the ball land at the passenger's feet or behind them?",
      formulas: [
        {
          tex: "\\vec{r}=\\vec{r}\\,'+\\vec{R},\\qquad \\vec{v}=\\vec{v}\\,'+\\vec{V}",
          name: "Galilean position and velocity transformation",
          where: [
            { sym: "\\vec{R}", meaning: "position of the origin of S′ in S", unit: "m" },
            { sym: "\\vec{V}", meaning: "velocity of S′ relative to S", unit: "m s⁻¹" },
          ],
          conditions: ["Non-relativistic speeds.", "Translating (not rotating) frames."],
          rearranged: ["\\vec{a}=\\vec{a}\\,'+\\vec{A}"],
        },
      ],
      examples: [
        {
          title: "Simple: relative velocity",
          problem: "A train moves at 20 m s⁻¹ east; a passenger walks at 2 m s⁻¹ east inside. Find the passenger's velocity relative to the ground.",
          steps: ["v⃗ = v⃗′ + V⃗ = 2 + 20."],
          answer: "22 m s⁻¹ east",
        },
        {
          title: "Exam style: crossing a river",
          problem: "A boat heads north at 4 m s⁻¹ in a river flowing east at 3 m s⁻¹. Find its velocity relative to the bank.",
          steps: ["Add the vectors: 4ĵ + 3î.", "Magnitude √(16 + 9) = 5 m s⁻¹.", "Direction tan⁻¹(3/4) ≈ 37° east of north."],
          answer: "5 m s⁻¹ at 37° east of north",
        },
      ],
      realLife: [
        { where: "Vehicles", detail: "Air-traffic control converts between aircraft, wind and ground frames continuously." },
        { where: "Technology", detail: "GPS receivers transform between satellite frames and the rotating Earth frame." },
      ],
      mistakes: [
        {
          wrong: "Saying an object has 'a' velocity with no frame specified.",
          why: "Velocity is frame dependent, unlike mass or proper time intervals in classical mechanics.",
          right: "Always state the frame: 'relative to the ground'.",
          trick: "Velocity needs an address.",
        },
      ],
      exam: {
        definition: "A frame of reference is a coordinate system with a clock, attached to an observer, in which physical measurements are made.",
        derivation: [
          "Let S′ move with constant velocity V⃗ relative to S, coinciding at t = 0.",
          "Then R⃗ = V⃗t and r⃗ = r⃗′ + V⃗t.",
          "Differentiating once: v⃗ = v⃗′ + V⃗.",
          "Differentiating again: a⃗ = a⃗′ since V⃗ is constant — acceleration is invariant between inertial frames.",
        ],
        keyFormula: "\\vec{v}=\\vec{v}\\,'+\\vec{V}",
        twoMark: { q: "Define frame of reference.", a: "A system of coordinates together with a time scale, used by an observer to specify the position and motion of objects." },
        fiveMark: { q: "Show that acceleration is the same in all frames moving with constant relative velocity.", a: "With r⃗ = r⃗′ + V⃗t and V⃗ constant, differentiating twice gives a⃗ = a⃗′. Hence Newton's laws take the same form in all such frames, which is the Galilean principle of relativity." },
        numerical: { q: "Two cars approach each other at 15 and 25 m s⁻¹. Find their relative speed.", a: "40 m s⁻¹." },
        checklist: ["Definition", "Galilean transformation", "Relative velocity addition", "Invariance of acceleration"],
      },
      quiz: [
        { id: "d1a", level: "basic", q: "A frame of reference always includes", options: ["only axes", "axes and a clock", "only a clock", "a force"], answer: 1, hint: "Space and time.", explain: "Positions need axes and events need a time scale." },
        { id: "d1b", level: "basic", q: "Velocity is", options: ["absolute", "frame dependent", "always zero", "a scalar"], answer: 1, hint: "Depends on the observer.", explain: "Velocity has meaning only relative to a chosen frame." },
        { id: "d1c", level: "basic", q: "The Galilean velocity transformation is", options: ["v = v′", "v = v′ + V", "v = v′V", "v = V − v′"], answer: 1, hint: "Simple addition.", explain: "Velocities add vectorially in classical mechanics." },
        { id: "d1d", level: "application", q: "A ball dropped in a uniformly moving train lands", options: ["behind the passenger", "at the passenger's feet", "ahead", "outside"], answer: 1, hint: "It keeps the train's horizontal velocity.", explain: "In the train frame there is no horizontal force, so it falls straight down." },
        { id: "d1e", level: "application", q: "Between frames in uniform relative motion, acceleration is", options: ["different", "the same", "zero", "doubled"], answer: 1, hint: "Differentiate twice.", explain: "Constant V⃗ differentiates away." },
        { id: "d1f", level: "challenge", q: "Two trains pass at 30 m s⁻¹ each in opposite directions; relative speed is", options: ["0", "30 m s⁻¹", "60 m s⁻¹", "15 m s⁻¹"], answer: 2, hint: "Subtract vectors with opposite signs.", explain: "30 − (−30) = 60 m s⁻¹." },
      ],
      summary: {
        points: [
          "A frame is coordinates plus a clock.",
          "Position and velocity are frame dependent.",
          "Galilean transformation: v⃗ = v⃗′ + V⃗.",
          "Acceleration is invariant between uniformly moving frames.",
          "Always state the frame when quoting motion.",
        ],
        recap: ["\\vec{r}=\\vec{r}\\,'+\\vec{R}", "\\vec{v}=\\vec{v}\\,'+\\vec{V}"],
        memoryMap: ["Observer", "Axes", "Clock", "Transformation", "Relative motion"],
      },
    }),
    T({
      id: "inertial-frame",
      title: "Inertial Frames",
      minutes: 9,
      awaken: {
        hook: "In some frames, a body left alone truly does nothing. Those special frames are where Newton's laws are exact.",
        curiosity: "Is the ground beneath your feet an inertial frame?",
        realWorld: "Mechanics laboratories, satellite dynamics, particle physics.",
        objective: "Define an inertial frame and test whether a given frame qualifies.",
      },
      understand: {
        simple: "An inertial frame is one in which a body with no net force on it moves in a straight line at constant speed. Any frame moving uniformly relative to an inertial frame is also inertial.",
        analogy: "Inside a smoothly cruising aircraft you can pour a drink exactly as on the ground — that cabin is (very nearly) inertial.",
        demo: "Compare a puck's path when the platform is stationary and when it is accelerating.",
        eli5: "No push, no bending: that frame is inertial.",
      },
      definition: {
        formal:
          "An inertial frame is one in which Newton's first law holds: a particle free of net external force has zero acceleration. All frames in uniform rectilinear motion relative to an inertial frame are themselves inertial, and Newton's laws take the same form in all of them (Galilean invariance).",
        conditions: ["No rotation and no acceleration of the frame.", "Strictly, only local inertial frames exist in the presence of gravity."],
        vocabulary: [
          { term: "Pseudo-force", meaning: "Apparent force introduced when using a non-inertial frame." },
          { term: "Galilean invariance", meaning: "Identical form of mechanical laws in all inertial frames." },
        ],
        units: "Standard SI mechanical units.",
        assumptions: ["Classical mechanics.", "Earth treated as approximately inertial for short experiments."],
      },
      sim: "reference-frame",
      simBrief: "Switch the frame to accelerating and watch a force-free puck appear to curve.",
      staticFallback:
        "Static diagram: in an inertial frame a free puck traces a straight line; in an accelerating frame the same puck appears to accelerate backwards although no real force acts on it.",
      steps: ["Isolate a body with no net real force.", "Observe its motion in the frame.", "Straight line at constant speed ⇒ inertial.", "Otherwise the frame is non-inertial."],
      formulas: [
        {
          tex: "\\sum \\vec{F}=0 \\Rightarrow \\vec{a}=0",
          name: "Test for an inertial frame",
          where: [{ sym: "\\vec{a}", meaning: "acceleration measured in the frame", unit: "m s⁻²" }],
          conditions: ["Only real forces counted.", "Frame not rotating or accelerating."],
          rearranged: ["\\vec{F}=m\\vec{a}\\ \\text{valid without correction terms}"],
        },
      ],
      examples: [
        {
          title: "Simple: identify inertial frames",
          problem: "Which is closest to inertial: a car braking, a train at constant velocity, a spinning merry-go-round?",
          steps: ["Braking car accelerates ⇒ non-inertial.", "Merry-go-round rotates ⇒ non-inertial.", "Train at constant velocity ⇒ inertial."],
          answer: "The uniformly moving train",
        },
        {
          title: "Exam style: Earth as a frame",
          problem: "Explain in what sense the Earth's surface is not an inertial frame and estimate the size of the effect at the equator.",
          steps: [
            "The surface rotates, so it accelerates centripetally.",
            "a = ω²R with ω = 7.29 × 10⁻⁵ rad s⁻¹ and R = 6.37 × 10⁶ m.",
            "a ≈ 0.034 m s⁻², about 0.34% of g.",
          ],
          answer: "Non-inertial, but the correction is only ~0.3% of g, so it is usually neglected in laboratory work.",
        },
      ],
      realLife: [
        { where: "Space", detail: "A freely falling spacecraft is a good local inertial frame, which is why astronauts float." },
        { where: "Engineering", detail: "Inertial navigation units measure departures from inertial motion." },
      ],
      mistakes: [
        {
          wrong: "Assuming any frame at rest is inertial.",
          why: "'At rest' relative to what? A frame at rest on a rotating platform is non-inertial.",
          right: "Test with a force-free body.",
          trick: "Rest is not the test; straight-line motion is.",
        },
      ],
      exam: {
        definition: "An inertial frame is one in which a body under no net external force moves with constant velocity, so Newton's laws hold without pseudo-forces.",
        derivation: [
          "Let S be inertial and S′ move with constant V⃗ relative to S.",
          "Then a⃗′ = a⃗.",
          "If F⃗ = ma⃗ in S, then F⃗ = ma⃗′ in S′ as well.",
          "Hence S′ is also inertial: inertial frames form a family related by Galilean transformations.",
        ],
        keyFormula: "\\vec{F}=m\\vec{a}\\quad(\\text{inertial frames})",
        twoMark: { q: "Define an inertial frame of reference.", a: "A frame in which a body experiencing no net force has zero acceleration; Newton's laws hold in their simple form." },
        fiveMark: { q: "Show that all frames moving with uniform velocity relative to an inertial frame are inertial.", a: "Proof as in the derivation: constant relative velocity gives equal accelerations in the two frames, so F⃗ = ma⃗ holds in both." },
        numerical: { q: "Find the centripetal acceleration of a point on the equator due to Earth's rotation.", a: "a = ω²R = (7.29 × 10⁻⁵)²(6.37 × 10⁶) ≈ 0.034 m s⁻²." },
        checklist: ["Definition", "Family of inertial frames", "Earth is approximately inertial", "No pseudo-forces needed"],
      },
      quiz: [
        { id: "d2a", level: "basic", q: "In an inertial frame a force-free body", options: ["accelerates", "moves with constant velocity", "stops", "rotates"], answer: 1, hint: "Newton's first law.", explain: "Zero net force means zero acceleration." },
        { id: "d2b", level: "basic", q: "Pseudo-forces are needed in", options: ["inertial frames", "non-inertial frames", "all frames", "no frame"], answer: 1, hint: "Correction terms.", explain: "They appear only in accelerating or rotating frames." },
        { id: "d2c", level: "basic", q: "A frame moving at constant velocity relative to an inertial frame is", options: ["non-inertial", "inertial", "rotating", "undefined"], answer: 1, hint: "Acceleration unchanged.", explain: "Uniform relative motion preserves inertiality." },
        { id: "d2d", level: "application", q: "A car taking a bend at constant speed is", options: ["inertial", "non-inertial", "at rest", "in free fall"], answer: 1, hint: "Direction changes.", explain: "Changing direction is acceleration, so the car frame is non-inertial." },
        { id: "d2e", level: "application", q: "Earth's surface is treated as inertial because", options: ["it does not rotate", "the rotational acceleration is small", "gravity cancels it", "it is flat"], answer: 1, hint: "0.034 m s⁻² vs 9.8 m s⁻².", explain: "The correction is small for most laboratory experiments." },
        { id: "d2f", level: "challenge", q: "A freely falling lift is a good local inertial frame because", options: ["gravity vanishes", "gravity and the frame's acceleration cancel in the frame", "there is no air", "it is closed"], answer: 1, hint: "Equivalence principle.", explain: "The pseudo-force exactly cancels gravity locally, so bodies appear force-free." },
      ],
      summary: {
        points: [
          "Inertial frames are where Newton's first law holds exactly.",
          "All frames uniformly moving relative to one are inertial too.",
          "Rotating or accelerating frames are non-inertial.",
          "Earth is only approximately inertial.",
          "Free fall gives a good local inertial frame.",
        ],
        recap: ["\\vec{F}=m\\vec{a}", "\\vec{a}'=\\vec{a}\\ \\text{for constant }\\vec{V}"],
        memoryMap: ["Free body", "Straight line", "No pseudo-force", "Galilean family", "Earth approx"],
      },
    }),
    T({
      id: "non-inertial-frame",
      title: "Non-Inertial Frames and Pseudo-Forces",
      minutes: 10,
      awaken: {
        hook: "A bus brakes and you lurch forward. Nothing pushed you — yet in the bus's frame something certainly did.",
        curiosity: "Are pseudo-forces real? They can certainly break your nose.",
        realWorld: "Seat belts, aircraft manoeuvres, washing machines, amusement rides.",
        objective: "Write Newton's law in an accelerating frame and identify the pseudo-force.",
      },
      understand: {
        simple: "If your frame accelerates, you must add a fictitious force −mA⃗ to make F = ma work. It is not caused by any physical interaction, but within that frame its effects are perfectly real.",
        analogy: "Coffee sloshing backwards in a car that accelerates: from the road nothing pushed it; from inside the car something clearly did.",
        demo: "Set the platform acceleration and watch the pseudo-force arrow appear on the block.",
        eli5: "Accelerating frame? Add a fake force to balance the books.",
      },
      definition: {
        formal:
          "In a frame S′ accelerating with A⃗ relative to an inertial frame, a particle of mass m obeys ma⃗′ = F⃗_real − mA⃗. The extra term −mA⃗ is the pseudo-force (inertial force). It has no reaction partner and no physical source; it disappears when the description returns to an inertial frame.",
        conditions: ["Frame acceleration A⃗ known.", "Non-relativistic mechanics.", "For rotating frames, extra centrifugal and Coriolis terms appear."],
        vocabulary: [
          { term: "Pseudo-force", meaning: "−mA⃗, an inertial correction term." },
          { term: "d'Alembert's principle", meaning: "Treating −ma⃗ as a force to convert dynamics into statics." },
        ],
        units: "Newtons, as for any force.",
        assumptions: ["Rigid frame.", "Mass constant."],
      },
      sim: "reference-frame",
      simBrief: "Accelerate the frame and compare the inertial and non-inertial descriptions side by side.",
      staticFallback:
        "Static diagram: a pendulum inside an accelerating vehicle hangs at angle θ backwards; the non-inertial free-body diagram shows tension, weight and the pseudo-force ma, with tan θ = a/g.",
      steps: ["Find the frame's acceleration A⃗.", "Draw all real forces.", "Add −mA⃗ on every mass.", "Apply ΣF⃗ = ma⃗′ within the frame.", "Check the result against the inertial-frame answer."],
      prediction: "In an accelerating car, will a helium balloon tied to the floor lean forwards or backwards?",
      formulas: [
        {
          tex: "m\\vec{a}\\,'=\\vec{F}_{real}-m\\vec{A}",
          name: "Newton's law in a linearly accelerating frame",
          where: [
            { sym: "\\vec{A}", meaning: "acceleration of the frame", unit: "m s⁻²" },
            { sym: "-m\\vec{A}", meaning: "pseudo-force", unit: "N" },
          ],
          conditions: ["Translating (non-rotating) accelerating frame."],
          rearranged: ["\\tan\\theta=\\frac{a}{g}\\ (\\text{pendulum in an accelerating vehicle})"],
        },
      ],
      examples: [
        {
          title: "Simple: pendulum in a lift",
          problem: "A lift accelerates upward at 2 m s⁻². What is the apparent weight of a 50 kg person?",
          steps: ["N − mg = ma.", "N = m(g + a) = 50(9.8 + 2)."],
          answer: "590 N (about 20% heavier than at rest)",
        },
        {
          title: "Exam style: accelerating trolley",
          problem: "A pendulum hangs in a trolley accelerating horizontally at a. Find its equilibrium angle.",
          steps: [
            "In the trolley frame the bob is in equilibrium under T, mg and the pseudo-force ma backwards.",
            "Horizontal: T sin θ = ma.",
            "Vertical: T cos θ = mg.",
            "Dividing: tan θ = a/g.",
          ],
          answer: "θ = tan⁻¹(a/g), leaning backwards",
        },
      ],
      realLife: [
        { where: "Vehicles", detail: "Seat belts oppose the forward pseudo-force felt when braking." },
        { where: "Technology", detail: "Accelerometers in phones effectively measure pseudo-forces on a tiny test mass." },
      ],
      mistakes: [
        {
          wrong: "Applying a pseudo-force while also working in the ground frame.",
          why: "Double counting — the pseudo-force exists only in the accelerating frame.",
          right: "Choose one frame and stay consistent.",
          trick: "One frame at a time.",
        },
      ],
      exam: {
        definition: "A non-inertial frame is one that accelerates relative to an inertial frame; in it Newton's second law requires an additional pseudo-force −mA⃗.",
        derivation: [
          "In the inertial frame: F⃗_real = ma⃗.",
          "Positions relate as r⃗ = r⃗′ + R⃗, so a⃗ = a⃗′ + A⃗.",
          "Substituting: F⃗_real = m(a⃗′ + A⃗).",
          "Rearranging: ma⃗′ = F⃗_real − mA⃗.",
        ],
        keyFormula: "m\\vec{a}\\,'=\\vec{F}_{real}-m\\vec{A}",
        twoMark: { q: "What is a pseudo-force?", a: "An apparent force −mA⃗ that must be added in a non-inertial frame so that Newton's second law can be applied; it has no physical source or reaction partner." },
        fiveMark: { q: "Derive the equation of motion in a linearly accelerating frame and apply it to a pendulum in an accelerating car.", a: "Derivation as above; the pendulum settles at tan θ = a/g with the bob displaced opposite to the acceleration." },
        numerical: { q: "A lift descends with acceleration 3 m s⁻². Find the apparent weight of a 60 kg person.", a: "N = m(g − a) = 60(9.8 − 3) = 408 N." },
        checklist: ["Definition of pseudo-force", "Equation of motion", "Lift problems", "Pendulum angle", "No reaction pair"],
      },
      quiz: [
        { id: "d3a", level: "basic", q: "A pseudo-force acts", options: ["in inertial frames", "in non-inertial frames", "always", "never"], answer: 1, hint: "Accelerating observer.", explain: "It appears only in accelerating or rotating frames." },
        { id: "d3b", level: "basic", q: "The pseudo-force on mass m in a frame with acceleration A⃗ is", options: ["mA⃗", "−mA⃗", "mA⃗/2", "zero"], answer: 1, hint: "Opposite to the frame's acceleration.", explain: "−mA⃗." },
        { id: "d3c", level: "basic", q: "A pseudo-force has", options: ["a reaction partner", "no reaction partner", "zero magnitude", "fixed direction"], answer: 1, hint: "Newton's third law needs two bodies.", explain: "It is not an interaction, so there is no reaction force." },
        { id: "d3d", level: "application", q: "In a lift accelerating upward, apparent weight is", options: ["mg", "m(g + a)", "m(g − a)", "zero"], answer: 1, hint: "Normal force increases.", explain: "N = m(g + a)." },
        { id: "d3e", level: "application", q: "A pendulum in a car accelerating forward hangs", options: ["vertically", "forwards", "backwards", "horizontally"], answer: 2, hint: "Opposite to the acceleration.", explain: "tan θ = a/g, leaning backwards." },
        { id: "d3f", level: "challenge", q: "A helium balloon in an accelerating car moves", options: ["backwards", "forwards", "stays vertical", "downwards"], answer: 1, hint: "Think about the air's pressure gradient.", explain: "The air piles up at the back, so the pressure gradient pushes the light balloon forward." },
      ],
      summary: {
        points: [
          "Non-inertial frames accelerate relative to inertial ones.",
          "Add −mA⃗ to use F = ma inside them.",
          "Pseudo-forces have no reaction partner.",
          "Lift and accelerating-vehicle problems are the standard examples.",
          "Never mix frames in a single free-body diagram.",
        ],
        recap: ["m\\vec{a}\\,'=\\vec{F}_{real}-m\\vec{A}", "\\tan\\theta=\\frac{a}{g}"],
        memoryMap: ["Frame accelerates", "Add −mA", "Free-body diagram", "Solve", "Compare frames"],
      },
    }),
    T({
      id: "rotating-frame",
      title: "Rotating Frames",
      minutes: 12,
      awaken: {
        hook: "Stand on a spinning platform and the whole universe seems to conspire with two new forces.",
        curiosity: "Why do two different fictitious forces appear when the frame rotates, instead of just one?",
        realWorld: "Centrifuges, weather systems, gyroscopes, rotating space habitats.",
        objective: "Write the equation of motion in a rotating frame and identify centrifugal and Coriolis terms.",
      },
      understand: {
        simple: "In a rotating frame you need two corrections: one that pushes outward and depends on position (centrifugal), and one that deflects moving objects sideways and depends on velocity (Coriolis).",
        analogy: "Rolling a ball across a spinning roundabout: it drifts sideways even though nothing touched it.",
        demo: "Set ω and launch a ball; toggle between ground view (straight) and rotating view (curved).",
        eli5: "Spinning frame = outward push + sideways twist.",
      },
      definition: {
        formal:
          "For a frame rotating with constant angular velocity ω⃗ relative to an inertial frame, the equation of motion for position r⃗ measured in the rotating frame is ma⃗_rot = F⃗_real − mω⃗×(ω⃗×r⃗) − 2m ω⃗×v⃗_rot. The second term is the centrifugal force and the third is the Coriolis force (an Euler term −m(dω⃗/dt)×r⃗ appears if ω changes).",
        conditions: [
          "ω⃗ constant for the quoted form.",
          "v⃗_rot is the velocity measured in the rotating frame.",
          "Both extra terms are pseudo-forces, not interactions.",
        ],
        vocabulary: [
          { term: "Centrifugal force", meaning: "Outward pseudo-force mω²r_⊥ in the rotating frame." },
          { term: "Coriolis force", meaning: "−2mω⃗×v⃗, perpendicular to the velocity." },
          { term: "Euler force", meaning: "Term arising when the rotation rate changes." },
        ],
        units: "Forces in N, ω in rad s⁻¹.",
        assumptions: ["Rigid rotation.", "Classical mechanics."],
      },
      sim: "rotating-platform",
      simBrief: "Adjust ω and the launch speed; compare inertial and rotating views of the same trajectory.",
      staticFallback:
        "Static diagram: a ball rolled from the centre of a turntable travels in a straight line in the ground frame but traces a curved spiral in the rotating frame, deflected by the Coriolis term.",
      steps: ["Choose the rotation axis and ω⃗.", "Write the real forces.", "Add the centrifugal term −mω⃗×(ω⃗×r⃗).", "Add the Coriolis term −2mω⃗×v⃗_rot.", "Solve in the rotating frame."],
      prediction: "A ball is rolled radially outward on a turntable rotating anticlockwise. In the rotating frame, which way will it curve?",
      formulas: [
        {
          tex: "m\\vec{a}_{rot}=\\vec{F}_{real}-m\\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r})-2m\\vec{\\omega}\\times\\vec{v}_{rot}",
          name: "Equation of motion in a rotating frame",
          where: [
            { sym: "\\vec{\\omega}", meaning: "angular velocity of the frame", unit: "rad s⁻¹" },
            { sym: "\\vec{v}_{rot}", meaning: "velocity measured in the rotating frame", unit: "m s⁻¹" },
          ],
          conditions: ["Constant ω⃗.", "Non-relativistic."],
          rearranged: ["F_{cf}=m\\omega^{2}r_{\\perp}", "\\vec{F}_{Cor}=-2m\\vec{\\omega}\\times\\vec{v}"],
        },
      ],
      examples: [
        {
          title: "Simple: centrifugal force on a rotor",
          problem: "A 0.2 kg mass sits 0.5 m from the axis of a turntable rotating at 4 rad s⁻¹. Find the centrifugal force in the rotating frame.",
          steps: ["F = mω²r = 0.2 × 16 × 0.5."],
          answer: "1.6 N outward",
        },
        {
          title: "Exam style: both pseudo-forces",
          problem: "A particle moves radially outward at 3 m s⁻¹ at radius 2 m on a platform with ω = 2 rad s⁻¹. Find both pseudo-forces per unit mass.",
          steps: [
            "Centrifugal: ω²r = 4 × 2 = 8 m s⁻² outward.",
            "Coriolis: 2ωv = 2 × 2 × 3 = 12 m s⁻².",
            "Coriolis is perpendicular to the velocity, opposite to the rotation sense for outward motion.",
          ],
          answer: "8 m s⁻² radially outward and 12 m s⁻² tangential (Coriolis)",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Laboratory centrifuges separate blood components using large centrifugal effects." },
        { where: "Weather", detail: "Cyclonic rotation is produced by the Coriolis term acting on air moving towards low pressure." },
        { where: "Space", detail: "Rotating habitats would create artificial gravity from the centrifugal term." },
      ],
      mistakes: [
        {
          wrong: "Calling centrifugal force the reaction to centripetal force.",
          why: "Centripetal force is a real force in an inertial frame; centrifugal force is a pseudo-force in the rotating frame. They are not an action–reaction pair.",
          right: "Keep them in separate frames.",
          trick: "Centripetal is real, centrifugal is a frame effect.",
        },
      ],
      exam: {
        definition: "A rotating frame is a non-inertial frame rotating with angular velocity ω⃗; in it, motion requires centrifugal and Coriolis pseudo-forces.",
        derivation: [
          "For any vector, (dA⃗/dt)_inertial = (dA⃗/dt)_rot + ω⃗×A⃗.",
          "Apply to r⃗: v⃗_in = v⃗_rot + ω⃗×r⃗.",
          "Apply the operator again to v⃗_in to get a⃗_in = a⃗_rot + 2ω⃗×v⃗_rot + ω⃗×(ω⃗×r⃗).",
          "Insert into F⃗ = ma⃗_in and rearrange for ma⃗_rot.",
        ],
        keyFormula: "\\left(\\frac{d}{dt}\\right)_{in}=\\left(\\frac{d}{dt}\\right)_{rot}+\\vec{\\omega}\\times",
        twoMark: { q: "Name the pseudo-forces in a rotating frame.", a: "The centrifugal force −mω⃗×(ω⃗×r⃗) and the Coriolis force −2mω⃗×v⃗ (plus the Euler force if ω changes)." },
        fiveMark: { q: "Derive the expression for acceleration in a rotating frame.", a: "Using the operator relation twice as above gives a⃗_in = a⃗_rot + 2ω⃗×v⃗_rot + ω⃗×(ω⃗×r⃗), hence the stated equation of motion." },
        numerical: { q: "Find the Coriolis acceleration of a body moving at 10 m s⁻¹ perpendicular to ω = 0.5 rad s⁻¹.", a: "2ωv = 2 × 0.5 × 10 = 10 m s⁻²." },
        checklist: ["Operator relation", "Both pseudo-force terms", "Signs and directions", "Centrifugal vs centripetal", "Euler term condition"],
      },
      quiz: [
        { id: "d4a", level: "basic", q: "The Coriolis force depends on", options: ["position only", "velocity in the rotating frame", "mass only", "time"], answer: 1, hint: "It has v in it.", explain: "F⃗ = −2mω⃗×v⃗ requires motion in the rotating frame." },
        { id: "d4b", level: "basic", q: "Centrifugal force is directed", options: ["inward", "outward from the axis", "along ω⃗", "along v⃗"], answer: 1, hint: "Away from the axis.", explain: "It points radially outward with magnitude mω²r." },
        { id: "d4c", level: "basic", q: "A stationary object in a rotating frame experiences", options: ["Coriolis only", "centrifugal only", "both", "neither"], answer: 1, hint: "v_rot = 0.", explain: "With zero velocity the Coriolis term vanishes." },
        { id: "d4d", level: "application", q: "Centrifugal force magnitude is", options: ["mωr", "mω²r", "2mωv", "mv²ω"], answer: 1, hint: "Same form as centripetal.", explain: "mω²r." },
        { id: "d4e", level: "application", q: "The Coriolis force is always", options: ["parallel to v⃗", "perpendicular to v⃗", "zero", "along ω⃗"], answer: 1, hint: "Cross product.", explain: "Being a cross product with v⃗, it does no work." },
        { id: "d4f", level: "challenge", q: "The Coriolis force does work on a particle equal to", options: ["positive", "negative", "zero", "mω²r"], answer: 2, hint: "F⃗·v⃗.", explain: "It is perpendicular to v⃗, so it can change direction but not speed." },
      ],
      summary: {
        points: [
          "Rotating frames need two pseudo-forces.",
          "Centrifugal: mω²r outward, depends on position.",
          "Coriolis: 2mωv perpendicular, depends on velocity.",
          "The operator relation d/dt|in = d/dt|rot + ω⃗× derives both.",
          "Coriolis does no work.",
        ],
        recap: ["m\\vec{a}_{rot}=\\vec{F}-m\\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r})-2m\\vec{\\omega}\\times\\vec{v}", "F_{cf}=m\\omega^{2}r"],
        memoryMap: ["Rotation", "Operator rule", "Centrifugal", "Coriolis", "Equation of motion"],
      },
      assemble: { prompt: "Assemble the rotating-frame equation of motion.", tokens: ["m\\vec{a}_{rot}", "=", "\\vec{F}_{real}", "-", "m\\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r})", "-", "2m\\vec{\\omega}\\times\\vec{v}_{rot}"] },
    }),
    T({
      id: "centrifugal-force",
      title: "Centrifugal Force",
      minutes: 9,
      awaken: {
        hook: "A spin-dryer does not pull water outward. It simply stops pulling it inward, and the water keeps going.",
        curiosity: "If centrifugal force is 'fictitious', why does it throw the mud off a bicycle tyre?",
        realWorld: "Centrifuges, banked roads, washing machines, planetary equatorial bulge.",
        objective: "Use the centrifugal term correctly and distinguish it from centripetal force.",
      },
      understand: {
        simple: "In a rotating frame, everything feels pushed away from the axis with force mω²r. From outside, nothing is pushing: the object simply tries to move straight while the frame turns beneath it.",
        analogy: "On a merry-go-round you feel flung outward; a bystander just sees you trying to go straight.",
        demo: "Increase ω and watch the outward arrow on the block grow as ω².",
        eli5: "Spin fast, feel pushed out — that is the frame, not a real push.",
      },
      definition: {
        formal:
          "In a frame rotating with angular velocity ω, a particle at perpendicular distance r_⊥ from the axis experiences the pseudo-force F⃗_cf = −mω⃗×(ω⃗×r⃗), of magnitude mω²r_⊥ directed radially outward from the rotation axis.",
        conditions: ["Only in the rotating frame.", "Magnitude uses the perpendicular distance from the axis."],
        vocabulary: [
          { term: "Centripetal force", meaning: "Real inward force required for circular motion in an inertial frame." },
          { term: "Banking angle", meaning: "Road tilt that provides the centripetal force without friction." },
        ],
        units: "Newtons; ω in rad s⁻¹; r in m.",
        assumptions: ["Constant ω.", "Rigid rotation."],
      },
      sim: "rotating-platform",
      simBrief: "Place a block at different radii and read mω²r as you change ω.",
      staticFallback:
        "Static diagram: a block on a rotating turntable. Inertial view: friction provides inward centripetal force. Rotating view: friction inward balanced by centrifugal force outward, so the block is in equilibrium.",
      steps: ["Identify the rotation axis.", "Measure the perpendicular distance r_⊥.", "Compute mω²r_⊥.", "Draw it outward from the axis.", "Combine with real forces in the rotating frame."],
      formulas: [
        {
          tex: "F_{cf}=m\\omega^{2}r_{\\perp}=\\frac{mv^{2}}{r_{\\perp}}",
          name: "Centrifugal force magnitude",
          where: [
            { sym: "r_{\\perp}", meaning: "perpendicular distance from the rotation axis", unit: "m" },
            { sym: "\\omega", meaning: "angular speed", unit: "rad s⁻¹" },
          ],
          conditions: ["Rotating frame only.", "v = ωr_⊥ is the speed in the inertial frame."],
          rearranged: ["\\tan\\theta=\\frac{v^{2}}{rg}\\ (\\text{banking})"],
        },
      ],
      examples: [
        {
          title: "Simple: centrifuge",
          problem: "A sample of mass 0.01 kg sits 0.1 m from the axis of a centrifuge spinning at 300 rad s⁻¹. Find the centrifugal force.",
          steps: ["F = mω²r = 0.01 × 90000 × 0.1."],
          answer: "9000 N — about 9 × 10⁴ times its weight",
        },
        {
          title: "Exam style: banked road",
          problem: "Find the banking angle for a curve of radius 50 m to be safely taken at 20 m s⁻¹ without friction.",
          steps: [
            "In the rotating frame, N sin θ balances centrifugal mv²/r and N cos θ balances mg.",
            "tan θ = v²/(rg) = 400/(50 × 9.8) = 0.816.",
            "θ = 39.2°.",
          ],
          answer: "About 39°",
        },
      ],
      realLife: [
        { where: "Daily life", detail: "A washing-machine spin cycle removes water by removing the inward force that would hold it in." },
        { where: "Space", detail: "Earth's equatorial bulge results from the centrifugal effect of its rotation." },
        { where: "Vehicles", detail: "Racetracks are banked so that the normal force supplies the needed centripetal force." },
      ],
      mistakes: [
        {
          wrong: "Saying centrifugal force throws objects outward in the ground frame.",
          why: "In the ground frame nothing pushes outward; the object moves tangentially while the constraint is removed.",
          right: "Use centrifugal force only within the rotating frame.",
          trick: "Outward feeling, straight-line reality.",
        },
      ],
      exam: {
        definition: "Centrifugal force is the outward pseudo-force mω²r_⊥ experienced by a body in a rotating frame of reference.",
        derivation: [
          "In the rotating frame, a body at rest has a⃗_rot = 0.",
          "From ma⃗_rot = F⃗_real − mω⃗×(ω⃗×r⃗) − 2mω⃗×v⃗_rot with v⃗_rot = 0.",
          "0 = F⃗_real − mω⃗×(ω⃗×r⃗).",
          "So the real inward force is balanced by the outward centrifugal term of magnitude mω²r_⊥.",
        ],
        keyFormula: "F_{cf}=m\\omega^{2}r_{\\perp}",
        twoMark: { q: "Distinguish centripetal and centrifugal force.", a: "Centripetal force is a real inward force needed for circular motion, observed in an inertial frame; centrifugal force is an outward pseudo-force appearing only in the rotating frame." },
        fiveMark: { q: "Obtain the expression for centrifugal force and apply it to find the banking angle of a road.", a: "Derivation as above gives mω²r outward. For banking without friction, N sin θ = mv²/r and N cos θ = mg, so tan θ = v²/rg." },
        numerical: { q: "A 2 kg stone whirls in a circle of radius 1 m at 5 rad s⁻¹. Find the centrifugal force in the rotating frame.", a: "F = 2 × 25 × 1 = 50 N outward." },
        checklist: ["Formula and direction", "Rotating frame only", "Difference from centripetal", "Banking application", "Equatorial bulge"],
      },
      quiz: [
        { id: "d5a", level: "basic", q: "Centrifugal force magnitude is", options: ["mωr", "mω²r", "mv r", "mg"], answer: 1, hint: "Quadratic in ω.", explain: "mω²r_⊥." },
        { id: "d5b", level: "basic", q: "Centrifugal force exists in", options: ["inertial frames", "rotating frames", "all frames", "no frame"], answer: 1, hint: "Pseudo-force.", explain: "It appears only in the rotating frame." },
        { id: "d5c", level: "basic", q: "Doubling ω changes the centrifugal force by a factor", options: ["2", "4", "1/2", "8"], answer: 1, hint: "ω².", explain: "It scales as ω²." },
        { id: "d5d", level: "application", q: "Banking angle satisfies", options: ["tan θ = v²/rg", "sin θ = v/rg", "tan θ = rg/v²", "θ = v/r"], answer: 0, hint: "Resolve the normal force.", explain: "tan θ = v²/(rg)." },
        { id: "d5e", level: "application", q: "Earth's equatorial bulge is due to", options: ["Coriolis force", "centrifugal effect of rotation", "tides only", "magnetism"], answer: 1, hint: "Largest at the equator.", explain: "Rotation reduces the effective gravity most at the equator, producing a bulge." },
        { id: "d5f", level: "challenge", q: "Centrifugal and centripetal forces are", options: ["an action–reaction pair", "described in different frames", "always equal and opposite on the same body in the same frame", "both real"], answer: 1, hint: "Think about which frame each belongs to.", explain: "They belong to different descriptions; they are not a Newton's-third-law pair." },
      ],
      summary: {
        points: [
          "F_cf = mω²r_⊥ outward, in the rotating frame only.",
          "It is a pseudo-force, not an interaction.",
          "Centripetal force is the real inward force in the inertial frame.",
          "Banking uses tan θ = v²/rg.",
          "It scales as the square of the rotation rate.",
        ],
        recap: ["F_{cf}=m\\omega^{2}r_{\\perp}", "\\tan\\theta=\\frac{v^{2}}{rg}"],
        memoryMap: ["Rotating frame", "Axis distance", "mω²r", "Outward", "Banking"],
      },
    }),
    T({
      id: "coriolis-force",
      title: "Coriolis Force",
      minutes: 13,
      awaken: {
        hook: "Fire a shell a hundred kilometres north and it lands to the east of where you aimed. The Earth turned while it flew.",
        curiosity: "Why do cyclones spin anticlockwise in the northern hemisphere and clockwise in the southern?",
        realWorld: "Weather systems, ocean gyres, long-range artillery, aircraft navigation.",
        objective: "Compute the Coriolis force and predict deflection directions on the rotating Earth.",
      },
      understand: {
        simple: "Anything moving in a rotating frame gets pushed sideways, perpendicular to its velocity. On Earth this deflects motion to the right in the northern hemisphere and to the left in the southern.",
        analogy: "Throwing a ball across a spinning roundabout: it lands far from where you aimed, because the target moved while the ball flew straight.",
        demo: "Launch a projectile on the globe and trace both the ground track and the inertial-frame path.",
        eli5: "Moving on a spinning planet? Your path bends sideways.",
      },
      definition: {
        formal:
          "The Coriolis force in a frame rotating with angular velocity ω⃗ is F⃗_Cor = −2m ω⃗×v⃗_rot. It is perpendicular to both ω⃗ and the velocity, vanishes for a body at rest in the rotating frame, and does no work. On Earth the horizontal deflection has magnitude 2mΩv sin λ, where λ is the latitude.",
        conditions: ["Body must be moving in the rotating frame.", "Sign convention: deflection to the right in the northern hemisphere (Ω > 0)."],
        vocabulary: [
          { term: "Coriolis parameter f", meaning: "2Ω sin λ, used in meteorology, unit s⁻¹." },
          { term: "Geostrophic wind", meaning: "Flow where the pressure gradient force balances the Coriolis force." },
        ],
        units: "Force in N; Ω_Earth = 7.292 × 10⁻⁵ rad s⁻¹.",
        assumptions: ["Constant Ω.", "Deflection effects accumulate over long distances and times."],
      },
      sim: "coriolis-globe",
      simBrief: "Set latitude, speed and direction; the simulation traces the deflected ground path.",
      staticFallback:
        "Static diagram: a globe with an arrow launched northwards from the equator curving to the east (right) in the northern hemisphere, and a matching southern-hemisphere arrow curving left.",
      steps: ["Find ω⃗ and v⃗_rot.", "Compute the cross product ω⃗×v⃗.", "Multiply by −2m.", "Resolve into horizontal and vertical components.", "Use 2mΩv sin λ for the horizontal deflection."],
      prediction: "A train travels due north in the northern hemisphere. Which rail will it press against more?",
      formulas: [
        {
          tex: "\\vec{F}_{Cor}=-2m\\,\\vec{\\omega}\\times\\vec{v}_{rot}",
          name: "Coriolis force",
          where: [
            { sym: "\\vec{\\omega}", meaning: "angular velocity of the frame", unit: "rad s⁻¹" },
            { sym: "\\vec{v}_{rot}", meaning: "velocity in the rotating frame", unit: "m s⁻¹" },
          ],
          conditions: ["Rotating frame.", "Non-zero relative velocity."],
          rearranged: ["F_{horizontal}=2m\\Omega v\\sin\\lambda", "f=2\\Omega\\sin\\lambda"],
          dimensional: "[F]=\\text{kg m s}^{-2}",
        },
      ],
      examples: [
        {
          title: "Simple: Coriolis acceleration",
          problem: "Find the Coriolis acceleration of a body moving at 100 m s⁻¹ at latitude 30°N.",
          steps: ["a = 2Ωv sin λ = 2(7.29 × 10⁻⁵)(100)(0.5)."],
          answer: "≈ 7.3 × 10⁻³ m s⁻², directed to the right of the motion",
        },
        {
          title: "Exam style: deflection of a falling body and a projectile",
          problem: "Explain why a body falling freely near the equator is deflected eastward, and why a northward-moving object in the northern hemisphere deflects east.",
          steps: [
            "Falling body: at height h it has a larger eastward velocity (ωr is greater at larger r) than the ground below.",
            "Conserving that eastward momentum, it lands slightly east of the plumb line.",
            "Northward motion: the horizontal Coriolis term 2Ωv sin λ acts to the right, i.e. eastward.",
            "The magnitude grows with latitude, vanishing at the equator for horizontal motion.",
          ],
          answer: "Both are consequences of −2mω⃗×v⃗; deflection is to the right in the northern hemisphere.",
        },
      ],
      realLife: [
        { where: "Weather", detail: "Cyclones rotate anticlockwise in the north and clockwise in the south because of the Coriolis deflection of inflowing air." },
        { where: "Engineering", detail: "Long-range artillery and rocket guidance include Coriolis corrections." },
        { where: "Space", detail: "Ocean gyres and atmospheric jet streams are shaped by the same term." },
      ],
      mistakes: [
        {
          wrong: "Claiming the Coriolis force determines which way a sink drains.",
          why: "In a basin the effect is millions of times smaller than the influence of the basin's shape and initial swirl.",
          right: "The Coriolis effect matters over large scales and long times, as in weather systems.",
          trick: "Storms yes, sinks no.",
        },
        {
          wrong: "Thinking the Coriolis force changes a body's speed.",
          why: "It is always perpendicular to the velocity, so it does no work.",
          right: "It changes direction only.",
          trick: "Sideways, never faster.",
        },
      ],
      exam: {
        definition: "The Coriolis force is the pseudo-force −2mω⃗×v⃗ acting on a body moving in a rotating frame, perpendicular to its velocity.",
        derivation: [
          "Use (d/dt)_in = (d/dt)_rot + ω⃗×.",
          "Apply twice to r⃗: a⃗_in = a⃗_rot + 2ω⃗×v⃗_rot + ω⃗×(ω⃗×r⃗).",
          "Insert into F⃗ = ma⃗_in and solve for ma⃗_rot.",
          "The term −2mω⃗×v⃗_rot is the Coriolis force.",
          "Its horizontal component on Earth is 2mΩv sin λ, directed to the right in the northern hemisphere.",
        ],
        keyFormula: "F_{Cor}=2m\\Omega v\\sin\\lambda",
        twoMark: { q: "State the expression for the Coriolis force and its direction on Earth.", a: "F⃗ = −2mω⃗×v⃗; it deflects moving bodies to the right in the northern hemisphere and to the left in the southern hemisphere." },
        fiveMark: { q: "Discuss the geophysical effects of the Coriolis force.", a: "It deflects trade winds, sets the rotation sense of cyclones and anticyclones, shapes ocean gyres, causes slight extra wear on one rail of long north–south railway lines, and deflects long-range projectiles. Its magnitude 2Ωv sin λ vanishes at the equator (for horizontal motion) and is greatest at the poles." },
        numerical: { q: "Find the Coriolis acceleration at the pole for v = 50 m s⁻¹.", a: "a = 2Ωv sin 90° = 2(7.29 × 10⁻⁵)(50) ≈ 7.3 × 10⁻³ m s⁻²." },
        checklist: ["Formula and direction", "Latitude dependence", "Zero work", "Cyclone rotation", "Common misconceptions"],
      },
      quiz: [
        { id: "d6a", level: "basic", q: "The Coriolis force is proportional to", options: ["r", "v", "v²", "1/r"], answer: 1, hint: "Linear in speed.", explain: "F = 2mΩv sin λ." },
        { id: "d6b", level: "basic", q: "In the northern hemisphere moving bodies deflect to the", options: ["left", "right", "east always", "west always"], answer: 1, hint: "Standard result.", explain: "Deflection is to the right of the velocity." },
        { id: "d6c", level: "basic", q: "The Coriolis force on a stationary body is", options: ["maximum", "zero", "mω²r", "mg"], answer: 1, hint: "v = 0.", explain: "No relative velocity, no Coriolis force." },
        { id: "d6d", level: "application", q: "The horizontal Coriolis effect is zero at", options: ["the poles", "the equator", "45° latitude", "everywhere"], answer: 1, hint: "sin λ = 0.", explain: "At λ = 0 the horizontal component vanishes." },
        { id: "d6e", level: "application", q: "Cyclones in the southern hemisphere rotate", options: ["anticlockwise", "clockwise", "randomly", "not at all"], answer: 1, hint: "Deflection is to the left there.", explain: "Inflowing air deflects left, producing clockwise circulation." },
        { id: "d6f", level: "challenge", q: "The Coriolis force does work equal to", options: ["Fv", "zero", "½mv²", "2mΩv"], answer: 1, hint: "Perpendicular to v⃗.", explain: "F⃗·v⃗ = 0, so it cannot change kinetic energy." },
      ],
      summary: {
        points: [
          "F⃗_Cor = −2mω⃗×v⃗, perpendicular to velocity.",
          "Horizontal magnitude on Earth: 2mΩv sin λ.",
          "Right in the north, left in the south.",
          "Zero for bodies at rest and does no work.",
          "Dominates large-scale weather and ocean circulation.",
        ],
        recap: ["\\vec{F}_{Cor}=-2m\\vec{\\omega}\\times\\vec{v}", "f=2\\Omega\\sin\\lambda"],
        memoryMap: ["Rotation", "Motion", "Cross product", "Sideways push", "Weather"],
      },
      assemble: { prompt: "Assemble the Coriolis force.", tokens: ["\\vec{F}_{Cor}", "=", "-2m", "\\vec{\\omega}\\times\\vec{v}_{rot}"] },
    }),
    T({
      id: "centrifugal-effect-on-g",
      title: "Effect of Centrifugal Force on g",
      minutes: 10,
      awaken: {
        hook: "You weigh slightly less at the equator than at the poles — and the Earth's spin is the reason.",
        curiosity: "How much of your weight does the planet's rotation steal?",
        realWorld: "Precision gravimetry, satellite launch site selection, geodesy.",
        objective: "Derive the latitude variation of effective gravity due to rotation.",
      },
      understand: {
        simple: "Part of the true gravitational pull is used up in keeping you moving in a circle with the rotating Earth. What remains is the effective gravity you actually measure.",
        analogy: "Pushing a friend on a roundabout: some of your pull just keeps them circling, leaving less to hold them against the rail.",
        demo: "Slide the latitude and read the effective g, with the two components drawn to scale.",
        eli5: "Spinning Earth makes you feel a bit lighter, most at the equator.",
      },
      definition: {
        formal:
          "At latitude λ, the effective acceleration due to gravity is g_eff ≈ g − ω²R cos²λ (for the component along the local vertical), where g is the value with no rotation, R the Earth's radius and ω its angular speed. The centrifugal term also tilts the plumb line slightly away from the true radial direction, except at the equator and poles.",
        conditions: [
          "Spherical Earth approximation for this simple formula.",
          "The real variation of g also includes the equatorial bulge, which roughly doubles the observed pole-to-equator difference.",
        ],
        vocabulary: [
          { term: "Effective gravity", meaning: "Vector sum of gravitational attraction and the centrifugal term." },
          { term: "Plumb line", meaning: "Direction of effective gravity, not exactly towards the centre." },
        ],
        units: "g in m s⁻², ω = 7.292 × 10⁻⁵ rad s⁻¹, R ≈ 6.37 × 10⁶ m.",
        assumptions: ["Uniform spherical Earth.", "Rotation rate constant."],
      },
      sim: "gravity-latitude",
      simBrief: "Move the latitude slider to see the centrifugal component and resulting g_eff.",
      staticFallback:
        "Static diagram: Earth cross-section with a point at latitude λ. Gravity points to the centre; the centrifugal vector ω²R cos λ points away from the rotation axis; their sum is the tilted effective gravity.",
      steps: ["Compute the distance from the axis: R cos λ.", "Centrifugal acceleration = ω²R cos λ, directed away from the axis.", "Resolve along the local vertical: ω²R cos²λ.", "Subtract from g.", "Note the small tangential component that tilts the plumb line."],
      prediction: "At which latitude is the reduction in g due to rotation greatest?",
      formulas: [
        {
          tex: "g_{eff}=g-\\omega^{2}R\\cos^{2}\\lambda",
          name: "Latitude variation of effective gravity",
          where: [
            { sym: "\\lambda", meaning: "latitude", unit: "degree or rad" },
            { sym: "\\omega", meaning: "Earth's angular speed", unit: "rad s⁻¹" },
            { sym: "R", meaning: "Earth's radius", unit: "m" },
          ],
          conditions: ["Spherical Earth.", "Ignores the equatorial bulge contribution."],
          rearranged: ["\\Delta g_{max}=\\omega^{2}R \\ (\\text{at the equator})"],
        },
      ],
      examples: [
        {
          title: "Simple: equatorial reduction",
          problem: "Find the reduction in g at the equator due to Earth's rotation.",
          steps: ["ω²R = (7.29 × 10⁻⁵)²(6.37 × 10⁶).", "= 0.0338 m s⁻²."],
          answer: "About 0.034 m s⁻², roughly 0.34% of g",
        },
        {
          title: "Exam style: latitude 45°",
          problem: "Compute g_eff at 45° latitude, taking g = 9.830 m s⁻² for a non-rotating sphere.",
          steps: ["cos²45° = 0.5.", "Correction = 0.0338 × 0.5 = 0.0169 m s⁻².", "g_eff = 9.830 − 0.017."],
          answer: "≈ 9.813 m s⁻² (the observed value also includes the flattening of the Earth)",
        },
      ],
      realLife: [
        { where: "Space", detail: "Launch sites near the equator gain both a rotational speed boost and marginally lower effective gravity." },
        { where: "Engineering", detail: "Precision balances and gravimeters are calibrated for local latitude." },
      ],
      mistakes: [
        {
          wrong: "Saying gravity itself changes with latitude because of rotation.",
          why: "The gravitational attraction is unchanged; it is the measured effective value that differs.",
          right: "Distinguish true gravitational field from effective gravity.",
          trick: "Same pull, different feel.",
        },
      ],
      exam: {
        definition: "Effective gravity is the resultant of the gravitational attraction and the centrifugal pseudo-force in the rotating Earth frame, giving g_eff = g − ω²R cos²λ along the local vertical.",
        derivation: [
          "A point at latitude λ is at distance R cos λ from the rotation axis.",
          "Centrifugal acceleration = ω²R cos λ, directed outward from the axis.",
          "Its component along the outward radial direction is ω²R cos λ · cos λ = ω²R cos²λ.",
          "This opposes gravity, so g_eff = g − ω²R cos²λ.",
          "The tangential component ω²R cos λ sin λ tilts the plumb line towards the equator.",
        ],
        keyFormula: "g_{eff}=g-\\omega^{2}R\\cos^{2}\\lambda",
        twoMark: { q: "Why is g smaller at the equator than at the poles?", a: "Because the centrifugal effect of Earth's rotation is greatest at the equator (and the Earth also bulges there, increasing the distance from the centre)." },
        fiveMark: { q: "Derive the variation of g with latitude due to Earth's rotation and discuss the plumb-line deviation.", a: "Derivation as above. The tangential component ω²R cos λ sin λ is maximum at 45°, where the plumb-line deviation from the true radial direction is largest, of order 0.1°." },
        numerical: { q: "Estimate the percentage change in g between pole and equator from rotation alone.", a: "0.0338/9.83 ≈ 0.34%." },
        checklist: ["Formula with cos²λ", "Value of ω²R", "Plumb-line tilt maximum at 45°", "Role of the equatorial bulge"],
      },
      quiz: [
        { id: "d7a", level: "basic", q: "g is smallest at the", options: ["poles", "equator", "45° latitude", "all the same"], answer: 1, hint: "Largest centrifugal effect.", explain: "The equator is farthest from the rotation axis." },
        { id: "d7b", level: "basic", q: "The rotational correction varies as", options: ["cos λ", "cos²λ", "sin λ", "sin²λ"], answer: 1, hint: "Resolve twice.", explain: "ω²R cos²λ along the vertical." },
        { id: "d7c", level: "basic", q: "At the poles the centrifugal correction is", options: ["maximum", "zero", "half", "negative"], answer: 1, hint: "Distance from the axis is zero.", explain: "cos 90° = 0." },
        { id: "d7d", level: "application", q: "ω²R for Earth is about", options: ["0.34 m s⁻²", "0.034 m s⁻²", "3.4 m s⁻²", "0.0034 m s⁻²"], answer: 1, hint: "Compute (7.29e−5)² × 6.37e6.", explain: "≈ 0.0338 m s⁻²." },
        { id: "d7e", level: "application", q: "The plumb-line deviation is greatest at", options: ["0°", "45°", "90°", "30°"], answer: 1, hint: "cos λ sin λ is maximum there.", explain: "The product peaks at 45° latitude." },
        { id: "d7f", level: "challenge", q: "If Earth's rotation rate were 17 times faster, at the equator", options: ["g would double", "effective g would approach zero", "nothing would change", "g would reverse"], answer: 1, hint: "Compare ω²R with g.", explain: "ω²R would rise by ~289 times to about 9.8 m s⁻², cancelling gravity at the equator." },
      ],
      summary: {
        points: [
          "Rotation reduces measured gravity.",
          "g_eff = g − ω²R cos²λ.",
          "Maximum reduction 0.034 m s⁻² at the equator.",
          "Zero correction at the poles.",
          "Plumb line tilts most at 45° latitude.",
        ],
        recap: ["g_{eff}=g-\\omega^{2}R\\cos^{2}\\lambda", "\\omega^{2}R\\approx 0.034\\ \\text{m s}^{-2}"],
        memoryMap: ["Latitude", "Axis distance", "Centrifugal", "Resolve", "Effective g"],
      },
    }),
    T({
      id: "freely-falling-bodies",
      title: "Freely Falling Bodies on the Rotating Earth",
      minutes: 10,
      awaken: {
        hook: "Drop a stone down a deep mine shaft and it does not land exactly below the release point. It lands slightly east.",
        curiosity: "Why east, and not west?",
        realWorld: "Deep-shaft experiments, ballistics, precision drop tests.",
        objective: "Derive the eastward deflection of a freely falling body and estimate its size.",
      },
      understand: {
        simple: "At the top of the shaft you are farther from the rotation axis, so you are already moving east faster than the bottom of the shaft. As you fall you keep that extra eastward speed and land ahead of the target.",
        analogy: "Jumping off the outer edge of a moving carousel: you keep the larger sideways speed you had at the edge.",
        demo: "Drop the marker from different heights and see the eastward offset grow as h^{3/2}.",
        eli5: "The top of the tower moves east faster, so falling objects drift east.",
      },
      definition: {
        formal:
          "For a body released from rest at height h at latitude λ, the Coriolis force produces an eastward deflection of magnitude approximately (1/3)ω g t³ cos λ = (ω cos λ/3)√(8h³/g), where t = √(2h/g) is the time of fall. Southward/northward deflections are of higher order and usually negligible.",
        conditions: [
          "Air resistance neglected.",
          "Deflection is small, so the vertical motion may be treated as ordinary free fall.",
          "Constant ω and g over the fall.",
        ],
        vocabulary: [
          { term: "Eastward deflection", meaning: "Horizontal displacement towards the east on release from rest." },
          { term: "First-order perturbation", meaning: "Small correction computed using the unperturbed motion." },
        ],
        units: "Deflection in metres; ω in rad s⁻¹; h in m.",
        assumptions: ["Vacuum or negligible drag.", "Small deflection compared with h."],
      },
      sim: "coriolis-globe",
      simBrief: "Use the free-fall preset to visualise the eastward drift at your chosen latitude.",
      staticFallback:
        "Static diagram: a tower on the rotating Earth with the plumb line marked and the actual landing point displaced slightly to the east; the offset is exaggerated for clarity.",
      steps: ["Write the Coriolis acceleration for a downward velocity.", "Show it points east at all latitudes for a falling body.", "Use v = gt for the vertical speed.", "Integrate twice for the horizontal displacement.", "Substitute t = √(2h/g)."],
      prediction: "Does a body dropped at the equator deflect more or less than one dropped at 60° latitude?",
      formulas: [
        {
          tex: "x_{E}=\\frac{1}{3}\\omega g t^{3}\\cos\\lambda",
          name: "Eastward deflection of a falling body",
          where: [
            { sym: "t", meaning: "time of fall, √(2h/g)", unit: "s" },
            { sym: "\\lambda", meaning: "latitude", unit: "degree" },
          ],
          conditions: ["Released from rest.", "Small deflection, no air resistance."],
          rearranged: ["x_E=\\frac{\\omega\\cos\\lambda}{3}\\sqrt{\\frac{8h^{3}}{g}}"],
        },
      ],
      examples: [
        {
          title: "Simple: deflection from 100 m",
          problem: "Find the eastward deflection for a body dropped from 100 m at the equator.",
          steps: ["t = √(200/9.8) ≈ 4.52 s.", "x = (1/3)(7.29 × 10⁻⁵)(9.8)(4.52³)(1).", "≈ 0.022 m."],
          answer: "About 2.2 cm east",
        },
        {
          title: "Exam style: derive the deflection",
          problem: "Derive the expression for the eastward deflection of a body falling from rest.",
          steps: [
            "Vertical velocity v = gt downward.",
            "Coriolis acceleration = 2ωv cos λ directed east.",
            "a_E = 2ω g t cos λ.",
            "Integrate twice with zero initial horizontal velocity and displacement.",
            "x_E = (1/3)ω g t³ cos λ.",
          ],
          answer: "x_E = (1/3)ωgt³cos λ, eastward",
        },
      ],
      realLife: [
        { where: "Engineering", detail: "Deep vertical shafts and tall-tower drop experiments must allow for this deflection." },
        { where: "Technology", detail: "Precision ballistics software includes Coriolis corrections for both horizontal and vertical motion." },
      ],
      mistakes: [
        {
          wrong: "Expecting a westward deflection.",
          why: "The release point is farther from the rotation axis and therefore already moving east faster.",
          right: "Free fall always deflects east (for release from rest).",
          trick: "Higher means faster east.",
        },
      ],
      exam: {
        definition: "A body falling freely on the rotating Earth experiences a Coriolis acceleration 2ωv cos λ directed east, producing an eastward deflection x_E = (1/3)ωgt³cos λ.",
        derivation: [
          "Take v⃗ = −gt ẑ (downward) in the local frame.",
          "F⃗_Cor = −2mω⃗×v⃗ gives an eastward component of magnitude 2mωgt cos λ.",
          "So a_E = 2ωgt cos λ.",
          "Integrating: v_E = ωgt²cos λ.",
          "Integrating again: x_E = (1/3)ωgt³cos λ.",
        ],
        keyFormula: "x_{E}=\\frac{1}{3}\\omega g t^{3}\\cos\\lambda",
        twoMark: { q: "In which direction is a freely falling body deflected and why?", a: "Eastward, because the release point is farther from the rotation axis and therefore has a greater eastward velocity than the landing point." },
        fiveMark: { q: "Derive the eastward deflection of a body falling from height h and evaluate it for h = 50 m at 45°.", a: "Derivation as above; t = √(2 × 50/9.8) ≈ 3.19 s, so x_E = (1/3)(7.29 × 10⁻⁵)(9.8)(32.5)(0.707) ≈ 5.5 × 10⁻³ m, about 5.5 mm." },
        numerical: { q: "Compute the time of fall from 20 m and the resulting deflection at the equator.", a: "t = 2.02 s; x_E = (1/3)(7.29e−5)(9.8)(8.24) ≈ 2.0 × 10⁻³ m." },
        checklist: ["Direction of deflection", "Derivation by double integration", "h^{3/2} dependence", "cos λ factor", "Magnitude is small"],
      },
      quiz: [
        { id: "d8a", level: "basic", q: "A freely falling body is deflected towards the", options: ["west", "east", "north", "south"], answer: 1, hint: "Higher points move faster east.", explain: "Eastward deflection for release from rest." },
        { id: "d8b", level: "basic", q: "The deflection depends on latitude as", options: ["sin λ", "cos λ", "tan λ", "constant"], answer: 1, hint: "Formula has cos λ.", explain: "x_E ∝ cos λ, largest at the equator." },
        { id: "d8c", level: "basic", q: "The deflection varies with time of fall as", options: ["t", "t²", "t³", "√t"], answer: 2, hint: "Double integration of a term ∝ t.", explain: "x_E ∝ t³." },
        { id: "d8d", level: "application", q: "Deflection from 100 m at the equator is about", options: ["2 cm", "2 m", "2 mm", "20 cm"], answer: 0, hint: "Compute with t ≈ 4.5 s.", explain: "Approximately 2.2 cm." },
        { id: "d8e", level: "application", q: "At the poles the eastward deflection is", options: ["maximum", "zero", "half the equatorial value", "westward"], answer: 1, hint: "cos 90° = 0.", explain: "There is no eastward deflection at the poles for a vertical fall." },
        { id: "d8f", level: "challenge", q: "With height h, the deflection scales as", options: ["h", "h²", "h^{3/2}", "√h"], answer: 2, hint: "t ∝ √h and x ∝ t³.", explain: "x_E ∝ (√h)³ = h^{3/2}." },
      ],
      summary: {
        points: [
          "Falling bodies drift east on the rotating Earth.",
          "x_E = (1/3)ωgt³cos λ.",
          "Maximum at the equator, zero at the poles.",
          "Scales as h^{3/2}.",
          "Magnitude is a few centimetres for realistic heights.",
        ],
        recap: ["x_{E}=\\frac{1}{3}\\omega g t^{3}\\cos\\lambda", "t=\\sqrt{2h/g}"],
        memoryMap: ["Drop", "Coriolis east", "Integrate twice", "h^{3/2}", "Small offset"],
      },
    }),
    T({
      id: "geophysical-effects",
      title: "Geophysical Effects of Earth's Rotation",
      minutes: 10,
      awaken: {
        hook: "Trade winds, ocean gyres, cyclone spin and even asymmetric river-bank erosion: one rotating planet, many fingerprints.",
        curiosity: "Which everyday patterns on Earth would disappear if the planet stopped spinning?",
        realWorld: "Meteorology, oceanography, civil engineering, aviation.",
        objective: "Describe and explain the main geophysical consequences of the Coriolis and centrifugal terms.",
      },
      understand: {
        simple: "Rotation adds a sideways nudge to everything that moves over long distances. Over hours and thousands of kilometres those nudges organise the atmosphere and oceans into recognisable patterns.",
        analogy: "A slow, constant sideways breeze on a long walk: unnoticeable each step, but it changes where you end up.",
        demo: "Compare wind-flow patterns on the globe with rotation switched on and off.",
        eli5: "Spinning Earth steers winds and currents.",
      },
      definition: {
        formal:
          "Geophysical effects arise from the centrifugal term (equatorial bulge, latitude variation of g) and the Coriolis term (deflection of winds, ocean currents, projectiles and falling bodies; cyclonic circulation; geostrophic balance in which the pressure gradient force balances the Coriolis force).",
        conditions: ["Effects accumulate over large length and time scales.", "Rossby number small for geostrophic balance to dominate."],
        vocabulary: [
          { term: "Geostrophic wind", meaning: "Wind in which the Coriolis force balances the pressure gradient force." },
          { term: "Trade winds", meaning: "Steady low-latitude winds deflected westward by the Coriolis effect." },
          { term: "Ferrel's law", meaning: "Statement that moving bodies deflect right in the northern hemisphere, left in the southern." },
        ],
        units: "Wind speeds in m s⁻¹; Coriolis parameter f = 2Ω sin λ in s⁻¹.",
        assumptions: ["Large-scale, long-duration motion.", "Friction neglected in the free atmosphere."],
      },
      sim: "coriolis-globe",
      simBrief: "Switch between wind, ocean-current and projectile presets on the rotating globe.",
      staticFallback:
        "Static diagram: global wind belts — trade winds deflecting westward near the equator, westerlies in mid-latitudes, and a cyclone circulating anticlockwise in the northern hemisphere.",
      steps: ["Identify the moving mass (air, water or projectile).", "Apply the Coriolis rule for the hemisphere.", "Combine with the pressure gradient or other driving force.", "Look for the resulting steady pattern."],
      formulas: [
        {
          tex: "f\\,v_{g}=\\frac{1}{\\rho}\\frac{\\partial p}{\\partial n},\\qquad f=2\\Omega\\sin\\lambda",
          name: "Geostrophic balance",
          where: [
            { sym: "v_g", meaning: "geostrophic wind speed", unit: "m s⁻¹" },
            { sym: "f", meaning: "Coriolis parameter", unit: "s⁻¹" },
            { sym: "\\partial p/\\partial n", meaning: "pressure gradient across the flow", unit: "Pa m⁻¹" },
          ],
          conditions: ["Steady, frictionless, large-scale flow.", "Away from the equator where f ≠ 0."],
        },
      ],
      examples: [
        {
          title: "Simple: cyclone sense",
          problem: "Explain why northern-hemisphere cyclones rotate anticlockwise.",
          steps: ["Air flows inward towards low pressure.", "Coriolis deflects it to the right.", "The inflow becomes a counter-clockwise spiral."],
          answer: "Right-deflection of inflowing air gives anticlockwise circulation",
        },
        {
          title: "Exam style: geostrophic wind",
          problem: "Find the geostrophic wind speed for a pressure gradient of 2 × 10⁻³ Pa m⁻¹ at latitude 45°, with ρ = 1.2 kg m⁻³.",
          steps: [
            "f = 2(7.29 × 10⁻⁵)(0.707) = 1.03 × 10⁻⁴ s⁻¹.",
            "v = (1/ρf)(∂p/∂n) = (2 × 10⁻³)/(1.2 × 1.03 × 10⁻⁴).",
            "≈ 16 m s⁻¹.",
          ],
          answer: "About 16 m s⁻¹, blowing along the isobars",
        },
      ],
      realLife: [
        { where: "Weather", detail: "Weather maps show wind blowing nearly along isobars, not across them — a direct signature of geostrophic balance." },
        { where: "Space", detail: "Rockets are launched eastward to exploit the Earth's rotational speed." },
        { where: "Engineering", detail: "Some long north–south railway lines show slightly greater wear on one rail." },
      ],
      mistakes: [
        {
          wrong: "Claiming the Coriolis effect determines bathtub drainage direction.",
          why: "Container geometry and residual motion dominate at that scale by many orders of magnitude.",
          right: "Coriolis effects dominate only for large-scale, long-duration flows.",
          trick: "Kilometres and hours, not centimetres and seconds.",
        },
      ],
      exam: {
        definition: "Geophysical effects of Earth's rotation are the observable consequences of centrifugal and Coriolis pseudo-forces on the atmosphere, oceans, projectiles and the shape of the Earth.",
        derivation: [
          "For steady frictionless flow, the pressure gradient force per unit mass is (1/ρ)∂p/∂n.",
          "The Coriolis force per unit mass is f v.",
          "Balancing them gives f v_g = (1/ρ)∂p/∂n.",
          "Hence the wind blows along the isobars, with low pressure to the left in the northern hemisphere.",
        ],
        keyFormula: "v_g=\\frac{1}{\\rho f}\\frac{\\partial p}{\\partial n}",
        twoMark: { q: "State Ferrel's law.", a: "Any body moving over the Earth's surface is deflected to the right in the northern hemisphere and to the left in the southern hemisphere." },
        fiveMark: { q: "Describe four geophysical effects of Earth's rotation.", a: "(i) Equatorial bulge and latitude variation of g from the centrifugal term. (ii) Deflection of trade winds and formation of global wind belts. (iii) Cyclonic and anticyclonic circulation patterns and geostrophic balance. (iv) Deflection of ocean currents into large gyres, plus the eastward deflection of freely falling bodies." },
        numerical: { q: "Compute f at latitude 30°.", a: "f = 2(7.29 × 10⁻⁵)(0.5) = 7.29 × 10⁻⁵ s⁻¹." },
        checklist: ["Ferrel's law", "Cyclone rotation senses", "Geostrophic balance", "Trade winds", "Equatorial bulge"],
      },
      quiz: [
        { id: "d9a", level: "basic", q: "Ferrel's law describes deflection", options: ["upward", "right in the north, left in the south", "left in the north", "towards the equator"], answer: 1, hint: "Standard statement.", explain: "That is exactly Ferrel's law." },
        { id: "d9b", level: "basic", q: "Geostrophic wind blows", options: ["across isobars", "along isobars", "vertically", "randomly"], answer: 1, hint: "Balance of two forces.", explain: "When Coriolis balances the pressure gradient, the flow is along the isobars." },
        { id: "d9c", level: "basic", q: "The equatorial bulge is caused by", options: ["Coriolis force", "centrifugal effect", "tides", "magnetic field"], answer: 1, hint: "Position dependent term.", explain: "Rotation reduces the effective gravity most at the equator." },
        { id: "d9d", level: "application", q: "The Coriolis parameter f equals", options: ["2Ω cos λ", "2Ω sin λ", "Ω sin λ", "Ω²R"], answer: 1, hint: "Used in meteorology.", explain: "f = 2Ω sin λ." },
        { id: "d9e", level: "application", q: "Trade winds near the equator blow", options: ["from west to east", "from east to west", "north to south only", "vertically"], answer: 1, hint: "Deflected equatorward flow.", explain: "Air moving towards the equator is deflected westward, giving easterly trade winds." },
        { id: "d9f", level: "challenge", q: "Geostrophic balance fails near the equator because", options: ["winds are strong", "f → 0 there", "pressure is uniform", "gravity is weak"], answer: 1, hint: "sin λ → 0.", explain: "With f vanishing, the Coriolis force cannot balance the pressure gradient." },
      ],
      summary: {
        points: [
          "Rotation shapes winds, currents and the planet itself.",
          "Ferrel's law gives the deflection sense.",
          "Geostrophic balance makes wind follow isobars.",
          "Cyclones spin anticlockwise in the north.",
          "Small-scale effects like sink drainage are not Coriolis-dominated.",
        ],
        recap: ["f=2\\Omega\\sin\\lambda", "v_g=\\frac{1}{\\rho f}\\frac{\\partial p}{\\partial n}"],
        memoryMap: ["Rotation", "Deflection", "Winds", "Currents", "Patterns"],
      },
    }),
    T({
      id: "foucault-pendulum",
      title: "Foucault Pendulum",
      minutes: 12,
      awaken: {
        hook: "In 1851 Léon Foucault hung a pendulum in the Panthéon and let the Earth turn beneath it, in full public view.",
        curiosity: "How can a swinging weight prove that an entire planet is rotating?",
        realWorld: "Science museums worldwide, inertial navigation, gyroscopic instruments.",
        objective: "Explain the precession of a Foucault pendulum and compute its period at any latitude.",
      },
      understand: {
        simple: "A long pendulum keeps swinging in the same plane relative to space. Because the ground rotates underneath, the swing plane appears to turn slowly — fastest at the poles and not at all at the equator.",
        analogy: "Drawing a straight line with a ruler while someone slowly rotates the paper beneath it.",
        demo: "Set the latitude and watch the plane of swing precess, with the precession period displayed.",
        eli5: "The pendulum keeps its direction; the floor turns.",
      },
      definition: {
        formal:
          "A Foucault pendulum is a long, freely suspended pendulum whose plane of oscillation precesses relative to the Earth's surface at angular rate Ω sin λ, giving a precession period T = 24 h / sin λ (sidereal day, strictly 23 h 56 min). The precession is clockwise in the northern hemisphere when viewed from above.",
        conditions: [
          "Long wire and heavy bob so that the oscillation persists for hours.",
          "Small amplitude to avoid elliptical drift from anharmonicity.",
          "Support must not exert any torque about the vertical axis.",
        ],
        vocabulary: [
          { term: "Precession", meaning: "Slow rotation of the plane of swing." },
          { term: "Sidereal day", meaning: "Earth's rotation period relative to the stars, 23 h 56 min 4 s." },
        ],
        units: "Precession rate in rad s⁻¹ or ° h⁻¹; period in hours.",
        assumptions: ["Negligible friction and air drag over the observation time.", "Rigid, torque-free suspension."],
      },
      sim: "foucault",
      simBrief: "Choose the latitude and watch the plane rotate; the precession period updates live.",
      staticFallback:
        "Static diagram: top view of a Foucault pendulum's swing plane at 0, 6 and 12 hours, rotating clockwise in the northern hemisphere, with markers knocked over in sequence around the circle.",
      steps: ["Set the pendulum swinging in a known plane.", "Wait and mark the plane at intervals.", "Measure the angle turned per hour.", "Compare with Ω sin λ.", "Deduce the latitude or confirm Earth's rotation."],
      prediction: "At the equator, how long would you have to wait for the swing plane to rotate once?",
      formulas: [
        {
          tex: "\\Omega_{prec}=\\Omega\\sin\\lambda,\\qquad T=\\frac{T_{day}}{\\sin\\lambda}",
          name: "Foucault precession rate",
          where: [
            { sym: "\\Omega", meaning: "Earth's angular speed, 7.292 × 10⁻⁵ rad s⁻¹", unit: "rad s⁻¹" },
            { sym: "\\lambda", meaning: "latitude", unit: "degree" },
            { sym: "T_{day}", meaning: "sidereal day ≈ 23.93 h", unit: "h" },
          ],
          conditions: ["Frictionless, torque-free suspension.", "Small oscillations."],
          rearranged: ["\\text{rate in }^{\\circ}\\text{/h}=15\\sin\\lambda"],
        },
      ],
      examples: [
        {
          title: "Simple: precession at 30°N",
          problem: "Find the precession period of a Foucault pendulum at 30° latitude.",
          steps: ["sin 30° = 0.5.", "T = 23.93/0.5 ≈ 47.9 h."],
          answer: "About 48 hours per full rotation",
        },
        {
          title: "Exam style: rate in degrees per hour",
          problem: "Compute the precession rate in degrees per hour at 45° latitude.",
          steps: ["Rate = 15 sin λ ° h⁻¹.", "= 15 × 0.707."],
          answer: "≈ 10.6° per hour (full turn in about 34 hours)",
        },
      ],
      realLife: [
        { where: "Technology", detail: "The same principle underlies gyrocompasses and inertial navigation systems." },
        { where: "Daily life", detail: "Many science museums keep a Foucault pendulum knocking over markers through the day." },
      ],
      mistakes: [
        {
          wrong: "Saying the pendulum's plane is fixed relative to the distant stars at all latitudes.",
          why: "That is true only at the poles; at other latitudes the precession rate is reduced by the factor sin λ.",
          right: "Precession rate = Ω sin λ.",
          trick: "Poles full, equator none.",
        },
      ],
      exam: {
        definition: "A Foucault pendulum is a freely suspended pendulum whose plane of oscillation precesses at rate Ω sin λ, providing direct mechanical evidence of Earth's rotation.",
        derivation: [
          "In the rotating frame the bob experiences the Coriolis force −2mΩ⃗×v⃗.",
          "Resolve Ω⃗ into a local vertical component Ω sin λ and a horizontal component Ω cos λ.",
          "Only the vertical component produces a horizontal deflection of the (nearly horizontal) velocity.",
          "This acts like a slow rotation of the horizontal plane at rate Ω sin λ.",
          "Hence the swing plane precesses with period T = 2π/(Ω sin λ) = T_day/sin λ.",
        ],
        keyFormula: "T=\\frac{T_{day}}{\\sin\\lambda}",
        twoMark: { q: "What does the Foucault pendulum demonstrate?", a: "It gives direct mechanical proof that the Earth rotates, since the plane of oscillation precesses at Ω sin λ relative to the ground." },
        fiveMark: { q: "Explain the working of the Foucault pendulum and derive its period of precession.", a: "Derivation as above; at the poles the period equals one sidereal day, at 45° about 34 hours, and at the equator the precession vanishes." },
        numerical: { q: "Find the precession period at latitude 60°.", a: "T = 23.93/sin 60° = 23.93/0.866 ≈ 27.6 h." },
        checklist: ["Precession rate formula", "Latitude dependence", "Role of the Coriolis force", "Behaviour at pole and equator", "Historical significance"],
      },
      quiz: [
        { id: "d10a", level: "basic", q: "The Foucault pendulum proves", options: ["gravity exists", "Earth rotates", "air resistance", "Earth is round"], answer: 1, hint: "Its plane turns.", explain: "The precession demonstrates rotation of the Earth." },
        { id: "d10b", level: "basic", q: "Precession rate is", options: ["Ω", "Ω sin λ", "Ω cos λ", "2Ω"], answer: 1, hint: "Vertical component of Ω⃗.", explain: "Only Ω sin λ contributes." },
        { id: "d10c", level: "basic", q: "At the equator the precession period is", options: ["24 h", "12 h", "infinite (no precession)", "48 h"], answer: 2, hint: "sin 0 = 0.", explain: "There is no precession at the equator." },
        { id: "d10d", level: "application", q: "At the poles the period is about", options: ["12 h", "one sidereal day", "48 h", "zero"], answer: 1, hint: "sin 90° = 1.", explain: "About 23 h 56 min." },
        { id: "d10e", level: "application", q: "The precession rate in degrees per hour at latitude λ is", options: ["15 sin λ", "15 cos λ", "sin λ", "30 sin λ"], answer: 0, hint: "360°/24 h = 15° h⁻¹.", explain: "15 sin λ degrees per hour." },
        { id: "d10f", level: "challenge", q: "The pendulum is made long and heavy mainly to", options: ["increase speed", "reduce damping and keep it swinging for hours", "increase Coriolis force", "reduce gravity"], answer: 1, hint: "The effect is slow.", explain: "A long, massive pendulum has a long period and low relative damping, so the slow precession can be observed." },
      ],
      summary: {
        points: [
          "Swing plane precesses at Ω sin λ.",
          "Period = sidereal day / sin λ.",
          "Full rotation in a day at the poles.",
          "No precession at the equator.",
          "Caused by the Coriolis force in the rotating Earth frame.",
        ],
        recap: ["\\Omega_{prec}=\\Omega\\sin\\lambda", "T=\\frac{T_{day}}{\\sin\\lambda}"],
        memoryMap: ["Long pendulum", "Coriolis", "Vertical component", "Plane turns", "Latitude"],
      },
      assemble: { prompt: "Assemble the Foucault precession period.", tokens: ["T", "=", "\\frac{T_{day}}{\\sin\\lambda}"] },
    }),
    T({
      id: "proof-earth-rotation",
      title: "Direct Proofs of Earth's Rotation",
      minutes: 9,
      awaken: {
        hook: "For centuries nobody could prove the Earth turns. Then a pendulum, a falling stone and a gyroscope settled the question.",
        curiosity: "What is the difference between evidence for rotation and proof of it?",
        realWorld: "History of science, navigation instruments, experimental design.",
        objective: "List and explain the mechanical experiments that directly demonstrate Earth's rotation.",
      },
      understand: {
        simple: "Direct proofs are local mechanical experiments — done entirely on Earth, without looking at the sky — whose results can only be explained if the Earth rotates.",
        analogy: "Proving a train is moving without looking out of the window, by watching how a pendulum or a spilled drink behaves.",
        demo: "Compare the three classic experiments side by side with their predicted magnitudes.",
        eli5: "Experiments on the ground that only make sense if Earth spins.",
      },
      definition: {
        formal:
          "Direct (mechanical) proofs of Earth's rotation include: (i) the Foucault pendulum, whose swing plane precesses at Ω sin λ; (ii) the eastward deflection of freely falling bodies, x_E = (1/3)ωgt³cos λ; (iii) the gyrocompass, whose axis aligns with the meridian; and (iv) the latitude variation of g together with the equatorial bulge. Astronomical observations such as stellar parallax and aberration provide indirect (kinematic) evidence.",
        conditions: ["Experiments must be sensitive enough to resolve very small effects.", "Careful control of friction, drafts and vibration."],
        vocabulary: [
          { term: "Direct proof", meaning: "Local mechanical experiment requiring no external reference." },
          { term: "Gyrocompass", meaning: "Spinning rotor that seeks true north because of Earth's rotation." },
        ],
        units: "As for the individual experiments.",
        assumptions: ["Classical mechanics adequate.", "Effects are small and require precision instruments."],
      },
      sim: "foucault",
      simBrief: "Use the Foucault simulation as the primary demonstration, with the falling-body preset as a second proof.",
      staticFallback:
        "Comparison table — Foucault pendulum: plane precesses at Ω sin λ, easily visible over hours. Falling body: deflects east by a few centimetres from 100 m. Gyrocompass: rotor axis settles along the meridian. Latitude variation of g: about 0.5% pole to equator including the bulge.",
      steps: ["Choose a local mechanical experiment.", "Predict the expected magnitude.", "Eliminate competing explanations such as drafts and friction.", "Compare measurement with prediction.", "Conclude only if the agreement is quantitative."],
      formulas: [
        {
          tex: "\\Omega_{prec}=\\Omega\\sin\\lambda,\\qquad x_E=\\frac{1}{3}\\omega g t^{3}\\cos\\lambda",
          name: "Two quantitative signatures of rotation",
          where: [{ sym: "\\Omega", meaning: "Earth's angular velocity", unit: "rad s⁻¹" }],
          conditions: ["Careful experiments with small systematic errors."],
        },
      ],
      examples: [
        {
          title: "Simple: which proofs are direct?",
          problem: "Classify: Foucault pendulum, stellar parallax, falling-body deflection, day–night cycle.",
          steps: ["Foucault: direct mechanical.", "Stellar parallax: astronomical (evidence for orbital motion).", "Falling body: direct mechanical.", "Day–night cycle: consistent with rotation but also with a rotating sky, so not a proof by itself."],
          answer: "Direct proofs: Foucault pendulum and falling-body deflection",
        },
        {
          title: "Exam style: compare magnitudes",
          problem: "At latitude 45°, compare the Foucault precession with the deflection of a body falling 100 m.",
          steps: [
            "Foucault: rate = 15 sin 45° ≈ 10.6° h⁻¹, easily visible.",
            "Falling body: x_E = (1/3)(7.29 × 10⁻⁵)(9.8)(4.52³)(cos 45°) ≈ 1.6 cm.",
            "The pendulum is far easier to demonstrate publicly.",
          ],
          answer: "Precession ≈ 10.6° h⁻¹; falling deflection ≈ 1.6 cm — the pendulum is the more practical demonstration.",
        },
      ],
      realLife: [
        { where: "Technology", detail: "Ring-laser and fibre-optic gyroscopes measure Earth's rotation rate routinely in aircraft and ships." },
        { where: "Daily life", detail: "Museum Foucault pendulums let visitors watch the proof unfold over a few hours." },
      ],
      mistakes: [
        {
          wrong: "Treating sunrise and sunset as proof of Earth's rotation.",
          why: "A rotating sky would produce the same appearance; the observation alone does not distinguish the two models.",
          right: "Use local mechanical experiments whose results depend on the rotating frame.",
          trick: "Look down, not up, for a direct proof.",
        },
      ],
      exam: {
        definition: "Direct proofs of Earth's rotation are local mechanical experiments whose outcomes are explicable only in a rotating frame, chiefly the Foucault pendulum, the eastward deflection of falling bodies and the gyrocompass.",
        derivation: [
          "Each proof traces back to the rotating-frame equation ma⃗_rot = F⃗ − mω⃗×(ω⃗×r⃗) − 2mω⃗×v⃗.",
          "The Coriolis term gives the pendulum precession and the falling-body deflection.",
          "The centrifugal term gives the latitude variation of g and the equatorial bulge.",
          "Quantitative agreement with the measured Ω establishes the rotation.",
        ],
        keyFormula: "\\Omega=7.292\\times 10^{-5}\\ \\text{rad s}^{-1}",
        twoMark: { q: "Name two direct proofs of Earth's rotation.", a: "The Foucault pendulum's precession and the eastward deflection of freely falling bodies." },
        fiveMark: { q: "Describe the experimental proofs of Earth's rotation with their quantitative predictions.", a: "Foucault pendulum: plane precesses at Ω sin λ (about 10.6° h⁻¹ at 45°). Falling body: eastward deflection (1/3)ωgt³cos λ, a few centimetres from 100 m. Gyrocompass: rotor axis aligns with the meridian. Variation of g with latitude: about 0.5% between pole and equator including the bulge. Each agrees quantitatively with Ω = 7.29 × 10⁻⁵ rad s⁻¹." },
        numerical: { q: "Compute Earth's angular velocity from a sidereal day of 86164 s.", a: "Ω = 2π/86164 = 7.292 × 10⁻⁵ rad s⁻¹." },
        checklist: ["List the direct proofs", "Quantitative predictions", "Distinguish direct from astronomical evidence", "Value of Ω"],
      },
      quiz: [
        { id: "d11a", level: "basic", q: "The Foucault pendulum was first demonstrated in", options: ["1751", "1851", "1901", "1687"], answer: 1, hint: "Mid-nineteenth century, in Paris.", explain: "Léon Foucault demonstrated it in 1851." },
        { id: "d11b", level: "basic", q: "Which is a direct mechanical proof of rotation?", options: ["Sunrise", "Stellar parallax", "Foucault pendulum", "Phases of the Moon"], answer: 2, hint: "A local experiment.", explain: "It needs no astronomical reference." },
        { id: "d11c", level: "basic", q: "Earth's angular velocity is about", options: ["7.3 × 10⁻⁵ rad s⁻¹", "7.3 × 10⁻³ rad s⁻¹", "1 rad s⁻¹", "2π rad s⁻¹"], answer: 0, hint: "2π over a day.", explain: "2π/86164 s ≈ 7.29 × 10⁻⁵ rad s⁻¹." },
        { id: "d11d", level: "application", q: "A gyrocompass finds north because of", options: ["magnetism", "Earth's rotation", "gravity", "air currents"], answer: 1, hint: "No magnets involved.", explain: "The spinning rotor precesses until its axis aligns with the meridian." },
        { id: "d11e", level: "application", q: "Stellar parallax is evidence for", options: ["Earth's rotation", "Earth's orbital motion", "the Moon's motion", "gravity"], answer: 1, hint: "Annual shift.", explain: "It demonstrates that the Earth moves around the Sun." },
        { id: "d11f", level: "challenge", q: "Why is the falling-body deflection a difficult experiment?", options: ["It is forbidden", "The deflection is only centimetres and is easily masked by air currents", "It needs vacuum only", "It requires low latitude"], answer: 1, hint: "Compare 2 cm with drop-shaft disturbances.", explain: "Systematic errors from drafts and release conditions are comparable to the effect itself." },
      ],
      summary: {
        points: [
          "Direct proofs are local mechanical experiments.",
          "Foucault pendulum precesses at Ω sin λ.",
          "Falling bodies deflect eastward.",
          "Gyrocompasses align with the meridian.",
          "Astronomical observations give complementary, indirect evidence.",
        ],
        recap: ["\\Omega_{prec}=\\Omega\\sin\\lambda", "x_E=\\frac{1}{3}\\omega g t^{3}\\cos\\lambda"],
        memoryMap: ["Pendulum", "Falling body", "Gyroscope", "Gravity variation", "Quantitative match"],
      },
      verify: "Historical dates and the exact wording of 'direct proof' vary between textbooks — please confirm the phrasing your university prefers.",
    }),
  ],
};
