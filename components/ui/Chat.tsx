'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/StylesContext';

type Status = 'idle' | 'typing' | 'submitting' | 'success';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
}

export const Chat = () => {
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
        <div className={cn("Chat", styles.containers.chat.wrapper)}>
            {/* Manifesto Text */}
            <div className="Chat-manifesto flex flex-col gap-4 text-white">
                <p className="text-[20px] font-medium leading-[1.3] tracking-tight">
                    Creativity doesn’t follow a straight line. It’s messy, iterative, and non-obvious.
                </p>
                <p className="text-[14px] text-white/50 leading-[1.5] max-w-[340px]">
                    We’re building tools to help you navigate the chaos and find your own path.
                </p>
            </div>

            {/* Input Area */}
            <div className="Chat-inputWrapper relative w-full overflow-hidden">
                <motion.div
                    layout
                    className={cn(
                        "Chat-inputForm",
                        styles.containers.chat.inputForm,
                        status === 'success' ? "h-[54px] bg-white/[0.08]" : "h-12"
                    )}
                >
                    <form onSubmit={handleSubmit} className="w-full h-full flex items-center">
                        <input
                            type="email"
                            required
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={status === 'success'}
                            placeholder="Curious? Continue with your email"
                            className={cn(
                                "w-full h-full bg-transparent border-none outline-none pl-5 pr-12 text-[14px] text-white/90 placeholder:text-white/30 transition-all duration-500",
                                status === 'success' && "opacity-0 invisible pl-16"
                            )}
                        />

                        <button
                            type="submit"
                            disabled={status === 'success' || !inputValue.trim()}
                            className={cn(
                                "absolute right-2 w-8 h-8 flex items-center justify-center rounded-[8px] bg-white/5 text-white/50 hover:bg-white/10 transition-all duration-200 border border-white/5",
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
                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1 h-1 rounded-full bg-white/40" />
                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-white/40" />
                            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-white/40" />
                        </div>
                    )}

                    {/* Success Content Overlay */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[14px] text-white font-medium">Request Sent.</span>
                                    <span className="text-[12px] text-white/50">We’ll be in touch.</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};
