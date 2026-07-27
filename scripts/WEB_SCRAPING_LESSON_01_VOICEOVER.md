# Voiceover Script — Web Scraping Mission 1

## Title
Read HTML Like Data

## Scene 1 — Hook

**Visual:** A job webpage appears. The title, location and company become highlighted boxes.

**Voiceover:**

A webpage may look visual to us, but underneath it is structured text called HTML.

When we scrape a webpage, we are not reading pixels. We are locating HTML elements and extracting the information inside them.

## Scene 2 — Tags

**Visual:** The webpage transforms into simplified HTML.

**Voiceover:**

HTML uses tags to describe different kinds of content.

An H1 tag often contains the main heading. A paragraph tag contains text. An anchor tag usually represents a link.

The exact structure varies from site to site, so the first step is always inspection.

## Scene 3 — BeautifulSoup

**Visual:** Python code appears one line at a time.

**Voiceover:**

BeautifulSoup turns HTML text into a searchable Python object.

We create a soup object, tell it to use the HTML parser, and then ask it to find the first H1 element.

```python
soup = BeautifulSoup(html, "html.parser")
heading = soup.find("h1")
print(heading.get_text(strip=True))
```

The get-text method removes the surrounding HTML and returns only the visible text.

## Scene 4 — CSS selectors

**Visual:** A dot appears before the class name count.

**Voiceover:**

Sometimes a tag is not specific enough.

CSS selectors let us target an element by class, ID or position.

A dot selects a class. So dot-count finds an element whose class is count.

```python
soup.select_one(".count")
```

## Scene 5 — Responsible use

**Visual:** API, robots.txt, terms and rate limit cards appear.

**Voiceover:**

Being able to extract data does not automatically mean we should.

Before collecting live website data, review the site's terms, robots instructions, rate limits and data rights.

When an official API exists, it is normally the more stable and responsible option.

## Scene 6 — Mission handoff

**Voiceover:**

Your mission is to extract a heading and a result count from the supplied HTML.

The page is simulated, so you can practise the technique safely before working with live websites.
