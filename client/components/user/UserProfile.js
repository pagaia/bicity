import Image from 'next/image';
import Favorites from '../features/Favorites';

const UserProfile = ({ user, signOut }) => {
    const { profile } = user;
    console.log({ user });
    return (
        <div className="text-center card-box">
            <div className="member-card pt-2 pb-2">
                <div className="thumb-lg member-thumb mx-auto">
                    <Image
                        src={profile?.picture}
                        className="rounded-circle img-thumbnail"
                        alt={profile?.name}
                        width="100%"
                        height="100%"
                    />
                </div>

                <div className="">
                    <h4>{profile?.name}</h4>
                    <p className="text-muted">
                        <span>
                            <a href="#" className="text-pink">
                                {profile?.email}
                            </a>
                        </span>
                    </p>
                </div>
                {/* <ul className="social-links list-inline">
                    <li className="list-inline-item">
                        <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Facebook">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Twitter">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Skype">
                            <i className="fa fa-skype"></i>
                        </a>
                    </li>
                </ul> */}
                <button
                    type="button"
                    onClick={signOut}
                    className="btn btn-danger mt-3 btn-rounded waves-effect w-md waves-light">
                    Logout
                </button>
                <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">
                    Message Now
                </button>
                <div className="mt-4">
                    <div className="row">
                        <div className="col-4">
                            <div className="mt-3">
                                <h4>2563</h4>
                                <p className="mb-0 text-muted">Wallets Balance</p>
                                <Favorites userId={profile._id} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-3">
                                <h4>6952</h4>
                                <p className="mb-0 text-muted">Income amounts</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mt-3">
                                <h4>1125</h4>
                                <p className="mb-0 text-muted">Total Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
