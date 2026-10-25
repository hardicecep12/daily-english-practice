// Paragraf Bacaan untuk Soal 1 - 15
window.pgPassage = [
    {
        paragraph: 1,
        sentences: [
            { id: 1, en: "Every weekend, Alex and his friends (1) _____ to the city park to plant trees.", id_trans: "Setiap akhir pekan, Alex dan teman-temannya pergi ke taman kota untuk menanam pohon." },
            { id: 2, en: "They believe that (2) _____ trees can significantly improve the air quality.", id_trans: "Mereka percaya bahwa menanam pohon dapat meningkatkan kualitas udara secara signifikan." },
            { id: 3, en: "Before starting, they (3) _____ all the necessary tools such as shovels and watering cans.", id_trans: "Sebelum memulai, mereka menyiapkan semua peralatan yang diperlukan seperti sekop dan penyiram tanaman." },
            { id: 4, en: "Alex (4) _____ the group by giving clear instructions to everyone.", id_trans: "Alex memimpin kelompok tersebut dengan memberikan instruksi yang jelas kepada semua orang." },
            { id: 5, en: "Local residents often (5) _____ them by providing snacks and fresh water.", id_trans: "Warga lokal sering mendukung mereka dengan menyediakan camilan dan air segar." },
            { id: 6, en: "Working together (6) _____ the heavy task feel much easier and more enjoyable.", id_trans: "Bekerja bersama membuat tugas yang berat terasa jauh lebih mudah dan lebih menyenangkan." },
            { id: 7, en: "By noon, they have already (7) _____ more than twenty young saplings.", id_trans: "Menjelang siang, mereka telah menanam lebih dari dua puluh bibit pohon muda." }
        ]
    },
    {
        paragraph: 2,
        sentences: [
            { id: 8, en: "After taking a short break, the team (8) _____ to water the newly planted trees.", id_trans: "Setelah beristirahat sejenak, tim melanjutkan untuk menyiram pohon-pohon yang baru ditanam." },
            { id: 9, en: "It is essential to (9) _____ for young plants regularly so they can survive.", id_trans: "Sangat penting untuk merawat tanaman muda secara teratur agar mereka bisa bertahan hidup." },
            { id: 10, en: "Many children in the neighborhood (10) _____ to watch and learn about nature.", id_trans: "Banyak anak-anak di lingkungan sekitar datang untuk menonton dan belajar tentang alam." },
            { id: 11, en: "This initiative not only greened the park but also (11) _____ strong community bonds.", id_trans: "Inisiatif ini tidak hanya menghijaukan taman tetapi juga membangun ikatan komunitas yang kuat." },
            { id: 12, en: "Alex hopes that more volunteers will (12) _____ their movement next month.", id_trans: "Alex berharap lebih banyak relawan akan bergabung dengan gerakan mereka bulan depan." },
            { id: 13, en: "Protecting the environment (13) _____ continuous effort from everyone in the society.", id_trans: "Melindungi lingkungan membutuhkan usaha terus-menerus dari semua orang di masyarakat." },
            { id: 14, en: "They take a group photograph to (14) _____ their hard work of the day.", id_trans: "Mereka mengambil foto bersama untuk merayakan kerja keras mereka hari itu." },
            { id: 15, en: "Everyone left the park feeling happy because they (15) _____ something great.", id_trans: "Semua orang meninggalkan taman dengan rasa senang karena mereka telah mencapai sesuatu yang hebat." }
        ]
    }
];

