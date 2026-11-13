import { blogTeasers, type BlogCategoryId } from "@/data/blogs";
import { sectionBlogs } from "@/data/section-blogs";

/**
 * Structured article content for `/blogs/[slug]`. The article page renders
 * `body` block by block, so new articles only need data, no new markup.
 */

export interface ArticleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ArticleBlock =
  | { type: "heading"; text: string }
  /** Supports **bold** segments. */
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; text: string; title?: string }
  | { type: "image"; image: ArticleImage; caption?: string }
  /** Text on one side, image on the other (image right by default). */
  | { type: "split"; blocks: ArticleBlock[]; image: ArticleImage; imageSide?: "left" | "right" }
  /** Two side-by-side text columns. */
  | { type: "columns"; columns: ArticleBlock[][] };

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Short summary, also used for SEO description and the related-posts cards. */
  excerpt: string;
  category: BlogCategoryId;
  /** Paragraph under the title. */
  intro: string;
  heroImage: ArticleImage;
  body: ArticleBlock[];
  faqs?: ArticleFaq[];
  /** ISO date (YYYY-MM-DD). The design shows no date, so none is rendered until supplied. */
  publishedAt?: string;
  author?: string;
  /** e.g. "6 min read". Rendered only when set. */
  readTime?: string;
}

const waves: ArticleImage = {
  src: "/images/blog/blog-1.png",
  alt: "Abstract orange, blue and magenta curved waves",
  width: 1774,
  height: 887,
};

/**
 * Alt text for the article hero pictures, keyed by image path. The same
 * pictures appear on the blog cards, where they stay alt="" because the
 * card link already carries the title.
 */
const heroAlt: Record<string, string> = {
  "/images/blog/insignai/blog-1.png": "Hands reviewing a pie chart report beside a laptop",
  "/images/blog/insignai/blog-2.png": "Presenter walking colleagues through a market research board in a meeting room",
  "/images/blog/insignai/blog-3.png": "Hand holding an hourglass over printed charts and a laptop",
  "/images/blog/persona-ai/blog-1.png": "Hands on a laptop keyboard with a floating digital library of research documents",
  "/images/blog/persona-ai/blog-2.png": "Miniature people standing on the slices of a colourful 3D pie chart",
  "/images/blog/persona-ai/blog-3.png": "Person holding a clear question mark in front of their chest",
  "/images/blog/segmentiq/blog-1.png": "Coloured figurines grouped around the segments of a pie chart, inspected with a magnifying glass",
  "/images/blog/segmentiq/blog-2.png": "Robotic hand selecting a group in a network of connected customer profiles",
  "/images/blog/segmentiq/blog-3.png": "Red and blue figures standing apart from two groups of black figures",
  "/images/blog/enspeek/blog-1.png": "Team at a laptop with chat bubbles and an AI assistant asking follow-up questions",
  "/images/blog/enspeek/blog-2.png": "Thoughtful woman surrounded by question marks on a chalkboard",
  "/images/blog/enspeek/blog-3.png": "Researcher in conversation with a participant in a relaxed studio",
  "/images/blog/talknact/blog-1.png": "Team at a laptop with a diagram of connected AI agents feeding a results chart",
  "/images/blog/talknact/blog-2.png": "Open-plan operations centre with staff at dashboards around a central AI system",
  "/images/blog/talknact/blog-3.png": "Busy office with streams of data flowing between teams, screens and servers",
  "/images/blog/research-sol/blog-1.png": "People in a bright atrium with flowing ribbons of light connecting them",
  "/images/blog/research-sol/blog-2.png": "Research team sketching and discussing ideas around a workshop table",
  "/images/blog/research-sol/blog-3.png": "Presenter sharing concept boards with a seated group of participants",
  "/images/blog/research-sol/blog-4.png": "Businessman touching a virtual screen showing a product hexagon linked to innovation icons",
  "/images/blog/research-sol/blog-5.png": "Open hand holding a glowing car icon surrounded by data graphics",
  "/images/blog/custom-tech/blog-1.png": "Two colleagues looking concerned at an analytics dashboard and a laptop",
  "/images/blog/custom-tech/blog-2.png": "Laptop with floating icons for goals, analytics, search and settings",
  "/images/blog/custom-tech/blog-3.png": "Man taking notes at a laptop behind an AI circuit-board graphic",
  "/images/blog/ai-solutions/blog-1.png": "Hands on a laptop surrounded by an AI chip icon and data charts",
  "/images/blog/ai-solutions/blog-2.png": "Hand at a laptop with an LLM icon connected to cloud, document and settings icons",
  "/images/blog/ai-solutions/blog-3.png": "Magnifying glass checking a data table with a verified tick on a laptop screen",
  "/images/blog/ai-solutions/blog-4.png": "Shoppers in a homeware store being helped by a friendly service robot with a touchscreen",
  "/images/blog/ai-solutions/blog-5.png": "Robotic hand and human hand reaching towards a glowing bank icon",
};
const altFor = (src: string) => heroAlt[src] ?? "";

