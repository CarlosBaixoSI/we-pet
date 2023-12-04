//Auth microservice
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