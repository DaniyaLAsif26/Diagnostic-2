/**
 * Seeds the Test table with the catalogue from visiondiagnosticscentre.com (names and prices as listed there).
 * Safe to re-run: tests whose name already exists are skipped.
 *
 *   node src/prisma/seed/tests.js
 *
 * Relevance comes from the site's "Search by Relevance" filter, mapped onto this app's concern tags
 * (Infection -> fever, Lungs -> lung, Pregnancy -> women). The site has no tags for radiology,
 * so those were assigned by body area. The site lists no preparation or description.
 */
import { prisma } from '../../database/db-connection.js'

// Shown as popular on the site's home page
const popular = ['Complete Blood Picture', 'Liver Function Test (LFT)', 'Fasting Blood Sugar']

// [name, price, relevance]
const laboratory = [
    ['Pus Culture', 500, ['fever']],
    ['Serum Amylase', 500, ['stomach']],
    ['Complete Blood Picture', 250, ['blood']],
    ['PAR Smear', 1000, ['blood']],
    ['S.G.P.T', 100, ['liver']],
    ['Urine For Albumin', 150, ['kidney']],
    ['Antinuclear Antibody (ANA) Profile', 4000, ['blood']],
    ['Gamma Glutamyl Transferase (GGT)', 400, ['liver']],
    ['Serum Calcium', 250, ['bone']],
    ['Anti Cyclic Citrullinated Peptide Antibody', 2000, ['blood']],
    ['Stool Examination', 200, ['stomach']],
    ['Testosterone Free', 1000, ['hormone']],
    ['Rubella IGG', 1000, ['fever']],
    ['Anti Phospholipid, Antibodies IGA', 2200, ['blood']],
    ['Rubella IGM', 1000, ['fever']],
    ['Dengue IGG, IGM, NS1', 1200, ['fever']],
    ['Malarial Parasite', 600, ['fever']],
    ['Calcitonin', 4000, ['thyroid']],
    ['Cortisol', 1000, ['thyroid']],
    ['Serum Bilirubin', 200, ['liver']],
    ['Albert Stain', 500, ['fever']],
    ['Anti HAV Hepatatis A Virus IGM', 850, ['fever']],
    ['Thyroid Profile (T3, T4, TSH)', 450, ['thyroid']],
    ['Coombs Direct', 500, ['blood']],
    ['Semen Analysis', 450, ['fertility']],
    ['C-Reactive Protein (CRP)', 450, ['fever']],
    ['HCV', 550, ['fever']],
    ['Prostate-Specific Antigen (P.S.A)', 1000, ['cancer']],
    ['Biopsy Large', 1500, ['stomach']],
    ['Iron Profile', 2000, ['blood']],
    ['Pleural Fluid ADA', 550, ['lung']],
    ['Serum Lipase', 600, ['stomach']],
    ['Liver Function Test (LFT)', 550, ['liver']],
    ['Urine For Pregnancy', 200, ['women']],
    ['Biopsy Medium', 1200, ['stomach']],
    ['S.G.O.T', 100, ['liver']],
    ['Urine Culture', 450, ['kidney']],
    ['Random Blood Sugar', 60, ['diabetes']],
    ['Serum Prolactin', 500, ['hormone']],
    ['Blood Urea', 200, ['kidney']],
    ['HB Electropherosis', 1450, ['blood']],
    ['HLAB - 27', 2800, ['blood']],
    ['Sputum For Culture', 550, ['fever']],
    ['Biopsy Small', 800, ['stomach']],
    ['Platelet Count', 100, ['blood']],
    ['Activated Partial Thromboplastin Time(APTT)', 600, ['blood']],
    ['Lactate Dehydrogenase (LDH)', 500, ['blood']],
    ['Blood Group', 100, ['blood']],
    ['Prothrombin Time (PT), INR Blood test', 650, ['blood']],
    ['Serum Creatinine', 200, ['kidney']],
    ['Widal', 300, ['fever']],
    ['Post Lunch Blood Sugar', 60, ['diabetes']],
    ['Oral Glucose Challenge Test (OGCT)', 250, ['diabetes']],
    ['Rheumatoid Factor (RF)', 400, ['blood']],
    ['Oral Glucose Tolerance Test (OGTT)', 350, ['diabetes']],
    ['Vitamin B12', 800, ['blood', 'vitamin']],
    ['Stool for Culture & Sensitivity', 500, ['fever']],
    ['Serum Uric Acid', 300, ['blood']],
    ['Absolute Eosinophil Count (AEC)', 110, ['blood']],
    ['HBA1C', 700, ['diabetes']],
    ['Venereal Disease Research Laboratory (VDRL)', 450, ['fever']],
    ['Alkaline Phosphate', 200, ['liver']],
    ['Free T4', 550, ['thyroid']],
    ['Free T3', 500, ['thyroid']],
    ['Ferretin', 800, ['blood']],
    ['Complete Haemogram', 400, ['blood']],
    ['ECG', 300, ['heart']],
    ['Blood For MP (SMEAR)', 110, ['blood']],
    ['Erythrocyte Sedimentation Rate test', 110, ['blood']],
    ['Sputum For Gram Stain', 500, ['fever']],
    ['Haemoglobin', 100, ['blood']],
    ['HIV 1&2', 500, ['fever']],
    ['Immuno Globulin Profile', 2300, ['blood']],
    ['Bleeding Time(BT) & Clotting Time(CT)', 100, ['blood']],
    ['Complete Blood Count', 500, ['blood']],
    ['Cholestrol', 250, ['liver']],
    ['Stool for Occult Blood & Reducing Substances', 350, ['stomach']],
    ['Vitamin D3', 1200, ['blood', 'vitamin']],
    ['Lipid Profile', 550, ['liver']],
    ['Urine For Ketone Bodies', 100, ['diabetes']],
    ['Serum Electrolytes', 500, ['blood']],
    ['Progesterone', 500, ['hormone']],
    ['Complete Urine Examination', 100, ['kidney']],
    ['Antistreptolysin O (ASO)', 550, ['blood']],
    ['Human Growth Hormone', 1000, ['hormone']],
    ['Coombs Indirect', 550, ['blood']],
    ['Fasting Blood Sugar', 60, ['diabetes']],
    ['Mantoux', 300, ['fever']],
    ['Total Cell Count & Differential Cell Count (TC/DC)', 100, ['blood']],
    ['Pleural Fluid Analysis', 1000, ['lung']],
    ['Testosterone - Total', 600, ['hormone']],
    ['Beta HCG', 1000, ['women']],
    ['Luteinizing Hormone (LH)', 500, ['hormone']],
    ['Reticulocyte Count', 200, ['blood']],
    ['Sputum For AFB', 300, ['fever']],
    ['Thyroid Stimulating Hormone(TSH)', 300, ['thyroid']],
    ['Hepatitis B Surface Antigen (HBSAG)', 450, ['fever']],
]

