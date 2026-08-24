# OrthoNova — Pediatric Speech & Language Assessment Web App

## ROLE

You are a senior full-stack engineer, product designer, UX designer, and pediatric clinical-assessment application designer.

You are building a production-quality prototype web application for an orthophoniste (speech-language therapist) who evaluates young children.

The application is called **OrthoNova**.

The application is bilingual:

- French
- Arabic

The primary target is children aged approximately 4–5 years.

This is a **clinical assessment tool**, not a generic educational game and not a generic hospital dashboard.

The child interacts with the assessment activities.

The orthophoniste controls the assessment, observes the child, records results, and receives a detailed automatically generated report.

---

# 1. SOURCE OF TRUTH

A dissertation/specification document has been provided with this project.

Treat that document as the authoritative source for the OrthoNova assessment structure, scoring rules, items, thresholds, recommendations, and clinical workflow.

DO NOT invent alternative scoring rules.

DO NOT simplify or modify the scoring formulas.

DO NOT replace the assessment structure with generic speech-therapy content.

If the specification does not define something, implement the UI/architecture in a sensible way but clearly isolate that behavior so it can later be changed by the clinician.

The first implemented assessment is:

**OrthoNova — Dépistage précoce de la dyslexie — Version préparatoire 4–5 ans**

The assessment specification states:

- Target age: 4–5 years
- Expected duration: 25–30 minutes
- 3 cognitive indicators
- 8 sub-dimensions
- 17 items
- Maximum final score: 20

The three indicators are:

1. VP — Perception Visuelle
2. RAN — Rapid Automatized Naming / Naming Rapide
3. PA — Awareness Phonological / Conscience Phonologique

Their weighting is:

- VP = 25%
- RAN = 35%
- PA = 40%

The assessment order is:

1. VP — Perception Visuelle
2. 2-minute break
3. RAN — Naming Rapide
4. 2-minute break
5. PA — Conscience Phonologique

The dissertation explicitly describes VP as the warm-up/easier section and PA as the most difficult and tiring section.

---

# 2. VERY IMPORTANT PRODUCT PRINCIPLE

There are TWO completely different experiences.

## A. ORTHOPHONIST MODE

This is the professional interface.

It should feel:

- modern
- calm
- clinical
- extremely clear
- efficient
- trustworthy
- desktop/tablet friendly

The orthophoniste should be able to:

- create/select a child
- start an assessment
- see assessment progress
- read administration instructions
- control the test
- observe the child's responses
- record answers
- record timing
- record errors
- record pauses/stops
- record clinical observations
- pause the assessment
- resume the assessment
- take breaks
- review scores
- review item-level results
- generate the final report
- export the report as PDF

The clinician should NEVER have to fight the interface during an assessment.

---

# 3. CHILD MODE

This is the most important UX part of the application.

The child must NOT see a conventional medical form.

The child interface should feel like a calm, polished educational game.

Design principles:

- very large interaction targets
- large illustrations
- very little text
- simple instructions
- one task at a time
- clear visual hierarchy
- generous spacing
- friendly animations
- soft rounded shapes
- encouraging feedback
- no intimidating medical terminology
- no visible clinical scores
- no visible "failure"
- no red error indicators
- no dense navigation
- no unnecessary menus

The child should be able to interact primarily by:

- tapping
- choosing pictures/shapes/colors
- dragging when appropriate
- visually remembering sequences
- verbally answering when required

The child should NOT need to understand complicated navigation.

The application should make the child feel like:

> "I'm playing a little game."

rather than:

> "I'm taking a medical test."

This principle is especially important for the 4–5 year target age.

---

# 4. DEVICE / RESPONSIVE DESIGN

The primary assessment device should be a:

**tablet**

However, the application must also work on:

- desktop
- laptop
- large tablet
- mobile where practical

The child-facing interface should prioritize tablet landscape mode.

The clinician dashboard should work particularly well on desktop and tablet.

Do not design a desktop website and simply shrink it down.

Design the child experience specifically for touch.

