import { BusFront, FileCheck2, Hotel, Luggage, Plane, TrainFront, UsersRound } from 'lucide-react';
export const services = [
  {slug:'land-arrangement-umrah',title:'Land Arrangement Umrah',kicker:'Saudi Operations',summary:'LA Umrah untuk travel & group, termasuk hotel, transport, handling, dan kebutuhan operasional darat.',icon:UsersRound,features:['Hotel sesuai kebutuhan','Transport & handling','Haramain / bus sesuai kebutuhan','Koordinasi group']},
  {slug:'land-arrangement-mesir',title:'Land Arrangement Mesir',kicker:'Egypt Operations',summary:'LA Mesir untuk itinerary, hotel, transport, handling, dan kebutuhan group selama perjalanan.',icon:Hotel,features:['Hotel','Transport','Itinerary support','Group handling']},
  {slug:'land-arrangement-turki',title:'Land Arrangement Turki',kicker:'Türkiye Operations',summary:'LA Turki untuk hotel, transport, itinerary, dan handling group sesuai kebutuhan perjalanan.',icon:Hotel,features:['Hotel','Transport','Itinerary support','Group handling']},
  {slug:'visa',title:'Visa & Entry Support',kicker:'Document Desk',summary:'Layanan konsultasi Visa Umrah, Mesir, Dubai, dan kebutuhan entry terkait.',icon:FileCheck2,features:['Visa Group + Bus','Visa Umrah','Visa Mesir','Visa Dubai']},
  {slug:'tiket-pesawat',title:'Tiket Pesawat',kicker:'Flight Desk',summary:'Pencarian dan konsultasi tiket sesuai rute, tanggal, kebutuhan bagasi, dan kebutuhan group.',icon:Plane,features:['Rute internasional','Group inquiry','Bagasi sesuai fare','Konfirmasi sebelum pembayaran']},
  {slug:'haramain-train',title:'Haramain Train',kicker:'Saudi Mobility',summary:'Konsultasi tiket kereta cepat Haramain untuk rute yang tersedia.',icon:TrainFront,features:['Makkah','Madinah','Jeddah','Konfirmasi jadwal aktual']},
  {slug:'nwbus',title:'NWBus',kicker:'Saudi Mobility',summary:'Konsultasi tiket bus NWBus sesuai rute dan jadwal operasional.',icon:BusFront,features:['Pencarian rute','Group inquiry','Jadwal aktual','Konfirmasi admin']},
  {slug:'bagasi-cairo-jakarta',title:'Bagasi Cairo ⇄ Jakarta',kicker:'Cargo & Baggage',summary:'Layanan pengiriman bagasi Cairo–Jakarta dan sebaliknya dengan jadwal yang dapat dipilih.',icon:Luggage,features:['Cairo → Jakarta','Jakarta → Cairo','Estimasi berat','Konfirmasi barang & slot']},
];
export const visaOptions=[
  {country:'Saudi',title:'Visa Group + Bus',note:'Untuk kebutuhan group yang memerlukan koordinasi visa dan transport terkait.'},
  {country:'Saudi',title:'Visa Umrah Express',note:'Jalur konsultasi visa Umrah dengan kebutuhan proses lebih cepat; waktu final dikonfirmasi admin.'},
  {country:'Saudi',title:'Visa Umrah Short Stay',note:'Konsultasi opsi visa Umrah untuk periode kunjungan yang lebih singkat.'},
  {country:'Saudi',title:'Visa Umrah Long Stay',note:'Konsultasi kebutuhan masa tinggal lebih panjang sesuai opsi yang tersedia.'},
  {country:'Saudi',title:'Visa Istidhafah',note:'Konsultasi kategori istidhafah sesuai kelayakan dan dokumen pemohon.'},
  {country:'Saudi',title:'Long Stay + Hotel',note:'Kebutuhan visa dan hotel dibahas sebagai satu kebutuhan perjalanan.'},
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
  {name:'Contoh Travel Partner',role:'Travel Partner',quote:'Tim Barokah Group membantu kebutuhan LA dan handling group kami dengan komunikasi yang cepat dan rapi.'},
  {name:'Contoh Jamaah',role:'Jamaah Umrah',quote:'Proses konsultasi visa dan perjalanan terasa mudah karena semua kebutuhan bisa ditanyakan dalam satu tempat.'},
  {name:'Contoh Pengguna Bagasi',role:'Pelanggan Bagasi Cairo',quote:'Jadwal bagasi jelas, admin responsif, dan proses booking slot jadi lebih praktis.'},
];
export const faqs=[
  {q:'Apakah harga di website final?',a:'Harga mengikuti tanggal, kebutuhan layanan, jumlah peserta, dan ketersediaan. Admin akan mengonfirmasi penawaran terbaru sebelum pembayaran.'},
  {q:'Apakah pengajuan visa pasti disetujui?',a:'Barokah Group membantu proses dan pengecekan dokumen sesuai layanan yang tersedia. Keputusan akhir visa tetap berada pada otoritas penerbit.'},
  {q:'Bisa melayani travel agent dan rombongan?',a:'Bisa. Kami melayani LA, handling, hotel, transportasi, visa, tiket, dan kebutuhan perjalanan group sesuai permintaan.'},
  {q:'Bagaimana mengecek jadwal bagasi terbaru?',a:'Jadwal terbaru tampil di halaman Bagasi Cairo–Jakarta. Pilih jadwal yang tersedia lalu konfirmasi slot melalui WhatsApp.'},
];
