import { CLASSES } from '../../config/tokens';

interface ProjectLinkProps {
    label: string;
}

export default function ProjectLink({ label }: ProjectLinkProps) {
    return (
        <div className={`box-border content-stretch flex flex-col items-start justify-center px-0 relative shrink-0 w-full ${CLASSES.projectLink} opacity-50 hover:opacity-100 transition-opacity cursor-pointer`}>
            <p className="text-sm leading-[1.5] text-text-primary not-italic relative shrink-0 text-nowrap whitespace-pre">{label}</p>
            <div className="h-0 relative shrink-0 w-full">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": 'var(--border-subtle)' } as React.CSSProperties}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 207 1">
                        <line stroke="currentColor" strokeDasharray="1 3" x2="207" y1="0.5" y2="0.5" className="text-text-muted" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
