const throttled = {};
export const throttle =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        const time = action?.meta?.arg?.throttle;
        console.log({time})
        if (!time) return next(action);

        if (throttled[action.type]) {
            console.log({Throttled: time})
            return;
        }
        throttled[action.type] = true;
        setTimeout(() => {
            throttled[action.type] = false;
        }, time);
        next(action);
    };
