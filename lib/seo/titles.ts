/**
 * Short <title> text for team pages, blogs, case studies and press releases whose on-page headline is
 * too long for a search result. Only the browser tab, the Google result
 * and share previews use these; the H1 on the page stays the full title.
 *
 * Keyed by path. Keep each under ~43 characters: buildMetadata adds
 * " | Insights Curry" (17), and Google cuts titles at about 60.
 */
const SEO_TITLES: Record<string, string> = {
  // Team
  "/about-us/team/swarn-arora": "Swarn Arora, Engineering Strategist",
  // Blogs
  "/blogs/beyond-age-25-34-demographic-segmentation": "Demographic Segmentation No Longer Works",
  "/blogs/ai-customer-segmentation-explained": "AI Customer Segmentation Explained",
  "/blogs/attitudinal-vs-behavioral-segmentation": "Attitudinal vs Behavioral Segmentation",
  "/blogs/build-vs-buy-custom-ai-applications": "Build vs Buy: Custom AI Applications",
  "/blogs/from-mvp-to-platform-scaling-digital-products": "Scaling Digital Products: MVP to Platform",
  "/blogs/turning-ai-models-into-usable-products": "Turning AI Models into Usable Products",
  "/blogs/predictive-models-that-change-allocation": "Predictive Models That Change Allocation",
  "/blogs/before-you-fund-another-pilot-check-ai-ready-data": "Is Your Data AI-Ready? Check Before a Pilot",
  "/blogs/look-at-existing-research-before-you-spend": "Reuse the Market Research You Already Have",
  "/blogs/can-you-still-ask-your-segments-new-questions": "Can You Ask Your Segments New Questions?",
  "/blogs/before-you-ask-1-000-consumers-ask-a-smaller-question": "Test a Smaller Question Before a Big Survey",
  "/blogs/the-hidden-cost-of-fragmented-market-research": "The Hidden Cost of Fragmented Research",
  "/blogs/research-was-built-for-a-slower-world": "Research Was Built for a Slower World",
  "/blogs/the-question-after-the-question": "Why Probing Matters in Consumer Research",
  "/blogs/beyond-surveys-why-the-future-of-consumer-research": "Beyond Surveys: Conversational Research",
  "/blogs/usage-and-attitude-studies-explained": "Usage and Attitude Studies Explained",
  "/blogs/concept-testing-101": "Concept Testing 101: Will Your Idea Sell?",
  "/blogs/how-to-test-ad-effectiveness-before-launch": "How to Test Ad Effectiveness Before Launch",
  "/blogs/new-product-development-research-for-fmcg-and-cpg-brands": "New Product Development Research for FMCG",
  "/blogs/automotive-concept-testing-validate-new-vehicle-features": "Automotive Concept Testing Before Launch",
  "/blogs/what-is-agentic-ai-plain-language-guide": "What Is Agentic AI? A Plain-Language Guide",
  "/blogs/why-every-ai-use-case-shouldnt-need-its-own-architecture": "One AI Architecture for Every Use Case",
  "/blogs/from-resume-screening-to-risk-scoring": "From Resume Screening to Risk Scoring",
  "/blogs/ai-consulting-for-retail-identifying-the-right-use-cases": "AI Consulting for Retail: Picking Use Cases",
  "/blogs/ai-strategy-for-banking-and-financial-services": "AI Strategy for Banking: Prioritising Use Cases",
  // Case studies
  "/case-studies/the-positioning-line-the-room-loved-never-got-tested": "Why Testing the Positioning Line Paid Off",
  "/case-studies/from-a-spreadsheet-no-one-trusted-to-a-platform": "From Untrusted Spreadsheet to Team Platform",
  "/case-studies/the-recommendation-that-used-to-take-three-weeks": "Recommendations in 3 Days, Not 3 Weeks",
  "/case-studies/ai-powered-property-recommendation-decision-intelligence": "AI Property Recommendation Engine",
  "/case-studies/the-rating-told-them-what-happened-nobody-could-say-why": "Ratings Told Them What, Not Why",
  "/case-studies/nobody-built-a-hiring-workflow-they-described-one": "A Hiring Workflow Built From a Description",
  "/case-studies/the-hire-that-would-have-taken-four-months": "The Hire That Would Have Taken Four Months",
  "/case-studies/the-segment-that-looked-small-on-the-tracker": "The Small Segment Worth Building For",
  "/case-studies/two-segments-same-feature-opposite-reasons": "Two Segments, One Feature, Opposite Reasons",
  "/case-studies/an-mvp-built-to-answer-one-question": "An MVP Built to Answer One Question",
  "/case-studies/the-bad-data-would-have-shipped-in-the-old-process": "Bad Data Caught on Day Two",
  "/case-studies/predicting-vehicle-demand-before-acquisition": "Predicting Vehicle Demand Pre-Acquisition",
  "/case-studies/the-problem-wasnt-finding-opinions": "Catching Opinions Before the Moment Passes",
  "/case-studies/the-dashboard-they-asked-for-turned-into-an-alert-system": "A Dashboard That Became an Alert System",
  "/case-studies/the-feature-everyone-wanted-built": "The Feature Nobody Would Pay For",
  // Press releases
  "/media/insights-curry-launches-ai-ecosystem": "Insights Curry Launches AI Ecosystem",
};

/** The short title for a path, or the page's own title when it is already short. */
export const seoTitle = (path: string, fallback: string) => SEO_TITLES[path] ?? fallback;
