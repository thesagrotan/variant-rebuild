'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStyles } from '@/components/context/StylesContext';

type Step = 'idle' | 'message' | 'email' | 'sending' | 'done';

interface Message {
    id: string;
    text: string;
    from: 'system' | 'user';
}

interface ChatWidgetProps {
    onActiveChange?: (active: boolean) => void;
}

export const ChatWidget = ({ onActiveChange }: ChatWidgetProps) => {
    const { styles } = useStyles();
    const [step, setStep] = useState<Step>('idle');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const isActive = step !== 'idle';

    useEffect(() => {
        onActiveChange?.(isActive);
    }, [isActive, onActiveChange]);

    useEffect(() => {
        if (inputRef.current && (step === 'message' || step === 'email')) {
            inputRef.current.focus();
        }
    }, [step]);

    // Show intro message when chat becomes active
    useEffect(() => {
        if (step === 'message' && messages.length === 0) {
            setMessages([{ id: 'intro', text: "Hi! Thanks for reaching out. Please drop a message and I'll get back to you as soon as possible.", from: 'system' }]);
        }
    }, [step, messages.length]);

    const reset = () => {
        setMessage('');
        setEmail('');
        setMessages([]);
        setStep('idle');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') reset();
    };

    const submit = () => {
        setStep('sending');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: 'thanks', text: "Thanks! We'll be in touch soon.", from: 'system' }]);
            setStep('done');
            setTimeout(reset, 2500);
        }, 800);
    };

    const placeholder = step === 'email' ? 'Your email' : 'Send a message...';
    const value = step === 'email' ? email : message;
    const setValue = step === 'email' ? setEmail : setMessage;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;

        if (step === 'idle' || step === 'message') {
            // Add user message and ask for email
            setMessages(prev => [
                ...prev,
                { id: `user-${Date.now()}`, text: message, from: 'user' },
                { id: 'email-ask', text: "Great! What's your email so I can get back to you?", from: 'system' }
            ]);
            setStep('email');
        } else if (step === 'email') {
            setMessages(prev => [...prev, { id: `email-${Date.now()}`, text: email, from: 'user' }]);
            submit();
        }
    };

    return (
        <div className="Chat-inputWrapper relative w-full flex flex-col" onKeyDown={handleKeyDown}>
            {/* Messages */}
            <AnimatePresence>
                {isActive && messages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-2 mb-3 overflow-hidden"
                    >
                        {messages.map((msg, i) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
                                className={cn(
                                    "px-4 py-2.5 rounded-2xl text-[14px] max-w-[280px]",
                                    msg.from === 'system'
                                        ? "bg-[var(--glass-bg)] text-text-primary self-start rounded-bl-md border border-[var(--border-subtle)]"
                                        : "bg-[#3b82f6] text-white self-end rounded-br-md shadow-sm"
                                )}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input */}
            <motion.form
                layout
                onSubmit={handleSubmit}
                onFocus={() => step === 'idle' && setStep('message')}
                className={cn(
                    "Chat-inputForm relative",
                    styles.containers.chat.inputForm,
                    "h-12 flex items-center"
                )}
            >
                <AnimatePresence mode="wait">
                    {(step === 'idle' || step === 'message' || step === 'email') && (
                        <motion.input
                            key={step === 'email' ? 'email' : 'message'}
                            ref={inputRef}
                            type={step === 'email' ? 'email' : 'text'}
                            required
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={placeholder}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="w-full h-full bg-transparent border-none outline-none pl-5 pr-12 text-[14px] text-text-primary placeholder:text-text-muted"
                        />
                    )}

                    {step === 'sending' && (
                        <motion.div
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-1 pl-5"
                        >
                            {[0, 0.15, 0.3].map((delay, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 0.8, delay }}
                                    className="w-1.5 h-1.5 rounded-full bg-text-muted"
                                />
                            ))}
                        </motion.div>
                    )}

                    {step === 'done' && (
                        <motion.span
                            key="done"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pl-5 text-[14px] text-text-muted"
                        >
                            Sending...
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Submit button - always visible */}
                <button
                    type="submit"
                    disabled={!value.trim() || step === 'sending' || step === 'done'}
                    className={cn(
                        "absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--glass-bg)] text-text-muted hover:bg-[var(--glass-hover)] border border-[var(--border-subtle)] transition-opacity",
                        (!value.trim() || step === 'sending' || step === 'done') && "opacity-40"
                    )}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </motion.form>
        </div>
    );
};
