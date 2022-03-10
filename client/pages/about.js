import Image from 'next/image';
import Footer from '../components/layout/Footer';

const About = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Image
                        src="/bicity-logo.jpg"
                        alt="Woman riding a bike around city"
                        width="600"
                        height="600"
                    />
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
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">BiCity Logo</h5>
                            <a href="https://www.freepik.com/vectors/riding-bicycle">
                                Riding bicycle vector created by vectorjuice - www.freepik.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
