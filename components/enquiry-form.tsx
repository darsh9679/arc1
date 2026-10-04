'use client';
import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { NativeSelect } from '@/components/ui/native-select';
import { studio } from '@/lib/content';
import styles from './enquiry-form.module.css';

export function EnquiryForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const resultRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    if (!status || busy) return;
    resultRef.current?.focus({ preventScroll: true });
    resultRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'instant',
    });
  }, [status, busy]);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(
      [...data.entries()].map(([key, value]) => [
        key,
        typeof value === 'string' ? value : '',
      ]),
    );
    const message = `Enquiry for Trayaksh Architeqts\n\nName: ${payload.name}\nEmail: ${payload.email}\nRequired services: ${payload.interest}\n\nAbout the project:\n${payload.message}`;
    if (!deliveryEnabled) {
      setDraft(message);
      setStatus(
        'Your enquiry draft is ready. It has not been sent. Copy or download it, then call the studio or contact us on Instagram.',
      );
      return;
    }
    setBusy(true);
    setStatus('Sending your enquiry…');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || 'Unable to send your enquiry. Please try again.',
        );
      setStatus('Your enquiry has been sent. Thank you for getting in touch.');
      form.reset();
      setDraft('');
    } catch (error) {
      setDraft(message);
      setStatus(
        error instanceof Error
          ? error.message
          : 'Your enquiry was not sent. Please try again or save your draft.',
      );
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus(
        'Draft copied. It has not been sent. You can paste it into your message to the studio.',
      );
    } catch {
      setStatus(
        'Copy is unavailable in this browser. Select the draft text below, or download it instead.',
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([draft], { type: 'text/plain;charset=utf-8' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'trayaksh-enquiry.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Draft downloaded. It has not been sent.');
  }
  return (
    <form
      className={`enquiry-form ${styles.form}`}
      aria-label="Project enquiry"
      aria-describedby="enquiry-notice"
      onSubmit={submit}
    >
      <div className={styles.row}>
        <label htmlFor="name">
          Your name <span aria-hidden="true">*</span>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="email">
          Email address <span aria-hidden="true">*</span>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label htmlFor="interest">
        How can we help? <span aria-hidden="true">*</span>
        <NativeSelect id="interest" name="interest" defaultValue="" required>
          <option value="" disabled>
            Select a service
          </option>
          <option>Architecture</option>
          <option>Interior design</option>
          <option>Architecture & interiors</option>
          <option>Project management</option>
          <option>Vastu Shastra consultation</option>
          <option>Sustainability consultation</option>
          <option>Multiple services</option>
          <option>Something else</option>
        </NativeSelect>
      </label>
      <label htmlFor="message">
        About your project <span aria-hidden="true">*</span>
        <Textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={3}
          aria-describedby="message-hint"
          placeholder="The space, the location and what you have in mind…"
        />
        <small id="message-hint" className={styles.hint}>
          Share the location and a little about your plans.
        </small>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Button type="submit" className={styles.submit} disabled={busy}>
        {busy
          ? 'Sending…'
          : deliveryEnabled
            ? 'Send enquiry'
            : 'Prepare my enquiry'}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Button>
      <p id="enquiry-notice" className={styles.notice}>
        {deliveryEnabled
          ? 'Your details will only be used to respond to this enquiry.'
          : 'Draft only: online sending is not set up. Nothing is sent or stored.'}
      </p>
      <output
        ref={resultRef}
        tabIndex={-1}
        className={styles.status}
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </output>
      {draft && (
        <div className={styles.draft}>
          <label htmlFor="draft">
            Your enquiry draft <span>— not sent</span>
            <Textarea id="draft" readOnly value={draft} rows={6} />
          </label>
          <div className={styles.draftActions}>
            <Button type="button" variant="outline" onClick={copy}>
              Copy draft
            </Button>
            <Button type="button" variant="outline" onClick={download}>
              Download draft ↓
            </Button>
            <a href={`tel:${studio.phoneHref}`}>Call the studio ↗</a>
            <a href={studio.instagram} target="_blank" rel="noreferrer">
              Contact on Instagram ↗
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

export function ContactMap() {
  return (
    <figure className={`contact-map ${styles.map}`}>
      <iframe
        title="Google Maps address search for Vidya Bhuvan, Shivaji Park, Dadar West, Mumbai"
        src={studio.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption className={styles.mapCaption}>
        <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
        <address>{studio.address}</address>
        <a href={studio.mapSearchUrl} target="_blank" rel="noreferrer">
          Open map <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
