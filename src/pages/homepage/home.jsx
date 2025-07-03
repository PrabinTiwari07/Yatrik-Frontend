import AboutUs from '../../components/aboutUs';
import ChooseUs from '../../components/chooseUs';
import ExploreNepal from '../../components/exploreNepal';
import Footer from '../../components/footer';
import Hero from '../../components/hero';
import HowItWorks from '../../components/howItWorks';
import Navbar from '../../components/Navbar';
import PopularVehicles from '../../components/PopularVehicles';

const Home = () => {
    return (
        <div className="bg-gray-100">
            <Navbar />
            <Hero />
            <HowItWorks />
            <PopularVehicles />
            <ChooseUs />
            <ExploreNepal />
            <AboutUs />
            <Footer />

        </div>
    );
};

export default Home;
