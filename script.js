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

    // Regex untuk mendeteksi teks di dalam tanda kutip tunggal
    const regex = /'([^']+)'/g;
    let protectedTexts = [];
    let modifiedText = inputText;

    // Ambil semua teks dalam tanda kutip dan simpan
    let match;
    while ((match = regex.exec(inputText)) !== null) {
        protectedTexts.push(match[1]);
        modifiedText = modifiedText.replace(match[0], `__PROTECTED_${protectedTexts.length - 1}__`);
    }

    let translatedText;
    if (mode === 'toCustom') {
        // Terjemahkan ke bahasa baru
        translatedText = modifiedText.toUpperCase().split('').map(char => {
            // Abaikan spasi, angka, atau simbol
            if (alphabet_map[char]) {
                return alphabet_map[char];
            }
            return char; // Tetap utuh jika bukan huruf
        }).join(' ');
    } else {
        // Terjemahkan ke bahasa asli
        translatedText = modifiedText.split('  ').map(wordGroup => {
            return wordGroup.split(' ').map(word => {
                // Abaikan spasi, angka, atau simbol
                if (reverse_alphabet_map[word]) {
                    return reverse_alphabet_map[word];
                }
                return word; // Tetap utuh jika bukan dalam peta translasi
            }).join('');
        }).join(' ');
    }

    // Kembalikan teks yang dilindungi (dalam tanda kutip)
    protectedTexts.forEach((text, index) => {
        translatedText = translatedText.replace(`__PROTECTED_${index}__`, `'${text}'`);
    });

    // Tampilkan hasil translasi
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
