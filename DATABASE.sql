CREATE DATABASE IF NOT EXISTS bot;

Use bot;

-- Lista Srevidores
CREATE TABLE IF NOT EXISTS servers(
	sv_id BIGINT(18)  NOT NULL PRIMARY KEY,
    prefix VARCHAR(5) NOT NULL DEFAULT 'waifu',
    notify_warn INT NOT NULL DEFAULT 10,
    muted_rol BIGINT(18) DEFAULT 0,
    
    log_channel BIGINT(18) NOT NULL DEFAULT 0,
    customizer_channel BIGINT(18) NOT NULL DEFAULT 0,
    
    welcome_msg BOOLEAN NOT NULL DEFAULT 0,
    wlecome_channel BIGINT(18) NOT NULL DEFAULT 0,
    welcome_msg_config JSON DEFAULT NULL
);

--  Warns Types
CREATE Table IF NOT EXISTS svr_warns(
    sv_id BIGINT(18) NOT NULL PRIMARY KEY,
    warn_desc VARCHAR(40) NOT NULL,
    val INT NOT NULL DEFAULT 0,
    kick BOOLEAN DEFAULT 0,
    mute BOOLEAN DEFAULT 0,
    mute_time INT DEFAULT 0,
    CONSTRAINT sv_warn_fk
        FOREIGN KEY(sv_id) REFERENCES servers(sv_id)
);

-- Users List
CREATE TABLE IF NOT EXISTS users(
    usr_id BIGINT(18) NOT NULL PRIMARY KEY,
    templade_type TINYINT NOT NULL DEFAULT 0,
    pri_color VARCHAR(6) NOT NULL DEFAULT '2F3136',
    sec_color VARCHAR(6) NOT NULL DEFAULT 'BEC1C8',
    last_tmp_changed DATETIME NOT NULL DEFAULT NOW(),
    spt_tk VARCHAR(338)
);

-- Playlis Form Users
CREATE Table IF NOT EXISTS users_pl(
    usr_id BIGINT(18) NOT NULL PRIMARY KEY,
    pl_id VARCHAR(22) NOT NULL,
    CONSTRAINT usr_pl_fk
		FOREIGN KEY(usr_id) REFERENCES users(usr_id)
);

-- Users And Servers Conection
CREATE TABLE IF NOT EXISTS usrs_srvs(
    usr_id BIGINT(18) NOT NULL,
    sv_id BIGINT(18)  NOT NULL,
    
    PRIMARY KEY(usr_id, sv_id),

    sv_t_xp INT NOT NULL DEFAULT 0,
    -- sv_acxp INT NOT NULL DEFAULT 0,
    act_level INT NOT NULL DEFAULT 0,
    warns INT NOT NULL DEFAULT 0,
    usr_money INT NOT NULL DEFAULT 0,
    CONSTRAINT user_fk
        FOREIGN KEY (usr_id) REFERENCES users(usr_id),
    CONSTRAINT srv_fk
        FOREIGN KEY (sv_id) REFERENCES servers(sv_id)
);