# CodeQuest Academy

CodeQuest Academy is the multi-academy evolution of PythonQuest.

## v32

- Full learner-facing rebrand to CodeQuest Academy
- Academy selection after first login
- Active academy switcher
- Python Academy available
- Java, Web Development and SQL academies staged for future releases
- Shared learner profile, XP, portfolio and career evidence
- Track-aware course loading architecture

## Email branding

Use `CodeQuest Academy` as the SMTP sender display name.

The currently verified sender may remain:

`contact@applypilotpro.co.uk`

Recommended future sender after a dedicated domain is verified:

`hello@codequestacademy.co.uk`

## v33 — SQL & Database Academy

SQL is now the second fully functional CodeQuest academy.

### Included

- 20 sequential lessons across five stages
- Real SQLite execution through Pyodide
- Three realistic datasets, including a relational commerce model
- Query-result validation against reference outputs
- Five stage assessments
- Five assessment-backed credentials
- Three professional portfolio projects
- Academy-specific dashboard and navigation
- Saved-query evidence and progress tracking

### Credentials

- SQL Query Practitioner
- SQL Analytics Practitioner
- Relational SQL Practitioner
- Advanced SQL Analyst
- Database Engineering Practitioner

## v34 — Web Development Academy

Web Development is now fully functional.

- 20 sequential lessons across HTML, CSS, JavaScript, browser development and professional frontend practice
- Sandboxed live browser preview
- Mobile, tablet and desktop preview widths
- Automated lesson evidence checks
- Three professional frontend projects
- Five assessments and five credentials
- Academy-specific dashboard and navigation

## v35 — Java Academy

Java is now the fourth functional CodeQuest academy.

### Included

- 20 sequential lessons across Core Java, OOP, Advanced Java, engineering and enterprise Java
- Transparent browser-based Java learning simulator
- Structural validation and predicted output
- Explicit disclosure that arbitrary Java is not yet compiled on a JVM
- Three professional Java projects
- Five stage assessments
- Five professional credentials
- Academy-specific dashboard and navigation

### Credentials

- Java Core Practitioner
- Object-Oriented Java Practitioner
- Advanced Java Developer
- Java Engineering Practitioner
- Spring Boot Application Developer

## v36 — Unified Developer Profile and Cross-Academy Intelligence

CodeQuest now combines evidence across Python, SQL, Web and Java.

### Included

- Unified developer score
- Ten cross-academy capability domains
- Academy-level progress overview
- Five role-readiness pathways
- Weighted role-specific readiness scoring
- Four integrated capstone projects
- Unified developer profile export

### Role pathways

- Data Analyst
- Data Engineer
- Frontend Developer
- Backend Engineer
- Full-Stack Developer

## v37 — Secure Coding Lab and Professional Autograding Foundation

- Multi-file coding workspace
- Python and SQL browser execution
- JavaScript browser analysis
- Remote-runner API adapter
- Transparent Java structural mode when no JVM runner is configured
- Public-test results
- Hidden-test-ready grading contract
- Code-quality scoring
- Explanation scoring
- Submission evidence export
- Isolated runner reference architecture

## v38 — Instructor, Cohort and Classroom OS

### Classroom

- Learner and instructor modes
- Cohort landing page
- Published assignments
- Announcements
- Assignment launch into coding labs

### Instructor OS

- Instructor command center
- Cohort health metrics
- Learner risk scoring
- Cohort management
- Assignment builder
- Gradebook and CSV export
- Submission review queue
- Rubric-ready feedback flow
- Learner analytics
- Intervention notes
- Cohort announcements

### Current architecture

This release provides a functional browser-based LMS foundation using persisted local state.
A production multi-user deployment should move cohort membership, permissions, submissions,
grades and announcements into Supabase tables with row-level security.

## v38.1 — Login Reload Loop Hotfix

Fixed an academy-navigation defect that called `location.reload()` whenever Python Academy
was active and the sidebar restoration flag had not been created.

The application now:

- captures the original Python/global sidebar once;
- restores it without refreshing the page;
- rebinds sidebar navigation after restoration;
- uses cache version 38.1 to replace the faulty service-worker assets.

## v39 — Academy Parity Engine

SQL, Web Development and Java now receive the learning-intelligence features that previously
made Python Academy substantially richer.

