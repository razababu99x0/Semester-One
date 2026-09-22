import { calculus } from "./chapters/calculus";
import { vectors } from "./chapters/vectors";
import { dynamics } from "./chapters/dynamics";
import { central } from "./chapters/central";
import type { Chapter, Topic } from "@/types/content";

// Original, topic-specific learning extensions shared by reader, search and export.
const LESSON_EXTENSIONS: Record<string, { explanation: string; example: Topic['examples'][number]; error: string; practice: Topic['examples'][number] }> = {
  "meaning-differentiation": {
    "explanation": "The derivative compares a small output change with the input change that caused it. The limit is essential: an average rate over a long interval can hide a changing instantaneous rate. A position derivative has units of velocity; differentiating velocity gives acceleration.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For position x(t)=2t³−3t metres, find velocity and acceleration at t=2 s.",
      "steps": [
        "Differentiate once: v(t)=6t²−3.",
        "Differentiate again: a(t)=12t.",
        "Substitute t=2 into each expression."
      ],
      "answer": "v=21 m/s and a=24 m/s²."
    },
    "error": "A negative velocity means motion in the negative coordinate direction, not necessarily slowing down.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If x(t)=5t² m, what is v at 3 s?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "v=10t, so v(3)=30 m/s."
    }
  },
  "geometrical-derivative": {
    "explanation": "A secant joins two points on a curve; a tangent describes its local direction as those points approach each other. The tangent is a straight-line approximation, so it is most reliable close to the contact point. Equal slopes do not imply equal function values.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Find the tangent to y=x² at x=3.",
      "steps": [
        "The contact point is (3,9).",
        "The derivative is 2x, giving slope 6.",
        "Use point-slope form y−9=6(x−3)."
      ],
      "answer": "y=6x−9."
    },
    "error": "The tangent slope is dy/dx, not y/x unless the relevant line also passes through the origin.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Find the normal slope at this point.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The normal is perpendicular to the tangent, so its slope is −1/6."
    }
  },
  "maxima-minima": {
    "explanation": "An interior differentiable extremum must have zero first derivative, but this condition alone is not sufficient. Check how the derivative changes sign, or use a nonzero second derivative. For an absolute maximum or minimum on a closed interval, compare endpoints as well.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Find the stationary points of f(x)=x³−3x and classify them.",
      "steps": [
        "Set f′=3x²−3=0, obtaining x=−1 and 1.",
        "Evaluate f″=6x.",
        "At −1 the second derivative is negative",
        " at 1 it is positive."
      ],
      "answer": "Local maximum f(−1)=2; local minimum f(1)=−2."
    },
    "error": "When f″=0 the test is inconclusive; it does not prove that there is no extremum.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Does f(x)=x³ have an extremum at zero?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "No. f′=3x² stays nonnegative on both sides; zero is a stationary inflection point."
    }
  },
  "approximation": {
    "explanation": "Linear approximation replaces a smooth curve by its tangent near a convenient reference value. The neglected error is usually of second order in the small change when the second derivative is bounded. Relative error compares absolute error with the size of the quantity.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Estimate √4.04 using a linear approximation about x=4.",
      "steps": [
        "Choose f(x)=√x and Δx=0.04.",
        "Use f(4)=2 and f′(4)=1/4.",
        "Compute f(4)+f′(4)Δx=2+0.01."
      ],
      "answer": "√4.04≈2.01; the true value is slightly smaller because the curve is concave down."
    },
    "error": "A small absolute change is not enough: compare it with the reference scale and inspect curvature.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Estimate the percentage change in sphere volume for a 1% increase in radius.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "V is proportional to r³, so ΔV/V≈3Δr/r=3%; the exact increase is 3.0301%."
    }
  },
  "partial-differentiation": {
    "explanation": "A partial derivative changes one input while all other independent inputs stay fixed. A total differential instead combines several small changes. In thermodynamics, specifying what stays constant is part of the meaning of a derivative, not optional notation.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For f(x,y)=x²y+3y², find both first partial derivatives at (2,1).",
      "steps": [
        "Holding y fixed gives ∂f/∂x=2xy.",
        "Holding x fixed gives ∂f/∂y=x²+6y.",
        "Substitute (2,1)."
      ],
      "answer": "∂f/∂x=4 and ∂f/∂y=10."
    },
    "error": "Do not hold a dependent variable fixed while claiming to calculate change along a constrained path.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If dx=0.01 and dy=0.02 near (2,1), estimate df.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "df≈4dx+10dy=0.24."
    }
  },
  "taylor-series": {
    "explanation": "Taylor expansion records a function's value, slope, curvature and higher local changes at a chosen point. A finite Taylor polynomial is an approximation with a remainder; an infinite Taylor series equals the function only where the series converges to it. A smooth function need not equal its Taylor series everywhere.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Estimate e^0.1 through the quadratic term about zero.",
      "steps": [
        "For e^x, the first three coefficients are 1, 1 and 1/2.",
        "Evaluate 1+0.1+0.1²/2.",
        "The next term is 0.1³/6, indicating the leading neglected scale."
      ],
      "answer": "e^0.1≈1.105; the next term is about 0.0001667."
    },
    "error": "The factorial belongs in the denominator: the quadratic coefficient is f″(a)/2!, not f″(a).",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the cubic Taylor polynomial for sin x about zero?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "x−x³/6, with angles measured in radians."
    }
  },
  "binomial-series": {
    "explanation": "For a general real exponent, expanding (1+x)^n gives an infinite local series. The reliable basic interval is abs(x)<1; endpoints require separate checks. For a nonnegative integer exponent the series terminates and becomes the familiar binomial polynomial.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Estimate (1.02)^(−1) through x².",
      "steps": [
        "Choose n=−1 and x=0.02.",
        "The coefficients give 1−x+x².",
        "Substitute to obtain 1−0.02+0.0004."
      ],
      "answer": "0.9804; the exact value is about 0.980392."
    },
    "error": "Do not use a few small-x terms when abs(x) is large and expect accuracy.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Write the first three terms of √(1+x).",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "1+x/2−x²/8."
    }
  },
  "geometrical-integration": {
    "explanation": "A definite integral adds signed contributions. Regions below the axis subtract from those above it. Therefore displacement is the integral of velocity, while distance travelled is the integral of speed. Splitting at sign changes prevents cancellation when total area or distance is required.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For v(t)=t−2 m/s from t=0 to 4 s, find displacement and distance.",
      "steps": [
        "Integrate v: [t²/2−2t] from 0 to 4 gives zero.",
        "Velocity changes sign at t=2.",
        "Each triangular speed-time region has area 2 m."
      ],
      "answer": "Displacement=0 m; distance=4 m."
    },
    "error": "Zero integral does not imply the integrand was zero throughout the interval.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Find the area under y=2x from x=1 to 3.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The integral is [x²] from 1 to 3=8 square coordinate units."
    }
  },
  "order-degree-de": {
    "explanation": "Order is determined by the highest derivative present. Degree is the power of that highest-order derivative after the equation is expressed as a polynomial in derivatives. An equation with transcendental dependence on a derivative generally has no polynomial degree.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Find order and degree of (y″)²+(y′)³+y=0.",
      "steps": [
        "The highest derivative is y″, so the order is two.",
        "The equation is polynomial in derivatives.",
        "The power of the highest-order derivative is two."
      ],
      "answer": "Order 2; degree 2."
    },
    "error": "The largest exponent anywhere is not necessarily the degree: (y′)³ does not override the power of y″.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What are the order and degree of sin(y′)+y=0?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Order 1; degree is not defined as a polynomial degree."
    }
  },
  "first-order-homogeneous": {
    "explanation": "For y′=F(y/x), the ratio y/x is the useful new variable. Set y=vx so differentiation produces v+xv′. This meaning of homogeneous differs from a linear homogeneous equation with zero forcing. The substitution is used on intervals where x is nonzero.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve y′=1+y/x for x>0.",
      "steps": [
        "Set y=vx, so y′=v+xv′.",
        "Cancel v to obtain xv′=1.",
        "Integrate v=ln x+C, then replace v with y/x."
      ],
      "answer": "y=x ln x+Cx."
    },
    "error": "Replacing y′ with v′ loses the product-rule term and changes the equation.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If y′=y/x and x>0, what family of solutions results?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "y=Cx: substitution gives xv′=0, so v is constant."
    }
  },
  "first-order-nonhomogeneous": {
    "explanation": "A linear first-order equation y′+P(x)y=Q(x) has an input or forcing term Q. Its general solution combines a solution of the unforced problem with one response to the forcing. An initial condition fixes the remaining constant.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve y′+2y=6 with y(0)=1.",
      "steps": [
        "A constant particular solution satisfies 2y=6, so y_p=3.",
        "The homogeneous solution is Ce^(−2x).",
        "Use 1=3+C to get C=−2."
      ],
      "answer": "y=3−2e^(−2x)."
    },
    "error": "A nonzero forcing term does not mean the equation is nonlinear; powers and products of y and its derivatives determine linearity.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What value does this solution approach as x increases?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It approaches 3 because e^(−2x) tends to zero."
    }
  },
  "integrating-factor": {
    "explanation": "The integrating factor works by converting the left side into a product derivative. Divide by the coefficient of y′ before identifying P. Multiplying the whole equation by the factor is essential; changing only the left side would change its solutions.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve y′+y/x=x for x>0.",
      "steps": [
        "P=1/x, so the integrating factor is exp(ln x)=x.",
        "Multiply by x to get (xy)′=x².",
        "Integrate xy=x³/3+C and divide by x."
      ],
      "answer": "y=x²/3+C/x."
    },
    "error": "The constant multiplying an integrating factor can be omitted, but the integration constant in the solution cannot.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Find the integrating factor for y′−3y=x.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "e^(−3x)."
    }
  },
  "exact-inexact": {
    "explanation": "An exact differential M dx+N dy=dF describes changes in a state function F. Equality of mixed partial derivatives gives the local test M_y=N_x for smooth functions. Global conclusions also depend on the domain; holes can prevent a single-valued global potential.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve 2xy dx+x² dy=0.",
      "steps": [
        "M_y=2x and N_x=2x, so the equation is exact.",
        "Integrate M with respect to x: F=x²y+g(y).",
        "Match F_y=x²+g′(y) to N=x², giving g′=0."
      ],
      "answer": "x²y=C."
    },
    "error": "When integrating M with respect to x, the integration term may depend on y; do not prematurely replace it by a number.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Is y dx+2x dy exact?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "No: M_y=1 but N_x=2."
    }
  },
  "d-operator": {
    "explanation": "Writing D=d/dx is shorthand for a linear differential operator. For constant-coefficient equations, exponentials are useful because applying D to e^(mx) simply multiplies it by m. Inverse-operator notation must still respect homogeneous terms and resonance.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve (D²−3D+2)y=0.",
      "steps": [
        "Replace D by m to form m²−3m+2=0.",
        "Factor it as (m−1)(m−2)=0.",
        "Associate each distinct root with an exponential."
      ],
      "answer": "y=C₁e^x+C₂e^(2x)."
    },
    "error": "Operator algebra with variable coefficients is not ordinary commutative algebra: D(xy)=xDy+y.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What extra factor appears for a repeated root m=a?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The independent second solution is xe^(ax), giving (C₁+C₂x)e^(ax)."
    }
  },
  "second-order-de": {
    "explanation": "Two independent initial conditions normally determine a second-order solution. For an oscillator, displacement and velocity specify amplitude and phase. Natural frequency comes from the restoring term; forcing and damping can change the response without changing the order of the equation.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Solve y″+4y=0 with y(0)=3 and y′(0)=0.",
      "steps": [
        "The characteristic roots are ±2i.",
        "Write y=A cos 2t+B sin 2t.",
        "Use y(0)=A=3 and y′(0)=2B=0."
      ],
      "answer": "y=3 cos 2t; angular frequency is 2 rad/s if t is in seconds."
    },
    "error": "Frequency in cycles per second is ω/(2π), not ω.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the period of this motion?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "T=2π/2=π seconds."
    }
  },
  "scalars-vectors": {
    "explanation": "A vector combines magnitude with direction and obeys vector addition. Components depend on the coordinate axes, but its physical magnitude does not. Negative components simply indicate orientation opposite a chosen positive axis.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A displacement is 6 m east and 8 m north. Find its magnitude and unit vector.",
      "steps": [
        "Write r=6i+8j metres.",
        "Compute abs(r)=√(36+64)=10 m.",
        "Divide each component by 10."
      ],
      "answer": "Magnitude 10 m; direction unit vector 0.6i+0.8j."
    },
    "error": "Adding component magnitudes gives path length along two legs, not resultant displacement.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What displacement reverses this motion?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "−6i−8j metres; its magnitude remains 10 m."
    }
  },
  "scalar-vector-fields": {
    "explanation": "A field assigns a quantity to each position and possibly time. Uniform describes spatial constancy; steady describes time independence. A steady flow can accelerate a moving particle because that particle samples different positions.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For velocity v=(2x,−y,0) s⁻¹ times position, evaluate v at (1,2,0) m.",
      "steps": [
        "Substitute x=1 m and y=2 m.",
        "Obtain v=(2,−2,0) m/s.",
        "There is no explicit time dependence, but the values depend on position."
      ],
      "answer": "The field is steady and nonuniform; speed at that point is 2√2 m/s."
    },
    "error": "Steady does not mean that every particle has constant velocity.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Is T(x,y,t)=20+t spatially uniform and steady?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It is spatially uniform, but not steady because it changes with time."
    }
  },
  "triple-products": {
    "explanation": "The scalar triple product measures oriented volume and vanishes for coplanar vectors. The vector triple product is a vector lying in the plane of its inner two vectors. Parentheses are essential because the cross product is not associative.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Find A·(B×C) for A=(1,0,0), B=(0,2,0), C=(0,0,3).",
      "steps": [
        "Compute B×C=(6,0,0).",
        "Dot with A to obtain 6.",
        "Reversing B and C reverses orientation."
      ],
      "answer": "Signed volume 6; geometrical volume 6 cubic coordinate units."
    },
    "error": "Use the absolute value for ordinary volume; a negative determinant indicates orientation, not negative space.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is A×(B×A) when A and B are perpendicular unit vectors?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "B, from B(A·A)−A(A·B)."
    }
  },
  "gradient": {
    "explanation": "The gradient points toward the fastest local increase of a scalar field. Its magnitude is that maximum rate per unit distance. The derivative along another unit direction is the projection of the gradient onto that direction. On a level surface, tangent directions have zero directional derivative.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For φ=x²+3y², find the gradient at (1,2) and the derivative in the +x direction.",
      "steps": [
        "Compute ∇φ=(2x,6y).",
        "At (1,2), this is (2,12).",
        "Dot with the unit direction (1,0)."
      ],
      "answer": "Gradient (2,12); directional derivative along +x is 2."
    },
    "error": "Normalize a direction vector before taking its dot product with the gradient.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the maximum directional derivative here?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The gradient magnitude √148=2√37."
    }
  },
  "divergence": {
    "explanation": "Divergence measures net outward flux per unit volume in the limit of a tiny closed region. Positive divergence means local outflow exceeds inflow. A vector field can be nonzero while having zero divergence, because through-flow need not create local accumulation.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For F=(x²,yz,3z), find ∇·F at (2,1,4).",
      "steps": [
        "Differentiate the x component with respect to x: 2x.",
        "Differentiate yz with respect to y: z, and 3z with respect to z: 3.",
        "Add and substitute: 4+4+3."
      ],
      "answer": "Divergence is 11 in the corresponding field-per-length units."
    },
    "error": "Divergence is a scalar; it is not the sum of the vector components.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the divergence of a constant vector field?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero, because every spatial derivative is zero."
    }
  },
  "curl": {
    "explanation": "Curl describes local circulation density with an axis given by the right-hand rule. For rigid rotation, curl of the velocity equals twice the angular velocity. Curving streamlines alone do not prove nonzero curl; local shear and rotation must be evaluated.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For v=(−2y,2x,0), calculate ∇×v.",
      "steps": [
        "The x and y curl components vanish.",
        "The z component is ∂v_y/∂x−∂v_x/∂y=2−(−2).",
        "The result points along +z."
      ],
      "answer": "Curl=(0,0,4) s⁻¹; rigid angular velocity is 2 rad/s."
    },
    "error": "Do not confuse curl with angular velocity; rigid-body curl has an extra factor of two.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is ∇×∇φ for a twice continuously differentiable scalar φ?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero, by equality of mixed partial derivatives."
    }
  },
  "physical-meaning-operators": {
    "explanation": "Gradient starts with a scalar and returns a vector. Divergence starts with a vector and returns a scalar. Curl starts with a vector and returns a vector. Each spatial derivative contributes one inverse-length factor to the units, helping detect incorrect equations.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "If temperature T is measured in kelvin and position in metres, identify the units of ∇T and ∇²T.",
      "steps": [
        "A first spatial derivative divides temperature change by distance.",
        "A second spatial derivative adds another inverse metre.",
        "The Laplacian is divergence of the gradient."
      ],
      "answer": "∇T: K/m; ∇²T: K/m²."
    },
    "error": "The symbol ∇ is an operator, not an ordinary numerical vector that can be moved through variable fields freely.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Which operator measures local sources in a velocity field?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Divergence; curl instead measures local circulation."
    }
  },
  "continuity-equation": {
    "explanation": "Mass conservation balances accumulation inside a region against outward mass flow through its boundary. For constant density, the local equation reduces to zero velocity divergence. For steady flow through a tube, density times area times mean speed is conserved if there are no leaks.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Water flows at 2 m/s through area 6 cm² into area 3 cm². Find the second speed.",
      "steps": [
        "Assume steady incompressible flow.",
        "Apply A₁v₁=A₂v₂.",
        "Use the area ratio 6/3=2."
      ],
      "answer": "v₂=4 m/s."
    },
    "error": "Equal volume flow is not generally valid for compressible flow; conserve mass flow ρAv instead.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If density halves while area stays constant in steady flow, how does speed change?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It doubles to keep ρAv constant."
    }
  },
  "euler-equation": {
    "explanation": "Euler's fluid equation applies Newton's second law to inviscid flow. The material acceleration contains both local time change and convective change as fluid moves through a spatially varying field. A steady nozzle flow can therefore have nonzero acceleration.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For steady one-dimensional flow v(x)=ax, find material acceleration.",
      "steps": [
        "The explicit time derivative is zero.",
        "Use convective acceleration v dv/dx.",
        "Since dv/dx=a, multiply ax by a."
      ],
      "answer": "Acceleration a²x, where a has units s⁻¹."
    },
    "error": "Setting ∂v/∂t=0 does not justify setting the full fluid acceleration to zero.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "For a fluid at rest in vertical gravity, what pressure relation follows?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "dp/dz=−ρg when z increases upward."
    }
  },
  "bernoulli": {
    "explanation": "Bernoulli's relation trades pressure energy, kinetic energy and gravitational potential energy along a streamline. Its basic form assumes steady, incompressible, inviscid flow without a pump or turbine between the points. Viscous losses require additional terms.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Water in a horizontal pipe speeds up from 2 to 4 m/s. Find the pressure change, using ρ=1000 kg/m³.",
      "steps": [
        "Height terms cancel.",
        "Use p₂−p₁=½ρ(v₁²−v₂²).",
        "Substitute 500(4−16)."
      ],
      "answer": "Pressure falls by 6000 Pa."
    },
    "error": "Low pressure is not a universal consequence of high speed unless the appropriate Bernoulli assumptions and comparison points apply.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If speed stays unchanged while height rises 1 m, how does pressure change?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It falls by ρg×1≈9810 Pa for water under these assumptions."
    }
  },
  "fourier-heat": {
    "explanation": "Fourier's law makes heat flow proportional to the negative temperature gradient. The minus sign means heat flows toward lower temperature. Conductivity describes the material; thermal diffusivity also includes density and heat capacity and controls how quickly temperature patterns spread.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A wall has conductivity 0.5 W/(m K), area 2 m², thickness 0.1 m and temperature difference 20 K. Find steady heat transfer rate.",
      "steps": [
        "Assume one-dimensional conduction with constant conductivity.",
        "Use rate kAΔT/L.",
        "Compute 0.5×2×20/0.1."
      ],
      "answer": "200 W, from hot to cold."
    },
    "error": "Heat transfer rate in watts is different from heat flux in W/m².",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What happens to the rate if thickness doubles?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It halves to 100 W with other quantities fixed."
    }
  },
  "poisson-laplace": {
    "explanation": "Poisson's equation relates spatial curvature of a potential to its source density. In a source-free region it becomes Laplace's equation. Zero Laplacian does not require zero potential or zero field: boundary conditions can sustain a nonuniform potential without local charge.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For electrostatic potential V=ax², find charge density in vacuum.",
      "steps": [
        "The only nonzero second derivative is ∂²V/∂x²=2a.",
        "Use ∇²V=−ρ/ε₀.",
        "Rearrange for ρ."
      ],
      "answer": "ρ=−2ε₀a."
    },
    "error": "The electrostatic sign depends on E=−∇V; do not copy a gravitational-potential equation without checking conventions.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Does V=3x solve Laplace's equation?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Yes. All second derivatives vanish although E=−3i is nonzero in compatible units."
    }
  },
  "gauss-law": {
    "explanation": "Gauss's law relates total electric flux through a closed surface to enclosed charge. It is always valid electrostatically, but extracting E easily needs symmetry. Charges outside the surface can change the field on it while contributing zero net enclosed charge.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A spherical Gaussian surface encloses 2 nC in vacuum. Find its net electric flux using ε₀≈8.85×10⁻¹² F/m.",
      "steps": [
        "Convert charge to 2×10⁻⁹ C.",
        "Use total flux Q/ε₀.",
        "Divide 2×10⁻⁹ by 8.85×10⁻¹²."
      ],
      "answer": "Approximately 226 N m²/C."
    },
    "error": "Zero enclosed charge means zero net flux, not necessarily zero electric field everywhere on the surface.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Would doubling the sphere radius change total flux for the same enclosed charge?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "No; field strength and area compensate for a centered point charge."
    }
  },
  "dot-cross-products": {
    "explanation": "The dot product selects the parallel part of one vector relative to another and appears in work. The cross product measures an oriented perpendicular area and appears in torque. Dot products commute; reversing a cross product changes its sign.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A 10 N force acts at 60° to a 3 m displacement. Find work.",
      "steps": [
        "Use W=Fs cos θ.",
        "Substitute 10×3×cos60°.",
        "Use cos60°=1/2."
      ],
      "answer": "15 J."
    },
    "error": "Torque uses the angle between position and force, and a sine; work uses displacement and force, and a cosine.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the torque magnitude for a 3 m lever and 10 N force at 90°?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "30 N m; torque has the same dimensions as energy but is a different physical quantity."
    }
  },
  "frame-of-reference": {
    "explanation": "Coordinates only become a motion description after an observer, axes and clock are specified. Position and velocity may differ between observers while a consistent transformation preserves the physical event. Always state the positive direction before attaching signs.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A train moves east at 20 m/s. A passenger walks west at 2 m/s relative to it. Find ground velocity.",
      "steps": [
        "Choose east as positive.",
        "Add train velocity and passenger velocity relative to the train.",
        "Compute 20+(−2)."
      ],
      "answer": "18 m/s east."
    },
    "error": "Relative speed is not always found by adding magnitudes; use signed components.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If the passenger walks east at 2 m/s, what is ground velocity?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "22 m/s east."
    }
  },
  "inertial-frame": {
    "explanation": "An inertial frame is one in which a force-free particle has constant velocity. Frames moving at constant velocity relative to an inertial frame are also inertial. The absence of acceleration, rather than the absence of velocity, is the deciding condition.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Observers differ by constant velocity V=5 m/s along x. Transform x(t)=3t².",
      "steps": [
        "Use x′=x−Vt.",
        "Differentiate to get v′=6t−5.",
        "Differentiate again to get a′=6."
      ],
      "answer": "Both observers measure acceleration 6 m/s²."
    },
    "error": "A moving frame can be inertial; a rotating frame generally is not.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If the original observer measures zero net force, what does the other inertial observer predict?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero acceleration and constant velocity as well."
    }
  },
  "non-inertial-frame": {
    "explanation": "An accelerating coordinate system introduces inertial terms into Newton's law. For pure translation with frame acceleration A, the added force is −mA. This is a correction for the chosen coordinates, not a new interaction with another object.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A 2 kg mass rests on a scale in a lift accelerating upward at 1 m/s². Find the scale reading for g=9.8 m/s².",
      "steps": [
        "In the ground frame, N−mg=ma.",
        "Rearrange N=m(g+a).",
        "Substitute 2(9.8+1)."
      ],
      "answer": "21.6 N."
    },
    "error": "The scale measures normal force, not mass directly or gravitational force in every circumstance.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the reading during ideal free fall?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero, because lift and mass accelerate downward together."
    }
  },
  "rotating-frame": {
    "explanation": "A rotating frame changes the direction of its axes with time. Its acceleration transformation contains centrifugal, Coriolis and, when angular speed changes, Euler terms. A point fixed to a rotating platform still accelerates in an inertial frame.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A point fixed 0.5 m from an axis rotates uniformly at 4 rad/s. Find its inertial acceleration.",
      "steps": [
        "It has no relative velocity in the rotating frame.",
        "Use centripetal magnitude ω²r.",
        "Compute 16×0.5."
      ],
      "answer": "8 m/s² toward the axis."
    },
    "error": "Zero acceleration relative to rotating coordinates does not mean zero inertial acceleration.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Which extra inertial term appears if angular velocity changes?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The Euler term −m(dΩ/dt)×r."
    }
  },
  "centrifugal-force": {
    "explanation": "Centrifugal force points away from the rotation axis in rotating coordinates. Its magnitude uses perpendicular distance from that axis, not necessarily distance from the coordinate origin. In an inertial frame the required inward acceleration is supplied by real forces.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Find centrifugal-force magnitude for a 0.2 kg mass at radius 0.5 m in a frame rotating at 3 rad/s.",
      "steps": [
        "Use F=mω²r.",
        "Square angular speed first.",
        "Compute 0.2×9×0.5."
      ],
      "answer": "0.9 N outward in the rotating frame."
    },
    "error": "Do not add centrifugal force to an inertial-frame free-body diagram while also applying ordinary centripetal acceleration.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What happens if angular speed doubles?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The magnitude becomes four times larger, 3.6 N."
    }
  },
  "coriolis-force": {
    "explanation": "Coriolis force depends on motion relative to a rotating frame. It is perpendicular to that relative velocity, so its instantaneous power F·v is zero. Its direction follows a cross product and changes if the velocity or rotation reverses.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A 1 kg object moves at 3 m/s perpendicular to an axis rotating at 2 rad/s. Find Coriolis magnitude.",
      "steps": [
        "Use 2mΩv sin θ.",
        "Here θ=90°, so sin θ=1.",
        "Compute 2×1×2×3."
      ],
      "answer": "12 N; direction is −Ω×v, using the right-hand rule then reversing."
    },
    "error": "An object stationary in the rotating frame has no Coriolis term, though it can have a centrifugal term.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What if relative velocity is parallel to Ω?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The Coriolis force is zero."
    }
  },
  "centrifugal-effect-on-g": {
    "explanation": "Earth's rotation reduces effective gravity most strongly near the equator. The centrifugal acceleration points away from Earth's axis; only its radial projection directly opposes radial gravity. The spherical-Earth approximation separates this effect from Earth's actual flattening.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Estimate the equatorial rotational reduction using Ω=7.29×10⁻⁵ s⁻¹ and R=6.37×10⁶ m.",
      "steps": [
        "At the equator the perpendicular radius is R.",
        "Compute Ω²R.",
        "Evaluate about 5.31×10⁻⁹×6.37×10⁶."
      ],
      "answer": "Approximately 0.0339 m/s²."
    },
    "error": "Latitude variation also includes Earth's shape and mass distribution; rotation alone is not the full measured difference.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "In the spherical approximation, what is the radial reduction at latitude 60°?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Ω²R cos²60°≈0.0085 m/s²."
    }
  },
  "freely-falling-bodies": {
    "explanation": "In ideal free fall all nearby objects share approximately the same gravitational acceleration, regardless of mass. Local apparent weightlessness follows from this shared motion. Over large distances tidal differences matter, and over long falls air resistance and Earth's rotation become relevant.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "An object is released from rest at 20 m height. Neglect air resistance and use g=10 m/s². Find fall time and impact speed.",
      "steps": [
        "Use h=½gt², giving t²=4.",
        "Take the positive root t=2 s.",
        "Use v=gt."
      ],
      "answer": "Time 2 s; speed 20 m/s downward."
    },
    "error": "Mass cancels in the ideal model; air resistance can make real fall times depend on size and shape.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Would initial horizontal speed change this fall time in a uniform gravitational field?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "No, if vertical initial velocity stays zero and air resistance is neglected."
    }
  },
  "geophysical-effects": {
    "explanation": "For large-scale horizontal motion, Earth's vertical rotation component gives the Coriolis parameter f=2Ω sin latitude. The Rossby number U/(abs(f)L) compares inertial acceleration with Coriolis effects. Small-scale household flows are usually dominated by geometry and initial disturbances.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "At latitude 30°, find f for Ω=7.29×10⁻⁵ s⁻¹.",
      "steps": [
        "Use sin30°=1/2.",
        "Substitute f=2Ω×1/2.",
        "Retain the sign for the northern hemisphere."
      ],
      "answer": "f=7.29×10⁻⁵ s⁻¹."
    },
    "error": "Coriolis does not reliably determine the swirl of every sink or bathtub.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is f at the equator in this horizontal approximation?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero, because sin0°=0; other rotation effects need not vanish."
    }
  },
  "foucault-pendulum": {
    "explanation": "A Foucault pendulum's oscillation plane turns relative to Earth because the local ground axes rotate. The ideal precession rate is Earth's rotation rate times sine of latitude. The simple result assumes small oscillations and minimal unwanted torque or damping asymmetry.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Estimate the precession period at latitude 30° using a sidereal day of 23.93 h.",
      "steps": [
        "The magnitude is Ω sin30°=Ω/2.",
        "Period is inversely proportional to precession rate.",
        "Divide 23.93 h by 1/2."
      ],
      "answer": "About 47.86 h."
    },
    "error": "At the equator the ideal precession rate vanishes; this does not imply an infinitely fast turn.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the ideal period at a pole?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "One sidereal day, about 23.93 h."
    }
  },
  "proof-earth-rotation": {
    "explanation": "A strong explanation of Earth's rotation connects an observation to a quantitative prediction and rules out alternative local causes. Pendulum precession, large-scale Coriolis effects and gyroscopic measurements are independent evidence. A single uncontrolled observation is weaker than a repeatable latitude-dependent pattern.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Compare ideal Foucault precession rates at 30° and 90° latitude.",
      "steps": [
        "Use rate magnitude Ωabs(sin latitude).",
        "At 30° it is Ω/2",
        " at 90° it is Ω.",
        "Take the ratio."
      ],
      "answer": "The polar rate is twice the 30° rate."
    },
    "error": "A pendulum needs careful suspension and damping control; random twisting alone is not the predicted evidence.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "How does the sense of ideal precession change between equal northern and southern latitudes?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It reverses because sin latitude changes sign."
    }
  },
  "lab-frame": {
    "explanation": "The laboratory frame is usually chosen so the target is initially at rest. It is convenient for detectors, but total momentum generally is not zero. Lab and centre-of-mass descriptions refer to the same collision and must use the same masses and transformation velocity.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A 2 kg projectile moves at 6 m/s toward a stationary 1 kg target. Find initial total momentum and centre-of-mass speed.",
      "steps": [
        "Total momentum is 2×6+1×0.",
        "Total mass is 3 kg.",
        "Divide momentum by total mass."
      ],
      "answer": "Momentum 12 kg m/s; V_cm=4 m/s."
    },
    "error": "The laboratory frame is not automatically the centre-of-mass frame.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the stationary target's initial velocity in the CM frame?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "0−4=−4 m/s."
    }
  },
  "cm-frame": {
    "explanation": "Subtracting centre-of-mass velocity from each particle velocity makes total momentum vanish. This removes the overall translation and isolates relative motion. Kinetic energy in the CM frame is less than the lab kinetic energy by the energy of collective translation.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For masses 2 kg and 1 kg with lab velocities 6 and 0 m/s, calculate CM kinetic energy.",
      "steps": [
        "V_cm=4 m/s.",
        "CM velocities are 2 and −4 m/s.",
        "Compute ½×2×2²+½×1×4²."
      ],
      "answer": "12 J; lab energy is 36 J and translational CM energy is 24 J."
    },
    "error": "Zero total momentum does not mean zero kinetic energy; opposite momenta can carry substantial energy.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "For equal masses with velocities +3 and −3 m/s, what is V_cm?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero."
    }
  },
  "centre-of-mass": {
    "explanation": "The centre of mass is a mass-weighted position, so heavier parts influence its location more strongly. It may lie outside material, as for a ring. Internal forces can rearrange the system but cannot accelerate its centre of mass without a net external force.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Place 1 kg at x=0 m and 3 kg at x=4 m. Find x_cm.",
      "steps": [
        "Multiply each position by its mass.",
        "Add to obtain 12 kg m.",
        "Divide by total mass 4 kg."
      ],
      "answer": "x_cm=3 m."
    },
    "error": "The midpoint works only when the mass distribution has the required symmetry.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "If the net external force is 8 N on this system, what is CM acceleration?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "8/4=2 m/s²."
    }
  },
  "two-dimensional-collision": {
    "explanation": "Momentum conservation is a vector statement, so a planar collision needs separate x and y equations. Kinetic energy adds another constraint only when the collision is elastic. Draw directions first; apparent missing momentum often comes from ignoring one component.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A 1 kg particle moving at (4,0) m/s hits an equal stationary particle. It leaves at (2,2) m/s. Find the second velocity and test elasticity.",
      "steps": [
        "Initial momentum is (4,0) kg m/s.",
        "Subtract the first final momentum to obtain the second: (2,−2).",
        "Initial energy is 8 J",
        " each final particle has energy 4 J."
      ],
      "answer": "Second velocity (2,−2) m/s; this outcome is elastic."
    },
    "error": "Momentum conservation alone does not establish kinetic-energy conservation.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the angle between the final velocities in this example?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "90°, since their dot product is 4−4=0."
    }
  },
  "scattering-angle": {
    "explanation": "Scattering angle compares incoming and outgoing directions in a specified frame. It depends on interaction strength, incident energy and impact parameter. In repulsive Coulomb scattering, larger impact parameter generally produces smaller deflection.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For tan(θ/2)=a/b with positive a, find θ when b=a.",
      "steps": [
        "Substitute b=a to obtain tan(θ/2)=1.",
        "For scattering angles between 0 and π, θ/2=45°.",
        "Double the half-angle."
      ],
      "answer": "θ=90° in the frame used by the formula."
    },
    "error": "Do not confuse the half-angle in the tangent relation with the full scattering angle.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What happens to θ as b becomes very large?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It tends toward zero."
    }
  },
  "recoil-angle": {
    "explanation": "In elastic scattering from a target initially at rest, recoil direction follows momentum conservation after transforming back from the CM frame. The recoil-angle relation uses the projectile's CM scattering angle, not its lab scattering angle. At zero recoil speed a direction is not defined.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "For a nontrivial elastic event with projectile CM scattering angle 60°, find target recoil angle in the lab.",
      "steps": [
        "Use φ=(180°−θ_cm)/2.",
        "Substitute θ_cm=60°.",
        "Compute 120°/2."
      ],
      "answer": "φ=60°."
    },
    "error": "Using the projectile laboratory angle in this formula generally gives the wrong answer for unequal masses.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What recoil angle follows for θ_cm=120°?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "30°."
    }
  },
  "cross-section": {
    "explanation": "A cross-section represents an effective interaction area, not necessarily a geometrical target size. Differential cross-section resolves scattering by direction and has units of area per solid angle. Measured counts also depend on flux, target number, detector acceptance and efficiency.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A thin target contains 10¹² scattering centres. Incident flux is 10¹⁰ m⁻²s⁻¹ and a process has cross-section 10⁻²⁴ m². Find the ideal event rate.",
      "steps": [
        "Use rate=flux×number of targets×cross-section.",
        "Multiply powers: 10¹⁰×10¹²×10⁻²⁴.",
        "Assume negligible attenuation and count the whole specified process."
      ],
      "answer": "0.01 events/s."
    },
    "error": "A differential cross-section must be integrated over detector solid angle before use as a total cross-section.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "How does the rate change if incident flux doubles?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "It doubles in the thin-target regime."
    }
  },
  "rutherford-scattering": {
    "explanation": "The Rutherford model describes elastic scattering by a Coulomb field under suitable energy and size conditions. Its angular distribution is sharply weighted toward small angles. Finite nuclear size, screening and non-Coulomb interactions limit the ideal formula.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "At a fixed angle, how does the predicted differential cross-section change when incident energy doubles?",
      "steps": [
        "For fixed charges and angle, the dependence is proportional to 1/E².",
        "Replace E by 2E.",
        "The ratio is 1/2²."
      ],
      "answer": "It becomes one quarter of its original value."
    },
    "error": "Do not treat the formula as valid at arbitrarily small angles without considering screening, or at arbitrarily high energies without nuclear effects.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "At fixed energy, what happens when target nuclear charge doubles in this ideal model?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "The cross-section increases by a factor of four."
    }
  },
  "central-forces": {
    "explanation": "A force directed along the radius has zero torque about its centre. Angular momentum is consequently conserved, confining nonradial motion to a plane. If the magnitude depends only on radius, a potential can describe the radial force and energy is conserved when the potential is time independent.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A particle moves under an inward radial force. If its radius halves, how does its transverse speed change for nonzero conserved angular momentum?",
      "steps": [
        "Use L=mr v_transverse.",
        "Mass and L stay constant.",
        "Halving r requires doubling v_transverse."
      ],
      "answer": "The transverse speed doubles."
    },
    "error": "Total speed can include radial motion; angular momentum directly constrains only the transverse component.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the torque of any purely radial force about its centre?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Zero, because r×F=0."
    }
  },
  "central-orbit-equation": {
    "explanation": "Using u=1/r and angular position as the independent variable converts the radial equation into Binet's equation. For inverse-square attraction its solution is a conic. The classification by energy assumes the potential zero is chosen at infinity and the force is the stated inverse-square law.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "An orbit has r=p/(1+e cos θ) with p=6 and e=0.5. Find nearest and farthest radii.",
      "steps": [
        "The denominator is largest at cos θ=1.",
        "Thus r_min=6/1.5.",
        "It is smallest at cos θ=−1, giving r_max=6/0.5."
      ],
      "answer": "Nearest radius 4; farthest radius 12, in the units of p."
    },
    "error": "The parameter p is the semi-latus rectum, not the semi-major axis.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is the semi-major axis for this ellipse?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "a=(4+12)/2=8; equivalently p/(1−e²)=8."
    }
  },
  "kepler-laws": {
    "explanation": "Kepler's area law follows from conservation of angular momentum for any central force. Elliptical orbits and the period law specifically follow from inverse-square attraction. The period law uses the semi-major axis, not the planet's changing instantaneous distance.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Two negligible-mass planets orbit the same star with semi-major axes a and 4a. Find their period ratio.",
      "steps": [
        "Use T² proportional to a³.",
        "Take the square root to get T proportional to a^(3/2).",
        "Compute 4^(3/2)."
      ],
      "answer": "The outer period is 8 times the inner period."
    },
    "error": "For an eccentric orbit, substituting perihelion distance for semi-major axis gives an incorrect period.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "When a planet is nearer the star, is its transverse speed greater or smaller?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "Greater, because r v_transverse is constant."
    }
  },
  "artificial-satellites": {
    "explanation": "A satellite remains in orbit through continuous free fall. For a circular orbit, gravity supplies the required centripetal acceleration; no separate outward force is added in the inertial description. Radius is measured from the central body's centre, so altitude must be added to its radius.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "Given GM=4.0×10¹⁴ m³/s² and circular radius r=1.0×10⁷ m, find orbital speed.",
      "steps": [
        "Equate GMm/r² to mv²/r.",
        "Cancel m and solve v=√(GM/r).",
        "Compute √(4.0×10⁷)."
      ],
      "answer": "About 6.32×10³ m/s."
    },
    "error": "Higher circular orbits have lower final circular speeds, but an initial prograde burn raises speed before the orbit changes.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "What is escape speed at this radius under the same ideal model?",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "√2 times circular speed, about 8.94×10³ m/s."
    }
  },
  "velocities-c-l-frames": {
    "explanation": "Lab-to-CM transformations subtract one common vector from every velocity. The inverse transformation adds that same vector back. In an elastic two-body collision, CM speed magnitudes stay constant while directions change, which simplifies angular calculations.",
    "example": {
      "title": "Step-by-step extension",
      "problem": "A CM frame moves at (3,0) m/s relative to the lab. A particle leaves with CM velocity (0,4) m/s. Find its lab speed and angle.",
      "steps": [
        "Add vectors to get lab velocity (3,4) m/s.",
        "Magnitude is √(9+16)=5.",
        "Angle to +x is arctan(4/3)."
      ],
      "answer": "5 m/s at about 53.1° above +x."
    },
    "error": "Add velocities component by component, not their magnitudes.",
    "practice": {
      "title": "Try it yourself — additional practice",
      "problem": "Transform lab velocity (1,2) m/s to this CM frame.",
      "steps": [
        "Try the problem before revealing the answer."
      ],
      "answer": "(−2,2) m/s."
    }
  }
};

