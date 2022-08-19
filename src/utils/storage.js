export let KEY = 'BlueSky_Storage'

export function setToken(token) {
    return localStorage.setItem(KEY, JSON.stringify(token) || '')
}

export function getToken() {
    return JSON.parse(localStorage.getItem(KEY))
}

export function hasToken() {
    return !!getToken()
}