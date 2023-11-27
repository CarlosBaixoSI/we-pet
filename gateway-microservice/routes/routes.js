const ROUTES = [
    {
        url: '/auth/signup',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:3001/auth/signup",
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
            target: "http://localhost:3001/auth/signin",
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
            target: "http://localhost:3001/auth/signout",
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
            target: "http://localhost:3001/auth/checktoken",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/checktoken`]: '',
            },
        }
    },
    {
        url: '/password/reset/confirm',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:3001/password/reset/confirm",
            changeOrigin: true,
            pathRewrite: {
                [`^/password/reset/confirm`]: '',
            },
        }
    }
    
]

exports.ROUTES = ROUTES;