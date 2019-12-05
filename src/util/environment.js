export function isProduction() {
    return process.env.NODE_ENV === 'production';
}

export function getSmartContract() {
    return isProduction() ? 'truegrail123' : 'truegrail2';
}