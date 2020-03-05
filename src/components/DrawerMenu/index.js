import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import React from 'react';


import './styles.css';

export default function DrawerMenu({ stateDrawer }) {
    const { showDrawer, setshowDrawer } = stateDrawer;

    const toggleDrawer = (event) => {


        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setshowDrawer({ ...showDrawer, show: !showDrawer.show })
    }

    function logout() {
        sessionStorage.removeItem('sessionUser')
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
                        {['Produtos', 'Clientes', 'Terapeutas', 'Agendamentos'].map((text, index) => {
                            const links = ['products', 'clients', 'sallers', 'schedules']
                            return (
                                <ListItem button key={text}>
                                    <a href={links[index]}><ListItemText primary={text} /></a>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemText primary="Configurações" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
