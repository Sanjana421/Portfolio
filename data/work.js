export const work = [
  {
    id: '01',
    featured: true,
    title: 'DistVRT v5',
    org: 'IU Regional Academic Health Center · CARES Lab',
    subtitle: 'Real-Time Audio Research Platform',
    tags: ['Python', 'PySide6/Qt', 'React', 'sounddevice', 'scipy.signal', 'Canvas API'],
    description:
      'Full data collection and processing platform for the Children\'s Auditory Research for Educational Success lab. Built end-to-end: real-time full-duplex audio engine with hardware-level SPL calibration, IIR-filtered pink noise, and stereo ear routing — plus a dual-screen PySide6/Qt GUI and a separate React scoring application with a custom Canvas waveform viewer, blinded reviewer assignment, and inter-rater reliability tracking.',
    impact: [
      '↓60% analysis turnaround time from audio automation',
      '↓35% preprocessing time via modular Python + SQL pipelines',
      '300+ human-subject records processed through production system',
    ],
    link: null,
    github: null,
  },
  {
    id: '02',
    featured: false,
    title: 'Heartland Community Network',
    org: 'Senior Analytics Consultant · Jan 2026 – Present',
    subtitle: 'Canonical Metric Dictionary & Power BI Infrastructure',
    tags: ['Python', 'SQL', 'Power BI', 'DAX', 'Power Query'],
    description:
      'Built the canonical metric dictionary across 3 reporting platforms, aligning marketing, operations, and executives through cross-functional sessions. Eliminated the weekly manual reconciliation cycle. Surfaced previously undetected anomalies via automated quality validation and SQL optimization.',
    impact: [
      '↑30% downstream reporting accuracy',
      'Eliminated weekly manual reconciliation across 3 platforms',
      'Executive reporting shifted from reactive to real-time Power BI',
    ],
    link: null,
    github: null,
  },
  {
    id: '03',
    featured: false,
    title: 'fMRI Neuroimaging Pipelines',
    org: 'Indiana University · Cognitive Neuroscience Lab',
    subtitle: 'HPC Preprocessing & Silent Failure QC',
    tags: ['fMRIPrep', 'FreeSurfer', 'SLURM', 'Apptainer', 'BIDS', 'Bash'],
    description:
      'Runs fMRIPrep preprocessing pipelines on BIDS-formatted MRI/fMRI datasets via Apptainer on IU\'s Quartz HPC cluster and BigRed200. Specialist in catching silent failures — cases where the pipeline completes cleanly with no errors but produces subtly incorrect output invisible in automated visual QC reports.',
    impact: [
      'Caught critical FOV cropping defect invisible in automated visual reports',
      'Traced failure through fMRIPrep → sMRIPrep → FreeSurfer conform step',
      'Automated SLURM job submissions across Quartz and BigRed200',
    ],
    link: null,
    github: null,
  },
  {
    id: '04',
    featured: false,
    title: 'GeoAI · LiDAR Disaster Response',
    org: 'IU Luddy School of Informatics · Jun – Dec 2025',
    subtitle: '3D Point Cloud Labeling for Disaster AI',
    tags: ['SAM2', 'SAM2Point', 'LiDAR', 'Python', 'QGIS', 'GIS Analytics'],
    description:
      'Engineered 3D LiDAR point cloud datasets for disaster response AI research. Semantic labeling of fallen trees, debris, road segments, flood water, fire scars, and smoke across aerial imagery and LiDAR using SAM2 and SAM2Point foundation models in the lab\'s in-house 3D annotation tool.',
    impact: [
      '↑70% dataset consistency and assessment precision',
      'Scalar field engineering with GIS-based quality validation',
      'Datasets used to train foundation models for real disaster scenarios',
    ],
    link: null,
    github: null,
  },
  {
    id: '05',
    featured: false,
    title: 'FiReco',
    org: 'Self-Directed Research Project',
    subtitle: 'Financial Recommendation Platform',
    tags: ['FastAPI', 'Streamlit', 'NLP', 'Transformer Embeddings', 'LLM'],
    description:
      'Semantic search platform matching user intent with financial products using transformer embeddings. Modular FastAPI backend with Streamlit frontend, explainable AI ranking, and LLM-generated recommendation summaries.',
    impact: [
      'Semantic matching with transformer embeddings for product discovery',
      'Explainable AI ranking with LLM-generated recommendation reasoning',
      'Modular FastAPI + Streamlit architecture for rapid iteration',
    ],
    link: null,
    github: 'https://github.com/sanjana421/FiReco',
  },
  {
    id: '06',
    featured: false,
    title: 'FormulaHub · Search Analytics',
    org: 'FormulaHub · Hyderabad · 2022–2023',
    subtitle: 'A/B Testing & Search Analytics Infrastructure',
    tags: ['Python', 'SQL', 'Power BI', 'A/B Testing', 'Experimentation'],
    description:
      'Designed and ran 3 A/B tests across 2 cohorts with pre-defined success criteria. Decomposed a flat search funnel in SQL — separating "zero results" from "poor ranking" as distinct failure modes. Built the experimentation harness and event schema that remained as the platform\'s permanent search analytics infrastructure.',
    impact: [
      '+20% search engagement · +18% relevance · +15% post-search satisfaction',
      '↓40% manual reporting effort across 3 business teams',
      'Experimentation harness adopted as permanent platform infrastructure',
    ],
    link: null,
    github: null,
  },
];