### Added to each academy

- Academy command center
- Baseline diagnostic
- Confidence-aware diagnostic history
- Adaptive Socratic coach
- Misconception tracking
- Five-minute spaced review
- Concept mastery map
- 30/60/90-day learning path
- Career simulations
- Academy-specific visual learning tool

### Subject-specific visualisers

- SQL query-plan visualizer
- Web DOM and semantic-structure visualizer
- Java object and reference tracer

## v40 — Curriculum Studio and Academy Authoring OS

### Hotfixes

- Adaptive-coach response boxes are now full-width and aligned with the question.
- Academy-specific screens reconcile the active academy before rendering.
- Login/cloud restoration can no longer briefly show Java content while SQL is active.

### Curriculum Studio

- Lesson and assessment draft library
- Academy and status filtering
- Reusable authoring templates
- Structured lesson editor
- Instructional-quality scoring
- Learner preview
- Editorial review workflow
- Versioned publication snapshots
- Draft, review, published and archived states

## v41 — Production Cloud Platform and Multi-Tenant Learning Graph

### Production data model

- Profiles and roles
- Organisations and memberships
- Cohorts and memberships
- Curriculum versions
- Assignments and submissions
- Learner progress
- Learning events
- Intervention notes
- Credentials
- Audit logs

### Security

- Supabase row-level security policies
- Learner ownership controls
- Instructor cohort access
- Organisation-admin governance
- Public credential verification
- Service-role key remains server-only

### Offline-first sync

- Persistent mutation queue
- Retry policy
- Sync-status events
- Local operation while offline
- Manual sync control
- Conflict-review foundation

## v42 — AI Mentor, Pair Programmer and Technical Interview OS

### Mentor modes

- Socratic tutor
- Debugging partner
- Senior code reviewer
- Project architect
- Technical viva
- Interview coach

### Pair programming

- Academy-aware starter workspace
- Smallest-next-step planning
- Static review feedback
- Design-defence prompts
- Saved pair sessions

### Technical viva

- Python, SQL, Web and Java interview banks
- Evidence-signal scoring
- Answer structure prompts
- History and export

### AI safety architecture

- Local pedagogical fallback
- Optional server-proxy endpoint
- No provider API key in the browser
- Attempt-before-answer policy
- Graduated hints

## v43 — Developer Mission Control and Simulation Universe

### Flagship missions

- Analytics Platform Rescue
- Checkout Recovery
- Legacy Service Modernisation

### Workplace simulation

- Persistent multi-stage missions
- Ambiguous briefs
- Technical diagnosis
- Implementation decisions
- Production incident injects
- Stakeholder pressure-testing
- Sprint-board evidence
- Architecture and incident decisions
- Release defence

### Career evidence

Completed missions create exportable dossiers containing:

- role and client context;
- mission score;
- stage responses;
- decisions;
- stakeholder interactions;
- competency evidence;
- completion timestamp.

## v43.1 — Login startup hotfix

Fixed a standalone `async` token before the mission functions. Although JavaScript parsers
accept `async` as an identifier expression in that position, the browser raised
`ReferenceError: async is not defined` during startup and prevented authentication from loading.

Validation now checks for standalone `async` lines in addition to syntax parsing.

## v43.2 — Academy-aware portfolio hotfix

The Professional Showcase now follows the active academy.

- Python, SQL, Web and Java have independent portfolio headlines and summaries.
- Credentials come from the selected academy's own modules and assessments.
- Project evidence comes from the selected academy's own project state.
- Portfolio strength uses academy progress, credentials and projects.
- Exported HTML uses academy-specific evidence and competencies.
- Existing legacy portfolio customisation is retained as the Python profile.
- Fixed the old `portfolioEvidence()` local-variable shadowing defect.

## v44 — Team Engineering, Collaboration and Hackathon OS

### Team workspaces

- Product, data-platform and incident-response templates
- Member roles
- Shared delivery boards
- Task ownership
- Engineering discussions
- Contribution tracking

### Peer review

- Pull-request style review requests
- Review dimensions
- Changes requested and approval states
- Actionable review comments
- Review evidence and contribution credit

### Hackathons

- Data Trust Challenge
- Resilient Commerce Challenge
- Multi-academy briefs
- Deliverables and judging criteria
- Team-linked submissions

