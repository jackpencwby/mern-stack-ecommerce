import React, { useState, useEffect } from 'react'
import HeaderBar from '../layouts/admin/HeaderBar';
import SideBar from '../layouts/admin/SideBar';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import { authenticateToken } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

function AdminRoute({ children }) {

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const checkAuthentication = async () => {
        try {
            const response = await authenticateToken();
            const { role } = response.data;
            if (role === "admin") {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
                navigate("/login");
            }
        }
        catch (err) {
            setIsAdmin(false);
            navigate("/login");
        }
    }

    useEffect(() => {
        checkAuthentication();
    });

    return isAdmin && (
        <>
            <CssBaseline />
            <HeaderBar />
            <SideBar />
            <Box
                component="main"
                sx={{ flexGrow: 1, backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', height: '100vh', p: 3, ml: `${drawerWidth}px`  }}
            >
                <Toolbar />
                <Typography paragraph>
                    {children}
                </Typography>
            </Box>
        </>
    )
}

export default AdminRoute;