Minimum touch target:

44px, preferably substantially larger for child interactions.

---

# 5. VISUAL DESIGN

Create a polished modern visual system.

The visual identity should communicate:

- child-friendly
- trustworthy
- clinical
- intelligent
- modern
- warm

Avoid:

- childish cartoon overload
- excessive gradients
- neon colors
- cheap-looking gamification
- generic hospital-blue dashboards
- excessive shadows
- clutter

Use:

- soft neutral backgrounds
- one coherent primary brand color
- a small supporting color palette
- rounded cards
- clear typography
- subtle animations
- high-quality illustrations
- generous whitespace

The child experience can use more color than the clinician interface.

The clinician interface should remain restrained.

---

# 6. BILINGUAL / INTERNATIONALIZATION

The application must support:

- French
- Arabic

Arabic must be treated as a real RTL interface, not simply translated French.

When Arabic is selected:

- entire layout should switch to RTL
- text alignment changes appropriately
- navigation direction changes
- icons/arrows that imply direction must flip where appropriate
- progress indicators should respect RTL
- cards and forms should remain visually balanced
- child activities must remain intuitive

When French is selected:

- use LTR

Create a proper internationalization architecture from the beginning.

Do NOT hardcode UI strings throughout components.

Use translation keys.

Example conceptual structure:

/messages
  fr.json
  ar.json

All UI text should come from translations.

Assessment content should also be localizable.

---

# 7. FONT SUPPORT

Use fonts that provide excellent Arabic and Latin support.

The typography must remain visually consistent between French and Arabic.

Test:

- Arabic characters
- French accents
- numbers
- mixed Arabic/French content

Do not use a font that looks good in French but has poor Arabic rendering.

---

# 8. TECHNOLOGY STACK

Use:

- Next.js 16.x
- App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui where appropriate
- Lucide icons
- Zod for validation
- React Hook Form where forms are needed

Use the current stable versions compatible with Next.js 16.

Use Server Components by default.

Use Client Components only where interactivity requires them.

Use proper TypeScript types throughout the application.

Avoid `any`.

Do not create unnecessary abstractions.

---

# 9. APPLICATION ARCHITECTURE

Structure the application cleanly.

Suggested conceptual structure:

app/
  (auth)/
  (clinician)/
    dashboard/
    patients/
    assessments/
    reports/
  (assessment)/
    assessment/
      [sessionId]/
  api/

components/
  ui/
  clinician/
  assessment/
  child/
  reports/

lib/
  assessment/
  scoring/
  i18n/
  validation/
  utils/

data/
  assessments/
  ornova/

types/

The exact structure may differ if you have a better architecture, but maintain a clean separation between:

- clinical dashboard
- assessment engine
- child UI
- scoring engine
- reporting
- localization

---

# 10. ASSESSMENT ENGINE

Do NOT implement each test as an isolated page with duplicated logic.

Create a reusable assessment engine.

Conceptually:

Assessment
 ├── indicators
 │    ├── subdimensions
 │    │    └── items
 │    │
 │    └── scoring rules
 │
 ├── instructions
 ├── break configuration
 └── report configuration

Each item should contain structured metadata such as:

- id
- indicator
- subdimension
- item number
- type
- instructions
- stimulus
- possible responses
- correct response
- scoring rule
- timing requirement
- error tracking
- pause tracking
- child-facing content
- clinician-facing instructions
- translations

This should allow additional assessments to be added later without rewriting the application.

---

# 11. ORTHONOVA ASSESSMENT STRUCTURE

Implement exactly these 17 items.

## INDICATOR 1 — VP / PERCEPTION VISUELLE

Maximum raw score: 20.

### Item 1 — Matching Shapes

Five reference shapes:

- blue square
- red circle
- green triangle
- yellow star
- purple heart

The child must identify matching shapes among distractors.

Scoring:

- 5 correct responses
- 1 point per correct response
- maximum 5

The interaction should be visual and touch-based.

Do NOT make the child read.

