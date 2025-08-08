import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Book,
  Money,
  Settings,
} from "@mui/icons-material";
import Image from 'next/image'
import logo from './logo.png'

const drawerWidth = 300;

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  ...(!open && {
    "& .MuiDrawer-paper": {
      overflowX: "hidden",
      width: `calc(${theme.spacing(7)} + 1px)`,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }),
}));

const ElegantSidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Alunos", icon: <PeopleIcon /> },
    { text: "Dashboard (visão geral)", icon: <HomeIcon /> },
    { text: "Aulas", icon: <Book /> },
    { text: "Financeiro", icon: <Money /> },
    { text: "Configurações", icon: <Settings /> },
  ];

  return (
    <>
      <StyledDrawer variant="permanent" open={open}>
        <div className="flex justify-center">
          <Image
            src={logo} // Substitua pelo seu logo
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </div>
        {/* <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-end" : "center",
            px: [1],
            minHeight: "64px !important",
          }}
        >
          {open ? (
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar> */}

        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </StyledDrawer>
    </>
  );
};

export default ElegantSidebar;
