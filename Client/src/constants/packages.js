/* ------------------------------------------------------------------
   Sample data - same shape as the Package model, swap for the API later.
   `relevance` holds the health-concern tags used by the filter.
------------------------------------------------------------------- */

export const packages = [
    {
        id: 1, name: 'Full Body Checkup', price: 2999, offerPrice: 1499, isPopular: true,
        relevance: ['heart', 'liver', 'kidney', 'thyroid', 'diabetes', 'vitamin'], preparation: '10–12 hrs fasting',
        description: 'A complete head-to-toe screening for adults, ideal once a year.',
        tests: ['Complete Blood Count (CBC)', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Thyroid Profile', 'HbA1c', 'Vitamin D', 'Vitamin B12', 'Urine Routine'],
    },
    {
        id: 2, name: 'Basic Health Checkup', price: 1499, offerPrice: 799, isPopular: true,
        relevance: ['diabetes', 'kidney', 'fever'], preparation: '8 hrs fasting',
        description: 'Essential tests to get a quick picture of your overall health.',
        tests: ['Complete Blood Count (CBC)', 'Fasting Blood Sugar', 'Kidney Function Test', 'Urine Routine'],
    },
    {
        id: 3, name: 'Diabetes Care Package', price: 1899, offerPrice: 999, isPopular: true,
        relevance: ['diabetes', 'kidney'], preparation: '10–12 hrs fasting',
        description: 'Tracks blood sugar control and checks the kidneys, which diabetes can affect.',
        tests: ['HbA1c', 'Fasting Blood Sugar', 'Post-Prandial Blood Sugar', 'Urine Microalbumin', 'Kidney Function Test'],
    },
    {
        id: 4, name: 'Heart Care Package', price: 2499, offerPrice: 1599, isPopular: false,
        relevance: ['heart'], preparation: '10–12 hrs fasting',
        description: 'Assesses your heart risk with cholesterol, inflammation and an ECG.',
        tests: ['Lipid Profile', 'C-Reactive Protein (hs-CRP)', 'ECG', 'Fasting Blood Sugar', 'Complete Blood Count (CBC)'],
    },
    {
        id: 5, name: 'Thyroid Care Package', price: 1200, offerPrice: 699, isPopular: false,
        relevance: ['thyroid'], preparation: '',
        description: 'A full thyroid work-up, including antibodies.',
        tests: ['T3', 'T4', 'TSH (Ultrasensitive)', 'Anti-TPO Antibodies'],
    },
    {
        id: 6, name: 'Liver & Kidney Care', price: 1999, offerPrice: 1199, isPopular: false,
        relevance: ['liver', 'kidney'], preparation: '8 hrs fasting',
        description: 'Checks how well your liver and kidneys are working.',
        tests: ['Liver Function Test', 'Kidney Function Test', 'Uric Acid', 'Electrolytes', 'Urine Routine'],
    },
    {
        id: 7, name: 'Women’s Wellness', price: 3499, offerPrice: 1899, isPopular: true,
        relevance: ['women', 'thyroid', 'vitamin', 'bone'], preparation: '8 hrs fasting',
        description: 'Covers the tests women most often need: thyroid, iron, vitamins and bones.',
        tests: ['Thyroid Profile', 'Iron Studies', 'Vitamin D', 'Vitamin B12', 'Calcium', 'Complete Blood Count (CBC)'],
    },
    {
        id: 8, name: 'Fever Panel', price: 1599, offerPrice: 999, isPopular: false,
        relevance: ['fever'], preparation: '',
        description: 'Finds the common causes of fever, including dengue, malaria and typhoid.',
        tests: ['Complete Blood Count (CBC)', 'Dengue NS1 Antigen', 'Malaria Antigen', 'Widal Test', 'C-Reactive Protein (CRP)', 'Urine Routine'],
    },
    {
        id: 9, name: 'Bone & Joint Care', price: 1799, offerPrice: 1099, isPopular: false,
        relevance: ['bone', 'vitamin'], preparation: '',
        description: 'Checks the minerals and vitamins your bones and joints depend on.',
        tests: ['Vitamin D', 'Calcium', 'Phosphorus', 'Uric Acid', 'RA Factor'],
    },
    {
        id: 10, name: 'Allergy & Lung Care', price: 1999, offerPrice: 0, isPopular: false,
        relevance: ['lung'], preparation: '',
        description: 'For frequent coughs, wheezing or allergies.',
        tests: ['IgE (Total)', 'Absolute Eosinophil Count', 'Chest X-Ray (PA View)', 'Complete Blood Count (CBC)'],
    },
]
