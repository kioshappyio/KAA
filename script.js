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

    // Regex untuk mendeteksi teks dalam tanda kurung siku
    const regex = /([^]+)/g;
    let protectedTexts = [];
    let modifiedText = inputText;

    // Ambil teks dalam kurung siku dan ganti dengan placeholder
    let match;
    while ((match = regex.exec(inputText)) !== null) {
        protectedTexts.push(match[1]);
        modifiedText = modifiedText.replace(match[0], `__PROTECTED_${protectedTexts.length - 1}__`);
    }

    let translatedText;
    if (mode === 'toCustom') {
        // Terjemahkan ke bahasa baru
        translatedText = modifiedText.toUpperCase().split('').map(char => {
            if (alphabet_map[char]) {
                return alphabet_map[char];
            } else if (char === ' ') {
                return ' '; // Pertahankan spasi
            }
            return char;
        }).join(' ').replace(/\s+/g, ' ').trim(); // Rapikan spasi
    } else {
        // Terjemahkan ke bahasa asli
        translatedText = modifiedText.split(/\s+/).map(word => {
            if (reverse_alphabet_map[word]) {
                return reverse_alphabet_map[word];
            }
            return word;
        }).join('').replace(/__PROTECTED_(\d+)/g, (_, index) => `[${protectedTexts[index]}]`);
    }

    // Kembalikan teks yang dilindungi (tidak diterjemahkan)
    protectedTexts.forEach((text, index) => {
        translatedText = translatedText.replace(`__PROTECTED_${index}__`, `[${text}]`);
    });

    document.getElementById('translatedText').textContent = translatedText.trim();
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
