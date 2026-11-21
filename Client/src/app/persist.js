const KEY = "vision-cart"

export const loadCart = () =>{
    try {
        const saved = JSON.parse(localStorage.getItem(KEY))
        return Array.isArray(saved?.items) ? saved : undefined
    }
    catch{
        return undefined
    }
}

export const saveCart = (cart) =>{
    try{
        localStorage.setItem(KEY , JSON.stringify(cart))
    }catch{
        
    }
}