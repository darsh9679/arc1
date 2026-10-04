# Approved client content

**Home readability update, 3 October 2026:** The home page now presents a concise practice introduction, three perspective summaries, and separate architecture, interior design, project-management and Vastu summaries. The phone hero presents unobstructed supplied project photography, followed by the approved brand headline, a concise summary and two action buttons on white. Repeated practice geography is omitted from the hero on short screens and remains in the Studio introduction. The original supplied copy remains preserved in the source JSON and `lib/client-copy.ts`, with the full practice and services content on Studio. Vastu remains qualified by client preference and project relevance. Project records, imagery provenance, geography and award facts are unchanged. The revised display headings and hero summary are editorial navigation copy, not new client claims.

The client supplied `Recommended brand descriptor.docx` as approved website copy on **3 September 2026**. The original DOCX is untouched; no replacement DOCX was created.

The phone-only home refinement below 600px uses shorter practice and perspective summaries drawn from the supplied content. Tablet and laptop copy remains unchanged. All six reasons retain their full original explanations, accessible through native disclosures on phones. The four services retain their existing summaries and the Vastu qualifier; the decorative stock image and repeated belief quote are omitted only on phones.

- Source SHA-256: `bc6511bf26a4850665747ddd69e7f1c98e39de9908e9b24b174757a8f898314d` (verified against the original file).
- Verbatim extracted paragraphs: `docs/client-content-source.json`, under `parts["word/document.xml"]`.
- Structured practice copy: `lib/client-copy.ts`.
- Studio details, project records and six process steps: `lib/content.ts`.

## Page mapping

| Source sections                                     | Website placement                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Brand descriptor, opening statement, belief         | Home hero and introduction, service introduction, shared metadata/footer                   |
| About Trayaksh Architeqts; Founder                  | Studio practice overview and founder biography                                             |
| Three-Eyed Vision; Vision; Mission                  | Studio philosophy and vision/mission sections                                              |
| Finding Calm in the Chaos; seven design principles  | Studio design philosophy and principles                                                    |
| Services                                            | Studio service list; Home service introduction and link                                    |
| Our Process                                         | Six-step stack on Studio                                                                   |
| Experience; Projects                                | Work introduction, approved 10+ completed-project count, typology groups and project index |
| Why Trayaksh                                        | Home reasons for choosing the practice                                                     |
| Geography                                           | Contact practice areas and shared footer                                                   |
| Contact Page; Project Enquiry                       | Contact details, opt-in address map and four-field enquiry form                            |
| Social Media / Digital Presence; closing descriptor | Existing Instagram link, footer and metadata; no invented YouTube/LinkedIn links           |

The existing Recognition page retains the award facts supplied in the original brief. The new document does not replace those facts or supply press coverage.

## Editorial normalization and factual boundaries

The bullets below record the original **3 September 2026** content integration. The portfolio mapping and photo status have since been updated from the 1 October project document in the section at the end of this file.

- Normalize heading case, display line breaks, punctuation and separator spacing for the site. Keep the supplied substantive copy, including the qualifier that Vastu principles are considered where relevant and desired by the client.
- The founder name and credentials appear twice consecutively in the DOCX, with different heading formatting and whitespace. Display them once. Preserve the biography's wording that she “later pursued an M.Arch in Project Management, Mumbai”; no additional institution or completion date is supplied.
- JSON paragraph index **149** contains four generic quoted slogans. OOXML marks them italic only: there are no deletions, strikethroughs, hidden runs or exclusion comments. The following distinctive descriptor is bold. The site uses the supplied opening tagline and final descriptor instead of adding all four generic slogans. This is an editorial selection, not a claim that the document deletes or prohibits them; the full source remains preserved.
- The document approves “10+ Projects Completed,” service experience and practice geography. It supplies no new individual project records. Only the Nerul workspace facts from the original brief are known; the other **three case studies remain reserved slots**. Display titles are editorial labels, not newly supplied project names.
- Mumbai and Ratnagiri are approved practice geography, with activity across Mumbai, Navi Mumbai, Ratnagiri, Pune and India. This does not establish the founder's birthplace or a second street address.
- The supplied studio address is **3rd Floor, Vidya Bhuvan, Shivaji Park, Dadar West, Mumbai**. The supplied phone is **9890849232**, normalized to `+919890849232` for the call link. The map uses an address search, not a verified entrance coordinate.
- The ten supplied enquiry labels are Name, Contact Number, Email, Project Location, Project Type, Approximate Area, Project Stage, Approximate Budget, Required Services and Tell us about your project. Dropdown choices, validation limits, optional/required status and helper text are implementation choices, not additional client facts.
- On 3 October 2026 the user explicitly requested a shorter contact form. It now presents name, email, service and project brief; location can be included in the brief. This later instruction supersedes the earlier ten-field presentation.
- All **seven AI concept images** retain their source-based badges, truthful alt text and relevant page/social disclosures. Approved text does not turn them into photographs of actual projects. Before/after concepts remain fictional studies, and no principal portrait was fabricated.

## Still needed after the 3 September content integration

