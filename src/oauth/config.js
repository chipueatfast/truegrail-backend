const noAuthRequiredRoutes = [
    {
        method: 'POST',
        url: '/user/',
    },
    {
        url: '/oauth/token',
        method: 'ALL',
    },
    {
        nest: 'factory',
    },
    {
        nest: 'contract',
    },
    {
        nest: 'sneaker',
    },
    {
        nest: 'user',
    }
];

export const checkNoAuthRequired = (url, method) => {
    const nest = url.split('/')[1];
    const isUnguarded = noAuthRequiredRoutes.filter(route =>
       ((route.nest === nest) || (route.url === url && ( route.method === method || route.method === 'ALL'))));
    return isUnguarded.length !== 0;
};


