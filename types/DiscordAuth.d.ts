export interface userBase {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: string;
}

export interface user extends userBase {
    flags: number;
    avatar: string;
    banner_color: string;
    locate: string;
}

export interface identify_request {
    application: {
        id: string;
        name: string;
        icon: string;
        description: string;
        bot_public: boolean;
        bot_require_code_grant: boolean;
        summary: string;
        verify_key: string;
        install_params: {
            scopes: string[];
            permissions: number;
        }
    }
    expires: string;
    user: userBase;
}

export interface tokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope?: String;
    token_type: String;
}
