"use client";

import {
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IHeaderProps } from "@/app/common/components/interface/interface";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header: React.FC<IHeaderProps> = ({
  title = "Keep Notes",
  menuItems = [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const activeUser = localStorage.getItem("activeUser");
    setUser(activeUser ? activeUser : null);
  }, [pathname]);

  const initialActiveItem =
    menuItems.find((item) => item.active) || menuItems[0];

  const [menu, setMenu] = useState(
    menuItems.map((item) => ({
      ...item,
      active: item.id === initialActiveItem?.id,
    }))
  );

  const handleMenuClick = (id: number) => {
    if (!localStorage.getItem("activeUser")) {
      router.push("/");
      return;
    }

    const updatedMenu = menu.map((item) => ({
      ...item,
      active: item.id === id,
    }));

    setMenu(updatedMenu);
    const selectedItem = updatedMenu.find((item) => item.id === id);
    if (selectedItem?.path) router.push(selectedItem.path);

    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    setMenu([...menu]);
    router.push("/");
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); 

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#000",
            textAlign: isMobile ? "center" : "left",
            paddingLeft: isMobile ? "0" : isTablet ? "5vh" : "40vh",
          }}
        >
          {title}
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {menu.map((item) => {
              if (user && item.key === "login") return null;
              if (!user && item.key !== "login") return null;

              return (
                <Link
                  key={item.id}
                  component="button"
                  onClick={() => handleMenuClick(item.id)}
                  sx={{
                    textDecoration: "none",
                    color: item.active ? "blue" : "#000",
                    fontWeight: item.active ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6">{item.label}</Typography>
                </Link>
              );
            })}
            {user && <Button onClick={handleLogout}>Logout</Button>}
          </Box>
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, padding: "16px" }}>
          {menu.map((item) => {
            if (user && item.key === "login") return null;
            if (!user && item.key !== "login") return null;

            return (
              <Link
                key={item.id}
                component="button"
                onClick={() => handleMenuClick(item.id)}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: item.active ? "blue" : "#000",
                  fontWeight: item.active ? "bold" : "normal",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              >
                <Typography variant="h6">{item.label}</Typography>
              </Link>
            );
          })}
          {user && (
            <Button fullWidth onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
