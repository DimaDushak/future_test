import React from 'react'; 
import { GenericList } from '../GenericList';
import { TResponseKeys } from '../../App';
import { ITableHeaders } from '../Content';
import { generateRandomString } from '../../utils/generateRandomString';
import { sortAscending, sortDescending, TSortFn } from '../../utils/sortFunctions';
import { THeadCellContentMemo } from '../THeadCellContent';
import styles from './tablehead.css';

interface ITableHeadProps {
    tableHeaders: ITableHeaders;
    sortFn: (key: TResponseKeys, sortBy: TSortFn) => void;
}

interface ITableHeadList {
    As: 'th';
    id: string;
    rowSpan?: number;
    colSpan?: number;
    content: string | React.ReactNode;
}

export const TableHeadMemo = React.memo(function TableHead(props: ITableHeadProps) {
    const { tableHeaders, sortFn } = props;
    const [ sortingKey, setSortingKey ] = React.useState('');
    const { mainHeaders, addressHeaders } = tableHeaders;

    const getTableHeadCell = (arr: TResponseKeys[]) => {
        return arr.map((item: TResponseKeys) => ({
            As: 'th' as const,
            id: generateRandomString(),
            content: (item == 'address') ? item :
                         (<THeadCellContentMemo
                             sortAsc={() => sortFn(item, sortAscending)}
                             sortDesc={() => sortFn(item, sortDescending)}
                             content={item}
                             sortingKey={sortingKey}
                             setSortingKey={setSortingKey}
                         />)
        }))
    };

    const mainList = getTableHeadCell(mainHeaders).map((item: ITableHeadList) => ({
        ...item,
        rowSpan: (item.content == 'address') ? 1 : 2,
        colSpan: (item.content == 'address') ? 4 : 1
    }));

    return (
        <thead>
            <tr className={styles.firstRow}>
                <GenericList list={mainList} />
            </tr>
            <tr className={styles.secondRow}>
                <GenericList list={getTableHeadCell(addressHeaders)} />
            </tr>
        </thead>
    );
}, function areEqual(prevProps: ITableHeadProps, nextProps: ITableHeadProps) {
    return prevProps !== nextProps;
});
