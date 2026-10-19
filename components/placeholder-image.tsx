import { useId, type CSSProperties } from 'react';
import Image from 'next/image';
import { getConceptImage } from '@/lib/imagery';
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The brief requires inline SVG; the image role makes its title accessible. */

export type DrawingVariant =
  | 'perspective'
  | 'plan'
  | 'elevation'
  | 'detail'
  | 'shell';
type Props = {
  src?: string | null;
  alt: string;
  variant?: DrawingVariant;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  fit?: 'cover' | 'contain';
  style?: CSSProperties;
  objectPosition?: string;
  blurDataURL?: string;
};

/** Illustrative, non-project-specific drawings. Set src to swap in approved photography. */
export function PlaceholderImage({
  src,
  alt,
  variant = 'plan',
  className = '',
  label,
  priority,
  sizes,
  fit,
  style,
  objectPosition,
  blurDataURL,
}: Props) {
  const id = useId().replaceAll(':', '');
  const concept = getConceptImage(src);
  return (
    <div
      className={`placeholder-image drawing-${variant} ${className}`}
      style={style}
      data-image-kind={concept ? 'ai-concept' : src ? 'photograph' : 'drawing'}
    >
      {src ? (
        <Image
          src={src}
          alt={concept?.alt || alt}
          style={
            objectPosition || fit
              ? { objectPosition, objectFit: fit }
              : undefined
          }
          fill
          sizes={
            sizes ?? (priority ? '100vw' : '(max-width: 800px) 100vw, 60vw')
          }
          unoptimized={!src.startsWith('/') || src.endsWith('.svg')}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      ) : (
        <svg
          viewBox="0 0 1000 800"
          role="img"
          aria-labelledby={`${id}-title`}
          preserveAspectRatio={
            fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'
          }
        >
          <title id={`${id}-title`}>{alt}</title>
          <defs>
            <pattern
              id={`${id}-grid`}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="currentColor"
                strokeWidth=".5"
                opacity=".15"
              />
            </pattern>
            <pattern
              id={`${id}-hatch`}
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <path d="M0 0V9" stroke="currentColor" opacity=".14" />
            </pattern>
          </defs>
          <rect width="1000" height="800" fill={`url(#${id}-grid)`} />
          {variant === 'perspective' || variant === 'shell' ? (
            <g fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M-80 12L710 195 1090 20M710 195V570L-60 840M710 570L1090 790M-80 12V840M1020 48V750" />
              <path d="M140 64V758M340 110V690M530 153V631M746 178V590M861 124V657M969 73V722" />
              <path d="M140 178L710 288 1020 151M140 532L710 471 1020 567M140 549L710 486 1020 583M140 178V549" />
              <path
                d="M194 549V732M264 539V708M435 519V648M617 498V600M746 287V486M861 231V511M969 176V542"
                opacity=".55"
              />
              <path
                d="M-20 804L710 539 1040 733M89 800L710 554M307 800L727 580M555 800L758 598M830 800L808 623M-30 669L710 511 1080 668"
                opacity=".3"
              />
              <path
                d="M50 11L710 168 1030 12M50 37L710 192M750 165L750 13M771 156L771 13M793 146L793 13"
                opacity=".4"
              />
              {variant !== 'shell' && (
                <>
                  <path
                    d="M298 562L617 480 823 549 504 662Z"
                    fill={`url(#${id}-hatch)`}
                  />
                  <path d="M298 562V580L504 681 823 568V549M504 662V681M330 581V687M786 583V688M515 687V769M599 496V572" />
                  <path d="M301 604L353 581 387 595V646L339 669 301 651Z M301 604V651M339 619V669M301 604L339 619 387 595M560 676L612 653 646 667V718L598 741 560 723Z M598 691V741M560 676L598 691 646 667" />
                  <path d="M848 500V570M827 570H870L875 509H821ZM849 504C810 483 807 449 820 442C842 443 851 474 849 504ZM849 497C870 458 891 463 891 480C887 496 866 499 849 504" />
                  <ellipse cx="519" cy="302" rx="58" ry="14" />
                  <path d="M519 147V288M461 302V317Q519 345 577 317V302" />
                </>
              )}
            </g>
          ) : variant === 'elevation' ? (
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M-20 656H1020M148 652V244H499V650M149 246L256 135H631L732 244V654M499 244H855V655M732 244V386H855M202 655V311H445V655M243 311V655M390 311V655M499 385H855M499 517H855M561 386V655M660 386V655M760 386V655" />
              <path
                d="M259 143V240M285 143V240M311 143V240M337 143V240M363 143V240M389 143V240M415 143V240M441 143V240M467 143V240M493 143V240M519 143V240M545 143V240M571 143V240M597 143V240M623 143V240"
                opacity=".35"
              />
              <path
                d="M100 694H899M100 683V705M899 683V705M91 239V655M80 239H103M80 655H103"
                opacity=".4"
              />
              <rect
                x="203"
                y="313"
                width="40"
                height="338"
                fill={`url(#${id}-hatch)`}
              />
            </g>
          ) : variant === 'detail' ? (
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M215 110H785V700H215ZM245 140H755V670H245ZM245 535H755M480 140V535M504 140V535M245 570H755M245 602H755M245 634H755" />
              <path
                d="M275 140V535M305 140V535M335 140V535M365 140V535M395 140V535M425 140V535M455 140V535"
                opacity=".5"
              />
              <path d="M534 415C534 270 725 270 725 415V535H534ZM534 434H725M629 415V535" />
              <path
                d="M150 110V700M137 110H166M137 700H166M215 750H785M215 737V764M785 737V764"
                opacity=".4"
              />
              <rect
                x="245"
                y="570"
                width="510"
                height="100"
                fill={`url(#${id}-hatch)`}
              />
            </g>
          ) : (
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M180 116H817V672H180ZM194 130H803V658H194ZM180 349H440V116M440 363H180M440 363V522M440 596V672M454 116V284M454 348V508H817M454 522H803M600 522V672"
                strokeWidth="3"
              />
              <path
                d="M455 282A66 66 0 0 1 521 348H455M441 523A73 73 0 0 1 514 596H441M600 523A69 69 0 0 1 669 592H600"
                strokeWidth="1"
              />
              <rect x="225" y="165" width="170" height="136" />
              <rect x="238" y="178" width="59" height="38" />
              <rect x="320" y="178" width="59" height="38" />
              <path d="M225 228H395M230 633V409H293V633Z" />
              <rect x="326" y="450" width="55" height="135" rx="5" />
              <rect x="534" y="189" width="181" height="92" rx="4" />
              <path d="M558 174V150H600V174M649 174V150H691V174M558 294V318H600V294M649 294V318H691V294" />
              <path d="M481 482H774V369H725V435H481Z" />
              <circle cx="679" cy="388" r="24" />
              <rect x="475" y="550" width="99" height="90" />
              <ellipse cx="706" cy="591" rx="30" ry="47" />
              <path
                d="M129 115V673M117 115H142M117 673H142M180 725H818M180 711V739M818 711V739"
                opacity=".4"
              />
              <rect
                x="194"
                y="130"
                width="246"
                height="22"
                fill={`url(#${id}-hatch)`}
              />
            </g>
          )}
          <g fill="none" stroke="currentColor" opacity=".5">
            <path d="M60 740H100M80 720V760M914 60H954M934 40V80" />
            <circle cx="934" cy="60" r="14" />
          </g>
          <text
            x="60"
            y="785"
            fill="currentColor"
            opacity=".65"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="3"
          >
            TRAYAKSH / DRAWING STUDY / NOT A PROJECT RECORD
          </text>
        </svg>
      )}
      {!src && label && <span className="drawing-label">{label}</span>}
      {concept && <span className="image-provenance">AI concept image</span>}
    </div>
  );
}
