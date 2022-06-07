import Footer from '../components/layout/Footer';
import Logo from '../components/Logo';

const About = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-9 col-lg-6">
                        <div>
                            <div className="logo mt-5 mb-5">
                                <Logo />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-lg-6 about">
                        <h1>BiCity - INFO</h1>
                        <p>
                            Do you use your bike to move around in the city? Make your city more
                            bike-friendly; add your favorite places and share them with your
                            friends. It will help you, your friends and also people visiting your
                            city.
                        </p>
                        <p>You can save your favorites places and show all together in the map.</p>
                        <p>
                            Don't forget to give your vote for each place. Other cyclists will know
                            about it.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
