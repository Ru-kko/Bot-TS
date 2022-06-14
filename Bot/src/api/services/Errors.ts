import { apiError } from "../../../../types/apiResponse";

type config<T> =
    | { status: 404; data: { type: string; value: string } }
    | { status: 403; data: { value: string } }
    | { status: 401 }
    | { status: 500; message?: string; info: T };

export function requestError<T>(config: config<T>): apiError<T> {
    switch (config.status) {
        case 404:
            return {
                error: "Not Found",
                status: config.status,
                message: "Couldn't found a " + config.data!.type + " with id " + config.data!.value,
            };
        case 403:
            return {
                error: "Forbidden",
                status: config.status,
                message: `User with id ${config.data!.value} does not has permissions to edit this server`,
            };
        case 401:
            return {
                error: "Unauthorized",
                status: config.status,
                message: "You are not logged in",
            };
        case 500: {
            return {
                error: "Internal server error",
                status: config.status,
                message: config.message,
                newInfo: config.info
            };
        }
    }
}
