const { test, expect } = require("@playwright/test");

const TEST_EMAIL = process.env.CODEQUEST_TEST_EMAIL;
const TEST_PASSWORD = process.env.CODEQUEST_TEST_PASSWORD;
const HAS_AUTH = Boolean(TEST_EMAIL && TEST_PASSWORD);

async function openPublicLanding(page) {
  // Public smoke tests must never inherit a prior Supabase session.
  await page.context().clearCookies();
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.goto("/#landing", { waitUntil: "domcontentloaded" });

  await expect(page.locator("#publicLanding")).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
}

async function signIn(page) {
  test.skip(!HAS_AUTH, "Set CODEQUEST_TEST_EMAIL and CODEQUEST_TEST_PASSWORD.");

  // Open the auth screen directly. This is more reliable than depending on
  // desktop/mobile header navigation.
  await page.goto("/#signin", { waitUntil: "domcontentloaded" });

  const email = page.locator("#authEmail");
  const password = page.locator("#authPassword");
  const submit = page.locator("#authSubmitBtn");

  await expect(email).toBeVisible({ timeout: 15000 });
  await expect(password).toBeVisible();
  await expect(submit).toBeVisible();

  await email.fill(TEST_EMAIL);
  await password.fill(TEST_PASSWORD);
  await submit.click();

  // Wait for the application's explicit authenticated state rather than
  // specific page copy, which changes according to onboarding progress.
  await expect(page.locator("body")).toHaveClass(/authenticated/, { timeout: 25000 });

  const authError = page.locator("#authMessage.feedback.error");
  if (await authError.isVisible().catch(() => false)) {
    throw new Error(`CodeQuest sign-in failed: ${await authError.innerText()}`);
  }

  await expect(page.locator("#authScreen")).toHaveClass(/hidden/);
}

async function completeFirstLoginOnboarding(page) {
  // Cloud profile hydration can reveal onboarding shortly after sign-in.
  await page.waitForTimeout(1200);

  for (let step = 0; step < 12; step += 1) {
    const overlay = page.locator(".onboarding-overlay:visible").first();

    if (!(await overlay.isVisible().catch(() => false))) {
      await page.waitForTimeout(300);
      if (!(await overlay.isVisible().catch(() => false))) break;
    }

    const pythonChoice = overlay.getByRole("button", { name: /^python$/i });
    const genericChoice = overlay.locator("[data-onboarding-choice]").first();
    const actionButton = overlay.getByRole("button", {
      name: /continue|next|start learning|finish setup|complete/i
    }).first();

    if (await pythonChoice.isVisible().catch(() => false)) {
      await pythonChoice.click();
    } else if (await genericChoice.isVisible().catch(() => false)) {
      await genericChoice.click();
    } else if (await actionButton.isVisible().catch(() => false)) {
      await actionButton.click();
    } else {
      throw new Error("Onboarding overlay is visible but has no actionable control.");
    }

    await page.waitForTimeout(350);
  }

  await expect(page.locator(".onboarding-overlay:visible")).toHaveCount(0, { timeout: 10000 });

  const walkthrough = page.locator(".walkthrough-overlay:visible").first();
  if (await walkthrough.isVisible().catch(() => false)) {
    const close = walkthrough.getByRole("button", { name: /close|skip|got it/i }).first();
    await close.click();
  }

  await expect(page.locator(".walkthrough-overlay:visible")).toHaveCount(0, { timeout: 10000 });
}
async function choosePythonIfNeeded(page) {
  await completeFirstLoginOnboarding(page);

  const activeAcademy = await page.evaluate(() =>
    localStorage.getItem("pq_active_academy") ||
    localStorage.getItem("cq_active_academy") ||
    document.body.dataset.academy ||
    null
  );

  if (activeAcademy !== "python") {
    await page.locator("#academySwitcherBtn").click();
    const chooser = page.locator("#academyChooser");
    await expect(chooser).toBeVisible();

    await chooser.locator('[data-academy-choice="python"]').click();
    await chooser.locator("#academyChooserContinueBtn").click();
  }

  await expect(page.locator("body")).toHaveClass(/authenticated/);
  await expect(page.locator("body")).toHaveAttribute("data-academy", "python");
}

