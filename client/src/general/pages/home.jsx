import React from 'react';
import Description from '../components/home/Description';
import Features from '../components/home/Features';
import HeroSection from '../components/home/HeroSection';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';

const Home = () => {
    return ( 
        <div>
            <Navbar />
            <div className='home-container'>
                <HeroSection />
                <Description />
                <Features />
            </div>
            <Footer /> {/* The Footer will be visible on all pages */}
        </div>
     );
}
 
export default Home;