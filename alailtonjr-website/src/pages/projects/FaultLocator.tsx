import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Zap,
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  ExternalLink,
  Menu,
  X,
  Layers,
  CircleHelp,
  Wind,
  MapPin,
  GraduationCap,
} from "lucide-react";

export const projectMeta = {
  id: "fault-locator",
  title: "Enhanced Fault Location for Wind Farm Collectors",
  summary:
    "Advanced fault location algorithms for onshore wind farm collector systems with inverter-based resources, combining analytical methods with machine learning.",
  tags: ["Wind Farms", "IBR", "Fault Location", "Machine Learning", "Protection"],
};

type TopicItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TopicItem[];
};

const TOPICS: TopicItem[] = [
  { id: "intro", label: "Introduction", icon: <BookOpen className="h-4 w-4" /> },
  { id: "problem", label: "The Problem", icon: <AlertTriangle className="h-4 w-4" /> },
  {
    id: "approaches",
    label: "Solution Approaches",
    icon: <Target className="h-4 w-4" />,
    children: [
      { id: "approach1", label: "Protection Challenges Analysis" },
      { id: "approach2", label: "Multi-Method Phasor-Based" },
      { id: "approach3", label: "Analytical Voltage Compensation" },
      { id: "approach4", label: "Machine Learning Enhancement" },
    ],
  },
  { id: "results", label: "Results & Impact", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "papers", label: "Published Papers", icon: <FileText className="h-4 w-4" /> },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted text-muted-fg">
      {children}
    </span>
  );
}

