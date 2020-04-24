import { Drawer, List, Divider, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

export default function DrawerMenu({ stateDrawer }) {
    const { showDrawer, setshowDrawer } = stateDrawer;
    const [openSettings, setOpenSettings] = useState(false);

    const permissions = useSelector(state => state.userReducer.user.permissions)

    const toggleSettings = () => {
        setOpenSettings(!openSettings)
    }

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        } else if (event.type === 'click') {
            const arrTarget = Object.values(event.target).map(value => {
                return value;
            })
            const [x, option] = arrTarget

            if ('children' in option && (option.children !== undefined)) {
                return
            }
            setshowDrawer({ ...showDrawer, show: !showDrawer.show })
        }
        setshowDrawer({ ...showDrawer, show: !showDrawer.show })
    }

    const isConfigurable = () => {
        return permissions.find(permission => {
            const { entity } = permission;
            return ((entity[0].name == 'settings') && (permission.add || permission.read || permission.update || permission.delete))
        })
    }

    const optionsSettings = () => {
        return permissions.map(((permission, index) => {
            const { name, auxiliaryName } = permission.entity[0];
            if (isConfigurable()) {
                if (isOption(permission)) {
                    switch (name) {
                        case 'schedulings':
                            return false;
                        case 'settings':
                            return false;
                        case 'audit':
                            return false;
                        case 'schedule':
                            return false;
                        default:

                            return (
                                <Link key={`${index}-${name}`} to={{ pathname: name }}>
                                    <ListItem button>
                                        <ListItemText primary={auxiliaryName} />
                                    </ListItem>
                                </Link>
                            )

                    }
                }
            } else {
                return false;
            }
        }))
    }

    const isOption = (permission) => {
        if (permission.add || permission.read || permission.update || permission.delete) {
            return true;
        } else {
            return false;
        }
    }

    const optionsDrawer = () => {
        return permissions.map((permission, index) => {
            const { auxiliaryName, name } = permission.entity[0];
            if (isOption(permission)) {
                switch (name) {
                    case 'settings':
                        return false;
                    case 'users':
                        return false
                    case 'usergroups':
                        return false;
                    case 'generalSettings':
                        return false;
                    default:
                        return (
                            <Link key={`${index}-${name}`} to={{ pathname: name }}>
                                <ListItem button>
                                    <ListItemText primary={auxiliaryName} />
                                </ListItem>
                            </Link>
                        )
                }
            }
        })
    }

    return (
        <div>

            <Drawer open={showDrawer.show} onClose={(evt) => toggleDrawer(evt)}>
                <div
                    role="presentation"
                    onClick={(evt) => toggleDrawer(evt)}
                    onKeyDown={(evt) => toggleDrawer(evt)}
                >
                    <List>
                        {
                            optionsDrawer()
                        }
                    </List>
                    <Divider />
                    <List>
                        {
                            isConfigurable() !== undefined ? <ListItem button onClick={toggleSettings}>
                                <ListItemText primary='Configurações' />
                                {openSettings ? <ExpandLess /> : <ExpandMore />}
                            </ListItem> : false
                        }
                        <Collapse in={openSettings} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    optionsSettings()
                                }
                            </List>
                        </Collapse>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
