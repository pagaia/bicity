// Hook (use-auth.js)
import axios from 'axios';
import Router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHash, verifyUserLogin } from '../utils/common.functions';
import usePrevious from './usePrevious';

const authContext = createContext();

const addAuthentication = (authorization) => {
    // Add a request interceptor
    axios.interceptors.request.use((req) => {
        console.log({ authorization });

        req.headers.authorization = authorization;
        console.log({ req });
        return req;
    });
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECTION,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        include_granted_scopes: 'true',
        state: 'TheBestBiCityInTheWorld',
    };

    console.log({ params: JSON.stringify(params), redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECTION });
    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    // user is made by profile and authorization properties
    const [user, setUser] = useState(null);
    const prevAuthorization = usePrevious(user?.authorization);
    const authorization = user?.authorization;

    const [code, setCode] = useState(null);
    useEffect(() => {
        let hash = useHash();
        const code = hash.get('access_token');
        console.log({ code });
        setCode(code);
    });
    const prevCode = usePrevious(code);

    // add authorization
    useEffect(() => {
        if (authorization && prevAuthorization !== authorization) {
            addAuthentication(authorization);
        }
    }, [authorization, prevAuthorization]);

    // check the response
    useEffect(async () => {
        if (code && prevCode !== code) {
            // call the api to authenticate the user
            const data = await verifyUserLogin({ code });
            // save the user into the state
            setUser(data);
            // remove the google information from the url
            Router.push('/admin/user');
        }
    }, [code, prevCode]);

    // call the oauthSignIn method which redirect to Google OAuth page
    const signIn = oauthSignIn;

    const signOut = () => {
        setUser(null);
    };

    // Return the user object and auth methods
    return {
        user,
        signIn,
        signOut,
    };
}