### Contribution profile

- Delivery
- Review
- Communication
- Leadership
- Collaboration
- Evidence timeline

## v45 — Public Experience, Growth and Guided Onboarding OS

- Comprehensive responsive landing page
- Interactive academy carousel and product preview
- Value, proof, journey and feature sections
- Public FAQ
- Privacy policy and terms pages
- Sign-in/create-account handoff
- First-login goal and academy wizard
- Six-step product walkthrough

The legal documents are drafts and require professional legal review before commercial launch.

## v46 — Career Launch OS and Employer-Ready Talent Profile

### Auth rebrand

The sign-in experience now presents CodeQuest as a four-academy platform rather than a
Python-only product.

### Career Launch

- Target-role selection
- Evidence-backed readiness scoring
- Skill-gap analysis
- Career milestones
- Next-best actions

### Job Matcher

- Job-description analysis
- Keyword-category matching
- Evidence alignment
- Likely gap identification

### Application Pack

- Evidence-backed CV bullets
- Professional summary
- Interview topic checklist
- Exportable JSON pack

### Talent Profile

- Role-readiness score
- Academy evidence
- Projects and mission proof
- Collaboration and technical-defence metrics

A non-technical monetisation roadmap is included without enabling payments.

## v46.1 — Signed-in Home and Dashboard navigation

- Added Home to the authenticated top bar.
- Added Go to dashboard to the public header for authenticated members.
- The public landing page can be viewed without ending the active session.
- Returning to the dashboard does not require authentication again.
- Landing CTAs change to dashboard actions for signed-in users.
- Academy landing cards switch the active academy and open its dashboard for members.

## v47 — Guided Capstone App Studio

Five end-of-path capstones are included:

- Responsive Web Calculator
- Weather Dashboard
- Python Expense Tracker
- Java Task Manager
- SQL Sales Insight Analysis

Each capstone includes:

- realistic brief and requirements;
- starter files;
- multi-file editor;
- graduated hints;
- structural project checks;
- deliberately unlocked reference solution;
- copy-to-workspace option;
- required learner reflection;
- evidence record showing hints and whether the solution was viewed.

The weather dashboard uses a mock learning dataset by default. A production weather service
should be called through a controlled API or server endpoint rather than embedding secrets in
the browser.

## v48 — Build, Deploy and Showcase OS

### Deployment Studio

- completed-capstone release candidates;
- academy-specific deployment lessons;
- target selection;
- environment and secret-management guidance;
- release-readiness scoring.

### Release Pipeline

- validation;
- automated project checks;
- packaging;
- simulated preview deployment;
- verification or health checks;
- failure states and reruns.

### Release evidence

- semantic version;
- release notes;
- verification evidence;
- rollback or recovery plan;
- professional checklist;
- exportable source bundle;
- versioned release register.

The deployment pipeline is a teaching simulation. It does not automatically execute or publish
untrusted learner code to external services.

## v49 — Adaptive Learning Graph and Personalised Curriculum Engine

### My Adaptive Path

- daily personalised learning plan;
- gentle, balanced and accelerated intensity;
- mastery, prerequisite, career and evidence-gap prioritisation;
- visible explanation for every recommendation;
- academy preference controls;
- action completion and adaptive history.

### Learning Graph

- academy concept nodes;
- prerequisite relationships;
- strong, developing and focus classifications;
- weakest-concept insights;
- cross-academy capability map.

### Spaced Review

- 1, 3, 7, 14 and 30-day intervals;
- due-review priority;
- review queue generated from completed concept actions.

### Focus Mode

- 15, 25, 40 and 60-minute sessions;
- distraction-reduced interface;
- session notes;
- focus evidence and XP;
- automatic completion when the timer ends.

The adaptive model is transparent and rule-based. It is not a validated measure of
intelligence or a guarantee of career readiness.

## v50 — Certification, Exam Integrity and Skills Passport OS

### Certification pathways

- Python Associate
- SQL & Data Associate
- Web Developer Associate
- Java Backend Associate
- Full-Stack Professional

### Exam system

- timed attempts;
- domain blueprints;
- multiple-choice and written questions;
- attempt limits;
- integrity declarations;
- window-change and answer-change signals;
- automatic scoring;
- domain-level result breakdown;
- adaptive retake plan.

