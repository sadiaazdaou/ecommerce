export function formatMoney(amountCentsOrObj) {
    // Accept either a number (cents) or an object like { priceCents: 1999 }
    let cents;

    if (amountCentsOrObj == null) {
        cents = 0;
    } else if (typeof amountCentsOrObj === 'object' && 'priceCents' in amountCentsOrObj) {
        cents = Number(amountCentsOrObj.priceCents);
    } else {
        // Try to coerce primitive values (string or number) to Number
        cents = Number(amountCentsOrObj);
    }

    if (!Number.isFinite(cents) || Number.isNaN(cents)) {
        cents = 0;
    }

    return `$${(cents / 100).toFixed(2)}`;
}
