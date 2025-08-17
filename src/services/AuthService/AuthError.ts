export interface AuthErrorMessage {
    message: string
}

export interface AuthError {
    errors: AuthErrorMessage[]
}