import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, IconButton, CssBaseline, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, Person as PersonIcon, Report as ReportIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#1A237E', // Navy blue background color
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#FF6F61', // Light coral color for menu button
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#FF6F61', // Light coral background color for drawer
    color: '#1A237E', // Navy blue text color for drawer
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '#FF6F61', // Light coral background color for closed drawer
    color: '#1A237E', // Navy blue text color for drawer
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    backgroundColor: '#F5F5F5', // Light background for content area
    minHeight: '100vh',
  },
  title: {
    flexGrow: 1,
    color: '#FF6F61', // Light coral color for title
  },
  logoutButton: {
    backgroundColor: '#1A237E', // Navy blue background for logout button
    color: '#FF6F61', // Light coral text color for logout button
    marginLeft: 'auto',
  },
  icon: {
    color: '#1A237E', // Navy blue color for icons
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert('Error logging out: ' + error.message);
      } else {
        navigate('/'); // Navigate to the home page after logout
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Check the console for details.');
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon className={classes.icon} />, path: '/dashboard' },
    { text: 'Users', icon: <PersonIcon className={classes.icon} />, path: '/users' },
    { text: 'Reports', icon: <ReportIcon className={classes.icon} />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon className={classes.icon} />, path: '/settings' },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button className={classes.logoutButton} onClick={handleLogout}>
            Logout
            <ExitToAppIcon style={{ color: '#FF6F61' }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: '#1A237E' }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
      </main>
    </div>
  );
}
