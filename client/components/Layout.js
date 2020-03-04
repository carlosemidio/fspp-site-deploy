import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { logout, isAuthenticated } from '../services/auth'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));

const MyToolbar = ({ classes, title, onMenuClick }) => (
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
          {/* {isAuthenticated() && <Button color="inherit" onClick={() => logout()}>Logout</Button>} */}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
);


export default function Layout({ children, title = 'Home' }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    drawerOpen: false,
  });

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, drawerOpen: !open });
  };

  const sideList = () => (
    <div
      className={classes.drawerPaper}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/noticias">
          <ListItem button key="news">
            <ListItemIcon><AnnouncementIcon /></ListItemIcon>
            <ListItemText primary="Notícias" />
          </ListItem>
        </Link>
      </List>
      {isAuthenticated() && 
          (<><Divider />
          <ListSubheader>Sistema</ListSubheader>
          <List>
            <Link href="/admin/dashboard">
              <MenuItem button>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </MenuItem>
            </Link>
            <Link href="/admin/usuarios">
              <MenuItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText>Usuários</ListItemText>
              </MenuItem>
            </Link>
            <Link href="/admin/noticias">
              <MenuItem button>
                <ListItemIcon>
                  <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText>Notícias</ListItemText>
              </MenuItem>
            </Link>
          </List></>)}
    </div>
  );

  return (
    <div>
      <MyToolbar classes={classes} title={title} onMenuClick={toggleDrawer(state.drawerOpen)} />
      <SwipeableDrawer
        open={state.drawerOpen}
        onClose={toggleDrawer(state.drawerOpen)}
        onOpen={toggleDrawer(state.drawerOpen)}
      >
        {sideList()}
      </SwipeableDrawer>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}