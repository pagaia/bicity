// A custom hook that builds on useLocation to parse

import axios from 'axios';

// the hash string for you.
export function useHash() {
    return new URLSearchParams(window?.location?.hash);
}

/**
 *  Function to verify the user via the backend with service ID provider
 * @param {code} param0
 * @returns
 */
export const verifyUserLogin = async ({ code, state }) => {
    if (!code || !state) {
        throw new Error('Code or state not defined');
    }
    const response = await axios(`/api/users/verify/${state}`, {
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