export const CHAPTERS: Chapter[] = [calculus, vectors, dynamics, central].map(chapter => ({
  ...chapter,
  topics: chapter.topics.map(topic => {
    const extra = LESSON_EXTENSIONS[topic.id];
    if (!extra) return topic;
    return {
      ...topic,
      minutes: topic.minutes + 5,
      understand: { ...topic.understand, simple: topic.understand.simple + "\n\n" + extra.explanation },
      examples: [...topic.examples, extra.example, extra.practice],
      mistakes: [...topic.mistakes, { wrong: "A detail that is easy to overlook", why: extra.error, right: extra.explanation, trick: "State the assumptions and check the units before substituting numbers." }],
    };
  }),
}));

export const allTopics = (): { chapter: Chapter; topic: Topic }[] =>
  CHAPTERS.flatMap((c) => c.topics.map((t) => ({ chapter: c, topic: t })));

export const findChapter = (id: string | null) => CHAPTERS.find((c) => c.id === id);
export const findTopic = (chapterId: string | null, topicId: string | null) => {
  const c = findChapter(chapterId);
  return c?.topics.find((t) => t.id === topicId);
};

export const totalTopics = CHAPTERS.reduce((n, c) => n + c.topics.length, 0);
export const totalMinutes = CHAPTERS.reduce(
  (n, c) => n + c.topics.reduce((m, t) => m + t.minutes, 0),
  0,
);