const featured = blogTeasers[0];

const demographicPost: BlogPost = {
  slug: featured.slug,
  title: featured.title,
  excerpt: featured.excerpt,
  category: featured.category,
  intro:
    "Open almost any customer segmentation report from the last decade and you will find the same shorthand. Age 25 to 34. Urban. Middle income. College educated. These labels show up in marketing decks, media plans, and product briefs as if they explain something important about how people actually behave. They don't.",
  heroImage: { src: featured.image, alt: altFor(featured.image), width: 1774, height: 887 },
  body: [
    {
      type: "paragraph",
      text: "Demographic segmentation was built for a world with far less data and far fewer tools to make sense of it. It gave marketers a way to group people using information that was easy to collect: age, income, location, gender, education. That made sense when surveys were expensive and analysis was slow. It made far less sense once companies started sitting on years of behavioral and attitudinal data they weren't using.",
    },
    {
      type: "paragraph",
      text: "The problem isn't that demographics are wrong. Two 28 year old women in the same city with similar incomes can have completely different reasons for buying, completely different price sensitivities, and completely different brand loyalties. Customer segmentation that stops at demographics treats these two people as interchangeable, when in reality they might belong to entirely different customer segments with different needs.",
    },
    { type: "heading", text: "Why demographic segmentation feels safe but performs poorly" },
    {
      type: "split",
      image: { ...waves, alt: "Abstract orange, blue and magenta curved waves" },
      blocks: [
        {
          type: "paragraph",
          text: "Demographic segmentation persists for a simple reason. It is easy to explain in a boardroom. Everyone understands what \"women 25 to 34\" means. Nobody needs training to interpret it.",
        },
        {
          type: "paragraph",
          text: "But easy to explain is not the same as useful. Marketing teams that build campaigns around demographic segments often find that response rates plateau, that messaging feels generic, and that the same creative gets recycled across audiences that have nothing in common except a shared age bracket. A 30 year old buying baby products and a 30 year old training for a marathon might land in the same demographic bucket, yet they need almost nothing in common from a brand.",
        },
        {
          type: "paragraph",
          text: "The deeper issue is that demographics describe who someone is on paper. They say nothing about why they buy, what motivates them, or how they think about a category. Behavioral segmentation and attitudinal segmentation exist precisely to answer those questions, and most organizations already have the data to build them. It usually sits in brand trackers, usage and attitude studies, and customer satisfaction research that never gets mined for anything beyond a topline chart.",
        },
      ],
    },
    { type: "heading", text: "What behavioral segmentation actually captures" },
    {
      type: "paragraph",
      text: "Behavioral segmentation groups people by what they do rather than who they are. Purchase frequency, product usage, channel preference, response to past campaigns, switching behavior. These signals tend to predict future behavior far more reliably than a birth year ever could.",
    },
    {
      type: "paragraph",
      text: "Consider two customers who both fall into the same income bracket. One buys premium products only during sales and switches brands often. The other buys at full price and has stayed loyal for years. A demographic segmentation model would place them together. A behavioral segmentation model would separate them immediately, because their purchase patterns tell two different stories about value and loyalty.",
    },
    {
      type: "paragraph",
      text: "This distinction matters for something as basic as budget allocation. If a marketing team knows which behavioral segment is price sensitive and which is loyalty driven, it can build offers that actually match how each group makes decisions instead of guessing based on a shared age range.",
    },
    {
      type: "columns",
      columns: [
        [
          { type: "heading", text: "Attitudinal segmentation adds the missing layer of why" },
          {
            type: "paragraph",
            text: "Behavioral data tells you what people do. Attitudinal segmentation tells you why they do it. It captures beliefs, values, motivations, and the emotional drivers behind a purchase decision.",
          },
          {
            type: "paragraph",
            text: "Two customers who buy the exact same product for the exact same price can have very different motivations. One might be driven by status. Another might be driven by practicality. A third might be responding to social proof from friends and family. If a brand only segments by demographics or even by behavior alone, it will still miss these motivational differences, and its messaging will keep speaking past large parts of its audience.",
          },
          {
            type: "paragraph",
            text: "Attitudinal segmentation is where research becomes genuinely strategic. It shapes not just who gets targeted, but what gets said to them. A campaign built around status appeals to a status driven segment and falls flat with a practicality driven one, even if both segments buy the same product at the same rate.",
          },
        ],
        [
          { type: "heading", text: "Where organizations get stuck" },
          {
            type: "paragraph",
            text: "If behavioral and attitudinal segmentation are so much more useful, why does demographic segmentation still dominate? The honest answer is that building better segments has traditionally required specialist skills that most marketing and insights teams don't have on staff.",
          },
          {
            type: "paragraph",
            text: "Identifying which variables actually drive meaningful differences between customers takes statistical judgment. Running clustering models, testing different numbers of segments, and validating that the resulting groups are stable and interpretable takes technical expertise. Translating cluster output into a story that a brand manager or product team can act on takes yet another skill set entirely. Most organizations end up needing a data scientist, a market researcher, and a strategist working together, and that combination is expensive and slow to assemble for every project.",
          },
          {
            type: "paragraph",
            text: "So teams default to what they can do without outside help. Demographic segmentation using survey data they already collect, cut by the same handful of variables every time. It's not that anyone believes it's the best approach. It's that the alternative has felt out of reach.",
          },
        ],
      ],
    },
    { type: "heading", text: "How AI is closing that gap" },
    {
      type: "paragraph",
      text: "This is exactly the gap that platforms like SegmentIQ were built to close. Instead of requiring a statistics background or a separate analytics vendor, SegmentIQ lets teams describe their business objective in plain language and upload their survey data. From there, the platform identifies which variables actually differentiate customers, separates descriptive variables from the ones that genuinely predict behavior, and builds statistically sound segments without anyone needing to touch a clustering algorithm directly.",
    },
    {
      type: "paragraph",
      text: "What used to take a research team days of variable selection and model testing now happens through a conversation. The platform recommends the segmentation approach, explains why specific variables were included, and produces segment profiles that read like a business story rather than a statistical output. Instead of ending with cluster numbers and a spreadsheet, teams get rich customer profiles that explain who each segment is, what motivates them, and how to reach them with the right message and offer.",
    },
    {
      type: "paragraph",
      text: "This matters because the value of segmentation was never the clustering itself. It was always the decision that came after. A segmentation model that produces accurate but unexplained clusters is only marginally better than no segmentation at all, because nobody in the organization can act on numbers they don't understand. AI powered segmentation closes that gap by pairing statistical rigor with executive ready explanation.",
    },
    { type: "image", image: waves },
    { type: "heading", text: "What better segmentation changes downstream" },
    {
      type: "paragraph",
      text: "Once an organization moves past demographic segmentation, the effects show up in places beyond the research report itself. Campaign targeting becomes sharper because messaging maps to motivation instead of age bracket. Product teams get clearer signals about which features matter to which customer group. Customer experience teams can prioritize service improvements based on what actually drives satisfaction for high value segments, rather than applying the same standard across everyone.",
    },
    {
      type: "paragraph",
      text: "Perhaps most importantly, better segmentation surfaces opportunities that demographic cuts hide entirely. A behaviorally and attitudinally distinct segment might cut across multiple age groups, incomes, and locations, meaning it would never appear if the analysis stopped at standard demographic variables. Organizations that only segment demographically are, by definition, blind to any customer group that doesn't align neatly with those categories.",
    },
    {
      type: "paragraph",
      text: "The goal was never to build segments for their own sake. It was always to make better decisions about who to target, what to say, and where to invest. Demographic segmentation answers a narrow question about who your customers are on paper. Behavioral and attitudinal segmentation answer the questions that actually drive growth: why they buy, what they need, and how to win them.",
    },
  ],
  // Reading order of the design (two columns, left to right then down).
  faqs: [
    {
      q: "What is the difference between demographic and behavioral segmentation?",
      a: "Demographic segmentation groups customers by traits like age, income, and location. Behavioral segmentation groups them by what they actually do, including purchase frequency, product usage, and response to past marketing.",
    },
    {
      q: "Why is demographic segmentation still so common?",
      a: "It is easy to explain and requires no statistical expertise, since most organizations already collect basic demographic data through standard surveys.",
    },
    {
      q: "Can attitudinal segmentation be combined with behavioral data?",
      a: "Yes. The strongest customer segmentation models often combine behavioral data with attitudinal data to explain both what customers do and why they do it.",
    },
    {
      q: "Does building better segments always require a data science team?",
      a: "Not anymore. AI powered platforms can now handle variable selection, clustering, and profile generation without requiring in house statistical expertise.",
    },
    {
      q: "How long does a proper segmentation project usually take?",
      a: "Traditional segmentation projects can take weeks between variable selection, modeling, and interpretation. AI powered tools can complete comparable work in a fraction of that time.",
    },
    {
      q: "What data is needed to build behavioral or attitudinal segments?",
      a: "Survey data, respondent level datasets, brand tracking studies, and usage and attitude research all provide the raw material needed to build these segments.",
    },
    {
      q: "Is demographic data still useful at all?",
      a: "Yes, but as a profiling layer rather than the primary basis for segmentation. It helps describe a segment once it has been built, rather than defining the segment itself.",
    },
  ],
};

