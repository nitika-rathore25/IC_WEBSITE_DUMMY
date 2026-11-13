/** Copy and media for the About Us page (Figma "Website Flow" → About Us, node 216:2310). */

export const aboutStats = [
  { value: "20+", label: "Live Products" },
  { value: "4k+", label: "Projects" },
  { value: "2k+", label: "Hours Spent on R&D" },
  { value: "40+", label: "Team Members" },
  { value: "100%", label: "Quality Achieved" },
];

export const whatWeBuild = [
  { title: "AI", body: "Enterprise AI, GenAI, agents, ML and intelligent automation." },
  { title: "Data", body: "Data platforms, analytics and decision systems that turn information into intelligence." },
  { title: "Technology", body: "Digital products, applications and intelligent workflows built around real business needs." },
  { title: "Intelligence", body: "Connected experiences that help organisations understand, decide and act better." },
];

export interface TeamMember {
  /** URL of the detail page: /about-us/team/[slug]. */
  slug: string;
  name: string;
  role: string;
  image: string;
  linkedIn: string;
  /** Card teaser, from the "Our Team" cards on insightscurry.com/company. */
  summary: string;
  /** Full biography for the detail page, one string per paragraph. */
  bio: string[];
}

/** Leadership, with bios from the "Know More" pages of insightscurry.com/company. */
export const team: TeamMember[] = [
  {
    slug: "mohit-shant",
    name: "Mohit Shant",
    role: "Managing Partner & Co-Founder",
    image: "/images/about/team-1.jpg",
    linkedIn: "https://in.linkedin.com/in/mohit-shant-8b9b268",
    summary:
      "Mohit Shant is a visionary leader recognized for his pioneering work in AI, Generative AI, Conversational AI, and synthetic data. As the force behind Insights Curry, Mohit has been at the forefront of integrating these advanced technologies into market research.",
    bio: [
      "Mohit Shant is a visionary leader recognized for his pioneering work in AI, Generative AI, Conversational AI, and synthetic data. As the force behind Insights Curry, Mohit has been at the forefront of integrating these advanced technologies into market research, helping clients modernize and enhance decision-making processes.",
      "His role focuses on turning innovative ideas into real-world solutions by leveraging AI to automate and scale insights generation, simplifying complex research tasks.",
      "Mohit's deep expertise in Conversational AI has enabled businesses to transform consumer interactions, offering more personalized and intuitive experiences. His work with Generative AI and Synthetic data has redefined how companies access and use data, providing scalable solutions for faster, more reliable research execution.",
      "Known for his forward-thinking strategies, Mohit continues to lead the charge in using AI to shape the future of technology-driven solutions in research.",
      "Before joining Insights Curry, Mohit had a 12-year tenure at Absolutdata Analytics, where he led AI-driven projects across various domains. As Senior Engagement Manager, he spearheaded the development of research products and custom AI-driven solutions.",
      "His academic foundation is a B.E. in Civil Engineering from Punjab Engineering College, and he is widely regarded as a strategic thought leader blending AI with human insights to revolutionize market research.",
    ],
  },
  {
    slug: "nikesh-gupta",
    name: "Nikesh Gupta",
    role: "Delivery Leader & Co-Founder",
    image: "/images/about/team-2.jpg",
    linkedIn: "https://in.linkedin.com/in/nikeshgupta16",
    summary:
      "Nikesh Gupta is a dynamic leader with a strong engineering background and Six Sigma certification, currently leading the delivery and Co-Founder at Insights Curry. With extensive expertise in operations management, project delivery, and employee engagement, Nikesh plays a pivotal role in driving business transformation by integrating cutting-edge technologies.",
    bio: [
      "Nikesh Gupta is a dynamic leader with a strong engineering background and Six Sigma certification, currently leading the delivery and Co-Founder at Insights Curry. With extensive expertise in operations management, project delivery, and employee engagement, Nikesh plays a pivotal role in driving business transformation by integrating cutting-edge technologies into research and analytics processes.",
      "He has a proven track record of managing high-performing teams and delivering customized, AI-driven solutions that consistently exceed client expectations. His deep understanding of market research and product development, combined with his ability to create intelligent automated solutions, has enabled clients to unlock new efficiencies and gain actionable insights.",
      "Nikesh excels in turning innovative ideas into reality, overseeing the end-to-end execution of projects while ensuring seamless operations and optimal resource allocation. His passion for leveraging Generative AI (GenAI) in research and analytics has helped clients navigate complex business challenges and achieve outstanding results.",
      "At Insights Curry, he leads strategic planning and innovation initiatives, contributing to the company’s continued growth and future vision. Throughout his career, Nikesh has been instrumental in delivering high-quality, technology-driven solutions that drive success for clients across diverse industries.",
    ],
  },
  {
    slug: "md-faisal",
    name: "Md. Faisal",
    role: "Director & AI Strategist",
    image: "/images/about/team-3.jpg",
    linkedIn: "https://in.linkedin.com/in/mdfaisal570",
    summary:
      "Md Faisal is an accomplished Director of Data Science & AI at Insights Curry, where he specializes in harnessing machine learning to drive product innovation and strategic growth. With over a decade of experience in data science, Faisal has a strong track record of utilizing big data and advanced analytics to uncover actionable insights.",
    bio: [
      "Md Faisal is an accomplished Director of Data Science & AI at Insights Curry, where he specializes in harnessing machine learning to drive product innovation and strategic growth. With over a decade of experience in data science, Faisal has a strong track record of utilizing big data and advanced analytics to uncover actionable insights, enabling businesses to make data-driven decisions that optimize performance and drive long-term success.",
      "Faisal's expertise spans across various industries, where he has developed scalable, AI-driven solutions aligned with strategic business goals. His ability to integrate cutting-edge data science techniques has made him a valuable asset in helping organizations solve complex challenges through innovative approaches.",
      "Prior to joining Insights Curry, Faisal held key positions at World Wide Technology and ANZ, where he led initiatives in machine learning, data engineering, and research analysis. His background encompasses extensive experience in data science, big data, and data engineering, with a strong emphasis on building scalable data solutions and applying advanced analytics to drive business insights.",
      "Faisal holds a Bachelor of Technology (B.Tech) in Information Technology from Dronacharya College of Engineering, and is passionate about leveraging AI and machine learning to help organizations transform data into meaningful growth opportunities.",
    ],
  },
  {
    slug: "swarn-arora",
    name: "Swarn Arora",
    role: "Director & Engineering Strategist",
    image: "/images/about/team-4.jpg",
    linkedIn: "https://in.linkedin.com/in/swarn-arora-01514616",
    summary:
      "Swarn Arora is a Director at Insights Curry, specializing in software development, process automation, and maintaining high coding standards. With decades of experience in Research and Analytics, he has successfully managed teams of over 20, turning innovative ideas into scalable, efficient systems.",
    bio: [
      "Swarn Arora is a Director at Insights Curry, specializing in software development, process automation, and maintaining high coding standards. With decades of experience in Research and Analytics, he has successfully managed teams of over 20, turning innovative ideas into scalable, efficient systems. His expertise includes automating reporting, analysis, and workflows, optimizing performance through advanced coding practices, and implementing automated CI/CD pipelines.",
      "Swarn is known for driving innovation in software development, focusing on rapid product development while ensuring compliance with industry best practices. Throughout his career, he has spearheaded initiatives to streamline product development cycles, enhance team collaboration, and optimize workflows. His leadership has consistently improved team efficiencies, enabling faster product delivery without compromising quality.",
      "Before joining Insights Curry, Swarn held senior positions at Icreon, McKinsey & Company, and Absolutdata Analytics, where he was responsible for leading full-cycle software development projects, guiding teams from concept to solution, and ensuring high-quality project delivery. He brings a wealth of experience in software engineering, project management, and solution architecture, making him a thought leader in the space of software development and process optimization.",
    ],
  },
];

export const getTeamMember = (slug: string) => team.find((m) => m.slug === slug);

/** Life at Insights Curry gallery — originals from the Figma file (centre photo first = index 1). */
export const lifePhotos = [
  { src: "/images/about/life-1.jpg", alt: "The Insights Curry team on a countryside trip" },
  { src: "/images/about/life-2.jpg", alt: "Insights Curry team members posing together" },
  { src: "/images/about/life-3.jpg", alt: "The Insights Curry team on a jeep safari" },
  { src: "/images/about/life-4.jpg", alt: "The Insights Curry team at an outing" },
  { src: "/images/about/life-5.jpg", alt: "The Insights Curry team at the playground" },
  { src: "/images/about/life-6.jpg", alt: "The Insights Curry team in an open field" },
  { src: "/images/about/life-7.jpg", alt: "The Insights Curry team posing under the trees" },
  { src: "/images/about/life-8.jpg", alt: "The Insights Curry team enjoying the pool" },
];