---

### Item 2 — Matching Colors

Five reference colors:

- light red
- cyan blue
- grass green
- lemon yellow
- dark orange

The child identifies matching colors among distractors.

Scoring:

- 1 point per correct response
- maximum 5

Use large colored visual elements.

---

### Item 3 — Remember Shape Sequences

Five sequences.

Each sequence contains three different shapes.

Show the sequence.

Then remove it.

The child reproduces/identifies the sequence.

Scoring:

- 1 point per correct sequence
- maximum 5

Use a short visual memory animation.

---

### Item 4 — Remember Color Sequences

Five sequences.

Each sequence contains three different colors.

Show the sequence.

Hide it.

The child reproduces the sequence.

Scoring:

- 1 point per correct sequence
- maximum 5

---

## VP TOTAL

Raw maximum:

20 / 20

---

# 12. INDICATOR 2 — RAN / RAPID NAMING

The clinician must be able to start a timer.

The child sees a sequence of 10 stimuli.

The clinician records:

- completion time
- number of errors
- number of pauses/stops

The application should make this extremely easy to operate.

Do not force the clinician to manually type numbers through a cumbersome form.

Use:

- large timer
- Start button
- Pause
- Stop
- + Error
- + Pause
- Reset where appropriate

The clinician can correct recorded values.

---

## Item 5 — Colors RAN

10 colored squares.

Colors:

- brown
- pink
- gray
- turquoise
- gold

Scoring:

- <10 seconds = 3 points
- 10–15 seconds = 2 points
- 15–20 seconds = 1 point
- >20 seconds = 0 points

Penalties:

- each error = -0.5
- each stop/pause = -0.5

---

## Item 6 — Shapes RAN

10 shapes:

- star
- heart
- arrow
- cross
- crescent

Scoring:

- <11 seconds = 3
- 11–16 seconds = 2
- 16–21 seconds = 1
- >21 seconds = 0

Penalties:

- each error = -0.5
- each stop/pause = -0.5

---

## Item 7 — Digits RAN

10 digits:

0, 2, 4, 6, 8, 1, 3, 5, 7, 9

Scoring:

- <9 seconds = 3
- 9–14 seconds = 2
- 14–19 seconds = 1
- >19 seconds = 0

Penalties:

- each error = -0.5
- each stop/pause = -0.5

---

## RAN TOTAL

Raw maximum:

9 points

Convert to /5 using:

RAN normalized score = RAN raw score ÷ 1.8

Preserve decimal precision internally.

Display appropriate rounding only where clinically appropriate.

---

# 13. INDICATOR 3 — PA / PHONOLOGICAL AWARENESS

Maximum raw score:

50 points

Normalized contribution:

10 points

---

## Subdimension 3.1 — Syllable Awareness

### Item 8 — Count Syllables

Words:

- شمس / شمس
- قمر / قمر
- سيارة
- تفاح
- حديقة

Expected syllable counts according to the source specification:

- شمس = 1
- قمر = 2
- سيارة = 3
- تفاح = 2
- حديقة = 3

5 questions.

1 point per correct answer.

---

### Item 9 — Delete a Syllable

Examples include:

- موز → ز
- ثلاجة → الجة
- جزر → زر
- ورقة → رقة
- حمار → مار

5 questions.

1 point per correct answer.

---

### Item 10 — Identify First Syllable

Words:

- كرسي
- طاولة
- قلم
- دفتر
- معلم

5 questions.

1 point per correct answer.

---

# 14. SUBDIMENSION 3.2 — INITIAL SOUND AWARENESS

### Item 11 — Identify First Sound

Words:

- أسد
- بطة
- تمر
- دجاج
- سمكة

5 questions.

1 point per correct answer.

---

### Item 12 — Find Words Beginning With Same Sound

Use the source-defined word set.

The scoring rule:

3 correctly identified words = 1 point.

Implement the scoring logic as a configurable scoring function rather than hardcoding it directly into the UI.

---

