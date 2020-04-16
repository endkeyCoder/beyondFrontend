import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import apiBeyond from '../../config/apiBeyond';

import { useDispatch } from 'react-redux';
import { setGroup, setPermissionsGroup } from '../../config/redux/actions'

const useStyles = makeStyles({
    containerInputText: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    headerDialog: {
        display: 'flex'
    }
});

export default function UserGroupsPost({ stateDialog }) {
    const { openDialog, setOpenDialog } = stateDialog;
    const [titleUserGroup, setTitleUsergroup] = useState('');
    const [descriptionUsergroup, setDescriptionUsergroup] = useState('');
    const [optionsUsergroup, setOptionsUsergroup] = useState({
        allPermissions: false
    })
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleOptionsUsergroup = () => {
        setOptionsUsergroup({
            allPermissions: !optionsUsergroup.allPermissions
        })
    }

    const handleTitle = (title) => {
        setTitleUsergroup(title)
    }
    const handleDescription = (description) => {
        setDescriptionUsergroup(description)
    }

    const handleSubmitUsergroup = async (e) => {
        e.preventDefault();
        if (titleUserGroup !== '') {
            try {
                const resUsergroup = await apiBeyond.post('/setUserGroup', {
                    data: {
                        name: titleUserGroup,
                        description: descriptionUsergroup
                    },
                    options: optionsUsergroup
                })
                if (resUsergroup.data.message.statusCode == 200) {
                    dispatch(setGroup(resUsergroup.data.data))
                    dispatch(setPermissionsGroup(resUsergroup.data.permissions))
                    handleClose();
                }
            } catch (error) {
                console.log('print de error em handleSubmitUsergroup => ', error)
                alert('problema ao gravar grupo')
            }
        } else {
            alert('O grupo precisa de um nome')
        }
    }

    const classes = useStyles();

    return (

        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
            <div className={classes.headerDialog}>
                <DialogTitle id="form-dialog-title">
                    Registro de um novo grupo
            </DialogTitle>
                <FormControlLabel
                    control={<Switch
                        checked={optionsUsergroup.allPermissions}
                        onChange={() => handleOptionsUsergroup()}
                    />}
                    label="Habilitar todas permissões*"
                />
            </div>
            <DialogContent>
                <DialogContentText>
                    Ao cadastrar um novo grupo esteja certo da real necessidade administrativa para sua criação.
                </DialogContentText>
                <div className={classes.containerInputText}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="textUsergroup"
                        label="Nome do grupo"
                        type="text"
                        required
                        onChange={(e) => handleTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="textUsergroup"
                        label="Descrição para o grupo"
                        type="text"
                        multiline
                        onChange={(e) => handleDescription(e.target.value)}
                    />
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmitUsergroup} color="primary">
                    Cadastrar
          </Button>
            </DialogActions>
        </Dialog>

    );
}