/** Card picture and category for a listing teaser, so each article reuses them. */
function teaserOf(slug: string) {
  const t = blogTeasers.find((b) => b.slug === slug);
  if (!t) throw new Error(`Unknown blog slug: ${slug}`);
  return t;
}

const aiSegmentationTeaser = teaserOf("ai-customer-segmentation-explained");

/** Text supplied by the client in the "IC - Product Page Blogs - Case Studies" document (SegmentIQ tab, Blog 2). */
const aiSegmentationPost: BlogPost = {
  slug: aiSegmentationTeaser.slug,
  // The listing card shortens the title with "..."; the article shows it in full.
  title: "AI customer segmentation explained: how machine learning builds better segments than manual clustering",
  excerpt: aiSegmentationTeaser.excerpt,
  category: aiSegmentationTeaser.category,
  intro:
    "A research analyst once described manual clustering as \"reading tea leaves with a calculator.\" She was only half joking. Traditional segmentation work involves running a model, looking at the output, deciding it doesn't quite make sense, adjusting the variables, running it again, and repeating that cycle until something interpretable emerges. It's iterative, it's slow, and a lot of the decision making happens on instinct rather than evidence.",
  body: [
    {
      type: "paragraph",
      text: "That process isn't broken because the people running it are careless. It's broken because manual clustering was never designed to scale the way modern research demands. Every new dataset means starting from a blank slate. Every variable decision rests on the analyst's judgment about what might matter, rather than a systematic test of what actually does. AI customer segmentation changes that equation by handling the parts of the process that used to require the most specialized expertise and the most guesswork.",
    },
    { type: "heading", text: "What manual clustering actually involves" },
    {
      type: "paragraph",
      text: "To understand why machine learning changes the picture, it helps to see what a manual segmentation project typically looks like from the inside.",
    },
    {
      type: "paragraph",
      text: "An analyst starts with a dataset, often a survey with dozens or hundreds of variables. Before any clustering algorithm runs, someone has to decide which variables belong in the model. Too many variables and the clusters become noisy and hard to interpret. Too few and the segments miss what actually distinguishes customers from each other. This variable selection step is where a lot of segmentation projects go wrong, and it depends heavily on the analyst's prior experience with similar categories.",
    },
    {
      type: "paragraph",
      text: "Once variables are chosen, the analyst has to pick a clustering method. K-means, hierarchical clustering, latent class analysis, and several other approaches all produce different results from the same data. Then comes the question of how many segments to build. Three segments might be too broad to act on. Eight might be too granular for a marketing team to actually target. Choosing the right number typically involves running the model multiple times at different segment counts and comparing statistical fit measures against a subjective sense of whether the resulting groups feel meaningful.",
    },
    {
      type: "paragraph",
      text: "After the model runs, someone still has to name the segments, describe them, and translate cluster numbers into a story a brand manager can use. That last step, turning statistical output into a business narrative, is often the most time consuming part of the entire project, and it's rarely built into the clustering software itself.",
    },
    {
      type: "paragraph",
      text: "Each of these stages introduces a decision point where two different analysts, given the same data, might land on two different sets of segments. That's not a flaw specific to any one researcher. It's a structural weakness of a process that depends on human judgment at every turn.",
    },
    { type: "heading", text: "Where machine learning changes the process" },
    {
      type: "paragraph",
      text: "Machine learning based segmentation doesn't eliminate judgment entirely, but it removes the guesswork from the stages where guesswork causes the most damage.",
    },
    {
      type: "paragraph",
      text: "Variable selection is the clearest example. Instead of an analyst guessing which of a hundred survey questions matter most, machine learning approaches can systematically test how much each variable actually contributes to separating customers into distinct groups. Variables that add noise without adding distinction get deprioritized. Variables that reveal genuine differences in behavior or attitude get weighted more heavily. This is closer to letting the data show its own structure than imposing a structure on it from the outside.",
    },
    {
      type: "paragraph",
      text: "The same logic applies to choosing the number of segments and the clustering approach itself. Rather than running one method a handful of times and eyeballing the results, machine learning systems can test multiple approaches against the data and evaluate which produces segments that are both statistically distinct and practically interpretable. That combination matters. A segmentation model can be statistically elegant and still be useless if nobody in the organization can explain what separates one segment from another.",
    },
    { type: "heading", text: "Behavioral and attitudinal signals, not just demographics" },
    {
      type: "paragraph",
      text: "One of the quieter benefits of machine learning based segmentation is that it makes it practical to build segments from behavioral and attitudinal variables rather than defaulting to demographics. Demographic data is easy to collect and easy to explain, which is why so much segmentation still relies on it. But it rarely explains why customers behave the way they do.",
    },
    {
      type: "paragraph",
      text: "Manual clustering can technically incorporate behavioral and attitudinal variables too, but doing so well requires an analyst who understands both the statistical techniques and the substantive meaning behind dozens of survey items. That combination of skills is rare, and it's part of why so many segmentation projects default back to simpler demographic cuts under time pressure.",
    },
    {
      type: "paragraph",
      text: "Machine learning systems can process far more variables than a human analyst can reasonably hold in mind at once. That makes it realistic to build segments around purchase motivation, brand attitudes, category usage patterns, and satisfaction drivers, alongside whatever demographic information is available. The result tends to be segments that explain not just who buys a product, but why they buy it and what will make them buy again.",
    },
    { type: "heading", text: "Speed changes what segmentation gets used for" },
    {
      type: "paragraph",
      text: "There's a practical dimension to this shift that gets less attention than the statistical one. Manual segmentation projects often take weeks from data collection to final report. That timeline means segmentation gets treated as a periodic exercise, something done once a year or once per major research wave, rather than something teams can revisit whenever a new question comes up.",
    },
    {
      type: "paragraph",
      text: "When segmentation can be built in a fraction of that time, it stops being a one-off deliverable and starts becoming a tool teams can use repeatedly. A marketing team testing a new campaign angle can check whether it resonates differently across segments before launch, not just analyze results after the fact. A product team weighing two feature directions can see how each segment is likely to respond, rather than waiting for the next scheduled tracking study to update.",
    },
    {
      type: "paragraph",
      text: "This is where platforms like SegmentIQ have changed what's realistic for teams without dedicated data science resources. Instead of commissioning a new segmentation project and waiting weeks for results, a team can describe its business objective, upload survey data, and have the platform handle variable selection, model building, and profile generation in a single session. The heavy statistical work still happens, it just happens without requiring someone on staff who specializes in clustering algorithms.",
    },
    { type: "heading", text: "Explainability closes the trust gap" },
    {
      type: "paragraph",
      text: "A fair concern about machine learning based approaches is that they can feel like a black box. If a model produces five customer segments, stakeholders reasonably want to know why those five and not four or six, and why a given variable ended up mattering so much.",
    },
    {
      type: "paragraph",
      text: "This is where the difference between older automated clustering tools and current AI powered segmentation platforms becomes important. The earlier generation of clustering software could run the math, but it rarely explained its own decisions in language a business audience could use. Modern platforms are built to show their work. SegmentIQ, for instance, is designed to explain exactly why specific variables were selected and what distinguishes one segment from another, rather than handing over a spreadsheet of cluster assignments and leaving interpretation entirely to the client.",
    },
    {
      type: "paragraph",
      text: "That explainability matters more than it might seem. A segmentation model that a brand manager doesn't trust won't get used, no matter how statistically sound it is. Pairing machine learning with clear, business-readable explanations is what actually gets segmentation adopted into day-to-day decision making rather than filed away after the initial presentation.",
    },
    { type: "heading", text: "What this means for research and marketing teams" },
    {
      type: "paragraph",
      text: "None of this suggests that human judgment disappears from segmentation work. Someone still needs to define the business question that segmentation is meant to answer, decide what \"actionable\" looks like for their organization, and translate segment insights into actual campaigns and product decisions. Machine learning doesn't replace that layer of strategic thinking. It replaces the layer underneath it, the manual variable testing, the repeated clustering runs, and the slow translation from statistical output to plain language description.",
    },
    {
      type: "paragraph",
      text: "For teams that have historically avoided advanced segmentation because it required resources they didn't have, that shift matters. It means segmentation stops being reserved for organizations large enough to employ dedicated data scientists, and becomes accessible to any team with survey data and a clear business question. The quality of the underlying customer segments improves at the same time the process becomes faster, which is not a trade-off researchers are used to being offered.",
    },
  ],
  faqs: [
    {
      q: "How is AI customer segmentation different from traditional clustering software?",
      a: "Traditional clustering software still requires an analyst to select variables, choose a method, and interpret results manually. AI customer segmentation automates variable selection and model comparison, and generates business-readable explanations of the resulting segments.",
    },
    {
      q: "Does machine learning segmentation still require survey data?",
      a: "Yes. The quality of any segmentation model depends on the underlying data, whether that comes from surveys, respondent-level datasets, or tracking studies.",
    },
    {
      q: "Can AI segmentation combine behavioral and attitudinal data?",
      a: "Yes, and this is one of its main advantages over manual clustering, since it can process far more variables than a human analyst can reasonably manage by hand.",
    },
    {
      q: "Is machine learning segmentation less accurate because it's automated?",
      a: "No. Automation removes inconsistency between analysts and tests more variable combinations than manual processes typically allow, which tends to improve rather than reduce accuracy.",
    },
    {
      q: "How long does an AI powered segmentation project take compared to a manual one?",
      a: "Manual segmentation projects often take weeks. AI powered platforms can complete comparable analysis in a single session, depending on dataset size and complexity.",
    },
    {
      q: "Do teams still need a data scientist to use AI segmentation platforms?",
      a: "No. Platforms like SegmentIQ are built for business users to describe their objective in plain language, without requiring in-house statistical expertise.",
    },
    {
      q: "Why does explainability matter for AI segmentation?",
      a: "Segments that stakeholders don't understand rarely get used, regardless of how statistically sound they are. Clear explanations of why variables and segments were chosen are what make the results actionable.",
    },
  ],
  heroImage: { src: aiSegmentationTeaser.image, alt: altFor(aiSegmentationTeaser.image), width: 1774, height: 887 },
};

