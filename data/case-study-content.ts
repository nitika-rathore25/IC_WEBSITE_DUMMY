/* eslint-disable */
// GENERATED from the client Google Doc "IC - Product Page Blogs - Case Studies" (the "Case Study" tabs, two per section).
// Edit copy here; cards and /case-studies/[slug] pages are derived from this list.
import type { BlogCategoryId } from "@/data/blogs";
import type { ArticleBlock } from "@/data/blog-posts";

export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudySource {
  slug: string;
  title: string;
  category: BlogCategoryId;
  /** First paragraph, used for the card excerpt and the SEO description. */
  summary: string;
  facts: CaseStudyFact[];
  body: ArticleBlock[];
}

export const caseStudyContent: CaseStudySource[] = [
  {
    "slug": "the-age-band-was-never-the-answer",
    "title": "The age band was never the answer",
    "category": "segmentiq",
    "summary": "A snack brand had a premium baked range ready for a regional pilot across grocery and convenience channels in six metro markets. The product team had a target: adults aged 25 to 34. It came from the last brand tracker and everyone in the room accepted it.",
    "facts": [
      {
        "label": "Category",
        "value": "Packaged snacks, United States"
      },
      {
        "label": "Team",
        "value": "Brand, Innovation, Insights"
      },
      {
        "label": "Question",
        "value": "Who should a premium baked snack range be built for, and what will make the rest walk past it?"
      },
      {
        "label": "Time in SegmentIQ",
        "value": "One working day from upload to segment profiles"
      },
      {
        "label": "What changed",
        "value": "The launch target moved from \"adults 25 to 34\" to one attitudinal segment. The brief for the next study was written around that group."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A snack brand had a premium baked range ready for a regional pilot across grocery and convenience channels in six metro markets. The product team had a target: adults aged 25 to 34. It came from the last brand tracker and everyone in the room accepted it."
      },
      {
        "type": "paragraph",
        "text": "Insights did not. Two people in that age band can buy the same category for opposite reasons. One reads the nutrition label on the back of the bag. The other grabs whatever is on the endcap promotion. The brand had a 1,800-respondent survey from the previous quarter, full of attitudes and usage behavior. Nobody had run a segmentation on it, because that meant waiting for an analyst, and the analyst queue was three weeks out."
      },
      {
        "type": "paragraph",
        "text": "The question was whether the team could get a defensible segmentation from data it already owned, without a statistician in the room."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "**One dataset:** the quarter's category survey. It held 62 attitude statements, purchase frequency, brand repertoire, occasion data, and the usual demographics."
      },
      {
        "type": "paragraph",
        "text": "The team opened SegmentIQ and described the goal in plain English: find groups of snack buyers that differ on what they want from the category, so the premium range can be pointed at one of them."
      },
      {
        "type": "heading",
        "text": "What SegmentIQ built"
      },
      {
        "type": "paragraph",
        "text": "Before any clustering, SegmentIQ assessed the file. It reported respondent counts, missing values, and the spread of each variable. It flagged two attitude items with almost no variation, and the team agreed to drop them."
      },
      {
        "type": "paragraph",
        "text": "It then sorted the remaining variables into two groups. Attitudes and needs went in as drivers. Age, metro market, income, and purchase frequency were held out as profiling variables, so they could describe the segments without creating them. Every classification came with a reason the team could read."
      },
      {
        "type": "paragraph",
        "text": "The 60 attitude items were reduced to seven underlying dimensions using PCA, and the dimensions went into the clustering run. SegmentIQ ran a four-segment solution and a five-segment solution and saved both. The team compared them side by side. The fifth segment split one group into two clusters that differed on almost nothing the business could act on, so they kept four."
      },
      {
        "type": "paragraph",
        "text": "The four segments:"
      },
      {
        "type": "list",
        "items": [
          "**Label Readers:** health-led, check ingredients, open to paying more",
          "**Ritual Snackers:** habit-driven, brand loyal, low interest in new formats",
          "**Deal Hunters:** buy on promotion, switch freely",
          "**Social Sharers:** snack for occasions, care about how it looks on the table"
        ]
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "They did not ask for a list of clusters. They asked what made each group different, what each one wanted from a premium snack, and where each one would be reached."
      },
      {
        "type": "paragraph",
        "text": "Then they pushed on the result. Was the Label Readers group large enough to matter? Did it overlap with any other segment on the attitudes that defined it? Which variables had pulled the segments apart?"
      },
      {
        "type": "paragraph",
        "text": "SegmentIQ answered each question inside the same conversation and showed which variables sat behind every answer."
      },
      {
        "type": "heading",
        "text": "What the segments showed, and what they did not"
      },
      {
        "type": "paragraph",
        "text": "**The age band hid the real split.**"
      },
      {
        "type": "paragraph",
        "text": "Label Readers spread across every age group in the sample. Only 31% of them fell in the 25 to 34 band. The team's original target would have missed most of the people most likely to pay for the range, and included a large number of Deal Hunters who would not."
      },
      {
        "type": "paragraph",
        "text": "**One segment had a natural reason to buy.**"
      },
      {
        "type": "paragraph",
        "text": "Label Readers described snacking as something they wanted to feel fine about. Claims like \"baked, not fried\" and \"no palm oil\" carried weight for them. Ritual Snackers liked the product idea and saw no reason to leave their usual brand. Deal Hunters read \"premium\" as a price problem."
      },
      {
        "type": "paragraph",
        "text": "**Social Sharers were the surprise.**"
      },
      {
        "type": "paragraph",
        "text": "The team had not expected an occasion-led group to matter for a health-positioned range. The profile showed they cared about pack appearance and sharing formats, suited to tailgates and potlucks, and would respond to a different message on the same product. They were flagged as a possible second wave, not a launch target."
      },
      {
        "type": "paragraph",
        "text": "**Willingness to pay was a gap.**"
      },
      {
        "type": "paragraph",
        "text": "The survey measured how often people bought and how they felt about the category. It never asked what they would pay for a baked premium format. SegmentIQ described price attitudes for each group and stopped there. It did not produce a purchase-intent figure the data could not support. The team took that as the instruction for what the next study had to measure."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "Launch targeting moved from an age band to one segment: Label Readers. Social Sharers went onto the roadmap for a later pack format."
      },
      {
        "type": "paragraph",
        "text": "The marketing recommendations SegmentIQ generated for Label Readers became the starting point for the creative brief. The message led on ingredients. The channel plan followed where the segment already spent its time."
      },
      {
        "type": "paragraph",
        "text": "The brief for the next study also changed."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Test consumer response to the premium baked range among adults 25 to 34.",
          "**After:** Among Label Readers, how much more will they pay for the baked format, and which ingredient claim carries the price?"
        ]
      },
      {
        "type": "paragraph",
        "text": "The team exported the clustered dataset and the segment profiles to share with the agency. The executive infographic went into the launch review without anyone building a slide."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "SegmentIQ did not replace the pricing study. It changed who that study was about. The segmentation that used to need three weeks and a specialist took a day, and it moved the team off a target that only looked right on a demographic chart."
      }
    ]
  },
  {
    "slug": "the-positioning-line-the-room-loved-never-got-tested",
    "title": "The positioning line the room loved never got tested, and the brand was better off for it",
    "category": "personaai",
    "summary": "A household cleaning brand was preparing its annual relaunch and had three candidate taglines on the table, all built around the idea of speed: \"5-minute clean,\" \"done before your coffee's ready,\" and \"less scrubbing, more living.\" In the internal workshop, the marketing team gravitated toward the third option. It tested well in the room, and more than one person there had personally complained about scrubbing being a chore.",
    "facts": [
      {
        "label": "Category",
        "value": "Household cleaning, United States"
      },
      {
        "label": "Team",
        "value": "Marketing, Insights"
      },
      {
        "label": "Question",
        "value": "Of three positioning routes for the brand's annual relaunch, which one would actually resonate with the households buying this category every week, instead of just the team that wrote the lines?"
      },
      {
        "label": "Time in PersonaAI",
        "value": "Two working days from a locked brief to a clear recommendation"
      },
      {
        "label": "What changed",
        "value": "The marketing team's favorite line was dropped before the ad agency built a single commercial. The quantitative ad test that followed ran with one positioning route instead of three."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A household cleaning brand was preparing its annual relaunch and had three candidate taglines on the table, all built around the idea of speed: \"5-minute clean,\" \"done before your coffee's ready,\" and \"less scrubbing, more living.\" In the internal workshop, the marketing team gravitated toward the third option. It tested well in the room, and more than one person there had personally complained about scrubbing being a chore."
      },
      {
        "type": "paragraph",
        "text": "The insights team had two existing research studies sitting in a shared drive: a usage and attitude study from the year before, and a more recent brand tracker. Both were full of relevant consumer data that nobody had revisited since the original presentations. Before committing budget to a full quantitative ad test the following month, which would take weeks and cost real money, the team wanted a faster way to check whether the room's favorite line actually held up with real customers, or whether it was simply the line that sounded best to the people who'd spent a month writing it."
      },
      {
        "type": "heading",
        "text": "What a \"digital twin\" means here"
      },
      {
        "type": "paragraph",
        "text": "PersonaAI works by building AI-driven profiles, called digital twins, from a brand's own existing research data. Each twin represents a specific group of real consumers found in that data, built from how those people actually answered survey questions, not from assumptions about who they are. A researcher can then have a conversation with a twin almost like interviewing a focus group, asking it questions and getting answers grounded in the original survey responses behind it."
      },
      {
        "type": "paragraph",
        "text": "This matters because it let the insights team test all three taglines against real customer data within days, instead of waiting for a traditional study to field, close, and get analyzed."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The team fed PersonaAI two existing studies:"
      },
      {
        "type": "paragraph",
        "text": "A household cleaning usage and attitude study covering cleaning occasions, routines, which brands people already used, and what made them trust a cleaning product"
      },
      {
        "type": "paragraph",
        "text": "A more recent brand tracker covering brand consideration, brand image, and whether a product felt like it was \"made for people like me\""
      },
      {
        "type": "paragraph",
        "text": "They described the objective directly to PersonaAI, specified the category as household surface cleaners, focused the analysis on the people who actually do the weekly cleaning in their household, and entered all three tagline options as the thing to be tested."
      },
      {
        "type": "heading",
        "text": "What PersonaAI created"
      },
      {
        "type": "paragraph",
        "text": "From that existing data, PersonaAI built three digital twins, each one representing a distinct group of real respondents found in the survey data, complete with how many respondents backed it up, how well it matched the brief, and how much relevant data existed to support its answers."
      },
      {
        "type": "paragraph",
        "text": "The team moved forward with two of them:"
      },
      {
        "type": "list",
        "items": [
          "**Time-Squeezed Cleaners:** juggling work and household responsibilities, fitting cleaning in around everything else, with strong underlying data on their routines and when they clean",
          "**Standards Keepers:** clean thoroughly no matter how long it takes, judge a cleaning product by the result it delivers rather than how fast it works, with strong underlying data on what makes them trust a product"
        ]
      },
      {
        "type": "paragraph",
        "text": "A third twin, representing younger, first-time buyers of the category, was also created but set aside. It matched the brief reasonably well, but there wasn't enough underlying data about this group's established cleaning habits to trust its answers, and the brand wasn't targeting younger first-time buyers in this relaunch anyway."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "Rather than simply asking each twin \"which tagline do you like best,\" which tends to produce shallow, surface-level preferences, the team had a real conversation with each one. They presented each tagline individually and asked what it implied about the product, what it assumed about the person's week, and what they would expect the product to actually do once they tried it. Then they brought both twins into the same conversation to see exactly where their reactions diverged."
      },
      {
        "type": "heading",
        "text": "What the conversations revealed, and what they couldn't answer"
      },
      {
        "type": "paragraph",
        "text": "**The line the marketing team loved was actually a liability with one key group.**"
      },
      {
        "type": "paragraph",
        "text": "Standards Keepers read \"less scrubbing, more living\" as a warning sign, an implication that the product might not clean as thoroughly as they needed. The data behind this twin showed that, for this group, the physical effort of scrubbing was tied to visible proof that a surface was actually clean, not something they wanted removed from the experience. Time-Squeezed Cleaners liked the emotional appeal of the line but couldn't articulate what the product would concretely do differently if they bought it."
      },
      {
        "type": "paragraph",
        "text": "**\"5-minute clean\" made a specific, testable promise the other two lines didn't.**"
      },
      {
        "type": "paragraph",
        "text": "Both twins responded to the number itself as a concrete commitment rather than a vague feeling. Time-Squeezed Cleaners saw it as a direct solution to the time pressure that showed up throughout their underlying survey data. Standards Keepers wanted that speed claim backed up by a result-based claim alongside it, not offered as a standalone promise."
      },
      {
        "type": "paragraph",
        "text": "**\"Done before your coffee's ready\" fell flat with both groups.**"
      },
      {
        "type": "paragraph",
        "text": "Neither twin connected this line to anything in their actual daily routine. It came across as a cute turn of phrase to Time-Squeezed Cleaners and did essentially nothing for Standards Keepers."
      },
      {
        "type": "paragraph",
        "text": "Whether \"5-minute clean\" would actually be believed on the shelf remained an open question."
      },
      {
        "type": "paragraph",
        "text": "The existing brand tracker had measured general brand perception, not reactions to this specific numeric claim. PersonaAI was clear about this limitation rather than guessing at an answer the underlying data couldn't support. That gap became the exact question the team decided to answer in the quantitative test that followed, rather than something PersonaAI could resolve on its own."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The team's favorite line was removed from consideration before any creative production began. The relaunch plan was rebuilt around \"5-minute clean,\" paired with a result-based proof point specifically designed to satisfy Standards Keepers, rather than producing two separate commercials for two different audiences."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Test all three positioning routes in a full quantitative ad test and see which one scores best.",
          "**After:** Test a single, sharper question among primary weekly cleaners: how believable is the 5-minute claim at the shelf, and does adding a result-based proof point win over Standards Keepers without watering down the message for Time-Squeezed Cleaners?"
        ]
      },
      {
        "type": "paragraph",
        "text": "The quantitative ad test still went ahead as planned. It ran with one strong, data-informed route and a focused question to answer, instead of three options and a simple popularity contest."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "PersonaAI didn't pick the winning tagline for the brand. What it did was stop the team from spending a full testing budget validating the line their own internal room liked best, when the brand's existing research already pointed toward a different answer. Just as importantly, it was honest about the one question its own data couldn't settle, which became the sharpest, most useful question the team asked in the test that followed."
      }
    ]
  },
  {
    "slug": "from-a-spreadsheet-no-one-trusted-to-a-platform",
    "title": "From a spreadsheet no one trusted to a platform the whole team used",
    "category": "custom-technology",
    "summary": "A mid-sized research agency based in the US ran surveys across a dozen clients a month. Each study came in through a different vendor format, panel providers like Qualtrics, SurveyMonkey, and a couple of niche sample providers each exported data differently, landed in a different spreadsheet, and needed to be checked, merged, and re-tabbed before anyone could build a deck. The process worked when the agency ran four studies a month. At twelve, it was the bottleneck.",
    "facts": [
      {
        "label": "Category",
        "value": "Consumer research agency, United States"
      },
      {
        "label": "Team",
        "value": "Operations, Analytics, Leadership"
      },
      {
        "label": "Problem",
        "value": "Three analysts spent two days a week reconciling survey data across five spreadsheets before anyone could look at a result."
      },
      {
        "label": "Engagement",
        "value": "Custom AI application development, six-week build to first working version"
      },
      {
        "label": "What changed",
        "value": "A manual reporting process became a web platform. The two-day reconciliation job became a same-day dashboard."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A mid-sized research agency based in the US ran surveys across a dozen clients a month. Each study came in through a different vendor format, panel providers like Qualtrics, SurveyMonkey, and a couple of niche sample providers each exported data differently, landed in a different spreadsheet, and needed to be checked, merged, and re-tabbed before anyone could build a deck. The process worked when the agency ran four studies a month. At twelve, it was the bottleneck."
      },
      {
        "type": "paragraph",
        "text": "Leadership looked at off-the-shelf business intelligence tools, the kind of platforms commonly used across US agencies for dashboarding. Every option assumed clean, structured data arriving in one shape. This agency's data never arrived in one shape. The team needed custom software development built around how their studies actually came in, not a generic platform they would have to bend their workflow around."
      },
      {
        "type": "heading",
        "text": "Why custom development made sense"
      },
      {
        "type": "paragraph",
        "text": "An off-the-shelf tool would have solved the dashboard problem and ignored the reconciliation problem, which was where the two days actually went. The agency did not need a chart library. It needed something that understood survey data specifically: variable types, weighting, banner points, and the quirks of five different vendor exports."
      },
      {
        "type": "paragraph",
        "text": "That is the case for custom AI application development over a packaged product. The workflow was specific enough, and the data complex enough, that a general tool would have added a step instead of removing one."
      },
      {
        "type": "heading",
        "text": "What was built"
      },
      {
        "type": "paragraph",
        "text": "The engagement followed a discover, define, design, build, launch, scale approach."
      },
      {
        "type": "paragraph",
        "text": "Discover and define: Two weeks were spent mapping every vendor's export format, every manual fix an analyst made by hand, and every version of a \"final\" spreadsheet that had ever existed. The scope was set as an MVP: automate reconciliation and produce a live crosstab view, not the full reporting suite the agency eventually wanted."
      },
      {
        "type": "paragraph",
        "text": "Design and build: The application ingested raw exports from each vendor format, applied the agency's existing weighting and cleaning rules, and flagged records that failed validation instead of silently dropping them. A browser-based dashboard let analysts filter by banner point and export a formatted table without opening a spreadsheet."
      },
      {
        "type": "paragraph",
        "text": "**Launch:** The MVP went live with two studies running in parallel with the old spreadsheet process, so the analytics team could check the platform's output against work they trusted before switching over."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The two-day reconciliation cycle became a same-day process. Analysts spent their time checking flagged records instead of manually merging files. The platform gave leadership a live view across studies for the first time, instead of a static deck built after the fact."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Five spreadsheets, three analysts, two days, one study at a time.",
          "**After:** One platform, flagged exceptions reviewed by one analyst, same-day turnaround, multiple studies tracked together."
        ]
      },
      {
        "type": "paragraph",
        "text": "The MVP scope held. Reporting and forecasting features the agency wanted were logged for a second phase rather than added mid-build, which kept the first release shippable in six weeks instead of six months."
      },
      {
        "type": "heading",
        "text": "Beyond launch"
      },
      {
        "type": "paragraph",
        "text": "Product engineering did not stop at the first release. Once the platform was in daily use, the team added a sixth vendor format the agency picked up three months later after onboarding a new national panel provider, and moved the application onto scalable cloud infrastructure once study volume increased. Custom software development built around a specific workflow only pays off if it can grow with the business, and the architecture was built with that in mind from the discovery phase."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "The agency did not need more dashboards. It needed the two days back. Custom AI application development solved the problem an off-the-shelf tool never would have found, because the problem lived in the mess before the dashboard, not in the dashboard itself. Starting with an MVP kept the build focused on that problem instead of trying to solve every reporting need at once."
      }
    ]
  },
  {
    "slug": "the-recommendation-that-used-to-take-three-weeks",
    "title": "The recommendation that used to take three weeks took three days",
    "category": "insignai",
    "summary": "A consumer brand needed to know whether a new product idea was worth the development budget behind it, before committing further resources. That meant more than collecting opinions. It meant a questionnaire built to catch the right signals, fieldwork clean enough to trust, an understanding of why consumers reacted the way they did, and a recommendation the business could actually act on.",
    "facts": [
      {
        "label": "Category",
        "value": "Consumer packaged goods, product development"
      },
      {
        "label": "Team",
        "value": "Insights, Product"
      },
      {
        "label": "Question",
        "value": "Does the new product proposition have enough market appeal to justify moving into development?"
      },
      {
        "label": "Time in InsignAI",
        "value": "End to end, brief to recommendation, in days rather than weeks"
      },
      {
        "label": "What changed",
        "value": "Questionnaire design, fieldwork, quality checks, analysis and reporting moved from five separate stages to one workflow. Research turnaround dropped from two to three weeks down to two to three days."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A consumer brand needed to know whether a new product idea was worth the development budget behind it, before committing further resources. That meant more than collecting opinions. It meant a questionnaire built to catch the right signals, fieldwork clean enough to trust, an understanding of why consumers reacted the way they did, and a recommendation the business could actually act on."
      },
      {
        "type": "paragraph",
        "text": "Under the team's usual process, each of those stages sat with a different person or a different tool. Questionnaire design happened in one place. Fieldwork ran through another. Analysis waited for a separate analyst to pick it up. Every handoff between them added time, and the full cycle typically ran two to three weeks, often longer than the decision itself could wait for."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The team started with the business objective itself: whether this proposition had enough appeal to move forward. They ran the study inside InsignAI from that starting point, rather than treating it as a project split across a questionnaire tool, a fieldwork vendor and an analyst's spreadsheet."
      },
      {
        "type": "heading",
        "text": "What InsignAI did"
      },
      {
        "type": "paragraph",
        "text": "InsignAI took the business objective and helped translate it into a structured questionnaire, suggesting relevant questions and a survey flow the team could still review and adjust before fieldwork began."
      },
      {
        "type": "paragraph",
        "text": "Once the study launched, the team watched response quality as data came in, rather than finding problems after the fact. When fieldwork closed, analysis ran in the same environment the data had been collected in. Quantitative results sat next to open-ended responses, so the team could see the direction of consumer sentiment and the reasoning behind it at the same time, instead of running two separate analyses and reconciling them afterward. Cross-tabs and visualizations let the team check results across the segments that mattered, and automated summaries carried the analysis toward a narrative the business could use."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "The questions were the ones any product decision needs answered. Did the proposition land. Who it landed with. What was driving the reaction, not just the direction of it. And what the business should do next, given what the data showed."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "Analysis that used to take three to four days came down to two to three hours. The first useful signals, which the team used to wait four to five days for, showed up almost as soon as responses started coming in. Total turnaround for the study fell from two to three weeks to two to three days."
      },
      {
        "type": "list",
        "items": [
          "**Research turnaround:** 2 to 3 weeks → 2 to 3 days",
          "**Analysis effort:** 3 to 4 days → 2 to 3 hours",
          "**Time to first insight:** 4 to 5 days → Near instant"
        ]
      },
      {
        "type": "paragraph",
        "text": "The time back did not disappear. It moved. Instead of managing handoffs between teams and tools, the researchers spent their time on the part of the job that actually needed them: interpreting what the data meant for the business."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "InsignAI did not replace the analyst's judgment or shortcut the research itself. It removed the waiting that sat between each stage of a process that used to move across separate teams and separate tools. The product decision arrived faster because the distance between asking the question and understanding the answer got shorter, not because the study got smaller."
      }
    ]
  },
  {
    "slug": "ai-powered-property-recommendation-decision-intelligence",
    "title": "AI-Powered Property Recommendation & Decision Intelligence",
    "category": "ai-solutions",
    "summary": "Property discovery is traditionally driven by rigid filters such as location, price, bedrooms and property type. While effective for narrowing listings, these filters struggle to capture the more nuanced factors that influence how buyers actually choose a home.",
    "facts": [
      {
        "label": "Industry",
        "value": "Real Estate / PropTech"
      },
      {
        "label": "Service",
        "value": "Data Science as a Service"
      },
      {
        "label": "Capabilities",
        "value": "Recommendation Systems • Machine Learning • Ranking Models • Feature Engineering • Property Analytics • Decision Intelligence"
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The Challenge"
      },
      {
        "type": "paragraph",
        "text": "Property discovery is traditionally driven by rigid filters such as location, price, bedrooms and property type. While effective for narrowing listings, these filters struggle to capture the more nuanced factors that influence how buyers actually choose a home."
      },
      {
        "type": "paragraph",
        "text": "A real estate technology company wanted to build a more intelligent approach that could understand individual buyer requirements and use data science to identify which neighborhoods and properties were most relevant to each buyer."
      },
      {
        "type": "paragraph",
        "text": "The challenge was to combine buyer preferences with property, neighborhood and market information and transform those signals into meaningful, personalized recommendations."
      },
      {
        "type": "heading",
        "text": "Our Approach"
      },
      {
        "type": "paragraph",
        "text": "We developed a multi-stage recommendation framework designed around the actual property-buying journey. Rather than relying on a single matching algorithm, the solution separated the problem into specialized analytical stages."
      },
      {
        "type": "heading",
        "text": "Buyer Preference Understanding"
      },
      {
        "type": "paragraph",
        "text": "Buyer requirements were transformed into structured attributes covering factors such as budget, preferred locations, property characteristics, amenities and other decision criteria."
      },
      {
        "type": "heading",
        "text": "Neighborhood Matching"
      },
      {
        "type": "paragraph",
        "text": "Buyer preferences were evaluated against neighborhood characteristics to identify areas that aligned with the buyer's priorities."
      },
      {
        "type": "paragraph",
        "text": "This enabled the recommendation process to answer not only which property? but also which area is likely to be the right fit?"
      },
      {
        "type": "heading",
        "text": "Property Matching & Ranking"
      },
      {
        "type": "paragraph",
        "text": "Available properties were evaluated against the buyer's requirements and ranked according to their overall suitability."
      },
      {
        "type": "paragraph",
        "text": "This allowed the system to move beyond simple pass/fail filtering and identify properties representing the strongest overall match."
      },
      {
        "type": "heading",
        "text": "Property Evaluation"
      },
      {
        "type": "paragraph",
        "text": "Additional property and market information could then be incorporated to help evaluate shortlisted properties in greater depth."
      },
      {
        "type": "paragraph",
        "text": "The framework considered multiple signals rather than depending on any single property attribute."
      },
      {
        "type": "heading",
        "text": "Building a Multi-Stage Recommendation System"
      },
      {
        "type": "paragraph",
        "text": "A key design principle was separating the analytical problem into stages:"
      },
      {
        "type": "callout",
        "text": "Buyer Understanding → Neighborhood Matching → Property Matching → Property Ranking → Property Evaluation"
      },
      {
        "type": "paragraph",
        "text": "Each stage could use the most appropriate data and modeling technique while contributing to the final recommendation."
      },
      {
        "type": "paragraph",
        "text": "This modular approach also made the system easier to evaluate and improve. Recommendation quality could be analyzed at individual stages rather than treating the entire process as a black box."
      },
      {
        "type": "heading",
        "text": "The Outcome"
      },
      {
        "type": "paragraph",
        "text": "The resulting framework transformed property discovery from a traditional search problem into a personalized recommendation and decision-support problem."
      },
      {
        "type": "paragraph",
        "text": "Instead of simply returning listings that satisfy filters, the system can evaluate the relative fit between a buyer, a neighborhood and an individual property."
      },
      {
        "type": "paragraph",
        "text": "The architecture also created a foundation for continuously improving recommendations as additional buyer interactions and property data become available."
      },
      {
        "type": "heading",
        "text": "Capabilities Demonstrated"
      },
      {
        "type": "paragraph",
        "text": "Recommendation Systems • Ranking Models • Machine Learning • Feature Engineering • Property Analytics • Personalization • Model Evaluation • Decision Intelligence"
      }
    ]
  },
  {
    "slug": "the-rating-told-them-what-happened-nobody-could-say-why",
    "title": "The rating told them what happened. Nobody could say why.",
    "category": "enspeek",
    "summary": "The brand had run this kind of study for years. Ask how people felt about a recent product experience, what they liked, what fell flat, what they'd change if they could. The questions themselves were reasonable. The answers coming back were not doing the job.",
    "facts": [
      {
        "label": "Category",
        "value": "Global consumer brand, product experience research"
      },
      {
        "label": "Team",
        "value": "Insights"
      },
      {
        "label": "Question",
        "value": "Consumers had just used the product. What did they think, what would actually make them change how they felt about it, and why were the surveys coming back so thin?"
      },
      {
        "label": "Time in EnspeeK",
        "value": "Fielded as a single conversational study, replacing what had previously run as a fixed questionnaire"
      },
      {
        "label": "What changed",
        "value": "A rating and a half-written comment became a full account of what was working, what wasn't, and why. The team stopped measuring opinions and started understanding them."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "The brand had run this kind of study for years. Ask how people felt about a recent product experience, what they liked, what fell flat, what they'd change if they could. The questions themselves were reasonable. The answers coming back were not doing the job."
      },
      {
        "type": "paragraph",
        "text": "Consumers picked a rating, typed half a sentence if that, and moved on. Response volume looked healthy on every completion report. Completion rate was fine. Average time on survey was fine. But when the analyst sat down with the data, most of it collapsed into a number and a shrug. A three out of five could mean the product was fine but overpriced, fine but hard to find, fine but disappointing compared to what the packaging promised, or fine with one specific complaint buried somewhere the survey never asked about. The rating scale had no room to tell those apart, and the open comment box rarely got more than a sentence before the respondent moved on to finish the survey and claim their incentive."
      },
      {
        "type": "paragraph",
        "text": "The team could see what people thought, in aggregate, at a glance. They could not see why, and why was the part that actually pointed toward a decision. Fixing a product because of a low satisfaction score without knowing which of several unrelated problems was driving it meant guessing, and guessing at this scale was expensive."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The starting questions stayed close to what the team would have asked in a normal survey. How did the product experience go. What stood out, good or bad. What would you change if you could. Nothing about the entry point needed reinventing. What changed was everything that happened once someone actually answered."
      },
      {
        "type": "paragraph",
        "text": "The team ran the study over WhatsApp, a channel respondents were already using for everything else in their day, rather than routing them into a separate research environment that announced itself as a survey the moment it opened. That choice mattered more than it might sound. A formal research interface primes someone to answer efficiently and leave. A chat window primes someone to just talk."
      },
      {
        "type": "heading",
        "text": "What EnspeeK did"
      },
      {
        "type": "paragraph",
        "text": "When a respondent said the product was great but a pain to use, the conversation did not log that sentence and move to the next scripted question the way a traditional questionnaire would have. It asked what made it a pain, specifically. It asked when that usually happened, whether it was a one-time thing or every time. It asked how they were working around it in the meantime, since a workaround usually reveals how serious the problem actually is. And it asked what would fix it, in their own words, rather than offering them a list of pre-written options to choose from."
      },
      {
        "type": "paragraph",
        "text": "If a different respondent raised a completely unrelated issue, something the research team had never thought to script a question for, the conversation followed that thread instead. Someone might mention, almost as an aside, that they only bought the product on sale, or that a family member had switched them off a competing brand, or that the packaging made them second-guess a claim on the label. None of that was on the original discussion guide. All of it got followed, because the conversation could go wherever the respondent's actual experience led it."
      },
      {
        "type": "paragraph",
        "text": "Behind the scenes, none of this ran loose. The research team's objectives and guardrails stayed fixed throughout. Consumers experienced something that felt like a conversation with a person who was actually listening. The study underneath it stayed as structured as anything the team would have built in a traditional questionnaire tool, just with room to go deeper wherever a respondent gave it a reason to."
      },
      {
        "type": "paragraph",
        "text": "Once the conversations closed, EnspeeK organized them by theme, sentiment, pain point, and consumer segment. That mattered because thousands of open conversations, left unorganized, would have been unreadable. Structured this way, the team could zoom out to see which pain points were showing up across the whole sample and zoom in to read the individual exchange behind any single data point, without losing track of either view."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "Once the conversations were sorted, the team went looking for a handful of specific things. What was actually behind the satisfaction, or the frustration, once you got past the headline rating. Which problems were one-off annoyances that a handful of unlucky respondents happened to hit, and which ones kept recurring across dozens of unrelated conversations. What people expected from the product that they simply weren't getting, even when they hadn't rated the experience poorly. And how the same product experience landed differently depending on which consumer segment someone fell into."
      },
      {
        "type": "heading",
        "text": "What the conversations showed, and what they did not"
      },
      {
        "type": "paragraph",
        "text": "**The follow-up caught what the first answer missed.**"
      },
      {
        "type": "paragraph",
        "text": "A flat \"great but a pain to use\" turned into a specific, fixable complaint the moment the conversation asked what made it a pain. Under the old questionnaire, that same respondent would have logged a four-star rating and a half-sentence comment, and whatever was actually bothering them would have stayed invisible in the data forever."
      },
      {
        "type": "paragraph",
        "text": "**Some of the best findings weren't questions the team had thought to ask.**"
      },
      {
        "type": "paragraph",
        "text": "A passing comment, something well outside the study's original scope, got followed because the conversation could go where the respondent took it rather than sticking to a fixed script. A traditional questionnaire would have had no branch logic built for a tangent nobody anticipated, and the comment would have been lost or, at best, sat unread in a free-text field nobody had time to code by hand."
      },
      {
        "type": "paragraph",
        "text": "**Not every comment pointed to something worth acting on.**"
      },
      {
        "type": "paragraph",
        "text": "Some pain points turned out to be genuinely one-off, tied to a specific circumstance that wasn't going to repeat for most consumers. Others showed up again and again, across conversations that had nothing else in common. The organization by theme and pain point let the team separate the two, instead of either dismissing everything as noise or chasing every individual complaint as if it represented the whole market."
      },
      {
        "type": "paragraph",
        "text": "**The channel lowered the barrier before the research even started.**"
      },
      {
        "type": "paragraph",
        "text": "Respondents answering inside a chat they already used daily gave longer, more candid responses than the same audience had historically given inside a branded survey tool. Nobody had to feel like they were filling out a form. They were just talking, and the depth of what came back reflected that."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The brand moved from measuring opinions to understanding them. Product decisions and messaging decisions started drawing on actual consumer language and stated reasoning, backed by real voices, rather than percentages attached to a rating scale that could not explain itself."
      },
      {
        "type": "list",
        "items": [
          "**Before:** A rating and a half-sentence comment, with the actual reasoning behind either left almost entirely to guesswork.",
          "**After:** A full account of what was behind each reaction, organized clearly enough across theme, sentiment, and segment to act on at scale, not just read one transcript at a time."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "Better research did not come from asking more questions. It came from knowing when to ask one more, right at the moment a respondent said something worth following up on. The scale of a proper study stayed intact. What got added was the depth an actual conversation gives you, and that depth was where the real findings had been hiding the whole time."
      }
    ]
  },
  {
    "slug": "nobody-built-a-hiring-workflow-they-described-one",
    "title": "Nobody built a hiring workflow. They described one, and it got built for them.",
    "category": "talknact",
    "summary": "A growing US software company posted a senior engineering role and got back more than 1,400 applications in ten days, roughly six times what the team had planned for. The recruiting team was six people, and the standard process had each recruiter manually screening resumes against the job description before passing shortlists to the hiring manager.",
    "facts": [
      {
        "label": "Category",
        "value": "Mid-size tech employer, US"
      },
      {
        "label": "Team",
        "value": "Talent Acquisition, HR Operations"
      },
      {
        "label": "Question",
        "value": "Could the team screen a sudden spike in applications for a single role without hiring more recruiters or waiting weeks for an engineering team to build a custom tool?"
      },
      {
        "label": "Time in TalkNAct",
        "value": "Architecture running within the same day, full first batch of resumes scored by the next morning"
      },
      {
        "label": "What changed",
        "value": "A six-person recruiting team cleared a four-week backlog in under a week, without anyone on the team writing a workflow, picking a model, or filing a ticket with engineering."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A growing US software company posted a senior engineering role and got back more than 1,400 applications in ten days, roughly six times what the team had planned for. The recruiting team was six people, and the standard process had each recruiter manually screening resumes against the job description before passing shortlists to the hiring manager."
      },
      {
        "type": "paragraph",
        "text": "At the normal application volume, that process worked. At 1,400 applications, it didn't. Recruiters were already behind on the role's original timeline by the time the volume became clear. The team looked at two options. Hire temporary contract recruiters, which meant onboarding and training before anyone could actually start screening. Or build a scoring tool internally, which meant getting time on the engineering team's roadmap, a resource that had a backlog of its own and no reason to prioritize a one-off hiring project."
      },
      {
        "type": "paragraph",
        "text": "Neither option solved the actual problem, which was a deadline measured in days, not the weeks either option would take to stand up."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The hiring manager described the objective directly, in plain language: review the incoming resumes against the job description and the must-have requirements, identify the candidates who best matched both the technical requirements and the stated experience level, and produce a ranked shortlist with the reasoning behind each score."
      },
      {
        "type": "paragraph",
        "text": "Nobody on the team specified which model to use, how to structure the evaluation, or what the underlying workflow should look like. That wasn't the team's job here. The brief was the input."
      },
      {
        "type": "heading",
        "text": "What TalkNAct built"
      },
      {
        "type": "paragraph",
        "text": "From that brief, TalkNAct determined the agent architecture needed to deliver it: a requirement-understanding step that parsed the job description into concrete evaluation criteria, a resume-processing step that extracted structured information from documents that arrived in a mix of formats, an evaluation step that scored each candidate against the extracted criteria, and a recommendation step that produced a ranked shortlist with a stated rationale for each score."
      },
      {
        "type": "paragraph",
        "text": "The recruiting team never assembled that sequence themselves. They stated what they needed, and the architecture for this specific job got created around it. Different steps in the pipeline used different models, matched to what each step actually required, reasoning depth for the evaluation step, speed for the initial document parsing, rather than one model forced to handle every part of the job equally well."
      },
      {
        "type": "heading",
        "text": "What they asked, and what they changed mid-flight"
      },
      {
        "type": "paragraph",
        "text": "Once the first batch of scores came back, the hiring manager reviewed a sample against candidates she already knew well from early resume screening, and flagged that the scoring was underweighting hands-on project experience relative to years of tenure. She said so conversationally, in the same thread: give more weight to project experience, less to raw years in the role."
      },
      {
        "type": "paragraph",
        "text": "TalkNAct adjusted the running approach without anyone redesigning the workflow or waiting for a new build. The next batch reflected the change. Later in the process, the team also asked to exclude a specific prior employer from influencing the score, since a cluster of recent hires from that company had turned out to be a poor fit for reasons unrelated to resume content. That exclusion went in the same way, as a conversational instruction rather than a rebuild."
      },
      {
        "type": "heading",
        "text": "What the workflow produced, and what it didn't decide"
      },
      {
        "type": "paragraph",
        "text": "**The shortlist came with reasoning, not just a number.**"
      },
      {
        "type": "paragraph",
        "text": "Every ranked candidate carried the stated basis for their score, so the recruiting team could see why someone ranked where they did and catch cases where the reasoning didn't hold up on a human read."
      },
      {
        "type": "paragraph",
        "text": "**Human review stayed in the loop before any decision moved forward.**"
      },
      {
        "type": "paragraph",
        "text": "Recruiters reviewed the ranked list before anything was communicated to hiring managers or candidates. TalkNAct surfaced the recommendation. It did not make the final call on who got an interview."
      },
      {
        "type": "paragraph",
        "text": "**The tool didn't replace judgment on close calls.**"
      },
      {
        "type": "paragraph",
        "text": "A handful of borderline candidates still went to a recruiter for a manual read, because the scoring system flagged the ambiguity itself rather than forcing a confident-looking number onto a case that didn't warrant one."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The four-week backlog the team had been facing cleared in under a week. The same six recruiters who couldn't keep pace with 1,400 resumes manually processed the full volume with the scoring workflow doing the first pass, and spent their own time on the shortlisted candidates and the ambiguous cases instead of reading every resume that came in."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Six recruiters, a 1,400-resume backlog, and a choice between slow contractor onboarding and an engineering build nobody had time to prioritize.",
          "**After:** A scoring architecture built the same day from a plain-language brief, adjusted twice in conversation as the team learned what good screening actually looked like for this role, with no new project, no new hire, and no engineering ticket."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "TalkNAct didn't hand the team a recruitment tool they had to learn to configure. It built the specific architecture this hiring surge needed, let the team correct it the way they'd correct a colleague's first draft, and kept the actual hiring decision exactly where it belonged, with the people who had to live with it."
      }
    ]
  },
  {
    "slug": "the-hire-that-would-have-taken-four-months",
    "title": "The hire that would have taken four months. The project needed someone in three weeks.",
    "category": "research",
    "summary": "A mid-sized consumer packaged goods company in the US was six weeks from a national product launch when its research function hit a wall. One research manager was carrying six concurrent workstreams: a concept test, a pricing study, two rounds of packaging evaluation, a messaging test for the launch campaign, and a post-launch tracker that needed to be designed before launch, not after.",
    "facts": [
      {
        "label": "Category",
        "value": "CPG, US"
      },
      {
        "label": "Team",
        "value": "Insights (in-house), Insight Curry (augmentation)"
      },
      {
        "label": "Problem",
        "value": "A single research manager was running six concurrent studies for a national product launch, with no backfill in sight and a sign-off deadline that wasn't moving."
      },
      {
        "label": "Engagement",
        "value": "Project-based research team augmentation, roughly four months"
      },
      {
        "label": "What changed",
        "value": "The launch research shipped on schedule. The in-house manager kept ownership of the studies instead of handing them off."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A mid-sized consumer packaged goods company in the US was six weeks from a national product launch when its research function hit a wall. One research manager was carrying six concurrent workstreams: a concept test, a pricing study, two rounds of packaging evaluation, a messaging test for the launch campaign, and a post-launch tracker that needed to be designed before launch, not after."
      },
      {
        "type": "paragraph",
        "text": "The company had budgeted for a second research hire earlier in the year. The role had been open for ten weeks. Two offers had fallen through. HR estimated another two to three months before anyone could realistically start, and that was before onboarding. The launch date was not moving, and neither was the volume of work sitting in front of one person."
      },
      {
        "type": "paragraph",
        "text": "The research manager's options were limited. Push the launch, which leadership had already ruled out. Cut corners on one or two of the studies, which meant walking into the launch with a gap in either the pricing read or the packaging read. Or find a way to add real research capacity fast, without going through a hiring cycle that had already failed twice."
      },
      {
        "type": "heading",
        "text": "Why augmentation made sense"
      },
      {
        "type": "paragraph",
        "text": "A full-time hire was still the right long-term answer. It was not the right answer for the next six weeks. What the team needed immediately was an experienced researcher who could pick up specific studies without a long ramp-up, work inside the company's existing tools and timelines, and hand ownership back cleanly once the crunch passed or the permanent hire came on board."
      },
      {
        "type": "paragraph",
        "text": "That is the specific gap research team augmentation is built for. Not a consulting engagement that runs the whole program, and not a full-time employee the company has to carry past the point they need the extra capacity. A researcher who slots directly into the existing team's workflow for as long as the workload actually requires it."
      },
      {
        "type": "heading",
        "text": "What was put in place"
      },
      {
        "type": "paragraph",
        "text": "Insight Curry brought in one senior researcher and one analyst, working as an extension of the in-house team rather than a separate vendor relationship running in parallel."
      },
      {
        "type": "paragraph",
        "text": "Week one: The augmented team sat in on the research manager's existing study plans, reviewed questionnaires already in field, and took direct ownership of the packaging evaluation and the messaging test, the two studies furthest behind schedule. The pricing study and concept test stayed with the in-house manager, who now had the bandwidth to focus on them properly instead of splitting attention six ways."
      },
      {
        "type": "paragraph",
        "text": "Weeks two through five: The augmented researcher ran fieldwork coordination, data processing, and cross-tab analysis for both studies she'd taken on, reporting into the same weekly stakeholder meetings the in-house manager already ran, so leadership saw one unified research update rather than two disconnected workstreams. The analyst built the post-launch tracker methodology in parallel, work that would otherwise have been pushed to after launch and rushed."
      },
      {
        "type": "paragraph",
        "text": "Week six, launch: All six workstreams delivered on their original timelines. The packaging evaluation came back three days ahead of the internal deadline, early enough that one pack element got revised before print, not after."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The launch went ahead on schedule with a complete research base behind it: concept, pricing, packaging, and messaging all read before the campaign went live, plus a tracker already built and ready to field at launch instead of designed under pressure afterward."
      },
      {
        "type": "list",
        "items": [
          "**Before:** One manager, six workstreams, a stalled hiring process, and a launch date that wasn't going to wait for any of it to resolve.",
          "**After:** A fully staffed research function for the exact six weeks it was needed, with the in-house manager retaining ownership of the studies that mattered most to her and offloading the two that didn't need to sit specifically with her."
        ]
      },
      {
        "type": "paragraph",
        "text": "The permanent hire came on board in month three of the engagement. The transition back to a fully in-house team happened over two weeks, with the augmented researcher documenting both studies in detail before handing them off, rather than the company absorbing a knowledge gap along with the headcount."
      },
      {
        "type": "heading",
        "text": "Beyond the launch"
      },
      {
        "type": "paragraph",
        "text": "The post-launch tracker, built during the augmentation period, became the standing quarterly tracker the in-house team still runs. Insight Curry's involvement wound down to a specialist, as-needed basis once the permanent hire was fully ramped, covering advanced analytics work the growing team didn't yet have the specialized skills for in-house."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "The company didn't need a vendor to run its research program. It needed experienced hands for six specific weeks, without carrying that headcount past the point it was useful. Research team augmentation closed the exact gap a stalled hiring process had left open, and it closed it fast enough that the launch never had to choose between speed and a complete research base."
      }
    ]
  },
  {
    "slug": "the-segment-that-looked-small-on-the-tracker",
    "title": "The segment that looked small on the tracker was the one worth building for",
    "category": "segmentiq",
    "summary": "A regional bank had built a round-up savings feature, the kind that rounds a debit card purchase to the nearest dollar and moves the difference into a savings account, similar to tools consumers already knew from larger neobanks. The product team had tested it internally and liked it. Marketing had a launch audience in mind: younger, digitally active checking account holders, based on a demographic cut from an existing customer survey.",
    "facts": [
      {
        "label": "Category",
        "value": "Retail banking, United States"
      },
      {
        "label": "Team",
        "value": "Product, Marketing, Insights"
      },
      {
        "label": "Question",
        "value": "Which existing customers would actually adopt a new savings product built around automated round-ups, and who would ignore it no matter how it was pitched?"
      },
      {
        "label": "Time in SegmentIQ",
        "value": "Three working days from upload to a recommendation"
      },
      {
        "label": "What changed",
        "value": "The launch audience moved from \"young, tech-forward savers\" to one behavioral segment that made up a fifth of the base. The product brief was rewritten around what that segment actually wanted from the feature."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A regional bank had built a round-up savings feature, the kind that rounds a debit card purchase to the nearest dollar and moves the difference into a savings account, similar to tools consumers already knew from larger neobanks. The product team had tested it internally and liked it. Marketing had a launch audience in mind: younger, digitally active checking account holders, based on a demographic cut from an existing customer survey."
      },
      {
        "type": "paragraph",
        "text": "Insights was not convinced that age and digital engagement told the whole story. Two customers in the same bracket can treat money completely differently. One tracks every transaction in a budgeting app. The other doesn't open mobile banking between paychecks. The bank had a 3,200-respondent customer survey from a recent product research wave, covering saving habits, attitudes toward automation, and comfort with the app's existing features. Nobody had segmented it. The data science team had a backlog that stretched past the feature's launch date."
      },
      {
        "type": "paragraph",
        "text": "The question was whether the insights team could find the real audience for this feature without waiting for that backlog to clear."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "**One dataset:** the customer survey, covering saving frequency, attitudes toward automated finance tools, trust in the app, spending category behavior, and standard demographics."
      },
      {
        "type": "paragraph",
        "text": "The team described the goal in SegmentIQ directly: find groups of customers who differ in how they save and how comfortable they are letting the app act on their behalf, so the round-up feature could be pointed at the right one."
      },
      {
        "type": "heading",
        "text": "What SegmentIQ built"
      },
      {
        "type": "paragraph",
        "text": "SegmentIQ assessed the file before running anything. It flagged a low response rate on one attitude block and confirmed the rest of the sample had enough spread to work with."
      },
      {
        "type": "paragraph",
        "text": "It separated the variables into two groups. Saving habits, automation comfort, and app trust went in as drivers. Age, income band, region, and account tenure were held out as profiling variables, so they could describe the groups afterward without shaping them. The reasoning behind each classification was visible to the team the whole way through."
      },
      {
        "type": "paragraph",
        "text": "The attitude and behavior items were reduced to five underlying dimensions, and SegmentIQ ran the clustering on those dimensions rather than on the raw survey questions. It produced a three-segment and a four-segment solution. The four-segment version split one group in a way that didn't correspond to anything the product team could act on differently, so the team kept three."
      },
      {
        "type": "paragraph",
        "text": "The three segments:"
      },
      {
        "type": "list",
        "items": [
          "**Passive Savers:** save irregularly, rarely check balances, open to automation if it requires no effort",
          "**Active Trackers:** already budget manually, monitor every transaction, wary of the app moving money without a visible prompt",
          "**Spend-First Users:** treat savings as an afterthought, low engagement with any savings feature regardless of format"
        ]
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "The team asked what each segment wanted from an automated savings feature, what would make them turn it on, and what would make them turn it off within a week. They also asked how the segments compared on trust in the app, since that carried more weight than income or age for a feature that moves money without a manual step each time."
      },
      {
        "type": "paragraph",
        "text": "SegmentIQ answered from the same conversation and showed which variables were driving each answer, so the team could check whether a result was coming from a strong signal or a thin one."
      },
      {
        "type": "heading",
        "text": "What the segments showed, and what they did not"
      },
      {
        "type": "paragraph",
        "text": "**\"Young, tech-forward savers\" cut across all three segments almost evenly.**"
      },
      {
        "type": "paragraph",
        "text": "The original launch audience gave no useful split. Passive Savers, Active Trackers, and Spend-First Users all showed up in similar proportions within that demographic band. Targeting the age and digital-engagement group alone would have reached a third of the people who wanted the feature and two-thirds who didn't care."
      },
      {
        "type": "paragraph",
        "text": "**Passive Savers were the natural fit, and they weren't the biggest group.**"
      },
      {
        "type": "paragraph",
        "text": "They made up about a fifth of the base, smaller than either of the other two segments. But they described saving as something they wanted to happen without having to think about it, which was exactly what the feature did. Comfort with automation was high in this group even though trust in the app generally sat in the middle of the range."
      },
      {
        "type": "paragraph",
        "text": "**Active Trackers liked the idea and rejected the execution.**"
      },
      {
        "type": "paragraph",
        "text": "This was the segment product had assumed would adopt fastest, since they already cared about saving. Instead, they wanted visibility and control the current feature didn't offer: a way to see or approve each round-up before it moved, not a silent automatic transfer. The feature as built was a mismatch for how this segment already behaved, not a product they simply hadn't tried yet."
      },
      {
        "type": "paragraph",
        "text": "**Spend-First Users were not a persuasion problem.**"
      },
      {
        "type": "paragraph",
        "text": "Low engagement with any savings feature was consistent across every attitude item tied to this segment. SegmentIQ did not suggest a message that might move them. The team read that as a signal to leave this group out of the launch entirely rather than build a campaign for it."
      },
      {
        "type": "paragraph",
        "text": "**Whether Passive Savers would keep the feature on after 90 days was a gap.**"
      },
      {
        "type": "paragraph",
        "text": "The survey measured intent and attitude, not sustained behavior. SegmentIQ described the segment's stated comfort with automation and stopped there. It did not produce a retention estimate the data couldn't support. The team took that as the question the pilot needed to answer."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The launch audience moved from a demographic band to a single behavioral segment: Passive Savers, roughly a fifth of the customer base. Active Trackers were logged as a second phase, contingent on adding a review-before-transfer option."
      },
      {
        "type": "paragraph",
        "text": "The product brief changed with it."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Launch the round-up feature to younger, digitally active checking account holders.",
          "**After:** Launch to Passive Savers first, and track 90-day retention to see whether stated comfort with automation holds once real money starts moving."
        ]
      },
      {
        "type": "paragraph",
        "text": "The bank ran a smaller pilot than originally planned, aimed at a fifth of the base instead of the full digitally active checking population, and treated retention as the number that would decide whether Active Trackers got a second version of the feature."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "SegmentIQ did not pick the winning feature. It showed the bank that its intended audience and its actual audience barely overlapped, and it separated a segment worth building for from one worth leaving alone, before the launch budget went out the door."
      }
    ]
  },
  {
    "slug": "two-segments-same-feature-opposite-reasons",
    "title": "Two segments said yes to the same feature for opposite reasons",
    "category": "personaai",
    "summary": "A prepaid mobile carrier had a new plan ready to test: unused data rolls over to the next billing cycle instead of expiring. Product had built it to solve a specific complaint that kept showing up in support tickets and call center logs, data expiring unused at the end of the month. The plan was priced slightly above the standard tier and scheduled for a limited-market pilot in three weeks.",
    "facts": [
      {
        "label": "Category",
        "value": "Telecom, prepaid mobile, United States"
      },
      {
        "label": "Team",
        "value": "Product, Marketing, Insights"
      },
      {
        "label": "Question",
        "value": "Will a new data rollover plan actually change behavior among heavy data users, or will it just get used by people who were never going to run out anyway?"
      },
      {
        "label": "Time in PersonaAI",
        "value": "Two working days from locked brief to a revised pilot plan"
      },
      {
        "label": "What changed",
        "value": "The pilot's success metric moved from plan uptake to a specific usage-pattern check. The marketing message split into two versions before the campaign was built."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A prepaid mobile carrier had a new plan ready to test: unused data rolls over to the next billing cycle instead of expiring. Product had built it to solve a specific complaint that kept showing up in support tickets and call center logs, data expiring unused at the end of the month. The plan was priced slightly above the standard tier and scheduled for a limited-market pilot in three weeks."
      },
      {
        "type": "paragraph",
        "text": "Marketing's working assumption was that heavy data users, people who burned through their allowance every month, would be the natural audience. Insights had two studies on the shelf that suggested this wasn't obvious: a usage and billing survey from the previous year, and a more recent plan satisfaction tracker. Neither had ever asked about rollover directly, because the feature didn't exist when they ran. But both had plenty to say about how different customer groups thought about data limits, overage charges, and plan switching, something that mattered a great deal in a US prepaid market where customers switch carriers freely and overage fees are a common point of frustration."
      },
      {
        "type": "paragraph",
        "text": "The team wanted to know, before building a campaign, whether \"heavy users\" was actually the right target or just the most obvious one."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "Two studies:"
      },
      {
        "type": "list",
        "items": [
          "**Usage and billing survey:** consumption patterns, overage incidents, plan-switching history",
          "**Plan satisfaction tracker:** pain points, price sensitivity, competitor comparison"
        ]
      },
      {
        "type": "paragraph",
        "text": "They locked the brief to prepaid customers on mid-tier and top-tier data plans, described the rollover mechanic directly, and excluded postpaid customers since the plan wasn't available to them."
      },
      {
        "type": "heading",
        "text": "What PersonaAI created"
      },
      {
        "type": "paragraph",
        "text": "PersonaAI matched respondents in that corpus to the locked brief and created three digital twins, each with contributing studies, respondent counts, a match score, and facet coverage."
      },
      {
        "type": "paragraph",
        "text": "The team selected two:"
      },
      {
        "type": "list",
        "items": [
          "**Budget Maximizers:** consistently use their full allowance, occasionally hit overage charges, strong coverage on billing pain points and price sensitivity",
          "**Irregular Users:** usage swings month to month depending on travel or work, sometimes have leftover data, sometimes run short, strong coverage on plan-switching history, thinner coverage on overage experience"
        ]
      },
      {
        "type": "paragraph",
        "text": "A third twin, built from low-usage customers who rarely came close to their limit, was created and set aside. The team judged this group unlikely to value a rollover feature regardless of what the twin conversation showed."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "They didn't ask \"would you buy this plan.\" They described the rollover mechanic exactly as it would appear on the carrier's app or recharge screen and asked what problem each twin thought it solved, when they'd actually notice the benefit, and what would make them switch from their current plan to get it."
      },
      {
        "type": "heading",
        "text": "What the twins showed, and what they did not"
      },
      {
        "type": "paragraph",
        "text": "**Budget Maximizers wanted it for the overage protection, not the rollover itself.**"
      },
      {
        "type": "paragraph",
        "text": "The twin kept returning to unexpected charges, not unused data. Rollover mattered to this group mainly as a buffer against running out mid-cycle and getting hit with an overage fee. Whether the leftover data carried forward was secondary to whether it prevented a bad month."
      },
      {
        "type": "paragraph",
        "text": "**Irregular Users wanted it for exactly the opposite reason.**"
      },
      {
        "type": "paragraph",
        "text": "This twin cared about not losing data they'd already paid for during a light month, ahead of a heavier month they knew was coming, like a cross-country trip or a work travel stretch. The overage angle barely came up. The feature's value here was about not wasting money already spent, not about avoiding a future charge."
      },
      {
        "type": "paragraph",
        "text": "Both segments said yes. The reason they said yes pointed to two different messages."
      },
      {
        "type": "paragraph",
        "text": "Coverage on billing pain points was strong enough in Budget Maximizers to support an overage-avoidance angle with confidence. Coverage on plan-switching history in Irregular Users supported a value-retention angle just as clearly. A single campaign built around \"never lose your data\" would have undersold the plan to Budget Maximizers, who weren't primarily worried about losing data. They were worried about paying more."
      },
      {
        "type": "paragraph",
        "text": "Whether either segment would actually switch plans for this, versus just liking the idea, was a gap."
      },
      {
        "type": "paragraph",
        "text": "Both studies measured attitudes and past switching behavior, not intent toward a feature that didn't exist yet. PersonaAI flagged stated switching intent as uncovered rather than inferring a take-up rate from general plan-switching history. The team treated that as the number the pilot itself needed to produce."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "Marketing built two versions of the campaign instead of one: an overage-avoidance message for channels that reached Budget Maximizers, and a \"don't lose what you paid for\" message aimed at Irregular Users. The single generic \"never lose your data\" concept was dropped before creative production started."
      },
      {
        "type": "paragraph",
        "text": "The pilot's success metric changed too."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Measure plan uptake among heavy data users.",
          "**After:** Measure uptake split by message variant, and check whether Budget Maximizer sign-ups show a drop in overage incidents in the following billing cycle, since that was the actual behavior the feature was meant to change."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "PersonaAI didn't tell the carrier whether the plan would sell. It showed that two segments arriving at the same yes were solving different problems, and it stopped a single campaign message from underselling the feature to half its own audience in a US prepaid market before the media spend went out."
      }
    ]
  },
  {
    "slug": "an-mvp-built-to-answer-one-question",
    "title": "An MVP built to answer one question, not everything the founders wanted",
    "category": "custom-technology",
    "summary": "Two founders with a clinical background and one with a technical one had built a prototype in Figma: a medication reminder app with reminders, a caregiver dashboard, pharmacy integration, insurance verification, a rewards system, and a chat feature for patients to message their care team. Early investor conversations had gone well. The feedback was consistent: come back with users.",
    "facts": [
      {
        "label": "Category",
        "value": "Healthtech startup, pre-seed"
      },
      {
        "label": "Team",
        "value": "Founders, Product, Engineering"
      },
      {
        "label": "Problem",
        "value": "Three founders had a working idea for a medication adherence app and eighteen months of runway. They needed to know if patients would actually use it before the next fundraise, not a finished product."
      },
      {
        "label": "Engagement",
        "value": "Custom digital product and MVP development, eight-week build to pilot-ready release"
      },
      {
        "label": "What changed",
        "value": "A twelve-feature product plan became a three-feature pilot. The startup walked into its seed round with usage data instead of a roadmap."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "Two founders with a clinical background and one with a technical one had built a prototype in Figma: a medication reminder app with reminders, a caregiver dashboard, pharmacy integration, insurance verification, a rewards system, and a chat feature for patients to message their care team. Early investor conversations had gone well. The feedback was consistent: come back with users."
      },
      {
        "type": "paragraph",
        "text": "The founders had a rough build estimate from a freelance developer for the full feature set, six months and a budget that would have consumed most of their remaining runway before a single patient touched the product. They needed something faster and smaller, but they weren't sure which features actually mattered to the question investors were asking, which was whether patients would use the thing at all."
      },
      {
        "type": "paragraph",
        "text": "Off-the-shelf healthtech platforms existed for parts of this, appointment reminders, basic patient portals, but none combined the specific adherence-tracking logic the founders had designed with the clinical team they'd consulted. Building around an existing platform would have meant bending the product to fit someone else's data model before they knew if the product itself worked."
      },
      {
        "type": "heading",
        "text": "Why custom development made sense"
      },
      {
        "type": "paragraph",
        "text": "A generic reminder app would have answered a different question than the one the founders needed answered. The core hypothesis, that a specific adherence-tracking approach designed with input from actual clinicians would outperform a basic reminder, could not be tested on a platform built around a simpler assumption. The product needed to be custom enough to test the actual idea, and small enough to build in weeks, not months."
      },
      {
        "type": "heading",
        "text": "What was built"
      },
      {
        "type": "paragraph",
        "text": "The engagement followed a discover, define, design, build, launch approach, compressed to fit the founders' runway."
      },
      {
        "type": "paragraph",
        "text": "Discover and define: One week went into separating what the founders wanted from what the pilot needed to prove. The twelve-feature plan got cut to three: medication reminders built around the adherence logic the clinical co-founder had designed, a simple confirmation flow so patients could log whether they'd taken a dose, and a basic view for the founders to see aggregate adherence patterns across pilot users. Pharmacy integration, insurance verification, and the rewards system were logged for later, contingent on the pilot showing the core loop worked."
      },
      {
        "type": "paragraph",
        "text": "Design and build: The mobile app was built cross-platform to reach both iOS and Android patients without doubling development time. The reminder logic was built as a standalone service from the start, so it could be improved or replaced without touching the rest of the app once real usage data came in."
      },
      {
        "type": "paragraph",
        "text": "**Launch:** The MVP launched to a 40-patient pilot group recruited through the founders' clinical contacts, with basic monitoring in place to track daily engagement and confirmation rates from day one."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The founders had a working product in patients' hands eight weeks after the engagement started, instead of the six months the original scope would have required. The pilot ran on a budget that left runway intact for the parts of the build that still mattered: refining the adherence logic based on real data, not guessing at features nobody had tested yet."
      },
      {
        "type": "list",
        "items": [
          "**Before:** A twelve-feature plan, a six-month build estimate, and no usage data to bring to investors.",
          "**After:** A three-feature pilot live with 40 patients in eight weeks, generating the engagement numbers the seed round conversation actually needed."
        ]
      },
      {
        "type": "paragraph",
        "text": "Holding the MVP scope also meant the founders could change direction cheaply. When early pilot data showed patients wanted a way to see their own adherence trend, not just log a dose, that feature got added in week nine without reworking anything already built, because the reminder logic had been kept separate from the rest of the app from the start."
      },
      {
        "type": "heading",
        "text": "Beyond launch"
      },
      {
        "type": "paragraph",
        "text": "Once the pilot confirmed the core loop worked, product engineering continued past the initial release. The caregiver dashboard, deferred from the original plan, was added as a second phase once the founders could point to real adherence data to justify it. The application was moved onto scalable cloud infrastructure ahead of the seed round, so a successful raise wouldn't mean an immediate rebuild."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "The founders didn't need every feature they'd designed. They needed proof that the one feature at the center of their hypothesis worked. Custom MVP development let them test that specific idea instead of a generic version of it, and kept the build small enough that a wrong guess would have cost eight weeks, not six months."
      }
    ]
  },
  {
    "slug": "the-bad-data-would-have-shipped-in-the-old-process",
    "title": "The bad data would have shipped in the old process. It got caught on day two.",
    "category": "insignai",
    "summary": "A consumer brand ran a quarterly tracker across four markets, the kind of study built to move slowly and stay comparable quarter to quarter. Under the team's usual process, fieldwork ran for two weeks, data got cleaned and weighted by a separate analytics vendor, and the insights team saw the first tables roughly five days after fieldwork closed. If something looked wrong at that point, tracing it back to a fieldwork issue meant going through partial completes and vendor logs from a study that had already ended.",
    "facts": [
      {
        "label": "Category",
        "value": "Quarterly brand tracker, FMCG, multi-market"
      },
      {
        "label": "Team",
        "value": "Insights, Brand"
      },
      {
        "label": "Question",
        "value": "Is the tracker's quarter-over-quarter dip in consideration a real shift, or a data quality problem that would only surface after the report was already written?"
      },
      {
        "label": "Time in InsignAI",
        "value": "Fieldwork issue caught and corrected within 48 hours of launch, full report delivered in the usual quarterly window"
      },
      {
        "label": "What changed",
        "value": "A sampling issue that would normally have surfaced after the tables were built got flagged while fieldwork was still running. The quarter's numbers went into the boardroom deck clean, not with a footnote explaining a correction made after the fact."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A consumer brand ran a quarterly tracker across four markets, the kind of study built to move slowly and stay comparable quarter to quarter. Under the team's usual process, fieldwork ran for two weeks, data got cleaned and weighted by a separate analytics vendor, and the insights team saw the first tables roughly five days after fieldwork closed. If something looked wrong at that point, tracing it back to a fieldwork issue meant going through partial completes and vendor logs from a study that had already ended."
      },
      {
        "type": "paragraph",
        "text": "This quarter, an early build of the tables showed brand consideration down sharply in one market, enough to trigger a call with the CMO before the full readout was ready. The team needed to know within days, not the usual week, whether that number reflected something real in the market or a problem with how the data had come in."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The team ran the tracker inside InsignAI using the same questionnaire structure as the previous eleven waves, so quarter-over-quarter comparisons would hold. Historical wave data sat in the same environment, available to check the new wave against as responses came in rather than only after the study closed."
      },
      {
        "type": "heading",
        "text": "What InsignAI did"
      },
      {
        "type": "paragraph",
        "text": "While fieldwork was still live, InsignAI's quality monitoring flagged a skew in one market: a disproportionate share of completes coming from a single panel source, with response patterns on unrelated questions that looked too similar to be independent respondents. That pattern showed up on day two of a two-week fieldwork period, while there was still time to act on it."
      },
      {
        "type": "paragraph",
        "text": "The team paused sourcing from that panel in the affected market and extended fieldwork slightly to bring the sample back into balance, a decision that would have been far more expensive to make after the study had already closed and completes couldn't be added back in proportion."
      },
      {
        "type": "paragraph",
        "text": "Once fieldwork finished, analysis ran in the same environment the data had been collected in. Quantitative results sat next to the open-ended brand-perception questions, so when consideration numbers came back, the team could check the stated reasons behind them in the same pass rather than requesting a separate qualitative cut afterward. Cross-tabs isolated the affected market from the other three, so the eventual read wasn't muddied by a data issue that had already been resolved before it ever reached the tables."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "Once the corrected data was in, the questions were the ones a tracker exists to answer: had consideration actually moved in that market, what was driving it if it had, and whether the shift showed up consistently across the segments that mattered or only in one part of the sample."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The corrected market showed a smaller, real decline in consideration, tied to a pricing change a competitor had made two months earlier, visible in the open-ended responses once the skewed completes were out of the sample. Without the mid-fieldwork flag, that finding would have gone to the CMO as a much larger number, driven partly by a panel artifact, with the correction surfacing later as a revision nobody wanted to explain."
      },
      {
        "type": "paragraph",
        "text": "The report went out on the normal quarterly schedule. The one extra step, catching and correcting the panel issue, added roughly two days to fieldwork and no delay at all to delivery, because the correction happened before analysis started rather than after it finished."
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "InsignAI didn't produce the insight that a competitor's pricing move was denting consideration. It caught a data problem early enough that the insight was the real one, not an artifact the team would have spent the next quarter unwinding after the fact."
      }
    ]
  },
  {
    "slug": "predicting-vehicle-demand-before-acquisition",
    "title": "Predicting Vehicle Demand Before Acquisition",
    "category": "ai-solutions",
    "summary": "Automotive retailers make inventory acquisition decisions before knowing how much customer interest a particular vehicle will generate.",
    "facts": [
      {
        "label": "Industry",
        "value": "Automotive Retail"
      },
      {
        "label": "Service",
        "value": "Data Science as a Service"
      },
      {
        "label": "Capabilities",
        "value": "Predictive Modeling • Machine Learning • Demand Classification • Feature Engineering • Model Validation • Decision Intelligence"
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The Challenge"
      },
      {
        "type": "paragraph",
        "text": "Automotive retailers make inventory acquisition decisions before knowing how much customer interest a particular vehicle will generate."
      },
      {
        "type": "paragraph",
        "text": "Two vehicles with similar prices, age and mileage can perform very differently once they enter inventory."
      },
      {
        "type": "paragraph",
        "text": "The objective was to develop a data-driven approach for estimating vehicle demand before acquisition, helping decision-makers distinguish between vehicles likely to generate stronger customer interest and those that may require more time to sell."
      },
      {
        "type": "paragraph",
        "text": "A key analytical metric was Leads per Day (LPD), measuring customer interest relative to the amount of time a vehicle remained available."
      },
      {
        "type": "paragraph",
        "text": "For example, an analysis might show that vehicles generating 0.40+ leads per day move materially faster than vehicles generating below 0.15 leads per day."
      },
      {
        "type": "paragraph",
        "text": "These figures are illustrative and do not represent client data."
      },
      {
        "type": "heading",
        "text": "Our Approach"
      },
      {
        "type": "paragraph",
        "text": "We developed a machine-learning framework using historical inventory, vehicle characteristics and customer engagement data to identify patterns associated with vehicle demand."
      },
      {
        "type": "paragraph",
        "text": "The modeling incorporated signals across several dimensions."
      },
      {
        "type": "heading",
        "text": "Vehicle Characteristics"
      },
      {
        "type": "paragraph",
        "text": "Make, model, year, trim, mileage, body type, drivetrain and other vehicle-specific attributes."
      },
      {
        "type": "heading",
        "text": "Pricing & Market Position"
      },
      {
        "type": "paragraph",
        "text": "Vehicle pricing, valuation information, market positioning and external marketplace signals."
      },
      {
        "type": "heading",
        "text": "Vehicle Configuration"
      },
      {
        "type": "paragraph",
        "text": "For specialized vehicle categories, additional attributes such as fuel type, roof/top configuration, number of doors and cab type were incorporated into the analysis."
      },
      {
        "type": "heading",
        "text": "Customer Demand"
      },
      {
        "type": "paragraph",
        "text": "Historical lead activity, inventory age and Leads per Day provided the behavioral signals required to understand how different types of vehicles performed."
      },
      {
        "type": "heading",
        "text": "Finding the Right Modeling Strategy"
      },
      {
        "type": "paragraph",
        "text": "An important part of the engagement involved determining how the prediction problem should be structured."
      },
      {
        "type": "paragraph",
        "text": "The initial approach explored predicting the exact Leads per Day value for an individual vehicle."
      },
      {
        "type": "paragraph",
        "text": "However, vehicle-level demand can be sparse and highly variable. Predicting an exact value was therefore not always the most useful representation for operational decision-making."
      },
      {
        "type": "paragraph",
        "text": "The problem was subsequently reframed around demand classification. Instead of asking:"
      },
      {
        "type": "paragraph",
        "text": "\"How many leads per day will this vehicle generate?\" the model can answer:"
      },
      {
        "type": "paragraph",
        "text": "\"Is this vehicle expected to generate Low, Medium or High customer demand?\""
      },
      {
        "type": "paragraph",
        "text": "Illustrative categories might look like:"
      },
      {
        "type": "list",
        "items": [
          "**Low Demand:** Below 0.15 LPD",
          "**Medium Demand:** 0.15–0.40 LPD",
          "**High Demand:** Above 0.40 LPD"
        ]
      },
      {
        "type": "paragraph",
        "text": "Thresholds are illustrative and do not represent client data."
      },
      {
        "type": "heading",
        "text": "Improving Model Reliability"
      },
      {
        "type": "paragraph",
        "text": "Model evaluation revealed that vehicles clearly exhibiting high- or low-demand patterns could generally be distinguished more reliably than vehicles positioned close to category boundaries."
      },
      {
        "type": "paragraph",
        "text": "**This led to experimentation with a two-stage modeling strategy.**"
      },
      {
        "type": "paragraph",
        "text": "The first stage focuses on identifying vehicles with strong high- or low-demand signals. More ambiguous vehicles can then be evaluated separately using additional features and decision logic."
      },
      {
        "type": "paragraph",
        "text": "The objective was not simply to maximize a model metric, but to create predictions that were useful in real acquisition decisions."
      },
      {
        "type": "heading",
        "text": "From Prediction to Decision Intelligence"
      },
      {
        "type": "paragraph",
        "text": "The resulting demand classifications were designed to support practical inventory decisions."
      },
      {
        "type": "paragraph",
        "text": "Vehicles with stronger predicted demand could be prioritized for acquisition, while uncertain vehicles could be flagged for additional review and lower-demand vehicles could be deprioritized."
      },
      {
        "type": "paragraph",
        "text": "Once a vehicle entered inventory, its actual lead velocity could also be compared with its predicted demand category."
      },
      {
        "type": "paragraph",
        "text": "This creates a continuous learning loop:"
      },
      {
        "type": "callout",
        "text": "Historical Inventory → Demand Modeling → Demand Classification → Acquisition Decision → Actual Demand → Model Improvement"
      },
      {
        "type": "heading",
        "text": "The Outcome"
      },
      {
        "type": "paragraph",
        "text": "The project transformed historical lead and inventory data into a repeatable vehicle demand intelligence framework."
      },
      {
        "type": "paragraph",
        "text": "Instead of relying exclusively on experience, valuation information or broad market averages, acquisition teams can incorporate vehicle-specific demand predictions into their decision-making process."
      },
      {
        "type": "heading",
        "text": "Capabilities Demonstrated"
      },
      {
        "type": "paragraph",
        "text": "Predictive Modeling • Classification • Feature Engineering • Demand Analytics • Model Validation • Threshold Optimization • Decision Intelligence • Continuous Model Improvement"
      }
    ]
  },
  {
    "slug": "the-problem-wasnt-finding-opinions",
    "title": "The problem wasn't finding opinions. It was catching them before the moment passed.",
    "category": "enspeek",
    "summary": "The brand's periodic surveys and feedback exercises were doing what they were built to do. They gave the team a useful snapshot every few months. The trouble was what happened in between.",
    "facts": [
      {
        "label": "Category",
        "value": "Consumer-facing brand, continuous listening"
      },
      {
        "label": "Team",
        "value": "Insights, Brand"
      },
      {
        "label": "Question",
        "value": "By the time the next scheduled survey runs, has consumer sentiment already moved on from whatever it was going to tell us?"
      },
      {
        "label": "Time in EnspeeK",
        "value": "Set up as an always-on listening channel rather than a single fielded study"
      },
      {
        "label": "What changed",
        "value": "Research stopped being something that happened on a calendar and became something that ran continuously, catching shifts while they were still small."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "The brand's periodic surveys and feedback exercises were doing what they were built to do. They gave the team a useful snapshot every few months. The trouble was what happened in between."
      },
      {
        "type": "paragraph",
        "text": "A campaign could shift how people felt about the brand within days. A product issue could start trending in social conversations before the next scheduled study even opened. A new need could show up in a handful of comments, and nobody could tell whether it was a one-off remark or the start of something the business needed to take seriously. Waiting for the next research cycle meant finding out about all of this after the fact, sometimes long after."
      },
      {
        "type": "paragraph",
        "text": "What the team needed was not more research in the traditional sense. It was a way to listen more often, without turning every small question into a full project with its own brief, timeline, and budget approval."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The team brought in EnspeeK as an always-on listening channel rather than a single study with a start and end date. Instead of waiting months for the next survey, they could open a focused conversation around whatever mattered right now: a recent product experience, a reaction to a campaign, a customer service interaction, a new product idea, a shifting preference, or a frustration as it emerged."
      },
      {
        "type": "paragraph",
        "text": "Each conversation stayed narrow and purposeful. Ask what matters to the consumer in that specific moment, follow up where it makes sense, and stop. No long questionnaires stacked on top of a simple question."
      },
      {
        "type": "heading",
        "text": "What EnspeeK did"
      },
      {
        "type": "paragraph",
        "text": "Over time, the conversations built a sharper picture of sentiment than any single snapshot could. The team could tell the difference between a recurring problem that kept coming up across many conversations, a niche issue that was real to one group but not widespread, an emerging signal that was starting to show up more often and worth watching, and a positive opportunity where people were unexpectedly enthusiastic about something nobody had asked about directly."
      },
      {
        "type": "paragraph",
        "text": "That distinction mattered because not every comment deserved to become a business priority. The value sat in knowing which ones were turning into a pattern and which ones were just noise from a single conversation."
      },
      {
        "type": "paragraph",
        "text": "The setup also brought depth and scale together in a way the brand hadn't had before. A comment like \"I don't have a problem with the product, but it's tricky when I'm in a hurry\" is just one person's experience on its own. Lined up against similar comments from other consumers, it became a real question the team could actually check: was convenience becoming a wider issue, or was that one person having an off day."
      },
      {
        "type": "heading",
        "text": "What they asked"
      },
      {
        "type": "paragraph",
        "text": "The team stopped asking what consumers thought during the last study and started asking what consumers were telling them right now. That shift meant checking in on specific moments as they happened, rather than waiting for the next scheduled wave to see whether something had changed."
      },
      {
        "type": "heading",
        "text": "What the listening showed, and what it did not"
      },
      {
        "type": "paragraph",
        "text": "**A handful of similar comments were worth more than any single one.**"
      },
      {
        "type": "paragraph",
        "text": "The convenience comment above meant little in isolation. Once the team could line it up against others like it, they had a real signal instead of an anecdote, and could decide whether it warranted action or just continued watching."
      },
      {
        "type": "paragraph",
        "text": "**Not everything that came in deserved a response.**"
      },
      {
        "type": "paragraph",
        "text": "Distinguishing a niche issue from a recurring one kept the team from treating every complaint as urgent. A comment specific to one small group stayed logged as niche rather than escalated as if it represented the whole customer base."
      },
      {
        "type": "paragraph",
        "text": "**The gap between something changing and the business finding out about it closed.**"
      },
      {
        "type": "paragraph",
        "text": "Issues that would previously have surfaced at the next scheduled study, weeks or months after they started, showed up while they were still small enough to address without a crisis response."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "Research stopped being something that happened occasionally, tied to a calendar and a budget cycle, and became something that ran continuously in the background, feeding decisions as they came up rather than only at scheduled checkpoints."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Periodic surveys gave the team a snapshot every few months, with no way to catch what happened between them.",
          "**After:** An always-on channel let the team catch issues earlier, spot emerging needs before they became urgent, and keep a live read on sentiment woven into everyday decisions."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "Continuous listening was never about bombarding consumers with questions all day. It was about being able to listen the moment something mattered, and knowing how to go deeper the instant a consumer handed the team a reason to."
      }
    ]
  },
  {
    "slug": "the-dashboard-they-asked-for-turned-into-an-alert-system",
    "title": "The dashboard they asked for turned into an alert system nobody had to build",
    "category": "talknact",
    "summary": "A mid-sized US e-commerce retailer collected a steady stream of customer feedback: post-purchase ratings, support ticket transcripts, and open-ended comments left on product reviews. All of it fed into a monthly CX report that the operations team used to spot recurring problems and prioritize fixes.",
    "facts": [
      {
        "label": "Category",
        "value": "Regional e-commerce retailer, operations and customer experience, US market"
      },
      {
        "label": "Team",
        "value": "Operations, Customer Experience"
      },
      {
        "label": "Question",
        "value": "Could the team catch a spike in negative customer feedback while it was still small, without waiting for the monthly CX report to flag it after the fact?"
      },
      {
        "label": "Time in TalkNAct",
        "value": "Architecture running the same afternoon it was requested, first live alert triggered within four days"
      },
      {
        "label": "What changed",
        "value": "A recurring packaging complaint went from a line item in next month's report to a fixed issue inside two weeks, because the team found out about it while it was still a trickle, not a pattern."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A mid-sized US e-commerce retailer collected a steady stream of customer feedback: post-purchase ratings, support ticket transcripts, and open-ended comments left on product reviews. All of it fed into a monthly CX report that the operations team used to spot recurring problems and prioritize fixes."
      },
      {
        "type": "paragraph",
        "text": "The report worked, but it worked on a one-month delay. A packaging issue that started showing up in week one of a reporting cycle wouldn't surface as a clear pattern until the report landed four weeks later, by which point a few hundred more orders had shipped with the same problem. The operations lead wanted something closer to real time, specifically a way to know when complaints about a specific issue started clustering, not just a retrospective count at month's end."
      },
      {
        "type": "paragraph",
        "text": "Building that internally meant text classification on unstructured feedback, a way to detect when a theme was trending rather than just present, and a notification system to alert the right person. That was three separate technical problems stacked on top of each other, and the engineering team's roadmap had no room for a one-off monitoring tool."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The operations lead described the outcome directly: flag feedback themes across ratings, support tickets, and reviews, tell us when a theme is increasing in frequency rather than just appearing occasionally, and notify the CX lead the moment a theme crosses a meaningful threshold."
      },
      {
        "type": "paragraph",
        "text": "Nothing in that brief specified a model, a classification method, or how the alerting should work under the hood. The team stated the outcome. Building the pipeline to get there wasn't their job."
      },
      {
        "type": "heading",
        "text": "What TalkNAct built"
      },
      {
        "type": "paragraph",
        "text": "From that objective, TalkNAct determined the architecture needed to deliver it: an ingestion step that pulled in structured ratings alongside unstructured ticket transcripts and review text, a theming step that identified recurring topics and sentiment across all three sources, a trend-detection step that tracked whether a given theme's frequency was rising compared to its recent baseline, and a notification step that triggered an alert once a theme crossed a defined threshold."
      },
      {
        "type": "paragraph",
        "text": "The retailer never had to design that sequence. They described feedback intelligence with alerting as the outcome, and the multi-agent pipeline for that specific job got created from the brief, the same engine behind the platform's other use cases, assembled differently for this one."
      },
      {
        "type": "heading",
        "text": "What they asked, and what they adjusted"
      },
      {
        "type": "paragraph",
        "text": "Four days after the pipeline went live, the first alert fired: complaints mentioning damaged packaging had tripled over the prior week, concentrated in orders shipped from one regional fulfillment center. The CX lead reviewed the underlying feedback behind the alert before treating it as confirmed, since a single noisy batch of tickets could in theory trigger a false signal."
      },
      {
        "type": "paragraph",
        "text": "The team then adjusted the condition in the same conversation: rather than alerting on any theme crossing the threshold, they asked TalkNAct to also flag which fulfillment center or product category a spiking theme was concentrated in, so the alert pointed at an actionable next step instead of just a general warning. That adjustment went into the running workflow without a new build or a new ticket to the team that had set it up."
      },
      {
        "type": "heading",
        "text": "What the workflow produced, and what it didn't decide"
      },
      {
        "type": "paragraph",
        "text": "**The alert named the pattern early enough to act on it.**"
      },
      {
        "type": "paragraph",
        "text": "Operations traced the packaging complaints back to a specific carton size the fulfillment center had recently switched to, something that wouldn't have surfaced as a clear root cause in a monthly aggregate report mixing dozens of smaller issues together."
      },
      {
        "type": "paragraph",
        "text": "**A human still made the call on what counted as serious.**"
      },
      {
        "type": "paragraph",
        "text": "TalkNAct surfaced the trend and the concentration. The CX lead decided whether it warranted an operational change, and the fulfillment team made the actual packaging fix. The workflow flagged the signal. It didn't execute the fix."
      },
      {
        "type": "paragraph",
        "text": "**Not every spike turned out to matter.**"
      },
      {
        "type": "paragraph",
        "text": "A smaller alert two weeks later, tied to a product category with naturally variable review volume, turned out to be normal fluctuation once reviewed. The team treated that as confirmation the review step mattered just as much as the alert itself, since not every threshold crossing represented a real operational problem."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "The packaging issue got identified and fixed within two weeks of first appearing in customer feedback, instead of surfacing a full month later as one line in a longer report, by which point several thousand more orders would have shipped with the same defect."
      },
      {
        "type": "list",
        "items": [
          "**Before:** A monthly CX report that caught recurring issues a full cycle after they started, with no way to see a problem building in real time.",
          "**After:** A theme-and-alert pipeline built the same day from a plain-language brief, refined once in conversation to point alerts at a specific operational cause, running continuously without a dedicated engineering build."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "TalkNAct didn't replace the CX team's judgment about what to do with a spike in complaints. It closed the four-week gap between a problem starting and someone finding out about it, and it did that from a description of the outcome the team wanted, not a specification they had to hand to an engineering team and wait on."
      }
    ]
  },
  {
    "slug": "the-feature-everyone-wanted-built",
    "title": "The feature everyone wanted built turned out to be the one nobody would pay for",
    "category": "research",
    "summary": "A mid-sized B2B software company was planning its next major release. Product had a list of six candidate features, all of them requested by existing customers at some point over the past year: advanced reporting, a mobile app, single sign-on, API access, a dedicated account manager tier, and custom branding options.",
    "facts": [
      {
        "label": "Category",
        "value": "Subscription software, USA"
      },
      {
        "label": "Team",
        "value": "Product, Pricing, Insights"
      },
      {
        "label": "Question",
        "value": "Of six features planned for the next release, which ones were actually worth the engineering time, and which ones were popular in theory but wouldn't move a single subscription decision?"
      },
      {
        "label": "Time in advanced analytics",
        "value": "Three weeks from study design to a prioritized feature list"
      },
      {
        "label": "What changed",
        "value": "Two features slated for the next release got cut before a line of code was written. One feature nobody had prioritized moved to the top of the roadmap."
      }
    ],
    "body": [
      {
        "type": "heading",
        "text": "The situation"
      },
      {
        "type": "paragraph",
        "text": "A mid-sized B2B software company was planning its next major release. Product had a list of six candidate features, all of them requested by existing customers at some point over the past year: advanced reporting, a mobile app, single sign-on, API access, a dedicated account manager tier, and custom branding options."
      },
      {
        "type": "paragraph",
        "text": "Every feature had a champion inside the company. Every feature also had a real engineering cost, and the roadmap only had room for three of the six in the next two quarters. The usual approach, a simple customer survey asking people to rate how much they wanted each feature, had been tried before and hadn't held up. Customers rated almost everything highly when asked in isolation, which told the team nothing about what they'd actually give up something else to get, or what they'd pay more for."
      },
      {
        "type": "paragraph",
        "text": "The team needed to know which features would genuinely influence a renewal or an upgrade decision, not just which ones sounded nice when asked about individually."
      },
      {
        "type": "heading",
        "text": "What they put in"
      },
      {
        "type": "paragraph",
        "text": "The insights team didn't reach for a standard satisfaction survey. The question wasn't \"do you want this feature.\" It was \"if you had to choose, which combination of features and price would actually win your business,\" which meant a trade-off question, not a rating question."
      },
      {
        "type": "paragraph",
        "text": "They ran the study with existing customers and a sample of prospects who had evaluated the product but not purchased, structuring it to test the six candidate features against each other along with price, rather than asking about each feature on its own."
      },
      {
        "type": "heading",
        "text": "What the analytics showed"
      },
      {
        "type": "paragraph",
        "text": "Using a conjoint analysis approach, the study presented respondents with different combinations of features and pricing and asked them to choose between realistic packages, the way they'd actually choose between competing plans in the real world. A MaxDiff exercise ran alongside it, asking respondents to pick the most and least important feature from rotating sets, which forced trade-offs a simple rating scale never would have."
      },
      {
        "type": "paragraph",
        "text": "**Single sign-on mattered far more than its rating had suggested.**"
      },
      {
        "type": "paragraph",
        "text": "On a straightforward satisfaction survey, SSO had rated in the middle of the pack. In the trade-off exercise, it turned out to be the single strongest driver of purchase decisions among the prospect sample specifically, the group the company most needed to convert. IT buyers evaluating the product alongside competitors treated its absence as close to disqualifying, something a simple rating question had never surfaced because nobody explicitly down-rated a feature they assumed was table stakes."
      },
      {
        "type": "paragraph",
        "text": "**Custom branding and a dedicated account manager tier barely moved the needle.**"
      },
      {
        "type": "paragraph",
        "text": "Both had scored well when customers rated them individually, largely because they sounded appealing with no cost attached. Once respondents had to trade them against other features or against a lower price, willingness to pay for either collapsed. Neither feature, on its own, changed a single simulated purchase decision in the choice model."
      },
      {
        "type": "paragraph",
        "text": "**Mobile app and advanced reporting split by segment.**"
      },
      {
        "type": "paragraph",
        "text": "Existing customers barely valued a mobile app. Prospects evaluating the product for field teams valued it heavily. The key driver analysis run alongside the choice data showed advanced reporting correlated more strongly with renewal likelihood among existing customers than with new purchase decisions, meaning it mattered more for keeping customers than winning new ones."
      },
      {
        "type": "paragraph",
        "text": "**API access showed a clear price-sensitivity threshold.**"
      },
      {
        "type": "paragraph",
        "text": "The pricing and choice analytics component of the study identified a specific price point above which demand for an API add-on dropped sharply, information a simple feature survey could never have produced, since it never asked anyone what they'd actually pay."
      },
      {
        "type": "heading",
        "text": "What changed"
      },
      {
        "type": "paragraph",
        "text": "Product cut custom branding and the dedicated account manager tier from the roadmap entirely, reallocating that engineering time to single sign-on, which moved from an unprioritized request to the first feature in the next release. Advanced reporting stayed on the roadmap but got repositioned internally as a retention investment rather than an acquisition driver, which changed how the launch would be marketed."
      },
      {
        "type": "list",
        "items": [
          "**Before:** Six features, each with internal support, competing for three roadmap slots based on individual popularity ratings.",
          "**After:** A ranked list based on actual purchase-decision impact, with SSO prioritized for its outsized effect on prospect conversion and two previously favored features removed before any engineering work began."
        ]
      },
      {
        "type": "callout",
        "title": "Takeaway",
        "text": "Asking customers to rate features one at a time told the team what sounded appealing. Asking them to trade features against each other and against price told the team what would actually change a buying decision, and those turned out to be two different lists. The advanced analytics didn't just measure preference. It found the features worth building and the ones worth quietly dropping."
      }
    ]
  }
];

export function getCaseStudyContent(slug: string): CaseStudySource | undefined {
  return caseStudyContent.find((c) => c.slug === slug);
}
