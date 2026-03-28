import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Mathematically precise isometric wireframe.
 * Each layer is a rhombus (top face) + two parallelogram sides.
 * halfW=160, halfH=90, sideH=40, 5×5 grid per face.
 */
const CX = 260;
const HW = 160; // half-width of top face
const HH = 90;  // half-height of top face (isometric foreshortening)
const SH = 40;  // side (thickness) height
const LAYERS = [110, 310, 510]; // center-Y for each layer's top face

function layerPaths(cy: number) {
  // Top face corners
  const B = [CX, cy - HH];
  const R = [CX + HW, cy];
  const F = [CX, cy + HH];
  const L = [CX - HW, cy];
  // Bottom face corners (only visible ones)
  const Fb = [CX, cy + HH + SH];
  const Rb = [CX + HW, cy + SH];
  const Lb = [CX - HW, cy + SH];

  const outline = [
    // Top face
    `M${B[0]} ${B[1]} L${R[0]} ${R[1]} L${F[0]} ${F[1]} L${L[0]} ${L[1]} Z`,
    // Right side
    `M${R[0]} ${R[1]} L${F[0]} ${F[1]} L${Fb[0]} ${Fb[1]} L${Rb[0]} ${Rb[1]} Z`,
    // Left side
    `M${L[0]} ${L[1]} L${F[0]} ${F[1]} L${Fb[0]} ${Fb[1]} L${Lb[0]} ${Lb[1]} Z`,
  ];

  // Grid lines on top face (5 divisions each direction)
  const N = 5;
  const grid: string[] = [];
  for (let i = 1; i < N; i++) {
    const t = i / N;
    // Direction 1: B→L edge to R→F edge
    const x1 = CX - HW * t;
    const y1 = cy - HH + HH * t;
    const x2 = CX + HW - HW * t;
    const y2 = cy + HH * t;
    grid.push(`M${x1} ${y1} L${x2} ${y2}`);
    // Direction 2: B→R edge to L→F edge
    const x3 = CX + HW * t;
    const y3 = cy - HH + HH * t;
    const x4 = CX - HW + HW * t;
    const y4 = cy + HH * t;
    grid.push(`M${x3} ${y3} L${x4} ${y4}`);
  }

  // Hatching on side faces (parallel to top edge)
  const hatch: string[] = [];
  for (let i = 1; i <= 2; i++) {
    const t = i / 3;
    const dy = SH * t;
    // Right face
    hatch.push(`M${R[0]} ${R[1] + dy} L${F[0]} ${F[1] + dy}`);
    // Left face
    hatch.push(`M${L[0]} ${L[1] + dy} L${F[0]} ${F[1] + dy}`);
  }

  return { outline, grid, hatch };
}

/** Connector lines and data-flow nodes between layers */
function connectorPaths() {
  const connectors: string[] = [];
  const nodes: [number, number][] = [];

  for (let i = 0; i < LAYERS.length - 1; i++) {
    const cyTop = LAYERS[i];
    const cyBot = LAYERS[i + 1];

    // Vertical dashed lines at right corner
    const rTopBottom = cyTop + SH;       // right corner bottom of upper layer
    const rBotTop = cyBot;               // right corner top of lower layer
    connectors.push(`M${CX + HW} ${rTopBottom} L${CX + HW} ${rBotTop}`);

    // Vertical dashed lines at left corner
    const lTopBottom = cyTop + SH;
    const lBotTop = cyBot;
    connectors.push(`M${CX - HW} ${lTopBottom} L${CX - HW} ${lBotTop}`);

    // Vertical dashed line at front point
    const fTopBottom = cyTop + HH + SH;  // front bottom of upper layer
    const fBotFront = cyBot + HH;        // front of lower layer top face
    connectors.push(`M${CX} ${fTopBottom} L${CX} ${fBotFront}`);

    // Diagonal flow lines through the gap (data flowing between layers)
    const gapMidY = (rTopBottom + rBotTop) / 2;
    // Right-to-center flow
    connectors.push(`M${CX + HW - 20} ${rTopBottom + 10} L${CX + 40} ${rBotTop - 10}`);
    // Left-to-center flow
    connectors.push(`M${CX - HW + 20} ${lTopBottom + 10} L${CX - 40} ${lBotTop - 10}`);

    // Nodes at midpoints of gaps
    nodes.push([CX + HW, gapMidY]);
    nodes.push([CX - HW, gapMidY]);
    nodes.push([CX, (fTopBottom + fBotFront) / 2]);
  }

  // Data nodes on each layer's top face (at grid intersections)
  for (const cy of LAYERS) {
    // Center
    nodes.push([CX, cy]);
    // At 2/5 grid intersections (where two grid lines cross)
    const t = 2 / 5;
    nodes.push([CX - HW * t + HW * t, cy - HH * t + HH * t]); // back-center area
    nodes.push([CX + HW * 0.4, cy - HH * 0.2]);
    nodes.push([CX - HW * 0.4, cy - HH * 0.2]);
    nodes.push([CX + HW * 0.2, cy + HH * 0.2]);
    nodes.push([CX - HW * 0.2, cy + HH * 0.2]);
  }

  return { connectors, nodes };
}

