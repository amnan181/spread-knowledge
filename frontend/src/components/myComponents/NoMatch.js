import React from 'react';
import NOT_FOUND from '../../assets/images/page-not-found.jpg';
import { Link } from 'react-router-dom';

export default function NoMatch() {
    return (
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link to='/'>
                <img src={NOT_FOUND} alt='Page Not Found' height='100%' width='100%' style={{marginTop: '15vh'}} />
            </Link>
        </div>
    )
}
