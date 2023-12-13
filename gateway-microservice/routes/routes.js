const express = require('express')
const axios = require("axios");

const auth_path = "http://localhost:3001/auth/";
const users_path = "http://localhost:3002/users/";
const animals_path = "http://localhost:3003/animals/";
const advertisements_path = "http://localhost:3004/advertisements/";
const donations_path = "http://localhost:3005/donations/";
const shelters_path = "http://localhost:3006/shelters/";
const local_3001 = "http://localhost:3001";

//User management microservice
const local_3002 = "http://localhost:3002";
//Animals microservice
const local_3003 = "http://localhost:3003";
//Advertisements microservice
const local_3004 = "http://localhost:3004";
//Donation microservice
const local_3005 = "http://localhost:3005";
//Shelter microservice
const local_3006 = "http://localhost:3006";
list_of_ports = [auth_path, users_path, animals_path, advertisements_path, donations_path, shelters_path];

const router = express.Router();

router.get("/userExists/:id", async (req, res) => {
    let res_port = null;
    // check which port is requesting
    for (const port of list_of_ports) {
        try {
            await axios.get(`${port}`);
            res_port = port;
        }catch{
            continue;
        }
    }

    // ask the user microservice if the user exists
    try {
        await axios.get(`${users_path}/${req.params.id}`);
        res.status(200).json({ user_exists: true });
    }catch{
        res.status(200).json({ user_exists: false });
        return;
    }
});

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