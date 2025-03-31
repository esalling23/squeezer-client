import React, { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import builderSections from '../builderStaticInputs';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer({
	setSection
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
		setSection(Object.keys(builderSections)[0])
	}, [setSection])

  const handleToggleDrawer = () => {
    setOpen(curr => !curr);
  };

  const drawerOptions = useMemo(() => {
    return Object.keys(builderSections).map((key, index) => {
      const { icon: Icon } = builderSections[key]
      return (
        <ListItem key={key} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => setSection(key)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? { justifyContent: 'initial' }
                : { justifyContent: 'center' },
            ]}
          >
            <ListItemIcon
              sx={[
                { minWidth: 0, justifyContent: 'center' },
                open? { mr: 3 } : { mr: 'auto' },
              ]}
            >
              <Icon fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              primary={key[0].toUpperCase() + key.slice(1)}
              sx={[
                open? { opacity: 1 } : { opacity: 0 },
              ]}
            />
          </ListItemButton>
        </ListItem>
      )
    })
  }, [open, setSection])

  return (
    <>
      <Drawer variant="permanent" open={open} sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
						width: open ? drawerWidth : 60,
						boxSizing: 'border-box',
						position: "relative",
					},
        }}>
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerOptions}
        </List>
      </Drawer>
    </>
  );
}
