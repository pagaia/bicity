// A custom hook that builds on useLocation to parse

import axios from 'axios';
import { useState } from 'react';

// the hash string for you.
export function useHash() {
    const [hash, setHash] = useState('');

    function locationHashChanged() {
        setHash(new URLSearchParams(window?.location?.hash));
    }

    if (typeof window !== 'undefined') {
        window.onhashchange = locationHashChanged;
    }

    return hash;
}

/**
 *  Function to verify the user via the backend with service ID provider
 * @param {code} param0
 * @returns
 */
export const verifyUserLogin = async ({ code, provider }) => {
    if (!code || !provider) {
        throw new Error('Code or provider not defined');
    }
    const response = await axios(`/api/users/verify/${provider}`, {
        headers: { code },
    });

    // get the authorization from the header
    const { authorization } = response.headers;
    // get the user profile from the body
    const { data: profile } = response;

    // store user google profile and JWT for future calls
    return { profile, authorization };
};

/**
 *  Function to verify the user via the backend with service ID provider
 * @param {code} param0
 * @returns
 */
export const refreshUserToken = async () => {
    const response = await axios.post(`/api/users/refresh-token`);

    // get the authorization from the header
    const { authorization } = response.headers;
    // get the user profile from the body
    const { data: profile } = response;

    // store user google profile and JWT for future calls
    return { profile, authorization };
};

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent
    );
};
