export interface TemplateQuestion {
  text: string;
  description?: string;
  type: "OPEN_ENDED" | "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "CODING" | "WHITEBOARD";
  options?: unknown;
  order: number;
  probeOnShort?: boolean;
  isRequired?: boolean;
}

export interface InterviewTemplate {
  id: string;
  title: string;
  description: string;
  objective: string;
  icon: string;
  aiTone: "CASUAL" | "PROFESSIONAL" | "FORMAL" | "FRIENDLY";
  followUpDepth: "LIGHT" | "MODERATE" | "DEEP";
  assessmentCriteria: { name: string; description: string }[];
  chatEnabled: boolean;
  voiceEnabled: boolean;
  videoEnabled: boolean;
  timeLimitMinutes?: number;
  questions: TemplateQuestion[];
}

export const INTERVIEW_TEMPLATES: InterviewTemplate[] = [
  {
    id: "technical-screen",
    title: "Technical Screen",
    description: "Evaluate software engineering fundamentals with a mix of coding, system design, and problem-solving questions.",
    objective: "Assess the candidate's technical depth, coding ability, and approach to system design within a structured screening format.",
    icon: "Code2",
    aiTone: "PROFESSIONAL",
    followUpDepth: "DEEP",
    assessmentCriteria: [
      { name: "Problem Solving", description: "Ability to break down complex problems, identify edge cases, and arrive at efficient solutions." },
      { name: "Code Quality", description: "Clean, readable code with appropriate use of data structures, algorithms, and design patterns." },
      { name: "System Design", description: "Understanding of scalable architecture, trade-offs, and component interactions." },
      { name: "Technical Communication", description: "Clarity in explaining technical decisions, trade-offs, and reasoning." },
    ],
    chatEnabled: true,
    voiceEnabled: true,
    videoEnabled: true,
    timeLimitMinutes: 30,
    questions: [
      { order: 0, text: "Walk me through a recent project where you solved a challenging technical problem. What was the problem, your approach, and the outcome?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 1, text: "Given an array of integers, write a function that returns the length of the longest consecutive sequence. For example, [100, 4, 200, 1, 3, 2] should return 4 (the sequence 1, 2, 3, 4).", description: "Focus on time complexity — an O(n) solution is expected.", type: "CODING", probeOnShort: true, isRequired: true },
      { order: 2, text: "How would you design a URL shortening service like bit.ly? Describe the key components, storage strategy, and how you would handle high traffic.", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 3, text: "Which of the following best describes the time complexity of inserting an element into a balanced binary search tree?", type: "SINGLE_CHOICE", options: [{ label: "O(1)", value: "O(1)" }, { label: "O(log n)", value: "O(log n)" }, { label: "O(n)", value: "O(n)" }, { label: "O(n log n)", value: "O(n log n)" }], isRequired: true },
      { order: 4, text: "Describe your experience with CI/CD pipelines. How do you ensure code quality and reliable deployments?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
    ],
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "Explore leadership, teamwork, and communication skills through structured behavioral questions.",
    objective: "Understand the candidate's past behavior in professional situations to predict future performance in collaboration, leadership, and conflict resolution.",
    icon: "Users",
    aiTone: "FRIENDLY",
    followUpDepth: "MODERATE",
    assessmentCriteria: [
      { name: "Leadership", description: "Demonstrates initiative, influence, and the ability to guide others toward shared goals." },
      { name: "Teamwork & Collaboration", description: "Works effectively with others, shares credit, and navigates interpersonal dynamics." },
      { name: "Adaptability", description: "Responds constructively to change, feedback, and ambiguous situations." },
      { name: "Communication", description: "Articulates ideas clearly, listens actively, and adjusts style to the audience." },
    ],
    chatEnabled: true,
    voiceEnabled: true,
    videoEnabled: true,
    timeLimitMinutes: 30,
    questions: [
      { order: 0, text: "Tell me about a time you had to influence a decision without having direct authority. How did you approach it?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 1, text: "Describe a situation where you received critical feedback. How did you respond, and what did you change?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 2, text: "Give an example of a time you had to manage competing priorities with a tight deadline. What trade-offs did you make?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 3, text: "How do you prefer to receive feedback from your manager?", type: "SINGLE_CHOICE", options: [{ label: "Regular 1-on-1 meetings", value: "regular_1on1" }, { label: "Written feedback after milestones", value: "written_milestones" }, { label: "Real-time, in the moment", value: "realtime" }, { label: "Formal periodic reviews", value: "formal_reviews" }], isRequired: true },
      { order: 4, text: "Tell me about a project that didn't go as planned. What happened, and what would you do differently?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
    ],
  },
  {
    id: "user-research",
    title: "User Research",
    description: "Uncover user behaviors, pain points, and unmet needs through open-ended discovery questions.",
    objective: "Gain deep qualitative insights into how users interact with the product, what frustrates them, and what opportunities exist for improvement.",
    icon: "Search",
    aiTone: "CASUAL",
    followUpDepth: "DEEP",
    assessmentCriteria: [
      { name: "Depth of Insight", description: "Provides specific, detailed examples rather than vague generalizations about their experience." },
      { name: "Pain Point Clarity", description: "Clearly articulates frustrations and unmet needs with concrete context." },
      { name: "Workflow Awareness", description: "Demonstrates understanding of their own processes, tools, and workarounds." },
      { name: "Openness & Honesty", description: "Shares genuine feedback, including negative experiences, without hesitation." },
    ],
    chatEnabled: true,
    voiceEnabled: true,
    videoEnabled: true,
    timeLimitMinutes: 30,
    questions: [
      { order: 0, text: "Walk me through a typical day when you use our product (or a similar tool). What are you trying to accomplish?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 1, text: "What's the most frustrating part of your current workflow? Can you describe a specific instance?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 2, text: "If you could change one thing about the product, what would it be and why?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 3, text: "How do you currently work around limitations you've encountered? Describe any hacks or alternative tools you use.", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 4, text: "What would make you recommend this product to a colleague? What's currently holding you back?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
    ],
  },
  {
    id: "case-study",
    title: "Case Study",
    description: "Test analytical thinking and structured problem-solving through a realistic business or product scenario.",
    objective: "Evaluate the candidate's ability to break down ambiguous problems, structure an approach, and communicate a recommendation under constraints.",
    icon: "BrainCircuit",
    aiTone: "PROFESSIONAL",
    followUpDepth: "DEEP",
    assessmentCriteria: [
      { name: "Analytical Thinking", description: "Breaks down ambiguous problems into structured components and identifies key drivers." },
      { name: "Prioritization", description: "Distinguishes high-impact areas from noise and focuses investigation accordingly." },
      { name: "Recommendation Quality", description: "Proposes actionable, well-reasoned solutions backed by data or logic." },
      { name: "Communication & Structure", description: "Presents analysis in a clear, logical framework that is easy to follow." },
    ],
    chatEnabled: true,
    voiceEnabled: true,
    videoEnabled: true,
    timeLimitMinutes: 40,
    questions: [
      { order: 0, text: "A mid-size e-commerce company has seen a 15% drop in conversion rate over the last quarter. What framework would you use to diagnose the root cause?", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 1, text: "Based on the scenario above, sketch a decision tree or flow diagram showing how you would prioritize which areas to investigate first.", type: "WHITEBOARD", probeOnShort: true, isRequired: true },
      { order: 2, text: "Which of the following metrics would you prioritize first when investigating the conversion drop?", type: "MULTIPLE_CHOICE", options: [{ label: "Traffic source breakdown", value: "traffic_source" }, { label: "Funnel drop-off rates by step", value: "funnel_dropoff" }, { label: "Average order value trend", value: "aov_trend" }, { label: "Page load time by device", value: "page_load" }, { label: "Customer support ticket volume", value: "support_tickets" }], isRequired: true },
      { order: 3, text: "Suppose your analysis reveals that mobile checkout abandonment increased 25%. Propose a concrete plan to address this, including what you'd measure to validate success.", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
    ],
  },
  {
    id: "screening-call",
    title: "Screening Call",
    description: "A quick initial screen to verify basic qualifications, motivation, and communication skills.",
    objective: "Efficiently determine whether the candidate meets the minimum bar for the role and should advance to the next interview stage.",
    icon: "Briefcase",
    aiTone: "FRIENDLY",
    followUpDepth: "LIGHT",
    assessmentCriteria: [
      { name: "Role Fit", description: "Background and experience align with the position's core requirements." },
      { name: "Motivation", description: "Demonstrates genuine interest in the role and a clear reason for applying." },
      { name: "Communication", description: "Expresses ideas concisely and professionally in a conversational setting." },
      { name: "Availability & Logistics", description: "Timeline, salary expectations, and work arrangement preferences are compatible." },
    ],
    chatEnabled: true,
    voiceEnabled: true,
    videoEnabled: true,
    timeLimitMinutes: 20,
    questions: [
      { order: 0, text: "Tell me briefly about your background and what drew you to this role.", type: "OPEN_ENDED", probeOnShort: true, isRequired: true },
      { order: 1, text: "What is your current employment status?", type: "SINGLE_CHOICE", options: [{ label: "Employed — actively looking", value: "employed_looking" }, { label: "Employed — open to opportunities", value: "employed_open" }, { label: "Between roles", value: "between_roles" }, { label: "Freelancing / contracting", value: "freelancing" }], isRequired: true },
      { order: 2, text: "What are your salary expectations for this role?", type: "OPEN_ENDED", probeOnShort: false, isRequired: true },
      { order: 3, text: "When would you be available to start if offered the position?", type: "OPEN_ENDED", probeOnShort: false, isRequired: true },
      { order: 4, text: "Is there anything about the role or company you'd like to ask about?", type: "OPEN_ENDED", probeOnShort: false, isRequired: false },
    ],
  },
];