const IsometricWireframe = () => {
  const layers = LAYERS.map(layerPaths);
  const { connectors, nodes } = connectorPaths();

  return (
    <svg
      viewBox="70 10 380 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
      aria-hidden="true"
    >
      {/* Connector lines between layers (drawn first, behind everything) */}
      <g className="iso-connector" stroke="hsl(var(--near-black))">
        {connectors.map((d, i) => (
          <path
            key={`c${i}`}
            d={d}
            strokeWidth="0.6"
            strokeDasharray="4 3"
            opacity="0.25"
          />
        ))}
      </g>

      {/* Layer geometry */}
      {layers.map((layer, idx) => (
        <g key={idx} className={`iso-layer iso-layer-${idx}`} stroke="hsl(var(--near-black))">
          {/* Grid lines */}
          {layer.grid.map((d, i) => (
            <path key={`g${i}`} d={d} strokeWidth="0.4" opacity="0.3" />
          ))}
          {/* Side hatching */}
          {layer.hatch.map((d, i) => (
            <path key={`h${i}`} d={d} strokeWidth="0.3" opacity="0.18" />
          ))}
          {/* Outline (drawn last so it's on top) */}
          {layer.outline.map((d, i) => (
            <path key={`o${i}`} d={d} strokeWidth="0.8" />
          ))}
        </g>
      ))}

      {/* Data nodes at intersections and connector midpoints */}
      <g fill="hsl(var(--near-black))">
        {nodes.map(([x, y], i) => (
          <circle
            key={`n${i}`}
            cx={x}
            cy={y}
            r="2.5"
            opacity="0.35"
            className={`iso-node ${i % 2 === 0 ? 'iso-node-even' : 'iso-node-odd'}`}
          />
        ))}
      </g>
    </svg>
  );
};

const services = [
  {
    number: "01",
    title: "Marketing",
    description:
      "Brand strategy, content marketing, and trust-building campaigns that position your expertise where it matters most. We help you tell the story that earns attention — and credibility.",
  },
  {
    number: "02",
    title: "Technology",
    description:
      "Digital platforms, credentialing infrastructure, and integrated tools that power your brand ecosystem. Purpose-built applications architected around how you actually operate.",
  },
  {
    number: "03",
    title: "Operations",
    description:
      "Certification program design, credential management systems, and the operational backbone that makes trust scalable. We build the processes that turn expertise into recognized authority.",
  },
];

export const ServicesOverview = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      className="py-24 md:py-32 bg-cream px-6 md:px-12 relative grain overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="mb-16 md:mb-20 max-w-3xl stagger-children">
          <div className="fade-in-up mb-4">
            <span className="section-label">The Revenue Stack</span>
          </div>
          <h2 className="fade-in-up text-4xl md:text-5xl font-serif font-bold text-near-black leading-[1.1] mb-6">
            Trust doesn't come from one channel.{" "}
            <em className="text-forest-green">It compounds.</em>
          </h2>
          <p className="fade-in-up text-lg text-foreground/60 leading-relaxed">
            We build integrated systems where marketing, technology, and operations
            reinforce each other — so every touchpoint makes your brand more credible,
            and every credential drives more revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Numbered service descriptions */}
          <div className="stagger-children">
            {services.map((service, i) => (
              <div key={service.number}>
                <div className="fade-in-up py-10 first:pt-0">
                  <span className="text-sm font-sans text-foreground/40 tracking-wider mb-6 block">
                    {service.number}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-near-black leading-snug mb-5">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed text-base max-w-md">
                    {service.description}
                  </p>
                </div>
                {i < services.length - 1 && (
                  <hr className="border-t border-border" />
                )}
              </div>
            ))}
          </div>

          {/* Right: Wireframe isometric graphic */}
          <div className="fade-in-up hidden md:flex items-center justify-center">
            <IsometricWireframe />
          </div>
        </div>
      </div>
    </section>
  );
};
