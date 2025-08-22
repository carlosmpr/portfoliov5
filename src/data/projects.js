// src/data/projects.js
export const projects = {
  "chatgpt-development-kit": {
    title: "ChatGPT Development Kit",
    description: "Open-source GitHub repository providing developers with practical ChatGPT integrations, custom prompts, and API workflows for common business use cases",
    fullDescription: "This comprehensive development kit emerged from the need to bridge the gap between ChatGPT's powerful capabilities and practical business applications. The repository contains battle-tested code examples, custom prompt templates, and complete workflow implementations that developers can immediately integrate into their projects.",
    tags: ["OpenAI API", "JavaScript", "Node.js", "Open Source"],
    status: ["Live Project", "Open Source"],
    category: "AI/ML",
    featured: true,
    demoUrl: "https://github.com/carlospolanco/chatgpt-dev-kit",
    githubUrl: "https://github.com/carlospolanco/chatgpt-dev-kit",
    gradient: "from-slate-900 to-slate-800",
    features: [
      {
        icon: "code",
        title: "Ready-to-Use Templates",
        description: "Pre-built prompt templates for common business scenarios like customer service, content generation, and data analysis."
      },
      {
        icon: "api",
        title: "API Integration Patterns",
        description: "Complete examples showing how to integrate ChatGPT API with different frameworks and databases."
      },
      {
        icon: "workflow",
        title: "Business Workflows",
        description: "End-to-end implementations for automating business processes using AI-powered decision making."
      },
      {
        icon: "docs",
        title: "Comprehensive Documentation",
        description: "Detailed guides, best practices, and troubleshooting tips for successful AI integration."
      }
    ],
    challenges: [
      {
        title: "API Rate Limiting Management",
        problem: "Managing OpenAI API rate limits while maintaining responsive user experiences across different usage patterns.",
        solution: "Implemented intelligent queuing system with exponential backoff, request batching, and fallback mechanisms for high-traffic scenarios."
      },
      {
        title: "Prompt Engineering Optimization",
        problem: "Creating prompts that consistently produce high-quality outputs across diverse use cases and user inputs.",
        solution: "Developed a systematic approach to prompt testing with A/B testing framework and automated quality metrics."
      }
    ],
    results: {
      metrics: [
        { value: "2,500+", label: "GitHub Stars" },
        { value: "500+", label: "Forks" },
        { value: "50+", label: "Contributors" }
      ],
      impact: "The toolkit has been adopted by over 100 companies and has processed more than 1 million API requests, significantly reducing development time for AI integrations."
    },
    nextProject: "ai-learning-platform"
  },
  
  "ai-learning-platform": {
    title: "AI Learning Platform",
    description: "Educational platform teaching AI concepts with hands-on tutorials and interactive examples for developers",
    fullDescription: "An interactive learning platform designed to demystify AI and machine learning concepts for developers. Features hands-on coding exercises, real-time AI model training, and progressive skill-building paths from beginner to advanced levels.",
    tags: ["Next.js", "PostgreSQL", "Python", "TensorFlow"],
    status: ["Live Project", "Educational"],
    category: "AI/ML",
    featured: false,
    demoUrl: "https://ai-learn.carlospolanco.dev",
    githubUrl: "https://github.com/carlospolanco/ai-learning-platform",
    gradient: "from-purple-50 to-purple-100",
    features: [
      {
        icon: "interactive",
        title: "Interactive Coding Environment",
        description: "Browser-based Python environment for hands-on AI/ML experimentation without local setup."
      },
      {
        icon: "path",
        title: "Progressive Learning Paths",
        description: "Structured curricula from basics to advanced topics with personalized recommendations."
      },
      {
        icon: "model",
        title: "Real-time Model Training",
        description: "Train and deploy machine learning models directly in the browser with instant feedback."
      },
      {
        icon: "community",
        title: "Community Features",
        description: "Share projects, get feedback, and collaborate with other learners in the platform."
      }
    ],
    challenges: [
      {
        title: "Browser-based Python Execution",
        problem: "Running complex Python AI libraries like TensorFlow and scikit-learn efficiently in web browsers.",
        solution: "Implemented Pyodide with WebAssembly and optimized package loading with custom CDN for faster execution."
      }
    ],
    results: {
      metrics: [
        { value: "10,000+", label: "Active Learners" },
        { value: "95%", label: "Course Completion Rate" },
        { value: "4.8/5", label: "User Rating" }
      ],
      impact: "Platform has helped over 10,000 developers transition into AI/ML roles with hands-on learning approach."
    },
    nextProject: "whatsapp-ai-agents"
  },

  "whatsapp-ai-agents": {
    title: "WhatsApp AI Agents",
    description: "AI service agents for restaurants & small businesses handling customer inquiries and appointment bookings",
    fullDescription: "Intelligent WhatsApp chatbots that handle customer service for restaurants and small businesses. Features natural language processing, appointment scheduling, order management, and seamless handoff to human agents when needed.",
    tags: ["WhatsApp API", "Node.js", "OpenAI", "MongoDB"],
    status: ["Live Project", "SaaS"],
    category: "AI/ML",
    featured: false,
    demoUrl: "https://whatsapp-ai.carlospolanco.dev",
    githubUrl: "https://github.com/carlospolanco/whatsapp-ai-agents",
    gradient: "from-green-50 to-emerald-100",
    features: [
      {
        icon: "chat",
        title: "Natural Conversations",
        description: "AI-powered responses that understand context and provide helpful, human-like interactions."
      },
      {
        icon: "booking",
        title: "Appointment Scheduling",
        description: "Automated booking system with calendar integration and reminder notifications."
      },
      {
        icon: "orders",
        title: "Order Management",
        description: "Handle food orders, track delivery status, and process payments through WhatsApp."
      },
      {
        icon: "handoff",
        title: "Human Handoff",
        description: "Seamless transfer to human agents for complex queries with full conversation context."
      }
    ],
    challenges: [
      {
        title: "WhatsApp API Rate Limits",
        problem: "Managing WhatsApp Business API rate limits while maintaining responsive customer service.",
        solution: "Implemented intelligent message queuing with priority handling and fallback messaging strategies."
      }
    ],
    results: {
      metrics: [
        { value: "85%", label: "Query Resolution Rate" },
        { value: "2min", label: "Average Response Time" },
        { value: "40%", label: "Cost Reduction" }
      ],
      impact: "Deployed across 50+ restaurants, handling over 10,000 customer interactions monthly with 85% automation rate."
    },
    nextProject: "multichat-panel-extension"
  },

  "multichat-panel-extension": {
    title: "MultiChat Panel Extension",
    description: "Chrome extension helping customer service teams manage multiple chat conversations more efficiently",
    fullDescription: "A productivity-focused Chrome extension that consolidates multiple chat platforms into a unified interface. Designed for customer service teams managing conversations across WhatsApp, Telegram, Facebook Messenger, and other platforms simultaneously.",
    tags: ["Chrome API", "React", "WebSockets", "IndexedDB"],
    status: ["Live Project", "Productivity"],
    category: "Web Apps",
    featured: false,
    demoUrl: "https://chrome.google.com/webstore/detail/multichat-panel",
    githubUrl: "https://github.com/carlospolanco/multichat-panel",
    gradient: "from-blue-50 to-blue-100",
    features: [
      {
        icon: "unified",
        title: "Unified Dashboard",
        description: "Single interface for managing conversations across multiple chat platforms simultaneously."
      },
      {
        icon: "shortcuts",
        title: "Keyboard Shortcuts",
        description: "Customizable hotkeys for quick navigation and common actions to boost productivity."
      },
      {
        icon: "templates",
        title: "Response Templates",
        description: "Pre-written message templates with variables for consistent and fast customer responses."
      },
      {
        icon: "analytics",
        title: "Performance Analytics",
        description: "Track response times, conversation volume, and team performance metrics."
      }
    ],
    challenges: [
      {
        title: "Cross-Platform Integration",
        problem: "Integrating with multiple chat platforms that have different APIs and authentication methods.",
        solution: "Built modular plugin architecture with standardized interfaces and secure credential management."
      }
    ],
    results: {
      metrics: [
        { value: "60%", label: "Faster Response Times" },
        { value: "5,000+", label: "Active Users" },
        { value: "4.7/5", label: "Chrome Store Rating" }
      ],
      impact: "Used by customer service teams at 200+ companies, reducing average response time by 60%."
    },
    nextProject: "loan-processing-automation"
  },

  "loan-processing-automation": {
    title: "Loan Processing Automation",
    description: "Python workflow system streamlining loan application processing for financial institutions",
    fullDescription: "Comprehensive automation platform for financial institutions to streamline loan application processing. Features document verification, credit scoring, risk assessment, and automated decision-making with compliance monitoring.",
    tags: ["Python", "REST APIs", "PostgreSQL", "Docker"],
    status: ["Live Project", "Enterprise"],
    category: "Web Apps",
    featured: false,
    demoUrl: "https://loan-automation.carlospolanco.dev",
    githubUrl: "https://github.com/carlospolanco/loan-processing",
    gradient: "from-orange-50 to-orange-100",
    features: [
      {
        icon: "document",
        title: "Document Verification",
        description: "Automated document analysis using OCR and AI to verify identity and financial documents."
      },
      {
        icon: "scoring",
        title: "Credit Scoring",
        description: "Advanced algorithms for credit risk assessment with real-time bureau data integration."
      },
      {
        icon: "workflow",
        title: "Automated Workflows",
        description: "Configurable approval workflows with rule-based decision making and exception handling."
      },
      {
        icon: "compliance",
        title: "Compliance Monitoring",
        description: "Built-in regulatory compliance checks and audit trails for financial regulations."
      }
    ],
    challenges: [
      {
        title: "Regulatory Compliance",
        problem: "Ensuring all automated decisions comply with complex financial regulations and audit requirements.",
        solution: "Implemented comprehensive audit logging, decision explainability, and configurable compliance rules engine."
      }
    ],
    results: {
      metrics: [
        { value: "75%", label: "Processing Time Reduction" },
        { value: "99.9%", label: "Accuracy Rate" },
        { value: "$2M", label: "Annual Cost Savings" }
      ],
      impact: "Deployed at 3 major financial institutions, processing over 50,000 loan applications with 75% time reduction."
    },
    nextProject: "chatgpt-development-kit"
  }
};

export const featuredProjects = Object.entries(projects)
  .filter(([_, project]) => project.featured)
  .map(([slug, project]) => ({ slug, ...project }));

export const allProjects = Object.entries(projects)
  .map(([slug, project]) => ({ slug, ...project }));

export const getProject = (slug) => {
  return projects[slug] || null;
};

export const getProjectSlugs = () => {
  return Object.keys(projects);
};