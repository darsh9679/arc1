# Recognition and Contact refinement — 3 October 2026

## Final behavior

- Recognition has a contained award feature with an editorial D&V graphic, the supplied award title and category, and grouped event, presenter, date and location facts. The graphic is decorative, not a certificate or event photograph.
- Selected work uses three equal laptop cards. Below 600px, the same three projects use a native horizontal scroll-snap row with a visible swipe hint. This replaces the long vertical stack without hiding projects.
- Contact uses a contrasting studio introduction beside a compact enquiry panel on laptops and tablets, and a stacked layout on phones. The address section pairs studio details with the existing opt-in Google Maps panel.
- The enquiry form now asks only for name, email, service and project brief. Location, area, budget, phone, preferred contact method and referral questions are no longer separate fields. The API retains compatibility with older optional data.
- The current local configuration prepares a browser-only draft. The draft explicitly says it has not been sent; copy/download and direct contact actions remain available. No real enquiry was transmitted during QA.
- Contact omits the footer's repeated enquiry invitation while keeping the footer directory. Recognition retains its project invitation. Other page layouts and the laptop Studio process animation were not changed by these scoped styles.
- Short vertical panel entrances and restrained hover movement respect reduced motion. Text is present before animation; panels do not depend on an opacity reveal.
- The mobile Enquire shortcut uses a native fragment on Contact, so repeating it still scrolls to and focuses the enquiry panel. Other routes retain the existing Next Link navigation.

## Verification

Reviewed both pages in the Codex browser at 1366 × 768, 768 × 1024, 375 × 667 and 320 × 568. Document width matched scroll width at each checked size; Recognition's intentional horizontal overflow remains inside its project row. The three laptop project cards had equal widths and the same top coordinate.

Phone inputs retain 16px type and 44px height. The 375px enquiry panel measured about 576px high, including its title, four required fields, action and draft notice. Empty submission focused the name field and all four fields exposed required validation. A sample local submission produced only the four answers, with a readable 160px draft textarea. Reloading removed the sample draft.

Keyboard focus reached all three Recognition project links. The project row scrolled horizontally as focus moved to subsequent cards. Explore all projects opened Work. Enquire from Work opened Contact at the enquiry panel; repeated Enquire on Contact worked after returning to the top. The address panel had no iframe before its load button was selected. External contact, directions and map requests were not exercised.

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; all 17 static pages generated successfully.
- `npm run test:server`: all 13 tests passed with a mocked destination, including submission of the four-field payload without older optional questions.

These are responsive browser viewport checks, not physical-device tests. Reduced-motion behavior was checked in the authored GSAP media queries and CSS; an operating-system preference toggle was not performed.

## Screenshots

Final screenshots retain the page context and actual supplied project images:

- [Recognition laptop](recognition-laptop-final.jpg)
- [Recognition tablet](recognition-tablet-final.jpg)
- [Recognition phone](recognition-phone-final.jpg)
- [Recognition phone projects](recognition-work-phone-final.jpg)
- [Contact laptop](contact-laptop-final.jpg)
- [Contact tablet](contact-tablet-final.jpg)
- [Contact phone](contact-phone-final.jpg)
- [Contact small phone](contact-small-phone-final.jpg)
- [Contact phone form](contact-form-phone-final.jpg)
- [Contact sample local draft](contact-draft-phone-final.jpg)
- [Contact laptop studio section](contact-location-laptop-final.jpg)
- [Contact phone address panel](contact-address-phone-final.jpg)

Before and first-pass images remain alongside these final captures for comparison.

## Later revision: form first on phones and shared footer

The subsequent user request supersedes the initial Contact presentation above. Below 701px, the form now appears before Contact / New projects. The actual document order also starts with the form, so phone keyboard and reading order agree with the visible order. Project enquiry is the page's H1; the contact introduction follows as an H2. Laptop and tablet keep the introduction in the left column and the form in the right column.

Contact now uses slate blue, clay and paper colors. The decorative arch was removed, italic emphasis was replaced with upright headings, and the address panel uses a flat warm surface. The four fields, validation and delivery behavior are unchanged.

The shared footer now has a slate background, light text, a paper-backed original logo, rectangular social icon targets, grouped navigation and contact details, a directions link and a quieter utility line. Instagram remains the confirmed link; other social icons remain noninteractive until real URLs are supplied. The footer invitation remains hidden on Contact and project detail pages as previously intended.

