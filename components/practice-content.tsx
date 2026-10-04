import Link from 'next/link';
import { clientCopy } from '@/lib/client-copy';
import { Armchair, Building2, ClipboardCheck, Leaf } from 'lucide-react';

export function PracticeServices({ visual = false }: { visual?: boolean }) {
  const serviceIcons = [Building2, Armchair, ClipboardCheck, Leaf];
  return (
    <section className="practice-services section-pad" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Our services</p>
          <h2>
            Thoughtful design.
            <br />
            <em>Considered delivery.</em>
          </h2>
        </div>
        <Link className="text-link" href="/contact">
          Start your project <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="service-list">
        {clientCopy.services.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <article
              key={service.title}
              data-studio-reveal={visual || undefined}
            >
              {visual && (
                <span className="service-icon" aria-hidden="true">
                  <Icon />
                </span>
              )}
              <span className="eyebrow">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p className={visual ? 'service-scope-full' : undefined}>
                {service.text}
              </p>
              {visual && (
                <details className="service-scope" name="studio-service-scope">
                  <summary aria-label={`View ${service.title} scope`}>
                    View scope <span aria-hidden="true" />
                  </summary>
                  <p>{service.text}</p>
                </details>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function PracticeExperience() {
  return (
    <section
      className="practice-experience section-pad"
      aria-labelledby="experience-title"
    >
      <div className="experience-lead">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">
          <span>10+</span>Projects completed
        </h2>
        <p>{clientCopy.experience.introduction}</p>
      </div>
      <div className="experience-types">
        {clientCopy.experience.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WhyTrayaksh() {
  return (
    <section
      className="why-trayaksh section-pad"
      aria-labelledby="why-trayaksh-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Why Trayaksh</p>
          <h2 id="why-trayaksh-title">
            Thoughtful design.
            <br />
            <em>Practical thinking.</em>
          </h2>
        </div>
        <Link className="text-link" href="/studio">
          Our perspective <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="principle-grid">
        {clientCopy.why.items.map((item, index) => (
          <article key={item.title}>
            <span className="eyebrow">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="principle-disclosures">
        {clientCopy.why.items.map((item, index) => (
          <details key={item.title} name="home-why-trayaksh">
            <summary>
              <span className="principle-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{item.title}</h3>
              <span className="principle-toggle" aria-hidden="true" />
            </summary>
            <p>{item.text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
