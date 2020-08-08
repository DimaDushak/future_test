import React from 'react';
import { TResponseKeys } from '../../App';
import { ArrowIcon } from '../ArrowIcon';
import styles from './theadcellcontent.css';

interface IPropTHeadCellContent {
    content: TResponseKeys;
    sortAsc: () => void;
    sortDesc: () => void;
    sortingKey: string;
    setSortingKey: (sortingKey: string) => void;
}

export const THeadCellContentMemo = React.memo(function THeadCellContent(props: IPropTHeadCellContent) {
    const { content, sortAsc, sortDesc, sortingKey, setSortingKey } = props;
    const [ isSortedAsc, setIsSortedAsc ] = React.useState(content == sortingKey);

    return (
        <>
            <span
                className={styles.text}
                onClick={() => {
                    (isSortedAsc) ? sortDesc() : sortAsc();
                    (content == sortingKey) ? setIsSortedAsc(!isSortedAsc) : setSortingKey(content);
                }}
            >
                {content}
            </span>
            {content == sortingKey && (
                <ArrowIcon className={isSortedAsc ? styles.transform : ''} />
            )}
        </>
    );
}, function areEqual(prevProps: IPropTHeadCellContent, nextProps: IPropTHeadCellContent) {
    return prevProps !== nextProps;
});
