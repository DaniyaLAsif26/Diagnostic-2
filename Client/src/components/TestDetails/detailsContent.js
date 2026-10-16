// Wording that differs between lab tests (collected at home) and radiology scans (done at the centre)
export const detailCopy = {
    lab: {
        priceLabel: 'Test price',
        prepTitle: 'Before your test',
        perks: [
            { icon: 'home', title: 'Free home collection', text: 'A phlebotomist visits at a time that suits you' },
            { icon: 'report', title: 'Reports within 24 hrs', text: 'Download online or get it on WhatsApp' },
            { icon: 'shield', title: 'Expert pathologists', text: 'Every report is reviewed before release' },
        ],
        payNote: 'No hidden charges · Pay online or at collection',
        // Steps falls back to its own lab journey
        steps: undefined,
        stepsTitle: undefined,
    },
    scan: {
        priceLabel: 'Scan price',
        prepTitle: 'Before your scan',
        perks: [
            { icon: 'calendar', title: 'Walk-in or pre-booked slots', text: 'Pick a time that suits you' },
            { icon: 'report', title: 'Digital reports', text: 'Download online or get it on WhatsApp' },
            { icon: 'award', title: 'Experienced radiologists', text: 'Every scan is reviewed before release' },
        ],
        payNote: 'No hidden charges · Pay online or at the centre',
        steps: [
            { icon: 'calendar', title: 'Book a scan', text: 'Book online, or simply give us a call.' },
            { icon: 'pin', title: 'Visit the centre', text: 'Come in at your slot, beside Fire Station, Moghalpura.' },
            { icon: 'scan', title: 'Your scan', text: 'Done in a comfortable, private room by trained staff.' },
            { icon: 'report', title: 'Get your report', text: 'Reviewed by a radiologist, then shared online or on WhatsApp.' },
        ],
        stepsTitle: 'Your scan in 4 simple steps',
    },
}

export const copyFor = (test) => (test.category === 'RADIOLOGY' ? detailCopy.scan : detailCopy.lab)
