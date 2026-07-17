// E2E-проверка интерфейса в реальном браузере (Chrome через puppeteer-core).
// Запуск: node e2e/e2e.mjs (сайт должен быть поднят, BASE_URL настраивается).
import puppeteer from "puppeteer-core"

const BASE = process.env.BASE_URL || "http://localhost:3000"
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const results = []
const ok = (name, cond, extra = "") => {
  results.push(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  (" + extra + ")" : ""}`)
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })

// pageerror = реальное необработанное исключение (включая ошибки гидратации)
const pageErrors = []
const consoleErrors = []
page.on("pageerror", (e) => pageErrors.push(e.message))
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()) })

// --- 1. Рендер всех страниц во всех локалях + направление текста
for (const loc of ["en", "ru", "he"]) {
  for (const route of ["about", "alumni", "performances", "vocal-group"]) {
    await page.goto(`${BASE}/${loc}/${route}`, { waitUntil: "networkidle0", timeout: 60000 })
    await sleep(800)
    const h1 = await page.$eval("h1", (el) => el.textContent).catch(() => null)
    const dir = await page.evaluate(() => document.documentElement.dir)
    const dirOk = loc === "he" ? dir === "rtl" : dir === "ltr"
    ok(`${loc}/${route}`, !!h1 && dirOk, `"${(h1 || "").slice(0, 30)}" dir=${dir}`)
  }
}

// --- 2. Переключатель языка: EN -> HE меняет URL, контент, cookie
await page.goto(`${BASE}/en/about`, { waitUntil: "networkidle0" })
await sleep(1000)
for (const b of await page.$$("button")) {
  const txt = await b.evaluate((el) => el.textContent.trim())
  if (txt === "HE") { await b.click(); break }
}
await sleep(2500)
const urlHe = page.url()
const h1He = await page.$eval("h1", (el) => el.textContent).catch(() => "")
const dirHe = await page.evaluate(() => document.documentElement.dir)
ok("switcher navigates to /he/about", urlHe.endsWith("/he/about"), urlHe)
ok("switcher: Hebrew content + rtl", /[֐-׿]/.test(h1He) && dirHe === "rtl", `dir=${dirHe}`)
const cookie = (await browser.cookies()).find((c) => c.name === "NEXT_LOCALE")
ok("switcher sets NEXT_LOCALE cookie", cookie?.value === "he", `cookie=${cookie?.value}`)

// --- 3. Навбар-ссылки сохраняют локаль
await page.evaluate(() => {
  const a = [...document.querySelectorAll("nav a")].find((x) => x.getAttribute("href")?.includes("performances"))
  a?.click()
})
await sleep(2000)
ok("navbar keeps locale", page.url().endsWith("/he/performances"), page.url())

// --- 4. Галерея: открытие, закрытие по ESC
await sleep(1200)
const photo = await page.$(".photo-item")
if (photo) {
  await photo.click()
  await sleep(2000)
  const galleryOpen = await page.evaluate(() => !!document.querySelector(".fixed.inset-0"))
  ok("gallery opens", galleryOpen)
  await page.keyboard.press("Escape")
  await sleep(800)
  const closed = await page.evaluate(() => !document.querySelector(".fixed.inset-0"))
  ok("gallery closes on ESC", closed)
} else {
  ok("gallery opens", false, "no .photo-item")
  ok("gallery closes on ESC", false, "skipped")
}

// --- 5. Тёмная тема
const themeToggled = await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")]
  const t = btns.find((b) => b.querySelector("svg.lucide-moon, svg.lucide-sun"))
  if (!t) return false
  t.click()
  return true
})
await sleep(800)
const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"))
ok("theme toggle -> dark", themeToggled && isDark)

// --- Итог
console.log(results.join("\n"))
const failed = results.filter((r) => r.startsWith("FAIL")).length

if (pageErrors.length) {
  console.log("\n=== Unhandled page errors ===")
  console.log(pageErrors.slice(0, 5).join("\n"))
}
if (consoleErrors.length) {
  console.log("\n=== Console errors (warning) ===")
  console.log(consoleErrors.slice(0, 5).join("\n"))
}

console.log(`\n${results.length - failed}/${results.length} passed, page errors: ${pageErrors.length}`)
await browser.close()

// Падаем при провале проверок или реальных исключениях на странице
process.exitCode = failed > 0 || pageErrors.length > 0 ? 1 : 0
