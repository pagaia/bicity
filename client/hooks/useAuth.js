// Hook (use-auth.js)
import axios from 'axios';
import Router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHash, verifyUserLogin } from '../utils/common.functions';
import usePrevious from './usePrevious';
import { useDispatch } from 'react-redux';
import { revokeToken } from '../store/userSlice';

const authContext = createContext();

let windowObjectReference = null;
let previousUrl = null;
const BACKEND_API_REG = /^\/api/;

const receiveMessage = (event) => {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    if (event.origin !== process.env.NEXT_PUBLIC_BASE_URL) {
        return;
    }

    const {
        data: { code, provider, source },
    } = event;

    if (code && provider && source === 'BiCity-redirect') {
        var currentUrl = new URL(document.URL);
        currentUrl.hash = `#code=${code}&provider=${provider}`;

        // new url
        var new_url = currentUrl.href;

        // change the current url
        document.location.href = new_url;
    }
};

const openSignInWindow = (url, name) => {
    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage);

    // window features
    const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
        windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
        /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
        windowObjectReference = window.open(url, name, strWindowFeatures);
        windowObjectReference.focus();
    } else {
        /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
        windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', receiveMessage, false);
    // assign the previous URL
    previousUrl = url;
};

let axiosAuthentication;

const addAuthentication = (authorization) => {
    // Add a request interceptor
    axiosAuthentication = axios.interceptors.request.use((req) => {
        // add token only for our Backend
        if (BACKEND_API_REG.test(req.url)) {
            req.headers.authorization = authorization;
        }

        return req;
    });
};

const removeAuthentication = () => {
    axios.interceptors.request.eject(axiosAuthentication);
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
function oauthGoogleSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECTION,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        include_granted_scopes: 'true',
        state: 'google-state-test',
    };

    // build the url with params
    let myUrl = `${oauth2Endpoint}?`;
    for (let p in params) {
        myUrl += `${p}=${params[p]}&`;
    }
    myUrl = myUrl.substring(0, myUrl.length - 1);

    openSignInWindow(myUrl, 'BiCity-login');
}

/*
 * Create form to request access token from Facebook OAuth  server.
 */
function oauthFacebookSignIn() {
    const oauth2Endpoint = 'https://www.facebook.com/v14.0/dialog/oauth';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {
        client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECTION,
        response_type: 'token',
        scope: 'public_profile',
        state: 'facebook-state-test',
    };

    let myUrl = `${oauth2Endpoint}?`;
    for (let p in params) {
        myUrl += `${p}=${params[p]}&`;
    }
    myUrl = myUrl.substring(0, myUrl.length - 1);

    openSignInWindow(myUrl, 'BiCity-login');
}

/*
 * Create form to request access token from Facebook OAuth  server.
 */
function oauthTwitterSignIn() {
    var oauth2Endpoint = `https://api.twitter.com/oauth/request_token`;

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'POST'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        oauth_callback: process.env.NEXT_PUBLIC_AUTH_REDIRECTION,
        oauth_consumer_key: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
    };

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
    const [provider, setProvider] = useState(null);

    const dispatch = useDispatch();
    let hash = useHash();

    useEffect(() => {
        if (hash) {
            const provider = hash.get('provider') || hash.get('#provider');
            const code = hash.get('code') || hash.get('#code');
            code && setCode(code);
            provider && setProvider(provider);
        }
    }, [hash]);
    const prevCode = usePrevious(code);

    // add authorization on each axios call
    useEffect(() => {
        if (prevAuthorization !== authorization) {
            if (authorization) {
                addAuthentication(authorization);
            } else {
                removeAuthentication();
            }
        }
    }, [authorization, prevAuthorization]);

    // check the response
    useEffect(() => {
        const verifyUser = async () => {
            if (code && prevCode !== code && provider) {
                // call the api to authenticate the user
                const data = await verifyUserLogin({ code, provider });
                // save the user into the state
                setUser(data);
                // remove the token information from the url
                Router.push('/user');
            }
        };
        verifyUser();
    }, [code, prevCode, provider]);

    // call the oauthSignIn method which redirect to Google OAuth page
    const googleSignIn = oauthGoogleSignIn;

    const signOut = () => {
        setUser(null);
        dispatch(revokeToken());
    };

    // Return the user object and auth methods
    return {
        user,
        googleSignIn,
        oauthFacebookSignIn,
        oauthTwitterSignIn,
        signOut,
        setUser,
    };
}
