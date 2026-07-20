import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, EmailIcon } from './icons';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  PERSONAL_INFO,
  SOCIAL_LINKS,
} from '@/utils/constants';
import type { ContactFormData } from '@/types';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const INITIAL_FORM: ContactFormData = { name: '', email: '', message: '' };

const CONTACT_TILE_ICONS = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  email: EmailIcon,
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const reduceMotion = useReducedMotion();

  const formReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 as const },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-container">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description={
          <>
            Open to full-time roles and internships. The fastest way to reach me is directly at{' '}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-primary-400 hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
            .
          </>
        }
        className="max-w-none"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          {SOCIAL_LINKS.map((link) => {
            const Icon = CONTACT_TILE_ICONS[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={link.name}
                className="panel group flex aspect-square flex-col items-center justify-center gap-3 p-6 transition-all hover:-translate-y-0.5 hover:border-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
              >
                <Icon className="h-8 w-8 text-slate-300 transition-colors group-hover:text-primary-400" />
                <span className="text-sm font-medium text-slate-300">{link.name}</span>
              </a>
            );
          })}
        </div>

        <motion.form
          {...formReveal}
          onSubmit={handleSubmit}
          className="panel order-1 space-y-4 p-6 sm:p-8 lg:order-2"
        >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
            placeholder="Tell me about your project..."
          />
        </div>

        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-emerald-400">Thanks for reaching out! I&apos;ll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-rose-400">
            Something went wrong sending your message. Please email me directly at{' '}
            {PERSONAL_INFO.email}.
          </p>
        )}
      </motion.form>
      </div>
    </section>
  );
}