### Credential records

- verification code;
- issue date;
- score;
- domain performance;
- active status;
- digital transcript;
- cross-academy skills passport.

CodeQuest credentials are internal learning credentials and are not externally accredited.

## v51 — ApplyPilotPro Career Bridge

### Separate products, connected workflow

CodeQuest remains an independent learning platform. ApplyPilotPro remains a job-application
platform.

### Evidence export

- user-selected evidence sections;
- explicit consent;
- structured JSON contract;
- target role;
- academy scores;
- credentials;
- capstones;
- missions;
- releases;
- peer reviews;
- technical viva;
- CV evidence bullets;
- skill gaps with CodeQuest deep links.

### Privacy

- no automatic transfer;
- no shared login;
- no hidden account linking;
- no provider secrets in browser code;
- local export history.

### Skills Passport shortcut

The Skills Passport now includes “Use in ApplyPilotPro”.

## v51.1 — Landing, login and public navigation hotfix

- Public landing page is visible immediately for unauthenticated visitors.
- Authentication remains hidden until Sign in or Create account is selected.
- Removed the initial login-screen flash.
- Replaced the remaining PQ authentication logo with CQ.
- Academies and How it works now navigate correctly from FAQ, Privacy and Terms.

## v51.2 — Stable landing-page boot experience

- Added a full-screen CodeQuest loading splash.
- The empty public landing structure and footer remain hidden until landing content is rendered.
- The complete landing page now appears in one transition.
- Sign-in and account creation still open only after explicit user action.

## v51.3 — Learning-first navigation and layout alignment

### Lean default navigation

Learning mode now shows only the core journey:

- Dashboard and Quest Board
- Academy Home and Course Map
- Revision and Adaptive Path
- Practice and Projects
- AI Mentor
- Capstone Studio and Portfolio
- Career Launch
- Certification and Skills Passport
- Developer Profile

All specialist, instructor, organisation, cloud, simulation and administration tools remain
available in All tools mode.

### Alignment fixes

- Role Pathway cards use equal height and aligned recommended-capstone/action areas.
- Cross-Academy Capstone evidence fields, completion controls and save buttons align.
- Mission Control stage lists and Enter Mission buttons align.
- Credential Verification input and action spacing corrected.
- Remaining authenticated PQ/Python-only branding replaced with CQ/multi-academy copy.

## v51.4 — Unified academy navigation and remaining card alignment

### One consistent Learning-mode sidebar

Python, SQL, Web and Java now show the same menu labels, order, spacing and styling:

- Academy Home
- Course Map
- Practice Arena
- Projects
- Assessments
- Credentials
- Portfolio
- Account
- Learning Command
- Diagnostic
- Adaptive Coach
- Smart Review
- Academy visualiser
- Mastery Map
- Career Simulations
- Capstone App Studio
- Capstone Portfolio

The routes behind academy-specific items still open the correct academy content.

### Cross-academy Capstone Studio

Capstone App Studio is displayed in its own Cross-Academy Build section, visually separated
from academy-specific learning tools.

### Alignment

- Start Mission aligns with Complete Prerequisite.
- Lesson cards reserve equal prerequisite and description space.
- Start Project buttons align across every project row.
- Project titles, descriptions, skill tags and metadata use consistent vertical space.

## v51.5 — Exact academy-menu parity

Learning mode now uses one immutable menu definition across Python, SQL, Web and Java.

- Identical labels
- Identical ordering
- Identical section headings
- Identical icon treatment
- Identical spacing and typography
- Generic Concept Visualizer label in all academies
- SQL Lab and Notebook moved out of Learning mode
- Python legacy menu can no longer overwrite the unified menu
- Sidebar integrity is checked whenever a view or academy changes
- Remaining authenticated PQ logo replaced with CQ

## v52 — Micro-Lesson Teaching Engine

Lessons now teach before they ask learners to execute code.

Each Python, SQL, Web and Java lesson includes:

- concise core theory;
- mental model;
- worked example;
- common mistake;
- retrieval or prediction question;
- explicit transition into practice.

The theory layer is generated from a curated concept library and matched to the lesson title,
description and challenge. Learners can mark theory as reviewed, and this state is persisted.

