import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import Typografy from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'

import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipse',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    spacer: {
        flex: 1
    }
})

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText="Configuration"
            leftIcon={<SettingsIcon/>}
            onClick={props.onClick}
            sidebarIsOpen
        />
    )
})

const CustomUserMenu = (props: any) => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
)

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
            <Typografy
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <MenuItem component="a" href="http://nicheplayer-dev.audioware.nl">Go Back</MenuItem>
        </AppBar>
    )
}

export default MyAppBar;