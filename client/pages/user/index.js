import Login from '../../components/user/Login';
import UserProfile from '../../components/user/userProfile';

const { useAuth } = require('../../hooks/useAuth');

const UserInfo = () => {
    const { user, signIn, signOut } = useAuth();
    console.log({ user, signIn, signOut });
    if (user) {
        return <UserProfile user={user} signOut={signOut} />;
    }
    return <Login />;
};

export default UserInfo;
