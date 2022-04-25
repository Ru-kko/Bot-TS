import { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            sid?: string;
        }
    }
}