/**
 * Language levels and deeper explanation for every topic.
 *
 * `plain`     — very simple everyday English (Explorer level)
 * `standard`  — the normal textbook voice (comes from the topic itself)
 * `rigorous`  — precise, formal, university-examiner English (Scholar level)
 *
 * `deeper`      — extra paragraphs that go beyond the main explanation
 * `history`     — how the idea actually came about
 * `connections` — links forward and sideways to other parts of physics
 * `pitfallNote` — the single sentence most students wish they had read first
 */
export interface Expansion {
  plain: string;
  rigorous: string;
  deeper: string[];
  history: string;
  connections: string[];
  pitfallNote: string;
}

const E = (
  plain: string,
  rigorous: string,
  deeper: string[],
  history: string,
  connections: string[],
  pitfallNote: string,
): Expansion => ({ plain, rigorous, deeper, history, connections, pitfallNote });

export const EXPANSIONS: Record<string, Expansion> = {
  /* ============================ CALCULUS ============================ */
  "meaning-differentiation": E(
    "Differentiation is just asking: if I change this a tiny bit, how much does that change? Nothing more mysterious than that.",
    "Differentiation assigns to a function its instantaneous rate of change, defined as the limit of the difference quotient; its existence at a point is strictly stronger than continuity there.",
    [
      "The deep trick of calculus is that we never actually divide by zero. We divide by a number h that is allowed to be as small as we like but never zero, simplify the algebra so the troublesome h cancels, and only then ask what happens as h approaches zero. The limit is the value the expression is heading towards, not a value it ever reaches by substitution.",
      "This is why speed at an instant is meaningful. A photograph of a car tells you nothing about its speed, but the family of all photographs in a shrinking time window does: the ratio of distance change to time change settles onto a definite number. That settling is the entire content of the derivative.",
      "In physics the derivative almost always answers a 'per' question — metres per second, volts per second, joules per metre. Whenever you see the word 'per' or 'rate', a derivative is hiding nearby. The notation dy/dx is deliberately fraction-like because for small changes it behaves almost exactly like a fraction, which is why physicists cancel differentials so casually.",
    ],
    "Newton (working on motion, around 1665–1666) and Leibniz (working on tangents and areas, published 1684) developed calculus independently. Leibniz's dy/dx notation won because it makes the chain rule look like cancellation; Newton's ẋ survives in mechanics for time derivatives.",
    [
      "Velocity and acceleration are the first and second time derivatives of position — the whole of kinematics.",
      "The derivative of momentum with respect to time is force: Newton's second law in its original form.",
      "Partial differentiation extends this idea to functions of several variables and leads directly to gradient, divergence and curl in Unit II.",
    ],
    "Differentiability is a smoothness condition: a function can be perfectly continuous and still have no derivative at a corner.",
  ),
  "geometrical-derivative": E(
    "Zoom into any smooth curve far enough and it looks straight. The slope of that straight bit is the derivative.",
    "The derivative at x₀ is the slope of the unique line through (x₀, f(x₀)) that agrees with the curve to first order; equivalently tan θ, where θ is the inclination of the tangent to the x-axis.",
    [
      "Local linearity is the geometric heart of calculus. When you magnify a differentiable curve around a point, the curvature becomes invisible and the graph becomes indistinguishable from a straight line. A function fails to be differentiable exactly where this zooming never settles down — at corners, cusps and vertical tangents.",
      "The sign of the derivative reads the curve like a landscape. Positive means climbing, negative means descending, zero means momentarily level. The second derivative then tells you the shape of the ground: positive curves upward like a valley, negative curves downward like a hill.",
      "The normal line, perpendicular to the tangent, matters in optics and mechanics: light reflects about the normal, and a bead sliding on a wire is pushed along the normal by the constraint force.",
    ],
    "Fermat was finding tangents and maxima with an infinitesimal method in the 1630s, decades before Newton and Leibniz gave the idea its general machinery — which is why the tangent problem, not the velocity problem, is the historical starting point of differentiation.",
    [
      "Ray optics uses the tangent and normal at every point of a curved mirror or lens surface.",
      "Linear approximation, Newton's method for roots, and every numerical solver rely on replacing a curve by its tangent.",
      "In thermodynamics the slope of an isotherm on a P–V diagram gives compressibility.",
    ],
    "A tangent is a local statement: it may legitimately cross the curve somewhere else on the graph.",
  ),
  "maxima-minima": E(
    "At the very top of a hill or the very bottom of a valley, the ground is flat for an instant. That flat instant is what we look for.",
    "An interior extremum of a differentiable function requires a vanishing first derivative; classification follows from the sign of the first non-vanishing higher derivative, the second-derivative test being the usual special case.",
    [
      "Physics is saturated with optimisation. Light follows the path of least time, a soap film adopts the least area, a chain hangs in the shape of least potential energy, and a mechanical system evolves along the path that makes the action stationary. In every case the mathematical statement is the same: some quantity has a vanishing first variation.",
      "Stability is the most useful physical reading of the second derivative. Write the potential energy U(x) of a system. Equilibrium requires dU/dx = 0 because force is −dU/dx. If d²U/dx² > 0 the equilibrium is stable and small displacements produce a restoring force, which is exactly why almost everything in nature oscillates about its minima.",
      "Expanding U about a minimum gives U ≈ U₀ + ½U″(x − x₀)², a perfect parabola. That single fact is the reason simple harmonic motion appears in springs, pendulums, molecules, crystals and circuits alike: near any stable equilibrium, every system is a harmonic oscillator.",
    ],
    "The systematic use of derivatives for optimisation dates from Fermat's method of adequality (1636) and was formalised through the calculus of variations by Euler and Lagrange in the eighteenth century.",
    [
      "The harmonic approximation here becomes the damped oscillator of the last topic in this chapter.",
      "Lattice vibrations (phonons) in solid-state physics are small oscillations about a potential minimum.",
      "Maximum-range projectile problems and minimum-fuel orbit transfers are the same calculation in different clothes.",
    ],
    "A vanishing derivative is necessary but not sufficient — always classify the point before calling it a maximum or minimum.",
  ),
  approximation: E(
    "If you only take a small step, a curve and its straight tangent give almost the same answer — so use the easy straight one.",
    "First-order Taylor truncation replaces a function by its tangent, with a remainder bounded by the second derivative and quadratic in the increment.",
    [
      "Most of theoretical physics is controlled approximation. Nobody solves the exact pendulum equation in an introductory course because sin θ ≈ θ turns an intractable problem into simple harmonic motion, and the error is genuinely negligible for small swings. Knowing when the approximation is allowed is as important as knowing the formula.",
      "Error propagation in the laboratory is pure differential calculus. Take logarithms of the formula, differentiate, and each quantity contributes its relative error multiplied by its exponent. A quantity raised to the fourth power contributes four times its percentage error — which is why you measure the most heavily weighted quantity most carefully.",
      "The scaling of the error is the practical lesson: halving the step reduces the linear-approximation error by a factor of four, not two. Errors that fall as the square of the step are the reason numerical methods work at all.",
    ],
    "The small-angle approximation was used in astronomy long before calculus existed; Ptolemy's chord tables already relied on it. Its modern justification through Taylor's remainder theorem came in 1715.",
    [
      "Relativistic kinetic energy reduces to ½mv² by exactly this argument (see Binomial Series).",
      "Every measurement you report in a laboratory course carries an uncertainty computed this way.",
      "Linearisation of a nonlinear control system around its operating point uses the same single term.",
    ],
    "The approximation is only as good as the smallness of Δx — always state the range of validity.",
  ),
  "partial-differentiation": E(
    "When something depends on several things at once, freeze all but one and see how the answer changes. Do that for each in turn.",
    "Partial differentiation computes the directional rate of change along a coordinate axis, holding the remaining independent variables fixed; the total differential then assembles these into the first-order change of the function.",
    [
      "Thermodynamics is almost unreadable without this idea, because there the subscript telling you what is held constant carries physical meaning. (∂U/∂T)_V is the heat capacity at constant volume, while (∂U/∂T)_P is a different quantity entirely. The notation is not pedantry: the two experiments are physically different.",
      "The total differential is what lets you combine several simultaneous small changes. If a gas changes both pressure and temperature slightly, the change in any state function is the sum of each partial derivative multiplied by its own small change — provided the changes really are small.",
      "The equality of mixed partial derivatives is quietly one of the most powerful tools in physics: it generates the Maxwell relations of thermodynamics, which connect quantities that are easy to measure with quantities that are not.",
    ],
    "Euler and d'Alembert developed partial derivatives in the 1740s while studying vibrating strings and fluid flow — the first partial differential equations in physics.",
    [
      "Gradient, divergence, curl and the Laplacian are all built from partial derivatives.",
      "The wave equation, heat equation and Schrödinger equation are partial differential equations.",
      "Gradient descent, the training algorithm behind modern machine learning, is partial differentiation at industrial scale.",
    ],
    "Writing d where you mean ∂ changes the physics, not just the notation.",
  ),
  "taylor-series": E(
    "Copy the height, then the slope, then the bend, then the next bend. Each copy makes your polynomial hug the real curve over a wider stretch.",
    "A Taylor series reconstructs an analytic function from the complete set of its derivatives at a single point, converging within the radius determined by the nearest singularity in the complex plane.",
    [
      "There is something remarkable here: for an analytic function, all the information about its behaviour everywhere within the radius of convergence is encoded in its derivatives at one single point. Local data determines global behaviour. This is emphatically not true for all functions, which is why analyticity is a strong condition rather than a technicality.",
      "Physicists almost never use the whole series. They use the first term that survives. If the zeroth and first terms vanish, the quadratic term is the physics — which is exactly what happens at a potential minimum. Perturbation theory in quantum mechanics is the same habit applied to energies.",
      "Convergence is limited by singularities you may not even see on the real axis. The series for 1/(1+x²) diverges for |x| > 1 even though the function is perfectly well behaved for all real x, because there are poles at x = ±i in the complex plane.",
    ],
    "Brook Taylor published the general series in 1715; Maclaurin popularised the special case at the origin. Lagrange supplied the remainder term that makes the whole thing rigorous rather than merely suggestive.",
    [
      "The binomial series is the Taylor series of (1+x)ⁿ.",
      "Small-angle approximations, relativistic expansions and multipole expansions are truncated Taylor series.",
      "Numerical methods — Euler, Runge–Kutta, finite differences — are built from Taylor expansions.",
    ],
    "More terms help near the expansion point; far outside the radius of convergence they make things worse, not better.",
  ),
  "binomial-series": E(
    "If a quantity changes by a small fraction and then gets raised to a power, the answer changes by about that fraction times the power.",
    "The binomial series generalises the binomial theorem to arbitrary real index, converging absolutely for |x| < 1 and terminating precisely when the index is a non-negative integer.",
    [
      "Physics uses this expansion more than any other. Anywhere a ratio is small — v/c, a/r, d/L, ΔT/T — the binomial expansion converts an exact but unusable expression into a leading term plus a correction whose size you can estimate.",
      "The multipole expansion of electrostatics is nothing but this series applied to 1/|r⃗ − r⃗′|. The successive terms are the monopole, dipole and quadrupole contributions, each falling off one power of r faster than the last.",
      "The identification of the small parameter is the real skill. It must be dimensionless, and it must genuinely be small in the regime you care about. An expansion in v/c is superb for a car and useless for a cosmic-ray muon.",
    ],
    "Newton discovered the generalised binomial series around 1665 and regarded it as one of his most important results; he used it to compute logarithms and areas long before the calculus was published.",
    [
      "Relativistic kinetic energy, time dilation and length contraction all reduce to classical results by this expansion.",
      "The dipole field, tidal forces and gravitational multipoles come from expanding 1/r.",
      "GPS correction terms are first-order binomial corrections.",
    ],
    "Expand only in a quantity that is both dimensionless and genuinely small.",
  ),
  "geometrical-integration": E(
    "Cut the shape into very thin slices, add up the slices, and make the slices thinner and thinner. The total settles on the exact answer.",
    "The definite integral is the common limit of upper and lower Darboux sums; for continuous integrands the Fundamental Theorem identifies it with the increment of any antiderivative.",
    [
      "The Fundamental Theorem of Calculus is the most surprising result in elementary mathematics. Slopes and areas look like completely unrelated questions, yet differentiation and integration undo one another. That link is why a problem about accumulated charge can be solved by guessing a function whose derivative is the current.",
      "In physics every integral is a sum of infinitesimal contributions. Work is the sum of F·dx over each tiny displacement; charge is the sum of i·dt over each tiny interval; moment of inertia is the sum of r²dm over each tiny mass element. Write down the contribution of one slice correctly and the integral writes itself.",
      "The signed nature of the definite integral matters physically. A velocity–time graph that dips below the axis gives displacement, not distance. If you want distance you must integrate the absolute value, splitting the interval at the zeros.",
    ],
    "Archimedes computed the area of a parabolic segment by exhaustion around 250 BCE using essentially a Riemann sum; Riemann's rigorous definition arrived only in 1854, over two thousand years later.",
    [
      "Work, impulse, charge, flux, centre of mass and moment of inertia are all integrals.",
      "Gauss's law and Stokes' theorem generalise integration to surfaces and volumes in Unit II.",
      "Kepler's second law is a statement about an integrated swept area.",
    ],
    "Keep track of what the area physically represents — its units are always (unit of y) × (unit of x).",
  ),
  "order-degree-de": E(
    "Count the highest derivative to get the order. Look at what power it is raised to for the degree. That is the whole classification.",
    "Classification by order, degree, linearity and homogeneity determines the admissible solution methods and the dimension of the solution space.",
    [
      "Classification is not bookkeeping — it tells you which method will work before you waste time. Linear constant-coefficient equations submit to the D-operator; first-order separable or homogeneous equations submit to substitution; nonlinear equations usually demand numerical methods or clever tricks.",
      "The order of the equation equals the number of arbitrary constants in its general solution, which equals the number of initial conditions you must supply. Newton's second law is second order, which is precisely why you must specify both initial position and initial velocity to predict a trajectory — and why classical mechanics is deterministic in the way it is.",
      "Linearity is the deepest of the four properties, because it permits superposition. If two functions solve a linear homogeneous equation, so does any combination of them. Every normal mode, Fourier method and interference phenomenon in physics depends on that single property.",
    ],
    "The terminology was settled in the eighteenth century as Euler, the Bernoullis and Lagrange systematically catalogued which equations could be solved in closed form — and discovered how few of them could.",
    [
      "RC circuits are first order; RLC circuits and mass–spring systems are second order; beam bending is fourth order.",
      "Superposition of solutions underlies Fourier analysis and all of wave physics.",
      "The Schrödinger equation is linear, which is why quantum superposition exists.",
    ],
    "Clear all radicals and fractional powers before reading off the degree, and remember that the degree may simply not exist.",
  ),
  "first-order-homogeneous": E(
    "Some equations only care about the ratio y/x. Rename that ratio v and the equation falls apart into two easy integrals.",
    "An equation whose right-hand side is a homogeneous function of degree zero is invariant under the scaling (x, y) → (λx, λy); the substitution y = vx exploits this symmetry to reduce it to quadrature.",
    [
      "There is a symmetry hiding here. The equation looks the same if you rescale both axes by the same factor, so the solution can only depend on the scale-invariant combination y/x. The substitution is not a trick pulled out of the air — it is the natural coordinate for the symmetry the equation already possesses.",
      "You can see the symmetry in the direction field. Along any straight ray from the origin the slope marks are all parallel, because y/x is constant along that ray. The whole solution family is therefore self-similar: scale one solution curve and you get another.",
      "Symmetry reduction is one of the most powerful ideas in mathematical physics. The same logic reduces partial differential equations to ordinary ones in boundary-layer theory and in the study of shock waves and explosions.",
    ],
    "Leibniz solved the first homogeneous equation in 1691. The systematic study of symmetry as the reason a differential equation can be solved is due to Sophus Lie in the 1880s.",
    [
      "Self-similar solutions in fluid dynamics and diffusion use the same scaling idea.",
      "Dimensional analysis in physics is symmetry reduction by another name.",
      "Contrast with the linear non-homogeneous equations of the next topic, where 'homogeneous' means something different.",
    ],
    "'Homogeneous' means two different things in this chapter — same-degree functions here, zero forcing term for linear equations.",
  ),
  "first-order-nonhomogeneous": E(
    "Multiply everything by one clever factor and the left-hand side becomes the derivative of a single product. After that you just integrate once.",
    "Multiplication by the integrating factor exp(∫P dx) renders the left-hand side an exact derivative, reducing the equation to a single quadrature; the general solution splits into a complementary transient and a forced steady state.",
    [
      "The structure of the solution is physically meaningful and worth naming. The part carrying the arbitrary constant decays away and remembers the initial condition — the transient. The part driven by Q(x) survives indefinitely and remembers only the forcing — the steady state. A capacitor forgets how it started and settles at the voltage the battery dictates.",
      "The time constant τ = RC (or L/R) is the single number that characterises the transient. After one time constant the gap to the final value has shrunk to 37 % of its original size; after five it is under 1 %, which is why engineers treat 5τ as 'finished'.",
      "Newton's law of cooling, radioactive decay with production, drug concentration in the bloodstream, and charging capacitors are literally the same equation with relabelled symbols. Learning it once is genuinely learning it four times.",
    ],
    "Leibniz solved the general linear first-order equation by this method in 1694, and Johann Bernoulli reformulated it as the integrating factor we use today.",
    [
      "The same transient-plus-steady-state structure reappears in the driven oscillator later in this chapter.",
      "Integrating factors generalise to the exact-equation methods of the next two topics.",
      "Every first-order low-pass filter in electronics is this equation.",
    ],
    "Divide through to make the coefficient of dy/dx equal to one before you read off P.",
  ),
  "integrating-factor": E(
    "An integrating factor is the right thing to multiply by so that both sides suddenly become easy to integrate.",
    "An integrating factor converts a non-exact Pfaffian form into an exact differential, guaranteeing the local existence of a potential function whose level sets are the solution curves.",
    [
      "The most important integrating factor in all of physics is 1/T. Heat δQ is path dependent and is not the differential of any state function — there is no such thing as 'the heat content' of a gas. Divide by the absolute temperature, however, and δQ_rev/T becomes dS, the exact differential of entropy. The second law of thermodynamics is, from this angle, the assertion that such an integrating factor exists.",
      "Geometrically, an inexact differential defines a field of little planes in space with no consistent surfaces fitting them together. Multiplying by μ tilts those planes just enough that a family of surfaces can thread through them. The solution curves are the level sets of the resulting potential.",
      "Integrating factors always exist locally, but they are rarely elementary. The standard x-only and y-only tests cover the cases that appear in examinations; beyond those, one usually turns to numerical methods.",
    ],
    "Carathéodory's 1909 axiomatic formulation of thermodynamics is built explicitly on the existence of an integrating factor for the heat form — one of the most elegant meeting points of pure mathematics and physics.",
    [
      "Entropy exists because δQ_rev has an integrating factor.",
      "Exact and inexact differentials in the next topic are the same mathematics in physical dress.",
      "Numerical preconditioning of stiff equations is the computational cousin of this idea.",
    ],
    "Always re-test exactness after multiplying by μ; if the test fails, μ was wrong.",
  ),
  "exact-inexact": E(
    "Some quantities only depend on where you start and where you finish. Others depend on the route you took. Physics has both, and mixing them up causes real errors.",
    "An exact differential is the total differential of a state function, characterised in a simply connected region by the equality of mixed partial derivatives and by the vanishing of its cyclic integral.",
    [
      "The distinction between state and path functions is one of the genuinely deep ideas in physics. Internal energy, entropy, temperature, pressure and volume belong to the system; heat and work belong to the process. It is meaningful to ask how much internal energy a gas has, and meaningless to ask how much heat it has.",
      "The topology of the region matters, which is easy to overlook. Equality of mixed partials guarantees exactness only in a simply connected region. On a domain with a hole, a form can pass the local test yet still have a non-zero circulation around the hole — exactly what happens with the magnetic field around a current-carrying wire.",
      "Engine cycles exist because work is inexact. Around a closed cycle every state function returns to its initial value, so ∮dU = 0. Yet ∮P dV equals the enclosed area of the loop and is not zero. Thermodynamic engines survive on precisely that asymmetry.",
    ],
    "Clausius introduced the state function later named entropy in 1865 after realising that ∮δQ/T, unlike ∮δQ, vanishes for a reversible cycle — the historical birth of the exact/inexact distinction.",
    [
      "Conservative forces are exactly those whose work is an exact differential; the potential energy is the state function.",
      "Curl-free fields in Unit II are the vector-calculus version of the same statement.",
      "Maxwell's thermodynamic relations come from equality of mixed partials.",
    ],
    "Write δ for heat and work, d for state functions — the notation encodes the physics.",
  ),
  "d-operator": E(
    "Write D instead of 'differentiate'. Now the equation looks like ordinary algebra, and you can factorise it.",
    "Treating D as an element of a polynomial ring acting on function space converts constant-coefficient linear ODEs into algebraic problems, with the auxiliary polynomial's root structure determining the solution basis.",
    [
      "The justification for this apparent sleight of hand is that D acting on e^{mx} simply multiplies it by m. Exponentials are the eigenfunctions of the differentiation operator, so in the basis of exponentials the differential operator becomes a number. Everything else follows from that single fact.",
      "Resonance appears in the algebra as a division by zero. When the forcing frequency matches a root of the auxiliary equation, the naive particular integral blows up, and the correct response grows in time like t·e^{at}. The mathematics is warning you that the system is being driven at a frequency it likes.",
      "Engineers meet the same operator as the Laplace transform variable s, and write transfer functions 1/f(s). The poles of that transfer function are exactly the roots of our auxiliary equation, and they determine whether the system is stable, oscillatory or explosive.",
    ],
    "Operational calculus was developed heuristically by Oliver Heaviside in the 1880s for telegraph circuits. Mathematicians objected strenuously to its lack of rigour; it was justified decades later through the Laplace transform.",
    [
      "The auxiliary equation roots correspond exactly to the damping regimes in the next topic.",
      "Laplace transforms, transfer functions and control theory are the engineering continuation.",
      "The same operator algebra underlies quantum mechanical ladder operators.",
    ],
    "If f(a) = 0 the standard particular integral rule fails — that is resonance, and you multiply by x.",
  ),
  "second-order-de": E(
    "Something pulls it back, its own inertia makes it overshoot, and friction slowly eats the motion. Those three effects decide everything.",
    "The linear second-order equation with constant coefficients admits three qualitatively distinct solution regimes determined by the discriminant, together with a steady-state response whose amplitude peaks near resonance.",
    [
      "This one equation is the most reused in all of physics. Mass, damping and stiffness become inductance, resistance and inverse capacitance in a circuit; they become effective mass, radiative damping and bond stiffness for a vibrating molecule. Solve it once, recognise it forever.",
      "Critical damping is subtle and often misstated. It is not the fastest possible decay of every initial condition, but it is the boundary between oscillatory and non-oscillatory behaviour and the fastest return without overshoot. Car suspensions, door closers and measuring instruments are deliberately tuned slightly below or at this point.",
      "The quality factor Q = ω₀/2γ counts how many radians of oscillation occur before the energy falls appreciably. A church bell has Q in the thousands, a car suspension has Q near one half, and a quartz crystal can exceed a million — which is why quartz makes such accurate clocks.",
      "Resonance is both useful and dangerous. It lets a radio pick one station out of thousands and lets an MRI scanner address particular nuclei; it also destroys machinery and has caused bridges to be redesigned. The amplitude at resonance is limited only by the damping.",
    ],
    "The theory was worked out during the eighteenth century for vibrating strings and pendulum clocks. Resonance became an engineering obsession after the Tacoma Narrows bridge failure of 1940, though the mechanism there was aeroelastic flutter rather than simple forced resonance.",
    [
      "Every normal mode of every oscillating system obeys this equation.",
      "AC circuit analysis, filter design and control engineering are direct applications.",
      "The quantum harmonic oscillator is the quantised version of the same potential.",
    ],
    "A second-order equation needs two initial conditions — position and velocity — for a unique solution.",
  ),

  /* ============================= VECTORS ============================= */
  "scalars-vectors": E(
    "Some quantities need only a size. Others need a size and a direction, and those must be added nose-to-tail, not just summed as numbers.",
    "A vector is an element of a linear space whose components transform under rotation according to the orthogonal transformation law; possession of a direction alone is insufficient.",
    [
      "The genuine test of a vector is not whether it has a direction but whether it adds by the triangle law and transforms correctly under rotation. Finite rotations have a magnitude and an axis yet are not vectors, because rotating a book about two different axes gives different results depending on the order. Infinitesimal rotations, by contrast, do commute and are proper vectors — which is why angular velocity is a vector but 'total rotation' is not.",
      "Resolving into components turns geometry into arithmetic. Once you choose axes, vector addition becomes ordinary addition performed three times, and every geometric question becomes algebra. The choice of axes is yours: a wise choice, usually aligned with a surface or a symmetry, can shorten a problem dramatically.",
      "Vectors also come in flavours. A polar vector such as velocity reverses under reflection; an axial or pseudo-vector such as angular momentum does not. The distinction matters in electromagnetism and in the discussion of parity in particle physics.",
    ],
    "Modern vector notation was hammered out by Gibbs and Heaviside in the 1880s, distilled from Hamilton's quaternions of 1843. Hamilton's supporters fought the change bitterly; the physicists won.",
    [
      "Force, velocity, momentum, electric and magnetic fields are all vectors.",
      "Torque and angular momentum are axial vectors built from cross products.",
      "Vector fields in the next topic assign a vector to every point of space.",
    ],
    "3 + 4 can give anything from 1 to 7 — direction decides.",
  ),
  "scalar-vector-fields": E(
    "A field just means every point in space has its own value. Temperature everywhere in a room is one; the breeze everywhere in the room is another.",
    "A field is a function on a region of space, scalar or vector valued, whose smoothness properties determine the applicability of the differential operators of vector analysis.",
    [
      "The field concept replaced action at a distance and is arguably the most important conceptual invention in classical physics. Instead of saying the Sun pulls the Earth across empty space, we say the Sun conditions the space around it and the Earth responds to the field at its own location. Faraday introduced this picture from experiment; Maxwell gave it equations.",
      "Field lines are a visual language with strict grammar. Their direction gives the field direction, their density gives the magnitude, they never cross for a single-valued field, and for electrostatics they begin and end on charges. Learning to read them saves an enormous amount of algebra.",
      "Level surfaces belong to scalar fields and are always perpendicular to the gradient. Isotherms, equipotentials and isobars are all level surfaces, and the fact that no work is done moving along an equipotential is the geometric statement that ∇φ is normal to them.",
    ],
    "Faraday developed 'lines of force' in the 1830s without the mathematics to formalise them; Maxwell wrote in his preface that he set out to translate Faraday's pictures into equations, and vector analysis is what emerged.",
    [
      "Gravitational, electric and magnetic fields are the canonical vector fields.",
      "Temperature, pressure, density and potential are the canonical scalar fields.",
      "The operators of the next four topics all act on these fields.",
    ],
    "Field lines never cross, because a point cannot have two directions at once.",
  ),
  "triple-products": E(
    "Dot a vector with the cross of two others and you get the volume of the slanted box they make. Cross a vector with a cross product and there is a rule that untangles it.",
    "The scalar triple product is the determinant of the component matrix and equals the signed volume of the spanned parallelepiped; the vector triple product satisfies the BAC−CAB identity, a consequence of the epsilon-delta relation.",
    [
      "The scalar triple product is a determinant, and every determinant property therefore applies: cyclic permutations preserve it, swapping any two vectors reverses its sign, and it vanishes when the vectors are linearly dependent. That last case is the coplanarity test used constantly in crystallography and geometry.",
      "The failure of associativity for the cross product is not a defect but a signature. The cross product makes three-dimensional space into a Lie algebra, where the Jacobi identity replaces associativity. The same structure governs angular momentum in quantum mechanics.",
      "The BAC−CAB rule is the workhorse identity of electromagnetism and rotational mechanics. It is what lets you expand ω⃗×(ω⃗×r⃗) into the familiar centrifugal expression in Unit III, and it appears whenever a double cross product turns up in a derivation.",
    ],
    "The identities follow from Levi-Civita's permutation symbol, introduced around 1900, which reduces essentially all vector identities to index bookkeeping.",
    [
      "Crystal unit-cell volumes and reciprocal lattice vectors use the scalar triple product.",
      "Centrifugal force in the rotating-frame equation is expanded with BAC−CAB.",
      "Angular momentum manipulations in central-force problems use both identities.",
    ],
    "The cross product is not associative — the brackets are part of the meaning.",
  ),
  gradient: E(
    "The gradient is an arrow pointing the steepest way uphill, and its length tells you how steep that is.",
    "The gradient is the unique vector field such that its inner product with any unit vector yields the directional derivative along that direction; it is normal to the level sets of the scalar field.",
    [
      "The gradient answers two questions at once: which way, and how fast. The direction is that of steepest increase and the magnitude is the rate of increase in that direction. Move perpendicular to it and the field does not change at all, which is why the gradient is always normal to level surfaces.",
      "Nature runs downhill. Heat flows along −∇T, a fluid accelerates along −∇p, a charge is pushed along −∇V, and a mass falls along −∇Φ. The minus sign is not decoration; it is the statement that systems move towards lower potential.",
      "The gradient also generalises. In curvilinear coordinates the formula changes, in relativity it becomes a four-gradient, and in machine learning it becomes a vector in a space of millions of parameters. The geometric meaning — steepest ascent — survives all of it.",
    ],
    "Hamilton introduced the ∇ symbol in 1837; the name 'nabla' comes from the Greek word for a harp of that shape, suggested playfully by Maxwell's friend Peter Tait.",
    [
      "Conservative forces are gradients of potential energy: F⃗ = −∇U.",
      "Fourier's law of heat conduction and Ohm's law in local form are gradient statements.",
      "The divergence of the gradient is the Laplacian, which drives Poisson and Laplace equations.",
    ],
    "grad turns a scalar into a vector; the minus sign in F⃗ = −∇U is physics, not a typo.",
  ),
  divergence: E(
    "Divergence asks whether stuff is spreading out from a point or piling into it. A tap has positive divergence; a drain has negative.",
    "Divergence is the limit of net outward flux per unit volume as the enclosing surface contracts to a point, connecting local source density to global flux through the divergence theorem.",
    [
      "The flux definition is the physical one and it is coordinate free. Surround a point with a tiny closed surface and count what leaves minus what enters, per unit volume. The Cartesian formula with three partial derivatives is merely the bookkeeping that follows for a small box.",
      "The divergence theorem is the workhorse that converts local laws into global ones. Applied to the electric field it turns ∇·E⃗ = ρ/ε₀ into Gauss's law in integral form; applied to mass flux it turns the continuity equation into a statement about mass entering and leaving a pipe.",
      "∇·B⃗ = 0 is a statement of experimental fact with enormous consequences: no magnetic monopole has ever been detected, so magnetic field lines have no beginnings or ends and must close on themselves. Every magnetic field can therefore be written as the curl of a vector potential.",
    ],
    "Gauss proved the divergence theorem around 1813 for gravitational attraction; Ostrogradsky published a general proof in 1826, which is why continental textbooks often call it Ostrogradsky's theorem.",
    [
      "The continuity equation for mass and charge is a divergence statement.",
      "Gauss's law for electricity and magnetism is this operator in action.",
      "Incompressible flow is the condition ∇·v⃗ = 0.",
    ],
    "div takes a vector and returns a scalar — the dot product removes the arrow.",
  ),
  curl: E(
    "Curl asks whether a tiny paddle wheel dropped into the field would spin. Straight-line flow can still spin it if one side moves faster.",
    "Curl is the vector whose projection on any unit normal gives the circulation per unit area of an infinitesimal loop with that orientation, related to line integrals by Stokes' theorem.",
    [
      "Shear flow is the classic counter-example to intuition. Water moving in perfectly straight parallel lines, but faster on one side than the other, will certainly spin a paddle wheel. Curl measures the transverse variation of the field, not the curvature of the streamlines.",
      "For rigid rotation, curl is exactly twice the angular velocity. That factor of two is not arbitrary: it appears because circulation around a loop accumulates contributions from both the rotation of the fluid element and the shear of its surroundings.",
      "The free vortex is the beautiful case. Water spiralling down a drain circulates strongly, yet away from the centre a tiny paddle wheel translates around the vortex without spinning about its own axis: the field is irrotational everywhere except at the singular centre, where all the circulation is concentrated.",
      "Zero curl in a simply connected region is precisely the condition for a potential to exist, which is why conservative forces, electrostatic fields and irrotational flows can all be described by a single scalar function instead of three components.",
    ],
    "Stokes set the theorem as a Cambridge examination question in 1854 having learned it from Kelvin; Maxwell then made curl central to electromagnetism through Faraday's law.",
    [
      "Faraday's law ∇×E⃗ = −∂B⃗/∂t is the basis of every generator and transformer.",
      "Vorticity ∇×v⃗ quantifies cyclones, tornadoes and wingtip vortices.",
      "Zero curl is the test for a conservative force field.",
    ],
    "Straight streamlines do not imply zero curl — shear spins the paddle wheel.",
  ),
  "physical-meaning-operators": E(
    "Three questions: which way is uphill, what is leaking out, and what is spinning. Three operators, one for each.",
    "The three first-order operators of vector analysis are distinguished by their input and output ranks and by the two universal identities curl grad ≡ 0 and div curl ≡ 0.",
    [
      "Keeping track of ranks prevents most errors: grad takes a scalar to a vector, div takes a vector to a scalar, and curl takes a vector to a vector. If your equation has a scalar on one side and a vector on the other, something has gone wrong before the physics even begins.",
      "The two identities are not curiosities. Because curl grad ≡ 0, any field written as a gradient is automatically irrotational. Because div curl ≡ 0, any field written as a curl is automatically solenoidal. Helmholtz's theorem completes the picture: a well-behaved field decomposes uniquely into an irrotational part plus a solenoidal part, which is exactly how the electric field splits in electromagnetism.",
      "The Laplacian, div of grad, measures how much a value at a point differs from the average of its neighbours. That interpretation makes Laplace's equation say 'every point equals the average of its surroundings', which immediately explains the maximum principle and why potentials are so smooth.",
    ],
    "Helmholtz proved his decomposition theorem in 1858 while studying vortex motion in fluids; Maxwell used the resulting language to write the equations of electromagnetism in the compact form we still use.",
    [
      "All four Maxwell equations are built from div and curl.",
      "The Laplacian appears in the heat, wave, Poisson, Laplace and Schrödinger equations.",
      "Computational fluid dynamics evaluates all three operators on every mesh cell.",
    ],
    "Check the rank of every term: mixing scalars and vectors is the most common slip.",
  ),
  "continuity-equation": E(
    "Nothing vanishes. If more flows in than out, the amount inside must be going up. That sentence is the whole equation.",
    "The continuity equation is the local form of a conservation law, asserting that the time rate of change of a density equals minus the divergence of its associated flux.",
    [
      "Continuity is the template for every conservation law in physics. Replace mass density by charge density and mass flux by current density and you have conservation of charge; do the same with energy or probability and you obtain the corresponding statements. Any quantity that cannot teleport obeys an equation of this shape.",
      "The distinction between local and global conservation is important. A global statement would allow mass to vanish here and reappear on the Moon; the differential form forbids that, insisting that any decrease here must be accounted for by a flux through the surrounding surface. Relativity requires local conservation, since simultaneity at a distance is not well defined.",
      "In quantum mechanics the same equation appears with probability density |ψ|² and a probability current, guaranteeing that a particle described by the Schrödinger equation never simply disappears.",
    ],
    "Euler wrote the continuity equation for fluids in 1757. Maxwell later noticed that the original Ampère law violated charge continuity, which led him to add the displacement current — and thence to predict electromagnetic waves.",
    [
      "Charge conservation ∂ρ/∂t + ∇·J⃗ = 0 is the electromagnetic twin.",
      "A₁v₁ = A₂v₂ for pipes is the everyday special case.",
      "Probability conservation in quantum mechanics has the same form.",
    ],
    "For a gas it is the mass flow rate that is conserved, not the volume flow rate.",
  ),
  "euler-equation": E(
    "It is just F = ma written for a small blob of fluid, with pressure differences and gravity doing the pushing.",
    "Euler's equation expresses momentum conservation per unit volume for an inviscid continuum, with the material derivative supplying the acceleration of a fluid element in a Eulerian description.",
    [
      "The convective term catches almost everyone out. A steady flow is one where the velocity at each fixed point never changes — yet a fluid particle travelling through a narrowing pipe certainly accelerates, because it moves into a region where the velocity is different. The material derivative D/Dt = ∂/∂t + (v⃗·∇) is what reconciles the two viewpoints.",
      "Choosing between descriptions is a real modelling decision. The Lagrangian description follows individual particles and is natural for solids; the Eulerian description watches fixed points in space and is natural for fluids. The material derivative is the bridge between them.",
      "Adding the viscous stress term to Euler's equation produces the Navier–Stokes equation. Whether smooth solutions always exist for it in three dimensions is one of the seven Millennium Prize Problems and remains unsolved.",
    ],
    "Euler published these equations in 1757, creating theoretical fluid dynamics. They famously predict zero drag on a body in steady flow — d'Alembert's paradox — which is resolved only by including viscosity.",
    [
      "Integrating along a streamline gives Bernoulli's theorem.",
      "Adding rotation terms gives the equations used in weather forecasting.",
      "Adding viscosity gives Navier–Stokes, the basis of modern aerodynamics.",
    ],
    "Steady flow does not mean zero acceleration — the convective term survives.",
  ),
  bernoulli: E(
    "Along one streamline, pressure, motion and height share a fixed budget. Spend more on speed and you must spend less on pressure.",
    "Bernoulli's theorem is the first integral of Euler's equation along a streamline for steady, incompressible, inviscid flow, expressing conservation of mechanical energy per unit volume.",
    [
      "The conditions are not optional decoration, and most wrong answers come from ignoring them. Steady, incompressible, inviscid, and along a single streamline — unless the flow is also irrotational, in which case the constant is global. Apply it across a pump, a fan, a turbine or a region of turbulence and you will get nonsense.",
      "The popular 'equal transit time' explanation of aircraft lift is simply wrong: air over the upper surface does not have to rejoin its partner at the trailing edge, and in fact it arrives sooner. Lift arises because the wing deflects air downwards and establishes circulation; Bernoulli then correctly relates the resulting speed differences to pressure differences. The theorem describes the flow, it does not by itself explain why the flow is that way.",
      "The practical instruments are worth knowing. A Venturi meter uses a throat pressure drop to measure flow rate; a Pitot tube compares stagnation and static pressure to give airspeed; an atomiser uses a fast jet to lower pressure and draw liquid up a tube.",
    ],
    "Daniel Bernoulli published Hydrodynamica in 1738, before the energy concept was fully formed. Euler recast the result in the modern form a few years later using his own equation of motion.",
    [
      "Venturi meters, Pitot tubes, carburettors and atomisers are direct applications.",
      "The Magnus effect on spinning balls combines circulation with this pressure relation.",
      "Blood-flow diagnostics use the same relation in arteries.",
    ],
    "No pumps, no friction, one streamline — otherwise Bernoulli does not apply.",
  ),
  "fourier-heat": E(
    "Heat slides down temperature hills, and the steeper the hill the faster it slides. Over time every bump flattens out.",
    "Fourier's constitutive law combined with local energy conservation yields a parabolic partial differential equation whose solutions smooth initial data irreversibly and possess infinite formal propagation speed.",
    [
      "Diffusion is fundamentally different from wave propagation. A wave keeps its shape and travels at a fixed speed; a diffusing temperature profile spreads and flattens, and the distance it reaches grows only as the square root of time. This is why the surface of the Earth feels summer months after the solstice, and why heating a thick wall takes disproportionately long.",
      "The scaling law L ~ √(αt) is the single most useful thing to remember. Doubling the distance quadruples the time. It explains why thin fins cool electronics effectively, why cooking a large roast takes far longer than its mass alone suggests, and why the Earth's crust still retains heat from its formation.",
      "Fourier's law is empirical and does break down. At very short times or very small length scales — nanoscale devices, ultrafast laser pulses — heat transport becomes ballistic and the diffusion picture fails, requiring more sophisticated treatments.",
      "In the steady state the time derivative vanishes and the heat equation collapses into Laplace's equation, which is why steady heat conduction, electrostatics and groundwater flow are all solved by the same mathematics.",
    ],
    "Fourier's 1822 Théorie analytique de la chaleur introduced both this equation and Fourier series to solve it. The mathematics was initially rejected by Lagrange for lack of rigour; it went on to reshape all of analysis.",
    [
      "Steady state gives Laplace's equation, the next topic.",
      "Fick's law of particle diffusion and the Black–Scholes equation have identical structure.",
      "Thermal management of processors and buildings is this equation solved numerically.",
    ],
    "Heat flows opposite to the gradient — the minus sign in q⃗ = −k∇T carries the second law.",
  ),
  "poisson-laplace": E(
    "Where there is charge, the potential is curved. Where there is none, the potential is as smooth and stretched as it can possibly be.",
    "Poisson's equation relates the Laplacian of the potential to the local source density; in source-free regions the potential is harmonic and satisfies the mean-value property and the maximum principle.",
    [
      "Harmonic functions have a beautiful property: the value at any point equals the average over any sphere centred on it. This immediately implies the maximum principle — a potential in a charge-free region can have no local maximum or minimum, so its extreme values live on the boundary.",
      "Earnshaw's theorem follows directly and has real consequences. No arrangement of static charges can trap another charge in stable equilibrium, because stability would require a potential minimum in empty space, which the maximum principle forbids. Magnetic levitation therefore needs diamagnetism, superconductivity, feedback or spin.",
      "The uniqueness theorem is what makes electrostatics tractable. If you find any solution satisfying the boundary conditions, by any means at all — guessing, symmetry, images — it is the solution. This licenses the method of images, which replaces a conductor by a fictitious charge.",
      "The same pair of equations governs gravitational potentials, steady heat flow, groundwater seepage, inviscid flow past bodies, and soap films, which is why one numerical solver serves all of these industries.",
    ],
    "Laplace introduced the equation in celestial mechanics in the 1780s; Poisson added the source term in 1813 after noticing that Laplace's form could not hold inside a mass distribution.",
    [
      "Gauss's law in differential form leads directly to Poisson's equation.",
      "Steady-state heat conduction, from the previous topic, is Laplace's equation.",
      "Finite-element solvers in engineering spend most of their time on these equations.",
    ],
    "Use Poisson where charge exists and Laplace only where it genuinely does not.",
  ),
  "gauss-law": E(
    "Count everything leaving a closed surface and you have counted the charge inside, no matter how strange the surface looks.",
    "Gauss's law is equivalent to the inverse-square law together with superposition, and expresses the enclosed source strength as the flux of the field through any bounding closed surface.",
    [
      "The independence from the surface shape comes from the geometry of the inverse-square law. The field falls as 1/r² while the area of any subtended patch grows as r², so the product — the flux — is unchanged. Gauss's law would fail for any other power law, which is why precision tests of it are precision tests of the exponent in Coulomb's law.",
      "Gauss's law is always true but only sometimes useful. Computing the field from it requires enough symmetry that the field magnitude is constant over a conveniently chosen surface: spherical, cylindrical or planar. Without symmetry it remains valid but tells you only the total flux.",
      "Electrostatic shielding is the most familiar consequence. Inside the cavity of a conductor with no enclosed charge the field is exactly zero, regardless of what happens outside. That is why cables have braided shields, why sensitive equipment sits in metal enclosures, and why a car is a reasonably safe place in a lightning storm.",
      "Zero net flux does not mean zero field. A charge sitting outside your surface produces a field everywhere on it, but every field line that enters also leaves, so the contributions cancel exactly.",
    ],
    "Gauss formulated the law around 1835, though it was published only in 1867. Cavendish had demonstrated the shielding consequence experimentally as early as 1773, decades before the theory existed.",
    [
      "Applying the divergence theorem converts it to Poisson's equation.",
      "Gauss's law for magnetism, ∮B⃗·dA⃗ = 0, states that no monopoles exist.",
      "The same mathematics gives the gravitational field of a spherical shell.",
    ],
    "Symmetry is what makes Gauss's law a shortcut; without it, integrate Coulomb's law instead.",
  ),
  "dot-cross-products": E(
    "Dot asks how much two arrows agree in direction. Cross asks how much they disagree, and answers with a new arrow at right angles to both.",
    "The scalar product is the symmetric bilinear form measuring projection; the vector product is the antisymmetric bilinear map whose magnitude gives the spanned area and whose direction follows the right-hand convention.",
    [
      "The symmetry properties encode the physics. The dot product is commutative, which is why work does not depend on which vector you write first. The cross product is anticommutative, which is why reversing the order of r⃗ and F⃗ reverses the sense of the torque — and why you must be careful about it.",
      "Torque and energy share the unit newton-metre but are entirely different physical quantities, one a vector built from a cross product and the other a scalar built from a dot product. By convention energy is reported in joules and torque in newton-metres, and the distinction should be respected in written answers.",
      "The magnetic force qv⃗×B⃗ is perpendicular to the velocity, so it does no work and can never change a charged particle's speed — only its direction. That single geometric fact is the operating principle of cyclotrons, mass spectrometers and the magnetic confinement of plasma.",
    ],
    "Both products are fragments of Hamilton's quaternion multiplication of 1843, separated into independent operations by Gibbs and Heaviside in the 1880s because physicists found the split far more practical.",
    [
      "Work, power and electric flux use the dot product.",
      "Torque, angular momentum, magnetic force and area vectors use the cross product.",
      "The triple products of the earlier topic combine both.",
    ],
    "Cross products are anticommutative: A⃗×B⃗ = −B⃗×A⃗, so order matters.",
  ),

  /* ============================ DYNAMICS ============================ */
  "frame-of-reference": E(
    "Everything you measure depends on who is doing the measuring and how they are moving. State the observer or the number is meaningless.",
    "A frame of reference is a coordinate system with an associated time standard; classical kinematic quantities transform between frames by the Galilean group.",
    [
      "Relativity in the ordinary sense is much older than Einstein. Galileo argued in 1632 that experiments below deck on a smoothly sailing ship give exactly the same results as on land, so no mechanical experiment can detect uniform motion. That principle is the foundation of everything in this chapter.",
      "Under Galilean transformation, positions and velocities change but accelerations do not. Since forces depend on separations and relative motion, the laws of mechanics take the same form in every inertial frame. What changes between frames is the description; what stays fixed is the physics.",
      "The Galilean rule fails at high speed. Adding velocities linearly would let light travel at different speeds for different observers, contradicting experiment, and the Lorentz transformation replaces it. For everything in this course, however, the classical rule is accurate to far better than any measurement.",
    ],
    "Galileo's ship argument appeared in the Dialogue Concerning the Two Chief World Systems in 1632; it was his answer to the objection that a moving Earth would leave falling objects behind.",
    [
      "Relative velocity problems in navigation and aviation use this directly.",
      "The Lorentz transformation of special relativity replaces the Galilean one at high speed.",
      "Inertial frames, defined in the next topic, are the frames where Newton's laws are simplest.",
    ],
    "Quoting a velocity without naming the frame is an incomplete answer.",
  ),
  "inertial-frame": E(
    "An inertial frame is one where something left completely alone really does just keep going in a straight line.",
    "An inertial frame is one in which free particles have zero acceleration; such frames form an equivalence class related by Galilean transformations, and in the presence of gravity exist only locally.",
    [
      "There is a circularity that honest textbooks admit: an inertial frame is where a free particle moves uniformly, and a free particle is one in an inertial frame with no forces. In practice the circle is broken empirically, by adopting the distant stars as a reference and checking that the residual accelerations are as small as we can measure.",
      "The Earth is a good but imperfect inertial frame. Its rotation produces a centripetal acceleration of about 0.034 m s⁻² at the equator, roughly 0.3 % of g, and it is the source of every effect in the rest of this chapter. For a laboratory experiment lasting seconds it is negligible; for a cyclone lasting days it is decisive.",
      "Einstein's equivalence principle takes this further: a freely falling frame is locally indistinguishable from an inertial one, because gravity and the frame's acceleration cancel exactly for all masses. Astronauts float not because gravity is absent but because they and their spacecraft fall together.",
    ],
    "Newton assumed absolute space; Mach objected in 1883 that inertia should be determined by the distant matter of the universe. Mach's principle influenced Einstein deeply, even though general relativity does not implement it exactly.",
    [
      "Non-inertial frames in the next topic require pseudo-forces.",
      "The equivalence principle is the starting point of general relativity.",
      "Inertial navigation systems measure departures from inertial motion.",
    ],
    "'At rest' is not the test — a frame at rest on a turntable is thoroughly non-inertial.",
  ),
  "non-inertial-frame": E(
    "If your own platform is accelerating, you have to invent an extra force to make Newton's law balance. It is not real, but you certainly feel it.",
    "In a frame accelerating with A⃗ relative to an inertial frame, Newton's second law acquires the inertial term −mA⃗, which has no interaction partner and vanishes on returning to an inertial description.",
    [
      "Pseudo-forces are fictitious in a precise technical sense: they arise from the choice of frame, not from any interaction, and they have no Newton's-third-law partner. They are nonetheless entirely real in their effects within that frame, which is why seat belts exist.",
      "Their defining signature is proportionality to mass. Every object in an accelerating frame experiences a pseudo-force exactly proportional to its own mass, which means every object experiences the same pseudo-acceleration. Gravity behaves the same way, and that coincidence — the equality of inertial and gravitational mass — is the seed of general relativity.",
      "The helium balloon in an accelerating car is the classic puzzle. The air, being much denser than helium, is thrown towards the rear and sets up a pressure gradient. Buoyancy then pushes the light balloon in the opposite direction, forward, contrary to naive expectation.",
      "d'Alembert's principle turns the whole idea into a technique: add −ma⃗ as a force and every dynamics problem becomes a statics problem, which is often much easier to set up.",
    ],
    "d'Alembert published his principle in 1743, providing the route from Newtonian mechanics to the Lagrangian formulation that dominates modern theoretical physics.",
    [
      "Lift problems, accelerating trolleys and pendulum angles are the standard examples.",
      "Accelerometers in phones and aircraft measure pseudo-forces on a test mass.",
      "Rotating frames in the next topic add two more pseudo-force terms.",
    ],
    "Choose one frame per free-body diagram and never mix real and pseudo-forces from different frames.",
  ),
  "rotating-frame": E(
    "Spin the floor and two new invented forces appear: one pushing you outward, another bending you sideways whenever you move.",
    "Transformation to a rotating frame introduces centrifugal and Coriolis terms through the operator identity relating inertial and rotating time derivatives, together with an Euler term for non-uniform rotation.",
    [
      "Everything follows from one operator identity: the inertial time derivative of any vector equals the rotating-frame derivative plus ω⃗ cross the vector. Apply it once to position and you get the velocity relation; apply it twice and both pseudo-forces drop out automatically. It is worth memorising the identity rather than the results.",
      "The two pseudo-forces are qualitatively different. The centrifugal term depends on where you are and not on how you move; the Coriolis term depends on how you move and not on where you are. A stationary object on a turntable feels only the first; a moving object feels both.",
      "The Coriolis force is always perpendicular to the velocity and therefore does no work. It cannot speed anything up or slow anything down; it only steers. That is why cyclones rotate rather than accelerate radially inward.",
      "A rotating space habitat would use the centrifugal term as artificial gravity — but the Coriolis term would be noticeable too, deflecting dropped objects and making rapid head movements unpleasant unless the radius is large.",
    ],
    "Coriolis published his analysis in 1835 while studying energy transfer in rotating machinery such as waterwheels; the meteorological importance was recognised only later in the nineteenth century.",
    [
      "Centrifugal and Coriolis forces each get their own topic next.",
      "Weather and ocean circulation are dominated by the Coriolis term.",
      "Centrifuges, gyroscopes and rotating machinery exploit the centrifugal term.",
    ],
    "Centrifugal depends on position, Coriolis on velocity — and neither exists in an inertial frame.",
  ),
  "centrifugal-force": E(
    "Spin fast and you feel thrown outward. From outside, nobody is throwing you — you are simply trying to go straight while the floor curves away.",
    "The centrifugal term −mω⃗×(ω⃗×r⃗) is the position-dependent inertial force in a rotating frame, of magnitude mω²r_⊥ directed away from the rotation axis.",
    [
      "Centrifugal and centripetal are not an action–reaction pair, and saying so is the single most common error in this topic. Centripetal force is a real inward force described in an inertial frame; centrifugal force is a pseudo-force described in the rotating frame. They live in different descriptions and never appear in the same correct free-body diagram.",
      "A spin dryer does not push water outward. It removes the inward force that was holding the water in a circular path, and the water then travels in a straight line until it meets the drum wall and escapes through the holes. Nothing is thrown; the constraint is simply withdrawn.",
      "Centrifuges are extraordinarily effective because the effect scales as ω². A laboratory ultracentrifuge can generate effective accelerations approaching a million times g, separating proteins, isotopes and blood components by density in minutes.",
      "The Earth's own rotation makes it an oblate spheroid, bulging by about 21 km at the equator, which is itself the largest geophysical consequence of this term.",
    ],
    "Huygens coined the term 'centrifugal force' in 1659 and derived the v²/r expression while designing accurate pendulum clocks — the first quantitative treatment of circular motion.",
    [
      "Banked roads and railway curves are designed with this term.",
      "The variation of g with latitude, two topics ahead, follows from it.",
      "Planetary oblateness and the equatorial bulge are its largest natural examples.",
    ],
    "Use centrifugal force only inside the rotating frame, and never alongside centripetal force.",
  ),
  "coriolis-force": E(
    "On a spinning planet, anything that moves gets nudged sideways. Over a few metres you would never notice. Over a thousand kilometres it builds a hurricane.",
    "The Coriolis force −2mω⃗×v⃗ is the velocity-dependent inertial force in a rotating frame; its horizontal component 2mΩv sin λ governs large-scale geophysical flows.",
    [
      "The deflection sense follows from the cross product and is worth fixing once: to the right of the motion in the northern hemisphere, to the left in the southern, and zero horizontal deflection at the equator. Ferrel's law is simply this statement in words.",
      "The Rossby number, the ratio of inertial to Coriolis effects, decides whether the force matters. For a hurricane spanning hundreds of kilometres over days it is small and Coriolis dominates. For water draining from a basin over seconds it is enormous, so the shape of the basin and the residual swirl entirely overwhelm the rotational effect. The bathtub claim is folklore, not physics.",
      "Because the force is always perpendicular to the velocity it does no work, so it cannot supply the energy of a storm. That energy comes from latent heat released as water vapour condenses; Coriolis merely organises the flow into a rotating structure instead of a radial rush.",
      "Geostrophic balance is the resulting steady state: the pressure gradient force pointing towards low pressure is balanced by the Coriolis force, and the wind ends up blowing almost along the isobars rather than across them. That is why weather maps can be read as flow maps.",
    ],
    "Hadley invoked Earth's rotation to explain the trade winds in 1735, a century before Coriolis wrote the general mathematics; Ferrel applied it systematically to atmospheric circulation in the 1850s.",
    [
      "Cyclones, anticyclones, trade winds and ocean gyres all follow.",
      "Foucault pendulum precession is the Coriolis force acting on a swinging bob.",
      "Long-range artillery and ballistic missile guidance include Coriolis corrections.",
    ],
    "It changes direction only, never speed, and it matters over large scales and long times.",
  ),
  "centrifugal-effect-on-g": E(
    "Some of Earth's pull is used up just keeping you turning with the planet. What is left over is the weight you actually measure.",
    "Effective gravity is the vector sum of the true gravitational attraction and the centrifugal term, producing a latitude-dependent magnitude and a small deviation of the plumb line from the radial direction.",
    [
      "Two distinct effects reduce measured gravity at the equator and they are often conflated. The centrifugal term alone accounts for about 0.034 m s⁻²; the equatorial bulge, which places you about 21 km further from the centre of mass, contributes a comparable amount. Together they give the observed difference of roughly 0.5 % between pole and equator.",
      "The plumb line does not point at the centre of the Earth anywhere except at the poles and on the equator. The tangential component of the centrifugal term tilts it towards the equator, with the maximum deviation of about one-tenth of a degree occurring at 45° latitude. Surveying and geodesy must account for this.",
      "If the Earth rotated about seventeen times faster, ω²R at the equator would reach 9.8 m s⁻² and objects there would be weightless. That is not merely a curiosity: rapidly rotating stars and gas giants really are strongly flattened by exactly this effect, and Jupiter's oblateness is easily visible in a small telescope.",
    ],
    "Newton predicted the equatorial bulge in the Principia; the French Geodesic Missions to Lapland and Peru in the 1730s measured meridian arcs and confirmed it, settling a bitter dispute with the Cassinis who expected a prolate Earth.",
    [
      "Rocket launch sites are placed near the equator for both the rotational speed boost and the marginally lower effective gravity.",
      "Precision gravimeters and analytical balances are calibrated for local latitude.",
      "Satellite orbits are perturbed by the same oblateness that this effect creates.",
    ],
    "The gravitational field itself does not change with latitude — only the effective value you measure does.",
  ),
  "freely-falling-bodies": E(
    "The top of a tower is further from the spin axis, so it is already moving east faster. Drop something and it keeps that extra eastward speed, landing slightly east.",
    "First-order perturbation of free fall by the Coriolis term yields an eastward deflection (1/3)ωgt³cos λ, with higher-order southward terms usually negligible.",
    [
      "There are two equivalent ways to see the eastward deflection. In the rotating frame, the Coriolis force on a downward velocity points east. In the inertial frame, the release point at height h has a larger tangential speed than the ground beneath it, and conservation of that eastward momentum carries the body ahead of the target. Both give the same answer, and checking that they do is an excellent exercise.",
      "The h^{3/2} scaling makes this a hard experiment. Doubling the drop height increases the deflection by a factor of only 2.8, and from 100 m the deflection is about 2 cm — comparable to the disturbance from a slight draught or an imperfect release.",
      "Nineteenth-century physicists dropped balls down mine shafts to test the prediction. Results were mixed and controversial, precisely because the systematic errors are of the same order as the effect. The Foucault pendulum, with its steadily accumulating and unmistakable precession, was a far better experiment.",
    ],
    "Hooke attempted the falling-body test at Newton's suggestion in 1679; Guglielmini performed careful mine-shaft drops in Bologna in 1791 and found an eastward deflection roughly consistent with theory.",
    [
      "The same Coriolis term drives the Foucault pendulum and cyclone rotation.",
      "Ballistic trajectory software applies this correction to long-range projectiles.",
      "Drop-tower microgravity experiments must account for it at the millimetre level.",
    ],
    "The deflection is always eastward for release from rest, and it is maximum at the equator.",
  ),
  "geophysical-effects": E(
    "Winds, ocean currents, storm rotation and even the shape of the planet all carry the fingerprint of one spinning Earth.",
    "The centrifugal and Coriolis terms jointly determine planetary figure, the latitude dependence of gravity, global circulation patterns and the geostrophic balance of large-scale flows.",
    [
      "The three-cell model of atmospheric circulation is the large-scale result. Air rises at the equator, sinks near 30° forming the desert belts, and the Coriolis deflection converts these meridional flows into the easterly trade winds and the mid-latitude westerlies. Almost every desert on Earth sits under a descending branch of this system.",
      "Ocean gyres rotate for the same reason, and Ekman transport — the deflection of wind-driven surface water — drives the coastal upwelling that supports the world's richest fisheries off Peru, California and West Africa.",
      "Baer's law, the claim that rivers in the northern hemisphere preferentially erode their right banks, is a genuine but weak Coriolis effect. It is easily swamped by geology, gradient and flow rate, so it should be quoted with care rather than as a reliable rule.",
      "The effects grow with the scale of the motion. A jet aircraft crossing a continent, an ocean current, and a weather system are all strongly affected; a football, a shower and a sink are not.",
    ],
    "Hadley (1735), Coriolis (1835) and Ferrel (1856) built the modern picture in stages; numerical weather prediction, beginning with Richardson's hand calculations in 1922, turned it into daily forecasting.",
    [
      "Every weather forecast integrates these terms numerically.",
      "Ocean circulation and climate models depend on the same balance.",
      "Foucault's pendulum, the next topic, is the laboratory-scale demonstration.",
    ],
    "Coriolis dominates over hundreds of kilometres and hours — not in your bathroom.",
  ),
  "foucault-pendulum": E(
    "A long pendulum keeps swinging in the same direction while the building slowly turns underneath it. Watch for an hour and you can see the Earth rotate.",
    "The plane of oscillation of a freely suspended pendulum precesses at Ω sin λ relative to the local surface, a direct consequence of the vertical component of the Earth's angular velocity acting through the Coriolis term.",
    [
      "The factor sin λ is what confuses people and is worth understanding properly. Only the component of Earth's angular velocity along the local vertical rotates the horizontal plane of swing. At the pole that component is the whole of Ω and the plane completes a turn in one sidereal day; at the equator it is zero and the plane never precesses at all.",
      "The experiment is demanding. The wire must be long, the bob heavy, the suspension free to rotate without exerting torque, and the release perfectly clean — Foucault used a thread burned through to avoid any sideways impulse. Any initial sideways velocity produces an elliptical orbit that precesses for a quite different and spurious reason.",
      "Foucault's 1851 demonstration in the Panthéon used a 67-metre wire and a 28 kg bob, and it was a public sensation. It was the first experiment allowing anyone, with no astronomy and no instruments, to watch the Earth turn.",
      "The same principle, packaged with a spinning rotor instead of a swinging bob, becomes the gyrocompass — which finds true north without any magnetism and is standard equipment on ships and aircraft.",
    ],
    "Léon Foucault, a self-taught experimentalist, first noticed the effect with a vibrating rod in a lathe. His public demonstration in 1851 made him famous; he invented the gyroscope the following year.",
    [
      "Gyrocompasses and inertial navigation use the same physics.",
      "Ring-laser and fibre-optic gyroscopes measure Earth's rotation to high precision today.",
      "The precession is the Coriolis force of the previous topics acting on a bob.",
    ],
    "Precession is fastest at the poles and absolutely zero at the equator.",
  ),
  "proof-earth-rotation": E(
    "Sunrise does not prove the Earth spins — a turning sky would look the same. These experiments are done entirely indoors and cannot be explained any other way.",
    "Direct mechanical demonstrations of terrestrial rotation are local experiments whose quantitative outcomes depend on Ω, in contrast with astronomical observations that establish relative motion only.",
    [
      "The distinction between direct and indirect evidence is a genuine lesson in scientific method. Astronomical observations of the sky turning are consistent with a rotating Earth, but were equally consistent with a rotating celestial sphere for two millennia. Mechanical experiments performed in a sealed room are not: they measure Ω itself.",
      "The classic four are the Foucault pendulum's precession, the eastward deflection of falling bodies, the gyrocompass seeking north, and the latitude variation of effective gravity. Each yields the same value of Ω, and that quantitative agreement is what makes the case overwhelming rather than merely suggestive.",
      "Modern versions are extraordinarily precise. Large ring-laser gyroscopes anchored in bedrock measure Earth's rotation rate continuously and detect variations of parts in a billion, revealing the tiny wobbles caused by ocean tides, atmospheric mass movement and earthquakes.",
      "Stellar parallax and the aberration of starlight, by contrast, demonstrate the Earth's orbital motion around the Sun rather than its daily rotation — a different claim, established by Bradley in 1728 and Bessel in 1838.",
    ],
    "The debate ran from Aristarchus through Copernicus to Galileo without a decisive terrestrial experiment. Foucault finally supplied one in 1851, more than three centuries after De revolutionibus.",
    [
      "Foucault pendulum, falling bodies and gravity variation are covered in the preceding topics.",
      "Ring-laser gyroscopes provide the modern high-precision measurement.",
      "GPS timing corrections include the Sagnac effect from Earth's rotation.",
    ],
    "A direct proof is one you could perform in a windowless room.",
  ),

  /* ========================= CENTRAL FORCES ========================= */
  "lab-frame": E(
    "The laboratory frame is simply your point of view: the target sits still and waits, and your detectors are bolted to the floor.",
    "The laboratory frame is the frame of the apparatus, in which the target is initially at rest and all measured angles, energies and times are defined.",
    [
      "The key limitation of a fixed-target experiment is that momentum conservation forces the centre of mass to keep moving, and that motion carries kinetic energy which can never be converted into anything else. Only the energy in the centre-of-mass frame, ½μu², is available for creating new particles or exciting the target.",
      "The fraction wasted grows severely with energy in the relativistic regime, where the available energy scales only as the square root of the beam energy. Doubling the accelerator energy buys you only about forty per cent more useful energy.",
      "That arithmetic is the entire reason modern particle physics uses colliders. When two beams of equal and opposite momentum meet, the laboratory frame is the centre-of-mass frame and every joule of beam energy is available. Fixed-target experiments survive where high event rates matter more than high energy.",
    ],
    "Rutherford's 1909 gold-foil experiment was the first great fixed-target scattering experiment; the first proton–proton collider ideas emerged in the 1950s precisely because of this energy penalty.",
    [
      "The centre-of-mass frame of the next topic removes the wasted energy.",
      "Reduced mass μ appears throughout two-body dynamics.",
      "Crash-test analysis uses exactly this frame and this arithmetic.",
    ],
    "Not all the incident kinetic energy is available — the centre of mass keeps moving.",
  ),
  "cm-frame": E(
    "Ride along with the centre of mass and the collision becomes beautifully tidy: the two objects always come in and leave back to back.",
    "The centre-of-mass frame is the zero-momentum frame; in it the two-body problem reduces to a single particle of reduced mass, and elastic collisions preserve the magnitudes of both momenta.",
    [
      "The simplification is dramatic. In the C-frame an elastic collision does one single thing: it rotates the common line of the two momenta through the angle θ_C. The speeds do not change at all. Every laboratory complication — unequal angles, unequal speeds, maximum scattering angles — comes purely from adding the centre-of-mass velocity back.",
      "The velocity-triangle construction makes the geometry visible. The laboratory velocity is v⃗_cm plus a C-frame vector of fixed length, so the tip traces a circle. If v_cm is larger than that radius, which happens when the projectile is heavier than the target, the circle does not enclose the origin and there is a maximum possible laboratory scattering angle, sin θ_max = m₂/m₁.",
      "The reduction to reduced mass is a general and powerful idea. Any isolated two-body problem with a central interaction separates into free motion of the centre of mass plus the motion of a single fictitious particle of mass μ about a fixed centre — which is why the rest of this chapter can treat orbits as one-body problems.",
    ],
    "The reduced-mass technique dates to Newton's treatment of the two-body problem in the Principia; its systematic use in scattering theory belongs to the twentieth century.",
    [
      "All the scattering angle relations in this chapter come from this transformation.",
      "Central-force orbits use reduced mass to become one-body problems.",
      "Collider physics works in this frame by design.",
    ],
    "Zero total momentum does not mean zero motion — the C-frame moves at v⃗_cm through the laboratory.",
  ),
  "centre-of-mass": E(
    "Throw a spanner and it tumbles chaotically, but one invisible point inside it traces a perfect, boring parabola.",
    "The centre of mass is the mass-weighted mean position; its motion is governed solely by external forces, since internal forces cancel pairwise by Newton's third law.",
    [
      "The centre-of-mass theorem is what makes mechanics tractable. However complicated the internal motion — rotation, vibration, explosion, chemical reaction — the centre of mass obeys a simple equation involving only external forces. An exploding firework's fragments scatter wildly, yet their centre of mass continues along the original parabola until the first piece hits the ground.",
      "It need not lie inside the body. A ring, a horseshoe, a boomerang and a high jumper arched over a bar all have centres of mass in empty space. The Fosbury flop works precisely because the athlete's centre of mass can pass underneath the bar while every part of the body passes over it.",
      "Centre of mass and centre of gravity coincide only in a uniform gravitational field. For very tall structures or for a satellite in orbit the field varies across the body, the two points separate, and the resulting gravity-gradient torque is actually used to stabilise spacecraft without fuel.",
      "Locomotion is centre-of-mass management. Walking, swimming and rocket propulsion all work by pushing mass one way so that the rest goes the other, keeping the system's centre of mass obedient to external forces alone.",
    ],
    "Archimedes founded the theory of centres of gravity in the third century BCE, well before the concept of mass existed; his results on balance and levers are still exactly right.",
    [
      "The C-frame of the previous topic is built on this point.",
      "Rocket propulsion and recoil are centre-of-mass conservation.",
      "Binary stars orbit their common centre of mass, which is how exoplanets are detected.",
    ],
    "Internal forces can never move the centre of mass — you cannot lift yourself by your own bootstraps.",
  ),
  "two-dimensional-collision": E(
    "Momentum has to balance in both directions at once. If the collision is also elastic, energy gives you a third equation and the answer is pinned down.",
    "Planar collisions are determined by two momentum components plus, for elastic collisions, the kinetic energy condition; a fourth datum such as impact parameter or one scattering angle is required to close the system.",
    [
      "Counting equations and unknowns is the whole strategy. Four unknowns — two final speeds and two angles — against two momentum equations and one energy equation means exactly one more piece of information is needed. That piece is supplied by the geometry of the encounter, usually the impact parameter or a measured angle.",
      "The ninety-degree rule for equal masses is elegant and worth deriving yourself. Square the vector momentum equation, compare with the energy equation, and the cross term must vanish, which forces the two outgoing velocities to be perpendicular. Snooker players use it without ever writing it down.",
      "The coefficient of restitution measures how inelastic a collision is, running from one for perfectly elastic to zero for perfectly inelastic where the bodies move off together. Perfectly inelastic collisions lose the maximum kinetic energy consistent with momentum conservation — never all of it, because the centre of mass must keep moving.",
      "Vehicle crash reconstruction is this calculation performed backwards: from the final resting positions and skid marks, investigators recover the pre-impact velocities using two-dimensional momentum conservation.",
    ],
    "Wallis, Wren and Huygens independently solved the collision problem for the Royal Society in 1668, establishing momentum conservation as a law of nature two decades before the Principia.",
    [
      "Scattering angle and recoil angle in the next topics extend this analysis.",
      "Neutron moderation in reactors uses light nuclei for maximum energy transfer.",
      "Molecular collisions in kinetic theory use the same conservation laws.",
    ],
    "Momentum is conserved in every collision; kinetic energy only in elastic ones.",
  ),
  "scattering-angle": E(
    "Aim dead centre and the particle comes straight back. Aim wide and it barely notices. The angle it turns through is a fingerprint of the force.",
    "The deflection angle is determined by the impact parameter, the relative energy and the interaction potential through the orbit integral; for a repulsive Coulomb field it satisfies tan(θ_C/2) = kq₁q₂/2Eb.",
    [
      "Scattering is how we see the invisible. We cannot photograph a nucleus, so we fire particles at it and measure how they are deflected. From the distribution of angles we reconstruct the force law, and from the force law we deduce the structure. The entire edifice of nuclear and particle physics rests on this inversion.",
      "The monotonic relation between impact parameter and scattering angle is what makes the inversion possible: each angle corresponds to one impact parameter, so measuring angles tells you about distances you can never resolve directly.",
      "Because the Coulomb force has infinite range, every particle is deflected by at least a little, no matter how wide it passes. There is no clean 'miss'. Real atoms screen the nuclear charge with their electron clouds, which cuts off the tail at large impact parameters and keeps the total cross-section finite.",
      "Gravitational slingshots are the same physics with an attractive force. A spacecraft passing a planet is scattered through an angle set by its impact parameter, and in the Sun's frame it gains or loses energy accordingly.",
    ],
    "Rutherford's analysis of alpha-particle deflection in 1911 was the first use of scattering angles to infer sub-atomic structure, and it remains the template for every collider experiment since.",
    [
      "Cross-section, the next topic, converts these angles into measurable rates.",
      "Rutherford scattering is the fully worked Coulomb case.",
      "Gravitational slingshot manoeuvres use attractive scattering.",
    ],
    "Always state which frame your scattering angle refers to.",
  ),
  "recoil-angle": E(
    "Every scattered particle leaves a recoiling target behind. Track both and you have mapped the whole collision.",
    "Recoil kinematics follow from the velocity-triangle construction, giving φ_L = (π − θ_C)/2 for elastic collisions with a target initially at rest.",
    [
      "The isosceles triangle is the key geometric insight. In the C-frame the target recoils with speed exactly equal to v_cm, so when you add v⃗_cm to return to the laboratory the two vectors have equal length and the triangle is isosceles. The recoil angle is then simply half the exterior angle, which is where the neat formula comes from.",
      "The mass ratio controls everything. A light projectile on a heavy target can be back-scattered through almost 180°, like a ball off a wall. Equal masses always separate at 90°. A heavy projectile on a light target cannot be deflected beyond sin⁻¹(m₂/m₁) — a bowling ball is never sent backwards by a table-tennis ball.",
      "Recoil detection is how modern rare-event experiments work. Dark-matter detectors and neutrino experiments cannot see the incoming particle at all; they measure the tiny energy and direction of the recoiling nucleus and reconstruct the event from that alone.",
    ],
    "The kinematic relations were established in the 1920s and 1930s as nuclear physicists worked out how to interpret cloud-chamber photographs of collisions.",
    [
      "Neutron detection relies on proton recoil in hydrogen-rich materials.",
      "Dark-matter direct-detection experiments measure nuclear recoil.",
      "Snooker and carrom are everyday recoil-angle problems.",
    ],
    "The formula φ_L = (π − θ_C)/2 assumes an elastic collision with the target at rest.",
  ),
  "cross-section": E(
    "Cross-section is the effective size of a target for one particular outcome, measured in area even when nothing physically touches.",
    "The differential cross-section is the constant of proportionality between incident flux and scattering rate per unit solid angle; classically it is obtained by mapping an incident annulus onto a cone of scattering angles.",
    [
      "The concept converts a probability into a picture. If a process has a cross-section of one barn, the target behaves as if it presented that much area to each incoming particle. It is a statement about likelihood expressed in the convenient language of geometry.",
      "Cross-sections depend strongly on energy and on the process you are asking about. The same uranium nucleus has a huge cross-section for capturing slow neutrons and a small one for fast neutrons — which is exactly why reactors use moderators to slow neutrons down before they reach the fuel.",
      "The unit has a joke behind it. During the Manhattan Project, 10⁻²⁸ m² was considered enormous for a nuclear reaction, 'as big as a barn', and the name stuck into permanent scientific usage.",
      "Classically the mapping from impact parameter to angle must be one-to-one for the formula to apply. Where db/dθ vanishes, the cross-section diverges — a rainbow — and where sin θ vanishes it diverges again — a glory. Both are visible in the sky for light scattering from water droplets.",
    ],
    "The formalism was developed alongside Rutherford's work and became the universal language of particle physics; today discovery claims are quoted as cross-sections in femtobarns.",
    [
      "Rutherford scattering supplies the classic analytic cross-section.",
      "Neutron capture cross-sections determine reactor and shielding design.",
      "Collider results are reported as production cross-sections.",
    ],
    "Cross-section measures probability, not physical size, and it changes with energy.",
  ),
  "rutherford-scattering": E(
    "Fire alpha particles at gold foil. Almost all sail through, but a rare few bounce straight back — and that could only mean a tiny, hard, charged core.",
    "Rutherford scattering is the elastic Coulomb scattering of charged particles by a point nucleus, with a differential cross-section proportional to cosec⁴(θ/2) and inversely proportional to the square of the energy.",
    [
      "Rutherford's own account captures the shock: it was, he said, as if you had fired a fifteen-inch shell at a sheet of tissue paper and it had come back and hit you. Thomson's plum-pudding model, with charge spread through the whole atom, could never produce a field strong enough to reverse an alpha particle.",
      "The numbers are what convince. The distance of closest approach for a 5 MeV alpha on gold is about 45 fm, some ten thousand times smaller than the atom but still well outside the nucleus itself. The alpha never touches the nucleus; pure Coulomb repulsion turns it around, which is why the classical calculation works so well.",
      "The cosec⁴ dependence is brutally steep. Scattering at 30° is roughly fifty times more likely than at 90°, and back-scattering beyond 150° is rarer still by orders of magnitude. Geiger and Marsden's patience in counting those rare flashes by eye, in a darkened room, is the real heroism of the experiment.",
      "The formula eventually fails, and the failure is informative. At high enough energy the alpha reaches the nuclear surface, the strong force intervenes, and the measured rate departs from the Coulomb prediction — which is how nuclear radii were first measured.",
      "Remarkably, the quantum mechanical calculation gives exactly the same result for a pure Coulomb potential, a coincidence that reassured physicists during the transition to quantum theory.",
    ],
    "Geiger and Marsden performed the experiment in 1909 at Rutherford's suggestion; Rutherford published the nuclear interpretation in 1911, and Bohr added quantum postulates in 1913 to explain why atoms are stable.",
    [
      "Rutherford backscattering spectrometry analyses thin films industrially.",
      "Ion implantation in semiconductor manufacturing is modelled with these cross-sections.",
      "Deep inelastic scattering later revealed quarks inside the proton by the same logic.",
    ],
    "The model established the nucleus but could not explain atomic stability — that needed quantum theory.",
  ),
  "central-forces": E(
    "If the pull is always straight along the line joining two bodies, the motion is stuck in one flat plane forever, and that makes everything simpler.",
    "A central force exerts no torque about its centre, so angular momentum is conserved in magnitude and direction; the motion is planar and reduces to a one-dimensional radial problem with an effective potential.",
    [
      "Conservation of angular momentum follows in one line: torque is r⃗ cross a force parallel to r⃗, which is zero. That single fact fixes the plane of the motion, gives Kepler's law of equal areas, and reduces a three-dimensional problem to a two-dimensional one before any integration is attempted.",
      "The effective potential is the most useful tool in the subject. Folding the angular kinetic energy into a repulsive centrifugal barrier L²/2μr² converts the problem into a particle sliding in a one-dimensional landscape. The minimum of that landscape is a circular orbit; energies below zero give bounded orbits between turning points; energies above zero give escape.",
      "Bertrand's theorem is a surprising piece of mathematics: out of all possible central force laws, only the inverse-square law and Hooke's linear law produce closed orbits for every bound initial condition. Everything else precesses. That the dominant force in the solar system happens to be one of the two is a deep and fortunate fact.",
      "The tiny departure from a perfect inverse-square law caused by general relativity makes Mercury's perihelion precess by 43 arcseconds per century — a rosette rather than an ellipse, and the first observational triumph of Einstein's theory.",
    ],
    "Newton proved in the Principia that a central force is equivalent to the law of equal areas — his geometric demonstration is one of the most beautiful arguments in the history of physics.",
    [
      "Gravity and the Coulomb force are the two great central forces.",
      "The orbit equation of the next topic solves the general case.",
      "The quantum central-force problem gives the hydrogen atom.",
    ],
    "The centrifugal barrier in the effective potential is a bookkeeping device, not a real force.",
  ),
  "central-orbit-equation": E(
    "Swap distance for its reciprocal and the messy orbit equation turns into the simple equation of a spring. Its solutions are exactly the conic sections.",
    "The Binet equation recasts the radial problem in terms of u = 1/r and the polar angle; for an inverse-square force it becomes a linear inhomogeneous harmonic equation whose solutions are conics with a focus at the force centre.",
    [
      "The substitution u = 1/r looks arbitrary until you see the result: for the inverse-square force the equation becomes d²u/dθ² + u = constant, which is the driven harmonic oscillator equation in disguise. Its solution is a sinusoid in θ, and a sinusoid in 1/r is precisely the polar equation of a conic. Ellipses come from harmonic motion in a disguised variable.",
      "Which conic you get is decided by energy alone. Negative energy gives an ellipse and a bound orbit, exactly zero gives a parabola and marginal escape, and positive energy gives a hyperbola and a fly-past. Comets, spacecraft and scattered alpha particles are the same mathematics at different energies.",
      "The equation also works in reverse. Given an observed orbit, you can deduce the force law that produced it. Newton used essentially this argument to show that Kepler's ellipses require an inverse-square attraction — the founding inference of celestial mechanics.",
      "Any small deviation from 1/r² makes the orbit precess into a rosette. Solar oblateness, other planets, and general relativity all contribute tiny precessions to real planetary orbits, and measuring them is how such effects are detected.",
    ],
    "Binet published the transformation in 1837, though Newton had obtained the equivalent geometric results a century and a half earlier without the machinery of calculus notation.",
    [
      "Kepler's laws, in the next topic, are the special case of bound inverse-square orbits.",
      "Rutherford's hyperbolic trajectories are the repulsive version of the same solution.",
      "Mercury's perihelion precession measures the departure from exact inverse-square behaviour.",
    ],
    "Only a very few force laws give closed orbits; the rest precess.",
  ),
  "kepler-laws": E(
    "Planets travel on ellipses with the Sun at one focus, sweep equal areas in equal times, and the further out they are the disproportionately longer they take.",
    "Kepler's three laws are consequences of an inverse-square central attraction: the first from the conic solution of the orbit equation, the second from conservation of angular momentum, and the third from integrating the areal rate over one period.",
    [
      "Kepler's achievement was extraordinary given his tools. He had no calculus, no telescope of consequence, and no theory of gravity — only Tycho Brahe's naked-eye observations, accurate to about two arcminutes. He spent years on Mars alone, discarded the circle that everyone had assumed for two thousand years, and found the ellipse because the data refused to fit anything else.",
      "The second law is the most general of the three. It requires only that the force be central, not that it be inverse-square, and it is therefore true for any central attraction whatsoever. It is conservation of angular momentum written geometrically.",
      "The third law's constant depends on the total mass, M + m, not just the central mass. For planets around the Sun the planetary mass is negligible and the law looks universal, but for binary stars the difference is exactly what lets astronomers weigh the system. Measure the period and the separation and the total mass falls out.",
      "Every exoplanet mass and orbit published today is derived from these laws applied to stellar wobbles and transit timings — four hundred years on, still the working tool of the field.",
    ],
    "Kepler published the first two laws in Astronomia Nova in 1609 and the third in Harmonices Mundi in 1619; Newton derived all three from universal gravitation in 1687, unifying terrestrial and celestial mechanics.",
    [
      "Geostationary orbit altitude is computed directly from the third law.",
      "Binary star and exoplanet masses come from the third law.",
      "The second law is conservation of angular momentum from the previous topics.",
    ],
    "The Sun sits at a focus, not the centre, and the third law uses the semi-major axis.",
  ),
  "artificial-satellites": E(
    "A satellite is falling all the time. It just moves sideways so fast that the ground curves away exactly as quickly as it falls.",
    "Orbital motion is free fall with sufficient transverse velocity; circular orbit parameters follow from equating gravitational and centripetal requirements, with total energy −GMm/2r characterising the bound state.",
    [
      "Newton's cannonball remains the best explanation ever given. Fire a cannon horizontally from a mountain and the ball lands some distance away. Fire it faster and it lands further. Fire it fast enough and the Earth's surface curves away as quickly as the ball falls, so it never lands at all. Orbit is not the absence of gravity; it is permanent falling.",
      "The virial relationship is worth committing to memory: for a circular orbit the kinetic energy is exactly half the magnitude of the potential energy, and the total energy is negative and equal to half the potential. It provides an instant check on any orbital calculation.",
      "Raising an orbit produces the famous paradox. You fire the engine, adding energy, and end up in a higher orbit moving more slowly than before. Energy went up; speed went down. The extra energy went into potential, and more than paid for the kinetic loss. Docking manoeuvres in orbit are counter-intuitive for exactly this reason: to catch something ahead of you, you must slow down and drop to a lower, faster orbit.",
      "Weightlessness in orbit is free fall, not absent gravity. At the altitude of the International Space Station gravity is still about 89 % of its surface value; astronauts float because they and the station fall together.",
      "Different missions need different orbits. Geostationary at 35 800 km for continuous coverage of one region, sun-synchronous polar orbits for imaging at consistent lighting, medium orbits at about 20 200 km for navigation constellations, and low orbits for high-resolution observation at the cost of periodic reboosting against atmospheric drag.",
    ],
    "Newton published the cannonball thought experiment in 1687; Sputnik turned it into engineering in 1957, and Clarke had proposed geostationary communication satellites in 1945.",
    [
      "Kepler's third law gives the geostationary radius.",
      "Escape velocity marks the boundary between bound and unbound trajectories.",
      "Orbital decay from drag and the Kessler debris problem are practical consequences.",
    ],
    "Higher orbits are slower, and adding energy makes a satellite move more slowly, not faster.",
  ),
  "velocities-c-l-frames": E(
    "Subtract the centre-of-mass velocity to make things simple, solve there, then add it back to get what your detector actually sees.",
    "Velocity transformation between laboratory and centre-of-mass descriptions is a Galilean shift; the velocity-triangle construction yields all laboratory observables from the single C-frame scattering angle.",
    [
      "The whole technique is two arithmetic operations wrapped around one easy physics step. Subtract v⃗_cm, rotate through θ_C because that is all an elastic collision does in that frame, then add v⃗_cm back. Every complicated laboratory formula in this chapter is that sequence written out in full.",
      "The velocity triangle is the picture worth drawing every time. A circle of radius u₁ᶜ centred on the tip of v⃗_cm contains every possible outcome. Whether the circle encloses the origin decides at a glance whether backward scattering is possible, and the geometry immediately gives the maximum angle when it does not.",
      "Always finish by checking momentum conservation in the laboratory frame. It costs one line of arithmetic and catches almost every sign error, and examiners award the check as much as the answer.",
    ],
    "These transformations were codified in the 1930s as nuclear physicists standardised the interpretation of scattering data, and they remain the first chapter of every nuclear physics course.",
    [
      "All the collision and scattering topics in this chapter rest on this transformation.",
      "Detector data are recorded in the laboratory frame while theory is computed in the C-frame.",
      "Relativistic kinematics replaces the Galilean shift with a Lorentz boost at high energy.",
    ],
    "Never leave your answer in the C-frame — transform back to where the detector lives.",
  ),
};

export const getExpansion = (id: string): Expansion | undefined => EXPANSIONS[id];
