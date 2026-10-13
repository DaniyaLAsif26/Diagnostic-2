/** Vision Diagnostic Centre contact details, shared by the public site. */
export const CONTACT = {
    phone: '+91 76598 31062',
    landline: '040-66713944',
    email: 'visiondiagnostic24@gmail.com',
    address: 'Beside Fire Station, Moghalpura, Hyderabad',
    fullAddress: '23-1-693/1, Beside Fire Station, Moghalpura, Hyderabad, Telangana 500002',
    hours: 'Mon – Sat: 8:00 AM – 11:00 PM',
    sundayHours: 'Sun: till 8:00 PM',
}

export const tel = `tel:${CONTACT.phone.replace(/\s/g, '')}`
export const landlineTel = `tel:${CONTACT.landline.replace(/\D/g, '')}`
export const whatsapp = `https://wa.me/${CONTACT.phone.replace(/\D/g, '')}`
export const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Vision Diagnostic Centre, ${CONTACT.fullAddress}`)}`
