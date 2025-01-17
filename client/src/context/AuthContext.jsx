import axios from "../helper/axios";
import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { user: action.payload, cartCount : action.payload.cartCount };
        case "LOGOUT":
            localStorage.removeItem("user");
            return { user: null, cartCount : 0 };
        case "UPDATE_CART_COUNT":   
            return { ...state, cartCount: action.payload };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: JSON.parse(localStorage.getItem("user")) || null,
        cartCount : 0
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/user/me');
                const user = res.data;
                // console.log('fetch user',user);
                   
                if (user) {
                    dispatch({ type: "LOGIN", payload: user });
                    const cartRes = await axios('/cart/count');
                    dispatch({ type: "UPDATE_CART_COUNT", payload: cartRes.data.count });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            } catch (error) {
                dispatch({ type: "LOGOUT" });
            }
        };

        fetchUser();
    }, []);

    const updateCartCount = async () => {
        try {
            const res = await axios.get('/cart/count');
            dispatch({ type: "UPDATE_CART_COUNT", payload: res.data.count });
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };



    return (
        <AuthContext.Provider value={{ ...state, dispatch ,updateCartCount}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
