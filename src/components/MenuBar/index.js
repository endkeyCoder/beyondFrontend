import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../config/redux/actions'

import DrawerMenu from '../DrawerMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showDrawer, setshowDrawer] = useState({
    show: false
  })

  const toggleDrawer = (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      console.log('print de toggleDrawer em MenuBar => ', event.type);
      return;
    }

    setshowDrawer({ ...showDrawer, show: !showDrawer.show })
  }

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={(evt) => toggleDrawer(evt)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to={{ pathname: "/" }}>Beyond System</Link>
          </Typography>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <DrawerMenu stateDrawer={{ showDrawer, setshowDrawer }} />
    </div>
  );
}