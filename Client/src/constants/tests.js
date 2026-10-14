/* ------------------------------------------------------------------
   Sample data - same shape as the Test model, swap for the API later.
   `relevance` holds the health-concern tags used by the filter.
------------------------------------------------------------------- */

export const tests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'LABORATORY', price: 450, offerPrice: 299, isPopular: true, relevance: ['fever'], preparation: '', description: 'Checks red cells, white cells and platelets to screen for infection, anaemia and more.' },
    { id: 2, name: 'Thyroid Profile (T3, T4, TSH)', category: 'LABORATORY', price: 700, offerPrice: 449, isPopular: true, relevance: ['thyroid', 'women'], preparation: '', description: 'Measures thyroid hormones to check for an under- or over-active thyroid.' },
    { id: 3, name: 'TSH (Ultrasensitive)', category: 'LABORATORY', price: 350, offerPrice: 0, isPopular: false, relevance: ['thyroid'], preparation: '', description: 'The main screening test for thyroid function.' },
    { id: 4, name: 'Lipid Profile', category: 'LABORATORY', price: 800, offerPrice: 499, isPopular: true, relevance: ['heart'], preparation: '10–12 hrs fasting', description: 'Cholesterol and triglycerides, to assess your risk of heart disease.' },
    { id: 5, name: 'HbA1c', category: 'LABORATORY', price: 600, offerPrice: 399, isPopular: true, relevance: ['diabetes'], preparation: '', description: 'Average blood sugar over the last 3 months.' },
    { id: 6, name: 'Fasting Blood Sugar', category: 'LABORATORY', price: 100, offerPrice: 60, isPopular: false, relevance: ['diabetes'], preparation: 'Overnight fasting', description: 'Blood glucose after an overnight fast.' },
    { id: 7, name: 'Vitamin D (25-OH)', category: 'LABORATORY', price: 1500, offerPrice: 899, isPopular: true, relevance: ['vitamin', 'bone'], preparation: '', description: 'Checks for vitamin D deficiency, which affects bones and immunity.' },
    { id: 8, name: 'Vitamin B12', category: 'LABORATORY', price: 1100, offerPrice: 649, isPopular: false, relevance: ['vitamin'], preparation: '', description: 'Low B12 can cause tiredness, weakness and numbness.' },
    { id: 9, name: 'Liver Function Test (LFT)', category: 'LABORATORY', price: 900, offerPrice: 549, isPopular: false, relevance: ['liver'], preparation: '8 hrs fasting', description: 'Enzymes, proteins and bilirubin that show how well your liver works.' },
    { id: 10, name: 'Kidney Function Test (KFT)', category: 'LABORATORY', price: 900, offerPrice: 549, isPopular: false, relevance: ['kidney'], preparation: '', description: 'Urea, creatinine and electrolytes to check kidney health.' },
    { id: 11, name: 'Urine Routine & Microscopy', category: 'LABORATORY', price: 250, offerPrice: 0, isPopular: false, relevance: ['kidney', 'fever'], preparation: 'First morning sample', description: 'Screens for urinary infection and kidney problems.' },
    { id: 12, name: 'C-Reactive Protein (CRP)', category: 'LABORATORY', price: 600, offerPrice: 399, isPopular: false, relevance: ['fever', 'heart'], preparation: '', description: 'A marker of inflammation or infection in the body.' },
    { id: 13, name: 'Dengue NS1 Antigen', category: 'LABORATORY', price: 900, offerPrice: 699, isPopular: false, relevance: ['fever'], preparation: '', description: 'Early detection of dengue in the first days of fever.' },
    { id: 14, name: 'Calcium (Serum)', category: 'LABORATORY', price: 300, offerPrice: 0, isPopular: false, relevance: ['bone'], preparation: '', description: 'Calcium level, important for bones, muscles and nerves.' },
    { id: 15, name: 'Uric Acid', category: 'LABORATORY', price: 300, offerPrice: 199, isPopular: false, relevance: ['bone', 'kidney'], preparation: '', description: 'High levels can cause gout and joint pain.' },
    { id: 16, name: 'Iron Studies', category: 'LABORATORY', price: 1200, offerPrice: 799, isPopular: false, relevance: ['women', 'vitamin'], preparation: '', description: 'Iron, ferritin and TIBC to check for iron deficiency.' },
    { id: 17, name: 'IgE (Total)', category: 'LABORATORY', price: 900, offerPrice: 0, isPopular: false, relevance: ['lung'], preparation: '', description: 'Raised levels can point to allergies or asthma.' },
    { id: 18, name: 'Beta hCG', category: 'LABORATORY', price: 800, offerPrice: 549, isPopular: false, relevance: ['women'], preparation: '', description: 'Confirms and monitors pregnancy.' },
    { id: 19, name: 'Chest X-Ray (PA View)', category: 'RADIOLOGY', price: 500, offerPrice: 399, isPopular: true, relevance: ['lung'], preparation: '', description: 'Digital X-ray of the chest for lungs and heart outline.' },
    { id: 20, name: 'ECG', category: 'RADIOLOGY', price: 300, offerPrice: 0, isPopular: false, relevance: ['heart'], preparation: '', description: 'Records the heart’s electrical activity in a few minutes.' },
    { id: 21, name: 'Ultrasound Abdomen', category: 'RADIOLOGY', price: 1500, offerPrice: 1199, isPopular: false, relevance: ['liver', 'kidney'], preparation: '6 hrs fasting, full bladder', description: 'Images the liver, gallbladder, kidneys and other abdominal organs.' },
    { id: 22, name: 'X-Ray Knee (AP & Lateral)', category: 'RADIOLOGY', price: 600, offerPrice: 0, isPopular: false, relevance: ['bone'], preparation: '', description: 'Checks the knee joint for injury or arthritis.' },
    { id: 23, name: 'Ultrasound Pelvis', category: 'RADIOLOGY', price: 1400, offerPrice: 1099, isPopular: false, relevance: ['women'], preparation: 'Full bladder', description: 'Images the uterus, ovaries and bladder.' },
]
