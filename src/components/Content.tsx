import React from 'react';
import { TableHeadMemo } from './TableHead';
import { TableBody } from './TableBody';
import { ArrowIcon } from './ArrowIcon/ArrowIcon';
import { SearchForm } from './SearchForm';
import { DescriptionBlock } from './DescriptionBlock';
import { RowAdditionFormMemo } from './RowAdditionForm';
import { Dropdown } from './Dropdown';
import { getTableCell, getTableRow, ITableRow } from '../utils/getTableRowAndCells';
import { getNextTableRow, getAllRowValues } from '../utils/helpers';
import { IResponseItem, TResponseKeys } from '../App';
import { TSortFn } from '../utils/sortFunctions';
import styles from './content.css';

const firstVisibleRowOfTable = 0;
const lastVisibleRowOfTable = 49;

export interface ITableHeaders {
    mainHeaders: TResponseKeys[];
    addressHeaders: TResponseKeys[];
    allHeaders: TResponseKeys[];
}

interface IVisibleTableRows {
    firstVisibleTableRow: number;
    lastVisibleTableRow: number;
}

interface IDescriptionBlockState {
    isShownDescriptionBlock: boolean;
    descriptionBlockValues: (string | number)[];
}

interface IAppProps {
    response: IResponseItem[];
}

export const App = ({ response }: IAppProps) => {
    const [ tableValues, setTableValues ] = React.useState<ITableRow[]>([]);
    const [ reserveTableValues, setReserveTableValues ] = React.useState<ITableRow[]>([]);
    const [ tableHeaders, setTableHeaders ] = React.useState<ITableHeaders>({
        mainHeaders: [],
        addressHeaders: [],
        allHeaders: []
    });
    const { allHeaders } = tableHeaders;
    const [ descriptionBlockState, setDescriptionBlockState ] = React.useState<IDescriptionBlockState>({
        isShownDescriptionBlock: false,
        descriptionBlockValues: []
    });
    const { isShownDescriptionBlock, descriptionBlockValues } = descriptionBlockState;
    const [ visibleTableRows, setVisibleTableRows ] = React.useState<IVisibleTableRows>({
        firstVisibleTableRow: firstVisibleRowOfTable,
        lastVisibleTableRow: lastVisibleRowOfTable
    });
    const { firstVisibleTableRow, lastVisibleTableRow } = visibleTableRows;

    React.useEffect(() => {
        const mainHeaders = Object.keys(response[0]) as TResponseKeys[];
        const addressHeaders = Object.keys(response[0].address) as TResponseKeys[];
        setTableHeaders({
            mainHeaders: mainHeaders,
            addressHeaders: addressHeaders,
            allHeaders: getAllRowValues(mainHeaders, addressHeaders)
        });

        const tableValues = response.map((item) => {
            const mainValues = Object.values(item) as (string | number)[];
            const addressValues = Object.values(item.address) as (string | number)[];
            const rowValues = getAllRowValues(mainValues, addressValues);
            const tableCells = rowValues.map(getTableCell());

            return getTableRow(rowValues, () => fillDescriptionBlock(rowValues), tableCells);
        });
        setTableValues(tableValues);
        setReserveTableValues(tableValues);
    }, []);

    const handleSort = (key: TResponseKeys, sortBy: TSortFn) => {
        setTableValues((prevTableValues) => {
            return prevTableValues.slice().sort(sortBy(allHeaders.indexOf(key)));
        });
        setReserveTableValues((prevReserveTableValues) => {
            return prevReserveTableValues.slice().sort(sortBy(allHeaders.indexOf(key)));
        });
    };

    const goToPrevious = () => {
        setVisibleTableRows(({ firstVisibleTableRow, lastVisibleTableRow }) => ({
            firstVisibleTableRow: getNextTableRow(firstVisibleTableRow, firstVisibleRowOfTable),
            lastVisibleTableRow: getNextTableRow(lastVisibleTableRow, lastVisibleRowOfTable)
        }));
    };

    const goToNext = () => {
        setVisibleTableRows(({ firstVisibleTableRow, lastVisibleTableRow }) => ({
            firstVisibleTableRow: firstVisibleTableRow + 50,
            lastVisibleTableRow: lastVisibleTableRow + 50
        }));
    };

    const handleFilter = (value: string) => {
        setTableValues(reserveTableValues.filter((item) => {
            return item.rowValues.find((item) => String(item).includes(value));
        }));
        setVisibleTableRows({
            firstVisibleTableRow: firstVisibleRowOfTable,
            lastVisibleTableRow: lastVisibleRowOfTable
        });
    };

    const fillDescriptionBlock = (arr: (string | number)[]) => {
        if (!String(window.getSelection())){
            setDescriptionBlockState({
                isShownDescriptionBlock: true,
                descriptionBlockValues: arr
            });
        }
    };

    const handleSubmit = (arr: (string | number)[]) => {
        const newTableCells = arr.map(getTableCell());
        setTableValues([getTableRow(arr, () => fillDescriptionBlock(arr), newTableCells)].concat(tableValues));
        setReserveTableValues([getTableRow(arr, () => fillDescriptionBlock(arr), newTableCells)].concat(reserveTableValues));
        setVisibleTableRows({
            firstVisibleTableRow: firstVisibleRowOfTable,
            lastVisibleTableRow: lastVisibleRowOfTable
        });
    };

    const filteredTableValues = tableValues.filter((item, index) => {
        return index >= firstVisibleTableRow && index <= lastVisibleTableRow;
    });

    if (allHeaders.length) {
        return (
            <div className={styles.container}>
                <div className={styles.flex}>
                    <Dropdown button={<button className={styles.addButton}>Добавить</button>}>
                        <RowAdditionFormMemo allHeaders={allHeaders} handleSubmit={handleSubmit} />
                    </Dropdown>
                    <SearchForm handleFilter={handleFilter} />
                </div>
                <table>
                    <TableHeadMemo tableHeaders={tableHeaders} sortFn={handleSort} />
                    <TableBody tableValues={filteredTableValues} />
                </table>
                {isShownDescriptionBlock && (
                    <DescriptionBlock values={descriptionBlockValues} />
                )}
                <div className={styles.flex}>
                    <button
                        onClick={goToPrevious}
                        className={!firstVisibleTableRow ? 'noActive' : ''}
                    >
                        <ArrowIcon className={styles.previousButton} />
                    </button>
                    <button
                        onClick={goToNext}
                        className={(lastVisibleTableRow >= tableValues.length - 1) ? 'noActive' : ''}
                    >
                        <ArrowIcon className={styles.nextButton} />
                    </button>
                </div>
            </div>
        );
    } else return null;
}