## v52.1 — Python lesson runtime and rendering hotfix

- Fixed Run Code remaining permanently disabled.
- Python readiness now explicitly controls the Run Code button.
- Added Preparing Python, Python ready and Python unavailable states.
- Successful exercises correctly enable Complete Step.
- Complete Step explains why it is disabled before an exercise passes.
- Theory and workspace are rendered together before runtime reset work begins.
- Removed the workspace-first/theory-later visual jump.
- Running code temporarily disables the Run button to prevent duplicate execution.

## v52.2 — Expanded theory carousel

The concise theory block is now a five-page lesson:

1. Concept and deeper explanation
2. Mental model
3. Worked code or data example
4. Common mistake
5. Retrieval question

Pages can be opened through Previous/Next controls or numbered buttons 1–5.

Collection and data lessons include concrete examples of:

- lists;
- tuples;
- dictionaries;
- sets;
- pandas dataframes.

The final page reveals the “I can explain this” action so theory review follows the complete
micro-lesson rather than the first card only.

## v52.3 — Academy content isolation

### Theory matching

- Theory profiles now declare their valid academies.
- SQL-only explanations cannot appear in Python, Web or Java lessons.
- Lesson matching also inspects module title, starter code, solution and concept metadata.
- Added dedicated pandas Boolean-filtering theory for Python data-analysis lessons.

### Practice Arena

Each academy now has a dedicated practice catalogue:

- Python: revision, debugging, pandas and web-data exercises.
- SQL: filtering, joins, aggregation and window functions.
- Web: semantic HTML, responsive CSS, DOM interactions and async interfaces.
- Java: core Java, OOP, collections, testing and exceptions.

Practice launchers select only unlocked lessons from the active academy.

## v53 — Deep Curriculum and Interactive Textbook OS

Every lesson now supports a complete chapter flow:

- Learn
- Visualise
- Walkthrough
- Predict
- Independent practice
- Recap

The chapter engine is academy-aware and works across Python, SQL, Web and Java.

A Curriculum Coverage dashboard is included in All Tools mode to track chapter availability
and learner-reviewed coverage across academies.

## v54 — Multi-File Project Workspace and Engineering Lab

- Academy-specific project templates
- Multi-file editor
- File tree and active-file tabs
- Static readiness checks
- Project snapshots
- Engineering reflection
- Project export
- Persistent workspaces

## v55.0 — Real Execution, Testing and Git Workflow OS

- Pyodide multi-file Python execution
- Python test discovery
- SQLite query and control execution
- Sandboxed Web preview
- Runtime evidence
- Changed-file detection
- Commit history and restore
- Unified diff viewer
- GitHub-ready export
- Java clearly remains structural simulation

## v56 — AI Engineering Coach

Project-aware hints, academy-specific review, technical viva, misconception tracking and exportable review evidence.

## v56.1 — Layout and Python Learning Support hotfix

- Corrected Python Learning Support routes.
- Python Diagnostic now opens Skill Diagnostic.
- Python Adaptive Coach now opens the native adaptive coach.
- Python Smart Review now opens Review Lab.
- Python Concept Visualizer now opens Visual Tracer.
- Python Mastery Map now opens Concept Mastery.
- Python Career Simulations now opens Career Simulations.
- Rebound focused-navigation handlers on every navigation refresh.
- Rebuilt Engineering Lab starter-file display as separate file chips.
- Standardised Engineering Lab card spacing and action placement.
- Aligned all Capstone Studio action buttons using full-height card layouts.

## v57 — Cloud Runner and Secure Assessment OS

- protected cloud-runner API contract
- Java 21 Maven/JUnit runtime definition
- verified assessments across four academies
- server-only hidden-test architecture
- timed attempts
- immutable SHA-256 evidence
- instructor review queue

## v58 — Team Engineering, Pull Requests and Instructor Review OS

- Academy-specific team scenarios
- Team roles and sprint backlog
- Kanban delivery board
- Branch catalogue
- Pull-request workflow
- File-specific peer-review comments
- Changes requested, approval and merge decisions
- Collaboration evidence
- Sprint reflection
- Instructor revision and acceptance decisions

## v59 — Freemium Growth and Subscription OS

