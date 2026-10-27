//crud con ssession storage

export function guardarStorage(key, data) {
    sessionStorage.setItem(key, data);
}

export function leerStorage(key) {
    return sessionStorage.getItem(key);
}

export function borrarStorage(key) {
    sessionStorage.removeItem(key);
}   