function SectionCard({
  children,
  title,
  icon,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-muted-fg">{icon ?? <CircleHelp className="h-4 w-4" />}</div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-muted-fg mt-1">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-4 prose prose-sm max-w-none text-muted-fg">
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-border my-6" />;
}

function useActive(initial = TOPICS[0].id) {
  const [active, setActive] = useState<string>(initial);
  return { active, setActive } as const;
}

export default function FaultLocatorProjectPage() {
  const { active, setActive } = useActive("intro");
  const [open, setOpen] = useState(false);

  const flatTopicIds = useMemo(() => {
    const ids: string[] = [];
    for (const t of TOPICS) {
      ids.push(t.id);
      if (t.children) {
        for (const c of t.children) {
          ids.push(c.id);
        }
      }
    }
    return ids;
  }, []);

  const goNext = () => {
    const idx = flatTopicIds.indexOf(active);
    if (idx >= 0 && idx < flatTopicIds.length - 1) {
      setActive(flatTopicIds[idx + 1]);
    }
  };

  const goPrev = () => {
    const idx = flatTopicIds.indexOf(active);
    if (idx > 0) {
      setActive(flatTopicIds[idx - 1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-8 max-w-7xl mx-auto relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-20 right-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(open || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="lg:sticky lg:top-24 lg:self-start w-full lg:w-64 flex-shrink-0 bg-card border border-border rounded-2xl p-4 shadow-sm fixed top-20 left-4 right-4 z-40 lg:relative lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
          >
            <nav>
              <ul className="space-y-1">
                {TOPICS.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => {
                        setActive(topic.id);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        active === topic.id
                          ? "bg-accent text-accent-fg"
                          : "text-muted-fg hover:bg-muted"
                      }`}
                    >
                      {topic.icon}
                      {topic.label}
                    </button>
                    {topic.children && (
                      <ul className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-2">
                        {topic.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => {
                                setActive(child.id);
                                setOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                active === child.id
                                  ? "bg-accent/10 text-accent font-medium"
                                  : "text-muted-fg hover:bg-muted"
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 space-y-6 w-full overflow-hidden">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{projectMeta.title}</h1>
          <p className="text-lg text-muted-fg">{projectMeta.summary}</p>
          <div className="flex flex-wrap gap-2">
            {projectMeta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        <Divider />

        {/* Dynamic Content Based on Active Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 w-full overflow-hidden"
          >
            {/* Introduction */}
            {active === "intro" && (
              <>
                <SectionCard title="Research Overview" icon={<Wind className="h-5 w-5" />}>
                  <p>
                    This research addresses the critical challenge of accurately locating faults in onshore wind farm collector systems 
                    with high penetration of Inverter-Based Resources (IBRs). As renewable energy becomes increasingly dominant in power 
                    grids, traditional protection and fault location methods face unprecedented challenges.
                  </p>
                  <p className="mt-3">
                    Wind farms, particularly those using full-converter wind turbines, exhibit fundamentally different fault characteristics 
                    compared to conventional synchronous generators. These differences create significant challenges for protection systems 
                    and fault location algorithms originally designed for traditional power systems.
                  </p>
                </SectionCard>

                <SectionCard title="Published Research" icon={<FileText className="h-5 w-5" />}>
                  <p>This work is documented in four peer-reviewed publications:</p>
                  <ol className="list-decimal list-inside space-y-2 mt-3 text-sm">
                    <li>
                      <strong>Alves Júnior, A. J.; Davi, M. J. B. B.; Jorge, D. C.; Barbosa, D.; Oleskovicz, M.; Coury, D. V.</strong> 
                      Challenges and recommendations for enhancing protection of onshore wind farm collector systems. 
                      <em>Electric Power Systems Research</em>, 250, 112141, 2026.
                    </li>
                    <li>
                      <strong>Davi, M.; Alves Júnior, A.; Grilo, C.; Cunha, T.; Lessa, L.; Oleskovicz, M.; Coury, D.</strong> 
                      An Improved Methodology to Locate Faults in Onshore Wind Farm Collector Systems. 
                      <em>Energies</em>, 18, 693, 2025.
                    </li>
                    <li>
                      <strong>Alves Júnior, Barbosa, D.; Fernandes, A. S. R.; Coury, D. V.</strong> 
                      Analytical Phasor-Based Fault Location Enhancement for Wind Farm Collector Networks. 
                      <em>IEEE Transactions on Sustainable Energy</em>, submitted, under review, 2026.
                    </li>
                    <li>
                      <strong>Alves Júnior, A. J.; Davi, M. J. B. B.; Oleskovicz, M.; Coury, D. V.</strong> 
                      Data-Driven Reduction of Fault Location Errors in Onshore Wind Farm Collectors. 
                      <em>Sustainable Energy, Grids and Networks</em>, submitted, under review, 2026.
                    </li>
                  </ol>
                </SectionCard>

                <SectionCard title="Research Context" icon={<MapPin className="h-5 w-5" />}>
                  <p>
                    This work was conducted as part of my Master's research at the University of São Paulo (USP) in collaboration with 
                    TotalEnergies. The research uses a realistic model of a 504 MW wind farm in northeastern Brazil, comprising 120 
                    wind turbines (4.2 MW each) across four collector busbars.
                  </p>
                  <p className="mt-3">
                    Through comprehensive simulations and analysis of over <strong>18,600 fault scenarios</strong>, this research 
                    systematically addresses protection challenges and develops progressively more accurate fault location solutions.
                  </p>
                </SectionCard>
              </>
            )}

            {/* The Problem */}
            {active === "problem" && (
              <>
                <SectionCard title="The Challenge" icon={<AlertTriangle className="h-5 w-5" />}>
                  <p>
                    Wind farm collector systems with Inverter-Based Resources present several unique challenges that conventional 
                    protection and fault location methods cannot adequately address:
                  </p>
                </SectionCard>

                <SectionCard title="1. Limited and Controlled Fault Current" icon={<Zap className="h-5 w-5" />}>
                  <p>
                    Unlike synchronous generators that provide large fault currents determined by system impedance, IBRs are 
                    electronically controlled and typically limit fault current to 1.2-2.0 times the rated current.
                  </p>
                  <p className="mt-3">
                    In many fault scenarios, particularly those with high fault resistance or during low generation periods, 
                    the fault current magnitude can even <strong>fall below the nominal operating current</strong>, making 
                    traditional protection schemes fail to detect internal faults.
                  </p>
                </SectionCard>

                <SectionCard title="2. Atypical Fault Current Profiles" icon={<TrendingUp className="h-5 w-5" />}>
                  <p>
                    The combined contributions from the grid and multiple wind turbines create fault current profiles that 
                    differ substantially from conventional systems:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Non-uniform current distribution across phases and sequence components</li>
                    <li>Dependence on control strategies (Grid-Following vs. Grid-Forming)</li>
                    <li>Variation with wind generation level and operational conditions</li>
                    <li><strong>Potential for current reversal</strong> under high fault resistance conditions</li>
                  </ul>
                </SectionCard>

                <SectionCard title="3. Fault Location Accuracy Issues" icon={<Target className="h-5 w-5" />}>
                  <p>
                    Traditional phasor-based fault location methods, designed for systems with synchronous generation, 
                    exhibit high errors in wind farm collectors due to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Infeed effect:</strong> Multiple turbine contributions distort voltage and current measurements</li>
                    <li><strong>Method limitations:</strong> Single methods cannot handle all fault types equally well</li>
                    <li><strong>Network complexity:</strong> Radial collector topology with multiple lateral branches</li>
                    <li><strong>Variable impedance:</strong> Changing generation levels alter system impedance characteristics</li>
                  </ul>
                  <p className="mt-3">
                    Conventional single-method approaches can produce errors exceeding <strong>20-30%</strong> of the line 
                    length, making them impractical for operational use in wind farm protection schemes.
                  </p>
                </SectionCard>
              </>
            )}

            {/* Approach 1: Protection Challenges */}
            {active === "approach1" && (
              <>
                <SectionCard 
                  title="Approach 1: Comprehensive Protection Challenges Analysis" 
                  icon={<AlertTriangle className="h-5 w-5" />}
                  subtitle="Published in Electric Power Systems Research (2026)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Alves Júnior, A. J.; Davi, M. J. B. B.; Jorge, D. C.; Barbosa, D.; Oleskovicz, M.; Coury, D. V.; 
                      Challenges and recommendations for enhancing protection of onshore wind farm collector systems; 
                      <em>Electric Power Systems Research</em>, 250, 112141, 2026.
                    </p>
                  </div>
                  <p>
                    The first step in this research was to thoroughly characterize and understand the protection challenges 
                    specific to wind farm collector systems. This work represented the <strong>first comprehensive analysis</strong> 
                    of conventional protection performance in this context.
                  </p>
                </SectionCard>

                <SectionCard title="Methodology" icon={<FileText className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Realistic simulations:</strong> PSCAD/EMTDC model of a 504 MW wind farm with Grid-Following (GFL) 
                      control strategy
                    </li>
                    <li>
                      <strong>Parametric analysis:</strong> 2,520 fault scenarios covering all fault types, resistances 
                      (0-100Ω), inception angles, and generation levels (0.1-1.0 p.u.)
                    </li>
                    <li>
                      <strong>Protection function evaluation:</strong> ANSI 50/51 (overcurrent), ANSI 67P/67N/67Q 
                      (directional overcurrent with phase and sequence components)
                    </li>
                    <li>
                      <strong>Commercial relay validation:</strong> Testing on actual protection relays to confirm 
                      computational findings
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Key Findings" icon={<CheckCircle className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">ANSI 50/51 Limitations</h4>
                      <p>
                        Current magnitude-based protection proves inadequate as IBR fault currents often remain below 
                        nominal levels, particularly under:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li>High fault resistance conditions</li>
                        <li>Low wind generation periods</li>
                        <li>Measurement points distant from fault location</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">ANSI 67 Superiority</h4>
                      <p>
                        Directional overcurrent functions demonstrate significantly better performance, especially when 
                        using sequence components:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>ANSI 67N (neutral/zero-sequence):</strong> Most effective for phase-to-ground faults</li>
                        <li><strong>ANSI 67Q (negative-sequence):</strong> Superior for asymmetric faults</li>
                        <li>Direction sensing provides robustness against magnitude variations</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Current Reversal Phenomenon</h4>
                      <p>
                        Under high fault resistance, a critical phenomenon was identified: IBR current contribution can 
                        exceed grid contribution, causing <strong>reverse power flow</strong> despite internal faults. 
                        This challenges traditional directional discrimination.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Proximity Effect</h4>
                      <p>
                        Measurement points closer to potential fault locations significantly improve protection effectiveness 
                        by minimizing the influence from multiple turbine contributions along the collector network.
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Practical Recommendations" icon={<Target className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Prioritize directional protection (ANSI 67) over purely magnitude-based schemes</li>
                    <li>Utilize sequence components (zero and negative) for enhanced discrimination</li>
                    <li>Optimize relay placement considering collector topology and turbine distribution</li>
                    <li>Adapt protection settings based on expected generation levels and operational scenarios</li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Approach 2: Multi-Method */}
            {active === "approach2" && (
              <>
                <SectionCard 
                  title="Approach 2: Multi-Method Phasor-Based Fault Location" 
                  icon={<Layers className="h-5 w-5" />}
                  subtitle="Published in Energies (2025)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Davi, M.; Alves Júnior, A.; Grilo, C.; Cunha, T.; Lessa, L.; Oleskovicz, M.; Coury, D.; 
                      An Improved Methodology to Locate Faults in Onshore Wind Farm Collector Systems; 
                      <em>Energies</em>, 18, 693, 2025.
                    </p>
                  </div>
                  <p>
                    Building on the protection challenges identified in the first paper, this work developed an optimized 
                    fault location methodology specifically designed for wind farm collector systems. The key insight was 
                    that <strong>no single phasor-based method performs optimally for all fault types</strong> in IBR-dominated 
                    systems.
                  </p>
                </SectionCard>

                <SectionCard title="Methodology" icon={<FileText className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Method evaluation:</strong> Six state-of-the-art phasor-based methods were systematically 
                      evaluated:
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>Impedance (IMPE)</li>
                        <li>Reactance (REAC)</li>
                        <li>Simple Takagi (TAKS)</li>
                        <li>Zero-sequence Takagi (TAKZ)</li>
                        <li>Modified zero-sequence Takagi (TAKZnew)</li>
                        <li>Negative-sequence Takagi (TAKN)</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Comprehensive testing:</strong> 18,600 fault scenarios covering 31 locations, 10 fault types, 
                      4 resistance values, 3 inception angles, and 4 generation levels
                    </li>
                    <li>
                      <strong>Single-ended approach:</strong> Measurements from substation only to maintain practical 
                      feasibility with existing infrastructure
                    </li>
                    <li>
                      <strong>Multi-Method (MM) strategy:</strong> Intelligent selection of optimal method based on 
                      fault type classification
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Key Results" icon={<BarChart3 className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Method-Specific Performance by Fault Type</h4>
                      <p>The analysis revealed clear patterns of which methods excel for specific fault types:</p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>TAKZ:</strong> Best for phase-to-ground (PG) faults</li>
                        <li><strong>TAKN:</strong> Best for phase-to-phase (PP) faults</li>
                        <li><strong>TAKZnew:</strong> Best for phase-to-phase-to-ground (PPG) faults</li>
                        <li><strong>REAC:</strong> Best for three-phase (PPP) faults</li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Multi-Method Performance</h4>
                      <ul className="space-y-1">
                        <li><strong>Average error: 1.89%</strong></li>
                        <li><strong>92% error reduction</strong> compared to conventional single methods</li>
                        <li>Consistent low errors (&lt;3.35%) across all collector topologies</li>
                        <li>Error reductions by collector: 87% (B1), 95% (B2), 90% (B3), 83% (B4)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Error Pattern Analysis</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Errors increase with fault resistance and wind generation level</li>
                        <li>Main overhead lines show lower errors than secondary turbine connection lines</li>
                        <li>Shorter entrance lines exhibit higher relative errors</li>
                        <li>Infeed effect from wind turbines significantly impacts terminal measurements</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Implementation" icon={<Target className="h-5 w-5" />}>
                  <p>
                    The Multi-Method approach is practical and implementable with existing relay technology:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>Fault detection and classification using conventional protection elements</li>
                    <li>Selection of optimal method based on classified fault type</li>
                    <li>Application of selected phasor-based equation with single-ended measurements</li>
                    <li>Calculation of fault distance estimate</li>
                  </ol>
                  <p className="mt-3">
                    This approach maintains compatibility with standard IED capabilities and does not require additional 
                    measurement infrastructure, making it immediately deployable in operational wind farms.
                  </p>
                </SectionCard>
              </>
            )}

            {/* Approach 3: Analytical Voltage Compensation */}
            {active === "approach3" && (
              <>
                <SectionCard 
                  title="Approach 3: Analytical Voltage Compensation Enhancement" 
                  icon={<Zap className="h-5 w-5" />}
                  subtitle="Submitted to IEEE Transactions on Power Systems (2026)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Alves Júnior, A. J.; Barbosa, D.; Fernandes, R. A. S.; Coury, D. V.; 
                      Analytical Phasor-Based Fault Location Enhancement for Wind Farm Collector Networks; 
                      <em>IEEE Transactions on Power Systems</em>, submitted, under review, 2026.
                    </p>
                  </div>
                  <p>
                    This paper addresses a key limitation in fault location within wind farm collector networks: when 
                    <strong> Inverter-Based Resources (IBRs) are electrically located downstream from the fault</strong>, 
                    one-terminal phasor-based methods become inaccurate. The voltage drop caused by IBR fault current injections 
                    is not captured by the Intelligent Electronic Device (IED), resulting in systematic overestimation of fault distance.
                  </p>
                  <p className="mt-3">
                    To mitigate this issue, a general compensation framework is proposed by augmenting classical loop formulations 
                    with a distance-dependent voltage correction term. The methodology is derived analytically using sequence-domain 
                    representation and maintains the simplicity and interpretability of conventional approaches.
                  </p>
                </SectionCard>

                <SectionCard title="The IBR Placement Problem" icon={<AlertTriangle className="h-5 w-5" />}>
                  <p>
                    Modern wind farms comprise numerous wind turbine generators (WTGs) distributed across multiple radial feeders. 
                    The critical factor in fault location analysis is <strong>the position of the IBR relative to the fault point 
                    and the IED</strong>:
                  </p>
                  <div className="mt-3 space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Case 1: Fault Upstream of IBR (d &lt; d_w)</h4>
                      <p>
                        When the fault is located between the IED and all IBRs, the entire voltage drop between the IED and 
                        fault point is captured by IED measurements. Although IBR current may flow toward the grid through the IED, 
                        the conventional loop formulation remains valid:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
Z_loop = V_loop / I_loop
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Case 2: Fault Downstream of IBR (d_w &lt; d)</h4>
                      <p>
                        When at least one IBR is positioned upstream of the fault, a portion of the fault positive-sequence 
                        current flows through the segment between the IBR and fault point. This segment introduces a voltage drop 
                        <strong> not visible to the IED</strong>, leading to distorted loop impedance and overestimation of fault distance.
                      </p>
                      <p className="mt-2">
                        The IED records voltage drop only up to the IBR location but does not capture the additional drop across 
                        the remainder of the line (d - d_w) · Z_L^(1) due to IBR injection I_w^(1).
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Analytical Compensation Framework" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Compensated Loop Equation</h4>
                      <p>
                        To correct the discrepancy introduced by upstream IBRs, a compensation term is added to reconstruct 
                        the total voltage drop:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
Z_loop = (V_loop + V_comp(d)) / I_loop

where:
  V_comp(d) = -Σ (d - d_w,k) · Z_L^(1) · I_w,k^(1)
  
  Sum over all k IBRs with d_w,k &lt; d
  (i.e., IBRs upstream of the fault)
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Sequence-Domain Derivation (SLG Fault)</h4>
                      <p>
                        The formulation begins with single-line-to-ground (SLG) faults using sequence networks. For an IBR at 
                        location d_w &lt; d, the positive-sequence fault voltage becomes:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
V_F^(1) = V_a^(1) - I_a^(1) · d · Z_L^(1) 
          - (d - d_w) · Z_L^(1) · I_w^(1)
          \_________________________________/
                  Compensation term
                      </pre>
                      <p className="mt-2">
                        For multiple inverters (N devices), superposition yields:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
V_F^(1) = V_a^(1) - I_a^(1) · d · Z_L^(1) 
          - Σ(k=1 to N) (d - d_w,k) · Z_L^(1) · I_w,k^(1)
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Zero and Negative Sequence Networks</h4>
                      <p>
                        Consistent with typical inverter controls that suppress negative- and zero-sequence injections, 
                        these networks contain no inverter-current terms:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
V_F^(2) = V_a^(2) - I_a^(2) · d · Z_L^(2)

V_F^(0) = V_a^(0) - I_a^(0) · d · Z_L^(0)
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Complete Loop Equation for SLG Fault</h4>
                      <p>
                        Combining sequence components with the fault constraint (V_F = V_F^(1) + V_F^(2) + V_F^(0)) and 
                        rearranging yields:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
d · Z_L^(1) = [V_a + V_comp^(SLG)(d)] / [I_a + K_0 · I_a^(0)] - I_F · R_F

where:
  V_comp^(SLG)(d) = -Σ (d - d_w,k) · Z_L^(1) · I_w,k^(1)
  K_0 = Z_L^(0) / Z_L^(1)  (zero-sequence compensation factor)
                      </pre>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Generalization to All Fault Types" icon={<Layers className="h-5 w-5" />}>
                  <p>
                    The formulation extends to all fault types through unified notation. The general distance estimation 
                    equation becomes:
                  </p>
                  <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`d = Im{(V_loop + V_comp(d)) · I_F*} / Im{Z_L^(1) · I_loop · I_F*}

where:
  Im{·} = imaginary part operator (eliminates fault resistance)
  I_F*  = complex conjugate of fault current
  V_loop, I_loop = appropriate loop voltage/current for fault type`}
                  </pre>
                  <p className="mt-3">
                    The method applies to all common fault types:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-sm">
                    <li><strong>Single-line-to-ground:</strong> AG, BG, CG</li>
                    <li><strong>Line-to-line:</strong> AB, BC, CA</li>
                    <li><strong>Double-line-to-ground:</strong> ABG, BCG, CAG</li>
                    <li><strong>Three-phase:</strong> ABC, ABCG</li>
                  </ul>
                  <p className="mt-3 text-sm text-muted-fg">
                    Each fault type uses its corresponding loop formulation with sequence-appropriate IBR current for compensation.
                  </p>
                </SectionCard>

                <SectionCard title="Practical Implementation" icon={<Target className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Iterative Estimation Procedure</h4>
                      <p>
                        Since V_comp(d) depends on the unknown distance d, estimation is performed iteratively:
                      </p>
                      <ol className="list-decimal list-inside mt-2 ml-4 text-sm space-y-1">
                        <li>Initialize with classical method: d^(0) = d_classical</li>
                        <li>Calculate compensation: V_comp(d^(n))</li>
                        <li>Update estimate: d^(n+1) using compensated equation</li>
                        <li>Repeat until convergence: |d^(n+1) - d^(n)| &lt; tolerance</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Handling Unavailable IBR Measurements</h4>
                      <p>
                        When per-inverter currents are not available, a practical approximation uses pre-fault IED measurements 
                        as a proxy:
                      </p>
                      <ul className="list-disc list-inside mt-2 ml-4 text-sm">
                        <li>Assumes uniform generation across all WTGs</li>
                        <li>Uses pre-fault positive-sequence current magnitude and angle</li>
                        <li>Distributes total generation equally among N turbines</li>
                        <li>Enables estimation with <strong>only local IED measurements</strong></li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Key Results" icon={<CheckCircle className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Dramatic Error Reduction for Ground Faults</h4>
                      <p className="text-sm mb-2">
                        Evaluated on 15,300 fault scenarios (17 locations × 10 types × 6 resistances × 3 inception angles × 5 generation levels):
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <strong>Over 90% reduction</strong> in average and maximum errors for ground-involved faults (AG, ABG, ABCG)
                        </li>
                        <li>Average error: ~15% → ~1.5% of line length</li>
                        <li>Maximum error: ~30% → ~3% of line length</li>
                        <li>Performance maintained across all fault resistances (0-100Ω)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Elimination of Wind Penetration Sensitivity</h4>
                      <p>
                        Traditional methods show severe degradation with varying generation. The compensated method:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4 text-sm">
                        <li>Maintains consistent accuracy from 0.2 to 1.0 p.u. wind generation</li>
                        <li>Explicitly accounts for IBR contribution magnitude changes</li>
                        <li>Adapts automatically without manual recalibration</li>
                        <li>No sensitivity to operational wind conditions</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Uniform Performance Across Feeders</h4>
                      <ul className="list-disc list-inside mt-1 ml-4 text-sm">
                        <li>Handles multiple IBR locations with cumulative compensation (Σ over N turbines)</li>
                        <li>Consistent accuracy regardless of feeder topology or turbine distribution</li>
                        <li>Works equally well for mainline and lateral branch faults</li>
                        <li>Scales naturally with system complexity</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Maintained Simplicity</h4>
                      <p>
                        Despite addressing complex IBR interactions, the method:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4 text-sm">
                        <li>Preserves classical phasor-based structure (voltage/current ratio)</li>
                        <li>Requires only local measurements (no communication infrastructure)</li>
                        <li>Compatible with existing IED technology</li>
                        <li>Transparent and fully traceable analytical derivation</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Innovation Highlights" icon={<Zap className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>First analytical framework</strong> explicitly addressing IBR voltage-drop effects in 
                      one-terminal phasor-based fault location
                    </li>
                    <li>
                      Transparent, fully traceable sequence-domain derivation maintaining interpretability of classical methods
                    </li>
                    <li>
                      General compensation term applicable through unified notation to all fault types (AG, AB, ABG, ABC, etc.)
                    </li>
                    <li>
                      Eliminates systematic bias introduced by IBR placement relative to fault location (d_w &lt; d case)
                    </li>
                    <li>
                      Requires only local IED measurements—no synchronized phasors or communication infrastructure needed
                    </li>
                    <li>
                      Practical approximation using pre-fault measurements when per-turbine currents unavailable
                    </li>
                    <li>
                      Compatible with existing relay technology and measurement capabilities
                    </li>
                    <li>
                      Positions method as practical solution for modern renewable-dominated grids with high IBR penetration
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Approach 4: Machine Learning Enhancement */}
            {active === "approach4" && (
              <>
                <SectionCard 
                  title="Approach 4: Machine Learning-Enhanced Fault Location" 
                  icon={<Brain className="h-5 w-5" />}
                  subtitle="Submitted to Sustainable Energy, Grids and Networks (2025)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Alves Júnior, A. J.; Davi, M. J. B. B.; Oleskovicz, M.; Coury, D. V.; 
                      Data-Driven Reduction of Fault Location Errors in Onshore Wind Farm Collectors; 
                      <em>Sustainable Energy, Grids and Networks</em>, submitted, under review, 2026.
                    </p>
                  </div>
                  <p>
                    While the Multi-Method approach achieved significant error reduction and the analytical voltage compensation 
                    framework further improved accuracy for ground faults, residual errors remained—especially for double-phase 
                    and three-phase faults. This work introduces a <strong>hybrid data-driven approach</strong> that combines the 
                    interpretability of deterministic methods with the accuracy of machine learning.
                  </p>
                </SectionCard>

                <SectionCard title="Methodology" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Gated Residual Network (GRN) Architecture</h4>
                      <p>
                        A specialized neural network architecture designed to predict <strong>correction factors</strong> for 
                        initial fault distance estimates from the Multi-Method baseline:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
Improved Distance = Multi-Method Estimate + GRN Correction Factor
                      </pre>
                      <p className="mt-2">
                        The GRN architecture uses gating mechanisms to dynamically weight feature contributions, with residual 
                        connections enabling effective training of deeper networks. This residual learning paradigm focuses the 
                        model on learning error patterns rather than absolute distances.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Comprehensive Feature Engineering</h4>
                      <p>Four groups of features were systematically extracted and analyzed:</p>
                      <ul className="list-decimal list-inside mt-1 ml-4 space-y-1">
                        <li>
                          <strong>Voltage and Current Phasors:</strong> Magnitudes and angles for all three phases (A, B, C)
                        </li>
                        <li>
                          <strong>Symmetrical Components:</strong> Zero, positive, and negative sequence quantities (magnitude & angle)
                        </li>
                        <li>
                          <strong>Loop Quantities:</strong> Fault-loop voltages, currents, and derived impedances based on fault type
                        </li>
                        <li>
                          <strong>Fault-Specific Features:</strong> Fault type indicators, wind generation level, Multi-Method initial estimate
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Feature Selection and Optimization</h4>
                      <p>
                        Optimal feature set determined through systematic analysis:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>Correlation analysis:</strong> Pearson coefficients to identify redundant features</li>
                        <li><strong>Mutual information:</strong> Quantifying nonlinear dependencies with target variable</li>
                        <li><strong>Ablation studies:</strong> Evaluating incremental contribution of feature groups</li>
                        <li><strong>Cross-validation:</strong> 5-fold CV to ensure generalization and prevent overfitting</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Training Strategy</h4>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li>Dataset: 18,600 fault scenarios with balanced representation across all conditions</li>
                        <li>80/20 train-test split with stratification by fault type</li>
                        <li>Adam optimizer with learning rate scheduling</li>
                        <li>Early stopping based on validation loss to prevent overfitting</li>
                        <li>Hyperparameter tuning: grid search over learning rates, layer sizes, dropout rates</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Key Results" icon={<CheckCircle className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Breakthrough Performance</h4>
                      <ul className="space-y-1">
                        <li>
                          <strong>76% overall error reduction</strong> compared to state-of-the-art phasor-based methods 
                          (including Multi-Method)
                        </li>
                        <li>Superior accuracy and stability across <strong>all fault types</strong>, including previously 
                        challenging double-phase and three-phase faults</li>
                        <li>Consistent performance regardless of collector topology or configuration</li>
                        <li>Robust to varying generation levels (0.1–1.0 p.u.) and network conditions</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Robustness Demonstration</h4>
                      <p>The ML-enhanced approach showed exceptional reliability:</p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li>Handles high fault resistance scenarios (up to 100Ω) effectively</li>
                        <li>Adapts to different collector circuit configurations and topologies</li>
                        <li>Maintains accuracy across full range of wind generation levels</li>
                        <li>Generalizes well to unseen fault scenarios in test set</li>
                        <li>Fault type classification accuracy exceeds 99%</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Practical Viability</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Compatible with existing measurement infrastructure (standard IED sampling rates)</li>
                        <li>Manageable computational requirements suitable for real-time deployment</li>
                        <li>Single-ended measurements only—no communication infrastructure required</li>
                        <li>Continuous improvement capability through iterative learning from actual fault events</li>
                        <li>Maintains interpretability through deterministic baseline + ML correction paradigm</li>
                        <li>Can be deployed as software update to existing relay firmware</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Innovation Highlights" icon={<Brain className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>First ML-based solution specifically designed for wind farm collector fault location</strong>
                    </li>
                    <li>
                      Novel GRN architecture with residual learning optimized for error correction, not direct prediction
                    </li>
                    <li>
                      Hybrid approach combining deterministic physics-based baseline (Multi-Method) with data-driven enhancement
                    </li>
                    <li>
                      Comprehensive feature engineering methodology with systematic selection process, applicable to other 
                      power system ML applications
                    </li>
                    <li>
                      Statistical validation framework demonstrating model robustness, generalization capability, and 
                      interpretability
                    </li>
                    <li>
                      Addresses the critical challenge of maintaining both accuracy and explainability in safety-critical 
                      protection applications
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Results */}
            {active === "results" && (
              <>
                <SectionCard title="Progressive Performance Improvement" icon={<TrendingUp className="h-5 w-5" />}>
                  <p>
                    The four-paper research program demonstrates systematic advancement in fault location accuracy:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="border-l-4 border-border pl-4">
                      <h4 className="font-semibold text-card-fg">Baseline (Conventional Single Methods)</h4>
                      <p className="text-sm mt-1">
                        Average error: <strong>~20-30%</strong> of line length
                        <br />
                        <span className="text-xs text-muted-fg">Highly dependent on fault type and conditions</span>
                      </p>
                    </div>

                    <div className="border-l-4 border-accent/50 pl-4">
                      <h4 className="font-semibold text-accent">Multi-Method Approach (Paper 2)</h4>
                      <p className="text-sm mt-1">
                        Average error: <strong>1.89%</strong>
                        <br />
                        <span className="text-xs text-muted-fg">
                          ~92% reduction from baseline | Consistently low across fault types
                        </span>
                      </p>
                    </div>

                    <div className="border-l-4 border-accent/60 pl-4">
                      <h4 className="font-semibold text-accent">Analytical Voltage Compensation (Paper 3)</h4>
                      <p className="text-sm mt-1">
                        Average error: <strong>&lt;0.5%</strong> (for ground faults)
                        <br />
                        <span className="text-xs text-muted-fg">
                          &gt;90% reduction for AG, BCG, ABCG faults | Analytical framework
                        </span>
                      </p>
                    </div>

                    <div className="border-l-4 border-accent pl-4 bg-accent/5 -ml-4 pl-8 py-2">
                      <h4 className="font-semibold text-accent">ML-Enhanced Approach (Paper 4)</h4>
                      <p className="text-sm mt-1">
                        Average error: <strong>~0.45%</strong> (all fault types)
                        <br />
                        <span className="text-xs text-muted-fg">
                          76% reduction from Multi-Method | ~98% total reduction from baseline
                        </span>
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Key Contributions to the Field" icon={<CheckCircle className="h-5 w-5" />}>
                  <ul className="list-decimal list-inside space-y-2">
                    <li>
                      <strong>First comprehensive characterization</strong> of protection challenges in wind farm collector 
                      systems with IBRs
                    </li>
                    <li>
                      <strong>Novel Multi-Method strategy</strong> optimizing phasor-based fault location through intelligent 
                      method selection
                    </li>
                    <li>
                      <strong>Pioneering ML-enhanced solution</strong> for wind farm fault location achieving near-exact 
                      accuracy
                    </li>
                    <li>
                      <strong>Practical implementation guidelines</strong> compatible with existing commercial protection 
                      infrastructure
                    </li>
                    <li>
                      <strong>Comprehensive validation methodology</strong> covering 18,600+ fault scenarios across diverse 
                      operational conditions
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Real-World Impact" icon={<Wind className="h-5 w-5" />}>
                  <p>
                    This research provides a complete framework for enhancing protection and fault location in modern wind 
                    farm collector networks:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                      <strong>Operational reliability:</strong> Accurate fault location enables faster restoration and reduced 
                      downtime
                    </li>
                    <li>
                      <strong>Economic benefit:</strong> Minimizes inspection time and maintenance costs by pinpointing exact 
                      fault locations
                    </li>
                    <li>
                      <strong>Grid integration:</strong> Improves overall wind farm reliability, supporting higher renewable 
                      energy penetration
                    </li>
                    <li>
                      <strong>Scalability:</strong> Methods are applicable to wind farms of various sizes and topologies
                    </li>
                    <li>
                      <strong>Future-proof:</strong> ML approach enables continuous improvement as operational data accumulates
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Published Papers */}
            {active === "papers" && (
              <>
                <SectionCard title="Published Research Papers" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-6">
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-card-fg">
                        Paper 1: Challenges and Recommendations for Enhancing Protection of Onshore Wind Farm Collector Systems
                      </h4>
                      <p className="text-sm text-muted-fg mt-1">
                        <strong>Authors:</strong> Alves Júnior, A. J.; Davi, M. J. B. B.; Jorge, D. C.; Barbosa, D.; 
                        Oleskovicz, M.; Coury, D. V.
                      </p>
                      <p className="text-sm text-muted-fg">
                        <strong>Published in:</strong> Electric Power Systems Research, vol. 250, 112141, 2026
                      </p>
                      <a
                        href="https://doi.org/10.1016/j.epsr.2025.112141"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline mt-2"
                      >
                        View Paper <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-card-fg">
                        Paper 2: An Improved Methodology to Locate Faults in Onshore Wind Farm Collector Systems
                      </h4>
                      <p className="text-sm text-muted-fg mt-1">
                        <strong>Authors:</strong> Davi, M.; Alves Júnior, A.; Grilo, C.; Cunha, T.; Lessa, L.; 
                        Oleskovicz, M.; Coury, D.
                      </p>
                      <p className="text-sm text-muted-fg">
                        <strong>Published in:</strong> Energies, vol. 18, 693, 2025
                      </p>
                      <a
                        href="https://doi.org/10.3390/en18030693"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline mt-2"
                      >
                        View Paper <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-card-fg">
                        Paper 3: Data-Driven Reduction of Fault Location Errors in Onshore Wind Farm Collectors
                      </h4>
                      <p className="text-sm text-muted-fg mt-1">
                        <strong>Authors:</strong> Alves Júnior, A. J.; Davi, M. J. B. B.; Oleskovicz, M.; Coury, D. V.
                      </p>
                      <p className="text-sm text-muted-fg">
                        <strong>Submitted to:</strong> Sustainable Energy, Grids and Networks, 2025
                      </p>
                      <p className="text-sm italic text-muted-fg mt-2">Under review</p>
                    </div>

                    <div className="border-l-4 border-accent/50 pl-4">
                      <h4 className="font-semibold text-card-fg">
                        Paper 4: Analytical Phasor-Based Fault Location Enhancement for Wind Farm Collector Networks
                      </h4>
                      <p className="text-sm text-muted-fg mt-1">
                        <strong>Authors:</strong> Alves Júnior, A. J.; Davi, M. J. B. B.; Coury, D. V.; Oleskovicz, M.
                      </p>
                      <p className="text-sm text-muted-fg">
                        <strong>Submitted to:</strong> IEEE Transactions on Power Systems, 2025
                      </p>
                      <p className="text-sm italic text-muted-fg mt-2">Under review</p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Master's Thesis" icon={<GraduationCap className="h-5 w-5" />}>
                  <h4 className="font-semibold text-card-fg">
                    Enhanced Fault Location Algorithm for Collector Lines of Onshore Wind Power Plants
                  </h4>
                  <p className="text-sm text-muted-fg mt-1">
                    <strong>Author:</strong> Alves Júnior, A. J.
                  </p>
                  <p className="text-sm text-muted-fg">
                    <strong>Institution:</strong> University of São Paulo (USP), 2025
                  </p>
                  <p className="text-sm text-muted-fg mt-2">
                    <strong>Advisor:</strong> Prof. Dr. Denis V. Coury
                  </p>
                  <p className="text-sm text-muted-fg mt-3">
                    This thesis consolidates the three-paper research program, providing comprehensive theoretical background, 
                    detailed methodology, complete results, and practical implementation guidelines for enhanced fault location 
                    in wind farm collector systems.
                  </p>
                </SectionCard>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <button
            onClick={goPrev}
            disabled={flatTopicIds.indexOf(active) === 0}
            className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={goNext}
            disabled={flatTopicIds.indexOf(active) === flatTopicIds.length - 1}
            className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
