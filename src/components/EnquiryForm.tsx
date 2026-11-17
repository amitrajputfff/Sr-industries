'use client';

import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/catalog';

/* No backend: the form writes a WhatsApp message the visitor sends themselves. */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const lines = [
      'Hello SR Industries, I would like a quote.',
      get('company') && `Company: ${get('company')}`,
      get('name') && `Name: ${get('name')}`,
      get('parts') && `Parts and quantities: ${get('parts')}`,
      get('message'),
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h2>Ask for a bulk price</h2>
      <p>Fill this in and it opens WhatsApp with your message ready to send.</p>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-parts">Model codes and quantities</label>
        <input id="f-parts" name="parts" placeholder="For example HB-CP, 5,000 pcs" />
      </div>
      <div className="field">
        <label htmlFor="f-message">Anything else</label>
        <textarea id="f-message" name="message" />
      </div>
      <button type="submit" className="btn btn--wa">
        <MessageCircle aria-hidden /> Continue on WhatsApp
      </button>
      <p className="form-note" role="status">
        {sent ? 'WhatsApp opened in a new tab. Press send there to reach the factory.' : 'Minimum order is 3,000 pieces a model.'}
      </p>
    </form>
  );
}
