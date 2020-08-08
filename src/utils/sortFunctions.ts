import { ITableRow } from './getTableRowAndCells';

export function sortAscending<K extends keyof ITableRow, T extends keyof ITableRow["rowValues"]>(key: T) {
    return <O extends Record<K, any>>(a: O[K], b: O[K]) => (a["rowValues"][key] < b["rowValues"][key]) ? -1 : 1;
};

export function sortDescending<K extends keyof ITableRow, T extends keyof ITableRow["rowValues"]>(key: T) {
    return <O extends Record<K, any>>(a: O[K], b: O[K]) => (b["rowValues"][key] > a["rowValues"][key]) ? 1 : -1;
};

export type TSortFn = typeof sortAscending | typeof sortDescending;
