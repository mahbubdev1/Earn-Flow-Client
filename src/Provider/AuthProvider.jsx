import { createUserWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.Config";
import axios from "axios";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleEmailPassRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const handleSignEmailPassword = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSingUp = () => {
        // setLoading(true)
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser)
            if (currentUser) {
                setUser(currentUser)
                const userInfo = { email: currentUser.email };
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo, {withCredentials: true})
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setUser(currentUser)
                setLoading(false)
            }
        })

        return () => unsubscribe();

    }, [])

    const allData = {
        user,
        setUser,
        loading,
        googleSingUp,
        handleSignOut,
        handleEmailPassRegister,
        handleManageUser,
        handleSignEmailPassword
    }

    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;