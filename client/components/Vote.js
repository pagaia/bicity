import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_VOTE_FEATURE } from '../../server/src/utility/constants';
import { fetchVote, selectFeatureVote } from '../store/featureSlice';

const Vote = ({ featureId, user }) => {

    const dispatch = useDispatch();
    const avgVote = useSelector(selectFeatureVote(featureId));

    console.log({avgVote})
    // fetch the average vote
    useEffect(async () => {
        // updateAvgVote(featureId);
        dispatch(fetchVote({ featureId }));
    }, [featureId]);

    const [userVote, setUserVote] = useState(null);

    // fetch vote per user
    useEffect(async () => {
        console.log({ featureId, user });
        if (featureId && user) {
            const response = await axios(`/api/vote/${featureId}/${user?.profile?._id}`);
            const { data } = response;
            setUserVote(data);
        }
    }, [featureId, user]);

    const handleAddVote = async (vote) => {
        if (featureId && user) {
            const response = await axios.post(
                `/api/vote/${featureId}/${user?.profile?._id}`,
                { vote } // body
            );
            const { data } = response;
            setUserVote(data);
            dispatch(fetchVote({ featureId }));
        } else {
            alert('please login first');
        }
    };

    console.log({ userVote });
    const votesLinks = [...Array(MAX_VOTE_FEATURE).keys()].map((vote, idx) => {
        const className = idx + 1 <= avgVote ? 'text-warning' : 'text-muted';
        return (
            <li key={idx}>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddVote(vote + 1);
                    }}
                    className={className}>
                    <i className="fas fa-igloo fa-2x"></i>
                </a>
            </li>
        );
    });
    return (
        <div>
            <div>Average vote: {avgVote}</div>
            <ul className="me-3 vote-lnk">{votesLinks}</ul>
            <div>your vote: {userVote?.vote}</div>
        </div>
    );
};

export default Vote;
