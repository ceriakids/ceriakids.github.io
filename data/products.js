/* =====================================================================
   SENARAI PRODUK CERIAKIDS
   Untuk menambah produk baharu: salin satu blok { ... } dalam "products",
   tukar maklumatnya, dan simpan. Laman web akan dikemas kini sendiri.
   Pastikan setiap blok dipisahkan dengan koma.
   ===================================================================== */
window.CK = {
  whatsapp: "60148798352",
  whatsappDisplay: "014-879 8352",

  // Tahap kelas yang dipaparkan dalam penapis kedai
  levels: [
    { id: "tahun1", name: "Tahun 1" },
    { id: "prasekolah", name: "Prasekolah" }
  ],

  products: [
    {
      id: "matematik-arked",
      name: "Matematik Arked: Tambah",
      subject: "Matematik",
      level: "tahun1",
      type: "Permainan arked",
      price: 25,
      isNew: true,
      game: "games/matematik-arked.html",
      img: ["assets/img/ark-1.webp", "assets/img/ark-2.webp"],
      short: "Ketuk tikus mondok dan pecahkan belon sambil berlatih tambah.",
      desc: "Dua permainan arked yang sebenar untuk berlatih tambah. Setiap pusingan 1 minit, dengan skor, kombo dan rekod terbaik yang disimpan. Anak akan minta main lagi.",
      features: [
        "Ketuk Tikus Mondok: ketuk jawapan betul sebelum ia menyorok",
        "Pecah Belon: cari dua nombor yang jumlahnya 10 atau 20",
        "Tahap tambah hingga 10 dan hingga 20",
        "Skor, kombo dan rekod terbaik untuk dikalahkan"
      ],
      wa: "Salam, saya nak beli Matematik Arked: Tambah (RM25)."
    },
    {
      id: "suku-kata-ceria",
      name: "Suku Kata Ceria",
      subject: "Bahasa Melayu",
      level: "tahun1",
      type: "Permainan kuiz",
      price: 19,
      game: "games/suku-kata-ceria.html",
      img: ["assets/img/skc-1.webp", "assets/img/skc-2.webp"],
      short: "Bina perkataan daripada suku kata dan pilih ejaan yang betul.",
      desc: "Mengikut Unit 1 hingga 10 buku teks Bahasa Melayu Tahun 1. Setiap perkataan ada gambar dan ayat petunjuk.",
      features: [
        "124 perkataan daripada Unit 1 hingga 10 buku teks",
        "Bina perkataan daripada suku kata, termasuk kata ganda",
        "Pilih ejaan betul antara ejaan yang mengelirukan",
        "Pilih unit untuk latihan mengikut pelajaran di sekolah"
      ],
      wa: "Salam, saya nak beli Suku Kata Ceria (RM19)."
    },
    {
      id: "matematik-ceria",
      name: "Matematik Ceria",
      subject: "Matematik",
      level: "tahun1",
      type: "Permainan kuiz",
      price: 19,
      game: "games/matematik-ceria.html",
      img: ["assets/img/mtc-1.webp", "assets/img/mtc-2.webp"],
      short: "Nombor, tambah, tolak, wang, masa, pecahan dan bentuk.",
      desc: "Semua topik utama Matematik Tahun 1 KSSR. Soalan dijana secara automatik, jadi setiap pusingan berbeza.",
      features: [
        "Nombor hingga 100, nilai tempat dan urutan",
        "Tambah dan tolak, termasuk soalan cerita",
        "Wang, masa dan waktu, pecahan",
        "Bentuk 2D dan 3D"
      ],
      wa: "Salam, saya nak beli Matematik Ceria (RM19)."
    },
    {
      id: "sains-ceria",
      name: "Sains Ceria",
      subject: "Sains",
      level: "tahun1",
      type: "Permainan kuiz",
      price: 19,
      game: "games/sains-ceria.html",
      img: ["assets/img/snc-1.webp", "assets/img/snc-2.webp"],
      short: "Benda hidup, pancaindera, haiwan, tumbuhan, magnet dan penyerapan.",
      desc: "Latihan Sains Tahun 1 bergambar. Soalan dipilih secara rawak, jadi setiap pusingan berbeza.",
      features: [
        "Benda hidup atau bukan hidup",
        "Pancaindera dan organ deria",
        "Penutup badan, tempat hidup dan cara haiwan bergerak",
        "Bahagian tumbuhan, magnet dan penyerapan"
      ],
      wa: "Salam, saya nak beli Sains Ceria (RM19)."
    },
    {
      id: "english-fun",
      name: "English Fun",
      subject: "English",
      level: "tahun1",
      type: "Permainan kuiz",
      price: 19,
      game: "games/english-fun.html",
      img: ["assets/img/eng-1.webp", "assets/img/eng-2.webp"],
      short: "Vocabulary, spelling dan phonics dengan gambar.",
      desc: "Latihan English Year 1 sepenuhnya dalam Bahasa Inggeris, untuk membiasakan anak dengan bahasa itu.",
      features: [
        "Vocabulary: animals, food, school things, body",
        "Spell the word dengan jubin huruf",
        "Phonics: first letter, begins with, rhyming words",
        "Colours dan numbers one to ten"
      ],
      wa: "Salam, saya nak beli English Fun (RM19)."
    },
    {
      id: "prasekolah-ceria",
      name: "Prasekolah Ceria",
      subject: "Huruf dan nombor",
      level: "prasekolah",
      type: "Permainan kuiz",
      price: 19,
      game: "games/prasekolah-ceria.html",
      img: ["assets/img/pra-1.webp", "assets/img/pra-2.webp"],
      short: "Kenal huruf, nombor, bentuk dan warna untuk umur 4 hingga 6 tahun.",
      desc: "Persediaan awal sebelum Tahun 1. Sesuai dimainkan bersama ibu bapa atau di tadika.",
      features: [
        "Huruf besar dan huruf kecil, termasuk b, d, p dan q",
        "Huruf pertama perkataan Bahasa Melayu",
        "Kira, padankan dan susun nombor hingga 20",
        "Kenal bentuk dan warna"
      ],
      wa: "Salam, saya nak beli Prasekolah Ceria (RM19)."
    }
  ],

  bundles: [
    {
      id: "pakej-bm-matematik",
      name: "Pakej BM + Matematik",
      items: ["suku-kata-ceria", "matematik-ceria"],
      price: 29,
      wa: "Salam, saya nak beli Pakej BM + Matematik (RM29)."
    }
  ],

  passes: [
    {
      id: "pas-tahun1",
      name: "Pas Tahun 1",
      level: "tahun1",
      price: 69,
      founderPrice: 49,
      founderNote: "Harga pengasas untuk 30 pembeli pertama. Sah sehingga 31 Disember 2027.",
      period: "1 tahun",
      wa: "Salam, saya nak beli Pas Tahun 1 harga pengasas (RM49)."
    }
  ],

  articles: [
    { url: "sumber/bantu-anak-membaca-suku-kata.html", title: "Cara bantu anak membaca suku kata di rumah", summary: "Langkah mudah dari bunyi vokal hingga perkataan pertama, 10 minit sehari." },
    { url: "sumber/aktiviti-matematik-harian.html", title: "Aktiviti matematik harian untuk anak Tahun 1", summary: "Belajar mengira semasa membeli-belah, memasak dan dalam kereta." }
  ],

  freebies: [
    { url: "sumber/lembaran-suku-kata-unit-1.pdf", title: "Lembaran kerja: Suku Kata Unit 1", summary: "Dua halaman PDF untuk dicetak. Unit 1: Keluargaku Sayang, dengan jawapan." }
  ]
};
