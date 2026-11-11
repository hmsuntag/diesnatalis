// Ganti dengan nomor WhatsApp Panitia (Gunakan kode negara 62)
const PANITIA_WA = "6281234567890";

let currentCategory = 'mlbb';

// ==========================================
// FITUR PENGAMAN (ANTI-KLIK KANAN & ANTI-F12)
// ==========================================

// 1. Memblokir Klik Kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. Memblokir Pintasan Keyboard (F12, Ctrl+U, Ctrl+Shift+I/J/C)
document.addEventListener('keydown', function(e) {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.key === 'U') || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
    ) {
        e.preventDefault();
        return false;
    }
});

// 3. Deteksi Sederhana Developer Tools Terbuka
setInterval(function() {
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        document.body.innerHTML = "<div style='display:flex; justify-content:center; align-items:center; height:100vh; background:#0b0f17; color:#f43f5e; font-family:sans-serif; text-align:center;'><h2>Akses Ditolak: Developer Tools terdeteksi demi keamanan kode situs!</h2></div>";
    }
}, 1000);

// ==========================================
// RENDER FORM DINAMIS & KIRIM WA
// ==========================================

function renderForm(category) {
    const container = document.getElementById('formFields');
    let html = '';

    if (category === 'mlbb') {
        html = `
            <div class="space-y-4">
                <h3 class="text-base font-bold text-brand-500 tracking-wider uppercase border-b border-gray-800 pb-2">Informasi Tim / Squad</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div><label class="block text-xs text-gray-400 mb-1">Nama Tim / Squad</label><input type="text" id="ml_squad" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">Asal Kampus/Jurusan/Instansi</label><input type="text" id="ml_instansi" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">No. WhatsApp</label><input type="tel" id="ml_wa" class="form-input" required></div>
                </div>
            </div>
        `;
        const players = ["Pemain 1 (Kapten)", "Pemain 2", "Pemain 3", "Pemain 4", "Pemain 5", "Pemain Cadangan"];
        players.forEach((p, idx) => {
            html += `
                <div class="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 space-y-3">
                    <h4 class="text-sm font-semibold text-gray-200">${p}</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input type="text" id="ml_name_${idx}" placeholder="Nama Lengkap" class="form-input" ${idx < 5 ? 'required' : ''}>
                        <input type="text" id="ml_nick_${idx}" placeholder="Nick Name" class="form-input" ${idx < 5 ? 'required' : ''}>
                        <input type="text" id="ml_id_${idx}" placeholder="ID & Server MLBB" class="form-input" ${idx < 5 ? 'required' : ''}>
                        <input type="text" id="ml_role_${idx}" placeholder="Role Utama" class="form-input" ${idx < 5 ? 'required' : ''}>
                    </div>
                </div>
            `;
        });
    } else if (category === 'badminton') {
        html = `
            <div class="space-y-4">
                <h3 class="text-base font-bold text-brand-500 tracking-wider uppercase border-b border-gray-800 pb-2">Informasi Pasangan</h3>
                <div><label class="block text-xs text-gray-400 mb-1">Nama Tim / Pasangan</label><input type="text" id="bad_tim" class="form-input" required></div>
            </div>
        `;
        [1, 2].forEach(p => {
            html += `
                <div class="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 space-y-3">
                    <h4 class="text-sm font-semibold text-gray-200">Data Pemain ${p}</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" id="bad_name_${p}" placeholder="Nama Lengkap" class="form-input" required>
                        <input type="text" id="bad_nick_${p}" placeholder="Nama Panggilan / Punggung" class="form-input" required>
                        <input type="text" id="bad_ttl_${p}" placeholder="Tempat, Tgl Lahir" class="form-input" required>
                        <input type="tel" id="bad_wa_${p}" placeholder="Nomor WhatsApp" class="form-input" required>
                    </div>
                    <input type="text" id="bad_instansi_${p}" placeholder="Asal Kampus / Jurusan / Instansi" class="form-input" required>
                </div>
            `;
        });
    } else if (category === 'domino') {
        html = `
            <div class="space-y-4">
                <h3 class="text-base font-bold text-brand-500 tracking-wider uppercase border-b border-gray-800 pb-2">Informasi Pasangan Domino</h3>
                <div><label class="block text-xs text-gray-400 mb-1">Nama Tim / Pasangan</label><input type="text" id="dom_tim" class="form-input" required></div>
            </div>
        `;
        [1, 2].forEach(p => {
            html += `
                <div class="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 space-y-3">
                    <h4 class="text-sm font-semibold text-gray-200">Data Pemain ${p}</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input type="text" id="dom_name_${p}" placeholder="Nama Lengkap" class="form-input" required>
                        <input type="text" id="dom_nick_${p}" placeholder="Nama Panggilan" class="form-input" required>
                        <input type="tel" id="dom_wa_${p}" placeholder="No. WhatsApp" class="form-input" required>
                    </div>
                    <input type="text" id="dom_angkatan_${p}" placeholder="Angkatan" class="form-input" required>
                </div>
            `;
        });
    } else if (category === 'autocad') {
        html = `
            <div class="space-y-4">
                <h3 class="text-base font-bold text-brand-500 tracking-wider uppercase border-b border-gray-800 pb-2">Data Peserta AutoCAD</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="block text-xs text-gray-400 mb-1">Nama Lengkap</label><input type="text" id="cad_name" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">Nama Panggilan</label><input type="text" id="cad_nick" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">Email Aktif</label><input type="email" id="cad_email" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">No. WhatsApp</label><input type="tel" id="cad_wa" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">Tempat, Tgl Lahir</label><input type="text" id="cad_ttl" class="form-input" required></div>
                    <div><label class="block text-xs text-gray-400 mb-1">Asal Kampus/Jurusan/Instansi</label><input type="text" id="cad_instansi" class="form-input" required></div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function switchTab(category) {
    currentCategory = category;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${category}`).classList.add('active');
    renderForm(category);
}

