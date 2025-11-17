import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Zap,
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
  Server,
  Network,
  Lock,
  Cpu,
  GitBranch,
  GraduationCap,
  Shield,
} from "lucide-react";

export const projectMeta = {
  id: "vied",
  title: "Virtual IED (87L) for IEC 61850 Digital Substations",
  summary:
    "Open-source virtualized Intelligent Electronic Device implementing comprehensive protection functions including line differential protection (ANSI 87L) with SV/GOOSE protocols on centralized servers.",
  tags: ["IEC 61850", "87L", "Virtualization", "Protection", "Digital Substation", "Real-Time"],
};

type TopicItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TopicItem[];
};

const TOPICS: TopicItem[] = [
  { id: "intro", label: "Introduction", icon: <BookOpen className="h-4 w-4" /> },
  { id: "problem", label: "The Challenge", icon: <AlertTriangle className="h-4 w-4" /> },
  {
    id: "approaches",
    label: "Solution Approaches",
    icon: <Target className="h-4 w-4" />,
    children: [
      { id: "approach1", label: "vIED Architecture & Functions" },
      { id: "approach2", label: "Line Differential Protection (87L)" },
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

export default function VIEDProjectPage() {
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
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        active === topic.id
                          ? "bg-muted/70 text-foreground font-medium"
                          : "text-muted-fg hover:bg-muted/60"
                      }`}
                    >
                      <span>{topic.icon}</span>
                      <span className="text-sm">{topic.label}</span>
                    </button>
                    {topic.children && (
                      <ul className="mt-1 pl-9 space-y-1">
                        {topic.children.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => {
                                setActive(child.id);
                                setOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-md transition-colors text-xs ${
                                active === child.id
                                  ? "bg-muted/70 text-foreground font-medium"
                                  : "text-muted-fg hover:bg-muted/60"
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
      <main className="flex-1 space-y-6">
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
            className="space-y-6"
          >
            {/* Introduction */}
            {active === "intro" && (
              <>
                <SectionCard title="Research Overview" icon={<Server className="h-5 w-5" />}>
                  <p>
                    This research addresses the transformation of power system protection through the virtualization of 
                    Intelligent Electronic Devices (IEDs) in digital substations. As substations transition from traditional 
                    copper-wired connections to fiber-optic communication and IEC 61850-compliant devices, virtualization 
                    emerges as a cost-effective solution offering scalability, simplified maintenance, and enhanced flexibility.
                  </p>
                  <p className="mt-3">
                    Virtual IEDs (vIEDs) represent a paradigm shift from hardware-dedicated protection systems to software-defined 
                    architectures. By replicating IED functionality on general-purpose servers using virtual machines or containers, 
                    vIEDs provide equivalent protection capabilities while enabling rapid deployment, flexible updates, and 
                    significant cost reductions compared to physical hardware.
                  </p>
                </SectionCard>

                <SectionCard title="Published Research" icon={<FileText className="h-5 w-5" />}>
                  <p>This work is documented in two peer-reviewed publications:</p>
                  <ol className="list-decimal list-inside space-y-2 mt-3 text-sm">
                    <li>
                      <strong>Alves Júnior, A. J.; Fernandes, R. A. S.; Coury, D. V.</strong> 
                      Development and Performance Evaluation of a Virtualized IED for Digital Substation Applications. 
                      <em>IEEE Open Access Journal of Power and Energy</em>, submitted, under review, 2026.
                    </li>
                    <li>
                      <strong>Alves Júnior, A. J.; Coury, D. V.; Barbosa, D.; Fernandes, R. A. S.</strong> 
                      Differential Line Protection with Virtual IEDs in IEC 61850 Substations: Implementation and Evaluation. 
                      <em>XXVIII National Seminar on Generation and Transmission of Electric Energy</em>, 2025.
                    </li>
                  </ol>
                </SectionCard>

                <SectionCard title="Research Context" icon={<GraduationCap className="h-5 w-5" />}>
                  <p>
                    This work was developed at the University of São Paulo (USP) as part of research into modernizing 
                    power system protection and control. The vIED was implemented as open-source software, providing 
                    a transparent and adaptable platform for digital substation applications.
                  </p>
                  <p className="mt-3">
                    The research validates vIED performance through extensive real-time simulations, focusing on 
                    protection response times, communication delays, and system reliability. The implementation includes 
                    comprehensive protection functions (ANSI 50/51/21/67/27/59) and specialized line differential 
                    protection (ANSI 87L), all compliant with IEC 61850 standards.
                  </p>
                </SectionCard>
              </>
            )}

            {/* The Problem */}
            {active === "problem" && (
              <>
                <SectionCard title="The Challenge" icon={<AlertTriangle className="h-5 w-5" />}>
                  <p>
                    While digital substations based on IEC 61850 offer significant advantages over traditional systems, 
                    the transition presents several critical challenges that impact cost, flexibility, and long-term viability:
                  </p>
                </SectionCard>

                <SectionCard title="1. High Costs and Complex Networks" icon={<Network className="h-5 w-5" />}>
                  <p>
                    Physical IEDs are expensive, specialized hardware devices that require:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>High initial capital investment</strong> per device</li>
                    <li>Complex communication networks with dedicated infrastructure</li>
                    <li>Specialized engineering expertise for installation and maintenance</li>
                    <li>Extensive spare parts inventory for critical equipment</li>
                    <li>Long procurement and delivery cycles</li>
                  </ul>
                  <p className="mt-3">
                    These factors significantly increase both capital expenditure (CAPEX) and operational expenditure (OPEX), 
                    making system expansion and modernization prohibitively expensive for many utilities.
                  </p>
                </SectionCard>

                <SectionCard title="2. Limited Upgradeability and Flexibility" icon={<Cpu className="h-5 w-5" />}>
                  <p>
                    Physical IEDs face inherent limitations in their lifecycle management:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Hardware-software coupling:</strong> Firmware updates constrained by hardware capabilities</li>
                    <li><strong>Obsolescence risk:</strong> Devices become outdated while infrastructure remains functional</li>
                    <li><strong>Rigid expansion:</strong> Adding new functions requires purchasing additional hardware</li>
                    <li><strong>Long development cycles:</strong> Hardware-software compatibility issues delay improvements</li>
                    <li><strong>Difficult rollback:</strong> Firmware updates risk permanent device failure</li>
                  </ul>
                  <p className="mt-3">
                    This lack of flexibility creates operational bottlenecks, as utilities cannot rapidly adapt protection 
                    schemes to evolving grid requirements or integrate new protection algorithms without hardware replacement.
                  </p>
                </SectionCard>

                <SectionCard title="3. Performance and Reliability Requirements" icon={<Zap className="h-5 w-5" />}>
                  <p>
                    Transitioning to virtualized systems introduces new technical challenges:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Deterministic timing:</strong> Protection functions require predictable, bounded response times</li>
                    <li><strong>Real-time guarantees:</strong> Shared computing resources must not compromise protection speed</li>
                    <li><strong>Communication latency:</strong> Network delays in SV/GOOSE messaging must remain within limits</li>
                    <li><strong>Time synchronization:</strong> Precise alignment (sub-microsecond) across distributed functions</li>
                    <li><strong>System reliability:</strong> Virtualization infrastructure must match physical IED robustness</li>
                  </ul>
                  <p className="mt-3">
                    Virtual systems must demonstrate that they can match or exceed physical IED performance while maintaining 
                    the deterministic behavior essential for power system protection.
                  </p>
                </SectionCard>

                <SectionCard title="4. Security and Centralization Risks" icon={<Lock className="h-5 w-5" />}>
                  <p>
                    Centralized virtualized architectures introduce new vulnerability vectors:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Expanded attack surface:</strong> Hypervisor, host OS, and orchestration layers create new entry points</li>
                    <li><strong>Single point of failure:</strong> Multiple vIEDs on one server amplifies impact of compromise</li>
                    <li><strong>Station bus vulnerabilities:</strong> TCP/IP and MMS protocols are well-understood attack vectors</li>
                    <li><strong>Configuration attacks:</strong> Malicious updates could alter protection settings across multiple functions</li>
                    <li><strong>SDN controller risks:</strong> Compromising network control affects entire substation communication</li>
                  </ul>
                  <p className="mt-3">
                    Robust defense-in-depth security architectures are essential, including micro-segmentation, continuous 
                    monitoring, IEC 61850-aware intrusion detection, and redundant virtualization layers with automatic failover.
                  </p>
                </SectionCard>
              </>
            )}

            {/* Approach 1: vIED Architecture */}
            {active === "approach1" && (
              <>
                <SectionCard 
                  title="Approach 1: vIED Architecture and Protection Functions" 
                  icon={<Server className="h-5 w-5" />}
                  subtitle="Submitted to IEEE Open Access Journal of Power and Energy (2026)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Alves Júnior, A. J.; Oleskovicz, M.; Coury, D. V.; 
                      Development and Performance Evaluation of a Virtualized IED for Digital Substation Applications; 
                      <em>IEEE Open Access Journal of Power and Energy</em>, submitted, under review, 2026.
                    </p>
                  </div>
                  <p>
                    This work presents the comprehensive design and implementation of an open-source vIED that replicates 
                    the complete functionality of physical IEDs. The architecture was developed to demonstrate that 
                    software-based protection can achieve performance comparable to dedicated hardware while providing 
                    significantly enhanced flexibility and scalability.
                  </p>
                </SectionCard>

                <SectionCard title="Software Architecture" icon={<Layers className="h-5 w-5" />}>
                  <p>The vIED architecture consists of four main modules:</p>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">1. General Purpose Control Module</h4>
                      <p>
                        Manages overall vIED operations and handles communication with the <strong>Station Bus</strong> via TCP/IP. 
                        Provides system configuration interface (using MMS/IEC 61850-8-1) and real-time monitoring capabilities. 
                        Serves as the primary interface for operators and SCADA systems.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">2. Process Bus Interface Module</h4>
                      <p>
                        Interfaces with the <strong>Process Bus</strong> for time-critical protection data:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>SV subscriber:</strong> Decodes Sampled Values (IEC 61850-9-2) streams containing raw voltage/current samples</li>
                        <li><strong>GOOSE subscriber:</strong> Processes Generic Object Oriented Substation Events for binary input signals</li>
                        <li><strong>GOOSE publisher:</strong> Transmits trip commands, pickup signals, and status information</li>
                        <li><strong>Low-level implementation:</strong> Custom protocol handler with direct NIC access bypassing kernel network stack for minimal latency</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">3. Data Processing Module</h4>
                      <p>
                        Performs signal conditioning and measurement extraction:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>Frequency tracking:</strong> SOGI-FLL (Second-Order Generalized Integrator Frequency-Locked Loop) continuously monitors system frequency (40-70 Hz range)</li>
                        <li><strong>Phasor estimation:</strong> Nonlinear Kalman filter extracts magnitude and phase angle from SV samples, with noise suppression and dynamic tracking</li>
                        <li><strong>Alternative estimators:</strong> Cosine filter option for different computational trade-offs</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">4. Protection Algorithms Module</h4>
                      <p>
                        Implements comprehensive protection functions:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>ANSI 50/51 (PIOC/PTOC):</strong> Instantaneous and time-delayed overcurrent protection</li>
                        <li><strong>ANSI 21 (PDIS):</strong> Distance protection with impedance, admittance, reactance, and quadrilateral zones</li>
                        <li><strong>ANSI 67 (PDIR):</strong> Directional overcurrent protection</li>
                        <li><strong>ANSI 27/59 (PTUV/PTOV):</strong> Under/overvoltage protection</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Virtualization Infrastructure" icon={<Cpu className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Hypervisor: KVM (Kernel-based Virtual Machine)</h4>
                      <p>
                        KVM with hardware-assisted virtualization (Intel VT-x/AMD-V) provides near-native performance. 
                        Each vIED runs in its own isolated VM with dedicated resources.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Real-Time Linux Kernel (PREEMPT_RT)</h4>
                      <p>
                        Critical for deterministic timing and bounded latency:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>CPU pinning/affinity:</strong> Dedicated cores for protection threads with no process migration</li>
                        <li><strong>IRQ isolation:</strong> Interrupt requests assigned to fixed CPUs to prevent interference</li>
                        <li><strong>Priority scheduling:</strong> Real-time priority for time-sensitive tasks (packet I/O, phasor estimation, protection logic)</li>
                        <li><strong>Kernel parameters:</strong> nohz_full, rcu_nocbs for core isolation; hugepages for predictable memory latency</li>
                        <li><strong>I/O scheduler tuning:</strong> Minimize network stack variability</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Network Architecture: Open vSwitch (OvS)</h4>
                      <p>
                        Two virtual bridges emulate digital substation communication:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>Process Bus bridge:</strong> High-priority SV/GOOSE traffic with QoS enforcement</li>
                        <li><strong>Station Bus bridge:</strong> TCP/IP, MMS, monitoring data (lower priority)</li>
                        <li><strong>VLAN segmentation:</strong> Traffic isolation and priority queuing</li>
                        <li><strong>Optional SR-IOV:</strong> Virtual Functions for direct NIC access bypassing virtual switch</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Time Synchronization: PTP (IEEE 1588)</h4>
                      <p>
                        Precise time alignment using IEC 61850-9-3 Power Utility Profile:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>Hardware timestamping:</strong> NIC-level timestamping for sub-microsecond accuracy</li>
                        <li><strong>ptp_kvm driver:</strong> VMs access host's high-precision clock directly</li>
                        <li><strong>chrony synchronization:</strong> Each VM maintains alignment with host time source</li>
                        <li><strong>Common time base:</strong> Ensures consistent SV sample counters and GOOSE timestamps</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Key Results" icon={<CheckCircle className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Demonstrated Performance</h4>
                      <ul className="space-y-1">
                        <li>
                          <strong>Acceptable response times</strong> for all protection functions, validating suitability for 
                          time-sensitive digital substation applications
                        </li>
                        <li>Deterministic behavior achieved through RT-Linux optimizations</li>
                        <li>Successful IEC 61850 compliance for both Process Bus (SV/GOOSE) and Station Bus (MMS) protocols</li>
                        <li>Robust phasor estimation under dynamic conditions and measurement noise</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Practical Viability</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Open-source implementation:</strong> Transparent, auditable, and customizable platform</li>
                        <li><strong>Scalability:</strong> Multiple vIED instances on single server, easy horizontal scaling</li>
                        <li><strong>Rapid deployment:</strong> Software updates without hardware replacement</li>
                        <li><strong>Cost reduction:</strong> Eliminates dedicated IED hardware for each protection function</li>
                        <li><strong>Flexible lifecycle management:</strong> Independent testing, blue-green deployments, canary releases</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Innovation Highlights" icon={<Zap className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>First comprehensive open-source vIED</strong> providing complete physical IED functionality replication
                    </li>
                    <li>
                      Integration of advanced signal processing (SOGI-FLL, nonlinear Kalman filtering) in virtualized environment
                    </li>
                    <li>
                      Custom low-level Process Bus interface achieving minimal latency through direct NIC access
                    </li>
                    <li>
                      Practical demonstration of real-time virtualization techniques (CPU pinning, IRQ isolation, PREEMPT_RT kernel)
                    </li>
                    <li>
                      Comprehensive protection algorithm suite (6 ANSI functions) validated through real-time simulations
                    </li>
                    <li>
                      Framework for future research in virtualized protection, edge computing, and SDN integration
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Approach 2: Line Differential Protection */}
            {active === "approach2" && (
              <>
                <SectionCard 
                  title="Approach 2: Line Differential Protection (ANSI 87L) Implementation" 
                  icon={<Shield className="h-5 w-5" />}
                  subtitle="XXVIII National Seminar on Generation and Transmission of Electric Energy (2025)"
                >
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-fg">
                      <strong>Reference:</strong> Alves Júnior, A. J.; Coury, D. V.; Barbosa, D.; Fernandes, R. A. S.; 
                      Differential Line Protection with Virtual IEDs in IEC 61850 Substations: Implementation and Evaluation; 
                      <em>XXVIII National Seminar on Generation and Transmission of Electric Energy</em>, 2025.
                    </p>
                  </div>
                  <p>
                    Building on the general vIED architecture, this work focuses specifically on implementing and validating 
                    <strong> line differential protection (ANSI 87L)</strong> using two synchronized virtual IEDs. This is one of 
                    the most selective protection schemes for transmission lines, and its successful virtualization demonstrates 
                    that complex, multi-terminal protection can operate reliably in software-defined environments.
                  </p>
                </SectionCard>

                <SectionCard title="87L Protection Principle" icon={<GitBranch className="h-5 w-5" />}>
                  <p>
                    Line differential protection operates on the <strong>current continuity principle</strong>: under normal 
                    conditions or external faults, the phasor sum of currents entering and leaving the protected line is nearly zero. 
                    An internal fault creates a significant differential current that triggers protection.
                  </p>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Differential Current Calculation</h4>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
I⃗_diff,φ = I⃗_local,φ + I⃗_remote,φ

Where:
  I⃗_local,φ  = Local terminal phasor (phase φ)
  I⃗_remote,φ = Remote terminal phasor (phase φ)
                      </pre>
                      <p className="mt-2">
                        Under normal/external fault: <strong>I⃗_diff,φ ≈ 0</strong><br />
                        Under internal fault: <strong>|I⃗_diff,φ| &gt; I_pickup</strong>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Alpha-Plane Restraint Method</h4>
                      <p>
                        To prevent false trips from measurement errors or CT saturation, the algorithm uses a directional 
                        restraint based on the complex current ratio:
                      </p>
                      <pre className="bg-muted p-3 rounded-lg mt-2 text-xs overflow-x-auto">
k = |I⃗_remote,φ| / |I⃗_local,φ|
                      </pre>
                      <p className="mt-2">
                        The alpha-plane plots <em>k</em> in complex space. A restraint region (defined by radius <em>r</em> and 
                        angle <em>θ</em>) blocks trips for conditions that appear as external faults or measurement errors. 
                        The relay trips only when:
                      </p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li>Differential current exceeds pickup threshold</li>
                        <li>Operating point <em>k</em> lies outside the restraint region</li>
                        <li>Both conditions persist for configured delay period</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Methodology" icon={<FileText className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Two synchronized vIEDs:</strong> Deployed on a single physical server using separate VMs, 
                      emulating local and remote terminals of a transmission line
                    </li>
                    <li>
                      <strong>Real-time PSCAD simulations:</strong> Electromagnetic transient simulations of transmission line 
                      with fault injection at various locations
                    </li>
                    <li>
                      <strong>SV streaming:</strong> Sampled Values generated from PSCAD fed to both vIEDs via Process Bus, 
                      simulating actual digital substation data flow
                    </li>
                    <li>
                      <strong>GOOSE messaging:</strong> vIEDs exchange differential current information and trip signals using 
                      IEC 61850 GOOSE protocol over virtual network
                    </li>
                    <li>
                      <strong>PTP synchronization:</strong> Both VMs synchronized to common host clock using ptp_kvm, ensuring 
                      time-aligned phasor comparison
                    </li>
                    <li>
                      <strong>Parametric testing:</strong> Multiple fault scenarios including varied fault locations, fault 
                      resistances, and fault types (phase-to-ground, phase-to-phase, three-phase)
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Key Results" icon={<BarChart3 className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Outstanding 87L Performance</h4>
                      <ul className="space-y-1">
                        <li>
                          <strong>Average delay: 1 cycle (~16.7 ms @ 60 Hz)</strong> from fault inception to trip signal
                        </li>
                        <li>
                          <strong>Maximum delay: 2.6 cycles (~43.3 ms)</strong> in worst-case scenarios
                        </li>
                        <li>
                          Performance <strong>comparable to physical IEDs</strong>, meeting industry standards for pilot 
                          protection schemes
                        </li>
                        <li>
                          Successful operation across all tested fault locations and resistances
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Communication and Synchronization</h4>
                      <p>Critical factors for multi-terminal protection validated:</p>
                      <ul className="list-disc list-inside mt-1 ml-4">
                        <li><strong>GOOSE latency:</strong> Consistently low inter-vIED message delays within virtual network</li>
                        <li><strong>PTP accuracy:</strong> Sub-microsecond time synchronization maintained between VMs</li>
                        <li><strong>Phasor alignment:</strong> Accurate differential current calculation despite virtualized environment</li>
                        <li><strong>No false trips:</strong> Alpha-plane restraint correctly discriminates internal vs. external faults</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Scalability and Flexibility Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Single server hosts both terminal vIEDs, dramatically reducing hardware footprint</li>
                        <li>Easy replication: additional line sections protected by deploying new VM instances</li>
                        <li>Rapid testing: protection settings adjusted and tested without hardware reconfiguration</li>
                        <li>Software updates deployed simultaneously to all vIED instances</li>
                        <li>Simplified redundancy: backup VMs can be hot-standby on secondary server</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Innovation Highlights" icon={<Shield className="h-5 w-5" />}>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>First demonstration</strong> of fully virtualized line differential protection (87L) achieving 
                      physical-IED-comparable performance
                    </li>
                    <li>
                      Validation of complex, multi-terminal protection algorithms in software-defined architecture
                    </li>
                    <li>
                      Proof that precise time synchronization and low-latency communication can be maintained in virtualized 
                      environments
                    </li>
                    <li>
                      Alpha-plane differential algorithm successfully implemented with GOOSE-based data exchange
                    </li>
                    <li>
                      Demonstrates practical feasibility of centralized protection architecture for transmission networks
                    </li>
                    <li>
                      Opens pathway for advanced protection schemes (adaptive settings, machine learning integration) 
                      leveraging centralized computing resources
                    </li>
                  </ul>
                </SectionCard>
              </>
            )}

            {/* Results */}
            {active === "results" && (
              <>
                <SectionCard title="Overall Impact and Contributions" icon={<Target className="h-5 w-5" />}>
                  <p>
                    The two-paper research program demonstrates the technical and practical viability of virtualized 
                    protection systems for digital substations:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="border-l-4 border-accent/50 pl-4">
                      <h4 className="font-semibold text-accent">Paper 1: Foundational vIED Architecture</h4>
                      <p className="text-sm mt-1">
                        Complete open-source implementation of IED functionality
                        <br />
                        <span className="text-xs text-muted-fg">
                          6 protection functions | Real-time performance | IEC 61850 compliance
                        </span>
                      </p>
                    </div>

                    <div className="border-l-4 border-accent pl-4 bg-accent/5 -ml-4 pl-8 py-2">
                      <h4 className="font-semibold text-accent">Paper 2: Advanced Multi-Terminal Protection</h4>
                      <p className="text-sm mt-1">
                        87L differential protection: 1 cycle average, 2.6 cycles maximum delay
                        <br />
                        <span className="text-xs text-muted-fg">
                          Performance matching physical IEDs | Validated synchronization and communication
                        </span>
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Key Contributions to the Field" icon={<CheckCircle className="h-5 w-5" />}>
                  <ul className="list-decimal list-inside space-y-2">
                    <li>
                      <strong>First comprehensive open-source vIED</strong> demonstrating full physical IED functionality in 
                      virtualized environment
                    </li>
                    <li>
                      <strong>Validation of real-time protection</strong> using virtualization, RT-Linux, and optimized networking
                    </li>
                    <li>
                      <strong>Successful multi-terminal protection</strong> (87L) with GOOSE-based communication and PTP synchronization
                    </li>
                    <li>
                      <strong>Practical implementation guidelines</strong> for achieving deterministic performance in virtual environments
                    </li>
                    <li>
                      <strong>Framework for future research</strong> in virtualized protection, SDN integration, and edge computing
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Real-World Benefits" icon={<Server className="h-5 w-5" />}>
                  <p>
                    This research provides utilities with a validated path toward modernized, flexible protection systems:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2">
                    <li>
                      <strong>Cost reduction:</strong> Eliminate dedicated hardware for each protection function; consolidate 
                      multiple IEDs onto centralized servers
                    </li>
                    <li>
                      <strong>Scalability:</strong> Add new protection zones or functions by deploying software instances rather 
                      than procuring hardware
                    </li>
                    <li>
                      <strong>Flexibility:</strong> Rapid testing and deployment of new algorithms; easy integration of advanced 
                      features (machine learning, adaptive protection)
                    </li>
                    <li>
                      <strong>Lifecycle management:</strong> Software updates without hardware replacement; blue-green deployments 
                      minimize risk and downtime
                    </li>
                    <li>
                      <strong>Standardization:</strong> Open-source platform enables industry-wide collaboration and transparent 
                      algorithm validation
                    </li>
                    <li>
                      <strong>Future-proofing:</strong> Software-defined approach adapts to evolving grid requirements without 
                      costly infrastructure overhauls
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Challenges and Future Directions" icon={<Brain className="h-5 w-5" />}>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Remaining Challenges</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Cybersecurity: Expanded attack surface requires robust defense-in-depth strategies</li>
                        <li>Redundancy: High-availability architectures needed for mission-critical applications</li>
                        <li>Standardization: Industry-wide protocols for vIED deployment and certification</li>
                        <li>Legacy integration: Bridging virtualized systems with existing physical infrastructure</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-fg mb-1">Future Research Directions</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Integration with edge computing and cloud-based protection coordination</li>
                        <li>Machine learning algorithms leveraging centralized computational resources</li>
                        <li>SDN-based dynamic network reconfiguration for adaptive protection schemes</li>
                        <li>Container-based deployment (Docker/Kubernetes) for enhanced orchestration</li>
                        <li>Wide-area protection applications using distributed vIED networks</li>
                        <li>Real-world pilot deployments in operational substations</li>
                      </ul>
                    </div>
                  </div>
                </SectionCard>
              </>
            )}

            {/* Published Papers */}
            {active === "papers" && (
              <>
                <SectionCard title="Published Research Papers" icon={<FileText className="h-5 w-5" />}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-card-fg mb-2">
                        1. Development and Performance Evaluation of a Virtualized IED for Digital Substation Applications
                      </h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Authors:</strong> Alves Júnior, A. J.; Oleskovicz, M.; Coury, D. V.
                        </p>
                        <p>
                          <strong>Venue:</strong> IEEE Open Access Journal of Power and Energy
                        </p>
                        <p>
                          <strong>Year:</strong> 2026 (submitted, under review)
                        </p>
                        <p className="mt-3">
                          <strong>Abstract:</strong> This paper develops, implements, and evaluates a virtualized IED 
                          designed to match the performance of hardware-based counterparts. The vIED was deployed on a 
                          server using virtual machines, with core logic implemented in low-level programming languages 
                          to ensure high-speed, deterministic behavior. Performance was evaluated using real-time simulations, 
                          focusing on protection function response times. Results demonstrated that vIEDs achieved acceptable 
                          response times, validating their suitability for deployment in critical time-sensitive environments.
                        </p>
                        <p className="mt-3">
                          <strong>Key Contributions:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4">
                          <li>Open-source vIED implementation with complete IED functionality</li>
                          <li>Integration of 6 ANSI protection functions (50/51/21/67/27/59)</li>
                          <li>Advanced signal processing: SOGI-FLL frequency tracking and nonlinear Kalman phasor estimation</li>
                          <li>Custom low-latency Process Bus interface with direct NIC access</li>
                          <li>Real-time Linux optimizations: CPU pinning, IRQ isolation, PREEMPT_RT kernel</li>
                          <li>Performance validation through extensive real-time simulations</li>
                        </ul>
                      </div>
                    </div>

                    <Divider />

                    <div>
                      <h3 className="text-lg font-semibold text-card-fg mb-2">
                        2. Differential Line Protection with Virtual IEDs in IEC 61850 Substations: Implementation and Evaluation
                      </h3>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Authors:</strong> Alves Júnior, A. J.; Coury, D. V.; Barbosa, D.; Fernandes, R. A. S.
                        </p>
                        <p>
                          <strong>Venue:</strong> XXVIII National Seminar on Generation and Transmission of Electric Energy
                        </p>
                        <p>
                          <strong>Year:</strong> 2025
                        </p>
                        <p className="mt-3">
                          <strong>Abstract:</strong> This work evaluates virtual IEDs for line differential protection (ANSI 87L) 
                          in IEC 61850 digital substations. The study describes the development of an open-source software architecture 
                          replicating conventional IED functions, focusing on differential protection algorithms, synchronization between 
                          two virtual devices, and analysis of response/trip-signal delays during faults. Simulations of a transmission 
                          line with measurements at both terminals and multiple fault scenarios demonstrated that virtualized devices 
                          achieved performance comparable to conventional IEDs, with an average delay of one cycle and a maximum of 
                          2.6 cycles.
                        </p>
                        <p className="mt-3">
                          <strong>Key Contributions:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4">
                          <li>First demonstration of fully virtualized 87L differential protection</li>
                          <li>Alpha-plane restraint method implementation with GOOSE-based data exchange</li>
                          <li>Two synchronized vIEDs on single server, emulating local and remote terminals</li>
                          <li>PTP synchronization achieving sub-microsecond time alignment between VMs</li>
                          <li>Comprehensive fault testing: varied locations, resistances, and fault types</li>
                          <li>1-cycle average / 2.6-cycle maximum trip delay validation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Related Conference Papers" icon={<GraduationCap className="h-5 w-5" />}>
                  <p className="mb-3">
                    Additional work supporting the vIED research program:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                      <strong>Virtualization of Protection and Control in Digital Substations: Development and Evaluation of 
                      an IED for Centralized PAC Architectures</strong>
                      <div className="text-muted-fg">
                        Alves Júnior, A. J.; Coury, D. V.; Fernandes, R. A. S.; Petrônio, A. P.<br />
                        XVII Technical Seminar on Protection and Control (STPC), 2024
                      </div>
                    </li>
                  </ul>
                </SectionCard>

                <SectionCard title="Open Source and Collaboration" icon={<ExternalLink className="h-5 w-5" />}>
                  <p>
                    The vIED implementation is developed as open-source software, promoting transparency, reproducibility, 
                    and collaboration within the power systems protection community. This approach enables:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>Independent verification and validation of protection algorithms</li>
                    <li>Community-driven enhancements and bug fixes</li>
                    <li>Educational use in university courses and research programs</li>
                    <li>Accelerated adoption through reduced licensing costs and vendor lock-in</li>
                    <li>Foundation for standardized vIED frameworks and certification processes</li>
                  </ul>
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
