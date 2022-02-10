import express  from require("express");

declare global {
    namespace Express {
        interface Request {
            sid?: string;
        }
    }
}