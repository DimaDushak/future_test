import React from 'react';
import { TResponseKeys } from '../../App';
import { GenericList } from '../GenericList';
import { generateRandomString } from '../../utils/generateRandomString';
import styles from './rowadditionform.css';

interface IRowAdditionFormProps {
    allHeaders: TResponseKeys[];
    handleSubmit: (arr: (string | number)[]) => void;
}

interface IInputValues {
    [N: string]: string;
}

const inputTypes = ['number', 'text', 'text', 'email', 'number', 'text', 'text', 'text', 'number', 'text'];

export const RowAdditionFormMemo = React.memo(function RowAdditionForm(props: IRowAdditionFormProps) {
    const { allHeaders, handleSubmit } = props;
    const [ inputValues, setInputValues ] = React.useState<IInputValues>({});
    const [ focusedInput, setFocusedInput ] = React.useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setInputValues({
            ...inputValues,
            [name]: value
        });
        setFocusedInput(name);
    };

    React.useEffect(() => {
        setInputValues(Object.fromEntries(allHeaders.map((item) => [item, ''])));
    }, []);

    const inputsList = allHeaders.map((item, index) => ({
        As: 'label' as const,
        id: generateRandomString(),
        content: <>
                    <span>{item}:</span>
                    <input
                        type={inputTypes[index]}
                        value={inputValues[`${allHeaders[index]}`]}
                        autoFocus={focusedInput == item}
                        name={item}
                        onChange={onChange}
                        required
                    />
                </>,
        className: styles.label
    }));

    return (
        <div className={styles.formContainer}>
            <form
                className={styles.form}
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(Object.values(inputValues));
                }}
            >
                <GenericList list={inputsList} />
                <br />
                <button type="submit">Добавить в таблицу</button>
            </form>
            <button className={styles.closeButton}>&#215;</button>
        </div>
    );
}, function areEqual(prevProps: IRowAdditionFormProps, nextProps: IRowAdditionFormProps) {
    return prevProps !== nextProps;
});
