async function sortHand(hand) {
    // Step 1: Sort by number first and then by suit
    hand.sort((a, b) => {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);
        const suitA = a[a.length - 1];
        const suitB = b[b.length - 1];
        
        if (numA === numB) {
            return suitA.localeCompare(suitB);
        }
        return numA - numB;
    });

    // Step 2: Build a sorted string by suit, removing duplicates within the same suit
    const m = [], p = [], s = [], z = [];


    hand.forEach(tile => {
        const num = tile.slice(0, -1);
        const suit = tile[tile.length - 1];
        switch(suit) {
            case 'm':
                m.push(num);
                break;
            case 'p':
                p.push(num);
                break;
            case 's':
                s.push(num);
                break;
            case 'z':
                z.push(num);
                break;
        }
    });

    // Step 4: Concatenate results with suits appended
    let result = [];
    if (m.length) result.push(m.join('') + 'm');
    if (p.length) result.push(p.join('') + 'p');
    if (s.length) result.push(s.join('') + 's');
    if (z.length) result.push(z.join('') + 'z');

    return result.join(' ');
}

module.exports = sortHand;
