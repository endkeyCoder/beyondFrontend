import React, { useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Add, Visibility, Create, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { setPermissionsGroup } from '../../config/redux/actions'
import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '1em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3em',
    minWidth: 0,
    height: '3em',
    '& span': {
      margin: 0
    },
    marginRight: '1em'
  },
  header: {
    display: 'flex'
  },
  btnRecord: {
    marginLeft: '1em',
    borderRadius: '5px',
    width: '15em',
  },
  headerPanel: {
    background: '#E6E6FA'
  }
}));

export default function UserGroupsList(props) {
  const permissionsGroup = useSelector(state => state.groupsReducer.groups.permissions);
  const [btnRecord, setBtnRecord] = useState({
    disabled: true
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setSelectGroup } = props.stateSelectedGroup;
  function handlePermissionAdd(entityId) {
    const attPermissionAdd = permissionsGroup.map(permission => {
      if (permission.entityId == entityId) {
        permission.add = !permission.add
      }
      return permission
    })
    dispatch(setPermissionsGroup(attPermissionAdd))
    setBtnRecord({ disabled: false })
    setSelectGroup({ disabled: true })
  }
  function handlePermissionRead(entityId) {
    const attPermissionRead = permissionsGroup.map(permission => {
      if (permission.entityId == entityId) {
        permission.read = !permission.read
      }
      return permission
    })
    dispatch(setPermissionsGroup(attPermissionRead))
    setBtnRecord({ disabled: false })
    setSelectGroup({ disabled: true })
  }
  function handlePermissionUpdate(entityId) {
    const attPermissionUpdate = permissionsGroup.map(permission => {
      if (permission.entityId == entityId) {
        permission.update = !permission.update
      }
      return permission
    })
    dispatch(setPermissionsGroup(attPermissionUpdate))
    setBtnRecord({ disabled: false })
    setSelectGroup({ disabled: true })
  }
  function handlePermissionDelete(entityId) {
    const attPermissionDelete = permissionsGroup.map(permission => {
      if (permission.entityId == entityId) {
        permission.delete = !permission.delete
      }
      return permission
    })
    dispatch(setPermissionsGroup(attPermissionDelete))
    setBtnRecord({ disabled: false })
    setSelectGroup({ disabled: true })
  }
  async function handleBtnRecord(evt) {
    evt.preventDefault();
    try {
      const resSetPermissions = await apiBeyond.put('/putPermissions', permissionsGroup);
      if (resSetPermissions.data.message.statusCode == 200) {
        setBtnRecord({
          disabled: true
        })
        setSelectGroup({
          disabled: false
        })
      } else {
        alert('problema ao atualizar as permissões')
        console.log('print de resSetPermissions => ', resSetPermissions.data)
      }
    } catch (error) {
      console.log('print de erro em handleBtnRecord => ', handleBtnRecord);
      alert('Problema ao gravar permissões, tente novamente')
    }
  }

  const MyButton = styled(({ myRef, ...rest }) => {
    return (<Button {...rest} />)
  })({
    background: (props) => {
      if (props.granted) {
        return 'green'
      } else {
        return 'red'
      }
    },
    '&:hover': {
      background: (props) => {
        if (props.granted) {
          return '#006400'
        } else {
          return '#8B0000'
        }
      }
    },
  })

  const showPermissions = () => permissionsGroup.map(permission => {
    const { entity } = permission;
    return (
      <ExpansionPanel className={classes.headerPanel} key={entity[0].id}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={entity[0].id}
        >
          <Typography className={classes.heading}>{entity[0].auxiliaryName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MyButton id={permission.entityId} onClick={(e) => handlePermissionAdd(e.target.id)} granted={permission.add} variant="contained" color="default" className={classes.button} startIcon={<Add id={permission.entityId} />} />
          <MyButton id={permission.entityId} onClick={(e) => handlePermissionRead(e.target.id)} granted={permission.read} variant="contained" color="default" className={classes.button} startIcon={<Visibility id={permission.entityId} />} />
          <MyButton id={permission.entityId} onClick={(e) => handlePermissionUpdate(e.target.id)} granted={permission.update} variant="contained" color="default" className={classes.button} startIcon={<Create id={permission.entityId} />} />
          <MyButton id={permission.entityId} onClick={(e) => handlePermissionDelete(e.target.id)} granted={permission.delete} variant="contained" color="default" className={classes.button} startIcon={<Delete id={permission.entityId} />} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  })
  console.log('print de permissionsGroup em groupList => ', permissionsGroup)
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h3>Lista de funcionalidades</h3>
        <Button onClick={(e) => handleBtnRecord(e)} disabled={btnRecord.disabled} variant='outlined' className={`${classes.btnRecord} ${classes.button}`}>Gravar Alterações</Button>
      </div>
      {
        showPermissions()
      }

    </div>
  );
}
