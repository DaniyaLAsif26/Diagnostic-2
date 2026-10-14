export const inr = (n) => `₹${n.toLocaleString('en-IN')}`

// offerPrice is 0 when there is no offer; only a lower offer counts as a discount
export const onOffer = ({ price, offerPrice }) => offerPrice > 0 && offerPrice < price

export const finalPrice = (item) => (onOffer(item) ? item.offerPrice : item.price)

export const discountPercent = ({ price, offerPrice }) => Math.round((1 - offerPrice / price) * 100)
