import React from 'react';

interface IArrowIconProps {
    className: string;
}

export function ArrowIcon({ className }: IArrowIconProps) {
    return (
        <svg className={className} width="15" height="7" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9"/>
        </svg>
    );
}
