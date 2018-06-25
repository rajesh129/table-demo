const inputReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_VALUE":
            let valueInput = {};
            valueInput["firstName"] = action.payload;
            state = {
                ...state,
                valueInput
            };
            break;
    }
    return state;
};

export default inputReducer;