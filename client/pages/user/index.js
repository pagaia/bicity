import Footer from '../../components/layout/Footer';
import Login from '../../components/user/Login';
import UserProfile from '../../components/user/UserProfile';

const { useAuth } = require('../../hooks/useAuth');

const UserInfo = () => {
    const { user, signOut } = useAuth();
    console.debug({ user, signOut });

    if (user) {
        return (
            <>
                <UserProfile user={user} signOut={signOut} />
                <Footer />
            </>
        );
    }
    return (
        <>
            <Login />
        </>
    );
};

export default UserInfo;
