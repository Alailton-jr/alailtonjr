import type { Profile, Education, Experience, Project, Publication } from "../types";

export const PROFILE: Profile = {
  name: "Alailton J. Alves Junior",
  headline: "Power Systems Engineer Researcher",
  location: "São Carlos, SP, Brazil",
  email: "alailton.j.a.j@gmail.com",
  phone: "(+55) 34 99916-1286",
  bio: "I am an electrical engineer in power systems with experience spanning protection studies, diagnostics, and system-level prototyping. During my B.S., I carried out the protection study and parametrization for a pressurized underground substation, defining coordination, selectivity margins, and relay settings and verifying performance against operating scenarios. In a second project, I developed and validated partial-discharge diagnostics for underground cables by combining circuit and finite-element models with field measurements, establishing criteria for condition assessment and remaining-life indications. A third project explored a virtualized protection architecture that consolidates multi-vendor relay functions on a single server; I designed the virtual device, implemented core protection logic, and evaluated end-to-end timing and dependability for the proposed topology. In my M.S., I study protection for wind-farm collector systems with inverter-based resources, examining where conventional elements underperform under asymmetric, current-limited injections and outlining scenarios and settings that mitigate misoperations. This work advances an analytical formulation tailored to these systems to improve fault diagnostics and interpretation, integrating it into a broader workflow for evaluation across representative operating conditions.",
  citizenship: "Brazilian",
  languages: "Portuguese (native); English (fluent)",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=vNe3tgIAAAAJ" },
    { label: "GitHub", href: "https://github.com/Alailton-jr" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alailton-alves-b93490190" },
    { label: "ORCID", href: "https://orcid.org/0000-0001-7710-8798" },
  ],
};

export const EDUCATION: Education[] = [
  {
    school: "University of São Paulo",
    degree: "M.S. in Electrical Engineering",
    period: "Jan 2026 (expected)",
    notes: "GPA: 4.0/4.0",
  },
  {
    school: "Federal University of Uberlândia",
    degree: "B.S. in Electrical Engineering",
    period: "2018-2023",
    notes: "Grade: 85/100",
  },
];

