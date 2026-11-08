import { finalPrice } from './price'

// A custom package is priced from its tests; packages and tests carry their own price
export const itemMrp = (item) => item.type === 'custom' ? item.tests.reduce((sum, t) => sum + t.price, 0) : item.price

export const itemPrice = (item) => item.type === 'custom' ? item.tests.reduce((sum, t) => sum + finalPrice(t), 0) : finalPrice(item)
