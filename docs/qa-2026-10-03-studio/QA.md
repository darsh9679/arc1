# Studio structure and mobile readability — 3 October 2026

Reviewed the original page at 1366 × 768 and 375 × 667, including practice, founder, philosophy, vision/mission, design principles, services and process. Saved the corresponding before/after viewport screenshots in this directory.

## Changes

- Align the laptop practice heading and introduction, then group the full copy into three clear topic columns.
- Use consistent heading sizes, section padding and the brand’s cream, olive and restrained gold palette.
- Reduce the decorative founder panel, format the credentials as compact labels, and preserve the full expandable biography. Hide the repeated decorative profile on phones.
- Retain the supplied project photography, with a bright image above the phone hero copy and a separate caption below the phone philosophy image.
- Use two columns for services. Retain the original six process cards and scrolling stack on laptops (901px and wider), with the existing reduced-motion and short-screen fallbacks. Tablets use a compact process grid; phones use expandable process rows.
- Use native, keyboard-accessible disclosures for long phone explanations. Named groups keep one explanation open per group. All approved text remains available.
- Keep Studio headings immediately visible as visitors scroll and expand content.

## Phone section heights at 375 × 667

| Section                        |  Before | After |
| ------------------------------ | ------: | ----: |
| Hero                           |   673px | 473px |
| Practice                       | 1,682px | 456px |
| Founder                        | 1,107px | 494px |
| Three-Eyed Vision              | 1,192px | 393px |
| Vision / mission               | 1,229px | 312px |
| Design philosophy / principles | 2,558px | 976px |
| Services                       | 1,094px | 601px |
| Process                        | 3,639px | 512px |

The main content decreases from **13,289px to 4,317px**, approximately **68%**. These measurements use initially collapsed disclosures; opening an explanation adds the space required for its full text.

These are the initial compact-layout measurements. The subsequent portrait and Vision/Mission refinements are recorded below.

## Verification

- Checked widths 320, 375, 390, 430, 599, 600, 768, 1024 and 1366. No horizontal page overflow or clipped heading/paragraph text.
- Verified both supplied images load and retain visible dimensions.
- Opened a perspective by mouse; opened another by Enter and confirmed the previous one closes. Enter closes the current row.
- Opened a process row and verified its complete original description.
- Type checking, lint and production build passed.

## Laptop process restoration

The client requested preservation of the original laptop card animation after the initial layout refinement. Studio now reuses `ProcessStack` above 900px while retaining its compact tablet and phone layouts. The two responsive versions share one `#process` navigation target, and only one is displayed at a time.

At 1366 × 768, verified sticky positioning and the first card scaling from 1 to 0.9709 as the second card scrolls into view. Saved `laptop-process-restored.jpg` and `laptop-process-scroll-restored.jpg`; these supersede the process grid in the earlier laptop screenshots. Type checking and lint passed after the restoration.

Rechecked 375 × 667: six expandable rows, no visible desktop cards, and the unchanged 512px process / 4,317px main content heights. At 768px and 900px the tablet grid remains visible; at 902px the six desktop cards return. Each view has one visible process heading and no horizontal overflow. Measurements are recorded in `process-restoration-checks.json`, with the phone view in `phone-process-preserved.jpg`.

## Founder, typography and Vision/Mission refinement

The client requested the founder image on phones and more visual interest on Studio, then explicitly authorised a random portrait for later replacement. Built-in imagegen produced a fictional temporary portrait. It lives at `public/images/studio/founder-portrait.png`, with a visible placeholder caption and truthful alt text; the exact prompt and replacement instructions are in `docs/founder-portrait-placeholder.md`.

Vision uses supplied Ratnagiri project photography and a larger serif lead. Mission uses a contrasting olive card with icons and clearly separated Space, People and Possibility rows. Phones see concise summaries and expandable complete source text. Cards stack on phones; intermediate screens have a photograph beside the Vision text. The original laptop process animation remains.

Studio adds small panel rises and image settling with GSAP. Text is never hidden or faded out. Reduced-motion preferences skip this enhancement. Image loads and disclosure toggles refresh the scroll measurements.

- Checked 320, 375, 599, 600, 768, 1024 and 1366px widths. No horizontal overflow or clipped headings, paragraphs or summaries. The founder image remains visible at 230px high on phones and 360px on larger screens.
- Opened Vision and Mission with Enter, verified all approved paragraphs, and confirmed opening Mission closes Vision. Closing works with Enter.
- At 375 × 667, main content is approximately 4,986px with collapsed explanations, including the restored portrait. The process section remains compact.
- At 1366 × 768, confirmed the first process card sticks at 45px and scales to 0.9709 as Observe enters the viewport. No visible animated panel has hidden text.
- Type checking, lint and production build passed.

Screenshots: `phone-founder-portrait.jpg`, `phone-vision-mission-refined.jpg`, and `laptop-vision-mission-refined.jpg`. Measurements: `visual-refinement-responsive.json` and `visual-refinement-animation.json`.

## Continued Studio polish

- Practice now has three concise icon cards, each with a native disclosure containing all of its approved source paragraphs. At 1366 × 768, the collapsed practice section decreased from 650px to 531px, about 18%.
- The philosophy and seven principles use consistent decorative icons. Laptop principles use four columns above 1000px; intermediate layouts retain two columns and phone explanations remain compact native rows.
- Four service cards use icons, clear titles and expandable scopes on phones. Larger screens show the complete scope text. The optional visual variant is enabled only on Studio.
- Design philosophy uses supplied Ghatkopar photography with an approved location caption and a link to `/work/ghatkopar-apartment`. Verified the link opens the existing case study.
- The section navigation highlights the current topic. Design philosophy is grouped under Our philosophy. Verified practice, philosophy and process highlights. Navigation tracking uses viewport-height pixel margins and rebuilds its observation region on resize.
- Keyboard checks verified practice explanations and phone service scopes. Opening a second service scope closes the first; both controls close with Enter.
- Checked 320, 375, 599, 600, 768, 1024 and 1366px layouts. Fixed a service title clipping at 320px, then rechecked it: no clipped text or horizontal overflow. At 375 × 667, collapsed main content is about 5,039px, including the portrait and project link.
- Rechecked laptop stacking: Understand sticks at 45px and scales to 0.9709 as Observe enters. Phones still show six expandable process rows.
- Type checking, lint and production build passed.

Proof: `laptop-practice-final-polish.jpg`, `laptop-philosophy-final-polish.jpg`, `laptop-design-final-polish.jpg`, `phone-philosophy-final-polish.jpg`, and `phone-services-final-polish.jpg`. Recorded checks: `final-polish-responsive.json` and `final-polish-process-animation.json`.

`before-measurements.json`, `after-measurements.json` and `responsive-checks.json` contain the recorded dimensions. The native disclosures and immediate heading visibility also keep this layout useful without client-side animation.