# 15. SUBDIMENSION 3.3 — FINAL SOUND AWARENESS

### Item 13 — Identify Final Sound

Words:

- باب
- قمر
- بيت
- يد
- سمك

5 questions.

1 point per correct answer.

---

### Item 14 — Find Words Ending With Same Sound

Use the source-defined word set.

Scoring:

3 correctly identified words = 1 point.

---

# 16. SUBDIMENSION 3.4 — BASIC PHONEME AWARENESS

### Item 15 — Count Sounds

Words:

- دب = 2
- قط = 2
- نار = 3
- تاج = 3
- لم = 2

5 questions.

1 point per correct answer.

---

### Item 16 — Delete a Sound

Examples:

- دب: remove /د/ → ب
- قط: remove /ق/ → ط
- نار: remove /ن/ → ار
- تاج: remove /ت/ → اج
- لم: remove /ل/ → م

5 questions.

1 point per correct answer.

---

### Item 17 — Substitute a Sound

Examples from the specification:

- دب: replace د with ق → قب
- قط: replace ق with ب → بط
- نار: replace ن with د → دار
- تاج: replace ت with ب → باج
- لم: replace ل with ن → نم

5 questions.

1 point per correct answer.

---

# 17. PA TOTAL

Maximum:

50 points

Normalize to /10:

PA normalized score = PA raw score ÷ 5

---

# 18. FINAL SCORE

Use EXACTLY:

Final score =
VP score +
(RAN score ÷ 1.8) +
(PA score ÷ 5)

Maximum:

20 points

Do not invent a different weighting system.

The dashboard should clearly show:

VP: X / 20

RAN: X / 9 → normalized X / 5

PA: X / 50 → normalized X / 10

Total: X / 20

---

# 19. OVERALL INTERPRETATION

Implement the following exact thresholds.

## 18–20 — Excellent / ممتاز جدًا

Interpretation:

- No indicators of dyslexia
- Child development appears normal
- Annual periodic follow-up recommended
- Regular education without special intervention

---

## 15–17 — Very Good / جيد جدًا

Interpretation:

- Very few indicators
- Follow-up every 6 months recommended
- Regular education with observation

---

## 12–14 — Good / جيد

Interpretation:

- Some mild indicators
- Follow-up every 3 months recommended
- Regular education with light additional support

---

## 9–11 — Moderate / متوسط

Interpretation:

- Moderate indicators of dyslexia
- Early intervention recommended
- Monthly follow-up recommended
- Specialized educational support

---

## 6–8 — Weak / ضعيف

Interpretation:

- Strong indicators of dyslexia
- Immediate intervention necessary
- Weekly follow-up recommended
- Intensive training programs
- Referral to an orthophoniste

---

## <6 — Very Weak / ضعيف جدًا

Interpretation:

- Very strong indicators
- Comprehensive assessment and immediate intervention necessary
- Immediate referral to an orthophoniste and clinical psychologist
- Intensive specialized training

IMPORTANT:

The application is a screening/assessment aid.

Do not display wording implying that the application itself establishes a definitive medical diagnosis.

Use terminology such as:

- "indicateurs"
- "résultats du dépistage"
- "niveau de risque"
- "recommandations"

rather than automatically saying:

> "L'enfant est dyslexique."

---

# 20. INDICATOR INTERPRETATION

## VP

18–20:

Excellent

14–17:

Good

10–13:

Moderate

<10:

Weak

Use the corresponding recommendations from the specification.

---

## RAN

8–9:

Excellent

6–7:

Good

4–5:

Moderate

<4:

Weak

---

## PA

45–50:

Excellent

35–44:

Good

25–34:

Moderate

<25:

Weak

---

# 21. ASSESSMENT FLOW

The assessment should feel like a guided journey.

### Before starting

Clinician sees:

- child information
- age
- assessment name
- estimated duration
- instructions
- environment checklist

The specification recommends:

- quiet environment
- good lighting
- prepared materials
- child comfortable
- positive relationship with child

Allow the clinician to confirm these before starting.

