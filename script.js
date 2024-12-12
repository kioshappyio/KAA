const alphabet_map = {
    'A': 'La', 'B': 'Pi', 'C': 'Sa', 'D': 'Di', 'E': 'Ka', 'F': 'Mo',
    'G': 'Re', 'H': 'Ta', 'I': 'Ni', 'J': 'Li', 'K': 'Ko', 'L': 'Mi',
    'M': 'Pa', 'N': 'Ri', 'O': 'Va', 'P': 'Ji', 'Q': 'Lo', 'R': 'Ru',
    'S': 'Fe', 'T': 'Wu', 'U': 'Xa', 'V': 'Yu', 'W': 'He', 'X': 'Go',
    'Y': 'Vi', 'Z': 'Zo'
};

function convertToNewLanguage(word) {
    let result = [];
    for (let char of word.toUpperCase()) {
        if (alphabet_map[char]) {
            result.push(alphabet_map[char]);
        } else {
            result.push(char);
        }
    }
    return result.join(' ');
}

function checkPin() {
    const pin = document.getElementById('inputPin').value;
    const correctPin = "281206";

    if (pin === correctPin) {
        document.getElementById('content').style.display = 'block';
        Swal.fire({
            title: 'Akses Berhasil!',
            text: 'PIN benar, Kamu dapat menggunakan KAA!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: 'Akses Ditolak!',
            text: 'PIN yang Kamu masukkan salah. Akses ditolak.',
            icon: 'error',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById('inputPin').value = ''; // Clear input field
        });
    }
}

function convertWord() {
    const inputWord = document.getElementById('inputWord').value;
    const convertedWord = convertToNewLanguage(inputWord);
    document.getElementById('result').textContent = convertedWord;
}

function showSweetAlert() {
    Swal.fire({
        title: 'Sweet Alert!',
        text: 'Ini adalah Sweet Alert yang keren!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function copyToClipboard() {
    const resultText = document.getElementById('result').textContent;
    if (resultText) {
        navigator.clipboard.writeText(resultText).then(function() {
            Swal.fire({
                title: 'Teks disalin!',
                text: 'Hasil konversi telah disalin ke clipboard.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }).catch(function(err) {
            Swal.fire({
                title: 'Gagal Menyalin',
                text: 'Terjadi kesalahan saat menyalin teks.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
    } else {
        Swal.fire({
            title: 'Tidak Ada Hasil',
            text: 'Tidak ada teks yang bisa disalin.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
  }
