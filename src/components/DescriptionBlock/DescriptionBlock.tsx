import React from 'react';
import styles from './descriptionblock.css';

interface IDescriptionBlock {
    values: (string | number)[];
}

export function DescriptionBlock({ values }: IDescriptionBlock) {
    return (
        <div className={styles.description}>
            <p>Выбран пользователь <b>{values[1]} {values[2]}</b></p>
            <p>Описание:</p>
            <textarea value={values[9]} readOnly></textarea>
            <p>Адрес проживания: <b>{values[5]}</b></p>
            <p>Город: <b>{values[6]}</b></p>
            <p>Провинция/штат: <b>{values[7]}</b></p>
            <p>Индекс: <b>{values[8]}</b></p>
        </div>
    );
}
