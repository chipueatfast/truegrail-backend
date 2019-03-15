const noAuthRequiredRoutes = [
    {
        method: 'POST',
        url: '/user/',
    },
    {
        url: '/oauth/token',
        method: 'ALL',
    }
];

export const checkNoAuthRequired = (url, method) => {
    const isUnguarded = noAuthRequiredRoutes.filter(route =>
        route.url === url && ( route.method === method || route.method === 'ALL'));
    return isUnguarded.length !== 0;
};


