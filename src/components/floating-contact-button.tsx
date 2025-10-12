'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Mail, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { subscribeEmail } from '@/app/actions/subscribe-email';

export default function FloatingContactButton() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event to open popover
  useEffect(() => {
    const handleOpenPopover = () => {
      setIsOpen(true);
    };

    window.addEventListener('openEmailPopover', handleOpenPopover);
    return () => window.removeEventListener('openEmailPopover', handleOpenPopover);
  }, []);

  // Don't show on blog pages
  if (pathname?.startsWith('/blog')) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    const result = await subscribeEmail(email);

    setIsLoading(false);

    if (result.success) {
      setStatus('success');
      setMessage('Thanks! We\'ll be in touch soon! 🎯');
      setEmail('');
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 300);
      }, 2000);
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
          style={{
            backgroundColor: 'var(--accent-orange)',
            color: 'var(--pure-white)'
          }}
          aria-label="Contact Us"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
          
          {/* Tooltip - only show when popover is closed */}
          {!isOpen && (
            <div 
              className="absolute bottom-full right-0 mb-2 px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              style={{
                backgroundColor: 'var(--safe-black)',
                color: 'var(--pure-white)'
              }}
            >
              Quick Contact
              <div 
                className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                style={{borderTopColor: 'var(--safe-black)'}}
              ></div>
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 p-0 overflow-hidden"
        style={{
          backgroundColor: 'var(--pure-white)',
          border: '1px solid var(--soft-gray-200)',
        }}
      >
        <div
          className="p-4 flex items-center justify-between"
          style={{
            backgroundColor: 'var(--accent-orange)',
            color: 'var(--pure-white)',
          }}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Get in Touch!</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: 'var(--primary-blue-100)' }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: 'var(--highlight-gold)' }} />
              </div>
              <p className="text-lg font-medium" style={{ color: 'var(--safe-black)' }}>
                {message}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm mb-4" style={{ color: 'var(--safe-black)' }}>
                Leave your email and we&apos;ll reach out to discuss your scavenger hunt!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      borderColor: status === 'error' ? 'var(--accent-orange)' : 'var(--soft-gray)',
                      backgroundColor: 'var(--pure-white)',
                      color: 'var(--safe-black)',
                    }}
                  />
                  {status === 'error' && (
                    <p className="text-sm mt-1" style={{ color: 'var(--accent-orange)' }}>
                      {message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                    color: 'var(--pure-white)',
                  }}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              <p className="text-xs text-center mt-4" style={{ color: 'var(--soft-gray)' }}>
                Or find our contact details in the footer
              </p>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
