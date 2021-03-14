import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
} from 'react-admin';

import Albums from '../Albums';
import MediaObjects from '../MediaObjects';
import Songs from '../Songs';
import Sources from '../Sources';
import Users from '../Users';

import SubMenu from './SubMenu';
import { AppState } from '../types';

type MenuName = 'menuMedia' | 'menuAlbums';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
    const [state, setState] = useState({
        menuMedia: true,
        menuAlbums: true,
    });
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <MenuItemLink
                to={`/users`}
                primaryText="Users"
                leftIcon={<Users.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <SubMenu
                handleToggle={() => handleToggle('menuAlbums')}
                isOpen={state.menuAlbums}
                sidebarIsOpen={open}
                name="Albums"
                icon={<Albums.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/albums`}
                    primaryText="Albums"
                    leftIcon={<Albums.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/songs`}
                    primaryText="Songs"
                    leftIcon={<Songs.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuMedia')}
                isOpen={state.menuMedia}
                sidebarIsOpen={open}
                name="Media"
                icon={<MediaObjects.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/media_objects`}
                    primaryText="Media"
                    leftIcon={<MediaObjects.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/sources`}
                    primaryText="Sources"
                    leftIcon={<Sources.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText="Configuration"
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;