---

# 22. PRE-ASSESSMENT SCREEN

Create a simple clinician checklist:

- Environment quiet
- Lighting adequate
- Materials ready
- Child comfortable
- Child not tired/hungry
- Positive rapport established

Do not make this unnecessarily complicated.

---

# 23. TEST NAVIGATION

The clinician should see a persistent assessment header:

[OrthoNova]     VP • RAN • PA     Item 4 / 17     24%

But the child should NOT see this clinical information.

The clinician can see:

- current indicator
- current item
- progress
- timer where relevant
- notes
- controls

The child sees only the activity.

---

# 24. BREAKS

After VP:

show a dedicated 2-minute break screen.

After RAN:

show another 2-minute break.

The break screen should be child-friendly.

Example:

"Petite pause !"

"Bravo !"

with a calm visual animation.

The clinician can:

- start break
- skip break if necessary
- extend break

The system should record whether the recommended break was taken.

---

# 25. CLINICAL OBSERVATIONS

At every relevant stage, the clinician can record observations.

Examples from the specification:

### Difficulty understanding instructions

Action:

- clearer explanation
- additional examples

### Difficulty concentrating

Action:

- break
- quieter environment

### Psychological distress

Examples:

- child raises voice
- cries

Action:

- stop test
- attempt later

### Severe difficulty

Child cannot answer questions.

Action:

- immediate referral / clinical consideration

### Test contamination

Child memorizes answers.

Action:

- use different words/items where clinically appropriate

Do not make these observations part of the child's interface.

---

# 26. CLINICIAN NOTES

Provide a fast note system.

The clinician should be able to write:

- general notes
- item notes
- behavioral observations
- clinical observations

Do not force long forms.

Use quick tags plus optional free text.

Example:

[Distracted]

[Needs repetition]

[Good understanding]

[Fatigue]

[Anxious]

[Very engaged]

[Difficulty following instructions]

plus:

"Ajouter une note..."

---

# 27. SCORING UX

Scores should update automatically.

The clinician should never have to manually calculate:

- VP
- RAN
- PA
- normalized scores
- final score
- interpretation

The scoring engine should calculate them.

However:

The clinician should always be able to inspect how the score was obtained.

For example:

RAN

Base: 3

Errors: 2 × -0.5

Stops: 1 × -0.5

Final: 1.5 / 9

This makes the system auditable.

---

# 28. RESULTS DASHBOARD

After completing the assessment, show a clinician results dashboard.

Top section:

Child name

Age

Assessment date

Duration

Evaluator

Overall score

Interpretation

Then:

### Visual score overview

Three large cards:

VP
X / 20

RAN
X / 9

PA
X / 50

And normalized:

Total
X / 20

Use an appropriate visual representation such as:

- progress bars
- radial indicators
- simple charts

Do not make the dashboard look like a gaming score screen.

---

# 29. SCORE PROFILE

Create a visual profile showing:

- VP
- RAN
- PA

This allows the orthophoniste to immediately see which area is weakest.

Example:

Visual Perception     ████████████
Rapid Naming          ███████
Phonological Awareness █████

Use accessible visual design.

Do not rely on color alone to communicate severity.

---

# 30. REPORT GENERATION

Generate a professional PDF report.

The report should follow the structure from the source specification.

Title:

**Rapport d'évaluation OrthoNova**

Include:

## Child information

- Name
- Date of birth
- Age
- School
- Class

## Assessment information

- Assessment date
- Evaluator
- Duration

## Results

Table:

| Indicator | Score | Maximum | Percentage | Interpretation |
|---|---:|---:|---:|---|
| VP | | 20 | | |
| RAN | | 9 | | |
| PA | | 50 | | |
| Total | | 20 | | |

## Clinical observations

Display clinician-entered observations.

## Recommendations

Automatically generate recommendations according to the exact thresholds.

## Suggested referrals

Allow:

- No referral
- Periodic follow-up
- Training program
- Orthophoniste
- Clinical psychologist