const radiology = [
    ['X-Ray PNS', 450, ['lung']],
    ['USG Obstric Scan/Antenatal Scan', 1100, ['women']],
    ['GrowthScan', 1300, ['women']],
    ['X-Ray Chest AP/LAT View', 900, ['lung']],
    ['TIFFA', 1500, ['women']],
    ['USG Scrotum', 1600, ['scan']],
    ['X-Rays AP/LAT', 450, ['bone']],
    ['USG Abdomen & Pelvis', 1100, ['stomach']],
    ['USG Neck Plus', 1650, ['thyroid']],
    ['GrowthScan Doppler', 3000, ['women']],
    ['Chest Ap View', 450, ['lung']],
    ['X-Rays Chest PA View', 450, ['lung']],
    ['2D Echo', 2000, ['heart']],
    ['X-Ray Nasal Bone Lat', 450, ['bone']],
    ['USG Axilla', 1500, ['scan']],
    ['Nt Scan', 1500, ['women']],
    ['X-Ray Cervical, Lumbar, Shull, Erect Abdomen', 600, ['bone']],
]

const toRows = (list, category) => list.map(([name, price, relevance]) => ({
    name,
    price,
    category,
    relevance,
    isPopular: popular.includes(name),
}))

const data = [...toRows(laboratory, 'LABORATORY'), ...toRows(radiology, 'RADIOLOGY')]

const { count } = await prisma.test.createMany({ data, skipDuplicates: true })
console.log(`Added ${count} of ${data.length} tests (${data.length - count} already existed)`)

await prisma.$disconnect()