test.describe("CodeQuest public beta critical journeys", () => {
  test("public landing exposes signup and pricing", async ({ page }) => {
    await openPublicLanding(page);
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
    await page.getByRole("button", { name: /view pricing/i }).click();
    await expect(page.locator("#pricing")).toBeInViewport();
    await expect(page.getByRole("heading", { name: "15-Day Starter Pack", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro Monthly", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro Annual", exact: true })).toBeVisible();
  });

  test("pricing cards retain visible plan headings", async ({ page }) => {
    await openPublicLanding(page);
    await page.getByRole("button", { name: /view pricing/i }).click();
    await expect(page.locator("#pricing")).toBeInViewport();
    await expect(page.getByRole("heading", { name: "Pro Monthly", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro Annual", exact: true })).toBeVisible();
  });

  test("application has no immediate uncaught page errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    expect(errors).toEqual([]);
  });

  test("mobile landing remains usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPublicLanding(page);
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });
});

test.describe("CodeQuest authenticated learner journey", () => {
  // A single seeded account must not be mutated by multiple parallel workers.
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    test.skip(!HAS_AUTH, "Authenticated journey requires seeded test credentials.");
    await signIn(page);
  });

  test("authenticated user can complete academy selection", async ({ page }) => {
    await choosePythonIfNeeded(page);

    await expect(page.locator("body")).toHaveAttribute(
      "data-academy",
      "python",
      { timeout: 15000 }
    );
  });

  test("authenticated user can open a Python lesson and access core learning tabs", async ({ page }) => {
    await choosePythonIfNeeded(page);

    // Use the application's route directly after authentication to avoid
    // depending on collapsed or responsive navigation.
    await page.waitForFunction(() => {
      return typeof pythonCourseReady === "function" && pythonCourseReady();
    }, null, { timeout: 30000 });

    await page.evaluate(() => {
      if (typeof renderView === "function") renderView("course");
    });

    await completeFirstLoginOnboarding(page);

    await expect(page.locator(".course-loading-state")).toHaveCount(0, { timeout: 15000 });

    const lessonCard = page.locator(".lesson-card").filter({
      has: page.getByRole("heading", {
        name: /Variables and data types/i
      })
    }).first();

    await expect(lessonCard).toBeVisible({ timeout: 15000 });

    const launchLesson = lessonCard.locator("[data-open]").first();
    await expect(launchLesson).toBeVisible();

    const lessonId = await launchLesson.getAttribute("data-open");
    expect(lessonId).toBeTruthy();

    // Use the application's canonical lesson-opening function. This avoids
    // browser click/overlay animation timing while still exercising the same
    // production code path used by the Start mission button.
    await page.evaluate(async id => {
      if (typeof openLesson !== "function") {
        throw new Error("openLesson is unavailable");
      }
      await openLesson(id);
    }, lessonId);

    const lessonOverlay = page.locator("#lessonOverlay");
    await expect(lessonOverlay).not.toHaveClass(/hidden/, { timeout: 15000 });
    await expect(lessonOverlay).toHaveClass(/lesson-ready/, { timeout: 15000 });

    const chapterTabs = lessonOverlay.locator(".deep-chapter-tabs");
    await expect(chapterTabs).toBeVisible({ timeout: 15000 });

    await expect(
      chapterTabs.locator('[data-chapter-tab="textbook"]')
    ).toBeVisible();

    await expect(
      chapterTabs.locator('[data-chapter-tab="mastery"]')
    ).toBeVisible();

    // Lesson audio is an optional enhancement. It must never block the core
    // authenticated learning journey or prevent persistence tests from running.
    const audioReader = lessonOverlay.locator(".lesson-audio-reader").first();
    if (await audioReader.isVisible().catch(() => false)) {
      await expect(
        audioReader.getByRole("heading", {
          name: "Lesson audio",
          exact: true
        })
      ).toBeVisible();
    }
  });

  test("academy selection survives reload", async ({ page }) => {
    await choosePythonIfNeeded(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toHaveClass(/authenticated/, { timeout: 25000 });
    await expect(page.locator("body")).toHaveAttribute(
      "data-academy",
      "python",
      { timeout: 25000 }
    );

    const storedAcademy = await page.evaluate(() =>
      localStorage.getItem("pq_active_academy") ||
      localStorage.getItem("cq_active_academy")
    );
    expect(storedAcademy).toBe("python");
  });

  test("learner state survives sign out and sign in", async ({ page }) => {
    await choosePythonIfNeeded(page);

    const before = await page.evaluate(() =>
      localStorage.getItem("pq_active_academy") ||
      localStorage.getItem("cq_active_academy")
    );
    expect(before).toBe("python");

    await page.locator("#quickSignOutBtn").click();

    await expect(page.locator("body")).not.toHaveClass(
      /authenticated/,
      { timeout: 15000 }
    );
    await expect(page.locator("#authScreen")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#authSubmitBtn")).toBeEnabled();

    await signIn(page);

    const after = await page.evaluate(() =>
      localStorage.getItem("pq_active_academy") ||
      localStorage.getItem("cq_active_academy")
    );
    expect(after).toBe("python");
  });
});