export const RESEARCH_EXPERIENCE: Experience[] = [
  {
    org: "University of São Paulo / TotalEnergies Company",
    role: "Fault Location in Onshore Wind Farm Collector Networks Using Artificial Intelligence and Drone Supervision",
    period: "2024-Present",
    bullets: [
      "Designed and benchmarked signal preprocessing pipelines for AI models targeting fault detection, classification, and location.",
      "Built an integrated multi-method framework that combines analytical and data-driven approaches for fault location in wind-farm collectors.",
      "Derived and validated an innovative analytical voltage-compensation term in fault-loop equations to capture inverter-based resource behavior.",
    ],
  },
  {
    org: "Federal University of Uberlândia / Petrobras Brazilian Energy",
    role: "Dielectric Reliability Assessment of Medium-Voltage Cables Using Partial Discharge Analysis and IoT",
    period: "2022-2023",
    bullets: [
      "Assessed reliability of 13.8 kV XLPE cables by analyzing partial-discharge (PD) patterns in lab and field settings.",
      "Co-developed an IoT-based monitoring system for real-time PD activity and insulation-health tracking in cables and joints.",
      "Implemented algorithms to quantify reliability and forecast degradation trends to reduce downtime and interruptions.",
    ],
  },
  {
    org: "Federal University of Uberlândia / Brasilia Energy Company Distribution",
    role: "Pilot Development of New ICT Services and Infrastructure Using Distribution Network Antennas for Smart Grids and IoT",
    period: "2021-2022",
    bullets: [
      "Designed communication-network architecture enabling smart-grid services via IoT and wireless technologies.",
      "Configured and tested IEDs for feeder protection in a digital-substation environment.",
      "Deployed and validated an IEC 61850-based operational network emphasizing QoS, scalability, interference robustness, and optimized duty cycle.",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    org: "University of São Paulo",
    role: "Teaching Assistant — Teaching Improvement Program (PAE)",
    period: "2024-Present",
    location: "São Carlos, Brazil",
    bullets: [
      "Course: SEL0348 – Short-Circuit Calculations (1st semester, 2025).",
      "Course: SEL0354 – Power System Protection (2nd semester, 2025).",
      "Delivered guest lectures and led recitations; prepared problem sets and lab materials; mentored students and supported assessments.",
    ],
  },
  {
    org: "CONPROVE Industry and Commerce",
    role: "Intern in Power System Protection and Software Development",
    period: "2023-2024",
    location: "Uberlândia, Brazil",
    bullets: [
      "Developed software features for power-system relay test sets (.NET, C/C++), including control, automation, and reporting modules.",
      "Designed and validated protection schemes for medium- and high-voltage networks through simulation and bench testing.",
      "Configured and evaluated protection and digital-substation devices with IEC 61850 (GOOSE/SV) in real-time test environments.",
    ],
  },
  {
    org: "Federal University of Uberlândia",
    role: "Teaching Assistant and Tutorial Education Program Scholar",
    period: "2019-2023",
    location: "Uberlândia, Brazil",
    bullets: [
      "Tutorial Education Program in Electrical Engineering (2019-2021): Led the XIX Electrical Engineering Conference (CEEL 2021) as coordinator; organized the XVI Electrical Engineering Journey (JEEL 2019); coordinated the 'Plantão PET' study group (2019–2020); contributed to the 'Basic Electronics and Pre-Circuits' short course (2019).",
      "Teaching Assistant (2019-2023): Courses: Calculus I (2019); Electrical Circuits I (2020–2021); Synchronous Machines (2022–2023). Responsibilities: student help sessions, material preparation, grading support, and lab assistance.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "vied",
    title: "Virtual IED (87L) for IEC 61850",
    summary: "Open‑source vIED implementing line differential protection with SV/GOOSE, running on virtualized servers.",
    tags: ["IEC 61850", "87L", "Virtualization", "C++", "Linux RT"],
    repo: "https://github.com/yourrepo/vied",
  },
  {
    id: "omni-leads",
    title: "Omni Leads — B2B Intelligence",
    summary: "Lead‑scoring platform with geocoding, clustering, and RCA workflows.",
    tags: ["React", "FastAPI", "Postgres", "ML", "Geospatial"],
  },
];

export const SKILLS = {
  description: "I have a solid foundation in electrical engineering with specialized knowledge in power systems engineering. My work spans protection studies and system modeling, advanced signal processing, and software development at both high and low levels. I have also applied machine learning, both classical methods and purpose-built neural network architectures to problem-specific tasks.",
  areas: [
    {
      title: "Power systems",
      items: ["short-circuit/coordination studies", "protection settings and verification", "collector/industrial networks modeling"],
    },
    {
      title: "Signal processing",
      items: ["time–frequency analysis and feature extraction for diagnostics and prognostics", "Fourier, wavelet, Stockwell, and Hilbert-Huang transforms"],
    },
    {
      title: "Software development",
      items: ["real-time/embedded (low level) and research tooling/automation (high level)", "testing and reproducible workflows"],
    },
    {
      title: "Machine learning",
      items: ["classical models (e.g., regression/classification pipelines)", "tailored neural architectures for domain-specific tasks"],
    },
  ],
  technical: [
    { category: "Programming Languages", items: "Python, C/C++, C#, Bash, MATLAB, Java, JavaScript" },
    { category: "Frameworks & Libraries", items: ".NET, React, Angular, Jupyter" },
    { category: "ML & Data Tools", items: "PyTorch, scikit-learn, Pandas, NumPy" },
    { category: "Systems & Dev Tools", items: "Linux, real-time kernel, CMake, Git, Docker" },
    { category: "Networking & Protocols", items: "Network infrastructure; IEC 61850 (GOOSE, Sampled Values)" },
  ],
};

export const PUBLICATIONS: Publication[] = [
  {
    title: "Analytical Phasor-Based Fault Location Enhancement for Wind Farm Collector Networks.",
    authors: "Alves Junior, A. J.; Barbosa, D.; Fernandes, R. A. S.; Coury, D. V.",
    venue: "IEEE Transactions on Sustainable Energy",
    year: "2026",
    volume: "submitted, under review",
    link: "https://arxiv.org/abs/2511.21319",
  },
  {
    title: "Data-Driven Reduction of Fault Location Errors in Onshore Wind Farm Collectors.",
    authors: "Alves Junior, A. J.; Davi, M. J. B. B.; Fernandes, R. A. S.; Oleskovicz, M.; Coury, D. V.",
    venue: "Sustainable Energy, Grids and Networks",
    year: "2026",
    volume: "submitted, under review",
    link: "https://arxiv.org/abs/2511.21300",
  },
  {
    title: "Design and Performance Assessment of a Virtualized IED for Digital Substations.",
    authors: "Alves Junior, A. J.; Coury, D. V.; Fernandes, R. A. S.",
    venue: "IEEE Open Access Journal of Power and Energy",
    year: "2026",
    volume: "submitted, under review",
    link: "https://arxiv.org/abs/2511.21310",
  },
  {
    title: "Challenges and recommendations for enhancing protection of onshore wind farm collector systems.",
    authors: "Alves Junior, A. J.; Davi, M. J. B. B.; Jorge, D. C.; Barbosa, D.; Oleskovicz, M.; Coury, D. V.",
    venue: "Electric Power Systems Research",
    year: "2026",
    volume: "250, 112141",
    link: "https://doi.org/10.1016/j.epsr.2025.112141",
  },
  {
    title: "An Improved Methodology to Locate Faults in Onshore Wind Farm Collector Systems.",
    authors: "Davi, M.; Alves Junior, A.; Grilo, C.; Cunha, T.; Lessa, L.; Oleskovicz, M.; Coury, D.",
    venue: "Energies",
    year: "2025",
    volume: "18, 693",
    link: "https://doi.org/10.3390/en18030693",
  },
];

export const PROCEEDINGS: Publication[] = [
  {
    title: "Differential Line Protection with Virtual IEDs in IEC 61850 Substations: Implementation and Evaluation.",
    authors: "Alves Junior, A. J.; Coury, D. V.; Barbosa, D.; Fernandes, R. A. S.",
    venue: "XXVIII National Seminar on Generation and Transmission of Electric Energy",
    year: "2025",
    link: "https://drive.google.com/file/d/1nk85HSdGyIk3nuOGnNcgQwEcXzZwIFx9/view?usp=share_link",
  },
  {
    title: "Virtualization of Protection and Control in Digital Substations: Development and Evaluation of an IED for Centralized PAC Architectures.",
    authors: "Alves Junior, A. J.; Coury, D. V.; Fernandes, R. A. S.; Petrônio, A. P.",
    venue: "XVII Technical Seminar on Protection and Control (STPC)",
    year: "2024",
    link: "https://drive.google.com/file/d/15LPN2itiAK6qmauxnLrCV9u1uYBSpGPa/view?usp=share_link",
  },
  {
    title: "Virtual Test Tool for Centralized Protection & Control Systems — IEC 61850.",
    authors: "Alves Junior, A. J.; Pinheiro, A. P.; Moura, F. A. M.; Duarte, L. J.; Bernardes, G. M.; Melo, D. B.; Souza Junior, F. R.; Domingos, A. C.; Santos, R. S.",
    venue: "XXII Conference on Studies in Electrical Engineering",
    year: "2023",
    volume: "vol. 22",
    link: "https://www.peteletricaufu.com.br/static/ceel/artigos/artigo_810.pdf",
  },
  {
    title: "Binarization Algorithm for QR Code Images under Nonuniform Illumination.",
    authors: "Alves Junior, A. J.; Medeiros, L. X.; Mateus, A. C.; Costa, A. L. A.",
    venue: "Conference on Studies in Electrical Engineering",
    year: "2022",
    link: "https://www.peteletricaufu.com.br/static/ceel/artigos/artigo_705.pdf",
  },
  {
    title: "Development of a Distributed IoT Middleware with a Focus on Smart Grids.",
    authors: "Maciel, M. S.; Pinheiro, A. P.; Ferreira, D. O.; Alves, A. J.",
    venue: "XL Brazilian Symposium on Telecommunications and Signal Processing",
    year: "2022",
    link: "https://biblioteca.sbrt.org.br/articles/3712",
  },
];

export const THESES: Publication[] = [
  {
    title: "Enhanced Fault Location Algorithm for Collector Lines of Onshore Wind Power Plants.",
    authors: "Alves Junior, A. J.",
    venue: "Master's Dissertation, University of São Paulo",
    year: "2025",
  },
];

export const AWARDS = [
  {
    title: "NASA Space Apps Challenge",
    description: "Best Use of Technology Award",
    year: "Fall 2024",
    link: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/42-quakeheroes/",
  },
];
