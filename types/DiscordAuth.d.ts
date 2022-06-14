export interface userBase {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: string;
}
export interface role {
    id: string;
    name: string;
    permissions: number;
    position: 0;
}
export interface emoji {
    name: string;
    id: string;
    animeted: false;
}
export interface member {
    roles: string[];
    user: userBase
}
export interface guildBase {
    id: string;
    name: string;
    icon?: string;
    features: string[];
}
export interface fullGuild extends guildBase{
    owner_id: string;
    description?: string;
    roles: role[];
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
        };
    };
    expires: string;
    user: userBase;
}

export interface UserGuild extends guildBase {
    name: string;
    owner: boolean;
    permissions: number;
    permissions_new: number;
}

export interface tokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope?: String;
    token_type: String;
}

export interface basicGuilResponse {
    id: string;
    publioc_leader: boolean;
    prefix: string;
}
