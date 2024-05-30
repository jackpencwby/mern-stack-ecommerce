import React, { useState, useEffect } from 'react'
import { authenticateToken } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function UserRoute({ children }) {

    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();

    const checkAuthentication = async () => {
        try {
            const response = await authenticateToken();
            const { role } = response.data;
            if (role === "user") {
                setIsUser(true);
            }
            else {
                setIsUser(false);
                navigate("/login");
            }
        }
        catch (err) {
            setIsUser(false);
            navigate("/login");
        }
    }

    useEffect(() => {
        checkAuthentication();
    });

    return isUser && (
        <>
            <div>{children}</div>
        </>
    )
}

export default UserRoute;