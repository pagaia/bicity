import Image from 'next/image';
import ExternalLink from '../components/ExternalLink';
import Logo from '../components/Logo';

const About = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9 col-lg-6">
                    <div>
                        <div className="logo mt-5 mb-5">
                            <Logo />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 about">
                    <h1>BiCity - INFO</h1>
                    <p>
                        You use your bike to move around in the city? Make your city more
                        bike-friendly; add your favorite places and share them with your friends. It
                        will help you, your friends and also people visiting your city.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