The PDF must support both French and Arabic correctly, including RTL Arabic text.

---

# 31. REPORT DESIGN

The report should look professional enough to give to parents.

Do not make it look like an internal software debug report.

Use:

- clear hierarchy
- logo/branding
- clean tables
- visual score summary
- readable typography
- concise explanations
- professional footer

The parent-facing report should avoid unnecessarily technical implementation details.

---

# 32. CLINICIAN DASHBOARD

Create a dashboard with:

- Patients
- Recent assessments
- Assessments in progress
- Completed assessments
- Reports

Example:

Dashboard

Bonjour, Dr/Orthophoniste

[ Nouveau test ]

Recent assessments:

Child | Age | Assessment | Score | Status | Date

The UI should be extremely clean.

---

# 33. PATIENT MANAGEMENT

Create a patient profile containing:

- first name
- last name
- date of birth
- calculated age
- school
- class
- parent/guardian information if needed
- notes

Show previous assessments.

Patient profile:

Child
├── Overview
├── Assessments
├── Reports
└── Notes

---

# 34. ASSESSMENT HISTORY

Allow the clinician to see previous assessments.

Show:

- date
- total score
- VP
- RAN
- PA
- interpretation

Eventually support longitudinal graphs.

For the prototype, implement the data model so longitudinal comparison can be added without restructuring the application.

---

# 35. CHILD MODE SECURITY / UX

The child should not accidentally exit the assessment.

Provide a protected exit mechanism.

For example:

A small clinician-only control requiring:

- long press
- PIN
- or confirmation

Do not expose:

- dashboard
- patient information
- clinical scores
- report
- settings

to the child.

---

# 36. ACCESSIBILITY

The application must support:

- keyboard navigation for clinician mode
- visible focus states
- semantic HTML
- screen reader labels
- sufficient contrast
- reduced motion preference
- large touch targets
- no color-only meaning

For child mode:

prioritize visual and touch accessibility.

---

# 37. ANIMATIONS

Use subtle animation.

Good examples:

- card entrance
- sequence appearance
- selection feedback
- gentle success animation
- progress transitions
- break animation

Avoid:

- distracting particle explosions
- excessive confetti
- loud visual effects
- constant movement

The child should remain focused.

---

# 38. AUDIO

Design the architecture so audio can be added.

Potentially support:

- spoken instructions
- pronunciation of words
- encouraging sounds

But do not automatically add AI voice generation or speech recognition unless explicitly requested.

For the prototype, the architecture should support audio assets.

---

# 39. TEST CONTENT

All assessment content must be data-driven.

Do not scatter words such as:

"شمس"

or:

"كرسي"

throughout React components.

Put them in structured assessment data.

Example conceptual model:

{
  id: "item-08",
  type: "syllable-count",
  indicator: "PA",
  subdimension: "3.1",
  stimuli: [...]
}

This is critical because the assessment will eventually have:

- additional age groups
- additional languages
- additional assessments
- revised items

---

# 40. DATABASE

For the initial prototype, keep persistence architecture simple but realistic.

Use:

PostgreSQL

Use:

Prisma ORM

Model at least:

User / Clinician

Patient

Assessment

AssessmentSession

AssessmentItemResult

ClinicalObservation

Report

AssessmentDefinition

AssessmentItem

The schema should support multiple assessments and multiple languages.

---

# 41. AUTHENTICATION

Implement the architecture so authentication can be added cleanly.

For the prototype, do not over-engineer authentication if it prevents building the core assessment.

However, protect clinician routes from child-facing routes.

Do not expose patient data in URLs unnecessarily.

---

# 42. DATA INTEGRITY

This is a clinical application.

Important rules:

- Never silently lose an answer.
- Autosave assessment progress.
- Persist item results.
- Persist timestamps.
- Allow recovery after browser refresh.
- Warn before abandoning an unfinished assessment.
- Never overwrite completed assessments accidentally.
- Keep the scoring engine deterministic.
- Keep raw responses separate from calculated scores.

