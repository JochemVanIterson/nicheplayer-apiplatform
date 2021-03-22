import * as React from 'react';
import { Layout, LayoutProps, Sidebar } from 'react-admin';
import MyAppBar from './MyAppBar'
import MyMenu from './MyMenu';
import MyTheme from './MyTheme';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: LayoutProps) => {
    return (
        <Layout
            {...props}
            appBar={MyAppBar}
            sidebar={CustomSidebar}
            menu={MyMenu}
            theme={MyTheme}
        />
    );
};