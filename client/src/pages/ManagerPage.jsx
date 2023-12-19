import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

const ManagerPage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <p>You must be a manager to see this page!</p>
        </div>
    )
}

export default ManagerPage