Raw data should be retained so scoring rules can be recalculated later.

---

# 43. OFFLINE / NETWORK RESILIENCE

Design the assessment experience so a temporary network interruption does not destroy the session.

At minimum:

- local session state
- autosave
- retry failed persistence
- clear synchronization state

The child should not suddenly be kicked out of the activity because a request failed.

---

# 44. ERROR HANDLING

Errors must never expose technical information to the child.

Child:

"Une petite erreur est survenue. On continue."

Clinician:

show meaningful diagnostic information.

---

# 45. DEVELOPMENT DATA

Seed the application with a demo patient.

Example:

Prénom:
Lina

Nom:
Benali

Age:
5 ans

Create a complete demo assessment that can be run from beginning to end.

This allows the application to be demonstrated without entering data manually.

Clearly mark demo data as DEMO.

---

# 46. IMPORTANT UX DISTINCTION

The child interface should NOT look like:

- a form
- a questionnaire
- an EMR
- a spreadsheet
- a dashboard

The clinician interface SHOULD look like:

- a modern clinical workspace
- structured
- efficient
- professional

This distinction is one of the highest priorities of the project.

---

# 47. DESIGN REFERENCES

Use the following product principles as inspiration:

- pediatric speech assessment applications
- play-based speech therapy applications
- digital clinical assessment tools
- modern tablet-first educational interfaces

Existing products demonstrate useful patterns such as:

- one activity at a time
- large child-friendly interaction targets
- structured clinical data collection
- automated scoring
- clinician-controlled sessions
- generated reports

Do NOT copy any proprietary interface, branding, content, or assets.

Use these only as UX inspiration.

---

# 48. FIRST DEVELOPMENT PHASE

Do NOT attempt to build every possible feature immediately.

Build the complete end-to-end prototype for ONE assessment:

OrthoNova 4–5 years.

The first milestone must include:

1. Landing/login screen
2. Clinician dashboard
3. Patient creation
4. Patient profile
5. Start assessment
6. Pre-assessment checklist
7. VP items 1–4
8. 2-minute break
9. RAN items 5–7
10. 2-minute break
11. PA items 8–17
12. Automatic scoring
13. Results dashboard
14. Clinical observations
15. Recommendations
16. PDF report
17. French/Arabic switching
18. RTL support
19. Demo patient
20. Autosave

---

# 49. DEVELOPMENT PROCESS

Before writing a large amount of code:

1. Analyze the requirements.
2. Create the architecture.
3. Create the data model.
4. Create the assessment definition.
5. Create the design system.
6. Build the clinician shell.
7. Build the child assessment shell.
8. Build one complete item.
9. Validate the interaction.
10. Then implement the remaining items.

Do not generate hundreds of files unnecessarily.

Prefer a small number of well-designed reusable components.

---

# 50. COMPONENT DESIGN

Create reusable components such as:

Clinician:

- AppShell
- Sidebar
- TopBar
- PatientCard
- AssessmentProgress
- ClinicalNote
- Timer
- ScoreCard
- ScoreProfile
- RecommendationCard

Child:

- ChildShell
- ChildProgress
- InstructionCard
- ShapeChoice
- ColorChoice
- SequenceMemory
- StimulusGrid
- Encouragement
- BreakScreen
- CompletionScreen

Assessment:

- AssessmentRunner
- ItemRenderer
- ItemNavigation
- ResponseRecorder
- ScoringSummary

---

# 51. CHILD SCREEN EXAMPLE

A typical child screen should conceptually look like:

-----------------------------------------

             ⭐

       Regarde bien !

        🔵  🟩  🔺

        🔵  ⭐  🟩

             ↓

      "Trouve le même."

        [large choices]

-----------------------------------------

The exact visual design should be better than this crude example.

The important principle is:

ONE TASK.

ONE CLEAR ACTION.

MINIMAL TEXT.

---

# 52. CLINICIAN SCREEN EXAMPLE

While the child sees the activity, the clinician may see:

--------------------------------------------

