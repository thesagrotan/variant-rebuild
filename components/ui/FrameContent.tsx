import React from 'react';

interface FrameContentProps {
    type: 'image' | 'video';
    src: string;
}

export const FrameContent: React.FC<FrameContentProps> = ({ type, src }) => {
    return (
        <div className="w-full h-full bg-[var(--frame-bg)] relative overflow-hidden group">
            {type === 'video' ? (
                <video
                    src={src}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        touchAction: 'none',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        cursor: 'hand',

                    }}
                />
            ) : (
                <img
                    src={src}
                    alt="Frame content"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    style={{
                        touchAction: 'none',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        cursor: 'hand',
                    }}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-solid)]/30 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
