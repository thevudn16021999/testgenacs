export interface UserRequest {
    _id: string;
    roles: string;
}

export interface UserPasswordRequest {
    _id: string;
    newPassword: string;
}
