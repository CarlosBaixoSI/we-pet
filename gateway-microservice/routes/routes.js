const local_3001 = "http://localhost:3001";
const local_3003 = "http://localhost:3003";

const ROUTES = [
    {
        url: '/auth/signup',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth/signup",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/signup`]: '',
            },
        }
    },
    {
        url: '/auth/signin',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth/signin",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/signin`]: '',
            },
        }
    },
    {
        url: '/auth/signout',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth/signout",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/signout`]: '',
            },
        }
    },
    {
        url: '/auth/checktoken',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth/checktoken",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/checktoken`]: '',
            },
        }
    },
    {
        url: '/auth/isAdmin',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/auth/isAdmin",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/isAdmin`]: '',
            },
        }
    },
    {
        url: '/password/reset/confirm',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/password/reset/confirm",
            changeOrigin: true,
            pathRewrite: {
                [`^/password/reset/confirm`]: '',
            },
        }
    },
    {
        url: '/password/reset/request',
        auth: false,
        creditCheck: false,
        proxy: {
            target: local_3001 + "/password/reset/request",
            changeOrigin: true,
            pathRewrite: {
                [`^/password/reset/request`]: '',
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
    }
]

exports.ROUTES = ROUTES;