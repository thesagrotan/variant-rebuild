import React from 'react';

interface FrameContentProps {
    type: 'image' | 'video';
    src: string;
}

export const FrameContent: React.FC<FrameContentProps> = ({ type, src }) => {
    return (
        <div className="w-full h-full bg-black/20 relative overflow-hidden group">
            {type === 'video' ? (
                <video
                    src={src}
                    className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <img
                    src={src}
                    alt="Frame content"
                    className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
