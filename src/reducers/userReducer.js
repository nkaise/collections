const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

const defaultState = {
    currentUser: {},
    isAuth: false,
    role: null
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER: 
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
                role: action.payload.role
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                role: null
            }
        default:
            return state
    }
};

// export const setUser = user => ({type: SET_USER, payload: user})
export const setUser = ({ user, role }) => ({type: SET_USER, payload: { user, role }});
export const logout = () => ({type: LOGOUT});
export const getCurrentUserId = (state) => state.currentUser?.id;