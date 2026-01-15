'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/context/StylesContext';

type Status = 'idle' | 'typing' | 'submitting' | 'success';

export const ChatWidget = () => {
    const { styles } = useStyles();
    const [status, setStatus] = useState<Status>('idle');
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setStatus('submitting');

        // Simulate "success" morph after a delay
        setTimeout(() => {
            setStatus('success');
        }, 1200);
    };

    return (
        <div className="Chat-inputWrapper relative w-full overflow-hidden">
            <motion.div
                layout
                className={cn(
                    "Chat-inputForm",
                    styles.containers.chat.inputForm,
                    status === 'success' ? "h-[54px] bg-[var(--glass-bg)]" : "h-12"
                )}
            >
                <form onSubmit={handleSubmit} className="w-full h-full flex items-center">
                    <input
                        type="email"
                        required
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={status === 'success'}
                        placeholder="Send me a message"
                        className={cn(
                            "w-full h-full bg-transparent border-none outline-none pl-5 pr-12 text-[14px] text-text-primary placeholder:text-text-muted transition-all duration-500",
                            status === 'success' && "opacity-0 invisible pl-16"
                        )}
                    />

                    <button
                        type="submit"
                        disabled={status === 'success' || !inputValue.trim()}
                        className={cn(
                            "absolute right-2 w-8 h-8 flex items-center justify-center rounded-[8px] bg-[var(--glass-bg)] text-text-muted hover:bg-[var(--glass-hover)] transition-all duration-200 border border-[var(--border-subtle)]",
                            status === 'success' && "right-3 w-8 h-8 opacity-0"
                        )}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </form>

                {/* Loading State */}
                {status === 'submitting' && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex gap-1">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                    </div>
                )}

                {/* Success Content Overlay */}
                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            key="success-message"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <div className="flex flex-col">
                                <span className="text-[14px] text-text-primary font-medium">Request Sent.</span>
                                <span className="text-[12px] text-text-muted">We’ll be in touch.</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
