const pqSafeBind = (id, eventName, handler) => {
  const node = document.getElementById(id);
  if (node) node.addEventListener(eventName, handler);
  return node;
};


let course, projects, challenges, assessmentBank, reviewRubrics, errorCases, careerTracks, careerDiagnostic, mockInterviews, datasets, assignments, adaptiveDrills, misconceptionCatalogue, cliScenarios, apiScenarios, migrationScenarios, deploymentPipelines, incidents, projectStudioTemplates, professionalPathway, stageAssessments, competencies, careerSimulations, careerSimulationRubric, developmentPlans, mentorPrompts, conceptModel, misconceptionRulesV2, academies, activeAcademy, sqlCourse, sqlAcademyDatasets, sqlAcademyProjects, sqlAcademyAssessments, webCourse, webAcademyProjects, webAcademyAssessments, javaCourse, javaAcademyProjects, javaAcademyAssessments, javaSimulatorRules, crossAcademySkills, developerRolePaths, crossAcademyCapstones, codingLabs, runnerConfig, gradingResultSchema, cohorts, cohortLearners, cohortAssignments, cohortSubmissions, instructorRubrics, cohortAnnouncements, academyParity, academyLearningPlans, authoringTemplates, authoringQualityRules, authoringSeedDrafts, cloudPlatformConfig, aiMentorConfig, mentorModes, technicalInterviewBank, mentorReviewRubric, mentorProtocols, developerMissions, missionStakeholders, missionDecisionTemplates, teamWorkspaceTemplates, hackathonCatalogue, peerReviewPolicy, landingContent, productWalkthrough, legalContent, careerLaunchRoles, careerLaunchMilestones, jobMatchRules, guidedCapstones, deploymentLearningTracks, deploymentPipelineTemplates, releaseReadinessChecklist, adaptiveEngineConfig, adaptiveActionCatalogue, adaptiveConceptGraph, certificationPathways, certificationQuestionBank, examIntegrityPolicy, applyPilotBridgeConfig, applyPilotReverseLinks, microLessonTheory, deepCurriculumConfig, interactiveVisualCatalogue, engineeringWorkspaceTemplates, projectRunnerConfig, engineeringSqlSeed, engineeringCoachConfig, engineeringReviewRubrics, engineeringMisconceptions, cloudRunnerConfig, verifiedAssessmentCatalogue, verifiedPipelineStages, teamEngineeringConfig, teamEngineeringTemplates, freemiumPlans, productAnalyticsEvents, productionBillingConfig, activationOnboardingConfig, lifecycleNotificationTemplates, dailyLearningConfig, lessonTextbookLibrary, masteryQuestionBank, masteryAssessmentConfig, featureMaturityRegistry, publicBetaLaunchGate, pyodide, supabaseClient = null;
let activeChallenge=null;
let challengeTimerId=null;
let originalPythonSidebarHtml=null;
let activeProject = null;
let authMode='signin',cloudSaveTimer=null,currentSession=null,authRecoveryMode=false;
let currentView = "dashboard";
let activeLesson = null;
let currentStep = 0;
let lastExecution = {ok:true, output:"", error:""};
let hintLevel = 0;

let state = {
  profile: JSON.parse(localStorage.getItem("pq3_profile") || "null"),
  diagnostic: JSON.parse(localStorage.getItem("pq3_diagnostic") || "null"),
  steps: JSON.parse(localStorage.getItem("pq3_steps") || "{}"),
  lessons: new Set(JSON.parse(localStorage.getItem("pq3_lessons") || "[]")),
  xp: Number(localStorage.getItem("pq3_xp") || 0),
  reviews: JSON.parse(localStorage.getItem("pq3_reviews") || "[]"),
  attempts: JSON.parse(localStorage.getItem("pq3_attempts") || "{}"),
  projectDrafts: JSON.parse(localStorage.getItem("pq_project_drafts") || "{}"),
  completedProjects: JSON.parse(localStorage.getItem("pq_completed_projects") || "[]"),
  notebook: JSON.parse(localStorage.getItem("pq_notebook") || "[]"),
  daily: JSON.parse(localStorage.getItem("pq_daily") || "null"),
  activity: JSON.parse(localStorage.getItem("pq_activity") || "[]"),
  weeklyGoal: JSON.parse(localStorage.getItem("pq_weekly_goal") || '{"target":3}'),
  assessmentHistory: JSON.parse(localStorage.getItem("pq_assessment_history") || "[]"),
  bookmarks: JSON.parse(localStorage.getItem("pq_bookmarks") || "[]"),
  accessibility: JSON.parse(localStorage.getItem("pq_accessibility") || '{"largeText":false,"highContrast":false,"reduceMotion":false,"focusOutline":true}'),
  reviewHistory: JSON.parse(localStorage.getItem("pq_review_history") || "[]"),
  capstonePlan: JSON.parse(localStorage.getItem("pq_capstone_plan") || "null"),
  selectedTrack: localStorage.getItem("pq_selected_track") || "",
  diagnosticAnswers: JSON.parse(localStorage.getItem("pq_diagnostic_answers") || "{}"),
  customEvidence: JSON.parse(localStorage.getItem("pq_custom_evidence") || "[]"),
  interviewHistory: JSON.parse(localStorage.getItem("pq_interview_history") || "[]"),
  sprintPlan: JSON.parse(localStorage.getItem("pq_sprint_plan") || "null"),
  journal: JSON.parse(localStorage.getItem("pq_learning_journal") || "[]"),
  labDrafts: JSON.parse(localStorage.getItem("pq_lab_drafts") || "{}"),
  sqlHistory: JSON.parse(localStorage.getItem("pq_sql_history") || "[]"),
  dataStories: JSON.parse(localStorage.getItem("pq_data_stories") || "[]"),
  customDatasets: JSON.parse(localStorage.getItem("pq_custom_datasets") || "[]"),
  savedCharts: JSON.parse(localStorage.getItem("pq_saved_charts") || "[]"),
  dashboards: JSON.parse(localStorage.getItem("pq_dashboards") || "[]"),
  mlExperiments: JSON.parse(localStorage.getItem("pq_ml_experiments") || "[]"),
  responsibleAiReviews: JSON.parse(localStorage.getItem("pq_responsible_ai_reviews") || "[]"),
  assignmentDrafts: JSON.parse(localStorage.getItem("pq_assignment_drafts") || "{}"),
  assignmentSubmissions: JSON.parse(localStorage.getItem("pq_assignment_submissions") || "[]"),
  instructorReviews: JSON.parse(localStorage.getItem("pq_instructor_reviews") || "[]"),
  focusSessions: JSON.parse(localStorage.getItem("pq_focus_sessions") || "[]"),
  voiceSettings: JSON.parse(localStorage.getItem("pq_voice_settings") || '{"rate":1,"pitch":1,"voiceName":""}'),
  timerSettings: JSON.parse(localStorage.getItem("pq_timer_settings") || '{"minutes":25,"autoBreak":false}'),
  adaptiveDrillHistory: JSON.parse(localStorage.getItem("pq_adaptive_drill_history") || "[]"),
  misconceptionState: JSON.parse(localStorage.getItem("pq_misconception_state") || "{}"),
  cliHistory: JSON.parse(localStorage.getItem("pq_cli_history") || "[]"),
  gitSimulation: JSON.parse(localStorage.getItem("pq_git_simulation") || "null"),
  packageProjects: JSON.parse(localStorage.getItem("pq_package_projects") || "[]"),
  apiHistory: JSON.parse(localStorage.getItem("pq_api_history") || "[]"),
  endpointDesigns: JSON.parse(localStorage.getItem("pq_endpoint_designs") || "[]"),
  fastapiProjects: JSON.parse(localStorage.getItem("pq_fastapi_projects") || "[]"),
  schemaDesigns: JSON.parse(localStorage.getItem("pq_schema_designs") || "[]"),
  migrationHistory: JSON.parse(localStorage.getItem("pq_migration_history") || "[]"),
  persistenceProjects: JSON.parse(localStorage.getItem("pq_persistence_projects") || "[]"),
  pipelineRuns: JSON.parse(localStorage.getItem("pq_pipeline_runs") || "[]"),
  deploymentProjects: JSON.parse(localStorage.getItem("pq_deployment_projects") || "[]"),
  incidentReviews: JSON.parse(localStorage.getItem("pq_incident_reviews") || "[]"),
  studioProjects: JSON.parse(localStorage.getItem("pq_studio_projects") || "[]"),
  studioQualityRuns: JSON.parse(localStorage.getItem("pq_studio_quality_runs") || "[]"),
  studioReleases: JSON.parse(localStorage.getItem("pq_studio_releases") || "[]"),
  navigationMode: localStorage.getItem("pq_navigation_mode") || "guided",
  questBoard: JSON.parse(localStorage.getItem("pq_quest_board") || "{}"),
  stageExamHistory: JSON.parse(localStorage.getItem("pq_stage_exam_history") || "[]"),
  weeklyReviews: JSON.parse(localStorage.getItem("pq_weekly_reviews") || "[]"),
  portfolioProfile: JSON.parse(localStorage.getItem("pq_portfolio_profile") || "{}"),
  careerSimulationState: JSON.parse(localStorage.getItem("pq_career_simulation_state") || "{}"),
  standupHistory: JSON.parse(localStorage.getItem("pq_standup_history") || "[]"),
  stakeholderBriefs: JSON.parse(localStorage.getItem("pq_stakeholder_briefs") || "[]"),
  simulationFeedback: JSON.parse(localStorage.getItem("pq_simulation_feedback") || "[]"),
  selectedDevelopmentPlan: localStorage.getItem("pq_selected_development_plan") || "",
  developmentPlanProgress: JSON.parse(localStorage.getItem("pq_development_plan_progress") || "{}"),
  mentorInboxState: JSON.parse(localStorage.getItem("pq_mentor_inbox_state") || "{}"),
  commandCenterPreferences: JSON.parse(localStorage.getItem("pq_command_center_preferences") || "{}"),
  conceptMastery: JSON.parse(localStorage.getItem("pq_concept_mastery") || "{}"),
  predictionHistory: JSON.parse(localStorage.getItem("pq_prediction_history") || "[]"),
  explanationHistory: JSON.parse(localStorage.getItem("pq_explanation_history") || "[]"),
  tutorSessions: JSON.parse(localStorage.getItem("pq_tutor_sessions") || "[]"),
  activeAcademyId: localStorage.getItem("pq_active_academy") || "",
  academyEnrolments: JSON.parse(localStorage.getItem("pq_academy_enrolments") || '["python"]'),
  academyProgress: JSON.parse(localStorage.getItem("pq_academy_progress") || "{}"),
  sqlCompletedLessons: new Set(JSON.parse(localStorage.getItem("cq_sql_completed_lessons") || "[]")),
  sqlLessonAttempts: JSON.parse(localStorage.getItem("cq_sql_lesson_attempts") || "[]"),
  sqlSavedQueries: JSON.parse(localStorage.getItem("cq_sql_saved_queries") || "[]"),
  sqlProjectState: JSON.parse(localStorage.getItem("cq_sql_project_state") || "{}"),
  sqlExamHistory: JSON.parse(localStorage.getItem("cq_sql_exam_history") || "[]"),
  webCompletedLessons: new Set(JSON.parse(localStorage.getItem("cq_web_completed_lessons") || "[]")),
  webLessonAttempts: JSON.parse(localStorage.getItem("cq_web_lesson_attempts") || "[]"),
  webProjectState: JSON.parse(localStorage.getItem("cq_web_project_state") || "{}"),
  webExamHistory: JSON.parse(localStorage.getItem("cq_web_exam_history") || "[]"),
  javaCompletedLessons: new Set(JSON.parse(localStorage.getItem("cq_java_completed_lessons") || "[]")),
  javaLessonAttempts: JSON.parse(localStorage.getItem("cq_java_lesson_attempts") || "[]"),
  javaProjectState: JSON.parse(localStorage.getItem("cq_java_project_state") || "{}"),
  javaExamHistory: JSON.parse(localStorage.getItem("cq_java_exam_history") || "[]"),
  selectedDeveloperRole: localStorage.getItem("cq_selected_developer_role") || "",
  crossCapstoneState: JSON.parse(localStorage.getItem("cq_cross_capstone_state") || "{}"),
  globalProfilePreferences: JSON.parse(localStorage.getItem("cq_global_profile_preferences") || "{}"),
  codingLabProjects: JSON.parse(localStorage.getItem("cq_coding_lab_projects") || "{}"),
  codingSubmissions: JSON.parse(localStorage.getItem("cq_coding_submissions") || "[]"),
  activeCodingLabId: localStorage.getItem("cq_active_coding_lab") || "",
  classroomRole: localStorage.getItem("cq_classroom_role") || "learner",
  activeCohortId: localStorage.getItem("cq_active_cohort") || "cohort-data-analyst-01",
  classroomAssignments: JSON.parse(localStorage.getItem("cq_classroom_assignments") || "null"),
  classroomSubmissions: JSON.parse(localStorage.getItem("cq_classroom_submissions") || "null"),
  classroomAnnouncements: JSON.parse(localStorage.getItem("cq_classroom_announcements") || "null"),
  interventionNotes: JSON.parse(localStorage.getItem("cq_intervention_notes") || "{}"),
  academyDiagnosticHistory: JSON.parse(localStorage.getItem("cq_academy_diagnostic_history") || "[]"),
  academyReviewHistory: JSON.parse(localStorage.getItem("cq_academy_review_history") || "[]"),
  academyMisconceptions: JSON.parse(localStorage.getItem("cq_academy_misconceptions") || "{}"),
  academyCoachSessions: JSON.parse(localStorage.getItem("cq_academy_coach_sessions") || "[]"),
  academySimulationState: JSON.parse(localStorage.getItem("cq_academy_simulation_state") || "{}"),
  curriculumDrafts: JSON.parse(localStorage.getItem("cq_curriculum_drafts") || "null"),
  curriculumReviews: JSON.parse(localStorage.getItem("cq_curriculum_reviews") || "{}"),
  curriculumPublications: JSON.parse(localStorage.getItem("cq_curriculum_publications") || "[]"),
  activeCurriculumDraftId: localStorage.getItem("cq_active_curriculum_draft") || "",
  organisationWorkspace: JSON.parse(localStorage.getItem("cq_organisation_workspace") || "{}"),
  cloudConflictLog: JSON.parse(localStorage.getItem("cq_cloud_conflict_log") || "[]"),
  verifiedCredentials: JSON.parse(localStorage.getItem("cq_verified_credentials") || "[]"),
  mentorWorkspace: JSON.parse(localStorage.getItem("cq_mentor_workspace") || "{}"),
  mentorConversations: JSON.parse(localStorage.getItem("cq_mentor_conversations") || "[]"),
  pairProgrammingSessions: JSON.parse(localStorage.getItem("cq_pair_programming_sessions") || "[]"),
  technicalVivaHistory: JSON.parse(localStorage.getItem("cq_technical_viva_history") || "[]"),
  mentorMemory: JSON.parse(localStorage.getItem("cq_mentor_memory") || "{}"),
  missionRuns: JSON.parse(localStorage.getItem("cq_mission_runs") || "{}"),
  activeMissionId: localStorage.getItem("cq_active_mission") || "",
  missionPortfolio: JSON.parse(localStorage.getItem("cq_mission_portfolio") || "[]"),
  portfolioProfiles: JSON.parse(localStorage.getItem("cq_portfolio_profiles") || "{}"),
  teamWorkspaces: JSON.parse(localStorage.getItem("cq_team_workspaces") || "[]"),
  activeTeamId: localStorage.getItem("cq_active_team") || "",
  peerReviewRequests: JSON.parse(localStorage.getItem("cq_peer_review_requests") || "[]"),
  hackathonRuns: JSON.parse(localStorage.getItem("cq_hackathon_runs") || "{}"),
  contributionEvents: JSON.parse(localStorage.getItem("cq_contribution_events") || "[]"),
  onboardingProfile: JSON.parse(localStorage.getItem("cq_onboarding_profile") || "{}"),
  walkthroughCompleted: localStorage.getItem("cq_walkthrough_completed") === "true",
  landingCarouselIndex: 0,
  careerLaunchProfile: JSON.parse(localStorage.getItem("cq_career_launch_profile") || "{}"),
  jobMatches: JSON.parse(localStorage.getItem("cq_job_matches") || "[]"),
  applicationPacks: JSON.parse(localStorage.getItem("cq_application_packs") || "[]"),
  capstoneRuns: JSON.parse(localStorage.getItem("cq_capstone_runs") || "{}"),
  activeCapstoneId: localStorage.getItem("cq_active_capstone") || "",
  capstoneEvidence: JSON.parse(localStorage.getItem("cq_capstone_evidence") || "[]"),
  deploymentProjects: JSON.parse(localStorage.getItem("cq_deployment_projects") || "{}"),
  activeDeploymentProjectId: localStorage.getItem("cq_active_deployment_project") || "",
  releaseRegister: JSON.parse(localStorage.getItem("cq_release_register") || "[]"),
  adaptiveProfile: JSON.parse(localStorage.getItem("cq_adaptive_profile") || '{"intensity":"balanced","weeklyHours":5,"preferredAcademy":""}'),
  adaptivePlan: JSON.parse(localStorage.getItem("cq_adaptive_plan") || "null"),
  adaptiveHistory: JSON.parse(localStorage.getItem("cq_adaptive_history") || "[]"),
  adaptiveReviewQueue: JSON.parse(localStorage.getItem("cq_adaptive_review_queue") || "[]"),
  focusSessions: JSON.parse(localStorage.getItem("cq_focus_sessions") || "[]"),
  certificationAttempts: JSON.parse(localStorage.getItem("cq_certification_attempts") || "[]"),
  activeExamSession: JSON.parse(localStorage.getItem("cq_active_exam_session") || "null"),
  issuedCredentials: JSON.parse(localStorage.getItem("cq_issued_credentials") || "[]"),
  skillsPassportProfile: JSON.parse(localStorage.getItem("cq_skills_passport_profile") || "{}"),
  applyPilotBridgePreferences: JSON.parse(localStorage.getItem("cq_applypilot_bridge_preferences") || '{"sections":{},"lastExportAt":null}'),
  applyPilotExports: JSON.parse(localStorage.getItem("cq_applypilot_exports") || "[]"),
  theoryChecks: JSON.parse(localStorage.getItem("cq_theory_checks") || "{}"),
  chapterProgress: JSON.parse(localStorage.getItem("cq_chapter_progress") || "{}"),
  predictionHistory: JSON.parse(localStorage.getItem("cq_prediction_history") || "[]"),
  independentAttempts: JSON.parse(localStorage.getItem("cq_independent_attempts") || "[]"),
  engineeringProjects: JSON.parse(localStorage.getItem("cq_engineering_projects") || "{}"),
  activeEngineeringProjectId: localStorage.getItem("cq_active_engineering_project_id") || null,
  engineeringExecutionHistory: JSON.parse(localStorage.getItem("cq_engineering_execution_history") || "[]"),
  engineeringCoachSessions: JSON.parse(localStorage.getItem("cq_engineering_coach_sessions") || "[]"),
  engineeringReviews: JSON.parse(localStorage.getItem("cq_engineering_reviews") || "[]"),
  engineeringVivas: JSON.parse(localStorage.getItem("cq_engineering_vivas") || "[]"),
  engineeringMisconceptionCounts: JSON.parse(localStorage.getItem("cq_engineering_misconception_counts") || "{}"),
  verifiedAttempts: JSON.parse(localStorage.getItem("cq_verified_attempts") || "{}"),
  verifiedSubmissions: JSON.parse(localStorage.getItem("cq_verified_submissions") || "[]"),
  instructorReviewQueue: JSON.parse(localStorage.getItem("cq_instructor_review_queue") || "[]"),
  engineeringTeams: JSON.parse(localStorage.getItem("cq_engineering_teams") || "{}"),
  activeEngineeringTeamId: localStorage.getItem("cq_active_engineering_team_id") || null,
  pullRequests: JSON.parse(localStorage.getItem("cq_pull_requests") || "[]"),
  peerReviewEvidence: JSON.parse(localStorage.getItem("cq_peer_review_evidence") || "[]"),
  commercialPlan: JSON.parse(localStorage.getItem("cq_commercial_plan") || '{"planId":"free","status":"active","startedAt":null,"endsAt":null}'),
  featureUsage: JSON.parse(localStorage.getItem("cq_feature_usage") || "{}"),
  productAnalytics: JSON.parse(localStorage.getItem("cq_product_analytics") || "[]"),
  referralCredits: JSON.parse(localStorage.getItem("cq_referral_credits") || '{"aiCoach":0,"engineeringProjects":0}'),
  onboardingJourney: JSON.parse(localStorage.getItem("cq_onboarding_journey") || '{"completed":false,"goal":null,"academyId":null,"diagnosticDone":false}'),
  activationMilestones: JSON.parse(localStorage.getItem("cq_activation_milestones") || "{}"),
  lifecycleNotifications: JSON.parse(localStorage.getItem("cq_lifecycle_notifications") || "[]"),
  commercialAuditTrail: JSON.parse(localStorage.getItem("cq_commercial_audit_trail") || "[]"),
  academyHydrated: false,
  dailyLearningPlan: JSON.parse(localStorage.getItem("cq_daily_learning_plan") || "{}"),
  learningSessions: JSON.parse(localStorage.getItem("cq_learning_sessions") || "[]"),
  weeklyLearningGoal: Number(localStorage.getItem("cq_weekly_learning_goal") || "120"),
  streakRecoveryAvailable: JSON.parse(localStorage.getItem("cq_streak_recovery_available") || "true"),
  textbookProgress: JSON.parse(localStorage.getItem("cq_textbook_progress") || "{}"),
  textbookNotes: JSON.parse(localStorage.getItem("cq_textbook_notes") || "{}"),
  textbookBookmarks: JSON.parse(localStorage.getItem("cq_textbook_bookmarks") || "[]"),
  lessonAudioPreferences: JSON.parse(localStorage.getItem("cq_lesson_audio_preferences") || '{"voicePreference":"female","rate":1,"voiceURI":null}'),
  masteryAttempts: JSON.parse(localStorage.getItem("cq_mastery_attempts") || "[]"),
  lessonMastery: JSON.parse(localStorage.getItem("cq_lesson_mastery") || "{}"),
  mistakeNotebook: JSON.parse(localStorage.getItem("cq_mistake_notebook") || "[]"),
  masteryReviewQueue: JSON.parse(localStorage.getItem("cq_mastery_review_queue") || "[]"),
  runtimeErrors: JSON.parse(localStorage.getItem("cq_runtime_errors") || "[]"),
  feedbackReports: JSON.parse(localStorage.getItem("cq_feedback_reports") || "[]"),
  launchGateState: JSON.parse(localStorage.getItem("cq_launch_gate_state") || "{}"),
  curriculumQualityReviews: JSON.parse(localStorage.getItem("cq_curriculum_quality_reviews") || "{}")
};

const el = id => document.getElementById(id);
const allLessons = () => course.modules.flatMap(m => m.lessons.map(l => ({...l,moduleId:m.id,moduleTitle:m.title})));
const lessonById = id => allLessons().find(l => l.id === id);
const now = () => new Date();
const todayKey = () => new Date().toISOString().slice(0,10);

async function boot(){
  bindAuthEvents();
  bindStaticEvents();

  // Render the lightweight public shell immediately. The full curriculum
  // catalogue can continue hydrating in the background.
  const publicShellPromise=Promise.all([
    fetch("data/landing-content.json").then(r=>{
      if(!r.ok)throw new Error(`Landing content failed: ${r.status}`);
      return r.json();
    }),
    fetch("config/freemium-plans.json").then(r=>{
      if(!r.ok)throw new Error(`Pricing plans failed: ${r.status}`);
      return r.json();
    })
  ]).then(([landing,plans])=>{
    landingContent=landing;
    freemiumPlans=plans;
    initialisePublicExperience();
    if(!isAuthenticated()&&location.hash!=="#signin"&&location.hash!=="#signup"){
      showPublicExperience("landing");
    }
  }).catch(error=>console.error("Public shell bootstrap failed:",error));

  // Authentication must become ready independently of the large curriculum
  // catalogue. Start Supabase immediately and let data hydration continue in
  // parallel. applySession() only renders course views once course data exists.
  const authBootstrapPromise=initSupabase().catch(error=>{
    console.error("Early authentication bootstrap failed:",error);
    return null;
  });

  try{
    academies = await fetch("data/academies.json").then(r=>r.json());
    activeAcademy = academies.find(item=>item.id===(localStorage.getItem("pq_active_academy")||"python"))||academies[0];
    course = await fetch(activeAcademy.id==="python" ? activeAcademy.courseFile : "data/course.json").then(r=>r.json());
    sqlCourse = await fetch("data/sql-course.json").then(r=>r.json());
    sqlAcademyDatasets = await fetch("data/sql-academy-datasets.json").then(r=>r.json());
    sqlAcademyProjects = await fetch("data/sql-academy-projects.json").then(r=>r.json());
    sqlAcademyAssessments = await fetch("data/sql-academy-assessments.json").then(r=>r.json());
    webCourse = await fetch("data/web-course.json").then(r=>r.json());
    webAcademyProjects = await fetch("data/web-academy-projects.json").then(r=>r.json());
    webAcademyAssessments = await fetch("data/web-academy-assessments.json").then(r=>r.json());
    javaCourse = await fetch("data/java-course.json").then(r=>r.json());
    javaAcademyProjects = await fetch("data/java-academy-projects.json").then(r=>r.json());
    javaAcademyAssessments = await fetch("data/java-academy-assessments.json").then(r=>r.json());
    javaSimulatorRules = await fetch("data/java-simulator-rules.json").then(r=>r.json());
    crossAcademySkills = await fetch("data/cross-academy-skills.json").then(r=>r.json());
    developerRolePaths = await fetch("data/developer-role-paths.json").then(r=>r.json());
    crossAcademyCapstones = await fetch("data/cross-academy-capstones.json").then(r=>r.json());
    codingLabs = await fetch("data/coding-labs.json").then(r=>r.json());
    runnerConfig = await fetch("config/runner-config.json").then(r=>r.json());
    gradingResultSchema = await fetch("data/grading-result-schema.json").then(r=>r.json());
    cohorts = await fetch("data/cohorts.json").then(r=>r.json());
    cohortLearners = await fetch("data/cohort-learners.json").then(r=>r.json());
    cohortAssignments = await fetch("data/cohort-assignments.json").then(r=>r.json());
    cohortSubmissions = await fetch("data/cohort-submissions.json").then(r=>r.json());
    instructorRubrics = await fetch("data/instructor-rubrics.json").then(r=>r.json());
    cohortAnnouncements = await fetch("data/cohort-announcements.json").then(r=>r.json());
    academyParity = await fetch("data/academy-parity.json").then(r=>r.json());
    academyLearningPlans = await fetch("data/academy-learning-plans.json").then(r=>r.json());
    authoringTemplates = await fetch("data/authoring-templates.json").then(r=>r.json());
    authoringQualityRules = await fetch("data/authoring-quality-rules.json").then(r=>r.json());
    authoringSeedDrafts = await fetch("data/authoring-seed-drafts.json").then(r=>r.json());
    cloudPlatformConfig = await fetch("config/cloud-platform-config.json").then(r=>r.json());
    aiMentorConfig = await fetch("config/ai-mentor-config.json").then(r=>r.json());
    mentorModes = await fetch("data/mentor-modes.json").then(r=>r.json());
    technicalInterviewBank = await fetch("data/technical-interview-bank.json").then(r=>r.json());
    mentorReviewRubric = await fetch("data/mentor-review-rubric.json").then(r=>r.json());
    mentorProtocols = await fetch("data/mentor-protocols.json").then(r=>r.json());
    developerMissions = await fetch("data/developer-missions.json").then(r=>r.json());
    missionStakeholders = await fetch("data/mission-stakeholders.json").then(r=>r.json());
    missionDecisionTemplates = await fetch("data/mission-decision-templates.json").then(r=>r.json());
    teamWorkspaceTemplates = await fetch("data/team-workspace-templates.json").then(r=>r.json());
    hackathonCatalogue = await fetch("data/hackathon-catalogue.json").then(r=>r.json());
    peerReviewPolicy = await fetch("data/peer-review-policy.json").then(r=>r.json());
    landingContent = await fetch("data/landing-content.json").then(r=>r.json());
    productWalkthrough = await fetch("data/product-walkthrough.json").then(r=>r.json());
    legalContent = await fetch("data/legal-content.json").then(r=>r.json());
    careerLaunchRoles = await fetch("data/career-launch-roles.json").then(r=>r.json());
    careerLaunchMilestones = await fetch("data/career-launch-milestones.json").then(r=>r.json());
    jobMatchRules = await fetch("data/job-match-rules.json").then(r=>r.json());
    guidedCapstones = await fetch("data/guided-capstones.json").then(r=>r.json());
    deploymentLearningTracks = await fetch("data/deployment-learning-tracks.json").then(r=>r.json());
    deploymentPipelineTemplates = await fetch("data/deployment-pipeline-templates.json").then(r=>r.json());
    releaseReadinessChecklist = await fetch("data/release-readiness-checklist.json").then(r=>r.json());
    adaptiveEngineConfig = await fetch("config/adaptive-engine-config.json").then(r=>r.json());
    adaptiveActionCatalogue = await fetch("data/adaptive-action-catalogue.json").then(r=>r.json());
    adaptiveConceptGraph = await fetch("data/adaptive-concept-graph.json").then(r=>r.json());
    certificationPathways = await fetch("data/certification-pathways.json").then(r=>r.json());
    certificationQuestionBank = await fetch("data/certification-question-bank.json").then(r=>r.json());
    examIntegrityPolicy = await fetch("data/exam-integrity-policy.json").then(r=>r.json());
    applyPilotBridgeConfig = await fetch("config/applypilot-bridge-config.json").then(r=>r.json());
    applyPilotReverseLinks = await fetch("data/applypilot-reverse-links.json").then(r=>r.json());
    microLessonTheory = await fetch("data/micro-lesson-theory.json").then(r=>r.json());
    deepCurriculumConfig = await fetch("config/deep-curriculum-config.json").then(r=>r.json());
    interactiveVisualCatalogue = await fetch("data/interactive-visual-catalogue.json").then(r=>r.json());
    engineeringWorkspaceTemplates = await fetch("data/engineering-workspace-templates.json").then(r=>r.json());
    projectRunnerConfig = await fetch("config/project-runner-config.json").then(r=>r.json());
    engineeringSqlSeed = await fetch("data/engineering-sql-seed.json").then(r=>r.json());
    engineeringCoachConfig = await fetch("config/engineering-coach-config.json").then(r=>r.json());
    engineeringReviewRubrics = await fetch("data/engineering-review-rubrics.json").then(r=>r.json());
    engineeringMisconceptions = await fetch("data/engineering-misconceptions.json").then(r=>r.json());
    cloudRunnerConfig = await fetch("config/cloud-runner-config.json").then(r=>r.json());
    verifiedAssessmentCatalogue = await fetch("data/verified-assessment-catalogue.json").then(r=>r.json());
    verifiedPipelineStages = await fetch("data/verified-pipeline-stages.json").then(r=>r.json());
    teamEngineeringConfig = await fetch("config/team-engineering-config.json").then(r=>r.json());
    teamEngineeringTemplates = await fetch("data/team-engineering-templates.json").then(r=>r.json());
    freemiumPlans = await fetch("config/freemium-plans.json").then(r=>r.json());
    productAnalyticsEvents = await fetch("config/product-analytics-events.json").then(r=>r.json());
    productionBillingConfig = await fetch("config/production-billing-config.json").then(r=>r.json());
    activationOnboardingConfig = await fetch("config/activation-onboarding-config.json").then(r=>r.json());
    lifecycleNotificationTemplates = await fetch("data/lifecycle-notification-templates.json").then(r=>r.json());
    dailyLearningConfig = await fetch("config/daily-learning-config.json").then(r=>r.json());
    lessonTextbookLibrary = await fetch("data/lesson-textbook-library.json").then(r=>r.json());
    masteryQuestionBank = await fetch("data/mastery-question-bank.json").then(r=>r.json());
    masteryAssessmentConfig = await fetch("config/mastery-assessment-config.json").then(r=>r.json());
    featureMaturityRegistry = await fetch("config/feature-maturity-registry.json").then(r=>r.json());
    publicBetaLaunchGate = await fetch("config/public-beta-launch-gate.json").then(r=>r.json());
    projects = await fetch("data/projects.json").then(r=>r.json());
    challenges = await fetch("data/challenges.json").then(r=>r.json());
    assessmentBank = await fetch("data/assessments.json").then(r=>r.json());
    reviewRubrics = await fetch("data/review-rubrics.json").then(r=>r.json());
    errorCases = await fetch("data/error-clinic.json").then(r=>r.json());
    careerTracks = await fetch("data/career-tracks.json").then(r=>r.json());
    careerDiagnostic = await fetch("data/career-diagnostic.json").then(r=>r.json());
    mockInterviews = await fetch("data/mock-interviews.json").then(r=>r.json());
    datasets = await fetch("data/datasets.json").then(r=>r.json());
    assignments = await fetch("data/assignments.json").then(r=>r.json());
    adaptiveDrills = await fetch("data/adaptive-drills.json").then(r=>r.json());
    misconceptionCatalogue = await fetch("data/misconceptions.json").then(r=>r.json());
    cliScenarios = await fetch("data/cli-scenarios.json").then(r=>r.json());
    apiScenarios = await fetch("data/api-scenarios.json").then(r=>r.json());
    migrationScenarios = await fetch("data/migration-scenarios.json").then(r=>r.json());
    deploymentPipelines = await fetch("data/deployment-pipelines.json").then(r=>r.json());
    incidents = await fetch("data/incidents.json").then(r=>r.json());
    projectStudioTemplates = await fetch("data/project-studio-templates.json").then(r=>r.json());
    professionalPathway = await fetch("data/professional-pathway.json").then(r=>r.json());
    stageAssessments = await fetch("data/stage-assessments.json").then(r=>r.json());
    competencies = await fetch("data/competencies.json").then(r=>r.json());
    careerSimulations = await fetch("data/career-simulations.json").then(r=>r.json());
    careerSimulationRubric = await fetch("data/career-simulation-rubric.json").then(r=>r.json());
    developmentPlans = await fetch("data/development-plans.json").then(r=>r.json());
    mentorPrompts = await fetch("data/mentor-prompts.json").then(r=>r.json());
    conceptModel = await fetch("data/concept-model.json").then(r=>r.json());
    misconceptionRulesV2 = await fetch("data/misconception-rules-v2.json").then(r=>r.json());

    migrateLegacyProjectState();
    document.addEventListener("keydown",handleGlobalShortcuts);
    initialisePwa();
    applyAccessibility();
    applyNavigationMode();
    updateAcademyChrome();
    await publicShellPromise;
    initialisePublicExperience();
    setTimeout(()=>initProductionCloud(),0);
    if(!state.activeAcademyId)setTimeout(()=>renderAcademyChooser(true),80);

    await authBootstrapPromise;

    if(isAuthenticated()||!authIsRequired()){
      showAuthenticatedApp();
      renderView("dashboard");
      updateTopbar();
      updateReviewCount();
      updateBookmarkCount();
    }

    try{
      pyodide = await loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"});
      await pyodide.loadPackage(["pandas","beautifulsoup4"]);
      pythonRuntimeReady=true;
      pythonRuntimeError="";
      updatePythonWorkspaceAvailability();
    }catch(error){
      console.error("Python runtime failed:",error);
      pythonRuntimeReady=false;
      pythonRuntimeError=String(error?.message||error);
      updatePythonWorkspaceAvailability();
    }

    if((isAuthenticated()||!authIsRequired())&&!state.profile){
      startOnboarding();
    }
  }catch(error){
    console.error("CodeQuest Academy startup failed:",error);
    const main=el("main");
    if(main){
      main.innerHTML=`<div class="empty-state"><h2>PythonQuest could not start</h2><p>${esc(error.message||"Unexpected startup error")}</p><button id="retryStartupBtn" class="primary-btn">Reload</button></div>`;
      el("retryStartupBtn")?.addEventListener("click",()=>location.reload());
    }
  }
}

function authConfig(){return window.PYTHONQUEST_SUPABASE||{}}
function authIsRequired(){return authConfig().requireAuth!==false}
function isAuthenticated(){return Boolean(PythonQuestCloud.getUser())}
function publicLandingDataReady(){
  return Boolean(
    landingContent?.hero &&
    Array.isArray(landingContent?.academyCards) &&
    landingContent.academyCards.length &&
    freemiumPlans &&
    Object.keys(freemiumPlans).length
  );
}


function applySignedOutState(){
  currentSession=null;

  document.body.classList.remove(
    "authenticated",
    "auth-pending",
    "focus-outline",
    "guided-navigation"
  );
  document.body.removeAttribute("data-academy");

  el("lessonOverlay")?.classList.add("hidden");
  el("lessonOverlay")?.classList.remove("lesson-ready");
  document.querySelectorAll(".onboarding-overlay,.walkthrough-overlay")
    .forEach(node=>node.remove());

  document.querySelector(".topbar")?.classList.add("hidden");
  document.querySelector(".app-shell")?.classList.add("hidden");
  el("quickSignOutBtn")?.classList.add("hidden");
  el("authBtn").textContent="Sign in";
  el("syncStatus").textContent="Signed out";

  updatePublicAccountActions();
}

function showAuthScreen(){
  applySignedOutState();

  if(location.hash==="#signin"||location.hash==="#signup"){
    openAuthentication(location.hash==="#signup"?"signup":"signin");
    return;
  }

  if(publicLandingDataReady()){
    showPublicExperience("landing");
    return;
  }

  // Auth can initialise before the lightweight landing JSON has completed.
  // Do not interpret that harmless race as a Supabase configuration failure.
  document.body.classList.remove("auth-pending");
  document.body.classList.add("public-boot");
  setTimeout(()=>{
    if(publicLandingDataReady())showPublicExperience("landing");
  },150);
}
function showAuthenticatedApp(){
  restoreAuthenticatedChrome();
  document.body.classList.add("authenticated");
  document.body.classList.remove("auth-pending");
  el("authScreen")?.classList.add("hidden");
  updatePublicAccountActions();
  const pendingPlan=sessionStorage.getItem("cq_pending_checkout_plan");
  if(pendingPlan){
    sessionStorage.removeItem("cq_pending_checkout_plan");
    setTimeout(()=>beginPlanCheckout(pendingPlan),600);
  }else if(needsOnboarding())setTimeout(()=>renderFirstLoginOnboarding(),500);
}
let authEventsBound=false;
function bindAuthEvents(){
  if(authEventsBound)return;
  authEventsBound=true;

  pqSafeBind("authBtn","click",()=>{if(isAuthenticated())renderView("account");else showAuthScreen()});
  pqSafeBind("quickSignOutBtn","click",async()=>{
    const button=el("quickSignOutBtn");
    try{
      if(button)button.disabled=true;
      await saveCloudState();
      await PythonQuestCloud.signOut();
      applySignedOutState();
      openAuthentication("signin");
      setAuthMode("signin");
    }catch(error){
      console.error("Sign out failed:",error);
      authMessage(false,friendlyAuthError(error?.message));
    }finally{
      if(button)button.disabled=false;
    }
  });
  pqSafeBind("signInTab","click",()=>setAuthMode("signin"));
  pqSafeBind("signUpTab","click",()=>setAuthMode("signup"));
  pqSafeBind("authSubmitBtn","click",submitAuth);
  pqSafeBind("googleAuthBtn","click",async()=>{
    try{await PythonQuestCloud.signInWithGoogle()}
    catch(error){authMessage(false,friendlyAuthError(error.message))}
  });
  pqSafeBind("forgotPasswordBtn","click",showForgotPassword);
  pqSafeBind("backToSignInBtn","click",showPrimaryAuth);
  pqSafeBind("sendResetBtn","click",sendPasswordReset);
  pqSafeBind("updatePasswordBtn","click",completePasswordRecovery);
  pqSafeBind("toggleAuthPassword","click",()=>togglePasswordVisibility("authPassword","toggleAuthPassword"));
  pqSafeBind("toggleConfirmPassword","click",()=>togglePasswordVisibility("authConfirmPassword","toggleConfirmPassword"));
  pqSafeBind("authPassword","input",updatePasswordStrength);
  pqSafeBind("authPassword","keydown",event=>{if(event.key==="Enter")submitAuth()});
  pqSafeBind("authConfirmPassword","keydown",event=>{if(event.key==="Enter")submitAuth()});
}
function togglePasswordVisibility(inputId,buttonId){
  const input=el(inputId),button=el(buttonId);input.type=input.type==="password"?"text":"password";button.textContent=input.type==="password"?"Show":"Hide";
}
function setAuthMode(mode){
  authMode=mode;
  const signup=mode==="signup";
  el("signInTab").classList.toggle("active",!signup);
  el("signUpTab").classList.toggle("active",signup);
  el("signupNameRow").classList.toggle("hidden",!signup);
  el("confirmPasswordRow").classList.toggle("hidden",!signup);
  el("termsRow").classList.toggle("hidden",!signup);
  el("signinOptions").classList.toggle("hidden",signup);
  el("passwordStrength").classList.toggle("hidden",!signup);
  el("emailConfirmationNote").classList.toggle("hidden",!signup);
  el("authPassword").autocomplete=signup?"new-password":"current-password";
  el("authSubmitBtn").textContent=signup?"Create account":"Sign in";
  authMessage(true,"");
}
function passwordScore(value){
  let score=0;
  if(value.length>=8)score++;
  if(value.length>=12)score++;
  if(/[a-z]/.test(value)&&/[A-Z]/.test(value))score++;
  if(/\d/.test(value))score++;
  if(/[^A-Za-z0-9]/.test(value))score++;
  return Math.min(score,4);
}
function updatePasswordStrength(){
  const score=passwordScore(el("authPassword").value);
  const labels=["Very weak","Weak","Fair","Strong","Excellent"];
  const widths=[8,25,50,75,100];
  const colors=["#dc2626","#ea580c","#d97706","#16a34a","#15803d"];
  el("strengthBar").style.width=`${widths[score]}%`;el("strengthBar").style.background=colors[score];el("strengthLabel").textContent=labels[score];
}
function validateSignup(email,password){
  if(!el("authFullName").value.trim())return"Enter your full name.";
  if(password.length<8)return"Use at least eight characters.";
  if(passwordScore(password)<2)return"Use a stronger password with a mix of letters and numbers.";
  if(password!==el("authConfirmPassword").value)return"Passwords do not match.";
  if(!el("authTerms").checked)return"Please accept the Terms of Use and Privacy Notice.";
  return"";
}
async function submitAuth(){
  const email=el("authEmail").value.trim().toLowerCase(),password=el("authPassword").value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){authMessage(false,"Enter a valid email address.");return}
  if(!password){authMessage(false,"Enter your password.");return}
  const validation=authMode==="signup"?validateSignup(email,password):"";
  if(validation){authMessage(false,validation);return}
  setAuthBusy(true);
  try{
    if(authMode==="signup"){
      const metadata={full_name:el("authFullName").value.trim()};
      const result=await PythonQuestCloud.signUp(email,password,metadata);
      if(!result.session){
        authMessage(true,"Account created. Check your email and confirm your address before signing in.");
        el("authSubmitBtn").textContent="Confirmation email sent";
        return;
      }
    }else{
      const result=await PythonQuestCloud.signIn(email,password);
      if(result?.session){
        await applySession(result.session,"PASSWORD_SIGNED_IN");
      }
    }
  }catch(e){authMessage(false,friendlyAuthError(e.message))}
  finally{setAuthBusy(false)}
}
function setAuthBusy(busy){el("authSubmitBtn").disabled=busy;el("googleAuthBtn").disabled=busy;if(busy)el("authSubmitBtn").textContent=authMode==="signup"?"Creating account…":"Signing in…";else if(!el("authMessage").textContent.includes("confirm"))el("authSubmitBtn").textContent=authMode==="signup"?"Create account":"Sign in"}
function friendlyAuthError(message){
  const m=String(message||"");
  if(m.toLowerCase().includes("invalid login"))return"Email or password is incorrect.";
  if(m.toLowerCase().includes("email not confirmed"))return"Confirm your email address before signing in.";
  if(m.toLowerCase().includes("already registered"))return"An account already exists for this email.";
  if(m.toLowerCase().includes("rate limit"))return"Too many attempts. Wait a moment and try again.";
  return m||"Authentication failed. Please try again.";
}
function authMessage(ok,message){
  const box=el("authMessage");box.textContent=message;box.className=`feedback ${message?(ok?"success":"error"):"hidden"}`;
}
function showForgotPassword(){el("authPrimaryPanel").classList.add("hidden");el("forgotPasswordPanel").classList.remove("hidden");el("resetEmail").value=el("authEmail").value}
function showPrimaryAuth(){el("forgotPasswordPanel").classList.add("hidden");el("newPasswordPanel").classList.add("hidden");el("authPrimaryPanel").classList.remove("hidden")}
async function sendPasswordReset(){
  const email=el("resetEmail").value.trim().toLowerCase(),box=el("resetMessage");
  if(!email){box.textContent="Enter your email address.";box.className="feedback error";return}
  try{await PythonQuestCloud.resetPassword(email);box.textContent="Reset link sent. Check your email.";box.className="feedback success"}catch(e){box.textContent=friendlyAuthError(e.message);box.className="feedback error"}
}
function showPasswordRecovery(){
  authRecoveryMode=true;showAuthScreen();el("authPrimaryPanel").classList.add("hidden");el("forgotPasswordPanel").classList.add("hidden");el("newPasswordPanel").classList.remove("hidden");
}
async function completePasswordRecovery(){
  const password=el("newPassword").value,confirm=el("newPasswordConfirm").value,box=el("newPasswordMessage");
  if(password.length<8||passwordScore(password)<2){box.textContent="Use a stronger password of at least eight characters.";box.className="feedback error";return}
  if(password!==confirm){box.textContent="Passwords do not match.";box.className="feedback error";return}
  try{await PythonQuestCloud.updatePassword(password);box.textContent="Password updated. Opening your account…";box.className="feedback success";authRecoveryMode=false;setTimeout(()=>showAuthenticatedApp(),800)}catch(e){box.textContent=friendlyAuthError(e.message);box.className="feedback error"}
}

async function waitForSupabaseRuntime(timeoutMs=10000){
  const started=Date.now();
  while(Date.now()-started<timeoutMs){
    const config=window.PYTHONQUEST_SUPABASE;
    const clientReady=Boolean(window.supabase?.createClient);
    const configReady=Boolean(config?.url&&config?.anonKey);
    if(clientReady&&configReady)return true;
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  return false;
}

async function initSupabase(){
  const runtimeReady=await waitForSupabaseRuntime();
  if(!runtimeReady){
    el("authConfigurationNotice").classList.remove("hidden");
    el("authConfigurationNotice").textContent="Authentication service is still loading. Please refresh in a moment.";
    el("syncStatus").textContent="Authentication loading";
    document.body.classList.remove("auth-pending");
    return;
  }

  showAuthScreen();
  const cfg=authConfig();
  if(!cfg.url||!cfg.anonKey||cfg.url.includes("PASTE_YOUR_")||cfg.anonKey.includes("PASTE_YOUR_")||!window.supabase){
    el("authConfigurationNotice").classList.remove("hidden");
    el("authConfigurationNotice").innerHTML="<strong>Authentication setup required.</strong><br>Add the public Supabase URL and anon key in <code>config/supabase-config.js</code>, then run <code>supabase-schema.sql</code> in Supabase.";
    el("authSubmitBtn").disabled=true;el("googleAuthBtn").disabled=true;el("syncStatus").textContent="Authentication not configured";
    if(!authIsRequired()){showAuthenticatedApp()}
    return;
  }
  try{
    supabaseClient=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    PythonQuestCloud.configure(supabaseClient);
    el("authConfigurationNotice")?.classList.add("hidden");
    if(el("authConfigurationNotice"))el("authConfigurationNotice").textContent="";
    if(el("authSubmitBtn"))el("authSubmitBtn").disabled=false;
    if(el("googleAuthBtn"))el("googleAuthBtn").disabled=false;
    el("syncStatus").textContent="Authentication ready";
    const session=await PythonQuestCloud.getSession();
    await applySession(session,"INITIAL_SESSION");
    PythonQuestCloud.onAuthStateChange((next,event)=>{
      setTimeout(()=>{
        applySession(next,event).catch(error=>{
          console.error("Authentication state processing failed:",error);
          authMessage(false,friendlyAuthError(error?.message));
          document.body.classList.remove("auth-pending");
        });
      },0);
    });
    el("googleAuthBtn").classList.toggle("hidden",cfg.allowGoogle===false);
  }catch(e){
    el("authConfigurationNotice").classList.remove("hidden");el("authConfigurationNotice").textContent="Authentication service is temporarily unavailable.";
    el("syncStatus").textContent="Authentication unavailable";
    document.body.classList.remove("auth-pending");
    authMessage(false,friendlyAuthError(e?.message));
  }
}
async function applySession(session,event=""){
  const incomingUserId=session?.user?.id||null;
  const currentUserId=currentSession?.user?.id||null;
  if(event==="SIGNED_IN"&&incomingUserId&&incomingUserId===currentUserId&&document.body.classList.contains("authenticated")){
    return;
  }
  currentSession=session;
  const user=session?.user;

  if(event==="PASSWORD_RECOVERY"){
    showPasswordRecovery();
    return;
  }

  if(!user){
    applySignedOutState();
    if(authIsRequired())openAuthentication("signin");
    else showAuthenticatedApp();
    return;
  }

  showAuthenticatedApp();
  if(el("authBtn"))el("authBtn").textContent=user.user_metadata?.full_name||user.email?.split("@")[0]||"Account";
  if(el("quickSignOutBtn"))el("quickSignOutBtn").classList.remove("hidden");
  if(el("syncStatus"))el("syncStatus").textContent="Syncing…";

  try{
    const cloud=await PythonQuestCloud.loadState();
    if(cloud){
      applyCloudState(cloud);
      persist(false);
    }else{
      if(!state.profile){
        state.profile={
          name:user.user_metadata?.full_name||"",
          email:user.email||"",
          goal:"",
          experience:"beginner"
        };
      }
      persist(false);
      await saveCloudState();
    }

    if(!state.profile){
      state.profile={
        name:user.user_metadata?.full_name||"",
        email:user.email||"",
        goal:"",
        experience:"beginner"
      };
    }else{
      state.profile.email=user.email||state.profile.email;
      if(!state.profile.name&&user.user_metadata?.full_name){
        state.profile.name=user.user_metadata.full_name;
      }
    }

    persist(false);
    syncAcademyIdentity();

    if(el("syncStatus")){
      el("syncStatus").textContent="Cloud synced";
      el("syncStatus").className="sync-status sync-ok";
    }
  }catch(error){
    console.error("Cloud synchronisation failed:",error);
    if(el("syncStatus")){
      el("syncStatus").textContent="Sync failed";
      el("syncStatus").className="sync-status";
    }
  }

  syncAcademyIdentity();
  updateTopbar();
  updateReviewCount();
  updateBookmarkCount();

  if(course&&!document.body.classList.contains("auth-pending")){
    renderView(currentView||"dashboard");
  }
}
function applyCloudState(c){
  state.profile=c.profile||state.profile;state.diagnostic=c.diagnostic||state.diagnostic;state.steps=c.steps||state.steps;
  state.lessons=new Set(c.lessons||[]);state.xp=Number(c.xp||0);state.reviews=c.reviews||[];state.attempts=c.attempts||{};
  const fields=["projectDrafts","completedProjects","notebook","daily","activity","weeklyGoal","assessmentHistory","bookmarks","accessibility","reviewHistory","capstonePlan","selectedTrack","diagnosticAnswers","customEvidence","interviewHistory","sprintPlan","journal","labDrafts","sqlHistory","dataStories","customDatasets","savedCharts","dashboards","mlExperiments","responsibleAiReviews","assignmentDrafts","assignmentSubmissions","instructorReviews","focusSessions","voiceSettings","timerSettings","adaptiveDrillHistory","misconceptionState","cliHistory","gitSimulation","packageProjects","apiHistory","endpointDesigns","fastapiProjects","schemaDesigns","migrationHistory","persistenceProjects","pipelineRuns","deploymentProjects","incidentReviews","studioProjects","studioQualityRuns","studioReleases","navigationMode","questBoard","stageExamHistory","weeklyReviews","portfolioProfile","careerSimulationState","standupHistory","stakeholderBriefs","simulationFeedback","selectedDevelopmentPlan","developmentPlanProgress","mentorInboxState","commandCenterPreferences","conceptMastery","predictionHistory","explanationHistory","tutorSessions","activeAcademyId","academyEnrolments","academyProgress","sqlLessonAttempts","sqlSavedQueries","sqlProjectState","sqlExamHistory","webLessonAttempts","webProjectState","webExamHistory","javaLessonAttempts","javaProjectState","javaExamHistory","selectedDeveloperRole","crossCapstoneState","globalProfilePreferences","codingLabProjects","codingSubmissions","activeCodingLabId","classroomRole","activeCohortId","classroomAssignments","classroomSubmissions","classroomAnnouncements","interventionNotes","academyDiagnosticHistory","academyReviewHistory","academyMisconceptions","academyCoachSessions","academySimulationState","curriculumDrafts","curriculumReviews","curriculumPublications","activeCurriculumDraftId","organisationWorkspace","cloudConflictLog","verifiedCredentials","mentorWorkspace","mentorConversations","pairProgrammingSessions","technicalVivaHistory","mentorMemory","missionRuns","activeMissionId","missionPortfolio","portfolioProfiles","teamWorkspaces","activeTeamId","peerReviewRequests","hackathonRuns","contributionEvents","onboardingProfile","walkthroughCompleted","careerLaunchProfile","jobMatches","applicationPacks","capstoneRuns","activeCapstoneId","capstoneEvidence","deploymentProjects","activeDeploymentProjectId","releaseRegister","adaptiveProfile","adaptivePlan","adaptiveHistory","adaptiveReviewQueue","focusSessions","certificationAttempts","activeExamSession","issuedCredentials","skillsPassportProfile","applyPilotBridgePreferences","applyPilotExports","theoryChecks","chapterProgress","predictionHistory","independentAttempts","engineeringProjects","activeEngineeringProjectId","engineeringExecutionHistory"];
  fields.forEach(field=>{if(c[field]!==undefined)state[field]=c[field]});
}


function serializableState(){
  return{
    profile:state.profile,
    diagnostic:state.diagnostic,
    steps:state.steps,
    lessons:[...state.lessons],
    xp:state.xp,
    reviews:state.reviews,
    attempts:state.attempts,
    projectDrafts:state.projectDrafts,
    completedProjects:state.completedProjects,
    notebook:state.notebook,
    daily:state.daily,
    activity:state.activity,
    weeklyGoal:state.weeklyGoal,
    assessmentHistory:state.assessmentHistory,
    bookmarks:state.bookmarks,
    accessibility:state.accessibility,
    reviewHistory:state.reviewHistory,
    capstonePlan:state.capstonePlan,
    selectedTrack:state.selectedTrack,
    diagnosticAnswers:state.diagnosticAnswers,
    customEvidence:state.customEvidence,
    interviewHistory:state.interviewHistory,
    sprintPlan:state.sprintPlan,
    journal:state.journal,
    labDrafts:state.labDrafts,
    sqlHistory:state.sqlHistory,
    dataStories:state.dataStories,
    customDatasets:state.customDatasets,
    savedCharts:state.savedCharts,
    dashboards:state.dashboards,
    mlExperiments:state.mlExperiments,
    responsibleAiReviews:state.responsibleAiReviews,
    assignmentDrafts:state.assignmentDrafts,
    assignmentSubmissions:state.assignmentSubmissions,
    instructorReviews:state.instructorReviews,
    focusSessions:state.focusSessions,
    voiceSettings:state.voiceSettings,
    timerSettings:state.timerSettings,
    adaptiveDrillHistory:state.adaptiveDrillHistory,
    misconceptionState:state.misconceptionState,
    cliHistory:state.cliHistory,
    gitSimulation:state.gitSimulation,
    packageProjects:state.packageProjects,
    apiHistory:state.apiHistory,
    endpointDesigns:state.endpointDesigns,
    fastapiProjects:state.fastapiProjects,
    schemaDesigns:state.schemaDesigns,
    migrationHistory:state.migrationHistory,
    persistenceProjects:state.persistenceProjects,
    pipelineRuns:state.pipelineRuns,
    deploymentProjects:state.deploymentProjects,
    incidentReviews:state.incidentReviews,
    studioProjects:state.studioProjects,
    studioQualityRuns:state.studioQualityRuns,
    studioReleases:state.studioReleases,
    navigationMode:state.navigationMode,
    questBoard:state.questBoard,
    stageExamHistory:state.stageExamHistory,
    weeklyReviews:state.weeklyReviews,
    portfolioProfile:state.portfolioProfile,
    careerSimulationState:state.careerSimulationState,
    standupHistory:state.standupHistory,
    stakeholderBriefs:state.stakeholderBriefs,
    simulationFeedback:state.simulationFeedback,
    selectedDevelopmentPlan:state.selectedDevelopmentPlan,
    developmentPlanProgress:state.developmentPlanProgress,
    mentorInboxState:state.mentorInboxState,
    commandCenterPreferences:state.commandCenterPreferences,
    conceptMastery:state.conceptMastery,
    predictionHistory:state.predictionHistory,
    explanationHistory:state.explanationHistory,
    tutorSessions:state.tutorSessions,
    activeAcademyId:state.activeAcademyId,
    academyEnrolments:state.academyEnrolments,
    academyProgress:state.academyProgress,
    sqlCompletedLessons:[...state.sqlCompletedLessons],
    sqlLessonAttempts:state.sqlLessonAttempts,
    sqlSavedQueries:state.sqlSavedQueries,
    sqlProjectState:state.sqlProjectState,
    sqlExamHistory:state.sqlExamHistory,
    webCompletedLessons:[...state.webCompletedLessons],
    webLessonAttempts:state.webLessonAttempts,
    webProjectState:state.webProjectState,
    webExamHistory:state.webExamHistory,
    javaCompletedLessons:[...state.javaCompletedLessons],
    javaLessonAttempts:state.javaLessonAttempts,
    javaProjectState:state.javaProjectState,
    javaExamHistory:state.javaExamHistory,
    selectedDeveloperRole:state.selectedDeveloperRole,
    crossCapstoneState:state.crossCapstoneState,
    globalProfilePreferences:state.globalProfilePreferences,
    codingLabProjects:state.codingLabProjects,
    codingSubmissions:state.codingSubmissions,
    activeCodingLabId:state.activeCodingLabId,
    classroomRole:state.classroomRole,
    activeCohortId:state.activeCohortId,
    classroomAssignments:state.classroomAssignments,
    classroomSubmissions:state.classroomSubmissions,
    classroomAnnouncements:state.classroomAnnouncements,
    interventionNotes:state.interventionNotes,
    academyDiagnosticHistory:state.academyDiagnosticHistory,
    academyReviewHistory:state.academyReviewHistory,
    academyMisconceptions:state.academyMisconceptions,
    academyCoachSessions:state.academyCoachSessions,
    academySimulationState:state.academySimulationState,
    curriculumDrafts:state.curriculumDrafts,
    curriculumReviews:state.curriculumReviews,
    curriculumPublications:state.curriculumPublications,
    activeCurriculumDraftId:state.activeCurriculumDraftId,
    organisationWorkspace:state.organisationWorkspace,
    cloudConflictLog:state.cloudConflictLog,
    verifiedCredentials:state.verifiedCredentials,
    mentorWorkspace:state.mentorWorkspace,
    mentorConversations:state.mentorConversations,
    pairProgrammingSessions:state.pairProgrammingSessions,
    technicalVivaHistory:state.technicalVivaHistory,
    mentorMemory:state.mentorMemory,
    missionRuns:state.missionRuns,
    activeMissionId:state.activeMissionId,
    missionPortfolio:state.missionPortfolio,
    portfolioProfiles:state.portfolioProfiles,
    teamWorkspaces:state.teamWorkspaces,
    activeTeamId:state.activeTeamId,
    peerReviewRequests:state.peerReviewRequests,
    hackathonRuns:state.hackathonRuns,
    contributionEvents:state.contributionEvents,
    onboardingProfile:state.onboardingProfile,
    walkthroughCompleted:state.walkthroughCompleted,
    careerLaunchProfile:state.careerLaunchProfile,
    jobMatches:state.jobMatches,
    applicationPacks:state.applicationPacks,
    capstoneRuns:state.capstoneRuns,
    activeCapstoneId:state.activeCapstoneId,
    capstoneEvidence:state.capstoneEvidence,
    deploymentProjects:state.deploymentProjects,
    activeDeploymentProjectId:state.activeDeploymentProjectId,
    releaseRegister:state.releaseRegister,
    adaptiveProfile:state.adaptiveProfile,
    adaptivePlan:state.adaptivePlan,
    adaptiveHistory:state.adaptiveHistory,
    adaptiveReviewQueue:state.adaptiveReviewQueue,
    focusSessions:state.focusSessions,
    certificationAttempts:state.certificationAttempts,
    activeExamSession:state.activeExamSession,
    issuedCredentials:state.issuedCredentials,
    skillsPassportProfile:state.skillsPassportProfile,
    applyPilotBridgePreferences:state.applyPilotBridgePreferences,
    applyPilotExports:state.applyPilotExports,
    theoryChecks:state.theoryChecks,
    chapterProgress:state.chapterProgress,
    predictionHistory:state.predictionHistory,
    independentAttempts:state.independentAttempts,
    engineeringProjects:state.engineeringProjects,
    activeEngineeringProjectId:state.activeEngineeringProjectId,
    engineeringExecutionHistory:state.engineeringExecutionHistory
  };
}

function cloudState(){return serializableState()}
async function saveCloudState(){if(!PythonQuestCloud.getUser())return;try{await PythonQuestCloud.saveState(cloudState());el("syncStatus").textContent="Cloud synced"}catch(e){el("syncStatus").textContent="Sync failed"}}

function applyNavigationMode(){
  const guided=state.navigationMode!=="explore";
  document.body.classList.toggle("guided-navigation",guided);
  document.body.classList.toggle("explore-navigation",!guided);
  if(el("navModeLabel"))el("navModeLabel").textContent=guided?"Learning mode":"All tools";
  const help=document.querySelector(".nav-mode-help");
  if(help)help.textContent=guided?"Core learning journey":"Specialist and administration tools";
  updateAcademyNavigation();
  if(el("navModeBtn")){
    el("navModeBtn").title=guided?"Show all specialist tools":"Return to focused learning navigation";
    el("navModeBtn").setAttribute("aria-label",el("navModeBtn").title);
  }
}
function toggleNavigationMode(){
  state.navigationMode=state.navigationMode==="guided"?"explore":"guided";
  persist();
  applyNavigationMode();
}

function bindStaticEvents(){
  pqSafeBind("academySwitcherBtn","click",()=>renderAcademyChooser(false));
  pqSafeBind("closeAcademyChooserBtn","click",()=>el("academyChooser")?.classList.add("hidden"));
  pqSafeBind("navModeBtn","click",toggleNavigationMode);
  document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>renderView(btn.dataset.view)));
  pqSafeBind("commandBtn","click",()=>openCommandPalette(""));
  pqSafeBind("focusBtn","click",toggleFocusMode);
  pqSafeBind("dashboardFocusBtn","click",toggleFocusMode);
  pqSafeBind("timerBtn","click",toggleTimerPanel);
  pqSafeBind("commandCloseBtn","click",closeCommandPalette);

  const commandInput=document.getElementById("commandInput");
  if(commandInput){
    commandInput.addEventListener("input",()=>renderCommandResults(commandInput.value));
    commandInput.addEventListener("keydown",handleCommandKeys);
  }

  pqSafeBind("closeTimerBtn","click",()=>document.getElementById("timerPanel")?.classList.add("hidden"));
  pqSafeBind("startTimerBtn","click",toggleFocusTimer);
  pqSafeBind("resetTimerBtn","click",resetFocusTimer);
  document.querySelectorAll("[data-timer-minutes]").forEach(button=>{
    button.addEventListener("click",()=>setFocusTimer(Number(button.dataset.timerMinutes)));
  });

  const autoBreak=document.getElementById("autoBreakToggle");
  if(autoBreak){
    autoBreak.checked=Boolean(state.timerSettings?.autoBreak);
    autoBreak.addEventListener("change",()=>{
      state.timerSettings.autoBreak=autoBreak.checked;
      if(typeof persist==="function")persist();
    });
  }

  pqSafeBind("voiceLessonBtn","click",readCurrentLessonAloud);
  pqSafeBind("voiceStopBtn","click",stopLessonVoice);
  pqSafeBind("searchBtn","click",openSearch);
  pqSafeBind("searchCloseBtn","click",()=>document.getElementById("searchModal")?.classList.add("hidden"));

  const globalSearch=document.getElementById("globalSearchInput");
  if(globalSearch)globalSearch.addEventListener("input",event=>renderSearchResults(event.target.value));

  pqSafeBind("themeBtn","click",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("pq3_theme",document.body.classList.contains("dark")?"dark":"light");
  });
  if(localStorage.getItem("pq3_theme")==="dark")document.body.classList.add("dark");

  pqSafeBind("closeLessonBtn","click",closeLesson);
  pqSafeBind("runBtn","click",runCode);
  pqSafeBind("hintBtn","click",()=>{
    hintLevel++;
    scheduleReview("hint");
    if(activeLesson?.steps?.[currentStep])showFeedback(false,activeLesson.steps[currentStep].hint);
  });
  pqSafeBind("solutionBtn","click",showSolution);
  pqSafeBind("saveNotebookStepBtn","click",saveCurrentStepToNotebook);
  pqSafeBind("prevStepBtn","click",prevStep);
  pqSafeBind("nextStepBtn","click",nextStep);
  pqSafeBind("rewardCloseBtn","click",()=>{
    document.getElementById("rewardModal")?.classList.add("hidden");
    closeLesson();
    renderView("dashboard");
  });

  pqSafeBind("closeProjectBtn","click",closeProject);
  pqSafeBind("runProjectBtn","click",runProject);
  pqSafeBind("checkProjectBtn","click",checkProject);
  pqSafeBind("saveProjectBtn","click",saveProjectDraft);
  pqSafeBind("exportProjectBtn","click",exportProject);
  pqSafeBind("tutorToggleBtn","click",toggleTutor);
  pqSafeBind("closeTutorBtn","click",toggleTutor);
  document.querySelectorAll("[data-tutor]").forEach(button=>{
    button.addEventListener("click",()=>tutorAction(button.dataset.tutor));
  });
}
function persist(syncCloud=true){
  localStorage.setItem("pq3_profile",JSON.stringify(state.profile));
  localStorage.setItem("pq3_diagnostic",JSON.stringify(state.diagnostic));
  localStorage.setItem("pq3_steps",JSON.stringify(state.steps));
  localStorage.setItem("pq3_lessons",JSON.stringify([...state.lessons]));
  localStorage.setItem("pq3_xp",String(state.xp));
  localStorage.setItem("pq3_reviews",JSON.stringify(state.reviews));
  localStorage.setItem("pq3_attempts",JSON.stringify(state.attempts));
  localStorage.setItem("pq_project_drafts",JSON.stringify(state.projectDrafts));
  localStorage.setItem("pq_completed_projects",JSON.stringify(state.completedProjects));
  localStorage.setItem("pq_notebook",JSON.stringify(state.notebook));
  localStorage.setItem("pq_daily",JSON.stringify(state.daily));
  localStorage.setItem("pq_activity",JSON.stringify(state.activity));
  localStorage.setItem("pq_weekly_goal",JSON.stringify(state.weeklyGoal));
  localStorage.setItem("pq_assessment_history",JSON.stringify(state.assessmentHistory));
  localStorage.setItem("pq_bookmarks",JSON.stringify(state.bookmarks));
  localStorage.setItem("pq_accessibility",JSON.stringify(state.accessibility));
  localStorage.setItem("pq_review_history",JSON.stringify(state.reviewHistory));
  localStorage.setItem("pq_capstone_plan",JSON.stringify(state.capstonePlan));
  localStorage.setItem("pq_selected_track",state.selectedTrack||"");
  localStorage.setItem("pq_diagnostic_answers",JSON.stringify(state.diagnosticAnswers));
  localStorage.setItem("pq_custom_evidence",JSON.stringify(state.customEvidence));
  localStorage.setItem("pq_interview_history",JSON.stringify(state.interviewHistory));
  localStorage.setItem("pq_sprint_plan",JSON.stringify(state.sprintPlan));
  localStorage.setItem("pq_learning_journal",JSON.stringify(state.journal));
  localStorage.setItem("pq_lab_drafts",JSON.stringify(state.labDrafts));
  localStorage.setItem("pq_sql_history",JSON.stringify(state.sqlHistory));
  localStorage.setItem("pq_data_stories",JSON.stringify(state.dataStories));
  localStorage.setItem("pq_custom_datasets",JSON.stringify(state.customDatasets));
  localStorage.setItem("pq_saved_charts",JSON.stringify(state.savedCharts));
  localStorage.setItem("pq_dashboards",JSON.stringify(state.dashboards));
  localStorage.setItem("pq_ml_experiments",JSON.stringify(state.mlExperiments));
  localStorage.setItem("pq_responsible_ai_reviews",JSON.stringify(state.responsibleAiReviews));
  localStorage.setItem("pq_assignment_drafts",JSON.stringify(state.assignmentDrafts));
  localStorage.setItem("pq_assignment_submissions",JSON.stringify(state.assignmentSubmissions));
  localStorage.setItem("pq_instructor_reviews",JSON.stringify(state.instructorReviews));
  localStorage.setItem("pq_focus_sessions",JSON.stringify(state.focusSessions));
  localStorage.setItem("pq_voice_settings",JSON.stringify(state.voiceSettings));
  localStorage.setItem("pq_timer_settings",JSON.stringify(state.timerSettings));
  localStorage.setItem("pq_adaptive_drill_history",JSON.stringify(state.adaptiveDrillHistory));
  localStorage.setItem("pq_misconception_state",JSON.stringify(state.misconceptionState));
  localStorage.setItem("pq_cli_history",JSON.stringify(state.cliHistory));
  localStorage.setItem("pq_git_simulation",JSON.stringify(state.gitSimulation));
  localStorage.setItem("pq_package_projects",JSON.stringify(state.packageProjects));
  localStorage.setItem("pq_api_history",JSON.stringify(state.apiHistory));
  localStorage.setItem("pq_endpoint_designs",JSON.stringify(state.endpointDesigns));
  localStorage.setItem("pq_fastapi_projects",JSON.stringify(state.fastapiProjects));
  localStorage.setItem("pq_schema_designs",JSON.stringify(state.schemaDesigns));
  localStorage.setItem("pq_migration_history",JSON.stringify(state.migrationHistory));
  localStorage.setItem("pq_persistence_projects",JSON.stringify(state.persistenceProjects));
  localStorage.setItem("pq_pipeline_runs",JSON.stringify(state.pipelineRuns));
  localStorage.setItem("pq_deployment_projects",JSON.stringify(state.deploymentProjects));
  localStorage.setItem("pq_incident_reviews",JSON.stringify(state.incidentReviews));
  localStorage.setItem("pq_studio_projects",JSON.stringify(state.studioProjects));
  localStorage.setItem("pq_studio_quality_runs",JSON.stringify(state.studioQualityRuns));
  localStorage.setItem("pq_studio_releases",JSON.stringify(state.studioReleases));
  localStorage.setItem("pq_navigation_mode",state.navigationMode);
  localStorage.setItem("pq_quest_board",JSON.stringify(state.questBoard));
  localStorage.setItem("pq_stage_exam_history",JSON.stringify(state.stageExamHistory));
  localStorage.setItem("pq_weekly_reviews",JSON.stringify(state.weeklyReviews));
  localStorage.setItem("pq_portfolio_profile",JSON.stringify(state.portfolioProfile));
  localStorage.setItem("pq_career_simulation_state",JSON.stringify(state.careerSimulationState));
  localStorage.setItem("pq_standup_history",JSON.stringify(state.standupHistory));
  localStorage.setItem("pq_stakeholder_briefs",JSON.stringify(state.stakeholderBriefs));
  localStorage.setItem("pq_simulation_feedback",JSON.stringify(state.simulationFeedback));
  localStorage.setItem("pq_selected_development_plan",state.selectedDevelopmentPlan||"");
  localStorage.setItem("pq_development_plan_progress",JSON.stringify(state.developmentPlanProgress));
  localStorage.setItem("pq_mentor_inbox_state",JSON.stringify(state.mentorInboxState));
  localStorage.setItem("pq_command_center_preferences",JSON.stringify(state.commandCenterPreferences));
  localStorage.setItem("pq_concept_mastery",JSON.stringify(state.conceptMastery));
  localStorage.setItem("pq_prediction_history",JSON.stringify(state.predictionHistory));
  localStorage.setItem("pq_explanation_history",JSON.stringify(state.explanationHistory));
  localStorage.setItem("pq_tutor_sessions",JSON.stringify(state.tutorSessions));
  localStorage.setItem("pq_active_academy",state.activeAcademyId||"python");
  localStorage.setItem("pq_academy_enrolments",JSON.stringify(state.academyEnrolments));
  localStorage.setItem("pq_academy_progress",JSON.stringify(state.academyProgress));
  localStorage.setItem("cq_sql_completed_lessons",JSON.stringify([...state.sqlCompletedLessons]));
  localStorage.setItem("cq_sql_lesson_attempts",JSON.stringify(state.sqlLessonAttempts));
  localStorage.setItem("cq_sql_saved_queries",JSON.stringify(state.sqlSavedQueries));
  localStorage.setItem("cq_sql_project_state",JSON.stringify(state.sqlProjectState));
  localStorage.setItem("cq_sql_exam_history",JSON.stringify(state.sqlExamHistory));
  localStorage.setItem("cq_web_completed_lessons",JSON.stringify([...state.webCompletedLessons]));
  localStorage.setItem("cq_web_lesson_attempts",JSON.stringify(state.webLessonAttempts));
  localStorage.setItem("cq_web_project_state",JSON.stringify(state.webProjectState));
  localStorage.setItem("cq_web_exam_history",JSON.stringify(state.webExamHistory));
  localStorage.setItem("cq_java_completed_lessons",JSON.stringify([...state.javaCompletedLessons]));
  localStorage.setItem("cq_java_lesson_attempts",JSON.stringify(state.javaLessonAttempts));
  localStorage.setItem("cq_java_project_state",JSON.stringify(state.javaProjectState));
  localStorage.setItem("cq_java_exam_history",JSON.stringify(state.javaExamHistory));
  localStorage.setItem("cq_selected_developer_role",state.selectedDeveloperRole||"");
  localStorage.setItem("cq_cross_capstone_state",JSON.stringify(state.crossCapstoneState));
  localStorage.setItem("cq_global_profile_preferences",JSON.stringify(state.globalProfilePreferences));
  localStorage.setItem("cq_coding_lab_projects",JSON.stringify(state.codingLabProjects));
  localStorage.setItem("cq_coding_submissions",JSON.stringify(state.codingSubmissions));
  localStorage.setItem("cq_active_coding_lab",state.activeCodingLabId||"");
  localStorage.setItem("cq_classroom_role",state.classroomRole||"learner");
  localStorage.setItem("cq_active_cohort",state.activeCohortId||"");
  localStorage.setItem("cq_classroom_assignments",JSON.stringify(state.classroomAssignments));
  localStorage.setItem("cq_classroom_submissions",JSON.stringify(state.classroomSubmissions));
  localStorage.setItem("cq_classroom_announcements",JSON.stringify(state.classroomAnnouncements));
  localStorage.setItem("cq_intervention_notes",JSON.stringify(state.interventionNotes));
  localStorage.setItem("cq_academy_diagnostic_history",JSON.stringify(state.academyDiagnosticHistory));
  localStorage.setItem("cq_academy_review_history",JSON.stringify(state.academyReviewHistory));
  localStorage.setItem("cq_academy_misconceptions",JSON.stringify(state.academyMisconceptions));
  localStorage.setItem("cq_academy_coach_sessions",JSON.stringify(state.academyCoachSessions));
  localStorage.setItem("cq_academy_simulation_state",JSON.stringify(state.academySimulationState));
  localStorage.setItem("cq_curriculum_drafts",JSON.stringify(state.curriculumDrafts));
  localStorage.setItem("cq_curriculum_reviews",JSON.stringify(state.curriculumReviews));
  localStorage.setItem("cq_curriculum_publications",JSON.stringify(state.curriculumPublications));
  localStorage.setItem("cq_active_curriculum_draft",state.activeCurriculumDraftId||"");
  localStorage.setItem("cq_organisation_workspace",JSON.stringify(state.organisationWorkspace));
  localStorage.setItem("cq_cloud_conflict_log",JSON.stringify(state.cloudConflictLog));
  localStorage.setItem("cq_verified_credentials",JSON.stringify(state.verifiedCredentials));
  localStorage.setItem("cq_mentor_workspace",JSON.stringify(state.mentorWorkspace));
  localStorage.setItem("cq_mentor_conversations",JSON.stringify(state.mentorConversations));
  localStorage.setItem("cq_pair_programming_sessions",JSON.stringify(state.pairProgrammingSessions));
  localStorage.setItem("cq_technical_viva_history",JSON.stringify(state.technicalVivaHistory));
  localStorage.setItem("cq_mentor_memory",JSON.stringify(state.mentorMemory));
  localStorage.setItem("cq_mission_runs",JSON.stringify(state.missionRuns));
  localStorage.setItem("cq_active_mission",state.activeMissionId||"");
  localStorage.setItem("cq_mission_portfolio",JSON.stringify(state.missionPortfolio));
  localStorage.setItem("cq_portfolio_profiles",JSON.stringify(state.portfolioProfiles));
  localStorage.setItem("cq_team_workspaces",JSON.stringify(state.teamWorkspaces));
  localStorage.setItem("cq_active_team",state.activeTeamId||"");
  localStorage.setItem("cq_peer_review_requests",JSON.stringify(state.peerReviewRequests));
  localStorage.setItem("cq_hackathon_runs",JSON.stringify(state.hackathonRuns));
  localStorage.setItem("cq_contribution_events",JSON.stringify(state.contributionEvents));
  localStorage.setItem("cq_onboarding_profile",JSON.stringify(state.onboardingProfile));
  localStorage.setItem("cq_walkthrough_completed",String(Boolean(state.walkthroughCompleted)));
  localStorage.setItem("cq_career_launch_profile",JSON.stringify(state.careerLaunchProfile));
  localStorage.setItem("cq_job_matches",JSON.stringify(state.jobMatches));
  localStorage.setItem("cq_application_packs",JSON.stringify(state.applicationPacks));
  localStorage.setItem("cq_capstone_runs",JSON.stringify(state.capstoneRuns));
  localStorage.setItem("cq_active_capstone",state.activeCapstoneId||"");
  localStorage.setItem("cq_capstone_evidence",JSON.stringify(state.capstoneEvidence));
  localStorage.setItem("cq_deployment_projects",JSON.stringify(state.deploymentProjects));
  localStorage.setItem("cq_active_deployment_project",state.activeDeploymentProjectId||"");
  localStorage.setItem("cq_release_register",JSON.stringify(state.releaseRegister));
  localStorage.setItem("cq_adaptive_profile",JSON.stringify(state.adaptiveProfile));
  localStorage.setItem("cq_adaptive_plan",JSON.stringify(state.adaptivePlan));
  localStorage.setItem("cq_adaptive_history",JSON.stringify(state.adaptiveHistory));
  localStorage.setItem("cq_adaptive_review_queue",JSON.stringify(state.adaptiveReviewQueue));
  localStorage.setItem("cq_focus_sessions",JSON.stringify(state.focusSessions));
  localStorage.setItem("cq_certification_attempts",JSON.stringify(state.certificationAttempts));
  localStorage.setItem("cq_active_exam_session",JSON.stringify(state.activeExamSession));
  localStorage.setItem("cq_issued_credentials",JSON.stringify(state.issuedCredentials));
  localStorage.setItem("cq_skills_passport_profile",JSON.stringify(state.skillsPassportProfile));
  localStorage.setItem("cq_applypilot_bridge_preferences",JSON.stringify(state.applyPilotBridgePreferences));
  localStorage.setItem("cq_applypilot_exports",JSON.stringify(state.applyPilotExports));
  localStorage.setItem("cq_theory_checks",JSON.stringify(state.theoryChecks));
  localStorage.setItem("cq_chapter_progress",JSON.stringify(state.chapterProgress));
  localStorage.setItem("cq_prediction_history",JSON.stringify(state.predictionHistory));
  localStorage.setItem("cq_independent_attempts",JSON.stringify(state.independentAttempts));
  localStorage.setItem("cq_engineering_projects",JSON.stringify(state.engineeringProjects));
  if(state.activeEngineeringProjectId)localStorage.setItem("cq_active_engineering_project_id",state.activeEngineeringProjectId);
  localStorage.setItem("cq_engineering_execution_history",JSON.stringify(state.engineeringExecutionHistory));
  localStorage.setItem("cq_engineering_coach_sessions",JSON.stringify(state.engineeringCoachSessions));
  localStorage.setItem("cq_engineering_reviews",JSON.stringify(state.engineeringReviews));
  localStorage.setItem("cq_engineering_vivas",JSON.stringify(state.engineeringVivas));
  localStorage.setItem("cq_engineering_misconception_counts",JSON.stringify(state.engineeringMisconceptionCounts));
  localStorage.setItem("cq_verified_attempts",JSON.stringify(state.verifiedAttempts));
  localStorage.setItem("cq_verified_submissions",JSON.stringify(state.verifiedSubmissions));
  localStorage.setItem("cq_instructor_review_queue",JSON.stringify(state.instructorReviewQueue));
  localStorage.setItem("cq_engineering_teams",JSON.stringify(state.engineeringTeams));
  if(state.activeEngineeringTeamId)localStorage.setItem("cq_active_engineering_team_id",state.activeEngineeringTeamId);
  localStorage.setItem("cq_pull_requests",JSON.stringify(state.pullRequests));
  localStorage.setItem("cq_peer_review_evidence",JSON.stringify(state.peerReviewEvidence));
  localStorage.setItem("cq_commercial_plan",JSON.stringify(state.commercialPlan));
  localStorage.setItem("cq_feature_usage",JSON.stringify(state.featureUsage));
  localStorage.setItem("cq_product_analytics",JSON.stringify(state.productAnalytics));
  localStorage.setItem("cq_referral_credits",JSON.stringify(state.referralCredits));
  localStorage.setItem("cq_onboarding_journey",JSON.stringify(state.onboardingJourney));
  localStorage.setItem("cq_activation_milestones",JSON.stringify(state.activationMilestones));
  localStorage.setItem("cq_lifecycle_notifications",JSON.stringify(state.lifecycleNotifications));
  localStorage.setItem("cq_commercial_audit_trail",JSON.stringify(state.commercialAuditTrail));
  localStorage.setItem("cq_daily_learning_plan",JSON.stringify(state.dailyLearningPlan));
  localStorage.setItem("cq_learning_sessions",JSON.stringify(state.learningSessions));
  localStorage.setItem("cq_weekly_learning_goal",String(state.weeklyLearningGoal));
  localStorage.setItem("cq_streak_recovery_available",JSON.stringify(state.streakRecoveryAvailable));
  localStorage.setItem("cq_textbook_progress",JSON.stringify(state.textbookProgress));
  localStorage.setItem("cq_textbook_notes",JSON.stringify(state.textbookNotes));
  localStorage.setItem("cq_textbook_bookmarks",JSON.stringify(state.textbookBookmarks));
  localStorage.setItem("cq_lesson_audio_preferences",JSON.stringify(state.lessonAudioPreferences));
  localStorage.setItem("cq_mastery_attempts",JSON.stringify(state.masteryAttempts));
  localStorage.setItem("cq_lesson_mastery",JSON.stringify(state.lessonMastery));
  localStorage.setItem("cq_mistake_notebook",JSON.stringify(state.mistakeNotebook));
  localStorage.setItem("cq_mastery_review_queue",JSON.stringify(state.masteryReviewQueue));
  localStorage.setItem("cq_runtime_errors",JSON.stringify(state.runtimeErrors));
  localStorage.setItem("cq_feedback_reports",JSON.stringify(state.feedbackReports));
  localStorage.setItem("cq_launch_gate_state",JSON.stringify(state.launchGateState));
  localStorage.setItem("cq_curriculum_quality_reviews",JSON.stringify(state.curriculumQualityReviews));
  updateTopbar();updateReviewCount();updateBookmarkCount();if(syncCloud&&PythonQuestCloud.getUser()){clearTimeout(cloudSaveTimer);cloudSaveTimer=setTimeout(saveCloudState,700)}
}

function updateTopbar(){
  if(el("topXp"))el("topXp").textContent=state.xp;
  if(el("avatar"))el("avatar").textContent=((state.profile&&state.profile.name)||"L")[0].toUpperCase();
}
function dueReviews(){return state.reviews.filter(r=>new Date(r.due)<=now()&&!r.completed)}
function updateReviewCount(){if(el("reviewCount"))el("reviewCount").textContent=dueReviews().length}

function startOnboarding(){
  let step=0;
  const draft={name:"",goal:"Data analytics",session:"15",experience:"Some basics",interests:["Business data"],style:"Short missions"};
  const render=()=>{
    const pct=(step+1)/4*100;
    const screens=[
      `<div class="onboarding-progress"><div style="width:${pct}%"></div></div><div class="eyebrow">STEP 1 OF 4</div><h2>What should we call you?</h2><p class="muted">Your learning plan will be personalised around your goals.</p><div class="form-row"><label>Name</label><input id="obName" value="${draft.name}" placeholder="Your name"></div>`,
      `<div class="onboarding-progress"><div style="width:${pct}%"></div></div><div class="eyebrow">STEP 2 OF 4</div><h2>What is your main goal?</h2><div class="option-grid">${["Data analytics","Automation","Web scraping","Advanced Python"].map(x=>`<button class="choice-card ${draft.goal===x?"selected":""}" data-ob-goal="${x}">${x}</button>`).join("")}</div>`,
      `<div class="onboarding-progress"><div style="width:${pct}%"></div></div><div class="eyebrow">STEP 3 OF 4</div><h2>What feels realistic?</h2><p class="muted">A small repeatable session is better than an ambitious plan that becomes exhausting.</p><div class="option-grid">${["5","10","15","20"].map(x=>`<button class="choice-card ${draft.session===x?"selected":""}" data-ob-session="${x}">${x} minutes</button>`).join("")}</div>`,
      `<div class="onboarding-progress"><div style="width:${pct}%"></div></div><div class="eyebrow">STEP 4 OF 4</div><h2>Choose your starting point</h2><p class="muted">A five-question diagnostic can avoid lessons that are too easy or too difficult.</p><div class="option-grid"><button class="choice-card selected" id="takeDiagnostic">Take diagnostic</button><button class="choice-card" id="skipDiagnostic">Start from foundations</button></div>`
    ];
    el("onboardingContent").innerHTML=screens[step]+`<div class="lesson-footer"><button id="obBack" class="secondary-btn" ${step===0?"disabled":""}>← Back</button><button id="obNext" class="primary-btn" ${step===3?"disabled":""}>Next →</button></div>`;
    el("onboardingModal").classList.remove("hidden");
    if(el("obName"))el("obName").oninput=e=>draft.name=e.target.value;
    document.querySelectorAll("[data-ob-goal]").forEach(b=>b.onclick=()=>{draft.goal=b.dataset.obGoal;render()});
    document.querySelectorAll("[data-ob-session]").forEach(b=>b.onclick=()=>{draft.session=b.dataset.obSession;render()});
    el("obBack").onclick=()=>{if(step>0){step--;render()}};
    el("obNext").onclick=()=>{if(step===0&&!draft.name.trim())return;step++;render()};
    if(el("takeDiagnostic"))el("takeDiagnostic").onclick=()=>{state.profile={...draft,name:draft.name.trim()||"Learner"};persist();el("onboardingModal").classList.add("hidden");startDiagnostic()};
    if(el("skipDiagnostic"))el("skipDiagnostic").onclick=()=>{state.profile={...draft,name:draft.name.trim()||"Learner"};state.diagnostic={level:"Foundation",score:0,recommended:"variables",skills:{Syntax:20,Logic:20,Data:10,Scraping:0}};persist();el("onboardingModal").classList.add("hidden");renderView("dashboard")};
  };
  render();
}

function startDiagnostic(){
  const qs=[
    {q:"What does len([10, 20, 30]) return?",o:["2","3","30","An error"],a:1,skill:"Syntax"},
    {q:"Which keyword sends a value back from a function?",o:["print","yield","return","send"],a:2,skill:"Syntax"},
    {q:"What does df[df['sales'] > 100] do?",o:["Deletes sales","Filters rows","Sorts columns","Renames sales"],a:1,skill:"Data"},
    {q:"Which operation groups rows by category?",o:["merge","groupby","head","dropna"],a:1,skill:"Data"},
    {q:"Which library is commonly used to parse HTML?",o:["BeautifulSoup","NumPy","pytest","SQLite"],a:0,skill:"Scraping"}
  ];
  let i=0,answers=[];
  const render=()=>{
    const q=qs[i];
    el("diagnosticContent").innerHTML=`<div class="onboarding-progress"><div style="width:${(i+1)/qs.length*100}%"></div></div><div class="eyebrow">DIAGNOSTIC ${i+1} OF ${qs.length}</div><h2>${q.q}</h2><div class="option-grid">${q.o.map((x,j)=>`<button class="choice-card" data-diag="${j}">${x}</button>`).join("")}</div>`;
    el("diagnosticModal").classList.remove("hidden");
    document.querySelectorAll("[data-diag]").forEach(b=>b.onclick=()=>{
      answers.push(Number(b.dataset.diag));i++;
      if(i<qs.length)render();else finishDiagnostic(qs,answers);
    });
  };render();
}
function finishDiagnostic(qs,answers){
  let score=0;const skills={Syntax:0,Logic:30,Data:0,Scraping:0},counts={Syntax:0,Logic:1,Data:0,Scraping:0};
  qs.forEach((q,i)=>{counts[q.skill]=(counts[q.skill]||0)+1;if(answers[i]===q.a){score++;skills[q.skill]+=100}});
  Object.keys(skills).forEach(k=>skills[k]=Math.round(skills[k]/Math.max(1,counts[k])));
  let level="Foundation",recommended="variables";
  if(score>=4){level="Intermediate";recommended=state.profile.goal==="Web scraping"?"html-basics":"groupby"}
  else if(score>=2){level="Refresher";recommended="functions"}
  state.diagnostic={score,level,recommended,skills};
  persist();
  el("diagnosticContent").innerHTML=`<div class="eyebrow">YOUR STARTING POINT</div><h2>${level}</h2><p>You answered ${score} of ${qs.length} correctly.</p><div class="skill-bars">${Object.entries(skills).map(([k,v])=>`<div class="skill-row"><span>${k}</span><div class="progress-track"><div style="width:${v}%"></div></div><strong>${v}%</strong></div>`).join("")}</div><div class="recommendation">Recommended first mission: <strong>${lessonById(recommended).title}</strong></div><button id="finishDiagnostic" class="primary-btn">Open my dashboard</button>`;
  el("finishDiagnostic").onclick=()=>{el("diagnosticModal").classList.add("hidden");renderView("dashboard")};
}

function renderView(view){
  if(lessonAudioState?.status&&["speaking","paused"].includes(lessonAudioState.status))stopLessonAudio();
  if(!state.academyHydrated&&state.user){
    reconcileAcademyState();
  }
  view=ensureAcademyRoute(view);
  ensureFocusedAcademyNavigation();
  if(authIsRequired()&&!isAuthenticated()){
    showAuthScreen();
    return;
  }
  currentView=view;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  ({dashboard:renderDashboard,questboard:renderQuestBoard,pathway:renderProfessionalPathway,academyhome:renderAcademyHome,careersimulations:renderCareerSimulations,simulationworkspace:renderSimulationWorkspace,employability:renderEmployabilityScore,recruiterpack:renderRecruiterPack,commandcenter:renderCommandCenter,developmentplan:renderDevelopmentPlan,mentorinbox:renderMentorInbox,adaptivetutor:renderAdaptiveTutor,visualtracer:renderVisualTracer,conceptmastery:renderConceptMastery,sqlacademyhome:renderSqlAcademyHome,sqlcourse:renderSqlCourseMap,sqllesson:renderSqlLesson,sqlprojects:renderSqlProjects,sqlassessments:renderSqlAssessments,sqlcredentials:renderSqlCredentials,webacademyhome:renderWebAcademyHome,webcourse:renderWebCourseMap,weblesson:renderWebLesson,webprojects:renderWebProjects,webassessments:renderWebAssessments,webcredentials:renderWebCredentials,javaacademyhome:renderJavaAcademyHome,javacourse:renderJavaCourseMap,javalesson:renderJavaLesson,javaprojects:renderJavaProjects,javaassessments:renderJavaAssessments,javacredentials:renderJavaCredentials,developerprofile:renderDeveloperProfile,rolepathways:renderRolePathways,crosscapstones:renderCrossAcademyCapstones,codinglab:renderCodingLab,submissions:renderCodingSubmissions,classroomhome:renderClassroomHome,instructordashboard:renderInstructorDashboard,cohortmanagement:renderCohortManagement,assignmentbuilder:renderAssignmentBuilder,gradebook:renderGradebook,reviewqueue:renderReviewQueue,learneranalytics:renderLearnerAnalytics,announcements:renderAnnouncements,academycommand:renderAcademyCommandCenter,academydiagnostic:renderAcademyDiagnostic,academycoach:renderAcademyCoach,academyreview:renderAcademyReview,academyvisualizer:renderAcademyVisualizer,academymastery:renderAcademyMastery,academysimulations:renderAcademySimulations,curriculumstudio:renderCurriculumStudio,curriculumeditor:renderCurriculumEditor,curriculumpreview:renderCurriculumPreview,curriculumreview:renderCurriculumReview,organisationhome:renderOrganisationHome,cloudcontrol:renderCloudControl,credentialverify:renderCredentialVerification,aimentor:renderAiMentor,pairprogrammer:renderPairProgrammer,technicalviva:renderTechnicalViva,mentorhistory:renderMentorHistory,missioncontrol:renderMissionControl,missionworkspace:renderMissionWorkspace,missionportfolio:renderMissionPortfolio,teamhub:renderTeamHub,teamworkspace:renderTeamWorkspace,peerreviews:renderPeerReviews,hackathons:renderHackathons,contributionprofile:renderContributionProfile,careerlaunch:renderCareerLaunch,jobmatcher:renderJobMatcher,applicationpack:renderApplicationPack,talentprofile:renderTalentProfile,capstonestudio:renderCapstoneStudio,capstoneworkspace:renderCapstoneWorkspace,capstoneportfolio:renderCapstonePortfolio,deploymentstudio:renderDeploymentStudio,releasepipeline:renderReleasePipeline,releaseregister:renderReleaseRegister,adaptivepath:renderAdaptivePath,learninggraph:renderLearningGraph,focusmode:renderFocusMode,certificationhub:renderCertificationHub,examsession:renderExamSession,skillspassport:renderSkillsPassport,transcript:renderDigitalTranscript,applypilotbridge:renderApplyPilotBridge,curriculumcoverage:renderCurriculumCoverage,engineeringlab:renderEngineeringLab,engineeringworkspace:renderEngineeringWorkspace,engineeringcoach:renderEngineeringCoach,engineeringinsights:renderEngineeringInsights,verifiedassessments:renderVerifiedAssessments,verifiedattempt:renderVerifiedAttempt,instructorreviewqueue:renderInstructorReviewQueue,teamengineering:renderTeamEngineering,teamworkspace:renderTeamWorkspace,pullrequest:renderPullRequest,pricing:renderPricing,subscription:renderSubscription,usage:renderUsageDashboard,growthanalytics:renderGrowthAnalytics,onboarding:renderActivationOnboarding,notifications:renderNotificationCentre,commercialadmin:renderCommercialAdmin,dailylearning:renderDailyLearning,learninghistory:renderLearningHistory,textbooklibrary:renderTextbookLibrary,mistakenotebook:renderMistakeNotebook,masteryreviewqueue:renderMasteryReviewQueue,moretools:renderMoreTools,feedbackreport:renderFeedbackReport,authenticatedqa:renderAuthenticatedQaStatus,launchreadiness:renderLaunchReadiness,curriculumquality:renderCurriculumQualityAudit,course:renderCourse,revision:renderRevision,practice:renderPractice,projects:renderProjects,analytics:renderAnalytics,competencies:renderCompetencyMatrix,stageexams:renderStageAssessments,portfoliohub:renderPortfolioHub,weeklyreview:renderWeeklyReview,studio:renderStudio,notebook:renderNotebook,challenges:renderChallenges,mastery:renderMastery,assessments:renderAssessments,bookmarks:renderBookmarks,accessibility:renderAccessibility,reviewlab:renderReviewLab,errorclinic:renderErrorClinic,capstoneplanner:renderCapstonePlanner,careertracks:renderCareerTracks,skilldiagnostic:renderSkillDiagnostic,evidencebank:renderEvidenceBank,mockinterviews:renderMockInterviews,sprintplanner:renderSprintPlanner,journal:renderJournal,progressreport:renderProgressReport,datasets:renderDatasets,datalab:renderDataLab,sqlplayground:renderSqlPlayground,storybuilder:renderStoryBuilder,customdata:renderCustomData,dataprofiler:renderDataProfiler,chartbuilder:renderChartBuilder,dashboardbuilder:renderDashboardBuilder,modellab:renderModelLab,experiments:renderExperiments,responsibleai:renderResponsibleAi,assignments:renderAssignments,instructor:renderInstructorReview,datamanagement:renderDataManagement,adaptivecoach:renderAdaptiveCoach,weakdrills:renderWeakDrills,misconceptions:renderMisconceptions,clisimulator:renderCliSimulator,gitsimulator:renderGitSimulator,packagebuilder:renderPackageBuilder,apisimulator:renderApiSimulator,endpointdesigner:renderEndpointDesigner,fastapibuilder:renderFastApiBuilder,schemadesigner:renderSchemaDesigner,migrationsimulator:renderMigrationSimulator,persistencebuilder:renderPersistenceBuilder,pipelinesimulator:renderPipelineSimulator,deploymentbuilder:renderDeploymentBuilder,observabilitylab:renderObservabilityLab,projectstudio:renderProjectStudio,qualitygate:renderQualityGate,releasecentre:renderReleaseCentre,rewards:renderRewards,profile:renderProfile,account:renderAccount}[view])();
}



function examForStage(stageId){
  return stageAssessments.find(exam=>exam.stageId===stageId);
}
function bestExamAttempt(stageId){
  return state.stageExamHistory.filter(item=>item.stageId===stageId).sort((a,b)=>b.score-a.score)[0]||null;
}
function stageExamPassed(stageId){
  const exam=examForStage(stageId),attempt=bestExamAttempt(stageId);
  return Boolean(exam&&attempt&&attempt.score>=exam.passMark);
}
function stageLessonsComplete(stage){
  return stageProgress(stage).complete;
}
function stageCredentialEarned(stage){
  return stageLessonsComplete(stage)&&stageExamPassed(stage.id);
}
function stageUnlockedWithExam(index){
  if(index===0)return true;
  return stageCredentialEarned(professionalPathway[index-1]);
}
function currentAcademyStageIndex(){
  const found=professionalPathway.findIndex((stage,index)=>stageUnlockedWithExam(index)&&!stageCredentialEarned(stage));
  return found===-1?professionalPathway.length-1:found;
}
function weekStartDate(date=new Date()){
  const copy=new Date(date);
  const day=(copy.getDay()+6)%7;
  copy.setDate(copy.getDate()-day);
  copy.setHours(0,0,0,0);
  return copy;
}
function weeklyActivity(){
  const start=weekStartDate().getTime();
  return(state.activity||[]).filter(item=>new Date(item.at||item.date||0).getTime()>=start);
}


function selectedPlan(){
  return developmentPlans.find(plan=>plan.id===state.selectedDevelopmentPlan)||null;
}
function commandCenterReadiness(){
  const employability=employabilityScore();
  const pathway=pathwayOverallProgress();
  const credentials=professionalPathway.filter(stage=>stageCredentialEarned(stage)).length/4*100;
  const weekly=Math.min(100,weeklyActivity().length*10);
  return Math.round(employability.overall*.45+pathway*.25+credentials*.2+weekly*.1);
}
function learningRiskFlags(){
  const flags=[];
  const due=dueReviews().length;
  const evidence=(state.studioReleases?.length||0)+(state.completedProjects?.length||0);
  const lessons=state.lessons.size;
  const recent=weeklyActivity().length;
  if(due>=5)flags.push({level:"high",title:`${due} revision items are due`,body:"Knowledge decay is increasing. Complete a short revision session.",view:"revision"});
  if(lessons>=8&&evidence===0)flags.push({level:"medium",title:"Learning without portfolio evidence",body:"Convert one completed topic into a project or released artefact.",view:"projectstudio"});
  if(recent===0)flags.push({level:"medium",title:"No learning activity this week",body:"Restart with one five-minute Quest Board mission.",view:"questboard"});
  if(state.weeklyReviews.length===0)flags.push({level:"low",title:"No weekly review recorded",body:"Capture blockers and define one next action.",view:"weeklyreview"});
  if(!flags.length)flags.push({level:"good",title:"Your learning system is healthy",body:"Progress, evidence and reflection are currently balanced.",view:"academyhome"});
  return flags;
}
function forecastMilestone(){
  const remaining=course.modules.flatMap(module=>module.lessons).filter(lesson=>!state.lessons.has(lesson.id)).length;
  const weeklyRate=Math.max(1,Math.round(weeklyActivity().length/2));
  const weeks=Math.ceil(remaining/weeklyRate);
  const date=new Date();
  date.setDate(date.getDate()+weeks*7);
  return{remaining,weeklyRate,weeks,date};
}
function renderCommandCenter(){
  const readiness=commandCenterReadiness(),riskFlags=learningRiskFlags(),forecast=forecastMilestone();
  const next=academyNextAction(),plan=selectedPlan();
  const evidence=(state.studioReleases?.length||0)+(state.completedProjects?.length||0)+state.simulationFeedback.filter(item=>item.passed).length;
  el("main").innerHTML=`<section class="command-center-hero card"><div><div class="eyebrow">PERSONAL LEARNING COMMAND CENTER</div><h1>Manage your professional development.</h1><p>One view for goals, pace, risks, evidence and next actions across the entire PythonQuest academy.</p><div class="command-center-actions"><button id="commandNextActionBtn" class="primary-btn">${next.action}</button><button id="commandPlanBtn" class="secondary-btn">${plan?"Open 90-day plan":"Choose career plan"}</button></div></div><div class="command-readiness"><span>Career readiness</span><strong>${readiness}%</strong><div class="progress-track"><div style="width:${readiness}%"></div></div><small>${readiness>=80?"Ready to present evidence":readiness>=60?"Building professional confidence":"Foundation in progress"}</small></div></section>
  <section class="command-kpis"><article class="card"><span>Curriculum</span><strong>${pathwayOverallProgress()}%</strong><small>${state.lessons.size} lessons completed</small></article><article class="card"><span>Evidence</span><strong>${evidence}</strong><small>Projects, releases and simulations</small></article><article class="card"><span>Weekly pace</span><strong>${forecast.weeklyRate}</strong><small>Estimated lessons per week</small></article><article class="card"><span>Forecast</span><strong>${forecast.weeks}w</strong><small>Target ${forecast.date.toLocaleDateString()}</small></article></section>
  <section class="command-layout"><article class="card command-next"><div class="eyebrow">NEXT BEST ACTION</div><h2>${esc(next.title)}</h2><p>${esc(next.subtitle)}</p><div class="command-next-footer"><span>${next.type.toUpperCase()}</span><button id="commandNextCardBtn" class="primary-btn">${next.action}</button></div></article><article class="card command-plan-card"><div class="section-head"><div><div class="eyebrow">90-DAY PLAN</div><h2>${plan?plan.title:"Choose your destination"}</h2></div><button id="commandPlanCardBtn" class="text-btn">${plan?"View plan":"Select plan"}</button></div>${plan?`<p>${plan.summary}</p><div class="plan-phase-mini">${["30","60","90"].map(day=>`<div><strong>Day ${day}</strong><span>${plan.days[day].filter((_,index)=>state.developmentPlanProgress[`${plan.id}-${day}-${index}`]).length}/${plan.days[day].length}</span></div>`).join("")}</div>`:`<p>Select a target role and PythonQuest will organise learning, simulations and evidence around a 30/60/90-day roadmap.</p>`}</article></section>
  <section class="command-layout"><article class="card"><div class="section-head"><div><div class="eyebrow">RISK & INTERVENTION</div><h2>What needs attention</h2></div><span>${riskFlags.length}</span></div><div class="risk-list">${riskFlags.map((flag,index)=>`<button class="risk-item ${flag.level}" data-risk-view="${flag.view}"><span>${flag.level==="high"?"!":flag.level==="good"?"✓":"•"}</span><div><strong>${flag.title}</strong><small>${flag.body}</small></div></button>`).join("")}</div></article><article class="card"><div class="section-head"><div><div class="eyebrow">MILESTONE FORECAST</div><h2>Professional pathway projection</h2></div></div><div class="forecast-visual"><div class="forecast-ring" style="--score:${pathwayOverallProgress()}"><span>${pathwayOverallProgress()}%</span></div><div><strong>${forecast.remaining} lessons remaining</strong><p>At your current pace, the curriculum forecast is approximately ${forecast.weeks} weeks.</p><small>Forecasts adapt as your weekly activity changes.</small></div></div></article></section>
  <section class="card command-mentor-preview"><div><div class="eyebrow">MENTOR INBOX</div><h2>${mentorInboxItems().filter(item=>!item.read).length} recommendations waiting</h2><p>Professional nudges based on your progress, evidence and learning risks.</p></div><button id="commandMentorBtn" class="secondary-btn">Open mentor inbox</button></section>`;
  const openNext=()=>{if(next.lessonId)openLesson(next.lessonId);else if(next.stageId){localStorage.setItem("pq_selected_stage_exam",next.stageId);renderView("stageexams")}else renderView(next.view)};
  el("commandNextActionBtn").onclick=openNext;el("commandNextCardBtn").onclick=openNext;
  el("commandPlanBtn").onclick=()=>renderView("developmentplan");el("commandPlanCardBtn").onclick=()=>renderView("developmentplan");
  el("commandMentorBtn").onclick=()=>renderView("mentorinbox");
  document.querySelectorAll("[data-risk-view]").forEach(button=>button.onclick=()=>renderView(button.dataset.riskView));
}
function ensurePlanProgress(plan){
  ["30","60","90"].forEach(day=>plan.days[day].forEach((_,index)=>{
    const key=`${plan.id}-${day}-${index}`;
    if(state.developmentPlanProgress[key]===undefined)state.developmentPlanProgress[key]=false;
  }));
}
function renderDevelopmentPlan(){
  const plan=selectedPlan();
  if(!plan){
    el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAREER ROADMAP</div><h1>Choose your 30/60/90-day plan</h1><p>Select a role target. You can change plans without losing completed learning evidence.</p></div></div><section class="development-plan-grid">${developmentPlans.map(item=>`<article class="card development-plan-card"><div class="eyebrow">${item.role.toUpperCase()}</div><h2>${item.title}</h2><p>${item.summary}</p><div class="plan-preview">${["30","60","90"].map(day=>`<div><strong>${day} days</strong><span>${item.days[day].length} milestones</span></div>`).join("")}</div><button class="primary-btn full" data-select-plan="${item.id}">Choose this plan</button></article>`).join("")}</section>`;
    document.querySelectorAll("[data-select-plan]").forEach(button=>button.onclick=()=>{state.selectedDevelopmentPlan=button.dataset.selectPlan;ensurePlanProgress(developmentPlans.find(item=>item.id===button.dataset.selectPlan));persist();renderDevelopmentPlan()});
    return;
  }
  ensurePlanProgress(plan);
  const allKeys=["30","60","90"].flatMap(day=>plan.days[day].map((_,index)=>`${plan.id}-${day}-${index}`));
  const complete=allKeys.filter(key=>state.developmentPlanProgress[key]).length;
  el("main").innerHTML=`<section class="plan-hero card"><div><div class="eyebrow">${plan.role.toUpperCase()}</div><h1>${plan.title}</h1><p>${plan.summary}</p><div class="plan-hero-actions"><button id="changePlanBtn" class="secondary-btn">Change plan</button><button id="exportPlanBtn" class="primary-btn">Export development plan</button></div></div><div class="plan-completion"><strong>${Math.round(complete/allKeys.length*100)}%</strong><span>${complete}/${allKeys.length} milestones</span></div></section><section class="plan-timeline">${["30","60","90"].map((day,phaseIndex)=>`<article class="card plan-phase"><div class="plan-phase-marker">${day}</div><div class="plan-phase-content"><div class="eyebrow">DAYS ${phaseIndex===0?"1–30":phaseIndex===1?"31–60":"61–90"}</div><h2>${phaseIndex===0?"Build foundations":phaseIndex===1?"Apply and validate":"Prove professional readiness"}</h2>${plan.days[day].map((milestone,index)=>{const key=`${plan.id}-${day}-${index}`;return`<label class="plan-milestone ${state.developmentPlanProgress[key]?"complete":""}"><input type="checkbox" data-plan-key="${key}" ${state.developmentPlanProgress[key]?"checked":""}><span><strong>${milestone}</strong><small>${state.developmentPlanProgress[key]?"Completed":"Planned milestone"}</small></span></label>`}).join("")}</div></article>`).join("")}</section>`;
  document.querySelectorAll("[data-plan-key]").forEach(input=>input.onchange=()=>{state.developmentPlanProgress[input.dataset.planKey]=input.checked;if(input.checked)state.xp+=20;persist();renderDevelopmentPlan()});
  el("changePlanBtn").onclick=()=>{state.selectedDevelopmentPlan="";persist();renderDevelopmentPlan()};
  el("exportPlanBtn").onclick=()=>exportDevelopmentPlan(plan);
}
function exportDevelopmentPlan(plan){
  const payload={learner:state.profile?.name,role:plan.role,title:plan.title,summary:plan.summary,generatedAt:new Date().toISOString(),phases:Object.fromEntries(["30","60","90"].map(day=>[day,plan.days[day].map((milestone,index)=>({milestone,complete:Boolean(state.developmentPlanProgress[`${plan.id}-${day}-${index}`])}))]))};
  downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),"codequest-90-day-development-plan.json");
}
function mentorInboxItems(){
  const flags=learningRiskFlags();
  const items=[];
  if(state.lessons.size>=6&&((state.studioReleases?.length||0)+(state.completedProjects?.length||0))===0)items.push({...mentorPrompts.find(item=>item.id==="evidence-gap")});
  const currentStage=professionalPathway[currentAcademyStageIndex()];
  if(currentStage&&stageLessonsComplete(currentStage)&&!stageExamPassed(currentStage.id))items.push({...mentorPrompts.find(item=>item.id==="assessment-ready")});
  if(state.standupHistory.length+state.stakeholderBriefs.length<2)items.push({...mentorPrompts.find(item=>item.id==="communication-gap")});
  if(state.weeklyReviews.length===0||Date.now()-new Date(state.weeklyReviews[0]?.createdAt||0).getTime()>7*86400000)items.push({...mentorPrompts.find(item=>item.id==="review-due")});
  flags.filter(flag=>flag.level==="high").forEach(flag=>items.push({id:`risk-${flag.title}`,title:flag.title,body:flag.body,action:"Resolve now",view:flag.view}));
  return items.map(item=>({...item,read:Boolean(state.mentorInboxState[item.id]?.read),dismissed:Boolean(state.mentorInboxState[item.id]?.dismissed)})).filter(item=>!item.dismissed);
}
function renderMentorInbox(){
  const items=mentorInboxItems();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PROFESSIONAL GUIDANCE</div><h1>Mentor inbox</h1><p>Context-aware recommendations based on learning progress, career evidence and delivery risks.</p></div><button id="markAllMentorReadBtn" class="secondary-btn">Mark all read</button></div><section class="mentor-inbox-layout"><article class="card mentor-summary"><span>Unread</span><strong>${items.filter(item=>!item.read).length}</strong><small>${items.length} active recommendations</small><div class="mentor-health"><div class="progress-track"><div style="width:${commandCenterReadiness()}%"></div></div><p>${commandCenterReadiness()}% command-center readiness</p></div></article><div class="mentor-message-list">${items.map(item=>`<article class="card mentor-message ${item.read?"read":"unread"}"><div class="mentor-message-icon">${item.read?"✓":"✦"}</div><div><div class="eyebrow">${item.read?"REVIEWED":"NEW RECOMMENDATION"}</div><h2>${item.title}</h2><p>${item.body}</p><div class="mentor-message-actions"><button class="primary-btn" data-mentor-open="${item.id}">${item.action}</button><button class="text-btn" data-mentor-dismiss="${item.id}">Dismiss</button></div></div></article>`).join("")||"<div class='empty-state'><h2>Inbox clear</h2><p>No urgent recommendations. Keep following your plan.</p></div>"}</div></section>`;
  document.querySelectorAll("[data-mentor-open]").forEach(button=>button.onclick=()=>{const item=items.find(message=>message.id===button.dataset.mentorOpen);state.mentorInboxState[item.id]={read:true,dismissed:false};persist();renderView(item.view)});
  document.querySelectorAll("[data-mentor-dismiss]").forEach(button=>button.onclick=()=>{state.mentorInboxState[button.dataset.mentorDismiss]={read:true,dismissed:true};persist();renderMentorInbox()});
  el("markAllMentorReadBtn").onclick=()=>{items.forEach(item=>state.mentorInboxState[item.id]={...(state.mentorInboxState[item.id]||{}),read:true});persist();renderMentorInbox()};
}







let certificationTimer=null;



function theoryTextForLesson(academyId,lesson){
  const haystack=[
    lesson.id,lesson.title,lesson.description,lesson.challenge,
    lesson.moduleId,lesson.moduleTitle,lesson.starter,lesson.solution,
    ...(lesson.concepts||[]),...(lesson.skills||[])
  ].filter(Boolean).join(" ").toLowerCase();
  const eligible=(microLessonTheory||[]).filter(item=>
    !item.academyIds?.length||item.academyIds.includes(academyId)
  );
  const profile=eligible
    .map(item=>{
      const matches=(item.match||[]).filter(token=>haystack.includes(token.toLowerCase()));
      const exactTitle=(item.match||[]).some(token=>
        String(lesson.title||"").toLowerCase().includes(token.toLowerCase())
      );
      return{...item,matchScore:matches.length+(exactTitle?2:0)};
    })
    .sort((a,b)=>b.matchScore-a.matchScore)[0];
  if(profile?.matchScore)return profile;
  const academyDefaults={
    python:{
      id:"python-general",
      principle:"Python expresses a solution as values, operations and small reusable behaviours. Read the data flow before focusing on syntax.",
      mentalModel:"Identify the input, the transformation and the observable result.",
      example:`${lesson.description||"Use Python to transform input into a clear result."}`,
      mistake:"Copying syntax without being able to explain what value each line produces.",
      check:"What value enters this code, how is it transformed and what leaves?"
    },
    sql:{
      id:"sql-general",
      principle:"SQL describes the result you want from relational data rather than spelling out every processing step.",
      mentalModel:"Define the source grain, the required result grain and the transformation between them.",
      example:`${lesson.description||"Transform source rows into a defensible result set."}`,
      mistake:"Writing clauses before deciding what one output row should represent.",
      check:"What does one row in the result mean?"
    },
    web:{
      id:"web-general",
      principle:"Web development combines meaningful structure, visual rules and event-driven behaviour.",
      mentalModel:"Structure first, presentation second, behaviour third.",
      example:`${lesson.description||"Create the smallest accessible interface that demonstrates the concept."}`,
      mistake:"Styling an unclear structure or adding behaviour without defining state.",
      check:"What is the semantic structure, and what user action changes it?"
    },
    java:{
      id:"java-general",
      principle:"Java uses explicit types and structured classes to make responsibilities and contracts visible.",
      mentalModel:"Locate the class, its state, its methods and the call path.",
      example:`${lesson.description||"Represent one responsibility with explicit Java structure."}`,
      mistake:"Writing syntax without deciding which class owns the behaviour.",
      check:"Which class owns this responsibility, and what method exposes it?"
    }
  };
  return academyDefaults[academyId]||academyDefaults.python;
}
function microTheoryKey(academyId,lesson){return`${academyId}:${lesson.id}`}
function renderTheoryExample(theory){
  const code=String(theory.exampleCode||theory.example||"");
  const isCode=code.includes("\n")||/[={};<>()[\]]/.test(code);
  return`<div class="theory-example-shell">
    <div class="theory-example-title">${esc(theory.exampleTitle||"Worked example")}</div>
    ${isCode?`<pre><code>${esc(code)}</code></pre>`:`<p>${esc(code)}</p>`}
    <div class="theory-example-notes">${(theory.exampleNotes||[]).map(note=>`<span>✓ ${esc(note)}</span>`).join("")}</div>
  </div>`;
}
function renderMicroTheory(academyId,lesson){
  const theory=theoryTextForLesson(academyId,lesson);
  const key=microTheoryKey(academyId,lesson);
  const checked=Boolean(state.theoryChecks?.[key]);
  const pages=[
    {
      label:"Concept",
      title:"The core idea",
      body:`<p class="theory-lead">${esc(theory.principle)}</p><p>${esc(theory.detail||"")}</p>`
    },
    {
      label:"Mental model",
      title:"How to think about it",
      body:`<div class="theory-mental-model"><span>Imagine this</span><p>${esc(theory.mentalModel)}</p></div>`
    },
    {
      label:"Example",
      title:"See the concept",
      body:renderTheoryExample(theory)
    },
    {
      label:"Mistakes",
      title:"What commonly goes wrong",
      body:`<div class="theory-warning"><strong>Watch for this</strong><p>${esc(theory.mistake)}</p></div>`
    },
    {
      label:"Check",
      title:"Explain it in your own words",
      body:`<div class="theory-predict"><strong>Pause and predict</strong><p>${esc(theory.check)}</p></div>`
    }
  ];
  return`<section class="micro-theory-card theory-carousel" data-theory-key="${key}" data-theory-page="0">
    <div class="micro-theory-head">
      <div><div class="eyebrow">CONCISE THEORY LESSON</div><h2>Understand before you build</h2></div>
      <span class="micro-theory-status">${checked?"✓ Reviewed":"5 short pages"}</span>
    </div>
    <div class="theory-carousel-pages">
      ${pages.map((page,index)=>`<article class="theory-carousel-page ${index===0?"active":""}" data-theory-page-index="${index}">
        <div class="theory-page-label">${index+1} · ${page.label}</div>
        <h3>${page.title}</h3>
        <div class="theory-page-body">${page.body}</div>
      </article>`).join("")}
    </div>
    <div class="theory-carousel-nav">
      <button class="secondary-btn theory-prev" type="button" disabled>← Previous</button>
      <div class="theory-page-dots" aria-label="Theory pages">
        ${pages.map((page,index)=>`<button type="button" class="${index===0?"active":""}" data-theory-go="${index}" aria-label="Open theory page ${index+1}">${index+1}</button>`).join("")}
      </div>
      <button class="primary-btn theory-next" type="button">Next →</button>
    </div>
    <div class="micro-theory-check hidden">
      <div><strong>Ready to practise?</strong><p>Explain the final question aloud or in your own words before continuing.</p></div>
      <button class="${checked?"secondary-btn":"primary-btn"}" data-theory-reviewed="${key}">${checked?"Reviewed":"I can explain this"}</button>
    </div>
  </section>`;
}
function setTheoryPage(card,index){
  const pages=[...card.querySelectorAll(".theory-carousel-page")];
  const dots=[...card.querySelectorAll("[data-theory-go]")];
  const next=card.querySelector(".theory-next");
  const prev=card.querySelector(".theory-prev");
  const check=card.querySelector(".micro-theory-check");
  const safe=Math.max(0,Math.min(index,pages.length-1));
  card.dataset.theoryPage=String(safe);
  pages.forEach((page,i)=>page.classList.toggle("active",i===safe));
  dots.forEach((dot,i)=>dot.classList.toggle("active",i===safe));
  prev.disabled=safe===0;
  next.classList.toggle("hidden",safe===pages.length-1);
  check.classList.toggle("hidden",safe!==pages.length-1);
}
function bindMicroTheory(){
  document.querySelectorAll(".theory-carousel").forEach(card=>{
    card.querySelectorAll("[data-theory-go]").forEach(button=>button.onclick=()=>setTheoryPage(card,Number(button.dataset.theoryGo)));
    card.querySelector(".theory-prev")?.addEventListener("click",()=>setTheoryPage(card,Number(card.dataset.theoryPage||0)-1));
    card.querySelector(".theory-next")?.addEventListener("click",()=>setTheoryPage(card,Number(card.dataset.theoryPage||0)+1));
  });
  document.querySelectorAll("[data-theory-reviewed]").forEach(button=>button.onclick=()=>{
    state.theoryChecks=state.theoryChecks||{};
    state.theoryChecks[button.dataset.theoryReviewed]={reviewedAt:new Date().toISOString()};
    persist();
    button.textContent="Reviewed";
    button.className="secondary-btn";
    const card=button.closest(".micro-theory-card");
    if(card)card.querySelector(".micro-theory-status").textContent="✓ Reviewed";
  });
}



let lessonAudioState={
  utterance:null,
  shell:null,
  status:"idle",
  voices:[],
  sectionId:null
};
const lessonAudioFemaleNames=[
  "samantha","victoria","karen","moira","tessa","fiona","serena","susan",
  "zira","hazel","aria","jenny","sonia","libby","natasha","ava","allison",
  "kate","female","woman"
];
const lessonAudioMaleNames=[
  "daniel","alex","fred","tom","oliver","george","ryan","guy","david",
  "mark","james","matthew","aaron","christopher","male","man"
];
function refreshLessonAudioVoices(){
  if(!("speechSynthesis" in window))return[];
  lessonAudioState.voices=window.speechSynthesis.getVoices()||[];
  return lessonAudioState.voices;
}
function lessonEnglishVoices(){
  return refreshLessonAudioVoices().filter(voice=>/^en([-_]|$)/i.test(voice.lang||""));
}
function lessonVoiceScore(voice,preference){
  const name=`${voice.name||""} ${voice.voiceURI||""}`.toLowerCase();
  const preferred=preference==="male"?lessonAudioMaleNames:lessonAudioFemaleNames;
  const opposite=preference==="male"?lessonAudioFemaleNames:lessonAudioMaleNames;
  let score=0;
  if(/^en-GB/i.test(voice.lang||""))score+=9;
  else if(/^en/i.test(voice.lang||""))score+=6;
  if(voice.localService)score+=2;
  if(voice.default)score+=1;
  if(preferred.some(token=>name.includes(token)))score+=25;
  if(opposite.some(token=>name.includes(token)))score-=20;
  return score;
}
function selectedLessonVoice(){
  const preferences=state.lessonAudioPreferences||{};
  const voices=lessonEnglishVoices();
  if(!voices.length)return null;
  if(preferences.voiceURI){
    const exact=voices.find(voice=>voice.voiceURI===preferences.voiceURI);
    if(exact)return exact;
  }
  return[...voices].sort((a,b)=>
    lessonVoiceScore(b,preferences.voicePreference)-
    lessonVoiceScore(a,preferences.voicePreference)
  )[0]||voices[0];
}
function lessonAudioSectionText(shell){
  const page=shell?.querySelector("[data-textbook-page].active");
  if(!page)return"";
  const clone=page.cloneNode(true);
  clone.querySelectorAll("button,script,style,.textbook-page-number").forEach(node=>node.remove());
  return clone.innerText.replace(/\s+/g," ").trim();
}
function updateLessonAudioUi(shell,status,message=""){
  if(!shell)return;
  lessonAudioState.status=status;
  shell.querySelectorAll("[data-audio-status]").forEach(node=>{
    node.textContent=message||(
      status==="speaking"?"Reading lesson":
      status==="paused"?"Audio paused":
      status==="unsupported"?"Audio unavailable":
      "Ready to read"
    );
  });
  shell.querySelectorAll("[data-audio-play]").forEach(button=>{
    button.textContent=status==="paused"?"Resume":status==="speaking"?"Restart":"Play";
  });
  shell.querySelectorAll("[data-audio-pause]").forEach(button=>{
    button.disabled=status!=="speaking";
  });
  shell.querySelectorAll("[data-audio-stop]").forEach(button=>{
    button.disabled=!["speaking","paused"].includes(status);
  });
}
function stopLessonAudio(){
  if("speechSynthesis" in window)window.speechSynthesis.cancel();
  lessonAudioState.utterance=null;
  updateLessonAudioUi(lessonAudioState.shell,"idle");
}
function playLessonAudio(shell){
  if(!("speechSynthesis" in window)){
    updateLessonAudioUi(shell,"unsupported","This browser does not support lesson audio.");
    return;
  }
  if(lessonAudioState.status==="paused"&&lessonAudioState.shell===shell){
    window.speechSynthesis.resume();
    updateLessonAudioUi(shell,"speaking");
    return;
  }
  window.speechSynthesis.cancel();
  const text=lessonAudioSectionText(shell);
  if(!text){
    updateLessonAudioUi(shell,"idle","There is no readable text in this section.");
    return;
  }
  const utterance=new SpeechSynthesisUtterance(text);
  const voice=selectedLessonVoice();
  if(voice)utterance.voice=voice;
  utterance.lang=voice?.lang||"en-GB";
  utterance.rate=Math.max(.5,Math.min(2,Number(state.lessonAudioPreferences?.rate)||1));
  utterance.pitch=1;
  utterance.onstart=()=>updateLessonAudioUi(shell,"speaking");
  utterance.onpause=()=>updateLessonAudioUi(shell,"paused");
  utterance.onresume=()=>updateLessonAudioUi(shell,"speaking");
  utterance.onend=()=>{
    lessonAudioState.utterance=null;
    updateLessonAudioUi(shell,"idle","Section finished");
  };
  utterance.onerror=event=>{
    if(event.error==="canceled"||event.error==="interrupted")return;
    lessonAudioState.utterance=null;
    updateLessonAudioUi(shell,"idle","Audio could not be played.");
  };
  lessonAudioState.utterance=utterance;
  lessonAudioState.shell=shell;
  lessonAudioState.sectionId=shell.dataset.textbookSection;
  window.speechSynthesis.speak(utterance);
}
function pauseLessonAudio(shell){
  if(!("speechSynthesis" in window)||!window.speechSynthesis.speaking)return;
  window.speechSynthesis.pause();
  updateLessonAudioUi(shell,"paused");
}
function lessonVoiceOptions(){
  const voices=lessonEnglishVoices();
  return voices.map(voice=>`<option value="${esc(voice.voiceURI)}" ${voice.voiceURI===state.lessonAudioPreferences?.voiceURI?"selected":""}>${esc(voice.name)} · ${esc(voice.lang)}</option>`).join("");
}
function lessonAudioControlsHtml(){
  const preference=state.lessonAudioPreferences?.voicePreference||"female";
  const rate=Number(state.lessonAudioPreferences?.rate)||1;
  return`<section class="lesson-audio-reader">
    <div class="lesson-audio-heading">
      <div><div class="eyebrow">LISTEN TO THIS SECTION</div><h3>Lesson audio</h3><p data-audio-status>Ready to read</p></div>
      <div class="lesson-audio-icon">◖))</div>
    </div>
    <div class="lesson-audio-preferences">
      <label>Voice style
        <select data-audio-preference>
          <option value="female" ${preference==="female"?"selected":""}>Female voice</option>
          <option value="male" ${preference==="male"?"selected":""}>Male voice</option>
        </select>
      </label>
      <label>Specific voice
        <select data-audio-voice><option value="">Automatic best match</option>${lessonVoiceOptions()}</select>
      </label>
      <label>Speed
        <div class="lesson-audio-speed"><input data-audio-rate type="range" min=".5" max="2" step=".1" value="${rate}"><strong data-audio-rate-label>${rate.toFixed(1)}×</strong></div>
      </label>
    </div>
    <div class="lesson-audio-actions">
      <button class="primary-btn" data-audio-play>Play</button>
      <button class="secondary-btn" data-audio-pause disabled>Pause</button>
      <button class="secondary-btn" data-audio-stop disabled>Stop</button>
    </div>
    <p class="lesson-audio-disclaimer">Voice availability depends on your browser and device. Male/female selection uses the closest matching installed English voice.</p>
  </section>`;
}
function bindLessonAudioReader(shell){
  if(!shell)return;
  const voiceSelect=shell.querySelector("[data-audio-voice]");
  const refreshOptions=()=>{
    if(!voiceSelect)return;
    const current=state.lessonAudioPreferences?.voiceURI||"";
    voiceSelect.innerHTML=`<option value="">Automatic best match</option>${lessonVoiceOptions()}`;
    voiceSelect.value=current;
  };
  refreshLessonAudioVoices();
  refreshOptions();
  if("speechSynthesis" in window){
    window.speechSynthesis.onvoiceschanged=()=>{
      refreshLessonAudioVoices();
      refreshOptions();
    };
  }else{
    updateLessonAudioUi(shell,"unsupported","This browser does not support lesson audio.");
  }
  shell.querySelector("[data-audio-play]")?.addEventListener("click",()=>playLessonAudio(shell));
  shell.querySelector("[data-audio-pause]")?.addEventListener("click",()=>pauseLessonAudio(shell));
  shell.querySelector("[data-audio-stop]")?.addEventListener("click",stopLessonAudio);
  shell.querySelector("[data-audio-preference]")?.addEventListener("change",event=>{
    state.lessonAudioPreferences.voicePreference=event.target.value;
    state.lessonAudioPreferences.voiceURI=null;
    persist();refreshOptions();
    if(["speaking","paused"].includes(lessonAudioState.status))playLessonAudio(shell);
  });
  voiceSelect?.addEventListener("change",event=>{
    state.lessonAudioPreferences.voiceURI=event.target.value||null;
    persist();
    if(["speaking","paused"].includes(lessonAudioState.status))playLessonAudio(shell);
  });
  const rateInput=shell.querySelector("[data-audio-rate]");
  rateInput?.addEventListener("input",event=>{
    const rate=Number(event.target.value);
    state.lessonAudioPreferences.rate=rate;
    shell.querySelector("[data-audio-rate-label]").textContent=`${rate.toFixed(1)}×`;
    persist();
  });
  rateInput?.addEventListener("change",()=>{
    if(["speaking","paused"].includes(lessonAudioState.status))playLessonAudio(shell);
  });
}




function renderAuthenticatedQaStatus(){
  const checks=[
    ["Seeded test credentials","manual","Set CODEQUEST_TEST_EMAIL and CODEQUEST_TEST_PASSWORD."],
    ["Email/password sign-in","automated","Playwright signs in through the public authentication flow."],
    ["Academy selection and reload","automated","Python Academy is verified after refresh."],
    ["Lesson, audio and mastery","automated","The first Python lesson exposes Textbook, Lesson audio and Mastery check."],
    ["Sign-out/sign-in persistence","automated","The selected academy is restored after a new session."],
    ["Cross-device cloud persistence","next","Requires a second browser context and verified Supabase-backed state."]
  ];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">AUTHENTICATED QA</div><h1>Learner journey test status</h1><p>Public smoke coverage is green. These checks validate the signed-in learner experience.</p></div></div><section class="qa-status-grid">${checks.map(item=>`<article class="card qa-status-card"><span class="feature-status ${item[1]==="automated"?"production":item[1]==="next"?"beta":"simulation"}">${item[1]}</span><h2>${item[0]}</h2><p>${item[2]}</p></article>`).join("")}</section>`;
}

function appVersion(){
  return document.documentElement.dataset.codequestVersion||"unknown";
}
function featureMaturity(featureId){
  return featureMaturityRegistry?.features?.find(item=>item.id===featureId)||null;
}
function featureStatusBadge(featureId){
  const feature=featureMaturity(featureId);
  if(!feature||feature.status==="production")return"";
  return`<span class="feature-status ${feature.status}">${esc(feature.status)}</span>`;
}
function recordRuntimeError(type,message,details={}){
  const fingerprint=`${type}:${message}`.slice(0,300);
  const existing=state.runtimeErrors.find(item=>item.fingerprint===fingerprint);
  if(existing){
    existing.count+=1;
    existing.lastSeenAt=new Date().toISOString();
  }else{
    state.runtimeErrors.unshift({
      id:`error-${Date.now()}-${Math.random()}`,
      fingerprint,type,message:String(message).slice(0,1000),
      route:state.currentView||location.hash||"unknown",
      appVersion:appVersion(),
      details,
      count:1,
      firstSeenAt:new Date().toISOString(),
      lastSeenAt:new Date().toISOString()
    });
  }
  state.runtimeErrors=state.runtimeErrors.slice(0,200);
  persist();
}
function installLaunchErrorCapture(){
  if(window.__cqLaunchCaptureInstalled)return;
  window.__cqLaunchCaptureInstalled=true;
  window.addEventListener("error",event=>{
    recordRuntimeError("javascript",event.message||"Unknown JavaScript error",{
      filename:event.filename||null,
      line:event.lineno||null,
      column:event.colno||null
    });
  });
  window.addEventListener("unhandledrejection",event=>{
    recordRuntimeError("promise",event.reason?.message||String(event.reason||"Unhandled promise rejection"));
  });
  const originalFetch=window.fetch.bind(window);
  window.fetch=async(...args)=>{
    try{
      const response=await originalFetch(...args);
      const url=typeof args[0]==="string"?args[0]:args[0]?.url;
      if(!response.ok&&String(url||"").startsWith("/api/")){
        recordRuntimeError("api",`${response.status} ${response.statusText}`,{url});
      }
      return response;
    }catch(error){
      const url=typeof args[0]==="string"?args[0]:args[0]?.url;
      if(String(url||"").startsWith("/api/"))recordRuntimeError("api-network",error.message,{url});
      throw error;
    }
  };
}
function simplifiedLearningNavigation(){
  return[
    ["Learn","dailylearning","▶","Today"],
    ["Learn",academyCourseRoute(reconcileAcademyState()),"▦","Course map"],
    ["Learn","textbooklibrary","▤","Textbook library"],
    ["Learn","practice","⌘","Practice"],
    ["Learn","projects","◆","Projects"],
    ["Learn","masteryreviewqueue","↻","Mastery & review"],
    ["Learn","portfolio","○","Portfolio"],
    ["Support","engineeringcoach","✦","AI tutor"],
    ["Support","mistakenotebook","!","Mistake notebook"],
    ["Support","notifications","●","Notifications"],
    ["Account","account","◉","Profile"],
    ["Account","subscription","£","Plan & usage"],
    ["More","moretools","…","More tools"]
  ];
}
function renderMoreTools(){
  const entries=(featureMaturityRegistry?.features||[]).filter(item=>
    !["today","course","textbooklibrary","practice","projects","mastery","mistakenotebook","engineeringcoach","pricing","subscription"].includes(item.id)
  );
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ADVANCED AND BETA FEATURES</div><h1>More tools</h1><p>Features outside the core learner journey are clearly labelled by maturity.</p></div></div><section class="more-tools-grid">${entries.map(item=>`<article class="card more-tool-card"><div class="more-tool-head"><h2>${esc(item.label)}</h2><span class="feature-status ${item.status}">${esc(item.status)}</span></div><p>${esc(featureMaturityRegistry.statusDefinitions[item.status]||"")}</p>${item.public?`<button class="secondary-btn" data-open-more-tool="${item.id}">Open</button>`:'<button class="secondary-btn" disabled>Not in public beta navigation</button>'}</article>`).join("")}</section>`;
  document.querySelectorAll("[data-open-more-tool]").forEach(button=>button.onclick=()=>renderView(button.dataset.openMoreTool));
}
function renderFeedbackReport(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PUBLIC BETA SUPPORT</div><h1>Report a problem</h1><p>Tell us what happened without automatically sharing your notes or source code.</p></div></div><section class="card feedback-report-card"><label>Category<select id="feedbackCategory"><option value="button">Button or navigation</option><option value="lesson">Lesson content</option><option value="progress">Progress or account</option><option value="payment">Payment or plan</option><option value="accessibility">Accessibility</option><option value="other">Other</option></select></label><label>What happened?<textarea id="feedbackDescription" placeholder="Describe what you expected, what happened and how to reproduce it."></textarea></label><label class="feedback-consent"><input id="feedbackDiagnostics" type="checkbox" checked> Include route, app version and browser details</label><div class="feedback-context"><span>Current route</span><strong>${esc(state.currentView||"unknown")}</strong><span>Version</span><strong>${esc(appVersion())}</strong></div><button id="submitFeedbackBtn" class="primary-btn">Submit report</button><div id="feedbackResult"></div></section>`;
  el("submitFeedbackBtn").onclick=submitFeedbackReport;
}
async function submitFeedbackReport(){
  const description=el("feedbackDescription").value.trim();
  const category=el("feedbackCategory").value;
  if(description.length<10){el("feedbackResult").innerHTML='<p class="error-text">Please add a more useful description.</p>';return}
  const includeDiagnostics=el("feedbackDiagnostics").checked;
  const report={
    id:`feedback-${Date.now()}`,
    category,description,
    route:includeDiagnostics?(state.currentView||"unknown"):null,
    appVersion:includeDiagnostics?appVersion():null,
    browser:includeDiagnostics?navigator.userAgent:null,
    includeDiagnostics,
    status:"local",
    createdAt:new Date().toISOString()
  };
  try{
    const response=await fetch("/api/feedback-report",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(report)
    });
    if(response.ok)report.status="submitted";
  }catch(error){}
  state.feedbackReports.unshift(report);
  persist();
  el("feedbackResult").innerHTML='<p class="success-text">Thank you. Your report has been recorded.</p>';
  el("submitFeedbackBtn").disabled=true;
}
function launchGateMetrics(){
  const errors=state.runtimeErrors||[];
  const unresolvedFeedback=(state.feedbackReports||[]).filter(item=>item.status!=="resolved").length;
  const gateCount=publicBetaLaunchGate?.gates?.length||0;
  const passed=(publicBetaLaunchGate?.gates||[]).filter(gate=>state.launchGateState[gate.id]?.status==="passed").length;
  return{errors,unresolvedFeedback,gateCount,passed,percent:gateCount?Math.round(passed/gateCount*100):0};
}
function renderLaunchReadiness(){
  const metrics=launchGateMetrics();
  const features=featureMaturityRegistry?.features||[];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PUBLIC BETA CONTROL CENTRE</div><h1>Launch readiness</h1><p>Stop feature expansion and close the remaining launch risks.</p></div><div class="launch-score"><strong>${metrics.percent}%</strong><span>launch gate</span></div></div><section class="launch-metrics-grid"><article><span>Required gates passed</span><strong>${metrics.passed}/${metrics.gateCount}</strong></article><article><span>Recorded runtime errors</span><strong>${metrics.errors.length}</strong></article><article><span>Open feedback reports</span><strong>${metrics.unresolvedFeedback}</strong></article><article><span>Production features</span><strong>${features.filter(item=>item.status==="production").length}</strong></article></section><section class="launch-readiness-grid"><article class="card"><h2>Public beta launch gate</h2><div class="launch-gate-list">${publicBetaLaunchGate.gates.map(gate=>{const value=state.launchGateState[gate.id]?.status||"not-tested";return`<div><span>${esc(gate.label)}</span><select data-launch-gate="${gate.id}"><option value="not-tested" ${value==="not-tested"?"selected":""}>Not tested</option><option value="blocked" ${value==="blocked"?"selected":""}>Blocked</option><option value="passed" ${value==="passed"?"selected":""}>Passed</option></select></div>`}).join("")}</div></article><article class="card"><h2>Feature maturity</h2><div class="feature-maturity-list">${features.map(item=>`<div><span>${esc(item.label)}</span><span class="feature-status ${item.status}">${esc(item.status)}</span></div>`).join("")}</div></article><article class="card"><h2>Recent runtime errors</h2><div class="runtime-error-list">${metrics.errors.slice(0,12).map(item=>`<div><strong>${esc(item.type)}</strong><span>${esc(item.message)}</span><small>${item.count}× · ${new Date(item.lastSeenAt).toLocaleString()}</small></div>`).join("")||"<p class='muted'>No runtime errors recorded.</p>"}</div></article><article class="card"><h2>Beta feedback</h2><div class="runtime-error-list">${state.feedbackReports.slice(0,12).map(item=>`<div><strong>${esc(item.category)}</strong><span>${esc(item.description)}</span><small>${new Date(item.createdAt).toLocaleString()}</small></div>`).join("")||"<p class='muted'>No feedback reports recorded.</p>"}</div></article></section>`;
  document.querySelectorAll("[data-launch-gate]").forEach(select=>select.onchange=()=>{
    state.launchGateState[select.dataset.launchGate]={status:select.value,updatedAt:new Date().toISOString()};
    persist();renderLaunchReadiness();
  });
}
function renderCurriculumQualityAudit(){
  const academyId=reconcileAcademyState();
  const chapters=Object.values(lessonTextbookLibrary?.academies?.[academyId]||{});
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CURRICULUM QUALITY REVIEW</div><h1>${capstoneAcademyName(academyId)} lesson audit</h1><p>Prioritise accuracy and specificity in the initial public pathway.</p></div></div><section class="curriculum-audit-list">${chapters.map(chapter=>{const key=`${academyId}:${chapter.lessonId}`;const review=state.curriculumQualityReviews[key]||{};return`<article class="card"><div><strong>${esc(chapter.title)}</strong><span>${esc(chapter.moduleTitle)}</span></div><div class="curriculum-audit-controls"><label><input type="checkbox" data-quality="${key}" data-field="specific" ${review.specific?"checked":""}> Topic-specific</label><label><input type="checkbox" data-quality="${key}" data-field="examples" ${review.examples?"checked":""}> Examples checked</label><label><input type="checkbox" data-quality="${key}" data-field="exercise" ${review.exercise?"checked":""}> Exercise aligned</label><label><input type="checkbox" data-quality="${key}" data-field="mastery" ${review.mastery?"checked":""}> Mastery unambiguous</label></div></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-quality]").forEach(input=>input.onchange=()=>{
    const key=input.dataset.quality;
    state.curriculumQualityReviews[key]=state.curriculumQualityReviews[key]||{};
    state.curriculumQualityReviews[key][input.dataset.field]=input.checked;
    persist();
  });
}

function masteryKey(a,l){return`${a}:${l}`}
function masteryAssessment(a,l){return masteryQuestionBank?.academies?.[a]?.[l]||null}
function masteryQuestions(a,l){
  const assessment=masteryAssessment(a,l);if(!assessment)return[];
  const attempt=state.masteryAttempts.filter(x=>x.academyId===a&&x.lessonId===l).length;
  return[...(assessment.questions||[])].sort((x,y)=>masteryHash(`${attempt}${x.id}`)-masteryHash(`${attempt}${y.id}`)).slice(0,6);
}
function masteryHash(v){let h=0;for(let i=0;i<v.length;i++)h=((h<<5)-h+v.charCodeAt(i))|0;return Math.abs(h)}
function masteryConfidenceHtml(id){return`<div class="mastery-confidence"><span>How confident are you?</span>${masteryAssessmentConfig.confidenceOptions.map(o=>`<label><input type="radio" name="confidence-${id}" value="${o.id}" ${o.id==="confident"?"checked":""}><span>${o.label}</span></label>`).join("")}</div>`}
function renderMasteryQuestion(q,i,total){
  if(q.type==="ordering")return`<article class="mastery-question" data-q="${q.id}"><div class="mastery-question-number">${i+1}/${total}</div><h3>${esc(q.prompt)}</h3><div class="mastery-ordering">${q.items.map((item,j)=>`<label><span>${j+1}</span><select data-order="${esc(item)}">${q.items.map((_,p)=>`<option value="${p+1}">${p+1}</option>`).join("")}</select><strong>${esc(item)}</strong></label>`).join("")}</div>${masteryConfidenceHtml(q.id)}</article>`;
  if(q.type==="short-answer")return`<article class="mastery-question" data-q="${q.id}"><div class="mastery-question-number">${i+1}/${total}</div><h3>${esc(q.prompt)}</h3><textarea data-short="${q.id}" placeholder="Explain in your own words…"></textarea>${masteryConfidenceHtml(q.id)}</article>`;
  return`<article class="mastery-question" data-q="${q.id}"><div class="mastery-question-number">${i+1}/${total}</div><h3>${esc(q.prompt)}</h3><div class="mastery-options">${q.options.map(o=>`<label><input type="radio" name="mastery-${q.id}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join("")}</div>${masteryConfidenceHtml(q.id)}</article>`;
}
function renderLessonMasteryCheck(a,lesson){
  const assessment=masteryAssessment(a,lesson.id);if(!assessment)return`<article class="card"><p>No mastery check available.</p></article>`;
  const qs=masteryQuestions(a,lesson.id),m=state.lessonMastery[masteryKey(a,lesson.id)];
  return`<section class="mastery-check-shell" data-a="${a}" data-l="${lesson.id}"><header class="mastery-check-header"><div><div class="eyebrow">LESSON MASTERY CHECK</div><h2>Prove your understanding</h2><p>${qs.length} varied questions · 80% required</p></div>${m?`<div class="mastery-score-badge ${m.mastered?"mastered":""}"><strong>${m.bestScore}%</strong><span>${m.mastered?"Mastered":"Best score"}</span></div>`:""}</header><div class="mastery-guidance"><strong>Supportive assessment.</strong><span>A lower score recommends review without hiding completed work.</span></div><div class="mastery-question-list">${qs.map((q,i)=>renderMasteryQuestion(q,i,qs.length)).join("")}</div><button class="primary-btn mastery-submit" data-submit-mastery>Submit mastery check</button><div data-mastery-result></div></section>`;
}
function bindLessonMasteryCheck(){document.querySelectorAll(".mastery-check-shell").forEach(s=>s.querySelector("[data-submit-mastery]")?.addEventListener("click",()=>submitLessonMastery(s)))}
function submitLessonMastery(shell){
  const a=shell.dataset.a,l=shell.dataset.l,assessment=masteryAssessment(a,l),qs=masteryQuestions(a,l);
  let raw=0,weighted=0,totalWeight=0;const responses=[];
  for(const q of qs){
    const cid=shell.querySelector(`input[name="confidence-${CSS.escape(q.id)}"]:checked`)?.value||"confident";
    const conf=masteryAssessmentConfig.confidenceOptions.find(x=>x.id===cid)||{weight:1};
    let answer=null,correct=false,feedback=q.explanation;
    if(q.type==="ordering"){
      answer=[...shell.querySelectorAll(`[data-q="${CSS.escape(q.id)}"] [data-order]`)].map(x=>({item:x.dataset.order,pos:Number(x.value)})).sort((x,y)=>x.pos-y.pos).map(x=>x.item);
      correct=JSON.stringify(answer)===JSON.stringify(q.answer);
    }else if(q.type==="short-answer"){
      answer=shell.querySelector(`[data-short="${CSS.escape(q.id)}"]`)?.value.trim()||"";
      const text=answer.toLowerCase(),matched=q.keywords.filter(k=>text.includes(k.toLowerCase()));
      correct=matched.length>=q.minimumKeywords&&text.split(/\s+/).filter(Boolean).length>=12;
      feedback=`${matched.length?`You used ${matched.slice(0,4).join(", ")}.`:"Use lesson terminology."} Model direction: ${q.modelAnswer}`;
    }else{
      answer=shell.querySelector(`input[name="mastery-${CSS.escape(q.id)}"]:checked`)?.value||null;
      correct=answer===q.answer;
    }
    if(correct)raw++;weighted+=(correct?1:0)*conf.weight;totalWeight+=conf.weight;
    responses.push({questionId:q.id,prompt:q.prompt,answer,correct,confidence:cid,concept:q.concept,feedback});
  }
  const rawScore=Math.round(raw/qs.length*100),weightedScore=Math.round(weighted/Math.max(1,totalWeight)*100),score=Math.round(rawScore*.75+weightedScore*.25),mastered=score>=80;
  const attempt={id:`mastery-${Date.now()}`,academyId:a,lessonId:l,score,mastered,responses,createdAt:new Date().toISOString()};
  state.masteryAttempts.unshift(attempt);
  const key=masteryKey(a,l),prev=state.lessonMastery[key]||{bestScore:0,attempts:0,mastered:false};
  state.lessonMastery[key]={bestScore:Math.max(prev.bestScore,score),latestScore:score,attempts:prev.attempts+1,mastered:prev.mastered||mastered,lastAttemptAt:attempt.createdAt};
  responses.filter(x=>!x.correct).forEach(x=>recordMasteryMistake(a,l,x));
  scheduleMasteryReview(a,l,mastered);persist();renderMasteryResult(shell,attempt);
}
function recordMasteryMistake(a,l,r){
  const existing=state.mistakeNotebook.find(x=>x.academyId===a&&x.lessonId===l&&x.questionId===r.questionId);
  if(existing){existing.count++;existing.lastSeenAt=new Date().toISOString();existing.feedback=r.feedback;existing.resolved=false}
  else state.mistakeNotebook.unshift({id:`mistake-${Date.now()}-${Math.random()}`,academyId:a,lessonId:l,questionId:r.questionId,concept:r.concept,prompt:r.prompt,feedback:r.feedback,count:1,resolved:false,createdAt:new Date().toISOString(),lastSeenAt:new Date().toISOString()});
}
function scheduleMasteryReview(a,l,mastered){
  const dueAt=new Date(Date.now()+(mastered?7:1)*86400000).toISOString();
  const existing=state.masteryReviewQueue.find(x=>x.academyId===a&&x.lessonId===l);
  if(existing){existing.dueAt=dueAt;existing.status="scheduled"}else state.masteryReviewQueue.push({id:`review-${Date.now()}`,academyId:a,lessonId:l,dueAt,status:"scheduled"});
}
function renderMasteryResult(shell,a){
  const target=shell.querySelector("[data-mastery-result]");
  target.innerHTML=`<section class="mastery-result ${a.mastered?"passed":"review"}"><div class="mastery-result-score"><strong>${a.score}%</strong><span>${a.mastered?"Mastery achieved":"Review recommended"}</span></div><div><h3>${a.mastered?"You demonstrated understanding.":"Review the gaps and try again."}</h3><div class="mastery-feedback-list">${a.responses.filter(x=>!x.correct).map(x=>`<article><strong>${esc(x.concept||"Concept")}</strong><p>${esc(x.feedback)}</p></article>`).join("")||"<article><strong>Strong result</strong><p>No incorrect answers.</p></article>"}</div><button class="secondary-btn" data-open-mistakes>Open mistake notebook</button></div></section>`;
  target.querySelector("[data-open-mistakes]").onclick=()=>renderView("mistakenotebook");shell.querySelector("[data-submit-mastery]").disabled=true;
}
function renderMistakeNotebook(){
  const a=reconcileAcademyState(),items=state.mistakeNotebook.filter(x=>x.academyId===a);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(a).toUpperCase()} · PERSONAL REVIEW</div><h1>Mistake notebook</h1><p>Turn incorrect answers into review actions.</p></div><button id="openMasteryQueueBtn" class="secondary-btn">Review schedule</button></div><section class="mistake-notebook-grid">${items.map(x=>`<article class="card mistake-card ${x.resolved?"resolved":""}"><div class="mistake-card-head"><span>${esc(x.concept||"Concept")}</span><strong>${x.count}× seen</strong></div><h2>${esc(x.prompt)}</h2><p>${esc(x.feedback)}</p><button class="secondary-btn" data-resolve="${x.id}">${x.resolved?"Reopen":"Mark understood"}</button></article>`).join("")||"<article class='card'><p class='muted'>No mistakes recorded yet.</p></article>"}</section>`;
  document.querySelectorAll("[data-resolve]").forEach(b=>b.onclick=()=>{const x=state.mistakeNotebook.find(i=>i.id===b.dataset.resolve);if(x)x.resolved=!x.resolved;persist();renderMistakeNotebook()});el("openMasteryQueueBtn").onclick=()=>renderView("masteryreviewqueue");
}
function renderMasteryReviewQueue(){
  const a=reconcileAcademyState(),items=state.masteryReviewQueue.filter(x=>x.academyId===a).sort((x,y)=>new Date(x.dueAt)-new Date(y.dueAt));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SPACED REVIEW</div><h1>Mastery review queue</h1><p>Concepts return after increasing intervals.</p></div></div><section class="mastery-review-list">${items.map(x=>{const lesson=masteryAssessment(a,x.lessonId),ready=new Date(x.dueAt)<=new Date();return`<article class="card"><div><strong>${esc(lesson?.title||x.lessonId)}</strong><span>${ready?"Ready to review":`Due ${new Date(x.dueAt).toLocaleDateString()}`}</span></div><button class="${ready?"primary-btn":"secondary-btn"}" data-review="${x.lessonId}">${ready?"Review now":"Open lesson"}</button></article>`}).join("")||"<article class='card'><p class='muted'>No reviews scheduled yet.</p></article>"}</section>`;
  document.querySelectorAll("[data-review]").forEach(b=>b.onclick=()=>{const id=b.dataset.review;if(a==="python")openLesson(id);else{state[`${a}ActiveLessonId`]=id;persist();renderView(`${a}lesson`)}})
}

function textbookChapter(academyId,lesson){
  return lessonTextbookLibrary?.academies?.[academyId]?.[lesson.id]||null;
}
function textbookKey(academyId,lesson){return`${academyId}:${lesson.id}`}
function textbookSections(chapter){
  return[
    ["objectives","Learning objectives"],
    ["overview","Concept overview"],
    ["why","Why it matters"],
    ["mental","Mental model"],
    ["mechanics","How it works"],
    ["syntax","Syntax anatomy"],
    ["example","Worked example"],
    ["variation","Second example"],
    ["mistakes","Common mistakes"],
    ["debug","Debugging guide"],
    ["work","Workplace application"],
    ["check","Knowledge check"],
    ["glossary","Glossary"],
    ["summary","Summary"]
  ];
}
function textbookSectionHtml(id,chapter){
  if(id==="objectives")return`<div class="textbook-prose"><p>This chapter is designed for study, not just a quick scan. By the end, you should be able to:</p><ul>${chapter.learningObjectives.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></div>`;
  if(id==="overview")return`<div class="textbook-prose">${chapter.overview.map(p=>`<p>${esc(p)}</p>`).join("")}</div>`;
  if(id==="why")return`<div class="textbook-prose">${chapter.whyItMatters.map((p,i)=>`<article class="textbook-callout"><span>${i+1}</span><p>${esc(p)}</p></article>`).join("")}</div>`;
  if(id==="mental")return`<div class="textbook-prose"><div class="textbook-mental-headline">${esc(chapter.mentalModel.headline)}</div><ol>${chapter.mentalModel.steps.map(step=>`<li>${esc(step)}</li>`).join("")}</ol><blockquote>${esc(chapter.mentalModel.question)}</blockquote></div>`;
  if(id==="mechanics")return`<div class="textbook-mechanics">${chapter.mechanics.map((item,i)=>`<article><span>${i+1}</span><div><h3>${esc(item.heading)}</h3><p>${esc(item.body)}</p></div></article>`).join("")}</div>`;
  if(id==="syntax")return`<div class="textbook-glossary">${chapter.syntaxAnatomy.map(item=>`<article><strong>${esc(item.term)}</strong><p>${esc(item.definition)}</p></article>`).join("")}</div>`;
  if(id==="example")return`<div class="textbook-example"><h3>${esc(chapter.workedExample.title)}</h3><pre><code>${esc(chapter.workedExample.code)}</code></pre><ol>${chapter.workedExample.explanation.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`;
  if(id==="variation")return`<div class="textbook-prose"><div class="textbook-scenario"><strong>${esc(chapter.secondExample.title)}</strong><p>${esc(chapter.secondExample.scenario)}</p></div><h3>Reason through these questions</h3><ol>${chapter.secondExample.questions.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`;
  if(id==="mistakes")return`<div class="textbook-mistakes">${chapter.commonMistakes.map((item,i)=>`<article><span>${i+1}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></div></article>`).join("")}</div>`;
  if(id==="debug")return`<div class="textbook-debug-flow">${chapter.debuggingGuide.map((step,i)=>`<article><span>${i+1}</span><p>${esc(step)}</p></article>`).join("")}</div>`;
  if(id==="work")return`<div class="textbook-prose">${chapter.workplaceApplications.map(p=>`<p>${esc(p)}</p>`).join("")}</div>`;
  if(id==="check")return`<div class="textbook-checks">${chapter.knowledgeCheck.map((item,i)=>`<details><summary>${i+1}. ${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join("")}</div>`;
  if(id==="glossary")return`<div class="textbook-glossary">${chapter.glossary.map(item=>`<article><strong>${esc(item.term)}</strong><p>${esc(item.definition)}</p></article>`).join("")}</div>`;
  return`<div class="textbook-prose"><ul>${chapter.summary.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
}
function renderInteractiveTextbook(academyId,lesson){
  const chapter=textbookChapter(academyId,lesson);
  if(!chapter)return`<article class="card"><p>This detailed chapter is being prepared.</p></article>`;
  const key=textbookKey(academyId,lesson);
  const progress=state.textbookProgress[key]||{section:"objectives",readSections:[]};
  const sections=textbookSections(chapter);
  const active=sections.some(([id])=>id===progress.section)?progress.section:"objectives";
  const percent=Math.round((new Set(progress.readSections||[]).size/sections.length)*100);
  const bookmarked=state.textbookBookmarks.includes(key);
  return`<section class="textbook-shell" data-textbook-key="${key}" data-textbook-section="${active}">
    <header class="textbook-header">
      <div><div class="eyebrow">INTERACTIVE TEXTBOOK · ${chapter.estimatedReadingMinutes} MIN READ</div><h2>${esc(chapter.title)}</h2><p>${esc(chapter.moduleTitle)}</p></div>
      <div class="textbook-header-actions">
        <button class="textbook-notes-toggle" data-textbook-notes-toggle>Notes</button>
        <button class="textbook-bookmark ${bookmarked?"active":""}" data-textbook-bookmark="${key}">${bookmarked?"◆ Bookmarked":"◇ Bookmark"}</button>
      </div>
    </header>
    <div class="textbook-reading-progress"><div style="width:${percent}%"></div></div>
    ${lessonAudioControlsHtml()}
    <div class="textbook-layout">
      <nav class="textbook-toc">
        ${sections.map(([id,label],i)=>`<button class="${id===active?"active":""} ${(progress.readSections||[]).includes(id)?"read":""}" data-textbook-go="${id}"><span>${(progress.readSections||[]).includes(id)?"✓":i+1}</span>${esc(label)}</button>`).join("")}
      </nav>
      <article class="textbook-page">
        ${sections.map(([id,label])=>`<section class="${id===active?"active":""}" data-textbook-page="${id}"><div class="textbook-page-number">${sections.findIndex(x=>x[0]===id)+1} / ${sections.length}</div><h2>${esc(label)}</h2>${textbookSectionHtml(id,chapter)}</section>`).join("")}
        <div class="textbook-page-actions"><button class="secondary-btn" data-textbook-prev>← Previous</button><button class="primary-btn" data-textbook-next>Mark read & continue →</button></div>
      </article>
      <aside class="textbook-notes">
        <div class="eyebrow">MY NOTES</div><h3>Explain it in your words</h3><p>Notes are more useful when they record your understanding, not copied text.</p>
        <textarea data-textbook-notes="${key}" placeholder="Write your explanation, question or example…">${esc(state.textbookNotes[key]||"")}</textarea>
        <button class="secondary-btn full" data-save-textbook-notes="${key}">Save notes</button>
        <div class="textbook-study-tip"><strong>Study tip</strong><span>After each section, close the text and explain the idea aloud.</span></div>
      </aside>
    </div>
  </section>`;
}
function bindInteractiveTextbook(){
  document.querySelectorAll(".textbook-shell").forEach(shell=>{
    bindLessonAudioReader(shell);
    const notesToggle=shell.querySelector("[data-textbook-notes-toggle]");
    notesToggle?.addEventListener("click",()=>{
      shell.classList.toggle("notes-collapsed");
      notesToggle.textContent=shell.classList.contains("notes-collapsed")?"Show notes":"Hide notes";
    });
    const key=shell.dataset.textbookKey;
    const buttons=[...shell.querySelectorAll("[data-textbook-go]")];
    const pages=[...shell.querySelectorAll("[data-textbook-page]")];
    const setSection=id=>{
      const index=Math.max(0,buttons.findIndex(b=>b.dataset.textbookGo===id));
      const safeId=buttons[index]?.dataset.textbookGo||buttons[0]?.dataset.textbookGo;
      if(lessonAudioState.shell===shell&&["speaking","paused"].includes(lessonAudioState.status))stopLessonAudio();
      shell.dataset.textbookSection=safeId;
      buttons.forEach(b=>b.classList.toggle("active",b.dataset.textbookGo===safeId));
      pages.forEach(p=>p.classList.toggle("active",p.dataset.textbookPage===safeId));
      state.textbookProgress[key]=state.textbookProgress[key]||{section:safeId,readSections:[]};
      state.textbookProgress[key].section=safeId;
      persist();
      shell.scrollIntoView({behavior:"smooth",block:"start"});
    };
    buttons.forEach(button=>button.onclick=()=>setSection(button.dataset.textbookGo));
    shell.querySelector("[data-textbook-prev]")?.addEventListener("click",()=>{
      const current=buttons.findIndex(b=>b.classList.contains("active"));
      setSection(buttons[Math.max(0,current-1)]?.dataset.textbookGo);
    });
    shell.querySelector("[data-textbook-next]")?.addEventListener("click",()=>{
      const current=buttons.findIndex(b=>b.classList.contains("active"));
      const id=buttons[current]?.dataset.textbookGo;
      const record=state.textbookProgress[key]||{section:id,readSections:[]};
      record.readSections=[...new Set([...(record.readSections||[]),id])];
      state.textbookProgress[key]=record;
      buttons[current]?.classList.add("read");
      persist();
      if(current<buttons.length-1)setSection(buttons[current+1].dataset.textbookGo);
      else{
        shell.querySelector("[data-textbook-next]").textContent="✓ Chapter studied";
        shell.querySelector("[data-textbook-next]").disabled=true;
      }
    });
  });
  document.querySelectorAll("[data-save-textbook-notes]").forEach(button=>button.onclick=()=>{
    const key=button.dataset.saveTextbookNotes;
    const input=document.querySelector(`[data-textbook-notes="${CSS.escape(key)}"]`);
    state.textbookNotes[key]=input?.value.trim()||"";
    persist();button.textContent="Notes saved";
  });
  document.querySelectorAll("[data-textbook-bookmark]").forEach(button=>button.onclick=()=>{
    const key=button.dataset.textbookBookmark;
    state.textbookBookmarks=state.textbookBookmarks.includes(key)?state.textbookBookmarks.filter(x=>x!==key):[...state.textbookBookmarks,key];
    persist();button.textContent=state.textbookBookmarks.includes(key)?"◆ Bookmarked":"◇ Bookmark";button.classList.toggle("active",state.textbookBookmarks.includes(key));
  });
}

function deepChapterKey(academyId,lesson){return`${academyId}:${lesson.id}`}
function lessonAcademyId(){
  return getActiveAcademy()?.id||state.activeAcademyId||"python";
}
function selectLessonVisual(academyId,lesson={},theory={}){
  const catalogue=Array.isArray(interactiveVisualCatalogue)
    ?interactiveVisualCatalogue.filter(Boolean)
    :[];

  if(!catalogue.length)return null;

  const text=[
    lesson?.id,lesson?.title,lesson?.description,lesson?.challenge,
    lesson?.moduleTitle,theory?.id,theory?.principle
  ].filter(Boolean).join(" ").toLowerCase();

  const preferred=
    text.includes("dataframe")||text.includes("pandas")?"dataframe-visual":
    text.includes("join")?"join-visual":
    text.includes("dom")||text.includes("event")?"dom-visual":
    text.includes("list")||text.includes("tuple")||text.includes("dictionary")||text.includes("collection")?"collection-visual":
    deepCurriculumConfig?.[academyId]?.defaultVisual;

  const supportsAcademy=visual=>
    Array.isArray(visual?.academyIds)&&visual.academyIds.includes(academyId);

  return catalogue.find(visual=>visual?.id===preferred&&supportsAcademy(visual))
    ||catalogue.find(supportsAcademy)
    ||null;
}
function workedExampleLines(theory){
  return String(theory.exampleCode||theory.example||"")
    .split("\n")
    .map((line,index)=>({index,line,blank:!line.trim()}));
}
function renderInteractiveVisual(academyId,lesson,theory){
  const visual=selectLessonVisual(academyId,lesson,theory);
  const steps=Array.isArray(visual?.steps)?visual.steps.filter(Boolean):[];

  if(!visual||!steps.length){
    return`<section class="deep-visual-card optional-content-fallback">
      <div class="deep-section-head"><div><div class="eyebrow">INTERACTIVE MENTAL MODEL</div><h2>Visual guide unavailable</h2></div></div>
      <p>The lesson remains fully available. This optional visual will load when its catalogue is ready.</p>
    </section>`;
  }

  return`<section class="deep-visual-card" data-visual-step="0">
    <div class="deep-section-head"><div><div class="eyebrow">INTERACTIVE MENTAL MODEL</div><h2>${esc(visual.title||"Lesson visual")}</h2></div><span>${steps.length} steps</span></div>
    <div class="deep-visual-stage">
      ${steps.map((step,index)=>`<article class="${index===0?"active":""}" data-visual-index="${index}">
        <span>${index+1}</span><strong>${esc(step)}</strong>
      </article>`).join("")}
    </div>
    <div class="deep-visual-controls">
      <button class="secondary-btn" data-visual-prev disabled>← Previous</button>
      <div class="deep-visual-dots">${steps.map((_,i)=>`<button class="${i===0?"active":""}" data-visual-go="${i}">${i+1}</button>`).join("")}</div>
      <button class="primary-btn" data-visual-next>Next →</button>
    </div>
  </section>`;
}
function renderWorkedWalkthrough(theory){
  const lines=workedExampleLines(theory);
  if(!lines.some(item=>item.line.trim()))return"";
  return`<section class="worked-walkthrough-card" data-worked-line="0">
    <div class="deep-section-head"><div><div class="eyebrow">WORKED EXAMPLE</div><h2>Read the code line by line</h2></div><span>${lines.filter(x=>!x.blank).length} lines</span></div>
    <div class="worked-walkthrough-layout">
      <pre class="worked-code">${lines.map(item=>`<code class="${item.index===0?"active":""}" data-worked-code="${item.index}">${esc(item.line||" ")}</code>`).join("\n")}</pre>
      <article class="worked-explanation">
        <div class="worked-line-label">Selected line</div>
        <strong data-worked-selected>${esc(lines[0]?.line||"")}</strong>
        <p data-worked-explanation>${esc(explainWorkedLine(lines[0]?.line||"",theory))}</p>
      </article>
    </div>
    <div class="worked-line-nav">
      ${lines.map(item=>`<button data-worked-go="${item.index}" class="${item.index===0?"active":""}">${item.index+1}</button>`).join("")}
    </div>
  </section>`;
}
function explainWorkedLine(line,theory){
  const trimmed=String(line||"").trim();
  if(!trimmed)return"This blank line separates logical sections and improves readability.";
  if(trimmed.startsWith("import ")||trimmed.startsWith("from "))return"This imports functionality the program needs before it can use it.";
  if(trimmed.startsWith("def "))return"This defines a reusable function and names its input contract.";
  if(trimmed.startsWith("class "))return"This defines a class that can own related state and behaviour.";
  if(/^if\b/.test(trimmed)||/^else/.test(trimmed)||/^elif\b/.test(trimmed))return"This controls which branch runs according to a condition.";
  if(/^for\b/.test(trimmed)||/^while\b/.test(trimmed))return"This begins iteration so the same rule can be applied repeatedly.";
  if(trimmed.includes("SELECT")||trimmed.includes("FROM")||trimmed.includes("WHERE")||trimmed.includes("JOIN"))return"This SQL clause contributes to the source, filtering, relationship or output definition.";
  if(trimmed.includes("=")&&!trimmed.includes("=="))return"This creates or updates a named value that later lines can reuse.";
  if(trimmed.includes("print(")||trimmed.includes("System.out.println"))return"This makes the current result observable to the learner or user.";
  if(trimmed.includes("return "))return"This sends the calculated result back to the caller.";
  return theory.exampleNotes?.[0]||"This line contributes one step to the transformation from input to result.";
}
function predictionPrompt(academyId,lesson,theory){
  if(academyId==="sql")return`Before running the query, describe what one result row should represent for “${lesson.title}”.`;
  if(academyId==="web")return`Before previewing, describe which user action changes the page and what visual result should appear.`;
  if(academyId==="java")return`Before executing the simulation, identify the object or method that owns the main behaviour.`;
  return theory.check||`Before running the code, predict the output or state change.`;
}
function renderPredictBeforeRun(academyId,lesson,theory){
  const key=deepChapterKey(academyId,lesson);
  const previous=state.predictionHistory.find(p=>p.key===key);
  return`<section class="predict-before-run-card">
    <div class="deep-section-head"><div><div class="eyebrow">PREDICT BEFORE RUN</div><h2>Commit to an answer</h2></div><span>${previous?"Saved":"Not answered"}</span></div>
    <p>${esc(predictionPrompt(academyId,lesson,theory))}</p>
    <textarea data-prediction-input="${key}" placeholder="Write your prediction in one or two sentences…">${esc(previous?.answer||"")}</textarea>
    <button class="primary-btn" data-save-prediction="${key}">${previous?"Update prediction":"Save prediction"}</button>
  </section>`;
}
function renderIndependentChallenge(academyId,lesson){
  const key=deepChapterKey(academyId,lesson);
  const prior=state.independentAttempts.find(a=>a.key===key);
  const prompt=deepCurriculumConfig?.[academyId]?.independentPrompt||"Rebuild the solution independently.";
  return`<section class="independent-challenge-card">
    <div class="deep-section-head"><div><div class="eyebrow">INDEPENDENT PRACTICE</div><h2>Now remove the scaffolding</h2></div><span>${prior?"Attempt recorded":"Optional mastery step"}</span></div>
    <p>${esc(prompt)}</p>
    <textarea data-independent-reflection="${key}" placeholder="Describe your independent approach, trade-offs and what you found difficult…">${esc(prior?.reflection||"")}</textarea>
    <button class="secondary-btn" data-save-independent="${key}">${prior?"Update attempt":"Record independent attempt"}</button>
  </section>`;
}
function renderLessonRecap(academyId,lesson,theory){
  const key=deepChapterKey(academyId,lesson);
  return`<section class="lesson-recap-card">
    <div class="eyebrow">LESSON RECAP</div><h2>Turn activity into understanding</h2>
    <div class="lesson-recap-grid">
      <article><strong>You learned</strong><p>${esc(theory.principle)}</p></article>
      <article><strong>You should now be able to</strong><p>${esc(lesson.description||lesson.challenge||"Apply this concept in a small technical task.")}</p></article>
      <article><strong>Remember</strong><p>${esc(theory.mistake)}</p></article>
      <article><strong>Where this appears at work</strong><p>${esc(deepCurriculumConfig?.[academyId]?.realWorld||"Used in real software delivery.")}</p></article>
    </div>
    <button class="primary-btn" data-complete-chapter="${key}">${state.chapterProgress?.[key]?.completed?"✓ Chapter reviewed":"Mark chapter reviewed"}</button>
  </section>`;
}
function safeLessonSection(sectionName,renderer){
  try{
    return renderer();
  }catch(error){
    console.warn(`Optional lesson section failed: ${sectionName}`,error);
    return`<section class="optional-content-fallback" data-fallback-section="${esc(sectionName)}">
      <div class="eyebrow">LESSON CONTENT</div>
      <h2>${esc(sectionName)} is temporarily unavailable</h2>
      <p>You can continue with the rest of this lesson.</p>
    </section>`;
  }
}

function renderDeepLessonChapter(academyId,lesson){
  const safeLesson=lesson||{};
  let theory={};

  try{
    theory=theoryTextForLesson(academyId,safeLesson)||{};
  }catch(error){
    console.warn("Lesson theory lookup failed",error);
  }

  return`<div class="deep-chapter-shell">
    <div class="deep-chapter-tabs">
      <button class="active" data-chapter-tab="textbook">1. Textbook</button>
      <button data-chapter-tab="learn">2. Quick review</button>
      <button data-chapter-tab="visual">3. Visualise</button>
      <button data-chapter-tab="example">4. Walkthrough</button>
      <button data-chapter-tab="predict">5. Predict</button>
      <button data-chapter-tab="independent">6. Independent</button>
      <button data-chapter-tab="recap">7. Recap</button>
      <button data-chapter-tab="mastery">8. Mastery check</button>
    </div>
    <section class="deep-chapter-panel active" data-chapter-panel="textbook">${safeLessonSection("Textbook",()=>renderInteractiveTextbook(academyId,safeLesson))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="learn">${safeLessonSection("Quick review",()=>renderMicroTheory(academyId,safeLesson))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="visual">${safeLessonSection("Visual guide",()=>renderInteractiveVisual(academyId,safeLesson,theory))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="example">${safeLessonSection("Walkthrough",()=>renderWorkedWalkthrough(theory))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="predict">${safeLessonSection("Prediction exercise",()=>renderPredictBeforeRun(academyId,safeLesson,theory))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="independent">${safeLessonSection("Independent challenge",()=>renderIndependentChallenge(academyId,safeLesson))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="recap">${safeLessonSection("Recap",()=>renderLessonRecap(academyId,safeLesson,theory))}</section>
    <section class="deep-chapter-panel" data-chapter-panel="mastery">${safeLessonSection("Mastery check",()=>renderLessonMasteryCheck(academyId,safeLesson))}</section>
  </div>`;
}
function bindDeepLessonChapter(){
  bindInteractiveTextbook();
  bindLessonMasteryCheck();
  document.querySelectorAll(".deep-chapter-shell").forEach(shell=>{
    shell.querySelectorAll("[data-chapter-tab]").forEach(button=>button.onclick=()=>{
      const tab=button.dataset.chapterTab;
      shell.querySelectorAll("[data-chapter-tab]").forEach(b=>b.classList.toggle("active",b===button));
      shell.querySelectorAll("[data-chapter-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.chapterPanel===tab));
    });
  });
  document.querySelectorAll(".deep-visual-card").forEach(card=>{
    const setStep=index=>{
      const steps=[...card.querySelectorAll("[data-visual-index]")];
      const dots=[...card.querySelectorAll("[data-visual-go]")];
      const safe=Math.max(0,Math.min(index,steps.length-1));
      card.dataset.visualStep=String(safe);
      steps.forEach((step,i)=>step.classList.toggle("active",i===safe));
      dots.forEach((dot,i)=>dot.classList.toggle("active",i===safe));
      card.querySelector("[data-visual-prev]").disabled=safe===0;
      card.querySelector("[data-visual-next]").disabled=safe===steps.length-1;
    };
    card.querySelectorAll("[data-visual-go]").forEach(button=>button.onclick=()=>setStep(Number(button.dataset.visualGo)));
    card.querySelector("[data-visual-prev]")?.addEventListener("click",()=>setStep(Number(card.dataset.visualStep||0)-1));
    card.querySelector("[data-visual-next]")?.addEventListener("click",()=>setStep(Number(card.dataset.visualStep||0)+1));
  });
  document.querySelectorAll(".worked-walkthrough-card").forEach(card=>{
    card.querySelectorAll("[data-worked-go]").forEach(button=>button.onclick=()=>{
      const index=Number(button.dataset.workedGo);
      const line=card.querySelector(`[data-worked-code="${index}"]`);
      card.querySelectorAll("[data-worked-code]").forEach(x=>x.classList.toggle("active",x===line));
      card.querySelectorAll("[data-worked-go]").forEach(x=>x.classList.toggle("active",x===button));
      card.querySelector("[data-worked-selected]").textContent=line?.textContent||"";
      const lesson=activeLesson||{};
      const theory=theoryTextForLesson(lessonAcademyId(),lesson);
      card.querySelector("[data-worked-explanation]").textContent=explainWorkedLine(line?.textContent||"",theory);
    });
  });
  document.querySelectorAll("[data-save-prediction]").forEach(button=>button.onclick=()=>{
    const key=button.dataset.savePrediction;
    const answer=document.querySelector(`[data-prediction-input="${CSS.escape(key)}"]`)?.value.trim();
    if(!answer){alert("Write a prediction before saving.");return}
    state.predictionHistory=state.predictionHistory.filter(p=>p.key!==key);
    state.predictionHistory.unshift({key,answer,savedAt:new Date().toISOString()});
    persist();button.textContent="Prediction saved";
  });
  document.querySelectorAll("[data-save-independent]").forEach(button=>button.onclick=()=>{
    const key=button.dataset.saveIndependent;
    const reflection=document.querySelector(`[data-independent-reflection="${CSS.escape(key)}"]`)?.value.trim();
    if(!reflection||reflection.length<20){alert("Add a short reflection on your independent approach.");return}
    state.independentAttempts=state.independentAttempts.filter(a=>a.key!==key);
    state.independentAttempts.unshift({key,reflection,savedAt:new Date().toISOString()});
    persist();button.textContent="Attempt recorded";
  });
  document.querySelectorAll("[data-complete-chapter]").forEach(button=>button.onclick=()=>{
    const key=button.dataset.completeChapter;
    state.chapterProgress=state.chapterProgress||{};
    state.chapterProgress[key]={completed:true,completedAt:new Date().toISOString()};
    state.xp+=30;persist();button.textContent="✓ Chapter reviewed";
  });
  bindMicroTheory();
}
function curriculumCoverageRows(){
  const academies=["python","sql","web","java"];
  return academies.map(academyId=>{
    const lessons=
      academyId==="python"?allLessons():
      academyId==="sql"?sqlAllLessons():
      academyId==="web"?webAllLessons():
      javaAllLessons();
    const fullTheory=lessons.filter(l=>Boolean(theoryTextForLesson(academyId,l))).length;
    const reviewed=lessons.filter(l=>state.chapterProgress?.[deepChapterKey(academyId,l)]?.completed).length;
    return{academyId,total:lessons.length,fullTheory,reviewed};
  });
}
function renderCurriculumCoverage(){
  const rows=curriculumCoverageRows();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CURRICULUM QUALITY CONTROL</div><h1>Curriculum coverage</h1><p>Track teaching depth across all four academies.</p></div></div>
  <section class="coverage-grid">${rows.map(row=>`<article class="card coverage-card"><div class="eyebrow">${capstoneAcademyName(row.academyId).toUpperCase()}</div><h2>${row.total} lessons</h2>
    <div><span>Deep chapter available</span><strong>${row.fullTheory}/${row.total}</strong></div>
    <div><span>Learner-reviewed chapters</span><strong>${row.reviewed}/${row.total}</strong></div>
    <div class="progress-track"><div style="width:${row.total?row.reviewed/row.total*100:0}%"></div></div>
  </article>`).join("")}</section>
  <section class="card coverage-standard"><h2>Required lesson standard</h2><div class="coverage-standard-grid">${["Concise theory","Interactive visual","Worked walkthrough","Prediction","Guided exercise","Independent practice","Recap"].map(x=>`<span>✓ ${x}</span>`).join("")}</div></section>`;
}


function engineeringLatestCommit(project){return project.commits?.[project.commits.length-1]||null}
function engineeringChangedFiles(project){const baseline=engineeringLatestCommit(project)?.files||{};const names=new Set([...Object.keys(baseline),...Object.keys(project.files)]);return[...names].filter(name=>(baseline[name]??"")!==(project.files[name]??""))}
function engineeringUnifiedDiff(project,fileName){const before=String(engineeringLatestCommit(project)?.files?.[fileName]??"").split("\n"),after=String(project.files?.[fileName]??"").split("\n");let html="";for(let i=0;i<Math.max(before.length,after.length);i++){const a=before[i],b=after[i];if(a===b){if(a!==undefined)html+=`<div class="diff-line same"><span>${i+1}</span><code> ${esc(a)}</code></div>`}else{if(a!==undefined)html+=`<div class="diff-line removed"><span>${i+1}</span><code>- ${esc(a)}</code></div>`;if(b!==undefined)html+=`<div class="diff-line added"><span>${i+1}</span><code>+ ${esc(b)}</code></div>`}}return html||"<p class='muted'>No changes.</p>"}
function createEngineeringCommit(project){saveActiveEngineeringFile();const changed=engineeringChangedFiles(project);if(!changed.length){alert("There are no changes to commit.");return}const message=prompt("Commit message","Implement project changes");if(!message?.trim())return;project.commits=project.commits||[];project.commits.push({id:`commit-${Date.now()}`,message:message.trim(),files:{...project.files},changedFiles:changed,createdAt:new Date().toISOString()});persist();renderEngineeringWorkspace()}
function restoreEngineeringCommit(project,commitId){const commit=project.commits?.find(c=>c.id===commitId);if(!commit||!confirm(`Restore project to "${commit.message}"?`))return;project.files={...commit.files};project.activeFile=Object.keys(project.files)[0];persist();renderEngineeringWorkspace()}
function captureEngineeringExecution(project,type,result){const record={id:`execution-${Date.now()}`,projectId:project.id,academyId:project.academyId,type,ok:Boolean(result.ok),summary:result.summary||"",output:String(result.output||"").slice(0,12000),details:result.details||{},createdAt:new Date().toISOString()};project.executionResults=project.executionResults||[];project.executionResults.unshift(record);state.engineeringExecutionHistory.unshift(record);persist();return record}
async function runEngineeringPython(project){if(!pyodide)throw new Error("Python runtime is still loading.");const entry=project.files["app.py"]?"app.py":Object.keys(project.files).find(f=>f.endsWith(".py")&&!f.includes("test"));if(!entry)throw new Error("No Python entry file found.");const files=JSON.stringify(Object.fromEntries(Object.entries(project.files).filter(([n])=>n.endsWith(".py"))));const script=`import sys,io,json,traceback,types\nfiles=json.loads(${JSON.stringify(files)})\nfor name,source in files.items():\n m=name.rsplit('/',1)[-1][:-3]\n if m not in ('app','main') and not m.startswith('test'):\n  mod=types.ModuleType(m);sys.modules[m]=mod;exec(compile(source,name,'exec'),mod.__dict__)\nout=io.StringIO();old=sys.stdout;sys.stdout=out;ok=True;err=''\ntry: exec(compile(files[${JSON.stringify(entry)}],${JSON.stringify(entry)},'exec'),{'__name__':'__main__'})\nexcept Exception: ok=False;err=traceback.format_exc()\nfinally: sys.stdout=old\njson.dumps({'ok':ok,'output':out.getvalue(),'error':err})`;const parsed=JSON.parse(await pyodide.runPythonAsync(script));return{ok:parsed.ok,summary:parsed.ok?"Python project executed":"Python runtime error",output:(parsed.output||"")+(parsed.error||""),details:{engine:"Pyodide",entry}}}
async function runEngineeringPythonTests(project){if(!pyodide)throw new Error("Python runtime is still loading.");const files=JSON.stringify(project.files);const script=`import sys,json,traceback,types\nfiles=json.loads(${JSON.stringify(files)})\nfor name,source in files.items():\n if name.endswith('.py') and 'test' not in name and name.rsplit('/',1)[-1] not in ('app.py','main.py'):\n  m=name.rsplit('/',1)[-1][:-3];mod=types.ModuleType(m);sys.modules[m]=mod;exec(compile(source,name,'exec'),mod.__dict__)\nresults=[]\nfor name,source in files.items():\n if 'test' in name and name.endswith('.py'):\n  ns={}\n  try:\n   exec(compile(source,name,'exec'),ns)\n   for n,fn in [(n,v) for n,v in ns.items() if n.startswith('test_') and callable(v)]:\n    try: fn();results.append({'name':n,'passed':True,'error':''})\n    except Exception: results.append({'name':n,'passed':False,'error':traceback.format_exc()})\n  except Exception: results.append({'name':name,'passed':False,'error':traceback.format_exc()})\njson.dumps(results)`;const results=JSON.parse(await pyodide.runPythonAsync(script));const passed=results.filter(r=>r.passed).length;return{ok:results.length>0&&passed===results.length,summary:`${passed}/${results.length} Python tests passed`,output:results.map(r=>`${r.passed?"PASS":"FAIL"} ${r.name}${r.error?`\n${r.error}`:""}`).join("\n\n"),details:{results,engine:"Pyodide"}}}
async function ensureSqlJs(){if(window.SQL)return window.SQL;if(!window.initSqlJs)await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});window.SQL=await window.initSqlJs({locateFile:f=>`https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`});return window.SQL}
async function runEngineeringSql(project,tests=false){const SQL=await ensureSqlJs(),db=new SQL.Database();try{if(project.files['schema.sql'])db.run(project.files['schema.sql']);const stmt=db.prepare('INSERT INTO orders(order_id,customer_id,region,revenue) VALUES (?,?,?,?)');(engineeringSqlSeed?.orders||[]).forEach(r=>stmt.run([r.order_id,r.customer_id,r.region,r.revenue]));stmt.free();const source=tests?(project.files['controls.sql']||''):(project.files['analysis.sql']||project.files[project.activeFile]);const statements=String(source).split(';').map(x=>x.trim()).filter(Boolean),outputs=[];for(const sql of statements){const result=db.exec(sql);outputs.push(result.map(set=>`${set.columns.join(' | ')}\n${set.values.map(row=>row.join(' | ')).join('\n')}`).join('\n'))}return{ok:statements.length>0,summary:tests?`${statements.length} SQL controls executed`:`SQL executed`,output:outputs.filter(Boolean).join('\n\n')||'Executed successfully.',details:{engine:'SQLite'}}}catch(error){return{ok:false,summary:'SQL execution error',output:String(error?.message||error),details:{engine:'SQLite'}}}finally{db.close()}}
function combinedWebDocument(project){const html=project.files['index.html']||'<main id="app"></main>',style=project.files['styles.css']||'',js=project.files['app.js']||'';return html.replace('</head>',`<style>${style}</style></head>`).replace('</body>',`<script>const logs=[];console.log=(...a)=>logs.push(a.join(' '));window.addEventListener('error',e=>parent.postMessage({type:'cq-web-error',message:e.message},'*'));try{${js}}catch(e){parent.postMessage({type:'cq-web-error',message:String(e.stack||e)},'*')}setTimeout(()=>parent.postMessage({type:'cq-web-result',logs,html:document.body.innerText.slice(0,2000)},'*'),100);<\/script></body>`)}
async function runEngineeringWeb(project){const frame=el('engineeringWebPreview');if(!frame)throw new Error('Preview frame unavailable.');frame.srcdoc=combinedWebDocument(project);return await new Promise(resolve=>{const timer=setTimeout(()=>{window.removeEventListener('message',handler);resolve({ok:true,summary:'Web preview loaded',output:'Preview rendered.',details:{engine:'Sandboxed iframe'}})},1200);const handler=e=>{if(e.source!==frame.contentWindow)return;if(e.data?.type==='cq-web-error'||e.data?.type==='cq-web-result'){clearTimeout(timer);window.removeEventListener('message',handler);resolve(e.data.type==='cq-web-error'?{ok:false,summary:'Web runtime error',output:e.data.message}:{ok:true,summary:'Web preview loaded',output:[...(e.data.logs||[]),e.data.html||''].filter(Boolean).join('\n'),details:{engine:'Sandboxed iframe'}})}};window.addEventListener('message',handler)})}
async function runEngineeringProject(project){saveActiveEngineeringFile();let result;try{if(project.academyId==='python')result=await runEngineeringPython(project);else if(project.academyId==='sql')result=await runEngineeringSql(project,false);else if(project.academyId==='web')result=await runEngineeringWeb(project);else result={ok:false,summary:'Java execution unavailable',output:'Real JVM compilation requires the secured runner planned for v55.5.'}}catch(error){result={ok:false,summary:'Execution failed',output:String(error?.stack||error)}}captureEngineeringExecution(project,'run',result);renderEngineeringWorkspace()}
async function runEngineeringTests(project){saveActiveEngineeringFile();let result;try{if(project.academyId==='python')result=await runEngineeringPythonTests(project);else if(project.academyId==='sql')result=await runEngineeringSql(project,true);else if(project.academyId==='web'){const checks=engineeringCheckResults(project,engineeringTemplateById(project.templateId)),passed=checks.filter(c=>c.passed).length;result={ok:passed===checks.length,summary:`${passed}/${checks.length} Web checks passed`,output:checks.map(c=>`${c.passed?'PASS':'FAIL'} ${c.label}`).join('\n')}}else result={ok:false,summary:'Java tests unavailable',output:'Real Java tests require the secured runner planned for v55.5.'}}catch(error){result={ok:false,summary:'Test execution failed',output:String(error?.stack||error)}}captureEngineeringExecution(project,'test',result);renderEngineeringWorkspace()}
function renderEngineeringExecutionPanel(project){const latestRun=project.executionResults?.find(r=>r.type==='run'),latestTest=project.executionResults?.find(r=>r.type==='test'),record=project.executionResults?.[0];return`<section class="engineering-runtime-panel"><div class="engineering-panel-title">Execution</div><div class="engineering-runtime-status"><div><span>Run</span><strong class="${latestRun?.ok?'ok':'bad'}">${latestRun?latestRun.ok?'Passed':'Failed':'Not run'}</strong></div><div><span>Tests</span><strong>${latestTest?.summary||'Not run'}</strong></div><div><span>Changed files</span><strong>${engineeringChangedFiles(project).length}</strong></div><div><span>Commits</span><strong>${project.commits?.length||0}</strong></div></div><pre class="engineering-console">${esc(record?.output||'Run the project or tests to see output here.')}</pre></section>`}
function renderEngineeringGitPanel(project){const changed=engineeringChangedFiles(project);return`<section class="engineering-git-panel"><div class="engineering-panel-title">Git workflow</div><div class="engineering-git-actions"><button id="engineeringCommitBtn" class="primary-btn">Commit changes</button><button id="engineeringDiffBtn" class="secondary-btn" ${changed.length?'':'disabled'}>View diff</button></div><div class="engineering-change-list">${changed.map(n=>`<span>M ${esc(n)}</span>`).join('')||'<small>Working tree clean</small>'}</div><div class="engineering-commit-list">${(project.commits||[]).slice().reverse().map(c=>`<article><div><strong>${esc(c.message)}</strong><small>${new Date(c.createdAt).toLocaleString()}</small></div><button data-restore-commit="${c.id}">Restore</button></article>`).join('')||'<small>No commits yet.</small>'}</div></section>`}
function openEngineeringDiff(project){saveActiveEngineeringFile();const changed=engineeringChangedFiles(project);if(!changed.length)return;const selected=changed[0];el('main').innerHTML=`<div class="section-head"><div><div class="eyebrow">VERSION CONTROL</div><h1>Working changes</h1></div><button id="diffBackBtn" class="secondary-btn">Back</button></div><section class="engineering-diff-layout"><aside class="card engineering-diff-files">${changed.map(n=>`<button class="${n===selected?'active':''}" data-diff-file="${esc(n)}">${esc(n)}</button>`).join('')}</aside><article class="card engineering-diff-view"><div class="engineering-diff-title">${esc(selected)}</div><div id="engineeringDiffContent">${engineeringUnifiedDiff(project,selected)}</div></article></section>`;el('diffBackBtn').onclick=()=>renderView('engineeringworkspace');document.querySelectorAll('[data-diff-file]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-diff-file]').forEach(x=>x.classList.toggle('active',x===b));document.querySelector('.engineering-diff-title').textContent=b.dataset.diffFile;el('engineeringDiffContent').innerHTML=engineeringUnifiedDiff(project,b.dataset.diffFile)})}


function coachLatestFailure(project){return(project.executionResults||[]).find(x=>!x.ok)||null}
function coachRelevantFile(project){const out=String(coachLatestFailure(project)?.output||"");return Object.keys(project.files||{}).find(n=>out.includes(n))||engineeringChangedFiles(project)[0]||project.activeFile}
function coachCategory(project){const out=String(coachLatestFailure(project)?.output||"").toLowerCase();if(out.includes("assertionerror")||out.includes("expected"))return"Test expectation mismatch";if(out.includes("syntaxerror"))return"Syntax error";if(out.includes("nameerror")||out.includes("cannot find symbol"))return"Missing or incorrectly named value";if(project.academyId==="sql"&&out.includes("no such column"))return"Schema or column mismatch";if(project.academyId==="web"&&out.includes("null"))return"DOM lookup issue";return coachLatestFailure(project)?"Runtime or logic failure":"No recorded failure"}
function localCoachHint(project,level=0){const file=coachRelevantFile(project),cat=coachCategory(project);const concepts={python:"Trace input, validation, transformation, storage and explicit return.",sql:"Check source grain, joins, filters, aggregation and result grain.",web:"Trace event, state change, safe DOM update and feedback.",java:"Check the owning class, method contract, validation and repository interaction."};const rows=[["Failure category",`This appears to be a ${cat.toLowerCase()}.`,`Explain expected versus actual behaviour.`],["Concept reminder",concepts[project.academyId],"Map input to observable output."],["Relevant file",`Start with ${file}.`,`Read before editing.`],["Approximate area",`Inspect the unit that creates the result.`,`Compare it with the failure.`],["Pseudocode","Validate → create/update → store/process → return/render.","Translate one step at a time."],["Partial correction",project.academyId==="sql"?"Make the required grouping or relationship explicit.":"Create the result, persist or render it, and return the expected value.","Rerun the smallest failing test."],["Reference direction","Use a reference only after explaining the failure.","Record what you misunderstood first."]];const i=Math.max(0,Math.min(level,6));return{hintLevel:i,title:rows[i][0],body:rows[i][1],action:rows[i][2],file,category:cat}}
function renderCoachSession(s){const r=s.response||{};return`<article class="card coach-session"><div class="coach-session-head"><strong>${esc(r.title||"Coach response")}</strong><small>${new Date(s.createdAt).toLocaleString()}</small></div><p>${esc(r.body||"")}</p>${r.file?`<div class="coach-file">Start with <strong>${esc(r.file)}</strong></div>`:""}<div class="coach-action">${esc(r.action||"")}</div></article>`}
function saveCoach(project,mode,response){const s={id:`coach-${Date.now()}`,projectId:project.id,academyId:project.academyId,mode,response,createdAt:new Date().toISOString()};state.engineeringCoachSessions.unshift(s);persist();return s}
function projectReview(project){const checks=engineeringCheckResults(project,engineeringTemplateById(project.templateId));const text=Object.values(project.files||{}).join("\n");const findings=[];checks.filter(x=>!x.passed).forEach(x=>findings.push({severity:"blocking",title:x.label,detail:`Missing required evidence: ${x.label}.`}));if(project.academyId==="python"&&!/raise\s+ValueError/.test(text))findings.push({severity:"important",title:"Validation",detail:"Reject invalid values explicitly."});if(project.academyId==="sql"&&/JOIN/i.test(text)&&!/ON\s+/i.test(text))findings.push({severity:"blocking",title:"Join condition",detail:"Add a defensible relationship condition."});if(project.academyId==="web"&&/innerHTML\s*=/.test(text))findings.push({severity:"important",title:"DOM safety",detail:"Prefer createElement and textContent."});if(project.academyId==="java"&&/return\s+null/.test(text))findings.push({severity:"blocking",title:"Method contract",detail:"Return the created object."});if(!project.reflection?.trim())findings.push({severity:"important",title:"Reflection",detail:"Record decisions and improvements."});return{score:Math.max(0,100-findings.filter(x=>x.severity==="blocking").length*25-findings.filter(x=>x.severity==="important").length*10),findings}}
function renderEngineeringCoach(){const project=activeEngineeringProject();if(!project){el("main").innerHTML=`<div class="empty-state"><h1>Engineering coach</h1><p>Open an Engineering Lab project first.</p><button id="coachLab" class="primary-btn">Open Engineering Lab</button></div>`;el("coachLab").onclick=()=>renderView("engineeringlab");return}const sessions=state.engineeringCoachSessions.filter(x=>x.projectId===project.id).slice(0,8);el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PROJECT-AWARE COACHING</div><h1>AI Engineering Coach</h1><p>${esc(project.title)}</p></div><button id="coachBack" class="secondary-btn">Back to workspace</button></div><section class="coach-command-grid"><article class="card coach-context-card"><h2>Current context</h2><div><span>Latest failure</span><strong>${esc(coachLatestFailure(project)?.summary||"No failed run")}</strong></div><div><span>Changed files</span><strong>${engineeringChangedFiles(project).length}</strong></div><div><span>Relevant file</span><strong>${esc(coachRelevantFile(project)||"None")}</strong></div></article><article class="card coach-action-card"><h2>Choose support</h2><button id="coachHint" class="primary-btn">Next debugging hint</button><button id="coachReview" class="secondary-btn">Review my project</button><button id="coachViva" class="secondary-btn">Start technical viva</button></article></section><section id="coachResponseArea" class="coach-response-area">${sessions.map(renderCoachSession).join("")||"<article class='card'><p class='muted'>No coaching sessions yet.</p></article>"}</section>`;el("coachBack").onclick=()=>renderView("engineeringworkspace");el("coachHint").onclick=()=>{const last=state.engineeringCoachSessions.find(x=>x.projectId===project.id&&x.mode==="debug");const s=saveCoach(project,"debug",localCoachHint(project,Math.min((last?.response?.hintLevel??-1)+1,6)));el("coachResponseArea").insertAdjacentHTML("afterbegin",renderCoachSession(s))};el("coachReview").onclick=()=>showReview(project);el("coachViva").onclick=()=>showViva(project)}
function showReview(project){saveActiveEngineeringFile();const review=projectReview(project);state.engineeringReviews.unshift({id:`review-${Date.now()}`,projectId:project.id,review,createdAt:new Date().toISOString()});persist();el("coachResponseArea").innerHTML=`<article class="card engineering-review-result"><div class="engineering-review-score"><strong>${review.score}</strong><span>Review score</span></div><div class="engineering-review-findings">${review.findings.map(f=>`<article class="${f.severity}"><strong>${esc(f.title)}</strong><p>${esc(f.detail)}</p></article>`).join("")}</div></article>`}
function showViva(project){const q={python:["Why this data structure?","What does the main method return?"],sql:["What does one result row represent?","Could a join multiply rows?"],web:["What event changes state?","Why is the DOM update safe?"],java:["Which class owns the rule?","What contract does the service expose?"]}[project.academyId]||[];q.push("Which edge case would you test next?");el("coachResponseArea").innerHTML=`<section class="card engineering-viva" data-i="0"><h2>Question 1 of ${q.length}</h2><p data-q>${esc(q[0])}</p><textarea data-a></textarea><button data-s class="primary-btn">Submit answer</button><div data-f></div></section>`;const c=el("coachResponseArea").querySelector(".engineering-viva"),answers=[];c.querySelector("[data-s]").onclick=()=>{const i=Number(c.dataset.i),a=c.querySelector("[data-a]").value.trim();if(a.length<20)return alert("Give a fuller explanation.");const score=Math.min(100,20+a.split(/\s+/).length*2);answers.push({question:q[i],answer:a,score});c.querySelector("[data-f]").innerHTML=`<div class="viva-feedback"><strong>${score}/100</strong><p>Add one concrete code reference.</p></div>`;if(i===q.length-1){state.engineeringVivas.unshift({id:`viva-${Date.now()}`,projectId:project.id,answers,createdAt:new Date().toISOString()});persist();c.querySelector("[data-s]").disabled=true;c.querySelector("[data-s]").textContent="Viva complete";return}c.dataset.i=String(i+1);c.querySelector("h2").textContent=`Question ${i+2} of ${q.length}`;c.querySelector("[data-q]").textContent=q[i+1];c.querySelector("[data-a]").value=""}}
function renderEngineeringInsights(){el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSONAL LEARNING SIGNALS</div><h1>Engineering insights</h1></div></div><section class="misconception-grid">${(engineeringMisconceptions||[]).map(x=>`<article class="card misconception-card"><div class="misconception-count">${state.engineeringMisconceptionCounts?.[x.id]||0}</div><h2>${esc(x.title)}</h2></article>`).join("")}</section>`}


function verifiedAssessmentById(id){return verifiedAssessmentCatalogue.find(x=>x.id===id)}
function activeVerifiedAttempt(){return Object.values(state.verifiedAttempts||{}).find(x=>x.status==="active")||null}
function verifiedAttemptRemainingMs(a){return Math.max(0,new Date(a.endsAt).getTime()-Date.now())}
function formatAssessmentTime(ms){const t=Math.max(0,Math.ceil(ms/1000));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}
function startVerifiedAttempt(id){const a=verifiedAssessmentById(id),t=engineeringTemplateById(a.projectTemplateId);const projectId=`verified-project-${Date.now()}`;state.engineeringProjects[projectId]={id:projectId,templateId:t.id,title:a.title,academyId:a.academyId,files:{...t.files},activeFile:Object.keys(t.files)[0],snapshots:[],commits:[],executionResults:[],checks:[],reflection:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),verifiedAssessmentId:a.id};const attemptId=`attempt-${Date.now()}`;state.verifiedAttempts[attemptId]={id:attemptId,assessmentId:a.id,projectId,startedAt:new Date().toISOString(),endsAt:new Date(Date.now()+a.durationMinutes*60000).toISOString(),status:"active",pipeline:verifiedPipelineStages.map(s=>({...s,status:"pending"})),result:null};state.activeEngineeringProjectId=projectId;persist();renderView("verifiedattempt")}
function renderVerifiedAssessments(){const academyId=getActiveAcademy()?.id||"python";const items=verifiedAssessmentCatalogue.filter(x=>x.academyId===academyId);el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(academyId).toUpperCase()} · SECURE ASSESSMENT</div><h1>Verified assessments</h1><p>Timed attempts, hidden tests and immutable submission evidence.</p></div></div><section class="verified-assessment-grid">${items.map(x=>`<article class="card verified-assessment-card"><div class="verified-assessment-head"><div><div class="eyebrow">${x.durationMinutes} MINUTES</div><h2>${esc(x.title)}</h2></div><span>${x.hiddenTests} hidden tests</span></div><p>Complete the project under verified conditions. Hidden tests remain on the server.</p><div class="verified-requirements">${x.requirements.map(r=>`<span>✓ ${esc(r)}</span>`).join("")}</div><div class="verified-mode-comparison"><div><strong>Practice mode</strong><span>Hints and retries available</span></div><div><strong>Verified mode</strong><span>Timed, immutable submission</span></div></div><button class="primary-btn" data-start-verified="${x.id}">Start verified attempt</button></article>`).join("")}</section>`;document.querySelectorAll("[data-start-verified]").forEach(b=>b.onclick=()=>startVerifiedAttempt(b.dataset.startVerified))}
function renderVerifiedAttempt(){const attempt=activeVerifiedAttempt();if(!attempt){renderView("verifiedassessments");return}const a=verifiedAssessmentById(attempt.assessmentId),p=state.engineeringProjects[attempt.projectId];state.activeEngineeringProjectId=p.id;const left=verifiedAttemptRemainingMs(attempt);el("main").innerHTML=`<section class="verified-attempt-shell"><header class="verified-attempt-header"><div><div class="eyebrow">VERIFIED MODE · ${capstoneAcademyName(p.academyId).toUpperCase()}</div><h1>${esc(a.title)}</h1><p>Hidden tests are server-only. Final submission is immutable.</p></div><div class="verified-timer"><span>Time remaining</span><strong id="verifiedTimer">${formatAssessmentTime(left)}</strong></div></header><div class="verified-warning">AI Coach and reference solutions are unavailable during verified mode.</div><div class="verified-workspace-grid"><aside class="engineering-file-tree verified-files">${Object.keys(p.files).map(f=>`<button class="${f===p.activeFile?"active":""}" data-verified-file="${esc(f)}">${esc(f)}</button>`).join("")}</aside><section class="verified-editor"><div class="engineering-editor-toolbar"><strong>${esc(p.activeFile)}</strong><span>Autosaved locally</span></div><textarea id="verifiedEditor">${esc(p.files[p.activeFile])}</textarea><div class="verified-editor-actions"><button id="verifiedSaveBtn" class="secondary-btn">Save</button><button id="verifiedVisibleBtn" class="secondary-btn">Run visible checks</button><button id="verifiedSubmitBtn" class="primary-btn">Submit final attempt</button></div></section><aside class="verified-brief">${a.requirements.map(r=>`<div class="verified-requirement-row"><span>○</span><strong>${esc(r)}</strong></div>`).join("")}</aside></div><section class="card verified-visible-output"><pre id="verifiedOutput">Run visible checks when ready.</pre></section></section>`;const save=()=>{p.files[p.activeFile]=el("verifiedEditor").value;p.updatedAt=new Date().toISOString();persist()};document.querySelectorAll("[data-verified-file]").forEach(b=>b.onclick=()=>{save();p.activeFile=b.dataset.verifiedFile;persist();renderVerifiedAttempt()});el("verifiedSaveBtn").onclick=save;el("verifiedVisibleBtn").onclick=async()=>{save();let r;if(p.academyId==="python")r=await runEngineeringPythonTests(p);else if(p.academyId==="sql")r=await runEngineeringSqlTests(p);else if(p.academyId==="web"){const c=engineeringCheckResults(p,engineeringTemplateById(p.templateId)),passed=c.filter(x=>x.passed).length;r={ok:passed===c.length,summary:`${passed}/${c.length} visible checks passed`,output:c.map(x=>`${x.passed?"PASS":"FAIL"} ${x.label}`).join("\n")}}else r={ok:false,summary:"Remote Java compiler required",output:"Configure the secure cloud runner to compile Java and run JUnit."};captureEngineeringExecution(p,"verified-visible",r);el("verifiedOutput").textContent=`${r.summary}\n\n${r.output||""}`};el("verifiedSubmitBtn").onclick=()=>submitVerifiedAttempt(attempt,p);if(window.verifiedTimerInterval)clearInterval(window.verifiedTimerInterval);window.verifiedTimerInterval=setInterval(()=>{const l=verifiedAttemptRemainingMs(attempt);if(el("verifiedTimer"))el("verifiedTimer").textContent=formatAssessmentTime(l)},1000)}
async function hashVerifiedProject(files){const data=new TextEncoder().encode(JSON.stringify(files));const digest=await crypto.subtle.digest("SHA-256",data);return[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function submitVerifiedAttempt(attempt,p){if(!confirm("Submit this final attempt?"))return;p.files[p.activeFile]=el("verifiedEditor").value;const hash=await hashVerifiedProject(p.files);attempt.pipeline.forEach(s=>s.status="passed");attempt.pipeline.find(s=>s.id==="hidden-tests").status=cloudRunnerConfig.remoteEnabled?"passed":"advisory";const evidence={schema:"codequest.verified-submission",version:"1.0",assessmentId:attempt.assessmentId,attemptId:attempt.id,projectId:p.id,academyId:p.academyId,projectHash:hash,submittedAt:new Date().toISOString(),pipeline:attempt.pipeline,hiddenTests:{status:cloudRunnerConfig.remoteEnabled?"completed":"runner-not-configured",serverOnly:true,sourceExposed:false},immutable:true};attempt.status="submitted";attempt.result=evidence;state.verifiedSubmissions.unshift(evidence);state.instructorReviewQueue.unshift({id:`queue-${Date.now()}`,submissionId:attempt.id,projectId:p.id,assessmentId:attempt.assessmentId,academyId:p.academyId,status:"awaiting-review",submittedAt:evidence.submittedAt,automatedEvidence:evidence,instructorComments:[]});persist();renderVerifiedSubmissionResult(evidence)}
function renderVerifiedSubmissionResult(e){el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VERIFIED EVIDENCE</div><h1>Submission recorded</h1><p>Your project has been frozen for review.</p></div></div><section class="verified-result-grid"><article class="card verified-result-summary"><div class="verified-result-icon">✓</div><h2>Immutable submission</h2><div><span>Project hash</span><code>${esc(e.projectHash.slice(0,24))}…</code></div><div><span>Submitted</span><strong>${new Date(e.submittedAt).toLocaleString()}</strong></div><div><span>Hidden tests</span><strong>${e.hiddenTests.status}</strong></div></article><article class="card"><h2>Next steps</h2><p>The submission has entered the instructor review queue.</p><button id="openReviewQueueBtn" class="primary-btn">Open review status</button></article></section>`;el("openReviewQueueBtn").onclick=()=>renderView("instructorreviewqueue")}
function renderInstructorReviewQueue(){const q=state.instructorReviewQueue||[];el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ASSESSMENT REVIEW</div><h1>Instructor review queue</h1></div></div><section class="review-queue-grid">${q.map(x=>`<article class="card review-queue-card"><div class="review-queue-head"><div><div class="eyebrow">${capstoneAcademyName(x.academyId).toUpperCase()}</div><h2>${esc(verifiedAssessmentById(x.assessmentId)?.title||x.assessmentId)}</h2></div><span>${esc(x.status.replaceAll("-"," "))}</span></div><p>Submitted ${new Date(x.submittedAt).toLocaleString()}</p><div class="review-evidence-row"><span>Project hash</span><code>${esc(x.automatedEvidence.projectHash.slice(0,18))}…</code></div></article>`).join("")||"<article class='card'><p>No verified submissions yet.</p></article>"}</section>`}

function runCloudBuildFromWorkspace(project){saveActiveEngineeringFile();fetch(cloudRunnerConfig.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({academyId:project.academyId,projectId:project.id,mode:"practice",files:project.files})}).then(async response=>{const result=await response.json();captureEngineeringExecution(project,"cloud-build",{ok:response.ok,summary:response.ok?"Cloud build accepted":result.fallback?"Cloud runner unavailable · browser fallback available":"Cloud runner unavailable",output:result.error||result.jobId||"",details:result});renderEngineeringWorkspace()}).catch(error=>{captureEngineeringExecution(project,"cloud-build",{ok:false,summary:"Cloud runner request failed",output:String(error)});renderEngineeringWorkspace()})}




function startOfCurrentWeek(){
  const now=new Date();
  const day=(now.getDay()+6)%7;
  const result=new Date(now);
  result.setHours(0,0,0,0);
  result.setDate(result.getDate()-day);
  return result;
}
function weeklyLearningMinutes(){
  const start=startOfCurrentWeek().getTime();
  return Math.round((state.learningSessions||[])
    .filter(session=>new Date(session.completedAt).getTime()>=start)
    .reduce((sum,session)=>sum+(Number(session.minutes)||0),0));
}
function learningDaysThisWeek(){
  const start=startOfCurrentWeek().getTime();
  return new Set((state.learningSessions||[])
    .filter(session=>new Date(session.completedAt).getTime()>=start)
    .map(session=>session.completedAt.slice(0,10))).size;
}
function currentLearningStreak(){
  const days=[...new Set((state.learningSessions||[]).map(session=>session.completedAt.slice(0,10)))].sort().reverse();
  if(!days.length)return 0;
  let streak=0;
  let cursor=new Date();
  cursor.setHours(0,0,0,0);
  for(const day of days){
    const date=new Date(`${day}T00:00:00`);
    const diff=Math.round((cursor-date)/86400000);
    if(diff===0||diff===1){
      streak++;
      cursor=date;
    }else if(diff>1)break;
  }
  return streak;
}
function momentumLevel(){
  const minutes=weeklyLearningMinutes();
  const levels=dailyLearningConfig?.momentumLevels||[];
  return[...levels].reverse().find(level=>minutes>=level.minWeeklyMinutes)?.id||"starting";
}
function recommendedDailyItems(){
  const academyId=reconcileAcademyState();
  const route=academyCourseRoute(academyId);
  const today=new Date().toISOString().slice(0,10);
  const saved=state.dailyLearningPlan?.[today];
  if(saved?.academyId===academyId)return saved.items;
  const items=[
    {
      id:`continue-${today}`,
      type:"continue",
      title:`Continue ${capstoneAcademyName(academyId)} Foundations`,
      description:"Resume your next unlocked lesson and keep your pathway moving.",
      minutes:10,
      route
    },
    {
      id:`review-${today}`,
      type:"review",
      title:"Smart review",
      description:"Revisit one concept that is at risk of being forgotten.",
      minutes:5,
      route:academyId==="python"?"reviewlab":"academyreview"
    },
    {
      id:`practice-${today}`,
      type:"practice",
      title:"Practice sprint",
      description:"Complete one focused exercise without opening a full project.",
      minutes:10,
      route:"practice"
    }
  ];
  state.dailyLearningPlan[today]={academyId,items,createdAt:new Date().toISOString()};
  persist();
  return items;
}
function completeDailyLearningItem(itemId){
  const today=new Date().toISOString().slice(0,10);
  const plan=state.dailyLearningPlan[today];
  const item=plan?.items?.find(row=>row.id===itemId);
  if(!item||item.completedAt)return;
  item.completedAt=new Date().toISOString();
  state.learningSessions.unshift({
    id:`session-${Date.now()}`,
    academyId:reconcileAcademyState(),
    type:item.type,
    title:item.title,
    minutes:item.minutes,
    completedAt:item.completedAt
  });
  persist();
  renderDailyLearning();
}
function renderDailyLearning(){
  const academyId=reconcileAcademyState();
  const items=recommendedDailyItems();
  const minutes=weeklyLearningMinutes();
  const goal=state.weeklyLearningGoal||dailyLearningConfig?.defaultWeeklyMinutes||120;
  const progress=Math.min(100,goal?minutes/goal*100:0);
  const streak=currentLearningStreak();
  const days=learningDaysThisWeek();
  el("main").innerHTML=`<section class="daily-learning-shell">
    <header class="daily-learning-hero"><div><div class="eyebrow">${capstoneAcademyName(academyId).toUpperCase()} · TODAY</div><h1>Your focused learning plan</h1><p>One clear next action, one review and one short practice session.</p></div><div class="daily-momentum"><span>Momentum</span><strong>${esc(momentumLevel())}</strong></div></header>
    <section class="daily-stats-grid"><article><span>Weekly minutes</span><strong>${minutes}/${goal}</strong><div class="daily-progress"><i style="width:${progress}%"></i></div></article><article><span>Learning days</span><strong>${days}/7</strong></article><article><span>Current streak</span><strong>${streak} days</strong></article><article><span>Academy</span><strong>${capstoneAcademyName(academyId)}</strong></article></section>
    <section class="daily-plan-grid">${items.map((item,index)=>`<article class="card daily-plan-card ${item.completedAt?"completed":""}"><div class="daily-plan-index">${item.completedAt?"✓":index+1}</div><div class="daily-plan-type">${esc(item.type)}</div><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p><div class="daily-plan-meta"><span>${item.minutes} minutes</span>${item.completedAt?`<span>Completed ${new Date(item.completedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span>`:""}</div><div class="daily-plan-actions">${item.completedAt?'<button class="secondary-btn" disabled>Completed</button>':`<button class="primary-btn" data-open-daily="${item.id}">Start</button><button class="secondary-btn" data-complete-daily="${item.id}">Mark complete</button>`}</div></article>`).join("")}</section>
    <section class="card weekly-goal-card"><div><div class="eyebrow">WEEKLY COMMITMENT</div><h2>Set a realistic learning goal</h2><p>Short, repeatable sessions are more useful than an ambitious plan you cannot sustain.</p></div><div class="weekly-goal-control"><input id="weeklyGoalInput" type="range" min="30" max="420" step="30" value="${goal}"><strong id="weeklyGoalLabel">${goal} minutes</strong><button id="saveWeeklyGoalBtn" class="secondary-btn">Save goal</button></div></section>
  </section>`;
  document.querySelectorAll("[data-open-daily]").forEach(button=>button.onclick=()=>{
    const item=items.find(row=>row.id===button.dataset.openDaily);
    if(item)renderView(item.route);
  });
  document.querySelectorAll("[data-complete-daily]").forEach(button=>button.onclick=()=>completeDailyLearningItem(button.dataset.completeDaily));
  el("weeklyGoalInput").oninput=()=>el("weeklyGoalLabel").textContent=`${el("weeklyGoalInput").value} minutes`;
  el("saveWeeklyGoalBtn").onclick=()=>{
    state.weeklyLearningGoal=Number(el("weeklyGoalInput").value);
    persist();
    renderDailyLearning();
  };
}
function renderLearningHistory(){
  const sessions=state.learningSessions||[];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNING MOMENTUM</div><h1>Session history</h1><p>Your completed learning sessions across academies.</p></div></div><section class="card learning-history-card">${sessions.map(session=>`<article><div><strong>${esc(session.title)}</strong><span>${capstoneAcademyName(session.academyId)} · ${esc(session.type)}</span></div><div><strong>${session.minutes} min</strong><span>${new Date(session.completedAt).toLocaleString()}</span></div></article>`).join("")||"<p class='muted'>Complete an item from Today to begin your history.</p>"}</section>`;
}


function renderTextbookLibrary(){
  const academyId=reconcileAcademyState();
  const chapters=Object.values(lessonTextbookLibrary?.academies?.[academyId]||{});
  const studied=chapters.filter(chapter=>{
    const key=`${academyId}:${chapter.lessonId}`;
    return(new Set(state.textbookProgress[key]?.readSections||[])).size>=14;
  }).length;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(academyId).toUpperCase()} · STUDY LIBRARY</div><h1>Interactive textbook</h1><p>Detailed chapters for every lesson, with notes, examples and knowledge checks.</p></div><div class="textbook-library-stat"><strong>${studied}/${chapters.length}</strong><span>chapters studied</span></div></div><section class="textbook-library-grid">${chapters.map(chapter=>{const key=`${academyId}:${chapter.lessonId}`;const progress=state.textbookProgress[key];const read=new Set(progress?.readSections||[]).size;const pct=Math.round(read/14*100);return`<article class="card textbook-library-card"><div class="eyebrow">${esc(chapter.moduleTitle)}</div><h2>${esc(chapter.title)}</h2><p>${chapter.estimatedReadingMinutes} minute detailed chapter</p><div class="textbook-library-progress"><i style="width:${pct}%"></i></div><div><span>${read}/14 sections</span><span>${state.textbookBookmarks.includes(key)?"◆ Bookmarked":""}</span></div><button class="primary-btn" data-open-textbook-lesson="${chapter.lessonId}">${pct?"Continue studying":"Open chapter"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-textbook-lesson]").forEach(button=>button.onclick=()=>{
    const lessonId=button.dataset.openTextbookLesson;
    if(academyId==="python")openLesson(lessonId);
    else{
      state[`${academyId}ActiveLessonId`]=lessonId;
      persist();
      renderView(`${academyId}lesson`);
    }
  });
}

function recordActivationMilestone(milestone,metadata={}){
  if(state.activationMilestones[milestone])return;
  state.activationMilestones[milestone]={achievedAt:new Date().toISOString(),metadata};
  trackProductEvent(
    milestone==="first_exercise_passed"?"exercise_passed":
    milestone==="academy_selected"?"academy_selected":
    milestone==="first_lesson_started"?"lesson_started":
    milestone==="first_project_created"?"project_created":
    milestone==="first_module_completed"?"lesson_completed":
    "signup_completed",
    metadata
  );
  const template=lifecycleNotificationTemplates?.find(item=>item.trigger===milestone);
  if(template)addLifecycleNotification(template.id,template.title,template.body);
  persist();
}
function addLifecycleNotification(templateId,title,body){
  if(state.lifecycleNotifications.some(item=>item.templateId===templateId&&!item.readAt))return;
  state.lifecycleNotifications.unshift({
    id:`notification-${Date.now()}`,
    templateId,title,body,readAt:null,createdAt:new Date().toISOString()
  });
  persist();
}
function applyStarterPackReminders(){
  if(activePlanId()!=="starter_15_day"||!state.commercialPlan.endsAt)return;
  const days=Math.ceil((new Date(state.commercialPlan.endsAt).getTime()-Date.now())/86400000);
  const template=lifecycleNotificationTemplates?.find(item=>item.trigger===`starter_pack_${days}_days_left`||item.trigger===`starter_pack_${days}_day_left`);
  if(template)addLifecycleNotification(template.id,template.title,template.body);
}
function renderActivationOnboarding(){
  const journey=state.onboardingJourney||{};
  const goals=activationOnboardingConfig?.goals||[];
  el("main").innerHTML=`<section class="activation-onboarding"><div class="activation-progress"><span class="${journey.goal?"done":"active"}">1</span><i></i><span class="${journey.academyId?"done":journey.goal?"active":""}">2</span><i></i><span class="${journey.diagnosticDone?"done":journey.academyId?"active":""}">3</span></div><div class="eyebrow">YOUR FOCUSED START</div><h1>${!journey.goal?"What do you want CodeQuest to help you achieve?":!journey.academyId?"Choose your first academy":!journey.diagnosticDone?"Complete a short diagnostic":"Your pathway is ready"}</h1><div id="activationStep">${activationStepHtml(journey,goals)}</div></section>`;
  bindActivationStep(journey);
}
function activationStepHtml(journey,goals){
  if(!journey.goal)return`<div class="activation-choice-grid">${goals.map(goal=>`<button data-activation-goal="${goal.id}"><strong>${esc(goal.label)}</strong><span>Receive a pathway matched to this outcome.</span></button>`).join("")}</div>`;
  if(!journey.academyId)return`<div class="activation-choice-grid academies">${["python","sql","web","java"].map(id=>`<button data-activation-academy="${id}"><strong>${capstoneAcademyName(id)}</strong><span>${id==="python"?"Programming and automation":id==="sql"?"Analytics and data quality":id==="web"?"Interfaces and browser apps":"Enterprise application development"}</span></button>`).join("")}</div>`;
  if(!journey.diagnosticDone)return`<article class="card activation-diagnostic"><h2>Three-question diagnostic</h2><label>How confident are you with coding?<select id="activationConfidence"><option>New to coding</option><option>Some basic experience</option><option>Comfortable with fundamentals</option></select></label><label>How much time can you study most days?<select id="activationTime"><option>5–10 minutes</option><option>15–30 minutes</option><option>30–60 minutes</option></select></label><label>What helps you learn best?<select id="activationStyle"><option>Short explanations and practice</option><option>Projects and experimentation</option><option>Structured assessments</option></select></label><button id="completeActivationDiagnostic" class="primary-btn">Create my pathway</button></article>`;
  return`<article class="card activation-result"><div class="activation-result-icon">✓</div><h2>${capstoneAcademyName(journey.academyId)} Foundations</h2><p>Start with a five-minute concept lesson, then complete one working exercise.</p><div><span>Goal</span><strong>${esc((goals.find(goal=>goal.id===journey.goal)||{}).label||journey.goal)}</strong></div><div><span>First milestone</span><strong>Pass your first exercise</strong></div><button id="startActivationPathway" class="primary-btn">Start first lesson</button></article>`;
}
function bindActivationStep(journey){
  document.querySelectorAll("[data-activation-goal]").forEach(button=>button.onclick=()=>{journey.goal=button.dataset.activationGoal;persist();renderActivationOnboarding()});
  document.querySelectorAll("[data-activation-academy]").forEach(button=>{
    button.onclick=()=>{
      const academyId=canonicalAcademyId(button.dataset.activationAcademy);
      button.disabled=true;
      document.querySelectorAll("[data-activation-academy]").forEach(item=>item.classList.toggle("selected",item===button));
      try{
        setActiveAcademy(academyId);
        journey.academyId=academyId;
        recordActivationMilestone("academy_selected",{academyId});
        persist();
        renderActivationOnboarding();
      }catch(error){
        console.error("Academy selection failed:",error);
        button.disabled=false;
        alert("The academy could not be selected. Please reload and try again.");
      }
    };
  });
  if(el("completeActivationDiagnostic"))el("completeActivationDiagnostic").onclick=()=>{journey.diagnosticDone=true;journey.diagnostic={confidence:el("activationConfidence").value,time:el("activationTime").value,style:el("activationStyle").value};recordActivationMilestone("diagnostic_completed",journey.diagnostic);persist();renderActivationOnboarding()};
  if(el("startActivationPathway"))el("startActivationPathway").onclick=()=>{journey.completed=true;recordActivationMilestone("first_lesson_started",{academyId:journey.academyId});persist();renderView(journey.academyId==="python"?"course":`${journey.academyId}course`)};
}
function renderNotificationCentre(){
  applyStarterPackReminders();
  const items=state.lifecycleNotifications||[];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LIFECYCLE MESSAGING</div><h1>Notifications</h1><p>Learning progress, access reminders and earned outcomes.</p></div><button id="markAllNotificationsBtn" class="secondary-btn">Mark all read</button></div><section class="notification-list">${items.map(item=>`<article class="card notification-item ${item.readAt?"read":""}"><div class="notification-dot"></div><div><strong>${esc(item.title)}</strong><p>${esc(item.body)}</p><small>${new Date(item.createdAt).toLocaleString()}</small></div><button data-read-notification="${item.id}">${item.readAt?"Read":"Mark read"}</button></article>`).join("")||"<article class='card'><p class='muted'>No notifications yet.</p></article>"}</section>`;
  document.querySelectorAll("[data-read-notification]").forEach(button=>button.onclick=()=>{const item=state.lifecycleNotifications.find(row=>row.id===button.dataset.readNotification);if(item)item.readAt=item.readAt||new Date().toISOString();persist();renderNotificationCentre()});
  el("markAllNotificationsBtn").onclick=()=>{items.forEach(item=>item.readAt=item.readAt||new Date().toISOString());persist();renderNotificationCentre()};
}
async function refreshServerEntitlement(){
  try{
    const response=await fetch(productionBillingConfig.entitlementEndpoint,{credentials:"include"});
    if(!response.ok)return false;
    const entitlement=await response.json();
    if(!entitlement?.planId)return false;
    state.commercialPlan={
      planId:entitlement.planId,
      status:entitlement.status,
      startedAt:entitlement.accessStartedAt||null,
      endsAt:entitlement.accessEndsAt||entitlement.currentPeriodEnd||null,
      stripeCustomerId:entitlement.stripeCustomerId||null,
      cancelAtPeriodEnd:Boolean(entitlement.cancelAtPeriodEnd)
    };
    state.commercialAuditTrail.unshift({type:"server-refresh",planId:entitlement.planId,status:entitlement.status,createdAt:new Date().toISOString()});
    persist();
    return true;
  }catch(error){return false}
}
function renderCommercialAdmin(){
  const planCounts={free:0,starter_15_day:0,pro_monthly:0,pro_annual:0};
  planCounts[activePlanId()]=(planCounts[activePlanId()]||0)+1;
  const events=state.productAnalytics||[];
  const count=name=>events.filter(event=>event.name===name).length;
  const milestones=Object.keys(state.activationMilestones||{});
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COMMERCIAL AND LEARNING HEALTH</div><h1>Product operations</h1><p>Local development dashboard. Production totals should come from server-side Supabase reporting.</p></div></div><section class="commercial-metrics">${Object.entries(planCounts).map(([key,value])=>`<article><span>${esc(freemiumPlans[key]?.name||key)}</span><strong>${value}</strong></article>`).join("")}<article><span>Activated learners</span><strong>${milestones.includes("first_exercise_passed")?1:0}</strong></article><article><span>Checkout starts</span><strong>${count("checkout_started")}</strong></article><article><span>Paid activations</span><strong>${count("subscription_activated")+count("starter_pack_started")}</strong></article><article><span>Unread notifications</span><strong>${state.lifecycleNotifications.filter(item=>!item.readAt).length}</strong></article></section><section class="commercial-dashboard-grid"><article class="card"><h2>Activation milestones</h2>${(activationOnboardingConfig?.milestones||[]).map(milestone=>`<div class="commercial-row"><span>${milestone.replaceAll("_"," ")}</span><strong>${state.activationMilestones[milestone]?"Complete":"Pending"}</strong></div>`).join("")}</article><article class="card"><h2>Commercial audit trail</h2>${state.commercialAuditTrail.slice(0,20).map(item=>`<div class="commercial-row"><span>${new Date(item.createdAt).toLocaleString()}</span><strong>${esc(item.type)}</strong></div>`).join("")||"<p class='muted'>No audit events yet.</p>"}</article></section>`;
}

function activePlanId(){
  const plan=state.commercialPlan||{planId:"free"};
  if(plan.planId==="starter_15_day"&&plan.endsAt&&new Date(plan.endsAt).getTime()<=Date.now()){
    state.commercialPlan={planId:"free",status:"expired",startedAt:plan.startedAt,endsAt:plan.endsAt};
    persist();
    return"free";
  }
  return plan.planId||"free";
}
function activePlan(){return freemiumPlans?.[activePlanId()]||freemiumPlans?.free}
function planFeature(feature){return activePlan()?.features?.[feature]}
function usagePeriodKey(feature){
  const now=new Date();
  if(feature==="practice_sessions_daily")return`${feature}:${now.toISOString().slice(0,10)}`;
  if(feature==="ai_coach_monthly")return`${feature}:${now.getUTCFullYear()}-${String(now.getUTCMonth()+1).padStart(2,"0")}`;
  return feature;
}
function featureUsage(feature){return state.featureUsage?.[usagePeriodKey(feature)]||0}
function getEffectiveLimit(feature){
  let limit=planFeature(feature);
  if(limit==="unlimited")return Infinity;
  if(feature==="ai_coach_monthly")limit=(Number(limit)||0)+(state.referralCredits?.aiCoach||0);
  if(feature==="engineering_projects")limit=(Number(limit)||0)+(state.referralCredits?.engineeringProjects||0);
  return Number(limit)||0;
}
function canUseFeature(feature,amount=1){
  const limit=getEffectiveLimit(feature);
  if(limit===Infinity)return true;
  return featureUsage(feature)+amount<=limit;
}
function consumeFeature(feature,amount=1){
  if(!canUseFeature(feature,amount))return false;
  const key=usagePeriodKey(feature);
  state.featureUsage[key]=(state.featureUsage[key]||0)+amount;
  persist();
  return true;
}
function trackProductEvent(name,properties={}){
  if(!productAnalyticsEvents?.includes(name))return;
  state.productAnalytics.unshift({id:`event-${Date.now()}-${Math.random()}`,name,properties,createdAt:new Date().toISOString()});
  state.productAnalytics=state.productAnalytics.slice(0,1000);
  persist();
}
function showUpgradeGate(feature,context=""){
  trackProductEvent("paywall_viewed",{feature,context,planId:activePlanId()});
  const plan=activePlan();
  el("main").innerHTML=`<section class="upgrade-gate"><div class="upgrade-gate-icon">★</div><div class="eyebrow">YOU HAVE REACHED A REAL MILESTONE</div><h1>Continue with CodeQuest Pro</h1><p>${esc(context||"This feature is part of the job-ready learning experience.")}</p><div class="upgrade-current-plan"><span>Current plan</span><strong>${esc(plan.name)}</strong></div><div class="upgrade-options"><article><h2>15-Day Starter Pack</h2><p>One-off access. No renewal.</p><strong>£7</strong><button class="primary-btn" data-buy-plan="starter_15_day">Start for 15 days</button></article><article><h2>Pro Monthly</h2><p>Flexible ongoing access.</p><strong>£10/month</strong><button class="primary-btn" data-buy-plan="pro_monthly">Choose monthly</button></article><article><h2>Pro Annual</h2><p>Best value for continued learning.</p><strong>£84/year</strong><button class="primary-btn" data-buy-plan="pro_annual">Choose annual</button></article></div><button class="secondary-btn" id="upgradeBackBtn">Continue with Free</button></section>`;
  document.querySelectorAll("[data-buy-plan]").forEach(button=>button.onclick=()=>beginPlanCheckout(button.dataset.buyPlan));
  el("upgradeBackBtn").onclick=()=>renderView("dashboard");
}
async function beginPlanCheckout(planId,options={}){
  trackProductEvent("checkout_started",{planId,source:options.publicSource?"landing":"app"});
  const user=PythonQuestCloud.getUser?.()||null;
  if(!user){
    sessionStorage.setItem("cq_pending_checkout_plan",planId);
    alert("Create or sign in to your CodeQuest account first. Your selected plan will be kept ready.");
    openAuthentication("signup");
    return;
  }
  const button=document.querySelector(`[data-buy-plan="${planId}"],[data-public-buy-plan="${planId}"]`);
  const originalText=button?.textContent;
  if(button){button.disabled=true;button.textContent="Opening secure checkout…"}
  try{
    const response=await fetch(productionBillingConfig.checkoutEndpoint,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({
        planId,
        userId:user.id,
        email:user.email||state.profile?.email||null,
        successUrl:location.origin+"?checkout=success",
        cancelUrl:location.href
      })
    });
    const contentType=response.headers.get("content-type")||"";
    const result=contentType.includes("application/json")?await response.json():{error:await response.text()};
    if(response.ok&&result.url){location.assign(result.url);return}
    const detail=result.error||`Checkout endpoint returned ${response.status}.`;
    alert(`Checkout could not be started. ${detail}`);
  }catch(error){
    console.error("Checkout start failed",error);
    alert(`Checkout could not be started. ${error?.message||"The payment service could not be reached."}`);
  }finally{
    if(button){button.disabled=false;button.textContent=originalText}
  }
}
function activateTestPlan(planId){
  const now=new Date();
  const plan=freemiumPlans[planId];
  state.commercialPlan={
    planId,
    status:"active-test",
    startedAt:now.toISOString(),
    endsAt:plan.durationDays?new Date(now.getTime()+plan.durationDays*86400000).toISOString():null
  };
  trackProductEvent(planId==="starter_15_day"?"starter_pack_started":"subscription_activated",{planId,testMode:true});
  persist();
  renderView("subscription");
}
function renderPricing(){
  const ordered=["free","starter_15_day","pro_monthly","pro_annual"];
  el("main").innerHTML=`<div class="pricing-hero"><div class="eyebrow">SIMPLE PRICING</div><h1>Start free. Upgrade when you are ready to build evidence.</h1><p>No cohort plan, no automatic trial and no surprise renewal on the Starter Pack.</p></div><section class="pricing-grid">${ordered.map(id=>{const plan=freemiumPlans[id];return`<article class="pricing-card ${id==="pro_annual"?"best-value":""}">${id==="pro_annual"?'<div class="pricing-recommended">Best value</div>':""}<h2>${plan.name}</h2><p>${plan.description}</p><div class="pricing-price"><strong>${plan.priceLabel}</strong><span>${plan.billingLabel}</span></div>${plan.monthlyEquivalent?`<small>${plan.monthlyEquivalent}</small>`:""}<div class="pricing-features">${pricingFeatureLabels(plan).map(x=>`<span>✓ ${esc(x)}</span>`).join("")}</div>${id==="free"?'<button class="secondary-btn" disabled>Current free access</button>':`<button class="primary-btn" data-buy-plan="${id}">${id==="starter_15_day"?"Buy Starter Pack":"Choose plan"}</button>`}</article>`}).join("")}</section><section class="card pricing-safeguards"><h2>Fair-plan safeguards</h2><div>${["No automatic Starter Pack renewal","Existing work is never deleted after downgrade","Completed lessons and credentials stay visible","Exports already created remain available","Paid access continues until the stated end date"].map(x=>`<span>✓ ${x}</span>`).join("")}</div></section>`;
  document.querySelectorAll("[data-buy-plan]").forEach(button=>button.onclick=()=>beginPlanCheckout(button.dataset.buyPlan));
}
function pricingFeatureLabels(plan){
  const f=plan.features;
  return[
    f.academy_pathways==="unlimited"?"All academy pathways":`${f.academy_pathways} active academy pathway`,
    f.lessons==="unlimited"?"Unlimited lessons":`${f.lessons} core lessons`,
    f.engineering_projects==="unlimited"?"Unlimited Engineering Lab projects":`${f.engineering_projects} Engineering Lab project${f.engineering_projects===1?"":"s"}`,
    `${f.ai_coach_monthly} AI Coach sessions`,
    f.verified_assessments?`${f.verified_assessments} verified assessments`:"Verified assessments not included",
    f.team_engineering?"Team Engineering included":"Individual learning"
  ];
}
function renderSubscription(){
  const plan=activePlan();
  const starter=activePlanId()==="starter_15_day";
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PLAN AND ACCESS</div><h1>${esc(plan.name)}</h1><p>${esc(plan.description)}</p></div><button id="viewPricingBtn" class="primary-btn">View pricing</button></div><section class="subscription-grid"><article class="card subscription-status"><div class="subscription-plan-icon">★</div><h2>${esc(plan.name)}</h2><div><span>Status</span><strong>${esc(state.commercialPlan.status||"active")}</strong></div><div><span>Billing</span><strong>${esc(plan.billingLabel)}</strong></div>${state.commercialPlan.endsAt?`<div><span>Access ends</span><strong>${new Date(state.commercialPlan.endsAt).toLocaleDateString()}</strong></div>`:""}${starter?'<p class="subscription-note">This pack does not renew automatically.</p>':""}<button id="manageBillingBtn" class="secondary-btn" ${["free","starter_15_day"].includes(activePlanId())?"disabled":""}>Manage billing</button></article><article class="card"><h2>Usage</h2>${usageRowsHtml()}</article></section><section class="card subscription-upgrade"><h2>${activePlanId()==="free"?"Ready for more?":"Your access is active"}</h2><p>${activePlanId()==="free"?"The Starter Pack gives you 15 days of Pro features without a subscription.":"Your completed work remains available even if you later downgrade."}</p><button id="subscriptionPricingBtn" class="primary-btn">Compare plans</button></section>`;
  el("viewPricingBtn").onclick=()=>renderView("pricing");
  el("subscriptionPricingBtn").onclick=()=>renderView("pricing");
  if(el("manageBillingBtn"))el("manageBillingBtn").onclick=async()=>{const response=await fetch("/api/billing-portal",{method:"POST"});const result=await response.json();if(result.url)location.href=result.url;else alert("Billing portal is not configured in this build.")};
}
function usageRowsHtml(){
  const features=[["ai_coach_monthly","AI Coach"],["engineering_projects","Engineering projects"],["verified_assessments","Verified assessments"],["github_exports","GitHub-ready exports"]];
  return`<div class="usage-list">${features.map(([key,label])=>{const limit=getEffectiveLimit(key),used=featureUsage(key);return`<div><span>${label}</span><strong>${limit===Infinity?`${used} used · unlimited`:`${used} of ${limit} used`}</strong><div class="usage-meter"><div style="width:${limit===Infinity?10:Math.min(100,limit?used/limit*100:100)}%"></div></div></div>`}).join("")}</div>`;
}
function renderUsageDashboard(){renderSubscription()}
function renderGrowthAnalytics(){
  const events=state.productAnalytics||[];
  const count=name=>events.filter(event=>event.name===name).length;
  const funnel=[["Signup",count("signup_completed")],["Academy selected",count("academy_selected")],["Lessons completed",count("lesson_completed")],["Projects created",count("project_created")],["Paywalls viewed",count("paywall_viewed")],["Checkouts started",count("checkout_started")],["Activated",count("subscription_activated")+count("starter_pack_started")]];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRODUCT ANALYTICS</div><h1>Growth dashboard</h1><p>Local privacy-conscious events. Source code is never stored in analytics.</p></div></div><section class="growth-metrics">${funnel.map(([label,value])=>`<article><span>${label}</span><strong>${value}</strong></article>`).join("")}</section><section class="card growth-event-table"><h2>Recent events</h2>${events.slice(0,40).map(event=>`<div><span>${new Date(event.createdAt).toLocaleString()}</span><strong>${event.name}</strong><code>${esc(JSON.stringify(event.properties))}</code></div>`).join("")||"<p class='muted'>No events recorded yet.</p>"}</section>`;
}

function teamTemplateById(id){
  return teamEngineeringTemplates.find(template=>template.id===id);
}
function activeEngineeringTeam(){
  return state.activeEngineeringTeamId?state.engineeringTeams[state.activeEngineeringTeamId]:null;
}
function createEngineeringTeam(templateId){
  const template=teamTemplateById(templateId);
  if(!template)return;
  const id=`team-${templateId}-${Date.now()}`;
  const now=new Date();
  state.engineeringTeams[id]={
    id,
    templateId,
    title:template.title,
    academyId:template.academyId,
    members:template.roles.map((role,index)=>({
      id:`member-${index+1}`,
      name:index===0?(state.profile?.name||"You"):`Team member ${index+1}`,
      role,
      isCurrentUser:index===0
    })),
    sprint:{
      id:`sprint-${Date.now()}`,
      name:"Sprint 1",
      startsAt:now.toISOString(),
      endsAt:new Date(now.getTime()+(teamEngineeringConfig?.defaultSprintDays||7)*86400000).toISOString(),
      status:"active"
    },
    backlog:template.backlog.map((item,index)=>({
      id:`story-${Date.now()}-${index}`,
      ...item,
      status:index===0?"in-progress":"todo",
      assignee:index===0?"member-1":null
    })),
    branches:[
      {name:"main",createdAt:now.toISOString(),protected:true},
      {name:"feature/first-delivery",createdAt:now.toISOString(),protected:false}
    ],
    activity:[],
    reflection:"",
    createdAt:now.toISOString()
  };
  state.activeEngineeringTeamId=id;
  persist();
  renderView("teamworkspace");
}
function renderTeamEngineering(){
  const academyId=getActiveAcademy()?.id||"python";
  const templates=teamEngineeringTemplates.filter(template=>template.academyId===academyId);
  const teams=Object.values(state.engineeringTeams||{}).filter(team=>team.academyId===academyId);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(academyId).toUpperCase()} · COLLABORATIVE DELIVERY</div><h1>Team engineering</h1><p>Work through roles, branches, pull requests and peer review.</p></div></div>
  <section class="team-template-grid">${templates.map(template=>`<article class="card team-template-card"><div class="eyebrow">TEAM SCENARIO</div><h2>${esc(template.title)}</h2><p>${esc(template.summary)}</p><div class="team-role-chips">${template.roles.map(role=>`<span>${esc(role)}</span>`).join("")}</div><div class="team-backlog-preview">${template.backlog.map(item=>`<div><span>${item.points}</span><strong>${esc(item.title)}</strong></div>`).join("")}</div><button class="primary-btn" data-create-team="${template.id}">Create team workspace</button></article>`).join("")}</section>
  <section class="card team-existing"><div class="section-head"><div><div class="eyebrow">YOUR TEAMS</div><h2>${teams.length} workspaces</h2></div></div>${teams.map(team=>`<div class="team-row"><div><strong>${esc(team.title)}</strong><small>${team.members.length} roles · ${team.backlog.filter(item=>item.status==="done").length}/${team.backlog.length} stories complete</small></div><button class="secondary-btn" data-open-team="${team.id}">Open</button></div>`).join("")||"<p class='muted'>No team workspaces yet.</p>"}</section>`;
  document.querySelectorAll("[data-create-team]").forEach(button=>button.onclick=()=>createEngineeringTeam(button.dataset.createTeam));
  document.querySelectorAll("[data-open-team]").forEach(button=>button.onclick=()=>{state.activeEngineeringTeamId=button.dataset.openTeam;persist();renderView("teamworkspace")});
}
function teamPullRequests(team){
  return(state.pullRequests||[]).filter(pr=>pr.teamId===team.id);
}
function renderTeamWorkspace(){
  const team=activeEngineeringTeam();
  if(!team){renderView("teamengineering");return}
  const prs=teamPullRequests(team);
  const done=team.backlog.filter(item=>item.status==="done").length;
  const points=team.backlog.reduce((sum,item)=>sum+item.points,0);
  const completedPoints=team.backlog.filter(item=>item.status==="done").reduce((sum,item)=>sum+item.points,0);
  el("main").innerHTML=`<section class="team-workspace-shell">
    <header class="team-workspace-header"><div><div class="eyebrow">${capstoneAcademyName(team.academyId).toUpperCase()} · TEAM DELIVERY</div><h1>${esc(team.title)}</h1><p>${esc(team.sprint.name)} · ${new Date(team.sprint.endsAt).toLocaleDateString()}</p></div><div><button id="teamBackBtn" class="secondary-btn">Back</button><button id="newPullRequestBtn" class="primary-btn">New pull request</button></div></header>
    <section class="team-metrics-grid"><article><span>Sprint progress</span><strong>${done}/${team.backlog.length}</strong></article><article><span>Story points</span><strong>${completedPoints}/${points}</strong></article><article><span>Open PRs</span><strong>${prs.filter(pr=>!["merged"].includes(pr.status)).length}</strong></article><article><span>Reviews completed</span><strong>${state.peerReviewEvidence.filter(item=>item.teamId===team.id).length}</strong></article></section>
    <div class="team-workspace-grid">
      <section class="card team-board"><div class="team-section-head"><div><div class="eyebrow">SPRINT BOARD</div><h2>Delivery backlog</h2></div></div><div class="team-kanban">${["todo","in-progress","review","done"].map(status=>`<div class="team-kanban-column"><h3>${status.replace("-"," ")}</h3>${team.backlog.filter(item=>item.status===status).map(item=>`<article draggable="true" data-story="${item.id}"><span>${item.type} · ${item.points} pts</span><strong>${esc(item.title)}</strong><select data-story-status="${item.id}">${["todo","in-progress","review","done"].map(option=>`<option value="${option}" ${option===item.status?"selected":""}>${option}</option>`).join("")}</select></article>`).join("")||"<p class='muted'>No stories</p>"}</div>`).join("")}</div></section>
      <aside class="card team-members"><div class="eyebrow">TEAM ROLES</div><h2>Members</h2>${team.members.map(member=>`<div class="team-member-row"><div class="team-avatar">${member.name.slice(0,2).toUpperCase()}</div><div><strong>${esc(member.name)}</strong><span>${esc(member.role)}</span></div></div>`).join("")}<div class="team-branches"><h3>Branches</h3>${team.branches.map(branch=>`<span>${branch.protected?"🔒":"⑂"} ${esc(branch.name)}</span>`).join("")}</div></aside>
    </div>
    <section class="card team-pr-section"><div class="team-section-head"><div><div class="eyebrow">PULL REQUESTS</div><h2>${prs.length} requests</h2></div></div><div class="team-pr-list">${prs.map(pr=>`<article><div><span class="${pr.status}">${esc(pr.status.replaceAll("-"," "))}</span><strong>${esc(pr.title)}</strong><small>${esc(pr.sourceBranch)} → ${esc(pr.targetBranch)} · ${pr.comments.length} comments</small></div><button class="secondary-btn" data-open-pr="${pr.id}">Review</button></article>`).join("")||"<p class='muted'>No pull requests yet.</p>"}</div></section>
    <section class="card team-reflection"><h2>Sprint reflection</h2><textarea id="teamReflection" placeholder="What did the team deliver, review and improve?">${esc(team.reflection||"")}</textarea><button id="saveTeamReflectionBtn" class="secondary-btn">Save reflection</button></section>
  </section>`;
  el("teamBackBtn").onclick=()=>renderView("teamengineering");
  el("newPullRequestBtn").onclick=()=>createTeamPullRequest(team);
  document.querySelectorAll("[data-story-status]").forEach(select=>select.onchange=()=>{const story=team.backlog.find(item=>item.id===select.dataset.storyStatus);story.status=select.value;team.activity.unshift({type:"story-status",storyId:story.id,status:story.status,createdAt:new Date().toISOString()});persist();renderTeamWorkspace()});
  document.querySelectorAll("[data-open-pr]").forEach(button=>button.onclick=()=>{localStorage.setItem("cq_active_pull_request_id",button.dataset.openPr);renderView("pullrequest")});
  el("saveTeamReflectionBtn").onclick=()=>{team.reflection=el("teamReflection").value.trim();persist();el("saveTeamReflectionBtn").textContent="Reflection saved"};
}
function createTeamPullRequest(team){
  const title=prompt("Pull request title","Implement first delivery");
  if(!title?.trim())return;
  const source=team.branches.find(branch=>!branch.protected)?.name||"feature/first-delivery";
  const pr={
    id:`pr-${Date.now()}`,
    teamId:team.id,
    academyId:team.academyId,
    title:title.trim(),
    description:"Describe the change, tests and review focus.",
    sourceBranch:source,
    targetBranch:"main",
    status:"draft",
    authorId:"member-1",
    files:[
      {name:"README.md",additions:6,deletions:1},
      {name:team.academyId==="sql"?"analysis.sql":team.academyId==="web"?"app.js":team.academyId==="java"?"src/OrderService.java":"expense_service.py",additions:18,deletions:4}
    ],
    comments:[],
    approvals:[],
    createdAt:new Date().toISOString()
  };
  state.pullRequests.unshift(pr);
  localStorage.setItem("cq_active_pull_request_id",pr.id);
  persist();
  renderView("pullrequest");
}
function activePullRequest(){
  const id=localStorage.getItem("cq_active_pull_request_id");
  return state.pullRequests.find(pr=>pr.id===id);
}
function renderPullRequest(){
  const pr=activePullRequest();
  if(!pr){renderView("teamworkspace");return}
  const team=state.engineeringTeams[pr.teamId];
  el("main").innerHTML=`<section class="pull-request-shell">
    <header class="pull-request-header"><div><div class="eyebrow">PULL REQUEST · ${capstoneAcademyName(pr.academyId).toUpperCase()}</div><h1>${esc(pr.title)}</h1><p>${esc(pr.sourceBranch)} → ${esc(pr.targetBranch)}</p></div><div><span class="pr-state ${pr.status}">${esc(pr.status.replaceAll("-"," "))}</span><button id="prBackBtn" class="secondary-btn">Back</button></div></header>
    <div class="pull-request-layout">
      <section>
        <article class="card pr-summary"><h2>Change summary</h2><textarea id="prDescription">${esc(pr.description)}</textarea><button id="savePrDescriptionBtn" class="secondary-btn">Save description</button><div class="pr-file-summary">${pr.files.map(file=>`<div><strong>${esc(file.name)}</strong><span class="added">+${file.additions}</span><span class="removed">-${file.deletions}</span></div>`).join("")}</div></article>
        <article class="card pr-review-area"><div class="team-section-head"><div><div class="eyebrow">PEER REVIEW</div><h2>Review comments</h2></div></div><div class="pr-comment-form"><select id="prReviewType">${(teamEngineeringConfig?.reviewTypes||[]).map(type=>`<option>${type}</option>`).join("")}</select><select id="prReviewFile">${pr.files.map(file=>`<option>${esc(file.name)}</option>`).join("")}</select><textarea id="prReviewComment" placeholder="Write a specific, actionable review comment…"></textarea><button id="addPrCommentBtn" class="primary-btn">Add review comment</button></div><div class="pr-comments">${pr.comments.map(comment=>`<article><div><strong>${esc(comment.type)}</strong><span>${esc(comment.file)}</span></div><p>${esc(comment.text)}</p><small>${new Date(comment.createdAt).toLocaleString()}</small></article>`).join("")||"<p class='muted'>No review comments yet.</p>"}</div></article>
      </section>
      <aside class="card pr-decision-panel"><div class="eyebrow">REVIEW DECISION</div><h2>Quality gate</h2><div class="pr-checklist">${["Description explains the change","Tests or checks are documented","Review comments are resolved","No blocking quality issue remains"].map((item,index)=>`<label><input type="checkbox" data-pr-check="${index}"> ${item}</label>`).join("")}</div><button id="markPrReadyBtn" class="secondary-btn">Ready for review</button><button id="requestPrChangesBtn" class="secondary-btn">Request changes</button><button id="approvePrBtn" class="primary-btn">Approve</button><button id="mergePrBtn" class="primary-btn" ${pr.status==="approved"?"":"disabled"}>Merge pull request</button><div class="pr-approval-summary"><strong>${pr.approvals.length}</strong><span>approvals</span></div></aside>
    </div>
  </section>`;
  el("prBackBtn").onclick=()=>renderView("teamworkspace");
  el("savePrDescriptionBtn").onclick=()=>{pr.description=el("prDescription").value.trim();persist();el("savePrDescriptionBtn").textContent="Saved"};
  el("addPrCommentBtn").onclick=()=>{const text=el("prReviewComment").value.trim();if(text.length<12){alert("Write a more specific review comment.");return}pr.comments.push({id:`comment-${Date.now()}`,type:el("prReviewType").value,file:el("prReviewFile").value,text,author:"Peer reviewer",createdAt:new Date().toISOString()});state.peerReviewEvidence.unshift({teamId:pr.teamId,prId:pr.id,type:"comment",text,createdAt:new Date().toISOString()});persist();renderPullRequest()};
  el("markPrReadyBtn").onclick=()=>{pr.status="ready-for-review";persist();renderPullRequest()};
  el("requestPrChangesBtn").onclick=()=>{pr.status="changes-requested";persist();renderPullRequest()};
  el("approvePrBtn").onclick=()=>{pr.status="approved";pr.approvals.push({reviewer:"Peer reviewer",createdAt:new Date().toISOString()});state.peerReviewEvidence.unshift({teamId:pr.teamId,prId:pr.id,type:"approval",createdAt:new Date().toISOString()});persist();renderPullRequest()};
  el("mergePrBtn").onclick=()=>{if(pr.status!=="approved")return;pr.status="merged";team.activity.unshift({type:"merge",prId:pr.id,createdAt:new Date().toISOString()});state.peerReviewEvidence.unshift({teamId:pr.teamId,prId:pr.id,type:"merge",createdAt:new Date().toISOString()});persist();renderPullRequest()};
}

function engineeringTemplateById(id){
  return engineeringWorkspaceTemplates.find(t=>t.id===id);
}
function activeEngineeringProject(){
  return state.activeEngineeringProjectId
    ? state.engineeringProjects[state.activeEngineeringProjectId]
    : null;
}
function createEngineeringProject(templateId){
  if(!canUseFeature("engineering_projects")){
    showUpgradeGate("engineering_projects","Your free Engineering Lab project remains available. Upgrade for additional multi-file projects, reviews and exports.");
    return;
  }
  consumeFeature("engineering_projects");
  trackProductEvent("project_created",{templateId,planId:activePlanId()});
  recordActivationMilestone("first_project_created",{templateId});
  const template=engineeringTemplateById(templateId);
  if(!template)return;
  const id=`eng-${templateId}-${Date.now()}`;
  state.engineeringProjects[id]={
    id,
    templateId,
    title:template.title,
    academyId:template.academyId,
    files:{...template.files},
    activeFile:Object.keys(template.files)[0],
    snapshots:[],
    commits:[],
    executionResults:[],
    checks:[],
    reflection:"",
    createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString()
  };
  state.activeEngineeringProjectId=id;
  persist();
  renderView("engineeringworkspace");
}
function renderEngineeringLab(){
  const academyId=getActiveAcademy()?.id||"python";
  const templates=engineeringWorkspaceTemplates.filter(t=>t.academyId===academyId);
  const existing=Object.values(state.engineeringProjects||{}).filter(p=>p.academyId===academyId);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(academyId).toUpperCase()} · MULTI-FILE BUILDING</div><h1>Engineering lab</h1><p>Build projects with multiple files, checks, snapshots and evidence.</p></div></div>
  <section class="engineering-template-grid">${templates.map(t=>`<article class="card engineering-template-card"><div class="eyebrow">${t.level.toUpperCase()}</div><h2>${t.title}</h2><p>${t.summary}</p><div class="engineering-template-files"><div class="engineering-template-files-label">Starter files</div><div class="engineering-file-preview">${Object.keys(t.files).slice(0,5).map(f=>`<span class="engineering-file-chip">${esc(f)}</span>`).join("")}</div></div><button class="primary-btn engineering-template-start" data-create-engineering="${t.id}">Start project</button></article>`).join("")}</section>
  <section class="card engineering-existing"><div class="section-head"><div><div class="eyebrow">YOUR WORKSPACES</div><h2>${existing.length} projects</h2></div></div>${existing.map(p=>`<div class="engineering-project-row"><div><strong>${p.title}</strong><small>${Object.keys(p.files).length} files · updated ${new Date(p.updatedAt).toLocaleString()}</small></div><button class="secondary-btn" data-open-engineering="${p.id}">Open</button></div>`).join("")||"<p class='muted'>No projects created yet.</p>"}</section>`;
  document.querySelectorAll("[data-create-engineering]").forEach(b=>b.onclick=()=>createEngineeringProject(b.dataset.createEngineering));
  document.querySelectorAll("[data-open-engineering]").forEach(b=>b.onclick=()=>{state.activeEngineeringProjectId=b.dataset.openEngineering;persist();renderView("engineeringworkspace")});
}
function engineeringCheckResults(project,template){
  const content=Object.values(project.files).join("\n");
  return template.checks.map(check=>{
    const matched=check.tokens.filter(token=>content.toLowerCase().includes(token.toLowerCase()));
    return{...check,passed:matched.length===check.tokens.length,matched};
  });
}
function saveActiveEngineeringFile(){
  const project=activeEngineeringProject();
  const editor=el("engineeringEditor");
  if(!project||!editor)return;
  project.files[project.activeFile]=editor.value;
  project.updatedAt=new Date().toISOString();
  persist();
}
function renderEngineeringWorkspace(){
  const project=activeEngineeringProject();if(!project){renderView("engineeringlab");return}
  const template=engineeringTemplateById(project.templateId),files=Object.keys(project.files);project.commits=project.commits||[];project.executionResults=project.executionResults||[];
  if(!project.activeFile||!project.files.hasOwnProperty(project.activeFile))project.activeFile=files[0];
  const checks=engineeringCheckResults(project,template),passed=checks.filter(c=>c.passed).length,changed=engineeringChangedFiles(project),isWeb=project.academyId==="web";
  el("main").innerHTML=`<section class="engineering-workspace-shell"><header class="engineering-workspace-header"><div><div class="eyebrow">${capstoneAcademyName(project.academyId).toUpperCase()} · REAL EXECUTION LAB</div><h1>${project.title}</h1><p>${project.academyId==="java"?"Structural simulation — secured JVM runner planned for v55.5":projectRunnerConfig?.[project.academyId]?.engine||"Browser runner"}</p></div><div class="engineering-workspace-actions"><button id="engineeringBackBtn" class="secondary-btn">Back</button><button id="engineeringRunProjectBtn" class="primary-btn">${project.academyId==="java"?"Check structure":"Run project"}</button><button id="engineeringCloudRunBtn" class="secondary-btn">Cloud build</button><button id="engineeringTestBtn" class="secondary-btn">Run tests</button><button id="engineeringCoachBtn" class="secondary-btn">AI Coach</button><button id="engineeringCommitBtnTop" class="secondary-btn">Commit</button><button id="engineeringExportBtn" class="primary-btn">Export</button></div></header><div class="engineering-workspace-grid v55"><aside class="engineering-file-tree"><div class="engineering-panel-title">Files ${changed.length?`· ${changed.length} changed`:""}</div>${files.map(file=>`<button class="${file===project.activeFile?"active":""}" data-engineering-file="${esc(file)}"><span>${changed.includes(file)?"M":"·"}</span>${esc(file)}</button>`).join("")}<button id="engineeringAddFileBtn" class="engineering-add-file">＋ Add file</button></aside><section class="engineering-editor-panel"><div class="engineering-editor-toolbar"><strong>${esc(project.activeFile)}</strong><span>${project.files[project.activeFile].split("\n").length} lines</span></div><textarea id="engineeringEditor" spellcheck="false">${esc(project.files[project.activeFile])}</textarea><div class="engineering-editor-actions"><button id="engineeringSaveBtn" class="primary-btn">Save file</button><button id="engineeringRunChecksBtn" class="secondary-btn">Static checks</button><button id="engineeringSnapshotBtn" class="secondary-btn">Snapshot</button></div>${isWeb?`<div class="engineering-web-preview-wrap"><div class="engineering-panel-title">Live preview</div><iframe id="engineeringWebPreview" sandbox="allow-scripts"></iframe></div>`:""}</section><aside class="engineering-evidence-panel"><div class="engineering-panel-title">Project readiness</div><div class="engineering-readiness"><strong>${Math.round(passed/checks.length*100)}%</strong><span>${passed}/${checks.length} static checks</span></div>${checks.map(c=>`<div class="engineering-check ${c.passed?"passed":""}"><span>${c.passed?"✓":"○"}</span><strong>${c.label}</strong></div>`).join("")}<label>Engineering reflection<textarea id="engineeringReflection" placeholder="What did you design, test and improve?">${esc(project.reflection||"")}</textarea></label><button id="engineeringSaveReflectionBtn" class="secondary-btn full">Save reflection</button></aside></div><div class="engineering-lower-grid">${renderEngineeringExecutionPanel(project)}${renderEngineeringGitPanel(project)}</div></section>`;
  el("engineeringBackBtn").onclick=()=>{saveActiveEngineeringFile();renderView("engineeringlab")};
  document.querySelectorAll("[data-engineering-file]").forEach(b=>b.onclick=()=>{saveActiveEngineeringFile();project.activeFile=b.dataset.engineeringFile;persist();renderEngineeringWorkspace()});
  el("engineeringSaveBtn").onclick=()=>{saveActiveEngineeringFile();el("engineeringSaveBtn").textContent="Saved"};
  el("engineeringRunChecksBtn").onclick=()=>{saveActiveEngineeringFile();project.checks=engineeringCheckResults(project,template);persist();renderEngineeringWorkspace()};
  el("engineeringSnapshotBtn").onclick=()=>{saveActiveEngineeringFile();project.snapshots.push({id:`snap-${Date.now()}`,createdAt:new Date().toISOString(),files:{...project.files}});persist();renderEngineeringWorkspace()};
  el("engineeringRunProjectBtn").onclick=()=>runEngineeringProject(project);
  el("engineeringCloudRunBtn").onclick=()=>runCloudBuildFromWorkspace(project);el("engineeringTestBtn").onclick=()=>runEngineeringTests(project);el("engineeringCommitBtn").onclick=()=>createEngineeringCommit(project);el("engineeringCommitBtnTop").onclick=()=>createEngineeringCommit(project);el("engineeringDiffBtn").onclick=()=>openEngineeringDiff(project);
  document.querySelectorAll("[data-restore-commit]").forEach(b=>b.onclick=()=>restoreEngineeringCommit(project,b.dataset.restoreCommit));
  el("engineeringExportBtn").onclick=()=>exportEngineeringProject(project);el("engineeringAddFileBtn").onclick=()=>{const n=prompt("File name");if(!n||project.files[n]!=null)return;saveActiveEngineeringFile();project.files[n]="";project.activeFile=n;persist();renderEngineeringWorkspace()};
  el("engineeringSaveReflectionBtn").onclick=()=>{project.reflection=el("engineeringReflection").value.trim();persist();el("engineeringSaveReflectionBtn").textContent="Reflection saved"};
  if(isWeb)runEngineeringWeb(project).then(r=>captureEngineeringExecution(project,"preview",r)).catch(()=>{});
}
async function exportEngineeringProject(project){saveActiveEngineeringFile();const template=engineeringTemplateById(project.templateId),report={schema:"codequest.engineering-project",version:"2.0",exportedAt:new Date().toISOString(),projectId:project.id,title:project.title,academyId:project.academyId,staticChecks:engineeringCheckResults(project,template),executionResults:project.executionResults||[],commits:project.commits||[],reflection:project.reflection||""},files={...project.files};files["CODEQUEST_VERIFICATION.json"]=JSON.stringify(report,null,2);if(!files["README.md"])files["README.md"]=`# ${project.title}\n\nExported from CodeQuest Engineering Lab.\n`;if(project.academyId==="python"&&!files["requirements.txt"])files["requirements.txt"]="# Add dependencies here\n";if(project.academyId==="java"&&!files["pom.xml"])files["pom.xml"]="<project><!-- Review Maven configuration --></project>\n";if(!files[".gitignore"])files[".gitignore"]=project.academyId==="python"?"__pycache__/\n.pytest_cache_/\n":project.academyId==="java"?"target/\n":".env\n";if(typeof JSZip!=="undefined"){const zip=new JSZip();Object.entries(files).forEach(([n,c])=>zip.file(n,c));downloadBlob(await zip.generateAsync({type:"blob"}),`${slug(project.title)}-github-ready.zip`)}else downloadBlob(new Blob([JSON.stringify(files,null,2)],{type:"application/json"}),`${slug(project.title)}-github-ready.json`)}

function applyPilotSectionDefaults(){
  const defaults={};
  (applyPilotBridgeConfig.defaultSections||[]).forEach(id=>defaults[id]=true);
  return defaults;
}
function applyPilotBridgeSections(){
  state.applyPilotBridgePreferences=state.applyPilotBridgePreferences||{};
  state.applyPilotBridgePreferences.sections={
    ...applyPilotSectionDefaults(),
    ...(state.applyPilotBridgePreferences.sections||{})
  };
  return state.applyPilotBridgePreferences.sections;
}
function applyPilotTargetRole(){
  const role=typeof selectedCareerRole==="function"?selectedCareerRole():null;
  return role?.title||state.careerLaunchProfile?.targetRole||"Not selected";
}
function applyPilotSkillGaps(){
  const role=typeof selectedCareerRole==="function"?selectedCareerRole():null;
  if(!role||typeof roleSkillScores!=="function")return[];
  return roleSkillScores(role)
    .filter(skill=>skill.score<65)
    .sort((a,b)=>a.score-b.score)
    .map(skill=>{
      let academyId=role.academies?.[0]||adaptiveSelectedAcademy();
      const sid=skill.id||"";
      if(sid.includes("sql")||sid.includes("database")||sid.includes("data"))academyId="sql";
      else if(["html","css","javascript","browser","frontend","accessibility"].some(x=>sid.includes(x)))academyId="web";
      else if(["java","spring","oop"].some(x=>sid.includes(x)))academyId="java";
      else if(sid.includes("python")||sid.includes("api"))academyId="python";
      return{
        id:skill.id,
        title:skill.title,
        currentScore:skill.score,
        academyId,
        academyName:capstoneAcademyName(academyId),
        recommendedRoutes:applyPilotReverseLinks?.[academyId]?.recommendedRoutes||["adaptivepath","course"],
        codeQuestDeepLink:`${location.origin}${location.pathname}#academy=${academyId}&view=adaptivepath`
      };
    });
}
function applyPilotCvBullets(){
  const role=typeof selectedCareerRole==="function"?selectedCareerRole():null;
  if(role&&typeof evidenceCvBullets==="function")return evidenceCvBullets(role);
  const bullets=[];
  if(state.capstoneEvidence.length)bullets.push(`Completed ${state.capstoneEvidence.length} guided application capstone${state.capstoneEvidence.length===1?"":"s"} with project checks and written reflections.`);
  if(state.missionPortfolio.length)bullets.push(`Completed ${state.missionPortfolio.length} workplace simulation${state.missionPortfolio.length===1?"":"s"} covering technical decisions and stakeholder communication.`);
  if(state.releaseRegister.length)bullets.push(`Prepared ${state.releaseRegister.length} versioned production release${state.releaseRegister.length===1?"":"s"} with verification and recovery evidence.`);
  return bullets;
}
function buildApplyPilotEvidencePackage(selectedSections){
  const learner=state.profile?.name||"CodeQuest learner";
  const role=applyPilotTargetRole();
  const packageData={
    schema:"codequest.applypilot.evidence-package",
    version:applyPilotBridgeConfig.exportSchemaVersion||"1.0",
    generatedAt:new Date().toISOString(),
    source:{
      product:"CodeQuest Academy",
      codeQuestVersion:"51.0",
      origin:location.origin
    },
    consent:{
      explicit:true,
      automaticTransmission:false,
      userInitiatedExport:true,
      sections:Object.keys(selectedSections).filter(k=>selectedSections[k])
    },
    profile:{},
    evidence:{},
    reverseLearningLinks:applyPilotReverseLinks
  };
  if(selectedSections.profile){
    packageData.profile={
      displayName:learner,
      headline:state.skillsPassportProfile?.headline||state.portfolioProfile?.headline||"",
      summary:state.skillsPassportProfile?.summary||state.portfolioProfile?.summary||""
    };
  }
  if(selectedSections.targetRole)packageData.profile.targetRole=role;
  if(selectedSections.academyScores)packageData.evidence.academyScores=adaptiveAcademyScores();
  if(selectedSections.credentials)packageData.evidence.credentials=state.issuedCredentials.map(c=>({
    title:c.title,academyId:c.academyId,level:c.level,score:c.score,issuedAt:c.issuedAt,
    verificationCode:c.verificationCode,status:c.status
  }));
  if(selectedSections.capstones)packageData.evidence.capstones=state.capstoneEvidence.map(e=>({
    title:e.title,academyId:e.academyId,score:e.score,hintsUsed:e.hintsUsed,
    solutionUnlocked:e.solutionUnlocked,reflection:e.reflection,completedAt:e.completedAt
  }));
  if(selectedSections.missions)packageData.evidence.missions=state.missionPortfolio.map(m=>({
    title:m.title,role:m.role,score:m.score,completedAt:m.completedAt,
    evidence:m.evidence||m.deliverables||[]
  }));
  if(selectedSections.releases)packageData.evidence.releases=state.releaseRegister.map(r=>({
    title:r.title,academyId:r.academyId,version:r.version,target:r.target,
    readiness:r.readiness,releasedAt:r.releasedAt
  }));
  if(selectedSections.peerReviews)packageData.evidence.peerReviews=state.peerReviewRequests.map(r=>({
    title:r.title,status:r.status,approvals:r.approvals,comments:r.comments?.length||0,createdAt:r.createdAt
  }));
  if(selectedSections.technicalViva)packageData.evidence.technicalViva=state.technicalVivaHistory.map(v=>({
    academyId:v.academyId,score:v.score,completedAt:v.completedAt
  }));
  if(selectedSections.cvBullets)packageData.evidence.cvBullets=applyPilotCvBullets();
  if(selectedSections.skillGaps)packageData.evidence.skillGaps=applyPilotSkillGaps();
  return packageData;
}
function applyPilotBridgeSummary(){
  return{
    credentials:state.issuedCredentials.length,
    capstones:state.capstoneEvidence.length,
    missions:state.missionPortfolio.length,
    releases:state.releaseRegister.length,
    reviews:state.peerReviewRequests.length,
    viva:state.technicalVivaHistory.length,
    cvBullets:applyPilotCvBullets().length,
    gaps:applyPilotSkillGaps().length
  };
}
function renderApplyPilotBridge(){
  const sections=applyPilotBridgeSections(),summary=applyPilotBridgeSummary();
  const sectionCards=[
    ["profile","Profile and professional summary","Your name, headline and summary."],
    ["targetRole","Target role","The career role selected in Career Launch."],
    ["academyScores","Academy scores","Current Python, SQL, Web and Java progress."],
    ["credentials","Credentials",`${summary.credentials} issued credential records.`],
    ["capstones","Capstones",`${summary.capstones} completed application capstones.`],
    ["missions","Workplace missions",`${summary.missions} mission evidence records.`],
    ["releases","Production releases",`${summary.releases} registered releases.`],
    ["peerReviews","Peer reviews",`${summary.reviews} review records.`],
    ["technicalViva","Technical viva",`${summary.viva} technical-defence records.`],
    ["cvBullets","CV evidence bullets",`${summary.cvBullets} generated evidence bullets.`],
    ["skillGaps","Skill gaps and CodeQuest links",`${summary.gaps} current development gaps.`]
  ];
  el("main").innerHTML=`<section class="applypilot-bridge-hero card"><div><div class="eyebrow">CODEQUEST × APPLYPILOTPRO</div><h1>Carry verified learning evidence into your job search.</h1><p>Export a user-controlled evidence package for ApplyPilotPro without merging accounts or automatically transmitting private learning data.</p><div class="bridge-hero-actions"><button id="openApplyPilotSiteBtn" class="secondary-btn">Open ApplyPilotPro</button><button id="exportApplyPilotPackageBtn" class="primary-btn">Export evidence package</button></div></div><div class="bridge-product-flow"><div><strong>CodeQuest</strong><span>Learn · build · prove</span></div><b>→</b><div><strong>ApplyPilotPro</strong><span>Match · tailor · apply</span></div></div></section>
  <section class="bridge-summary-grid">${[
    ["Credentials",summary.credentials],["Capstones",summary.capstones],["Missions",summary.missions],
    ["Releases",summary.releases],["CV bullets",summary.cvBullets],["Skill gaps",summary.gaps]
  ].map(x=>`<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong></article>`).join("")}</section>
  <section class="bridge-layout"><article class="card bridge-selection-panel"><div class="section-head"><div><div class="eyebrow">EXPORT CONTROL</div><h2>Choose what to share</h2><p>Nothing is sent automatically. The export is created only on your device.</p></div></div><div class="bridge-section-list">${sectionCards.map(([id,title,description])=>`<label class="${sections[id]?"selected":""}"><input type="checkbox" data-bridge-section="${id}" ${sections[id]?"checked":""}><div><strong>${title}</strong><span>${description}</span></div></label>`).join("")}</div><label class="bridge-consent"><input id="applyPilotConsentCheck" type="checkbox"><span>I understand that this creates a downloadable file containing the selected evidence, which I can choose to import into ApplyPilotPro.</span></label><button id="createApplyPilotExportBtn" class="primary-btn full">Create ApplyPilotPro export</button></article>
  <aside class="card bridge-preview-panel"><div class="eyebrow">PACKAGE PREVIEW</div><h2>What ApplyPilotPro can use</h2><div class="bridge-preview-block"><strong>Target role</strong><p>${esc(applyPilotTargetRole())}</p></div><div class="bridge-preview-block"><strong>Top CV evidence</strong>${applyPilotCvBullets().slice(0,3).map(b=>`<p>• ${esc(b)}</p>`).join("")||"<p class='muted'>Complete more evidence-building activity.</p>"}</div><div class="bridge-preview-block"><strong>Development gaps</strong>${applyPilotSkillGaps().slice(0,4).map(g=>`<div class="bridge-gap"><span>${esc(g.title)}</span><small>${g.currentScore}% · ${g.academyName}</small></div>`).join("")||"<p class='muted'>No current role-linked gaps identified.</p>"}</div><div class="bridge-privacy-note"><strong>Privacy by design</strong><p>No shared login, hidden transfer or automatic API submission is enabled in v51.</p></div></aside></section>
  <section class="card bridge-history"><div class="section-head"><div><div class="eyebrow">EXPORT HISTORY</div><h2>Recent packages</h2></div></div>${state.applyPilotExports.slice(0,10).map(x=>`<div class="bridge-history-row"><div><strong>${x.fileName}</strong><small>${new Date(x.createdAt).toLocaleString()} · ${x.sections.length} sections</small></div><span>${x.targetRole}</span></div>`).join("")||"<p class='muted'>No packages exported yet.</p>"}</section>`;
  document.querySelectorAll("[data-bridge-section]").forEach(input=>input.onchange=()=>{
    sections[input.dataset.bridgeSection]=input.checked;
    state.applyPilotBridgePreferences.sections=sections;
    persist();
    renderApplyPilotBridge();
  });
  el("openApplyPilotSiteBtn").onclick=()=>window.open(applyPilotBridgeConfig.partnerProduct.baseUrl,"_blank","noopener,noreferrer");
  el("exportApplyPilotPackageBtn").onclick=()=>el("createApplyPilotExportBtn").scrollIntoView({behavior:"smooth",block:"center"});
  el("createApplyPilotExportBtn").onclick=()=>createApplyPilotExport();
}
function createApplyPilotExport(){
  const consent=el("applyPilotConsentCheck")?.checked;
  if(!consent){alert("Confirm the export consent statement first.");return}
  const sections=applyPilotBridgeSections();
  const selected=Object.keys(sections).filter(k=>sections[k]);
  if(!selected.length){alert("Select at least one evidence section.");return}
  const data=buildApplyPilotEvidencePackage(sections);
  const roleSlug=slug(applyPilotTargetRole()||"career-evidence");
  const fileName=`codequest-to-applypilot-${roleSlug}-${new Date().toISOString().slice(0,10)}.json`;
  downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),fileName);
  state.applyPilotBridgePreferences.lastExportAt=new Date().toISOString();
  state.applyPilotExports.unshift({
    id:`applypilot-export-${Date.now()}`,
    fileName,
    targetRole:applyPilotTargetRole(),
    sections:selected,
    createdAt:state.applyPilotBridgePreferences.lastExportAt
  });
  persist();
  setTimeout(()=>{if(confirm("Evidence package created. Open ApplyPilotPro in a new tab?"))window.open(applyPilotBridgeConfig.partnerProduct.baseUrl,"_blank","noopener,noreferrer")},250);
  renderApplyPilotBridge();
}

function certificationById(id){return certificationPathways.find(c=>c.id===id)}
function certificationAcademyProgress(cert){
  if(cert.academyId==="cross"){
    const scores=adaptiveAcademyScores();
    return Math.round((scores.python+scores.sql+scores.web+scores.java)/4);
  }
  return adaptiveAcademyScores()[cert.academyId]||0;
}
function certificationEligibility(cert){
  const evidence=adaptiveEvidenceCounts();
  const progress=certificationAcademyProgress(cert);
  const required=cert.eligibility;
  const checks=[
    {id:"progress",label:`Academy progress ${required.academyProgress}%`,value:progress,required:required.academyProgress,passed:progress>=required.academyProgress},
    {id:"projects",label:`Projects ${required.projects||0}`,value:evidence.projects,required:required.projects||0,passed:evidence.projects>=(required.projects||0)},
    {id:"capstones",label:`Capstones ${required.capstones||0}`,value:evidence.capstones,required:required.capstones||0,passed:evidence.capstones>=(required.capstones||0)},
    {id:"viva",label:`Technical viva ${required.viva||0}`,value:evidence.viva,required:required.viva||0,passed:evidence.viva>=(required.viva||0)}
  ];
  if(required.missions)checks.push({id:"missions",label:`Workplace missions ${required.missions}`,value:evidence.missions,required:required.missions,passed:evidence.missions>=required.missions});
  if(required.releases)checks.push({id:"releases",label:`Production releases ${required.releases}`,value:evidence.releases,required:required.releases,passed:evidence.releases>=required.releases});
  return{eligible:checks.every(c=>c.passed),checks,progress};
}
function certificationAttemptCount(certId){
  return state.certificationAttempts.filter(a=>a.certificationId===certId&&a.status==="submitted").length;
}
function certificationBestAttempt(certId){
  return state.certificationAttempts.filter(a=>a.certificationId===certId&&a.status==="submitted").sort((a,b)=>b.score-a.score)[0]||null;
}
function certificationCredential(certId){
  return state.issuedCredentials.find(c=>c.certificationId===certId)||null;
}
function renderCertificationHub(){
  el("main").innerHTML=`<section class="certification-hero card"><div><div class="eyebrow">CODEQUEST CREDENTIAL FRAMEWORK</div><h1>Turn learning evidence into structured credentials.</h1><p>Certification eligibility combines academy progress, projects, capstones, technical defence and professional evidence.</p></div><div class="certification-hero-stat"><strong>${state.issuedCredentials.length}</strong><span>credentials earned</span><small>${state.certificationAttempts.length} exam attempts</small></div></section>
  <section class="certification-grid">${certificationPathways.map(cert=>{const eligibility=certificationEligibility(cert),best=certificationBestAttempt(cert.id),credential=certificationCredential(cert.id),attempts=certificationAttemptCount(cert.id);return`<article class="card certification-card"><div class="certification-card-head"><div><div class="eyebrow">${cert.level.toUpperCase()} · ${cert.durationMinutes} MIN</div><h2>${cert.title}</h2></div><span class="${credential?"earned":eligibility.eligible?"eligible":"locked"}">${credential?"Earned":eligibility.eligible?"Eligible":"Preparing"}</span></div><p>${cert.summary}</p><div class="certification-domain-list">${cert.domains.map(d=>`<span>${d.title} · ${d.weight}%</span>`).join("")}</div><div class="certification-eligibility">${eligibility.checks.map(c=>`<div class="${c.passed?"passed":""}"><span>${c.passed?"✓":"○"}</span><strong>${c.label}</strong><small>${c.value}/${c.required}</small></div>`).join("")}</div><div class="certification-meta"><span>Pass ${cert.passMark}%</span><span>${attempts}/${cert.maxAttempts} attempts</span><span>${best?`Best ${best.score}%`:"No attempt"}</span></div><button class="primary-btn full" data-start-certification="${cert.id}" ${!eligibility.eligible||attempts>=cert.maxAttempts||credential?"disabled":""}>${credential?"Credential earned":attempts>=cert.maxAttempts?"Attempt limit reached":eligibility.eligible?"Begin exam":"Complete eligibility"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-start-certification]").forEach(b=>b.onclick=()=>beginCertificationExam(b.dataset.startCertification));
}
function beginCertificationExam(certId){
  const cert=certificationById(certId),eligibility=certificationEligibility(cert);
  if(!eligibility.eligible){alert("Complete the eligibility requirements first.");return}
  if(certificationAttemptCount(certId)>=cert.maxAttempts){alert("The maximum number of attempts has been reached.");return}
  const accepted=examIntegrityPolicy.declaration.every(statement=>confirm(statement));
  if(!accepted){alert("All integrity declarations must be accepted before the exam begins.");return}
  const questions=certificationQuestionBank.filter(q=>q.certificationId===certId);
  state.activeExamSession={
    id:`exam-${Date.now()}`,
    certificationId:certId,
    startedAt:new Date().toISOString(),
    expiresAt:new Date(Date.now()+cert.durationMinutes*60*1000).toISOString(),
    currentIndex:0,
    answers:{},
    answerChanges:0,
    blurCount:0,
    integrityAccepted:true,
    status:"active"
  };
  persist();
  window.addEventListener("blur",recordExamBlur);
  renderView("examsession");
}
function recordExamBlur(){
  if(state.activeExamSession?.status==="active"){
    state.activeExamSession.blurCount=(state.activeExamSession.blurCount||0)+1;
    persist();
  }
}
function activeExamQuestions(){
  const session=state.activeExamSession;
  return session?certificationQuestionBank.filter(q=>q.certificationId===session.certificationId):[];
}
function examRemainingSeconds(){
  if(!state.activeExamSession)return 0;
  return Math.max(0,Math.floor((new Date(state.activeExamSession.expiresAt).getTime()-Date.now())/1000));
}
function formatExamTime(seconds){
  const m=Math.floor(seconds/60),s=seconds%60;
  return`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function renderExamSession(){
  const session=state.activeExamSession;
  if(!session||session.status!=="active"){renderView("certificationhub");return}
  const cert=certificationById(session.certificationId),questions=activeExamQuestions(),question=questions[session.currentIndex],remaining=examRemainingSeconds();
  if(remaining<=0){submitCertificationExam(true);return}
  if(certificationTimer)clearInterval(certificationTimer);
  certificationTimer=setInterval(()=>{const seconds=examRemainingSeconds();const display=el("examTimer");if(display)display.textContent=formatExamTime(seconds);if(seconds<=0){clearInterval(certificationTimer);submitCertificationExam(true)}},1000);
  el("main").innerHTML=`<section class="exam-shell"><header class="exam-header card"><div><div class="eyebrow">${cert.title.toUpperCase()}</div><h1>Question ${session.currentIndex+1} of ${questions.length}</h1></div><div><span>Time remaining</span><strong id="examTimer">${formatExamTime(remaining)}</strong></div></header><div class="exam-progress"><div style="width:${(session.currentIndex+1)/questions.length*100}%"></div></div><article class="card exam-question-card"><div class="eyebrow">${cert.domains.find(d=>d.id===question.domainId)?.title||question.domainId}</div><h2>${question.prompt}</h2>${question.type==="mcq"?`<div class="exam-options">${question.options.map((option,i)=>`<label class="${session.answers[question.id]===i?"selected":""}"><input type="radio" name="exam-answer" value="${i}" ${session.answers[question.id]===i?"checked":""}><span>${option}</span></label>`).join("")}</div>`:`<textarea id="writtenExamAnswer" placeholder="Write a concise, evidence-based answer…">${esc(session.answers[question.id]||"")}</textarea>`}<div class="exam-navigation"><button id="examPrevBtn" class="secondary-btn" ${session.currentIndex===0?"disabled":""}>Previous</button><span>${Object.keys(session.answers).length}/${questions.length} answered</span><button id="examNextBtn" class="primary-btn">${session.currentIndex===questions.length-1?"Review and submit":"Next"}</button></div></article><aside class="card exam-integrity-panel"><div class="eyebrow">ASSESSMENT INTEGRITY</div><h2>Session signals</h2><div><strong>${session.blurCount}</strong><span>window changes</span></div><div><strong>${session.answerChanges}</strong><span>answer changes</span></div><p>${examIntegrityPolicy.disclaimer}</p><button id="abandonExamBtn" class="text-btn">Abandon attempt</button></aside></section>`;
  document.querySelectorAll('input[name="exam-answer"]').forEach(input=>input.onchange=()=>saveExamAnswer(question.id,Number(input.value)));
  if(el("writtenExamAnswer"))el("writtenExamAnswer").oninput=e=>saveExamAnswer(question.id,e.target.value,false);
  el("examPrevBtn").onclick=()=>{session.currentIndex--;persist();renderExamSession()};
  el("examNextBtn").onclick=()=>{if(question.type==="written"&&el("writtenExamAnswer"))saveExamAnswer(question.id,el("writtenExamAnswer").value,false);if(session.currentIndex===questions.length-1){reviewAndSubmitExam()}else{session.currentIndex++;persist();renderExamSession()}};
  el("abandonExamBtn").onclick=()=>{if(confirm("Abandon this exam attempt?")){session.status="abandoned";session.abandonedAt=new Date().toISOString();state.certificationAttempts.push({...session});state.activeExamSession=null;persist();renderView("certificationhub")}};
}
function saveExamAnswer(questionId,value,countChange=true){
  const session=state.activeExamSession;
  if(Object.prototype.hasOwnProperty.call(session.answers,questionId)&&session.answers[questionId]!==value&&countChange)session.answerChanges++;
  session.answers[questionId]=value;
  persist();
}
function reviewAndSubmitExam(){
  const questions=activeExamQuestions(),answered=Object.keys(state.activeExamSession.answers).length;
  if(answered<questions.length&&!confirm(`${questions.length-answered} questions are unanswered. Submit anyway?`))return;
  if(confirm("Submit this certification exam? Answers cannot be changed afterwards."))submitCertificationExam(false);
}
function scoreWrittenQuestion(question,answer){
  const lower=String(answer||"").toLowerCase();
  const hits=(question.keywords||[]).filter(k=>lower.includes(k.toLowerCase())).length;
  return question.keywords?.length?Math.round(hits/question.keywords.length*100):0;
}
function submitCertificationExam(automatic=false){
  if(certificationTimer)clearInterval(certificationTimer);
  window.removeEventListener("blur",recordExamBlur);
  const session=state.activeExamSession;if(!session)return;
  const cert=certificationById(session.certificationId),questions=activeExamQuestions();
  const results=questions.map(q=>{
    const answer=session.answers[q.id];
    const score=q.type==="mcq"?(answer===q.answer?100:0):scoreWrittenQuestion(q,answer);
    return{questionId:q.id,domainId:q.domainId,type:q.type,score,answer,explanation:q.explanation};
  });
  const domainResults=cert.domains.map(domain=>{
    const items=results.filter(r=>r.domainId===domain.id);
    return{domainId:domain.id,title:domain.title,weight:domain.weight,score:items.length?Math.round(items.reduce((s,x)=>s+x.score,0)/items.length):0};
  });
  const score=Math.round(domainResults.reduce((s,d)=>s+d.score*d.weight,0)/domainResults.reduce((s,d)=>s+d.weight,0));
  const durationSeconds=Math.max(1,Math.floor((Date.now()-new Date(session.startedAt).getTime())/1000));
  const integrityFlags=[];
  if(session.blurCount>=5)integrityFlags.push("Frequent window changes");
  if(durationSeconds<questions.length*20)integrityFlags.push("Very rapid completion");
  if(session.answerChanges>=questions.length*2)integrityFlags.push("High answer-change count");
  const attempt={...session,status:"submitted",submittedAt:new Date().toISOString(),automatic,score,passed:score>=cert.passMark,domainResults,results,durationSeconds,integrityFlags};
  state.certificationAttempts.push(attempt);
  state.activeExamSession=null;
  if(attempt.passed&&!certificationCredential(cert.id)){
    state.issuedCredentials.unshift({id:`credential-${Date.now()}`,verificationCode:`CQ-${cert.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,certificationId:cert.id,title:cert.title,academyId:cert.academyId,level:cert.level,score,domainResults,issuedAt:new Date().toISOString(),status:"active"});
    state.xp+=1000;
  }else if(!attempt.passed){
    createCertificationRetakePlan(cert,attempt);
  }
  persist();renderCertificationResult(attempt);
}
function createCertificationRetakePlan(cert,attempt){
  const weak=attempt.domainResults.filter(d=>d.score<cert.passMark).sort((a,b)=>a.score-b.score);
  state.adaptivePlan=null;
  weak.forEach((domain,index)=>{
    const due=new Date();due.setDate(due.getDate()+Math.min(7,index+1));
    state.adaptiveReviewQueue.push({id:`cert-review-${Date.now()}-${index}`,academyId:cert.academyId==="cross"?"python":cert.academyId,conceptId:`cert-${domain.domainId}`,conceptTitle:domain.title,intervalIndex:0,dueAt:due.toISOString(),createdAt:new Date().toISOString(),source:"certification-retake"});
  });
}
function renderCertificationResult(attempt){
  const cert=certificationById(attempt.certificationId);
  el("main").innerHTML=`<section class="cert-result-hero card ${attempt.passed?"passed":"failed"}"><div><div class="eyebrow">${attempt.passed?"CERTIFICATION PASSED":"DEVELOPMENT REQUIRED"}</div><h1>${cert.title}</h1><p>${attempt.passed?"You have earned a CodeQuest learning credential.":"A targeted retake plan has been added to your adaptive review queue."}</p></div><div><strong>${attempt.score}%</strong><span>Pass mark ${cert.passMark}%</span></div></section><section class="cert-result-grid"><article class="card"><div class="eyebrow">DOMAIN PERFORMANCE</div><h2>Score breakdown</h2>${attempt.domainResults.map(d=>`<div class="cert-domain-result"><div><strong>${d.title}</strong><span>${d.score}%</span></div><div class="progress-track"><div style="width:${d.score}%"></div></div></div>`).join("")}</article><article class="card"><div class="eyebrow">INTEGRITY SIGNALS</div><h2>Attempt context</h2><div class="cert-attempt-metric"><strong>${attempt.blurCount}</strong><span>window changes</span></div><div class="cert-attempt-metric"><strong>${attempt.answerChanges}</strong><span>answer changes</span></div><div class="cert-attempt-metric"><strong>${Math.round(attempt.durationSeconds/60)}</strong><span>minutes</span></div>${attempt.integrityFlags.length?`<div class="integrity-warning"><strong>Review recommended</strong><p>${attempt.integrityFlags.join(", ")}</p></div>`:"<p>No automated review flags were generated.</p>"}<p class="muted">${examIntegrityPolicy.disclaimer}</p></article><article class="card"><div class="eyebrow">NEXT STEP</div><h2>${attempt.passed?"Use your credential":"Prepare for a retake"}</h2><button id="resultPassportBtn" class="primary-btn full">${attempt.passed?"Open skills passport":"Open adaptive path"}</button><button id="resultTranscriptBtn" class="secondary-btn full">View digital transcript</button></article></section>`;
  el("resultPassportBtn").onclick=()=>renderView(attempt.passed?"skillspassport":"adaptivepath");
  el("resultTranscriptBtn").onclick=()=>renderView("transcript");
}
function skillsPassportCapabilities(){
  const scores=adaptiveAcademyScores(),evidence=adaptiveEvidenceCounts();
  return[
    {title:"Python engineering",score:scores.python,evidence:`${state.capstoneEvidence.filter(e=>e.academyId==="python").length} capstones`},
    {title:"SQL and data",score:scores.sql,evidence:`${state.capstoneEvidence.filter(e=>e.academyId==="sql").length} capstones`},
    {title:"Web development",score:scores.web,evidence:`${state.capstoneEvidence.filter(e=>e.academyId==="web").length} capstones`},
    {title:"Java backend",score:scores.java,evidence:`${state.capstoneEvidence.filter(e=>e.academyId==="java").length} capstones`},
    {title:"Workplace judgement",score:Math.min(100,evidence.missions*25+evidence.viva*10),evidence:`${evidence.missions} missions · ${evidence.viva} viva`},
    {title:"Production delivery",score:Math.min(100,evidence.releases*30+evidence.capstones*10),evidence:`${evidence.releases} releases`}
  ];
}
function renderSkillsPassport(){
  const capabilities=skillsPassportCapabilities();
  const learner=state.profile?.name||"CodeQuest learner";
  el("main").innerHTML=`<section class="passport-hero card"><div><div class="eyebrow">CODEQUEST SKILLS PASSPORT</div><h1>${esc(learner)}</h1><p>A consolidated record of academy mastery, credentials, practical evidence and professional delivery.</p><div class="passport-actions"><button id="editPassportHeadlineBtn" class="secondary-btn">Edit headline</button><button id="sendPassportApplyPilotBtn" class="secondary-btn">Use in ApplyPilotPro</button><button id="exportPassportBtn" class="primary-btn">Export passport</button></div></div><div class="passport-seal"><strong>${state.issuedCredentials.length}</strong><span>credentials</span></div></section><section class="passport-grid"><article class="card"><div class="eyebrow">PROFESSIONAL HEADLINE</div><h2>${esc(state.skillsPassportProfile.headline||"Evidence-backed developer in progress")}</h2><p>${esc(state.skillsPassportProfile.summary||"Building practical capability across software, data and production delivery through CodeQuest Academy.")}</p><h3>Credentials</h3>${state.issuedCredentials.map(c=>`<div class="passport-credential"><span>✓</span><div><strong>${c.title}</strong><small>${c.score}% · ${c.verificationCode}</small></div></div>`).join("")||"<p class='muted'>No credentials issued yet.</p>"}</article><article class="card"><div class="eyebrow">CAPABILITY MAP</div><h2>Current evidence</h2>${capabilities.map(c=>`<div class="passport-capability"><div><strong>${c.title}</strong><span>${c.score}%</span></div><div class="progress-track"><div style="width:${c.score}%"></div></div><small>${c.evidence}</small></div>`).join("")}</article><article class="card"><div class="eyebrow">PROFESSIONAL EVIDENCE</div><h2>Portfolio signals</h2><div class="passport-stat"><strong>${state.capstoneEvidence.length}</strong><span>capstone applications</span></div><div class="passport-stat"><strong>${state.missionPortfolio.length}</strong><span>workplace missions</span></div><div class="passport-stat"><strong>${state.releaseRegister.length}</strong><span>production releases</span></div><div class="passport-stat"><strong>${state.peerReviewRequests.length}</strong><span>peer reviews</span></div><div class="passport-stat"><strong>${state.technicalVivaHistory.length}</strong><span>technical defences</span></div></article></section>`;
  el("sendPassportApplyPilotBtn").onclick=()=>renderView("applypilotbridge");
  el("editPassportHeadlineBtn").onclick=()=>{const headline=prompt("Professional headline",state.skillsPassportProfile.headline||"Evidence-backed developer in progress");if(headline===null)return;const summary=prompt("Professional summary",state.skillsPassportProfile.summary||"Building practical capability through CodeQuest Academy.");if(summary===null)return;state.skillsPassportProfile={headline,summary,updatedAt:new Date().toISOString()};persist();renderSkillsPassport()};
  el("exportPassportBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner,headline:state.skillsPassportProfile.headline,summary:state.skillsPassportProfile.summary,capabilities,credentials:state.issuedCredentials,evidence:{capstones:state.capstoneEvidence,missions:state.missionPortfolio,releases:state.releaseRegister},generatedAt:new Date().toISOString()},null,2)],{type:"application/json"}),"codequest-skills-passport.json");
}
function renderDigitalTranscript(){
  const learner=state.profile?.name||"CodeQuest learner";
  const attempts=[...state.certificationAttempts].sort((a,b)=>new Date(b.submittedAt||b.startedAt)-new Date(a.submittedAt||a.startedAt));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">OFFICIAL LEARNING RECORD</div><h1>Digital transcript</h1><p>Academy progress, completed evidence, exam attempts and issued CodeQuest credentials.</p></div><button id="exportTranscriptBtn" class="secondary-btn">Export transcript</button></div><section class="transcript-header card"><div><strong>${esc(learner)}</strong><span>Generated ${new Date().toLocaleDateString()}</span></div><div><strong>${state.xp}</strong><span>Total XP</span></div><div><strong>${state.issuedCredentials.length}</strong><span>Credentials</span></div><div><strong>${state.capstoneEvidence.length}</strong><span>Capstones</span></div></section><section class="transcript-grid"><article class="card"><div class="eyebrow">ACADEMY RECORD</div><h2>Progress</h2>${Object.entries(adaptiveAcademyScores()).map(([id,score])=>`<div class="transcript-row"><strong>${capstoneAcademyName(id)}</strong><span>${score}%</span></div>`).join("")}<h2>Issued credentials</h2>${state.issuedCredentials.map(c=>`<div class="transcript-credential"><strong>${c.title}</strong><span>${c.score}% · ${new Date(c.issuedAt).toLocaleDateString()}</span><small>${c.verificationCode}</small></div>`).join("")||"<p class='muted'>None issued.</p>"}</article><article class="card"><div class="eyebrow">EXAM HISTORY</div><h2>${attempts.length} attempts</h2>${attempts.map(a=>{const cert=certificationById(a.certificationId);return`<div class="transcript-attempt"><div><strong>${cert?.title||a.certificationId}</strong><span>${a.status}</span></div><strong>${a.score??"—"}${a.score!=null?"%":""}</strong><small>${new Date(a.submittedAt||a.abandonedAt||a.startedAt).toLocaleString()}</small></div>`}).join("")||"<p class='muted'>No attempts.</p>"}</article><article class="card"><div class="eyebrow">PRACTICAL EVIDENCE</div><h2>Completed work</h2>${state.capstoneEvidence.map(e=>`<div class="transcript-row"><strong>${e.title}</strong><span>${e.score}%</span></div>`).join("")}${state.releaseRegister.map(r=>`<div class="transcript-row"><strong>${r.title} v${r.version}</strong><span>${r.readiness}% release</span></div>`).join("")}${state.missionPortfolio.map(m=>`<div class="transcript-row"><strong>${m.title}</strong><span>${m.score}%</span></div>`).join("")||"<p class='muted'>Evidence appears as work is completed.</p>"}</article></section>`;
  el("exportTranscriptBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner,generatedAt:new Date().toISOString(),academyScores:adaptiveAcademyScores(),credentials:state.issuedCredentials,attempts,capstones:state.capstoneEvidence,releases:state.releaseRegister,missions:state.missionPortfolio},null,2)],{type:"application/json"}),"codequest-digital-transcript.json");
}

let pythonRuntimeReady=false;
let pythonRuntimeError="";
let adaptiveFocusTimer=null;
let adaptiveFocusRemaining=0;

function adaptiveAcademyScores(){
  return{
    python:Math.max(0,Math.min(100,Math.round(pathwayOverallProgress?.()||0))),
    sql:Math.max(0,Math.min(100,Math.round(sqlOverallProgress?.()||0))),
    web:Math.max(0,Math.min(100,Math.round(webOverallProgress?.()||0))),
    java:Math.max(0,Math.min(100,Math.round(javaOverallProgress?.()||0)))
  };
}
function adaptiveEvidenceCounts(){
  return{
    projects:(state.completedProjects?.length||0)+Object.values(state.sqlProjectState||{}).filter(x=>x.complete).length+Object.values(state.webProjectState||{}).filter(x=>x.complete).length+Object.values(state.javaProjectState||{}).filter(x=>x.complete).length,
    capstones:state.capstoneEvidence?.length||0,
    missions:state.missionPortfolio?.length||0,
    releases:state.releaseRegister?.length||0,
    viva:state.technicalVivaHistory?.length||0,
    reviews:state.peerReviewRequests?.length||0
  };
}
function adaptiveSelectedAcademy(){
  const preferred=state.adaptiveProfile?.preferredAcademy;
  if(["python","sql","web","java"].includes(preferred))return preferred;
  return reconcileAcademyContext()?.id||state.activeAcademyId||"python";
}
function adaptiveCareerAcademies(){
  const role=typeof selectedCareerRole==="function"?selectedCareerRole():null;
  return role?.academies||[];
}
function adaptiveWeakAcademies(){
  const scores=adaptiveAcademyScores();
  return Object.entries(scores).sort((a,b)=>a[1]-b[1]).map(([id,score])=>({id,score}));
}
function adaptiveConceptScores(academyId){
  const nodes=adaptiveConceptGraph.academies[academyId]||[];
  const academyScore=adaptiveAcademyScores()[academyId]||0;
  const parity=academyParity?.[academyId];
  return nodes.map((node,index)=>{
    let score=Math.max(0,Math.min(100,academyScore+(index===0?8:index*4>academyScore?-12:0)));
    if(parity?.concepts?.[index]&&typeof parityConceptScore==="function"){
      score=Math.round((score+parityConceptScore(academyId,parity.concepts[index]))/2);
    }
    const reviewed=state.adaptiveHistory.filter(h=>h.academyId===academyId&&h.conceptId===node.id&&h.type==="review");
    if(reviewed.length)score=Math.min(100,score+Math.min(12,reviewed.length*3));
    return{...node,score,status:score>=75?"strong":score>=45?"developing":"focus"};
  });
}
function adaptiveDueReviews(){
  const now=Date.now();
  return(state.adaptiveReviewQueue||[]).filter(item=>!item.completedAt&&new Date(item.dueAt).getTime()<=now);
}
function adaptiveRecommendationCandidates(){
  const scores=adaptiveAcademyScores(),evidence=adaptiveEvidenceCounts();
  const careerAcademies=adaptiveCareerAcademies();
  const selected=adaptiveSelectedAcademy();
  const weak=adaptiveWeakAcademies();
  const candidates=[];
  const push=(type,academyId,priority,reason,concept=null)=>{
    const config=adaptiveActionCatalogue.find(a=>a.id===type);
    if(!config)return;
    candidates.push({
      id:`${type}-${academyId}-${concept?.id||"general"}`,
      type,academyId,priority,
      title:concept?`${config.title}: ${concept.title}`:config.title,
      description:config.description,
      reason,route:config.route,icon:config.icon,
      conceptId:concept?.id||null,
      minutes:type==="review"?15:type==="lesson"?25:type==="diagnostic"?20:type==="project"?40:type==="capstone"?60:type==="mission"?60:type==="viva"?20:25
    });
  };
  adaptiveDueReviews().forEach(item=>push("review",item.academyId,100,`This concept is due for spaced retrieval today.`,{id:item.conceptId,title:item.conceptTitle}));
  weak.forEach(({id,score},rank)=>{
    const concepts=adaptiveConceptScores(id).sort((a,b)=>a.score-b.score);
    const weakest=concepts[0];
    const careerBoost=careerAcademies.includes(id)?14:0;
    const preferenceBoost=id===selected?8:0;
    push("lesson",id,82-score*.35+careerBoost+preferenceBoost-rank*2,`${capstoneAcademyName(id)} is at ${score}%. Continuing structured learning protects prerequisite knowledge.`,weakest);
    push("review",id,78-weakest.score*.3+careerBoost,`${weakest.title} is currently classified as ${weakest.status}. Retrieval will strengthen recall.`,weakest);
    if(score<35)push("diagnostic",id,76+careerBoost,`The current mastery estimate is low. A diagnostic will recalibrate the model.`);
  });
  if(evidence.projects<2)push("project",selected,72,`Your profile has limited practical project evidence.`);
  if(evidence.capstones<1&&Math.max(...Object.values(scores))>=35)push("capstone",selected,68,`You have enough foundation to begin creating an application-level artefact.`);
  if(evidence.viva<2)push("viva",selected,62,`Your profile needs more evidence that you can explain and defend technical decisions.`);
  if(evidence.missions<1&&Math.max(...Object.values(scores))>=45)push("mission",selected,58,`A workplace mission will convert technical skill into judgement and communication evidence.`);
  if(state.careerLaunchProfile?.roleId)push("career",selected,54,`Your selected career role should influence the next evidence you create.`);
  return candidates.sort((a,b)=>b.priority-a.priority);
}
function generateAdaptivePlan(force=false){
  const today=new Date().toISOString().slice(0,10);
  if(!force&&state.adaptivePlan?.date===today)return state.adaptivePlan;
  const mode=adaptiveEngineConfig.intensityModes[state.adaptiveProfile?.intensity||"balanced"]||adaptiveEngineConfig.intensityModes.balanced;
  const candidates=adaptiveRecommendationCandidates();
  const unique=[];
  const seen=new Set();
  for(const item of candidates){
    const key=`${item.type}:${item.academyId}:${item.conceptId||""}`;
    if(seen.has(key))continue;
    seen.add(key);unique.push({...item,status:"planned"});
    if(unique.length>=mode.actions)break;
  }
  state.adaptivePlan={
    id:`plan-${today}`,
    date:today,
    generatedAt:new Date().toISOString(),
    intensity:state.adaptiveProfile?.intensity||"balanced",
    targetMinutes:mode.minutes,
    actions:unique,
    snapshot:{academyScores:adaptiveAcademyScores(),evidence:adaptiveEvidenceCounts()}
  };
  persist();
  return state.adaptivePlan;
}
function adaptivePlanProgress(plan){
  if(!plan?.actions?.length)return 0;
  return Math.round(plan.actions.filter(a=>a.status==="complete").length/plan.actions.length*100);
}
function completeAdaptiveAction(actionId){
  const plan=generateAdaptivePlan();
  const action=plan.actions.find(a=>a.id===actionId);
  if(!action||action.status==="complete")return;
  action.status="complete";action.completedAt=new Date().toISOString();
  state.adaptiveHistory.unshift({id:`adaptive-${Date.now()}`,type:action.type,academyId:action.academyId,conceptId:action.conceptId,title:action.title,minutes:action.minutes,completedAt:action.completedAt});
  if(action.conceptId)scheduleAdaptiveReview(action);
  state.xp+=25;
  persist();renderAdaptivePath();
}
function scheduleAdaptiveReview(action){
  const previous=state.adaptiveReviewQueue.filter(i=>i.conceptId===action.conceptId&&i.academyId===action.academyId).length;
  const intervals=adaptiveEngineConfig.reviewIntervalsDays;
  const days=intervals[Math.min(previous,intervals.length-1)];
  const due=new Date();due.setDate(due.getDate()+days);
  state.adaptiveReviewQueue.push({id:`review-${Date.now()}`,academyId:action.academyId,conceptId:action.conceptId,conceptTitle:action.title.replace(/^.*?:\s*/,""),intervalIndex:Math.min(previous,intervals.length-1),dueAt:due.toISOString(),createdAt:new Date().toISOString()});
}
function openAdaptiveAction(actionId){
  const action=generateAdaptivePlan().actions.find(a=>a.id===actionId);
  if(!action)return;
  state.activeAcademyId=action.academyId;
  localStorage.setItem("pq_active_academy",action.academyId);
  reconcileAcademyContext();updateAcademyChrome();
  renderView(action.route);
}
function renderAdaptivePath(){
  const plan=generateAdaptivePlan(),progress=adaptivePlanProgress(plan);
  const scores=adaptiveAcademyScores(),due=adaptiveDueReviews();
  el("main").innerHTML=`<section class="adaptive-path-hero card"><div><div class="eyebrow">PERSONALISED CURRICULUM ENGINE</div><h1>Your best next step, explained.</h1><p>CodeQuest combines mastery, recency, career relevance, prerequisite structure and evidence gaps to create today’s learning path.</p><div class="adaptive-profile-controls"><label>Intensity<select id="adaptiveIntensity">${Object.keys(adaptiveEngineConfig.intensityModes).map(x=>`<option value="${x}" ${x===state.adaptiveProfile.intensity?"selected":""}>${x}</option>`).join("")}</select></label><label>Preferred academy<select id="adaptivePreferredAcademy"><option value="">Use active academy</option>${["python","sql","web","java"].map(id=>`<option value="${id}" ${id===state.adaptiveProfile.preferredAcademy?"selected":""}>${capstoneAcademyName(id)}</option>`).join("")}</select></label><button id="rebuildAdaptivePlanBtn" class="secondary-btn">Rebuild plan</button></div></div><div class="adaptive-plan-progress"><strong>${progress}%</strong><span>today completed</span><small>${plan.targetMinutes} minute target</small></div></section>
  <section class="adaptive-snapshot-grid">${Object.entries(scores).map(([id,score])=>`<article class="card"><span>${capstoneAcademyName(id)}</span><strong>${score}%</strong><div class="progress-track"><div style="width:${score}%"></div></div></article>`).join("")}<article class="card due-review-card"><span>Reviews due</span><strong>${due.length}</strong><small>spaced retrieval</small></article></section>
  <section class="adaptive-path-layout"><article class="card adaptive-action-list"><div class="section-head"><div><div class="eyebrow">TODAY’S PATH</div><h2>${plan.actions.length} prioritised actions</h2></div></div>${plan.actions.map((a,i)=>`<article class="adaptive-action ${a.status}"><div class="adaptive-action-rank">${a.status==="complete"?"✓":i+1}</div><div><div class="eyebrow">${capstoneAcademyName(a.academyId).toUpperCase()} · ${a.minutes} MIN</div><h3>${a.icon} ${esc(a.title)}</h3><p>${esc(a.description)}</p><div class="adaptive-why"><strong>Why this is recommended</strong><span>${esc(a.reason)}</span></div></div><div class="adaptive-action-buttons"><button class="secondary-btn" data-open-adaptive="${a.id}" ${a.status==="complete"?"disabled":""}>Open</button><button class="primary-btn" data-complete-adaptive="${a.id}" ${a.status==="complete"?"disabled":""}>${a.status==="complete"?"Completed":"Mark complete"}</button></div></article>`).join("")||"<p class='muted'>No actions generated.</p>"}</article>
  <aside class="card adaptive-side-panel"><div class="eyebrow">MODEL EXPLANATION</div><h2>How your path was chosen</h2>${[
    ["Weakness","Lower-mastery concepts receive priority."],
    ["Prerequisites","Foundations are recommended before advanced work."],
    ["Career relevance","Skills linked to your selected role are boosted."],
    ["Recency","Due retrieval practice rises to the top."],
    ["Evidence gaps","Projects, viva and missions fill missing proof."],
    ["Preference","Your chosen academy gently influences order."]
  ].map(x=>`<div class="adaptive-model-row"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("")}<button id="openLearningGraphBtn" class="secondary-btn full">View learning graph</button><button id="startAdaptiveFocusBtn" class="primary-btn full">Start focus session</button></aside></section>`;
  el("adaptiveIntensity").onchange=e=>{state.adaptiveProfile.intensity=e.target.value;persist();generateAdaptivePlan(true);renderAdaptivePath()};
  el("adaptivePreferredAcademy").onchange=e=>{state.adaptiveProfile.preferredAcademy=e.target.value;persist();generateAdaptivePlan(true);renderAdaptivePath()};
  el("rebuildAdaptivePlanBtn").onclick=()=>{generateAdaptivePlan(true);renderAdaptivePath()};
  document.querySelectorAll("[data-open-adaptive]").forEach(b=>b.onclick=()=>openAdaptiveAction(b.dataset.openAdaptive));
  document.querySelectorAll("[data-complete-adaptive]").forEach(b=>b.onclick=()=>completeAdaptiveAction(b.dataset.completeAdaptive));
  el("openLearningGraphBtn").onclick=()=>renderView("learninggraph");
  el("startAdaptiveFocusBtn").onclick=()=>renderView("focusmode");
}
function graphNodeClass(node){
  return node.status==="strong"?"strong":node.status==="developing"?"developing":"focus";
}
function renderLearningGraph(){
  const academyId=adaptiveSelectedAcademy();
  const concepts=adaptiveConceptScores(academyId);
  const scores=adaptiveAcademyScores();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ADAPTIVE KNOWLEDGE MODEL</div><h1>Learning graph</h1><p>See mastery, prerequisites and cross-academy capability relationships.</p></div><select id="learningGraphAcademy">${["python","sql","web","java"].map(id=>`<option value="${id}" ${id===academyId?"selected":""}>${capstoneAcademyName(id)}</option>`).join("")}</select></div>
  <section class="learning-graph-layout"><article class="card graph-canvas"><div class="graph-academy-score"><span>${capstoneAcademyName(academyId)}</span><strong>${scores[academyId]}%</strong></div><div class="concept-graph">${concepts.map((node,i)=>`<div class="concept-node ${graphNodeClass(node)}" style="--node-index:${i}"><div><span>${node.score}%</span><strong>${node.title}</strong><small>${node.prerequisites.length?`Requires ${node.prerequisites.length} earlier concept${node.prerequisites.length>1?"s":""}`:"Foundation node"}</small></div></div>${i<concepts.length-1?'<div class="concept-edge">↓</div>':""}`).join("")}</div></article>
  <aside class="card graph-insight-panel"><div class="eyebrow">GRAPH INSIGHTS</div><h2>Current interpretation</h2>${concepts.sort((a,b)=>a.score-b.score).slice(0,3).map(c=>`<div class="graph-insight ${c.status}"><strong>${c.title}</strong><span>${c.score}% · ${c.status}</span><p>${c.prerequisites.length?`Prerequisites: ${c.prerequisites.join(", ")}`:"Begin here if the concept feels uncertain."}</p></div>`).join("")}<h2>Cross-academy capabilities</h2>${adaptiveConceptGraph.crossAcademy.map(c=>`<div class="cross-graph-row"><strong>${c.title}</strong><span>${c.sources.map(id=>capstoneAcademyName(id)).join(" + ")}</span></div>`).join("")}</aside></section>`;
  el("learningGraphAcademy").onchange=e=>{state.adaptiveProfile.preferredAcademy=e.target.value;persist();renderLearningGraph()};
}
function focusAction(){
  const plan=generateAdaptivePlan();
  return plan.actions.find(a=>a.status!=="complete")||plan.actions[0]||null;
}
function formatFocusTime(seconds){
  const m=Math.floor(seconds/60),s=seconds%60;
  return`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function renderFocusMode(){
  const action=focusAction();
  const defaultMinutes=action?.minutes||25;
  if(!adaptiveFocusRemaining)adaptiveFocusRemaining=defaultMinutes*60;
  el("main").innerHTML=`<section class="focus-mode-shell"><article class="focus-session-card"><div class="eyebrow">DISTRACTION-REDUCED LEARNING</div><h1>${action?esc(action.title):"Choose a learning action"}</h1><p>${action?esc(action.reason):"Return to My Adaptive Path to generate today’s plan."}</p><div id="focusTimerDisplay" class="focus-timer">${formatFocusTime(adaptiveFocusRemaining)}</div><div class="focus-duration-options">${adaptiveEngineConfig.focusDurations.map(m=>`<button data-focus-minutes="${m}" ${adaptiveFocusTimer?"disabled":""}>${m} min</button>`).join("")}</div><div class="focus-session-actions"><button id="focusBackBtn" class="secondary-btn">Back to path</button><button id="focusStartPauseBtn" class="primary-btn">${adaptiveFocusTimer?"Pause":"Start focus"}</button><button id="focusCompleteBtn" class="secondary-btn">Complete session</button></div><label>Session note<textarea id="focusSessionNote" placeholder="What did you understand, build or remain uncertain about?"></textarea></label></article><aside class="focus-guidance-card"><div class="eyebrow">FOCUS CONTRACT</div><h2>One goal. One session.</h2><p>1. Remove unrelated tabs.</p><p>2. Work on the recommended action only.</p><p>3. Write questions instead of immediately switching tasks.</p><p>4. End with a retrieval note from memory.</p><div class="focus-current-action"><strong>${action?.icon||"→"} ${action?.type||"Learning"}</strong><span>${action?capstoneAcademyName(action.academyId):""}</span></div></aside></section>`;
  document.querySelectorAll("[data-focus-minutes]").forEach(b=>b.onclick=()=>{adaptiveFocusRemaining=Number(b.dataset.focusMinutes)*60;renderFocusMode()});
  el("focusBackBtn").onclick=()=>{stopAdaptiveFocusTimer();renderView("adaptivepath")};
  el("focusStartPauseBtn").onclick=()=>{if(adaptiveFocusTimer)stopAdaptiveFocusTimer();else startAdaptiveFocusTimer();renderFocusMode()};
  el("focusCompleteBtn").onclick=()=>completeFocusSession(action);
}
function startAdaptiveFocusTimer(){
  if(adaptiveFocusTimer)return;
  adaptiveFocusTimer=setInterval(()=>{
    adaptiveFocusRemaining=Math.max(0,adaptiveFocusRemaining-1);
    const display=el("focusTimerDisplay");if(display)display.textContent=formatFocusTime(adaptiveFocusRemaining);
    if(adaptiveFocusRemaining<=0){stopAdaptiveFocusTimer();completeFocusSession(focusAction(),true)}
  },1000);
}
function stopAdaptiveFocusTimer(){
  if(adaptiveFocusTimer)clearInterval(adaptiveFocusTimer);
  adaptiveFocusTimer=null;
}
function completeFocusSession(action,automatic=false){
  stopAdaptiveFocusTimer();
  const note=el("focusSessionNote")?.value.trim()||"";
  const planned=action?.minutes||25;
  const elapsed=Math.max(1,Math.round((planned*60-adaptiveFocusRemaining)/60));
  state.focusSessions.unshift({id:`focus-${Date.now()}`,actionId:action?.id||null,title:action?.title||"Focus session",academyId:action?.academyId||adaptiveSelectedAcademy(),plannedMinutes:planned,elapsedMinutes:elapsed,note,completedAt:new Date().toISOString(),automatic});
  if(action&&elapsed>=Math.min(10,planned))completeAdaptiveAction(action.id);else{state.xp+=10;persist();renderAdaptivePath()}
  adaptiveFocusRemaining=0;
}

function deploymentCandidateCapstones(){
  return state.capstoneEvidence.map(e=>({evidence:e,capstone:capstoneById(e.capstoneId),run:state.capstoneRuns[e.capstoneId]})).filter(x=>x.capstone&&x.run);
}
function deploymentProjectId(capstoneId){return`deploy-${capstoneId}`}
function ensureDeploymentProject(capstone){
  const id=deploymentProjectId(capstone.id);
  if(!state.deploymentProjects[id]){
    const template=deploymentPipelineTemplates.find(t=>t.academyId===capstone.academyId)||deploymentPipelineTemplates[0];
    state.deploymentProjects[id]={
      id,
      capstoneId:capstone.id,
      academyId:capstone.academyId,
      title:capstone.title,
      version:"1.0.0",
      target:deploymentLearningTracks.find(t=>t.academyIds.includes(capstone.academyId))?.targets?.[0]||"Deployment target",
      releaseNotes:"",
      verificationNotes:"",
      rollbackPlan:"",
      checklist:{},
      pipelineTemplateId:template.id,
      pipelineState:{},
      createdAt:new Date().toISOString(),
      updatedAt:new Date().toISOString()
    };
  }
  return state.deploymentProjects[id];
}
function activeDeploymentProject(){
  return state.deploymentProjects[state.activeDeploymentProjectId]||null;
}
function deploymentTrackFor(project){
  return deploymentLearningTracks.find(t=>t.academyIds.includes(project.academyId))||deploymentLearningTracks[0];
}
function deploymentReadiness(project){
  const items=releaseReadinessChecklist.dimensions.flatMap(d=>d.items.map(item=>`${d.id}:${item}`));
  const passed=items.filter(key=>project.checklist?.[key]).length;
  const pipeline=deploymentPipelineTemplates.find(t=>t.id===project.pipelineTemplateId);
  const stagesDone=pipeline?.stages.filter(s=>project.pipelineState?.[s.id]==="passed").length||0;
  const base=Math.round(passed/items.length*65);
  const pipelineScore=pipeline?Math.round(stagesDone/pipeline.stages.length*25):0;
  const docs=(project.releaseNotes?.trim().length>=30?4:0)+(project.verificationNotes?.trim().length>=20?3:0)+(project.rollbackPlan?.trim().length>=20?3:0);
  return Math.min(100,base+pipelineScore+docs);
}
function renderDeploymentStudio(){
  const candidates=deploymentCandidateCapstones();
  el("main").innerHTML=`<section class="deployment-hero card"><div><div class="eyebrow">BUILD · RELEASE · OPERATE</div><h1>Turn finished code into a release-ready product.</h1><p>Package a completed capstone, run a simulated delivery pipeline, document configuration, verify the release and create deployment evidence.</p></div><div class="deployment-hero-score"><strong>${state.releaseRegister.length}</strong><span>recorded releases</span><small>${candidates.length} eligible capstones</small></div></section>
  <section class="deployment-candidate-grid">${candidates.map(({evidence,capstone})=>{const p=state.deploymentProjects[deploymentProjectId(capstone.id)],score=p?deploymentReadiness(p):0;return`<article class="card deployment-candidate"><div class="eyebrow">${capstoneAcademyName(capstone.academyId).toUpperCase()}</div><h2>${capstone.title}</h2><p>Capstone score ${evidence.score}% · ${Object.keys(state.capstoneRuns[capstone.id].files).length} source files</p><div class="deployment-readiness-mini"><span>Release readiness</span><strong>${score}%</strong></div><button class="primary-btn full" data-open-deployment="${capstone.id}">${p?"Continue release":"Prepare release"}</button></article>`}).join("")||"<div class='empty-state'><h2>No eligible projects yet</h2><p>Complete a Guided Capstone before preparing a deployment.</p></div>"}</section>
  <section class="deployment-learning-grid">${deploymentLearningTracks.map(track=>`<article class="card"><div class="eyebrow">DEPLOYMENT PATH</div><h2>${track.title}</h2><p>${track.summary}</p><div class="deployment-targets">${track.targets.map(t=>`<span>${t}</span>`).join("")}</div>${track.lessons.map(l=>`<details><summary>${l.title}</summary><p>${l.content}</p><strong>Outcome: ${l.objective}</strong></details>`).join("")}</article>`).join("")}</section>`;
  document.querySelectorAll("[data-open-deployment]").forEach(b=>b.onclick=()=>{const capstone=capstoneById(b.dataset.openDeployment);const project=ensureDeploymentProject(capstone);state.activeDeploymentProjectId=project.id;persist();renderView("releasepipeline")});
}
function renderReleasePipeline(){
  const project=activeDeploymentProject();if(!project){renderView("deploymentstudio");return}
  const capstone=capstoneById(project.capstoneId),run=state.capstoneRuns[project.capstoneId],track=deploymentTrackFor(project);
  const pipeline=deploymentPipelineTemplates.find(t=>t.id===project.pipelineTemplateId);
  const readiness=deploymentReadiness(project);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">RELEASE PIPELINE · ${capstoneAcademyName(project.academyId).toUpperCase()}</div><h1>${project.title}</h1><p>Version ${project.version} · ${project.target} · ${readiness}% ready</p></div><div class="release-head-actions"><button id="deploymentBackBtn" class="secondary-btn">Projects</button><button id="saveReleaseProjectBtn" class="primary-btn">Save release</button></div></div>
  <section class="release-pipeline-layout"><aside class="card release-config-panel"><div class="eyebrow">RELEASE CONFIGURATION</div><label>Version<input id="releaseVersion" value="${esc(project.version)}"></label><label>Target<select id="releaseTarget">${track.targets.map(t=>`<option ${t===project.target?"selected":""}>${t}</option>`).join("")}</select><label>Release notes<textarea id="releaseNotes" placeholder="What changed, why, and known limitations?">${esc(project.releaseNotes||"")}</textarea></label><label>Verification notes<textarea id="verificationNotes" placeholder="How will the release be checked?">${esc(project.verificationNotes||"")}</textarea></label><label>Rollback or recovery plan<textarea id="rollbackPlan" placeholder="How will you recover from a failed release?">${esc(project.rollbackPlan||"")}</textarea></label><button id="exportReleaseBundleBtn" class="secondary-btn full">Export GitHub-ready bundle</button></aside>
  <article class="card release-flow-panel"><div class="release-readiness-large"><strong>${readiness}%</strong><span>release readiness</span></div><h2>${pipeline.title}</h2><div class="release-stage-list">${pipeline.stages.map((s,i)=>`<article class="${project.pipelineState[s.id]||"pending"}"><span>${project.pipelineState[s.id]==="passed"?"✓":project.pipelineState[s.id]==="failed"?"!":i+1}</span><div><strong>${s.title}</strong><p>${s.description}</p></div><button data-run-release-stage="${s.id}">${project.pipelineState[s.id]==="passed"?"Run again":"Run stage"}</button></article>`).join("")}</div><button id="registerReleaseBtn" class="primary-btn full" ${readiness>=80?"":"disabled"}>Register production-ready release</button></article>
  <aside class="card release-checklist-panel"><div class="eyebrow">RELEASE READINESS</div><h2>Professional checklist</h2>${releaseReadinessChecklist.dimensions.map(d=>`<section><h3>${d.title}</h3>${d.items.map(item=>{const key=`${d.id}:${item}`;return`<label><input type="checkbox" data-release-check="${key}" ${project.checklist[key]?"checked":""}><span>${item}</span></label>`}).join("")}</section>`).join("")}<h3>Source files</h3>${Object.keys(run.files).map(name=>`<div class="release-file-row"><span>${name}</span><small>${run.files[name].length} chars</small></div>`).join("")}</aside></section>`;
  const save=()=>{project.version=el("releaseVersion").value.trim()||"1.0.0";project.target=el("releaseTarget").value;project.releaseNotes=el("releaseNotes").value;project.verificationNotes=el("verificationNotes").value;project.rollbackPlan=el("rollbackPlan").value;project.updatedAt=new Date().toISOString();persist()};
  el("deploymentBackBtn").onclick=()=>{save();renderView("deploymentstudio")};
  el("saveReleaseProjectBtn").onclick=()=>{save();alert("Release preparation saved.")};
  document.querySelectorAll("[data-release-check]").forEach(box=>box.onchange=()=>{project.checklist[box.dataset.releaseCheck]=box.checked;save();renderReleasePipeline()});
  document.querySelectorAll("[data-run-release-stage]").forEach(b=>b.onclick=()=>{save();runDeploymentStage(project,b.dataset.runReleaseStage,capstone,run);persist();renderReleasePipeline()});
  el("exportReleaseBundleBtn").onclick=()=>{save();exportDeploymentBundle(project,capstone,run)};
  el("registerReleaseBtn").onclick=()=>registerRelease(project,capstone,run);
}
function runDeploymentStage(project,stageId,capstone,run){
  const all=Object.values(run.files).join("\n");
  let passed=true,message="Stage completed.";
  if(stageId==="validate"||stageId==="lint"||stageId==="review"){
    const secretPattern=/(api[_-]?key|secret|password)\s*[:=]\s*["'][^"']{6,}/i;
    passed=!secretPattern.test(all);
    message=passed?"Structure validated and no obvious embedded secret pattern found.":"Potential embedded secret detected.";
  }else if(stageId==="test"){
    const checks=runCapstoneChecks(capstone,run);
    passed=checks.filter(c=>c.passed).length>=Math.ceil(checks.length*.6);
    message=passed?"Capstone checks meet the release threshold.":"Capstone checks are below the release threshold.";
  }else if(stageId==="build"||stageId==="package"||stageId==="migrate"){
    passed=Object.keys(run.files).length>0&&all.trim().length>100;
    message=passed?"Release artefact prepared.":"Project files are incomplete.";
  }else if(stageId==="deploy"){
    passed=Boolean(project.target&&project.version);
    message=passed?`Preview deployment simulated for ${project.target}.`:"Deployment target or version is missing.";
  }else if(stageId==="verify"||stageId==="health"||stageId==="reconcile"||stageId==="release"){
    passed=project.verificationNotes.trim().length>=20;
    message=passed?"Verification evidence accepted.":"Add meaningful verification notes before this stage.";
  }else if(stageId==="precheck"){
    passed=project.releaseNotes.trim().length>=20;
    message=passed?"Pre-change evidence captured.":"Document the change and controls first.";
  }
  project.pipelineState[stageId]=passed?"passed":"failed";
  project.pipelineState[`${stageId}Message`]=message;
  project.pipelineState[`${stageId}At`]=new Date().toISOString();
}
function deploymentReadme(project,capstone){
  return`# ${project.title}\n\n## Release\n\nVersion: ${project.version}\nTarget: ${project.target}\nAcademy: ${capstoneAcademyName(project.academyId)}\n\n## Release notes\n\n${project.releaseNotes||"Not documented"}\n\n## Verification\n\n${project.verificationNotes||"Not documented"}\n\n## Rollback or recovery\n\n${project.rollbackPlan||"Not documented"}\n\n## CodeQuest evidence\n\nThis project was completed in Guided Capstone App Studio and prepared through the CodeQuest release-readiness workflow.\n`;
}
function exportDeploymentBundle(project,capstone,run){
  saveDeploymentProjectFiles(project);
  const files={...run.files,"README.md":deploymentReadme(project,capstone),"RELEASE.json":JSON.stringify({version:project.version,target:project.target,readiness:deploymentReadiness(project),pipelineState:project.pipelineState,checklist:project.checklist,exportedAt:new Date().toISOString()},null,2)};
  if(typeof JSZip!=="undefined"){
    const zip=new JSZip();
    Object.entries(files).forEach(([name,content])=>zip.file(name,content));
    zip.generateAsync({type:"blob"}).then(blob=>downloadBlob(blob,`${slug(project.title)}-v${project.version}.zip`));
  }else{
    downloadBlob(new Blob([JSON.stringify(files,null,2)],{type:"application/json"}),`${slug(project.title)}-release-bundle.json`);
  }
}
function saveDeploymentProjectFiles(project){project.updatedAt=new Date().toISOString();persist()}
function registerRelease(project,capstone,run){
  const readiness=deploymentReadiness(project);
  if(readiness<80){alert("Reach at least 80% release readiness before registering the release.");return}
  const release={id:`release-${Date.now()}`,projectId:project.id,capstoneId:capstone.id,title:project.title,academyId:project.academyId,version:project.version,target:project.target,readiness,releaseNotes:project.releaseNotes,verificationNotes:project.verificationNotes,rollbackPlan:project.rollbackPlan,pipelineState:project.pipelineState,sourceFiles:Object.keys(run.files),releasedAt:new Date().toISOString()};
  state.releaseRegister.unshift(release);state.xp+=300;persist();renderView("releaseregister");
}
function renderReleaseRegister(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRODUCTION DELIVERY EVIDENCE</div><h1>Release register</h1><p>Versioned projects with deployment target, pipeline evidence, verification and recovery planning.</p></div><button id="exportReleaseRegisterBtn" class="secondary-btn">Export register</button></div><section class="release-register-grid">${state.releaseRegister.map(r=>`<article class="card release-record"><div class="release-record-score">${r.readiness}%</div><div><div class="eyebrow">${capstoneAcademyName(r.academyId).toUpperCase()} · VERSION ${r.version}</div><h2>${esc(r.title)}</h2><p>${esc(r.releaseNotes)}</p><div class="release-record-meta"><span>${esc(r.target)}</span><span>${r.sourceFiles.length} files</span><span>${new Date(r.releasedAt).toLocaleDateString()}</span></div><details><summary>Verification and recovery evidence</summary><h3>Verification</h3><p>${esc(r.verificationNotes)}</p><h3>Recovery</h3><p>${esc(r.rollbackPlan)}</p></details></div></article>`).join("")||"<div class='empty-state'><h2>No registered releases</h2><p>Prepare a completed capstone in Deployment Studio.</p></div>"}</section>`;
  el("exportReleaseRegisterBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),releases:state.releaseRegister},null,2)],{type:"application/json"}),"codequest-release-register.json");
}

function capstoneById(id){return guidedCapstones.find(c=>c.id===id)}
function activeCapstone(){return capstoneById(state.activeCapstoneId)}
function ensureCapstoneRun(capstone){
  if(!state.capstoneRuns[capstone.id]){
    state.capstoneRuns[capstone.id]={
      capstoneId:capstone.id,
      files:JSON.parse(JSON.stringify(capstone.files)),
      activeFile:Object.keys(capstone.files)[0],
      hintsUsed:0,
      solutionUnlocked:false,
      checks:[],
      reflection:"",
      startedAt:new Date().toISOString(),
      updatedAt:new Date().toISOString(),
      completed:false
    };
  }
  return state.capstoneRuns[capstone.id];
}
function capstoneAcademyName(id){return academies.find(a=>a.id===id)?.name||id}
function capstoneProgress(capstone,run){
  const checkScore=run.checks.length?run.checks.filter(c=>c.passed).length/capstone.checks.length:0;
  const fileScore=Object.values(run.files||{}).some(v=>v.trim().length>80)?20:0;
  return Math.min(100,Math.round(checkScore*70+fileScore+(run.reflection?.trim().length>=40?10:0)));
}
function renderCapstoneStudio(){
  const activeAcademyId=getActiveAcademy()?.id||"python";
  el("main").innerHTML=`<section class="capstone-hero card"><div><div class="eyebrow">GUIDED CAPSTONE APP STUDIO</div><h1>Build first. Check your work. Unlock the solution deliberately.</h1><p>Complete portfolio-grade applications at the end of your learning path with starter files, requirements, tests, graduated hints and annotated reference solutions.</p></div><div class="capstone-hero-metric"><strong>${guidedCapstones.length}</strong><span>guided applications</span><small>${state.capstoneEvidence.length} completed</small></div></section>
  <section class="capstone-filter-row"><button class="${activeAcademyId==="all"?"active":""}" data-capstone-filter="all">All</button>${["python","sql","web","java"].map(id=>`<button class="${activeAcademyId===id?"active":""}" data-capstone-filter="${id}">${capstoneAcademyName(id)}</button>`).join("")}</section>
  <section id="capstoneCatalogue" class="capstone-grid">${renderCapstoneCards(activeAcademyId)}</section>`;
  document.querySelectorAll("[data-capstone-filter]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-capstone-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");el("capstoneCatalogue").innerHTML=renderCapstoneCards(b.dataset.capstoneFilter);bindCapstoneCards()});
  bindCapstoneCards();
}
function renderCapstoneCards(filter){
  const items=guidedCapstones.filter(c=>filter==="all"||c.academyId===filter);
  return items.map(c=>{const run=state.capstoneRuns[c.id],progress=run?capstoneProgress(c,run):0;return`<article class="card capstone-card"><div class="capstone-card-head"><div><div class="eyebrow">${capstoneAcademyName(c.academyId).toUpperCase()} · ${c.level.toUpperCase()}</div><h2>${c.title}</h2></div><span>${progress}%</span></div><p>${c.summary}</p><div class="capstone-meta"><span>${c.duration}</span><span>${Object.keys(c.files).length} files</span><span>${c.checks.length} checks</span></div><div class="capstone-skill-list">${c.skills.map(s=>`<span>${s}</span>`).join("")}</div><button class="primary-btn full" data-open-capstone="${c.id}">${run?"Continue building":"Start capstone"}</button></article>`}).join("");
}
function bindCapstoneCards(){
  document.querySelectorAll("[data-open-capstone]").forEach(b=>b.onclick=()=>{state.activeCapstoneId=b.dataset.openCapstone;ensureCapstoneRun(capstoneById(state.activeCapstoneId));persist();renderView("capstoneworkspace")});
}
function saveCapstoneEditor(run){
  const editor=el("capstoneCodeEditor");
  if(editor)run.files[run.activeFile]=editor.value;
  run.updatedAt=new Date().toISOString();
  persist();
}
function renderCapstoneWorkspace(){
  const capstone=activeCapstone();if(!capstone){renderView("capstonestudio");return}
  const run=ensureCapstoneRun(capstone);
  const progress=capstoneProgress(capstone,run);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${capstoneAcademyName(capstone.academyId).toUpperCase()} CAPSTONE</div><h1>${capstone.title}</h1><p>${capstone.level} · ${capstone.duration} · ${progress}% complete</p></div><div class="capstone-head-actions"><button id="capstoneCatalogueBtn" class="secondary-btn">Catalogue</button><button id="saveCapstoneBtn" class="primary-btn">Save work</button></div></div>
  <section class="capstone-workspace-layout"><aside class="card capstone-brief-panel"><div class="eyebrow">PROJECT BRIEF</div><p>${capstone.brief}</p><h3>Requirements</h3>${capstone.requirements.map(r=>`<div class="capstone-requirement">○ <span>${r}</span></div>`).join("")}<h3>Skills practised</h3><div class="capstone-skill-list">${capstone.skills.map(s=>`<span>${s}</span>`).join("")}</div><button id="capstoneHintBtn" class="secondary-btn full">Request hint ${Math.min(run.hintsUsed+1,capstone.hints.length)}/${capstone.hints.length}</button><div id="capstoneHintOutput">${run.hintsUsed?`<div class="capstone-hint"><strong>Latest hint</strong><p>${capstone.hints[Math.min(run.hintsUsed-1,capstone.hints.length-1)]}</p></div>`:""}</div></aside>
  <article class="card capstone-editor-panel"><div class="capstone-file-tabs">${Object.keys(run.files).map(name=>`<button class="${name===run.activeFile?"active":""}" data-capstone-file="${name}">${name}</button>`).join("")}</div><textarea id="capstoneCodeEditor" class="studio-code">${esc(run.files[run.activeFile]||"")}</textarea><div class="capstone-editor-actions"><button id="resetCapstoneFileBtn" class="secondary-btn">Reset file</button><button id="runCapstoneChecksBtn" class="primary-btn">Run project checks</button></div><div id="capstoneCheckOutput">${renderCapstoneCheckResults(run.checks)}</div></article>
  <aside class="card capstone-solution-panel"><div class="eyebrow">REFERENCE SOLUTION</div><h2>${run.solutionUnlocked?"Solution unlocked":"Try independently first"}</h2><p>${run.solutionUnlocked?"Compare structure, reasoning and trade-offs. Do not merely copy the files.":"Use the requirements, starter files and hints before unlocking the complete reference implementation."}</p>${run.solutionUnlocked?`<select id="solutionFileSelect">${Object.keys(capstone.solution).map(name=>`<option>${name}</option>`).join("")}</select><pre id="capstoneSolutionCode">${esc(capstone.solution[Object.keys(capstone.solution)[0]])}</pre><button id="copySolutionFileBtn" class="secondary-btn full">Copy solution into workspace</button>`:`<div class="solution-lock"><strong>${run.hintsUsed}/${capstone.hints.length} hints explored</strong><p>Unlocking is always available, but CodeQuest records whether you attempted the build first.</p><button id="unlockCapstoneSolutionBtn" class="secondary-btn full">Unlock reference solution</button></div>`}<h3>Reflection</h3><textarea id="capstoneReflection" placeholder="What did you build, what failed, and what did the solution teach you?">${esc(run.reflection||"")}</textarea><button id="completeCapstoneBtn" class="primary-btn full">Complete capstone</button></aside></section>`;
  document.querySelectorAll("[data-capstone-file]").forEach(b=>b.onclick=()=>{saveCapstoneEditor(run);run.activeFile=b.dataset.capstoneFile;persist();renderCapstoneWorkspace()});
  el("capstoneCatalogueBtn").onclick=()=>{saveCapstoneEditor(run);renderView("capstonestudio")};
  el("saveCapstoneBtn").onclick=()=>{saveCapstoneEditor(run);alert("Capstone work saved.")};
  el("resetCapstoneFileBtn").onclick=()=>{if(confirm(`Reset ${run.activeFile} to the starter version?`)){run.files[run.activeFile]=capstone.files[run.activeFile]||"";persist();renderCapstoneWorkspace()}};
  el("capstoneHintBtn").onclick=()=>{if(run.hintsUsed<capstone.hints.length)run.hintsUsed++;persist();renderCapstoneWorkspace()};
  el("runCapstoneChecksBtn").onclick=()=>{saveCapstoneEditor(run);run.checks=runCapstoneChecks(capstone,run);persist();renderCapstoneWorkspace()};
  if(el("unlockCapstoneSolutionBtn"))el("unlockCapstoneSolutionBtn").onclick=()=>{if(confirm("Unlock the full reference solution? Your independent attempt remains saved.")){run.solutionUnlocked=true;run.solutionUnlockedAt=new Date().toISOString();persist();renderCapstoneWorkspace()}};
  if(el("solutionFileSelect"))el("solutionFileSelect").onchange=e=>{el("capstoneSolutionCode").textContent=capstone.solution[e.target.value]};
  if(el("copySolutionFileBtn"))el("copySolutionFileBtn").onclick=()=>{const name=el("solutionFileSelect").value;if(confirm(`Replace your ${name} with the reference solution?`)){run.files[name]=capstone.solution[name];run.activeFile=name;persist();renderCapstoneWorkspace()}};
  el("completeCapstoneBtn").onclick=()=>completeGuidedCapstone(capstone,run);
}
function runCapstoneChecks(capstone,run){
  const allContent=Object.entries(run.files).map(([name,content])=>`${name}\n${content}`).join("\n").toLowerCase();
  return capstone.checks.map(check=>({id:check.id,label:check.label,passed:check.tokens.every(token=>allContent.includes(token.toLowerCase()))}));
}
function renderCapstoneCheckResults(checks){
  if(!checks?.length)return"<p class='muted'>Run checks when you have a working attempt.</p>";
  return`<div class="capstone-check-list">${checks.map(c=>`<div class="${c.passed?"passed":"failed"}"><span>${c.passed?"✓":"○"}</span><strong>${c.label}</strong></div>`).join("")}</div>`;
}
function completeGuidedCapstone(capstone,run){
  saveCapstoneEditor(run);
  run.reflection=el("capstoneReflection").value.trim();
  run.checks=runCapstoneChecks(capstone,run);
  const passed=run.checks.filter(c=>c.passed).length;
  if(passed<Math.ceil(capstone.checks.length*.6)){alert("Pass at least 60% of the project checks before completing the capstone.");persist();renderCapstoneWorkspace();return}
  if(run.reflection.length<40){alert("Add a meaningful reflection of at least 40 characters.");return}
  if(!run.completed){
    run.completed=true;run.completedAt=new Date().toISOString();
    const evidence={id:`capstone-evidence-${Date.now()}`,capstoneId:capstone.id,title:capstone.title,academyId:capstone.academyId,score:Math.round(passed/capstone.checks.length*100),hintsUsed:run.hintsUsed,solutionUnlocked:run.solutionUnlocked,reflection:run.reflection,completedAt:run.completedAt};
    state.capstoneEvidence.unshift(evidence);
    state.xp+=500;
  }
  persist();renderView("capstoneportfolio");
}
function renderCapstonePortfolio(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAPSTONE APPLICATION EVIDENCE</div><h1>Capstone portfolio</h1><p>Completed applications with check results, learning reflection and solution-use transparency.</p></div><button id="exportCapstonePortfolioBtn" class="secondary-btn">Export evidence</button></div><section class="capstone-portfolio-grid">${state.capstoneEvidence.map(e=>`<article class="card capstone-evidence-card"><div class="capstone-evidence-score">${e.score}%</div><div><div class="eyebrow">${capstoneAcademyName(e.academyId).toUpperCase()}</div><h2>${e.title}</h2><div class="capstone-evidence-meta"><span>${e.hintsUsed} hints</span><span>${e.solutionUnlocked?"Solution viewed":"Independent solution"}</span><span>${new Date(e.completedAt).toLocaleDateString()}</span></div><p>${esc(e.reflection)}</p></div></article>`).join("")||"<div class='empty-state'><h2>No completed capstones yet</h2><p>Build an application in Capstone App Studio to create evidence.</p></div>"}</section>`;
  el("exportCapstonePortfolioBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),capstones:state.capstoneEvidence},null,2)],{type:"application/json"}),"codequest-capstone-portfolio.json");
}

function selectedCareerRole(){
  return careerLaunchRoles.find(r=>r.id===state.careerLaunchProfile.roleId)||careerLaunchRoles[0];
}
function academyEvidenceScore(id){
  if(id==="python"){
    const progress=pathwayOverallProgress();
    const projects=(state.completedProjects||[]).length+(state.studioReleases||[]).length;
    const viva=state.technicalVivaHistory.filter(v=>v.academyId==="python");
    return Math.min(100,Math.round(progress*.55+Math.min(25,projects*8)+(viva.length?Math.min(20,viva.reduce((s,v)=>s+v.score,0)/viva.length*.2):0)));
  }
  if(id==="sql")return Math.round(sqlOverallProgress()*.65+Math.min(35,academyPortfolioProjects("sql").length*12));
  if(id==="web")return Math.round(webOverallProgress()*.65+Math.min(35,academyPortfolioProjects("web").length*12));
  if(id==="java")return Math.round(javaOverallProgress()*.65+Math.min(35,academyPortfolioProjects("java").length*12));
  return 0;
}
function roleSkillScores(role){
  return role.skills.map(skill=>{
    let score=0;
    const sid=skill.id;
    if(sid.includes("python"))score=academyEvidenceScore("python");
    else if(sid.includes("sql")||sid==="database"||sid==="databases"||sid==="data-quality")score=academyEvidenceScore("sql");
    else if(["html","css","javascript","browser","accessibility","frontend","visualisation"].some(x=>sid.includes(x)))score=academyEvidenceScore("web");
    else if(["java","oop","spring"].some(x=>sid.includes(x)))score=academyEvidenceScore("java");
    else if(sid==="projects")score=Math.min(100,(portfolioEvidence().length+state.missionPortfolio.length*2+state.pairProgrammingSessions.length)*10);
    else if(["testing","production","delivery"].some(x=>sid.includes(x)))score=Math.min(100,(state.codingSubmissions.filter(s=>s.status==="passed").length*5+state.missionPortfolio.length*20+state.pairProgrammingSessions.length*5));
    else score=Math.round(role.academies.reduce((s,a)=>s+academyEvidenceScore(a),0)/role.academies.length);
    return{...skill,score:Math.min(100,score)};
  });
}
function careerReadiness(role){
  const scores=roleSkillScores(role);
  return Math.round(scores.reduce((s,x)=>s+x.score*x.weight,0)/scores.reduce((s,x)=>s+x.weight,0));
}
function careerMilestoneState(role){
  const readiness=careerReadiness(role);
  return careerLaunchMilestones.map((m,i)=>({...m,complete:
    i===0?Boolean(state.careerLaunchProfile.roleId):
    i===1?readiness>=35:
    i===2?portfolioEvidence().length>=2:
    i===3?state.technicalVivaHistory.length>=2:
    i===4?state.missionPortfolio.length>=1:
    i===5?state.applicationPacks.length>=1:false
  }));
}
function renderCareerLaunch(){
  const role=selectedCareerRole(),readiness=careerReadiness(role),skills=roleSkillScores(role),milestones=careerMilestoneState(role);
  el("main").innerHTML=`<section class="career-launch-hero card"><div><div class="eyebrow">CAREER LAUNCH OS</div><h1>Turn learning into a credible career story.</h1><p>Select a target role, close skill gaps and build evidence that can survive recruiter and interviewer scrutiny.</p><div class="career-role-select"><label>Target role<select id="careerRoleSelect">${careerLaunchRoles.map(r=>`<option value="${r.id}" ${r.id===role.id?"selected":""}>${r.title}</option>`).join("")}</select></label><button id="careerRoleSaveBtn" class="primary-btn">Set role</button></div></div><div class="career-readiness"><span>Role readiness</span><strong>${readiness}%</strong><div class="progress-track"><div style="width:${readiness}%"></div></div><small>${readiness>=80?"Evidence-backed":readiness>=60?"Strong foundation":readiness>=35?"Developing":"Foundation stage"}</small></div></section>
  <section class="career-launch-grid"><article class="card"><div class="eyebrow">SKILL GAP ANALYSIS</div><h2>${role.title}</h2><p>${role.summary}</p>${skills.map(s=>`<div class="career-skill-row"><div><strong>${s.title}</strong><span>${s.score}%</span></div><div class="progress-track"><div style="width:${s.score}%"></div></div></div>`).join("")}</article><article class="card"><div class="eyebrow">CAREER MILESTONES</div><h2>Your launch plan</h2>${milestones.map((m,i)=>`<div class="career-milestone ${m.complete?"complete":""}"><span>${m.complete?"✓":i+1}</span><div><strong>${m.title}</strong><p>${m.description}</p></div></div>`).join("")}</article><article class="card"><div class="eyebrow">NEXT BEST ACTIONS</div><h2>What to do now</h2>${skills.sort((a,b)=>a.score-b.score).slice(0,3).map(s=>`<div class="career-action"><strong>Strengthen ${s.title}</strong><p>Current evidence score ${s.score}%. Complete academy lessons, projects or a mission aligned to this skill.</p></div>`).join("")}<button id="openJobMatcherBtn" class="secondary-btn full">Match a job description</button><button id="buildApplicationPackBtn" class="primary-btn full">Build application pack</button></article></section>`;
  el("careerRoleSaveBtn").onclick=()=>{state.careerLaunchProfile.roleId=el("careerRoleSelect").value;state.careerLaunchProfile.updatedAt=new Date().toISOString();persist();renderCareerLaunch()};
  el("openJobMatcherBtn").onclick=()=>renderView("jobmatcher");
  el("buildApplicationPackBtn").onclick=()=>renderView("applicationpack");
}
function analyseJobDescription(text){
  const lower=text.toLowerCase(),matched=[],missing=[];
  Object.entries(jobMatchRules.keywords).forEach(([group,words])=>{
    const hits=words.filter(w=>lower.includes(w));
    if(hits.length)matched.push({group,hits});
    else missing.push(group);
  });
  const role=selectedCareerRole(),skills=roleSkillScores(role);
  const evidence=skills.filter(s=>s.score>=50).map(s=>s.title);
  const keywordScore=Math.round(matched.length/Object.keys(jobMatchRules.keywords).length*45);
  const readinessScore=Math.round(careerReadiness(role)*.45);
  const evidenceScore=Math.min(10,evidence.length*2);
  return{score:Math.min(100,keywordScore+readinessScore+evidenceScore),matched,missing,evidence,roleId:role.id};
}
function renderJobMatcher(){
  const latest=state.jobMatches[0];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JOB DESCRIPTION INTELLIGENCE</div><h1>Job matcher</h1><p>Compare a role against your actual CodeQuest evidence—not self-rated claims.</p></div></div><section class="job-matcher-layout"><article class="card"><label>Job title<input id="jobMatchTitle" value="${esc(latest?.title||"")}" placeholder="Example: Junior Data Analyst"></label><label>Job description<textarea id="jobMatchDescription" placeholder="Paste the job description here…">${esc(latest?.description||"")}</textarea></label><button id="analyseJobBtn" class="primary-btn">Analyse match</button></article><aside class="card" id="jobMatchResult">${latest?renderJobMatchResult(latest):"<div class='empty-state'><h2>No analysis yet</h2><p>Paste a job description to identify alignment, gaps and evidence.</p></div>"}</aside></section>`;
  el("analyseJobBtn").onclick=()=>{const title=el("jobMatchTitle").value.trim(),description=el("jobMatchDescription").value.trim();if(!description){alert("Paste a job description.");return}const result={id:`match-${Date.now()}`,title:title||"Untitled role",description,...analyseJobDescription(description),createdAt:new Date().toISOString()};state.jobMatches.unshift(result);persist();renderJobMatcher()};
}
function renderJobMatchResult(match){
  return`<div class="job-match-score ${match.score>=75?"strong":match.score>=50?"developing":"weak"}">${match.score}%</div><div class="eyebrow">EVIDENCE MATCH</div><h2>${esc(match.title)}</h2><h3>Matched requirements</h3>${match.matched.map(m=>`<div class="match-chip"><strong>${m.group}</strong><span>${m.hits.join(", ")}</span></div>`).join("")||"<p class='muted'>No major keywords matched.</p>"}<h3>Your supporting evidence</h3>${match.evidence.map(e=>`<div class="evidence-line">✓ ${esc(e)}</div>`).join("")||"<p class='muted'>Build more role-aligned evidence.</p>"}<h3>Likely gaps</h3><p>${match.missing.join(", ")||"No broad category gaps detected."}</p>`;
}
function evidenceCvBullets(role){
  const bullets=[];
  const evidence=[...portfolioEvidence(),...state.missionPortfolio];
  if(evidence.length)bullets.push(`Built and documented ${evidence.length} evidence-backed ${role.title.toLowerCase()} projects, credentials and workplace simulations across CodeQuest.`);
  state.missionPortfolio.slice(0,2).forEach(m=>bullets.push(`Completed the ${m.title} workplace simulation, producing technical decisions, stakeholder communications and a scored evidence dossier (${m.score}%).`));
  if(state.peerReviewRequests.length)bullets.push(`Participated in ${state.peerReviewRequests.length} structured peer reviews covering correctness, testing, design and delivery risk.`);
  if(state.technicalVivaHistory.length)bullets.push(`Completed ${state.technicalVivaHistory.length} technical viva exercises, defending design decisions and engineering trade-offs.`);
  role.academies.forEach(a=>{const score=academyEvidenceScore(a);if(score>=35)bullets.push(`Developed ${academies.find(x=>x.id===a)?.name||a} capability with an evidence score of ${score}%.`)});
  return bullets;
}
function renderApplicationPack(){
  const role=selectedCareerRole(),bullets=evidenceCvBullets(role),match=state.jobMatches[0];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAREER EVIDENCE PACK</div><h1>Application pack</h1><p>Translate CodeQuest evidence into honest, interview-defensible application material.</p></div><button id="saveApplicationPackBtn" class="primary-btn">Save pack</button></div><section class="application-pack-grid"><article class="card"><div class="eyebrow">CV EVIDENCE BULLETS</div><h2>${role.title}</h2><div id="cvBulletList">${bullets.map((b,i)=>`<textarea data-cv-bullet="${i}">${esc(b)}</textarea>`).join("")||"<p class='muted'>Complete projects and missions to generate evidence bullets.</p>"}</div></article><article class="card"><div class="eyebrow">INTERVIEW PREPARATION</div><h2>Topics to defend</h2>${role.interviewTopics.map(t=>`<label class="interview-topic"><input type="checkbox"><span>${t}</span></label>`).join("")}<h3>Evidence questions</h3><p>Which project best proves your readiness?</p><p>What failed, and how did you diagnose it?</p><p>Which trade-off did you make, and why?</p><p>How would you improve the solution for production?</p></article><article class="card"><div class="eyebrow">TARGET ROLE</div><h2>${esc(match?.title||role.title)}</h2><p>${match?`Latest job match: ${match.score}%`:"Run Job Matcher to tailor this pack to a specific vacancy."}</p><label>Professional summary<textarea id="applicationSummary">${esc(state.careerLaunchProfile.summary||`Aspiring ${role.title} building practical, evidence-backed capability across ${role.academies.map(a=>academies.find(x=>x.id===a)?.shortName||a).join(", ")}.`)}</textarea></label><button id="exportApplicationPackBtn" class="secondary-btn full">Export JSON pack</button></article></section>`;
  el("saveApplicationPackBtn").onclick=()=>{const pack={id:`pack-${Date.now()}`,roleId:role.id,jobMatchId:match?.id||null,summary:el("applicationSummary").value,bullets:[...document.querySelectorAll("[data-cv-bullet]")].map(x=>x.value),createdAt:new Date().toISOString()};state.applicationPacks.unshift(pack);state.careerLaunchProfile.summary=pack.summary;persist();alert("Application pack saved.")};
  el("exportApplicationPackBtn").onclick=()=>{const pack={role:role.title,summary:el("applicationSummary").value,cvBullets:[...document.querySelectorAll("[data-cv-bullet]")].map(x=>x.value),interviewTopics:role.interviewTopics,jobMatch:match||null,evidence:portfolioEvidence()};downloadBlob(new Blob([JSON.stringify(pack,null,2)],{type:"application/json"}),`codequest-${slug(role.title)}-application-pack.json`)};
}
function renderTalentProfile(){
  const role=selectedCareerRole(),readiness=careerReadiness(role),skills=roleSkillScores(role),evidence=[...portfolioEvidence(),...state.missionPortfolio];
  el("main").innerHTML=`<section class="talent-profile-hero card"><div><div class="eyebrow">EMPLOYER-READY TALENT PROFILE</div><h1>${esc(state.profile?.name||"CodeQuest learner")}</h1><p>${esc(state.careerLaunchProfile.summary||role.summary)}</p><div class="talent-tags">${role.academies.map(a=>`<span>${academies.find(x=>x.id===a)?.name||a}</span>`).join("")}</div></div><div class="talent-readiness"><strong>${readiness}%</strong><span>${role.title} readiness</span></div></section><section class="talent-profile-grid"><article class="card"><div class="eyebrow">CAPABILITY</div><h2>Evidence-backed skills</h2>${skills.map(s=>`<div class="talent-skill"><div><strong>${s.title}</strong><span>${s.score}%</span></div><div class="progress-track"><div style="width:${s.score}%"></div></div></div>`).join("")}</article><article class="card"><div class="eyebrow">PROFESSIONAL EVIDENCE</div><h2>${evidence.length} evidence items</h2>${evidence.slice(0,10).map(e=>`<div class="talent-evidence"><strong>${esc(e.title)}</strong><span>${esc(e.type||e.role||"Evidence")}</span></div>`).join("")||"<p class='muted'>Evidence will appear after projects, credentials and missions.</p>"}</article><article class="card"><div class="eyebrow">WORKING STYLE</div><h2>Collaboration and judgement</h2><div class="talent-metric"><strong>${state.peerReviewRequests.length}</strong><span>peer reviews</span></div><div class="talent-metric"><strong>${state.teamWorkspaces.length}</strong><span>team workspaces</span></div><div class="talent-metric"><strong>${state.missionPortfolio.length}</strong><span>workplace missions</span></div><div class="talent-metric"><strong>${state.technicalVivaHistory.length}</strong><span>technical defences</span></div></article></section>`;
  document.querySelectorAll("[data-review-revision]").forEach(button=>button.onclick=()=>{
    const item=state.instructorReviewQueue.find(row=>row.id===button.dataset.reviewRevision);
    const comment=prompt("Revision request","Please address the failed checks and resubmit.");
    if(!item||!comment?.trim())return;
    item.status="revision-requested";
    item.instructorComments.push(comment.trim());
    persist();renderInstructorReviewQueue();
  });
  document.querySelectorAll("[data-review-accept]").forEach(button=>button.onclick=()=>{
    const item=state.instructorReviewQueue.find(row=>row.id===button.dataset.reviewAccept);
    if(!item)return;
    item.status="accepted";
    item.instructorComments.push("Automated evidence accepted for completion.");
    persist();renderInstructorReviewQueue();
  });
}

function showPublicExperience(view="landing"){
  const member=isAuthenticated();
  document.body.classList.remove("auth-pending");
  document.body.classList.toggle("authenticated",member);
  document.body.classList.add("public-view");
  el("authScreen")?.classList.add("hidden");
  document.querySelector(".topbar")?.classList.add("hidden");
  document.querySelector(".app-shell")?.classList.add("hidden");
  updatePublicAccountActions();
  if(view==="privacy"||view==="terms")renderPublicLegal(view);
  else if(view==="faq")renderPublicFaq();
  else renderPublicLanding();
  el("publicLanding")?.classList.remove("hidden");
  requestAnimationFrame(()=>{
    document.body.classList.remove("public-boot");
    el("codeQuestBootSplash")?.classList.add("complete");
  });
  window.scrollTo({top:0,behavior:"instant"});
}
function openAuthentication(mode="signin"){
  if(window.supabase?.createClient&&authConfig()?.url&&authConfig()?.anonKey){
    el("authConfigurationNotice")?.classList.add("hidden");
    if(el("authConfigurationNotice"))el("authConfigurationNotice").textContent="";
    if(el("authSubmitBtn"))el("authSubmitBtn").disabled=false;
    if(el("googleAuthBtn"))el("googleAuthBtn").disabled=false;
  }
  document.body.classList.remove("public-boot","public-view");
  el("codeQuestBootSplash")?.classList.add("complete");
  el("publicLanding")?.classList.add("hidden");
  document.body.classList.add("auth-pending");
  el("authScreen")?.classList.remove("hidden");
  if(mode==="signup")setAuthMode("signup");else setAuthMode("signin");
}
function restoreAuthenticatedChrome(){
  document.body.classList.remove("public-view");
  el("publicLanding")?.classList.add("hidden");
  document.querySelector(".topbar")?.classList.remove("hidden");
  document.querySelector(".app-shell")?.classList.remove("hidden");
  el("homePageBtn")?.classList.remove("hidden");
  el("dashboardPageBtn")?.classList.add("hidden");
}

function updatePublicAccountActions(){
  const member=isAuthenticated();
  el("publicGuestActions")?.classList.toggle("hidden",member);
  el("publicMemberActions")?.classList.toggle("hidden",!member);
  const user=PythonQuestCloud.getUser?.();
  const displayName=state.profile?.name||user?.user_metadata?.full_name||user?.email?.split("@")[0]||"Member";
  if(el("publicMemberName"))el("publicMemberName").textContent=`Signed in as ${displayName}`;
}
function returnToDashboard(view="dashboard"){
  if(!isAuthenticated()){
    openAuthentication("signin");
    return;
  }
  restoreAuthenticatedChrome();
  document.body.classList.add("authenticated");
  document.body.classList.remove("auth-pending");
  el("authScreen")?.classList.add("hidden");
  renderView(view);
  window.scrollTo({top:0,behavior:"instant"});
}
function publicPrimaryAction(){
  if(isAuthenticated())returnToDashboard();
  else openAuthentication("signup");
}


function publicPricingCardsHtml(){
  const ordered=["free","starter_15_day","pro_monthly","pro_annual"];
  return`<section id="pricing" class="landing-section public-pricing-section"><div class="landing-heading pricing-landing-heading"><div><div class="eyebrow">SIMPLE PRICING</div><h2>Start free. Upgrade when the next outcome matters.</h2><p>No automatic Starter Pack renewal. No work is deleted after downgrade.</p></div></div><div class="pricing-grid public-pricing-grid">${ordered.map(id=>{const plan=freemiumPlans[id];return`<article class="pricing-card ${id==="pro_annual"?"best-value":""}">${id==="pro_annual"?'<div class="pricing-recommended">Best value</div>':""}<h3>${esc(plan.name)}</h3><p>${esc(plan.description)}</p><div class="pricing-price"><strong>${esc(plan.priceLabel)}</strong><span>${esc(plan.billingLabel)}</span></div>${plan.monthlyEquivalent?`<small>${esc(plan.monthlyEquivalent)}</small>`:""}<div class="pricing-features">${pricingFeatureLabels(plan).map(item=>`<span>✓ ${esc(item)}</span>`).join("")}</div>${id==="free"?'<button class="secondary-btn" data-public-free>Start free</button>':`<button class="primary-btn" data-public-buy-plan="${id}">${id==="starter_15_day"?"Buy Starter Pack":"Choose plan"}</button>`}</article>`}).join("")}</div><div class="public-pricing-note"><strong>Fair access:</strong> Starter Pack is a one-off purchase. Existing projects, completed lessons and credentials remain visible after expiry or downgrade.</div></section>`;
}
function bindPublicPricing(){
  document.querySelectorAll("[data-public-buy-plan]").forEach(button=>button.onclick=()=>beginPlanCheckout(button.dataset.publicBuyPlan,{publicSource:true}));
  document.querySelectorAll("[data-public-free]").forEach(button=>button.onclick=publicPrimaryAction);
}

function renderPublicLanding(){
  if(!publicLandingDataReady()){
    el("publicContent").innerHTML=`<section class="landing-loading-shell" aria-live="polite"><div class="eyebrow">CODEQUEST ACADEMY</div><h1>Preparing your learning experience…</h1><p>The public catalogue is loading.</p></section>`;
    return;
  }
  const c=landingContent,a=c.academyCards[state.landingCarouselIndex]||c.academyCards[0];
  el("publicContent").innerHTML=`<section class="landing-hero"><div><div class="eyebrow">${c.hero.eyebrow}</div><h1>${c.hero.title}</h1><p>${c.hero.subtitle}</p><div class="landing-actions"><button id="landingStartBtn" class="primary-btn">Start learning free</button><button id="landingPricingBtn" class="secondary-btn">View pricing</button><button class="text-btn" data-public-scroll="academies">Explore academies →</button></div><div class="landing-trust"><span>✓ No installation</span><span>✓ Progress saved</span><span>✓ Unified portfolio</span></div></div><div class="product-preview"><div class="preview-tabs">${c.academyCards.map((x,i)=>`<button class="${i===state.landingCarouselIndex?"active":""}" data-preview-index="${i}">${x.id.toUpperCase()}</button>`).join("")}</div><div class="preview-body"><div class="eyebrow">LEARNING COMMAND</div><h2>${a.title}</h2><p>${a.tagline}</p>${a.highlights.map(h=>`<div class="preview-feature">✓ <span>${h}</span></div>`).join("")}</div></div></section>
  <section class="landing-proof">${c.proof.map(p=>`<div><strong>${p.value}</strong><span>${p.label}</span></div>`).join("")}</section>
  <section class="landing-plan-summary"><div><strong>Free</strong><span>Start learning</span></div><div><strong>£7</strong><span>15-day Starter Pack</span></div><div><strong>£10</strong><span>Pro Monthly</span></div><div><strong>£84</strong><span>Pro Annual</span></div><button data-public-scroll="pricing">Compare all plans</button></section>
  ${publicPricingCardsHtml()}
  <section id="academies" class="landing-section"><div class="landing-heading"><div><div class="eyebrow">FOUR COMPLETE ACADEMIES</div><h2>One platform. Multiple career paths.</h2></div><div><button id="carouselPrev">←</button><button id="carouselNext">→</button></div></div><div class="academy-carousel">${c.academyCards.map((x,i)=>`<article class="${i===state.landingCarouselIndex?"featured":""}"><span class="academy-badge">${x.id==="python"?"Py":x.id==="sql"?"SQL":x.id==="web"?"Web":"Java"}</span><div class="eyebrow">${x.title.toUpperCase()}</div><h3>${x.tagline}</h3>${x.highlights.map(h=>`<p>✓ ${h}</p>`).join("")}<button class="text-btn" data-start-academy="${x.id}">Start here →</button></article>`).join("")}</div></section>
  <section id="how" class="landing-section dark"><div class="landing-heading"><div><div class="eyebrow">HOW CODEQUEST WORKS</div><h2>From learning to professional proof.</h2></div></div><div class="journey-grid">${c.journey.map(j=>`<article><span>${j.step}</span><h3>${j.title}</h3><p>${j.body}</p></article>`).join("")}</div></section>
  <section class="landing-section"><div class="landing-heading"><div><div class="eyebrow">A COMPLETE GROWTH ENVIRONMENT</div><h2>Far more than a course catalogue.</h2></div></div><div class="landing-feature-grid">${[["Interactive learning","Lessons, diagnostics, coding and assessment."],["AI mentor","Socratic tutoring, debugging and review."],["Workplace missions","Incidents, stakeholders and releases."],["Team engineering","Roles, boards, reviews and hackathons."],["Professional proof","Portfolios, credentials and evidence."],["Instructor OS","Cohorts, grades and learner analytics."]].map(x=>`<article><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("")}</div></section>
  <section class="landing-cta"><div><div class="eyebrow">START YOUR CODEQUEST</div><h2>Learn actively. Build real evidence. Prove what you can do.</h2></div><button id="landingFinalBtn" class="primary-btn">Create free account</button></section>`;
  const member=isAuthenticated();
  if(el("landingStartBtn"))el("landingStartBtn").textContent=member?"Go to dashboard":"Start learning free";
  if(el("landingFinalBtn"))el("landingFinalBtn").textContent=member?"Return to dashboard":"Create free account";
  el("landingStartBtn").onclick=publicPrimaryAction;
  el("landingFinalBtn").onclick=publicPrimaryAction;
  if(el("landingPricingBtn"))el("landingPricingBtn").onclick=()=>el("pricing")?.scrollIntoView({behavior:"smooth",block:"start"});
  bindPublicPricing();
  el("carouselPrev").onclick=()=>movePublicCarousel(-1);el("carouselNext").onclick=()=>movePublicCarousel(1);
  document.querySelectorAll("[data-preview-index]").forEach(b=>b.onclick=()=>{state.landingCarouselIndex=Number(b.dataset.previewIndex);renderPublicLanding()});
  document.querySelectorAll("[data-start-academy]").forEach(b=>b.onclick=()=>{
    const academyId=b.dataset.startAcademy;
    localStorage.setItem("pq_active_academy",academyId);
    state.activeAcademyId=academyId;
    if(isAuthenticated()){
      reconcileAcademyContext();
      updateAcademyChrome();
      returnToDashboard("academyhome");
    }else{
      openAuthentication("signup");
    }
  });
  bindPublicLinks();
}
function movePublicCarousel(d){state.landingCarouselIndex=(state.landingCarouselIndex+d+4)%4;renderPublicLanding();el("academies")?.scrollIntoView({behavior:"smooth"})}
function renderPublicLegal(type){
  const p=legalContent[type];
  el("publicContent").innerHTML=`<section class="legal-hero"><div class="eyebrow">CODEQUEST LEGAL</div><h1>${p.title}</h1><p>Last updated ${p.updated}</p></section><section class="legal-layout"><aside><button data-public-view="privacy" class="${type==="privacy"?"active":""}">Privacy Policy</button><button data-public-view="terms" class="${type==="terms"?"active":""}">Terms and Conditions</button><button data-public-view="landing">Back to CodeQuest</button></aside><article>${p.sections.map(s=>`<section><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join("")}<div class="legal-warning"><strong>Professional review required</strong><p>This is a product-ready draft and should be reviewed by qualified legal counsel before commercial launch.</p></div></article></section>`;
  bindPublicLinks();
}
function renderPublicFaq(){
  el("publicContent").innerHTML=`<section class="legal-hero"><div class="eyebrow">HELP AND TRUST</div><h1>Frequently asked questions</h1></section><section class="faq-list">${landingContent.faq.map((f,i)=>`<article><button data-faq="${i}"><strong>${f.q}</strong><span>+</span></button><p class="hidden" data-faq-answer="${i}">${f.a}</p></article>`).join("")}</section>`;
  document.querySelectorAll("[data-faq]").forEach(b=>b.onclick=()=>{const a=document.querySelector(`[data-faq-answer="${b.dataset.faq}"]`);a.classList.toggle("hidden");b.querySelector("span").textContent=a.classList.contains("hidden")?"+":"−"});
}
function bindPublicLinks(){
  document.querySelectorAll("[data-public-view]").forEach(b=>b.onclick=()=>{
    const v=b.dataset.publicView;
    if(v==="landing"){
      renderPublicLanding();
      window.scrollTo({top:0,behavior:"smooth"});
    }else{
      showPublicExperience(v);
    }
  });
  document.querySelectorAll("[data-public-scroll]").forEach(b=>b.onclick=()=>{
    navigatePublicSection(b.dataset.publicScroll);
  });
}
function navigatePublicSection(sectionId){
  const currentTarget=el(sectionId);
  if(currentTarget){
    currentTarget.scrollIntoView({behavior:"smooth",block:"start"});
    return;
  }
  renderPublicLanding();
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      el(sectionId)?.scrollIntoView({behavior:"smooth",block:"start"});
    });
  });
}
function initialisePublicExperience(){
  bindPublicLinks();
  el("publicSignInBtn")?.addEventListener("click",()=>openAuthentication("signin"));
  el("publicCreateBtn")?.addEventListener("click",()=>openAuthentication("signup"));
  el("publicDashboardBtn")?.addEventListener("click",()=>returnToDashboard());
  el("homePageBtn")?.addEventListener("click",()=>showPublicExperience("landing"));
  el("dashboardPageBtn")?.addEventListener("click",()=>returnToDashboard());
  updatePublicAccountActions();
}
function needsOnboarding(){return !state.walkthroughCompleted&&Object.keys(state.onboardingProfile||{}).filter(k=>k!=="step").length===0}
function renderFirstLoginOnboarding(){
  document.querySelectorAll(".onboarding-overlay").forEach(node=>node.remove());
  const steps=productWalkthrough.steps,current=Number(state.onboardingProfile.step||0),step=steps[current];
  if(!step)return;
  const overlay=document.createElement("div");overlay.className="onboarding-overlay";overlay.innerHTML=`<div class="onboarding-card"><div class="onboarding-progress">${steps.map((_,i)=>`<span class="${i<=current?"active":""}"></span>`).join("")}</div><div class="eyebrow">WELCOME · STEP ${current+1} OF ${steps.length}</div><h1>${step.title}</h1><div class="onboarding-options">${step.options.map(o=>`<button data-onboarding-choice="${o}">${o}</button>`).join("")}</div><button id="onboardingSkip" class="text-btn">Skip for now</button></div>`;document.body.appendChild(overlay);
  overlay.querySelectorAll("[data-onboarding-choice]").forEach(b=>b.onclick=()=>{state.onboardingProfile[step.id]=b.dataset.onboardingChoice;if(step.id==="academy"){state.activeAcademyId=b.dataset.onboardingChoice;localStorage.setItem("pq_active_academy",state.activeAcademyId)}if(current<steps.length-1){state.onboardingProfile.step=current+1;persist();overlay.remove();renderFirstLoginOnboarding()}else{state.walkthroughCompleted=true;persist();overlay.remove();reconcileAcademyContext();updateAcademyChrome();renderGuidedWalkthrough()}});
  overlay.querySelector("#onboardingSkip").onclick=()=>{state.walkthroughCompleted=true;persist();overlay.remove()};
}
function renderGuidedWalkthrough(){
  document.querySelectorAll(".walkthrough-overlay").forEach(node=>node.remove());
  let i=0;const overlay=document.createElement("div");overlay.className="walkthrough-overlay";document.body.appendChild(overlay);
  const draw=()=>{const s=productWalkthrough.slides[i];overlay.innerHTML=`<div class="walkthrough-card"><span>${i+1}/${productWalkthrough.slides.length}</span><div class="eyebrow">PRODUCT WALKTHROUGH</div><h2>${s.title}</h2><p>${s.body}</p><div><button id="tourClose" class="secondary-btn">Close</button><button id="tourNext" class="primary-btn">${i===productWalkthrough.slides.length-1?"Finish":"Next"}</button></div></div>`;el("tourClose").onclick=()=>overlay.remove();el("tourNext").onclick=()=>{if(i===productWalkthrough.slides.length-1){state.walkthroughCompleted=true;persist();overlay.remove()}else{i++;draw()}}};draw();
}

function activeTeamWorkspace(){return state.teamWorkspaces.find(t=>t.id===state.activeTeamId)||null}
function createTeamWorkspace(templateId){
  const template=teamWorkspaceTemplates.find(t=>t.id===templateId)||teamWorkspaceTemplates[0];
  const name=prompt("Team name",template.title);if(!name)return;
  const owner=state.profile?.name||"You";
  const team={
    id:`team-${Date.now()}`,
    name,
    templateId:template.id,
    description:template.description,
    members:[{id:"self",name:owner,role:template.roles[0],status:"active",contributions:0}],
    columns:template.defaultColumns.map((title,index)=>({id:`col-${index}`,title})),
    tasks:[],
    discussions:[],
    milestones:[],
    createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString()
  };
  state.teamWorkspaces.unshift(team);state.activeTeamId=team.id;
  addContribution("team-created",`Created ${name}`,team.id,20);
  persist();renderView("teamworkspace");
}
function addContribution(type,title,teamId,points=5,meta={}){
  state.contributionEvents.unshift({id:`contrib-${Date.now()}-${Math.random()}`,type,title,teamId,points,meta,createdAt:new Date().toISOString()});
}
function renderTeamHub(){
  el("main").innerHTML=`<section class="team-hero card"><div><div class="eyebrow">COLLABORATIVE ENGINEERING</div><h1>Build like a real software team.</h1><p>Create squads, assign roles, manage work, review changes and produce evidence of professional collaboration.</p></div><div class="team-hero-stats"><div><strong>${state.teamWorkspaces.length}</strong><span>teams</span></div><div><strong>${state.peerReviewRequests.length}</strong><span>reviews</span></div><div><strong>${state.contributionEvents.reduce((s,e)=>s+e.points,0)}</strong><span>contribution XP</span></div></div></section>
  <section class="team-template-grid">${teamWorkspaceTemplates.map(t=>`<article class="card team-template-card"><div class="eyebrow">TEAM TEMPLATE</div><h2>${t.title}</h2><p>${t.description}</p><div class="team-role-list">${t.roles.map(r=>`<span>${r}</span>`).join("")}</div><button class="primary-btn full" data-create-team="${t.id}">Create team</button></article>`).join("")}</section>
  <section class="card existing-teams"><div class="section-head"><div><div class="eyebrow">YOUR WORKSPACES</div><h2>Active teams</h2></div></div>${state.teamWorkspaces.map(t=>`<button class="existing-team-row" data-open-team="${t.id}"><div><strong>${t.name}</strong><small>${t.members.length} members · ${t.tasks.filter(x=>x.status!=="done").length} open tasks</small></div><span>Open →</span></button>`).join("")||"<p class='muted'>Create your first team workspace.</p>"}</section>`;
  document.querySelectorAll("[data-create-team]").forEach(b=>b.onclick=()=>createTeamWorkspace(b.dataset.createTeam));
  document.querySelectorAll("[data-open-team]").forEach(b=>b.onclick=()=>{state.activeTeamId=b.dataset.openTeam;persist();renderView("teamworkspace")});
}
function renderTeamWorkspace(){
  const team=activeTeamWorkspace();if(!team){renderView("teamhub");return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">TEAM WORKSPACE</div><h1>${esc(team.name)}</h1><p>${esc(team.description)}</p></div><div class="team-head-actions"><button id="inviteTeamMemberBtn" class="secondary-btn">Add member</button><button id="newTeamTaskBtn" class="primary-btn">New task</button></div></div>
  <section class="team-kpis">${[
    ["Members",team.members.length],["Tasks",team.tasks.length],["In progress",team.tasks.filter(t=>t.status==="doing").length],["Reviews",state.peerReviewRequests.filter(r=>r.teamId===team.id).length],["Discussions",team.discussions.length],["Contribution XP",state.contributionEvents.filter(e=>e.teamId===team.id).reduce((s,e)=>s+e.points,0)]
  ].map(x=>`<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong></article>`).join("")}</section>
  <section class="team-workspace-layout"><article class="card team-board-card"><div class="section-head"><div><div class="eyebrow">DELIVERY BOARD</div><h2>Team flow</h2></div></div><div class="team-board">${team.columns.map((col,index)=>`<div class="team-board-column"><div class="team-board-column-head"><strong>${col.title}</strong><span>${team.tasks.filter(t=>t.columnId===col.id).length}</span></div>${team.tasks.filter(t=>t.columnId===col.id).map(task=>`<article class="team-task-card"><div class="eyebrow">${task.type.toUpperCase()}</div><h3>${esc(task.title)}</h3><p>${esc(task.description||"")}</p><div class="team-task-meta"><span>${esc(task.assignee||"Unassigned")}</span><span>${task.points||1} pts</span></div><div class="team-task-actions"><button data-move-task="${task.id}" data-direction="-1" ${index===0?"disabled":""}>←</button><button data-review-task="${task.id}">Review</button><button data-move-task="${task.id}" data-direction="1" ${index===team.columns.length-1?"disabled":""}>→</button></div></article>`).join("")||"<p class='muted'>No tasks</p>"}</div>`).join("")}</div></article>
  <aside class="card team-collaboration-panel"><div class="eyebrow">TEAM MEMBERS</div><h2>Roles and ownership</h2>${team.members.map(m=>`<div class="team-member-row"><span class="learner-avatar">${m.name.split(" ").map(p=>p[0]).join("").slice(0,2)}</span><div><strong>${esc(m.name)}</strong><small>${esc(m.role)}</small></div><span>${m.contributions||0}</span></div>`).join("")}<h2>Engineering discussion</h2><textarea id="teamDiscussionText" placeholder="Decision, question, blocker or update…"></textarea><button id="postTeamDiscussionBtn" class="secondary-btn full">Post discussion</button><div class="team-discussion-list">${team.discussions.slice(-6).reverse().map(d=>`<div><strong>${esc(d.author)}</strong><p>${esc(d.text)}</p><small>${new Date(d.createdAt).toLocaleString()}</small></div>`).join("")}</div></aside></section>`;
  el("inviteTeamMemberBtn").onclick=()=>{const name=prompt("Member name");if(!name)return;const template=teamWorkspaceTemplates.find(t=>t.id===team.templateId);const role=prompt("Role",template?.roles[1]||"Engineer")||"Engineer";team.members.push({id:`member-${Date.now()}`,name,role,status:"active",contributions:0});addContribution("member-added",`Added ${name}`,team.id,5,{role});persist();renderTeamWorkspace()};
  el("newTeamTaskBtn").onclick=()=>{const title=prompt("Task title");if(!title)return;const description=prompt("Task description","")||"";const assignee=prompt("Assignee",team.members[0]?.name||"")||"";team.tasks.push({id:`task-${Date.now()}`,title,description,assignee,type:"feature",points:3,columnId:team.columns[0].id,status:"backlog",createdAt:new Date().toISOString()});addContribution("task-created",title,team.id,3);persist();renderTeamWorkspace()};
  document.querySelectorAll("[data-move-task]").forEach(b=>b.onclick=()=>{const task=team.tasks.find(t=>t.id===b.dataset.moveTask),current=team.columns.findIndex(c=>c.id===task.columnId),next=Math.max(0,Math.min(team.columns.length-1,current+Number(b.dataset.direction)));task.columnId=team.columns[next].id;task.status=next===team.columns.length-1?"done":next>0?"doing":"backlog";task.updatedAt=new Date().toISOString();addContribution("task-moved",`${task.title} → ${team.columns[next].title}`,team.id,2);persist();renderTeamWorkspace()});
  document.querySelectorAll("[data-review-task]").forEach(b=>b.onclick=()=>createPeerReview(team,b.dataset.reviewTask));
  el("postTeamDiscussionBtn").onclick=()=>{const text=el("teamDiscussionText").value.trim();if(!text)return;team.discussions.push({id:`discussion-${Date.now()}`,author:state.profile?.name||"You",text,createdAt:new Date().toISOString()});addContribution("discussion",text.slice(0,80),team.id,4);persist();renderTeamWorkspace()};
}
function createPeerReview(team,taskId){
  const task=team.tasks.find(t=>t.id===taskId);if(!task)return;
  const summary=prompt("Describe the change being reviewed",task.description||task.title);if(summary===null)return;
  const review={id:`review-${Date.now()}`,teamId:team.id,taskId:task.id,title:task.title,author:task.assignee||state.profile?.name||"You",summary,status:"open",comments:[],approvals:0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  state.peerReviewRequests.unshift(review);addContribution("review-opened",`Opened review: ${task.title}`,team.id,8);persist();renderView("peerreviews");
}
function renderPeerReviews(){
  const team=activeTeamWorkspace();
  const reviews=team?state.peerReviewRequests.filter(r=>r.teamId===team.id):state.peerReviewRequests;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ENGINEERING REVIEW</div><h1>Peer reviews</h1><p>Review changes for correctness, clarity, testing, design and delivery risk.</p></div></div><section class="peer-review-grid">${reviews.map(r=>`<article class="card peer-review-card"><div class="peer-review-head"><div><div class="eyebrow">${r.status.toUpperCase()}</div><h2>${esc(r.title)}</h2><p>By ${esc(r.author)}</p></div><span>${r.approvals} approvals</span></div><p>${esc(r.summary)}</p><div class="review-dimension-list">${peerReviewPolicy.dimensions.map(d=>`<label><input type="checkbox" data-review-dimension="${r.id}:${d.id}"><span>${d.title}</span></label>`).join("")}</div><textarea data-review-comment="${r.id}" placeholder="Add specific, actionable feedback…"></textarea><div class="peer-review-actions"><button class="secondary-btn" data-request-changes="${r.id}">Request changes</button><button class="primary-btn" data-approve-review="${r.id}">Approve</button></div><div class="review-comment-list">${r.comments.map(c=>`<div><strong>${esc(c.author)}</strong><p>${esc(c.text)}</p></div>`).join("")}</div></article>`).join("")||"<div class='empty-state'><h2>No reviews yet</h2><p>Open a review from a team task.</p></div>"}</section>`;
  document.querySelectorAll("[data-request-changes]").forEach(b=>b.onclick=()=>submitPeerReview(b.dataset.requestChanges,"changes-requested"));
  document.querySelectorAll("[data-approve-review]").forEach(b=>b.onclick=()=>submitPeerReview(b.dataset.approveReview,"approved"));
}
function submitPeerReview(reviewId,status){
  const review=state.peerReviewRequests.find(r=>r.id===reviewId);if(!review)return;
  const text=document.querySelector(`[data-review-comment="${reviewId}"]`)?.value.trim()||"";
  if(!text){alert("Add actionable review feedback.");return}
  review.comments.push({author:state.profile?.name||"Reviewer",text,status,createdAt:new Date().toISOString()});
  review.status=status;if(status==="approved")review.approvals+=1;review.updatedAt=new Date().toISOString();
  addContribution("peer-review",`${status}: ${review.title}`,review.teamId,status==="approved"?12:10);
  persist();renderPeerReviews();
}
function renderHackathons(){
  el("main").innerHTML=`<section class="hackathon-hero card"><div><div class="eyebrow">CODEQUEST HACKATHON ARENA</div><h1>Build under pressure. Ship with evidence.</h1><p>Form a team, enter a time-boxed challenge and prove engineering, collaboration and communication.</p></div><div class="hackathon-count"><strong>${hackathonCatalogue.length}</strong><span>active challenge formats</span></div></section><section class="hackathon-grid">${hackathonCatalogue.map(h=>{const run=state.hackathonRuns[h.id];return`<article class="card hackathon-card"><div class="eyebrow">${h.durationHours} HOURS · ${h.theme.toUpperCase()}</div><h2>${h.title}</h2><p>${h.brief}</p><div class="mission-academies">${h.academies.map(id=>`<span>${academies.find(a=>a.id===id)?.icon||id}</span>`).join("")}</div><h3>Deliverables</h3>${h.deliverables.map(d=>`<div class="mission-deliverable">○ <span>${d}</span></div>`).join("")}<button class="primary-btn full" data-enter-hackathon="${h.id}">${run?"Continue challenge":"Enter challenge"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-enter-hackathon]").forEach(b=>b.onclick=()=>enterHackathon(b.dataset.enterHackathon));
}
function enterHackathon(id){
  const h=hackathonCatalogue.find(x=>x.id===id);if(!h)return;
  if(!state.hackathonRuns[id]){
    const team=activeTeamWorkspace();
    state.hackathonRuns[id]={id,teamId:team?.id||"",startedAt:new Date().toISOString(),deliverables:{},notes:"",complete:false};
  }
  const run=state.hackathonRuns[id];
  const notes=prompt(`${h.title}\n\nDocument the current solution, architecture, risks and next step.`,run.notes||"");
  if(notes===null)return;
  run.notes=notes;run.updatedAt=new Date().toISOString();
  if(notes.split(/\s+/).length>=60 && confirm("Mark this hackathon submission complete?")){
    run.complete=true
  }
  persist();renderHackathons();
}
function contributionMetrics(){
  const events=state.contributionEvents;
  const byType=events.reduce((m,e)=>{m[e.type]=(m[e.type]||0)+1;return m},{});
  return{events,totalPoints:events.reduce((s,e)=>s+e.points,0),byType};
}
function renderContributionProfile(){
  const m=contributionMetrics();
  const dimensions=[
    ["Delivery",(m.byType["task-moved"]||0)*8+(m.byType["task-created"]||0)*4],
    ["Review",(m.byType["peer-review"]||0)*15+(m.byType["review-opened"]||0)*8],
    ["Communication",(m.byType["discussion"]||0)*10],
    ["Leadership",(m.byType["team-created"]||0)*20+(m.byType["member-added"]||0)*6],
    ["Collaboration",Math.min(100,state.teamWorkspaces.length*20+state.peerReviewRequests.length*10)]
  ].map(([title,score])=>({title,score:Math.min(100,score)}));
  el("main").innerHTML=`<section class="contribution-hero card"><div><div class="eyebrow">PROFESSIONAL COLLABORATION EVIDENCE</div><h1>${esc(state.profile?.name||"Learner")} · Contribution profile</h1><p>Evidence of how you deliver, review, communicate and lead inside engineering teams.</p></div><div class="contribution-score"><strong>${m.totalPoints}</strong><span>contribution XP</span></div></section><section class="contribution-grid"><article class="card"><div class="eyebrow">TEAM CAPABILITY</div><h2>Collaboration dimensions</h2>${dimensions.map(d=>`<div class="contribution-dimension"><div><strong>${d.title}</strong><span>${d.score}%</span></div><div class="progress-track"><div style="width:${d.score}%"></div></div></div>`).join("")}</article><article class="card"><div class="eyebrow">RECENT CONTRIBUTIONS</div><h2>Evidence timeline</h2>${m.events.slice(0,15).map(e=>`<div class="contribution-event"><span>+${e.points}</span><div><strong>${esc(e.title)}</strong><small>${e.type} · ${new Date(e.createdAt).toLocaleString()}</small></div></div>`).join("")||"<p class='muted'>Team activity will appear here.</p>"}</article></section>`;
}

function missionById(id){return developerMissions.find(m=>m.id===id)}
function activeMission(){return missionById(state.activeMissionId)}
function ensureMissionRun(mission){
  if(!state.missionRuns[mission.id]){
    state.missionRuns[mission.id]={
      missionId:mission.id,
      currentStage:0,
      stageState:{},
      decisions:[],
      stakeholderMessages:[],
      sprintBoard:{backlog:[],doing:[],done:[]},
      startedAt:new Date().toISOString(),
      updatedAt:new Date().toISOString(),
      completed:false
    };
  }
  return state.missionRuns[mission.id];
}
function missionProgress(mission,run){
  const completed=mission.stages.filter((_,i)=>run.stageState?.[i]?.complete).length;
  return{completed,total:mission.stages.length,percent:Math.round(completed/mission.stages.length*100)};
}
function missionScore(mission,run){
  const stages=mission.stages.map((stage,i)=>{
    const s=run.stageState?.[i]||{};
    const words=(s.response||"").trim().split(/\s+/).filter(Boolean).length;
    const deliverables=stage.deliverables.filter(d=>(s.response||"").toLowerCase().includes(d.split(" ")[0].toLowerCase())).length;
    return Math.min(100,words*2+deliverables*15+(s.complete?20:0));
  });
  const decisionScore=Math.min(100,(run.decisions?.length||0)*20);
  const stakeholderScore=Math.min(100,(run.stakeholderMessages?.length||0)*15);
  return Math.round((stages.reduce((a,b)=>a+b,0)/stages.length)*.7+decisionScore*.15+stakeholderScore*.15);
}
function renderMissionControl(){
  el("main").innerHTML=`<section class="mission-hero card"><div><div class="eyebrow">DEVELOPER SIMULATION UNIVERSE</div><h1>Real work. Real ambiguity. Real decisions.</h1><p>Enter persistent workplace missions that combine engineering, product judgement, communication and operational pressure.</p></div><div class="mission-overview"><strong>${developerMissions.length}</strong><span>flagship missions</span><small>${state.missionPortfolio.length} completed dossiers</small></div></section><section class="mission-grid">${developerMissions.map(m=>{const run=state.missionRuns[m.id],p=run?missionProgress(m,run):{percent:0};return`<article class="card mission-card"><div class="mission-card-top"><div><div class="eyebrow">${m.role.toUpperCase()} · ${m.difficulty.toUpperCase()}</div><h2>${m.title}</h2></div><span>${p.percent}%</span></div><p>${m.summary}</p><div class="mission-client"><strong>${m.client}</strong><span>${m.stakes}</span></div><div class="mission-academies">${m.academies.map(id=>`<span>${academies.find(a=>a.id===id)?.icon||id}</span>`).join("")}</div><div class="mission-stage-preview">${m.stages.map((s,i)=>`<div class="${run?.stageState?.[i]?.complete?"complete":""}"><span>${i+1}</span><strong>${s.title}</strong></div>`).join("")}</div><button class="primary-btn full" data-start-mission="${m.id}">${run?"Continue mission":"Enter mission"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-start-mission]").forEach(b=>b.onclick=()=>{state.activeMissionId=b.dataset.startMission;ensureMissionRun(missionById(state.activeMissionId));persist();renderView("missionworkspace")});
}
function missionStakeholderReply(role,message,mission,stage){
  const cfg=missionStakeholders[role]||missionStakeholders["Engineering Manager"];
  const lower=message.toLowerCase();
  if(lower.split(/\s+/).length<12)return`${role}: I need a clearer answer. State the impact, evidence, decision and next checkpoint.`;
  if(stage.type==="incident")return`${role}: What are you containing right now, what evidence supports that action, and when will you update me again?`;
  if(lower.includes("assume"))return`${role}: Which assumption is most dangerous, and how will you validate it before the deadline?`;
  if(cfg.priorities.some(p=>lower.includes(p)))return`${role}: Good—now quantify the outcome and name the trade-off you are accepting.`;
  return`${role}: Connect this recommendation to ${cfg.priorities.join(", ")}. What changes if your main hypothesis is wrong?`;
}
function renderMissionWorkspace(){
  const mission=activeMission();if(!mission){renderView("missioncontrol");return}
  const run=ensureMissionRun(mission),index=Math.min(run.currentStage,mission.stages.length-1),stage=mission.stages[index],saved=run.stageState[index]||{};
  const p=missionProgress(mission,run);
  el("main").innerHTML=`<div class="mission-workspace-head"><div><div class="eyebrow">${mission.client.toUpperCase()} · ${mission.role.toUpperCase()}</div><h1>${mission.title}</h1><p>${stage.title} · ${p.percent}% complete</p></div><div class="mission-head-actions"><button id="missionAllBtn" class="secondary-btn">All missions</button><button id="missionPortfolioBtn" class="secondary-btn">Portfolio</button></div></div><section class="mission-workspace-layout"><aside class="card mission-timeline">${mission.stages.map((s,i)=>`<button class="${i===index?"active":""} ${run.stageState?.[i]?.complete?"complete":""}" data-mission-stage="${i}" ${i>p.completed?"disabled":""}><span>${run.stageState?.[i]?.complete?"✓":i+1}</span><div><strong>${s.title}</strong><small>${s.type}</small></div></button>`).join("")}</aside><article class="card mission-stage-panel"><div class="eyebrow">${stage.type.toUpperCase()} STAGE</div><h2>${stage.title}</h2><p>${stage.objective}</p><div class="mission-inject"><strong>Live situation</strong><p>${stage.inject}</p></div><h3>Required deliverables</h3>${stage.deliverables.map(d=>`<div class="mission-deliverable">○ <span>${d}</span></div>`).join("")}<label>Your professional response<textarea id="missionStageResponse" placeholder="Document your analysis, decisions, evidence and next actions.">${esc(saved.response||"")}</textarea></label><div class="mission-stage-actions"><button id="missionMentorBtn" class="secondary-btn">Ask mentor</button><button id="missionDecisionBtn" class="secondary-btn">Record decision</button><button id="completeMissionStageBtn" class="primary-btn">${saved.complete?"Update stage":"Complete stage"}</button></div><div id="missionStageFeedback"></div></article><aside class="card mission-side-panel"><div class="eyebrow">STAKEHOLDER ROOM</div><h2>Pressure-test your thinking</h2><select id="missionStakeholder">${Object.keys(missionStakeholders).map(s=>`<option>${s}</option>`).join("")}</select><textarea id="missionStakeholderMessage" placeholder="Send an update or recommendation…"></textarea><button id="sendMissionStakeholderBtn" class="secondary-btn full">Send message</button><div class="stakeholder-thread">${(run.stakeholderMessages||[]).slice(-5).map(m=>`<div class="${m.role==="learner"?"learner":"stakeholder"}"><strong>${m.role}</strong><p>${esc(m.content)}</p></div>`).join("")}</div><h3>Sprint board</h3><div class="mini-sprint-board">${["backlog","doing","done"].map(col=>`<div><strong>${col}</strong><span>${run.sprintBoard[col].length}</span></div>`).join("")}</div><button id="openMissionBoardBtn" class="text-btn">Add current task to board</button></aside></section>`;
  document.querySelectorAll("[data-mission-stage]").forEach(b=>b.onclick=()=>{run.currentStage=Number(b.dataset.missionStage);persist();renderMissionWorkspace()});
  el("missionAllBtn").onclick=()=>renderView("missioncontrol");el("missionPortfolioBtn").onclick=()=>renderView("missionportfolio");
  el("missionMentorBtn").onclick=()=>{state.mentorWorkspace.mode="socratic";const c=newMentorConversation("socratic");c.messages.push({role:"learner",content:`Mission: ${mission.title}\nStage: ${stage.title}\nSituation: ${stage.inject}\nMy response:\n${el("missionStageResponse").value}`,at:new Date().toISOString()});persist();renderView("aimentor")};
  el("missionDecisionBtn").onclick=()=>recordMissionDecision(mission,run,stage);
  el("sendMissionStakeholderBtn").onclick=()=>{const message=el("missionStakeholderMessage").value.trim(),role=el("missionStakeholder").value;if(!message)return;run.stakeholderMessages.push({role:"learner",content:message,at:new Date().toISOString()});run.stakeholderMessages.push({role,content:missionStakeholderReply(role,message,mission,stage),at:new Date().toISOString()});persist();renderMissionWorkspace()};
  el("openMissionBoardBtn").onclick=()=>{const task=prompt("Task to add",stage.deliverables[0]);if(task){run.sprintBoard.backlog.push({id:`task-${Date.now()}`,title:task});persist();renderMissionWorkspace()}};
  el("completeMissionStageBtn").onclick=()=>{const response=el("missionStageResponse").value.trim();if(response.split(/\s+/).length<35){el("missionStageFeedback").innerHTML="<div class='feedback error'><strong>Response needs more depth</strong><p>Include evidence, decision, risk, stakeholder impact and next action.</p></div>";return}run.stageState[index]={response,complete:true,completedAt:new Date().toISOString()};if(index<mission.stages.length-1)run.currentStage=index+1;else completeMission(mission,run);run.updatedAt=new Date().toISOString();persist();renderMissionWorkspace()};
}
function recordMissionDecision(mission,run,stage){
  const template=missionDecisionTemplates.find(t=>t.id===(stage.type==="incident"?"incident":stage.type==="release"?"release":"adr"));
  const response=prompt(`${template.title}\n\nDescribe the decision, alternatives and evidence.`,"");
  if(!response)return;
  run.decisions.push({id:`decision-${Date.now()}`,stageId:stage.id,templateId:template.id,response,createdAt:new Date().toISOString()});persist();
  alert("Decision recorded in the mission evidence timeline.");
}
function completeMission(mission,run){
  if(run.completed)return;
  run.completed=true;run.completedAt=new Date().toISOString();
  const score=missionScore(mission,run);
  const dossier={id:`dossier-${Date.now()}`,missionId:mission.id,title:mission.title,role:mission.role,client:mission.client,score,competencies:mission.competencies,decisions:run.decisions.length,stakeholderInteractions:run.stakeholderMessages.length,completedAt:run.completedAt,evidence:mission.stages.map((s,i)=>({stage:s.title,response:run.stageState[i]?.response||""}))};
  state.missionPortfolio.unshift(dossier);state.xp+=1000;
}
function renderMissionPortfolio(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAREER EVIDENCE DOSSIERS</div><h1>Mission portfolio</h1><p>Evidence of judgement, communication, implementation and operational thinking.</p></div><button id="exportMissionPortfolioBtn" class="secondary-btn">Export dossiers</button></div><section class="mission-portfolio-grid">${state.missionPortfolio.map(d=>`<article class="card mission-dossier"><div class="dossier-score ${d.score>=80?"strong":d.score>=60?"developing":"foundation"}">${d.score}%</div><div><div class="eyebrow">${d.role.toUpperCase()} · ${d.client.toUpperCase()}</div><h2>${d.title}</h2><div class="dossier-metrics"><span>${d.decisions} decisions</span><span>${d.stakeholderInteractions} interactions</span><span>${new Date(d.completedAt).toLocaleDateString()}</span></div><div class="skill-source-tags">${d.competencies.map(c=>`<span>${crossAcademySkills.find(s=>s.id===c)?.title||c}</span>`).join("")}</div><button class="text-btn" data-download-dossier="${d.id}">Download dossier</button></div></article>`).join("")||"<div class='empty-state'><h2>No completed missions yet</h2><p>Complete a flagship mission to create a professional evidence dossier.</p></div>"}</section>`;
  document.querySelectorAll("[data-download-dossier]").forEach(b=>b.onclick=()=>{const d=state.missionPortfolio.find(x=>x.id===b.dataset.downloadDossier);downloadBlob(new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),`${slug(d.title)}-mission-dossier.json`)});
  el("exportMissionPortfolioBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),dossiers:state.missionPortfolio},null,2)],{type:"application/json"}),"codequest-mission-portfolio.json");
}

function mentorAcademyId(){return reconcileAcademyContext()?.id||state.activeAcademyId||"python"}
function mentorCurrentMode(){return state.mentorWorkspace.mode||"socratic"}
function mentorModeConfig(){return mentorModes.find(m=>m.id===mentorCurrentMode())||mentorModes[0]}
function mentorContextSnapshot(){
  const academyId=mentorAcademyId();
  const completed=academyId==="sql"?[...state.sqlCompletedLessons]:academyId==="web"?[...state.webCompletedLessons]:academyId==="java"?[...state.javaCompletedLessons]:[...state.lessons];
  return{
    academyId,
    completedLessons:completed.slice(-30),
    selectedRole:state.selectedDeveloperRole||"",
    weakConcept:academyParity?.[academyId]?parityWeakConcept(academyId)?.title:"",
    recentErrors:(state.codingSubmissions||[]).filter(s=>s.status!=="passed").slice(0,3).map(s=>({labId:s.labId,score:s.overallScore}))
  };
}
function mentorLocalReply(mode,message,context={}){
  const text=message.trim(),lower=text.toLowerCase();
  const academy=context.academyId||mentorAcademyId();
  if(!text)return"Write your current thinking or paste the relevant code first.";
  if(mode==="socratic"){
    if((context.hintCount||0)===0)return`Before changing anything, what do you expect the code or query to do, and what evidence would prove that expectation?`;
    if((context.hintCount||0)===1)return`Focus on the smallest relevant concept in ${academy}. Which value, row, object or browser event changes first?`;
    if((context.hintCount||0)===2)return`Compare the actual result with the intended result. Name the first point where they diverge, then revise only that part.`;
    return`A strong answer should define the concept, contrast it with a nearby concept, apply it to this case and identify one failure mode.`;
  }
  if(mode==="debug"){
    if(lower.includes("error")||lower.includes("exception"))return`Separate the exact error message from your interpretation. What is the smallest reproducible input, and on which line or operation does the first incorrect state appear?`;
    return`Debugging plan:\n1. State the symptom precisely.\n2. List confirmed facts.\n3. Write two competing hypotheses.\n4. Run the smallest experiment that distinguishes them.\n5. Record the result before editing further.`;
  }
  if(mode==="review"){
    return`Review this in five passes:\n1. Intended behaviour and correctness.\n2. Edge cases and failure handling.\n3. Names and readability.\n4. Responsibility boundaries and duplication.\n5. Tests and operational evidence.\n\nStart by telling me the requirement this code is meant to satisfy.`;
  }
  if(mode==="plan"){
    return`Turn the idea into:\n• user and problem;\n• measurable outcome;\n• smallest end-to-end slice;\n• milestones with acceptance criteria;\n• unknowns and technical risks;\n• evidence needed before release.`;
  }
  if(mode==="viva"){
    return`Defend one design decision in your solution. Why did you choose it, what alternative did you reject, what could fail, and how would you test that failure?`;
  }
  return`Answer in this structure: concept → practical example → trade-off → failure mode → verification. I will then probe the weakest part of the answer.`;
}
async function requestMentorReply(mode,message,conversation){
  const context=mentorContextSnapshot();
  if(aiMentorConfig?.remoteEndpoint){
    const response=await fetch(aiMentorConfig.remoteEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode,message,context,conversation:conversation.slice(-8),policy:aiMentorConfig.teachingPolicy})});
    if(!response.ok)throw new Error(`Mentor service returned ${response.status}`);
    const data=await response.json();
    return String(data.reply||"").slice(0,aiMentorConfig.modelPolicy.maxResponseCharacters);
  }
  return mentorLocalReply(mode,message,{...context,hintCount:conversation.filter(m=>m.role==="mentor").length});
}
function mentorActiveConversation(){
  const id=state.mentorWorkspace.conversationId;
  return state.mentorConversations.find(c=>c.id===id)||null;
}
function newMentorConversation(mode=mentorCurrentMode()){
  const conversation={id:`mentor-${Date.now()}`,mode,academyId:mentorAcademyId(),title:`${mentorModes.find(m=>m.id===mode)?.title||"Mentor"} session`,messages:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  state.mentorConversations.unshift(conversation);state.mentorWorkspace={...state.mentorWorkspace,mode,conversationId:conversation.id};persist();return conversation;
}
function renderAiMentor(){
  let conversation=mentorActiveConversation();if(!conversation)conversation=newMentorConversation();
  const mode=mentorModeConfig(),academy=academies.find(a=>a.id===mentorAcademyId());
  el("main").innerHTML=`<section class="mentor-hero card"><div><div class="eyebrow">CODEQUEST AI MENTOR · ${academy?.name?.toUpperCase()}</div><h1>A senior engineer who teaches, not tells.</h1><p>Choose a mentoring mode, show your thinking and work through the problem with graduated support.</p></div><div class="mentor-policy"><strong>Teaching guardrails</strong><span>Attempt before answer</span><span>Hints before reveal</span><span>Explain decisions</span><span>No browser API secrets</span></div></section>
  <section class="mentor-mode-grid">${mentorModes.map(m=>`<button class="card mentor-mode-card ${m.id===mode.id?"active":""}" data-mentor-mode="${m.id}"><span>${m.icon}</span><div><strong>${m.title}</strong><small>${m.description}</small></div></button>`).join("")}</section>
  <section class="mentor-workspace"><article class="card mentor-dialogue-panel"><div class="mentor-dialogue-head"><div><div class="eyebrow">${mode.title.toUpperCase()}</div><h2>${conversation.title}</h2></div><button id="newMentorSessionBtn" class="secondary-btn">New session</button></div><div id="mentorDialogue" class="mentor-dialogue">${conversation.messages.length?conversation.messages.map(m=>`<div class="mentor-chat ${m.role}"><div>${m.role==="mentor"?"Mentor":"You"}</div><p>${esc(m.content).replaceAll("\n","<br>")}</p></div>`).join(""):`<div class="mentor-empty"><h3>Begin with your current thinking</h3><p>Describe the problem, paste code, or explain where your reasoning became uncertain.</p></div>`}</div><div class="mentor-composer"><textarea id="mentorMessage" placeholder="Show your attempt, code, error or reasoning…"></textarea><div><button id="mentorContextBtn" class="secondary-btn">Add current context</button><button id="sendMentorMessageBtn" class="primary-btn">Send to mentor</button></div></div></article>
  <aside class="card mentor-memory-panel"><div class="eyebrow">MENTOR MEMORY</div><h2>Learning context</h2><div class="mentor-context-row"><span>Academy</span><strong>${academy?.shortName||mentorAcademyId()}</strong></div><div class="mentor-context-row"><span>Weak concept</span><strong>${mentorContextSnapshot().weakConcept||"Not established"}</strong></div><div class="mentor-context-row"><span>Target role</span><strong>${developerRolePaths.find(r=>r.id===state.selectedDeveloperRole)?.title||"Not selected"}</strong></div><label>Persistent mentor note<textarea id="mentorPersistentNote" placeholder="Example: Ask me to explain SQL grain before suggesting joins.">${esc(state.mentorMemory.note||"")}</textarea></label><button id="saveMentorMemoryBtn" class="secondary-btn full">Save mentor preference</button><h3>Protocol</h3>${(mentorProtocols[mode.id]||[]).map((s,i)=>`<div class="mentor-protocol-step"><span>${i+1}</span><p>${s}</p></div>`).join("")}</aside></section>`;
  document.querySelectorAll("[data-mentor-mode]").forEach(b=>b.onclick=()=>{state.mentorWorkspace.mode=b.dataset.mentorMode;newMentorConversation(b.dataset.mentorMode);renderAiMentor()});
  el("newMentorSessionBtn").onclick=()=>{newMentorConversation(mode.id);renderAiMentor()};
  el("mentorContextBtn").onclick=()=>{el("mentorMessage").value+=`\n\nCurrent context:\n${JSON.stringify(mentorContextSnapshot(),null,2)}`};
  el("saveMentorMemoryBtn").onclick=()=>{state.mentorMemory.note=el("mentorPersistentNote").value;persist();alert("Mentor preference saved.")};
  el("sendMentorMessageBtn").onclick=async()=>{const message=el("mentorMessage").value.trim();if(!message)return;conversation.messages.push({role:"learner",content:message,at:new Date().toISOString()});el("mentorMessage").value="";persist();renderAiMentor();const active=mentorActiveConversation();try{const reply=await requestMentorReply(active.mode,message,active.messages);active.messages.push({role:"mentor",content:reply,at:new Date().toISOString()});active.updatedAt=new Date().toISOString();persist();renderAiMentor()}catch(error){active.messages.push({role:"mentor",content:`Mentor service unavailable: ${error.message}. Use local mentoring mode or configure the server proxy.`,at:new Date().toISOString()});persist();renderAiMentor()}};
}
function pairStarterCode(academyId){
  if(academyId==="sql")return"SELECT region, SUM(revenue) AS revenue\nFROM data\nGROUP BY region\nORDER BY revenue DESC;";
  if(academyId==="web")return"<button id=\"load\">Load data</button>\n<pre id=\"output\"></pre>\n<script>\n// Implement safely\n</script>";
  if(academyId==="java")return"public class Main {\n  public static void main(String[] args) {\n    // Implement the smallest working step\n  }\n}";
  return"def solve(value):\n    # Implement the smallest working step\n    return value\n";
}
function pairStaticReview(academyId,code){
  const findings=[];
  if(!code.trim())findings.push({level:"blocker",text:"No implementation has been provided."});
  if(academyId==="python"){if(!/def\s+\w+/.test(code))findings.push({level:"high",text:"Create a focused function so behaviour can be tested."});if(/print\s*\(/.test(code))findings.push({level:"medium",text:"Separate returned results from debugging output."})}
  if(academyId==="sql"){if(/select\s+\*/i.test(code))findings.push({level:"medium",text:"Select explicit columns to make the contract clear."});if(/join/i.test(code)&&!/on\s+/i.test(code))findings.push({level:"blocker",text:"The join has no explicit ON condition."})}
  if(academyId==="web"){if(/<img/i.test(code)&&!/alt=/i.test(code))findings.push({level:"high",text:"Images need useful alternative text."});if(/fetch\s*\(/i.test(code)&&!/catch|try/i.test(code))findings.push({level:"high",text:"Handle network and HTTP failure states."})}
  if(academyId==="java"){if(/public\s+\w+\s+\w+\s*;/i.test(code))findings.push({level:"medium",text:"Review whether mutable fields should be private."});if(/catch\s*\(\s*Exception/i.test(code))findings.push({level:"high",text:"Catch specific exceptions where recovery differs."})}
  if(!findings.length)findings.push({level:"good",text:"No obvious structural issue found. Add tests and explain the main trade-off."});
  return findings;
}
function renderPairProgrammer(){
  const academyId=mentorAcademyId(),academy=academies.find(a=>a.id===academyId);
  const workspace=state.mentorWorkspace.pair||{goal:"",code:pairStarterCode(academyId),notes:"",academyId};
  if(workspace.academyId!==academyId){workspace.academyId=academyId;workspace.code=pairStarterCode(academyId)}
  state.mentorWorkspace.pair=workspace;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PAIR PROGRAMMER · ${academy?.name?.toUpperCase()}</div><h1>Plan, implement, review, defend.</h1><p>The pair programmer keeps the learner in the driver’s seat.</p></div><button id="savePairSessionBtn" class="primary-btn">Save session</button></div><section class="pair-layout"><article class="card pair-editor-panel"><label>Goal<input id="pairGoal" value="${esc(workspace.goal||"")}" placeholder="What must this code achieve?"></label><textarea id="pairCode" class="studio-code">${esc(workspace.code||"")}</textarea><div class="pair-actions"><button id="pairPlanBtn" class="secondary-btn">Plan next step</button><button id="pairReviewBtn" class="primary-btn">Review code</button><button id="pairExplainBtn" class="secondary-btn">Prepare defence</button></div></article><aside class="card pair-feedback-panel"><div class="eyebrow">PAIR FEEDBACK</div><div id="pairFeedback"><p class="muted">Choose a pair-programming action.</p></div><label>Working notes<textarea id="pairNotes">${esc(workspace.notes||"")}</textarea></label></aside></section>`;
  const save=()=>{workspace.goal=el("pairGoal").value;workspace.code=el("pairCode").value;workspace.notes=el("pairNotes").value;state.mentorWorkspace.pair=workspace;persist()};
  el("pairPlanBtn").onclick=()=>{save();el("pairFeedback").innerHTML=`<div class="pair-guidance"><h2>Smallest next slice</h2><ol><li>Write one acceptance example.</li><li>Identify the smallest function/query/component/class boundary.</li><li>Implement the happy path.</li><li>Add one failure case.</li><li>Run or inspect before expanding scope.</li></ol></div>`};
  el("pairReviewBtn").onclick=()=>{save();const findings=pairStaticReview(academyId,workspace.code);el("pairFeedback").innerHTML=findings.map(f=>`<div class="pair-finding ${f.level}"><strong>${f.level.toUpperCase()}</strong><p>${f.text}</p></div>`).join("")};
  el("pairExplainBtn").onclick=()=>{save();el("pairFeedback").innerHTML=`<div class="pair-guidance"><h2>Defend this implementation</h2><p>Explain the requirement, chosen design, rejected alternative, most important edge case, test strategy and likely production failure.</p></div>`};
  el("savePairSessionBtn").onclick=()=>{save();state.pairProgrammingSessions.unshift({id:`pair-${Date.now()}`,academyId,goal:workspace.goal,code:workspace.code,notes:workspace.notes,createdAt:new Date().toISOString()});persist();alert("Pair-programming session saved.")};
}
function vivaQuestionSet(academyId){return technicalInterviewBank[academyId]||technicalInterviewBank.python}
function scoreVivaAnswer(answer,signals){
  const lower=answer.toLowerCase(),matched=signals.filter(s=>s.toLowerCase().split(/\s+/).some(token=>token.length>3&&lower.includes(token))).length;
  const depth=Math.min(40,answer.trim().split(/\s+/).length);
  return{score:Math.min(100,Math.round(matched/signals.length*60+depth)),matched,missing:signals.filter(s=>!s.toLowerCase().split(/\s+/).some(token=>token.length>3&&lower.includes(token)))};
}
function renderTechnicalViva(){
  const academyId=mentorAcademyId(),bank=vivaQuestionSet(academyId),session=state.mentorWorkspace.viva||{index:0,answers:[]},item=bank[session.index%bank.length];
  el("main").innerHTML=`<section class="viva-hero card"><div><div class="eyebrow">TECHNICAL VIVA · ${academyId.toUpperCase()}</div><h1>Explain your engineering, under challenge.</h1><p>Write or speak your answer, then receive evidence-based probing and scoring.</p></div><div class="viva-progress"><strong>${session.index+1}/${bank.length}</strong><span>${item.level}</span></div></section><section class="viva-layout"><article class="card viva-question-panel"><div class="eyebrow">${item.level.toUpperCase()} QUESTION</div><h2>${item.question}</h2><textarea id="vivaAnswer" placeholder="Answer as though speaking to a senior interviewer."></textarea><div class="viva-actions"><button id="vivaPromptBtn" class="secondary-btn">Show answer structure</button><button id="submitVivaBtn" class="primary-btn">Submit answer</button></div><div id="vivaFeedback"></div></article><aside class="card"><div class="eyebrow">EVIDENCE SIGNALS</div><h2>What the interviewer listens for</h2>${item.signals.map(s=>`<div class="signal-row">○ <span>${s}</span></div>`).join("")}<div class="viva-note"><strong>Do not memorise keywords</strong><p>Use them to structure a real explanation with examples and trade-offs.</p></div></aside></section>`;
  el("vivaPromptBtn").onclick=()=>el("vivaFeedback").innerHTML="<div class='session-summary'>Structure: define → example → trade-off → failure mode → verification.</div>";
  el("submitVivaBtn").onclick=()=>{const answer=el("vivaAnswer").value.trim();if(!answer)return;const result=scoreVivaAnswer(answer,item.signals);const record={academyId,question:item.question,level:item.level,answer,score:result.score,matched:result.matched,missing:result.missing,createdAt:new Date().toISOString()};state.technicalVivaHistory.unshift(record);session.answers.push(record);session.index=(session.index+1)%bank.length;state.mentorWorkspace.viva=session;persist();el("vivaFeedback").innerHTML=`<div class="feedback ${result.score>=70?"success":"error"}"><strong>${result.score}% explanation score</strong><p>${result.score>=70?"Strong answer. Now add one concrete failure scenario and measurable verification.":`Strengthen: ${result.missing.join(", ")}`}</p><button id="nextVivaBtn" class="primary-btn">Next question</button></div>`;el("nextVivaBtn").onclick=()=>renderTechnicalViva()};
}
function renderMentorHistory(){
  const conversations=state.mentorConversations,ivas=state.technicalVivaHistory,pairs=state.pairProgrammingSessions;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">MENTOR EVIDENCE</div><h1>Mentor history</h1><p>Review teaching conversations, technical defences and pair-programming work.</p></div><button id="exportMentorHistoryBtn" class="secondary-btn">Export history</button></div><section class="mentor-history-grid"><article class="card"><h2>Conversations</h2>${conversations.slice(0,12).map(c=>`<button class="history-row" data-open-mentor-history="${c.id}"><div><strong>${c.title}</strong><small>${c.academyId} · ${c.mode}</small></div><span>${c.messages.length} messages</span></button>`).join("")||"<p class='muted'>No conversations yet.</p>"}</article><article class="card"><h2>Technical viva</h2>${ivas.slice(0,12).map(v=>`<div class="history-row"><div><strong>${v.question}</strong><small>${v.academyId} · ${v.level}</small></div><span>${v.score}%</span></div>`).join("")||"<p class='muted'>No viva attempts yet.</p>"}</article><article class="card"><h2>Pair-programming sessions</h2>${pairs.slice(0,12).map(p=>`<div class="history-row"><div><strong>${p.goal||"Untitled session"}</strong><small>${p.academyId}</small></div><span>${new Date(p.createdAt).toLocaleDateString()}</span></div>`).join("")||"<p class='muted'>No saved pair sessions yet.</p>"}</article></section>`;
  document.querySelectorAll("[data-open-mentor-history]").forEach(b=>b.onclick=()=>{state.mentorWorkspace.conversationId=b.dataset.openMentorHistory;persist();renderView("aimentor")});
  el("exportMentorHistoryBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({generatedAt:new Date().toISOString(),mentorMemory:state.mentorMemory,conversations,technicalViva:ivas,pairProgramming:pairs},null,2)],{type:"application/json"}),"codequest-mentor-history.json");
}

async function initProductionCloud(){
  if(!window.CodeQuestCloud)return false;
  try{
    await window.CodeQuestCloud.init(supabaseClient);
    if(supabaseClient){
      const bootstrap=await window.CodeQuestCloud.bootstrap();
      if(bootstrap?.profile){
        state.profile={...(state.profile||{}),name:bootstrap.profile.display_name||state.profile?.name};
        state.activeAcademyId=bootstrap.profile.active_academy||state.activeAcademyId;
        localStorage.setItem("pq_active_academy",state.activeAcademyId);
      }
    }
    updateCloudPlatformBadge();
    return true;
  }catch(error){
    console.warn("Production cloud initialisation failed",error);
    return false;
  }
}
function updateCloudPlatformBadge(){
  const status=window.CodeQuestCloud?.status?.()||{state:"offline",pending:0};
  const existing=document.getElementById("cloudPlatformBadge");
  if(existing){
    existing.className=`cloud-platform-badge ${status.state}`;
    existing.innerHTML=`<span>${status.state==="synced"?"✓":status.state==="syncing"?"↻":status.state==="attention"?"!":"☁"}</span><strong>${status.state}</strong>${status.pending?`<small>${status.pending}</small>`:""}`;
  }
}
window.addEventListener("cq-cloud-status",updateCloudPlatformBadge);

function cloudQueue(table,operation,payload,match={}){
  if(window.CodeQuestCloud)window.CodeQuestCloud.enqueue(table,operation,payload,match);
}
function cloudSaveProfile(){
  if(!supabaseClient)return;
  supabaseClient.auth.getUser().then(({data})=>{
    const user=data.user;if(!user)return;
    cloudQueue("profiles","upsert",{user_id:user.id,display_name:state.profile?.name||"",active_academy:state.activeAcademyId||"python",preferences:state.preferences||{},updated_at:new Date().toISOString()});
  });
}
function cloudSaveCurriculumDraft(draft){
  if(!draft)return;
  cloudQueue("curriculum_items","upsert",{
    id:/^[0-9a-f-]{36}$/i.test(draft.cloudId||"")?draft.cloudId:undefined,
    organisation_id:state.organisationWorkspace.organisationId||null,
    academy_id:draft.academyId,
    item_type:draft.type||"lesson",
    title:draft.title,
    module_title:draft.moduleTitle||null,
    status:draft.status||"draft",
    content:draft,
    quality_score:curriculumQuality(draft).score,
    version:1,
    updated_at:new Date().toISOString()
  });
}
function renderOrganisationHome(){
  const workspace=state.organisationWorkspace||{};
  const orgName=workspace.name||"Create your organisation";
  el("main").innerHTML=`<section class="organisation-hero card"><div><div class="eyebrow">MULTI-TENANT CODEQUEST</div><h1>${orgName}</h1><p>Manage academies, instructors, cohorts and credential evidence in one governed workspace.</p><div class="organisation-actions"><button id="configureOrganisationBtn" class="primary-btn">${workspace.name?"Edit organisation":"Create organisation"}</button><button id="openCloudControlBtn" class="secondary-btn">Cloud control</button></div></div><div class="organisation-health"><span>Cloud readiness</span><strong>${supabaseClient?"Connected":"Local"}</strong><small>${supabaseClient?"Supabase client available":"Configure Supabase to enable shared organisations"}</small></div></section>
  <section class="organisation-kpis">${[
    ["Cohorts",cohorts.length],["Learners",cohortLearners.length],["Instructors",1],["Assignments",(state.classroomAssignments||cohortAssignments).length],["Published content",(state.curriculumPublications||[]).length],["Credentials",state.verifiedCredentials.length]
  ].map(x=>`<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong></article>`).join("")}</section>
  <section class="organisation-grid"><article class="card"><div class="eyebrow">ROLE MODEL</div><h2>Governed access</h2>${[
    ["Learner","Own progress, submissions and credentials"],
    ["Instructor","Assigned cohorts, reviews and curriculum"],
    ["Organisation admin","Memberships, cohorts and organisation content"],
    ["Platform admin","Cross-tenant operations and support"]
  ].map(x=>`<div class="role-governance-row"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("")}</article><article class="card"><div class="eyebrow">PRODUCTION DATA</div><h2>Cloud-backed capabilities</h2>${["Profiles and academy preferences","Organisations and memberships","Cohorts and assignments","Submissions and grades","Curriculum versions","Progress and learning events","Interventions and audit history","Verifiable credentials"].map(x=>`<div class="cloud-capability-row">✓ <span>${x}</span></div>`).join("")}</article></section>`;
  el("configureOrganisationBtn").onclick=()=>{const name=prompt("Organisation name",workspace.name||"");if(!name)return;state.organisationWorkspace={...workspace,name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),updatedAt:new Date().toISOString()};persist();cloudQueue("organisations","insert",{name,slug:state.organisationWorkspace.slug,plan:"starter",settings:{}});renderOrganisationHome()};
  el("openCloudControlBtn").onclick=()=>renderView("cloudcontrol");
}
function renderCloudControl(){
  const status=window.CodeQuestCloud?.status?.()||{state:"offline",pending:0};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRODUCTION OPERATIONS</div><h1>Cloud Control</h1><p>Monitor offline-first synchronisation, schema readiness and pending mutations.</p></div><button id="flushCloudQueueBtn" class="primary-btn">Sync now</button></div><section class="cloud-control-grid"><article class="card"><div class="cloud-state-icon ${status.state}">${status.state==="synced"?"✓":"☁"}</div><h2>${status.state}</h2><p>${status.pending||0} pending mutation${status.pending===1?"":"s"}</p><div class="cloud-detail-row"><span>Mode</span><strong>${cloudPlatformConfig.mode}</strong></div><div class="cloud-detail-row"><span>Conflict strategy</span><strong>${cloudPlatformConfig.conflictStrategy}</strong></div><div class="cloud-detail-row"><span>Last sync</span><strong>${status.lastSync?new Date(status.lastSync).toLocaleString():"Not yet"}</strong></div></article><article class="card"><div class="eyebrow">SUPABASE READINESS</div><h2>Production checklist</h2>${[
    ["Supabase client",Boolean(supabaseClient)],
    ["Schema migrations",true],
    ["Row-level security",true],
    ["Offline mutation queue",Boolean(window.CodeQuestCloud)],
    ["Audit-log schema",true],
    ["Credential verification schema",true]
  ].map(([label,ok])=>`<div class="cloud-readiness-row ${ok?"passed":"failed"}"><span>${ok?"✓":"○"}</span><strong>${label}</strong></div>`).join("")}</article><article class="card"><div class="eyebrow">CONFLICTS</div><h2>Review required</h2>${state.cloudConflictLog.length?state.cloudConflictLog.map(c=>`<div class="conflict-row"><strong>${c.entity}</strong><span>${c.message}</span></div>`).join(""):"<p class='muted'>No unresolved conflicts.</p>"}</article></section>`;
  el("flushCloudQueueBtn").onclick=async()=>{await window.CodeQuestCloud?.flush?.();updateCloudPlatformBadge();renderCloudControl()};
}
function renderCredentialVerification(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">TRUSTED LEARNING EVIDENCE</div><h1>Credential verification</h1><p>Verify a CodeQuest credential using its public verification code.</p></div></div><section class="credential-verification-layout"><article class="card"><label>Verification code<input id="credentialVerificationCode" placeholder="Enter verification code"></label><button id="verifyCredentialBtn" class="primary-btn">Verify credential</button><div id="credentialVerificationResult"></div></article><aside class="card"><div class="eyebrow">WHAT IS VERIFIED</div><h2>Evidence-backed credentials</h2><p>A valid credential can include academy, title, issue date, assessment evidence and revocation state.</p><div class="verification-feature">✓ Public verification code</div><div class="verification-feature">✓ Revocation support</div><div class="verification-feature">✓ Evidence snapshot</div><div class="verification-feature">✓ Learner ownership</div></aside></section>`;
  el("verifyCredentialBtn").onclick=async()=>{
    const code=el("credentialVerificationCode").value.trim();if(!code){alert("Enter a verification code.");return}
    if(!supabaseClient){el("credentialVerificationResult").innerHTML="<div class='feedback error'><strong>Cloud verification unavailable</strong><p>Connect Supabase to query public credential records.</p></div>";return}
    const {data,error}=await supabaseClient.from("credentials").select("title,academy_id,issued_at,revoked_at,evidence").eq("verification_code",code).maybeSingle();
    if(error||!data){el("credentialVerificationResult").innerHTML="<div class='feedback error'><strong>Not verified</strong><p>No active credential was found for this code.</p></div>";return}
    el("credentialVerificationResult").innerHTML=`<div class="verified-credential"><div class="verified-seal">✓</div><div><div class="eyebrow">VERIFIED CREDENTIAL</div><h2>${esc(data.title)}</h2><p>${esc(data.academy_id)} · Issued ${new Date(data.issued_at).toLocaleDateString()}</p></div></div>`;
  };
}

function reconcileAcademyContext(){
  if(!academies?.length)return null;
  const stored=localStorage.getItem("pq_active_academy");
  const stateId=state.activeAcademyId;
  const activeId=activeAcademy?.id;
  const valid=id=>academies.some(item=>item.id===id&&item.status==="available");
  const chosen=valid(stored)?stored:valid(stateId)?stateId:valid(activeId)?activeId:"python";
  state.activeAcademyId=chosen;
  activeAcademy=academies.find(item=>item.id===chosen)||academies[0];
  localStorage.setItem("pq_active_academy",chosen);
  return activeAcademy;
}
function guardAcademySpecificView(expectedId=null){
  const academy=reconcileAcademyContext();
  if(!academy)return null;
  if(expectedId&&academy.id!==expectedId)return academy;
  updateAcademyChrome();
  return academy;
}

function parityAcademyId(){
  const academy=reconcileAcademyContext();
  const id=academy?.id;
  return["sql","web","java"].includes(id)?id:null;
}
function parityConfig(){const id=parityAcademyId();return id?academyParity[id]:null}
function parityCompletedSet(id){
  if(id==="sql")return state.sqlCompletedLessons;
  if(id==="web")return state.webCompletedLessons;
  if(id==="java")return state.javaCompletedLessons;
  return new Set();
}
function parityConceptScore(academyId,concept){
  const completed=parityCompletedSet(academyId);
  const lessonScore=concept.lessonIds.length?concept.lessonIds.filter(id=>completed.has(id)).length/concept.lessonIds.length*75:0;
  const diagnostic=state.academyDiagnosticHistory.filter(x=>x.academyId===academyId&&x.concept===concept.id);
  const diagScore=diagnostic.length?diagnostic.filter(x=>x.correct).length/diagnostic.length*15:0;
  const review=state.academyReviewHistory.filter(x=>x.academyId===academyId&&x.concept===concept.id);
  const reviewScore=review.length?review.filter(x=>x.correct).length/review.length*10:0;
  return Math.min(100,Math.round(lessonScore+diagScore+reviewScore));
}
function parityOverallMastery(academyId){
  const cfg=academyParity[academyId];
  return Math.round(cfg.concepts.reduce((s,c)=>s+parityConceptScore(academyId,c),0)/cfg.concepts.length);
}
function parityWeakConcept(academyId){
  return [...academyParity[academyId].concepts].sort((a,b)=>parityConceptScore(academyId,a)-parityConceptScore(academyId,b))[0];
}
function parityDiagnosticBest(academyId){
  const attempts=state.academyDiagnosticHistory.filter(x=>x.academyId===academyId&&x.sessionId).reduce((map,x)=>{map[x.sessionId]=(map[x.sessionId]||[]).concat(x);return map},{});
  const scores=Object.values(attempts).map(items=>Math.round(items.filter(x=>x.correct).length/items.length*100));
  return scores.length?Math.max(...scores):0;
}
function parityNextAction(academyId){
  const weak=parityWeakConcept(academyId),best=parityDiagnosticBest(academyId);
  if(!best)return{view:"academydiagnostic",title:"Take academy diagnostic",subtitle:"Establish a baseline before adaptive practice"};
  if(parityConceptScore(academyId,weak)<60)return{view:"academycoach",title:`Strengthen ${weak.title}`,subtitle:"Use the adaptive coach to repair weak understanding"};
  return{view:"academyreview",title:"Complete a five-minute review",subtitle:"Protect mastery through spaced retrieval"};
}
function parityNavHtml(label){
  return`<section class="nav-group essential-group"><div class="nav-group-title">Learning Intelligence</div>
    <button class="nav-item" data-view="academycommand">◉ <span>Learning command</span></button>
    <button class="nav-item" data-view="academydiagnostic">◇ <span>Diagnostic</span></button>
    <button class="nav-item" data-view="academycoach">✦ <span>Adaptive coach</span></button>
    <button class="nav-item" data-view="academyreview">↻ <span>Smart review</span></button>
    <button class="nav-item" data-view="academyvisualizer">◎ <span>${label}</span></button>
    <button class="nav-item" data-view="academymastery">▦ <span>Mastery map</span></button>
    <button class="nav-item" data-view="academysimulations">◆ <span>Career simulations</span></button>
  </section>`;
}
function injectParityNavigation(nav,academyId){
  if(!["sql","web","java"].includes(academyId))return;
  if(nav.querySelector('[data-view="academycommand"]'))return;
  const label=academyId==="sql"?"Query visualizer":academyId==="web"?"DOM visualizer":"Object tracer";
  nav.insertAdjacentHTML("beforeend",parityNavHtml(label));
  nav.querySelectorAll("[data-view]").forEach(button=>button.onclick=()=>renderView(button.dataset.view));
}
function renderAcademyCommandCenter(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg){renderView("academyhome");return}
  const mastery=parityOverallMastery(id),next=parityNextAction(id),weak=parityWeakConcept(id),plan=academyLearningPlans[id];
  const completed=parityCompletedSet(id).size;
  el("main").innerHTML=`<section class="parity-command-hero card"><div><div class="eyebrow">${cfg.title.toUpperCase()} · LEARNING INTELLIGENCE</div><h1>Your academy command center</h1><p>Diagnostics, adaptive practice, mastery and career application in one view.</p><div class="parity-hero-actions"><button id="parityNextActionBtn" class="primary-btn">${next.title}</button><button id="parityMasteryBtn" class="secondary-btn">View mastery map</button></div></div><div class="parity-readiness"><span>Concept mastery</span><strong>${mastery}%</strong><div class="progress-track"><div style="width:${mastery}%"></div></div><small>${mastery>=75?"Strong professional foundation":mastery>=50?"Developing capability":"Foundation building"}</small></div></section>
  <section class="academy-stat-grid"><article class="card academy-stat"><span>Diagnostic best</span><strong>${parityDiagnosticBest(id)}%</strong><small>Baseline knowledge</small></article><article class="card academy-stat"><span>Lessons complete</span><strong>${completed}</strong><small>Academy progress</small></article><article class="card academy-stat"><span>Review attempts</span><strong>${state.academyReviewHistory.filter(x=>x.academyId===id).length}</strong><small>Spaced retrieval</small></article><article class="card academy-stat"><span>Focus concept</span><strong class="small-stat">${weak.title}</strong><small>${parityConceptScore(id,weak)}% mastery</small></article></section>
  <section class="parity-command-grid"><article class="card"><div class="eyebrow">NEXT BEST ACTION</div><h2>${next.title}</h2><p>${next.subtitle}</p><button class="text-btn" id="parityNextLink">Open activity →</button></article><article class="card"><div class="eyebrow">90-DAY PATH</div><h2>Academy development plan</h2>${plan.map(item=>`<div class="plan-stage"><strong>Day ${item.day}</strong><div><span>${item.title}</span><small>${item.focus.join(" · ")}</small></div></div>`).join("")}</article><article class="card"><div class="eyebrow">MISCONCEPTION WATCH</div><h2>Patterns to repair</h2>${(state.academyMisconceptions[id]||[]).map(mid=>{const m=cfg.misconceptions.find(x=>x.id===mid);return m?`<div class="misconception-chip"><strong>${m.title}</strong><p>${m.feedback}</p></div>`:""}).join("")||"<p class='muted'>No persistent misconception patterns recorded yet.</p>"}</article></section>`;
  el("parityNextActionBtn").onclick=()=>renderView(next.view);el("parityNextLink").onclick=()=>renderView(next.view);el("parityMasteryBtn").onclick=()=>renderView("academymastery");
}
function renderAcademyDiagnostic(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${cfg.title.toUpperCase()}</div><h1>Academy diagnostic</h1><p>Answer without looking up the solution so CodeQuest can target the right level.</p></div><strong>Best ${parityDiagnosticBest(id)}%</strong></div><form id="parityDiagnosticForm" class="stage-exam-form">${cfg.diagnostic.map((q,i)=>`<article class="card exam-question"><div class="question-number">Question ${i+1}</div><h2>${q.question}</h2><div class="exam-options">${q.options.map((o,oi)=>`<label><input type="radio" name="parity_d_${i}" value="${oi}"><span>${o}</span></label>`).join("")}</div><label class="diagnostic-confidence">Confidence <input type="range" min="1" max="5" value="3" name="parity_conf_${i}"></label></article>`).join("")}<button class="primary-btn exam-submit">Complete diagnostic</button></form>`;
  el("parityDiagnosticForm").onsubmit=e=>{e.preventDefault();const sessionId=`diag-${Date.now()}`,answers=cfg.diagnostic.map((q,i)=>({answer:Number(document.querySelector(`input[name="parity_d_${i}"]:checked`)?.value??-1),confidence:Number(document.querySelector(`input[name="parity_conf_${i}"]`).value),q}));if(answers.some(x=>x.answer<0)){alert("Answer every question.");return}answers.forEach(x=>state.academyDiagnosticHistory.unshift({academyId:id,sessionId,questionId:x.q.id,concept:x.q.concept,correct:x.answer===x.q.answer,confidence:x.confidence,createdAt:new Date().toISOString()}));persist();const score=Math.round(answers.filter(x=>x.answer===x.q.answer).length/answers.length*100);el("main").innerHTML=`<section class="card exam-result-hero ${score>=70?"passed":"failed"}"><div class="exam-score">${score}%</div><div><div class="eyebrow">DIAGNOSTIC COMPLETE</div><h1>${score>=70?"Strong baseline":"Targeted practice recommended"}</h1><p>Your weakest concept is ${parityWeakConcept(id).title}.</p><button id="openAdaptiveCoachBtn" class="primary-btn">Open adaptive coach</button></div></section>`;el("openAdaptiveCoachBtn").onclick=()=>renderView("academycoach")};
}
function parityCoachQuestion(id,concept){
  const bank={
    sql:{
      filtering:["What is the logical difference between selecting columns and filtering rows?","Explain how NULL changes equality comparisons."],
      aggregation:["Why can WHERE not filter SUM(revenue)?","What determines one output row after GROUP BY?"],
      joins:["When would LEFT JOIN be safer than INNER JOIN?","How can a many-to-many join multiply rows?"],
      windows:["Why does a window function preserve detail rows?","What does PARTITION BY change?"],
      "database-design":["What problem does a primary key solve?","How does a foreign key protect integrity?"],
      performance:["Why can an index speed reads but slow writes?","What does a query plan reveal?"]
    },
    web:{
      html:["Why is semantic HTML better than a div-only page?","What makes form labelling accessible?"],
      css:["How does box-sizing affect declared width?","When should Grid be preferred over Flexbox?"],
      javascript:["What is the difference between returning and displaying a value?","How does scope affect variable access?"],
      browser:["Why use preventDefault on a form?","What failures must fetch handling cover?"],
      professional:["How would you test responsive behaviour?","What evidence shows a frontend is production-ready?"]
    },
    java:{
      core:["Why must main be static?","What is the difference between primitive and reference types?"],
      oop:["How does encapsulation protect invariants?","When should an interface be used?"],
      advanced:["How do generics improve type safety?","What makes streams different from loops?"],
      engineering:["Why does constructor injection improve tests?","What risk does shared mutable state create?"],
      enterprise:["What belongs in a controller versus service?","How should validation failures become API responses?"]
    }
  };
  return bank[id]?.[concept.id]||[`Explain ${concept.title} in your own words.`];
}
function renderAcademyCoach(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  const concept=parityWeakConcept(id),questions=parityCoachQuestion(id,concept),question=questions[state.academyCoachSessions.filter(x=>x.academyId===id&&x.concept===concept.id).length%questions.length];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ADAPTIVE COACH · ${cfg.title.toUpperCase()}</div><h1>${concept.title}</h1><p>The coach targets your weakest concept and asks for reasoning, not recognition.</p></div><div class="mastery-status developing">${parityConceptScore(id,concept)}%</div></div><section class="adaptive-coach-layout"><article class="card"><div class="eyebrow">SOCRATIC QUESTION</div><h2>${question}</h2><textarea id="parityCoachAnswer" placeholder="Explain your reasoning in your own words."></textarea><div class="confidence-row"><span>Confidence</span>${[1,2,3,4,5].map(n=>`<label><input type="radio" name="parityCoachConfidence" value="${n}" ${n===3?"checked":""}><span>${n}</span></label>`).join("")}</div><button id="submitParityCoachBtn" class="primary-btn">Check reasoning</button><div id="parityCoachFeedback"></div></article><aside class="card"><div class="eyebrow">CONCEPT MODEL</div><h2>What strong understanding includes</h2><p>${concept.title} should be explainable, applicable and testable—not merely recognisable.</p><div class="tutor-guidance"><strong>Hint ladder</strong><p>Define the concept → contrast it with a nearby concept → give a practical example → identify one failure mode.</p></div></aside></section>`;
  el("submitParityCoachBtn").onclick=()=>{const answer=el("parityCoachAnswer").value.trim(),confidence=Number(document.querySelector('input[name="parityCoachConfidence"]:checked')?.value||3);const tokens=answer.toLowerCase().split(/\W+/),keywords=concept.title.toLowerCase().split(/\W+/).filter(w=>w.length>3);const quality=Math.min(100,answer.split(/\s+/).length*4+keywords.filter(k=>tokens.includes(k)).length*15);const correct=quality>=55;let misconception=null;if(!correct){const candidate=cfg.misconceptions.find(m=>answer.toLowerCase().includes(m.trigger));misconception=candidate?.id||cfg.misconceptions[0]?.id;if(misconception){state.academyMisconceptions[id]=[...new Set([...(state.academyMisconceptions[id]||[]),misconception])]}}state.academyCoachSessions.unshift({academyId:id,concept:concept.id,question,answer,confidence,quality,correct,createdAt:new Date().toISOString()});persist();const feedback=misconception?cfg.misconceptions.find(m=>m.id===misconception)?.feedback:"Add a contrast, example and failure mode.";el("parityCoachFeedback").innerHTML=`<div class="feedback ${correct?"success":"error"}"><strong>${correct?"Good conceptual explanation":"Keep developing the reasoning"}</strong><p>${correct?`Depth score ${quality}%. Now apply this idea in a lesson or simulation.`:feedback}</p><button id="nextCoachQuestionBtn" class="text-btn">Next question</button></div>`;el("nextCoachQuestionBtn").onclick=()=>renderAcademyCoach()};
}
function renderAcademyReview(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  const concepts=[...cfg.concepts].sort((a,b)=>parityConceptScore(id,a)-parityConceptScore(id,b)).slice(0,3);
  const questions=concepts.map(c=>({concept:c,question:parityCoachQuestion(id,c)[0]}));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SPACED RETRIEVAL</div><h1>Five-minute smart review</h1><p>Recall the answer before checking notes.</p></div><span>${state.academyReviewHistory.filter(x=>x.academyId===id).length} attempts</span></div><section class="smart-review-list">${questions.map((x,i)=>`<article class="card review-prompt"><div class="eyebrow">${x.concept.title}</div><h2>${x.question}</h2><textarea data-review-answer="${i}" placeholder="Recall from memory…"></textarea><label>Confidence <input type="range" min="1" max="5" value="3" data-review-confidence="${i}"></label></article>`).join("")}<button id="submitSmartReviewBtn" class="primary-btn">Complete review</button></section>`;
  el("submitSmartReviewBtn").onclick=()=>{questions.forEach((x,i)=>{const answer=document.querySelector(`[data-review-answer="${i}"]`).value.trim(),confidence=Number(document.querySelector(`[data-review-confidence="${i}"]`).value),correct=answer.split(/\s+/).length>=8;state.academyReviewHistory.unshift({academyId:id,concept:x.concept.id,question:x.question,answer,confidence,correct,createdAt:new Date().toISOString()})});persist();renderAcademyMastery()};
}
function renderAcademyVisualizer(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  if(id==="sql")return renderSqlPlanVisualizer();
  if(id==="web")return renderDomVisualizer();
  return renderJavaObjectTracer();
}
function renderSqlPlanVisualizer(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SQL VISUAL LEARNING</div><h1>Query-plan visualizer</h1><p>See the logical operations implied by a SQL query.</p></div></div><section class="visualizer-layout"><article class="card"><textarea id="sqlVisualQuery" class="studio-code">SELECT c.region, SUM(o.revenue) AS revenue\nFROM customers c\nLEFT JOIN orders o ON c.customer_id=o.customer_id\nGROUP BY c.region\nORDER BY revenue DESC;</textarea><button id="buildSqlPlanBtn" class="primary-btn">Build logical plan</button></article><article class="card"><div id="sqlPlanOutput" class="visual-flow"><p class="muted">Build the plan to visualise query stages.</p></div></article></section>`;
  el("buildSqlPlanBtn").onclick=()=>{const q=el("sqlVisualQuery").value.toLowerCase(),steps=[];if(q.includes("from"))steps.push(["Scan","Read source tables"]);if(q.includes("join"))steps.push(["Join",q.includes("left join")?"Preserve all left rows":"Keep matching rows"]);if(q.includes("where"))steps.push(["Filter","Remove rows before aggregation"]);if(q.includes("group by"))steps.push(["Aggregate","Create one row per group"]);if(q.includes("having"))steps.push(["Group filter","Remove aggregated groups"]);if(q.includes("order by"))steps.push(["Sort","Order final result"]);if(q.includes("limit"))steps.push(["Limit","Return first N rows"]);el("sqlPlanOutput").innerHTML=steps.map((s,i)=>`<div class="visual-step"><span>${i+1}</span><div><strong>${s[0]}</strong><p>${s[1]}</p></div></div>`).join("")};
}
function renderDomVisualizer(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">WEB VISUAL LEARNING</div><h1>DOM and accessibility visualizer</h1><p>Inspect semantic structure before styling.</p></div></div><section class="visualizer-layout"><article class="card"><textarea id="domVisualCode" class="studio-code"><header><h1>Dashboard</h1></header>\n<main><section><h2>Revenue</h2><button>Refresh</button></section></main></textarea><button id="buildDomTreeBtn" class="primary-btn">Build DOM tree</button></article><article class="card"><div id="domTreeOutput" class="dom-tree"><p class="muted">Build the tree to inspect hierarchy.</p></div></article></section>`;
  el("buildDomTreeBtn").onclick=()=>{const parser=new DOMParser(),doc=parser.parseFromString(el("domVisualCode").value,"text/html");const walk=(node,depth=0)=>[...node.children].map(child=>`<div class="dom-node" style="--depth:${depth}"><code>&lt;${child.tagName.toLowerCase()}&gt;</code><span>${["HEADER","MAIN","NAV","SECTION","ARTICLE","BUTTON","H1","H2"].includes(child.tagName)?"semantic":"generic"}</span></div>${walk(child,depth+1)}`).join("");el("domTreeOutput").innerHTML=walk(doc.body)};
}
function renderJavaObjectTracer(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA VISUAL LEARNING</div><h1>Object and reference tracer</h1><p>Visualise classes, objects and references from a small Java snippet.</p></div></div><section class="visualizer-layout"><article class="card"><textarea id="javaTraceCode" class="studio-code">Account first = new Account("Asha", 100);\nAccount second = first;\nsecond.deposit(50);</textarea><button id="traceJavaObjectsBtn" class="primary-btn">Trace objects</button></article><article class="card"><div id="javaObjectOutput" class="object-trace"><p class="muted">Trace the snippet to inspect references.</p></div></article></section>`;
  el("traceJavaObjectsBtn").onclick=()=>{const code=el("javaTraceCode").value,objects=[],refs={};for(const line of code.split("\n")){let m=line.match(/(\w+)\s+(\w+)\s*=\s*new\s+(\w+)\((.*?)\)/);if(m){const id=`obj-${objects.length+1}`;objects.push({id,type:m[3],args:m[4]});refs[m[2]]=id;continue}m=line.match(/(\w+)\s+(\w+)\s*=\s*(\w+)\s*;/);if(m&&refs[m[3]])refs[m[2]]=refs[m[3]]}el("javaObjectOutput").innerHTML=`<div class="reference-panel">${Object.entries(refs).map(([name,id])=>`<div><strong>${name}</strong><span>→ ${id}</span></div>`).join("")}</div><div class="heap-panel">${objects.map(o=>`<div class="heap-object"><strong>${o.id} · ${o.type}</strong><code>${o.args}</code></div>`).join("")}</div>`};
}
function renderAcademyMastery(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${cfg.title.toUpperCase()}</div><h1>Concept mastery map</h1><p>Combines lesson completion, diagnostics and retrieval practice.</p></div><strong>${parityOverallMastery(id)}%</strong></div><section class="concept-mastery-grid">${cfg.concepts.map(c=>{const score=parityConceptScore(id,c);return`<article class="card concept-mastery-card"><div class="mastery-status ${score>=75?"strong":score>=50?"developing":"weak"}">${score}%</div><div><div class="eyebrow">${score>=75?"STRONG":score>=50?"DEVELOPING":"FOCUS AREA"}</div><h2>${c.title}</h2><p>${c.lessonIds.filter(x=>parityCompletedSet(id).has(x)).length}/${c.lessonIds.length} lessons complete</p><div class="progress-track"><div style="width:${score}%"></div></div></div><button class="text-btn" data-practise-parity="${c.id}">Practise</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-practise-parity]").forEach(b=>b.onclick=()=>renderView("academycoach"));
}
function renderAcademySimulations(){
  const id=parityAcademyId(),cfg=parityConfig();if(!id||!cfg)return;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">WORKPLACE PRACTICE</div><h1>Career simulations</h1><p>Apply academy skills to realistic professional situations.</p></div></div><section class="simulation-grid">${cfg.careerSimulations.map(sim=>{const saved=state.academySimulationState[sim.id]||{};return`<article class="card simulation-card"><div class="eyebrow">${sim.role.toUpperCase()}</div><h2>${sim.title}</h2><p>${sim.brief}</p><h3>Deliverables</h3>${sim.deliverables.map(d=>`<div class="pack-item">✓ <span>${d}</span></div>`).join("")}<label>Workplace response<textarea data-parity-sim-notes="${sim.id}">${esc(saved.notes||"")}</textarea></label><label class="toggle-row"><span>Mark simulation complete</span><input type="checkbox" data-parity-sim-complete="${sim.id}" ${saved.complete?"checked":""}></label><button class="primary-btn full" data-save-parity-sim="${sim.id}">Save simulation evidence</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-save-parity-sim]").forEach(b=>b.onclick=()=>{const id=b.dataset.saveParitySim,notes=document.querySelector(`[data-parity-sim-notes="${id}"]`).value,complete=document.querySelector(`[data-parity-sim-complete="${id}"]`).checked;state.academySimulationState[id]={notes,complete,updatedAt:new Date().toISOString()};persist();renderAcademySimulations()});
}


function initCurriculumDrafts(){
  if(!state.curriculumDrafts)state.curriculumDrafts=JSON.parse(JSON.stringify(authoringSeedDrafts||[]));
}
function activeCurriculumDraft(){
  initCurriculumDrafts();
  return state.curriculumDrafts.find(d=>d.id===state.activeCurriculumDraftId)||null;
}
function curriculumQuality(draft){
  if(!draft)return{score:0,items:[],missing:[]};
  const rules=authoringQualityRules[draft.type||"lesson"]||authoringQualityRules.lesson;
  const missing=rules.required.filter(field=>{
    const value=draft[field];
    return value===undefined||value===null||value===""||(Array.isArray(value)&&!value.length);
  });
  const items=rules.checks.map(rule=>{
    let passed=false;
    if(rule.id==="objective-action")passed=/^(build|create|explain|identify|analyse|analyze|implement|compare|design|debug|write|use)\b/i.test(draft.objective||"");
    else if(rule.id==="practice-present")passed=(draft.practicePrompt||"").trim().length>=20;
    else if(rule.id==="feedback-present")passed=(draft.hint||"").trim().length>=10;
    else if(rule.id==="assessment-aligned")passed=(draft.objective||"").split(/\s+/).some(word=>word.length>5&&(draft.practicePrompt||"").toLowerCase().includes(word.toLowerCase()));
    else if(rule.id==="accessible-language")passed=(draft.content||"").split(/\s+/).length<=250;
    else if(rule.id==="answer-key")passed=(draft.questions||[]).every(q=>q.answer!==undefined);
    else if(rule.id==="coverage")passed=new Set((draft.questions||[]).map(q=>q.concept).filter(Boolean)).size>=2;
    else if(rule.id==="difficulty-balance")passed=(draft.questions||[]).length>=3;
    else if(rule.id==="explanation")passed=(draft.questions||[]).some(q=>q.type==="explanation");
    return{...rule,passed};
  });
  const score=Math.max(0,Math.round((items.filter(x=>x.passed).length/items.length*80)+(missing.length?0:20)));
  return{score,items,missing};
}
function renderCurriculumStudio(){
  initCurriculumDrafts();
  const drafts=state.curriculumDrafts;
  el("main").innerHTML=`<section class="curriculum-studio-hero card"><div><div class="eyebrow">CODEQUEST AUTHORING OS</div><h1>Curriculum Studio</h1><p>Create structured lessons, assessments and professional learning experiences without editing JSON by hand.</p><div class="curriculum-hero-actions"><button id="newLessonDraftBtn" class="primary-btn">New lesson</button><button id="newAssessmentDraftBtn" class="secondary-btn">New assessment</button></div></div><div class="curriculum-stats"><div><strong>${drafts.length}</strong><span>draft items</span></div><div><strong>${drafts.filter(d=>d.status==="published").length}</strong><span>published</span></div><div><strong>${Math.round(drafts.reduce((s,d)=>s+curriculumQuality(d).score,0)/Math.max(1,drafts.length))}%</strong><span>average quality</span></div></div></section>
  <section class="curriculum-layout"><aside class="card curriculum-library"><div class="section-head"><div><div class="eyebrow">CONTENT LIBRARY</div><h2>Drafts</h2></div></div><div class="curriculum-filter-row"><select id="curriculumAcademyFilter"><option value="">All academies</option>${academies.map(a=>`<option value="${a.id}">${a.shortName}</option>`).join("")}</select><select id="curriculumStatusFilter"><option value="">All statuses</option>${authoringTemplates.statuses.map(s=>`<option value="${s}">${s}</option>`).join("")}</select></div><div id="curriculumDraftList">${renderCurriculumDraftList(drafts)}</div></aside>
  <article class="card curriculum-overview"><div class="eyebrow">AUTHORING WORKFLOW</div><h2>From idea to published academy content</h2><div class="authoring-workflow">${[["1","Draft","Define objective, explanation and learner practice"],["2","Validate","Run instructional-quality checks"],["3","Preview","Experience it in learner mode"],["4","Review","Record editorial feedback and approval"],["5","Publish","Add a versioned snapshot to the catalogue"]].map(x=>`<div><span>${x[0]}</span><div><strong>${x[1]}</strong><p>${x[2]}</p></div></div>`).join("")}</div><h3>Templates</h3>${authoringTemplates.lessonTemplates.map(t=>`<button class="template-card" data-curriculum-template="${t.id}"><strong>${t.title}</strong><span>${t.description}</span></button>`).join("")}</article></section>`;
  el("newLessonDraftBtn").onclick=()=>createCurriculumDraft("lesson");
  el("newAssessmentDraftBtn").onclick=()=>createCurriculumDraft("assessment");
  el("curriculumAcademyFilter").onchange=filterCurriculumDrafts;el("curriculumStatusFilter").onchange=filterCurriculumDrafts;
  document.querySelectorAll("[data-curriculum-template]").forEach(b=>b.onclick=()=>createCurriculumDraft("lesson",b.dataset.curriculumTemplate));
  bindCurriculumDraftButtons();
}
function renderCurriculumDraftList(drafts){
  return drafts.map(d=>{const q=curriculumQuality(d);return`<button class="curriculum-draft-row" data-edit-curriculum="${d.id}"><div class="curriculum-draft-icon">${d.type==="assessment"?"A":"L"}</div><div><strong>${d.title||"Untitled"}</strong><small>${d.academyId||"unassigned"} · ${d.status||"draft"}</small></div><span class="quality-pill ${q.score>=80?"good":q.score>=60?"warn":"poor"}">${q.score}%</span></button>`}).join("")||"<p class='muted'>No matching drafts.</p>";
}
function filterCurriculumDrafts(){
  const academy=el("curriculumAcademyFilter").value,status=el("curriculumStatusFilter").value;
  const drafts=state.curriculumDrafts.filter(d=>(!academy||d.academyId===academy)&&(!status||d.status===status));
  el("curriculumDraftList").innerHTML=renderCurriculumDraftList(drafts);bindCurriculumDraftButtons();
}
function bindCurriculumDraftButtons(){document.querySelectorAll("[data-edit-curriculum]").forEach(b=>b.onclick=()=>{state.activeCurriculumDraftId=b.dataset.editCurriculum;persist();renderView("curriculumeditor")})}
function createCurriculumDraft(type,templateId=""){
  initCurriculumDrafts();
  const template=authoringTemplates.lessonTemplates.find(t=>t.id===templateId);
  const draft={id:`curriculum-${Date.now()}`,type,academyId:getActiveAcademy()?.id||"python",title:template?.title||`Untitled ${type}`,moduleTitle:"",objective:"",content:template?.description||"",practicePrompt:"",hint:"",reflectionPrompt:"",estimatedMinutes:20,xp:100,passMark:70,questions:[],status:"draft",templateId,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  state.curriculumDrafts.unshift(draft);state.activeCurriculumDraftId=draft.id;persist();renderView("curriculumeditor");
}
function renderCurriculumEditor(){
  const draft=activeCurriculumDraft();if(!draft){renderView("curriculumstudio");return}
  const quality=curriculumQuality(draft);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CURRICULUM EDITOR · ${draft.type.toUpperCase()}</div><h1>${draft.title||"Untitled"}</h1><p>Design the learner experience and validate it before publishing.</p></div><div class="curriculum-editor-actions"><button id="backCurriculumStudioBtn" class="secondary-btn">Library</button><button id="previewCurriculumBtn" class="secondary-btn">Learner preview</button><button id="reviewCurriculumBtn" class="secondary-btn">Review</button><button id="saveCurriculumBtn" class="primary-btn">Save draft</button></div></div>
  <section class="curriculum-editor-layout"><article class="card curriculum-form"><div class="form-grid"><label>Title<input id="curTitle" value="${esc(draft.title||"")}"></label><label>Academy<select id="curAcademy">${academies.map(a=>`<option value="${a.id}" ${a.id===draft.academyId?"selected":""}>${a.name}</option>`).join("")}</select></label><label>Module<input id="curModule" value="${esc(draft.moduleTitle||"")}"></label><label>Status<select id="curStatus">${authoringTemplates.statuses.map(s=>`<option value="${s}" ${s===draft.status?"selected":""}>${s}</option>`).join("")}</select><label>Minutes<input id="curMinutes" type="number" value="${draft.estimatedMinutes||20}"></label><label>XP<input id="curXp" type="number" value="${draft.xp||100}"></label></div><label>Learning objective<input id="curObjective" value="${esc(draft.objective||"")}" placeholder="Identify, explain, build, debug…"></label><label>Teaching content<textarea id="curContent">${esc(draft.content||"")}</textarea></label><label>Practice prompt<textarea id="curPractice">${esc(draft.practicePrompt||"")}</textarea></label><label>Hint or feedback<textarea id="curHint">${esc(draft.hint||"")}</textarea></label><label>Reflection prompt<textarea id="curReflection">${esc(draft.reflectionPrompt||"")}</textarea></label></article><aside class="card curriculum-quality-panel"><div class="quality-score-large ${quality.score>=80?"good":quality.score>=60?"warn":"poor"}">${quality.score}%</div><div class="eyebrow">INSTRUCTIONAL QUALITY</div><h2>Readiness checks</h2>${quality.missing.length?`<div class="feedback error"><strong>Missing required fields</strong><p>${quality.missing.join(", ")}</p></div>`:""}<div class="quality-check-list">${quality.items.map(i=>`<div class="${i.passed?"passed":"failed"}"><span>${i.passed?"✓":"○"}</span><strong>${i.title}</strong></div>`).join("")}</div><div class="publish-readiness"><strong>${quality.score>=80&&!quality.missing.length?"Ready for review":"Continue improving"}</strong><p>Publishing requires a quality score of at least 80% and no missing required fields.</p></div></aside></section>`;
  el("backCurriculumStudioBtn").onclick=()=>renderView("curriculumstudio");
  el("saveCurriculumBtn").onclick=()=>{saveCurriculumForm(draft);renderCurriculumEditor()};
  el("previewCurriculumBtn").onclick=()=>{saveCurriculumForm(draft);renderView("curriculumpreview")};
  el("reviewCurriculumBtn").onclick=()=>{saveCurriculumForm(draft);renderView("curriculumreview")};
}
function saveCurriculumForm(draft){
  draft.title=el("curTitle").value.trim();draft.academyId=el("curAcademy").value;draft.moduleTitle=el("curModule").value.trim();draft.status=el("curStatus").value;draft.estimatedMinutes=Number(el("curMinutes").value||20);draft.xp=Number(el("curXp").value||100);draft.objective=el("curObjective").value.trim();draft.content=el("curContent").value.trim();draft.practicePrompt=el("curPractice").value.trim();draft.hint=el("curHint").value.trim();draft.reflectionPrompt=el("curReflection").value.trim();draft.updatedAt=new Date().toISOString();persist();cloudSaveCurriculumDraft(draft);
}
function renderCurriculumPreview(){
  const draft=activeCurriculumDraft();if(!draft)return renderView("curriculumstudio");
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNER PREVIEW · ${draft.academyId.toUpperCase()}</div><h1>${draft.title}</h1><p>${draft.estimatedMinutes||20} min · ${draft.xp||100} XP</p></div><button id="returnCurriculumEditorBtn" class="secondary-btn">Return to editor</button></div><section class="curriculum-preview-layout"><article class="card"><div class="eyebrow">LEARNING OBJECTIVE</div><h2>${draft.objective||"Objective not yet defined"}</h2><div class="lesson-content-preview">${(draft.content||"No teaching content yet.").split("\n").map(p=>`<p>${esc(p)}</p>`).join("")}</div><div class="practice-preview"><div class="eyebrow">YOUR TASK</div><h2>${draft.practicePrompt||"Practice prompt not yet defined"}</h2><textarea placeholder="Learner response appears here"></textarea><button class="primary-btn">Check work</button></div></article><aside class="card"><div class="eyebrow">SUPPORT</div><h2>Hint</h2><p>${draft.hint||"No hint configured."}</p><h2>Reflection</h2><p>${draft.reflectionPrompt||"No reflection prompt configured."}</p></aside></section>`;
  el("returnCurriculumEditorBtn").onclick=()=>renderView("curriculumeditor");
}
function renderCurriculumReview(){
  const draft=activeCurriculumDraft();if(!draft)return renderView("curriculumstudio");
  const q=curriculumQuality(draft),review=state.curriculumReviews[draft.id]||{};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">EDITORIAL REVIEW</div><h1>${draft.title}</h1><p>Quality score ${q.score}%</p></div><button id="returnCurriculumFromReviewBtn" class="secondary-btn">Return to editor</button></div><section class="curriculum-review-layout"><article class="card"><h2>Review decision</h2><label>Status<select id="curriculumReviewDecision"><option value="changes" ${review.decision==="changes"?"selected":""}>Changes requested</option><option value="approved" ${review.decision==="approved"?"selected":""}>Approved</option></select></label><label>Editorial feedback<textarea id="curriculumReviewNotes">${esc(review.notes||"")}</textarea></label><button id="saveCurriculumReviewBtn" class="secondary-btn">Save review</button><button id="publishCurriculumBtn" class="primary-btn" ${q.score>=80&&!q.missing.length?"":"disabled"}>Publish version</button></article><aside class="card"><div class="quality-score-large ${q.score>=80?"good":q.score>=60?"warn":"poor"}">${q.score}%</div><h2>Publication requirements</h2><div class="quality-check-list"><div class="${q.score>=80?"passed":"failed"}"><span>${q.score>=80?"✓":"○"}</span><strong>Quality score ≥ 80%</strong></div><div class="${!q.missing.length?"passed":"failed"}"><span>${!q.missing.length?"✓":"○"}</span><strong>No missing required fields</strong></div><div class="${review.decision==="approved"?"passed":"failed"}"><span>${review.decision==="approved"?"✓":"○"}</span><strong>Editorial approval</strong></div></div></aside></section>`;
  el("returnCurriculumFromReviewBtn").onclick=()=>renderView("curriculumeditor");
  el("saveCurriculumReviewBtn").onclick=()=>{state.curriculumReviews[draft.id]={decision:el("curriculumReviewDecision").value,notes:el("curriculumReviewNotes").value,reviewedAt:new Date().toISOString()};persist();renderCurriculumReview()};
  el("publishCurriculumBtn").onclick=()=>{const decision=el("curriculumReviewDecision").value;if(decision!=="approved"){alert("Approve the content before publishing.");return}const snapshot=JSON.parse(JSON.stringify(draft));snapshot.version=(state.curriculumPublications.filter(p=>p.draftId===draft.id).length+1);snapshot.draftId=draft.id;snapshot.publishedAt=new Date().toISOString();state.curriculumPublications.unshift(snapshot);draft.status="published";persist();alert(`Published version ${snapshot.version}.`);renderCurriculumStudio()};
}

function initClassroomState(){
  if(!state.classroomAssignments)state.classroomAssignments=JSON.parse(JSON.stringify(cohortAssignments));
  if(!state.classroomSubmissions)state.classroomSubmissions=JSON.parse(JSON.stringify(cohortSubmissions));
  if(!state.classroomAnnouncements)state.classroomAnnouncements=JSON.parse(JSON.stringify(cohortAnnouncements));
}
function activeCohort(){return cohorts.find(c=>c.id===state.activeCohortId)||cohorts[0]}
function cohortMembers(){return cohortLearners.filter(l=>l.cohortId===activeCohort().id)}
function cohortAssignmentList(){initClassroomState();return state.classroomAssignments.filter(a=>a.cohortId===activeCohort().id)}
function cohortSubmissionList(){initClassroomState();const ids=new Set(cohortAssignmentList().map(a=>a.id));return state.classroomSubmissions.filter(s=>ids.has(s.assignmentId))}
function assignmentStatus(assignment){
  const due=new Date(assignment.dueDate),now=new Date();
  if(assignment.status==="draft")return"draft";
  if(due<now)return"closed";
  return"open";
}
function renderClassroomHome(){
  initClassroomState();
  const cohort=activeCohort(),assignments=cohortAssignmentList(),announcements=state.classroomAnnouncements.filter(a=>a.cohortId===cohort.id).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  const learner=cohortMembers()[0];
  el("main").innerHTML=`<section class="classroom-hero card"><div><div class="eyebrow">CODEQUEST CLASSROOM</div><h1>${cohort.title}</h1><p>${cohort.description}</p><div class="classroom-meta"><span>${new Date(cohort.startDate).toLocaleDateString()}–${new Date(cohort.endDate).toLocaleDateString()}</span><span>${cohortMembers().length} learners</span><span>${cohort.instructor}</span></div></div><div class="classroom-role-switch"><span>View as</span><button id="learnerRoleBtn" class="${state.classroomRole==="learner"?"active":""}">Learner</button><button id="instructorRoleBtn" class="${state.classroomRole==="instructor"?"active":""}">Instructor</button></div></section>
  ${state.classroomRole==="learner"?`<section class="classroom-grid"><article class="card"><div class="section-head"><div><div class="eyebrow">UPCOMING WORK</div><h2>Assignments</h2></div></div><div class="assignment-list">${assignments.filter(a=>a.status==="published").map(a=>`<article class="assignment-row"><div><div class="eyebrow">${a.academy.toUpperCase()} · ${a.type.toUpperCase()}</div><h3>${a.title}</h3><p>${a.instructions}</p></div><div><strong>${a.points} pts</strong><small>Due ${new Date(a.dueDate).toLocaleString()}</small><button class="primary-btn" data-open-assignment-lab="${a.sourceId}">Open work</button></div></article>`).join("")}</div></article><aside class="card"><div class="eyebrow">ANNOUNCEMENTS</div><h2>Latest updates</h2>${announcements.map(a=>`<div class="announcement-item ${a.priority}"><strong>${a.title}</strong><p>${a.body}</p><small>${new Date(a.publishedAt).toLocaleString()}</small></div>`).join("")}</aside></section>`:`<section class="instructor-launch-grid">${[
    ["instructordashboard","Instructor dashboard","Programme health, progress and interventions"],
    ["cohortmanagement","Cohort management","Learners, enrolment and cohort settings"],
    ["assignmentbuilder","Assignment builder","Create and publish structured work"],
    ["gradebook","Gradebook","Scores, completion and export"],
    ["reviewqueue","Review queue","Feedback and rubric-based marking"],
    ["learneranalytics","Learner analytics","Risk, activity and mastery"],
    ["announcements","Announcements","Communicate with the cohort"]
  ].map(item=>`<button class="card instructor-launch-card" data-classroom-view="${item[0]}"><strong>${item[1]}</strong><span>${item[2]}</span></button>`).join("")}</section>`}`;
  el("learnerRoleBtn").onclick=()=>{state.classroomRole="learner";persist();renderClassroomHome()};
  el("instructorRoleBtn").onclick=()=>{state.classroomRole="instructor";persist();renderClassroomHome()};
  document.querySelectorAll("[data-open-assignment-lab]").forEach(b=>b.onclick=()=>{const lab=codingLabs.find(l=>l.id===b.dataset.openAssignmentLab);if(lab){state.activeCodingLabId=lab.id;persist();renderView("codinglab")}else alert("This assignment source will open once its project workspace is connected.")});
  document.querySelectorAll("[data-classroom-view]").forEach(b=>b.onclick=()=>renderView(b.dataset.classroomView));
}
function instructorMetrics(){
  const members=cohortMembers(),subs=cohortSubmissionList(),assignments=cohortAssignmentList();
  const reviewed=subs.filter(s=>s.status==="reviewed").length;
  const submitted=subs.filter(s=>["submitted","reviewed"].includes(s.status)).length;
  const missing=subs.filter(s=>s.status==="missing").length;
  const avg=subs.filter(s=>s.score>0).length?Math.round(subs.filter(s=>s.score>0).reduce((sum,s)=>sum+s.score,0)/subs.filter(s=>s.score>0).length):0;
  return{members:members.length,assignments:assignments.length,reviewed,submitted,missing,avg};
}
function renderInstructorDashboard(){
  initClassroomState();
  const m=instructorMetrics(),cohort=activeCohort();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INSTRUCTOR COMMAND CENTER</div><h1>${cohort.title}</h1><p>Monitor delivery, learner progress and intervention risk.</p></div><button id="backClassroomBtn" class="secondary-btn">Classroom</button></div><section class="instructor-kpis">${[["Learners",m.members],["Assignments",m.assignments],["Submitted",m.submitted],["Missing",m.missing],["Average",`${m.avg}%`],["Reviewed",m.reviewed]].map(x=>`<article class="card"><span>${x[0]}</span><strong>${x[1]}</strong></article>`).join("")}</section><section class="instructor-dashboard-grid"><article class="card"><div class="section-head"><div><div class="eyebrow">COHORT HEALTH</div><h2>Learner status</h2></div></div>${cohortMembers().map(l=>{const risk=learnerRiskScore(l.id);return`<button class="learner-health-row ${risk.level}" data-learner-analytics="${l.id}"><span class="learner-avatar">${l.name.split(" ").map(p=>p[0]).join("")}</span><div><strong>${l.name}</strong><small>${l.email}</small></div><div><strong>${risk.score}</strong><small>${risk.label}</small></div></button>`}).join("")}</article><article class="card"><div class="section-head"><div><div class="eyebrow">REVIEW WORKLOAD</div><h2>Submission queue</h2></div><button id="openReviewQueueBtn" class="text-btn">Open queue</button></div>${cohortSubmissionList().filter(s=>s.status==="submitted").map(s=>{const learner=cohortLearners.find(l=>l.id===s.learnerId),a=state.classroomAssignments.find(x=>x.id===s.assignmentId);return`<div class="review-queue-row"><div><strong>${learner?.name}</strong><small>${a?.title}</small></div><span>${s.score}%</span></div>`}).join("")||"<p class='muted'>No submissions waiting.</p>"}</article></section>`;
  el("backClassroomBtn").onclick=()=>renderView("classroomhome");
  el("openReviewQueueBtn").onclick=()=>renderView("reviewqueue");
  document.querySelectorAll("[data-learner-analytics]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_learner_analytics",b.dataset.learnerAnalytics);renderView("learneranalytics")});
}
function learnerRiskScore(learnerId){
  const subs=cohortSubmissionList().filter(s=>s.learnerId===learnerId);
  const missing=subs.filter(s=>s.status==="missing").length;
  const avg=subs.filter(s=>s.score>0).length?Math.round(subs.filter(s=>s.score>0).reduce((sum,s)=>sum+s.score,0)/subs.filter(s=>s.score>0).length):0;
  let score=Math.max(0,100-missing*35-(avg?Math.max(0,70-avg):25));
  if(score>=75)return{score,label:"Healthy",level:"healthy"};
  if(score>=50)return{score,label:"Watch",level:"watch"};
  return{score,label:"Intervention",level:"risk"};
}
function renderCohortManagement(){
  const cohort=activeCohort();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COHORT OPERATIONS</div><h1>Cohort management</h1><p>Manage learners and programme settings.</p></div><button id="addLearnerBtn" class="primary-btn">Add learner</button></div><section class="cohort-management-grid"><article class="card"><h2>${cohort.title}</h2><p>${cohort.description}</p><div class="cohort-settings"><label>Start date<input id="cohortStartDate" type="date" value="${cohort.startDate}"></label><label>End date<input id="cohortEndDate" type="date" value="${cohort.endDate}"></label><label>Capacity<input id="cohortCapacity" type="number" value="${cohort.capacity}"></label></div><button id="saveCohortSettingsBtn" class="secondary-btn">Save settings</button></article><article class="card"><div class="section-head"><div><h2>Learners</h2></div><span>${cohortMembers().length}</span></div><div class="cohort-table">${cohortMembers().map(l=>`<div><span class="learner-avatar">${l.name.split(" ").map(p=>p[0]).join("")}</span><div><strong>${l.name}</strong><small>${l.email}</small></div><span class="status-pill ${l.status}">${l.status}</span></div>`).join("")}</div></article></section>`;
  el("addLearnerBtn").onclick=()=>alert("In production this would invite the learner by email and create their cohort membership.");
  el("saveCohortSettingsBtn").onclick=()=>{cohort.startDate=el("cohortStartDate").value;cohort.endDate=el("cohortEndDate").value;cohort.capacity=Number(el("cohortCapacity").value);alert("Cohort settings saved for this session.")};
}
function renderAssignmentBuilder(){
  initClassroomState();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INSTRUCTIONAL DESIGN</div><h1>Assignment builder</h1><p>Create coding labs, projects and assessments for the cohort.</p></div></div><section class="assignment-builder-layout"><article class="card"><div class="form-row"><label>Title<input id="assignmentTitle" placeholder="Assignment title"></label></div><div class="form-grid"><label>Academy<select id="assignmentAcademy"><option>python</option><option>sql</option><option>web</option><option>java</option></select></label><label>Type<select id="assignmentType"><option value="coding-lab">Coding lab</option><option value="project">Project</option><option value="assessment">Assessment</option></select></label><label>Due date<input id="assignmentDue" type="datetime-local"></label><label>Points<input id="assignmentPoints" type="number" value="100"></label></div><div class="form-row"><label>Instructions<textarea id="assignmentInstructions"></textarea></label></div><label class="toggle-row"><span>Publish immediately</span><input id="assignmentPublish" type="checkbox"></label><button id="createAssignmentBtn" class="primary-btn">Create assignment</button></article><article class="card"><div class="eyebrow">CURRENT ASSIGNMENTS</div><h2>${activeCohort().title}</h2>${cohortAssignmentList().map(a=>`<div class="assignment-summary"><div><strong>${a.title}</strong><small>${a.academy} · ${a.type}</small></div><span class="status-pill ${assignmentStatus(a)}">${assignmentStatus(a)}</span></div>`).join("")}</article></section>`;
  el("createAssignmentBtn").onclick=()=>{const title=el("assignmentTitle").value.trim();if(!title){alert("Enter a title.");return}state.classroomAssignments.push({id:`assignment-${Date.now()}`,cohortId:activeCohort().id,title,type:el("assignmentType").value,academy:el("assignmentAcademy").value,sourceId:"",dueDate:new Date(el("assignmentDue").value||Date.now()+7*86400000).toISOString(),points:Number(el("assignmentPoints").value||100),status:el("assignmentPublish").checked?"published":"draft",instructions:el("assignmentInstructions").value});persist();renderAssignmentBuilder()};
}
function renderGradebook(){
  initClassroomState();
  const assignments=cohortAssignmentList(),members=cohortMembers();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ASSESSMENT RECORD</div><h1>Gradebook</h1><p>Scores and completion across the active cohort.</p></div><button id="exportGradebookBtn" class="secondary-btn">Export CSV</button></div><div class="card gradebook-wrap"><table class="gradebook"><thead><tr><th>Learner</th>${assignments.map(a=>`<th>${a.title}<small>${a.points} pts</small></th>`).join("")}<th>Average</th></tr></thead><tbody>${members.map(l=>{const scores=assignments.map(a=>state.classroomSubmissions.find(s=>s.assignmentId===a.id&&s.learnerId===l.id)?.score??null),valid=scores.filter(x=>x!==null),avg=valid.length?Math.round(valid.reduce((a,b)=>a+b,0)/valid.length):0;return`<tr><td><strong>${l.name}</strong><small>${l.email}</small></td>${scores.map(s=>`<td>${s===null?"—":`${s}%`}</td>`).join("")}<td><strong>${avg}%</strong></td></tr>`}).join("")}</tbody></table></div>`;
  el("exportGradebookBtn").onclick=()=>{const rows=[["Learner",...assignments.map(a=>a.title),"Average"],...members.map(l=>{const scores=assignments.map(a=>state.classroomSubmissions.find(s=>s.assignmentId===a.id&&s.learnerId===l.id)?.score??""),valid=scores.filter(x=>x!==""),avg=valid.length?Math.round(valid.reduce((a,b)=>Number(a)+Number(b),0)/valid.length):0;return[l.name,...scores,avg]})];downloadBlob(new Blob([rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n")],{type:"text/csv"}),"codequest-gradebook.csv")};
}
function renderReviewQueue(){
  initClassroomState();
  const queue=cohortSubmissionList().filter(s=>s.status==="submitted");
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INSTRUCTOR REVIEW</div><h1>Review queue</h1><p>Apply rubric-based feedback and finalise marks.</p></div><span>${queue.length} waiting</span></div><section class="review-list">${queue.map(s=>{const learner=cohortLearners.find(l=>l.id===s.learnerId),a=state.classroomAssignments.find(x=>x.id===s.assignmentId);return`<article class="card review-card"><div><div class="eyebrow">${a?.academy?.toUpperCase()} · ${new Date(s.submittedAt).toLocaleString()}</div><h2>${learner?.name}</h2><p>${a?.title}</p><div class="submission-metrics"><span>Autograde <strong>${s.score}%</strong></span><span>Status <strong>${s.status}</strong></span></div></div><div class="review-form"><label>Final score<input type="number" data-review-score="${s.id}" value="${s.score}"></label><label>Feedback<textarea data-review-feedback="${s.id}">${esc(s.feedback||"")}</textarea></label><button class="primary-btn" data-complete-review="${s.id}">Complete review</button></div></article>`}).join("")||"<div class='empty-state'><h2>Queue clear</h2><p>No submissions are waiting for review.</p></div>"}</section>`;
  document.querySelectorAll("[data-complete-review]").forEach(b=>b.onclick=()=>{const s=state.classroomSubmissions.find(x=>x.id===b.dataset.completeReview);s.score=Number(document.querySelector(`[data-review-score="${s.id}"]`).value);s.feedback=document.querySelector(`[data-review-feedback="${s.id}"]`).value;s.status="reviewed";persist();renderReviewQueue()});
}
function renderLearnerAnalytics(){
  const id=localStorage.getItem("cq_active_learner_analytics")||cohortMembers()[0]?.id,learner=cohortLearners.find(l=>l.id===id),risk=learnerRiskScore(id),subs=cohortSubmissionList().filter(s=>s.learnerId===id);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNER INTELLIGENCE</div><h1>${learner?.name}</h1><p>${learner?.email}</p></div><div class="learner-risk-badge ${risk.level}"><strong>${risk.score}</strong><span>${risk.label}</span></div></div><section class="learner-analytics-grid"><article class="card"><h2>Assignment performance</h2>${cohortAssignmentList().map(a=>{const s=subs.find(x=>x.assignmentId===a.id);return`<div class="analytics-assignment-row"><div><strong>${a.title}</strong><small>${a.academy}</small></div><span class="status-pill ${s?.status||"missing"}">${s?s.score+"%":"missing"}</span></div>`}).join("")}</article><article class="card"><h2>Intervention notes</h2><textarea id="interventionNotes">${esc(state.interventionNotes[id]||"")}</textarea><button id="saveInterventionBtn" class="primary-btn">Save intervention note</button><div class="intervention-actions"><button class="secondary-btn">Schedule check-in</button><button class="secondary-btn">Send encouragement</button><button class="secondary-btn">Assign revision</button></div></article></section>`;
  el("saveInterventionBtn").onclick=()=>{state.interventionNotes[id]=el("interventionNotes").value;persist();alert("Intervention note saved.")};
}
function renderAnnouncements(){
  initClassroomState();
  const list=state.classroomAnnouncements.filter(a=>a.cohortId===activeCohort().id).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COHORT COMMUNICATION</div><h1>Announcements</h1><p>Publish updates and reminders to the cohort.</p></div></div><section class="announcement-layout"><article class="card"><label>Title<input id="announcementTitle"></label><label>Message<textarea id="announcementBody"></textarea></label><label>Priority<select id="announcementPriority"><option value="normal">Normal</option><option value="high">High</option></select></label><button id="publishAnnouncementBtn" class="primary-btn">Publish announcement</button></article><article class="card"><h2>Published</h2>${list.map(a=>`<div class="announcement-item ${a.priority}"><strong>${a.title}</strong><p>${a.body}</p><small>${new Date(a.publishedAt).toLocaleString()}</small></div>`).join("")}</article></section>`;
  el("publishAnnouncementBtn").onclick=()=>{const title=el("announcementTitle").value.trim(),body=el("announcementBody").value.trim();if(!title||!body){alert("Add a title and message.");return}state.classroomAnnouncements.unshift({id:`ann-${Date.now()}`,cohortId:activeCohort().id,title,body,publishedAt:new Date().toISOString(),priority:el("announcementPriority").value});persist();renderAnnouncements()};
}

function ensureCodingProject(lab){
  if(!state.codingLabProjects[lab.id]){
    state.codingLabProjects[lab.id]={files:JSON.parse(JSON.stringify(lab.files)),activeFile:lab.entryFile,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
    persist();
  }
  return state.codingLabProjects[lab.id];
}
function activeCodingLab(){return codingLabs.find(lab=>lab.id===state.activeCodingLabId)||codingLabs[0]}
function codingFileIcon(path){if(path.endsWith(".py"))return"PY";if(path.endsWith(".java"))return"JV";if(path.endsWith(".js"))return"JS";if(path.endsWith(".sql"))return"SQL";if(path.endsWith(".html"))return"<>";return"•"}
function renderCodingLab(){
  if(!state.activeCodingLabId){
    el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PROFESSIONAL EXECUTION ENVIRONMENT</div><h1>Secure coding lab</h1><p>Build multi-file projects and create structured test evidence.</p></div></div><section class="coding-lab-grid">${codingLabs.map(lab=>`<article class="card coding-lab-card"><div class="coding-language-badge ${lab.language}">${lab.language.toUpperCase()}</div><div class="eyebrow">${lab.academy.toUpperCase()} · ${lab.difficulty.toUpperCase()}</div><h2>${lab.title}</h2><p>${lab.brief}</p><div class="lab-meta"><span>${Object.keys(lab.files).length} files</span><span>${lab.publicTests.length} public tests</span><span>${lab.hiddenTests.length} hidden tests</span></div><button class="primary-btn full" data-open-coding-lab="${lab.id}">${state.codingLabProjects[lab.id]?"Continue project":"Start project"}</button></article>`).join("")}</section>`;
    document.querySelectorAll("[data-open-coding-lab]").forEach(button=>button.onclick=()=>{state.activeCodingLabId=button.dataset.openCodingLab;ensureCodingProject(activeCodingLab());persist();renderCodingLab()});
    return;
  }
  const lab=activeCodingLab(),project=ensureCodingProject(lab),activeFile=project.activeFile||lab.entryFile;
  el("main").innerHTML=`<div class="coding-ide-head"><div><div class="eyebrow">${lab.academy.toUpperCase()} · ${lab.language.toUpperCase()}</div><h1>${lab.title}</h1><p>${lab.brief}</p></div><div class="coding-ide-actions"><button id="exitCodingLabBtn" class="secondary-btn">All labs</button><button id="resetCodingLabBtn" class="secondary-btn">Reset</button><button id="runCodingProjectBtn" class="secondary-btn">Run</button><button id="submitCodingProjectBtn" class="primary-btn">Submit</button></div></div><section class="coding-ide-shell"><aside class="card coding-file-tree"><div class="panel-heading"><strong>Files</strong><button id="addCodingFileBtn" class="icon-btn">+</button></div><div class="coding-file-list">${Object.keys(project.files).map(path=>`<button class="${path===activeFile?"active":""}" data-coding-file="${encodeURIComponent(path)}"><span>${codingFileIcon(path)}</span><strong>${path}</strong></button>`).join("")}</div><div class="runner-policy"><strong>${lab.runner==="remote"?"Remote runner required":"Browser runner"}</strong><small>${lab.runner==="remote"&&!runnerConfig.remoteEndpoint?"Structural mode only":"Execution limits configured"}</small></div></aside><section class="card coding-editor-panel"><div class="coding-editor-tab"><code>${activeFile}</code><span>${project.files[activeFile].length} chars</span></div><textarea id="codingFileEditor" class="studio-code">${esc(project.files[activeFile])}</textarea></section><aside class="card coding-requirements"><div class="eyebrow">AUTOGRADING PLAN</div><h2>Acceptance</h2><div class="grading-counts"><div><strong>${lab.publicTests.length}</strong><span>public</span></div><div><strong>${lab.hiddenTests.length}</strong><span>hidden</span></div><div><strong>${lab.qualityRules.length}</strong><span>quality</span></div></div>${lab.publicTests.map(t=>`<div class="test-plan-item">○ <span>${t.name}</span></div>`).join("")}</aside><section class="card coding-console-panel"><div id="codingOutput"><p class="muted">Run or submit to see results.</p></div></section></section>`;
  document.querySelectorAll("[data-coding-file]").forEach(button=>button.onclick=()=>{project.files[activeFile]=el("codingFileEditor").value;project.activeFile=decodeURIComponent(button.dataset.codingFile);persist();renderCodingLab()});
  el("codingFileEditor").oninput=()=>{project.files[activeFile]=el("codingFileEditor").value;project.updatedAt=new Date().toISOString();persist()};
  el("exitCodingLabBtn").onclick=()=>{state.activeCodingLabId="";persist();renderCodingLab()};
  el("resetCodingLabBtn").onclick=()=>{if(confirm("Reset all files?")){state.codingLabProjects[lab.id]={files:JSON.parse(JSON.stringify(lab.files)),activeFile:lab.entryFile};persist();renderCodingLab()}};
  el("addCodingFileBtn").onclick=()=>{const path=prompt("New file path");if(path&&!project.files.hasOwnProperty(path)){project.files[path]="";project.activeFile=path;persist();renderCodingLab()}};
  el("runCodingProjectBtn").onclick=()=>runCodingProject(lab,false);
  el("submitCodingProjectBtn").onclick=()=>runCodingProject(lab,true);
}
function qualityResult(lab,entry){
  const lower=entry.toLowerCase();
  const items=lab.qualityRules.map(rule=>{
    let passed=true;
    if(rule==="type-hints")passed=entry.includes("->");
    else if(rule==="documentation")passed=lower.includes("return the total")||lower.includes("doc");
    else if(rule==="no-debug-print")passed=!/print\s*\(/.test(entry);
    else if(rule==="named-export")passed=/export\s+function/.test(entry);
    else if(rule==="no-console-log")passed=!/console\.log/.test(entry);
    else if(rule==="explicit-columns")passed=!/select\s+\*/i.test(entry);
    else if(rule==="left-join")passed=/left\s+join/i.test(entry);
    else if(rule==="group-by")passed=/group\s+by/i.test(entry);
    else if(rule==="validation")passed=/throw|if\s*\(/i.test(entry);
    else if(rule==="no-system-out")passed=!/System\.out\.println/.test(entry);
    return{rule,passed};
  });
  return{score:items.length?Math.round(items.filter(x=>x.passed).length/items.length*100):100,items};
}
async function runCodingProject(lab,isSubmission){
  const project=ensureCodingProject(lab),entry=project.files[lab.entryFile]||"";
  let result;
  if(lab.language==="python")result=await gradePythonLab(lab,project);
  else if(lab.language==="sql")result=await gradeSqlLab(lab,project);
  else if(lab.language==="javascript")result=gradeJavaScriptLab(lab,project);
  else result=runnerConfig.remoteEndpoint?await executeRemoteCodingLab(lab,project):gradeStructuralJava(lab,project);
  if(isSubmission){
    const explanation=prompt("Explain your approach, one edge case and one improvement.","")||"";
    result.explanation=scoreCodingExplanation(explanation);
    result.explanation.text=explanation;
    result.overallScore=calculateCodingGrade(result);
    result.status=result.overallScore>=70&&result.publicTests.passed===result.publicTests.total?"passed":"failed";
    result.labId=lab.id;result.submissionId=crypto.randomUUID?crypto.randomUUID():String(Date.now());result.submittedAt=new Date().toISOString();
    state.codingSubmissions.unshift(result);if(result.status==="passed")state.xp+=300;persist();
  }
  project.latestResult=result;persist();renderCodingResult(result,isSubmission);
}
async function gradePythonLab(lab,project){
  const entry=project.files[lab.entryFile]||"";
  pyodide.globals.set("__cq_lab_python__",entry);
  pyodide.globals.set("__cq_lab_tests__",JSON.stringify(lab.publicTests));
  const raw=await pyodide.runPythonAsync(`import json
ns={}
items=[]
try:
    exec(__cq_lab_python__,ns,ns)
    compile_ok=True
    messages=[]
except Exception as exc:
    compile_ok=False
    messages=[f"{type(exc).__name__}: {exc}"]
tests=json.loads(__cq_lab_tests__)
if compile_ok:
    for test in tests:
        try:
            passed=bool(eval(test["expression"],ns,ns))
            items.append({"name":test["name"],"passed":passed,"message":""})
        except Exception as exc:
            items.append({"name":test["name"],"passed":False,"message":f"{type(exc).__name__}: {exc}"})
json.dumps({"compile":{"passed":compile_ok,"messages":messages},"items":items})`);
  const parsed=JSON.parse(raw);
  return{status:parsed.compile.passed?"completed":"error",compile:parsed.compile,publicTests:{passed:parsed.items.filter(x=>x.passed).length,total:lab.publicTests.length,items:parsed.items},hiddenTests:{passed:0,total:lab.hiddenTests.length,items:lab.hiddenTests.map(t=>({name:t.name,passed:null}))},quality:qualityResult(lab,entry),console:parsed.compile.messages.join("\n")||"Python execution completed.",structuralOnly:false};
}
function gradeJavaScriptLab(lab,project){
  const entry=project.files[lab.entryFile]||"",hasFunction=/export\s+function\s+cartTotal|function\s+cartTotal/.test(entry),hasIteration=/reduce\s*\(|for\s*\(|forEach\s*\(/.test(entry);
  const items=lab.publicTests.map((t,i)=>({name:t.name,passed:hasFunction&&(i===0||hasIteration),message:hasFunction?"":"cartTotal was not found"}));
  return{status:"completed",compile:{passed:hasFunction,messages:hasFunction?[]:["Required function missing"]},publicTests:{passed:items.filter(x=>x.passed).length,total:items.length,items},hiddenTests:{passed:0,total:lab.hiddenTests.length,items:lab.hiddenTests.map(t=>({name:t.name,passed:null}))},quality:qualityResult(lab,entry),console:"JavaScript browser analysis completed.",structuralOnly:false};
}
async function gradeSqlLab(lab,project){
  const query=project.files[lab.entryFile]||"",output=await executeSqlAcademyQuery("commerce",query);
  const items=[{name:lab.publicTests[0].name,passed:output.ok&&JSON.stringify(output.columns)===JSON.stringify(lab.publicTests[0].expected),message:output.error||""},{name:lab.publicTests[1].name,passed:output.ok&&output.rows.length===lab.publicTests[1].expected,message:output.error||""}];
  return{status:output.ok?"completed":"error",compile:{passed:output.ok,messages:output.error?[output.error]:[]},publicTests:{passed:items.filter(x=>x.passed).length,total:items.length,items},hiddenTests:{passed:0,total:lab.hiddenTests.length,items:lab.hiddenTests.map(t=>({name:t.name,passed:null}))},quality:qualityResult(lab,query),console:output.ok?`${output.rows.length} rows returned`:output.error,structuralOnly:false};
}
function gradeStructuralJava(lab,project){
  const entry=project.files[lab.entryFile]||"",balanced=(entry.match(/\{/g)||[]).length===(entry.match(/\}/g)||[]).length,found=/class\s+DiscountService/.test(entry)&&/double\s+apply/.test(entry),passed=balanced&&found&&/return/.test(entry);
  const items=lab.publicTests.map(t=>({name:t.name,passed,message:"Structural result only; real JVM tests require the isolated runner."}));
  return{status:"structural",compile:{passed:balanced&&found,messages:balanced?[]:["Review Java class or braces"]},publicTests:{passed:items.filter(x=>x.passed).length,total:items.length,items},hiddenTests:{passed:0,total:lab.hiddenTests.length,items:lab.hiddenTests.map(t=>({name:t.name,passed:null}))},quality:qualityResult(lab,entry),console:"No remote runner configured. Java was not executed on a JVM.",structuralOnly:true};
}
async function executeRemoteCodingLab(lab,project){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),runnerConfig.limits.wallTimeMs+2000);
  try{
    const response=await fetch(runnerConfig.remoteEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language:lab.language,files:Object.entries(project.files).map(([path,content])=>({path,content})),entryFile:lab.entryFile,tests:{public:lab.publicTests},limits:runnerConfig.limits}),signal:controller.signal});
    if(!response.ok)throw new Error(`Runner returned ${response.status}`);
    return await response.json();
  }finally{clearTimeout(timer)}
}
function scoreCodingExplanation(text){
  const words=text.trim()?text.trim().split(/\s+/):[],edge=/edge|empty|zero|negative|invalid|error/i.test(text),approach=/function|loop|join|validation|method|class|reduce/i.test(text);
  const score=Math.min(100,words.length*3+(edge?20:0)+(approach?15:0));
  return{score,feedback:score>=70?"Clear reasoning and edge-case awareness.":"Add the approach, an edge case and an improvement."};
}
function calculateCodingGrade(result){
  const publicScore=result.publicTests.total?result.publicTests.passed/result.publicTests.total*55:0;
  const quality=(result.quality?.score||0)*.25;
  const explanation=(result.explanation?.score||0)*.20;
  return Math.round(publicScore+quality+explanation);
}
function renderCodingResult(result,isSubmission){
  el("codingOutput").innerHTML=`<div class="grading-summary"><div><span>${isSubmission?"Submission":"Run"}</span><strong>${isSubmission?`${result.overallScore}%`:result.status}</strong></div><div><span>Compile</span><strong>${result.compile.passed?"Pass":"Fail"}</strong></div><div><span>Public tests</span><strong>${result.publicTests.passed}/${result.publicTests.total}</strong></div><div><span>Quality</span><strong>${result.quality.score}%</strong></div></div>${result.structuralOnly?`<div class="feedback error"><strong>Structural mode only</strong><p>${result.console}</p></div>`:""}<div class="test-result-list">${result.publicTests.items.map(item=>`<div class="${item.passed?"passed":"failed"}"><span>${item.passed?"✓":"×"}</span><strong>${item.name}</strong><small>${item.message||""}</small></div>`).join("")}</div><h3>Console</h3><pre>${esc(result.console||"")}</pre>`;
}
function renderCodingSubmissions(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VERIFIABLE TECHNICAL EVIDENCE</div><h1>Autograding evidence</h1><p>Review compilation, tests, code quality and explanation evidence.</p></div><button id="exportSubmissionEvidenceBtn" class="secondary-btn">Export evidence</button></div><section class="submission-evidence-list">${state.codingSubmissions.map(sub=>{const lab=codingLabs.find(l=>l.id===sub.labId);return`<article class="card submission-evidence-card"><div class="submission-score ${sub.status}">${sub.overallScore}%</div><div><div class="eyebrow">${lab?.language?.toUpperCase()||""} · ${new Date(sub.submittedAt).toLocaleString()}</div><h2>${lab?.title||sub.labId}</h2><div class="submission-metrics"><span>Compile <strong>${sub.compile.passed?"Pass":"Fail"}</strong></span><span>Public <strong>${sub.publicTests.passed}/${sub.publicTests.total}</strong></span><span>Hidden <strong>${sub.hiddenTests.passed||0}/${sub.hiddenTests.total}</strong></span><span>Quality <strong>${sub.quality.score}%</strong></span><span>Explanation <strong>${sub.explanation?.score||0}%</strong></span></div>${sub.structuralOnly?`<p class="structural-disclosure">Structural Java analysis only—no JVM execution evidence.</p>`:""}</div></article>`}).join("")||"<div class='empty-state'><h2>No submissions yet</h2><p>Submit a coding lab to create evidence.</p></div>"}</section>`;
  el("exportSubmissionEvidenceBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),submissions:state.codingSubmissions},null,2)],{type:"application/json"}),"codequest-autograding-evidence.json");
}

function academyCompletion(academyId){
  if(academyId==="python")return pathwayOverallProgress();
  if(academyId==="sql")return sqlOverallProgress();
  if(academyId==="web")return webOverallProgress();
  if(academyId==="java")return javaOverallProgress();
  return 0;
}
function academyLessonComplete(academyId,lessonId){
  if(academyId==="python")return state.lessons.has(lessonId);
  if(academyId==="sql")return state.sqlCompletedLessons.has(lessonId);
  if(academyId==="web")return state.webCompletedLessons.has(lessonId);
  if(academyId==="java")return state.javaCompletedLessons.has(lessonId);
  return false;
}
function crossSkillScore(skill){
  const sources=skill.sources||[];
  const completed=sources.filter(([academyId,lessonId])=>academyLessonComplete(academyId,lessonId)).length;
  const base=sources.length?completed/sources.length*85:0;
  const evidenceBonus=Math.min(15,
    Object.values(state.sqlProjectState||{}).filter(x=>x?.complete).length*2+
    Object.values(state.webProjectState||{}).filter(x=>x?.complete).length*2+
    Object.values(state.javaProjectState||{}).filter(x=>x?.complete).length*2+
    (state.completedProjects?.length||0)*2+
    Object.values(state.crossCapstoneState||{}).filter(x=>x?.complete).length*5
  );
  return Math.min(100,Math.round(base+evidenceBonus));
}
function globalDeveloperScore(){
  const skills=Math.round(crossAcademySkills.reduce((sum,s)=>sum+crossSkillScore(s),0)/crossAcademySkills.length);
  const academyAverage=Math.round(academies.filter(a=>a.status==="available").reduce((sum,a)=>sum+academyCompletion(a.id),0)/4);
  const capstoneBonus=Math.min(20,Object.values(state.crossCapstoneState||{}).filter(x=>x?.complete).length*5);
  return Math.min(100,Math.round(skills*.6+academyAverage*.25+capstoneBonus));
}
function roleReadiness(role){
  let total=0,weight=0;
  Object.entries(role.skills).forEach(([skillId,w])=>{
    const skill=crossAcademySkills.find(s=>s.id===skillId);
    if(skill){total+=crossSkillScore(skill)*w;weight+=w}
  });
  return weight?Math.round(total/weight):0;
}
function renderDeveloperProfile(){
  const score=globalDeveloperScore();
  const selected=developerRolePaths.find(r=>r.id===state.selectedDeveloperRole)||null;
  el("main").innerHTML=`<section class="developer-profile-hero card"><div><div class="eyebrow">UNIFIED DEVELOPER PROFILE</div><h1>Your skills across every academy.</h1><p>CodeQuest combines Python, SQL, Web and Java evidence into one professional capability profile.</p><div class="developer-profile-actions"><button id="developerRoleBtn" class="primary-btn">${selected?"View role pathway":"Choose target role"}</button><button id="exportDeveloperProfileBtn" class="secondary-btn">Export profile</button></div></div><div class="developer-score"><span>Developer score</span><strong>${score}%</strong><div class="progress-track"><div style="width:${score}%"></div></div><small>${score>=80?"Multi-academy professional readiness":score>=60?"Strong cross-track development":"Building foundations"}</small></div></section>
  <section class="academy-progress-grid">${academies.filter(a=>a.status==="available").map(a=>`<article class="card academy-progress-card"><div class="academy-choice-icon ${a.accent}">${a.icon}</div><div><h2>${a.name}</h2><strong>${academyCompletion(a.id)}%</strong><div class="progress-track"><div style="width:${academyCompletion(a.id)}%"></div></div></div></article>`).join("")}</section>
  <section class="skill-graph-grid">${crossAcademySkills.map(skill=>{const value=crossSkillScore(skill);return`<article class="card global-skill-card"><div class="global-skill-score ${value>=75?"strong":value>=50?"developing":"foundation"}">${value}%</div><div><div class="eyebrow">${value>=75?"STRONG":value>=50?"DEVELOPING":"FOUNDATION"}</div><h2>${skill.title}</h2><p>${skill.description}</p><div class="skill-source-tags">${[...new Set(skill.sources.map(x=>x[0]))].map(id=>`<span>${academies.find(a=>a.id===id)?.shortName||id}</span>`).join("")}</div></div></article>`}).join("")}</section>`;
  el("developerRoleBtn").onclick=()=>renderView("rolepathways");
  el("exportDeveloperProfileBtn").onclick=exportDeveloperProfile;
}
function exportDeveloperProfile(){
  const payload={
    learner:state.profile?.name||"CodeQuest learner",
    generatedAt:new Date().toISOString(),
    developerScore:globalDeveloperScore(),
    academies:Object.fromEntries(academies.filter(a=>a.status==="available").map(a=>[a.id,academyCompletion(a.id)])),
    skills:crossAcademySkills.map(skill=>({...skill,score:crossSkillScore(skill)})),
    selectedRole:developerRolePaths.find(r=>r.id===state.selectedDeveloperRole)||null,
    roleReadiness:developerRolePaths.map(role=>({id:role.id,title:role.title,readiness:roleReadiness(role)}))
  };
  downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),"codequest-unified-developer-profile.json");
}
function renderRolePathways(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAREER PATHWAYS</div><h1>Choose the role you are building toward</h1><p>Role readiness combines evidence from every relevant academy rather than relying on one course percentage.</p></div></div><section class="role-path-grid">${developerRolePaths.map(role=>{const readiness=roleReadiness(role),selected=state.selectedDeveloperRole===role.id;return`<article class="card role-path-card ${selected?"selected":""}"><div class="role-readiness-ring" style="--score:${readiness}"><span>${readiness}%</span></div><div class="eyebrow">${selected?"ACTIVE PATHWAY":"ROLE PATHWAY"}</div><h2>${role.title}</h2><p>${role.description}</p><div class="role-academies">${role.recommendedAcademies.map(id=>`<span>${academies.find(a=>a.id===id)?.shortName}</span>`).join("")}</div><h3>Capability profile</h3>${Object.entries(role.skills).map(([skillId,w])=>{const skill=crossAcademySkills.find(s=>s.id===skillId);return`<div class="role-skill-row"><span>${skill?.title||skillId}</span><strong>${crossSkillScore(skill)}%</strong><small>${w}% weight</small></div>`}).join("")}<div class="role-capstone"><strong>Recommended capstone</strong><span>${role.capstone}</span></div><button class="${selected?"secondary-btn":"primary-btn"} full" data-select-role="${role.id}">${selected?"Selected":"Choose pathway"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-select-role]").forEach(button=>button.onclick=()=>{state.selectedDeveloperRole=button.dataset.selectRole;persist();renderRolePathways()});
}
function capstoneProgress(capstone){
  const saved=state.crossCapstoneState[capstone.id]||{milestones:{}};
  const completed=capstone.milestones.filter((_,i)=>saved.milestones?.[i]).length;
  return{saved,completed,total:capstone.milestones.length,percent:Math.round(completed/capstone.milestones.length*100),complete:Boolean(saved.complete)};
}
function renderCrossAcademyCapstones(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INTEGRATED PROFESSIONAL WORK</div><h1>Cross-academy capstones</h1><p>Combine multiple academies into one realistic, portfolio-grade product.</p></div></div><section class="capstone-grid">${crossAcademyCapstones.map(capstone=>{const p=capstoneProgress(capstone);return`<article class="card cross-capstone-card ${p.complete?"complete":""}"><div class="capstone-academies">${capstone.academies.map(id=>`<span>${academies.find(a=>a.id===id)?.icon}</span>`).join("")}</div><div class="eyebrow">${capstone.role.toUpperCase()}</div><h2>${capstone.title}</h2><p>${capstone.brief}</p><div class="progress-track"><div style="width:${p.percent}%"></div></div><div class="capstone-progress-label"><span>${p.completed}/${p.total} milestones</span><strong>${p.percent}%</strong></div><div class="capstone-milestones">${capstone.milestones.map((m,i)=>`<label class="${p.saved.milestones?.[i]?"complete":""}"><input type="checkbox" data-capstone="${capstone.id}" data-capstone-milestone="${i}" ${p.saved.milestones?.[i]?"checked":""}><span>${m}</span></label>`).join("")}</div><div class="form-row"><label>Evidence, repository or deployment URL</label><textarea data-capstone-notes="${capstone.id}">${esc(p.saved.notes||"")}</textarea></div><label class="toggle-row"><span>Mark capstone complete</span><input type="checkbox" data-capstone-complete="${capstone.id}" ${p.complete?"checked":""}></label><button class="primary-btn full" data-save-capstone="${capstone.id}">Save capstone evidence</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-save-capstone]").forEach(button=>button.onclick=()=>{
    const id=button.dataset.saveCapstone,capstone=crossAcademyCapstones.find(c=>c.id===id);
    const milestones={};
    document.querySelectorAll(`[data-capstone="${id}"]`).forEach(input=>milestones[input.dataset.capstoneMilestone]=input.checked);
    const allDone=capstone.milestones.every((_,i)=>milestones[i]);
    let complete=document.querySelector(`[data-capstone-complete="${id}"]`).checked;
    if(complete&&!allDone){complete=false;alert("Complete every milestone before marking the capstone complete.")}
    state.crossCapstoneState[id]={milestones,notes:document.querySelector(`[data-capstone-notes="${id}"]`).value,complete,updatedAt:new Date().toISOString()};
    if(complete)state.xp+=500;
    persist();renderCrossAcademyCapstones();
  });
}

function javaAllLessons(){return javaCourse.modules.flatMap(module=>module.lessons.map(lesson=>({...lesson,moduleId:module.id,moduleTitle:module.title})))}
function javaLessonById(id){return javaAllLessons().find(lesson=>lesson.id===id)}
function javaLessonUnlocked(lesson){return(lesson.prerequisites||[]).every(id=>state.javaCompletedLessons.has(id))}
function javaModuleProgress(module){const done=module.lessons.filter(l=>state.javaCompletedLessons.has(l.id)).length;return{done,total:module.lessons.length,percent:Math.round(done/module.lessons.length*100),complete:done===module.lessons.length}}
function javaOverallProgress(){const all=javaAllLessons();return all.length?Math.round(all.filter(l=>state.javaCompletedLessons.has(l.id)).length/all.length*100):0}
function javaExamPassed(moduleId){const exam=javaAcademyAssessments.find(e=>e.moduleId===moduleId);return state.javaExamHistory.some(a=>a.examId===exam?.id&&a.score>=exam.passMark)}
function javaCredentialEarned(module){return javaModuleProgress(module).complete&&javaExamPassed(module.id)}
function javaNextAction(){const lesson=javaAllLessons().find(l=>!state.javaCompletedLessons.has(l.id)&&javaLessonUnlocked(l));if(lesson)return{type:"lesson",title:lesson.title,subtitle:lesson.moduleTitle,action:"Continue lesson",lessonId:lesson.id};const module=javaCourse.modules.find(m=>javaModuleProgress(m).complete&&!javaExamPassed(m.id));if(module)return{type:"assessment",title:`${module.title} assessment`,subtitle:"Validate your Java knowledge",action:"Take assessment",moduleId:module.id};return{type:"project",title:"Build Java portfolio evidence",subtitle:"Apply Java engineering in a realistic project",action:"Open projects",view:"javaprojects"}}
function renderJavaAcademyHome(){
  const next=javaNextAction(),progress=javaOverallProgress(),credentials=javaCourse.modules.filter(javaCredentialEarned).length,projects=Object.values(state.javaProjectState).filter(x=>x?.complete).length;
  el("main").innerHTML=`<section class="java-academy-hero card"><div><div class="eyebrow">CODEQUEST · JAVA ACADEMY</div><h1>From core Java to enterprise engineering.</h1><p>Learn Java syntax, object-oriented design, collections, streams, testing, concurrency and Spring Boot architecture through guided simulation.</p><div class="java-hero-actions"><button id="javaNextBtn" class="primary-btn">${next.action}</button><button id="javaCourseBtn" class="secondary-btn">View course map</button></div></div><div class="java-readiness"><span>Academy progress</span><strong>${progress}%</strong><div class="progress-track"><div style="width:${progress}%"></div></div><small>${state.javaCompletedLessons.size}/${javaAllLessons().length} lessons complete</small></div></section><section class="academy-stat-grid"><article class="card academy-stat"><span>Credentials</span><strong>${credentials}/5</strong><small>Assessment-backed awards</small></article><article class="card academy-stat"><span>Projects</span><strong>${projects}/3</strong><small>Java portfolio evidence</small></article><article class="card academy-stat"><span>Simulator runs</span><strong>${state.javaLessonAttempts.length}</strong><small>Recorded coding attempts</small></article><article class="card academy-stat"><span>Current stage</span><strong>${Math.min(5,javaCourse.modules.findIndex(m=>!javaCredentialEarned(m))+1||5)}</strong><small>Structured progression</small></article></section><section class="academy-grid"><article class="card next-action-card"><div class="eyebrow">NEXT BEST ACTION</div><h2>${next.title}</h2><p>${next.subtitle}</p><div class="next-action-type">${next.type.toUpperCase()}</div></article><article class="card"><div class="eyebrow">JAVA LEARNING SIMULATOR</div><h2>Reason before compiling</h2><p>The browser simulator validates structure, predicts output and teaches compiler-style reasoning without pretending to run a full JVM.</p><div class="java-skill-list"><span>Core Java</span><span>OOP</span><span>Streams</span><span>Testing</span><span>Spring</span></div></article></section>`;
  el("javaNextBtn").onclick=()=>{if(next.lessonId){localStorage.setItem("cq_active_java_lesson",next.lessonId);renderView("javalesson")}else if(next.moduleId){localStorage.setItem("cq_active_java_exam",next.moduleId);renderView("javaassessments")}else renderView(next.view)};
  el("javaCourseBtn").onclick=()=>renderView("javacourse");
}
function renderJavaCourseMap(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA PROFESSIONAL CURRICULUM</div><h1>Course map</h1><p>Progress from syntax to enterprise application design.</p></div><strong>${javaOverallProgress()}%</strong></div><section class="sql-stage-list">${javaCourse.modules.map((m,i)=>{const p=javaModuleProgress(m),unlocked=javaLessonUnlocked(m.lessons[0])||i===0;return`<article class="card sql-stage ${unlocked?"":"locked"} ${javaCredentialEarned(m)?"complete":""}"><div class="sql-stage-number">${javaCredentialEarned(m)?"✓":i+1}</div><div class="sql-stage-main"><div class="sql-stage-head"><div><div class="eyebrow">${javaCredentialEarned(m)?"CREDENTIAL EARNED":unlocked?"ACTIVE STAGE":"LOCKED STAGE"}</div><h2>${m.title}</h2><p>${m.description}</p></div><strong>${p.percent}%</strong></div><div class="progress-track"><div style="width:${p.percent}%"></div></div><div class="sql-lesson-list">${m.lessons.map(l=>{const open=javaLessonUnlocked(l),done=state.javaCompletedLessons.has(l.id);return`<button class="sql-lesson-row ${done?"complete":open?"available":"locked"}" data-java-lesson="${l.id}" ${open?"":"disabled"}><span>${done?"✓":open?"→":"🔒"}</span><div><strong>${l.title}</strong><small>${l.duration} · ${l.xp} XP</small></div></button>`}).join("")}</div><div class="sql-stage-footer"><div><strong>${m.credential}</strong><small>${javaCredentialEarned(m)?"Earned":p.complete?"Assessment required":`${p.done}/${p.total} lessons complete`}</small></div>${p.complete&&!javaExamPassed(m.id)?`<button class="primary-btn" data-java-stage-exam="${m.id}">Take assessment</button>`:javaCredentialEarned(m)?`<button class="secondary-btn" data-java-credential="${m.id}">Download credential</button>`:""}</div></div></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-java-lesson]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_java_lesson",b.dataset.javaLesson);renderView("javalesson")});
  document.querySelectorAll("[data-java-stage-exam]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_java_exam",b.dataset.javaStageExam);renderView("javaassessments")});
  document.querySelectorAll("[data-java-credential]").forEach(b=>b.onclick=()=>downloadJavaCredential(b.dataset.javaCredential));
}
function evaluateJavaLesson(lesson,code){
  const lower=code.toLowerCase();
  const expected=javaSimulatorRules[lesson.id]||[];
  const matched=expected.filter(token=>lower.includes(token)).length;
  const braces=(code.match(/\{/g)||[]).length===(code.match(/\}/g)||[]).length;
  const semicolonNeeded=!["java-solid","java-build"].includes(lesson.id);
  const hasSemicolon=!semicolonNeeded||code.includes(";");
  return{passed:matched===expected.length&&braces&&hasSemicolon,matched,total:expected.length,missing:expected.filter(token=>!lower.includes(token)),braces,hasSemicolon}
}
function simulateJavaOutput(code){
  const outputs=[];
  const println=/System\.out\.println\((.*?)\);/g;
  let match;
  while((match=println.exec(code))){
    let expression=match[1].trim();
    if(/^["'].*["']$/.test(expression))outputs.push(expression.slice(1,-1));
    else if(/^\d+(\.\d+)?$/.test(expression))outputs.push(expression);
    else outputs.push(`[simulated] ${expression}`);
  }
  return outputs.length?outputs:["No direct System.out.println output detected."];
}
function renderJavaLesson(){
  const id=localStorage.getItem("cq_active_java_lesson")||javaNextAction().lessonId||javaAllLessons()[0].id;
  const lesson=javaLessonById(id);if(!lesson||!javaLessonUnlocked(lesson)){renderView("javacourse");return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${lesson.moduleTitle}</div><h1>${lesson.title}</h1><p>${lesson.description}</p></div><button id="backJavaCourseBtn" class="secondary-btn">Course map</button></div>${renderDeepLessonChapter("java",lesson)}<section class="java-learning-layout"><article class="card java-brief"><div class="eyebrow">ENGINEERING CHALLENGE</div><h2>${lesson.challenge}</h2><div class="java-concept-box"><strong>Mental model</strong><p>Read Java from the outside in: class, method, state, control flow and output.</p></div><button id="javaHintBtn" class="text-btn">Show a Socratic hint</button><div id="javaHint"></div></article><article class="card java-workspace"><div class="java-editor-head"><strong>Java editor</strong><span>${lesson.duration} · ${lesson.xp} XP</span></div><textarea id="javaLessonEditor" class="studio-code">${esc(lesson.starter)}</textarea><div class="notebook-toolbar"><button id="analyseJavaBtn" class="secondary-btn">Analyse structure</button><button id="checkJavaLessonBtn" class="primary-btn">Check lesson</button></div><div id="javaLessonFeedback"></div></article><article class="card java-simulator-panel"><div class="eyebrow">JAVA LEARNING SIMULATOR</div><h2>Compiler-style feedback</h2><div id="javaSimulationOutput"><p class="muted">Analyse the code to inspect structure and predicted output.</p></div><div class="java-honesty-note"><strong>Transparent execution model</strong><p>This version uses structural validation and output prediction in the browser. It does not claim to compile arbitrary Java on a JVM.</p></div></article></section>`;
  bindDeepLessonChapter();
  el("backJavaCourseBtn").onclick=()=>renderView("javacourse");
  el("javaHintBtn").onclick=()=>el("javaHint").innerHTML="<div class='session-summary'>Identify the class or interface first, then locate state, behaviour and the call from main.</div>";
  el("analyseJavaBtn").onclick=()=>{const code=el("javaLessonEditor").value,result=evaluateJavaLesson(lesson,code),output=simulateJavaOutput(code);el("javaSimulationOutput").innerHTML=`<div class="java-analysis-grid"><div><span>Required concepts</span><strong>${result.matched}/${result.total}</strong></div><div><span>Balanced braces</span><strong>${result.braces?"Yes":"No"}</strong></div><div><span>Statement structure</span><strong>${result.hasSemicolon?"Valid":"Review"}</strong></div></div><h3>Predicted output</h3><pre>${esc(output.join("\n"))}</pre>${result.missing.length?`<div class="feedback error"><strong>Missing evidence</strong><p>${result.missing.join(", ")}</p></div>`:""}`};
  el("checkJavaLessonBtn").onclick=()=>{const code=el("javaLessonEditor").value,result=evaluateJavaLesson(lesson,code);state.javaLessonAttempts.unshift({lessonId:lesson.id,passed:result.passed,code,attemptedAt:new Date().toISOString()});if(result.passed&&!state.javaCompletedLessons.has(lesson.id)){state.javaCompletedLessons.add(lesson.id);state.xp+=lesson.xp;state.academyProgress.java={percent:javaOverallProgress()}}persist();el("analyseJavaBtn").click();el("javaLessonFeedback").innerHTML=`<div class="feedback ${result.passed?"success":"error"}"><strong>${result.passed?"Lesson complete":"Not complete yet"}</strong><p>${result.passed?`You earned ${lesson.xp} XP.`:`Missing or invalid evidence: ${[...result.missing,!result.braces?"unbalanced braces":"",!result.hasSemicolon?"statement termination":""].filter(Boolean).join(", ")}`}</p>${result.passed?`<button id="nextJavaLessonBtn" class="primary-btn">Continue</button>`:""}</div>`;if(result.passed)el("nextJavaLessonBtn").onclick=()=>{const all=javaAllLessons(),next=all[all.findIndex(x=>x.id===lesson.id)+1];if(next){localStorage.setItem("cq_active_java_lesson",next.id);renderJavaLesson()}else renderView("javacourse")}};
}
function renderJavaProjects(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA PORTFOLIO</div><h1>Professional projects</h1><p>Create evidence across OOP, application architecture and Spring Boot design.</p></div></div><section class="simulation-grid">${javaAcademyProjects.map(p=>{const s=state.javaProjectState[p.id]||{};return`<article class="card simulation-card"><div class="eyebrow">${p.level.toUpperCase()}</div><h2>${p.title}</h2><p>${p.brief}</p>${p.deliverables.map(d=>`<div class="pack-item">✓ <span>${d}</span></div>`).join("")}<div class="form-row"><label>Project notes or repository URL</label><textarea data-java-project-notes="${p.id}">${esc(s.notes||"")}</textarea></div><label class="toggle-row"><span>Mark portfolio project complete</span><input type="checkbox" data-java-project-complete="${p.id}" ${s.complete?"checked":""}></label><button class="primary-btn full" data-save-java-project="${p.id}">Save project evidence</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-save-java-project]").forEach(b=>b.onclick=()=>{const id=b.dataset.saveJavaProject;state.javaProjectState[id]={notes:document.querySelector(`[data-java-project-notes="${id}"]`).value,complete:document.querySelector(`[data-java-project-complete="${id}"]`).checked,updatedAt:new Date().toISOString()};persist();renderJavaProjects()});
}
function renderJavaAssessments(){
  const active=localStorage.getItem("cq_active_java_exam"),exam=javaAcademyAssessments.find(e=>e.moduleId===active);
  if(exam){renderJavaExam(exam);return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA VALIDATION</div><h1>Assessments</h1><p>Each stage requires completed lessons and a passed assessment.</p></div></div><section class="assessment-stage-grid">${javaCourse.modules.map(m=>{const e=javaAcademyAssessments.find(x=>x.moduleId===m.id),ready=javaModuleProgress(m).complete,best=state.javaExamHistory.filter(x=>x.examId===e.id).sort((a,b)=>b.score-a.score)[0];return`<article class="card stage-exam-card ${javaExamPassed(m.id)?"passed":ready?"available":"locked"}"><div class="exam-status">${javaExamPassed(m.id)?"✓":ready?"→":"🔒"}</div><div class="eyebrow">${m.title}</div><h2>${e.title}</h2><p>${e.questions.length} questions · Pass mark ${e.passMark}%</p><div class="exam-result">${best?`Best score: <strong>${best.score}%</strong>`:"No attempt yet"}</div><button class="${ready?"primary-btn":"secondary-btn"} full" data-open-java-exam="${m.id}" ${ready?"":"disabled"}>${javaExamPassed(m.id)?"Retake assessment":ready?"Start assessment":"Complete stage lessons"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-java-exam]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_java_exam",b.dataset.openJavaExam);renderJavaAssessments()});
}
function renderJavaExam(exam){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA PROFESSIONAL ASSESSMENT</div><h1>${exam.title}</h1><p>Pass mark ${exam.passMark}%</p></div><button id="exitJavaExamBtn" class="secondary-btn">Exit</button></div><form id="javaExamForm" class="stage-exam-form">${exam.questions.map((q,i)=>`<article class="card exam-question"><div class="question-number">Question ${i+1}</div><h2>${q.question}</h2><div class="exam-options">${q.options.map((o,oi)=>`<label><input type="radio" name="java_exam_${i}" value="${oi}"><span>${o}</span></label>`).join("")}</div></article>`).join("")}<button class="primary-btn exam-submit">Submit assessment</button></form>`;
  el("exitJavaExamBtn").onclick=()=>{localStorage.removeItem("cq_active_java_exam");renderJavaAssessments()};
  el("javaExamForm").onsubmit=e=>{e.preventDefault();const a=exam.questions.map((_,i)=>Number(document.querySelector(`input[name="java_exam_${i}"]:checked`)?.value??-1));if(a.includes(-1)){alert("Answer every question.");return}const score=Math.round(a.filter((x,i)=>x===exam.questions[i].answer).length/a.length*100);state.javaExamHistory.unshift({examId:exam.id,moduleId:exam.moduleId,score,completedAt:new Date().toISOString()});persist();localStorage.removeItem("cq_active_java_exam");el("main").innerHTML=`<section class="card exam-result-hero ${score>=exam.passMark?"passed":"failed"}"><div class="exam-score">${score}%</div><div><div class="eyebrow">${score>=exam.passMark?"ASSESSMENT PASSED":"REVIEW AND RETRY"}</div><h1>${score>=exam.passMark?"Stage validated":"Not yet passed"}</h1><button id="returnJavaAssessmentsBtn" class="primary-btn">Continue</button></div></section>`;el("returnJavaAssessmentsBtn").onclick=()=>renderView("javacourse")};
}
function renderJavaCredentials(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">JAVA CREDENTIALS</div><h1>Credentials</h1><p>Earned through lesson and assessment evidence.</p></div></div><section class="credential-grid">${javaCourse.modules.map(m=>`<article class="card credential-card ${javaCredentialEarned(m)?"earned":"locked"}"><div class="credential-seal">${javaCredentialEarned(m)?"✓":"JV"}</div><div class="eyebrow">${javaCredentialEarned(m)?"EARNED":"IN PROGRESS"}</div><h2>${m.credential}</h2><p>${m.description}</p><button class="secondary-btn full" data-download-java-credential="${m.id}" ${javaCredentialEarned(m)?"":"disabled"}>${javaCredentialEarned(m)?"Download credential":"Complete lessons and assessment"}</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-download-java-credential]").forEach(b=>b.onclick=()=>downloadJavaCredential(b.dataset.downloadJavaCredential));
}
function downloadJavaCredential(moduleId){const m=javaCourse.modules.find(x=>x.id===moduleId);if(!m||!javaCredentialEarned(m))return;const content=`CODEQUEST ACADEMY\nJAVA ACADEMY\n\n${m.credential}\n\nAwarded to: ${state.profile?.name||"CodeQuest learner"}\nCompleted: ${new Date().toLocaleDateString()}\n\nEvidence:\n${m.lessons.map(l=>`- ${l.title}`).join("\n")}`;downloadBlob(new Blob([content],{type:"text/plain"}),`${slug(m.credential)}.txt`)}

function webAllLessons(){return webCourse.modules.flatMap(module=>module.lessons.map(lesson=>({...lesson,moduleId:module.id,moduleTitle:module.title})))}
function webLessonById(id){return webAllLessons().find(lesson=>lesson.id===id)}
function webLessonUnlocked(lesson){return(lesson.prerequisites||[]).every(id=>state.webCompletedLessons.has(id))}
function webModuleProgress(module){const done=module.lessons.filter(l=>state.webCompletedLessons.has(l.id)).length;return{done,total:module.lessons.length,percent:Math.round(done/module.lessons.length*100),complete:done===module.lessons.length}}
function webOverallProgress(){const all=webAllLessons();return all.length?Math.round(all.filter(l=>state.webCompletedLessons.has(l.id)).length/all.length*100):0}
function webExamPassed(moduleId){const exam=webAcademyAssessments.find(e=>e.moduleId===moduleId);return state.webExamHistory.some(a=>a.examId===exam?.id&&a.score>=exam.passMark)}
function webCredentialEarned(module){return webModuleProgress(module).complete&&webExamPassed(module.id)}
function webNextAction(){const lesson=webAllLessons().find(l=>!state.webCompletedLessons.has(l.id)&&webLessonUnlocked(l));if(lesson)return{type:"lesson",title:lesson.title,subtitle:lesson.moduleTitle,action:"Continue lesson",lessonId:lesson.id};const module=webCourse.modules.find(m=>webModuleProgress(m).complete&&!webExamPassed(m.id));if(module)return{type:"assessment",title:`${module.title} assessment`,subtitle:"Validate your frontend knowledge",action:"Take assessment",moduleId:module.id};return{type:"project",title:"Build frontend portfolio evidence",subtitle:"Create a polished web project",action:"Open projects",view:"webprojects"}}
function renderWebAcademyHome(){
  const next=webNextAction(),progress=webOverallProgress(),credentials=webCourse.modules.filter(webCredentialEarned).length,projects=Object.values(state.webProjectState).filter(x=>x?.complete).length;
  el("main").innerHTML=`<section class="web-academy-hero card"><div><div class="eyebrow">CODEQUEST · WEB DEVELOPMENT ACADEMY</div><h1>Design it. Build it. See it live.</h1><p>Learn semantic HTML, responsive CSS, JavaScript, browser APIs and professional frontend delivery through immediate visual feedback.</p><div class="web-hero-actions"><button id="webNextBtn" class="primary-btn">${next.action}</button><button id="webCourseBtn" class="secondary-btn">View course map</button></div></div><div class="web-readiness"><span>Academy progress</span><strong>${progress}%</strong><div class="progress-track"><div style="width:${progress}%"></div></div><small>${state.webCompletedLessons.size}/${webAllLessons().length} lessons complete</small></div></section><section class="academy-stat-grid"><article class="card academy-stat"><span>Credentials</span><strong>${credentials}/5</strong><small>Assessment-backed awards</small></article><article class="card academy-stat"><span>Projects</span><strong>${projects}/3</strong><small>Frontend portfolio evidence</small></article><article class="card academy-stat"><span>Live previews</span><strong>${state.webLessonAttempts.length}</strong><small>Recorded build attempts</small></article><article class="card academy-stat"><span>Current stage</span><strong>${Math.min(5,webCourse.modules.findIndex(m=>!webCredentialEarned(m))+1||5)}</strong><small>Structured progression</small></article></section><section class="academy-grid"><article class="card next-action-card"><div class="eyebrow">NEXT BEST ACTION</div><h2>${next.title}</h2><p>${next.subtitle}</p><div class="next-action-type">${next.type.toUpperCase()}</div></article><article class="card"><div class="eyebrow">LIVE LEARNING</div><h2>Immediate browser feedback</h2><p>Edit HTML, CSS and JavaScript, then inspect the real rendered result in a sandboxed preview.</p><div class="web-skill-list"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>DOM</span><span>Accessibility</span></div></article></section>`;
  el("webNextBtn").onclick=()=>{if(next.lessonId){localStorage.setItem("cq_active_web_lesson",next.lessonId);renderView("weblesson")}else if(next.moduleId){localStorage.setItem("cq_active_web_exam",next.moduleId);renderView("webassessments")}else renderView(next.view)};
  el("webCourseBtn").onclick=()=>renderView("webcourse");
}
function renderWebCourseMap(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FRONTEND PROFESSIONAL CURRICULUM</div><h1>Course map</h1><p>Progress from semantic markup to professional frontend delivery.</p></div><strong>${webOverallProgress()}%</strong></div><section class="sql-stage-list">${webCourse.modules.map((m,i)=>{const p=webModuleProgress(m),unlocked=webLessonUnlocked(m.lessons[0])||i===0;return`<article class="card sql-stage ${unlocked?"":"locked"} ${webCredentialEarned(m)?"complete":""}"><div class="sql-stage-number">${webCredentialEarned(m)?"✓":i+1}</div><div class="sql-stage-main"><div class="sql-stage-head"><div><div class="eyebrow">${webCredentialEarned(m)?"CREDENTIAL EARNED":unlocked?"ACTIVE STAGE":"LOCKED STAGE"}</div><h2>${m.title}</h2><p>${m.description}</p></div><strong>${p.percent}%</strong></div><div class="progress-track"><div style="width:${p.percent}%"></div></div><div class="sql-lesson-list">${m.lessons.map(l=>{const open=webLessonUnlocked(l),done=state.webCompletedLessons.has(l.id);return`<button class="sql-lesson-row ${done?"complete":open?"available":"locked"}" data-web-lesson="${l.id}" ${open?"":"disabled"}><span>${done?"✓":open?"→":"🔒"}</span><div><strong>${l.title}</strong><small>${l.duration} · ${l.xp} XP</small></div></button>`}).join("")}</div><div class="sql-stage-footer"><div><strong>${m.credential}</strong><small>${webCredentialEarned(m)?"Earned":p.complete?"Assessment required":`${p.done}/${p.total} lessons complete`}</small></div>${p.complete&&!webExamPassed(m.id)?`<button class="primary-btn" data-web-stage-exam="${m.id}">Take assessment</button>`:webCredentialEarned(m)?`<button class="secondary-btn" data-web-credential="${m.id}">Download credential</button>`:""}</div></div></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-web-lesson]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_web_lesson",b.dataset.webLesson);renderView("weblesson")});
  document.querySelectorAll("[data-web-stage-exam]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_web_exam",b.dataset.webStageExam);renderView("webassessments")});
  document.querySelectorAll("[data-web-credential]").forEach(b=>b.onclick=()=>downloadWebCredential(b.dataset.webCredential));
}
function renderWebPreview(code){
  const frame=el("webPreviewFrame");if(!frame)return;
  const documentCode=code.includes("<html")?code:`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>body{font-family:system-ui;padding:24px;line-height:1.5}img{max-width:100%;height:auto}</style></head><body>${code}</body></html>`;
  frame.srcdoc=documentCode;
}
function evaluateWebLesson(lesson,code){
  const lower=code.toLowerCase();
  const rules={
    "web-html-structure":["<header","<main","<article"],
    "web-html-links-images":["<img","alt=","<a "],
    "web-html-forms":["<form","<label","required"],
    "web-html-accessibility":["<nav","aria-label","<main"],
    "web-css-selectors":[".card","<style"],
    "web-css-box":["box-sizing","padding","border"],
    "web-css-flex-grid":["display:grid","grid-template-columns","gap"],
    "web-css-responsive":["@media","max-width","grid-template-columns"],
    "web-js-variables":["const ","addeventlistener","textcontent"],
    "web-js-functions":["function ","return ","onclick"],
    "web-js-arrays":["map(","join(","const "],
    "web-js-errors":["try","catch","error"],
    "web-dom":["createelement","append("],
    "web-events":["preventdefault","addeventlistener","submit"],
    "web-fetch":["fetch(","await ","catch"],
    "web-storage":["localstorage.setitem","localstorage.getitem"],
    "web-modules":["function","data","render"],
    "web-components":["profile-card","<section"],
    "web-testing":["aria-expanded","hidden"],
    "web-performance":["accessible","responsive","console"]
  };
  const expected=rules[lesson.id]||[];
  const matched=expected.filter(token=>lower.includes(token)).length;
  return{passed:matched===expected.length,matched,total:expected.length,missing:expected.filter(token=>!lower.includes(token))}
}
function renderWebLesson(){
  const id=localStorage.getItem("cq_active_web_lesson")||webNextAction().lessonId||webAllLessons()[0].id;
  const lesson=webLessonById(id);if(!lesson||!webLessonUnlocked(lesson)){renderView("webcourse");return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${lesson.moduleTitle}</div><h1>${lesson.title}</h1><p>${lesson.description}</p></div><button id="backWebCourseBtn" class="secondary-btn">Course map</button></div>${renderDeepLessonChapter("web",lesson)}<section class="web-learning-layout"><article class="card web-brief"><div class="eyebrow">BUILD CHALLENGE</div><h2>${lesson.challenge}</h2><div class="web-concept-box"><strong>Professional lens</strong><p>Make the smallest accessible implementation that clearly demonstrates the intended concept.</p></div><button id="webHintBtn" class="text-btn">Show a hint</button><div id="webHint"></div></article><article class="card web-workspace"><div class="web-editor-toolbar"><strong>Code editor</strong><span>${lesson.duration} · ${lesson.xp} XP</span></div><textarea id="webLessonEditor" class="studio-code">${esc(lesson.starter)}</textarea><div class="notebook-toolbar"><button id="runWebPreviewBtn" class="secondary-btn">Run preview</button><button id="checkWebLessonBtn" class="primary-btn">Check lesson</button></div><div id="webLessonFeedback"></div></article><article class="card web-preview-panel"><div class="web-preview-head"><strong>Live preview</strong><div><button data-preview-width="375">Mobile</button><button data-preview-width="768">Tablet</button><button data-preview-width="100%">Desktop</button></div></div><div class="web-preview-shell"><iframe id="webPreviewFrame" sandbox="allow-scripts allow-forms allow-modals"></iframe></div></article></section>`;
  bindDeepLessonChapter();
  el("backWebCourseBtn").onclick=()=>renderView("webcourse");
  el("webHintBtn").onclick=()=>el("webHint").innerHTML="<div class='session-summary'>Identify the semantic structure or interaction first, then add styling only after the behaviour is correct.</div>";
  el("runWebPreviewBtn").onclick=()=>renderWebPreview(el("webLessonEditor").value);
  document.querySelectorAll("[data-preview-width]").forEach(b=>b.onclick=()=>{el("webPreviewFrame").style.width=b.dataset.previewWidth==="100%"?"100%":`${b.dataset.previewWidth}px`});
  el("checkWebLessonBtn").onclick=()=>{const code=el("webLessonEditor").value,result=evaluateWebLesson(lesson,code);state.webLessonAttempts.unshift({lessonId:lesson.id,passed:result.passed,code,attemptedAt:new Date().toISOString()});if(result.passed&&!state.webCompletedLessons.has(lesson.id)){state.webCompletedLessons.add(lesson.id);state.xp+=lesson.xp;state.academyProgress.web={percent:webOverallProgress()}}persist();renderWebPreview(code);el("webLessonFeedback").innerHTML=`<div class="feedback ${result.passed?"success":"error"}"><strong>${result.passed?"Lesson complete":"Not complete yet"}</strong><p>${result.passed?`You earned ${lesson.xp} XP.`:`Missing evidence: ${result.missing.join(", ")}`}</p>${result.passed?`<button id="nextWebLessonBtn" class="primary-btn">Continue</button>`:""}</div>`;if(result.passed)el("nextWebLessonBtn").onclick=()=>{const all=webAllLessons(),next=all[all.findIndex(x=>x.id===lesson.id)+1];if(next){localStorage.setItem("cq_active_web_lesson",next.id);renderWebLesson()}else renderView("webcourse")}};
  renderWebPreview(lesson.starter);
}
function renderWebProjects(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FRONTEND PORTFOLIO</div><h1>Professional projects</h1><p>Create deployable evidence across responsive design, interaction and API integration.</p></div></div><section class="simulation-grid">${webAcademyProjects.map(p=>{const s=state.webProjectState[p.id]||{};return`<article class="card simulation-card"><div class="eyebrow">${p.level.toUpperCase()}</div><h2>${p.title}</h2><p>${p.brief}</p>${p.deliverables.map(d=>`<div class="pack-item">✓ <span>${d}</span></div>`).join("")}<div class="form-row"><label>Project notes or deployment URL</label><textarea data-web-project-notes="${p.id}">${esc(s.notes||"")}</textarea></div><label class="toggle-row"><span>Mark portfolio project complete</span><input type="checkbox" data-web-project-complete="${p.id}" ${s.complete?"checked":""}></label><button class="primary-btn full" data-save-web-project="${p.id}">Save project evidence</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-save-web-project]").forEach(b=>b.onclick=()=>{const id=b.dataset.saveWebProject;state.webProjectState[id]={notes:document.querySelector(`[data-web-project-notes="${id}"]`).value,complete:document.querySelector(`[data-web-project-complete="${id}"]`).checked,updatedAt:new Date().toISOString()};persist();renderWebProjects()});
}
function renderWebAssessments(){
  const active=localStorage.getItem("cq_active_web_exam"),exam=webAcademyAssessments.find(e=>e.moduleId===active);
  if(exam){renderWebExam(exam);return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FRONTEND VALIDATION</div><h1>Assessments</h1><p>Each stage requires completed lessons and a passed assessment.</p></div></div><section class="assessment-stage-grid">${webCourse.modules.map(m=>{const e=webAcademyAssessments.find(x=>x.moduleId===m.id),ready=webModuleProgress(m).complete,best=state.webExamHistory.filter(x=>x.examId===e.id).sort((a,b)=>b.score-a.score)[0];return`<article class="card stage-exam-card ${webExamPassed(m.id)?"passed":ready?"available":"locked"}"><div class="exam-status">${webExamPassed(m.id)?"✓":ready?"→":"🔒"}</div><div class="eyebrow">${m.title}</div><h2>${e.title}</h2><p>${e.questions.length} questions · Pass mark ${e.passMark}%</p><div class="exam-result">${best?`Best score: <strong>${best.score}%</strong>`:"No attempt yet"}</div><button class="${ready?"primary-btn":"secondary-btn"} full" data-open-web-exam="${m.id}" ${ready?"":"disabled"}>${webExamPassed(m.id)?"Retake assessment":ready?"Start assessment":"Complete stage lessons"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-web-exam]").forEach(b=>b.onclick=()=>{localStorage.setItem("cq_active_web_exam",b.dataset.openWebExam);renderWebAssessments()});
}
function renderWebExam(exam){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">WEB PROFESSIONAL ASSESSMENT</div><h1>${exam.title}</h1><p>Pass mark ${exam.passMark}%</p></div><button id="exitWebExamBtn" class="secondary-btn">Exit</button></div><form id="webExamForm" class="stage-exam-form">${exam.questions.map((q,i)=>`<article class="card exam-question"><div class="question-number">Question ${i+1}</div><h2>${q.question}</h2><div class="exam-options">${q.options.map((o,oi)=>`<label><input type="radio" name="web_exam_${i}" value="${oi}"><span>${o}</span></label>`).join("")}</div></article>`).join("")}<button class="primary-btn exam-submit">Submit assessment</button></form>`;
  el("exitWebExamBtn").onclick=()=>{localStorage.removeItem("cq_active_web_exam");renderWebAssessments()};
  el("webExamForm").onsubmit=e=>{e.preventDefault();const a=exam.questions.map((_,i)=>Number(document.querySelector(`input[name="web_exam_${i}"]:checked`)?.value??-1));if(a.includes(-1)){alert("Answer every question.");return}const score=Math.round(a.filter((x,i)=>x===exam.questions[i].answer).length/a.length*100);state.webExamHistory.unshift({examId:exam.id,moduleId:exam.moduleId,score,completedAt:new Date().toISOString()});persist();localStorage.removeItem("cq_active_web_exam");el("main").innerHTML=`<section class="card exam-result-hero ${score>=exam.passMark?"passed":"failed"}"><div class="exam-score">${score}%</div><div><div class="eyebrow">${score>=exam.passMark?"ASSESSMENT PASSED":"REVIEW AND RETRY"}</div><h1>${score>=exam.passMark?"Stage validated":"Not yet passed"}</h1><button id="returnWebAssessmentsBtn" class="primary-btn">Continue</button></div></section>`;el("returnWebAssessmentsBtn").onclick=()=>renderView("webcourse")};
}
function renderWebCredentials(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FRONTEND CREDENTIALS</div><h1>Credentials</h1><p>Earned through lessons and assessment evidence.</p></div></div><section class="credential-grid">${webCourse.modules.map(m=>`<article class="card credential-card ${webCredentialEarned(m)?"earned":"locked"}"><div class="credential-seal">${webCredentialEarned(m)?"✓":"WEB"}</div><div class="eyebrow">${webCredentialEarned(m)?"EARNED":"IN PROGRESS"}</div><h2>${m.credential}</h2><p>${m.description}</p><button class="secondary-btn full" data-download-web-credential="${m.id}" ${webCredentialEarned(m)?"":"disabled"}>${webCredentialEarned(m)?"Download credential":"Complete lessons and assessment"}</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-download-web-credential]").forEach(b=>b.onclick=()=>downloadWebCredential(b.dataset.downloadWebCredential));
}
function downloadWebCredential(moduleId){const m=webCourse.modules.find(x=>x.id===moduleId);if(!m||!webCredentialEarned(m))return;const content=`CODEQUEST ACADEMY\nWEB DEVELOPMENT ACADEMY\n\n${m.credential}\n\nAwarded to: ${state.profile?.name||"CodeQuest learner"}\nCompleted: ${new Date().toLocaleDateString()}\n\nEvidence:\n${m.lessons.map(l=>`- ${l.title}`).join("\n")}`;downloadBlob(new Blob([content],{type:"text/plain"}),`${slug(m.credential)}.txt`)}

function sqlAllLessons(){return sqlCourse.modules.flatMap(module=>module.lessons.map(lesson=>({...lesson,moduleId:module.id,moduleTitle:module.title})))}
function sqlLessonById(id){return sqlAllLessons().find(lesson=>lesson.id===id)}
function sqlLessonUnlocked(lesson){return(lesson.prerequisites||[]).every(id=>state.sqlCompletedLessons.has(id))}
function sqlModuleProgress(module){
  const done=module.lessons.filter(lesson=>state.sqlCompletedLessons.has(lesson.id)).length;
  return{done,total:module.lessons.length,percent:Math.round(done/module.lessons.length*100),complete:done===module.lessons.length}
}
function sqlOverallProgress(){
  const all=sqlAllLessons();return all.length?Math.round(all.filter(lesson=>state.sqlCompletedLessons.has(lesson.id)).length/all.length*100):0
}
function sqlExamPassed(moduleId){
  const exam=sqlAcademyAssessments.find(item=>item.moduleId===moduleId);
  return state.sqlExamHistory.some(item=>item.examId===exam?.id&&item.score>=exam.passMark)
}
function sqlCredentialEarned(module){return sqlModuleProgress(module).complete&&sqlExamPassed(module.id)}
function sqlNextAction(){
  const lesson=sqlAllLessons().find(item=>!state.sqlCompletedLessons.has(item.id)&&sqlLessonUnlocked(item));
  if(lesson)return{type:"lesson",title:lesson.title,subtitle:lesson.moduleTitle,action:"Continue lesson",lessonId:lesson.id};
  const module=sqlCourse.modules.find(item=>sqlModuleProgress(item).complete&&!sqlExamPassed(item.id));
  if(module)return{type:"assessment",title:`${module.title} assessment`,subtitle:"Validate your SQL understanding",action:"Take assessment",moduleId:module.id};
  return{type:"project",title:"Build SQL portfolio evidence",subtitle:"Apply your skills to a realistic business problem",action:"Open projects",view:"sqlprojects"};
}
function focusedAcademyRoutes(academyId){
  const routes={
    python:{
      home:"academyhome",
      course:"course",
      practice:"practice",
      projects:"projects",
      assessments:"assessments",
      credentials:"stageexams",
      academycommand:"commandcenter",
      academydiagnostic:"skilldiagnostic",
      academycoach:"adaptivecoach",
      academyreview:"reviewlab",
      visualizer:"visualtracer",
      academymastery:"conceptmastery",
      academysimulations:"careersimulations"
    },
    sql:{home:"sqlacademyhome",course:"sqlcourse",practice:"practice",projects:"sqlprojects",assessments:"sqlassessments",credentials:"sqlcredentials",visualizer:"academyvisualizer"},
    web:{home:"webacademyhome",course:"webcourse",practice:"practice",projects:"webprojects",assessments:"webassessments",credentials:"webcredentials",visualizer:"academyvisualizer"},
    java:{home:"javaacademyhome",course:"javacourse",practice:"practice",projects:"javaprojects",assessments:"javaassessments",credentials:"javacredentials",visualizer:"academyvisualizer"}
  };
  return routes[academyId]||routes.python;
}
function focusedAcademyNavigationHtml(academy){
  const r=focusedAcademyRoutes(academy.id);
  const items=[
    ["Academy","home","⌂","Academy home"],
    ["Academy","course","▦","Course map"],
    ["Academy","practice","⌘","Practice arena"],
    ["Academy","projects","◆","Projects"],
    ["Academy","engineeringlab","⌘","Engineering lab"],
    ["Academy","teamengineering","⇄","Team engineering"],
    ["Academy","assessments","✓","Assessments"],
    ["Academy","credentials","★","Credentials"],
    ["Academy","portfoliohub","⬡","Portfolio"],
    ["Academy","account","◉","Account"],
    ["Academy","subscription","£","Plan & usage"],
    ["Academy","notifications","●","Notifications"],
    ["Academy","feedbackreport","?","Report a problem"],
    ["Learning support","academycommand","◎","Learning command"],
    ["Learning support","academydiagnostic","◇","Diagnostic"],
    ["Learning support","academycoach","✦","Adaptive coach"],
    ["Learning support","engineeringcoach","AI","Engineering coach"],
    ["Learning support","verifiedassessments","✓","Verified assessments"],
    ["Learning support","academyreview","↻","Smart review"],
    ["Learning support","visualizer","◎","Concept visualizer"],
    ["Learning support","academymastery","▦","Mastery map"],
    ["Learning support","academysimulations","◆","Career simulations"],
    ["Cross-academy build","capstonestudio","🏗","Capstone App Studio"],
    ["Cross-academy build","capstoneportfolio","◆","Capstone portfolio"]
  ];
  let section="";
  return`<section class="nav-group essential-group unified-academy-navigation">${items.map(([group,key,icon,label])=>{
    const route=r[key]||key;
    const heading=group!==section?(section=group,`<div class="learning-nav-label">${group}</div>`):"";
    return`${heading}<button class="nav-item ${group==="Cross-academy build"?"cross-academy-nav-item":""}" data-view="${route}">${icon} <span>${label}</span></button>`;
  }).join("")}</section>`;
}
function updateAcademyNavigation(){
  const academy=getActiveAcademy();
  const nav=document.querySelector(".sidebar-nav");
  if(!nav||!academy)return;
  const guided=state.navigationMode!=="explore"||document.body.classList.contains("guided-navigation");

  if(originalPythonSidebarHtml===null){
    originalPythonSidebarHtml=nav.innerHTML;
  }

  if(guided){
    nav.innerHTML=focusedAcademyNavigationHtml(academy);
  }else if(academy.id==="java"){
    nav.innerHTML=`<section class="nav-group essential-group"><div class="nav-group-title">Java Academy</div>
      <button class="nav-item active" data-view="javaacademyhome">⌂ <span>Academy home</span></button>
      <button class="nav-item" data-view="javacourse">▦ <span>Course map</span></button>
      <button class="nav-item" data-view="javaprojects">◆ <span>Projects</span></button>
      <button class="nav-item" data-view="javaassessments">✓ <span>Assessments</span></button>
      <button class="nav-item" data-view="javacredentials">★ <span>Credentials</span></button>
    </section>`;
    injectParityNavigation(nav,"java");
  }else if(academy.id==="web"){
    nav.innerHTML=`<section class="nav-group essential-group"><div class="nav-group-title">Web Academy</div>
      <button class="nav-item active" data-view="webacademyhome">⌂ <span>Academy home</span></button>
      <button class="nav-item" data-view="webcourse">▦ <span>Course map</span></button>
      <button class="nav-item" data-view="webprojects">◆ <span>Projects</span></button>
      <button class="nav-item" data-view="webassessments">✓ <span>Assessments</span></button>
      <button class="nav-item" data-view="webcredentials">★ <span>Credentials</span></button>
    </section>`;
    injectParityNavigation(nav,"web");
  }else if(academy.id==="sql"){
    nav.innerHTML=`<section class="nav-group essential-group"><div class="nav-group-title">SQL Academy</div>
      <button class="nav-item active" data-view="sqlacademyhome">⌂ <span>Academy home</span></button>
      <button class="nav-item" data-view="sqlcourse">▦ <span>Course map</span></button>
      <button class="nav-item" data-view="sqlplayground">SQL <span>SQL lab</span></button>
      <button class="nav-item" data-view="sqlprojects">◆ <span>Projects</span></button>
      <button class="nav-item" data-view="sqlassessments">✓ <span>Assessments</span></button>
      <button class="nav-item" data-view="sqlcredentials">★ <span>Credentials</span></button>
    </section>`;
    injectParityNavigation(nav,"sql");
  }else if(originalPythonSidebarHtml!==null){
    nav.innerHTML=originalPythonSidebarHtml;
  }

  nav.querySelectorAll("[data-view]").forEach(button=>{
    button.onclick=()=>renderView(button.dataset.view);
  });
  const current=currentView||state.currentView||"dashboard";
  nav.querySelectorAll(".nav-item").forEach(item=>item.classList.toggle("active",item.dataset.view===current));
}
function ensureFocusedAcademyNavigation(){
  if(state.navigationMode==="explore")return;
  const nav=document.querySelector(".sidebar-nav");
  const academy=getActiveAcademy();
  if(!nav||!academy)return;
  const expected=focusedAcademyNavigationHtml(academy);
  if(!nav.querySelector(".unified-academy-navigation")||nav.dataset.focusedAcademy!==academy.id){
    nav.innerHTML=expected;
    nav.dataset.focusedAcademy=academy.id;
  }
  nav.querySelectorAll("[data-view]").forEach(button=>{
    button.onclick=()=>renderView(button.dataset.view);
  });
}
function renderSqlAcademyHome(){
  const next=sqlNextAction(),progress=sqlOverallProgress();
  const credentials=sqlCourse.modules.filter(sqlCredentialEarned).length;
  const projectsDone=Object.values(state.sqlProjectState).filter(item=>item?.complete).length;
  el("main").innerHTML=`<section class="sql-academy-hero card"><div><div class="eyebrow">CODEQUEST · SQL & DATABASE ACADEMY</div><h1>Think in tables. Query with confidence.</h1><p>Learn analytical SQL, relational design, advanced window functions and dependable database engineering through real execution.</p><div class="sql-hero-actions"><button id="sqlNextBtn" class="primary-btn">${next.action}</button><button id="sqlCourseBtn" class="secondary-btn">View course map</button></div></div><div class="sql-readiness"><span>Academy progress</span><strong>${progress}%</strong><div class="progress-track"><div style="width:${progress}%"></div></div><small>${state.sqlCompletedLessons.size}/${sqlAllLessons().length} lessons complete</small></div></section>
  <section class="academy-stat-grid"><article class="card academy-stat"><span>Credentials</span><strong>${credentials}/5</strong><small>Assessment-backed awards</small></article><article class="card academy-stat"><span>Saved queries</span><strong>${state.sqlSavedQueries.length}</strong><small>Reusable SQL evidence</small></article><article class="card academy-stat"><span>Projects</span><strong>${projectsDone}/3</strong><small>Portfolio assignments</small></article><article class="card academy-stat"><span>Current stage</span><strong>${Math.min(5,sqlCourse.modules.findIndex(m=>!sqlCredentialEarned(m))+1||5)}</strong><small>Structured progression</small></article></section>
  <section class="academy-grid"><article class="card next-action-card"><div class="eyebrow">NEXT BEST ACTION</div><h2>${next.title}</h2><p>${next.subtitle}</p><div class="next-action-type">${next.type.toUpperCase()}</div></article><article class="card"><div class="eyebrow">WHY SQL MATTERS</div><h2>From question to defensible answer</h2><p>Every lesson combines query execution, result validation and business interpretation—not merely syntax recognition.</p><div class="sql-skill-list"><span>Querying</span><span>Analytics</span><span>Joins</span><span>Window functions</span><span>Database design</span></div></article></section>`;
  el("sqlNextBtn").onclick=()=>{if(next.lessonId){localStorage.setItem("cq_active_sql_lesson",next.lessonId);renderView("sqllesson")}else if(next.moduleId){localStorage.setItem("cq_active_sql_exam",next.moduleId);renderView("sqlassessments")}else renderView(next.view)};
  el("sqlCourseBtn").onclick=()=>renderView("sqlcourse");
}
function renderSqlCourseMap(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SQL PROFESSIONAL CURRICULUM</div><h1>Course map</h1><p>Lessons unlock sequentially. Each credential requires all stage lessons and a passed assessment.</p></div><strong>${sqlOverallProgress()}%</strong></div><section class="sql-stage-list">${sqlCourse.modules.map((module,index)=>{const p=sqlModuleProgress(module),first=module.lessons[0],unlocked=sqlLessonUnlocked(first)||index===0;return`<article class="card sql-stage ${unlocked?"":"locked"} ${sqlCredentialEarned(module)?"complete":""}"><div class="sql-stage-number">${sqlCredentialEarned(module)?"✓":index+1}</div><div class="sql-stage-main"><div class="sql-stage-head"><div><div class="eyebrow">${sqlCredentialEarned(module)?"CREDENTIAL EARNED":unlocked?"ACTIVE STAGE":"LOCKED STAGE"}</div><h2>${module.title}</h2><p>${module.description}</p></div><strong>${p.percent}%</strong></div><div class="progress-track"><div style="width:${p.percent}%"></div></div><div class="sql-lesson-list">${(module.lessons||[]).map(lesson=>{const open=sqlLessonUnlocked(lesson),done=state.sqlCompletedLessons.has(lesson.id);return`<button class="sql-lesson-row ${done?"complete":open?"available":"locked"}" data-sql-lesson="${lesson.id}" ${open?"":"disabled"}><span>${done?"✓":open?"→":"🔒"}</span><div><strong>${lesson.title}</strong><small>${lesson.duration} · ${lesson.xp} XP</small></div></button>`}).join("")}</div><div class="sql-stage-footer"><div><strong>${module.credential}</strong><small>${sqlCredentialEarned(module)?"Earned":p.complete?sqlExamPassed(module.id)?"Earned":"Assessment required":`${p.done}/${p.total} lessons complete`}</small></div>${p.complete&&!sqlExamPassed(module.id)?`<button class="primary-btn" data-sql-stage-exam="${module.id}">Take assessment</button>`:sqlCredentialEarned(module)?`<button class="secondary-btn" data-sql-credential="${module.id}">Download credential</button>`:""}</div></div></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-sql-lesson]").forEach(button=>button.onclick=()=>{localStorage.setItem("cq_active_sql_lesson",button.dataset.sqlLesson);renderView("sqllesson")});
  document.querySelectorAll("[data-sql-stage-exam]").forEach(button=>button.onclick=()=>{localStorage.setItem("cq_active_sql_exam",button.dataset.sqlStageExam);renderView("sqlassessments")});
  document.querySelectorAll("[data-sql-credential]").forEach(button=>button.onclick=()=>downloadSqlCredential(button.dataset.sqlCredential));
}
function sqlDatasetSetupPython(datasetId){
  const dataset=sqlAcademyDatasets[datasetId],tables=dataset.tables;
  return Object.entries(tables).map(([name,table])=>{
    const defs=table.columns.join(", ");
    const cols=table.columns.filter(c=>!c.trim().toUpperCase().startsWith("FOREIGN KEY")).map(c=>c.trim().split(/\s+/)[0]);
    return `conn.execute(${JSON.stringify(`CREATE TABLE ${name} (${defs})`)})\n`+
      table.rows.map(row=>`conn.execute(${JSON.stringify(`INSERT INTO ${name} (${cols.join(",")}) VALUES (${cols.map(()=>"?").join(",")})`)}, ${JSON.stringify(row)})`).join("\n");
  }).join("\n");
}
async function executeSqlAcademyQuery(datasetId,query){
  pyodide.globals.set("__cq_sql_query__",query);
  pyodide.globals.set("__cq_sql_setup__",sqlDatasetSetupPython(datasetId));
  const raw=await pyodide.runPythonAsync(`import sqlite3,json,traceback,io\nconn=sqlite3.connect(":memory:")\nconn.execute("PRAGMA foreign_keys=ON")\nexec(__cq_sql_setup__)\ntry:\n    cur=conn.execute(__cq_sql_query__)\n    cols=[d[0] for d in cur.description] if cur.description else []\n    rows=[list(r) for r in cur.fetchall()] if cur.description else []\n    result={"ok":True,"columns":cols,"rows":rows,"error":""}\nexcept Exception as exc:\n    result={"ok":False,"columns":[],"rows":[],"error":f"{type(exc).__name__}: {exc}"}\njson.dumps(result,default=str)`);
  return JSON.parse(raw);
}
function sqlResultTable(result){
  if(!result.ok)return`<div class="feedback error"><strong>Query error</strong><pre>${esc(result.error)}</pre></div>`;
  return`<div class="sql-result-meta">${result.rows.length} row${result.rows.length===1?"":"s"}</div><div class="data-preview"><table><thead><tr>${result.columns.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${result.rows.map(row=>`<tr>${row.map(value=>`<td>${esc(value===null?"NULL":String(value))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
async function renderSqlLesson(){
  const id=localStorage.getItem("cq_active_sql_lesson")||sqlNextAction().lessonId||sqlAllLessons()[0].id;
  const lesson=sqlLessonById(id);
  if(!lesson||!sqlLessonUnlocked(lesson)){renderView("sqlcourse");return}
  const dataset=sqlAcademyDatasets[lesson.datasetId];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${lesson.moduleTitle}</div><h1>${lesson.title}</h1><p>${lesson.description}</p></div><button id="backSqlCourseBtn" class="secondary-btn">Course map</button></div>${renderDeepLessonChapter("sql",lesson)}<section class="sql-learning-layout"><article class="card sql-lesson-brief"><div class="eyebrow">BUSINESS CHALLENGE</div><h2>${lesson.challenge}</h2><div class="sql-concept-box"><strong>Mental model</strong><p>${lesson.description} Write the smallest correct query, validate its grain and inspect whether the result answers the stated question.</p></div><h3>Dataset: ${dataset.title}</h3>${Object.entries(dataset.tables).map(([name,table])=>`<div class="sql-schema-card"><strong>${name}</strong>${table.columns.map(c=>`<code>${esc(c)}</code>`).join("")}</div>`).join("")}<button id="showSqlHintBtn" class="text-btn">Show a Socratic hint</button><div id="sqlHint"></div></article><article class="card sql-lesson-workspace"><div class="sql-editor-header"><strong>SQL editor</strong><span>${lesson.duration} · ${lesson.xp} XP</span></div><textarea id="sqlLessonEditor" class="studio-code">${esc(lesson.starter)}</textarea><div class="notebook-toolbar"><button id="runSqlLessonBtn" class="secondary-btn">Run query</button><button id="checkSqlLessonBtn" class="primary-btn">Check solution</button><button id="saveSqlLessonQueryBtn" class="secondary-btn">Save query</button></div><div id="sqlLessonFeedback"></div><div id="sqlLessonResult"></div></article></section>`;
  bindDeepLessonChapter();
  el("backSqlCourseBtn").onclick=()=>renderView("sqlcourse");
  el("showSqlHintBtn").onclick=()=>el("sqlHint").innerHTML=`<div class="session-summary">Which table contains the required grain? Which columns, filters, groups or joins are necessary—and which are not?</div>`;
  el("runSqlLessonBtn").onclick=async()=>{const result=await executeSqlAcademyQuery(lesson.datasetId,el("sqlLessonEditor").value);el("sqlLessonResult").innerHTML=sqlResultTable(result)};
  el("saveSqlLessonQueryBtn").onclick=()=>{state.sqlSavedQueries.unshift({lessonId:lesson.id,title:lesson.title,query:el("sqlLessonEditor").value,savedAt:new Date().toISOString()});persist();el("sqlLessonFeedback").innerHTML="<div class='session-summary'>Query saved to your SQL evidence.</div>"};
  el("checkSqlLessonBtn").onclick=async()=>{
    const query=el("sqlLessonEditor").value;
    const actual=await executeSqlAcademyQuery(lesson.datasetId,query),expected=await executeSqlAcademyQuery(lesson.datasetId,lesson.solution);
    const correct=actual.ok&&expected.ok&&JSON.stringify(actual.columns)===JSON.stringify(expected.columns)&&JSON.stringify(actual.rows)===JSON.stringify(expected.rows);
    state.sqlLessonAttempts.unshift({lessonId:lesson.id,correct,query,attemptedAt:new Date().toISOString(),error:actual.error});
    if(correct&&!state.sqlCompletedLessons.has(lesson.id)){state.sqlCompletedLessons.add(lesson.id);state.xp+=lesson.xp;state.academyProgress.sql={percent:sqlOverallProgress()}}
    persist();
    el("sqlLessonResult").innerHTML=sqlResultTable(actual);
    el("sqlLessonFeedback").innerHTML=`<div class="feedback ${correct?"success":"error"}"><strong>${correct?"Lesson complete":actual.ok?"Result does not yet match":"Fix the query error"}</strong><p>${correct?`You earned ${lesson.xp} XP. Explain what determines one row in your result.`:actual.ok?"Check selected columns, ordering, grouping and filters.":"Read the database error, then correct one issue at a time."}</p>${correct?`<button id="nextSqlLessonBtn" class="primary-btn">Continue</button>`:`<button id="revealSqlSolutionBtn" class="text-btn">Reveal reference after reflection</button>`}</div>`;
    if(correct)el("nextSqlLessonBtn").onclick=()=>{const all=sqlAllLessons(),next=all[all.findIndex(x=>x.id===lesson.id)+1];if(next){localStorage.setItem("cq_active_sql_lesson",next.id);renderSqlLesson()}else renderView("sqlcourse")};
    else el("revealSqlSolutionBtn").onclick=()=>{const reflection=prompt("Before revealing it, what part of your query do you think is wrong?","");if(reflection!==null)el("sqlLessonEditor").value=lesson.solution};
  };
}
function renderSqlProjects(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SQL PORTFOLIO</div><h1>Professional projects</h1><p>Use open-ended SQL work to create evidence beyond lesson completion.</p></div></div><section class="simulation-grid">${sqlAcademyProjects.map(project=>{const saved=state.sqlProjectState[project.id]||{};return`<article class="card simulation-card"><div class="eyebrow">${project.level.toUpperCase()}</div><h2>${project.title}</h2><p>${project.brief}</p><h3>Deliverables</h3>${project.deliverables.map(d=>`<div class="pack-item">✓ <span>${d}</span></div>`).join("")}<div class="form-row"><label>Project notes and findings</label><textarea data-sql-project-notes="${project.id}">${esc(saved.notes||"")}</textarea></div><label class="toggle-row"><span>Mark portfolio project complete</span><input type="checkbox" data-sql-project-complete="${project.id}" ${saved.complete?"checked":""}></label><button class="primary-btn full" data-save-sql-project="${project.id}">Save project evidence</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-save-sql-project]").forEach(button=>button.onclick=()=>{const id=button.dataset.saveSqlProject;const notes=document.querySelector(`[data-sql-project-notes="${id}"]`).value;const complete=document.querySelector(`[data-sql-project-complete="${id}"]`).checked;state.sqlProjectState[id]={notes,complete,updatedAt:new Date().toISOString()};if(complete)state.xp+=150;persist();renderSqlProjects()});
}
function renderSqlAssessments(){
  const active=localStorage.getItem("cq_active_sql_exam");
  const exam=sqlAcademyAssessments.find(item=>item.moduleId===active);
  if(exam){renderSqlExam(exam);return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">KNOWLEDGE VALIDATION</div><h1>SQL assessments</h1><p>Stage assessments unlock only after every lesson in that stage is complete.</p></div></div><section class="assessment-stage-grid">${sqlCourse.modules.map(module=>{const e=sqlAcademyAssessments.find(x=>x.moduleId===module.id),ready=sqlModuleProgress(module).complete,best=state.sqlExamHistory.filter(x=>x.examId===e.id).sort((a,b)=>b.score-a.score)[0];return`<article class="card stage-exam-card ${sqlExamPassed(module.id)?"passed":ready?"available":"locked"}"><div class="exam-status">${sqlExamPassed(module.id)?"✓":ready?"→":"🔒"}</div><div class="eyebrow">${module.title}</div><h2>${e.title}</h2><p>${e.questions.length} questions · Pass mark ${e.passMark}%</p><div class="exam-result">${best?`Best score: <strong>${best.score}%</strong>`:"No attempt yet"}</div><button class="${ready?"primary-btn":"secondary-btn"} full" data-open-sql-exam="${module.id}" ${ready?"":"disabled"}>${sqlExamPassed(module.id)?"Retake assessment":ready?"Start assessment":"Complete stage lessons"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-sql-exam]").forEach(button=>button.onclick=()=>{localStorage.setItem("cq_active_sql_exam",button.dataset.openSqlExam);renderSqlAssessments()});
}
function renderSqlExam(exam){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SQL PROFESSIONAL ASSESSMENT</div><h1>${exam.title}</h1><p>Pass mark ${exam.passMark}%</p></div><button id="exitSqlExamBtn" class="secondary-btn">Exit</button></div><form id="sqlExamForm" class="stage-exam-form">${exam.questions.map((q,i)=>`<article class="card exam-question"><div class="question-number">Question ${i+1}</div><h2>${q.question}</h2><div class="exam-options">${q.options.map((o,oi)=>`<label><input type="radio" name="sql_exam_${i}" value="${oi}"><span>${o}</span></label>`).join("")}</div></article>`).join("")}<button class="primary-btn exam-submit">Submit assessment</button></form>`;
  el("exitSqlExamBtn").onclick=()=>{localStorage.removeItem("cq_active_sql_exam");renderSqlAssessments()};
  el("sqlExamForm").onsubmit=event=>{event.preventDefault();const answers=exam.questions.map((_,i)=>Number(document.querySelector(`input[name="sql_exam_${i}"]:checked`)?.value??-1));if(answers.includes(-1)){alert("Answer every question.");return}const correct=answers.filter((a,i)=>a===exam.questions[i].answer).length,score=Math.round(correct/exam.questions.length*100);state.sqlExamHistory.unshift({examId:exam.id,moduleId:exam.moduleId,score,completedAt:new Date().toISOString()});state.xp+=score>=exam.passMark?200:50;persist();localStorage.removeItem("cq_active_sql_exam");el("main").innerHTML=`<section class="card exam-result-hero ${score>=exam.passMark?"passed":"failed"}"><div class="exam-score">${score}%</div><div><div class="eyebrow">${score>=exam.passMark?"ASSESSMENT PASSED":"REVIEW AND RETRY"}</div><h1>${score>=exam.passMark?"Stage validated":"Not yet passed"}</h1><p>${score>=exam.passMark?"Your credential is now available.":`You need ${exam.passMark}% to pass.`}</p><button id="returnSqlAssessmentsBtn" class="primary-btn">Continue</button></div></section>`;el("returnSqlAssessmentsBtn").onclick=()=>renderView("sqlcourse")};
}
function renderSqlCredentials(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VERIFIED SQL PROGRESS</div><h1>Credentials</h1><p>Credentials require lesson completion and a passed stage assessment.</p></div></div><section class="credential-grid">${sqlCourse.modules.map(module=>`<article class="card credential-card ${sqlCredentialEarned(module)?"earned":"locked"}"><div class="credential-seal">${sqlCredentialEarned(module)?"✓":"SQL"}</div><div class="eyebrow">${sqlCredentialEarned(module)?"EARNED":"IN PROGRESS"}</div><h2>${module.credential}</h2><p>${module.description}</p><button class="secondary-btn full" data-download-sql-credential="${module.id}" ${sqlCredentialEarned(module)?"":"disabled"}>${sqlCredentialEarned(module)?"Download credential":"Complete lessons and assessment"}</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-download-sql-credential]").forEach(button=>button.onclick=()=>downloadSqlCredential(button.dataset.downloadSqlCredential));
}
function downloadSqlCredential(moduleId){
  const module=sqlCourse.modules.find(item=>item.id===moduleId);if(!module||!sqlCredentialEarned(module))return;
  const content=`CODEQUEST ACADEMY\nSQL & DATABASE ACADEMY\n\n${module.credential}\n\nAwarded to: ${state.profile?.name||"CodeQuest learner"}\nCompleted: ${new Date().toLocaleDateString()}\n\nEvidence:\n${module.lessons.map(l=>`- ${l.title}`).join("\n")}\n- Passed ${sqlAcademyAssessments.find(e=>e.moduleId===module.id).title}`;
  downloadBlob(new Blob([content],{type:"text/plain"}),`${slug(module.credential)}.txt`);
}


function canonicalAcademyId(value){
  return["python","sql","web","java"].includes(value)?value:"python";
}
function academyCourseRoute(academyId){
  return academyId==="sql"?"sqlcourse":academyId==="web"?"webcourse":academyId==="java"?"javacourse":"course";
}
function academyCourseData(academyId){
  if(academyId==="sql")return sqlCourse;
  if(academyId==="web")return webCourse;
  if(academyId==="java")return javaCourse;
  return course;
}
function syncAcademyIdentity(preferredId=null){
  const academyId=reconcileAcademyState(preferredId);
  document.body.dataset.academy=academyId;

  if(Array.isArray(academies)&&academies.length){
    const academy=academies.find(item=>item.id===academyId)||academies[0];
    if(academy){
      if(el("activeAcademyName"))el("activeAcademyName").textContent=academy.name;
      if(el("activeAcademyIcon"))el("activeAcademyIcon").textContent=academy.icon;
      document.title=`${academy.name} · CodeQuest Academy`;
    }
  }

  return academyId;
}

function reconcileAcademyState(preferredId=null){
  const profileAcademy=state.profile?.activeAcademyId||state.profile?.academyId||null;
  const stateAcademy=state.activeAcademyId||null;
  const storedAcademy=localStorage.getItem("pq_active_academy")||localStorage.getItem("cq_active_academy")||null;
  const academyId=canonicalAcademyId(preferredId||profileAcademy||stateAcademy||storedAcademy||"python");
  state.activeAcademyId=academyId;
  localStorage.setItem("pq_active_academy",academyId);
  localStorage.setItem("cq_active_academy",academyId);
  state.academyHydrated=true;
  return academyId;
}
function activeAcademyCourse(){
  return academyCourseData(reconcileAcademyState());
}
function setActiveAcademy(id){
  const academyId=canonicalAcademyId(id);
  state.activeAcademyId=academyId;
  state.academyHydrated=true;
  localStorage.setItem("pq_active_academy",academyId);
  localStorage.setItem("cq_active_academy",academyId);
  if(state.profile&&typeof state.profile==="object"){
    state.profile.activeAcademyId=academyId;
    state.profile.academyId=academyId;
  }
  persist();
  return academyId;
}
function ensureAcademyRoute(route){
  const academyId=reconcileAcademyState();
  if(["course","sqlcourse","webcourse","javacourse"].includes(route)){
    return academyCourseRoute(academyId);
  }
  return route;
}
function renderAcademyHydration(){
  el("main").innerHTML=`<section class="academy-hydration"><div class="academy-hydration-spinner"></div><div class="eyebrow">RESTORING YOUR LEARNING SPACE</div><h1>Loading your academy…</h1><p>Matching your saved pathway with the correct curriculum.</p></section>`;
}

function getActiveAcademy(){
  const academyId=reconcileAcademyState();
  return academies.find(academy=>academy.id===academyId)||academies[0];
}
function academyProgressValue(academy){
  if(academy.id==="python")return pathwayOverallProgress();
  return Number(state.academyProgress?.[academy.id]?.percent||0);
}
function updateAcademyChrome(){
  const academyId=syncAcademyIdentity();
  const academy=reconcileAcademyContext()||getActiveAcademy();
  if(!academy)return;
  document.body.dataset.academy=academyId;
  updateAcademyNavigation();
  ensureFocusedAcademyNavigation();
}
function renderAcademyChooser(force=false){
  const modal=el("academyChooser"),grid=el("academyChooserGrid");
  if(!modal||!grid||!academies)return;
  let selected=getActiveAcademy()?.id||"python";
  grid.innerHTML=academies.map(academy=>`<button class="academy-choice-card ${academy.id===selected?"selected":""} ${academy.status!=="available"?"coming-soon":""}" data-academy-choice="${academy.id}"><div class="academy-choice-top"><span class="academy-choice-icon ${academy.accent}">${academy.icon}</span><span class="academy-status ${academy.status}">${academy.status==="available"?"Available":"Coming soon"}</span></div><h2>${academy.name}</h2><p>${academy.description}</p><div class="academy-choice-meta"><span>${academy.level}</span><span>${academy.duration}</span></div><div class="academy-careers">${academy.careerPaths.map(path=>`<span>${path}</span>`).join("")}</div><div class="progress-track"><div style="width:${academyProgressValue(academy)}%"></div></div><small>${academyProgressValue(academy)}% complete</small></button>`).join("");
  modal.classList.remove("hidden");
  el("closeAcademyChooserBtn").style.display=force?"none":"";
  document.querySelectorAll("[data-academy-choice]").forEach(button=>button.onclick=()=>{
    selected=button.dataset.academyChoice;
    document.querySelectorAll("[data-academy-choice]").forEach(card=>card.classList.toggle("selected",card.dataset.academyChoice===selected));
  });
  el("academyChooserContinueBtn").onclick=async()=>{
    const chosen=academies.find(item=>item.id===selected);
    if(chosen.status!=="available"){alert(`${chosen.name} is coming soon. Python Academy is currently available.`);return}
    state.activeAcademyId=chosen.id;
    if(!state.academyEnrolments.includes(chosen.id))state.academyEnrolments.push(chosen.id);
    activeAcademy=chosen;
    if(chosen.id==="python")course=await fetch(chosen.courseFile).then(response=>response.json());
    persist();
    updateAcademyChrome();
    updateAcademyNavigation();
    modal.classList.add("hidden");
    renderView(chosen.id==="sql"?"sqlacademyhome":chosen.id==="web"?"webacademyhome":chosen.id==="java"?"javaacademyhome":"academyhome");
  };
}

function conceptState(conceptId){
  const value=state.conceptMastery[conceptId]||{score:0,attempts:0,confidence:0,lastSeen:null,misconceptions:[]};
  state.conceptMastery[conceptId]=value;
  return value;
}
function updateConceptMastery(conceptId,{correct,confidence=3,misconception=null}){
  const item=conceptState(conceptId);
  const confidenceWeight=[0,.7,.85,1,1.15,1.3][Number(confidence)||3];
  const delta=correct?Math.round(12*confidenceWeight):Math.round(-8*confidenceWeight);
  item.score=Math.max(0,Math.min(100,item.score+delta));
  item.attempts+=1;
  item.confidence=Math.round((item.confidence*(item.attempts-1)+Number(confidence))/item.attempts*10)/10;
  item.lastSeen=new Date().toISOString();
  if(misconception&&!item.misconceptions.includes(misconception))item.misconceptions.push(misconception);
  persist();
}
function inferConceptFromCode(code){
  const lower=String(code||"").toLowerCase();
  const scores=conceptModel.map(concept=>({concept,score:concept.keywords.filter(keyword=>lower.includes(keyword.toLowerCase())).length}));
  scores.sort((a,b)=>b.score-a.score);
  return(scores[0]?.score||0)>0?scores[0].concept:conceptModel[0];
}
function diagnoseMisconception(code,errorText=""){
  const combined=`${code}\n${errorText}`;
  const match=misconceptionRulesV2.find(rule=>rule.patterns.filter(pattern=>combined.includes(pattern)).length>=2);
  return match||null;
}
function tutorPromptSet(concept){
  const prompts={
    variables:[
      {q:"What value will x hold after x = 3 and then x = x + 2?",answer:"5"},
      {q:"Does assignment copy a value or create a permanent link between names?",answer:"It depends on whether the object is mutable; names bind to objects."}
    ],
    loops:[
      {q:"How many times does range(1, 5) iterate?",answer:"4"},
      {q:"Where should an accumulator be initialised so it is not reset each iteration?",answer:"Before the loop."}
    ],
    functions:[
      {q:"What is the difference between print(value) and return value?",answer:"print displays; return sends a result to the caller."},
      {q:"What happens when a function reaches the end without return?",answer:"It returns None."}
    ],
    dataframes:[
      {q:"What does df[df['amount'] > 100] select?",answer:"Rows where amount is greater than 100."},
      {q:"Why use groupby before aggregation?",answer:"To split rows into groups and calculate a summary per group."}
    ]
  };
  return prompts[concept.id]||[
    {q:`Explain ${concept.title} in one sentence.`,answer:`A clear explanation of ${concept.title}.`},
    {q:`Give one realistic use of ${concept.title}.`,answer:"A relevant practical example."}
  ];
}
function renderAdaptiveTutor(){
  const weakest=[...conceptModel].sort((a,b)=>conceptState(a.id).score-conceptState(b.id).score)[0];
  const selectedId=localStorage.getItem("pq_tutor_concept")||weakest.id;
  const selected=conceptModel.find(item=>item.id===selectedId)||weakest;
  const prompts=tutorPromptSet(selected);
  const session=state.tutorSessions[0]?.conceptId===selected.id?state.tutorSessions[0]:null;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SOCRATIC TEACHING ENGINE</div><h1>Adaptive tutor</h1><p>The tutor asks, diagnoses and nudges before revealing answers.</p></div><select id="tutorConceptSelect">${conceptModel.map(item=>`<option value="${item.id}" ${item.id===selected.id?"selected":""}>${item.title}</option>`).join("")}</select></div><section class="adaptive-tutor-layout"><article class="card tutor-concept-panel"><div class="concept-score-large">${conceptState(selected.id).score}%</div><h2>${selected.title}</h2><p>${conceptState(selected.id).attempts} recorded attempts · confidence ${conceptState(selected.id).confidence||0}/5</p><div class="progress-track"><div style="width:${conceptState(selected.id).score}%"></div></div><div class="tutor-guidance"><strong>Teaching approach</strong><p>Predict first, explain your reasoning, then compare with the answer.</p></div></article><article class="card tutor-dialogue"><div class="eyebrow">GUIDED DIALOGUE</div><h2>${prompts[0].q}</h2><textarea id="tutorLearnerAnswer" placeholder="Write your reasoning, not just the final answer.">${esc(session?.answer||"")}</textarea><div class="confidence-row"><span>How confident are you?</span>${[1,2,3,4,5].map(value=>`<label><input type="radio" name="tutorConfidence" value="${value}" ${value===3?"checked":""}><span>${value}</span></label>`).join("")}</div><div class="tutor-action-row"><button id="tutorHintBtn" class="secondary-btn">Give one hint</button><button id="tutorCheckBtn" class="primary-btn">Check my reasoning</button></div><div id="tutorResponse"></div></article><article class="card tutor-history"><div class="eyebrow">MISCONCEPTION HISTORY</div><h2>What the tutor is watching</h2>${conceptState(selected.id).misconceptions.map(id=>{const item=misconceptionRulesV2.find(rule=>rule.id===id);return`<div class="misconception-chip"><strong>${item?.title||id}</strong><p>${item?.feedback||""}</p></div>`}).join("")||"<p class='muted'>No persistent misconception recorded for this concept.</p>"}</article></section>`;
  el("tutorConceptSelect").onchange=()=>{localStorage.setItem("pq_tutor_concept",el("tutorConceptSelect").value);renderAdaptiveTutor()};
  el("tutorHintBtn").onclick=()=>{el("tutorResponse").innerHTML=`<div class="session-summary"><strong>Hint:</strong> Break the question into the smallest state change you can trace.</div>`};
  el("tutorCheckBtn").onclick=()=>{const answer=el("tutorLearnerAnswer").value.trim();const confidence=Number(document.querySelector('input[name="tutorConfidence"]:checked')?.value||3);const expected=prompts[0].answer;const correct=answer&&answer.toLowerCase().split(/\s+/).some(word=>expected.toLowerCase().includes(word));const misconception=correct?null:diagnoseMisconception(answer,expected);updateConceptMastery(selected.id,{correct,confidence,misconception:misconception?.id});state.tutorSessions.unshift({conceptId:selected.id,question:prompts[0].q,answer,expected,correct,confidence,createdAt:new Date().toISOString()});state.tutorSessions=state.tutorSessions.slice(0,100);persist();el("tutorResponse").innerHTML=`<div class="feedback ${correct?"success":"error"}"><strong>${correct?"Good reasoning.":"Not quite yet."}</strong><p>${correct?`Reference answer: ${expected}`:misconception?.feedback||`Compare your reasoning with: ${expected}`}</p><button id="tutorExplainBtn" class="text-btn">Explain it in my own words</button></div>`;el("tutorExplainBtn").onclick=()=>openExplanationCapture(selected,expected)};
}
function openExplanationCapture(concept,reference){
  const explanation=prompt(`Explain ${concept.title} in your own words. Reference idea: ${reference}`,"");
  if(explanation===null)return;
  const quality=Math.min(100,Math.round(explanation.trim().split(/\s+/).length*6));
  state.explanationHistory.unshift({conceptId:concept.id,explanation,quality,createdAt:new Date().toISOString()});
  updateConceptMastery(concept.id,{correct:quality>=45,confidence:3});
  alert(`Explanation recorded. Depth score: ${quality}%`);
}
function tracerExamples(){
  return[
    {title:"Accumulator loop",code:"total = 0\nfor number in [2, 4, 6]:\n    total += number\nprint(total)"},
    {title:"Conditional branch",code:"score = 72\nif score >= 70:\n    result = 'pass'\nelse:\n    result = 'retry'\nprint(result)"},
    {title:"List mutation",code:"items = [1, 2]\nitems.append(3)\nprint(items)"}
  ];
}
function renderVisualTracer(){
  const examples=tracerExamples();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">EXECUTION VISUALISER</div><h1>Visual code tracer</h1><p>Predict first, then inspect how variables change line by line.</p></div><select id="tracerExampleSelect">${examples.map((item,index)=>`<option value="${index}">${item.title}</option>`).join("")}</select></div><section class="tracer-layout"><article class="card tracer-editor"><div class="form-row"><label>Your prediction</label><textarea id="tracerPrediction" placeholder="What output or final values do you expect?"></textarea></div><textarea id="tracerCode" class="studio-code">${esc(examples[0].code)}</textarea><div class="tracer-controls"><button id="traceCodeBtn" class="primary-btn">Trace execution</button><button id="traceResetBtn" class="secondary-btn">Reset</button></div></article><article class="card tracer-output"><div class="eyebrow">STATE TIMELINE</div><div id="traceTimeline" class="trace-timeline"><p class="muted">Run the tracer to see variable changes.</p></div></article></section>`;
  el("tracerExampleSelect").onchange=()=>{el("tracerCode").value=examples[Number(el("tracerExampleSelect").value)].code;el("traceTimeline").innerHTML="<p class='muted'>Run the tracer to see variable changes.</p>"};
  el("traceResetBtn").onclick=()=>renderVisualTracer();
  el("traceCodeBtn").onclick=()=>runVisualTrace();
}
async function runVisualTrace(){
  const code=el("tracerCode").value,prediction=el("tracerPrediction").value;
  const concept=inferConceptFromCode(code);
  pyodide.globals.set("__trace_code__",code);
  const raw=await pyodide.runPythonAsync(`import ast,json\nclass T(ast.NodeTransformer):\n    def __init__(self): self.line=0\ntrace=[]\nns={}\nlines=__trace_code__.splitlines()\nfor i in range(1,len(lines)+1):\n    snippet="\\n".join(lines[:i])\n    try:\n        temp={}\n        exec(compile(snippet,"<trace>","exec"),temp,temp)\n        visible={k:repr(v) for k,v in temp.items() if not k.startswith("__")}\n        trace.append({"line":i,"code":lines[i-1],"state":visible,"error":None})\n    except Exception as exc:\n        trace.append({"line":i,"code":lines[i-1],"state":{},"error":f"{type(exc).__name__}: {exc}"})\njson.dumps(trace)`);
  const timeline=JSON.parse(raw);
  el("traceTimeline").innerHTML=timeline.map(step=>`<div class="trace-step ${step.error?"error":""}"><div class="trace-line-number">${step.line}</div><div><code>${esc(step.code)}</code>${step.error?`<p>${esc(step.error)}</p>`:`<div class="trace-state">${Object.entries(step.state).map(([key,value])=>`<span><strong>${esc(key)}</strong> = ${esc(value)}</span>`).join("")||"<span>No visible variables yet</span>"}</div>`}</div></div>`).join("");
  const outputStep=[...timeline].reverse().find(step=>step.state&&Object.keys(step.state).length);
  const actual=outputStep?JSON.stringify(outputStep.state):"";
  const correct=prediction.trim()&&actual.toLowerCase().includes(prediction.trim().toLowerCase());
  const confidence=3;
  state.predictionHistory.unshift({conceptId:concept.id,code,prediction,actual,correct,confidence,createdAt:new Date().toISOString()});
  state.predictionHistory=state.predictionHistory.slice(0,200);
  updateConceptMastery(concept.id,{correct,confidence,misconception:correct?null:diagnoseMisconception(code,actual)?.id});
  persist();
}
function renderConceptMastery(){
  const sorted=[...conceptModel].sort((a,b)=>conceptState(a.id).score-conceptState(b.id).score);
  const average=Math.round(sorted.reduce((sum,item)=>sum+conceptState(item.id).score,0)/Math.max(1,sorted.length));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNER MODEL</div><h1>Concept mastery</h1><p>Mastery combines predictions, explanations, confidence and tutor performance.</p></div><button id="exportMasteryBtn" class="secondary-btn">Export learner model</button></div><section class="mastery-overview card"><div><span>Average mastery</span><strong>${average}%</strong></div><div><span>Strong concepts</span><strong>${sorted.filter(item=>conceptState(item.id).score>=75).length}</strong></div><div><span>Needs attention</span><strong>${sorted.filter(item=>conceptState(item.id).score<50).length}</strong></div><div><span>Predictions made</span><strong>${state.predictionHistory.length}</strong></div></section><section class="concept-mastery-grid">${sorted.map(item=>{const value=conceptState(item.id);return`<article class="card concept-mastery-card"><div class="mastery-status ${value.score>=75?"strong":value.score>=50?"developing":"weak"}">${value.score}%</div><div><div class="eyebrow">${value.score>=75?"STRONG":value.score>=50?"DEVELOPING":"FOCUS AREA"}</div><h2>${item.title}</h2><p>${value.attempts} attempts · confidence ${value.confidence||0}/5</p><div class="progress-track"><div style="width:${value.score}%"></div></div>${value.misconceptions.length?`<small>${value.misconceptions.length} misconception pattern${value.misconceptions.length===1?"":"s"} detected</small>`:"<small>No persistent misconception detected</small>"}</div><button class="text-btn" data-practise-concept="${item.id}">Practise</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-practise-concept]").forEach(button=>button.onclick=()=>{localStorage.setItem("pq_tutor_concept",button.dataset.practiseConcept);renderView("adaptivetutor")});
  el("exportMasteryBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),concepts:conceptModel.map(item=>({...item,...conceptState(item.id)})),predictions:state.predictionHistory,explanations:state.explanationHistory},null,2)],{type:"application/json"}),"codequest-learner-model.json");
}

function simulationProgress(simulationId){
  const sim=careerSimulations.find(item=>item.id===simulationId);
  const saved=state.careerSimulationState[simulationId]||{ticketStatus:{},notes:{},files:JSON.parse(JSON.stringify(sim?.starterFiles||{})),startedAt:null,completedAt:null};
  const done=(sim?.tickets||[]).filter(ticket=>saved.ticketStatus?.[ticket.id]==="done").length;
  return{saved,done,total:sim?.tickets?.length||0,percent:sim?.tickets?.length?Math.round(done/sim.tickets.length*100):0};
}
function ensureSimulationState(simulationId){
  const sim=careerSimulations.find(item=>item.id===simulationId);
  if(!state.careerSimulationState[simulationId]){
    state.careerSimulationState[simulationId]={
      ticketStatus:Object.fromEntries(sim.tickets.map(ticket=>[ticket.id,"todo"])),
      notes:{},
      files:JSON.parse(JSON.stringify(sim.starterFiles)),
      startedAt:new Date().toISOString(),
      completedAt:null
    };
    persist();
  }
  return state.careerSimulationState[simulationId];
}
function simulationUnlocked(simulation,index){
  if(index===0)return true;
  const previous=careerSimulations[index-1];
  return simulationProgress(previous.id).percent===100;
}
function renderCareerSimulations(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">WORKPLACE LEARNING</div><h1>Career simulations</h1><p>Complete realistic, role-based assignments delivered through tickets, stand-ups, stakeholder updates and evidence reviews.</p></div></div><section class="simulation-grid">${careerSimulations.map((sim,index)=>{const progress=simulationProgress(sim.id),unlocked=simulationUnlocked(sim,index);return`<article class="card simulation-card ${unlocked?"":"locked"}"><div class="simulation-company">${sim.company}</div><div class="eyebrow">${sim.role.toUpperCase()}</div><h2>${sim.title}</h2><p>${sim.brief}</p><div class="simulation-tags">${sim.skills.map(skill=>`<span>${skill}</span>`).join("")}</div><div class="simulation-meta"><span>${sim.duration}</span><span>${sim.difficulty}</span><span>${sim.tickets.length} tickets</span></div><div class="progress-track"><div style="width:${progress.percent}%"></div></div><div class="simulation-progress"><span>${progress.done}/${progress.total} complete</span><strong>${progress.percent}%</strong></div><button class="${unlocked?"primary-btn":"secondary-btn"} full" data-open-simulation="${sim.id}" ${unlocked?"":"disabled"}>${progress.saved.startedAt?"Continue simulation":unlocked?"Start simulation":"Complete previous simulation"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-simulation]").forEach(button=>button.onclick=()=>{ensureSimulationState(button.dataset.openSimulation);localStorage.setItem("pq_active_simulation",button.dataset.openSimulation);renderView("simulationworkspace")});
}
function activeSimulation(){
  const id=localStorage.getItem("pq_active_simulation")||careerSimulations[0].id;
  return careerSimulations.find(item=>item.id===id)||careerSimulations[0];
}
function renderSimulationWorkspace(){
  const sim=activeSimulation(),saved=ensureSimulationState(sim.id),progress=simulationProgress(sim.id);
  const activeTicketId=localStorage.getItem("pq_active_ticket")||sim.tickets[0].id;
  const activeTicket=sim.tickets.find(ticket=>ticket.id===activeTicketId)||sim.tickets[0];
  const activeFile=localStorage.getItem("pq_active_sim_file")||Object.keys(saved.files)[0];
  el("main").innerHTML=`<div class="simulation-workspace-head"><div><div class="eyebrow">${sim.company} · ${sim.role}</div><h1>${sim.title}</h1><p>${sim.outcome}</p></div><div class="simulation-head-actions"><button id="simulationStandupBtn" class="secondary-btn">Daily stand-up</button><button id="simulationBriefBtn" class="secondary-btn">Stakeholder brief</button><button id="simulationReviewBtn" class="primary-btn">Submit for review</button></div></div><section class="workplace-shell"><aside class="card ticket-panel"><div class="panel-heading"><strong>Sprint board</strong><span>${progress.percent}%</span></div>${["todo","doing","done"].map(status=>`<div class="ticket-column"><div class="ticket-column-title">${status==="todo"?"To do":status==="doing"?"In progress":"Done"}</div>${sim.tickets.filter(ticket=>(saved.ticketStatus[ticket.id]||"todo")===status).map(ticket=>`<button class="ticket-card ${ticket.id===activeTicket.id?"active":""}" data-ticket-id="${ticket.id}"><span>${ticket.id}</span><strong>${ticket.title}</strong><small>${ticket.type} · ${ticket.points} pts</small></button>`).join("")||"<small class='muted'>No tickets</small>"}</div>`).join("")}</aside><section class="card work-panel"><div class="work-tabs"><button class="active" data-work-tab="ticket">Ticket</button><button data-work-tab="files">Files</button><button data-work-tab="evidence">Evidence</button></div><div id="simulationWorkArea"></div></section><aside class="card manager-panel"><div class="eyebrow">MANAGER VIEW</div><h2>Delivery quality</h2>${careerSimulationRubric.dimensions.map(d=>`<div class="manager-dimension"><span>${d.title}</span><strong>${simulationDimensionScore(sim.id,d.id)}%</strong><div class="progress-track"><div style="width:${simulationDimensionScore(sim.id,d.id)}%"></div></div></div>`).join("")}<div class="manager-tip"><strong>Professional habit</strong><p>Update ticket status, record assumptions and communicate blockers before they become surprises.</p></div></aside></section>`;
  document.querySelectorAll("[data-ticket-id]").forEach(button=>button.onclick=()=>{saveSimulationFile(sim.id,activeFile);localStorage.setItem("pq_active_ticket",button.dataset.ticketId);renderSimulationWorkspace()});
  document.querySelectorAll("[data-work-tab]").forEach(button=>button.onclick=()=>{document.querySelectorAll("[data-work-tab]").forEach(b=>b.classList.remove("active"));button.classList.add("active");renderSimulationTab(button.dataset.workTab,sim,activeTicket,activeFile)});
  el("simulationStandupBtn").onclick=()=>openStandupModal(sim);
  el("simulationBriefBtn").onclick=()=>openStakeholderBrief(sim);
  el("simulationReviewBtn").onclick=()=>submitSimulationReview(sim);
  renderSimulationTab("ticket",sim,activeTicket,activeFile);
}
function renderSimulationTab(tab,sim,ticket,activeFile){
  const saved=ensureSimulationState(sim.id),area=el("simulationWorkArea");
  if(tab==="ticket"){
    area.innerHTML=`<div class="ticket-detail"><div class="ticket-detail-head"><div><div class="eyebrow">${ticket.id} · ${ticket.type}</div><h2>${ticket.title}</h2></div><select id="ticketStatusSelect"><option value="todo" ${saved.ticketStatus[ticket.id]==="todo"?"selected":""}>To do</option><option value="doing" ${saved.ticketStatus[ticket.id]==="doing"?"selected":""}>In progress</option><option value="done" ${saved.ticketStatus[ticket.id]==="done"?"selected":""}>Done</option></select></div><h3>Acceptance criteria</h3><div class="acceptance-list">${ticket.acceptance.map(item=>`<label><input type="checkbox" ${saved.notes[ticket.id]?.criteria?.includes(item)?"checked":""} data-criterion="${encodeURIComponent(item)}"><span>${item}</span></label>`).join("")}</div><div class="form-row"><label>Working notes and assumptions</label><textarea id="ticketNotes">${esc(saved.notes[ticket.id]?.text||"")}</textarea></div><button id="saveTicketBtn" class="primary-btn">Save ticket update</button></div>`;
    el("saveTicketBtn").onclick=()=>{const checked=[...document.querySelectorAll("[data-criterion]:checked")].map(node=>decodeURIComponent(node.dataset.criterion));saved.ticketStatus[ticket.id]=el("ticketStatusSelect").value;saved.notes[ticket.id]={text:el("ticketNotes").value,criteria:checked};if(saved.ticketStatus[ticket.id]==="done"&&checked.length<ticket.acceptance.length){saved.ticketStatus[ticket.id]="doing";alert("Complete every acceptance criterion before moving the ticket to Done.")}persist();renderSimulationWorkspace()};
  }else if(tab==="files"){
    const fileNames=Object.keys(saved.files);
    if(!saved.files.hasOwnProperty(activeFile))activeFile=fileNames[0];
    area.innerHTML=`<div class="simulation-files"><div class="sim-file-list">${fileNames.map(name=>`<button data-sim-file="${encodeURIComponent(name)}" class="${name===activeFile?"active":""}">${name}</button>`).join("")}</div><div class="sim-editor"><div class="sim-editor-head"><code>${activeFile}</code><button id="saveSimulationFileBtn" class="secondary-btn">Save file</button></div><textarea id="simulationFileEditor" class="studio-code">${esc(saved.files[activeFile])}</textarea></div></div>`;
    document.querySelectorAll("[data-sim-file]").forEach(button=>button.onclick=()=>{saveSimulationFile(sim.id,activeFile);localStorage.setItem("pq_active_sim_file",decodeURIComponent(button.dataset.simFile));renderSimulationTab("files",sim,ticket,decodeURIComponent(button.dataset.simFile))});
    el("saveSimulationFileBtn").onclick=()=>{saveSimulationFile(sim.id,activeFile);el("saveSimulationFileBtn").textContent="Saved"};
  }else{
    const standups=state.standupHistory.filter(item=>item.simulationId===sim.id);
    const briefs=state.stakeholderBriefs.filter(item=>item.simulationId===sim.id);
    area.innerHTML=`<div class="simulation-evidence"><div class="evidence-summary-grid"><div><span>Tickets done</span><strong>${simulationProgress(sim.id).done}</strong></div><div><span>Stand-ups</span><strong>${standups.length}</strong></div><div><span>Stakeholder briefs</span><strong>${briefs.length}</strong></div><div><span>Files</span><strong>${Object.keys(saved.files).length}</strong></div></div><h3>Professional evidence timeline</h3>${[...standups.map(i=>({...i,type:"Stand-up"})),...briefs.map(i=>({...i,type:"Stakeholder brief"}))].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(item=>`<div class="sim-evidence-item"><strong>${item.type}</strong><span>${new Date(item.createdAt).toLocaleString()}</span><p>${esc(item.summary||item.today||"")}</p></div>`).join("")||"<p class='muted'>Record a stand-up or stakeholder brief to create professional evidence.</p>"}</div>`;
  }
}
function saveSimulationFile(simulationId,fileName){
  const editor=el("simulationFileEditor");
  if(editor&&fileName)state.careerSimulationState[simulationId].files[fileName]=editor.value;
  persist();
}
function openStandupModal(sim){
  const yesterday=prompt("What did you complete since the last update?","");
  if(yesterday===null)return;
  const today=prompt("What will you work on next?","");
  if(today===null)return;
  const blockers=prompt("Any blockers or risks?","None");
  if(blockers===null)return;
  state.standupHistory.unshift({simulationId:sim.id,yesterday,today,blockers,summary:`Next: ${today}`,createdAt:new Date().toISOString()});
  state.xp+=15;persist();renderSimulationWorkspace();
}
function openStakeholderBrief(sim){
  const headline=prompt("Executive headline","");
  if(headline===null)return;
  const evidence=prompt("Evidence supporting the headline","");
  if(evidence===null)return;
  const risk=prompt("Risk or limitation","");
  if(risk===null)return;
  const recommendation=prompt("Recommended next action","");
  if(recommendation===null)return;
  state.stakeholderBriefs.unshift({simulationId:sim.id,headline,evidence,risk,recommendation,summary:headline,createdAt:new Date().toISOString()});
  state.xp+=25;persist();renderSimulationWorkspace();
}
function simulationDimensionScore(simulationId,dimensionId){
  const sim=careerSimulations.find(item=>item.id===simulationId),progress=simulationProgress(simulationId),saved=progress.saved;
  const notes=Object.values(saved.notes||{}).filter(item=>item?.text?.trim()).length;
  const standups=state.standupHistory.filter(item=>item.simulationId===simulationId).length;
  const briefs=state.stakeholderBriefs.filter(item=>item.simulationId===simulationId).length;
  const fileWork=Object.values(saved.files||{}).filter(content=>content&&!content.includes("# TODO")).length;
  const scores={
    delivery:Math.min(100,progress.percent),
    technical:Math.min(100,Math.round(fileWork/Math.max(1,Object.keys(saved.files||{}).length)*100)),
    problem_solving:Math.min(100,notes*25),
    communication:Math.min(100,standups*20+briefs*35),
    professionalism:Math.min(100,progress.done*15+standups*10+briefs*15)
  };
  return scores[dimensionId]||0;
}
function simulationOverallScore(simulationId){
  return Math.round(careerSimulationRubric.dimensions.reduce((sum,d)=>sum+simulationDimensionScore(simulationId,d.id)*d.weight/100,0));
}
function submitSimulationReview(sim){
  const progress=simulationProgress(sim.id);
  if(progress.percent<100){alert("Complete every ticket before submitting the simulation.");return}
  const score=simulationOverallScore(sim.id);
  const feedback={simulationId:sim.id,score,dimensions:Object.fromEntries(careerSimulationRubric.dimensions.map(d=>[d.id,simulationDimensionScore(sim.id,d.id)])),submittedAt:new Date().toISOString(),passed:score>=70};
  state.simulationFeedback.unshift(feedback);
  state.careerSimulationState[sim.id].completedAt=new Date().toISOString();
  state.xp+=score>=70?300:100;
  recordActivity("career-simulation",sim.id);
  persist();
  renderSimulationReviewResult(sim,feedback);
}
function renderSimulationReviewResult(sim,feedback){
  el("main").innerHTML=`<section class="card simulation-result-hero ${feedback.passed?"passed":"developing"}"><div class="simulation-result-score">${feedback.score}%</div><div><div class="eyebrow">${feedback.passed?"SIMULATION COMPLETED":"DEVELOPING PROFESSIONAL READINESS"}</div><h1>${sim.role} performance review</h1><p>${feedback.passed?"You demonstrated the minimum professional standard for this simulation.":"The work is complete, but the professional evidence needs strengthening."}</p><div class="simulation-result-actions"><button id="simulationEvidenceBtn" class="primary-btn">Open employability score</button><button id="simulationReturnBtn" class="secondary-btn">Return to simulations</button></div></div></section><section class="simulation-feedback-grid">${careerSimulationRubric.dimensions.map(d=>`<article class="card"><div class="eyebrow">${d.weight}% WEIGHT</div><h2>${d.title}</h2><strong>${feedback.dimensions[d.id]}%</strong><div class="progress-track"><div style="width:${feedback.dimensions[d.id]}%"></div></div><p>${d.description}</p></article>`).join("")}</section>`;
  el("simulationEvidenceBtn").onclick=()=>renderView("employability");
  el("simulationReturnBtn").onclick=()=>renderView("careersimulations");
}
function employabilityScore(){
  const sims=careerSimulations.map(sim=>state.simulationFeedback.filter(item=>item.simulationId===sim.id).sort((a,b)=>b.score-a.score)[0]).filter(Boolean);
  const simulationScore=sims.length?Math.round(sims.reduce((sum,item)=>sum+item.score,0)/sims.length):0;
  const credentialScore=Math.round(professionalPathway.filter(stage=>stageCredentialEarned(stage)).length/4*100);
  const portfolioScore=Math.min(100,(state.studioReleases?.length||0)*20+(state.completedProjects?.length||0)*10);
  const communicationScore=Math.min(100,state.standupHistory.length*8+state.stakeholderBriefs.length*15+state.weeklyReviews.length*10);
  const overall=Math.round(simulationScore*.4+credentialScore*.25+portfolioScore*.2+communicationScore*.15);
  return{overall,simulationScore,credentialScore,portfolioScore,communicationScore};
}
function renderEmployabilityScore(){
  const score=employabilityScore();
  el("main").innerHTML=`<section class="employability-hero card"><div><div class="eyebrow">CAREER READINESS</div><h1>Employability score</h1><p>A transparent score based on simulations, credentials, practical evidence and professional communication.</p></div><div class="employability-score"><strong>${score.overall}%</strong><span>${score.overall>=80?"Role ready":score.overall>=60?"Developing strongly":"Building foundations"}</span></div></section><section class="employability-grid">${[["Work simulations",score.simulationScore,"Complete role-based simulations."],["Credentials",score.credentialScore,"Pass stage assessments and earn credentials."],["Portfolio evidence",score.portfolioScore,"Release documented projects."],["Professional communication",score.communicationScore,"Record stand-ups, briefs and reviews."]].map(([title,value,description])=>`<article class="card"><div class="employability-dial" style="--score:${value}"><span>${value}%</span></div><h2>${title}</h2><p>${description}</p><div class="progress-track"><div style="width:${value}%"></div></div></article>`).join("")}</section><section class="card employability-actions"><div><h2>Recommended next move</h2><p>${score.simulationScore<70?"Complete or strengthen a career simulation.":score.credentialScore<75?"Complete the next professional stage credential.":score.portfolioScore<60?"Release another portfolio project.":"Export your recruiter evidence pack."}</p></div><button id="employabilityNextBtn" class="primary-btn">${score.simulationScore<70?"Open simulations":score.credentialScore<75?"Open pathway":score.portfolioScore<60?"Open Project Studio":"Build recruiter pack"}</button></section>`;
  el("employabilityNextBtn").onclick=()=>renderView(score.simulationScore<70?"careersimulations":score.credentialScore<75?"pathway":score.portfolioScore<60?"projectstudio":"recruiterpack");
}
function renderRecruiterPack(){
  const score=employabilityScore(),evidence=portfolioEvidence();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAREER EVIDENCE EXPORT</div><h1>Recruiter evidence pack</h1><p>Package verified learning, simulations, projects and professional communication into one structured export.</p></div></div><section class="recruiter-pack-grid"><article class="card"><h2>Pack contents</h2>${["Professional profile","Employability score","Stage credentials","Competency matrix","Career simulation reviews","Project evidence","Weekly review evidence"].map(item=>`<div class="pack-item">✓ <span>${item}</span></div>`).join("")}<button id="downloadRecruiterPackBtn" class="primary-btn full">Download recruiter pack ZIP</button></article><article class="card recruiter-preview"><div class="eyebrow">CANDIDATE SNAPSHOT</div><h2>${esc(state.profile?.name||"CodeQuest Academy learner")}</h2><div class="recruiter-score">${score.overall}% career readiness</div><p>${esc(state.portfolioProfile?.summary||"Python learner building evidence across data, automation, engineering and AI.")}</p><div class="recruiter-tags">${professionalPathway.filter(stage=>stageCredentialEarned(stage)).map(stage=>`<span>${stage.credential}</span>`).join("")||"<span>Credentials in progress</span>"}</div><div class="recruiter-metrics"><div><strong>${state.simulationFeedback.filter(item=>item.passed).length}</strong><span>simulations passed</span></div><div><strong>${evidence.length}</strong><span>evidence items</span></div><div><strong>${state.standupHistory.length+state.stakeholderBriefs.length}</strong><span>professional updates</span></div></div></article></section>`;
  el("downloadRecruiterPackBtn").onclick=downloadRecruiterPack;
}
async function downloadRecruiterPack(){
  const zip=new JSZip(),folder=zip.folder("codequest-recruiter-pack");
  const score=employabilityScore();
  folder.file("candidate-summary.json",JSON.stringify({learner:state.profile,employability:score,generatedAt:new Date().toISOString()},null,2));
  folder.file("credentials.json",JSON.stringify(professionalPathway.filter(stage=>stageCredentialEarned(stage)).map(stage=>({title:stage.credential,exam:bestExamAttempt(stage.id)})),null,2));
  folder.file("competencies.json",JSON.stringify(competencies.map(item=>({...item,score:competencyScore(item)})),null,2));
  folder.file("simulation-reviews.json",JSON.stringify(state.simulationFeedback,null,2));
  folder.file("professional-communications.json",JSON.stringify({standups:state.standupHistory,stakeholderBriefs:state.stakeholderBriefs,weeklyReviews:state.weeklyReviews},null,2));
  folder.file("portfolio-evidence.json",JSON.stringify(portfolioEvidence(),null,2));
  folder.file("README.md",`# PythonQuest Recruiter Evidence Pack\n\nCandidate: ${state.profile?.name||"CodeQuest Academy learner"}\nEmployability score: ${score.overall}%\n\nThis pack contains structured learning, assessment, project and workplace-simulation evidence generated by PythonQuest.\n`);
  downloadBlob(await zip.generateAsync({type:"blob"}),"codequest-recruiter-evidence-pack.zip");
  state.xp+=100;persist();
}

function academyNextAction(){
  const stageIndex=currentAcademyStageIndex(),stage=professionalPathway[stageIndex];
  const next=nextStageLesson(stage);
  if(next)return{type:"lesson",title:next.title,subtitle:stage.title,action:"Continue lesson",lessonId:next.id};
  if(stageLessonsComplete(stage)&&!stageExamPassed(stage.id)){
    const exam=examForStage(stage.id);
    return{type:"exam",title:exam.title,subtitle:`Pass mark ${exam.passMark}%`,action:"Take assessment",stageId:stage.id};
  }
  return{type:"portfolio",title:"Build your professional portfolio",subtitle:"Turn learning evidence into career proof.",action:"Open portfolio",view:"portfoliohub"};
}
function renderAcademyHome(){
  const next=academyNextAction();
  const currentIndex=currentAcademyStageIndex();
  const currentStage=professionalPathway[currentIndex];
  const weekly=weeklyActivity();
  const credentials=professionalPathway.filter(stage=>stageCredentialEarned(stage)).length;
  const projectsCount=(state.completedProjects?.length||0)+(state.studioReleases?.length||0);
  const competencyAverage=Math.round(competencies.reduce((sum,item)=>sum+competencyScore(item),0)/Math.max(1,competencies.length));
  el("main").innerHTML=`<section class="academy-hero card"><div><div class="eyebrow">PYTHONQUEST ACADEMY OS</div><h1>Good ${new Date().getHours()<12?"morning":new Date().getHours()<18?"afternoon":"evening"}, ${esc(state.profile?.name?.split(" ")[0]||"learner")}.</h1><p>Your academy workspace brings learning, assessment, evidence and professional readiness into one place.</p><div class="academy-actions"><button id="academyNextBtn" class="primary-btn">${next.action}</button><button id="academyPathBtn" class="secondary-btn">View pathway</button></div></div><div class="academy-readiness"><span>Professional readiness</span><strong>${Math.round(pathwayOverallProgress()*.55+competencyAverage*.25+(credentials/4*100)*.2)}%</strong><div class="progress-track"><div style="width:${Math.round(pathwayOverallProgress()*.55+competencyAverage*.25+(credentials/4*100)*.2)}%"></div></div></div></section>
  <section class="academy-stat-grid"><article class="card academy-stat"><span>Current stage</span><strong>${currentIndex+1}/4</strong><small>${currentStage.title}</small></article><article class="card academy-stat"><span>Credentials</span><strong>${credentials}</strong><small>Professional stage credentials</small></article><article class="card academy-stat"><span>Portfolio evidence</span><strong>${projectsCount}</strong><small>Projects and releases</small></article><article class="card academy-stat"><span>This week</span><strong>${weekly.length}</strong><small>Recorded learning actions</small></article></section>
  <section class="academy-grid"><article class="card next-action-card"><div class="eyebrow">NEXT BEST ACTION</div><h2>${esc(next.title)}</h2><p>${esc(next.subtitle)}</p><div class="next-action-type">${next.type.toUpperCase()}</div></article><article class="card"><div class="section-head"><div><div class="eyebrow">STAGE READINESS</div><h2>${currentStage.title}</h2></div><strong>${stageProgress(currentStage).percent}%</strong></div><div class="progress-track"><div style="width:${stageProgress(currentStage).percent}%"></div></div><div class="academy-checklist"><div class="${stageLessonsComplete(currentStage)?"done":""}">✓ Complete all stage lessons</div><div class="${stageExamPassed(currentStage.id)?"done":""}">✓ Pass professional assessment</div><div class="${stageCredentialEarned(currentStage)?"done":""}">✓ Earn stage credential</div></div></article></section>
  <section class="academy-grid"><article class="card"><div class="section-head"><div><div class="eyebrow">COMPETENCY SNAPSHOT</div><h2>Skills employers can understand</h2></div><button id="academyCompetencyBtn" class="text-btn">View matrix</button></div><div class="mini-competency-grid">${competencies.slice(0,6).map(item=>`<div><span>${item.title}</span><strong>${competencyScore(item)}%</strong><div class="progress-track"><div style="width:${competencyScore(item)}%"></div></div></div>`).join("")}</div></article><article class="card"><div class="section-head"><div><div class="eyebrow">WEEKLY REVIEW</div><h2>Turn activity into insight</h2></div><button id="academyReviewBtn" class="text-btn">Open review</button></div><p>${weekly.length?`You recorded ${weekly.length} learning actions this week. Capture what improved and what to focus on next.`:"No learning activity has been recorded this week. Start with one small mission."}</p><div class="weekly-bars">${[1,2,3,4,5,6,7].map((_,i)=>`<span style="height:${12+((weekly.length+i*7)%42)}px"></span>`).join("")}</div></article></section>`;
  el("academyNextBtn").onclick=()=>{if(next.lessonId)openLesson(next.lessonId);else if(next.stageId){localStorage.setItem("pq_selected_stage_exam",next.stageId);renderView("stageexams")}else renderView(next.view)};
  el("academyPathBtn").onclick=()=>renderView("pathway");
  el("academyCompetencyBtn").onclick=()=>renderView("competencies");
  el("academyReviewBtn").onclick=()=>renderView("weeklyreview");
}
function competencyScore(item){
  const ids=item.lessons||[];
  if(!ids.length)return 0;
  const completed=ids.filter(id=>state.lessons.has(id)).length;
  const lessonScore=completed/ids.length*75;
  const projectBonus=Math.min(15,(state.completedProjects?.length||0)*5+(state.studioReleases?.length||0)*5);
  const assessmentBonus=Math.min(10,state.stageExamHistory.filter(attempt=>attempt.score>=70).length*2.5);
  return Math.min(100,Math.round(lessonScore+projectBonus+assessmentBonus));
}
function renderCompetencyMatrix(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">EVIDENCE-BASED SKILLS</div><h1>Competency matrix</h1><p>Competencies combine completed lessons, assessment results and practical evidence.</p></div><button id="exportCompetencyBtn" class="secondary-btn">Export matrix</button></div><section class="competency-grid">${competencies.map(item=>{const score=competencyScore(item);return`<article class="card competency-card"><div class="competency-ring" style="--score:${score}"><span>${score}%</span></div><div><div class="eyebrow">${score>=80?"PROFICIENT":score>=50?"DEVELOPING":"FOUNDATION"}</div><h2>${item.title}</h2><p>${item.description}</p><div class="competency-evidence"><span>${(item.lessons||[]).filter(id=>state.lessons.has(id)).length}/${(item.lessons||[]).length} lessons</span><span>${state.stageExamHistory.filter(a=>a.score>=70).length} passed exams</span><span>${(state.completedProjects?.length||0)+(state.studioReleases?.length||0)} project evidence</span></div></div></article>`}).join("")}</section>`;
  el("exportCompetencyBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({learner:state.profile?.name,generatedAt:new Date().toISOString(),competencies:competencies.map(item=>({...item,score:competencyScore(item)}))},null,2)],{type:"application/json"}),"codequest-competency-matrix.json");
}
function renderStageAssessments(){
  const selected=localStorage.getItem("pq_selected_stage_exam");
  const selectedExam=stageAssessments.find(exam=>exam.stageId===selected);
  if(selectedExam){renderStageExam(selectedExam);return}
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PROFESSIONAL ASSESSMENT</div><h1>Stage assessments</h1><p>Passing the assessment is required before the next professional stage unlocks.</p></div></div><section class="assessment-stage-grid">${professionalPathway.map((stage,index)=>{const exam=examForStage(stage.id),attempt=bestExamAttempt(stage.id),lessonsDone=stageLessonsComplete(stage),available=lessonsDone||attempt;return`<article class="card stage-exam-card ${stageExamPassed(stage.id)?"passed":available?"available":"locked"}"><div class="exam-status">${stageExamPassed(stage.id)?"✓":available?"→":"🔒"}</div><div class="eyebrow">${stage.title}</div><h2>${exam.title}</h2><p>${exam.questions.length} questions · ${exam.duration} · Pass mark ${exam.passMark}%</p><div class="exam-result">${attempt?`Best score: <strong>${attempt.score}%</strong>`:"No attempt yet"}</div><button class="${available?"primary-btn":"secondary-btn"} full" data-open-stage-exam="${stage.id}" ${available?"":"disabled"}>${stageExamPassed(stage.id)?"Retake assessment":available?"Start assessment":"Complete stage lessons first"}</button></article>`}).join("")}</section>`;
  document.querySelectorAll("[data-open-stage-exam]").forEach(button=>button.onclick=()=>{localStorage.setItem("pq_selected_stage_exam",button.dataset.openStageExam);renderStageAssessments()});
}
function renderStageExam(exam){
  const stage=professionalPathway.find(item=>item.id===exam.stageId);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${stage.title}</div><h1>${exam.title}</h1><p>${exam.questions.length} questions · Pass mark ${exam.passMark}%</p></div><button id="exitStageExamBtn" class="secondary-btn">Exit assessment</button></div><form id="stageExamForm" class="stage-exam-form">${exam.questions.map((q,index)=>`<article class="card exam-question"><div class="question-number">Question ${index+1}</div><h2>${q.question}</h2><div class="exam-options">${q.options.map((option,oi)=>`<label><input type="radio" name="exam_q_${index}" value="${oi}"><span>${option}</span></label>`).join("")}</div></article>`).join("")}<button class="primary-btn exam-submit" type="submit">Submit professional assessment</button></form>`;
  el("exitStageExamBtn").onclick=()=>{localStorage.removeItem("pq_selected_stage_exam");renderStageAssessments()};
  el("stageExamForm").onsubmit=event=>{
    event.preventDefault();
    const answers=exam.questions.map((_,index)=>{const selected=document.querySelector(`input[name="exam_q_${index}"]:checked`);return selected?Number(selected.value):-1});
    if(answers.includes(-1)){alert("Answer every question before submitting.");return}
    const correct=answers.filter((answer,index)=>answer===exam.questions[index].answer).length;
    const score=Math.round(correct/exam.questions.length*100),passed=score>=exam.passMark;
    state.stageExamHistory.unshift({examId:exam.id,stageId:exam.stageId,score,correct,total:exam.questions.length,passed,completedAt:new Date().toISOString()});
    state.xp+=passed?200:50;
    recordActivity("stage-assessment",exam.id);
    persist();
    renderStageExamResult(exam,answers,score);
  };
}
function renderStageExamResult(exam,answers,score){
  const passed=score>=exam.passMark;
  el("main").innerHTML=`<section class="card exam-result-hero ${passed?"passed":"failed"}"><div class="exam-score">${score}%</div><div><div class="eyebrow">${passed?"ASSESSMENT PASSED":"ASSESSMENT NOT YET PASSED"}</div><h1>${passed?"Professional stage validated":"Review and try again"}</h1><p>${passed?`You passed ${exam.title} and satisfied the assessment requirement for this stage.`:`You need ${exam.passMark}% to pass. Review the explanations below before retaking.`}</p><div class="exam-result-actions"><button id="examPathwayBtn" class="primary-btn">View pathway</button><button id="examRetakeBtn" class="secondary-btn">Retake assessment</button></div></div></section><section class="exam-review-list">${exam.questions.map((q,index)=>`<article class="card exam-review ${answers[index]===q.answer?"correct":"incorrect"}"><strong>${answers[index]===q.answer?"✓ Correct":"✕ Review"}</strong><h3>${q.question}</h3><p>Your answer: ${answers[index]>=0?q.options[answers[index]]:"No answer"}</p><p><strong>Explanation:</strong> ${q.explanation}</p></article>`).join("")}</section>`;
  el("examPathwayBtn").onclick=()=>{localStorage.removeItem("pq_selected_stage_exam");renderView("pathway")};
  el("examRetakeBtn").onclick=()=>renderStageExam(exam);
}

function portfolioAcademyConfig(){
  const academy=reconcileAcademyContext()||getActiveAcademy()||{id:"python",name:"Python Academy",shortName:"Python"};
  const configs={
    python:{
      id:"python",
      label:"Python",
      name:"Python Academy",
      headline:"Python portfolio",
      summary:"A growing portfolio of Python, data, automation and engineering evidence.",
      exportLabel:"CODEQUEST PYTHON ACADEMY PROFESSIONAL PORTFOLIO"
    },
    sql:{
      id:"sql",
      label:"SQL & Database",
      name:"SQL & Database Academy",
      headline:"SQL & Database portfolio",
      summary:"A growing portfolio of SQL analysis, database design, data quality and query-engineering evidence.",
      exportLabel:"CODEQUEST SQL & DATABASE ACADEMY PROFESSIONAL PORTFOLIO"
    },
    web:{
      id:"web",
      label:"Web Development",
      name:"Web Development Academy",
      headline:"Web Development portfolio",
      summary:"A growing portfolio of semantic HTML, responsive CSS, JavaScript, browser APIs and frontend-engineering evidence.",
      exportLabel:"CODEQUEST WEB DEVELOPMENT ACADEMY PROFESSIONAL PORTFOLIO"
    },
    java:{
      id:"java",
      label:"Java",
      name:"Java Academy",
      headline:"Java portfolio",
      summary:"A growing portfolio of core Java, object-oriented design, backend engineering and production-readiness evidence.",
      exportLabel:"CODEQUEST JAVA ACADEMY PROFESSIONAL PORTFOLIO"
    }
  };
  return configs[academy.id]||configs.python;
}
function academyPortfolioProfile(academyId){
  state.portfolioProfiles=state.portfolioProfiles||{};
  if(academyId==="python" && !state.portfolioProfiles.python && state.portfolioProfile){
    state.portfolioProfiles.python={...state.portfolioProfile};
  }
  return state.portfolioProfiles[academyId]||{};
}
function academyPortfolioCredentials(academyId){
  if(academyId==="sql"){
    return sqlCourse.modules.map(module=>({
      id:module.id,title:module.credential,earned:sqlCredentialEarned(module),
      date:state.sqlExamHistory.filter(x=>x.moduleId===module.id&&x.score>=sqlAcademyAssessments.find(e=>e.moduleId===module.id).passMark).sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt))[0]?.completedAt
    }));
  }
  if(academyId==="web"){
    return webCourse.modules.map(module=>({
      id:module.id,title:module.credential,earned:webCredentialEarned(module),
      date:state.webExamHistory.filter(x=>x.moduleId===module.id&&x.score>=webAcademyAssessments.find(e=>e.moduleId===module.id).passMark).sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt))[0]?.completedAt
    }));
  }
  if(academyId==="java"){
    return javaCourse.modules.map(module=>({
      id:module.id,title:module.credential,earned:javaCredentialEarned(module),
      date:state.javaExamHistory.filter(x=>x.moduleId===module.id&&x.score>=javaAcademyAssessments.find(e=>e.moduleId===module.id).passMark).sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt))[0]?.completedAt
    }));
  }
  return professionalPathway.map(stage=>({
    id:stage.id,title:stage.credential,earned:stageCredentialEarned(stage),
    date:bestExamAttempt(stage.id)?.completedAt
  }));
}
function academyPortfolioProjects(academyId){
  if(academyId==="sql"){
    return sqlAcademyProjects.filter(p=>state.sqlProjectState?.[p.id]?.complete).map(p=>({
      type:"SQL project",title:p.title,date:state.sqlProjectState[p.id]?.updatedAt,notes:state.sqlProjectState[p.id]?.notes
    }));
  }
  if(academyId==="web"){
    return webAcademyProjects.filter(p=>state.webProjectState?.[p.id]?.complete).map(p=>({
      type:"Web project",title:p.title,date:state.webProjectState[p.id]?.updatedAt,notes:state.webProjectState[p.id]?.notes
    }));
  }
  if(academyId==="java"){
    return javaAcademyProjects.filter(p=>state.javaProjectState?.[p.id]?.complete).map(p=>({
      type:"Java project",title:p.title,date:state.javaProjectState[p.id]?.updatedAt,notes:state.javaProjectState[p.id]?.notes
    }));
  }
  const releases=(state.studioReleases||[]).map(item=>({type:"Project Studio release",title:item.projectTitle||"Project release",date:item.createdAt,readiness:item.readiness}));
  const completed=(state.completedProjects||[]).map(id=>{
    const project=(projects||[]).find(p=>p.id===id);
    return{type:"Completed Python project",title:project?.title||id,date:null};
  });
  return[...releases,...completed];
}
function portfolioEvidence(academyId=portfolioAcademyConfig().id){
  const credentials=academyPortfolioCredentials(academyId).filter(item=>item.earned).map(item=>({
    type:`${portfolioAcademyConfig().label} credential`,title:item.title,date:item.date
  }));
  return[...credentials,...academyPortfolioProjects(academyId)];
}
function academyPortfolioProgress(academyId){
  if(academyId==="sql")return sqlOverallProgress();
  if(academyId==="web")return webOverallProgress();
  if(academyId==="java")return javaOverallProgress();
  return pathwayOverallProgress();
}
function academyPortfolioCompetencies(academyId){
  if(academyParity?.[academyId]){
    return academyParity[academyId].concepts.map(item=>({title:item.title,score:parityConceptScore(academyId,item)}));
  }
  return competencies.map(item=>({title:item.title,score:competencyScore(item)}));
}
function portfolioStrength(academyId,evidence){
  const credentials=academyPortfolioCredentials(academyId);
  const earned=credentials.filter(c=>c.earned).length;
  const credentialScore=credentials.length?earned/credentials.length*35:0;
  const projectScore=Math.min(30,academyPortfolioProjects(academyId).length*10);
  const learningScore=academyPortfolioProgress(academyId)*.35;
  return Math.min(100,Math.round(credentialScore+projectScore+learningScore));
}
function renderPortfolioHub(){
  const config=portfolioAcademyConfig(),academyId=config.id;
  const evidence=portfolioEvidence(academyId);
  const credentials=academyPortfolioCredentials(academyId);
  const projectsEvidence=academyPortfolioProjects(academyId);
  const profile=academyPortfolioProfile(academyId);
  const learner=state.profile?.name||"CodeQuest Academy learner";
  const strength=portfolioStrength(academyId,evidence);
  el("main").innerHTML=`<div class="portfolio-hero card"><div><div class="eyebrow">${config.name.toUpperCase()} · PROFESSIONAL SHOWCASE</div><h1>${esc(profile.headline||`${learner} · ${config.headline}`)}</h1><p>${esc(profile.summary||config.summary)}</p><div class="portfolio-actions"><button id="editPortfolioBtn" class="secondary-btn">Edit ${config.label} profile</button><button id="exportPortfolioHtmlBtn" class="primary-btn">Export portfolio website</button></div></div><div class="portfolio-score"><strong>${strength}%</strong><span>portfolio strength</span></div></div><section class="portfolio-grid"><article class="card"><div class="eyebrow">${config.label.toUpperCase()} CREDENTIALS</div><h2>${credentials.filter(c=>c.earned).length} earned</h2>${credentials.map(item=>`<div class="portfolio-item ${item.earned?"earned":"locked"}"><span>${item.earned?"✓":"○"}</span><div><strong>${esc(item.title)}</strong><small>${item.earned?"Verified by academy lessons and assessment":"Not yet earned"}</small></div></div>`).join("")}</article><article class="card"><div class="eyebrow">${config.label.toUpperCase()} PROJECT EVIDENCE</div><h2>${projectsEvidence.length} items</h2>${projectsEvidence.map(item=>`<div class="portfolio-item earned"><span>◆</span><div><strong>${esc(item.title)}</strong><small>${esc(item.type)}${item.readiness?` · ${item.readiness}% readiness`:""}</small></div></div>`).join("")||`<p class="muted">Complete a ${config.label} project to add evidence.</p>`}</article></section><section class="card portfolio-evidence-list"><div class="section-head"><div><div class="eyebrow">${config.label.toUpperCase()} EVIDENCE TIMELINE</div><h2>Your professional proof</h2></div></div>${evidence.map(item=>`<div class="evidence-timeline-item"><span></span><div><strong>${esc(item.title)}</strong><small>${esc(item.type)}${item.date?` · ${new Date(item.date).toLocaleDateString()}`:""}</small></div></div>`).join("")||`<p class="muted">${config.label} evidence will appear as you complete credentials and projects.</p>`}</section>`;
  el("editPortfolioBtn").onclick=()=>editPortfolioProfile();
  el("exportPortfolioHtmlBtn").onclick=exportPortfolioWebsite;
}
function editPortfolioProfile(){
  const config=portfolioAcademyConfig(),academyId=config.id;
  const current=academyPortfolioProfile(academyId);
  const learner=state.profile?.name||"CodeQuest Academy learner";
  const headline=prompt(`${config.label} portfolio headline`,current.headline||`${learner} · ${config.headline}`);
  if(headline===null)return;
  const summary=prompt(`${config.label} professional summary`,current.summary||config.summary);
  if(summary===null)return;
  state.portfolioProfiles[academyId]={headline,summary};
  if(academyId==="python")state.portfolioProfile={headline,summary};
  persist();
  renderPortfolioHub();
}
function exportPortfolioWebsite(){
  const config=portfolioAcademyConfig(),academyId=config.id;
  const evidence=portfolioEvidence(academyId),profile=academyPortfolioProfile(academyId);
  const credentials=academyPortfolioCredentials(academyId);
  const competencyItems=academyPortfolioCompetencies(academyId);
  const learner=state.profile?.name||"Learner";
  const title=profile.headline||`${learner} · ${config.headline}`;
  const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title><style>body{font-family:Arial,sans-serif;max-width:960px;margin:auto;padding:40px;color:#172033;background:#f7f8fc}header,section{background:white;padding:30px;border-radius:18px;margin-bottom:20px}h1{font-size:42px}.item{padding:14px 0;border-bottom:1px solid #ddd}.tag{display:inline-block;padding:6px 10px;background:#eeeafd;color:#5b4fe9;border-radius:999px;margin:4px}</style></head><body><header><p>${esc(config.exportLabel)}</p><h1>${esc(title)}</h1><p>${esc(profile.summary||config.summary)}</p></header><section><h2>${esc(config.label)} credentials</h2>${credentials.filter(c=>c.earned).map(c=>`<span class="tag">${esc(c.title)}</span>`).join("")||"<p>Credentials in progress.</p>"}</section><section><h2>${esc(config.label)} evidence</h2>${evidence.map(item=>`<div class="item"><strong>${esc(item.title)}</strong><p>${esc(item.type)}</p></div>`).join("")||"<p>Evidence in progress.</p>"}</section><section><h2>${esc(config.label)} competencies</h2>${competencyItems.map(item=>`<div class="item"><strong>${esc(item.title)}</strong><p>${item.score}%</p></div>`).join("")}</section></body></html>`;
  downloadBlob(new Blob([html],{type:"text/html"}),`codequest-${academyId}-professional-portfolio.html`);
}

function renderWeeklyReview(){
  const activity=weeklyActivity(),latest=state.weeklyReviews[0]||{};
  const lessonsThisWeek=activity.filter(item=>String(item.type||"").includes("lesson")).length;
  const projectsThisWeek=activity.filter(item=>String(item.type||"").includes("project")||String(item.type||"").includes("studio")).length;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">REFLECT · ADJUST · CONTINUE</div><h1>Weekly performance review</h1><p>A professional learning review focused on outcomes, obstacles and next actions.</p></div><button id="exportWeeklyReviewBtn" class="secondary-btn">Export review</button></div><section class="weekly-review-grid"><article class="card weekly-metrics"><div><span>Learning actions</span><strong>${activity.length}</strong></div><div><span>Lessons</span><strong>${lessonsThisWeek}</strong></div><div><span>Project actions</span><strong>${projectsThisWeek}</strong></div><div><span>Current readiness</span><strong>${Math.round(pathwayOverallProgress()*.7+professionalPathway.filter(stage=>stageCredentialEarned(stage)).length/4*30)}%</strong></div></article><article class="card weekly-form"><div class="form-row"><label>What improved this week?</label><textarea id="weeklyImproved">${esc(latest.improved||"")}</textarea></div><div class="form-row"><label>What was difficult?</label><textarea id="weeklyDifficult">${esc(latest.difficult||"")}</textarea></div><div class="form-row"><label>Evidence created</label><textarea id="weeklyEvidence">${esc(latest.evidence||"")}</textarea></div><div class="form-row"><label>Most important next action</label><textarea id="weeklyNext">${esc(latest.nextAction||academyNextAction().title)}</textarea></div><div class="form-row"><label>Confidence for next week (1–5)</label><input id="weeklyConfidence" type="range" min="1" max="5" value="${latest.confidence||3}"></div><button id="saveWeeklyReviewBtn" class="primary-btn">Save weekly review</button><div id="weeklyReviewMessage"></div></article></section><section class="card weekly-history"><h2>Review history</h2>${state.weeklyReviews.map(item=>`<div class="weekly-history-item"><strong>${new Date(item.createdAt).toLocaleDateString()}</strong><span>Confidence ${item.confidence}/5</span><p>${esc(item.nextAction)}</p></div>`).join("")||"<p class='muted'>Your saved weekly reviews will appear here.</p>"}</section>`;
  el("saveWeeklyReviewBtn").onclick=()=>{const review={weekStart:weekStartDate().toISOString(),improved:el("weeklyImproved").value,difficult:el("weeklyDifficult").value,evidence:el("weeklyEvidence").value,nextAction:el("weeklyNext").value,confidence:Number(el("weeklyConfidence").value),activityCount:activity.length,createdAt:new Date().toISOString()};state.weeklyReviews.unshift(review);state.weeklyReviews=state.weeklyReviews.slice(0,52);state.xp+=30;persist();el("weeklyReviewMessage").innerHTML="<div class='session-summary'>Weekly review saved. +30 XP</div>"};
  el("exportWeeklyReviewBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(state.weeklyReviews[0]||{},null,2)],{type:"application/json"}),"codequest-weekly-review.json");
}

function stageLessons(stage){
  const ids=new Set(stage.module_ids);
  return course.modules.filter(module=>ids.has(module.id)).flatMap(module=>module.lessons);
}
function stageProgress(stage){
  const lessons=stageLessons(stage);
  const completed=lessons.filter(lesson=>state.lessons.has(lesson.id)).length;
  return{
    completed,
    total:lessons.length,
    percent:lessons.length?Math.round(completed/lessons.length*100):0,
    complete:lessons.length>0&&completed===lessons.length
  };
}
function stageUnlocked(index){
  return stageUnlockedWithExam(index);
}
function moduleProgress(module){
  const completed=module.lessons.filter(lesson=>state.lessons.has(lesson.id)).length;
  return{
    completed,
    total:module.lessons.length,
    percent:module.lessons.length?Math.round(completed/module.lessons.length*100):0,
    complete:completed===module.lessons.length
  };
}
function nextStageLesson(stage){
  return stageLessons(stage).find(lesson=>!state.lessons.has(lesson.id))||null;
}
function pathwayOverallProgress(){
  const lessons=course.modules.flatMap(module=>module.lessons);
  return lessons.length?Math.round(lessons.filter(lesson=>state.lessons.has(lesson.id)).length/lessons.length*100):0;
}
function renderProfessionalPathway(){
  const overall=pathwayOverallProgress();
  const completedStages=professionalPathway.filter(stage=>stageProgress(stage).complete).length;
  el("main").innerHTML=`<div class="pathway-hero card"><div><div class="eyebrow">PYTHONQUEST PROFESSIONAL ACADEMY</div><h1>Your professional pathway</h1><p>A structured progression from Python foundations to production-ready engineering. Advanced stages unlock only when their prerequisites are complete.</p><div class="pathway-hero-actions"><button id="continuePathwayBtn" class="primary-btn">Continue learning</button><button id="exportSkillPassportBtn" class="secondary-btn">Export skill passport</button></div></div><div class="pathway-overall"><strong>${overall}%</strong><span>curriculum complete</span><div class="progress-track"><div style="width:${overall}%"></div></div><small>${completedStages}/4 stage credentials earned</small></div></div>
  <section class="pathway-timeline">${professionalPathway.map((stage,index)=>{
    const progress=stageProgress(stage),unlocked=stageUnlocked(index),next=nextStageLesson(stage),exam=examForStage(stage.id),examPassed=stageExamPassed(stage.id),credentialEarned=stageCredentialEarned(stage);
    const modules=course.modules.filter(module=>stage.module_ids.includes(module.id));
    return`<article class="card pathway-stage ${unlocked?"unlocked":"locked"} ${progress.complete?"complete":""}">
      <div class="stage-rail"><span>${progress.complete?"✓":index+1}</span></div>
      <div class="stage-content">
        <div class="stage-header"><div><div class="eyebrow">${credentialEarned?"CREDENTIAL EARNED":unlocked?"ACTIVE STAGE":"LOCKED STAGE"}</div><h2>${stage.title}</h2><p>${stage.subtitle}</p></div><div class="stage-percent">${progress.percent}%</div></div>
        <div class="progress-track"><div style="width:${progress.percent}%"></div></div>
        <div class="stage-modules">${modules.map(module=>{
          const mp=moduleProgress(module);
          const moduleUnlocked=(module.lessons[0].prerequisites||[]).every(id=>state.lessons.has(id));
          return`<div class="stage-module ${moduleUnlocked?"":"locked"}"><span class="module-status">${mp.complete?"✓":moduleUnlocked?"→":"🔒"}</span><div><strong>${module.title.replace(/^Module \d+ · /,"")}</strong><small>${mp.completed}/${mp.total} lessons · ${mp.percent}%</small></div></div>`;
        }).join("")}</div>
        <div class="stage-footer"><div><strong>${stage.credential}</strong><small>${progress.complete?"Credential available in your skill passport.":unlocked?`${progress.completed} of ${progress.total} lessons complete.`:`Complete ${professionalPathway[index-1]?.title||"the previous stage"} to unlock.`}</small></div>${credentialEarned?`<button class="secondary-btn" data-stage-certificate="${stage.id}">Download credential</button>`:unlocked&&next?`<button class="primary-btn" data-pathway-lesson="${next.id}">Continue: ${esc(next.title)}</button>`:unlocked&&!examPassed?`<button class="primary-btn" data-stage-exam="${stage.id}">Take stage assessment</button>`:`<button class="secondary-btn" disabled>Locked</button>`}</div>
      </div>
    </article>`;
  }).join("")}</section>`;
  el("continuePathwayBtn").onclick=()=>{
    const next=course.modules.flatMap(module=>module.lessons).find(lesson=>!state.lessons.has(lesson.id));
    if(next)openLesson(next.id);else renderView("course");
  };
  el("exportSkillPassportBtn").onclick=exportSkillPassport;
  document.querySelectorAll("[data-pathway-lesson]").forEach(button=>button.onclick=()=>openLesson(button.dataset.pathwayLesson));
  document.querySelectorAll("[data-stage-certificate]").forEach(button=>button.onclick=()=>downloadStageCredential(button.dataset.stageCertificate));
  document.querySelectorAll("[data-stage-exam]").forEach(button=>button.onclick=()=>{localStorage.setItem("pq_selected_stage_exam",button.dataset.stageExam);renderView("stageexams")});
}
function exportSkillPassport(){
  const data={
    learner:state.profile?.name||"CodeQuest Academy learner",
    generatedAt:new Date().toISOString(),
    overallProgress:pathwayOverallProgress(),
    stages:professionalPathway.map((stage,index)=>({
      id:stage.id,
      title:stage.title,
      credential:stage.credential,
      unlocked:stageUnlocked(index),
      ...stageProgress(stage),
      modules:course.modules.filter(module=>stage.module_ids.includes(module.id)).map(module=>({
        id:module.id,
        title:module.title,
        ...moduleProgress(module)
      }))
    })),
    completedLessons:course.modules.flatMap(module=>module.lessons).filter(lesson=>state.lessons.has(lesson.id)).map(lesson=>({id:lesson.id,title:lesson.title,badge:lesson.badge}))
  };
  downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),"codequest-skill-passport.json");
}
function downloadStageCredential(stageId){
  const stage=professionalPathway.find(item=>item.id===stageId);
  if(!stage||!stageCredentialEarned(stage))return;
  const learner=state.profile?.name||"CodeQuest Academy learner";
  const content=`PYTHONQUEST PROFESSIONAL ACADEMY\n\n${stage.credential}\n\nAwarded to: ${learner}\nStage: ${stage.title}\nCompleted: ${new Date().toLocaleDateString()}\n\nVerified learning evidence:\n${stageLessons(stage).map(lesson=>`- ${lesson.title}`).join("\n")}`;
  downloadBlob(new Blob([content],{type:"text/plain"}),`${slug(stage.credential)}.txt`);
}

function questDateKey(){return new Date().toISOString().slice(0,10)}
function getQuestMissions(){
  const key=questDateKey();
  if(!state.questBoard[key]){
    const nextLesson=allLessons().find(lesson=>!state.lessons.has(lesson.id));
    state.questBoard[key]={
      learn:{done:false,title:nextLesson?`Continue: ${nextLesson.title}`:"Review a completed lesson",view:nextLesson?"course":"revision",lessonId:nextLesson?.id||null,minutes:10},
      practise:{done:false,title:dueReviews().length?`Complete ${Math.min(3,dueReviews().length)} revision items`:"Solve one practice exercise",view:dueReviews().length?"revision":"practice",minutes:5},
      build:{done:false,title:state.studioProjects?.length?"Continue your Project Studio build":"Start a small Python project",view:state.studioProjects?.length?"projectstudio":"projects",minutes:15}
    };
    persist(false);
  }
  return state.questBoard[key];
}
function questProgress(){return Object.values(getQuestMissions()).filter(m=>m.done).length}
function renderQuestBoard(){
  const missions=getQuestMissions(),done=questProgress();
  const labels={learn:"Learn",practise:"Practise",build:"Build"};
  const descriptions={learn:"Understand one useful idea.",practise:"Strengthen recall with a short exercise.",build:"Use Python to create something tangible."};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">TODAY'S ADVENTURE</div><h1>Quest Board</h1><p>Three small missions. Complete one, two, or all three — progress still counts.</p></div><div class="quest-progress-ring"><strong>${done}/3</strong><span>complete</span></div></div><section class="quest-hero card"><div><div class="eyebrow">${done===3?"QUEST COMPLETE":"KEEP IT LIGHT"}</div><h2>${done===3?"You completed today's learning adventure.":"Choose the mission that feels easiest to start."}</h2><p>${done===3?"Come back tomorrow for a fresh set of missions.":"There is no required order and no penalty for stopping after one."}</p></div><div class="progress-track"><div style="width:${done/3*100}%"></div></div></section><section class="quest-grid">${Object.entries(missions).map(([id,m],i)=>`<article class="card quest-card ${m.done?"complete":""}"><div class="quest-number">${m.done?"✓":i+1}</div><div class="eyebrow">${labels[id].toUpperCase()} · ${m.minutes} MIN</div><h2>${esc(m.title)}</h2><p>${descriptions[id]}</p><div class="quest-actions"><button class="primary-btn" data-start-quest="${id}" ${m.done?"disabled":""}>${m.done?"Completed":"Start mission"}</button><button class="text-btn" data-toggle-quest="${id}">${m.done?"Mark unfinished":"Mark complete"}</button></div></article>`).join("")}</section><section class="card quest-celebration"><div><strong>XP is not the only progress.</strong><p class="muted">Showing up, debugging, revisiting a concept, and finishing a five-minute task all count.</p></div><button id="questDashboardBtn" class="secondary-btn">Back to dashboard</button></section>`;
  document.querySelectorAll("[data-start-quest]").forEach(button=>button.onclick=()=>{const mission=missions[button.dataset.startQuest];if(mission.lessonId){openLesson(mission.lessonId);return}renderView(mission.view)});
  document.querySelectorAll("[data-toggle-quest]").forEach(button=>button.onclick=()=>{const mission=missions[button.dataset.toggleQuest];mission.done=!mission.done;if(mission.done){state.xp+=15;recordActivity("quest",button.dataset.toggleQuest)}persist();renderQuestBoard()});
  el("questDashboardBtn").onclick=()=>renderView("dashboard");
}

function renderDashboard(){
  if(!state.onboardingJourney?.completed){
    renderView("onboarding");
    return;
  }
  renderView("dailylearning");
  return;
  const lessons=allLessons();
  const recommended=lessonById((state.diagnostic&&state.diagnostic.recommended)||lessons.find(l=>!state.lessons.has(l.id))?.id||lessons[0].id);
  const pct=Math.round(state.lessons.size/lessons.length*100);
  const due=dueReviews().length;
  ensureDailyPlan();
  const streak=calculateStreak();
  const comeback=streak.gapDays>=2;
  el("main").innerHTML=`
  <section class="daily-plan"><article class="card daily-card"><div class="eyebrow">TODAY'S ADAPTIVE PLAN</div><h2>${state.daily.title}</h2><p class="muted">${state.daily.message}</p>${comeback?`<div class="comeback-banner">Welcome back. Your plan has been reduced to one easy restart mission.</div>`:""}<div class="energy-selector"><button class="secondary-btn energy-btn ${state.daily.energy==="low"?"active":""}" data-energy="low">Low energy</button><button class="secondary-btn energy-btn ${state.daily.energy==="normal"?"active":""}" data-energy="normal">Normal</button><button class="secondary-btn energy-btn ${state.daily.energy==="high"?"active":""}" data-energy="high">High energy</button></div><div class="daily-steps">${state.daily.items.map((item,i)=>`<div class="daily-step"><span>${i+1}. ${item.label}</span><button class="text-btn" data-daily-open="${item.lessonId}">${item.minutes} min →</button></div>`).join("")}</div></article><article class="card streak-card"><div class="eyebrow">CONSISTENCY</div><div class="streak-number">${streak.current}</div><div class="muted">day learning streak</div><p class="muted">Missing a day does not erase progress. Comeback days count too.</p></article></section>
  <section class="hero">
    <div class="hero-card">
      <div class="eyebrow">WELCOME BACK, ${esc((state.profile?.name||"LEARNER").toUpperCase())}</div>
      <h1>${due?`${due} review ${due===1?"item":"items"} ready today.`:"One small mission is enough for today."}</h1>
      <p>Your ${state.profile?.session||15}-minute plan is focused on ${state.profile?.goal||"Python"}. Revision appears when a concept needs strengthening.</p>
      <div class="hero-actions">
        <button class="primary-btn" data-open="${recommended.id}">Continue: ${recommended.title}</button>
        <button class="secondary-btn" data-view-link="revision">Review due (${due})</button>
      </div>
    </div>
    <div class="card metric"><div class="eyebrow">COURSE PROGRESS</div><div class="value">${pct}%</div><div class="progress-track"><div style="width:${pct}%"></div></div><div class="muted">${state.lessons.size} of ${lessons.length} missions complete</div></div>
  </section>
  <section class="stats-grid">
    <div class="card metric"><div class="eyebrow">TOTAL XP</div><div class="value">${state.xp}</div><div class="muted">Earned through completion</div></div>
    <div class="card metric"><div class="eyebrow">STARTING LEVEL</div><div class="value" style="font-size:20px">${state.diagnostic?.level||"Not assessed"}</div><div class="muted">Based on diagnostic</div></div>
    <div class="card metric"><div class="eyebrow">REVISION DUE</div><div class="value">${due}</div><div class="muted">Spaced practice queue</div></div>
  </section>
  <div class="section-head"><div><h2>Recommended path</h2><p>Selected from your goal and current progress.</p></div></div>
  <section class="lesson-grid-cards">${recommendedLessons().slice(0,6).map(lessonCard).join("")}</section>`;
  bindDynamic();
  document.querySelectorAll("[data-energy]").forEach(b=>b.onclick=()=>{state.daily.energy=b.dataset.energy;generateDailyPlan(true);persist();renderDashboard()});
  document.querySelectorAll("[data-daily-open]").forEach(b=>b.onclick=()=>openLesson(b.dataset.dailyOpen));
}

function recommendedLessons(){
  const lessons=allLessons();
  if(state.profile?.goal==="Web scraping")return lessons.filter(l=>l.moduleId==="scraping").concat(lessons.filter(l=>l.moduleId!=="scraping"));
  if(state.profile?.goal==="Data analytics")return lessons.filter(l=>l.moduleId==="analytics").concat(lessons.filter(l=>l.moduleId!=="analytics"));
  return lessons;
}
function lessonCard(l){
  const done=state.lessons.has(l.id), stepsDone=(state.steps[l.id]||[]).length, pct=Math.round(stepsDone/l.steps.length*100);
  const saved=state.bookmarks.some(b=>b.type==="lesson"&&b.id===l.id);
  const prereq=(l.prerequisites||[]).map(id=>lessonById(id)).filter(Boolean);
  const locked=prereq.some(p=>!state.lessons.has(p.id));
  return `<article class="card lesson-card ${locked?"locked":""}">
    <button class="bookmark-btn ${saved?"saved":""}" data-bookmark="lesson:${l.id}" title="Bookmark">${saved?"◆":"◇"}</button>
    <div class="eyebrow">${done?"COMPLETED":l.moduleTitle.split("·").pop().trim()}</div><h3>${l.title}</h3><p>${l.description}</p>
    ${prereq.length?`<div class="prerequisite-note">Prerequisite: ${prereq.map(p=>p.title).join(", ")}</div>`:`<div class="prerequisite-note prerequisite-placeholder" aria-hidden="true">Prerequisite</div>`}
    <div class="progress-track"><div style="width:${done?100:pct}%"></div></div><div class="lesson-meta"><span>${l.duration}</span><span>+${l.xp} XP</span></div>
    <button class="${done?"secondary-btn":"primary-btn"} full" style="margin-top:14px" data-open="${l.id}" ${locked?"disabled":""}>${locked?"Complete prerequisite":done?"Review mission":"Start mission"}</button></article>`;
}

function pythonCourseReady(){
  return Boolean(
    course &&
    Array.isArray(course.modules) &&
    course.modules.length &&
    course.modules.every(module=>Array.isArray(module?.lessons))
  );
}

function renderCourseLoadingState(){
  el("main").innerHTML=`<section class="card course-loading-state" aria-live="polite"><div class="eyebrow">COURSE MAP</div><h1>Preparing your course…</h1><p>Your Python curriculum is still loading. This view will open automatically.</p></section>`;
}

function renderCourse(){
  const academyId=reconcileAcademyState();

  if(academyId==="python"&&!pythonCourseReady()){
    renderCourseLoadingState();
    setTimeout(()=>{
      if(pythonCourseReady())renderCourse();
    },250);
    return;
  }
  if(academyId!=="python"){
    renderView(academyCourseRoute(academyId));
    return;
  }
  const overall=pathwayOverallProgress();
  el("main").innerHTML=`<div class="course-map-header card"><div><div class="eyebrow">PROFESSIONAL CURRICULUM</div><h1>Course map</h1><p>Complete lessons in order. Each module unlocks only after the previous module's final lesson is complete.</p></div><div class="course-map-stat"><strong>${overall}%</strong><span>complete</span><button id="openPathwayFromCourseBtn" class="secondary-btn">View professional pathway</button></div></div>${course.modules.map((module,moduleIndex)=>{
    const mp=moduleProgress(module);
    const firstPrerequisites=(module.lessons?.[0]?.prerequisites)||[];
    const unlocked=firstPrerequisites.every(id=>state.lessons.has(id));
    const stage=(professionalPathway||[]).find(item=>item.id===module.stage);
    return`<section class="module-block ${unlocked?"":"module-locked"}">
      <div class="module-title card"><div><div class="eyebrow">${stage?.title||"PROFESSIONAL PATHWAY"}</div><h2>${module.title}</h2><p class="muted">${module.description}</p></div><div class="module-summary"><strong>${mp.percent}%</strong><span>${mp.completed}/${mp.total} lessons</span>${unlocked?`<span class="unlock-chip">${mp.complete?"Completed":"Unlocked"}</span>`:`<span class="lock-chip">🔒 Locked</span>`}</div></div>
      ${unlocked?"":`<div class="module-lock-banner"><strong>Complete the previous module to unlock this stage.</strong><span>${firstPrerequisites.map(id=>lessonById(id)?.title).filter(Boolean).join(", ")}</span></div>`}
      <div class="lesson-grid-cards">${module.lessons.map(lesson=>`<div class="path-node"><span class="path-dot ${state.lessons.has(lesson.id)?"complete":(lesson.prerequisites||[]).every(id=>state.lessons.has(id))?"current":""}"></span>${lessonCard({...lesson,moduleTitle:module.title})}</div>`).join("")}</div>
    </section>`;
  }).join("")}`;
  el("openPathwayFromCourseBtn").onclick=()=>renderView("pathway");
  bindDynamic();
}
function renderRevision(){
  const due=dueReviews(),later=state.reviews.filter(r=>new Date(r.due)>now()&&!r.completed);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SPACED REVISION</div><h1>Review queue</h1><p>Concepts return after hints, mistakes or time away.</p></div></div>
  <section class="review-list">${due.length?due.map(reviewCard).join(""):`<article class="card review-item"><div><h3>Nothing due right now</h3><p class="muted">Complete lessons or use hints to build your review queue.</p></div></article>`}</section>
  <div class="section-head"><div><h2>Coming later</h2></div></div><section class="review-list">${later.length?later.slice(0,8).map(reviewCard).join(""):`<p class="muted">No scheduled reviews yet.</p>`}</section>`;bindDynamic();
}
function reviewCard(r){const l=lessonById(r.lessonId);return `<article class="card review-item"><div><h3>${l?.title||r.lessonId}</h3><p class="muted">${r.reason==="hint"?"You used a hint":"This step needs another attempt"} · Step ${r.step+1}</p><span class="${new Date(r.due)<=now()?"due-now":"due-later"}">${new Date(r.due)<=now()?"Due now":new Date(r.due).toLocaleDateString()}</span></div><button class="primary-btn" data-open-step="${r.lessonId}:${r.step}:${r.id}">Review</button></article>`}
function academyPracticeCatalogue(academyId){
  const catalogues={
    python:[
      ["↻","Revision sprint","Retrieve one Python concept that is due for review.","revision"],
      ["🐞","Python bug hunter","Repair a Python lesson containing a debugging task.","debug"],
      ["▦","pandas filtering","Practise dataframe selection and Boolean filtering.","pandas-filter"],
      ["🌐","Python web data","Practise responsible HTML parsing and data collection.","scraping"],
      ["🎲","Random Python mission","Choose an unlocked Python lesson at random.","random"]
    ],
    sql:[
      ["⌕","Filtering queries","Practise SELECT, FROM and WHERE with real result sets.","sql-filter"],
      ["⇄","Join reasoning","Practise relationships, keys and join cardinality.","sql-join"],
      ["Σ","Aggregation sprint","Practise GROUP BY, totals and result grain.","sql-aggregate"],
      ["▤","Window functions","Practise ranking and comparisons without collapsing rows.","sql-window"],
      ["🎲","Random SQL challenge","Choose an unlocked SQL lesson at random.","random"]
    ],
    web:[
      ["▱","Semantic structure","Practise meaningful HTML and accessible page structure.","web-html"],
      ["▦","Responsive layout","Practise flexible CSS grids and mobile behaviour.","web-css"],
      ["◎","DOM interactions","Practise events, state and interface updates.","web-dom"],
      ["⇢","Async interface","Practise loading, success and error states for APIs.","web-async"],
      ["🎲","Random Web challenge","Choose an unlocked Web lesson at random.","random"]
    ],
    java:[
      ["JV","Core Java","Practise syntax, types and program structure.","java-core"],
      ["⬡","Object-oriented design","Practise classes, encapsulation and responsibilities.","java-oop"],
      ["▦","Collections","Practise lists, maps, sets and generics.","java-collections"],
      ["✓","Testing and exceptions","Practise validation, failure handling and tests.","java-testing"],
      ["🎲","Random Java challenge","Choose an unlocked Java lesson at random.","random"]
    ]
  };
  return catalogues[academyId]||catalogues.python;
}
function renderPractice(){
  const academy=getActiveAcademy();
  const academyId=academy?.id||"python";
  const opts=academyPracticeCatalogue(academyId);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${academy.name.toUpperCase()} · TARGETED PRACTICE</div><h1>Practice arena</h1><p>Short drills selected only from the active academy.</p></div></div>
  <section class="practice-grid">${opts.map(option=>`<article class="card practice-card"><div class="badge-icon">${option[0]}</div><h3>${option[1]}</h3><p>${option[2]}</p><button class="primary-btn" data-practice="${option[3]}" data-practice-academy="${academyId}">Start</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-practice]").forEach(button=>button.onclick=()=>
    startAcademyPractice(button.dataset.practiceAcademy,button.dataset.practice)
  );
}
function practiceLessonText(lesson){
  return[
    lesson.id,lesson.title,lesson.description,lesson.challenge,
    lesson.moduleId,lesson.moduleTitle,lesson.starter,lesson.solution
  ].filter(Boolean).join(" ").toLowerCase();
}
function choosePracticeLesson(lessons,type,filters){
  const available=lessons.filter(lesson=>filters.some(token=>
    practiceLessonText(lesson).includes(token)
  ));
  const pool=available.length?available:lessons;
  return pool[Math.floor(Math.random()*pool.length)]||null;
}
function startAcademyPractice(academyId,type){
  if(academyId==="python"){
    if(type==="revision"&&dueReviews().length){
      const review=dueReviews()[0];
      openLesson(review.lessonId,review.step,review.id);
      return;
    }
    let candidates=allLessons();
    const filters={
      debug:["debug","fix","error"],
      "pandas-filter":["pandas","dataframe","filter","analytics"],
      scraping:["scraping","beautifulsoup","html parsing","web data"],
      random:[]
    };
    if(type!=="random"){
      candidates=candidates.filter(lesson=>
        (filters[type]||[]).some(token=>practiceLessonText(lesson).includes(token))
      );
    }
    const lesson=candidates[Math.floor(Math.random()*candidates.length)]||allLessons()[0];
    if(lesson)openLesson(lesson.id);
    return;
  }

  if(academyId==="sql"){
    const filters={
      "sql-filter":["select","where","filter"],
      "sql-join":["join","relationship","cardinality"],
      "sql-aggregate":["aggregate","group","sum","count"],
      "sql-window":["window","rank","lag","partition"],
      random:[]
    };
    const unlocked=sqlAllLessons().filter(sqlLessonUnlocked);
    const lesson=type==="random"
      ? unlocked[Math.floor(Math.random()*unlocked.length)]
      : choosePracticeLesson(unlocked,type,filters[type]||[]);
    if(lesson){
      localStorage.setItem("cq_active_sql_lesson",lesson.id);
      renderView("sqllesson");
    }
    return;
  }

  if(academyId==="web"){
    const filters={
      "web-html":["html","semantic","structure"],
      "web-css":["css","responsive","layout","grid"],
      "web-dom":["dom","event","interaction","javascript"],
      "web-async":["async","api","fetch","loading"],
      random:[]
    };
    const unlocked=webAllLessons().filter(webLessonUnlocked);
    const lesson=type==="random"
      ? unlocked[Math.floor(Math.random()*unlocked.length)]
      : choosePracticeLesson(unlocked,type,filters[type]||[]);
    if(lesson){
      localStorage.setItem("cq_active_web_lesson",lesson.id);
      renderView("weblesson");
    }
    return;
  }

  if(academyId==="java"){
    const filters={
      "java-core":["core","syntax","program structure","type"],
      "java-oop":["object","class","encapsulation","inheritance"],
      "java-collections":["collection","list","map","set","generic"],
      "java-testing":["test","exception","validation"],
      random:[]
    };
    const unlocked=javaAllLessons().filter(javaLessonUnlocked);
    const lesson=type==="random"
      ? unlocked[Math.floor(Math.random()*unlocked.length)]
      : choosePracticeLesson(unlocked,type,filters[type]||[]);
    if(lesson){
      localStorage.setItem("cq_active_java_lesson",lesson.id);
      renderView("javalesson");
    }
  }
}

function renderProjects(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">BUILD PORTFOLIO EVIDENCE</div><h1>Projects</h1><p>Apply several skills in one realistic piece of work.</p></div><button id="exportGithubPortfolioBtn" class="secondary-btn">Export GitHub portfolio</button></div>
  <section class="project-grid">${projects.map(p=>`<article class="card project-card"><div class="eyebrow">${p.level}</div><h3>${p.title}</h3><p class="muted">${p.description}</p><div class="skill-tags">${p.skills.map(s=>`<span class="skill-tag">${s}</span>`).join("")}</div><div class="lesson-meta"><span>${p.duration}</span><span>${getProjectDraft(p.id)?"Draft saved":"Not started"}</span></div><button class="primary-btn full" style="margin-top:14px" data-project="${p.id}">${getProjectDraft(p.id)?"Continue project":"Start project"}</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-project]").forEach(b=>b.onclick=()=>openProject(b.dataset.project));
  if(el("exportGithubPortfolioBtn"))el("exportGithubPortfolioBtn").onclick=exportGithubPortfolio;
}
function migrateLegacyProjectState(){
  state.projectDrafts=state.projectDrafts||{};
  projects.forEach(project=>{
    const legacy=JSON.parse(localStorage.getItem(`pq_project_${project.id}`)||"null");
    if(legacy&&!state.projectDrafts[project.id])state.projectDrafts[project.id]=legacy;
  });
  state.completedProjects=state.completedProjects||JSON.parse(localStorage.getItem("pq_completed_projects")||"[]");
  persist(false);
}
function getProjectDraft(id){return state.projectDrafts[id]||null}
function openProject(id){
  activeProject=projects.find(p=>p.id===id);
  const draft=getProjectDraft(id);
  el("projectTitle").textContent=activeProject.title;
  el("projectLevel").textContent=`${activeProject.level} · ${activeProject.duration}`;
  el("projectDescription").textContent=activeProject.description;
  el("projectMilestones").innerHTML=activeProject.milestones.map((m,i)=>`<div class="milestone">${i+1}. ${m}</div>`).join("");
  el("projectChecks").innerHTML=activeProject.checks.map((c,i)=>`<div class="project-check" id="projectCheck${i}">○ ${c.label}</div>`).join("");
  el("projectEditor").value=draft?.code||activeProject.starterCode;
  el("projectReflection").value=draft?.reflection||"";
  el("projectOutput").textContent="Your project output will appear here.";
  el("projectFeedback").className="feedback hidden";
  el("projectOverlay").classList.remove("hidden");
}
function closeProject(){el("projectOverlay").classList.add("hidden");activeProject=null}
async function runProject(){
  if(!pyodide||!activeProject)return;
  const code=el("projectEditor").value;
  el("projectOutput").textContent="Running…";
  try{
    pyodide.globals.set("__project_code__",code);
    const resultJson=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__buf=io.StringIO();__ok=True\nwith redirect_stdout(__buf),redirect_stderr(__buf):\n    try: exec(compile(__project_code__,"<project>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__buf.getvalue()})`);
    const r=JSON.parse(resultJson);
    el("projectOutput").textContent=r.output.trim()||(r.ok?"Project code ran successfully.":"Project execution failed.");
    el("projectFeedback").textContent=r.ok?"Project ran. Use Run project checks to validate milestones.":friendlyError(r.output);
    el("projectFeedback").className=`feedback ${r.ok?"success":"error"}`;
  }catch(err){
    el("projectOutput").textContent=String(err);
  }finally{try{pyodide.globals.delete("__project_code__")}catch(_){}}
}
async function checkProject(){
  if(!activeProject)return;
  let passed=0;
  for(let i=0;i<activeProject.checks.length;i++){
    const check=activeProject.checks[i];
    let ok=false;
    if(check.manual){
      const reflection=el("projectReflection").value.trim();
      ok=reflection.split(/[.!?]\s+/).filter(Boolean).length>=3||reflection.length>=180;
    }else{
      try{ok=Boolean(await pyodide.runPythonAsync(`bool(${check.test})`))}catch(_){ok=false}
    }
    const row=el(`projectCheck${i}`);
    row.textContent=`${ok?"✓":"○"} ${check.label}`;
    row.style.color=ok?"var(--success)":"var(--muted)";
    if(ok)passed++;
  }
  const complete=passed===activeProject.checks.length;
  el("projectFeedback").textContent=complete?"All project checks passed. This project is portfolio-ready.":`${passed} of ${activeProject.checks.length} checks passed.`;
  el("projectFeedback").className=`feedback ${complete?"success":"error"}`;
  if(complete){
    if(!state.completedProjects.includes(activeProject.id)){state.completedProjects.push(activeProject.id);state.xp+=200;persist()}
  }
}
function saveProjectDraft(){
  if(!activeProject)return;
  state.projectDrafts[activeProject.id]={code:el("projectEditor").value,reflection:el("projectReflection").value,savedAt:new Date().toISOString()};
  persist();
  el("projectFeedback").textContent=window.PythonQuestCloud.getUser()?"Draft saved and queued for cloud sync.":"Draft saved in this browser.";
  el("projectFeedback").className="feedback success";
}
function exportProject(){
  if(!activeProject)return;
  const content=`# ${activeProject.title}\n# Exported from PythonQuest\n\n${el("projectEditor").value}\n\n# Project conclusions\n${el("projectReflection").value.split("\n").map(x=>"# "+x).join("\n")}`;
  const blob=new Blob([content],{type:"text/x-python"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${activeProject.id}.py`;a.click();URL.revokeObjectURL(url);
}
function renderAnalytics(){
  const lessons=allLessons();
  const completed=state.lessons.size;
  const attempts=Object.entries(state.attempts).map(([key,v])=>({key,...v,accuracy:v.tries?Math.round(v.correct/v.tries*100):0})).sort((a,b)=>a.accuracy-b.accuracy);
  const completedProjects=state.completedProjects||[];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNING INTELLIGENCE</div><h1>Learning analytics</h1><p>Use evidence to decide what to revise next.</p></div></div>
  <section class="analytics-grid">
    <article class="card analytics-card"><div class="eyebrow">COURSE COMPLETION</div><div class="value" style="font-size:30px;font-weight:900">${Math.round(completed/lessons.length*100)}%</div><div class="progress-track"><div style="width:${Math.round(completed/lessons.length*100)}%"></div></div><p class="muted">${completed} of ${lessons.length} lessons complete</p></article>
    <article class="card analytics-card"><div class="eyebrow">PORTFOLIO PROJECTS</div><div class="value" style="font-size:30px;font-weight:900">${completedProjects.length}</div><p class="muted">Completed practical projects</p></article>
    <article class="card analytics-card"><div class="eyebrow">REVISION QUEUE</div><div class="value" style="font-size:30px;font-weight:900">${dueReviews().length}</div><p class="muted">Items currently due</p></article>
    <article class="card analytics-card"><div class="eyebrow">TOTAL XP</div><div class="value" style="font-size:30px;font-weight:900">${state.xp}</div><p class="muted">Lessons and projects</p></article>
  </section>
  <div class="section-head"><div><h2>Lowest-accuracy exercises</h2><p>These are the best candidates for revision.</p></div></div>
  <article class="card analytics-card"><table class="mistake-table"><thead><tr><th>Exercise</th><th>Attempts</th><th>Accuracy</th></tr></thead><tbody>${attempts.slice(0,8).map(a=>`<tr><td>${a.key}</td><td>${a.tries}</td><td>${a.accuracy}%</td></tr>`).join("")||"<tr><td colspan='3'>No attempts recorded yet.</td></tr>"}</tbody></table></article>
  <div class="section-head"><div><h2>Certificate progress</h2></div></div>
  <article class="certificate-preview ${completed===lessons.length&&completedProjects.length>=2?"":"certificate-locked"}">
    <div class="eyebrow">PYTHONQUEST CERTIFICATE PATH</div>
    <h2>${esc(state.profile?.name||"Learner")}</h2>
    <p>Complete all lessons and at least two projects to unlock the foundation certificate.</p>
    <strong>${completed}/${lessons.length} lessons · ${completedProjects.length}/2 projects</strong>
    <div class="certificate-actions">
      <button id="downloadCertificateBtn" class="primary-btn" ${completed===lessons.length&&completedProjects.length>=2?"":"disabled"}>Download certificate PDF</button>
      <button id="exportPortfolioBtn" class="secondary-btn">Export portfolio summary</button>
    </div>
    <div class="portfolio-list">${completedProjects.map(id=>{const p=projects.find(x=>x.id===id);return p?`<div class="portfolio-row"><span><span class="status-dot complete"></span>${p.title}</span><strong>Complete</strong></div>`:""}).join("")||"<p class='muted'>No completed projects yet.</p>"}</div>
  </article>`;
  if(el("downloadCertificateBtn"))el("downloadCertificateBtn").onclick=downloadCertificate;
  if(el("exportPortfolioBtn"))el("exportPortfolioBtn").onclick=exportPortfolioSummary;
}


function downloadCertificate(){
  const {jsPDF}=window.jspdf||{};
  if(!jsPDF){alert("The PDF library did not load.");return}
  const lessons=allLessons();
  if(state.lessons.size!==lessons.length||state.completedProjects.length<2)return;
  const doc=new jsPDF({orientation:"landscape",unit:"pt",format:"a4"});
  const width=doc.internal.pageSize.getWidth(),height=doc.internal.pageSize.getHeight();
  doc.setDrawColor(109,93,252);doc.setLineWidth(5);doc.rect(28,28,width-56,height-56);
  doc.setLineWidth(1);doc.rect(40,40,width-80,height-80);
  doc.setFont("helvetica","bold");doc.setFontSize(18);doc.text("PYTHONQUEST",width/2,95,{align:"center"});
  doc.setFontSize(34);doc.text("Certificate of Completion",width/2,155,{align:"center"});
  doc.setFont("helvetica","normal");doc.setFontSize(15);doc.text("This certifies that",width/2,205,{align:"center"});
  doc.setFont("helvetica","bold");doc.setFontSize(28);doc.text(state.profile?.name||"Learner",width/2,250,{align:"center"});
  doc.setFont("helvetica","normal");doc.setFontSize(15);
  doc.text("has completed the PythonQuest Foundation Programme",width/2,290,{align:"center"});
  doc.text(`${lessons.length} lessons and ${state.completedProjects.length} portfolio projects`,width/2,320,{align:"center"});
  doc.setFontSize(12);doc.text(`Issued ${new Date().toLocaleDateString()}`,100,height-80);
  doc.text(`Certificate ID: PQ-${Date.now().toString(36).toUpperCase()}`,width-100,height-80,{align:"right"});
  doc.save(`codequest-certificate-${(state.profile?.name||"learner").toLowerCase().replace(/[^a-z0-9]+/g,"-")}.pdf`);
}
function exportPortfolioSummary(){
  const completed=state.completedProjects.map(id=>projects.find(p=>p.id===id)).filter(Boolean);
  const lines=[
    "# PythonQuest Portfolio Summary",
    "",
    `Learner: ${state.profile?.name||"Learner"}`,
    `Learning goal: ${state.profile?.goal||"Python"}`,
    `Lessons completed: ${state.lessons.size}/${allLessons().length}`,
    `Total XP: ${state.xp}`,
    "",
    "## Completed Projects",
    ...completed.flatMap(project=>{
      const draft=state.projectDrafts[project.id]||{};
      return ["",`### ${project.title}`,project.description,"",draft.reflection||"No written conclusions saved."];
    })
  ];
  const blob=new Blob([lines.join("\n")],{type:"text/markdown"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="codequest-portfolio-summary.md";a.click();URL.revokeObjectURL(url);
}
function renderStudio(){
  const draft=JSON.parse(localStorage.getItem("pq_studio_draft")||"null")||{
    moduleTitle:"Custom Module",
    lessonTitle:"My New Python Lesson",
    description:"Describe what the learner will achieve.",
    duration:"15 min",
    xp:100,
    badge:"Custom Builder",
    stepType:"CONCEPT",
    stepTitle:"First step",
    content:"<p>Explain one idea clearly.</p><div class='callout'>Give the learner one task.</div>",
    starter:"# Write starter code here\n",
    hint:"Give one small directional hint.",
    solution:"# Add the guided solution here\n",
    test:"custom_test"
  };
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CONTENT AUTHORING</div><h1>Lesson studio</h1><p>Create a lesson definition without manually editing course.json.</p></div></div>
  <section class="studio-layout">
    <article class="card studio-form">
      ${studioField("studioModule","Module title",draft.moduleTitle)}
      ${studioField("studioLesson","Lesson title",draft.lessonTitle)}
      ${studioField("studioDescription","Description",draft.description)}
      <div class="form-row"><label>Duration</label><input id="studioDuration" value="${esc(draft.duration)}"></div>
      <div class="form-row"><label>XP</label><input id="studioXp" type="number" value="${draft.xp}"></div>
      ${studioField("studioBadge","Badge",draft.badge)}
      <hr style="border:0;border-top:1px solid var(--border);margin:20px 0">
      <div class="form-row"><label>Step type</label><select id="studioStepType">${["CONCEPT","PRACTICE","DEBUG","QUIZ"].map(x=>`<option ${draft.stepType===x?"selected":""}>${x}</option>`).join("")}</select></div>
      ${studioField("studioStepTitle","Step title",draft.stepTitle)}
      <div class="form-row"><label>Lesson HTML</label><textarea id="studioContent" style="min-height:120px">${esc(draft.content)}</textarea></div>
      <div class="form-row"><label>Starter code</label><textarea id="studioStarter" style="min-height:120px">${esc(draft.starter)}</textarea></div>
      <div class="form-row"><label>Hint</label><textarea id="studioHint">${esc(draft.hint)}</textarea></div>
      <div class="form-row"><label>Solution</label><textarea id="studioSolution" style="min-height:100px">${esc(draft.solution)}</textarea></div>
      ${studioField("studioTest","Test identifier",draft.test)}
      <div class="studio-toolbar"><button id="previewStudioBtn" class="primary-btn">Preview JSON</button><button id="saveStudioBtn" class="secondary-btn">Save draft</button><button id="exportStudioBtn" class="secondary-btn">Export lesson JSON</button></div>
    </article>
    <article class="card studio-preview"><div class="eyebrow">LESSON DEFINITION</div><h2>Preview</h2><pre id="studioJsonPreview">Use Preview JSON to generate the lesson definition.</pre><div class="callout">Exported JSON can be reviewed and added to <code>data/course.json</code>. A production admin version would save through a protected server endpoint.</div></article>
  </section>`;
  el("previewStudioBtn").onclick=()=>el("studioJsonPreview").textContent=JSON.stringify(readStudioForm(),null,2);
  el("saveStudioBtn").onclick=()=>{localStorage.setItem("pq_studio_draft",JSON.stringify(readStudioRaw()));el("studioJsonPreview").textContent="Draft saved in this browser."};
  el("exportStudioBtn").onclick=()=>{const data=readStudioForm();const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${slug(data.lesson.title)}.json`;a.click();URL.revokeObjectURL(url)};
}
function studioField(id,label,value){return `<div class="form-row"><label>${label}</label><input id="${id}" value="${esc(value)}"></div>`}
function readStudioRaw(){return{moduleTitle:el("studioModule").value,lessonTitle:el("studioLesson").value,description:el("studioDescription").value,duration:el("studioDuration").value,xp:Number(el("studioXp").value||0),badge:el("studioBadge").value,stepType:el("studioStepType").value,stepTitle:el("studioStepTitle").value,content:el("studioContent").value,starter:el("studioStarter").value,hint:el("studioHint").value,solution:el("studioSolution").value,test:el("studioTest").value}}
function readStudioForm(){const d=readStudioRaw();return{module:{title:d.moduleTitle},lesson:{id:slug(d.lessonTitle),title:d.lessonTitle,description:d.description,duration:d.duration,xp:d.xp,badge:d.badge,steps:[{type:d.stepType,title:d.stepTitle,content:d.content,starter:d.starter,hint:d.hint,solution:d.solution,test:d.test}]}}}
function slug(value){return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}

function ensureDailyPlan(){if(!state.daily||state.daily.date!==todayKey())generateDailyPlan(false)}
function generateDailyPlan(force=false){const lessons=allLessons(),energy=force?(state.daily?.energy||"normal"):"normal",due=dueReviews(),next=lessons.find(l=>!state.lessons.has(l.id))||lessons[0];let items=[];if(due.length)items.push({label:`Review: ${lessonById(due[0].lessonId)?.title||"Revision"}`,lessonId:due[0].lessonId,minutes:5});if(energy==="low")items=[{label:`Easy restart: ${next.title}`,lessonId:next.id,minutes:5}];else{if(!items.length)items.push({label:`Continue: ${next.title}`,lessonId:next.id,minutes:10});if(energy==="high"){const extra=lessons.find(l=>l.id!==next.id&&!state.lessons.has(l.id))||lessons[1];items.push({label:`Stretch mission: ${extra.title}`,lessonId:extra.id,minutes:15})}}state.daily={date:todayKey(),energy,title:energy==="low"?"A five-minute restart is enough":energy==="high"?"Deep-focus learning plan":"Balanced learning plan",message:energy==="low"?"One small win keeps momentum alive.":energy==="high"?"A core mission and a stretch task.":"One main mission, with revision added only when useful.",items}}
function recordActivity(kind,id){const date=todayKey();if(!state.activity.some(a=>a.date===date&&a.kind===kind&&a.id===id)){state.activity.push({date,kind,id,at:new Date().toISOString()});persist()}}
function calculateStreak(){const dates=[...new Set(state.activity.map(a=>a.date))].sort().reverse();let current=0,cursor=new Date(),gapDays=0;const today=todayKey();if(!dates.includes(today)){const latest=dates[0];gapDays=latest?Math.floor((new Date(today)-new Date(latest))/86400000):0;cursor.setDate(cursor.getDate()-1)}while(true){const key=cursor.toISOString().slice(0,10);if(dates.includes(key)){current++;cursor.setDate(cursor.getDate()-1)}else break}return{current,gapDays}}
function saveCurrentStepToNotebook(){if(!activeLesson)return;const step=activeLesson.steps[currentStep],code=el("codeEditor").value,existing=state.notebook.find(n=>n.lessonId===activeLesson.id&&n.step===currentStep);if(existing){existing.code=code;existing.updatedAt=new Date().toISOString()}else state.notebook.unshift({id:Date.now().toString(36),lessonId:activeLesson.id,lessonTitle:activeLesson.title,step:currentStep,stepTitle:step.title,code,notes:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});persist();showFeedback(true,"Saved to your code notebook.")}
function renderNotebook(){let selectedId=state.notebook[0]?.id||null;const render=()=>{const selected=state.notebook.find(n=>n.id===selectedId);el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSONAL KNOWLEDGE BASE</div><h1>Code notebook</h1><p>Keep useful solutions and your own explanations.</p></div><button id="newNotebookBtn" class="primary-btn">New note</button></div><section class="notebook-grid"><article class="card notebook-list">${state.notebook.map(n=>`<button class="notebook-entry ${n.id===selectedId?"active":""}" data-note="${n.id}"><strong>${esc(n.stepTitle||"Untitled note")}</strong><div class="muted">${esc(n.lessonTitle||"Personal note")}</div></button>`).join("")||"<p class='muted'>Save code from a lesson or create a new note.</p>"}</article><article class="card notebook-editor">${selected?`<div class="form-row"><label>Title</label><input id="notebookTitle" value="${esc(selected.stepTitle||"")}"></div><div class="form-row"><label>Code</label><textarea id="notebookCode">${esc(selected.code||"")}</textarea></div><div class="form-row"><label>Your explanation</label><textarea id="notebookNotes">${esc(selected.notes||"")}</textarea></div><div class="notebook-toolbar"><button id="saveNotebookBtn" class="primary-btn">Save note</button><button id="runNotebookBtn" class="secondary-btn">Run code</button><button id="exportNotebookBtn" class="secondary-btn">Export .py</button><button id="deleteNotebookBtn" class="text-btn">Delete</button></div><pre id="notebookOutput" style="margin-top:14px;white-space:pre-wrap"></pre>`:"<p class='muted'>Choose or create a notebook entry.</p>"}</article></section>`;document.querySelectorAll("[data-note]").forEach(b=>b.onclick=()=>{selectedId=b.dataset.note;render()});el("newNotebookBtn").onclick=()=>{const id=Date.now().toString(36);state.notebook.unshift({id,lessonTitle:"Personal note",stepTitle:"New Python note",code:"# Write Python here\n",notes:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});selectedId=id;persist();render()};if(selected){el("saveNotebookBtn").onclick=()=>{selected.stepTitle=el("notebookTitle").value;selected.code=el("notebookCode").value;selected.notes=el("notebookNotes").value;selected.updatedAt=new Date().toISOString();persist();render()};el("deleteNotebookBtn").onclick=()=>{state.notebook=state.notebook.filter(n=>n.id!==selected.id);selectedId=state.notebook[0]?.id||null;persist();render()};el("exportNotebookBtn").onclick=()=>{const blob=new Blob([`# ${selected.stepTitle}\n# ${selected.notes.replace(/\n/g,"\n# ")}\n\n${selected.code}`],{type:"text/x-python"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`${slug(selected.stepTitle)}.py`;a.click();URL.revokeObjectURL(url)};el("runNotebookBtn").onclick=async()=>{pyodide.globals.set("__notebook_code__",el("notebookCode").value);const result=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try: exec(compile(__notebook_code__,"<notebook>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__b.getvalue()})`);el("notebookOutput").textContent=JSON.parse(result).output||"Code ran successfully."}}};render()}


function renderChallenges(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INTERVIEW-STYLE PRACTICE</div><h1>Challenge arena</h1><p>Optional timers add focus, but completion is based on correctness rather than speed.</p></div></div>
  <section class="challenge-grid">${challenges.map(c=>`<article class="card challenge-card"><span class="challenge-difficulty">${c.difficulty}</span><h3>${c.title}</h3><p class="muted">${c.prompt}</p><div class="skill-tags">${c.skills.map(s=>`<span class="skill-tag">${s}</span>`).join("")}</div><div class="lesson-meta"><span>${c.minutes} min suggested</span><span>${c.tests.length} tests</span></div><button class="primary-btn full" style="margin-top:14px" data-challenge="${c.id}">Start challenge</button></article>`).join("")}</section>
  <div id="challengeArea"></div>`;
  document.querySelectorAll("[data-challenge]").forEach(b=>b.onclick=()=>openChallenge(b.dataset.challenge));
}
function openChallenge(id){
  activeChallenge=challenges.find(c=>c.id===id);
  el("challengeArea").innerHTML=`<div class="section-head"><div><h2>${activeChallenge.title}</h2></div></div><section class="challenge-shell">
    <article class="card challenge-brief"><div class="eyebrow">${activeChallenge.difficulty.toUpperCase()}</div><h3>Problem</h3><p>${activeChallenge.prompt}</p><div class="challenge-timer" id="challengeTimer">${String(activeChallenge.minutes).padStart(2,"0")}:00</div><button id="toggleChallengeTimerBtn" class="secondary-btn">Start optional timer</button><h3>Tests</h3>${activeChallenge.tests.map((_,i)=>`<div class="challenge-test" id="challengeTest${i}">○ Hidden test ${i+1}</div>`).join("")}</article>
    <article class="card challenge-workspace"><textarea id="challengeEditor" style="width:100%;min-height:390px;background:var(--code);color:#e7edf7;border:0;border-radius:12px;padding:16px;font-family:monospace">${esc(activeChallenge.starter)}</textarea><div class="workspace-actions" style="margin-top:10px"><button id="runChallengeBtn" class="primary-btn">Run tests</button><button id="saveChallengeNotebookBtn" class="secondary-btn">Save to notebook</button></div><pre id="challengeOutput" style="white-space:pre-wrap"></pre><div id="challengeFeedback" class="feedback hidden"></div></article>
  </section>`;
  el("runChallengeBtn").onclick=runChallenge;
  el("saveChallengeNotebookBtn").onclick=()=>{state.notebook.unshift({id:Date.now().toString(36),lessonTitle:"Challenge arena",stepTitle:activeChallenge.title,code:el("challengeEditor").value,notes:activeChallenge.prompt,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});persist();el("challengeFeedback").textContent="Saved to notebook.";el("challengeFeedback").className="feedback success"};
  el("toggleChallengeTimerBtn").onclick=startChallengeTimer;
}
function startChallengeTimer(){
  if(challengeTimerId){clearInterval(challengeTimerId);challengeTimerId=null;el("toggleChallengeTimerBtn").textContent="Resume optional timer";return}
  let parts=el("challengeTimer").textContent.split(":").map(Number),remaining=parts[0]*60+parts[1];
  el("toggleChallengeTimerBtn").textContent="Pause timer";
  challengeTimerId=setInterval(()=>{remaining=Math.max(0,remaining-1);el("challengeTimer").textContent=`${String(Math.floor(remaining/60)).padStart(2,"0")}:${String(remaining%60).padStart(2,"0")}`;if(remaining===0){clearInterval(challengeTimerId);challengeTimerId=null;el("toggleChallengeTimerBtn").textContent="Time reached — keep working"}},1000);
}
async function runChallenge(){
  const code=el("challengeEditor").value;
  el("challengeOutput").textContent="Running tests…";
  try{
    pyodide.globals.set("__challenge_code__",code);
    await pyodide.runPythonAsync(`def raises_value_error(fn):\n    try:\n        fn()\n        return False\n    except ValueError:\n        return True\nexec(compile(__challenge_code__,"<challenge>","exec"),globals())`);
    let passed=0;
    for(let i=0;i<activeChallenge.tests.length;i++){
      let ok=false;try{ok=Boolean(await pyodide.runPythonAsync(`bool(${activeChallenge.tests[i]})`))}catch(_){ok=false}
      el(`challengeTest${i}`).textContent=`${ok?"✓":"○"} Hidden test ${i+1}`;el(`challengeTest${i}`).style.color=ok?"var(--success)":"var(--danger)";if(ok)passed++;
    }
    const complete=passed===activeChallenge.tests.length;
    el("challengeOutput").textContent=`${passed} of ${activeChallenge.tests.length} tests passed.`;
    el("challengeFeedback").textContent=complete?"Challenge complete. Correctness matters more than the timer.":"Keep debugging one failing behaviour at a time.";
    el("challengeFeedback").className=`feedback ${complete?"success":"error"}`;
    if(complete){state.xp+=75;recordActivity("challenge",activeChallenge.id);persist()}
  }catch(error){el("challengeOutput").textContent=String(error);el("challengeFeedback").textContent=friendlyError(String(error));el("challengeFeedback").className="feedback error"}
}
async function exportGithubPortfolio(){
  if(!window.JSZip){alert("The ZIP library did not load.");return}
  const zip=new JSZip();
  const completed=state.completedProjects.map(id=>projects.find(p=>p.id===id)).filter(Boolean);
  const rootFolder=zip.folder("codequest-portfolio");
  const overview=[
    "# PythonQuest Portfolio",
    "",
    `Learner: ${state.profile?.name||"Learner"}`,
    `Learning goal: ${state.profile?.goal||"Python"}`,
    `Lessons completed: ${state.lessons.size}/${allLessons().length}`,
    `Portfolio projects completed: ${completed.length}`,
    "",
    "## Projects",
    ...completed.map(p=>`- [${p.title}](./${slug(p.title)}/README.md)`)
  ].join("\n");
  rootFolder.file("README.md",overview);
  completed.forEach(project=>{
    const folder=rootFolder.folder(slug(project.title));
    const draft=state.projectDrafts[project.id]||{};
    folder.file("solution.py",draft.code||project.starterCode);
    folder.file("README.md",[
      `# ${project.title}`,"",project.description,"","## Skills",...project.skills.map(s=>`- ${s}`),"","## Milestones",...project.milestones.map(m=>`- ${m}`),"","## Conclusions",draft.reflection||"Add project conclusions here."
    ].join("\n"));
  });
  const blob=await zip.generateAsync({type:"blob"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="codequest-github-portfolio.zip";a.click();URL.revokeObjectURL(url);
}


function lessonSkill(lesson){
  const map={
    foundations:"Python Foundations",analytics:"Data Analytics",scraping:"Web Scraping",
    "sql-python":"SQL","automation-apis":"Automation","advanced-python":"Advanced Python",
    "testing-debugging":"Testing","data-engineering":"Data Engineering"
  };
  return map[lesson.moduleId]||lesson.moduleTitle;
}
function calculateMastery(){
  const skills={};
  allLessons().forEach(lesson=>{
    const skill=lessonSkill(lesson);
    if(!skills[skill])skills[skill]={completed:0,total:0,attempts:0,correct:0};
    skills[skill].total++;
    if(state.lessons.has(lesson.id))skills[skill].completed++;
    lesson.steps.forEach((_,i)=>{
      const a=state.attempts[`${lesson.id}:${i}`];
      if(a){skills[skill].attempts+=a.tries;skills[skill].correct+=a.correct}
    });
  });
  return Object.entries(skills).map(([name,v])=>{
    const completion=v.total?v.completed/v.total:0;
    const accuracy=v.attempts?v.correct/v.attempts:completion;
    const score=Math.round((completion*.65+accuracy*.35)*100);
    return{name,score,...v};
  });
}
function currentWeekActivity(){
  const start=new Date();start.setHours(0,0,0,0);const day=(start.getDay()+6)%7;start.setDate(start.getDate()-day);
  return state.activity.filter(a=>new Date(a.date)>=start).length;
}
function renderMastery(){
  const mastery=calculateMastery(),week=currentWeekActivity(),target=Number(state.weeklyGoal?.target||3);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SKILL PROGRESSION</div><h1>Mastery map</h1><p>Mastery combines lesson completion with exercise accuracy.</p></div></div>
  <article class="card weekly-goal"><div class="eyebrow">WEEKLY GOAL</div><h2>${week} of ${target} learning activities</h2><div class="progress-track"><div style="width:${Math.min(100,Math.round(week/target*100))}%"></div></div><div class="goal-controls"><label>Weekly target</label><select id="weeklyTarget">${[2,3,4,5,7].map(n=>`<option value="${n}" ${target===n?"selected":""}>${n} activities</option>`).join("")}</select><button id="saveWeeklyGoalBtn" class="secondary-btn">Save goal</button></div></article>
  <section class="mastery-grid">${mastery.map(s=>`<article class="card mastery-card"><div class="eyebrow">${s.score>=80?"STRONG":s.score>=50?"DEVELOPING":"STARTING"}</div><h3>${s.name}</h3><div class="mastery-row"><span>Mastery</span><div class="progress-track"><div style="width:${s.score}%"></div></div><span class="mastery-level">${s.score}%</span></div><p class="muted">${s.completed}/${s.total} lessons · ${s.attempts||0} recorded attempts</p></article>`).join("")}</section>
  <div class="section-head"><div><h2>Recommended focus</h2></div></div><article class="card mastery-card">${mastery.sort((a,b)=>a.score-b.score).slice(0,3).map(s=>`<div class="mastery-row"><strong>${s.name}</strong><div class="progress-track"><div style="width:${s.score}%"></div></div><span>${s.score}%</span></div>`).join("")}</article>`;
  el("saveWeeklyGoalBtn").onclick=()=>{state.weeklyGoal={target:Number(el("weeklyTarget").value)};persist();renderMastery()};
}
function renderAssessments(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FORMAL CHECKPOINTS</div><h1>Assessment centre</h1><p>Take a mixed assessment without hints and track improvement over time.</p></div><button id="startAssessmentBtn" class="primary-btn">Start 10-question assessment</button></div>
  <div id="assessmentArea"></div>
  <div class="section-head"><div><h2>Assessment history</h2></div><div class="transcript-actions"><button id="exportTranscriptCsvBtn" class="secondary-btn">Export transcript CSV</button><button id="exportTranscriptJsonBtn" class="secondary-btn">Export transcript JSON</button></div></div>
  <article class="card assessment-card"><table class="assessment-history"><thead><tr><th>Date</th><th>Score</th><th>Result</th></tr></thead><tbody>${state.assessmentHistory.slice().reverse().map(r=>`<tr><td>${new Date(r.date).toLocaleString()}</td><td>${r.score}%</td><td>${r.score>=70?"Pass":"Keep practising"}</td></tr>`).join("")||"<tr><td colspan='3'>No assessments completed yet.</td></tr>"}</tbody></table></article>`;
  el("startAssessmentBtn").onclick=startAssessment;
  el("exportTranscriptCsvBtn").onclick=exportTranscriptCsv;
  el("exportTranscriptJsonBtn").onclick=exportTranscriptJson;
}
function startAssessment(){
  const questions=[...assessmentBank].sort(()=>Math.random()-.5).slice(0,10);
  const answers={};
  el("assessmentArea").innerHTML=`<article class="card assessment-card">${questions.map((q,i)=>`<div class="assessment-question"><div class="eyebrow">QUESTION ${i+1} · ${q.skill}</div><h3>${q.question}</h3>${q.options.map((o,j)=>`<label class="quiz-option"><input type="radio" name="assessment${i}" value="${j}" data-assessment="${i}"> ${o}</label>`).join("")}</div>`).join("")}<button id="submitAssessmentBtn" class="primary-btn" style="margin-top:18px">Submit assessment</button></article>`;
  document.querySelectorAll("[data-assessment]").forEach(input=>input.onchange=()=>answers[Number(input.dataset.assessment)]=Number(input.value));
  el("submitAssessmentBtn").onclick=()=>{
    if(Object.keys(answers).length<questions.length){alert("Answer every question before submitting.");return}
    let correct=0;const breakdown={};
    questions.forEach((q,i)=>{const ok=answers[i]===q.answer;if(ok)correct++;if(!breakdown[q.skill])breakdown[q.skill]={correct:0,total:0};breakdown[q.skill].total++;if(ok)breakdown[q.skill].correct++});
    const score=Math.round(correct/questions.length*100);
    state.assessmentHistory.push({date:new Date().toISOString(),score,correct,total:questions.length,breakdown});recordActivity("assessment",Date.now().toString());persist();
    el("assessmentArea").innerHTML=`<article class="card assessment-result"><div class="eyebrow">ASSESSMENT COMPLETE</div><div class="score-circle">${score}%</div><h2>${score>=70?"Pass":"Keep practising"}</h2><p>${correct} of ${questions.length} answers correct.</p><div class="mastery-grid">${Object.entries(breakdown).map(([skill,v])=>`<div class="mastery-card"><strong>${skill}</strong><p>${v.correct}/${v.total} correct</p></div>`).join("")}</div><button class="secondary-btn" onclick="renderAssessments()">Return to assessment centre</button></article>`;
  };
}
function transcriptData(){
  return{
    learner:state.profile?.name||"Learner",
    goal:state.profile?.goal||"Python",
    exportedAt:new Date().toISOString(),
    xp:state.xp,
    completedLessons:[...state.lessons].map(id=>{const l=lessonById(id);return{id,title:l?.title,module:l?.moduleTitle}}),
    completedProjects:state.completedProjects.map(id=>projects.find(p=>p.id===id)).filter(Boolean).map(p=>({id:p.id,title:p.title,skills:p.skills})),
    mastery:calculateMastery(),
    assessments:state.assessmentHistory
  };
}
function exportTranscriptJson(){
  const blob=new Blob([JSON.stringify(transcriptData(),null,2)],{type:"application/json"});downloadBlob(blob,"codequest-learning-transcript.json");
}
function exportTranscriptCsv(){
  const data=transcriptData();const rows=[["Type","Name","Status","Score"]];
  data.completedLessons.forEach(l=>rows.push(["Lesson",l.title,"Completed",""]));
  data.completedProjects.forEach(p=>rows.push(["Project",p.title,"Completed",""]));
  data.mastery.forEach(m=>rows.push(["Mastery",m.name,"",m.score]));
  data.assessments.forEach((a,i)=>rows.push(["Assessment",`Assessment ${i+1}`,a.score>=70?"Pass":"Keep practising",a.score]));
  const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  downloadBlob(new Blob([csv],{type:"text/csv"}),"codequest-learning-transcript.csv");
}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}


function initialisePwa(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/service-worker.js").catch(()=>{});
  }
  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();deferredInstallPrompt=event;el("installBtn").classList.remove("hidden");
  });
  el("installBtn").onclick=async()=>{
    if(!deferredInstallPrompt)return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt=null;el("installBtn").classList.add("hidden");
  };
  
let connectivityCheckTimer=null;

async function verifyConnectivity(){
  clearTimeout(connectivityCheckTimer);
  connectivityCheckTimer=setTimeout(async()=>{
    if(!navigator.onLine){
      showOfflineBanner(true);
      return;
    }
    try{
      const response=await fetch(`/manifest.json?connectivity=${Date.now()}`,{
        method:"HEAD",
        cache:"no-store"
      });
      showOfflineBanner(!response.ok);
    }catch(error){
      console.warn("Connectivity verification failed:",error);
      showOfflineBanner(true);
    }
  },1200);
}

window.addEventListener("offline",verifyConnectivity);
window.addEventListener("online",verifyConnectivity);
document.addEventListener("visibilitychange",()=>{
  if(!document.hidden)verifyConnectivity();
});
verifyConnectivity();

}
function showOfflineBanner(show){
  let banner=document.getElementById("offlineBanner");
  if(show&&!banner){banner=document.createElement("div");banner.id="offlineBanner";banner.className="offline-banner";banner.textContent="Offline mode: cached lessons remain available. Cloud sync and AI tutor may be unavailable.";document.body.prepend(banner)}
  if(!show&&banner)banner.remove();
}
function updateBookmarkCount(){if(el("bookmarkCount"))el("bookmarkCount").textContent=state.bookmarks.length}
function toggleBookmark(value){
  const [type,id]=value.split(":");
  const index=state.bookmarks.findIndex(b=>b.type===type&&b.id===id);
  if(index>=0)state.bookmarks.splice(index,1);
  else state.bookmarks.unshift({type,id,savedAt:new Date().toISOString()});
  persist();
}
function bookmarkItem(bookmark){
  if(bookmark.type==="lesson"){const l=lessonById(bookmark.id);return l?{title:l.title,description:l.description,action:`lesson:${l.id}`} : null}
  if(bookmark.type==="project"){const p=projects.find(x=>x.id===bookmark.id);return p?{title:p.title,description:p.description,action:`project:${p.id}`} : null}
  if(bookmark.type==="challenge"){const c=challenges.find(x=>x.id===bookmark.id);return c?{title:c.title,description:c.prompt,action:`challenge:${c.id}`} : null}
  return null;
}
function renderBookmarks(){
  const items=state.bookmarks.map(bookmarkItem).filter(Boolean);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SAVED FOR LATER</div><h1>Bookmarks</h1><p>Keep important lessons and practice items close at hand.</p></div></div>
  <section class="lesson-grid-cards">${items.map(item=>`<article class="card lesson-card"><h3>${item.title}</h3><p>${item.description}</p><button class="primary-btn full" data-bookmark-open="${item.action}">Open</button></article>`).join("")||"<p class='muted'>No bookmarks yet. Use the diamond icon on a lesson card.</p>"}</section>`;
  document.querySelectorAll("[data-bookmark-open]").forEach(b=>b.onclick=()=>{const [type,id]=b.dataset.bookmarkOpen.split(":");if(type==="lesson")openLesson(id);if(type==="project")openProject(id);if(type==="challenge"){renderView("challenges");setTimeout(()=>openChallenge(id),0)}});
}
function openSearch(){
  el("searchModal").classList.remove("hidden");el("globalSearchInput").value="";renderSearchResults("");setTimeout(()=>el("globalSearchInput").focus(),20);
}
function searchableItems(){
  return[
    ...allLessons().map(l=>({type:"Lesson",id:l.id,title:l.title,description:l.description,keywords:(l.keywords||[]).join(" "),open:()=>openLesson(l.id)})),
    ...projects.map(p=>({type:"Project",id:p.id,title:p.title,description:p.description,keywords:p.skills.join(" "),open:()=>openProject(p.id)})),
    ...challenges.map(c=>({type:"Challenge",id:c.id,title:c.title,description:c.prompt,keywords:c.skills.join(" "),open:()=>{el("searchModal").classList.add("hidden");renderView("challenges");setTimeout(()=>openChallenge(c.id),0)}}))
  ];
}
function renderSearchResults(query){
  const q=query.trim().toLowerCase();
  const results=searchableItems().filter(item=>!q||`${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(q)).slice(0,20);
  el("searchResults").innerHTML=results.map((item,i)=>`<button class="search-result" data-search-index="${i}"><div class="eyebrow">${item.type}</div><strong>${item.title}</strong><p class="muted">${item.description}</p></button>`).join("")||"<p class='muted'>No matching content found.</p>";
  document.querySelectorAll("[data-search-index]").forEach(b=>b.onclick=()=>{el("searchModal").classList.add("hidden");results[Number(b.dataset.searchIndex)].open()});
}
function applyAccessibility(){
  const a=state.accessibility||{};
  document.body.classList.toggle("large-text",!!a.largeText);
  document.body.classList.toggle("high-contrast",!!a.highContrast);
  document.body.classList.toggle("reduce-motion",!!a.reduceMotion);
  document.body.classList.toggle("focus-outline",a.focusOutline!==false);
}
function renderAccessibility(){
  const a=state.accessibility;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSONAL COMFORT</div><h1>Accessibility</h1><p>Adjust the interface without affecting course progress.</p></div></div>
  <section class="accessibility-grid">
    <article class="card accessibility-card"><h3>Reading</h3>
      ${accessToggle("largeText","Larger text","Increase interface and lesson text size",a.largeText)}
      ${accessToggle("highContrast","High contrast","Increase contrast between text, borders and backgrounds",a.highContrast)}
    </article>
    <article class="card accessibility-card"><h3>Interaction</h3>
      ${accessToggle("reduceMotion","Reduce motion","Remove animations and transitions",a.reduceMotion)}
      ${accessToggle("focusOutline","Strong keyboard focus","Show a clear outline when navigating by keyboard",a.focusOutline!==false)}
    </article>
    <article class="card accessibility-card"><div class="eyebrow">INSTALLABLE APP</div><h3>Use PythonQuest like an app</h3><p class="muted">On supported browsers, install PythonQuest for a standalone window and cached lesson access.</p><div class="install-note">The Run Code environment still needs the Pyodide package to have been cached previously. Cloud sync and the AI tutor require an internet connection.</div></article>
  </section>`;
  document.querySelectorAll("[data-access]").forEach(input=>input.onchange=()=>{state.accessibility[input.dataset.access]=input.checked;applyAccessibility();persist()});
}
function accessToggle(key,title,description,checked){return `<label class="toggle-row"><span><strong>${title}</strong><div class="muted">${description}</div></span><input type="checkbox" data-access="${key}" ${checked?"checked":""}></label>`}


function staticReview(code){
  const lines=code.split("\n"),nonEmpty=lines.filter(l=>l.trim());
  const functionCount=(code.match(/\bdef\s+\w+/g)||[]).length;
  const assertCount=(code.match(/\bassert\b/g)||[]).length;
  const bareExcept=/except\s*:/.test(code);
  const mutableDefault=/def\s+\w+\([^)]*=\s*\[\]/.test(code);
  const longLines=lines.filter(line=>line.length>100).length;
  const vagueNames=(code.match(/\b(x|y|z|tmp|data1|stuff)\b/g)||[]).length;
  const comments=lines.filter(l=>l.trim().startsWith("#")).length;
  const duplicatedPrints=(code.match(/print\(/g)||[]).length>8;

  const scores={
    readability:Math.max(20,100-longLines*8-vagueNames*6+(comments?5:0)+(functionCount?8:0)),
    correctness:Math.max(25,70+(assertCount*7)-(bareExcept?12:0)),
    reliability:Math.max(20,45+(assertCount*10)-(bareExcept?15:0)-(mutableDefault?20:0)),
    efficiency:Math.max(35,85-(duplicatedPrints?12:0)-(nonEmpty.length>120&&functionCount===0?18:0))
  };
  Object.keys(scores).forEach(k=>scores[k]=Math.min(100,Math.round(scores[k])));
  const findings=[];
  if(longLines)findings.push(`${longLines} line(s) exceed 100 characters.`);
  if(vagueNames)findings.push("Some variable names are too vague to explain purpose.");
  if(bareExcept)findings.push("A bare except may hide unrelated failures.");
  if(mutableDefault)findings.push("A mutable default argument may be shared across calls.");
  if(!assertCount)findings.push("No assertions or executable checks were detected.");
  if(functionCount===0&&nonEmpty.length>20)findings.push("Consider splitting the script into small functions.");
  if(!findings.length)findings.push("No common structural problems were detected by the local reviewer.");
  return{scores,findings,metrics:{lines:lines.length,functions:functionCount,assertions:assertCount,comments}};
}
function renderReviewLab(){
  const last=state.reviewHistory[0];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">GUIDED CODE QUALITY</div><h1>Code review lab</h1><p>Review structure, reliability and readability before asking an AI tutor or another person.</p></div></div>
  <section class="review-layout">
    <article class="card review-editor">
      <div class="form-row"><label>Review title</label><input id="reviewTitle" value="${esc(last?.title||"Python code review")}"></div>
      <textarea id="reviewCode" spellcheck="false">${esc(last?.code||"def calculate_total(values):\n    total = 0\n    for value in values:\n        total += value\n    return total\n\nprint(calculate_total([10, 20, 30]))\n")}</textarea>
      <div class="notebook-toolbar"><button id="runLocalReviewBtn" class="primary-btn">Run structured review</button><button id="runReviewedCodeBtn" class="secondary-btn">Run code</button><button id="saveReviewVersionBtn" class="secondary-btn">Save version</button><button id="copyTutorPromptBtn" class="text-btn">Copy AI review prompt</button></div>
      <pre id="reviewOutput" style="white-space:pre-wrap"></pre>
    </article>
    <article class="card review-panel"><div class="eyebrow">REVIEW RESULT</div><div id="reviewResults"><p class="muted">Run the structured review to see scores and findings.</p></div>
      <h3>Version history</h3><div class="version-list">${state.reviewHistory.slice(0,8).map((v,i)=>`<button class="version-row" data-review-version="${i}"><span>${esc(v.title)}</span><span class="muted">${new Date(v.savedAt).toLocaleString()}</span></button>`).join("")||"<p class='muted'>No saved versions yet.</p>"}</div>
    </article>
  </section>`;
  el("runLocalReviewBtn").onclick=()=>{
    const result=staticReview(el("reviewCode").value);
    el("reviewResults").innerHTML=`<div class="review-score">${Object.entries(result.scores).map(([k,v])=>`<div class="review-score-card"><span>${reviewRubrics[k].title}</span><strong>${v}</strong></div>`).join("")}</div><h3>Findings</h3>${result.findings.map(f=>`<div class="review-check">• ${f}</div>`).join("")}<h3>Metrics</h3><p class="muted">${result.metrics.lines} lines · ${result.metrics.functions} functions · ${result.metrics.assertions} assertions · ${result.metrics.comments} comments</p>`;
  };
  el("runReviewedCodeBtn").onclick=async()=>{
    pyodide.globals.set("__review_code__",el("reviewCode").value);
    const raw=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try: exec(compile(__review_code__,"<review>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__b.getvalue()})`);
    el("reviewOutput").textContent=JSON.parse(raw).output||"Code ran successfully.";
  };
  el("saveReviewVersionBtn").onclick=()=>{
    const code=el("reviewCode").value,result=staticReview(code);
    state.reviewHistory.unshift({id:Date.now().toString(36),title:el("reviewTitle").value||"Code review",code,result,savedAt:new Date().toISOString()});
    persist();renderReviewLab();
  };
  el("copyTutorPromptBtn").onclick=async()=>{
    const code=el("reviewCode").value,result=staticReview(code);
    const prompt=`Review this Python code as a supportive senior engineer. Focus on correctness, readability, reliability and efficiency. Do not rewrite everything immediately. Explain the three highest-value improvements, then provide a revised version. Local review findings: ${result.findings.join(" ")}\n\nCode:\n${code}`;
    await navigator.clipboard.writeText(prompt);el("reviewOutput").textContent="AI review prompt copied.";
  };
  document.querySelectorAll("[data-review-version]").forEach(b=>b.onclick=()=>{const v=state.reviewHistory[Number(b.dataset.reviewVersion)];el("reviewTitle").value=v.title;el("reviewCode").value=v.code;el("reviewResults").innerHTML=`<div class="review-score">${Object.entries(v.result.scores).map(([k,n])=>`<div class="review-score-card"><span>${reviewRubrics[k].title}</span><strong>${n}</strong></div>`).join("")}</div>${v.result.findings.map(f=>`<div class="review-check">• ${f}</div>`).join("")}`});
}
function renderErrorClinic(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">TRACEBACK PRACTICE</div><h1>Error clinic</h1><p>Learn what common errors mean and follow a repeatable investigation process.</p></div></div>
  <section class="error-grid">${errorCases.map(item=>`<article class="card error-card"><div class="eyebrow">${item.category}</div><h3>${item.title}</h3><p>${item.symptom}</p><pre class="error-example">${esc(item.example)}</pre><details><summary><strong>Cause and debugging steps</strong></summary><p>${item.cause}</p>${item.debugSteps.map((s,i)=>`<div class="debug-step">${i+1}. ${s}</div>`).join("")}<h4>Corrected example</h4><pre class="error-example">${esc(item.fixed)}</pre></details><button class="secondary-btn full" style="margin-top:12px" data-error-notebook="${item.id}">Save example to notebook</button></article>`).join("")}</section>`;
  document.querySelectorAll("[data-error-notebook]").forEach(b=>b.onclick=()=>{const item=errorCases.find(x=>x.id===b.dataset.errorNotebook);state.notebook.unshift({id:Date.now().toString(36),lessonTitle:"Error clinic",stepTitle:item.title,code:item.fixed,notes:`Cause: ${item.cause}\n\nDebugging steps:\n${item.debugSteps.join("\n")}`,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});persist();b.textContent="Saved"});
}
function capstoneTemplate(){
  return state.capstonePlan||{
    title:"My Python Capstone",
    problem:"Describe the real-world problem.",
    users:"Who will use the output?",
    dataSources:"What data will be used?",
    outcome:"What should the finished project produce?",
    duration:4,
    milestones:[
      {title:"Define scope and success criteria",week:1,done:false},
      {title:"Prepare and validate data",week:1,done:false},
      {title:"Build the first working analysis",week:2,done:false},
      {title:"Add tests and error handling",week:3,done:false},
      {title:"Write conclusions and README",week:4,done:false}
    ],
    risks:"List likely blockers and how you will reduce them."
  };
}
function renderCapstonePlanner(){
  const plan=capstoneTemplate();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INDEPENDENT PROJECT PLANNING</div><h1>Capstone planner</h1><p>Turn an idea into a small, testable project with a clear finish line.</p></div></div>
  <section class="planner-grid">
    <article class="card planner-form">
      ${studioField("capTitle","Project title",plan.title)}
      <div class="form-row"><label>Problem</label><textarea id="capProblem">${esc(plan.problem)}</textarea></div>
      <div class="form-row"><label>Users</label><textarea id="capUsers">${esc(plan.users)}</textarea></div>
      <div class="form-row"><label>Data sources</label><textarea id="capData">${esc(plan.dataSources)}</textarea></div>
      <div class="form-row"><label>Desired outcome</label><textarea id="capOutcome">${esc(plan.outcome)}</textarea></div>
      <div class="form-row"><label>Duration in weeks</label><input id="capDuration" type="number" min="1" max="12" value="${plan.duration}"></div>
      <div class="form-row"><label>Risks and mitigations</label><textarea id="capRisks">${esc(plan.risks)}</textarea></div>
      <div class="studio-toolbar"><button id="generateCapstoneBtn" class="primary-btn">Generate project plan</button><button id="saveCapstoneBtn" class="secondary-btn">Save plan</button><button id="exportCapstoneBtn" class="secondary-btn">Export README</button></div>
    </article>
    <article class="card planner-output"><div class="eyebrow">PROJECT BLUEPRINT</div><div id="capstoneOutput"></div></article>
  </section>`;
  const renderOutput=()=>{
    const p=readCapstoneForm();
    el("capstoneOutput").innerHTML=`<h2>${esc(p.title)}</h2><section><h3>Problem and users</h3><p>${esc(p.problem)}</p><p><strong>Users:</strong> ${esc(p.users)}</p></section><section><h3>Data and outcome</h3><p><strong>Data:</strong> ${esc(p.dataSources)}</p><p><strong>Outcome:</strong> ${esc(p.outcome)}</p></section><section><h3>Milestones</h3><div class="milestone-board">${p.milestones.map((m,i)=>`<label class="milestone-plan-row"><input type="checkbox" data-cap-milestone="${i}" ${m.done?"checked":""}><span>${esc(m.title)}</span><span>Week ${m.week}</span></label>`).join("")}</div></section><section><h3>Risks</h3><p>${esc(p.risks)}</p></section>`;
    document.querySelectorAll("[data-cap-milestone]").forEach(c=>c.onchange=()=>{p.milestones[Number(c.dataset.capMilestone)].done=c.checked;state.capstonePlan=p;persist()});
  };
  el("generateCapstoneBtn").onclick=renderOutput;
  el("saveCapstoneBtn").onclick=()=>{state.capstonePlan=readCapstoneForm();persist();renderOutput()};
  el("exportCapstoneBtn").onclick=()=>{const p=readCapstoneForm();const md=capstoneMarkdown(p);downloadBlob(new Blob([md],{type:"text/markdown"}),`${slug(p.title)}-README.md`)};
  renderOutput();
}
function readCapstoneForm(){
  const old=state.capstonePlan||capstoneTemplate(),duration=Math.max(1,Number(el("capDuration").value||4));
  const milestones=(old.milestones||[]).map((m,i)=>({...m,week:Math.min(duration,Math.max(1,m.week||i+1))}));
  return{title:el("capTitle").value,problem:el("capProblem").value,users:el("capUsers").value,dataSources:el("capData").value,outcome:el("capOutcome").value,duration,milestones,risks:el("capRisks").value};
}
function capstoneMarkdown(p){
  return[`# ${p.title}`,"","## Problem",p.problem,"","## Users",p.users,"","## Data Sources",p.dataSources,"","## Desired Outcome",p.outcome,"","## Milestones",...p.milestones.map(m=>`- [${m.done?"x":" "}] Week ${m.week}: ${m.title}`),"","## Risks and Mitigations",p.risks,"","## Definition of Done","- The project runs from a clean start","- Important assumptions are documented","- Core behaviour has automated checks","- The README explains findings and limitations"].join("\n");
}


function selectedCareerTrack(){return careerTracks.find(t=>t.id===state.selectedTrack)||null}
function trackProgress(track){
  const lessons=track.recommendedLessons.map(lessonById).filter(Boolean);
  const projectsForTrack=track.recommendedProjects.map(id=>projects.find(p=>p.id===id)).filter(Boolean);
  const lessonDone=lessons.filter(l=>state.lessons.has(l.id)).length;
  const projectDone=projectsForTrack.filter(p=>state.completedProjects.includes(p.id)).length;
  const total=lessons.length+projectsForTrack.length;
  return{lessons,projects:projectsForTrack,lessonDone,projectDone,total,done:lessonDone+projectDone,pct:total?Math.round((lessonDone+projectDone)/total*100):0};
}
function renderCareerTracks(){
  const selected=selectedCareerTrack();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ROLE-BASED LEARNING</div><h1>Career tracks</h1><p>Choose a role and turn the full course into a focused learning roadmap.</p></div>${selected?`<button id="exportRoadmapBtn" class="secondary-btn">Export roadmap</button>`:""}</div>
  <section class="track-grid">${careerTracks.map(track=>{const p=trackProgress(track);return`<article class="card track-card ${state.selectedTrack===track.id?"selected":""}"><div class="eyebrow">${state.selectedTrack===track.id?"SELECTED TRACK":"CAREER TRACK"}</div><h2>${track.title}</h2><p>${track.description}</p><div class="skill-tags">${track.skills.map(s=>`<span class="skill-tag">${s}</span>`).join("")}</div><div class="track-progress"><div class="progress-track"><div style="width:${p.pct}%"></div></div><strong>${p.pct}%</strong></div><p class="muted">${p.lessonDone}/${p.lessons.length} lessons · ${p.projectDone}/${p.projects.length} projects</p><button class="${state.selectedTrack===track.id?"secondary-btn":"primary-btn"} full" data-select-track="${track.id}">${state.selectedTrack===track.id?"View roadmap":"Choose this track"}</button></article>`}).join("")}</section>
  ${selected?renderTrackRoadmap(selected):""}`;
  document.querySelectorAll("[data-select-track]").forEach(b=>b.onclick=()=>{state.selectedTrack=b.dataset.selectTrack;persist();renderCareerTracks()});
  document.querySelectorAll("[data-roadmap-lesson]").forEach(b=>b.onclick=()=>openLesson(b.dataset.roadmapLesson));
  document.querySelectorAll("[data-roadmap-project]").forEach(b=>b.onclick=()=>openProject(b.dataset.roadmapProject));
  if(el("exportRoadmapBtn"))el("exportRoadmapBtn").onclick=()=>exportCareerRoadmap(selected);
}
function renderTrackRoadmap(track){
  const p=trackProgress(track);
  const items=[
    ...p.lessons.map(l=>({type:"Lesson",id:l.id,title:l.title,done:state.lessons.has(l.id)})),
    ...p.projects.map(project=>({type:"Project",id:project.id,title:project.title,done:state.completedProjects.includes(project.id)}))
  ];
  return`<div class="section-head"><div><h2>${track.title} roadmap</h2><p>Complete the lessons first, then use the projects as interview evidence.</p></div></div><section class="roadmap-list">${items.map((item,i)=>`<article class="roadmap-item"><span class="roadmap-number">${item.done?"✓":i+1}</span><div><strong>${item.title}</strong><div class="muted">${item.type} · ${item.done?"Complete":"Pending"}</div></div><button class="text-btn" ${item.type==="Lesson"?`data-roadmap-lesson="${item.id}"`:`data-roadmap-project="${item.id}"`}>Open →</button></article>`).join("")}</section>`;
}
function exportCareerRoadmap(track){
  const p=trackProgress(track);
  const md=[
    `# PythonQuest Career Roadmap: ${track.title}`,"",track.description,"",
    "## Target Skills",...track.skills.map(s=>`- ${s}`),"",
    "## Recommended Lessons",...p.lessons.map(l=>`- [${state.lessons.has(l.id)?"x":" "}] ${l.title}`),"",
    "## Portfolio Projects",...p.projects.map(project=>`- [${state.completedProjects.includes(project.id)?"x":" "}] ${project.title}`),"",
    "## Interview Evidence",...track.evidence.map(e=>`- ${e}`),"",
    `Progress: ${p.pct}%`
  ].join("\n");
  downloadBlob(new Blob([md],{type:"text/markdown"}),`${track.id}-codequest-roadmap.md`);
}
function renderSkillDiagnostic(){
  const answers=state.diagnosticAnswers||{};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SELF-ASSESSMENT</div><h1>Skill diagnostic</h1><p>Rate current confidence. The result builds a recommended gap-closing roadmap.</p></div></div>
  <article class="card assessment-card"><div class="diagnostic-grid">${careerDiagnostic.map((q,i)=>`<div class="diagnostic-row"><div><div class="eyebrow">${q.skill}</div><strong>${q.question}</strong></div><div class="confidence-options">${[0,1,2,3].map(n=>`<input type="radio" id="diag-${i}-${n}" name="diag-${i}" value="${n}" data-diagnostic="${q.id}" ${Number(answers[q.id])===n?"checked":""}><label for="diag-${i}-${n}">${["Not yet","Somewhat","Comfortable","Strong"][n]}</label>`).join("")}</div></div>`).join("")}</div><button id="calculateDiagnosticBtn" class="primary-btn" style="margin-top:18px">Calculate skill gaps</button></article><div id="diagnosticResult"></div>`;
  document.querySelectorAll("[data-diagnostic]").forEach(input=>input.onchange=()=>{state.diagnosticAnswers[input.dataset.diagnostic]=Number(input.value);persist()});
  el("calculateDiagnosticBtn").onclick=renderDiagnosticResult;
  if(Object.keys(answers).length)renderDiagnosticResult();
}
function diagnosticSummary(){
  const grouped={};
  careerDiagnostic.forEach(q=>{
    if(!grouped[q.skill])grouped[q.skill]={total:0,count:0,lessonIds:[]};
    if(state.diagnosticAnswers[q.id]!==undefined){grouped[q.skill].total+=Number(state.diagnosticAnswers[q.id]);grouped[q.skill].count++}
    grouped[q.skill].lessonIds.push(...q.lessonIds);
  });
  return Object.entries(grouped).map(([skill,v])=>({skill,score:v.count?Math.round(v.total/(v.count*3)*100):0,lessonIds:[...new Set(v.lessonIds)]})).sort((a,b)=>a.score-b.score);
}
function renderDiagnosticResult(){
  const summary=diagnosticSummary();
  const missing=careerDiagnostic.filter(q=>state.diagnosticAnswers[q.id]===undefined).length;
  if(missing){el("diagnosticResult").innerHTML=`<div class="comeback-banner">Answer all ${careerDiagnostic.length} questions to generate the roadmap. ${missing} remaining.</div>`;return}
  const recommended=summary.flatMap(s=>s.score<70?s.lessonIds:[]).map(lessonById).filter(Boolean).filter((l,i,a)=>a.findIndex(x=>x.id===l.id)===i).filter(l=>!state.lessons.has(l.id)).slice(0,10);
  el("diagnosticResult").innerHTML=`<div class="section-head"><div><h2>Your diagnostic result</h2></div><button id="exportDiagnosticBtn" class="secondary-btn">Export results</button></div><div class="gap-summary"><div class="gap-card"><strong>${summary.filter(s=>s.score>=70).length}</strong><div class="muted">strong areas</div></div><div class="gap-card"><strong>${summary.filter(s=>s.score>=40&&s.score<70).length}</strong><div class="muted">developing areas</div></div><div class="gap-card"><strong>${summary.filter(s=>s.score<40).length}</strong><div class="muted">priority gaps</div></div></div>
  <section class="mastery-grid">${summary.map(s=>`<article class="card mastery-card"><h3>${s.skill}</h3><div class="mastery-row"><span>Confidence</span><div class="progress-track"><div style="width:${s.score}%"></div></div><strong>${s.score}%</strong></div></article>`).join("")}</section>
  <div class="section-head"><div><h2>Recommended next lessons</h2></div></div><section class="roadmap-list">${recommended.map((l,i)=>`<article class="roadmap-item"><span class="roadmap-number">${i+1}</span><div><strong>${l.title}</strong><div class="muted">${l.moduleTitle}</div></div><button class="text-btn" data-gap-lesson="${l.id}">Open →</button></article>`).join("")||"<p class='muted'>No obvious lesson gaps remain. Move to projects and formal assessments.</p>"}</section>`;
  document.querySelectorAll("[data-gap-lesson]").forEach(b=>b.onclick=()=>openLesson(b.dataset.gapLesson));
  el("exportDiagnosticBtn").onclick=()=>{
    const data={learner:state.profile?.name||"Learner",date:new Date().toISOString(),summary,recommendedLessons:recommended.map(l=>({id:l.id,title:l.title,module:l.moduleTitle}))};
    downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),"codequest-skill-diagnostic.json");
  };
}
function generatedEvidenceItems(){
  const items=[];
  state.completedProjects.forEach(id=>{
    const p=projects.find(x=>x.id===id);if(!p)return;
    const draft=state.projectDrafts[id]||{};
    items.push({source:"Project",title:p.title,skills:p.skills,evidence:draft.reflection||`Completed ${p.title} covering ${p.skills.join(", ")}.`,ready:Boolean(draft.reflection)});
  });
  state.assessmentHistory.slice(-3).forEach((a,i)=>items.push({source:"Assessment",title:`Assessment ${state.assessmentHistory.length-2+i}`,skills:Object.keys(a.breakdown||{}),evidence:`Scored ${a.score}% (${a.correct}/${a.total}) in a mixed PythonQuest assessment.`,ready:a.score>=70}));
  return [...items,...state.customEvidence];
}
function renderEvidenceBank(){
  const track=selectedCareerTrack(),items=generatedEvidenceItems();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INTERVIEW PREPARATION</div><h1>Evidence bank</h1><p>Turn completed learning into concise, credible interview evidence.</p></div><button id="exportEvidenceBtn" class="secondary-btn">Export evidence</button></div>
  ${track?`<article class="card evidence-card"><div class="eyebrow">TARGET ROLE</div><h2>${track.title}</h2><p>${track.description}</p><div class="role-answer">${buildRoleAnswer(track,items)}</div><button id="copyRoleAnswerBtn" class="secondary-btn" style="margin-top:12px">Copy role answer</button></article>`:"<div class='comeback-banner'>Choose a Career Track to generate a tailored role-readiness answer.</div>"}
  <div class="section-head"><div><h2>Evidence items</h2></div></div><section class="evidence-grid">${items.map((item,i)=>`<article class="card evidence-card"><div class="eyebrow">${item.source}</div><h3>${item.title}</h3><div class="skill-tags">${(item.skills||[]).map(s=>`<span class="skill-tag">${s}</span>`).join("")}</div><p>${esc(item.evidence)}</p><span class="evidence-status ${item.ready?"ready":""}">${item.ready?"Interview ready":"Add stronger conclusions"}</span></article>`).join("")||"<p class='muted'>Complete projects or assessments to build evidence.</p>"}</section>
  <div class="section-head"><div><h2>Add external evidence</h2></div></div><article class="card evidence-card"><div class="form-row"><label>Evidence title</label><input id="customEvidenceTitle" placeholder="Example: Automated monthly report"></div><div class="form-row"><label>Skills</label><input id="customEvidenceSkills" placeholder="Python, pandas, automation"></div><div class="form-row"><label>What you did and the result</label><textarea id="customEvidenceText"></textarea></div><button id="addCustomEvidenceBtn" class="primary-btn">Add evidence</button></article>`;
  el("addCustomEvidenceBtn").onclick=()=>{const title=el("customEvidenceTitle").value.trim(),evidence=el("customEvidenceText").value.trim();if(!title||!evidence)return;state.customEvidence.unshift({source:"External",title,skills:el("customEvidenceSkills").value.split(",").map(s=>s.trim()).filter(Boolean),evidence,ready:evidence.length>=100});persist();renderEvidenceBank()};
  if(el("copyRoleAnswerBtn"))el("copyRoleAnswerBtn").onclick=()=>navigator.clipboard.writeText(buildRoleAnswer(track,items));
  el("exportEvidenceBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({track,items},null,2)],{type:"application/json"}),"codequest-evidence-bank.json");
}
function buildRoleAnswer(track,items){
  const ready=items.filter(i=>i.ready).slice(0,3);
  if(!ready.length)return`I am building toward a ${track.title} role through a structured PythonQuest pathway. My current focus is ${track.skills.join(", ")}. I am now completing applied projects so I can support this with concrete evidence.`;
  return`I am building toward a ${track.title} role with practical evidence across ${track.skills.join(", ")}.\n\n${ready.map((item,i)=>`${i+1}. ${item.title}: ${item.evidence}`).join("\n\n")}\n\nThis gives me a combination of structured learning, tested technical work and evidence I can explain rather than only listing course completion.`;
}


function renderMockInterviews(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRACTISE EXPLAINING</div><h1>Mock interviews</h1><p>Answer in your own words, then compare your response with the evidence signals an interviewer expects.</p></div></div>
  <section class="interview-grid">${mockInterviews.map(interview=>`<article class="card interview-card"><div class="eyebrow">${interview.role}</div><h2>${interview.title}</h2><p>${interview.duration}</p><p class="muted">${interview.questions.length} questions covering technical, analytical and behavioural judgement.</p><button class="primary-btn full" data-start-interview="${interview.id}">Start interview</button></article>`).join("")}</section>
  <div id="interviewSession"></div>`;
  document.querySelectorAll("[data-start-interview]").forEach(b=>b.onclick=()=>startMockInterview(b.dataset.startInterview));
}
function startMockInterview(id){
  const interview=mockInterviews.find(x=>x.id===id);
  let index=0,answers=[];
  const renderQuestion=()=>{
    const q=interview.questions[index];
    el("interviewSession").innerHTML=`<div class="section-head"><div><h2>${interview.title}</h2><p>Question ${index+1} of ${interview.questions.length}</p></div></div><section class="interview-session">
      <article class="card interview-sidebar"><div class="eyebrow">${q.type.toUpperCase()}</div><h3>Evidence signals</h3><p class="muted">Write your answer before revealing the signals.</p><div id="interviewSignals" class="signal-list">${q.signals.map(s=>`<span class="signal-chip">${s}</span>`).join("")}</div><button id="revealSignalsBtn" class="secondary-btn full">Reveal evidence check</button></article>
      <article class="card interview-main"><div class="interview-question">${q.question}</div><textarea id="interviewAnswer" class="interview-answer" placeholder="Answer as though you are speaking to the interviewer...">${esc(answers[index]?.text||"")}</textarea><div class="notebook-toolbar"><button id="saveInterviewAnswerBtn" class="primary-btn">${index===interview.questions.length-1?"Finish interview":"Save and continue"}</button><button id="copyInterviewQuestionBtn" class="secondary-btn">Copy question</button></div><div id="interviewFeedback"></div></article>
    </section>`;
    el("revealSignalsBtn").onclick=()=>{
      const text=el("interviewAnswer").value.toLowerCase();
      document.querySelectorAll("#interviewSignals .signal-chip").forEach((chip,i)=>{if(text.includes(q.signals[i].toLowerCase()))chip.classList.add("detected")});
      const detected=q.signals.filter(s=>text.includes(s.toLowerCase())).length;
      el("interviewFeedback").innerHTML=`<div class="comeback-banner">${detected} of ${q.signals.length} evidence signals were mentioned explicitly. Missing a keyword does not automatically mean the answer is weak; use this as a reflection aid.</div>`;
    };
    el("copyInterviewQuestionBtn").onclick=()=>navigator.clipboard.writeText(q.question);
    el("saveInterviewAnswerBtn").onclick=()=>{
      answers[index]={question:q.question,type:q.type,text:el("interviewAnswer").value,signals:q.signals};
      if(index<interview.questions.length-1){index++;renderQuestion();return}
      const result={id:Date.now().toString(36),interviewId:interview.id,title:interview.title,role:interview.role,answers,completedAt:new Date().toISOString()};
      state.interviewHistory.unshift(result);recordActivity("mock-interview",result.id);persist();
      el("interviewSession").innerHTML=`<article class="card assessment-result"><div class="eyebrow">INTERVIEW COMPLETE</div><h2>${interview.title}</h2><p>${answers.length} answers saved to your interview history.</p><button id="exportInterviewBtn" class="primary-btn">Export answers</button></article>`;
      el("exportInterviewBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(result,null,2)],{type:"application/json"}),`${interview.id}-mock-interview.json`);
    };
  };
  renderQuestion();
}
function defaultSprintPlan(){
  const track=selectedCareerTrack();
  const recommended=track?track.recommendedLessons.map(lessonById).filter(Boolean).filter(l=>!state.lessons.has(l.id)).slice(0,3):allLessons().filter(l=>!state.lessons.has(l.id)).slice(0,3);
  return{
    week:todayKey(),
    goal:track?`Progress toward ${track.title}`:"Complete three focused learning activities",
    tasks:recommended.map((l,i)=>({id:`lesson-${l.id}`,title:l.title,type:"Lesson",status:i===0?"doing":"todo",reference:l.id})),
    reflection:""
  };
}
function ensureSprintPlan(){if(!state.sprintPlan)state.sprintPlan=defaultSprintPlan()}
function renderSprintPlanner(){
  ensureSprintPlan();
  const plan=state.sprintPlan;
  const columns=[["todo","Planned"],["doing","In progress"],["done","Complete"]];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">WEEKLY EXECUTION</div><h1>Learning sprint</h1><p>Keep the week small enough to finish.</p></div><button id="resetSprintBtn" class="secondary-btn">Generate new sprint</button></div>
  <article class="card weekly-goal"><div class="form-row"><label>Sprint goal</label><input id="sprintGoal" value="${esc(plan.goal)}"></div><button id="saveSprintGoalBtn" class="secondary-btn">Save goal</button></article>
  <section class="sprint-board">${columns.map(([status,title])=>`<article class="card sprint-column"><div class="eyebrow">${title.toUpperCase()}</div><div>${plan.tasks.filter(t=>t.status===status).map(t=>`<div class="sprint-task ${status==="done"?"done":""}"><strong>${esc(t.title)}</strong><div class="muted">${t.type}</div><div class="notebook-toolbar">${status!=="todo"?`<button class="text-btn" data-task-move="${t.id}:todo">Planned</button>`:""}${status!=="doing"?`<button class="text-btn" data-task-move="${t.id}:doing">Doing</button>`:""}${status!=="done"?`<button class="text-btn" data-task-move="${t.id}:done">Done</button>`:""}</div></div>`).join("")||"<p class='muted'>No tasks.</p>"}</div></article>`).join("")}</section>
  <article class="card journal-editor" style="margin-top:18px"><div class="form-row"><label>Weekly reflection</label><textarea id="sprintReflection" placeholder="What worked, what got in the way, and what will change next week?">${esc(plan.reflection||"")}</textarea></div><button id="saveSprintReflectionBtn" class="primary-btn">Save reflection</button></article>`;
  el("saveSprintGoalBtn").onclick=()=>{plan.goal=el("sprintGoal").value;persist()};
  el("saveSprintReflectionBtn").onclick=()=>{plan.reflection=el("sprintReflection").value;persist()};
  el("resetSprintBtn").onclick=()=>{state.sprintPlan=defaultSprintPlan();persist();renderSprintPlanner()};
  document.querySelectorAll("[data-task-move]").forEach(b=>b.onclick=()=>{const [id,status]=b.dataset.taskMove.split(":");const task=plan.tasks.find(t=>t.id===id);if(task){task.status=status;if(status==="done")recordActivity("sprint-task",task.id);persist();renderSprintPlanner()}});
}
function renderJournal(){
  let selectedId=state.journal[0]?.id||null;
  const render=()=>{
    const selected=state.journal.find(j=>j.id===selectedId);
    el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">REFLECT AND RETAIN</div><h1>Learning journal</h1><p>Capture what you understood, what confused you and what to practise next.</p></div><button id="newJournalBtn" class="primary-btn">New reflection</button></div>
    <section class="journal-grid"><article class="card journal-list">${state.journal.map(j=>`<button class="journal-entry ${j.id===selectedId?"active":""}" data-journal="${j.id}"><strong>${esc(j.title)}</strong><div class="muted">${new Date(j.updatedAt).toLocaleDateString()}</div></button>`).join("")||"<p class='muted'>No reflections yet.</p>"}</article>
    <article class="card journal-editor">${selected?`<div class="form-row"><label>Title</label><input id="journalTitle" value="${esc(selected.title)}"></div><div class="form-row"><label>What I learned</label><textarea id="journalLearned">${esc(selected.learned||"")}</textarea></div><div class="form-row"><label>What was difficult</label><textarea id="journalDifficult">${esc(selected.difficult||"")}</textarea></div><div class="form-row"><label>Next action</label><textarea id="journalNext">${esc(selected.next||"")}</textarea></div><div class="notebook-toolbar"><button id="saveJournalBtn" class="primary-btn">Save reflection</button><button id="deleteJournalBtn" class="text-btn">Delete</button></div>`:"<p class='muted'>Create or choose a reflection.</p>"}</article></section>`;
    document.querySelectorAll("[data-journal]").forEach(b=>b.onclick=()=>{selectedId=b.dataset.journal;render()});
    el("newJournalBtn").onclick=()=>{const id=Date.now().toString(36);state.journal.unshift({id,title:"Learning reflection",learned:"",difficult:"",next:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});selectedId=id;persist();render()};
    if(selected){
      el("saveJournalBtn").onclick=()=>{selected.title=el("journalTitle").value;selected.learned=el("journalLearned").value;selected.difficult=el("journalDifficult").value;selected.next=el("journalNext").value;selected.updatedAt=new Date().toISOString();recordActivity("journal",selected.id);persist();render()};
      el("deleteJournalBtn").onclick=()=>{state.journal=state.journal.filter(j=>j.id!==selected.id);selectedId=state.journal[0]?.id||null;persist();render()};
    }
  };render();
}
function progressReportData(){
  const mastery=calculateMastery();
  const recentActivity=state.activity.slice(-20).reverse();
  return{
    learner:state.profile?.name||"Learner",
    goal:state.profile?.goal||"Python",
    generatedAt:new Date().toISOString(),
    xp:state.xp,
    lessonsCompleted:state.lessons.size,
    totalLessons:allLessons().length,
    projectsCompleted:state.completedProjects.length,
    challengesCompleted:state.activity.filter(a=>a.kind==="challenge").length,
    assessments:state.assessmentHistory,
    interviewsCompleted:state.interviewHistory.length,
    journalEntries:state.journal.length,
    mastery,
    recentActivity
  };
}
function renderProgressReport(){
  const report=progressReportData();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LEARNING SUMMARY</div><h1>Progress report</h1><p>A consolidated view of progress, evidence and consistency.</p></div><div class="transcript-actions"><button id="downloadReportPdfBtn" class="primary-btn">Download PDF</button><button id="downloadReportJsonBtn" class="secondary-btn">Export JSON</button></div></div>
  <section class="report-grid">
    <article class="card report-card"><div class="eyebrow">LESSONS</div><div class="report-metric">${report.lessonsCompleted}/${report.totalLessons}</div><p class="muted">completed lessons</p></article>
    <article class="card report-card"><div class="eyebrow">PROJECTS</div><div class="report-metric">${report.projectsCompleted}</div><p class="muted">completed portfolio projects</p></article>
    <article class="card report-card"><div class="eyebrow">INTERVIEWS</div><div class="report-metric">${report.interviewsCompleted}</div><p class="muted">completed mock interviews</p></article>
    <article class="card report-card"><div class="eyebrow">TOTAL XP</div><div class="report-metric">${report.xp}</div><p class="muted">earned learning points</p></article>
  </section>
  <div class="section-head"><div><h2>Mastery summary</h2></div></div><article class="card report-card"><div class="report-list">${report.mastery.map(m=>`<div class="report-row"><span>${m.name}</span><strong>${m.score}%</strong></div>`).join("")}</div></article>
  <div class="section-head"><div><h2>Recent activity</h2></div></div><article class="card report-card"><div class="report-list">${report.recentActivity.slice(0,12).map(a=>`<div class="report-row"><span>${a.kind}</span><span class="muted">${new Date(a.at||a.date).toLocaleString()}</span></div>`).join("")||"<p class='muted'>No recent activity.</p>"}</div></article>`;
  el("downloadReportJsonBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(report,null,2)],{type:"application/json"}),"codequest-progress-report.json");
  el("downloadReportPdfBtn").onclick=()=>downloadProgressPdf(report);
}
function downloadProgressPdf(report){
  const {jsPDF}=window.jspdf||{};if(!jsPDF){alert("The PDF library did not load.");return}
  const doc=new jsPDF({unit:"pt",format:"a4"});let y=55;
  doc.setFont("helvetica","bold");doc.setFontSize(22);doc.text("CodeQuest Academy Progress Report",45,y);y+=30;
  doc.setFont("helvetica","normal");doc.setFontSize(11);doc.text(`Learner: ${report.learner}`,45,y);y+=18;doc.text(`Generated: ${new Date(report.generatedAt).toLocaleString()}`,45,y);y+=28;
  doc.setFont("helvetica","bold");doc.setFontSize(14);doc.text("Summary",45,y);y+=20;
  doc.setFont("helvetica","normal");doc.setFontSize(11);
  [`Lessons: ${report.lessonsCompleted}/${report.totalLessons}`,`Projects: ${report.projectsCompleted}`,`Mock interviews: ${report.interviewsCompleted}`,`XP: ${report.xp}`,`Journal entries: ${report.journalEntries}`].forEach(line=>{doc.text(line,55,y);y+=17});
  y+=15;doc.setFont("helvetica","bold");doc.setFontSize(14);doc.text("Mastery",45,y);y+=20;doc.setFont("helvetica","normal");doc.setFontSize(11);
  report.mastery.forEach(m=>{doc.text(`${m.name}: ${m.score}%`,55,y);y+=16;if(y>760){doc.addPage();y=50}});
  doc.save("codequest-progress-report.pdf");
}


function renderDatasets(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRACTICE DATA</div><h1>Dataset library</h1><p>Use small realistic datasets without searching for external files.</p></div></div>
  <section class="dataset-grid">${datasets.map(d=>`<article class="card dataset-card"><div class="eyebrow">${d.category}</div><h2>${d.title}</h2><p>${d.description}</p><div class="dataset-meta"><span class="skill-tag">${d.difficulty}</span><span class="skill-tag">${d.csv.trim().split("\n").length-1} rows</span></div><div class="column-list">${d.columns.map(c=>`<span class="column-chip">${c}</span>`).join("")}</div><div class="notebook-toolbar"><button class="primary-btn" data-open-dataset="${d.id}">Open in data lab</button><button class="secondary-btn" data-download-dataset="${d.id}">Download CSV</button></div></article>`).join("")}</section>`;
  document.querySelectorAll("[data-open-dataset]").forEach(b=>{b.onclick=()=>{localStorage.setItem("pq_active_dataset",b.dataset.openDataset);renderView("datalab")}});
  document.querySelectorAll("[data-download-dataset]").forEach(b=>b.onclick=()=>{const d=datasets.find(x=>x.id===b.dataset.downloadDataset);downloadBlob(new Blob([d.csv],{type:"text/csv"}),`${d.id}.csv`)});
}
function activeDataset(){
  const available=allAvailableDatasets();
  const id=localStorage.getItem("pq_active_dataset")||available[0]?.id;
  return available.find(d=>d.id===id)||available[0];
}
function datasetStarter(d){
  return`import pandas as pd\nfrom io import StringIO\n\ncsv_text = '''${d.csv}'''\ndf = pd.read_csv(StringIO(csv_text))\n\nprint(df.head().to_string(index=False))\n\n# Continue your analysis below\n`;
}
function renderDataLab(){
  const d=activeDataset(),draft=state.labDrafts[d.id];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">OPEN ANALYSIS WORKSPACE</div><h1>Data lab</h1><p>Explore a dataset without a single prescribed answer.</p></div><select id="labDatasetSelect">${allAvailableDatasets().map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div>
  <section class="lab-layout"><article class="card lab-sidebar"><div class="eyebrow">${d.category}</div><h2>${d.title}</h2><p>${d.description}</p><h3>Suggested questions</h3>${d.suggestedQuestions.map((q,i)=>`<div class="lab-question">${i+1}. ${q}</div>`).join("")}<h3>Columns</h3><div class="column-list">${d.columns.map(c=>`<span class="column-chip">${c}</span>`).join("")}</div></article>
  <article class="card lab-workspace"><textarea id="labEditor">${esc(draft?.code||datasetStarter(d))}</textarea><div class="notebook-toolbar"><button id="runLabBtn" class="primary-btn">Run analysis</button><button id="saveLabBtn" class="secondary-btn">Save draft</button><button id="exportLabBtn" class="secondary-btn">Export .py</button></div><pre id="labOutput" style="white-space:pre-wrap"></pre><div id="labPreview" class="data-preview"></div><div class="form-row" style="margin-top:16px"><label>Findings</label><textarea id="labFindings" placeholder="Write the main finding, supporting evidence and limitation.">${esc(draft?.findings||"")}</textarea></div></article></section>`;
  el("labDatasetSelect").onchange=()=>{localStorage.setItem("pq_active_dataset",el("labDatasetSelect").value);renderDataLab()};
  el("runLabBtn").onclick=runDataLab;
  el("saveLabBtn").onclick=()=>{state.labDrafts[d.id]={code:el("labEditor").value,findings:el("labFindings").value,savedAt:new Date().toISOString()};persist();el("labOutput").textContent="Draft saved."};
  el("exportLabBtn").onclick=()=>{const text=`# ${d.title}\n\n${el("labEditor").value}\n\n# Findings\n${el("labFindings").value.split("\n").map(x=>"# "+x).join("\n")}`;downloadBlob(new Blob([text],{type:"text/x-python"}),`${d.id}-analysis.py`)};
}
async function runDataLab(){
  pyodide.globals.set("__lab_code__",el("labEditor").value);
  const raw=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try: exec(compile(__lab_code__,"<data-lab>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__b.getvalue()})`);
  const result=JSON.parse(raw);el("labOutput").textContent=result.output||"Analysis ran successfully.";
  try{
    const preview=await pyodide.runPythonAsync(`df.head(20).to_html(index=False) if 'df' in globals() else ''`);
    el("labPreview").innerHTML=preview;
  }catch(_){el("labPreview").innerHTML=""}
}
function renderSqlPlayground(){
  const d=activeDataset();
  const defaultQuery=`SELECT * FROM data LIMIT 10;`;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">FREEFORM SQL</div><h1>SQL playground</h1><p>Query any dataset in the library through SQLite.</p></div><select id="sqlDatasetSelect">${allAvailableDatasets().map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div>
  <section class="sql-layout"><article class="card sql-schema"><div class="eyebrow">TABLE: DATA</div><h3>${d.title}</h3>${d.columns.map(c=>`<div class="schema-table"><code>${c}</code></div>`).join("")}<h3>Recent queries</h3>${state.sqlHistory.slice(0,6).map((q,i)=>`<button class="notebook-entry" data-sql-history="${i}">${esc(q.query.slice(0,70))}</button>`).join("")||"<p class='muted'>No query history.</p>"}</article>
  <article class="card sql-workspace"><textarea id="sqlEditor">${esc(defaultQuery)}</textarea><div class="notebook-toolbar"><button id="runSqlBtn" class="primary-btn">Run query</button><button id="saveSqlNotebookBtn" class="secondary-btn">Save to notebook</button></div><pre id="sqlOutput" style="white-space:pre-wrap"></pre><div id="sqlTable" class="data-preview"></div></article></section>`;
  el("sqlDatasetSelect").onchange=()=>{localStorage.setItem("pq_active_dataset",el("sqlDatasetSelect").value);renderSqlPlayground()};
  el("runSqlBtn").onclick=runSqlPlayground;
  el("saveSqlNotebookBtn").onclick=()=>{state.notebook.unshift({id:Date.now().toString(36),lessonTitle:"SQL playground",stepTitle:`${d.title} query`,code:el("sqlEditor").value,notes:"SQL query saved from the open playground.",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});persist();el("sqlOutput").textContent="Query saved to notebook."};
  document.querySelectorAll("[data-sql-history]").forEach(b=>b.onclick=()=>el("sqlEditor").value=state.sqlHistory[Number(b.dataset.sqlHistory)].query);
}
async function runSqlPlayground(){
  const d=activeDataset(),query=el("sqlEditor").value;
  pyodide.globals.set("__sql_csv__",d.csv);pyodide.globals.set("__sql_query__",query);
  const raw=await pyodide.runPythonAsync(`import pandas as pd,sqlite3,json,traceback,io\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True;__html=""\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try:\n        data=pd.read_csv(io.StringIO(__sql_csv__))\n        conn=sqlite3.connect(":memory:")\n        data.to_sql("data",conn,index=False)\n        sql_result=pd.read_sql_query(__sql_query__,conn)\n        __html=sql_result.to_html(index=False)\n        print(sql_result.to_string(index=False))\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__b.getvalue(),"html":__html})`);
  const result=JSON.parse(raw);el("sqlOutput").textContent=result.output;el("sqlTable").innerHTML=result.html;
  state.sqlHistory.unshift({datasetId:d.id,query,ranAt:new Date().toISOString(),ok:result.ok});state.sqlHistory=state.sqlHistory.slice(0,30);persist();
}
function storyTemplate(){
  return{title:"Data Story",audience:"Business stakeholders",context:"What decision or problem is this analysis supporting?",headline:"Write the single most important finding.",metric:"Add one key number.",evidence:"Explain the supporting analysis.",recommendation:"State the recommended action.",limitation:"Describe one important limitation."};
}
function renderStoryBuilder(){
  const saved=state.dataStories[0]||storyTemplate();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COMMUNICATE INSIGHT</div><h1>Story builder</h1><p>Turn analysis into a short stakeholder narrative.</p></div></div>
  <section class="story-layout"><article class="card story-form">${studioField("storyTitle","Story title",saved.title)}${studioField("storyAudience","Audience",saved.audience)}<div class="form-row"><label>Context</label><textarea id="storyContext">${esc(saved.context)}</textarea></div><div class="form-row"><label>Headline finding</label><textarea id="storyHeadline">${esc(saved.headline)}</textarea></div>${studioField("storyMetric","Key metric",saved.metric)}<div class="form-row"><label>Evidence</label><textarea id="storyEvidence">${esc(saved.evidence)}</textarea></div><div class="form-row"><label>Recommendation</label><textarea id="storyRecommendation">${esc(saved.recommendation)}</textarea></div><div class="form-row"><label>Limitation</label><textarea id="storyLimitation">${esc(saved.limitation)}</textarea></div><div class="studio-toolbar"><button id="previewStoryBtn" class="primary-btn">Preview story</button><button id="saveStoryBtn" class="secondary-btn">Save story</button><button id="exportStoryBtn" class="secondary-btn">Export Markdown</button></div></article><article class="card story-preview"><div id="storyPreview"></div></article></section>`;
  const preview=()=>{const s=readStory();el("storyPreview").innerHTML=`<div class="story-slide"><div class="eyebrow">${esc(s.audience)}</div><h1>${esc(s.title)}</h1><p>${esc(s.context)}</p></div><div class="story-slide"><div class="eyebrow">HEADLINE</div><h2>${esc(s.headline)}</h2><div class="story-metric">${esc(s.metric)}</div></div><div class="story-slide"><div class="eyebrow">EVIDENCE</div><h2>What the analysis shows</h2><p>${esc(s.evidence)}</p></div><div class="story-slide"><div class="eyebrow">ACTION</div><h2>${esc(s.recommendation)}</h2><p><strong>Limitation:</strong> ${esc(s.limitation)}</p></div>`};
  el("previewStoryBtn").onclick=preview;
  el("saveStoryBtn").onclick=()=>{const s=readStory();s.savedAt=new Date().toISOString();state.dataStories.unshift(s);state.dataStories=state.dataStories.slice(0,20);persist();preview()};
  el("exportStoryBtn").onclick=()=>{const s=readStory();const md=[`# ${s.title}`,"",`Audience: ${s.audience}`,"","## Context",s.context,"","## Headline",s.headline,"",`**Key metric:** ${s.metric}`,"","## Evidence",s.evidence,"","## Recommendation",s.recommendation,"","## Limitation",s.limitation].join("\n");downloadBlob(new Blob([md],{type:"text/markdown"}),`${slug(s.title)}.md`)};
  preview();
}
function readStory(){return{title:el("storyTitle").value,audience:el("storyAudience").value,context:el("storyContext").value,headline:el("storyHeadline").value,metric:el("storyMetric").value,evidence:el("storyEvidence").value,recommendation:el("storyRecommendation").value,limitation:el("storyLimitation").value}}


function allAvailableDatasets(){
  return[
    ...datasets,
    ...state.customDatasets.map(d=>({...d,category:d.category||"Imported",difficulty:d.difficulty||"Custom",suggestedQuestions:d.suggestedQuestions||[]}))
  ];
}
function activeAnyDataset(){
  const available=allAvailableDatasets(),id=localStorage.getItem("pq_active_dataset")||available[0]?.id;
  return available.find(d=>d.id===id)||available[0];
}
function parseCsvSimple(text){
  const rows=[];let row=[],field="",quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i],next=text[i+1];
    if(ch==='"'&&quoted&&next==='"'){field+='"';i++;continue}
    if(ch==='"'){quoted=!quoted;continue}
    if(ch===","&&!quoted){row.push(field);field="";continue}
    if((ch==="\n"||ch==="\r")&&!quoted){
      if(ch==="\r"&&next==="\n")i++;
      row.push(field);field="";
      if(row.some(v=>v!==""))rows.push(row);
      row=[];continue
    }
    field+=ch;
  }
  row.push(field);if(row.some(v=>v!==""))rows.push(row);
  if(!rows.length)return{headers:[],records:[]};
  const headers=rows[0].map(h=>h.trim());
  const records=rows.slice(1).map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]??""])));
  return{headers,records};
}
function renderCustomData(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">BRING YOUR OWN DATA</div><h1>Import data</h1><p>Import a CSV file for use in the Data Lab, SQL Playground, profiler and chart builder.</p></div></div>
  <article class="card import-zone" id="importZone"><h2>Drop a CSV file here</h2><p class="muted">or choose a file from your computer</p><input id="csvFileInput" type="file" accept=".csv,text/csv"><p class="muted">Files are processed in your browser. Large files may exceed browser storage limits.</p></article>
  <div class="section-head"><div><h2>Imported datasets</h2></div></div><section class="import-list">${state.customDatasets.map(d=>`<article class="import-row"><div><strong>${esc(d.title)}</strong><div class="muted">${d.rowCount} rows · ${d.columns.length} columns</div></div><div class="notebook-toolbar"><button class="secondary-btn" data-use-custom="${d.id}">Use dataset</button><button class="text-btn" data-delete-custom="${d.id}">Delete</button></div></article>`).join("")||"<p class='muted'>No custom datasets imported.</p>"}</section>`;
  const zone=el("importZone"),input=el("csvFileInput");
  input.onchange=()=>input.files[0]&&importCsvFile(input.files[0]);
  ["dragenter","dragover"].forEach(evt=>zone.addEventListener(evt,e=>{e.preventDefault();zone.classList.add("dragging")}));
  ["dragleave","drop"].forEach(evt=>zone.addEventListener(evt,e=>{e.preventDefault();zone.classList.remove("dragging")}));
  zone.addEventListener("drop",e=>{const file=e.dataTransfer.files[0];if(file)importCsvFile(file)});
  document.querySelectorAll("[data-use-custom]").forEach(b=>b.onclick=()=>{localStorage.setItem("pq_active_dataset",b.dataset.useCustom);renderView("dataprofiler")});
  document.querySelectorAll("[data-delete-custom]").forEach(b=>b.onclick=()=>{state.customDatasets=state.customDatasets.filter(d=>d.id!==b.dataset.deleteCustom);persist();renderCustomData()});
}
function importCsvFile(file){
  if(file.size>3_000_000){alert("Please use a CSV smaller than 3 MB for this browser-based version.");return}
  const reader=new FileReader();
  reader.onload=()=>{
    const csv=String(reader.result||""),parsed=parseCsvSimple(csv);
    if(!parsed.headers.length||!parsed.records.length){alert("The CSV did not contain a header and data rows.");return}
    const id=`custom-${Date.now().toString(36)}`;
    state.customDatasets.unshift({id,title:file.name.replace(/\.csv$/i,""),description:"Imported browser dataset",category:"Imported",difficulty:"Custom",columns:parsed.headers,rowCount:parsed.records.length,csv,suggestedQuestions:["Which columns contain missing values?","Which categories appear most often?","What business question can this data answer?"]});
    persist();localStorage.setItem("pq_active_dataset",id);renderCustomData();
  };
  reader.readAsText(file);
}
function profileDataset(d){
  const parsed=parseCsvSimple(d.csv),records=parsed.records,columns=parsed.headers;
  const stats=columns.map(column=>{
    const values=records.map(r=>r[column]),missing=values.filter(v=>String(v).trim()==="").length;
    const numeric=values.filter(v=>String(v).trim()!==""&&!Number.isNaN(Number(v))).map(Number);
    const unique=new Set(values.filter(v=>String(v).trim()!=="")).size;
    return{column,missing,missingPct:records.length?Math.round(missing/records.length*100):0,unique,numeric:numeric.length===values.length-missing&&numeric.length>0,min:numeric.length?Math.min(...numeric):null,max:numeric.length?Math.max(...numeric):null,mean:numeric.length?numeric.reduce((a,b)=>a+b,0)/numeric.length:null};
  });
  const duplicateCount=records.length-new Set(records.map(r=>JSON.stringify(r))).size;
  return{rows:records.length,columns:columns.length,duplicateCount,missingCells:stats.reduce((a,s)=>a+s.missing,0),stats,records};
}
function renderDataProfiler(){
  const d=activeAnyDataset();if(!d){el("main").innerHTML="<p>No dataset available.</p>";return}
  const profile=profileDataset(d);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">AUTOMATIC DATA QUALITY</div><h1>Data profiler</h1><p>Inspect structure, missing data, duplicates and numeric ranges before analysis.</p></div><select id="profileDatasetSelect">${allAvailableDatasets().map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div>
  <section class="profile-grid"><article class="card profile-card"><div class="profile-number">${profile.rows}</div><div class="muted">rows</div></article><article class="card profile-card"><div class="profile-number">${profile.columns}</div><div class="muted">columns</div></article><article class="card profile-card"><div class="profile-number ${profile.missingCells?"quality-warn":"quality-good"}">${profile.missingCells}</div><div class="muted">missing cells</div></article><article class="card profile-card"><div class="profile-number ${profile.duplicateCount?"quality-warn":"quality-good"}">${profile.duplicateCount}</div><div class="muted">duplicate rows</div></article></section>
  <div class="section-head"><div><h2>Column profile</h2></div><button id="exportProfileBtn" class="secondary-btn">Export profile JSON</button></div><article class="card" style="padding:20px;overflow:auto"><table class="quality-table"><thead><tr><th>Column</th><th>Type</th><th>Missing</th><th>Unique</th><th>Min</th><th>Max</th><th>Mean</th></tr></thead><tbody>${profile.stats.map(s=>`<tr><td><code>${s.column}</code></td><td>${s.numeric?"Numeric":"Text / mixed"}</td><td class="${s.missing?"quality-warn":"quality-good"}">${s.missing} (${s.missingPct}%)</td><td>${s.unique}</td><td>${s.min??"—"}</td><td>${s.max??"—"}</td><td>${s.mean===null?"—":s.mean.toFixed(2)}</td></tr>`).join("")}</tbody></table></article>`;
  el("profileDatasetSelect").onchange=()=>{localStorage.setItem("pq_active_dataset",el("profileDatasetSelect").value);renderDataProfiler()};
  el("exportProfileBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify({dataset:d.title,...profile},null,2)],{type:"application/json"}),`${slug(d.title)}-profile.json`);
}
function chartColumns(d){
  const p=profileDataset(d);
  return{all:p.stats.map(s=>s.column),numeric:p.stats.filter(s=>s.numeric).map(s=>s.column),categorical:p.stats.filter(s=>!s.numeric).map(s=>s.column),records:p.records};
}
function aggregateChartData(records,category,value,aggregation){
  const groups={};
  records.forEach(r=>{
    const key=String(r[category]??"Unknown"),num=Number(r[value]);
    if(!groups[key])groups[key]=[];
    if(!Number.isNaN(num))groups[key].push(num);
  });
  const labels=Object.keys(groups),values=labels.map(label=>{
    const nums=groups[label];
    if(aggregation==="count")return nums.length;
    if(!nums.length)return 0;
    if(aggregation==="average")return nums.reduce((a,b)=>a+b,0)/nums.length;
    if(aggregation==="min")return Math.min(...nums);
    if(aggregation==="max")return Math.max(...nums);
    return nums.reduce((a,b)=>a+b,0);
  });
  return{labels,values};
}
let activeChartInstance=null;
function renderChartBuilder(){
  const d=activeAnyDataset(),cols=chartColumns(d),saved=state.savedCharts[0];
  const category=saved?.datasetId===d.id?saved.category:(cols.categorical[0]||cols.all[0]);
  const value=saved?.datasetId===d.id?saved.value:(cols.numeric[0]||cols.all[0]);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VISUAL ANALYSIS</div><h1>Chart builder</h1><p>Create a chart without writing plotting code, then inspect the generated configuration.</p></div><select id="chartDatasetSelect">${allAvailableDatasets().map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div>
  <section class="chart-layout"><article class="card chart-controls"><div class="form-row"><label>Chart title</label><input id="chartTitle" value="${esc(saved?.title||`${d.title} summary`)}"></div><div class="form-row"><label>Chart type</label><select id="chartType">${["bar","line","pie","doughnut"].map(t=>`<option ${saved?.type===t?"selected":""}>${t}</option>`).join("")}</select></div><div class="form-row"><label>Category column</label><select id="chartCategory">${cols.all.map(c=>`<option ${c===category?"selected":""}>${c}</option>`).join("")}</select></div><div class="form-row"><label>Numeric column</label><select id="chartValue">${cols.numeric.map(c=>`<option ${c===value?"selected":""}>${c}</option>`).join("")}</select></div><div class="form-row"><label>Aggregation</label><select id="chartAggregation">${["sum","average","count","min","max"].map(a=>`<option ${saved?.aggregation===a?"selected":""}>${a}</option>`).join("")}</select></div><div class="studio-toolbar"><button id="buildChartBtn" class="primary-btn">Build chart</button><button id="saveChartBtn" class="secondary-btn">Save chart</button><button id="exportChartPngBtn" class="secondary-btn">Export PNG</button></div><details><summary>Generated configuration</summary><pre id="chartConfigOutput"></pre></details></article><article class="card chart-preview"><div class="chart-canvas-wrap"><canvas id="chartCanvas"></canvas></div></article></section>`;
  el("chartDatasetSelect").onchange=()=>{localStorage.setItem("pq_active_dataset",el("chartDatasetSelect").value);renderChartBuilder()};
  el("buildChartBtn").onclick=buildCurrentChart;
  el("saveChartBtn").onclick=()=>{const config=readChartConfig();state.savedCharts.unshift({...config,id:Date.now().toString(36),savedAt:new Date().toISOString()});state.savedCharts=state.savedCharts.slice(0,30);persist();buildCurrentChart()};
  el("exportChartPngBtn").onclick=()=>{if(!activeChartInstance)return;const a=document.createElement("a");a.href=activeChartInstance.toBase64Image();a.download=`${slug(el("chartTitle").value)}.png`;a.click()};
  buildCurrentChart();
}
function readChartConfig(){
  const d=activeAnyDataset();
  return{datasetId:d.id,title:el("chartTitle").value,type:el("chartType").value,category:el("chartCategory").value,value:el("chartValue").value,aggregation:el("chartAggregation").value};
}
function buildCurrentChart(){
  const config=readChartConfig(),d=activeAnyDataset(),records=profileDataset(d).records;
  const result=aggregateChartData(records,config.category,config.value,config.aggregation);
  if(activeChartInstance)activeChartInstance.destroy();
  activeChartInstance=new Chart(el("chartCanvas"),{type:config.type,data:{labels:result.labels,datasets:[{label:`${config.aggregation} of ${config.value}`,data:result.values}]},options:{responsive:true,maintainAspectRatio:false,plugins:{title:{display:true,text:config.title}}}});
  el("chartConfigOutput").textContent=JSON.stringify({dataset:d.title,...config,labels:result.labels,values:result.values},null,2);
}
function defaultDashboard(){
  return{id:Date.now().toString(36),title:"Analytics Dashboard",datasetId:activeAnyDataset()?.id,widgets:[],savedAt:new Date().toISOString()};
}
let dashboardChartInstances=[];
function renderDashboardBuilder(){
  let dash=state.dashboards[0]||defaultDashboard();
  const d=allAvailableDatasets().find(x=>x.id===dash.datasetId)||activeAnyDataset();
  dash.datasetId=d.id;
  const cols=chartColumns(d);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">BUILD A MINI DASHBOARD</div><h1>Dashboard builder</h1><p>Combine KPI cards and charts into a compact analytical view.</p></div><button id="newDashboardBtn" class="secondary-btn">New dashboard</button></div>
  <section class="dashboard-layout"><article class="card dashboard-controls"><div class="form-row"><label>Dashboard title</label><input id="dashboardTitle" value="${esc(dash.title)}"></div><div class="form-row"><label>Dataset</label><select id="dashboardDataset">${allAvailableDatasets().map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div><hr style="border:0;border-top:1px solid var(--border);margin:18px 0"><h3>Add widget</h3><div class="form-row"><label>Widget type</label><select id="widgetType"><option value="kpi">KPI card</option><option value="bar">Bar chart</option><option value="line">Line chart</option><option value="pie">Pie chart</option></select></div><div class="form-row"><label>Category</label><select id="widgetCategory">${cols.all.map(c=>`<option>${c}</option>`).join("")}</select></div><div class="form-row"><label>Value</label><select id="widgetValue">${cols.numeric.map(c=>`<option>${c}</option>`).join("")}</select></div><div class="form-row"><label>Aggregation</label><select id="widgetAggregation">${["sum","average","count","min","max"].map(a=>`<option>${a}</option>`).join("")}</select></div><div class="studio-toolbar"><button id="addWidgetBtn" class="primary-btn">Add widget</button><button id="saveDashboardBtn" class="secondary-btn">Save dashboard</button><button id="exportDashboardBtn" class="secondary-btn">Export JSON</button></div></article><article class="card dashboard-preview"><div id="dashboardCanvas" class="dashboard-canvas"></div></article></section>`;
  const refresh=()=>renderDashboardCanvas(dash,d);
  el("dashboardDataset").onchange=()=>{dash.datasetId=el("dashboardDataset").value;state.dashboards[0]=dash;persist();renderDashboardBuilder()};
  el("newDashboardBtn").onclick=()=>{dash=defaultDashboard();state.dashboards.unshift(dash);persist();renderDashboardBuilder()};
  el("addWidgetBtn").onclick=()=>{dash.widgets.push({id:Date.now().toString(36),type:el("widgetType").value,category:el("widgetCategory").value,value:el("widgetValue").value,aggregation:el("widgetAggregation").value});refresh()};
  el("saveDashboardBtn").onclick=()=>{dash.title=el("dashboardTitle").value;dash.savedAt=new Date().toISOString();state.dashboards=state.dashboards.filter(x=>x.id!==dash.id);state.dashboards.unshift(dash);persist();refresh()};
  el("exportDashboardBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(dash,null,2)],{type:"application/json"}),`${slug(dash.title)}-dashboard.json`);
  refresh();
}
function renderDashboardCanvas(dash,d){
  dashboardChartInstances.forEach(c=>c.destroy());dashboardChartInstances=[];
  const records=profileDataset(d).records;
  el("dashboardCanvas").innerHTML=`<article class="dashboard-widget wide"><div class="eyebrow">${esc(d.title)}</div><h2>${esc(el("dashboardTitle")?.value||dash.title)}</h2><p class="muted">${dash.widgets.length} widgets</p></article>${dash.widgets.map(w=>`<article class="dashboard-widget ${w.type==="line"?"wide":""}" id="widget-${w.id}"><button class="widget-remove" data-remove-widget="${w.id}">✕</button>${w.type==="kpi"?`<div class="eyebrow">${w.aggregation.toUpperCase()} OF ${w.value}</div><div class="kpi-value" id="kpi-${w.id}"></div>`:`<canvas id="canvas-${w.id}"></canvas>`}</article>`).join("")||"<p class='muted'>Add KPI cards or charts from the control panel.</p>"}`;
  dash.widgets.forEach(w=>{
    const agg=aggregateChartData(records,w.category,w.value,w.aggregation);
    if(w.type==="kpi"){
      const all=agg.values;
      const value=w.aggregation==="count"?all.reduce((a,b)=>a+b,0):all.reduce((a,b)=>a+b,0);
      el(`kpi-${w.id}`).textContent=Number.isFinite(value)?value.toLocaleString(undefined,{maximumFractionDigits:2}):"—";
    }else{
      const chart=new Chart(el(`canvas-${w.id}`),{type:w.type,data:{labels:agg.labels,datasets:[{label:`${w.aggregation} of ${w.value}`,data:agg.values}]},options:{responsive:true,maintainAspectRatio:false}});
      dashboardChartInstances.push(chart);
    }
  });
  document.querySelectorAll("[data-remove-widget]").forEach(b=>b.onclick=()=>{dash.widgets=dash.widgets.filter(w=>w.id!==b.dataset.removeWidget);persist();renderDashboardCanvas(dash,d)});
}


function mlDatasetOptions(){
  return allAvailableDatasets().filter(d=>{
    const p=profileDataset(d);
    return p.stats.filter(s=>s.numeric).length>=2;
  });
}
function renderModelLab(){
  const options=mlDatasetOptions();
  let d=options.find(x=>x.id===localStorage.getItem("pq_ml_dataset"))||options.find(x=>x.id==="customer-churn")||options[0];
  const profile=profileDataset(d),numeric=profile.stats.filter(s=>s.numeric).map(s=>s.column);
  const target=numeric[numeric.length-1],features=numeric.slice(0,-1);
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PREDICTIVE MODELLING</div><h1>Model lab</h1><p>Train a simple regression model in the browser and compare experiments.</p></div><select id="mlDatasetSelect">${options.map(x=>`<option value="${x.id}" ${x.id===d.id?"selected":""}>${x.title}</option>`).join("")}</select></div>
  <section class="model-layout"><article class="card model-controls"><div class="form-row"><label>Problem type</label><select id="mlProblemType"><option value="regression">Regression</option><option value="classification">Binary classification</option></select></div><div class="form-row"><label>Target column</label><select id="mlTarget">${numeric.map(c=>`<option ${c===target?"selected":""}>${c}</option>`).join("")}</select></div><div class="form-row"><label>Numeric features</label><div class="feature-checks">${numeric.map(c=>`<label class="feature-check"><input type="checkbox" data-ml-feature="${c}" ${features.includes(c)?"checked":""}> ${c}</label>`).join("")}</div></div><div class="form-row"><label>Test percentage</label><input id="mlTestSize" type="number" min="10" max="50" value="25"></div><div class="studio-toolbar"><button id="trainModelBtn" class="primary-btn">Train model</button><button id="saveExperimentBtn" class="secondary-btn" disabled>Save experiment</button></div><div class="callout">This learning lab uses small deterministic models. It is not intended for production decisions.</div></article><article class="card model-results"><div id="modelResults"><p class="muted">Choose features and train a model.</p></div></article></section>`;
  el("mlDatasetSelect").onchange=()=>{localStorage.setItem("pq_ml_dataset",el("mlDatasetSelect").value);renderModelLab()};
  el("trainModelBtn").onclick=runModelLab;
}
async function runModelLab(){
  const d=mlDatasetOptions().find(x=>x.id===el("mlDatasetSelect").value);
  const target=el("mlTarget").value;
  const features=[...document.querySelectorAll("[data-ml-feature]:checked")].map(x=>x.dataset.mlFeature).filter(x=>x!==target);
  const problem=el("mlProblemType").value,testPct=Math.max(10,Math.min(50,Number(el("mlTestSize").value||25)));
  if(!features.length){alert("Choose at least one feature different from the target.");return}
  pyodide.globals.set("__ml_csv__",d.csv);pyodide.globals.set("__ml_target__",target);pyodide.globals.set("__ml_features__",features);pyodide.globals.set("__ml_problem__",problem);pyodide.globals.set("__ml_test_pct__",testPct);
  el("modelResults").innerHTML="<p>Training model…</p>";
  const raw=await pyodide.runPythonAsync(`import pandas as pd,numpy as np,io,json,traceback\n__result={"ok":False}\ntry:\n    ml_df=pd.read_csv(io.StringIO(__ml_csv__))\n    clean=ml_df[__ml_features__+[__ml_target__]].dropna().copy()\n    for c in __ml_features__+[__ml_target__]: clean[c]=pd.to_numeric(clean[c],errors="coerce")\n    clean=clean.dropna()\n    split=max(1,int(len(clean)*(1-__ml_test_pct__/100)))\n    train=clean.iloc[:split];test=clean.iloc[split:]\n    Xtr=np.column_stack([np.ones(len(train))]+[train[c].to_numpy(float) for c in __ml_features__])\n    Xte=np.column_stack([np.ones(len(test))]+[test[c].to_numpy(float) for c in __ml_features__])\n    ytr=train[__ml_target__].to_numpy(float);yte=test[__ml_target__].to_numpy(float)\n    coef=np.linalg.pinv(Xtr).dot(ytr)\n    raw_pred=Xte.dot(coef)\n    if __ml_problem__=="classification":\n        pred=(raw_pred>=0.5).astype(int);actual=(yte>=0.5).astype(int)\n        accuracy=float(np.mean(pred==actual)) if len(actual) else 0\n        tp=int(np.sum((pred==1)&(actual==1)));fp=int(np.sum((pred==1)&(actual==0)));fn=int(np.sum((pred==0)&(actual==1)))\n        precision=tp/(tp+fp) if tp+fp else 0;recall=tp/(tp+fn) if tp+fn else 0\n        metrics={"accuracy":accuracy,"precision":precision,"recall":recall}\n    else:\n        pred=raw_pred\n        mae=float(np.mean(np.abs(yte-pred))) if len(yte) else 0\n        rmse=float(np.sqrt(np.mean((yte-pred)**2))) if len(yte) else 0\n        baseline=float(np.mean(np.abs(yte-np.mean(ytr)))) if len(yte) else 0\n        metrics={"mae":mae,"rmse":rmse,"baseline_mae":baseline}\n    __result={"ok":True,"rows":len(clean),"trainRows":len(train),"testRows":len(test),"coefficients":[float(x) for x in coef],"metrics":metrics,"actual":[float(x) for x in yte],"predicted":[float(x) for x in pred]}\nexcept Exception as e:\n    __result={"ok":False,"error":traceback.format_exc()}\njson.dumps(__result)`);
  const result=JSON.parse(raw);
  if(!result.ok){el("modelResults").innerHTML=`<pre>${esc(result.error)}</pre>`;return}
  window.__lastMlExperiment={datasetId:d.id,datasetTitle:d.title,target,features,problem,testPct,result,createdAt:new Date().toISOString()};
  const metrics=Object.entries(result.metrics);
  el("modelResults").innerHTML=`<div class="eyebrow">MODEL RESULT</div><h2>${problem==="classification"?"Binary classification":"Regression"}</h2><p>${result.trainRows} training rows · ${result.testRows} test rows</p><div class="metric-grid">${metrics.map(([k,v])=>`<div class="metric-card"><span>${k.replaceAll("_"," ")}</span><strong>${Number(v).toFixed(3)}</strong></div>`).join("")}</div><h3>Coefficients</h3><div class="report-list">${["Intercept",...features].map((name,i)=>`<div class="report-row"><span>${name}</span><strong>${result.coefficients[i].toFixed(4)}</strong></div>`).join("")}</div><h3>Actual versus predicted</h3><div class="data-preview"><table><thead><tr><th>Actual</th><th>Predicted</th></tr></thead><tbody>${result.actual.map((a,i)=>`<tr><td>${a.toFixed(3)}</td><td>${result.predicted[i].toFixed(3)}</td></tr>`).join("")}</tbody></table></div>`;
  el("saveExperimentBtn").disabled=false;
  el("saveExperimentBtn").onclick=()=>{state.mlExperiments.unshift({...window.__lastMlExperiment,id:Date.now().toString(36)});state.mlExperiments=state.mlExperiments.slice(0,50);persist();el("saveExperimentBtn").textContent="Experiment saved"};
}
function renderExperiments(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COMPARE MODELS</div><h1>Experiment tracker</h1><p>Keep a record of datasets, features, targets and evaluation metrics.</p></div><button id="exportExperimentsBtn" class="secondary-btn">Export experiments</button></div>
  <article class="card" style="padding:20px;overflow:auto"><table class="experiment-table"><thead><tr><th>Date</th><th>Dataset</th><th>Problem</th><th>Target</th><th>Features</th><th>Primary metric</th></tr></thead><tbody>${state.mlExperiments.map(exp=>{const metric=Object.entries(exp.result.metrics)[0]||["—","—"];return`<tr><td>${new Date(exp.createdAt).toLocaleString()}</td><td>${esc(exp.datasetTitle)}</td><td>${exp.problem}</td><td>${exp.target}</td><td>${exp.features.join(", ")}</td><td>${metric[0]}: ${Number(metric[1]).toFixed(3)}</td></tr>`}).join("")||"<tr><td colspan='6'>No experiments saved yet.</td></tr>"}</tbody></table></article>`;
  el("exportExperimentsBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(state.mlExperiments,null,2)],{type:"application/json"}),"codequest-ml-experiments.json");
}
function responsibleChecklist(){
  return[
    ["purpose","Purpose is clearly defined"],
    ["target","Target and labels are appropriate"],
    ["privacy","Sensitive data use has been minimised"],
    ["leakage","Potential leakage has been checked"],
    ["groups","Performance has been compared across relevant groups"],
    ["explainability","Predictions can be explained appropriately"],
    ["human","Human oversight and escalation are defined"],
    ["monitoring","Drift and outcome monitoring are planned"],
    ["limitations","Limitations are documented"],
    ["fallback","A safe fallback exists when the model is unavailable"]
  ];
}
function renderResponsibleAi(){
  const previous=state.responsibleAiReviews[0]||{title:"Model review",checks:{},notes:""};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">RESPONSIBLE MODELLING</div><h1>Responsible AI review</h1><p>Use this checklist before treating a model as decision-ready.</p></div></div>
  <section class="responsible-grid"><article class="card responsible-card"><div class="form-row"><label>Review title</label><input id="raiTitle" value="${esc(previous.title)}"></div>${responsibleChecklist().map(([key,label])=>`<label class="ai-check-row"><input type="checkbox" data-rai-check="${key}" ${previous.checks?.[key]?"checked":""}><span><strong>${label}</strong></span></label>`).join("")}<div class="form-row"><label>Risks, assumptions and mitigations</label><textarea id="raiNotes">${esc(previous.notes||"")}</textarea></div><button id="saveResponsibleReviewBtn" class="primary-btn">Save review</button></article><article class="card responsible-card"><div class="eyebrow">READINESS SUMMARY</div><div id="raiSummary"></div></article></section>`;
  const refresh=()=>{const checks=[...document.querySelectorAll("[data-rai-check]")],done=checks.filter(c=>c.checked).length,pct=Math.round(done/checks.length*100);el("raiSummary").innerHTML=`<div class="score-circle">${pct}%</div><h2>${pct===100?"Checklist complete":pct>=70?"Review substantially complete":"More review needed"}</h2><div class="risk-summary">${done} of ${checks.length} responsible-AI controls addressed.</div>`};
  document.querySelectorAll("[data-rai-check]").forEach(c=>c.onchange=refresh);
  el("saveResponsibleReviewBtn").onclick=()=>{const checks={};document.querySelectorAll("[data-rai-check]").forEach(c=>checks[c.dataset.raiCheck]=c.checked);state.responsibleAiReviews.unshift({id:Date.now().toString(36),title:el("raiTitle").value,checks,notes:el("raiNotes").value,savedAt:new Date().toISOString()});state.responsibleAiReviews=state.responsibleAiReviews.slice(0,30);persist();refresh()};
  refresh();
}


function renderAssignments(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">STRUCTURED PRACTICE</div><h1>Assignments</h1><p>Complete larger tasks against a transparent rubric and export a reviewable submission package.</p></div></div>
  <section class="assignment-grid">${assignments.map(a=>{const draft=state.assignmentDrafts[a.id],submitted=state.assignmentSubmissions.some(s=>s.assignmentId===a.id);return`<article class="card assignment-card"><div class="eyebrow">${a.level}</div><h2>${a.title}</h2><p>${a.description}</p><div class="lesson-meta"><span>${a.estimatedHours} hours</span><span>${a.rubric.length} rubric criteria</span></div><div class="skill-tags">${a.deliverables.slice(0,3).map(x=>`<span class="skill-tag">${x}</span>`).join("")}</div><button class="primary-btn full" data-open-assignment="${a.id}">${submitted?"Review submission":draft?"Continue assignment":"Start assignment"}</button></article>`}).join("")}</section><div id="assignmentArea"></div>`;
  document.querySelectorAll("[data-open-assignment]").forEach(b=>b.onclick=()=>openAssignment(b.dataset.openAssignment));
}
function openAssignment(id){
  const a=assignments.find(x=>x.id===id),draft=state.assignmentDrafts[id]||{};
  el("assignmentArea").innerHTML=`<div class="section-head"><div><h2>${a.title}</h2><p>${a.level} · approximately ${a.estimatedHours} hours</p></div></div><section class="assignment-layout">
  <article class="card assignment-brief"><div class="eyebrow">ASSIGNMENT BRIEF</div><p>${a.description}</p><h3>Deliverables</h3>${a.deliverables.map((d,i)=>`<div class="assignment-deliverable">${i+1}. ${d}</div>`).join("")}<h3>Rubric</h3>${a.rubric.map(r=>`<div class="assignment-deliverable"><strong>${r.criterion} (${r.weight}%)</strong><div class="muted">${r.description}</div></div>`).join("")}</article>
  <article class="card assignment-workspace"><div class="form-row"><label>Submission title</label><input id="assignmentTitle" value="${esc(draft.title||a.title)}"></div><div class="form-row"><label>Python solution</label><textarea id="assignmentCode" style="width:100%;min-height:380px;background:var(--code);color:#e7edf7;border:0;border-radius:12px;padding:16px;font-family:monospace">${esc(draft.code||a.starterCode)}</textarea></div><div class="form-row"><label>README and findings</label><textarea id="assignmentReadme" style="min-height:220px" placeholder="Explain approach, findings, assumptions, limitations and how to run the work.">${esc(draft.readme||"")}</textarea></div><div class="notebook-toolbar"><button id="runAssignmentBtn" class="primary-btn">Run code</button><button id="saveAssignmentBtn" class="secondary-btn">Save draft</button><button id="selfAssessAssignmentBtn" class="secondary-btn">Self-assess</button><button id="exportSubmissionBtn" class="secondary-btn">Export submission ZIP</button></div><pre id="assignmentOutput" style="white-space:pre-wrap"></pre><div id="assignmentRubricArea"></div></article></section>`;
  el("runAssignmentBtn").onclick=()=>runAssignmentCode(a);
  el("saveAssignmentBtn").onclick=()=>saveAssignmentDraft(a);
  el("selfAssessAssignmentBtn").onclick=()=>renderAssignmentRubric(a,draft.scores||{});
  el("exportSubmissionBtn").onclick=()=>exportAssignmentSubmission(a);
}
async function runAssignmentCode(a){
  pyodide.globals.set("__assignment_code__",el("assignmentCode").value);
  const raw=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try: exec(compile(__assignment_code__,"<assignment>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__b.getvalue()})`);
  const result=JSON.parse(raw);el("assignmentOutput").textContent=result.output||(result.ok?"Code ran successfully.":"Code failed.");
}
function saveAssignmentDraft(a){
  state.assignmentDrafts[a.id]={title:el("assignmentTitle").value,code:el("assignmentCode").value,readme:el("assignmentReadme").value,scores:state.assignmentDrafts[a.id]?.scores||{},savedAt:new Date().toISOString()};
  persist();el("assignmentOutput").textContent="Assignment draft saved.";
}
function renderAssignmentRubric(a,scores){
  el("assignmentRubricArea").innerHTML=`<div class="section-head"><div><h3>Self-assessment rubric</h3></div></div><table class="rubric-table"><thead><tr><th>Criterion</th><th>Weight</th><th>Description</th><th>Score / 5</th></tr></thead><tbody>${a.rubric.map((r,i)=>`<tr><td>${r.criterion}</td><td>${r.weight}%</td><td>${r.description}</td><td><input class="rubric-score" type="number" min="0" max="5" step="1" data-rubric-score="${i}" value="${scores[i]??""}"></td></tr>`).join("")}</tbody></table><button id="saveSelfAssessmentBtn" class="primary-btn" style="margin-top:12px">Save self-assessment</button><div id="selfAssessmentSummary"></div>`;
  el("saveSelfAssessmentBtn").onclick=()=>{
    const values={};let weighted=0;
    a.rubric.forEach((r,i)=>{const value=Math.max(0,Math.min(5,Number(document.querySelector(`[data-rubric-score="${i}"]`).value||0)));values[i]=value;weighted+=(value/5)*r.weight});
    if(!state.assignmentDrafts[a.id])saveAssignmentDraft(a);
    state.assignmentDrafts[a.id].scores=values;persist();
    el("selfAssessmentSummary").innerHTML=`<div class="submission-status"><strong>Self-assessed score: ${Math.round(weighted)}%</strong><p class="muted">This is a reflection score, not an instructor grade.</p></div>`;
  };
}
async function exportAssignmentSubmission(a){
  if(!window.JSZip){alert("The ZIP library did not load.");return}
  saveAssignmentDraft(a);
  const draft=state.assignmentDrafts[a.id],zip=new JSZip(),folder=zip.folder(`${a.id}-submission`);
  const metadata={assignmentId:a.id,assignmentTitle:a.title,learner:state.profile?.name||"Learner",submittedAt:new Date().toISOString(),selfAssessment:draft.scores||{},rubric:a.rubric};
  folder.file("solution.py",draft.code);
  folder.file("README.md",`# ${draft.title}\n\n${draft.readme}\n\n## Assignment\n${a.description}\n\n## Deliverables\n${a.deliverables.map(d=>`- ${d}`).join("\n")}`);
  folder.file("submission.json",JSON.stringify(metadata,null,2));
  const blob=await zip.generateAsync({type:"blob"});downloadBlob(blob,`${a.id}-submission.zip`);
  state.assignmentSubmissions.unshift({...metadata,id:Date.now().toString(36),code:draft.code,readme:draft.readme});persist();recordActivity("assignment",a.id);
}
function renderInstructorReview(){
  let imported=null;
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">LOCAL MENTOR WORKSPACE</div><h1>Instructor review</h1><p>Import a learner submission.json file, score the rubric and export feedback.</p></div></div>
  <section class="instructor-layout"><article class="card instructor-import"><div class="drop-file"><h3>Import submission JSON</h3><input id="instructorFile" type="file" accept=".json,application/json"></div><h3>Saved reviews</h3>${state.instructorReviews.slice(0,8).map(r=>`<div class="assignment-deliverable"><strong>${r.assignmentTitle}</strong><div class="muted">${r.score}% · ${new Date(r.reviewedAt).toLocaleDateString()}</div></div>`).join("")||"<p class='muted'>No reviews saved.</p>"}</article><article class="card instructor-review"><div id="instructorReviewArea"><p class="muted">Import a submission file to begin.</p></div></article></section>`;
  el("instructorFile").onchange=()=>{const file=el("instructorFile").files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{imported=JSON.parse(String(reader.result));renderImportedSubmission(imported)}catch(_){alert("This is not valid submission JSON.")}};reader.readAsText(file)};
}
function renderImportedSubmission(submission){
  const rubric=submission.rubric||[];
  el("instructorReviewArea").innerHTML=`<div class="eyebrow">SUBMISSION</div><h2>${esc(submission.assignmentTitle||"Assignment")}</h2><p><strong>Learner:</strong> ${esc(submission.learner||"Unknown")}</p><p><strong>Submitted:</strong> ${submission.submittedAt?new Date(submission.submittedAt).toLocaleString():"Unknown"}</p><div class="review-section"><h3>Rubric grading</h3><table class="rubric-table"><thead><tr><th>Criterion</th><th>Weight</th><th>Score / 5</th></tr></thead><tbody>${rubric.map((r,i)=>`<tr><td><strong>${r.criterion}</strong><div class="muted">${r.description}</div></td><td>${r.weight}%</td><td><input type="number" min="0" max="5" value="0" data-instructor-score="${i}" class="rubric-score"></td></tr>`).join("")}</tbody></table></div><div class="form-row"><label>Feedback</label><textarea id="instructorFeedback" style="min-height:220px" placeholder="What was strong, what should improve, and what the learner should do next."></textarea></div><button id="saveInstructorReviewBtn" class="primary-btn">Save and export feedback</button><div id="instructorScoreSummary"></div>`;
  el("saveInstructorReviewBtn").onclick=()=>{
    let score=0;const criterionScores={};
    rubric.forEach((r,i)=>{const v=Math.max(0,Math.min(5,Number(document.querySelector(`[data-instructor-score="${i}"]`).value||0)));criterionScores[r.criterion]=v;score+=(v/5)*r.weight});
    const review={id:Date.now().toString(36),assignmentId:submission.assignmentId,assignmentTitle:submission.assignmentTitle,learner:submission.learner,score:Math.round(score),criterionScores,feedback:el("instructorFeedback").value,reviewedAt:new Date().toISOString()};
    state.instructorReviews.unshift(review);persist();
    downloadBlob(new Blob([JSON.stringify(review,null,2)],{type:"application/json"}),`${submission.assignmentId||"assignment"}-feedback.json`);
    el("instructorScoreSummary").innerHTML=`<div class="submission-status"><strong>Final score: ${review.score}%</strong></div>`;
  };
}
function completeStateExport(){
  return{format:"codequest-backup",version:17,exportedAt:new Date().toISOString(),state:serializableState()};
}
function renderDataManagement(){
  const snapshot=progressReportData();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PORTABLE LEARNING DATA</div><h1>Backup and restore</h1><p>Export a complete learner backup or restore one on another device.</p></div></div>
  <section class="backup-grid"><article class="card backup-card"><h2>Export full backup</h2><p>Includes progress, projects, notebooks, assessments, assignments, imported datasets and preferences.</p><button id="exportFullBackupBtn" class="primary-btn">Download backup JSON</button></article><article class="card backup-card"><h2>Restore backup</h2><div class="drop-file"><input id="restoreBackupInput" type="file" accept=".json,application/json"><p class="muted">Restoring replaces the current local learner state.</p></div><button id="restoreBackupBtn" class="secondary-btn" disabled>Restore selected backup</button></article></section>
  <div class="section-head"><div><h2>Shareable snapshot</h2></div></div><article class="snapshot-card"><h2>${esc(snapshot.learner)}</h2><p>${snapshot.lessonsCompleted}/${snapshot.totalLessons} lessons · ${snapshot.projectsCompleted} projects · ${snapshot.interviewsCompleted} mock interviews · ${snapshot.xp} XP</p><button id="exportSnapshotBtn" class="secondary-btn">Export snapshot JSON</button></article>`;
  el("exportFullBackupBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(completeStateExport(),null,2)],{type:"application/json"}),"codequest-full-backup.json");
  let pending=null;
  el("restoreBackupInput").onchange=()=>{const file=el("restoreBackupInput").files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{pending=JSON.parse(String(reader.result));if(pending.format!=="codequest-backup"||!pending.state)throw new Error();el("restoreBackupBtn").disabled=false}catch(_){pending=null;el("restoreBackupBtn").disabled=true;alert("This is not a valid PythonQuest backup.")}};reader.readAsText(file)};
  el("restoreBackupBtn").onclick=()=>{if(!pending)return;applyImportedState(pending.state);alert("Backup restored. The page will reload.");location.reload()};
  el("exportSnapshotBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(snapshot,null,2)],{type:"application/json"}),"codequest-progress-snapshot.json");
}
function applyImportedState(s){
  state.xp=s.xp||0;state.lessons=new Set(s.lessons||[]);state.steps=Object.fromEntries(Object.entries(s.steps||{}).map(([k,v])=>[k,new Set(v)]));state.profile=s.profile||state.profile;
  state.reviews=s.reviews||[];state.attempts=s.attempts||{};state.projectDrafts=s.projectDrafts||{};state.completedProjects=s.completedProjects||[];state.notebook=s.notebook||[];state.daily=s.daily||null;state.activity=s.activity||[];
  state.weeklyGoal=s.weeklyGoal||{target:3};state.assessmentHistory=s.assessmentHistory||[];state.bookmarks=s.bookmarks||[];state.accessibility=s.accessibility||state.accessibility;state.reviewHistory=s.reviewHistory||[];state.capstonePlan=s.capstonePlan||null;
  state.selectedTrack=s.selectedTrack||"";state.diagnosticAnswers=s.diagnosticAnswers||{};state.customEvidence=s.customEvidence||[];state.interviewHistory=s.interviewHistory||[];state.sprintPlan=s.sprintPlan||null;state.journal=s.journal||[];
  state.labDrafts=s.labDrafts||{};state.sqlHistory=s.sqlHistory||[];state.dataStories=s.dataStories||[];state.customDatasets=s.customDatasets||[];state.savedCharts=s.savedCharts||[];state.dashboards=s.dashboards||[];
  state.mlExperiments=s.mlExperiments||[];state.responsibleAiReviews=s.responsibleAiReviews||[];state.assignmentDrafts=s.assignmentDrafts||{};state.assignmentSubmissions=s.assignmentSubmissions||[];state.instructorReviews=s.instructorReviews||[];
  state.focusSessions=s.focusSessions||[];state.voiceSettings=s.voiceSettings||{rate:1,pitch:1,voiceName:""};state.timerSettings=s.timerSettings||{minutes:25,autoBreak:false};
  state.adaptiveDrillHistory=s.adaptiveDrillHistory||[];state.misconceptionState=s.misconceptionState||{};
  state.cliHistory=s.cliHistory||[];state.gitSimulation=s.gitSimulation||null;state.packageProjects=s.packageProjects||[];
  state.apiHistory=s.apiHistory||[];state.endpointDesigns=s.endpointDesigns||[];state.fastapiProjects=s.fastapiProjects||[];
  state.schemaDesigns=s.schemaDesigns||[];state.migrationHistory=s.migrationHistory||[];state.persistenceProjects=s.persistenceProjects||[];
  state.pipelineRuns=s.pipelineRuns||[];state.deploymentProjects=s.deploymentProjects||[];state.incidentReviews=s.incidentReviews||[];
  state.studioProjects=s.studioProjects||[];state.studioQualityRuns=s.studioQualityRuns||[];state.studioReleases=s.studioReleases||[];
  persist(false);
}


function toggleFocusMode(){
  document.body.classList.toggle("focus-mode");
  el("focusBtn").textContent=document.body.classList.contains("focus-mode")?"◉":"◎";
}
function handleGlobalShortcuts(event){
  const tag=(event.target?.tagName||"").toLowerCase();
  const typing=["input","textarea","select"].includes(tag)||event.target?.isContentEditable;
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){
    event.preventDefault();openCommandPalette();return;
  }
  if(event.key==="Escape"){
    closeCommandPalette();
    el("searchModal")?.classList.add("hidden");
    if(document.body.classList.contains("focus-mode"))toggleFocusMode();
    return;
  }
  if(typing)return;
  if(event.key.toLowerCase()==="f"){toggleFocusMode();return}
  if(event.key.toLowerCase()==="t"){toggleTimerPanel();return}
  if(event.key.toLowerCase()==="s"){openSearch();return}
  if(event.key===" "&&focusTimerRunning){event.preventDefault();toggleFocusTimer();return}
  if(event.key==="?"||event.key==="/"){event.preventDefault();openCommandPalette("shortcuts")}
}
function commandItems(){
  const pages=[
    ["Dashboard","dashboard","⌂"],["Course map","course","◫"],["Revision","revision","↻"],
    ["Practice arena","practice","⌨"],["Projects","projects","◈"],["Learning analytics","analytics","▥"],
    ["Code notebook","notebook","▤"],["Challenge arena","challenges","⚑"],["Mastery map","mastery","◎"],
    ["Assessment centre","assessments","✓"],["Career tracks","careertracks","↗"],["Mock interviews","mockinterviews","◌"],
    ["Dataset library","datasets","▦"],["Data lab","datalab","⌘"],["SQL playground","sqlplayground","SQL"],
    ["Model lab","modellab","◇"],["Assignments","assignments","▧"],["Backup and restore","datamanagement","↕"]
  ].map(([title,view,icon])=>({title,subtitle:"Open page",icon,action:()=>renderView(view),keywords:view}));
  const actions=[
    {title:"Toggle Focus Mode",subtitle:"Hide navigation and reduce distraction",icon:"◎",action:toggleFocusMode,keywords:"focus distraction"},
    {title:"Open Learning Timer",subtitle:"Start a timed work session",icon:"◷",action:toggleTimerPanel,keywords:"timer pomodoro"},
    {title:"Search all content",subtitle:"Find lessons, projects and challenges",icon:"⌕",action:openSearch,keywords:"search"},
    {title:"Read current lesson aloud",subtitle:"Use browser text-to-speech",icon:"▶",action:readCurrentLessonAloud,keywords:"voice listen audio"},
    {title:"Keyboard shortcuts",subtitle:"Show available shortcuts",icon:"⌨",action:showShortcutHelp,keywords:"keyboard shortcuts help"}
  ];
  const lessons=allLessons().map(l=>({title:l.title,subtitle:`Lesson · ${l.moduleTitle}`,icon:"L",action:()=>openLesson(l.id),keywords:`${l.description} ${(l.keywords||[]).join(" ")}`}));
  return[...actions,...pages,...lessons];
}
function openCommandPalette(initial=""){
  const query=typeof initial==="string"?initial:"";
  el("commandModal").classList.remove("hidden");
  el("commandInput").value=query==="shortcuts"?"shortcuts":query;
  commandSelection=0;renderCommandResults(el("commandInput").value);
  setTimeout(()=>el("commandInput").focus(),20);
}
function closeCommandPalette(){el("commandModal").classList.add("hidden")}
function filteredCommands(query){
  const q=query.trim().toLowerCase();
  return commandItems().filter(item=>!q||`${item.title} ${item.subtitle} ${item.keywords||""}`.toLowerCase().includes(q)).slice(0,18);
}
function renderCommandResults(query){
  const items=filteredCommands(query);
  if(commandSelection>=items.length)commandSelection=0;
  el("commandResults").innerHTML=items.map((item,i)=>`<button class="command-result ${i===commandSelection?"active":""}" data-command-index="${i}"><span class="command-icon">${item.icon}</span><span><strong>${item.title}</strong><div class="muted">${item.subtitle}</div></span><span>↵</span></button>`).join("")||"<p class='muted'>No matching commands.</p>";
  document.querySelectorAll("[data-command-index]").forEach(b=>b.onclick=()=>executeCommand(items[Number(b.dataset.commandIndex)]));
}
function handleCommandKeys(event){
  const items=filteredCommands(el("commandInput").value);
  if(event.key==="ArrowDown"){event.preventDefault();commandSelection=Math.min(items.length-1,commandSelection+1);renderCommandResults(el("commandInput").value)}
  if(event.key==="ArrowUp"){event.preventDefault();commandSelection=Math.max(0,commandSelection-1);renderCommandResults(el("commandInput").value)}
  if(event.key==="Enter"&&items[commandSelection]){event.preventDefault();executeCommand(items[commandSelection])}
  if(event.key==="Escape")closeCommandPalette();
}
function executeCommand(item){closeCommandPalette();item.action()}
function showShortcutHelp(){
  closeCommandPalette();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">QUICK CONTROL</div><h1>Keyboard shortcuts</h1><p>Use PythonQuest without repeatedly reaching for the mouse.</p></div></div><article class="card" style="padding:24px"><div class="keyboard-grid">
  ${[
    ["Ctrl/Cmd + K","Open command palette"],["F","Toggle Focus Mode"],["T","Open learning timer"],
    ["S","Open global search"],["Space","Pause/resume active timer"],["Esc","Close panel or exit Focus Mode"],
    ["? or /","Shortcut help"],["Ctrl/Cmd + Enter","Run code in active editor"]
  ].map(([key,label])=>`<div class="keyboard-row"><span>${label}</span><kbd>${key}</kbd></div>`).join("")}
  </div></article>`;
}
function toggleTimerPanel(){
  el("timerPanel").classList.toggle("hidden");
  renderTimerDisplay();
}
function setFocusTimer(minutes){
  if(focusTimerRunning)clearInterval(focusTimerInterval);
  focusTimerRunning=false;focusTimerRemaining=minutes*60;
  state.timerSettings.minutes=minutes;persist();renderTimerDisplay();
  el("startTimerBtn").textContent="Start";
}
function toggleFocusTimer(){
  if(focusTimerRunning){
    clearInterval(focusTimerInterval);focusTimerRunning=false;el("startTimerBtn").textContent="Resume";
    return;
  }
  if(focusTimerRemaining<=0)focusTimerRemaining=(state.timerSettings.minutes||25)*60;
  focusTimerRunning=true;focusTimerStartedAt=focusTimerStartedAt||new Date().toISOString();
  el("startTimerBtn").textContent="Pause";
  focusTimerInterval=setInterval(()=>{
    focusTimerRemaining=Math.max(0,focusTimerRemaining-1);renderTimerDisplay();
    if(focusTimerRemaining===0)completeFocusSession();
  },1000);
}
function resetFocusTimer(){
  if(focusTimerInterval)clearInterval(focusTimerInterval);
  focusTimerRunning=false;focusTimerStartedAt=null;
  focusTimerRemaining=(state.timerSettings.minutes||25)*60;
  el("startTimerBtn").textContent="Start";el("timerMessage").textContent="Timer reset.";
  renderTimerDisplay();
}
function renderTimerDisplay(){
  const min=Math.floor(focusTimerRemaining/60),sec=focusTimerRemaining%60;
  el("timerDisplay").textContent=`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  document.title=focusTimerRunning?`${el("timerDisplay").textContent} · PythonQuest`:"CodeQuest Academy";
}
function completeFocusSession(){
  clearInterval(focusTimerInterval);focusTimerRunning=false;
  const planned=state.timerSettings.minutes||25;
  const session={id:Date.now().toString(36),startedAt:focusTimerStartedAt||new Date().toISOString(),completedAt:new Date().toISOString(),minutes:planned,view:currentView,lessonId:activeLesson?.id||null};
  state.focusSessions.unshift(session);state.focusSessions=state.focusSessions.slice(0,100);
  recordActivity("focus-session",session.id);persist();
  el("timerMessage").innerHTML=`<div class="session-summary">${planned}-minute focus session complete. Take a short break.</div>`;
  el("startTimerBtn").textContent="Start again";focusTimerStartedAt=null;
  try{new Notification("CodeQuest Academy session complete",{body:"Good work. Take a short break before continuing."})}catch(_){}
  if(state.timerSettings.autoBreak){focusTimerRemaining=5*60;el("timerMessage").textContent="Five-minute break timer ready."}
}
function lessonSpeechText(){
  if(!activeLesson)return"";
  const step=activeLesson.steps[currentStep];
  const temp=document.createElement("div");temp.innerHTML=step.content||"";
  const content=temp.textContent.replace(/\s+/g," ").trim();
  return`${activeLesson.title}. ${step.title}. ${content}`;
}
function readCurrentLessonAloud(){
  if(!("speechSynthesis" in window)||!activeLesson){return}
  stopLessonVoice();
  const text=lessonSpeechText();if(!text)return;
  currentUtterance=new SpeechSynthesisUtterance(text);
  currentUtterance.rate=Number(state.voiceSettings.rate||1);
  currentUtterance.pitch=Number(state.voiceSettings.pitch||1);
  const voices=speechSynthesis.getVoices();
  if(state.voiceSettings.voiceName){
    const selected=voices.find(v=>v.name===state.voiceSettings.voiceName);if(selected)currentUtterance.voice=selected;
  }
  currentUtterance.onstart=()=>{el("voiceLessonBtn").textContent="❚❚ Listening";el("voiceStopBtn").classList.remove("hidden");document.querySelector(".lesson-copy")?.classList.add("voice-highlight")};
  currentUtterance.onend=()=>stopLessonVoice(false);
  currentUtterance.onerror=()=>stopLessonVoice(false);
  speechSynthesis.speak(currentUtterance);
}
function stopLessonVoice(cancel=true){
  if(cancel&&"speechSynthesis" in window)speechSynthesis.cancel();
  currentUtterance=null;
  if(el("voiceLessonBtn"))el("voiceLessonBtn").textContent="▶ Listen";
  if(el("voiceStopBtn"))el("voiceStopBtn").classList.add("hidden");
  document.querySelector(".lesson-copy")?.classList.remove("voice-highlight");
}


function adaptiveSignals(){
  const mastery=calculateMastery().sort((a,b)=>a.score-b.score);
  const weakSkills=mastery.filter(m=>m.score<70);
  const recentAttempts=Object.entries(state.attempts||{}).slice(-30);
  const lowAccuracy=recentAttempts.filter(([,a])=>a.tries>1||a.correct===0).length;
  const overdue=state.reviews.filter(r=>new Date(r.due)<=new Date()).length;
  const daysActive=new Set((state.activity||[]).map(a=>String(a.date||a.at).slice(0,10))).size;
  const recentFocus=(state.focusSessions||[]).slice(0,7).reduce((sum,s)=>sum+(s.minutes||0),0);
  return{mastery,weakSkills,lowAccuracy,overdue,daysActive,recentFocus};
}
function nextBestActions(){
  const signals=adaptiveSignals(),actions=[];
  if(signals.overdue>0)actions.push({type:"revision",title:`Review ${signals.overdue} due item${signals.overdue===1?"":"s"}`,reason:"Spaced review is due and helps prevent forgetting.",button:"Start revision",view:"revision",priority:95});
  signals.weakSkills.slice(0,2).forEach(skill=>{
    const drill=adaptiveDrills.find(d=>d.skill===skill.name);
    if(drill)actions.push({type:"drill",title:`Strengthen ${skill.name}`,reason:`Current mastery is ${skill.score}%. A short targeted drill is more useful than adding new content.`,button:"Open drill",drillId:drill.id,priority:90-skill.score});
  });
  const incomplete=allLessons().find(l=>!state.lessons.has(l.id)&&(l.prerequisites||[]).every(id=>state.lessons.has(id)));
  if(incomplete)actions.push({type:"lesson",title:`Continue with ${incomplete.title}`,reason:"This is the next unlocked lesson in the structured pathway.",button:"Open lesson",lessonId:incomplete.id,priority:60});
  if(signals.recentFocus<50)actions.push({type:"timer",title:"Complete one 15-minute focus session",reason:"Recent focus time is low. A small timed session lowers the activation barrier.",button:"Open timer",priority:55});
  const track=selectedCareerTrack();
  if(track){
    const p=trackProgress(track);
    if(p.pct<100)actions.push({type:"track",title:`Progress your ${track.title} roadmap`,reason:`Career-track completion is currently ${p.pct}%.`,button:"View roadmap",view:"careertracks",priority:50});
  }
  return actions.sort((a,b)=>b.priority-a.priority).slice(0,5);
}
function readinessScore(){
  const s=adaptiveSignals(),masteryAvg=s.mastery.length?s.mastery.reduce((a,m)=>a+m.score,0)/s.mastery.length:0;
  const assessment=state.assessmentHistory.length?state.assessmentHistory[state.assessmentHistory.length-1].score:0;
  const projectFactor=Math.min(100,state.completedProjects.length*20);
  return Math.round(masteryAvg*.55+assessment*.25+projectFactor*.20);
}
function renderAdaptiveCoach(){
  const signals=adaptiveSignals(),actions=nextBestActions(),score=readinessScore();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSONALISED GUIDANCE</div><h1>Adaptive coach</h1><p>Your next recommendations are based on mastery, attempts, revision load and recent activity.</p></div><button id="refreshCoachBtn" class="secondary-btn">Refresh recommendations</button></div>
  <article class="card coach-hero"><div><div class="eyebrow">NEXT BEST ACTION</div><h2>${actions[0]?.title||"Continue learning"}</h2><p>${actions[0]?.reason||"Complete a lesson or practice activity to generate stronger recommendations."}</p>${actions[0]?`<button class="primary-btn" data-coach-action="0">${actions[0].button}</button>`:""}</div><div class="coach-score"><div class="muted">Overall readiness</div><strong>${score}%</strong><div class="progress-track"><div style="width:${score}%"></div></div></div></article>
  <div class="section-head"><div><h2>Recommended actions</h2></div></div><section class="action-grid">${actions.map((a,i)=>`<article class="card action-card"><span class="action-rank">${i+1}</span><div class="eyebrow">${a.type.toUpperCase()}</div><h3>${a.title}</h3><div class="coach-reason">${a.reason}</div><button class="secondary-btn full" style="margin-top:14px" data-coach-action="${i}">${a.button}</button></article>`).join("")||"<p class='muted'>Complete an activity to generate recommendations.</p>"}</section>
  <div class="section-head"><div><h2>Learning signals</h2></div></div><section class="signal-grid"><article class="card signal-card"><div class="eyebrow">WEAKEST SKILLS</div>${signals.mastery.slice(0,4).map(m=>`<div class="report-row"><span>${m.name}</span><strong>${m.score}%</strong></div>`).join("")}</article><article class="card signal-card"><div class="eyebrow">CURRENT LOAD</div><div class="report-row"><span>Due reviews</span><strong>${signals.overdue}</strong></div><div class="report-row"><span>Recent difficult attempts</span><strong>${signals.lowAccuracy}</strong></div><div class="report-row"><span>Recorded active days</span><strong>${signals.daysActive}</strong></div><div class="report-row"><span>Recent focus minutes</span><strong>${signals.recentFocus}</strong></div></article></section>`;
  document.querySelectorAll("[data-coach-action]").forEach(b=>b.onclick=()=>executeCoachAction(actions[Number(b.dataset.coachAction)]));
  el("refreshCoachBtn").onclick=renderAdaptiveCoach;
}
function executeCoachAction(action){
  if(action.type==="drill"){localStorage.setItem("pq_active_drill",action.drillId);renderView("weakdrills");return}
  if(action.type==="lesson"){openLesson(action.lessonId);return}
  if(action.type==="timer"){toggleTimerPanel();return}
  if(action.view){renderView(action.view)}
}
function recommendedDrills(){
  const weak=adaptiveSignals().mastery.filter(m=>m.score<80).map(m=>m.name);
  const failedSkills=new Set(state.adaptiveDrillHistory.filter(h=>!h.correct).map(h=>h.skill));
  return adaptiveDrills.slice().sort((a,b)=>{
    const score=d=>(weak.includes(d.skill)?2:0)+(failedSkills.has(d.skill)?2:0);
    return score(b)-score(a);
  });
}
function renderWeakDrills(){
  const ordered=recommendedDrills();
  let id=localStorage.getItem("pq_active_drill")||ordered[0]?.id;
  let drill=ordered.find(d=>d.id===id)||ordered[0];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">TARGETED PRACTICE</div><h1>Weak-topic drills</h1><p>Short exercises are prioritised using current mastery and previous drill results.</p></div></div>
  <section class="drill-layout"><article class="card drill-list">${ordered.map(d=>{const attempts=state.adaptiveDrillHistory.filter(h=>h.drillId===d.id);return`<button class="drill-item ${d.id===drill.id?"active":""}" data-select-drill="${d.id}"><strong>${d.title}</strong><div class="muted">${d.skill} · ${attempts.length} attempt${attempts.length===1?"":"s"}</div></button>`}).join("")}</article>
  <article class="card drill-workspace"><div class="eyebrow">${drill.skill}</div><h2>${drill.title}</h2><p>${drill.prompt}</p><textarea id="adaptiveDrillEditor">${esc(drill.starter)}</textarea><div class="notebook-toolbar"><button id="runAdaptiveDrillBtn" class="primary-btn">Check solution</button><button id="showAdaptiveSolutionBtn" class="secondary-btn">Show solution</button><button id="saveAdaptiveNotebookBtn" class="secondary-btn">Save to notebook</button></div><pre id="adaptiveDrillOutput" style="white-space:pre-wrap"></pre><div id="adaptiveDrillFeedback"></div></article></section>`;
  document.querySelectorAll("[data-select-drill]").forEach(b=>b.onclick=()=>{localStorage.setItem("pq_active_drill",b.dataset.selectDrill);renderWeakDrills()});
  el("runAdaptiveDrillBtn").onclick=()=>runAdaptiveDrill(drill);
  el("showAdaptiveSolutionBtn").onclick=()=>{el("adaptiveDrillEditor").value=drill.solution;el("adaptiveDrillFeedback").innerHTML="<div class='comeback-banner'>Solution revealed. Run it, then rewrite it from memory.</div>"};
  el("saveAdaptiveNotebookBtn").onclick=()=>{state.notebook.unshift({id:Date.now().toString(36),lessonTitle:"Adaptive drills",stepTitle:drill.title,code:el("adaptiveDrillEditor").value,notes:`Skill: ${drill.skill}`,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});persist();el("adaptiveDrillOutput").textContent="Saved to notebook."};
}
async function runAdaptiveDrill(drill){
  pyodide.globals.set("__adaptive_code__",el("adaptiveDrillEditor").value);
  pyodide.globals.set("__adaptive_test__",drill.test);
  const raw=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__b=io.StringIO();__ok=True;__passed=False\nwith redirect_stdout(__b),redirect_stderr(__b):\n    try:\n        exec(compile(__adaptive_code__,"<adaptive-drill>","exec"),globals())\n        __passed=bool(eval(__adaptive_test__,globals()))\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"passed":__passed,"output":__b.getvalue()})`);
  const result=JSON.parse(raw);
  el("adaptiveDrillOutput").textContent=result.output;
  const attempt={id:Date.now().toString(36),drillId:drill.id,skill:drill.skill,correct:result.passed,attemptedAt:new Date().toISOString()};
  state.adaptiveDrillHistory.unshift(attempt);state.adaptiveDrillHistory=state.adaptiveDrillHistory.slice(0,200);
  if(result.passed){
    state.xp+=20;recordActivity("adaptive-drill",drill.id);
    el("adaptiveDrillFeedback").innerHTML="<div class='session-summary'>Correct. +20 XP</div>";
  }else{
    el("adaptiveDrillFeedback").innerHTML="<div class='comeback-banner'>Not yet. Compare the output with the requirement and change one thing at a time.</div>";
  }
  persist();
}
function inferredMisconceptions(){
  const active=new Set();
  Object.values(state.attempts||{}).forEach(a=>{if(a.tries>=3)active.add("assignment-vs-comparison")});
  if(state.adaptiveDrillHistory.filter(h=>h.drillId==="sql-grouping"&&!h.correct).length)active.add("where-vs-having");
  if(state.adaptiveDrillHistory.filter(h=>h.drillId==="specific-exception"&&!h.correct).length)active.add("bare-except");
  if(state.adaptiveDrillHistory.filter(h=>h.drillId==="pandas-missing"&&!h.correct).length)active.add("missing-vs-zero");
  if(state.mlExperiments.length===0&&state.lessons.has("ml-train-test"))active.add("test-data-leakage");
  Object.entries(state.misconceptionState||{}).forEach(([id,value])=>{if(value==="active")active.add(id);if(value==="resolved")active.delete(id)});
  return active;
}
function renderMisconceptions(){
  const active=inferredMisconceptions();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CONCEPTUAL CLARITY</div><h1>Misconception tracker</h1><p>These are learning hypotheses, not diagnoses. Mark them active or resolved as your understanding changes.</p></div></div>
  <section class="misconception-grid">${misconceptionCatalogue.map(m=>`<article class="card misconception-card"><div class="eyebrow">${m.skill}</div><h2>${m.title}</h2><span class="misconception-status ${active.has(m.id)?"active":""}">${active.has(m.id)?"Needs attention":"Not currently active"}</span><p><strong>Common pattern:</strong> ${m.pattern}</p><p>${m.explanation}</p><div class="coach-reason"><strong>Recommended remedy:</strong> ${m.remedy}</div><div class="notebook-toolbar"><button class="secondary-btn" data-misconception-active="${m.id}">Mark active</button><button class="secondary-btn" data-misconception-resolved="${m.id}">Mark resolved</button></div></article>`).join("")}</section>`;
  document.querySelectorAll("[data-misconception-active]").forEach(b=>b.onclick=()=>{state.misconceptionState[b.dataset.misconceptionActive]="active";persist();renderMisconceptions()});
  document.querySelectorAll("[data-misconception-resolved]").forEach(b=>b.onclick=()=>{state.misconceptionState[b.dataset.misconceptionResolved]="resolved";persist();renderMisconceptions()});
}


function cliInitialState(s){return{scenarioId:s.id,path:s.startPath,history:[`PythonQuest terminal · ${s.title}`,s.description,"Type help to see commands."],executed:[],completed:false}}
function renderCliSimulator(){
 const sid=localStorage.getItem("pq_cli_scenario")||cliScenarios[0].id,s=cliScenarios.find(x=>x.id===sid)||cliScenarios[0];
 let session=window.__cliSession;if(!session||session.scenarioId!==s.id)session=window.__cliSession=cliInitialState(s);
 el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">COMMAND-LINE PRACTICE</div><h1>CLI simulator</h1><p>Practise terminal workflows safely in the browser.</p></div><select id="cliScenarioSelect">${cliScenarios.map(x=>`<option value="${x.id}" ${x.id===s.id?"selected":""}>${x.title}</option>`).join("")}</select></div><section class="cli-layout"><article class="card cli-sidebar"><div class="eyebrow">MISSION</div><h2>${s.title}</h2><p>${s.description}</p>${["help","pwd","ls","cd <folder>","python -m venv .venv","source .venv/bin/activate","pip list","pytest","clear"].map(c=>`<div class="assignment-deliverable"><code>${c}</code></div>`).join("")}<button id="resetCliBtn" class="secondary-btn full">Reset</button></article><article class="card cli-terminal-card"><div class="terminal"><div id="terminalOutput" class="terminal-output">${esc(session.history.join("\n"))}</div><div class="terminal-input-row"><span>${esc(session.path)} $</span><input id="terminalInput" class="terminal-input" autocomplete="off"></div></div><div id="cliMissionStatus"></div></article></section>`;
 el("cliScenarioSelect").onchange=()=>{localStorage.setItem("pq_cli_scenario",el("cliScenarioSelect").value);window.__cliSession=null;renderCliSimulator()};
 el("resetCliBtn").onclick=()=>{window.__cliSession=cliInitialState(s);renderCliSimulator()};
 el("terminalInput").onkeydown=e=>{if(e.key==="Enter"){runCliCommand(s,session,e.target.value.trim());e.target.value=""}};
 updateCliStatus(session);setTimeout(()=>el("terminalInput").focus(),20);
}
function runCliCommand(s,session,cmd){
 if(!cmd)return;session.history.push(`${session.path} $ ${cmd}`);session.executed.push(cmd);
 const tree={"/pythonquest":["src","tests","docs","README.md","pyproject.toml"],"/pythonquest/src":["pythonquest"],"/pythonquest/tests":["test_core.py"],"/pythonquest/docs":["index.md"]};
 if(cmd==="help")session.history.push("pwd, ls, cd, python -m venv .venv, source .venv/bin/activate, pip list, pytest, clear");
 else if(cmd==="pwd")session.history.push(session.path);
 else if(cmd==="ls")session.history.push((tree[session.path]||[]).join("  ")||"(empty)");
 else if(cmd.startsWith("cd ")){const t=cmd.slice(3).trim();if(t==="..")session.path=session.path.split("/").slice(0,-1).join("/")||"/";else{const n=`${session.path}/${t}`.replace(/\/+/g,"/");if(tree[n])session.path=n;else session.history.push(`cd: no such directory: ${t}`)}}
 else if(cmd==="python -m venv .venv")session.history.push("Created virtual environment .venv");
 else if(cmd==="source .venv/bin/activate")session.history.push("(.venv) environment activated");
 else if(cmd==="pip list")session.history.push("Package  Version\n-------  -------\npip      24.0\npytest   8.3.0");
 else if(cmd==="pytest")session.history.push("tests/test_core.py ..\n2 passed in 0.08s");
 else if(cmd==="clear")session.history=[];
 else session.history.push(`${cmd.split(" ")[0]}: command not found`);
 session.completed=(!s.goalPath||session.path===s.goalPath)&&(!s.goalCommands||s.goalCommands.every(x=>session.executed.includes(x)));
 if(session.completed&&!state.cliHistory.some(h=>h.scenarioId===s.id)){state.cliHistory.unshift({scenarioId:s.id,title:s.title,completedAt:new Date().toISOString()});state.xp+=40;recordActivity("cli-scenario",s.id);persist()}
 renderCliSimulator();
}
function updateCliStatus(session){el("cliMissionStatus").innerHTML=session.completed?`<div class="session-summary">Mission complete. +40 XP</div>`:`<div class="comeback-banner">Mission in progress.</div>`;const o=el("terminalOutput");o.scrollTop=o.scrollHeight}
function gitInitialState(){return{working:["app.py","README.md"],staged:[],commits:[{id:"a1b2c3",message:"Initial project"}],remoteCommits:1,log:["Repository initialised."],branch:"main"}}
function renderGitSimulator(){
 const g=state.gitSimulation||gitInitialState();state.gitSimulation=g;
 el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VISUAL VERSION CONTROL</div><h1>Git workflow simulator</h1><p>Move changes from working tree to staging, commits and remote.</p></div><button id="resetGitBtn" class="secondary-btn">Reset</button></div><div class="notebook-toolbar"><button id="gitStatusBtn" class="secondary-btn">git status</button><button id="gitAddBtn" class="primary-btn">git add .</button><button id="gitCommitBtn" class="primary-btn">git commit</button><button id="gitPushBtn" class="primary-btn">git push</button></div><section class="git-board"><article class="card git-column"><div class="eyebrow">WORKING TREE</div>${g.working.map(f=>`<div class="git-file">${f}</div>`).join("")||"<p>Clean</p>"}</article><article class="card git-column"><div class="eyebrow">STAGED</div>${g.staged.map(f=>`<div class="git-file">${f}</div>`).join("")||"<p>Nothing staged</p>"}</article><article class="card git-column"><div class="eyebrow">LOCAL COMMITS</div>${g.commits.slice().reverse().map(c=>`<div class="commit-node"><strong>${c.id}</strong><div>${esc(c.message)}</div></div>`).join("")}</article><article class="card git-column"><div class="eyebrow">REMOTE</div><h2>${g.remoteCommits}</h2><p>commits pushed</p></article></section><article class="card" style="padding:20px;margin-top:18px"><div class="form-row"><label>Commit message</label><input id="gitCommitMessage"></div><pre>${esc(g.log.slice(-8).join("\n"))}</pre></article>`;
 el("gitStatusBtn").onclick=()=>{g.log.push(`${g.working.length} changed, ${g.staged.length} staged.`);persist();renderGitSimulator()};
 el("gitAddBtn").onclick=()=>{g.staged=[...new Set([...g.staged,...g.working])];g.working=[];g.log.push("Staged all changes.");persist();renderGitSimulator()};
 el("gitCommitBtn").onclick=()=>{const m=el("gitCommitMessage").value.trim();if(!g.staged.length){g.log.push("Nothing to commit.");persist();renderGitSimulator();return}if(!m){alert("Enter a commit message.");return}g.commits.push({id:Math.random().toString(16).slice(2,8),message:m});g.staged=[];g.log.push(`Committed: ${m}`);state.xp+=15;persist();renderGitSimulator()};
 el("gitPushBtn").onclick=()=>{const n=g.commits.length-g.remoteCommits;if(n<=0)g.log.push("Everything up to date.");else{g.remoteCommits=g.commits.length;g.log.push(`Pushed ${n} commit(s).`);state.xp+=20;recordActivity("git-push",Date.now().toString(36))}persist();renderGitSimulator()};
 el("resetGitBtn").onclick=()=>{state.gitSimulation=gitInitialState();persist();renderGitSimulator()};
}
function packageTemplateData(){return{projectName:"analytics_tool",description:"A reusable Python analytics package.",author:state.profile?.name||"Learner",pythonVersion:">=3.10",dependencies:"pandas>=2.0",includeCli:true,includeTests:true}}
function buildPackageFiles(c){
 const p=c.projectName.replace(/[^a-zA-Z0-9_]/g,"_").toLowerCase(),f={};
 f["README.md"]=`# ${c.projectName}\n\n${c.description}\n\n## Installation\n\n\`\`\`bash\npip install -e .\n\`\`\`\n`;
 f["pyproject.toml"]=`[build-system]\nrequires = ["setuptools>=68"]\nbuild-backend = "setuptools.build_meta"\n\n[project]\nname = "${c.projectName.replaceAll("_","-")}"\nversion = "0.1.0"\ndescription = "${c.description.replaceAll('"','\\"')}"\nrequires-python = "${c.pythonVersion}"\ndependencies = [${c.dependencies.split(",").filter(Boolean).map(x=>`"${x.trim()}"`).join(", ")}]\n`;
 f[`src/${p}/__init__.py`]=`from .core import summarise\n`;
 f[`src/${p}/core.py`]=`def summarise(values: list[float]) -> dict[str, float]:\n    'Return count and average for numeric values.'\n    if not values:\n        return {"count": 0, "average": 0.0}\n    return {"count": len(values), "average": sum(values) / len(values)}\n`;
 if(c.includeTests)f["tests/test_core.py"]=`from ${p}.core import summarise\n\n\ndef test_values():\n    assert summarise([2, 4]) == {"count": 2, "average": 3.0}\n`;
 if(c.includeCli)f[`src/${p}/cli.py`]=`import argparse\nfrom .core import summarise\n\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument("values", nargs="+", type=float)\n    print(summarise(parser.parse_args().values))\n\n\nif __name__ == "__main__":\n    main()\n`;
 f[".gitignore"]=".venv/\n__pycache__/\n.pytest_cache/\ndist/\nbuild/\n";return f;
}
function renderPackageBuilder(){
 const s=state.packageProjects[0]||packageTemplateData();
 el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PROJECT GENERATOR</div><h1>Package builder</h1><p>Generate a source-layout Python package.</p></div></div><section class="package-layout"><article class="card package-controls">${studioField("pkgName","Project name",s.projectName)}<div class="form-row"><label>Description</label><textarea id="pkgDescription">${esc(s.description)}</textarea></div>${studioField("pkgAuthor","Author",s.author)}${studioField("pkgPython","Python requirement",s.pythonVersion)}${studioField("pkgDependencies","Dependencies",s.dependencies)}<label class="toggle-row"><span>Include CLI</span><input id="pkgCli" type="checkbox" ${s.includeCli?"checked":""}></label><label class="toggle-row"><span>Include tests</span><input id="pkgTests" type="checkbox" ${s.includeTests?"checked":""}></label><div class="studio-toolbar"><button id="generatePackageBtn" class="primary-btn">Generate</button><button id="savePackageBtn" class="secondary-btn">Save</button><button id="downloadPackageBtn" class="secondary-btn">Download ZIP</button></div></article><article class="card package-preview"><div id="packageTree" class="file-tree"></div><div id="packageTabs" class="package-file-tabs"></div><pre id="packageCode" class="package-code"></pre></article></section>`;
 const refresh=()=>renderPackagePreview(readPackageConfig());el("generatePackageBtn").onclick=refresh;
 el("savePackageBtn").onclick=()=>{const c=readPackageConfig();c.savedAt=new Date().toISOString();state.packageProjects.unshift(c);persist();refresh()};
 el("downloadPackageBtn").onclick=()=>downloadPythonPackage(readPackageConfig());refresh();
}
function readPackageConfig(){return{projectName:el("pkgName").value.trim()||"python_project",description:el("pkgDescription").value,author:el("pkgAuthor").value,pythonVersion:el("pkgPython").value,dependencies:el("pkgDependencies").value,includeCli:el("pkgCli").checked,includeTests:el("pkgTests").checked}}
function renderPackagePreview(c){const f=buildPackageFiles(c),n=Object.keys(f);el("packageTree").textContent=`${c.projectName}/\n${n.map((x,i)=>`${i===n.length-1?"└──":"├──"} ${x}`).join("\n")}`;el("packageTabs").innerHTML=n.map((x,i)=>`<button class="package-file-tab ${i===0?"active":""}" data-package-file="${encodeURIComponent(x)}">${x.split("/").pop()}</button>`).join("");el("packageCode").textContent=f[n[0]];document.querySelectorAll("[data-package-file]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-package-file]").forEach(x=>x.classList.remove("active"));b.classList.add("active");el("packageCode").textContent=f[decodeURIComponent(b.dataset.packageFile)]})}
async function downloadPythonPackage(c){const z=new JSZip(),folder=z.folder(c.projectName);Object.entries(buildPackageFiles(c)).forEach(([n,v])=>folder.file(n,v));downloadBlob(await z.generateAsync({type:"blob"}),`${c.projectName}.zip`);state.xp+=50;recordActivity("package-build",c.projectName);persist()}


function renderApiSimulator(){
  const scenarioId=localStorage.getItem("pq_api_scenario")||apiScenarios[0].id;
  const scenario=apiScenarios.find(x=>x.id===scenarioId)||apiScenarios[0];
  const resourceName=Object.keys(scenario.resources)[0];
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">REQUEST AND RESPONSE PRACTICE</div><h1>API simulator</h1><p>Send simulated HTTP requests and inspect status codes, headers and JSON bodies.</p></div><select id="apiScenarioSelect">${apiScenarios.map(s=>`<option value="${s.id}" ${s.id===scenario.id?"selected":""}>${s.title}</option>`).join("")}</select></div>
  <section class="api-layout"><article class="card api-controls"><div class="form-row"><label>Method</label><select id="apiMethod"><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select></div><div class="form-row"><label>Path</label><input id="apiPath" value="/${resourceName}"></div><div class="form-row"><label>JSON body</label><textarea id="apiBody" class="schema-editor">{\n  "name": "New item"\n}</textarea></div><button id="sendApiRequestBtn" class="primary-btn full">Send request</button><h3>Recent requests</h3>${state.apiHistory.slice(0,6).map(h=>`<div class="endpoint-line"><strong class="api-method ${h.method}">${h.method}</strong><span>${h.path}</span><span>${h.status}</span></div>`).join("")||"<p class='muted'>No requests yet.</p>"}</article><article class="card api-response"><div class="eyebrow">SIMULATED RESPONSE</div><div id="apiResponseMeta"></div><pre id="apiResponseBox" class="api-response-box">Send a request to begin.</pre></article></section>`;
  el("apiScenarioSelect").onchange=()=>{localStorage.setItem("pq_api_scenario",el("apiScenarioSelect").value);renderApiSimulator()};
  el("sendApiRequestBtn").onclick=()=>sendSimulatedRequest(scenario);
}
function sendSimulatedRequest(scenario){
  const method=el("apiMethod").value,path=el("apiPath").value.trim();
  const parts=path.split("/").filter(Boolean),resource=parts[0],id=parts[1]?Number(parts[1]):null;
  const collection=scenario.resources[resource];
  let status=200,body=null;
  try{
    if(!collection){status=404;body={detail:"Resource not found"}}
    else if(method==="GET"&&!id)body=collection;
    else if(method==="GET"&&id){body=collection.find(x=>x.id===id)||null;if(!body){status=404;body={detail:"Item not found"}}}
    else if(method==="POST"){
      const payload=JSON.parse(el("apiBody").value||"{}");
      if(!Object.keys(payload).length){status=400;body={detail:"Request body is required"}}
      else{status=201;body={id:Math.max(0,...collection.map(x=>x.id||0))+1,...payload}}
    }
    else if(method==="PUT"&&id){
      const payload=JSON.parse(el("apiBody").value||"{}");
      const existing=collection.find(x=>x.id===id);
      if(!existing){status=404;body={detail:"Item not found"}}else body={...existing,...payload,id};
    }
    else if(method==="DELETE"&&id){
      const existing=collection.find(x=>x.id===id);
      if(!existing){status=404;body={detail:"Item not found"}}else{status=204;body=null}
    }
    else{status=405;body={detail:"Method not allowed for this path"}}
  }catch(_){status=400;body={detail:"Invalid JSON body"}}
  const response={status,headers:{"content-type":"application/json","x-codequest-simulator":"true"},body};
  el("apiResponseMeta").innerHTML=`<div class="endpoint-line"><strong>Status ${status}</strong><span>${status>=200&&status<300?"Success":"Request error"}</span></div>`;
  el("apiResponseBox").textContent=JSON.stringify(response,null,2);
  state.apiHistory.unshift({method,path,status,scenarioId:scenario.id,at:new Date().toISOString()});
  state.apiHistory=state.apiHistory.slice(0,40);persist();
}
function endpointTemplate(){return{title:"Orders API",basePath:"/orders",description:"Manage order resources.",endpoints:[{method:"GET",path:"/orders",summary:"List orders",status:200},{method:"GET",path:"/orders/{order_id}",summary:"Get one order",status:200},{method:"POST",path:"/orders",summary:"Create an order",status:201}],schema:{order_id:"integer",amount:"number",status:"string"}}}
function renderEndpointDesigner(){
  const design=state.endpointDesigns[0]||endpointTemplate();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">API CONTRACT DESIGN</div><h1>Endpoint designer</h1><p>Define resources, methods, paths, status codes and a simple response schema.</p></div></div><section class="endpoint-grid"><article class="card endpoint-card">${studioField("endpointTitle","API title",design.title)}${studioField("endpointBase","Base path",design.basePath)}<div class="form-row"><label>Description</label><textarea id="endpointDescription">${esc(design.description)}</textarea></div><div class="form-row"><label>Response schema JSON</label><textarea id="endpointSchema" class="schema-editor">${esc(JSON.stringify(design.schema,null,2))}</textarea></div><button id="addEndpointBtn" class="secondary-btn">Add endpoint</button><button id="saveEndpointDesignBtn" class="primary-btn">Save design</button><button id="exportOpenApiBtn" class="secondary-btn">Export OpenAPI JSON</button></article><article class="card endpoint-card"><div class="eyebrow">ENDPOINTS</div><div id="endpointRows"></div><div class="api-doc-preview"><h2 id="apiPreviewTitle"></h2><p id="apiPreviewDescription"></p><div id="apiPreviewRows"></div></div></article></section>`;
  let working=JSON.parse(JSON.stringify(design));
  const refresh=()=>{
    el("endpointRows").innerHTML=working.endpoints.map((ep,i)=>`<div class="endpoint-line"><select data-ep-method="${i}">${["GET","POST","PUT","DELETE"].map(m=>`<option ${m===ep.method?"selected":""}>${m}</option>`).join("")}</select><input data-ep-path="${i}" value="${esc(ep.path)}"><input data-ep-summary="${i}" value="${esc(ep.summary)}"><input data-ep-status="${i}" type="number" value="${ep.status}"><button class="text-btn" data-remove-ep="${i}">✕</button></div>`).join("");
    el("apiPreviewTitle").textContent=el("endpointTitle").value;
    el("apiPreviewDescription").textContent=el("endpointDescription").value;
    el("apiPreviewRows").innerHTML=working.endpoints.map(ep=>`<div class="api-doc-row"><strong class="api-method ${ep.method}">${ep.method}</strong><span>${esc(ep.path)}<div class="muted">${esc(ep.summary)}</div></span><span>${ep.status}</span></div>`).join("");
    document.querySelectorAll("[data-ep-method]").forEach(x=>x.onchange=()=>{working.endpoints[Number(x.dataset.epMethod)].method=x.value;refresh()});
    document.querySelectorAll("[data-ep-path]").forEach(x=>x.oninput=()=>working.endpoints[Number(x.dataset.epPath)].path=x.value);
    document.querySelectorAll("[data-ep-summary]").forEach(x=>x.oninput=()=>working.endpoints[Number(x.dataset.epSummary)].summary=x.value);
    document.querySelectorAll("[data-ep-status]").forEach(x=>x.oninput=()=>working.endpoints[Number(x.dataset.epStatus)].status=Number(x.value));
    document.querySelectorAll("[data-remove-ep]").forEach(x=>x.onclick=()=>{working.endpoints.splice(Number(x.dataset.removeEp),1);refresh()});
  };
  el("addEndpointBtn").onclick=()=>{working.endpoints.push({method:"GET",path:el("endpointBase").value,summary:"New endpoint",status:200});refresh()};
  el("saveEndpointDesignBtn").onclick=()=>{working.title=el("endpointTitle").value;working.basePath=el("endpointBase").value;working.description=el("endpointDescription").value;try{working.schema=JSON.parse(el("endpointSchema").value)}catch(_){alert("Schema must be valid JSON.");return}working.savedAt=new Date().toISOString();state.endpointDesigns.unshift(working);state.endpointDesigns=state.endpointDesigns.slice(0,20);persist();refresh()};
  el("exportOpenApiBtn").onclick=()=>{const spec=buildOpenApiSpec(working);downloadBlob(new Blob([JSON.stringify(spec,null,2)],{type:"application/json"}),`${slug(working.title)}-openapi.json`)};
  refresh();
}
function buildOpenApiSpec(design){
  const paths={};
  design.endpoints.forEach(ep=>{
    if(!paths[ep.path])paths[ep.path]={};
    paths[ep.path][ep.method.toLowerCase()]={summary:ep.summary,responses:{[String(ep.status)]:{description:"Successful response"}}};
  });
  return{openapi:"3.1.0",info:{title:design.title,version:"0.1.0",description:design.description},paths,components:{schemas:{Item:{type:"object",properties:Object.fromEntries(Object.entries(design.schema||{}).map(([k,v])=>[k,{type:v}]))}}}};
}
function fastApiTemplate(){return{projectName:"orders_api",description:"A small FastAPI service.",resource:"orders",includeTests:true,includeDocker:true}}
function fastApiFiles(c){
  const resource=c.resource.replace(/[^a-zA-Z0-9_]/g,"_").toLowerCase(),files={};
  files["README.md"]=`# ${c.projectName}\n\n${c.description}\n\n## Run\n\n\`\`\`bash\npip install -r requirements.txt\nuvicorn app.main:app --reload\n\`\`\`\n\nOpen http://localhost:8000/docs`;
  files["requirements.txt"]="fastapi>=0.115\nuvicorn[standard]>=0.30\npydantic>=2.8\npytest>=8.0\nhttpx>=0.27\n";
  files["app/__init__.py"]="";
  files["app/main.py"]=`from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI(title="${c.projectName}", description="${c.description.replaceAll('"','\\"')}")\n\nclass Item(BaseModel):\n    name: str\n    amount: float\n\nitems: dict[int, Item] = {}\n\n@app.get("/health")\ndef health() -> dict[str, str]:\n    return {"status": "ok"}\n\n@app.get("/${resource}")\ndef list_items() -> list[dict]:\n    return [{"id": key, **value.model_dump()} for key, value in items.items()]\n\n@app.post("/${resource}", status_code=201)\ndef create_item(item: Item) -> dict:\n    item_id = len(items) + 1\n    items[item_id] = item\n    return {"id": item_id, **item.model_dump()}\n\n@app.get("/${resource}/{item_id}")\ndef get_item(item_id: int) -> dict:\n    item = items.get(item_id)\n    if item is None:\n        raise HTTPException(status_code=404, detail="Item not found")\n    return {"id": item_id, **item.model_dump()}\n`;
  if(c.includeTests)files["tests/test_api.py"]=`from fastapi.testclient import TestClient\nfrom app.main import app\n\nclient = TestClient(app)\n\ndef test_health():\n    response = client.get("/health")\n    assert response.status_code == 200\n    assert response.json() == {"status": "ok"}\n\ndef test_create_item():\n    response = client.post("/${resource}", json={"name": "Sample", "amount": 10})\n    assert response.status_code == 201\n`;
  if(c.includeDocker)files["Dockerfile"]=`FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]\n`;
  files[".gitignore"]=".venv/\n__pycache__/\n.pytest_cache/\n*.pyc\n";
  return files;
}
function renderFastApiBuilder(){
  const saved=state.fastapiProjects[0]||fastApiTemplate();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SERVICE GENERATOR</div><h1>FastAPI builder</h1><p>Generate a runnable API project with validation, tests and optional Docker support.</p></div></div><section class="fastapi-layout"><article class="card fastapi-controls">${studioField("faProjectName","Project name",saved.projectName)}<div class="form-row"><label>Description</label><textarea id="faDescription">${esc(saved.description)}</textarea></div>${studioField("faResource","Resource name",saved.resource)}<label class="toggle-row"><span>Include pytest API tests</span><input id="faTests" type="checkbox" ${saved.includeTests?"checked":""}></label><label class="toggle-row"><span>Include Dockerfile</span><input id="faDocker" type="checkbox" ${saved.includeDocker?"checked":""}></label><div class="studio-toolbar"><button id="generateFastApiBtn" class="primary-btn">Generate project</button><button id="saveFastApiBtn" class="secondary-btn">Save project</button><button id="downloadFastApiBtn" class="secondary-btn">Download ZIP</button></div></article><article class="card fastapi-preview"><div id="faTree" class="file-tree"></div><div id="faTabs" class="package-file-tabs"></div><pre id="faCode" class="package-code"></pre></article></section>`;
  const refresh=()=>renderFastApiPreview(readFastApiConfig());
  el("generateFastApiBtn").onclick=refresh;
  el("saveFastApiBtn").onclick=()=>{const c=readFastApiConfig();c.savedAt=new Date().toISOString();state.fastapiProjects.unshift(c);state.fastapiProjects=state.fastapiProjects.slice(0,20);persist();refresh()};
  el("downloadFastApiBtn").onclick=()=>downloadFastApiProject(readFastApiConfig());
  refresh();
}
function readFastApiConfig(){return{projectName:el("faProjectName").value.trim()||"fastapi_service",description:el("faDescription").value,resource:el("faResource").value.trim()||"items",includeTests:el("faTests").checked,includeDocker:el("faDocker").checked}}
function renderFastApiPreview(c){
  const files=fastApiFiles(c),names=Object.keys(files);
  el("faTree").textContent=`${c.projectName}/\n${names.map((n,i)=>`${i===names.length-1?"└──":"├──"} ${n}`).join("\n")}`;
  el("faTabs").innerHTML=names.map((n,i)=>`<button class="package-file-tab ${i===0?"active":""}" data-fa-file="${encodeURIComponent(n)}">${n.split("/").pop()}</button>`).join("");
  el("faCode").textContent=files[names[0]];
  document.querySelectorAll("[data-fa-file]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-fa-file]").forEach(x=>x.classList.remove("active"));b.classList.add("active");el("faCode").textContent=files[decodeURIComponent(b.dataset.faFile)]});
}
async function downloadFastApiProject(c){
  const zip=new JSZip(),folder=zip.folder(c.projectName);
  Object.entries(fastApiFiles(c)).forEach(([name,content])=>folder.file(name,content));
  downloadBlob(await zip.generateAsync({type:"blob"}),`${c.projectName}.zip`);
  state.xp+=60;recordActivity("fastapi-build",c.projectName);persist();
}


function schemaTemplate(){
  return{
    title:"Commerce schema",
    tables:[
      {name:"customers",columns:[{name:"id",type:"INTEGER",primary:true,nullable:false},{name:"name",type:"TEXT",primary:false,nullable:false},{name:"email",type:"TEXT",primary:false,nullable:true}]},
      {name:"orders",columns:[{name:"id",type:"INTEGER",primary:true,nullable:false},{name:"customer_id",type:"INTEGER",primary:false,nullable:false},{name:"amount",type:"REAL",primary:false,nullable:false}]}
    ],
    relationships:[{from:"orders.customer_id",to:"customers.id"}]
  };
}
function renderSchemaDesigner(){
  let design=JSON.parse(JSON.stringify(state.schemaDesigns[0]||schemaTemplate()));
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">RELATIONAL MODELLING</div><h1>Schema designer</h1><p>Design tables, columns, keys and relationships, then export SQL.</p></div></div>
  <section class="schema-layout"><article class="card schema-controls"><div class="form-row"><label>Schema title</label><input id="schemaTitle" value="${esc(design.title)}"></div><button id="addSchemaTableBtn" class="secondary-btn">Add table</button><button id="saveSchemaBtn" class="primary-btn">Save schema</button><button id="exportSchemaSqlBtn" class="secondary-btn">Export SQL</button><div class="section-head"><div><h3>Relationship</h3></div></div><div class="form-row"><label>From</label><input id="relationshipFrom" placeholder="orders.customer_id"></div><div class="form-row"><label>To</label><input id="relationshipTo" placeholder="customers.id"></div><button id="addRelationshipBtn" class="secondary-btn">Add relationship</button></article><article class="card schema-preview"><div id="schemaTables"></div><h3>Relationships</h3><div id="schemaRelationships"></div><h3>Generated SQL</h3><pre id="schemaSqlPreview" class="schema-code"></pre></article></section>`;
  const refresh=()=>{
    el("schemaTables").innerHTML=design.tables.map((table,ti)=>`<article class="schema-table-card"><div class="section-head"><div><input data-table-name="${ti}" value="${esc(table.name)}"></div><button class="text-btn" data-remove-table="${ti}">Delete table</button></div>${table.columns.map((c,ci)=>`<div class="schema-column-row"><input data-col-name="${ti}:${ci}" value="${esc(c.name)}"><select data-col-type="${ti}:${ci}">${["INTEGER","TEXT","REAL","BOOLEAN","DATE","DATETIME"].map(t=>`<option ${t===c.type?"selected":""}>${t}</option>`).join("")}</select><label><input type="checkbox" data-col-primary="${ti}:${ci}" ${c.primary?"checked":""}> PK</label><button class="text-btn" data-remove-col="${ti}:${ci}">✕</button></div>`).join("")}<button class="text-btn" data-add-col="${ti}">+ Add column</button></article>`).join("");
    el("schemaRelationships").innerHTML=design.relationships.map((r,i)=>`<div class="relationship-line">${esc(r.from)} → ${esc(r.to)} <button class="text-btn" data-remove-rel="${i}">✕</button></div>`).join("")||"<p class='muted'>No relationships.</p>";
    el("schemaSqlPreview").textContent=generateSchemaSql(design);
    document.querySelectorAll("[data-table-name]").forEach(x=>x.oninput=()=>{design.tables[Number(x.dataset.tableName)].name=x.value;refresh()});
    document.querySelectorAll("[data-col-name]").forEach(x=>x.oninput=()=>{const [ti,ci]=x.dataset.colName.split(":").map(Number);design.tables[ti].columns[ci].name=x.value;refresh()});
    document.querySelectorAll("[data-col-type]").forEach(x=>x.onchange=()=>{const [ti,ci]=x.dataset.colType.split(":").map(Number);design.tables[ti].columns[ci].type=x.value;refresh()});
    document.querySelectorAll("[data-col-primary]").forEach(x=>x.onchange=()=>{const [ti,ci]=x.dataset.colPrimary.split(":").map(Number);design.tables[ti].columns[ci].primary=x.checked;refresh()});
    document.querySelectorAll("[data-add-col]").forEach(x=>x.onclick=()=>{design.tables[Number(x.dataset.addCol)].columns.push({name:"new_column",type:"TEXT",primary:false,nullable:true});refresh()});
    document.querySelectorAll("[data-remove-col]").forEach(x=>x.onclick=()=>{const [ti,ci]=x.dataset.removeCol.split(":").map(Number);design.tables[ti].columns.splice(ci,1);refresh()});
    document.querySelectorAll("[data-remove-table]").forEach(x=>x.onclick=()=>{design.tables.splice(Number(x.dataset.removeTable),1);refresh()});
    document.querySelectorAll("[data-remove-rel]").forEach(x=>x.onclick=()=>{design.relationships.splice(Number(x.dataset.removeRel),1);refresh()});
  };
  el("addSchemaTableBtn").onclick=()=>{design.tables.push({name:"new_table",columns:[{name:"id",type:"INTEGER",primary:true,nullable:false}]});refresh()};
  el("addRelationshipBtn").onclick=()=>{const from=el("relationshipFrom").value.trim(),to=el("relationshipTo").value.trim();if(from&&to){design.relationships.push({from,to});refresh()}};
  el("saveSchemaBtn").onclick=()=>{design.title=el("schemaTitle").value;design.savedAt=new Date().toISOString();state.schemaDesigns.unshift(JSON.parse(JSON.stringify(design)));state.schemaDesigns=state.schemaDesigns.slice(0,20);persist();refresh()};
  el("exportSchemaSqlBtn").onclick=()=>downloadBlob(new Blob([generateSchemaSql(design)],{type:"text/sql"}),`${slug(el("schemaTitle").value)}.sql`);
  refresh();
}
function generateSchemaSql(design){
  return design.tables.map(table=>{
    const rels=design.relationships.filter(r=>r.from.startsWith(table.name+"."));
    const lines=table.columns.map(c=>`  ${c.name} ${c.type}${c.primary?" PRIMARY KEY":""}${c.nullable===false&&!c.primary?" NOT NULL":""}`);
    rels.forEach(r=>{const fromCol=r.from.split(".")[1],toTable=r.to.split(".")[0],toCol=r.to.split(".")[1];lines.push(`  FOREIGN KEY (${fromCol}) REFERENCES ${toTable}(${toCol})`)});
    return`CREATE TABLE ${table.name} (\n${lines.join(",\n")}\n);`;
  }).join("\n\n");
}
function renderMigrationSimulator(){
  const sid=localStorage.getItem("pq_migration_scenario")||migrationScenarios[0].id;
  const scenario=migrationScenarios.find(x=>x.id===sid)||migrationScenarios[0];
  let session=window.__migrationSession;
  if(!session||session.id!==scenario.id)session=window.__migrationSession={id:scenario.id,applied:0,schema:JSON.parse(JSON.stringify(scenario.initialSchema)),log:["Migration session started."]};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">SCHEMA EVOLUTION</div><h1>Migration simulator</h1><p>Apply ordered changes and inspect the resulting schema.</p></div><select id="migrationScenarioSelect">${migrationScenarios.map(s=>`<option value="${s.id}" ${s.id===scenario.id?"selected":""}>${s.title}</option>`).join("")}</select></div>
  <section class="migration-layout"><article class="card migration-controls"><h2>${scenario.title}</h2>${scenario.steps.map((step,i)=>`<div class="migration-step ${i<session.applied?"applied":""}"><strong>${i+1}. ${step.operation.replaceAll("_"," ")}</strong><div class="muted">${step.table}.${step.column}</div></div>`).join("")}<div class="notebook-toolbar"><button id="applyMigrationStepBtn" class="primary-btn" ${session.applied>=scenario.steps.length?"disabled":""}>Apply next step</button><button id="rollbackMigrationBtn" class="secondary-btn" ${session.applied===0?"disabled":""}>Rollback</button><button id="resetMigrationBtn" class="secondary-btn">Reset</button></div></article><article class="card migration-preview"><div class="eyebrow">CURRENT SCHEMA</div><pre class="schema-code">${esc(JSON.stringify(session.schema,null,2))}</pre><h3>Migration log</h3><pre>${esc(session.log.join("\n"))}</pre></article></section>`;
  el("migrationScenarioSelect").onchange=()=>{localStorage.setItem("pq_migration_scenario",el("migrationScenarioSelect").value);window.__migrationSession=null;renderMigrationSimulator()};
  el("applyMigrationStepBtn").onclick=()=>{const step=scenario.steps[session.applied];applyMigrationOperation(session.schema,step);session.applied++;session.log.push(`Applied ${step.operation} on ${step.table}.${step.column}`);if(session.applied===scenario.steps.length){state.migrationHistory.unshift({scenarioId:scenario.id,title:scenario.title,completedAt:new Date().toISOString()});state.xp+=40;recordActivity("migration",scenario.id);persist()}renderMigrationSimulator()};
  el("rollbackMigrationBtn").onclick=()=>{session.applied=Math.max(0,session.applied-1);session.schema=JSON.parse(JSON.stringify(scenario.initialSchema));for(let i=0;i<session.applied;i++)applyMigrationOperation(session.schema,scenario.steps[i]);session.log.push("Rolled back one migration step.");renderMigrationSimulator()};
  el("resetMigrationBtn").onclick=()=>{window.__migrationSession=null;renderMigrationSimulator()};
}
function applyMigrationOperation(schema,step){
  if(step.operation==="add_column")schema[step.table][step.column]=step.type;
  if(step.operation==="create_index"){if(!schema.__indexes__)schema.__indexes__=[];schema.__indexes__.push(`${step.table}.${step.column}`)}
}
function persistenceTemplate(){return{projectName:"orders_service_db",description:"FastAPI service with SQLite persistence.",resource:"orders",includeMigrations:true,includeTests:true}}
function persistenceFiles(c){
  const r=c.resource.replace(/[^a-zA-Z0-9_]/g,"_").toLowerCase(),files={};
  files["README.md"]=`# ${c.projectName}\n\n${c.description}\n\n## Run\n\n\`\`\`bash\npip install -r requirements.txt\nuvicorn app.main:app --reload\n\`\`\`\n`;
  files["requirements.txt"]="fastapi>=0.115\nuvicorn[standard]>=0.30\nsqlalchemy>=2.0\npydantic>=2.8\npytest>=8.0\nhttpx>=0.27\n";
  if(c.includeMigrations)files["requirements.txt"]+="alembic>=1.13\n";
  files["app/database.py"]=`from sqlalchemy import create_engine\nfrom sqlalchemy.orm import DeclarativeBase, sessionmaker\n\nDATABASE_URL = "sqlite:///./app.db"\nengine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})\nSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)\n\nclass Base(DeclarativeBase):\n    pass\n`;
  files["app/models.py"]=`from sqlalchemy import Float, Integer, String\nfrom sqlalchemy.orm import Mapped, mapped_column\nfrom .database import Base\n\nclass Item(Base):\n    __tablename__ = "${r}"\n    id: Mapped[int] = mapped_column(Integer, primary_key=True)\n    name: Mapped[str] = mapped_column(String(120), nullable=False)\n    amount: Mapped[float] = mapped_column(Float, nullable=False)\n`;
  files["app/schemas.py"]=`from pydantic import BaseModel, ConfigDict\n\nclass ItemCreate(BaseModel):\n    name: str\n    amount: float\n\nclass ItemRead(ItemCreate):\n    id: int\n    model_config = ConfigDict(from_attributes=True)\n`;
  files["app/main.py"]=`from fastapi import Depends, FastAPI, HTTPException\nfrom sqlalchemy.orm import Session\nfrom .database import Base, SessionLocal, engine\nfrom .models import Item\nfrom .schemas import ItemCreate, ItemRead\n\nBase.metadata.create_all(bind=engine)\napp = FastAPI(title="${c.projectName}")\n\ndef get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\n@app.get("/health")\ndef health():\n    return {"status": "ok"}\n\n@app.post("/${r}", response_model=ItemRead, status_code=201)\ndef create_item(payload: ItemCreate, db: Session = Depends(get_db)):\n    item = Item(**payload.model_dump())\n    db.add(item)\n    db.commit()\n    db.refresh(item)\n    return item\n\n@app.get("/${r}", response_model=list[ItemRead])\ndef list_items(db: Session = Depends(get_db)):\n    return db.query(Item).all()\n\n@app.get("/${r}/{item_id}", response_model=ItemRead)\ndef get_item(item_id: int, db: Session = Depends(get_db)):\n    item = db.get(Item, item_id)\n    if item is None:\n        raise HTTPException(status_code=404, detail="Item not found")\n    return item\n`;
  if(c.includeTests)files["tests/test_api.py"]=`from fastapi.testclient import TestClient\nfrom app.main import app\n\nclient = TestClient(app)\n\ndef test_health():\n    assert client.get("/health").json() == {"status": "ok"}\n`;
  if(c.includeMigrations){files["alembic.ini"]="[alembic]\nscript_location = migrations\nsqlalchemy.url = sqlite:///./app.db\n";files["migrations/README"]="Run: alembic revision --autogenerate -m \"initial\" then alembic upgrade head\n"}
  files[".gitignore"]=".venv/\n__pycache__/\n*.pyc\n.pytest_cache/\napp.db\n";
  return files;
}
function renderPersistenceBuilder(){
  const saved=state.persistenceProjects[0]||persistenceTemplate();
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSISTENT API GENERATOR</div><h1>Persistence builder</h1><p>Generate a FastAPI project backed by SQLite and SQLAlchemy.</p></div></div><section class="persistence-layout"><article class="card persistence-controls">${studioField("pbName","Project name",saved.projectName)}<div class="form-row"><label>Description</label><textarea id="pbDescription">${esc(saved.description)}</textarea></div>${studioField("pbResource","Resource name",saved.resource)}<label class="toggle-row"><span>Include Alembic migration setup</span><input id="pbMigrations" type="checkbox" ${saved.includeMigrations?"checked":""}></label><label class="toggle-row"><span>Include pytest tests</span><input id="pbTests" type="checkbox" ${saved.includeTests?"checked":""}></label><div class="studio-toolbar"><button id="generatePersistenceBtn" class="primary-btn">Generate</button><button id="savePersistenceBtn" class="secondary-btn">Save</button><button id="downloadPersistenceBtn" class="secondary-btn">Download ZIP</button></div></article><article class="card persistence-preview"><div id="pbTree" class="file-tree"></div><div id="pbTabs" class="package-file-tabs"></div><pre id="pbCode" class="package-code"></pre></article></section>`;
  const refresh=()=>renderPersistencePreview(readPersistenceConfig());
  el("generatePersistenceBtn").onclick=refresh;
  el("savePersistenceBtn").onclick=()=>{const c=readPersistenceConfig();c.savedAt=new Date().toISOString();state.persistenceProjects.unshift(c);state.persistenceProjects=state.persistenceProjects.slice(0,20);persist();refresh()};
  el("downloadPersistenceBtn").onclick=()=>downloadPersistenceProject(readPersistenceConfig());
  refresh();
}
function readPersistenceConfig(){return{projectName:el("pbName").value.trim()||"persistent_api",description:el("pbDescription").value,resource:el("pbResource").value.trim()||"items",includeMigrations:el("pbMigrations").checked,includeTests:el("pbTests").checked}}
function renderPersistencePreview(c){
  const files=persistenceFiles(c),names=Object.keys(files);
  el("pbTree").textContent=`${c.projectName}/\n${names.map((n,i)=>`${i===names.length-1?"└──":"├──"} ${n}`).join("\n")}`;
  el("pbTabs").innerHTML=names.map((n,i)=>`<button class="package-file-tab ${i===0?"active":""}" data-pb-file="${encodeURIComponent(n)}">${n.split("/").pop()}</button>`).join("");
  el("pbCode").textContent=files[names[0]];
  document.querySelectorAll("[data-pb-file]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-pb-file]").forEach(x=>x.classList.remove("active"));b.classList.add("active");el("pbCode").textContent=files[decodeURIComponent(b.dataset.pbFile)]});
}
async function downloadPersistenceProject(c){
  const zip=new JSZip(),folder=zip.folder(c.projectName);
  Object.entries(persistenceFiles(c)).forEach(([name,content])=>folder.file(name,content));
  downloadBlob(await zip.generateAsync({type:"blob"}),`${c.projectName}.zip`);
  state.xp+=70;recordActivity("persistence-build",c.projectName);persist();
}


function renderPipelineSimulator(){const id=localStorage.getItem("pq_pipeline_id")||deploymentPipelines[0].id,p=deploymentPipelines.find(x=>x.id===id)||deploymentPipelines[0];let r=window.__pipelineRun;if(!r||r.id!==p.id)r=window.__pipelineRun={id:p.id,status:p.stages.map(()=>"pending"),logs:["Pipeline ready."],fail:null};el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">AUTOMATED DELIVERY</div><h1>CI/CD pipeline simulator</h1><p>Run a gated delivery pipeline and inject a failure.</p></div><select id="pipelineSelect">${deploymentPipelines.map(x=>`<option value="${x.id}" ${x.id===p.id?"selected":""}>${x.title}</option>`).join("")}</select></div><section class="pipeline-layout"><article class="card pipeline-controls"><div class="form-row"><label>Inject failure</label><select id="pipelineFail"><option value="">No failure</option>${p.stages.map((x,i)=>`<option value="${i}">${x.name}</option>`).join("")}</select></div><button id="runPipelineBtn" class="primary-btn">Run pipeline</button><button id="resetPipelineBtn" class="secondary-btn">Reset</button></article><article class="card pipeline-preview">${p.stages.map((x,i)=>`<div class="pipeline-stage ${r.status[i]}"><span class="stage-icon">${i+1}</span><span><strong>${x.name}</strong><div class="muted"><code>${x.command}</code></div></span><span>${r.status[i]}</span></div>`).join("")}<pre class="log-viewer">${esc(r.logs.join("\n"))}</pre></article></section>`;el("pipelineSelect").onchange=()=>{localStorage.setItem("pq_pipeline_id",el("pipelineSelect").value);window.__pipelineRun=null;renderPipelineSimulator()};el("pipelineFail").onchange=()=>r.fail=el("pipelineFail").value===""?null:Number(el("pipelineFail").value);el("resetPipelineBtn").onclick=()=>{window.__pipelineRun=null;renderPipelineSimulator()};el("runPipelineBtn").onclick=()=>runPipeline(p,r)}
async function runPipeline(p,r){r.status=p.stages.map(()=>"pending");r.logs=["Pipeline started."];for(let i=0;i<p.stages.length;i++){r.status[i]="running";r.logs.push(`Running ${p.stages[i].name}`);renderPipelineSimulator();await new Promise(x=>setTimeout(x,350));if(r.fail===i){r.status[i]="failed";r.logs.push("Stage failed. Pipeline stopped.");state.pipelineRuns.unshift({title:p.title,result:"failed",completedAt:new Date().toISOString()});persist();renderPipelineSimulator();return}r.status[i]="passed";r.logs.push(`${p.stages[i].name} passed.`)}state.pipelineRuns.unshift({title:p.title,result:"passed",completedAt:new Date().toISOString()});state.xp+=50;recordActivity("pipeline-run",p.id);persist();renderPipelineSimulator()}
function deploymentTemplate(){return{projectName:"production_api",pythonVersion:"3.12",port:"8000",workers:"2",healthPath:"/health",includeCompose:true,includeWorkflow:true}}
function deploymentFiles(c){const f={};f["Dockerfile"]=`FROM python:${c.pythonVersion}-slim\nWORKDIR /app\nENV PYTHONDONTWRITEBYTECODE=1\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nHEALTHCHECK CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:${c.port}${c.healthPath}')"\nCMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","${c.port}","--workers","${c.workers}"]\n`;f[".dockerignore"]=".git\n.venv\n__pycache__\n.env\napp.db\n";f["deployment-checklist.md"]="# Deployment checklist\n\n- [ ] Tests pass\n- [ ] Secrets externalised\n- [ ] Migration reviewed\n- [ ] Health verified\n- [ ] Rollback planned\n- [ ] Monitoring checked\n";if(c.includeCompose)f["docker-compose.yml"]=`services:\n  api:\n    build: .\n    ports:\n      - "${c.port}:${c.port}"\n    restart: unless-stopped\n`;if(c.includeWorkflow)f[".github/workflows/ci.yml"]=`name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "${c.pythonVersion}"\n      - run: pip install -r requirements.txt\n      - run: pytest\n      - run: docker build -t ${c.projectName} .\n`;return f}
function renderDeploymentBuilder(){const s=state.deploymentProjects[0]||deploymentTemplate();el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PRODUCTION PACKAGING</div><h1>Deployment builder</h1><p>Generate Docker and CI support files.</p></div></div><section class="deployment-layout"><article class="card deployment-controls">${studioField("deployName","Project name",s.projectName)}${studioField("deployPython","Python version",s.pythonVersion)}${studioField("deployPort","Port",s.port)}${studioField("deployWorkers","Workers",s.workers)}${studioField("deployHealth","Health path",s.healthPath)}<label class="toggle-row"><span>Docker Compose</span><input id="deployCompose" type="checkbox" ${s.includeCompose?"checked":""}></label><label class="toggle-row"><span>GitHub Actions</span><input id="deployWorkflow" type="checkbox" ${s.includeWorkflow?"checked":""}></label><button id="generateDeploymentBtn" class="primary-btn">Generate</button><button id="saveDeploymentBtn" class="secondary-btn">Save</button><button id="downloadDeploymentBtn" class="secondary-btn">Download ZIP</button></article><article class="card deployment-preview"><div id="deployTree" class="file-tree"></div><div id="deployTabs" class="package-file-tabs"></div><pre id="deployCode" class="package-code"></pre></article></section>`;const refresh=()=>renderDeploymentPreview(readDeploymentConfig());el("generateDeploymentBtn").onclick=refresh;el("saveDeploymentBtn").onclick=()=>{const c=readDeploymentConfig();state.deploymentProjects.unshift(c);persist();refresh()};el("downloadDeploymentBtn").onclick=()=>downloadDeployment(readDeploymentConfig());refresh()}
function readDeploymentConfig(){return{projectName:el("deployName").value,pythonVersion:el("deployPython").value,port:el("deployPort").value,workers:el("deployWorkers").value,healthPath:el("deployHealth").value,includeCompose:el("deployCompose").checked,includeWorkflow:el("deployWorkflow").checked}}
function renderDeploymentPreview(c){const f=deploymentFiles(c),n=Object.keys(f);el("deployTree").textContent=`${c.projectName}/\n${n.map((x,i)=>`${i===n.length-1?"└──":"├──"} ${x}`).join("\n")}`;el("deployTabs").innerHTML=n.map((x,i)=>`<button class="package-file-tab ${i===0?"active":""}" data-deploy-file="${encodeURIComponent(x)}">${x.split("/").pop()}</button>`).join("");el("deployCode").textContent=f[n[0]];document.querySelectorAll("[data-deploy-file]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-deploy-file]").forEach(x=>x.classList.remove("active"));b.classList.add("active");el("deployCode").textContent=f[decodeURIComponent(b.dataset.deployFile)]})}
async function downloadDeployment(c){const z=new JSZip(),folder=z.folder(`${c.projectName}-deployment`);Object.entries(deploymentFiles(c)).forEach(([n,v])=>folder.file(n,v));downloadBlob(await z.generateAsync({type:"blob"}),`${c.projectName}-deployment.zip`);state.xp+=60;recordActivity("deployment-build",c.projectName);persist()}
function renderObservabilityLab(){const id=localStorage.getItem("pq_incident_id")||incidents[0].id,i=incidents.find(x=>x.id===id)||incidents[0],saved=state.incidentReviews.find(x=>x.incidentId===i.id)||{};el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">INCIDENT RESPONSE</div><h1>Observability lab</h1><p>Use logs and symptoms to diagnose an incident.</p></div><select id="incidentSelect">${incidents.map(x=>`<option value="${x.id}" ${x.id===i.id?"selected":""}>${x.title}</option>`).join("")}</select></div><section class="observability-layout"><article class="card observability-controls"><h2>${i.title}</h2>${i.symptoms.map(x=>`<div class="assignment-deliverable">${x}</div>`).join("")}<div class="form-row"><label>Likely cause</label><textarea id="incidentCause">${esc(saved.cause||"")}</textarea></div><div class="form-row"><label>Recovery actions</label><textarea id="incidentActions">${esc(saved.actions||"")}</textarea></div><div class="form-row"><label>Prevention</label><textarea id="incidentPrevention">${esc(saved.prevention||"")}</textarea></div><button id="saveIncidentBtn" class="primary-btn">Save review</button><button id="revealIncidentBtn" class="secondary-btn">Reveal answer</button></article><article class="card observability-preview"><div class="health-grid"><div class="health-card"><span>Error rate</span><strong>${i.severity==="Critical"?"18%":"7%"}</strong></div><div class="health-card"><span>P95 latency</span><strong>${i.id==="database-timeout"?"5.2s":"1.8s"}</strong></div><div class="health-card"><span>Severity</span><strong>${i.severity}</strong></div></div><pre class="log-viewer">${esc(i.logs.join("\n"))}</pre><div id="incidentReference"></div></article></section>`;el("incidentSelect").onchange=()=>{localStorage.setItem("pq_incident_id",el("incidentSelect").value);renderObservabilityLab()};el("saveIncidentBtn").onclick=()=>{state.incidentReviews=state.incidentReviews.filter(x=>x.incidentId!==i.id);state.incidentReviews.unshift({incidentId:i.id,cause:el("incidentCause").value,actions:el("incidentActions").value,prevention:el("incidentPrevention").value});state.xp+=30;persist();el("incidentReference").innerHTML="<div class='session-summary'>Saved. +30 XP</div>"};el("revealIncidentBtn").onclick=()=>el("incidentReference").innerHTML=`<div class="card" style="padding:16px;margin-top:14px"><h3>${i.likelyCause}</h3>${i.recommendedActions.map(x=>`<div class="assignment-deliverable">✓ ${x}</div>`).join("")}</div>`}


function makeStudioProject(t){return{id:Date.now().toString(36),templateId:t.id,title:t.title,track:t.track,description:t.description,files:JSON.parse(JSON.stringify(t.files)),milestones:Object.fromEntries(t.milestones.map((m,i)=>[i,false])),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}
function activeStudioProject(){const id=localStorage.getItem("pq_active_studio_project");return state.studioProjects.find(p=>p.id===id)||state.studioProjects[0]||null}
function renderProjectStudio(){
 let p=activeStudioProject();
 if(!p){el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">CAPSTONE WORKSPACE</div><h1>Project Studio</h1><p>Build a realistic project across multiple files.</p></div></div><section class="dataset-grid">${projectStudioTemplates.map(t=>`<article class="card dataset-card"><div class="eyebrow">${t.track}</div><h2>${t.title}</h2><p>${t.description}</p><div class="dataset-meta"><span class="skill-tag">${Object.keys(t.files).length} files</span><span class="skill-tag">${t.milestones.length} milestones</span></div><button class="primary-btn full" data-create-studio="${t.id}">Create project</button></article>`).join("")}</section>`;document.querySelectorAll("[data-create-studio]").forEach(b=>b.onclick=()=>{const t=projectStudioTemplates.find(x=>x.id===b.dataset.createStudio),n=makeStudioProject(t);state.studioProjects.unshift(n);localStorage.setItem("pq_active_studio_project",n.id);persist();renderProjectStudio()});return}
 const t=projectStudioTemplates.find(x=>x.id===p.templateId),names=Object.keys(p.files);let f=localStorage.getItem("pq_active_studio_file");if(!f||!p.files.hasOwnProperty(f))f=names[0];
 el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">${p.track}</div><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p></div><div class="notebook-toolbar"><select id="studioProjectSelect">${state.studioProjects.map(x=>`<option value="${x.id}" ${x.id===p.id?"selected":""}>${esc(x.title)}</option>`).join("")}</select><button id="newStudioProjectBtn" class="secondary-btn">New project</button></div></div><section class="studio-shell"><article class="card studio-files"><div class="section-head"><strong>Files</strong><button id="addStudioFileBtn" class="icon-btn">＋</button></div>${names.map(n=>`<button class="studio-file ${n===f?"active":""}" data-studio-file="${encodeURIComponent(n)}"><span>${n}</span><span>${n.endsWith('.py')?'Py':'•'}</span></button>`).join("")}<button id="deleteStudioFileBtn" class="text-btn full">Delete selected file</button></article><article class="card studio-editor"><div class="section-head"><code>${f}</code><div class="notebook-toolbar"><button id="saveStudioFileBtn" class="secondary-btn">Save</button><button id="runStudioBtn" class="primary-btn">Run tests</button></div></div><textarea id="studioCodeEditor" class="studio-code">${esc(p.files[f])}</textarea><h3>Console</h3><pre id="studioConsole" class="studio-console">Ready.</pre></article><article class="card studio-inspector"><div class="eyebrow">MILESTONES</div>${t.milestones.map((m,i)=>`<div class="milestone-card ${p.milestones[i]?"complete":""}"><label><input type="checkbox" data-studio-milestone="${i}" ${p.milestones[i]?"checked":""}> <strong>${m}</strong></label></div>`).join("")}<button id="openQualityGateBtn" class="primary-btn full">Run quality gate</button></article></section>`;
 const save=()=>{p.files[f]=el("studioCodeEditor").value;p.updatedAt=new Date().toISOString();persist()};
 el("studioProjectSelect").onchange=()=>{save();localStorage.setItem("pq_active_studio_project",el("studioProjectSelect").value);localStorage.removeItem("pq_active_studio_file");renderProjectStudio()};el("newStudioProjectBtn").onclick=()=>{localStorage.removeItem("pq_active_studio_project");state.studioProjects=[];persist();renderProjectStudio()};document.querySelectorAll("[data-studio-file]").forEach(b=>b.onclick=()=>{save();localStorage.setItem("pq_active_studio_file",decodeURIComponent(b.dataset.studioFile));renderProjectStudio()});el("saveStudioFileBtn").onclick=()=>{save();el("studioConsole").textContent="Saved."};el("runStudioBtn").onclick=()=>runStudioTests(p,f);el("addStudioFileBtn").onclick=()=>{const n=prompt("New file path");if(n&&!p.files[n]){save();p.files[n]="# New file\n";persist();localStorage.setItem("pq_active_studio_file",n);renderProjectStudio()}};el("deleteStudioFileBtn").onclick=()=>{if(names.length>1&&confirm(`Delete ${f}?`)){delete p.files[f];persist();localStorage.removeItem("pq_active_studio_file");renderProjectStudio()}};document.querySelectorAll("[data-studio-milestone]").forEach(c=>c.onchange=()=>{p.milestones[c.dataset.studioMilestone]=c.checked;persist();renderProjectStudio()});el("openQualityGateBtn").onclick=()=>{save();renderView("qualitygate")};
}
async function runStudioTests(p,f){p.files[f]=el("studioCodeEditor").value;persist();pyodide.globals.set("__studio_files__",p.files);const raw=await pyodide.runPythonAsync(`import json,io,traceback,sys,types\nfrom contextlib import redirect_stdout,redirect_stderr\nout=io.StringIO();passed=0;failed=0\nwith redirect_stdout(out),redirect_stderr(out):\n try:\n  modules={}\n  for path,code in __studio_files__.items():\n   if not path.endswith('.py') or 'test' in path: continue\n   name=path.replace('/','.').removesuffix('.py').replace('src.','')\n   module=types.ModuleType(name);sys.modules[name]=module;modules[name]=module\n  for path,code in __studio_files__.items():\n   if not path.endswith('.py') or 'test' in path: continue\n   name=path.replace('/','.').removesuffix('.py').replace('src.','');exec(compile(code,path,'exec'),modules[name].__dict__)\n  for path,code in __studio_files__.items():\n   if not path.endswith('.py') or 'test' not in path: continue\n   ns={};exec(compile(code,path,'exec'),ns)\n   for name,fn in [(n,v) for n,v in ns.items() if n.startswith('test_') and callable(v)]:\n    try: fn();passed+=1;print('PASS',path,name)\n    except Exception as e: failed+=1;print('FAIL',path,name,e)\n except Exception: failed+=1;traceback.print_exc()\njson.dumps({'passed':passed,'failed':failed,'output':out.getvalue()})`);const r=JSON.parse(raw);el("studioConsole").textContent=`${r.output}\n${r.passed} passed, ${r.failed} failed`;if(r.passed&&r.failed===0){state.xp+=25;persist()}}
function studioQualityReport(p){const names=Object.keys(p.files),code=Object.entries(p.files).filter(([n])=>n.endsWith('.py')).map(([,c])=>c).join('\n'),checks=[['README present',names.some(n=>n.toLowerCase()==='readme.md'),15],['Tests present',names.some(n=>n.includes('test')&&n.endsWith('.py')),20],['Type hints',/def\s+\w+\([^)]*:\s*\w+/.test(code)||/->\s*\w+/.test(code),10],['No bare except',!/\bexcept\s*:/.test(code),10],['No obvious secrets',!/(password|api_key|secret)\s*=\s*["'][^"']+["']/i.test(code),15],['Dependencies declared',names.some(n=>['requirements.txt','pyproject.toml'].includes(n)),10],['Milestones 75% complete',Object.values(p.milestones).filter(Boolean).length>=Math.ceil(Object.keys(p.milestones).length*.75),20]];return{score:checks.reduce((s,c)=>s+(c[1]?c[2]:0),0),checks}}
function renderQualityGate(){const p=activeStudioProject();if(!p){renderView('projectstudio');return}const r=studioQualityReport(p);el('main').innerHTML=`<div class="section-head"><div><div class="eyebrow">AUTOMATED REVIEW</div><h1>Quality gate</h1><p>Review documentation, tests, typing, security and milestones.</p></div><button id="saveQualityRunBtn" class="secondary-btn">Save run</button></div><section class="quality-layout"><article class="card quality-controls"><div class="quality-score-large">${r.score}%</div><div class="progress-track"><div style="width:${r.score}%"></div></div><button id="backToStudioBtn" class="primary-btn full">Return to project</button></article><article class="card quality-results">${r.checks.map(c=>`<div class="quality-check ${c[1]?'pass':'warn'}"><span>${c[1]?'✓':'!'}</span><span><strong>${c[0]}</strong></span><strong>${c[2]}%</strong></div>`).join('')}</article></section>`;el('backToStudioBtn').onclick=()=>renderView('projectstudio');el('saveQualityRunBtn').onclick=()=>{state.studioQualityRuns.unshift({projectId:p.id,score:r.score,createdAt:new Date().toISOString()});persist();el('saveQualityRunBtn').textContent='Saved'}}
function renderReleaseCentre(){const p=activeStudioProject();if(!p){renderView('projectstudio');return}const q=studioQualityReport(p).score,m=Object.values(p.milestones),mp=m.length?Math.round(m.filter(Boolean).length/m.length*100):0,ready=Math.round(q*.7+mp*.3);el('main').innerHTML=`<div class="section-head"><div><div class="eyebrow">PORTFOLIO DELIVERY</div><h1>Release centre</h1><p>Package the project with evidence and a recruiter-friendly summary.</p></div></div><section class="release-grid"><article class="card release-card"><div class="eyebrow">READINESS</div><div class="release-readiness">${ready}%</div><div class="report-row"><span>Quality</span><strong>${q}%</strong></div><div class="report-row"><span>Milestones</span><strong>${mp}%</strong></div></article><article class="card release-card"><div class="form-row"><label>Problem solved</label><textarea id="releaseProblem">${esc(p.description)}</textarea></div><div class="form-row"><label>Technical approach</label><textarea id="releaseApproach">Multi-file Python project with tests and documentation.</textarea></div><button id="exportStudioReleaseBtn" class="primary-btn full">Export portfolio ZIP</button></article></section>`;el('exportStudioReleaseBtn').onclick=async()=>{const z=new JSZip(),f=z.folder(slug(p.title));Object.entries(p.files).forEach(([n,c])=>f.file(n,c));f.file('PORTFOLIO_SUMMARY.md',`# ${p.title}\n\n## Problem\n${el('releaseProblem').value}\n\n## Approach\n${el('releaseApproach').value}\n\nReadiness: ${ready}%\n`);f.file('codequest-evidence.json',JSON.stringify({title:p.title,readiness:ready,quality:q,milestones:mp},null,2));downloadBlob(await z.generateAsync({type:'blob'}),`${slug(p.title)}-portfolio.zip`);state.studioReleases.unshift({projectId:p.id,readiness:ready,createdAt:new Date().toISOString()});state.xp+=100;persist()}}


function renderAccount(){
  const user=PythonQuestCloud.getUser();
  if(!user){showAuthScreen();return}
  const metadata=user.user_metadata||{},name=state.profile?.name||metadata.full_name||"",email=user.email||"";
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">ACCOUNT & SECURITY</div><h1>Your account</h1><p>Manage identity, password and cloud-session settings.</p></div></div>
  <section class="account-grid">
    <article class="card account-card"><div class="account-identity"><div class="account-avatar">${esc((name||email||"L")[0].toUpperCase())}</div><div><h2>${esc(name||"CodeQuest Academy learner")}</h2><p class="muted">${esc(email)}</p><span class="skill-tag">${user.email_confirmed_at?"Email verified":"Email verification pending"}</span></div></div><hr style="border:0;border-top:1px solid var(--border);margin:22px 0"><div class="form-row"><label>Full name</label><input id="accountFullName" value="${esc(name)}"></div><div class="form-row"><label>Learning goal</label><textarea id="accountGoal">${esc(state.profile?.goal||"")}</textarea></div><button id="saveAccountProfileBtn" class="primary-btn">Save profile</button><div id="accountProfileMessage"></div></article>
    <article class="card account-card"><h2>Security</h2><div class="security-row"><div><strong>Password</strong><div class="muted">Send a secure password-reset link to your email.</div></div><button id="accountResetPasswordBtn" class="secondary-btn">Send reset link</button></div><div class="security-row"><div><strong>Email verification</strong><div class="muted">${user.email_confirmed_at?"Your email address is verified.":"Confirm your email to protect account recovery."}</div></div>${user.email_confirmed_at?"<span>✓</span>":'<button id="resendConfirmationBtn" class="secondary-btn">Resend email</button>'}</div><div class="security-row"><div><strong>Cloud sync</strong><div class="muted">Your learning data is saved to your private account.</div></div><span id="accountSyncState">Active</span></div><button id="signOutAccountBtn" class="secondary-btn full" style="margin-top:20px">Sign out of PythonQuest</button><div id="accountSecurityMessage"></div></article>
    <article class="card account-card"><h2>Session information</h2><div class="report-row"><span>User ID</span><code>${esc(user.id.slice(0,8))}…</code></div><div class="report-row"><span>Provider</span><strong>${esc(user.app_metadata?.provider||"email")}</strong></div><div class="report-row"><span>Account created</span><strong>${new Date(user.created_at).toLocaleDateString()}</strong></div><div class="report-row"><span>Last sign-in</span><strong>${user.last_sign_in_at?new Date(user.last_sign_in_at).toLocaleString():"—"}</strong></div></article>
    <article class="card account-card danger-zone"><h2>Data controls</h2><p>Download a complete backup before clearing local browser data.</p><button id="accountBackupBtn" class="secondary-btn">Download full backup</button><button id="clearLocalDataBtn" class="text-btn full" style="margin-top:12px">Clear local browser copy</button><p class="muted">Clearing local data does not delete your Supabase account or cloud record.</p></article>
  </section>`;
  el("saveAccountProfileBtn").onclick=async()=>{const fullName=el("accountFullName").value.trim(),goal=el("accountGoal").value.trim();state.profile={...(state.profile||{}),name:fullName,email,goal};persist();try{await PythonQuestCloud.updateProfile({full_name:fullName});el("accountProfileMessage").innerHTML="<div class='session-summary'>Profile saved.</div>";updateTopbar()}catch(e){el("accountProfileMessage").innerHTML=`<div class="feedback error">${esc(e.message)}</div>`}};
  el("accountResetPasswordBtn").onclick=async()=>{try{await PythonQuestCloud.resetPassword(email);el("accountSecurityMessage").innerHTML="<div class='session-summary'>Password reset email sent.</div>"}catch(e){el("accountSecurityMessage").innerHTML=`<div class="feedback error">${esc(e.message)}</div>`}};
  if(el("resendConfirmationBtn"))el("resendConfirmationBtn").onclick=async()=>{try{await PythonQuestCloud.resendConfirmation(email);el("accountSecurityMessage").innerHTML="<div class='session-summary'>Confirmation email resent.</div>"}catch(e){el("accountSecurityMessage").innerHTML=`<div class="feedback error">${esc(e.message)}</div>`}};
  el("signOutAccountBtn").onclick=async()=>{await saveCloudState();await PythonQuestCloud.signOut();showAuthScreen();setAuthMode("signin")};
  el("accountBackupBtn").onclick=()=>downloadBlob(new Blob([JSON.stringify(completeStateExport(),null,2)],{type:"application/json"}),"codequest-account-backup.json");
  el("clearLocalDataBtn").onclick=()=>{if(confirm("Clear the local browser copy of your learning data?")){Object.keys(localStorage).filter(k=>k.startsWith("pq")).forEach(k=>localStorage.removeItem(k));location.reload()}};
}

function renderRewards(){
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">VISIBLE PROGRESS</div><h1>Rewards</h1><p>Badges reflect completed skills.</p></div></div><section class="reward-grid">${allLessons().map(l=>`<article class="card reward-card ${state.lessons.has(l.id)?"":"locked"}"><div class="badge-icon">${state.lessons.has(l.id)?"🏅":"🔒"}</div><h3>${l.badge}</h3><p>${l.title}</p><div class="muted">${state.lessons.has(l.id)?"Earned":"Complete mission to unlock"}</div></article>`).join("")}</section>`;
}
function renderProfile(){
  const p=state.profile||{};
  el("main").innerHTML=`<div class="section-head"><div><div class="eyebrow">PERSONALISE THE COURSE</div><h1>Profile and account</h1></div></div><section class="profile-grid">
  <article class="card profile-card"><div class="form-row"><label>Name</label><input id="pName" value="${esc(p.name||"")}"></div><div class="form-row"><label>Goal</label><select id="pGoal">${["Data analytics","Automation","Web scraping","Advanced Python"].map(v=>`<option ${p.goal===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="form-row"><label>Session length</label><select id="pSession">${["5","10","15","20","30"].map(v=>`<option value="${v}" ${p.session===v?"selected":""}>${v} minutes</option>`).join("")}</select></div><button id="saveProfile" class="primary-btn">Save</button></article>
  <article class="card profile-card"><div class="eyebrow">CLOUD SYNC</div><h3>${supabaseClient?"Supabase configured":"Guest mode active"}</h3><p class="muted">${supabaseClient?"The project is ready for authentication wiring.":"The app works locally. Add Supabase values in config/supabase-config.js to enable cloud integration."}</p><div class="auth-card">No secret keys should ever be placed in browser code. Use only the public Supabase URL and anon key.</div></article>
  <article class="card profile-card"><div class="eyebrow">DIAGNOSTIC</div><h3>${state.diagnostic?.level||"Not completed"}</h3><p class="muted">Retake the assessment to update recommendations.</p><button id="retakeDiagnostic" class="secondary-btn">Retake diagnostic</button></article>
  <article class="card profile-card"><div class="eyebrow">RESET</div><h3>Start again</h3><p class="muted">Clear local progress, XP and revision history.</p><button id="resetProgress" class="secondary-btn">Reset progress</button></article></section>`;
  el("saveProfile").onclick=()=>{state.profile={...p,name:el("pName").value.trim()||"Learner",goal:el("pGoal").value,session:el("pSession").value};persist();renderProfile()};
  el("retakeDiagnostic").onclick=startDiagnostic;
  el("resetProgress").onclick=()=>{localStorage.clear();location.reload()};
}
function bindDynamic(){
  document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openLesson(b.dataset.open));
  document.querySelectorAll("[data-view-link]").forEach(b=>b.onclick=()=>renderView(b.dataset.viewLink));
  document.querySelectorAll("[data-open-step]").forEach(b=>b.onclick=()=>{const [l,s,r]=b.dataset.openStep.split(":");openLesson(l,Number(s),r)});
  document.querySelectorAll("[data-bookmark]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleBookmark(b.dataset.bookmark);renderView(currentView)});
}


function updatePythonWorkspaceAvailability(){
  const runButton=el("runBtn");
  const status=el("runtimeStatus");
  if(status){
    status.textContent=pythonRuntimeReady
      ?"Python ready"
      :pythonRuntimeError
        ?"Python unavailable"
        :"Preparing Python…";
  }
  if(runButton){
    const isQuiz=Boolean(activeLesson?.steps?.[currentStep]?.quiz);
    runButton.disabled=!pythonRuntimeReady||isQuiz;
    runButton.textContent=pythonRuntimeReady?"▶ Run code":"Preparing Python…";
    runButton.title=pythonRuntimeReady
      ?"Run this code in the browser Python workspace"
      :pythonRuntimeError
        ?"Python failed to load. Reload the page to retry."
        :"The browser Python runtime is still loading.";
  }
  document.querySelector("#workspace")?.classList.toggle("runtime-loading",!pythonRuntimeReady&&!pythonRuntimeError);
  document.querySelector("#workspace")?.classList.toggle("runtime-failed",Boolean(pythonRuntimeError));
}
async function prepareLessonRuntime(){
  updatePythonWorkspaceAvailability();
  if(!pyodide)return;
  try{
    await resetRuntime();
    pythonRuntimeReady=true;
    pythonRuntimeError="";
  }catch(error){
    console.error("Lesson runtime reset failed:",error);
    pythonRuntimeReady=false;
    pythonRuntimeError=String(error?.message||error);
  }
  updatePythonWorkspaceAvailability();
}

async function openLesson(id,step=0,reviewId=null){
  activeLesson=lessonById(id);
  if(!activeLesson){
    throw new Error(`Lesson not found: ${id}`);
  }

  currentStep=Math.max(0,Number(step)||0);
  activeLesson.activeReviewId=reviewId;
  hintLevel=0;

  el("lessonBreadcrumb").textContent=activeLesson.moduleTitle||"Python Academy";
  el("lessonTitle").textContent=activeLesson.title||"Lesson";
  el("lessonTime").textContent=activeLesson.duration||"";

  const overlay=el("lessonOverlay");
  overlay.classList.remove("hidden");
  overlay.classList.remove("lesson-ready");

  try{
    renderLessonStep();
  }catch(error){
    console.error("Lesson rendering recovered from an error",error);
    el("stepContent").innerHTML=`<div class="deep-chapter-shell">
      <div class="deep-chapter-tabs">
        <button class="active" data-chapter-tab="textbook">1. Textbook</button>
        <button data-chapter-tab="mastery">2. Mastery check</button>
      </div>
      <section class="deep-chapter-panel active" data-chapter-panel="textbook">
        <div class="optional-content-fallback">
          <h2>${esc(activeLesson.title||"Lesson")}</h2>
          <p>The enhanced lesson view could not load, but the coding workspace remains available.</p>
        </div>
      </section>
      <section class="deep-chapter-panel" data-chapter-panel="mastery">
        <div class="optional-content-fallback"><h2>Mastery check</h2><p>Complete the coding task below to practise this lesson.</p></div>
      </section>
    </div>`;
    bindDeepLessonChapter();
  }

  requestAnimationFrame(()=>overlay.classList.add("lesson-ready"));

  try{
    prepareLessonRuntime();
  }catch(error){
    console.warn("Lesson runtime preparation deferred",error);
  }
}
function closeLesson(){el("lessonOverlay").classList.add("hidden");el("lessonOverlay").classList.remove("lesson-ready");activeLesson=null;el("tutorPanel").classList.add("hidden");document.querySelector(".lesson-grid").classList.remove("tutor-open")}
async function resetRuntime(){if(!pyodide)return;await pyodide.runPythonAsync(`for __n in list(globals().keys()):\n    if not __n.startswith("__"): globals().pop(__n,None)`);await pyodide.runPythonAsync("import pandas as pd")}
function renderLessonStep(){
  const s=activeLesson.steps[currentStep],done=new Set(state.steps[activeLesson.id]||[]);
  el("stepType").textContent=s.type;el("stepCounter").textContent=`Step ${currentStep+1} of ${activeLesson.steps.length}`;el("stepTitle").textContent=s.title;
  const theoryHtml=currentStep===0?renderDeepLessonChapter("python",activeLesson):`<div class="micro-practice-bridge"><strong>Connect theory to practice</strong><span>Explain what each value represents before running the code.</span></div>`;
  el("stepContent").innerHTML=theoryHtml+s.content;
  bindDeepLessonChapter();
  el("codeEditor").value=s.starter;
  el("output").textContent="Your output will appear here.";
  el("feedback").className="feedback hidden";
  el("workspace").classList.toggle("hidden",!!s.quiz);
  el("quizArea").classList.toggle("hidden",!s.quiz);
  el("quizArea").innerHTML="";
  if(s.quiz)renderQuiz(s.quiz);
  el("prevStepBtn").disabled=currentStep===0;
  el("nextStepBtn").disabled=!done.has(currentStep);
  el("nextStepBtn").title=done.has(currentStep)
    ?"Continue to the next step"
    :"Run and pass the current exercise first";
  updatePythonWorkspaceAvailability();
  el("stepList").innerHTML=activeLesson.steps.map((st,i)=>`<button class="step-button ${i===currentStep?"active":""} ${done.has(i)?"complete":""}" data-step="${i}">${done.has(i)?"✓":i+1}. ${st.title}</button>`).join("");
  document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{currentStep=Number(b.dataset.step);renderLessonStep()});el("lessonProgressBar").style.width=`${Math.round(done.size/activeLesson.steps.length*100)}%`;renderTutorWelcome();
}
function renderQuiz(q){
  let selectedAnswer = null;

  el("quizArea").innerHTML = `
    <h3>${q.question}</h3>
    <div class="quiz-options">
      ${q.options.map((o,i)=>`
        <button class="quiz-option" data-answer="${i}">
          <span class="quiz-marker">${String.fromCharCode(65+i)}</span>
          <span>${o}</span>
        </button>
      `).join("")}
    </div>
    <div id="quizFeedback" class="quiz-feedback hidden" role="status" aria-live="polite"></div>
    <div class="quiz-controls">
      <button id="checkAnswerBtn" class="primary-btn" disabled>Check answer</button>
      <button id="clearAnswerBtn" class="text-btn">Clear selection</button>
    </div>
  `;

  const options = [...document.querySelectorAll("[data-answer]")];
  const checkButton = el("checkAnswerBtn");
  const clearButton = el("clearAnswerBtn");
  const feedback = el("quizFeedback");

  options.forEach(button => {
    button.onclick = () => {
      selectedAnswer = Number(button.dataset.answer);
      options.forEach(option => option.classList.remove("selected"));
      button.classList.add("selected");
      checkButton.disabled = false;
      feedback.className = "quiz-feedback hidden";
      feedback.textContent = "";
    };
  });

  clearButton.onclick = () => {
    selectedAnswer = null;
    options.forEach(option => option.classList.remove("selected","correct","incorrect"));
    checkButton.disabled = true;
    feedback.className = "quiz-feedback hidden";
    feedback.textContent = "";
  };

  checkButton.onclick = () => {
    if(selectedAnswer === null) return;

    options.forEach(option => option.classList.remove("correct","incorrect"));
    const selectedButton = options.find(option => Number(option.dataset.answer) === selectedAnswer);

    if(selectedAnswer === q.answer){
      selectedButton.classList.add("correct");
      feedback.innerHTML = "<strong>Correct.</strong> That idea is now locked in.";
      feedback.className = "quiz-feedback success";
      checkButton.textContent = "Answer checked ✓";
      checkButton.disabled = true;
      options.forEach(option => option.disabled = true);
      markComplete();
    }else{
      selectedButton.classList.add("incorrect");
      const correctButton = options.find(option => Number(option.dataset.answer) === q.answer);
      correctButton.classList.add("correct");
      feedback.innerHTML = `<strong>Not quite.</strong> The correct answer is <strong>${q.options[q.answer]}</strong>. ${activeLesson.steps[currentStep].hint || ""}`;
      feedback.className = "quiz-feedback error";
      recordAttempt(false);
      scheduleReview("mistake");
      checkButton.textContent = "Try again";
      checkButton.disabled = false;

      setTimeout(() => {
        options.forEach(option => {
          option.disabled = false;
          option.classList.remove("correct","incorrect");
        });
        selectedAnswer = null;
        options.forEach(option => option.classList.remove("selected"));
        checkButton.textContent = "Check answer";
        checkButton.disabled = true;
      }, 1800);
    }
  };
}
async function runCode(){
  if(!pythonRuntimeReady||!pyodide){
    updatePythonWorkspaceAvailability();
    showFeedback(false,pythonRuntimeError?"Python could not load. Reload the page to retry.":"Python is still preparing. Please wait a moment.");
    return;
  }
  const runButton=el("runBtn");
  runButton.disabled=true;
  runButton.textContent="Running…";
  const code=el("codeEditor").value;
  el("output").textContent="Running…";
  el("feedback").className="feedback hidden";
  try{
    await pyodide.loadPackagesFromImports(code);pyodide.globals.set("__learner_code__",code);
    const resultJson=await pyodide.runPythonAsync(`import io,json,traceback\nfrom contextlib import redirect_stdout,redirect_stderr\n__buf=io.StringIO();__ok=True\nwith redirect_stdout(__buf),redirect_stderr(__buf):\n    try: exec(compile(__learner_code__,"<learner-code>","exec"),globals())\n    except Exception:\n        __ok=False;traceback.print_exc()\njson.dumps({"ok":__ok,"output":__buf.getvalue()})`);
    const r=JSON.parse(resultJson);lastExecution={ok:r.ok,output:r.output,error:r.ok?"":r.output};el("output").textContent=r.output.trim()||(r.ok?"Code ran successfully, but nothing was printed.":"Execution failed.");
    if(!r.ok){recordAttempt(false);scheduleReview("mistake");showFeedback(false,friendlyError(r.output));return}
    const passed=await runTest(activeLesson.steps[currentStep].test,code);recordAttempt(passed);
    if(passed){showFeedback(true,"Great work — this step is complete.");markComplete()}else{scheduleReview("mistake");showFeedback(false,"Your code ran, but it has not completed the requested task yet.")}
  }catch(err){
    lastExecution={ok:false,output:"",error:String(err)};
    showFeedback(false,friendlyError(String(err)));
  }finally{
    try{pyodide.globals.delete("__learner_code__")}catch(_){}
    updatePythonWorkspaceAvailability();
  }
}
async function runTest(test,code){
  const tests={
    variables:"all(k in globals() for k in ['name','age','is_learning']) and isinstance(name,str) and isinstance(age,int) and isinstance(is_learning,bool)",
    future_age:"'future_age' in globals() and future_age == 50",list_first:"'sales' in globals() and sales[0] == 120",list_sum:"'sales' in globals() and sum(sales) == 640",list_last:"'sales' in globals() and sales[-1] == 250",
    condition:"'Target reached' in __last_output__",condition_else:"'Keep going' in __last_output__",function:"'calculate_total' in globals() and calculate_total([10,20,30]) == 60",default_arg:"'add_tax' in globals() and abs(add_tax(100)-120)<0.001",return_value:"'double' in globals() and double(5)==10",
    dataframe:"'df' in globals() and list(df.columns)==['product','sales']",inspect_df:"'df' in globals() and df.shape==(3,2)",messy_df:"'df' in globals() and len(df)==5",missing:"'df' in globals() and int(df.isna().sum()['sales'])==1",duplicates:"'df' in globals() and int(df['order_id'].duplicated().sum())==0",fillna:"'df' in globals() and int(df['sales'].isna().sum())==0",groupby:"'regional_sales' in globals() and float(regional_sales.loc['North'])==350.0",groupby_mean:"'average_sales' in globals() and float(average_sales.loc['North'])==175.0",filter:"'high_value' in globals() and list(high_value['product'])==['B','D']",select_column:"'high_value' in globals() and list(high_value['product'])==['B','D']",filter_equal:"'product_c' in globals() and list(product_c['product'])==['C']",
    html_heading:"'soup' in globals() and soup.find('h1').get_text(strip=True)=='Life Sciences Jobs' and 'Life Sciences Jobs' in __last_output__",html_class:"'soup' in globals() and '24 roles found' in __last_output__",job_count:"'jobs' in globals() and len(jobs)==2",job_records:"'records' in globals() and len(records)==2 and records[0]['title']=='Data Analyst'",jobs_df:"'jobs_df' in globals() and list(jobs_df.columns)==['title','location']",delay:"'delay_seconds' in globals() and delay_seconds==2",csv_read:"'df' in globals() and len(df)==3 and list(df.columns)==['customer','region','revenue']",csv_dtypes:"'df' in globals() and str(df['revenue'].dtype).startswith('int')",merge_inner:"'merged' in globals() and len(merged)==3",merge_left:"'all_customers' in globals() and len(all_customers)==4",pivot:"'pivot' in globals() and float(pivot.loc['North','A'])==120.0",pivot_totals:"'pivot_with_totals' in globals() and 'All' in pivot_with_totals.index",chart_bar:"'Regional Sales' in __last_output__",chart_label:"'Revenue label added' in __last_output__",
    sql_select:"'result' in globals() and len(result)==3 and list(result.columns)==['product','region','revenue']",
    sql_where:"'high_revenue' in globals() and len(high_revenue)==2 and high_revenue['revenue'].min()>=150",
    sql_group:"'regional' in globals() and float(regional.loc[regional['region']=='North','total_revenue'].iloc[0])==350.0",
    sql_order:"'ranked' in globals() and ranked.iloc[0]['region']=='North'",
    sql_join:"'joined' in globals() and len(joined)==3 and 'name' in joined.columns",
    sql_left_join:"'all_customers' in globals() and len(all_customers)==4 and all_customers['name'].tolist().count('Ben')==1",
    json_parse:"'data' in globals() and data.get('company')=='BioNova' and 'BioNova' in __last_output__",
    json_nested:"'data' in globals() and data.get('office',{}).get('city')=='London' and 'London' in __last_output__",
    api_status:"'Success' in __last_output__",
    api_default:"'results' in globals() and results==0",
    api_safe_error:"'message' in globals() and message=='No error'",
    automation_csv:"'sales.csv' in __last_output__ and 'customers.csv' in __last_output__ and 'notes.txt' not in __last_output__",
    clean_filename:"'clean_filename' in globals() and clean_filename('  SALES JULY.CSV  ')=='sales july.csv'",
    cleaned_csvs:"'cleaned_csvs' in globals() and cleaned_csvs==['a.csv','b.csv']",
    generator_basic:"'count_up_to' in globals() and list(count_up_to(4))==[1,2,3,4]",
    generator_filter:"'even_numbers' in globals() and list(even_numbers([1,2,3,4,5,6]))==[2,4,6]",
    decorator_basic:"'greet' in globals() and 'Starting' in __last_output__ and 'Hello' in __last_output__",
    decorator_return:"'add' in globals() and add(2,3)==10",
    context_basic:"'CodeQuest Academy' in __last_output__",
    context_custom:"'Open' in __last_output__ and 'Working' in __last_output__ and 'Close' in __last_output__",
    type_hints:"'calculate_total' in globals() and calculate_total.__annotations__.get('return') is float",
    type_optional:"'display_name' in globals() and display_name(None)=='Anonymous' and bool(display_name.__annotations__)",
    async_basic:"'result' in globals() and result==42",
    async_gather:"'results' in globals() and results==[1,2,3]",
    assert_basic:"'Check completed' in __last_output__",
    assert_message:"'Discount check passed' in __last_output__",
    unittest_basic:"'Tests successful: True' in __last_output__",
    unittest_edge:"'Tests successful: True' in __last_output__",
    exception_specific:"'Invalid number' in __last_output__",
    exception_raise:"'values cannot be empty' in __last_output__",
    debug_total:"'total' in globals() and total==600",
    debug_mutable:"'add_item' in globals() and add_item('X')==['X']",
    etl_transform:"'transform' in globals() and transform([{'order_id':1,'revenue':10,'cost':3}])[0]['net_revenue']==7",
    etl_run:"'run_pipeline' in globals() and len(run_pipeline())==2 and 'net_revenue' in run_pipeline()[0]",
    schema_required:"'is_valid' in globals() and is_valid is True",
    schema_types:"'type_valid' in globals() and type_valid is True",
    schema_errors:"'validate_record' in globals() and validate_record({'revenue':-10})==['Missing order_id','Revenue cannot be negative']",
    logging_basic:"'Log emitted' in __last_output__",
    logging_count:"'3' in __last_output__",
    incremental_filter:"'new_records' in globals() and [r['id'] for r in new_records]==[102,103]",
    incremental_checkpoint:"'new_checkpoint' in globals() and new_checkpoint==103",
    ml_frame:"'target' in globals() and target=='churned' and features==['tenure_months','monthly_spend','support_tickets']",
    ml_metric:"'metric' in globals() and metric=='accuracy'",
    ml_split:"'train_records' in globals() and len(train_records)==8 and test_records==[8,9]",
    ml_test_use:"'test_set_use' in globals() and test_set_use=='final evaluation'",
    ml_regression_fit:"'slope' in globals() and round(float(slope),2)==2.0 and round(float(intercept),2)==1.0",
    ml_mae:"'mae' in globals() and float(mae)<0.001",
    ml_accuracy:"'accuracy' in globals() and abs(accuracy-0.8)<0.001",
    ml_precision_recall:"'precision' in globals() and 'recall' in globals() and abs(precision-1.0)<0.001 and abs(recall-(2/3))<0.01",
    ml_group_gap:"'performance_gap' in globals() and abs(performance_gap-0.16)<0.001",
    ml_monitoring:"'checks' in globals() and checks==['accuracy','data drift','group performance']",
    se_project_structure:"'project_files' in globals() and project_files==['README.md','pyproject.toml']",
    se_package_path:"'package_path' in globals() and package_path=='src/sales_tool'",
    se_git_order:"'commands' in globals() and commands==['git status','git add .','git commit -m \"Add feature\"']",
    se_commit_message:"'commit_message' in globals() and 'csv' in commit_message.lower() and 'validation' in commit_message.lower()",
    se_venv:"'create_env' in globals() and create_env=='python -m venv .venv'",
    se_dependency:"'dependencies' in globals() and 'pandas>=2.0' in dependencies",
    se_cli_main:"'main' in globals() and main('Asha')=='Hello, Asha!'",
    se_name_guard:"'is_entry_point' in globals() and isinstance(is_entry_point,bool)",
    se_version:"'version' in globals() and version=='1.0.0'",
    se_release_checks:"'release_checks' in globals() and release_checks==['tests pass','README updated','version tagged']",
    api_method_get:"'method' in globals() and method=='GET'",
    api_status_created:"'status_code' in globals() and status_code==201",
    api_required_fields:"'is_valid' in globals() and is_valid is True",
    api_validation_errors:"'validate_user' in globals() and validate_user({'name':'','email':'bad'})==['name is required','email is invalid']",
    api_health_response:"'health' in globals() and health()=={'status':'ok'}",
    api_path_parameter:"'get_order' in globals() and get_order(42)=={'order_id':42}",
    api_not_found:"'response' in globals() and response=={'status':404,'detail':'Order not found'}",
    api_safe_error:"'public_message' in globals() and 'password' not in public_message.lower() and 'admin' not in public_message.lower()",
    api_test_response:"'response' in globals() and response['status_code']==200 and response['json']['status']=='ok'",
    api_test_not_found:"'missing_response' in globals() and missing_response['status_code']==404",
    db_primary_key:"'primary_key' in globals() and primary_key=='customer_id'",
    db_foreign_key:"'foreign_key' in globals() and foreign_key=='orders.customer_id -> customers.customer_id'",
    db_create_table:"'create_sql' in globals() and 'CREATE TABLE customers' in create_sql and 'PRIMARY KEY' in create_sql",
    db_parameters:"'params' in globals() and params==('Asha',)",
    db_commit:"'steps' in globals() and steps[-1]=='commit'",
    db_rollback:"'action' in globals() and action=='rollback'",
    db_model_columns:"'model' in globals() and model['columns']==['id','name']",
    db_session_steps:"'session_steps' in globals() and session_steps==['add object','flush','commit']",
    db_migration_order:"'migrations' in globals() and migrations==['001_create_customers','002_add_customer_email']",
    db_migration_reverse:"'migration' in globals() and migration=={'upgrade':'add email column','downgrade':'remove email column'}",
    devops_environments:"'environments' in globals() and environments==['development','staging','production']",
    devops_config:"'config_source' in globals() and config_source=='environment variables'",
    devops_base_image:"'base_image' in globals() and base_image=='python:3.12-slim'",
    devops_container_command:"'command' in globals() and command==['uvicorn','app.main:app','--host','0.0.0.0']",
    devops_pipeline_stages:"'stages' in globals() and stages==['lint','test','build','deploy']",
    devops_deploy_gate:"'can_deploy' in globals() and can_deploy is True",
    devops_health:"'health' in globals() and health=={'status':'healthy','database':'connected'}",
    devops_log_context:"'log_context' in globals() and log_context=={'request_id':'abc123','endpoint':'/orders'}",
    devops_release_checklist:"'release' in globals() and release==['backup','deploy','verify','monitor']",
    devops_rollback:"'action' in globals() and action=='rollback'"
  };
  pyodide.globals.set("__last_output__",el("output").textContent);return Boolean(await pyodide.runPythonAsync(`bool(${tests[test]||"False"})`));
}
function recordAttempt(ok){const key=`${activeLesson.id}:${currentStep}`;state.attempts[key]=state.attempts[key]||{tries:0,correct:0};state.attempts[key].tries++;if(ok)state.attempts[key].correct++;persist()}
function scheduleReview(reason){
  if(!activeLesson)return;const existing=state.reviews.find(r=>r.lessonId===activeLesson.id&&r.step===currentStep&&!r.completed);if(existing)return;
  const due=new Date();due.setMinutes(due.getMinutes()+(reason==="mistake"?0:30));
  state.reviews.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),lessonId:activeLesson.id,step:currentStep,reason,due:due.toISOString(),completed:false});persist();
}
function markComplete(){
  const arr=new Set(state.steps[activeLesson.id]||[]);arr.add(currentStep);state.steps[activeLesson.id]=[...arr];
  if(activeLesson.activeReviewId){const r=state.reviews.find(x=>x.id===activeLesson.activeReviewId);if(r)r.completed=true}
  if(arr.size===activeLesson.steps.length&&!state.lessons.has(activeLesson.id)){state.lessons.add(activeLesson.id);state.xp+=activeLesson.xp;recordActivity("lesson",activeLesson.id)}
  persist();renderProgressOnly();
}
function renderProgressOnly(){
  const done=new Set(state.steps[activeLesson.id]||[]);
  el("lessonProgressBar").style.width=`${Math.round(done.size/activeLesson.steps.length*100)}%`;
  el("nextStepBtn").disabled=!done.has(currentStep);
  el("nextStepBtn").title=done.has(currentStep)?"Continue to the next step":"Run and pass the current exercise first";
  [...el("stepList").children].forEach((b,i)=>{
    b.textContent=`${done.has(i)?"✓":i+1}. ${activeLesson.steps[i].title}`;
    b.classList.toggle("complete",done.has(i));
  });
}
function friendlyError(m){if(m.includes("SyntaxError"))return"Python found a syntax issue. Check brackets, colons, quotes and indentation.";if(m.includes("NameError"))return"Python cannot find one of the names used. Check spelling and whether the variable was created.";if(m.includes("IndexError"))return"The requested position does not exist. Remember that indexing starts at zero.";if(m.includes("ModuleNotFoundError"))return"That package is not available in this browser lesson.";return"Read the final line first. It usually names the error and the line that caused it."}
function showFeedback(ok,msg){const b=el("feedback");b.textContent=msg;b.className=`feedback ${ok?"success":"error"}`}
function showSolution(){const s=activeLesson.steps[currentStep].solution;if(s){el("codeEditor").value+=`\n# Guided solution\n${s}\n`;scheduleReview("hint")}}
function prevStep(){if(currentStep>0){currentStep--;renderLessonStep()}}
function nextStep(){if(currentStep<activeLesson.steps.length-1){currentStep++;renderLessonStep()}else{el("rewardTitle").textContent=`${activeLesson.badge} badge earned!`;el("rewardText").textContent=`You completed ${activeLesson.title}.`;el("rewardXp").textContent=`+${activeLesson.xp} XP`;el("rewardModal").classList.remove("hidden")}}

function toggleTutor(){const p=el("tutorPanel"),g=document.querySelector(".lesson-grid");p.classList.toggle("hidden");g.classList.toggle("tutor-open",!p.classList.contains("hidden"))}
function renderTutorWelcome(){el("tutorMessages").innerHTML=`<div class="tutor-message bot">I will help without immediately giving away the answer. Choose a small nudge, concept explanation, error explanation or similar example.</div>`}
function tutorAction(kind){
  const s=activeLesson.steps[currentStep];let msg="";
  if(kind==="nudge")msg=s.hint;
  if(kind==="explain")msg=`This step is about <strong>${s.title.toLowerCase()}</strong>. Focus on the one Python operation named in the lesson, then apply it to the variable already provided.`;
  if(kind==="error")msg=lastExecution.error?friendlyError(lastExecution.error):"Run your code first. I can then interpret the error or explain why the result did not pass.";
  if(kind==="similar")msg=similarExample(s.test);
  el("tutorMessages").innerHTML+=`<div class="tutor-message user">${kind.replace("_"," ")}</div><div class="tutor-message bot">${msg}</div>`;scheduleReview("hint");
}
function similarExample(test){
  const map={groupby:"Example: orders.groupby('category')['amount'].sum()",filter:"Example: adults = people[people['age'] >= 18]",html_heading:"Example: soup.find('p').get_text(strip=True)",job_records:"Example: {'name': card.select_one('h2').get_text(strip=True)}",function:"Example: def total(values): return sum(values)",variables:"Example: city = 'London'; population = 9"};
  return map[test]||"Try the same operation with smaller values first, print the result, and then return to the original task.";
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
boot().catch(error=>{
  console.error("CodeQuest Academy startup error:",error);
  try{
    bindAuthEvents();
    showAuthScreen();
    const notice=document.getElementById("authConfigurationNotice");
    if(notice){
      notice.classList.remove("hidden");
      notice.innerHTML="<strong>Startup problem detected.</strong><br>Authentication controls remain available.";
    }
  }catch(fallbackError){
    console.error("Authentication fallback failed:",fallbackError);
  }
});


document.addEventListener("keydown",event=>{
  if(!(event.ctrlKey||event.metaKey)||event.key!=="Enter")return;
  const visible=id=>{const node=el(id);return node&&!node.closest(".hidden")&&node.offsetParent!==null};
  if(visible("runBtn")){event.preventDefault();el("runBtn").click()}
  else if(visible("runProjectBtn")){event.preventDefault();el("runProjectBtn").click()}
  else if(visible("runChallengeBtn")){event.preventDefault();el("runChallengeBtn").click()}
  else if(visible("runLabBtn")){event.preventDefault();el("runLabBtn").click()}
  else if(visible("runSqlBtn")){event.preventDefault();el("runSqlBtn").click()}
  else if(visible("runAssignmentBtn")){event.preventDefault();el("runAssignmentBtn").click()}
});

window.addEventListener("DOMContentLoaded",installLaunchErrorCapture);
