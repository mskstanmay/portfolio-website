import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  PERSONAL_INFO,
} from '@/utils/constants';
import type { ContactFormData } from '@/types';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const INITIAL_FORM: ContactFormData = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>('idle');

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
        title="Let's work together"
        description={`Have a project in mind or just want to say hi? Reach out at ${PERSONAL_INFO.email}.`}
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="card mx-auto max-w-2xl space-y-4 p-6 sm:p-8"
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
            className="w-full rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500"
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
            className="w-full rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500"
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
            className="w-full resize-none rounded-lg border border-dark-500 bg-dark-700 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-primary-500"
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
    </section>
  );
}
