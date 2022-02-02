// A custom hook that builds on useLocation to parse

import axios from "axios";

// the hash string for you.
export function useHash() {
    console.log({ hash: window?.location?.hash });

    return new URLSearchParams(window?.location?.hash);
}

/**
 *  Function to verify the user via the backend with service ID provider
 * @param {code} param0
 * @returns
 */
export const verifyUserLogin = async ({ code }) => {
    const response = await axios('/api/users/verify', {
        headers: { code },
    });

    // get the authorization from the header
    const { authorization } = response.headers;
    // get the user profile from the body
    const { data: profile } = response;

    // store user google profile and JWT for future calls
    return { profile, authorization };
};
