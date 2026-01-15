import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function deepMerge(target: any, source: any): any {
    if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
        return source;
    }

    const output = { ...target };

    Object.keys(source).forEach(key => {
        if (typeof source[key] === 'object' && source[key] !== null && key in target) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    });

    return output;
}
