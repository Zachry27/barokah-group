import { BusFront, FileCheck2, Hotel, Luggage, Plane, TrainFront, UsersRound } from 'lucide-react';
export const services = [
  {slug:'land-arrangement-umrah',title:'Land Arrangement Umrah',kicker:'Saudi Operations',summary:'Koordinasi kebutuhan darat Umrah untuk group dan travel agent.',icon:UsersRound,features:['Hotel sesuai brief','Transport & handling','Haramain / bus sesuai kebutuhan','Koordinasi group']},
  {slug:'land-arrangement-mesir',title:'Land Arrangement Mesir',kicker:'Egypt Operations',summary:'Dukungan itinerary, transport, hotel, dan kebutuhan group di Mesir.',icon:Hotel,features:['Hotel','Transport','Itinerary support','Group handling']},
  {slug:'land-arrangement-turki',title:'Land Arrangement Turki',kicker:'Türkiye Operations',summary:'Brief kebutuhan perjalanan dan operasional group di Turki.',icon:Hotel,features:['Hotel','Transport','Itinerary support','Group handling']},
  {slug:'visa',title:'Visa & Entry Support',kicker:'Document Desk',summary:'Jalur konsultasi Visa Umrah, Mesir, Dubai, dan kebutuhan entry terkait.',icon:FileCheck2,features:['Visa Group + Bus','Visa Umrah','Visa Mesir','Visa Dubai']},
  {slug:'tiket-pesawat',title:'Tiket Pesawat',kicker:'Flight Desk',summary:'Pencarian dan konsultasi tiket sesuai rute, tanggal, dan kebutuhan bagasi.',icon:Plane,features:['Rute internasional','Group inquiry','Bagasi sesuai fare','Konfirmasi sebelum pembayaran']},
  {slug:'haramain-train',title:'Haramain Train',kicker:'Saudi Mobility',summary:'Konsultasi tiket kereta cepat Haramain untuk rute yang tersedia.',icon:TrainFront,features:['Makkah','Madinah','Jeddah','Konfirmasi jadwal aktual']},
  {slug:'nwbus',title:'NWBus',kicker:'Saudi Mobility',summary:'Konsultasi tiket bus NWBus sesuai rute dan jadwal operasional.',icon:BusFront,features:['Pencarian rute','Group inquiry','Jadwal aktual','Konfirmasi admin']},
  {slug:'bagasi-cairo-jakarta',title:'Bagasi Cairo ⇄ Jakarta',kicker:'Cargo & Baggage',summary:'Jalur konsultasi pengiriman bagasi Cairo–Jakarta dan sebaliknya.',icon:Luggage,features:['Cairo → Jakarta','Jakarta → Cairo','Estimasi berat','Konfirmasi barang & slot']},
];
export const visaOptions=[
  {country:'Saudi',title:'Visa Group + Bus',note:'Untuk kebutuhan group yang memerlukan koordinasi visa dan transport terkait.'},
  {country:'Saudi',title:'Visa Umrah Express',note:'Jalur konsultasi visa Umrah dengan kebutuhan proses lebih cepat; waktu final dikonfirmasi admin.'},
  {country:'Saudi',title:'Visa Umrah Short Stay',note:'Konsultasi opsi visa Umrah untuk periode kunjungan yang lebih singkat.'},
  {country:'Saudi',title:'Visa Umrah Long Stay',note:'Konsultasi kebutuhan masa tinggal lebih panjang sesuai opsi yang tersedia.'},
  {country:'Saudi',title:'Visa Istidhafah',note:'Konsultasi kategori istidhafah sesuai kelayakan dan dokumen pemohon.'},
  {country:'Saudi',title:'Long Stay + Hotel',note:'Kebutuhan visa dan hotel dibahas sebagai satu brief perjalanan.'},
  {country:'Saudi',title:'Visa Umrah Transit',note:'Konsultasi untuk kebutuhan transit yang relevan dengan perjalanan Umrah.'},
  {country:'Mesir',title:'Visa Mesir — VOA / Entry',note:'Konsultasi jalur entry Mesir sesuai paspor, tujuan, dan kondisi perjalanan.'},
  {country:'Dubai',title:'Visa Dubai',note:'Konsultasi visa Dubai sesuai profil perjalanan dan dokumen.'},
];
export const brochures=[
  {src:'/brochures/ringkasan-layanan.jpg',title:'Ringkasan Layanan',alt:'Brosur ringkasan layanan Barokah Group'},
  {src:'/brochures/visa-specialist.jpg',title:'Visa Specialist',alt:'Brosur layanan visa Barokah Group'},
  {src:'/brochures/tiket-pesawat.jpg',title:'Tiket Pesawat',alt:'Brosur tiket pesawat Barokah Group'},
  {src:'/brochures/visa-hotel.jpg',title:'Visa & Hotel',alt:'Brosur visa dan hotel Barokah Group'},
  {src:'/brochures/turki.jpg',title:'Turki',alt:'Brosur layanan Turki Barokah Group'},
];
export const baggageSchedules=[
  {route:'Cairo → Jakarta',status:'Konfirmasi admin',date:'Jadwal terbaru via WhatsApp',note:'Kirim estimasi berat, jenis barang, dan target waktu pengiriman.'},
  {route:'Jakarta → Cairo',status:'Konfirmasi admin',date:'Jadwal terbaru via WhatsApp',note:'Admin akan mengonfirmasi slot, ketentuan barang, dan detail operasional.'},
];
export const testimonials=[
  {name:'Contoh Travel Partner',role:'Placeholder — B2B',quote:'Contoh tata letak testimoni. Ganti dengan testimoni asli yang sudah mendapat izin publikasi.'},
  {name:'Contoh Jamaah',role:'Placeholder — Retail',quote:'Konten ini bukan review pelanggan nyata dan tidak dimaksudkan sebagai klaim social proof.'},
  {name:'Contoh Pengguna Bagasi',role:'Placeholder — Cairo',quote:'Masukkan pengalaman pelanggan terverifikasi di sini setelah materi resmi tersedia.'},
];
export const faqs=[
  {q:'Apakah harga di website final?',a:'Tidak. Harga, jadwal, ketersediaan, dan ketentuan final dikonfirmasi admin berdasarkan kebutuhan aktual.'},
  {q:'Apakah pengajuan visa pasti disetujui?',a:'Tidak. Barokah Group membantu jalur konsultasi dan proses sesuai layanan yang tersedia, tetapi keputusan visa berada pada otoritas penerbit.'},
  {q:'Bisa melayani travel agent / B2B?',a:'Bisa. Gunakan halaman B2B untuk mengirim brief group agar diskusi dengan admin lebih terstruktur.'},
  {q:'Bagaimana mengecek jadwal bagasi terbaru?',a:'Buka halaman Bagasi Cairo–Jakarta dan kirim estimasi berat serta jenis barang ke admin melalui WhatsApp.'},
];
