import React from 'react';

export interface IGenericListItem {
    As?: 'li' | 'th' | 'td' | 'tr' | 'label';
    id: string;
    rowSpan?: number;
    colSpan?: number;
    content: string | React.ReactNode;
    onClick?: () => void;
    className?: string;
}

interface IGenericListProps {
    list: IGenericListItem[];
}

const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'li', rowSpan, colSpan, onClick = NOOP, id, content, className }) => (
                <As
                    key={id}
                    onClick={onClick}
                    className={className}
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                >{content}</As>
            ))}
        </>
    );
}
