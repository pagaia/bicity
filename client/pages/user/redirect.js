import { useEffect } from 'react';

export default () => {
    useEffect(() => {
        let hash = new URLSearchParams(window?.location?.hash);
        const provider = hash.get('state') || hash.get('#state');
        const code = hash.get('access_token') || hash.get('#access_token');

        const source = 'BiCity-redirect';

        const params = { provider, code, source };
        if (window.opener) {
            // send them to the opening window
            window.opener.postMessage(params);
            // close the popup
            window.close();
        }
    });

    // some text to show the user
    return <p>Please wait...</p>;
};
