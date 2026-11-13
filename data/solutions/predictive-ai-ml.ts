import type { AiSvcService } from "@/components/solutions/AiSvcServiceCards";

/** Copy for Predictive AI & Machine Learning — Figma "Website Flow" → Predictive AI & ML. */

export const predictiveHero = {
  badge: "Predictive AI & Machine Learning",
  title: "Predict what matters. Decide what to do next.",
  sub: "Machine learning becomes valuable when predictions influence real decisions.",
  body: [
    "We build predictive models that help teams anticipate demand, identify opportunities, optimise resources and personalise experiences.",
  ],
  image: {
    src: "/images/solutions/predictive/hero.webp",
    alt: "Historical, operational, customer and external data feeding a predictive model that anticipates demand, identifies opportunities, optimises resources and personalises experiences",
    width: 1225,
    height: 866,
  },
};

export const predictiveServices: { title: string; items: AiSvcService[] } = {
  title: "Our Services",
  items: [
    {
      icon: "/icons/predictive/predictive-ai-and-machine-learning-predictive-modelling-forecasting-and-opt.svg",
      title: "Predictive Modelling, Forecasting & Optimisation",
      body: "Build models for demand forecasting, propensity scoring, risk prediction, planning and resource optimisation.",
    },
    {
      icon: "/icons/predictive/predictive-ai-and-machine-learning-recommendation-and-personalisation.svg",
      title: "Recommendation & Personalisation",
      body: "Create intelligent ranking and recommendation systems that deliver relevant products, content, offers and experiences.",
    },
    {
      icon: "/icons/predictive/predictive-ai-and-machine-learning-segmentation-and-behavioural-modelling.svg",
      title: "Segmentation & Behavioural Modelling",
      body: "Identify meaningful customer and behavioural segments based on actions, needs and outcomes.",
    },
    {
      icon: "/icons/predictive/predictive-ai-and-machine-learning-computer-vision-and-visual-ai.svg",
      title: "Computer Vision & Visual AI",
      body: "Use image and video intelligence for inspection, detection, quality control, visual search and operational applications.",
    },
  ],
};

export const predictiveLoop = {
  title: "Insights Curry Predictive Intelligence Loop",
  steps: ["Observe", "Predict", "Decide", "Act", "Measure", "Learn"],
};
