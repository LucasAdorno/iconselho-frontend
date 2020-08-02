import React, { useEffect } from 'react';

import { FiPower } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
        })
    }, [userId]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                
                <span>Bem vindo(a), {userName}</span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>...</h1>
        </div>
    );
}