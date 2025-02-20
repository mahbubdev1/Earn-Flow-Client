import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.Config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState(0);

    const { data, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
            setCoin(res.data.userCoin)
            return res.data.userCoin
        },
        enabled: !!user?.email,
    });

    // console.log(data);

    const handleEmailPassRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const handleSignEmailPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSingUp = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };

    const handleSignOut = () => {
        return signOut(auth)
    };

    const handleManageUser = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            }).then(() => {
                auth.currentUser.reload()
                    .then(() => {
                        setUser({ ...auth.currentUser });
                    })
            })
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userInfo = { email: currentUser.email };
                try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo, { withCredentials: true });
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                } catch (error) {
                    console.error("JWT Token Error:", error);
                }
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const allData = {
        user,
        setUser,
        loading,
        googleSingUp,
        handleSignOut,
        handleEmailPassRegister,
        handleManageUser,
        handleSignEmailPassword,
        setCoin,
        coin,
        refetch
    }

    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;