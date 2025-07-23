import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthData } from "../../models/auth"
import { Profile } from "../../models/profile"
import { profileActions } from "../../store/profile"
import { RtkDispatch } from "../../store/store"
import { tokenSelectors, tokenThunks } from "../../store/token"


export type UserRole = "user" | "admin"

interface AuthContextType {
    currentUser: string | null
    roles: UserRole[]
    hasRole: (role: UserRole) => boolean
    isAdmin: () => boolean
    isAuthenticated: () => boolean
    login: (auth: AuthData) => boolean
    logout: () => void
    setRoles: (roles: UserRole[]) => void
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    roles: [],
    hasRole: (role: UserRole) => false,
    isAdmin: () => false,
    isAuthenticated: () => false,
    login: () => false,
    logout: () => { },
    setRoles: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: ReactNode;
};

const generateProfile = (): Profile => {
    return {
        name: 'user name',
        about: 'about user'
    }
}

/*
 * Провайдер авторизации
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const authenticated = useSelector(tokenSelectors.authenticated)
    const [currentUser, setCurrentUser] = useState<AuthData['email'] | null>(null);
    const dispatch: RtkDispatch = useDispatch()
    const [roles, setRoles] = useState<UserRole[]>([])

    const handleHasRole = (role: UserRole) => roles.indexOf(role) >= 0

    const handleIsAdmin = () => handleHasRole("admin")

    const handleIsAuthenticated = () => authenticated

    const handleLogin = (auth: AuthData) => {
        // отправляем учетные данные

        // получаем и проверяем токен

        // если токен верный, сохраняем токен, генерируем профиль,
        // сохраняем email как имя пользователя, добавляем группу
        dispatch(tokenThunks.generateWithSaving())
        setCurrentUser(auth.email)
        handleProfile()

        return true
    }

    const handleLogout = () => {
        // удаляем токен
        dispatch(tokenThunks.clearWithSaving())
        setRoles([])
    }

    const handleProfile = () => {
        const profile = generateProfile()
        dispatch(profileActions.set(profile))

        setRoles(['admin'])
    }

    const handleSetRoles = async (roles: UserRole[]) => {
        setRoles(() => roles);
    }

    useEffect(() => {
        try {
            // если токен есть - добавляем в хранилище фэйковые данные профиля, если токена нет, очищаем профиль
            if (authenticated) {
                handleProfile()
            } else {
                handleLogout()
            }
        } catch (error) {
            handleLogout()
        } finally {

        }
    }, []);

    const value = {
        currentUser,
        roles,
        hasRole: handleHasRole,
        isAdmin: handleIsAdmin,
        isAuthenticated: handleIsAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        setRoles: handleSetRoles
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider