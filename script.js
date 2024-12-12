const alphabet_map = {
    'A': 'La', 'B': 'Pi', 'C': 'Sa', 'D': 'Di', 'E': 'Ka', 'F': 'Mo',
    'G': 'Re', 'H': 'Ta', 'I': 'Ni', 'J': 'Li', 'K': 'Ko', 'L': 'Mi',
    'M': 'Pa', 'N': 'Ri', 'O': 'Va', 'P': 'Ji', 'Q': 'Lo', 'R': 'Ru',
    'S': 'Fe', 'T': 'Wu', 'U': 'Xa', 'V': 'Yu', 'W': 'He', 'X': 'Go',
    'Y': 'Vi', 'Z': 'Zo'
};

const reverse_alphabet_map = Object.fromEntries(
    Object.entries(alphabet_map).map(([key, value]) => [value, key])
);

function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const mode = document.getElementById('translationMode').value;

    if (!inputText) {
        Swal.fire({
            title: 'Input Kosong!',
            text: 'Harap masukkan teks untuk diterjemahkan.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    let translatedText;
    if (mode === 'toCustom') {
        // Terjemahkan ke bahasa baru
        translatedText = inputText.toUpperCase().split('').map(char => {
            return alphabet_map[char] || char;
        }).join(' ');
    } else {
        // Terjemahkan ke bahasa asli
        translatedText = inputText.split('  ').map(wordGroup => {
            return wordGroup.split(' ').map(word => {
                return reverse_alphabet_map[word] || '';
            }).join('');
        }).join(' ');
    }

    document.getElementById('translatedText').textContent = translatedText;
    document.getElementById('resultAlert').style.display = 'block';
}

function copyToClipboard() {
    const translatedText = document.getElementById('translatedText').textContent;
    if (translatedText) {
        navigator.clipboard.writeText(translatedText).then(() => {
            Swal.fire({
                title: 'Berhasil Disalin!',
                text: 'Hasil terjemahan telah disalin ke clipboard.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }).catch(err => {
            Swal.fire({
                title: 'Gagal Menyalin!',
                text: 'Terjadi kesalahan saat menyalin teks.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    } else {
        Swal.fire({
            title: 'Tidak Ada Teks!',
            text: 'Hasil terjemahan kosong.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
}


    
