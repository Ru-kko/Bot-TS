export interface User {
	usr_id: number;
	templade_type?: number;
	pri_color: string;
	sec_color: string;
	last_tmp_changed: string;
	spt_tk?: string;
}

export interface Server {
	sv_id: number;
	prefix: string; 
	notify_warn: number;
	muted_rol: number;
	log_channel: number;
	welcome_msg: boolean;
	wlecome_channel: number;
	welcome_msg_config: object;
	customizer_channel: number;
}

export interface Member {
	usr_id?: number;
	sv_id?: number;
	/* `Total experience` */
	sv_t_xp?: number;
	/* `Actual level` */
	act_level?: number;
	warns?: number;
	usr_money?: number;
}

export interface session {
	ssid?: string;
	code: string;
	originalMaxAge?: number;
	refreshToken: string;
	deleteDate: string | Date;
	token: string;
	tokenType?: string;
	tokenExpires: number;
	tokenCreated: string;
	created?: string;
	userid?: number;
}