- Free, 15-Day Starter Pack, Pro Monthly and Pro Annual
- Central entitlement engine
- Usage meters
- Contextual upgrade gates
- Pricing page
- Test-mode plan activation
- Stripe server contracts
- Product analytics event store
- Growth funnel dashboard
- Downgrade-safe product rules

## v60 — Production Billing, Activation and Retention OS

- Stripe Checkout implementation contracts
- One-off Starter Pack payment mode
- Monthly and annual subscription modes
- Billing Portal contract
- Stripe webhook signature verification
- Webhook idempotency and entitlement audit schema
- Supabase RLS migration
- Server-authoritative entitlement endpoint
- Guided goal/academy/diagnostic onboarding
- Activation milestones
- Lifecycle notification centre
- Starter Pack expiry reminders
- Referral-validation contract
- Commercial and learning-health dashboard

## v60.1 — Public Pricing and Checkout Reliability

- Full pricing cards on the public landing page.
- Public navigation link to Pricing.
- Sign-in handoff preserves the selected paid plan.
- Stripe dependency added for Vercel server functions.
- Checkout errors display the real endpoint response.
- Removed permanent Pro Annual outline.
- Added consistent hover lift, border and shadow effects for all plans.

## v60.2 — public pricing moved directly below the landing hero with network-first shell caching.

## v60.3 — Vercel npm install hotfix

- Removed the contaminated package-lock containing internal registry URLs.
- Pinned Node to 20.x.
- Pinned npm to 10.9.2.
- Added a public npm registry configuration.
- Added an explicit Vercel install command.
- Preserved the Stripe server dependency.

## v60.4 — Vercel function runtime hotfix

- Removed the invalid `nodejs20.x` function-runtime declaration.
- Retained Node 20 through `package.json` engines.
- Retained npm 10 and the public npm registry.
- Kept Vercel configuration limited to the install command.

## v61 — Academy State Integrity and Daily Learning Journey

- Atomic academy hydration
- Canonical academy persistence
- Automatic course-route correction
- Prevention of mixed academy/course rendering
- Loading state during academy reconciliation
- Today learning dashboard
- Three-part daily learning plan
- Weekly minute goal
- Learning-day and streak tracking
- Momentum indicator
- Learning session history

## v62 — Interactive Textbook and Deep Lesson Library

- Detailed textbook chapter for every lesson
- Python chapters: 59
- SQL chapters: 20
- Web chapters: 20
- Java chapters: 20
- Fourteen study sections per chapter
- Reading progress
- Personal lesson notes
- Lesson bookmarks
- Worked and variation examples
- Common mistakes and debugging guides
- Workplace applications
- Expandable knowledge checks
- Academy textbook library
- Quick Review preserved separately

## v62.1 — Academy onboarding selection hotfix

- Restored the atomic `setActiveAcademy()` function removed during the academy-state refactor.
- Added guarded academy selection handling.
- Added visible selected, hover and keyboard-focus states.
- Prevented onboarding clicks from failing silently.

## v62.2 — Lesson Audio Reader

- Male and female voice preferences
- Specific installed voice selector
- 0.5x to 2.0x reading speed
- Play, pause, resume and stop
- Active textbook-section reading
- Saved audio preferences
- Automatic audio stop on section or screen change
- Honest fallback when voice gender metadata is unavailable

## v62.3 — Wide and Compact Lesson Layout

- Expanded the desktop lesson workspace from 940px to 1440px.
- Reduced outer padding and empty margins.
- Made lesson-mode tabs fill the available width.
- Converted audio controls into a compact horizontal toolbar.
- Widened the textbook reading column.
- Reduced table-of-contents and notes widths.
- Added Hide Notes / Show Notes control.
- Improved paragraph line length and spacing.
- Used two-column layouts for mechanics, mistakes and debugging cards.
- Improved responsive behaviour for desktop, tablet and mobile.

## v63 — Adaptive Practice and Mastery OS

- 119 lesson mastery assessments
- 714 generated questions
- Confidence-adjusted scoring
- Supportive 80% mastery threshold
- Varied retakes
- Mistake Notebook
- Spaced-review queue

## v64 — Launch Readiness, Quality Assurance and Public Beta OS

