import React from 'react';

interface LogoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'small' }) => {
    const sizeClasses = {
        small: 'h-8',
        medium: 'h-12',
        large: 'h-16'
    };

    return (
        <div className={`logo-container ${className}`}>
            <img
                src="/stockearce-logo.png"
                alt="STOCKEARCE - Distribuidora Mayorista"
                className={`logo-image ${sizeClasses[size]} w-auto object-contain`}
            />
        </div>
    );
};
