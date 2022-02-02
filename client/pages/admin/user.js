import Login from '../../components/Login';
import UserProfile from '../../components/user/userProfile';

const { useAuth } = require('../../hooks/useAuth');

const UserInfo = () => {
    const { user, signIn, signOut } = useAuth();
    if (user) {
        return <UserProfile user={user} />;
    }
    return <Login />;
};

export default UserInfo;
