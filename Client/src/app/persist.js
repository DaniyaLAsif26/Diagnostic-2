const KEY = "vision-cart-v2"

const isEntry = (i) => (i?.type === 'test' || i?.type === 'package') && i?.id != null && i?.key === `${i.type}-${i.id}`

export const loadCart = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(KEY))
        return Array.isArray(saved?.items) && saved.items.every(isEntry) ? saved : undefined
    }
    catch {
        return undefined
    }
}

export const saveCart = (cart) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(cart))
    } catch {

    }
}