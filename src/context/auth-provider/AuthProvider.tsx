import React, { createContext, Profiler, ReactNode, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthData } from "../../models/auth"
import { profileActions } from "../../store/profile"
import { RtkDispatch } from "../../store/store"
import { tokenSelectors, tokenThunks } from "../../store/token"
import { useProfile, useSignIn, useSignUp } from "../../services/AuthService/AuthService"
import { COMMAND_ID } from "src/services/AuthService/AuthConfig"
import { AuthSuccess } from "src/services/AuthService/AuthSuccess"
import { AuthError } from "src/services/AuthService/AuthError"
import { useRtkGetProfileMutation, useRtkSignInMutation, useRtkSignUpMutation } from "src/services/AuthService/AuthRtkService"

export type UserRole = "user" | "admin"

interface AuthContextType {
    currentUser: string | null
    errors: string[]
    roles: UserRole[]
    hasRole: (role: UserRole) => boolean
    isAdmin: () => boolean
    isAuthenticated: () => boolean
    login: (auth: AuthData) => boolean
    logout: () => void
    register: (auth: AuthData, onSuccess: () => void) => void
    setRoles: (roles: UserRole[]) => void
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    errors: [],
    roles: [],
    hasRole: (role: UserRole) => false,
    isAdmin: () => false,
    isAuthenticated: () => false,
    login: () => false,
    logout: () => { },
    register: () => { },
    setRoles: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: ReactNode;
};

let handleOnSuccess: () => void

/*
 * Провайдер авторизации
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const authenticated = useSelector(tokenSelectors.authenticated)
    const token = useSelector(tokenSelectors.get)
    const [currentUser, setCurrentUser] = useState<AuthData['email'] | null>(null);
    const dispatch: RtkDispatch = useDispatch()
    const [roles, setRoles] = useState<UserRole[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const handleSignIn = (response: AuthSuccess | AuthError) => {
        if ('errors' in response)
        {
            setErrors(response.errors.map(x => x.message))
        }
        else {
            setErrors([])
            // получаем и проверяем токен
            if (response.profile.commandId !== COMMAND_ID)
            {
                console.error('wrong command!')
                return
            }

            // если токен верный, сохраняем токен, генерируем профиль,
            // сохраняем email как имя пользователя, добавляем группу
            dispatch(tokenThunks.setToken(response.token))
            handleProfile(response.profile)
        }
    }

    const handleSignUp = (response: AuthSuccess | AuthError) => {
        if ('errors' in response)
        {
            setErrors(response.errors.map(x => x.message))
            return false
        }
        else {
            setErrors([])
            handleOnSuccess()
            return true
        }
    }

    const handleGetProfile = (response: AuthProfile | AuthError) => {
        if ('errors' in response)
        {
            setErrors(response.errors.map(x => x.message))
        }
        else {
            setErrors([])
            handleProfile(response)
        }
    }

    const signIn = useSignIn(handleSignIn)
    const signUp = useSignUp(handleSignUp)
    const getProfile = useProfile(handleGetProfile)

    const [ rtkSignIn ] = useRtkSignInMutation()
    const [ rtkSignUp ] = useRtkSignUpMutation()
    const [ rtkGetProfile ] = useRtkGetProfileMutation()

    const handleHasRole = (role: UserRole) => roles.indexOf(role) >= 0

    const handleIsAdmin = () => handleHasRole("admin")

    const handleIsAuthenticated = () => authenticated

    const handleLogin = (auth: AuthData) => {
        // отправляем учетные данные
        // React Query
        // signIn.mutate(auth)

        // Redux-toolkit-query
        rtkSignIn(auth).then((x) => {
            handleSignIn(x.data)
        })

        return true
    }

    const handleLogout = () => {
        // удаляем токен
        dispatch(tokenThunks.clearWithSaving())
        setRoles([])
    }

    const handleRegister = (auth: AuthData, onSuccess: () => void) => {
        handleOnSuccess = onSuccess;
        // React Query
        // signUp.mutate(auth)

        // Redux-toolkit-query
        rtkSignUp(auth).then((x) => {
            if ('error' in x) {
                if ('data' in x.error) {
                    handleSignUp(x.error?.data as AuthError)
                }
            }
            else {
                if (handleSignUp(x.data))
                    handleOnSuccess()
            }
        })
    }

    const handleProfile = (profile: AuthProfile) => {
        setCurrentUser(profile.email)

        dispatch(profileActions.set({
            email: profile.email,
            signUpDate: profile.signUpDate
            }
        ))

        setRoles(['admin'])
    }

    const handleSetRoles = async (roles: UserRole[]) => {
        setRoles(() => roles);
    }

    useEffect(() => {
        try {
            // если токен есть - добавляем в хранилище фэйковые данные профиля, если токена нет, очищаем профиль
            if (authenticated) {
                // React Query
                // getProfile.mutate(token)

                // Redux-toolkit-query
                rtkGetProfile().then((x) => {
                    console.debug(x)
                    if ('signUpDate' in x.data)
                        handleProfile(x.data)
                })

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
        errors,
        roles,
        hasRole: handleHasRole,
        isAdmin: handleIsAdmin,
        isAuthenticated: handleIsAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        setRoles: handleSetRoles
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider