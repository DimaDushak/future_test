import React from 'react';
import styles from './loading.css';

export function Loading() {
    return (
        <div className={styles.loading + ' center'}>Загрузка</div>
    );
}
