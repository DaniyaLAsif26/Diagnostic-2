// "Lipid Profile (Basic)" -> "lipid-profile-basic", for readable URLs like /test/lipid-profile-basic/4
export const slugify = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
