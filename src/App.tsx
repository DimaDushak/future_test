import React from 'react';
import { App } from './components/Content';
import { Loading } from './components/Loading';

export type TResponseKeys = keyof IResponseItem | keyof IAddress;

export interface IAddress {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
}

export interface IResponseItem {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: IAddress;
    description: string;
}

interface IAppProps {
    requestLink: string;
}

export const AppContainer = ({ requestLink }: IAppProps) => {
    const [ response, setResponse ] = React.useState<IResponseItem[]>([]);

    React.useEffect(() => {
        window.fetch(requestLink)
            .then((response) => {
                return response.json();
            }, (error) => {
                console.log('Error: ' + error.message);
            })
            .then((response: IResponseItem[]) => {
                setResponse(response);
            });
    }, []);

    if (response.length) {
        return <App response={response} />;
    } else return <Loading />;
}
