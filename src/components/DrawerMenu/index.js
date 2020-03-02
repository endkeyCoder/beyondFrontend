import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import React, { useContext } from 'react';

import './styles.css';

export default function DrawerMenu({ stateDrawer }) {
    const { showDrawer, setshowDrawer } = stateDrawer;


    const toggleDrawer = (event) => {


        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setshowDrawer({ ...showDrawer, show: !showDrawer.show })
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
                        {['Configurações', 'Logout'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