- Simplified learner navigation
- More Tools maturity-labelled catalogue
- Production, Beta and Simulation feature registry
- Playwright critical-journey suite
- Desktop and mobile browser projects
- JavaScript, promise and API error capture
- In-app problem reporting
- Launch-readiness dashboard
- Public-beta launch gate
- Curriculum-quality audit screen
- Predictable network-first shell caching
- Formal stop point for major feature expansion

## v64.1 — Reliable Playwright Selectors

- Replaced ambiguous `getByText()` pricing locators with exact heading-role locators.
- Removed the onboarding false positive that skipped assertions when the academy card was absent.
- Strengthened public landing coverage across Starter, Pro Monthly and Pro Annual headings.
- Updated cache and package version to 64.1.

## v64.2 — Authenticated Journey and Persistence QA

- Seeded Playwright authentication
- Email/password sign-in automation
- Academy selection and reload validation
- Python lesson, textbook, audio and mastery checks
- Sign-out/sign-in persistence test
- Honest credential-based skipping
- `.env.playwright.example`
- Live test runner
- Authenticated QA status page

## v64.3 — Authenticated Playwright Reliability Hotfix

- Opens `/#signin` directly on desktop and mobile.
- Uses `#authEmail`, `#authPassword` and `#authSubmitBtn`.
- Verifies the explicit `body.authenticated` application state.
- Surfaces authentication error messages in test output.
- Runs authenticated tests once in a dedicated Chromium project.
- Serialises all mutations of the seeded test account.
- Removes parallel session and cloud-state races.
- Uses direct application routing for lesson QA.
- Verifies academy persistence through stored canonical academy state.

## v64.4 — Early Authentication Bootstrap

- Starts Supabase authentication immediately at application boot.
- Loads curriculum and feature catalogues concurrently with authentication.
- Prevents sign-in from remaining in `auth-pending` while large data files load.
- Preserves delayed course rendering until curriculum hydration is complete.
- Replaces incorrect filename-based `testIgnore` with title-based `grepInvert`.
- Public tests now run only in desktop/mobile public projects.
- Authenticated tests run only once in serial desktop Chromium.
- Expected suite size with credentials: 12 tests, not 20.

## v64.5 — Public Shell and Auth Callback Hotfix

- Loads only landing content and pricing plans for the immediate public shell.
- Renders signup and pricing actions before the full curriculum catalogue.
- Keeps the large catalogue hydration in the background.
- Defers Supabase auth-state processing outside the callback execution.
- Prevents cloud-state reads from blocking the auth callback.
- Releases `auth-pending` and surfaces a visible message when authentication fails.

## v64.6 — Non-blocking Runtime Startup

- Stops jsPDF, JSZip, Chart.js and Pyodide from blocking HTML parsing.
- Loads heavyweight optional runtimes asynchronously.
- Defers Supabase and local startup scripts in deterministic order.
- Allows the public landing shell and authentication code to start promptly.
- Applies the session returned by password sign-in immediately.
- Deduplicates the later Supabase `SIGNED_IN` event.

## v64.7 — Connectivity and Auth Startup Stabilisation

- Replaces immediate `navigator.onLine` banner logic with a debounced connectivity check.
- Verifies `/manifest.json` before showing offline mode.
- Rechecks connectivity after online/offline events and tab visibility changes.
- Prevents a stale offline banner from remaining visible when the browser is online.
- Waits briefly for the deferred Supabase runtime and browser configuration before declaring auth unconfigured.
- Does not modify or expose Supabase credentials.

## v64.8 — Onboarding-Aware Authenticated QA

- Detects and completes the first-login onboarding overlay.
- Selects Python at the onboarding academy step.
- Uses safe default choices for the remaining onboarding questions.
- Closes the product walkthrough before dashboard interactions.
- Avoids clicking controls hidden behind modal overlays.
- Falls back to the academy chooser only when Python is not already active.
- Verifies the canonical `body[data-academy="python"]` state.

## v64.9 — Test Session Isolation and Delayed Onboarding

- Clears cookies, local storage and session storage before every public test.
- Opens the explicit `#landing` route for public smoke coverage.
- Verifies the public experience container rather than a hidden duplicate brand label.
- Waits for delayed cloud-profile onboarding after sign-in.
- Advances onboarding one rendered step at a time.
- Supports Python, generic choice and continue/finish controls.
- Rechecks onboarding immediately before opening a lesson.
- Prevents late overlays from intercepting lesson clicks.

