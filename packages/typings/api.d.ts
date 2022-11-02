import { role, userBase } from "./dcAuth";

export interface guildsResponse {
  [id: string]: {
    name: string;
    icon?: string;
    owner: boolean;
    permissions: number;
    permissions_new: number;
    features: string[];
    haveBot?: boolean;
  };
}

export interface optionsBase {
  public_leader?: boolean;
  prefix?: string;
}

export interface apiError<T> {
  error: string;
  status?: number;
  message?: string;
  newInfo?: T;
}

export interface guildWithOptions extends optionsBase {
  id: string;
  name: string;
  user: userBase;
  icon?: string;
  roles: role[];
}

export interface configurationRequest extends optionsBase {}

export type guildOptions = Partial<guildWithOptions>;