// Data 30 Soal Pilihan Ganda
window.pgData = [
    // --- Soal 1 - 15: Isian Paragraf (Varian Verb) ---
    { id: 1, targetBlank: 1, question: "Pilihlah bentuk kata kerja (verb) yang tepat untuk nomor (1):", options: ["go", "goes", "went", "going"], correct: 0, explanation: "Subjek jamak 'Alex and his friends' pada Simple Present Tense menggunakan kata kerja dasar 'go'." },
    { id: 2, targetBlank: 2, question: "Pilihlah bentuk kata kerja (gerund) yang tepat untuk nomor (2):", options: ["plant", "plants", "planted", "planting"], correct: 3, explanation: "Kata kerja yang berfungsi sebagai subjek klausa harus berbentuk Gerund (Verb-ing), yaitu 'planting'." },
    { id: 3, targetBlank: 3, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (3):", options: ["prepare", "prepares", "prepared", "preparing"], correct: 0, explanation: "Subjek jamak 'they' pada Simple Present Tense menggunakan kata kerja dasar (V1) 'prepare'." },
    { id: 4, targetBlank: 4, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (4):", options: ["lead", "leads", "led", "leading"], correct: 1, explanation: "Subjek tunggal 'Alex' (he) pada Simple Present Tense membutuhkan Verb + s/es, yaitu 'leads'." },
    { id: 5, targetBlank: 5, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (5):", options: ["support", "supports", "supported", "supporting"], correct: 0, explanation: "Subjek jamak 'Local residents' menggunakan kata kerja bentuk dasar 'support'." },
    { id: 6, targetBlank: 6, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (6):", options: ["make", "makes", "made", "making"], correct: 1, explanation: "Subjek gerund 'Working together' bersifat tunggal, sehingga membutuhkan verb + s ('makes')." },
    { id: 7, targetBlank: 7, question: "Pilihlah bentuk kata kerja (Past Participle / V3) untuk nomor (7):", options: ["plant", "plants", "planted", "planting"], correct: 2, explanation: "Struktur Present Perfect Tense ('have already ...') membutuhkan kata kerja bentuk ketiga (V3) 'planted'." },
    { id: 8, targetBlank: 8, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (8):", options: ["continue", "continues", "continued", "continuing"], correct: 1, explanation: "Subjek kolektif tunggal 'the team' menggunakan kata kerja berakhiran -s ('continues')." },
    { id: 9, targetBlank: 9, question: "Pilihlah bentuk kata kerja dasar (Infinitive) setelah 'to' untuk nomor (9):", options: ["care", "cares", "cared", "caring"], correct: 0, explanation: "Setelah struktur 'to + infinitive', kata kerja harus kembali ke bentuk dasar 'care'." },
    { id: 10, targetBlank: 10, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (10):", options: ["come", "comes", "came", "coming"], correct: 0, explanation: "Subjek jamak 'Many children' menggunakan kata kerja bentuk dasar 'come'." },
    { id: 11, targetBlank: 11, question: "Pilihlah bentuk kata kerja lampau (Past Tense / V2) untuk nomor (11):", options: ["build", "builds", "built", "building"], correct: 2, explanation: "Kalimat ini berkalimat lampau (sejajar dengan kata 'greened'), sehingga membutuhkan V2 yaitu 'built'." },
    { id: 12, targetBlank: 12, question: "Pilihlah bentuk kata kerja setelah modal 'will' untuk nomor (12):", options: ["join", "joins", "joined", "joining"], correct: 0, explanation: "Setelah kata bantu modal 'will', kata kerja harus berupa Bare Infinitive (bentuk dasar) 'join'." },
    { id: 13, targetBlank: 13, question: "Pilihlah bentuk kata kerja yang tepat untuk nomor (13):", options: ["require", "requires", "required", "requiring"], correct: 1, explanation: "Subjek berupa gerund 'Protecting the environment' dianggap tunggal, sehingga kata kerjanya adalah 'requires'." },
    { id: 14, targetBlank: 14, question: "Pilihlah bentuk kata kerja infinitive untuk nomor (14):", options: ["celebrate", "celebrates", "celebrated", "celebrating"], correct: 0, explanation: "Struktur tujuan 'to + infinitive' membutuhkan bentuk kata kerja dasar 'celebrate'." },
    { id: 15, targetBlank: 15, question: "Pilihlah bentuk kata kerja lampau (V2) untuk nomor (15):", options: ["accomplish", "accomplishes", "accomplished", "accomplishing"], correct: 2, explanation: "Konteks kalimat berbentuk lampau ('Everyone left...'), maka kata kerja yang tepat adalah V2 'accomplished'." },

    // --- Soal 16 - 30: PG Umum ---
    { id: 16, question: "What is the synonym of 'Happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1, explanation: "'Joyful' memiliki arti yang sama dengan 'Happy' (gembira)." },
    { id: 17, question: "She ___ to school every day.", options: ["go", "goes", "went", "going"], correct: 1, explanation: "Subjek 'She' membutuhkan kata kerja 'goes' dalam Present Simple Tense." },
    { id: 18, question: "What is the opposite of 'Big'?", options: ["Large", "Huge", "Small", "Tall"], correct: 2, explanation: "Lawan kata dari 'Big' (besar) adalah 'Small' (kecil)." },
    { id: 19, question: "They ___ playing football in the park.", options: ["is", "am", "are", "be"], correct: 2, explanation: "Subjek jamak 'They' menggunakan to be 'are'." },
    { id: 20, question: "Which one is a fruit?", options: ["Carrot", "Apple", "Potato", "Onion"], correct: 1, explanation: "'Apple' adalah buah, sedangkan sisanya adalah sayuran." },
    { id: 21, question: "What is the past tense (V2) of 'Eat'?", options: ["Eats", "Eating", "Ate", "Eaten"], correct: 2, explanation: "Bentuk kata kerja lampau (V2) dari 'eat' adalah 'ate'." },
    { id: 22, question: "Look at ___ sky. It is very dark.", options: ["a", "an", "the", "some"], correct: 2, explanation: "'The' digunakan untuk menunjukkan objek yang spesifik seperti 'the sky'." },
    { id: 23, question: "Which word is a noun (kata benda)?", options: ["Run", "Beautiful", "Book", "Quickly"], correct: 2, explanation: "'Book' (buku) adalah kata benda (noun)." },
    { id: 24, question: "My mother's brother is my ___.", options: ["Uncle", "Aunt", "Cousin", "Nephew"], correct: 0, explanation: "Saudara laki-laki dari ibu dipanggil paman ('Uncle')." },
    { id: 25, question: "What time is it if it is 'half past seven'?", options: ["07:15", "07:30", "07:45", "08:30"], correct: 1, explanation: "'Half past seven' menunjukkan pukul 07:30 (setengah delapan)." },
    { id: 26, question: "Which sentence is correct?", options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."], correct: 2, explanation: "Kalimat negatif Present Simple untuk subjek 'He' menggunakan 'doesn't + V1'." },
    { id: 27, question: "The book is ___ the table.", options: ["on", "in", "at", "to"], correct: 0, explanation: "Preposisi 'on' digunakan untuk benda di atas permukaan." },
    { id: 28, question: "Which one is a plural form (jamak)?", options: ["Child", "Children", "Childs", "Childes"], correct: 1, explanation: "Bentuk jamak tidak teratur (irregular plural) dari 'child' adalah 'children'." },
    { id: 29, question: "I am hungry, I want to ___.", options: ["sleep", "eat", "drink", "walk"], correct: 1, explanation: "Kata 'hungry' (lapar) berhubungan dengan makan ('eat')." },
    { id: 30, question: "What is the comparative form of 'Fast'?", options: ["Fastest", "Faster", "More fast", "Fastly"], correct: 1, explanation: "Bentuk komparatif dari kata sifat pendek 'fast' adalah 'faster' (lebih cepat)." }
];