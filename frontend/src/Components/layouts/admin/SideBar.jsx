import React, { useState } from 'react';
import { Box, Drawer, Toolbar, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { logout } from '../../../api/auth';

const drawerWidth = 250;

function SideBar() {
    const [openItems, setOpenItems] = useState({
        addCategory: false,
        manageUsers: false
    });

    const handleClick = (item) => {
        setOpenItems((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };

    return (
        <div>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'gray' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Link to="/admin/home" style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeOutlinedIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Home" primaryTypographyProps={{ style: { color: 'white' } }} />
                            </ListItem>
                        </Link>

                        <ListItem button onClick={() => handleClick('addCategory')}>
                            <ListItemIcon>
                                <TableViewIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Table" primaryTypographyProps={{ style: { color: 'white' } }} />
                            {openItems.addCategory ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
                        </ListItem>
                        <Collapse in={openItems.addCategory} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to="/admin/table/categories" style={{ textDecoration: 'none' }}>
                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <TableRowsIcon style={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Category" primaryTypographyProps={{ style: { color: 'white' } }} />
                                    </ListItem>
                                </Link>
                                <Link to="/admin/table/products" style={{ textDecoration: 'none' }}>
                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <TableRowsIcon style={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Product" primaryTypographyProps={{ style: { color: 'white' } }} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>

                        <ListItem button onClick={() => handleClick('manageUsers')}>
                            <ListItemIcon>
                                <PeopleIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Manage" primaryTypographyProps={{ style: { color: 'white' } }} />
                            {openItems.manageUsers ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
                        </ListItem>
                        <Collapse in={openItems.manageUsers} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to="/admin/manage/admin" style={{ textDecoration: 'none' }}>
                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <PersonIcon style={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Admin" primaryTypographyProps={{ style: { color: 'white' } }} />
                                    </ListItem>
                                </Link>
                                <Link to="/admin/manage/user" style={{ textDecoration: 'none' }}>
                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AdminPanelSettingsIcon style={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="User" primaryTypographyProps={{ style: { color: 'white' } }} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Collapse>
                    </List>

                    <hr />

                    <Link onClick={logout} to="/login" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <LogoutIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'white' } }} />
                        </ListItem>
                    </Link>
                </Box>
            </Drawer>

        </div>
    );
}

export default SideBar;
