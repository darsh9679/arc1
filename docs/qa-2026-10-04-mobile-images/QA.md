# Mobile hero photo sizing — 4 October 2026

Status: reverted at the user's request. The current mobile hero is the preceding full-screen photo layout with text over the image and compact dot controls. This report and its screenshots document the reverted sizing experiment.

The previous full-height phone image used `object-fit: cover`. Landscape project photographs therefore lost most of their left and right sides in the portrait frame.

Below 600px, the hero now gives photographs a 4:3 landscape frame and uses `object-fit: contain`, centered, without the camera zoom. This preserves the complete photograph and its proportions. Slight unused space for different source aspect ratios uses the charcoal frame background. The headline and actions sit beneath the photograph in the same hero; neither shading nor copy covers the phone photograph.

The phone hero retains a minimum height matching the available opening screen, and can grow to accommodate larger text or very short available heights. Tablet and laptop rules were not changed. Dot navigation and touch-swipe handling remain.

## Verification

All five photo selections were checked at 390 × 844. Each image loaded with nonzero natural dimensions, `object-fit: contain`, no transform and no camera animation.

| Phone viewport | Hero bottom at page top | Horizontal overflow | Dot row bottom |
| --- | --- | --- | --- |
| 320 × 568 | 568px | None | 548px |
| 360 × 640 | 640px | None | 620px |
| 390 × 844 | 844px | None | Visible within hero |

Both actions remained visible on the short-phone view. The Studio section starts at the hero boundary.

Tablet 768 × 1024 and laptop 1366 × 768 retain `object-fit: cover`, the original camera animation declaration and their original hero heights (952px and 686px respectively). Neither had horizontal overflow.

`npm run lint` and `npm run build` passed; the production build generated all 17 static pages and completed its TypeScript checks. Tests used browser viewport emulation, not physical devices.

Previews: [390px phone](mobile-390.jpg), [360px phone](mobile-360.jpg), [320px phone](mobile-320.jpg).
