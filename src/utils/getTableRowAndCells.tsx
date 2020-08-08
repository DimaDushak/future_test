import React from 'react';
import { generateRandomString } from './generateRandomString';
import { GenericList } from '../components/GenericList';

export interface ITableCell {
    As: 'td';
    id: string;
    content: string | number;
}

export interface ITableRow {
    rowValues: (string | number)[];
    As: 'tr';
    id: string;
    onClick: () => void;
    content: React.ReactNode;
}

export const getTableCell = () => {
    return (item: string | number): ITableCell => ({
        As: 'td' as const,
        id: generateRandomString(),
        content: item
    });
};

export const getTableRow = (rowValues: (number | string)[], fn: () => void, tableCells: ITableCell[]): ITableRow => ({
    rowValues: rowValues,
    As: 'tr' as const,
    id: generateRandomString(),
    onClick: fn,
    content: <GenericList list={tableCells} />
});
