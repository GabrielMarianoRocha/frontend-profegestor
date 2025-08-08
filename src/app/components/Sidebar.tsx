import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  ExitToApp,
  ExitToAppOutlined,
} from "@mui/icons-material";
import Image from 'next/image'
import logo from './logo.png'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [open, setOpen] = useState(true);
  const signOut = () => {
  localStorage.removeItem('usertoken');
  localStorage.removeItem('userId');
  router.push("/")
}

  const menuItems = [
    { text: "Alunos", icon: <PeopleIcon />, onClick: () => console.log('Alunos')},
    { text: "Dashboard (visão geral)", icon: <HomeIcon />, onClick: () => console.log('Dashboard') },
    { text: "Aulas", icon: <Book />, onClick: () => console.log('Aulas') },
    { text: "Financeiro", icon: <Money />, onClick: () => console.log('Financeiro') },
    { text: "Configurações", icon: <Settings />, onClick: () => console.log('Configurações') },
    { text: "Sair", icon: <ExitToAppOutlined />, onClick: () => signOut() },
  ];

  return (
    <>
      <StyledDrawer variant="permanent" open={open}>
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </div>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={item.onClick}
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
