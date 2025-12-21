import React from 'react';
import Banner from '../../Components/Banner/Banner';
import LatestBooks from '../../Components/LatestBook/LatestBook';
import Coverage from '../../Components/Coverage/Coverage';
import WhyChoose from '../../Components/WhyChoose/WhyChoose';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <Coverage></Coverage>
            <WhyChoose></WhyChoose>
        </div>
    );
};

export default Home;