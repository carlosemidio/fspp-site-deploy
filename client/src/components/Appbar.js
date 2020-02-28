import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';

import { isAuthenticated, logout } from "../services/auth";
import Routes from '../routes';

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  },
  active: {
    backgroundColor: theme.palette.action.selected
  }
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
          {isAuthenticated() && <Button color="inherit" onClick={logout}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick, selected }) => (
    <Router history={history}>
      <Drawer 
        variant={variant} 
        open={open} 
        onClose={onClose}          
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === 'persistent'
          })}
        />
        <List>
          <MenuItem button component={Link} to="/" onClick={onItemClick('Home', 0)} selected={selected === 0}>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem button component={Link} to="/noticias" onClick={onItemClick('Notícias', 1)} selected={selected === 1}>
            <ListItemText>Notícias</ListItemText>
          </MenuItem>
        </List>
        {isAuthenticated() && 
          (<><Divider />
          <ListSubheader>Sistema</ListSubheader>
          <List>
            <MenuItem button component={Link} to="/admin/dashboard" onClick={onItemClick('Dashboard', 2)} selected={selected === 2}>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
            <MenuItem button component={Link} to="/admin/usuarios" onClick={onItemClick('Usuários', 3)} selected={selected === 3}>
              <ListItemText>Usuários</ListItemText>
            </MenuItem>
            <MenuItem button component={Link} to="/admin/noticias" onClick={onItemClick('Notícias', 4)} selected={selected === 4}>
              <ListItemText>Notícias</ListItemText>
            </MenuItem>
          </List></>)}
      </Drawer>
      <main className={classes.content}>
        <Routes />
      </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('Home');
  const [selected, setSelected] = useState(0);

  const toggleDrawer = () => {
    setDrawer(!drawer);  
  };

  const onItemClick = (title, selected) => () => {
    setTitle(title);
    setSelected(selected);
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
        selected={selected}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);