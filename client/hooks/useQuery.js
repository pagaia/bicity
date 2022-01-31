import React from 'react';

const useQuery = ({ url, method = 'GET', payload }) => {
    const [statusCode, setStatusCode] = React.useState();
    const [apiData, setApiData] = React.useState();

    React.useEffect(() => {
        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((data) => data.json())
            .then(({ code, status, ...apiData }) => {
                setStatusCode(code);
                setApiData(apiData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [url]);

    return { data: apiData, statusCode };
};

export default useQuery;
