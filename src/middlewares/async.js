export default function ({ dispatch }) {
    return next => action => {

        // If action does not have a payload
        // or the payload doesnt have a .then property
        // we dont care about it, send it on
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

        action.payload
            .then(function(response) {
                //create new action with the old type
                // but replace the promise with response data.
                const newAction = { ...action, payload: response};

                // rerun actions and all middlewares
                dispatch(newAction);
            });
    }
}