function submitForm(e) {
    e.preventDefault();
    let text = '';

    if (currentCategory === 'mlbb') {
        text = `*PENDAFTARAN LOMBA MLBB*\n` +
               `1. Nama tim/squad : ${document.getElementById('ml_squad').value}\n` +
               `2. Asal kampus/jurusan/instansi : ${document.getElementById('ml_instansi').value}\n` +
               `3. no.whatsapp : ${document.getElementById('ml_wa').value}\n\n`;

        const labels = ['A. Data pemain 1 (kapten)', 'B. Data pemain 2', 'C. Data pemain 3', 'D. Data pemain 4', 'E. Data pemain 5', 'F. Data pemain cadangan'];
        labels.forEach((lbl, idx) => {
            const name = document.getElementById(`ml_name_${idx}`).value;
            if(name) {
                text += `${lbl}\n` +
                        `    •Nama lengkap : ${name}\n` +
                        `    •nick name : ${document.getElementById(`ml_nick_${idx}`).value}\n` +
                        `    •id & server mlbb : ${document.getElementById(`ml_id_${idx}`).value}\n` +
                        `    •role utama : ${document.getElementById(`ml_role_${idx}`).value}\n`;
            }
        });
    } else if (currentCategory === 'badminton') {
        text = `*PENDAFTARAN LOMBA BADMINTON*\n` +
               `1. NAMA TIM/PASANGAN : ${document.getElementById('bad_tim').value}\n\n` +
               `A.DATA PEMAIN 1\n` +
               `   •NAMA LENGKAP : ${document.getElementById('bad_name_1').value}\n` +
               `   •NAMA PANGGILAN/ NAMA PUNGGUNG : ${document.getElementById('bad_nick_1').value}\n` +
               `   •TEMPAT,TGL LAHIR : ${document.getElementById('bad_ttl_1').value}\n` +
               `   •NOMOR WHATSAPP : ${document.getElementById('bad_wa_1').value}\n` +
               `   •ASAL KAMPUS/ JURUSAN/INSTANSI : ${document.getElementById('bad_instansi_1').value}\n\n` +
               `B.DATA PEMAIN 2\n` +
               `   •NAMA LENGKAP : ${document.getElementById('bad_name_2').value}\n` +
               `   •NAMA PANGGILAN/ NAMA PUNGGUNG : ${document.getElementById('bad_nick_2').value}\n` +
               `   •TEMPAT,TGL LAHIR : ${document.getElementById('bad_ttl_2').value}\n` +
               `   •NOMOR WHATSAPP : ${document.getElementById('bad_wa_2').value}\n` +
               `   •ASAL KAMPUS/ JURUSAN/INSTANSI : ${document.getElementById('bad_instansi_2').value}`;
    } else if (currentCategory === 'domino') {
        text = `*PENDAFTARAN LOMBA DOMINO*\n` +
               `  •NAMA TIM/ PASANGAN : ${document.getElementById('dom_tim').value}\n` +
               `  •NAMA LENGKAP PEMAIN 1 : ${document.getElementById('dom_name_1').value}\n` +
               `  •NAMA PANGGILAN : ${document.getElementById('dom_nick_1').value}\n` +
               `  •NO.WHATSAPP : ${document.getElementById('dom_wa_1').value}\n` +
               `  •ANGKATAN : ${document.getElementById('dom_angkatan_1').value}\n` +
               `  •NAMA LENGKAP PEMAIN 2 : ${document.getElementById('dom_name_2').value}\n` +
               `  •NAMA PANGGILAN : ${document.getElementById('dom_nick_2').value}\n` +
               `  •NO.WHATSAPP : ${document.getElementById('dom_wa_2').value}\n` +
               `  •ANGKATAN : ${document.getElementById('dom_angkatan_2').value}`;
    } else if (currentCategory === 'autocad') {
        text = `*PENDAFTARAN LOMBA AUTOCAD*\n` +
               `  •NAMA LENGKAP : ${document.getElementById('cad_name').value}\n` +
               `  •NAMA PANGGILAN : ${document.getElementById('cad_nick').value}\n` +
               `  •EMAIL AKTIF : ${document.getElementById('cad_email').value}\n` +
               `  •NO.WHATSAPP : ${document.getElementById('cad_wa').value}\n` +
               `  •TEMPAT,TGL LAHIR : ${document.getElementById('cad_ttl').value}\n` +
               `  •ASAL KAMPUS/ JURUSAN/INSTANSI : ${document.getElementById('cad_instansi').value}`;
    }

    const waUrl = `https://wa.me/${PANITIA_WA}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

// Inisialisasi awal
document.addEventListener('DOMContentLoaded', () => {
    renderForm('mlbb');
});