export interface FormulaRow {
  tex: string;
  name: string;
  chapterId: string;
  chapter: string;
  topicId: string;
  topic: string;
}

export const formulaLibrary = (): FormulaRow[] =>
  allTopics().flatMap(({ chapter, topic }) =>
    topic.formulas.map((f) => ({
      tex: f.tex,
      name: f.name,
      chapterId: chapter.id,
      chapter: chapter.title,
      topicId: topic.id,
      topic: topic.title,
    })),
  );

export interface SearchHit {
  chapterId: string;
  topicId: string;
  chapter: string;
  title: string;
  snippet: string;
  score: number;
}

export function searchBook(q: string): SearchHit[] {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  const words = query.split(/\s+/);
  const hits: SearchHit[] = [];
  for (const { chapter, topic } of allTopics()) {
    const haystack = [
      topic.title,
      topic.understand.simple,
      topic.definition.formal,
      topic.awaken.hook,
      ...topic.formulas.map((f) => f.name),
      ...topic.summary.points,
    ]
      .join(" • ")
      .toLowerCase();
    let score = 0;
    for (const w of words) {
      if (topic.title.toLowerCase().includes(w)) score += 6;
      if (haystack.includes(w)) score += 2;
    }
    if (score > 0) {
      const i = haystack.indexOf(words[0]);
      hits.push({
        chapterId: chapter.id,
        topicId: topic.id,
        chapter: chapter.title,
        title: topic.title,
        snippet: haystack.slice(Math.max(0, i - 40), Math.max(0, i - 40) + 160),
        score,
      });
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 24);
}
