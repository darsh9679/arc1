# Mobile hero portrait review — 4 October 2026

## Result

The five home slideshow scenes use generated portrait WebP sources below 600px, with a visible **AI portrait visual** caption and truthful alt text. A native picture source changes the image without adding a second photo layer. Tablet/laptop sources remain the original project gallery photographs. The mobile full-screen layout, five small dots and swipe handlers remain; arrow/pause controls were not added.

Built-in imagegen extended/recomposed the supplied rooms rather than stretching the landscape photos. All five generated outputs were visually inspected before WebP encoding and all five final slides were inspected at 375 × 667. Thane uses 50% 35% positioning to retain its pendant; the other portraits use 50% 65% to move the main room above the text on short phones. Camera drift is disabled below 600px and retained above it.

## Validation

- Typecheck and lint passed; the final production build compiled and generated all 17 static pages.
- 320 × 568, 375 × 667 and 390 × 844: all five portraits loaded, no horizontal overflow, both hero actions visible, five dot controls retained. At 375 × 667 the hero ends at the first-screen boundary, with the next section below it.
- 599px: all five portrait sources loaded. 600px: all five original photo sources loaded and the caption returned to **In focus**.
- 768 × 1024 and 1366 × 900: all five original project image sources loaded; existing larger-screen crop positions and camera animation remained.
- Dot selection changed the active scene and held the choice. All five scenes were selected through the dot buttons. No navigation or form submissions were performed.
- One transient Next development stylesheet hot-update error occurred during CSS edits; refreshing after the update restored the preview. Production compilation passed. This did not require an application-code workaround.
- Browser viewport overrides were reset after verification. These are emulated browser viewports, not physical-device tests.

## Evidence

- [Small phone, Thane](phone-thane-375x667.jpg)
- [Tall phone, Thane](phone-thane-390x844.jpg)
- [Andheri](phone-andheri-375x667.jpg), [Ghatkopar](phone-ghatkopar-375x667.jpg), [Ratnagiri](phone-ratnagiri-375x667.jpg), [salon](phone-salon-375x667.jpg)
- [320px phone](phone-320x568.jpg), [tablet](tablet-768x1024.jpg), [laptop](laptop-1366x900.jpg)
- [Loaded-source, layout and control observations](responsive-observations.json)
- [Final assets and replacement instructions](../MOBILE-HERO-PORTRAITS.md), [exact prompts and source provenance](../mobile-hero-portrait-provenance.json)