const attitudinalTeaser = teaserOf("attitudinal-vs-behavioral-segmentation");

/** Text supplied by the client in the "IC - Product Page Blogs - Case Studies" document (SegmentIQ tab, Blog 3). */
const attitudinalPost: BlogPost = {
  slug: attitudinalTeaser.slug,
  title: attitudinalTeaser.title,
  excerpt: attitudinalTeaser.excerpt,
  category: attitudinalTeaser.category,
  intro:
    "A beverage brand once ran two segmentation projects on the same customer base within the same year. The first grouped customers by what they bought, how often, and through which channel. The second grouped them by what they believed about health, indulgence, and social status. The two models produced almost no overlap. Customers who looked identical in the behavioral segmentation split apart completely once attitudes entered the picture, and customers who shared little in common behaviorally turned out to hold nearly identical beliefs about the category.",
  body: [
    {
      type: "paragraph",
      text: "Neither segmentation was wrong. They were answering different questions. That's the part of the attitudinal versus behavioral debate that gets lost when people treat one as simply better than the other. The real question isn't which model is superior. It's which question your business needs answered right now, because behavioral and attitudinal segmentation are built to answer different ones, and using the wrong one for the job wastes both the research budget and the decision it was meant to support.",
    },
    { type: "heading", text: "What behavioral segmentation actually measures" },
    {
      type: "paragraph",
      text: "Behavioral segmentation groups customers by what they do. Purchase frequency, spending level, channel choice, product usage, response to past promotions, and switching patterns all fall into this category. It relies on data that is often already sitting inside a company's systems, whether that's transaction records, loyalty program activity, or survey responses about past behavior.",
    },
    {
      type: "paragraph",
      text: "The strength of behavioral segmentation is that it's grounded in fact rather than self-report. Customers don't always know or accurately describe why they do what they do, but their purchase history doesn't lie about what they actually bought. This makes behavioral segments useful for questions tied directly to revenue and retention. Which customers are at risk of churning? Which segment responds best to a discount versus a loyalty reward? Which customers have the highest lifetime value, and what distinguishes them from the rest?",
    },
    {
      type: "paragraph",
      text: "Behavioral segmentation also tends to be more stable over short time periods. A customer's purchase pattern this quarter is a reasonably strong predictor of their pattern next quarter, barring some external disruption. That stability makes behavioral segments a solid foundation for operational decisions like inventory planning, retention campaigns, and pricing strategy.",
    },
    {
      type: "paragraph",
      text: "Where behavioral segmentation falls short is explanation. It can tell you that a segment buys premium products only during sales, but it can't tell you whether that's because they're price sensitive, because they're waiting for validation before committing, or because sales periods happen to align with when they have disposable income. The behavior is visible. The reason behind it isn't.",
    },
    { type: "heading", text: "What attitudinal segmentation actually measures" },
    {
      type: "paragraph",
      text: "Attitudinal segmentation groups customers by beliefs, values, motivations, and perceptions rather than actions. It typically comes from survey data designed to capture how people feel about a category, what they prioritize when making a decision, and what emotional or psychological needs a product fulfills for them.",
    },
    {
      type: "paragraph",
      text: "This is where the \"why\" behind behavior starts to show up. Two customers with identical purchase histories might belong to completely different attitudinal segments. One buys a premium skincare product because status matters to them and the brand signals something about who they are. Another buys the same product because they genuinely believe in the ingredients and the science behind them. Behaviorally, they're indistinguishable. Attitudinally, they need entirely different messaging to keep them engaged.",
    },
    {
      type: "paragraph",
      text: "Attitudinal segmentation is particularly valuable for questions about positioning, messaging, and communication. Which claims will resonate with which audience? What emotional territory should a campaign occupy? Which segment is driven by social proof versus personal conviction? These are questions that behavioral data simply can't answer, because behavior shows the outcome of a decision without revealing the reasoning that produced it.",
    },
    {
      type: "paragraph",
      text: "The tradeoff is that attitudinal data depends on self-report, which introduces its own distortions. People don't always have accurate insight into their own motivations, and survey responses about beliefs and values can shift more than actual purchase behavior does, particularly in response to recent events or how a question happens to be framed. Attitudinal segments also tend to require more careful survey design upfront, since the quality of the segmentation depends entirely on how well the underlying questions capture genuine differences in belief rather than surface-level opinion.",
    },
    { type: "heading", text: "Why the choice matters more than either model alone" },
    {
      type: "paragraph",
      text: "Treating this as a competition between two techniques misses the point. The real skill lies in matching the segmentation approach to the specific decision it needs to inform.",
    },
    {
      type: "paragraph",
      text: "A retention team trying to identify which customers are about to churn needs behavioral segmentation. Attitudinal data might explain why those customers feel disengaged, but the behavioral signal, declining purchase frequency or reduced app usage, is what flags the risk in time to act on it. A brand team developing a new campaign concept needs attitudinal segmentation, because messaging built around demographic or behavioral patterns alone tends to feel generic even when it's technically well targeted. It answers what people do without answering what will move them.",
    },
    {
      type: "paragraph",
      text: "Product teams often need both at once. Behavioral data shows which features get used and by whom. Attitudinal data explains why certain features matter to certain customers and what unmet need a new feature might satisfy. Building a product roadmap on behavioral data alone risks optimizing for what people currently do rather than what they actually want, while building on attitudinal data alone risks chasing stated preferences that don't translate into real usage.",
    },
    { type: "heading", text: "Combining both models without doubling the work" },
    {
      type: "paragraph",
      text: "The most reliable customer segments tend to draw on behavioral and attitudinal data together rather than treating them as separate projects. A segment defined only by behavior tells you what happened. A segment defined only by attitude tells you what people believe. A segment that layers both tells you what happened, why it happened, and what's likely to happen next.",
    },
    {
      type: "paragraph",
      text: "This combined approach has historically been harder to execute than running either model alone, mostly because it multiplies the variable selection problem. An analyst now has to weigh purchase data alongside dozens of attitudinal survey items, decide how much weight each type of variable should carry, and make sure the resulting segments remain interpretable rather than collapsing into noise. That complexity is a large part of why so many organizations default to running one type of segmentation and treating the other as a secondary layer added after the fact, if it gets added at all.",
    },
    {
      type: "paragraph",
      text: "This is where AI-powered segmentation platforms have changed what's realistic. SegmentIQ, for example, is built to work across both behavioral and attitudinal variables in the same model, automatically identifying which ones actually drive meaningful differences between customers rather than requiring an analyst to manually weigh dozens of survey items against transaction data. Instead of running two separate segmentation projects and trying to reconcile them afterward, teams can build a single model that captures what customers do and why they do it, then get a clear explanation of which variables mattered most in shaping each segment.",
    },
    { type: "heading", text: "A practical way to decide" },
    {
      type: "paragraph",
      text: "For teams unsure which approach fits their current question, a few checks tend to clarify things quickly. If the decision at hand involves targeting, retention, pricing, or anything tied directly to revenue, behavioral segmentation should carry more weight, since it's grounded in what customers have actually done. If the decision involves messaging, positioning, brand perception, or concept development, attitudinal segmentation should lead, since those decisions depend on understanding motivation rather than action.",
    },
    {
      type: "paragraph",
      text: "If the decision touches both, which is increasingly common for product strategy and long-term customer experience planning, a combined model is worth the added complexity. The goal in every case is to let the business question determine the segmentation approach, rather than defaulting to whichever data happens to be easiest to access at the time.",
    },
    {
      type: "paragraph",
      text: "Segmentation was never meant to be an academic exercise in clustering. It exists to make specific decisions clearer. Behavioral segmentation clarifies what's happening. Attitudinal segmentation clarifies why. Knowing which one a given decision actually needs, or recognizing when it needs both, is what separates segmentation that gets used from segmentation that gets filed away after the presentation.",
    },
  ],
  faqs: [
    {
      q: "What's the simplest way to explain the difference between behavioral and attitudinal segmentation?",
      a: "Behavioral segmentation groups customers by what they do. Attitudinal segmentation groups them by what they believe and value. One explains action, the other explains motivation.",
    },
    {
      q: "Which type of segmentation is better for marketing campaigns?",
      a: "It depends on the campaign's purpose. Targeting and retention campaigns benefit more from behavioral segmentation, while messaging and positioning work benefits more from attitudinal segmentation.",
    },
    {
      q: "Can a customer belong to different segments under each model?",
      a: "Yes, and this happens often. Two customers with identical purchase behavior can hold completely different beliefs about a category, placing them in different attitudinal segments despite behaving the same way.",
    },
    {
      q: "Is attitudinal data less reliable than behavioral data?",
      a: "It carries different risks rather than being simply less reliable. Attitudinal data depends on self-report and can shift over time, while behavioral data reflects actual actions but doesn't explain the reasoning behind them.",
    },
    {
      q: "Do most organizations need to run both types of segmentation?",
      a: "Not always, but combining them tends to produce segments that are easier to act on, since they explain both what customers do and why they do it.",
    },
    {
      q: "Is it harder to build a combined behavioral and attitudinal model?",
      a: "Traditionally yes, since it multiplies the number of variables an analyst has to weigh manually. AI-powered segmentation platforms have made combined models far more practical.",
    },
    {
      q: "How does SegmentIQ handle both behavioral and attitudinal variables together?",
      a: "SegmentIQ automatically identifies which behavioral and attitudinal variables actually differentiate customers, builds the segmentation model around them, and explains why each variable was included, without requiring manual weighting from an analyst.",
    },
  ],
  heroImage: { src: attitudinalTeaser.image, alt: altFor(attitudinalTeaser.image), width: 1774, height: 887 },
};

/** Section blogs from the client's doc (see data/section-blogs.ts). */
const sectionPosts: BlogPost[] = sectionBlogs.map((b) => {
  const teaser = teaserOf(b.slug);
  return {
    slug: b.slug,
    title: b.title,
    excerpt: teaser.excerpt,
    category: b.category,
    intro: b.intro,
    heroImage: { src: teaser.image, alt: altFor(teaser.image), width: 1774, height: 887 },
    body: b.body,
    faqs: b.faqs,
    readTime: b.readTime,
  };
});

export const blogPosts: BlogPost[] = [
  demographicPost,
  aiSegmentationPost,
  attitudinalPost,
  ...sectionPosts,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
