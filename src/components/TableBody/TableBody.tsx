import React from 'react';
import { ITableRow } from '../../utils/getTableRowAndCells';
import { GenericList } from '../GenericList';
import styles from './tablebody.css';

interface ITableBodyProps {
    tableValues: ITableRow[];
}

export function TableBody({ tableValues }: ITableBodyProps) {
    return (
        <>
            <tbody className={styles.tableBody}>
                {
                    (tableValues.length) ? <GenericList list={tableValues} /> :
                        <tr>
                            <td colSpan={10} className={styles.nothingFoundCell}>
                                К сожалению ничего не найдено
                            </td>
                        </tr>
                }
            </tbody>
        </>
    );
}
