//crud con ssession storage

export function guardarStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function leerStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function borrarStorage(key) {
    sessionStorage.removeItem(key);
}   
