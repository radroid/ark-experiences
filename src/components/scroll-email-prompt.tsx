'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { subscribeEmail } from '@/app/actions/subscribe-email';

const DISMISSED_KEY = 'ark-email-prompt-dismissed';

export function ScrollEmailPrompt() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    setIsDismissed(false);

    const hero = document.getElementById('hero-section');
    if (!hero) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(hero);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  if (pathname?.startsWith('/blog') || isDismissed) {
    return null;
  }

  const dismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    const result = await subscribeEmail(email, navigator.userAgent);
    setIsLoading(false);

    if (result.success) {
      setStatus('success');
      setEmail('');
      setTimeout(dismiss, 2000);
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? 'Something went wrong.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
        >
          <div
            className="rounded-2xl shadow-2xl border px-5 py-4"
            style={{
              backgroundColor: 'var(--pure-white)',
              borderColor: 'var(--soft-gray-200)',
            }}
          >
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 py-1">
                <CheckCircle
                  className="w-5 h-5"
                  style={{ color: 'var(--highlight-gold)' }}
                />
                <span
                  className="font-medium text-sm"
                  style={{ color: 'var(--safe-black)' }}
                >
                  Thanks! We&apos;ll be in touch soon!
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: 'var(--safe-black)' }}
                  >
                    Interested? Drop your email and we&apos;ll reach out!
                  </p>
                  <button
                    onClick={dismiss}
                    className="shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" style={{ color: 'var(--soft-gray)' }} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className="flex-1 min-w-0 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                    style={{
                      borderColor:
                        status === 'error'
                          ? 'var(--accent-orange)'
                          : 'var(--soft-gray-200)',
                      backgroundColor: 'var(--pure-white)',
                      color: 'var(--safe-black)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all disabled:opacity-50 hover:shadow-lg cursor-pointer flex items-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--accent-orange)',
                      color: 'var(--pure-white)',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </form>

                {status === 'error' && (
                  <p
                    className="text-xs -mt-1"
                    style={{ color: 'var(--accent-orange)' }}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
