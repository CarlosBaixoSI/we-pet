const express = require('express')
const axios = require("axios");

const auth_path = "http://localhost:3001/auth/";
const users_path = "http://localhost:3002/users/";
const animals_path = "http://localhost:3003/animals/";
const advertisements_path = "http://localhost:3004/advertisements/";
const donations_path = "http://localhost:3005/donations/";
const shelters_path = "http://localhost:3006/shelters/";


const local_3001 = "http://we-pet-auth-microservice-1:3001";

//User management microservice
const local_3002 = "http://we-pet-user-microservice-1:3002";
//Animals microservice
const local_3003 = "http://we-pet-animal-microservice-1:3003";
//Advertisements microservice
const local_3004 = "http://we-pet-advertisement-microservice-1:3004";
//Donation microservice
const local_3005 = "http://we-pet-donations-microservice-1:3005";
//Shelter microservice
const local_3006 = "http://we-pet-shelter-microservice-1:3006";
list_of_ports = [auth_path, users_path, animals_path, advertisements_path, donations_path, shelters_path];

const router = express.Router();

//module.exports = router;

const ROUTES = [
    {
        url: '/auth',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    },
    {
        url: '/password/reset',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/password/reset",
            changeOrigin: true,
            pathRewrite: {
                [`^/password/reset`]: '',
            },
        }
    },

    //Animals microservice
    {
        url: '/animals',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3003 + "/animals",
            changeOrigin: true,
            pathRewrite: {
                [`^/animals`]: '',
            },
        }
    },

    //Advertisements microservice
    {
        url: '/advertisements',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3004 + "/advertisements",
            changeOrigin: true,
            pathRewrite: {
                [`^/advertisements`]: '',
            },
        }
    },
    {
        url: '/advertisements/user/{id}',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3004 + "/advertisements/user/{id}",
            changeOrigin: true,
            pathRewrite: {
                [`^/advertisements/user/{id}`]: '',
            },
        }
    },

    //Donation microservice
    {
        url: '/donations',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3005 + "/donations",
            changeOrigin: true,
            pathRewrite: {
                [`^/donations`]: '',
            },
        }
    },

    //Shelter microservice
    {
        url: '/shelters',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3006 + "/shelters",
            changeOrigin: true,
            pathRewrite: {
                [`^/shelters`]: '',
            },
        }
    },

    
    //User microservice
    {
        url: '/users',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3002 + "/users",
            changeOrigin: true,
            pathRewrite: {
                [`^/users`]: '',
            },
        }
    }
]



exports.ROUTES = ROUTES;