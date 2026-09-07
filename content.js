const CONTENT = {
  meta: {
    app_name: "Zaka District Schools AI Hub",
    tagline: "AI-assisted scheme and lesson planning for English teachers, Forms 1–4",
    version: "1.0.0"
  },

  mini_guide: [
    {
      title: "Who this is for",
      body: "Teachers in Zaka District Schools who want to use AI to plan lessons and schemes, but have limited or expensive data."
    },
    {
      title: "Which AI tools to use",
      body: "Free, general-purpose chatbots that work well on phones: ChatGPT, Claude, Gemini, and education tools like MagicSchool, Eduaide, and Diffit. You do not need a paid plan to start."
    },
    {
      title: "How to work with limited data",
      body: "Use school Wi-Fi or a hotspot when available. Batch your work: generate several schemes or lessons in one session, then save them to Docs/Drive or as PDFs for offline use. Keep prompts short. Reuse and adapt old outputs instead of starting from scratch each time."
    },
    {
      title: "Using Meta AI in WhatsApp",
      body: "Update WhatsApp. Open Chats and look for the Meta AI icon (top-right, in search, or as a contact). Tap it, paste your prompt, and send. When the reply appears, long-press it, copy, and paste into Docs, Notes, or Word for offline use. Do this on Wi-Fi where possible, and generate several items in one sitting."
    },
    {
      title: "Ethics and safety",
      body: "Never paste learner names, IDs, or sensitive school data into an AI chat. Treat every AI output as a draft — adapt the language, examples, and difficulty to your class. Be clear with learners when material is AI-assisted."
    }
  ],

  modules: [
    {
      id: "mod_0",
      title: "Orientation",
      subtitle: "Start here",
      tutorials: [
        {
          title: "Welcome",
          body: "This app helps you write schemes of work aligned to ZIMSEC and the Heritage-Based Curriculum, turn schemes into lesson plans quickly, and save planning time. Everything here works offline — you only need data when you want to generate a brand-new draft."
        },
        {
          title: "What is AI, here?",
          body: "Think of it as a fast teaching assistant. You type a request (a 'prompt'), it drafts schemes, lessons, questions, or explanations. You still decide what's correct and right for your learners."
        },
        {
          title: "What it can and can't do",
          body: "It can draft schemes, lessons, questions, rubrics, and rephrase language quickly. It cannot know your specific class unless you tell it, replace your judgement, or guarantee ZIMSEC alignment without your review. Always check and adapt before using it in class."
        },
        {
          title: "Offline vs online",
          body: "Offline: read every tutorial, prompt, and sample in this app. Online: copy a prompt, paste it into your AI tool of choice (browser or Meta AI in WhatsApp), generate, then save the result for offline use."
        }
      ]
    },
    {
      id: "mod_1",
      title: "ZIMSEC & Heritage-Based Scheming",
      subtitle: "The foundations",
      tutorials: [
        {
          title: "What is a scheme of work?",
          body: "A plan for what you'll teach across a term: what (competencies, content), how (activities), how you'll check learning (assessment), and what you'll use (resources). Heads and inspectors in Zaka District expect schemes to be clear and curriculum-aligned."
        },
        {
          title: "Components of a good scheme",
          body: "Competencies / outcomes, topics / content, learning activities (discussion, group work, SBP, CALA), assessment (questions, tasks, rubrics), and resources. Under the Heritage-Based Curriculum, link topics to local culture, history, and community examples where you can."
        },
        {
          title: "A simple table layout",
          body: "Columns: Week · Competency/Objective · Content/Topic · Learning Activities · Assessment · Resources. You'll use AI to fill this table quickly, then adapt it to your school's reality."
        }
      ]
    },
    {
      id: "mod_2",
      title: "AI for Scheme Writing",
      subtitle: "The core workflow",
      tutorials: [
        {
          title: "Overview",
          body: "Take a syllabus excerpt or topic list, use a prompt to generate a 6-week scheme in table form, then adapt it to your class. This can turn hours of typing into about 10 minutes of focused work."
        },
        {
          title: "Step 1 — Prepare your input",
          body: "Decide before you prompt: Level (Form 1–4), Term, Topic area (e.g. 'Comprehension and Summary'), and Constraints (large class, few textbooks, no projector). These details go straight into your prompt."
        },
        {
          title: "Step 2 — Generate the 6-week overview",
          body: "Open Prompt Studio and use S1 (or S1-WA for WhatsApp). Paste it into your AI tool, fill in the brackets, generate, and save.",
          promptRefs: ["S1", "S1-WA"]
        },
        {
          title: "Step 3 — Review and adapt",
          body: "Check competencies against your syllabus, make sure activities suit your class size and resources, add local examples from Zaka, and adjust pacing if 6 weeks doesn't fit your calendar. You can ask the AI to revise it, or edit by hand."
        },
        {
          title: "Weekly breakdown",
          body: "Once you have the 6-week scheme, use S2 (or S2-WA) to break any single week into 4 detailed lessons.",
          promptRefs: ["S2", "S2-WA"]
        },
        {
          title: "Unit plan with assessments",
          body: "Use S3 (or S3-WA) when you want a richer unit: essential questions, competencies, SBP/CALA ideas, summative tasks, and simple rubrics.",
          promptRefs: ["S3", "S3-WA"]
        }
      ]
    }
  ],

  prompts: [
    { code: "S1", title: "6-week scheme overview", category: "Scheme",
      full: "You are an experienced ZIMSEC English teacher in Zimbabwe. Create a 6-week scheme of work for Form [X] English, Term [Y], focusing on [Topic Area]. Present it as a table with these columns: Week; Competency / Learning Objective (aligned to the Heritage-Based Curriculum); Content / Topic; Learning Activities (include at least one learner-centred activity per week); Assessment (formative and/or summative); Resources (include low-resource options where possible). Class context: [number] learners, [resource constraints]. Use clear, practical language suitable for a Zimbabwean secondary school.",
      wa: "You are an experienced ZIMSEC English teacher in Zimbabwe. Create a 6-week scheme of work for Form [X] English, Term [Y], topic: [Topic]. Use a table with columns: Week, Competency, Content, Activities, Assessment, Resources. Class: [number] learners, [constraints]. Use simple, practical language for a Zimbabwean secondary school." },
    { code: "S2", title: "Weekly breakdown", category: "Scheme",
      full: "You are a ZIMSEC English teacher. Take this 6-week scheme overview: [paste your scheme or describe Week N]. Break Week [N] into 4 lessons. For each lesson, provide: Lesson focus (specific objective); Starter/hook activity (5 minutes); Main activities (learner-centred, suitable for [class size/resources]); Plenary/exit ticket (3–5 minutes); Homework or follow-up task (optional). Keep language clear and practical for a Zimbabwean secondary school.",
      wa: "You are a ZIMSEC English teacher. Break Week [N] of this scheme into 4 lessons: [briefly describe topic]. For each lesson give: objective, starter (5 min), main activities (for [class size/resources]), plenary/exit ticket, optional homework. Use simple language for a Zimbabwean secondary school." },
    { code: "S3", title: "Unit plan with assessments", category: "Scheme",
      full: "You are designing a unit plan for Form [X] English, topic: [Topic]. Create a plan that includes: Essential questions (2–4 big questions); Key competencies/learning outcomes (Heritage-Based Curriculum); Suggested SBP/CALA ideas linked to the topic; Summative assessment tasks (e.g. comprehension passage + questions, composition task, language structures exercise); Simple rubrics (Excellent/Good/Needs Improvement). Context: [class size, resource constraints]. Use Zimbabwean examples where possible.",
      wa: "Design a unit plan for Form [X] English, topic: [Topic]. Include: essential questions, key competencies (HBC), SBP/CALA ideas, summative tasks (comprehension/composition/language), and simple rubrics. Context: [class size/resources]. Use Zimbabwean examples." },
    { code: "L1", title: "Single lesson plan", category: "Lesson",
      full: "You are a ZIMSEC English teacher. Plan one 40-minute lesson for Form [X], topic: [Topic]. Include: objective, starter (5 min), main activities (learner-centred, suitable for [class size/resources]), plenary/exit ticket, optional homework. Use clear English suitable for Zimbabwean learners.",
      wa: "Plan one 40-minute lesson for Form [X] English, topic: [Topic]. Include: objective, starter (5 min), main activities (for [class size/resources]), plenary/exit ticket, optional homework. Use clear, simple English for Zimbabwean learners." }
  ],

  samples: [
    {
      title: "Form 2 · Comprehension & Summary — 6-week scheme",
      meta: "58 learners · 6 shared textbooks · no projector",
      body: "Week 1 — Identify main ideas and supporting details. Group reading, underline topic sentences, list 3 supporting details, class discussion. Exit ticket: write the main idea in 1–2 sentences.\n\nWeek 2 — Answer literal comprehension questions. Pair work, compare answers, teacher models finding evidence. Short quiz: 5 literal questions.\n\nWeek 3 — Answer inferential questions. Teacher reads a short story aloud; pairs suggest character feelings and cite clues. Learners write 2 inferential Q&A for a new passage.\n\nWeek 4 — Summarise a paragraph. Groups highlight 'must-keep' sentences, write a 2-sentence summary, exchange and improve. Individual summary, 4–5 lines.\n\nWeek 5 — Mixed comprehension questions. Timed group activity, 8 questions divided among members, compare answers. Individual test: 10 questions.\n\nWeek 6 — Reflect on strengths and weaknesses. Pairs review their test, identify 2 difficult question types, teacher gives targeted tips. Short reflection paragraph."
    },
    {
      title: "Form 3 · Descriptive Writing — single lesson",
      meta: "62 learners · 8 textbooks · no projector · 40 minutes",
      body: "Objective: write a 10-line paragraph describing a busy market using sensory detail.\n\nStarter (5 min): who has been to a busy market? 2–3 learners share one thing seen, heard, or smelled; teacher writes strong phrases on the board.\n\nMain (30 min): mini-lesson on sensory detail (10 min); pair work listing 5 sensory details (10 min); individual writing, 10 lines, at least 4 sensory details (10 min).\n\nPlenary (5 min): swap paragraphs, partner underlines 2 good phrases plus one suggestion; 2 volunteers read aloud.\n\nHomework (optional): a second paragraph describing a different place using sensory detail."
    }
  ],

  feedback_questions: [
    "Class & Topic — which Form (1–4) and English topic did you plan for this week?",
    "AI Tool & Prompt Used — which prompt code (e.g. S1, S2, L1), and Web Browser or Meta AI in WhatsApp?",
    "Time Saved — roughly how much time did AI drafting save you this week vs typing from scratch?",
    "Curriculum Alignment — 1 to 5, how closely did the draft match ZIMSEC/Heritage-Based expectations before editing?",
    "Challenges — any issues with data, prompt text, or output quality this week?",
    "Feature Requests — what prompt, subject area, or app feature would help you most next week?"
  ],

  pilot_timeline: [
    { week: "Week 1", focus: "App Onboarding & First Scheme",
      activity: "Install the app, review the Mini-Guide, generate your first 6-week scheme with S1 / S1-WA.",
      milestone: "One full scheme generated and saved offline.",
      checkin: "Friday: confirm install & first scheme via WhatsApp." },
    { week: "Week 2", focus: "Lesson Plan Generation",
      activity: "Use L1 or S2 to turn Week 1 of your scheme into 3–4 detailed lesson plans.",
      milestone: "At least 2 AI-assisted lessons delivered in class.",
      checkin: "Friday: send the Weekly Feedback Form." },
    { week: "Week 3", focus: "Localisation & WhatsApp Workflow",
      activity: "Practice generating drafts via Meta AI in WhatsApp; add Zaka-specific context.",
      milestone: "WhatsApp AI outputs saved offline into Docs/Notes.",
      checkin: "Friday: Feedback Form + review data efficiency." },
    { week: "Week 4", focus: "Review & Expansion Planning",
      activity: "Evaluate time saved overall, submit final feedback, preview Learner Mode.",
      milestone: "Pilot evaluation complete; school champions identified.",
      checkin: "Friday: wrap-up call/meeting with HODs." }
  ]
};