At 375 × 667, the form began around 93px from the page top and Contact / New projects followed directly after it, around 670px. The footer measured about 640px high and fit in one viewport. Its phone navigation and telephone links have 44px touch targets. Checked document width against scroll width at 320px, 375px, 768px and 1366px; no page overflow was present. The 768px layout preserved both opening columns on the same row. Production build, typecheck and lint passed after this revision; enquiry logic was unchanged, so the previously passing 13 server tests were not repeated.

The browser briefly reported a suspended connection during review. A fresh preview in the same browser recovered the page. Laptop, tablet and phone footer screenshots were subsequently captured successfully.

- [Form first on phone](contact-form-first-phone.jpg)
- [Contact introduction after the form](contact-introduction-phone-after-form.jpg)
- [Clay and slate laptop contact layout](contact-clay-slate-laptop.jpg)
- [Redesigned phone footer](footer-phone-redesign.jpg)
- [Redesigned tablet footer](footer-tablet-redesign.jpg)
- [Redesigned laptop footer](footer-laptop-redesign.jpg)

## Color reversion, 4 October 2026

At the user's request, the slate and clay palette above was reverted. Contact / New projects again uses its previous dark green surface, ivory text and muted gold emphasis. The shared footer returns to the original light paper background with dark text and olive/gold accents. The mobile form-first order, four-field form, footer layout, directions link and social icons are retained.

Reviewed the restored colors at 1366 × 768 and 375 × 667. On the phone, the form starts around 93px and the Contact introduction follows around 670px. The rendered introduction background is `#23372e`; the footer background is `#fefefe`. Lint passed. This color-only revision did not change form behavior.

- [Restored Contact laptop colors](contact-colors-restored-laptop.jpg)
- [Restored Contact phone colors and form-first order](contact-colors-restored-phone.jpg)
- [Restored light laptop footer](footer-colors-restored-laptop.jpg)
- [Restored light phone footer](footer-colors-restored-phone.jpg)

## Contact panel refinement, 4 October 2026

The following user request replaces only the Contact / New projects panel colors with warm stone (`#eeeae1`), charcoal (`#30312c`) and muted bronze (`#806037`). Supporting text uses `#5c5b53`. The form and light footer colors are retained, and the form still appears first on phones.

Calculated contrast against the panel background is 10.92:1 for headings, 5.69:1 for supporting text and 4.80:1 for bronze emphasis. The telephone button has 12.77:1 text contrast. Visual review covered the laptop presentation and 375px phone layout; the 320px phone check also found no horizontal overflow.

- [Warm stone Contact laptop](contact-stone-palette-laptop.jpg)
- [Warm stone Contact phone](contact-stone-palette-phone.jpg)

## Opening progress, 4 October 2026

The introduction now displays a numeric percentage and a native progress element labelled Introduction progress. It advances with the existing animation, reaches 100% before the fade and retains the original 1.8-second total duration. The page-transition curtain separately shows Opening page: 0% while covering, 35% when navigation starts and 100% only after the destination route commits. These values describe opening stages, not downloaded bytes.

Browser verification captured the introduction at 23% on a 375px phone viewport. Automatic completion, replay, Skip intro and Escape dismissal worked; dismissal restored scrolling and removed the inert attribute from the page. After refreshing the development preview following hot updates, navigation from Contact to Recognition and back through the footer completed successfully, exposed 100% and hid the curtain. Reduced-motion and timeout paths remain in place; this review did not simulate network failure or change the operating-system motion preference.

Typecheck, lint and production build passed with all 17 static pages generated. No form submission behavior was changed.

- [Phone introduction with percentage](loader-progress-phone.jpg)

## Direct Google Maps embed and photo folders, 4 October 2026

Contact now renders the Google Maps iframe directly, replacing the Load address map button. The iframe is lazy-loaded, has an accessible title and retains the configured Vidya Bhuvan / Shivaji Park address query. A compact caption preserves the written address and an Open map link. The map card keeps its 320px height on larger layouts and 292px height on phones.

The browser loaded Google's interactive map successfully and displayed a Vidya Bhuvan marker beside the Shivaji Park area. In the captured 714px viewport, the map remained inside its column and document width did not overflow. The final continuation's Windows screen-check tool timed out; the saved live-map capture was inspected directly instead. Typecheck and lint passed after the component change.

All seven selected projects have gallery directories. Added the missing Dahisar and Vikhroli directories with `.gitkeep` files; existing photographs were retained. Updated the project-photo README and `docs/PROJECT-IMAGES.md` with all seven paths and current viewer instructions. `npm run images:sync` passed, finding the five populated project folders and six supplied gallery images; the other two galleries are ready for future photos.

- [Live Google Maps embed](shivaji-park-map-laptop.jpg)
- [Photo folder instructions](../PROJECT-IMAGES.md)