- At that date, additional approved project photography, matched before/after pairs, and actual project plans where they should replace illustrative SVGs.
- At that date, an approved founder portrait was missing. The user supplied the actual photograph on 4 October 2026; an edited version now replaces the later temporary portrait in Studio.
- A contact email and a configured, verified enquiry delivery destination. Until delivery is configured, the form prepares a local draft and explicitly reports **not sent**. A phone number and address do not provide an inbox or webhook.
- Actual YouTube and LinkedIn profile URLs. The Instagram handle from the original brief remains confirmed. Press links/imagery, award imagery and an exact preferred map pin are optional additions, not reasons to invent content.

On 3 October 2026, the client requested social icons now and said they will provide the links later. Instagram, Facebook, LinkedIn and YouTube icons appear in the desktop navbar, mobile menu and footer. Only the confirmed Instagram account is linked; the other icons are noninteractive until their URLs are supplied. No profile URLs or WhatsApp availability were inferred. The Home award panel was restyled without changing its supplied award name, year, category or location.

The logo, practice copy, founder biography, phone and studio address are **not** missing assets. See `BRAND-ASSETS.md` and `IMAGE-ASSETS.md` for the visual assets. The project remains **Next.js App Router / TypeScript**, with **Vercel** as the requested deployment target; this content integration does not authorize or perform deployment.

## Portfolio update, 1 October 2026

The client supplied `3BHK Residential Interior.docx` with seven project descriptions: Ghatkopar, Ratnagiri, Anagha’s Salon & Academy, Andheri, Thane, Dahisar East and the Vikhroli bank interior. Five embedded photographs match the Ghatkopar, Ratnagiri, salon, Andheri and Thane entries. Those photos appear in their project galleries, portfolio cards and selected-work sections.

The document includes no matching photo for the Dahisar 3BHK or Vikhroli bank project, so those pages use typographic covers and the supplied copy. Project dimensions, descriptions, locations and style labels come from the attached document; spelling and punctuation were normalized for the website. No completion dates, client identities, before-and-after claims or additional project facts were inferred. The older note above about the three reserved slots describes the 3 September content state; the new document supersedes those slots only for the projects it documents. These two projects are the remaining portfolio photography gaps.

The imported photos contain no EXIF or GPS metadata. The delivered site remains in preview and was not deployed. No production visual/browser review was run in this update.

## Studio layout refinement, 3 October 2026

The Studio practice copy is grouped under People & context, Clarity & restraint, and Planning & execution. These are editorial navigation labels, not new client claims. Phones show a concise practice summary and native disclosures containing the complete source introduction and paragraphs. Founder biography, all credentials, three perspectives, vision/mission, five design-philosophy paragraphs, seven principles, four services and six process descriptions remain available.

The phone layout includes the founder visual. After confirming no approved portrait was available, the client explicitly requested a random temporary image for later replacement. A fictional AI portrait is saved at `public/images/studio/founder-portrait.png` and visibly labelled as temporary; it is not presented as a verified likeness of the founder. See `docs/founder-portrait-placeholder.md` for the exact prompt and replacement instructions. The supplied Thane and Ratnagiri photos remain genuine project assets.

Vision and Mission now use contrasting cards, project photography and icons for Space, People and Possibility. Concise phone summaries are editorial navigation copy; the complete approved Vision and Mission text remains in native disclosures. Small panel movements and image settling never hide the text, and respect reduced-motion preferences. At the client’s request, Studio retains the original illustrative process cards and scrolling stack on laptops (901px and wider), including their image provenance labels and existing reduced-motion/short-screen fallbacks. Tablets use a readable text grid and phones use expandable process rows. Shared project-page process panels are unchanged. These layout updates do not authorize deployment or establish new project/credential facts.

The subsequent Studio polish presents three concise practice summaries with the complete source paragraphs in expandable details on larger screens. Phone practice explanations remain expandable. The editorial Planning & execution summary retains the qualification that Vastu is relevant and desired. Decorative icons identify the three perspectives, seven principles and four services. Phone service cards expand to show their complete approved scope. Design philosophy now uses the supplied Ghatkopar photograph, labelled with its approved location and linked to its existing case study. Section navigation tracks the current topic; design philosophy belongs to the Our philosophy navigation group. No project facts, founder credentials or social profile URLs were added.

## Work and project-gallery refinement, 3 October 2026

All seven approved project records, descriptions, locations, areas and style labels remain unchanged. Work now shows six projects per page, with counts, search and category filters derived from the data. Phones omit repeated introductory brand copy and use a compact category selector; the full summary remains on larger Work views and on Home and Studio. This is a presentation change, not an additional project claim.

Project galleries now show one image with up to six thumbnails, a direct image selector and the existing full-screen viewer. The laptop has a thumbnail sidebar, and narrower screens place the thumbnails below. Every supplied photograph and illustrative reference remains reachable; reference source links and AI/drawing disclosures remain explicit. No project or stock photographs were added. The new View gallery shortcut and short browsing labels are editorial navigation text. The existing laptop Studio process stack remains unchanged.

## Founder photograph, 4 October 2026

The user supplied the actual founder photograph and explicitly requested a professional image edit preserving her face. Built-in imagegen was instructed to retain her facial identity, smile, head tilt, hair, pose, blue blazer and jewellery while simplifying the background, removing the shoulder bag and correcting the photo’s color balance. The original is preserved; the edited WebP now appears in Studio with `portraitIsPlaceholder` set to false. The earlier fictional placeholder is no longer shown. Founder biography, credentials and process animation are unchanged. See [the asset and exact prompt](docs/FOUNDER-PORTRAIT.md).
