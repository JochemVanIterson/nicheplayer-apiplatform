import { ReduxState, Record, Identifier } from 'react-admin';


export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

declare global {
    interface Window {
        restServer: any;
    }
}