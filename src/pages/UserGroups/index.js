import React, { useState } from 'react';
import UserGroupSelect from '../../components/UserGroupsSelect';
import UserGroupList from '../../components/UserGroupsList';
import MenuBar from '../../components/MenuBar';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import UserGroupsPost from '../../components/UserGroupsPost';
// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
    btnUserGroup: {
        padding: '0.5em',
        background: 'linear-gradient(45deg, #008000 30%, #1C1C1C 90%)',
        color: 'white',
        fontSize: '13px',
        '&:hover': {
            backgroundColor: 'green'
        },
    }
}))


export default function UserGroups() {
    const [selectGroup, setSelectGroup] = useState({
        disabled: false
    });
    const [openDialog, setOpenDialog] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    return (
        <>
            <MenuBar />
            <div>
                <h1>Grupos de usuário</h1>
                <UserGroupSelect stateSelectedGroup={{ selectGroup, setSelectGroup }} />
                <UserGroupList stateSelectedGroup={{ selectGroup, setSelectGroup }} />
                <Button onClick={handleClickOpen} className={classes.btnUserGroup}>Novo grupo<sup><Add fontSize="small" /></sup></Button>
                <UserGroupsPost stateDialog={{ openDialog, setOpenDialog }} />
            </div>
        </>
    );
}
