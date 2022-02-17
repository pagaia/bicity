import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MAX_VOTE_FEATURE } from '../../server/src/utility/constants';

const Vote = ({ featureId, user }) => {
    const [avgVote, setAvgVote] = useState(null);
    // fetch the average vote
    useEffect(async () => {
        updateAvgVote(featureId);
    }, [featureId]);

    const updateAvgVote = async (featureId) => {
        if (featureId) {
            const response = await axios(`/api/vote/feature/${featureId}`);
            const { data } = response;
            setAvgVote(data);
        }
    };
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
            updateAvgVote(featureId);
        } else {
            alert('please login first');
        }
    };

    console.log({ userVote });
    const votesLinks = [...Array(MAX_VOTE_FEATURE).keys()].map((vote, idx) => {
        const className = idx + 1 <= avgVote?.average ? 'text-warning' : 'text-muted';
        return (
            <li>
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
            <div>Average vote: {avgVote?.average}</div>
            <ul className="me-3 vote-lnk">{votesLinks}</ul>
            <div>your vote: {userVote?.vote}</div>
        </div>
    );
};

export default Vote;
