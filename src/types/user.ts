export interface UserType {
    user_id: string;
    user_email?: string;
    user_name?: string;
    user_access?: string;
}

export interface LoginFormData {
    user_email: string;
    user_password: string;
}

export type NewUser = {
    user_email: string;
    user_name: string;
    user_password: string;
    user_access: string;
};

export type ResetPassword = {
    user_email: string;
    user_password: string;
};