VP — Perception visuelle

Item 3 / 17

Tâche:
Témorisation de séquences

Instructions:
[clinician instructions]

--------------------------------------------

Child screen preview / activity

--------------------------------------------

Score

○ Correct
○ Incorrect

Notes

[ + Observation ]

                 [Valider →]

--------------------------------------------

The clinician controls progression.

The child does not.

---

# 53. SCORING ENGINE

Create a dedicated scoring module.

Example conceptual API:

calculateItemScore(item, response)

calculateIndicatorScore(indicator, results)

normalizeIndicatorScore(indicator, rawScore)

calculateTotalScore(results)

getInterpretation(totalScore)

getRecommendations(totalScore)

The UI must not contain scoring mathematics.

All scoring rules belong in the scoring layer.

Write unit tests for EVERY scoring threshold.

Especially test:

- exact threshold values
- values immediately below threshold
- values immediately above threshold
- penalties
- normalized scores
- maximum scores
- minimum scores

---

# 54. TESTING

Implement:

- unit tests for scoring
- component tests for key child interactions
- tests for language switching
- tests for RTL
- tests for assessment progression
- tests for break handling
- tests for autosave
- tests for PDF generation

The most important tests are the scoring tests.

---

# 55. DEMO / PRESENTATION QUALITY

This is a prototype intended to be shown to an orthophoniste.

Therefore:

The first screen should immediately communicate that this is a polished professional product.

Use realistic demo content.

Avoid:

- "Lorem ipsum"
- empty dashboards
- placeholder rectangles everywhere
- generic shadcn demo appearance
- default Next.js styling

The prototype should look like an actual product.

---

# 56. DO NOT DO THESE THINGS

Do NOT:

- build a generic admin dashboard and call it an assessment app
- make the child fill forms
- expose clinical scores to the child
- put all 17 questions on one page
- use tiny buttons
- use dense tables for child activities
- hardcode scoring inside UI components
- hardcode French strings
- ignore RTL
- invent clinical thresholds
- invent medical diagnoses
- silently alter the dissertation's scoring system
- use fake AI-generated clinical conclusions
- add speech recognition without being asked
- add AI diagnosis
- make the app dependent on internet connectivity for every interaction
- sacrifice usability for technical abstraction

---

# 57. QUALITY BAR

Before considering the implementation complete, verify:

### Child UX

- Can a 4–5 year old understand what to do visually?
- Are controls large enough?
- Is there only one obvious action?
- Is the interface calm?
- Is text minimized?
- Does it feel like play?

### Clinician UX

- Can an orthophoniste administer the entire assessment without confusion?
- Can they record answers quickly?
- Can they record timing/errors/pauses quickly?
- Can they pause and resume?
- Can they add observations?
- Can they see progress?
- Can they understand how scores were calculated?

### Clinical logic

- Are all 17 items implemented?
- Are scoring rules exact?
- Are thresholds exact?
- Are normalization formulas exact?
- Are recommendations exact?
- Are raw results retained?

### Bilingual UX

- French works
- Arabic works
- RTL works
- mixed Arabic/French content works
- PDF Arabic works

### Technical

- TypeScript strict
- no unnecessary `any`
- reusable components
- scoring isolated from UI
- responsive
- accessible
- autosave
- robust error handling
- tests for scoring

---

# 58. IMPORTANT FINAL INSTRUCTION

Do not rush into implementation.

First inspect the repository and determine what already exists.

If the repository is empty, scaffold the project.

Then produce:

1. proposed architecture
2. database schema
3. assessment data model
4. route structure
5. component structure
6. design system
7. implementation plan

After that, begin implementing the prototype.

Do not ask unnecessary questions.

Where the specification is explicit, follow it exactly.

Where the specification is silent, make a sensible engineering/UX decision and keep the implementation configurable.

The ultimate goal is:

**A polished bilingual French/Arabic pediatric assessment application where the orthophoniste controls a professional assessment session while the child experiences a simple, beautiful, game-like series of activities.**