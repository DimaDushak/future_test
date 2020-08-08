import React from 'react';
import styles from './searchform.css';

interface ISearchFormProps {
    handleFilter: (value: string) => void;
}

export function SearchForm({ handleFilter }: ISearchFormProps) {
    const [ inputValue, setInputValue ] = React.useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleFilter(inputValue.trim());
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="Поиск"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
            />
            <button className={styles.button}>Найти</button>
        </form>
    );
}
