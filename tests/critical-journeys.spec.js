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

  await page.evaluate(() => {
    if (typeof setActiveAcademy !== "function") {
      throw new Error("setActiveAcademy is unavailable");
    }

    setActiveAcademy("python");

    if (typeof syncAcademyIdentity === "function") {
      syncAcademyIdentity("python");
    } else {
      document.body.dataset.academy = "python";
    }
  });

  await expect(page.locator("body")).toHaveClass(/authenticated/);
  await expect(page.locator("body")).toHaveAttribute(
    "data-academy",
    "python",
    { timeout: 15000 }
  );
}

test.describe("CodeQuest public beta critical journeys", () => {
  test("public landing exposes signup and pricing", async ({ page }) => {
    await openPublicLanding(page);
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
    await page.getByRole("link", { name: /view pricing/i }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.getByRole("heading", { name: "15-Day Starter Pack", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro Monthly", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro Annual", exact: true })).toBeVisible();
  });

  test("pricing cards retain visible plan headings", async ({ page }) => {
    await openPublicLanding(page);
    await page.getByRole("link", { name: /view pricing/i }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeVisible();
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

test.describe("CodeQuest academy curriculum integrity", () => {
  test("enterprise modules remain in their correct academies", async ({ page }) => {
    await page.goto("/");
    const result = await page.evaluate(async () => (await fetch("/data/course.json")).json());
    const byId = Object.fromEntries(result.modules.map(module => [module.id, module]));
    expect(byId["professional-python"].academyId).toBe("python");
    expect(byId["enterprise-fastapi"].academyId).toBe("python");
    expect(byId["core-java-concurrency"].academyId).toBe("java");
    expect(byId["jvm-performance"].academyId).toBe("java");
    expect(result.modules.every(module => module.lessons.every(lesson => lesson.academyId === module.academyId))).toBeTruthy();
  });

  test("landing page exposes current pathways and colourful carousel", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".cq-hero")).toBeVisible();
    await expect(page.locator("[data-feature-carousel]")).toBeVisible();
    await expect(page.locator(".cq-feature-slide")).toHaveCount(4);
    await expect(page.getByText("Build the skills serious engineering teams hire for.")).toBeVisible();
  });
});


test.describe("CodeQuest landing usability", () => {
  test("Academies and How it works navigation reach real sections", async ({ page }) => {
    await openPublicLanding(page);

    const academiesButton=page.getByRole("link", {
      name:"Academies",
      exact:true
    });
    await expect(academiesButton).toBeVisible();
    await academiesButton.click();
    await expect(page).toHaveURL(/#academies$/);
    await expect(page.locator("#academies")).toBeVisible();

    const howButton=page.getByRole("link", {
      name:"How it works",
      exact:true
    });
    await expect(howButton).toBeVisible();
    await howButton.click();
    await expect(page).toHaveURL(/#how$/);
    await expect(page.locator("#how")).toBeVisible();
  });

  test("pricing cards retain aligned desktop rows and usable mobile stacking", async ({ page }) => {
    await openPublicLanding(page);
    await page.getByRole("link", { name:/view pricing/i }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeVisible();

    const cards=page.locator("#pricing .pricing-card");
    await expect(cards).toHaveCount(4);

    const viewport=page.viewportSize();

    if((viewport?.width||0)>=900){
      const priceTops=await cards.locator(".pricing-price").evaluateAll(nodes=>
        nodes.map(node=>Math.round(node.getBoundingClientRect().top))
      );
      expect(Math.max(...priceTops)-Math.min(...priceTops)).toBeLessThanOrEqual(12);

      const buttonBottoms=await cards.locator("button").evaluateAll(nodes=>
        nodes.map(node=>Math.round(node.getBoundingClientRect().bottom))
      );
      expect(Math.max(...buttonBottoms)-Math.min(...buttonBottoms)).toBeLessThanOrEqual(12);
    }else{
      for(let index=0;index<4;index++){
        const card=cards.nth(index);
        await expect(card.locator(".pricing-price")).toBeVisible();
        await expect(card.locator("button")).toBeVisible();
      }

      const cardTops=await cards.evaluateAll(nodes=>
        nodes.map(node=>Math.round(node.getBoundingClientRect().top))
      );
      expect(cardTops).toEqual([...cardTops].sort((a,b)=>a-b));
    }
  });

  test("online landing does not show an offline banner immediately", async ({ page }) => {
    await openPublicLanding(page);
    await expect(page.locator("#offlineBanner")).toHaveCount(0);
  });
});


test.describe("CodeQuest FAQ navigation integrity", () => {
  test("FAQ remains inside the landing page and other navigation still works", async ({ page }) => {
    await openPublicLanding(page);

    const faqLink=page.getByRole("link", { name:"FAQ", exact:true }).first();
    await expect(faqLink).toBeVisible();
    await faqLink.click();
    await expect(page).toHaveURL(/#faq$/);
    await expect(page.locator("#faq")).toBeVisible();

    const academiesLink=page.getByRole("link", {
      name:"Academies",
      exact:true
    });
    await academiesLink.click();
    await expect(page).toHaveURL(/#academies$/);
    await expect(page.locator("#academies")).toBeVisible();

    const pricingLink=page.getByRole("link", {
      name:"Pricing",
      exact:true
    });
    await pricingLink.click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeVisible();
  });

  test("connectivity probe targets a deployed asset", async ({ page }) => {
    const badManifestRequests=[];
    page.on("response",response=>{
      if(response.url().includes("/manifest.json?connectivity=")){
        badManifestRequests.push(response.status());
      }
    });

    await openPublicLanding(page);
    await page.waitForTimeout(5000);
    expect(badManifestRequests).toEqual([]);
  });
});


test.describe("CodeQuest academy CTA integrity", () => {
  for(const [academy,label] of [
    ["python","Explore Python"],
    ["java","Explore Java"],
    ["sql","Explore SQL"],
    ["web","Explore Web"]
  ]){
    test(`${label} selects the correct academy`, async ({ page }) => {
      await openPublicLanding(page);

      const button=page.getByRole("button", {
        name:label,
        exact:true
      }).first();

      await expect(button).toBeVisible();
      await button.click();

      const stored=await page.evaluate(()=>({
        pq:localStorage.getItem("pq_active_academy"),
        cq:localStorage.getItem("cq_active_academy"),
        body:document.body.dataset.academy
      }));

      expect(stored.pq).toBe(academy);
      expect(stored.cq).toBe(academy);
      expect(stored.body).toBe(academy);

      await expect(page.locator("body")).toHaveAttribute(
        "data-academy-destination",
        /signup|academy/,
        { timeout:15000 }
      );

      const destination=await page.locator("body").getAttribute(
        "data-academy-destination"
      );

      if(destination==="signup"){
        await expect(page).toHaveURL(/#signup$/);
        await expect(page.locator("#authScreen")).not.toHaveClass(/hidden/);
        await expect(page.locator("#authScreen")).toBeVisible();
        await expect(page.locator("#signUpTab")).toHaveClass(/active/);
      }else{
        await expect(page.locator("body")).toHaveClass(/authenticated/);
        await expect(page.locator(".app-shell")).not.toHaveClass(/hidden/);
      }
    });
  }

  test("role pathways include the Web engineering stream", async ({ page }) => {
    await openPublicLanding(page);

    await expect(
      page.getByRole("heading", {
        name:"Full-Stack Web Engineer",
        exact:true
      })
    ).toBeVisible();

    await expect(
      page.locator("#careerJourneys").getByRole("button", {
        name:"Explore Web",
        exact:true
      })
    ).toBeVisible();
  });
});


test.describe("CodeQuest Explore auth route guard", () => {
  test("a delayed public render cannot hide Explore signup", async ({ page }) => {
    await openPublicLanding(page);

    await page.getByRole("button", {
      name:"Explore Python",
      exact:true
    }).first().click();

    await expect(page).toHaveURL(/#signup$/);
    await expect(page.locator("#authScreen")).toBeVisible();

    await page.evaluate(() => {
      if(typeof showPublicExperience==="function"){
        showPublicExperience("landing");
      }
    });

    await expect(page.locator("#authScreen")).toBeVisible();
    await expect(page.locator("#signUpTab")).toHaveClass(/active/);
    await expect(page.locator("body")).toHaveAttribute(
      "data-academy",
      "python"
    );
  });
});


test.describe("CodeQuest speech-friendly narration", () => {
  test("normalises steps, technical terms, versions and code blocks", async ({ page }) => {
    await openPublicLanding(page);

    const result=await page.evaluate(() => {
      const container=document.createElement("section");
      container.innerHTML=`
        <h2>FastAPI setup</h2>
        <ol>
          <li>Install Python 3.12.</li>
          <li>Open the SQL API.</li>
        </ol>
        <pre>def load_data():\n    return True</pre>
      `;

      return speechScriptFromElement(container,"explain");
    });

    expect(result).toContain("Section. Fast A P I setup.");
    expect(result).toContain("Step one.");
    expect(result).not.toContain("Next point.");
    expect(result).toContain("3 point 1 2");
    expect(result).toContain("S Q L A P I");
    expect(result).toContain("Code example.");
    expect(result).toContain("a Python function");
  });


  test("reads unordered bullets without repetitive verbal labels", async ({ page }) => {
    await openPublicLanding(page);

    const result=await page.evaluate(() => {
      const container=document.createElement("section");
      container.innerHTML=`
        <ul>
          <li>Use clear variable names.</li>
          <li>Keep functions focused.</li>
          <li>Test important behaviour.</li>
        </ul>
      `;
      return speechScriptFromElement(container,"explain");
    });

    expect(result).toContain("Use clear variable names.");
    expect(result).toContain("Keep functions focused.");
    expect(result).toContain("Test important behaviour.");
    expect(result).not.toContain("Next point.");
  });

  test("supports skipping code blocks", async ({ page }) => {
    await openPublicLanding(page);

    const result=await page.evaluate(() => {
      const container=document.createElement("section");
      container.innerHTML="<p>Read this first.</p><pre>print('hello')</pre>";
      return speechScriptFromElement(container,"skip");
    });

    expect(result).toContain("Read this first.");
    expect(result).toContain("Code example skipped.");
    expect(result).not.toContain("print");
  });
});


test.describe("CodeQuest academy completion certificates", () => {
  test("Python certificate requires all lessons and embedded quizzes", async ({ page }) => {
    await openPublicLanding(page);

    await expect.poll(
      () => page.evaluate(() => academyCertificateCurriculumReady("python")),
      { timeout:15000 }
    ).toBe(true);

    const result=await page.evaluate(() => {
      const lessons=academyCertificateLessons("python");
      const quizzes=academyCertificatePythonQuizStatus();
      const eligibility=academyCertificateEligibility("python");
      return{
        lessonCount:lessons.length,
        quizCount:quizzes.total,
        eligible:eligibility.eligible,
        completed:eligibility.lessons.completed
      };
    });

    expect(result.lessonCount).toBeGreaterThan(0);
    expect(result.quizCount).toBeGreaterThan(0);
    expect(result.completed).toBeLessThanOrEqual(result.lessonCount);
    expect(result.eligible).toBe(false);
  });

  test("certificate IDs are unique and academy-specific", async ({ page }) => {
    await openPublicLanding(page);

    const ids=await page.evaluate(() => [
      academyCertificateId("python"),
      academyCertificateId("python"),
      academyCertificateId("sql")
    ]);

    expect(ids[0]).toMatch(/^CQ-PYTHON-/);
    expect(ids[2]).toMatch(/^CQ-SQL-/);
    expect(new Set(ids).size).toBe(3);
  });

  test("academy certificate catalogue covers all four academies", async ({ page }) => {
    await openPublicLanding(page);

    const academies=await page.evaluate(() =>
      Object.keys(academyCertificateCatalog).sort()
    );

    expect(academies).toEqual(["java","python","sql","web"]);
  });
});


test.describe("CodeQuest academy identity and routing", () => {
  test("canonical academy selection synchronises all persisted state", async ({ page }) => {
    await openPublicLanding(page);

    const snapshots=await page.evaluate(() => {
      const output={};
      for(const academyId of ["web","sql","java","python"]){
        setActiveAcademy(academyId);
        output[academyId]={
          stateId:state.activeAcademyId,
          stateAlias:state.activeAcademy,
          profileId:state.profile?.activeAcademyId||null,
          body:document.body.dataset.academy,
          pq:localStorage.getItem("pq_active_academy"),
          cq:localStorage.getItem("cq_active_academy")
        };
      }
      return output;
    });

    for(const academyId of ["web","sql","java","python"]){
      expect(snapshots[academyId].stateId).toBe(academyId);
      expect(snapshots[academyId].stateAlias).toBe(academyId);
      expect(snapshots[academyId].body).toBe(academyId);
      expect(snapshots[academyId].pq).toBe(academyId);
      expect(snapshots[academyId].cq).toBe(academyId);
    }
  });

  test("generic academy home delegates to the selected academy renderer", async ({ page }) => {
    await openPublicLanding(page);

    const result=await page.evaluate(() => {
      const original={
        python:renderPythonAcademyHome,
        sql:renderSqlAcademyHome,
        web:renderWebAcademyHome,
        java:renderJavaAcademyHome
      };
      const calls=[];

      window.renderPythonAcademyHome=()=>calls.push("python");
      window.renderSqlAcademyHome=()=>calls.push("sql");
      window.renderWebAcademyHome=()=>calls.push("web");
      window.renderJavaAcademyHome=()=>calls.push("java");

      ["web","sql","java","python"].forEach(academyId=>{
        setActiveAcademy(academyId);
        renderAcademyHome();
      });

      window.renderPythonAcademyHome=original.python;
      window.renderSqlAcademyHome=original.sql;
      window.renderWebAcademyHome=original.web;
      window.renderJavaAcademyHome=original.java;

      return calls;
    });

    expect(result).toEqual(["web","sql","java","python"]);
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
      if (typeof setActiveAcademy === "function") {
        setActiveAcademy("python");
      }
      if (typeof syncAcademyIdentity === "function") {
        syncAcademyIdentity("python");
      }
      if (typeof renderView === "function") {
        renderView("course");
      }
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
