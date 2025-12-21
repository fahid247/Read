import React from 'react';
import NavBar from './NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

const MainLayout = () => {
    return (
        <div className='sm:p-5'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;