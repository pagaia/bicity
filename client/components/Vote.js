import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_VOTE_FEATURE } from '../../server/src/utility/constants';
import { showError } from '../store/errorSlice';
import { fetchVote, selectFeatureVote } from '../store/featureSlice';
import { ERROR_MESSAGE } from '../utils/constants';

const Vote = ({ featureId, userId }) => {
    const dispatch = useDispatch();
    const avgVote = useSelector(selectFeatureVote(featureId));

    console.debug({ avgVote });
    // fetch the average vote
    useEffect(() => {
        // updateAvgVote(featureId);
        dispatch(fetchVote({ featureId }));
    }, [featureId]);

    const [userVote, setUserVote] = useState(null);

    // fetch vote per user
    useEffect(() => {
        const fetchVote = async () => {
            console.debug({ featureId, userId });
            if (featureId && userId) {
                const response = await axios(`/api/vote/${featureId}/${userId}`);
                const { data } = response;
                setUserVote(data);
            }
        };

        fetchVote();
    }, [featureId, userId]);

    const handleAddVote = async (vote) => {
        if (featureId && userId) {
            const response = await axios.post(
                `/api/vote/${featureId}/${userId}`,
                { vote } // body
            );
            const { data } = response;
            setUserVote(data);
            dispatch(fetchVote({ featureId }));
        } else {
            dispatch(showError({ message: ERROR_MESSAGE.LOGIN_FIRST }));
        }
    };

    console.debug({ userVote });
    const votesLinks = [...Array(MAX_VOTE_FEATURE).keys()].map((vote, idx) => {
        const voted = idx + 1 <= avgVote ? 'checked' : 'unchecked';
        return (
            <li key={idx}>
                <a
                    href="#setVote"
                    onClick={(e) => {
                        e?.preventDefault();
                        handleAddVote(vote + 1);
                    }}
                    title={`Set vote to ${idx + 1}`}>
                    <i className={`fas fa-bicycle ${voted}`}></i>
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
