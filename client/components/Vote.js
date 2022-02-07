import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MAX_VOTE_FEATURE } from '../../server/src/utility/constants';

const Vote = ({ featureId, user }) => {
    const [avgVote, setAvgVote] = useState(null);
    // fetch the average vote
    useEffect(async () => {
        if (featureId) {
            const response = await axios(`/api/vote/feature/${featureId}`);
            const { data } = response;
            setAvgVote(data);
        }
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
        } else {
            alert('please login first');
        }
    };

    console.log({ userVote });
    const votesLinks = [...Array(MAX_VOTE_FEATURE).keys()].map((vote) => (
        <li>
            <button onClick={() => handleAddVote(vote + 1)}>
                <Image src="/bicycle.png" alt="Add a vote" width="20%" height="20%" />
            </button>
        </li>
    ));
    return (
        <div>
            <div>Average vote: {avgVote?.average}</div>
            <ul className="me-3">{votesLinks}</ul>
            <div>your vote: {userVote?.vote}</div>
        </div>
    );
};

export default Vote;
