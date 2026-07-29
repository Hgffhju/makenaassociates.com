import { Project, TeamMember, Article, FAQItem, ServiceItem } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Highlands View Luxury Residences',
    category: 'residential',
    categoryName: 'Residential',
    location: 'Ol Kalou, Nyandarua County',
    areaSqm: 380,
    durationMonths: 14,
    costVariance: '-4.2%',
    completedYear: 2024,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Modern multi-level highland villa designed for thermal efficiency, natural stone aesthetic, and rainwater harvesting.',
    fullDescription: 'Highlands View Residence is a flagship single-family home constructed in the cool climate of Ol Kalou. Designed to take full advantage of panoramic views towards the Aberdare Range, the villa features dual-skinned thermal masonry, double-glazed timber windows, solar thermal water heating, and an integrated 40,000-liter underground rainwater harvesting system. Our integrated QS team performed value engineering at Stage 3, reducing structural concrete costs without impacting floor plate dimensions.',
    highlights: [
      'Delivered 4.2% below initial QS budget projection',
      'Integrated solar thermal heating & rainwater harvesting',
      'Custom dressed highland quarry stone facade',
      'Full NCA, County, and NEMA regulatory clearance'
    ],
    clientName: 'Dr. & Mrs. Mwangi',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Completed'
  },
  {
    id: 'proj-2',
    title: 'Ol Kalou Commercial Centre & Plaza',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Ol Kalou Town CBD',
    areaSqm: 1200,
    durationMonths: 18,
    costVariance: 'On Budget',
    completedYear: 2024,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    shortDescription: '4-story mixed-use commercial complex featuring retail banking, medical suites, and modern office spaces.',
    fullDescription: 'A landmark commercial development in Ol Kalou CBD providing 1,200 sq.m of high-yield commercial space. The structural frame was engineered with reinforced post-tensioned slabs to maximize clear office spans. Includes a dedicated basement parking area, standby generator power backup, rainwater treatment plant, and full accessibility features. Managed under a single JBCC contract with strict interim valuations by our quantity surveying department.',
    highlights: [
      'Completed 100% on target budget under JBCC contract',
      '4-story post-tensioned reinforced concrete frame',
      'Full compliance with County CBD building guidelines',
      'High tenancy absorption rate within 60 days of completion'
    ],
    clientName: 'Ol Kalou Investments Co. Ltd',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Completed'
  },
  {
    id: 'proj-3',
    title: 'Kinangop Community & Educational Hub',
    category: 'institutional',
    categoryName: 'Institutional',
    location: 'South Kinangop, Nyandarua',
    areaSqm: 640,
    durationMonths: 12,
    costVariance: '-1.8%',
    completedYear: 2023,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Public facility incorporating a digital library, youth innovation labs, and community hall.',
    fullDescription: 'Commissioned as a multi-purpose public resource center in Kinangop. The architecture utilizes local sustainable timber roof trusses and high thermal mass brick walls to withstand highland frost and chilly mornings. Features expansive roof daylighting to eliminate artificial lighting during day hours and solar PV power backup.',
    highlights: [
      'Sustainable passive design requiring zero daytime lighting power',
      'NCA Grade 1 quality assurance monitoring throughout',
      'Community vocational training workshops included',
      'Delivered on time with full county public works audit'
    ],
    clientName: 'Kinangop Community Development Trust',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Completed'
  },
  {
    id: 'proj-4',
    title: 'Ndaragwa Highland Family Villa',
    category: 'residential',
    categoryName: 'Residential',
    location: 'Ndaragwa, Nyandarua',
    areaSqm: 520,
    durationMonths: 16,
    costVariance: '-3.0%',
    completedYear: 2023,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Contemporary country estate with double-height living room, stone fireplaces, and landscaped terrace.',
    fullDescription: 'Sprawling contemporary country residence built on a 5-acre agricultural plot in Ndaragwa. Designed to seamlessly blend indoor luxury with outdoor highland views. Features 5 ensuite bedrooms, a stone-clad double fireplace, insulated timber roof paneling, and an integrated caretaker cottage.',
    highlights: [
      '5 ensuite master suites with stone fireplaces',
      'Custom joinery using locally harvested cedar & cypress',
      '3% savings realized through direct material procurement oversight',
      'Complete off-grid solar & borehole water filtration system'
    ],
    clientName: 'Eng. & Dr. Kamau',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Completed'
  },
  {
    id: 'proj-5',
    title: 'Shamata Water & WASH Infrastructure Site',
    category: 'infrastructure',
    categoryName: 'Infrastructure',
    location: 'Shamata, Aberdare Escarpment',
    areaSqm: 2400,
    durationMonths: 10,
    costVariance: '-2.5%',
    completedYear: 2024,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Water treatment plant, reservoir tanks, and distribution pump station serving 12,000 residents.',
    fullDescription: 'Civil and structural engineering oversight, quantity surveying, and contract administration for a rural water supply infrastructure project in Shamata. Included construction of a 500m³ reinforced concrete distribution tank, intake weir, filtration units, and solar pumping station.',
    highlights: [
      'Serves clean water to over 12,000 households',
      '500m³ reinforced concrete water storage tank',
      'Full NEMA Environmental Audit & DOSHS Safety Compliance',
      'Solar-powered high-capacity pumping station'
    ],
    clientName: 'Nyandarua County Water Services Board',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Completed'
  },
  {
    id: 'proj-6',
    title: 'Engineer\'s Commercial Plaza',
    category: 'commercial',
    categoryName: 'Commercial',
    location: 'Nyahururu Town CBD',
    areaSqm: 3600,
    durationMonths: 24,
    costVariance: 'In Progress',
    completedYear: 2025,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    shortDescription: '8-story state-of-the-art office tower and banking hall under construction in Nyahururu.',
    fullDescription: 'An ongoing major commercial development in Nyahururu town. Designed as an 8-story iconic glass-and-stone tower with high-speed elevators, underground basement parking, centralized HVAC, and fiber optic backbone infrastructure. Makena & Associates is providing comprehensive project management, architectural design, and full QS services.',
    highlights: [
      'Nyahururu CBD landmark 8-story commercial tower',
      'Double-level basement parking excavation & shoring',
      'Full NEMA EIA approval and county high-rise clearance',
      'Targeting Edge Green Building certification'
    ],
    clientName: 'Nyahururu Commercial Properties Ltd',
    architect: 'James Mwangi, AAK',
    qsLead: 'Grace Njoroge, MBORAQS',
    status: 'Under Construction'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'James Mwangi, AAK',
    title: 'Principal Architect & Managing Director',
    credentials: 'B.Arch (UoN) · Registered Architect (BORAQS / AAK)',
    bio: 'James brings over 15 years of master planning, architectural design, and project leadership across Kenya. He holds a Bachelor of Architecture from the University of Nairobi and is a registered member of the Architectural Association of Kenya (AAK). He specializes in highland climate-responsive architecture and value engineering.',
    email: 'james@makenaassociates.com',
    linkedin: 'https://linkedin.com',
    badge: 'AAK REGISTERED',
    imageBgColor: '#1F2527'
  },
  {
    id: 'team-2',
    name: 'Grace Njoroge, MBORAQS',
    title: 'Senior Quantity Surveyor & Partner',
    credentials: 'BSc QS (JKUAT) · Registered Quantity Surveyor (BORAQS)',
    bio: 'Grace leads the Quantity Surveying and Cost Management division at Makena & Associates. With 12+ years in cost planning, contract administration, and tendering, she has overseen over KES 3.5 Billion in construction budgets. Her rigorous financial oversight ensures client projects remain strictly within budget constraints.',
    email: 'grace@makenaassociates.com',
    linkedin: 'https://linkedin.com',
    badge: 'BORAQS REGISTERED',
    imageBgColor: '#5A7C5E'
  },
  {
    id: 'team-3',
    name: 'Peter Kariuki, PMP',
    title: 'Senior Project Manager & Construction Lead',
    credentials: 'BSc Civil Eng (KU) · PMP Certified · NCA Licensed',
    bio: 'Peter leads site supervision, contractor management, and QA/QC compliance. He brings a strong background in structural engineering and site safety management under NCA and DOSHS regulations. He ensures contractors meet strict quality standards and completion deadlines.',
    email: 'peter@makenaassociates.com',
    linkedin: 'https://linkedin.com',
    badge: 'PROJECT MANAGER',
    imageBgColor: '#D4916E'
  },
  {
    id: 'team-4',
    name: 'Faith Wambui, NEMA',
    title: 'Environmental & Regulatory Compliance Lead',
    credentials: 'BSc Environmental Studies · NEMA Lead Expert',
    bio: 'Faith manages Environmental Impact Assessments (EIA), NEMA licensing, and County Government planning approvals. She ensures that every project meets local environmental laws, water usage guidelines, and community sustainability benchmarks.',
    email: 'faith@makenaassociates.com',
    linkedin: 'https://linkedin.com',
    badge: 'NEMA LEAD EXPERT',
    imageBgColor: '#4A5A6A'
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    title: 'Why Early Quantity Surveying Saves More Than Late-Stage Cost Reviews',
    category: 'Cost Management',
    excerpt: 'The single most effective way to control construction costs is not a post-design review — it\'s a quantity surveyor embedded in the design team from day one.',
    content: `When an architect designs a building in isolation, cost estimation often becomes an afterthought handled right before tendering. By the time a standalone Quantity Surveyor analyzes the drawings, design decisions—such as structural grid spans, facade cladding systems, and roof pitch geometries—are already frozen.

If the BQ exceeds the client's budget, the project faces painful redesigns, delays, or panic cost-cutting that degrades spatial quality.

### The Integrated Architecture + QS Advantage

At Makena & Associates Ltd, our architects and quantity surveyors sit together from Stage 1 (Inception & Brief). As the architect explores structural spans, our QS tests market rates for concrete, stone, timber, and steel in real time.

**Key Benefits of Early QS Integration:**
1. **Live Material Budgeting:** Instant feedback on how design choices impact material bills in Kenya's current market.
2. **Value Engineering without Quality Loss:** Identifying alternative local materials (e.g. highland dressed stone vs imported cladding) before final drawings.
3. **Zero Variation Surprises:** Comprehensive BQs with precise itemization reduce contractor claims during construction by up to 80%.
4. **Faster Approvals:** County planning and bank financing approval processes run smoother when drawings and financial models align perfectly.`,
    date: '14 May 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    author: 'Grace Njoroge, MBORAQS',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Designing for Kenya\'s Highland Climate: What the Data Tells Us',
    category: 'Highland Architecture',
    excerpt: 'High altitude, chilly mornings, seasonal rainfall, and strong UV exposure require specific architectural strategies for comfort and durability.',
    content: `Building in Ol Kalou, Nyahururu, Kinangop, and the broader Central Highlands of Kenya presents distinct environmental challenges that low-elevation designs fail to address.

### 1. Thermal Mass and Orientation
Highland nights can see temperatures drop significantly. Buildings constructed with lightweight materials without thermal insulation lose heat rapidly. We utilize high-density dressed stone masonry combined with cavity walls or timber cladding to store solar heat during the day and radiate it back indoors at night.

### 2. Rainwater Harvesting Integration
With annual rainfall ranging between 1,000mm and 1,500mm across Nyandarua and the Aberdares, roof geometry is not just an aesthetic choice. We design expansive guttering systems tied to dual underground filtration tanks, turning rooftops into primary water sources.

### 3. Moisture Barrier Engineering
High soil moisture levels require rigorous damp-proof membrane (DPM) and damp-proof course (DPC) installation along sub-structure footings to prevent capillary rise and interior efflorescence.`,
    date: '2 Apr 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: 'James Mwangi, AAK'
  },
  {
    id: 'art-3',
    title: 'NCA Registration and County Approvals: A Practical Guide for Developers',
    category: 'Regulatory Compliance',
    excerpt: 'Understanding the approval pipeline in Kenya: What permits you need, in what order, and realistic timelines for 2025/2026.',
    content: `Navigating construction approvals in Kenya can feel daunting. A single missing stamp can lead to NCA stop-work orders or costly municipal fines. Here is the step-by-step pipeline we manage for all our clients:

### Step 1: Architectural & Structural County Approval
Submitted to the County Government Physical Planning Department. Requires architectural drawings stamped by a registered architect (AAK/BORAQS) and structural calculations certified by a registered engineer (EBK).

### Step 2: NEMA Clearance
An Environmental Impact Assessment (EIA) summary or full report conducted by a licensed NEMA Lead Expert. Required for all commercial, multi-residential, and infrastructure works.

### Step 3: NCA Project Registration
Registration of the site with the National Construction Authority. Requires appointing an NCA-registered contractor and paying mandatory compliance fees.

### Step 4: Water & Public Health Clearance
Required for commercial developments, healthcare facilities, and projects requiring borehole drilling or sewer discharge permits.`,
    date: '18 Feb 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    author: 'Faith Wambui, NEMA'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you handle both architectural design and quantity surveying, or only one?',
    answer: 'Both — and that is our core strength. We are an integrated architectural and quantity surveying practice. We can handle either discipline independently if needed, but our most effective engagements cover the full scope: architectural design, cost planning, procurement, and construction supervision under one contract and one point of contact.',
    category: 'Services'
  },
  {
    id: 'faq-2',
    question: 'How early in a project should I engage Makena & Associates?',
    answer: 'As early as possible — ideally before you purchase land or finalize your budget. Our feasibility studies assess site topography, soil conditions, utility access, county planning zoning, and realistic construction costs before you commit capital.',
    category: 'Getting Started'
  },
  {
    id: 'faq-3',
    question: 'Do you work outside Ol Kalou and Nyandarua County?',
    answer: 'Yes. While our headquarters is in Ol Kalou, we design and manage construction projects across Kenya, including Nairobi, Nakuru, Laikipia, Nyeri, Kiambu, Rift Valley, and coastal regions.',
    category: 'Operations'
  },
  {
    id: 'faq-4',
    question: 'What does a typical feasibility study include?',
    answer: 'A feasibility study includes site analysis & zoning check, geotechnical risk review, conceptual architectural layout options, early Quantity Surveyor cost modeling, regulatory permit requirements (NCA, NEMA, County), and a project timeline roadmap.',
    category: 'Services'
  },
  {
    id: 'faq-5',
    question: 'How do you control costs during active construction?',
    answer: 'Through real-time cost tracking, variation control, and rigorous interim payment valuations. Our QS team certifies contractor payment requests against actual physical work done on site, preventing overpayments and unapproved variation claims.',
    category: 'Cost Control'
  },
  {
    id: 'faq-6',
    question: 'Can you handle NCA, County Government, and NEMA approvals for us?',
    answer: 'Yes. We manage the entire approval pipeline on your behalf: County physical planning submissions, NEMA Environmental Impact Assessments, NCA site registration, and public health clearances.',
    category: 'Regulatory'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Architectural Design & Planning',
    description: 'Concept development through to detailed construction documentation, responsive to context, climate, and local material availability.',
    deliverables: ['Concept Sketches & 3D Renderings', 'Detailed Architectural Working Drawings', 'County Government Permit Submission Sets', 'As-Built Drawings & Handover Documentation'],
    iconName: 'Compass'
  },
  {
    number: '02',
    title: 'Quantity Surveying & Cost Management',
    description: 'Bills of Quantities (BQ), cost modeling, tendering oversight, variation management, and final account settlement.',
    deliverables: ['Detailed Bills of Quantities (BQ)', 'Elemental Cost Plans & Estimates', 'Contractor Tender Evaluation Reports', 'Monthly Valuation Certificates & Final Accounts'],
    iconName: 'Calculator'
  },
  {
    number: '03',
    title: 'Feasibility Studies & Site Analysis',
    description: 'Site evaluation, zoning analysis, early budget modeling, and regulatory risk review before budget commitment.',
    deliverables: ['Site Topography & Utilities Assessment', 'Zoning & Plot Coverage Review', 'Preliminary Cost & Return Estimate', 'Feasibility Assessment Report'],
    iconName: 'FileText'
  },
  {
    number: '04',
    title: 'Construction Supervision & PM',
    description: 'On-site technical supervision, quality control, contractor coordination, and schedule management from groundbreaking to handover.',
    deliverables: ['Weekly & Monthly Site Audit Reports', 'QA/QC Material Testing Oversight', 'Contractor Progress Valuation', 'Practical Completion & Snagging Inspection'],
    iconName: 'HardHat'
  },
  {
    number: '05',
    title: 'Environmental & Regulatory Permits',
    description: 'NEMA Environmental Impact Assessments (EIA), NCA project registration, and County Government planning approvals.',
    deliverables: ['NEMA EIA Summary & Detailed Reports', 'NCA Project Registration Clearance', 'County Planning Approval Tracking', 'DOSHS Site Safety Audit Compliance'],
    iconName: 'ShieldCheck'
  },
  {
    number: '06',
    title: 'Value Engineering & Optimization',
    description: 'Cost-saving structural and material specification reviews that preserve architectural quality while lowering expense.',
    deliverables: ['Structural Framing Optimization Review', 'Alternative Material Sourcing Analysis', 'Life-Cycle Maintenance Cost Analysis', 'Cost Reduction Recommendations'],
    iconName: 'TrendingDown'
  }
];