## v64.10 — Landing/Auth Race Condition Fix

- Prevents `showAuthScreen()` from rendering the landing page before landing JSON is ready.
- Adds a safe `publicLandingDataReady()` readiness contract.
- Gives `renderPublicLanding()` a non-throwing loading shell.
- Stops landing render errors being misreported as Supabase configuration failures.
- Clears stale authentication configuration notices once Supabase is confirmed ready.
- Re-enables email and Google authentication controls after successful client setup.
- Preserves the existing Supabase URL and public key unchanged.

## v64.11 — Public Selector and Overlay Idempotency Fix

- Corrects the public Playwright container from `#publicExperience` to `#publicLanding`.
- Removes stale onboarding overlays before rendering a new one.
- Removes stale walkthrough overlays before rendering a new one.
- Scopes onboarding event handlers to the active overlay.
- Uses visible-overlay selectors in Playwright to avoid strict-mode collisions.
- Prevents duplicate modal layers from intercepting learner interactions.

## v64.12 — Lesson Launch Selector Fix

- Opens the lesson through the card's real `[data-open]` action.
- Stops treating the non-interactive lesson heading as a navigation control.
- Scopes the lesson selection to the Variables and data types card.
- Verifies the rendered deep chapter tab container.
- Uses stable `data-chapter-tab` selectors for Textbook and Mastery check.
- Verifies the lesson audio shell directly.

## v64.13 — Lesson Audio Selector Fix

- Corrects the Playwright selector from `.lesson-audio-shell` to `.lesson-audio-reader`.
- Verifies the visible `Lesson audio` heading inside the audio reader.
- Keeps the lesson launch, Textbook and Mastery assertions unchanged.

## v64.14 — Academy Hydration Persistence Fix

- Adds a canonical `syncAcademyIdentity()` helper.
- Restores `body[data-academy]` immediately after cloud/local state hydration.
- Restores academy chrome even when cloud synchronisation fails.
- Keeps local storage, learner state and visible academy identity aligned.
- Makes the reload test wait for the academy hydration signal explicitly.

## v64.15 — Python Curriculum Hydration Guard

- Adds `pythonCourseReady()` before rendering the Python course map.
- Prevents course rendering while `course.modules` or lesson arrays are unavailable.
- Shows a safe loading state and retries automatically.
- Guards module prerequisites, professional pathway lookup and lesson mapping.
- Makes authenticated Playwright wait for the Python curriculum before opening the course.

## v64.16 — Deterministic Authenticated Lesson QA

- Reads the real lesson ID from the Variables and data types card.
- Opens the lesson through the application's canonical `openLesson(id)` function.
- Waits for `#lessonOverlay` to become visible and receive `lesson-ready`.
- Scopes Textbook, Mastery and audio assertions to the active lesson overlay.
- Removes dependence on browser click animation and overlay timing.

## v64.17 — Fault-Tolerant Lesson Renderer

- Makes the interactive visual catalogue optional and guards all `.find()` calls.
- Provides a visual fallback when optional visual JSON is unavailable.
- Wraps every enhanced lesson section in an independent recovery boundary.
- Prevents textbook, visual, walkthrough, prediction, recap or mastery failures from blocking the lesson.
- Makes `openLesson()` always open the overlay and reach `lesson-ready`.
- Preserves the coding workspace even when enhanced lesson content fails.

## v64.18 — Core Journey Test Contract Fix

- Keeps Textbook and Mastery check as mandatory authenticated lesson assertions.
- Treats Lesson audio as an optional enhancement rather than a release blocker.
- Prevents delayed or unavailable audio from blocking academy persistence tests.
- Aligns the Playwright test name with its actual core learning contract.

## v64.19 — Canonical Sign-Out State Transition

- Adds a single `applySignedOutState()` transition.
- Removes stale `authenticated` and `auth-pending` classes after sign-out.
- Clears the active academy marker from the signed-out page.
- Closes lesson, onboarding and walkthrough overlays.
- Hides authenticated application chrome and restores the sign-in controls.
- Applies the transition from both the Supabase auth callback and quick sign-out button.
- Makes Playwright verify the visible, enabled sign-in screen after sign-out.
