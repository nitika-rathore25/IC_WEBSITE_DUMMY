import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";

/** Copy for Agentic AI & Automation — Figma "Website Flow" → Agentic AI & Automation. */

export const agenticHero = {
  badge: "Agentic AI & Automation",
  title: "Don't just ask AI to answer. Let it get the work done.",
  sub: "The next generation of enterprise AI isn't only conversational.",
  body: [
    "AI agents can plan, reason, use tools, interact with enterprise systems and complete multi-step workflows with human approval where the decision requires it.",
  ],
  image: {
    src: "/images/solutions/agentic/hero.webp",
    alt: "Agent cycle: plan, reason, use tools, interact with enterprise systems, execute multi-step workflows, human approval, complete workflow",
    width: 1170,
    height: 1073,
  },
};

export const agenticServices: { title: string; items: AiSvcService[] } = {
  title: "Our Services",
  items: [
    {
      icon: "/icons/agentic/agentic-ai-and-automation-ai-agents-and-multi-agent-systems.svg",
      title: "AI Agents & Multi-Agent Systems",
      body: "Build goal-driven agents and specialist agent systems that collaborate to complete complex, multi-step tasks.",
    },
    {
      icon: "/icons/agentic/agentic-ai-and-automation-tool-and-api-integrated-agents.svg",
      title: "Tool & API-Integrated Agents",
      body: "Connect AI agents to CRMs, ERPs, ticketing systems and internal APIs so AI can take action within existing workflows.",
    },
    {
      icon: "/icons/agentic/agentic-ai-and-automation-intelligent-workflow-automation.svg",
      title: "Intelligent Workflow Automation",
      body: "Replace rigid, rules-only automation with AI-enabled workflows that can interpret information and handle exceptions.",
    },
    {
      icon: "/icons/agentic/agentic-ai-and-automation-human-in-the-loop-and-autonomy-controls.svg",
      title: "Human-in-the-Loop & Autonomy Controls",
      body: "Design approval gates, permissions and autonomy levels based on business impact, risk and compliance requirements.",
    },
  ],
};

export const agenticLoop = {
  title: "Insights Curry Agentic Work Loop",
  image: {
    src: "/images/solutions/agentic/work-loop.webp",
    alt: "Agentic work loop: business goal, plan, reason, select tool, execute, then success and verify or exception and human review, learn, next action",
    width: 843,
    height: 886,
  },
};
