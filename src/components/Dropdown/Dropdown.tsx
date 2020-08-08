import React from 'react';
import styles from './dropdown.css';

interface IDropdownProps {
    button: React.ReactNode;
    children: React.ReactNode;
}

export function Dropdown({ button, children }: IDropdownProps) {
    const [ isDropdownOpen, setIsDropdownOpen ] = React.useState(false);

    return (
        <div className={styles.container}>
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {button}
            </div>
            {isDropdownOpen && (
                <div className={styles.listContainer}>
                    <div
                        className={styles.list}
                        onSubmit={(e: React.SyntheticEvent) => {
                            e.preventDefault();
                            setIsDropdownOpen(false);
                        }}
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
