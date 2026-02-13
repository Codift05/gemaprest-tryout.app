import { Head, Link } from '@inertiajs/react';
import {
    ClockIcon,
    ChartBarIcon,
    TrophyIcon,
    ArrowRightIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Welcome() {
    const features = [
        {
            number: '01',
            title: 'Soal Berkualitas Tinggi',
            description: 'Ribuan soal yang disusun sesuai dengan standar UTBK terbaru oleh tim ahli pendidikan profesional.',
        },
        {
            number: '02',
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya untuk pengalaman autentik.',
        },
        {
            number: '03',
            title: 'Analisis Performa Mendalam',
            description: 'Lihat statistik lengkap dan rekomendasi personal untuk meningkatkan skor Anda.',
        },
    ];

    const stats = [
        { icon: ClockIcon, value: '10,000+', label: 'Soal Berkualitas' },
        { icon: ChartBarIcon, value: '95%', label: 'Tingkat Kepuasan' },
        { icon: TrophyIcon, value: '5,000+', label: 'Siswa Aktif' },
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest" />

            <div className="min-h-screen bg-black">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto" />
                                <span className="text-xl font-black text-white">
                                    Gemaprest Tryout
                                </span>
                            </Link>
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-colors">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-block mb-6">
                                    <span className="px-4 py-2 bg-gray-900 text-gray-300 rounded-full text-sm font-medium border border-gray-800">
                                        Platform Tryout UTBK Terbaik
                                    </span>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                                    Optimize,<br />
                                    <span className="text-red-500">Outperform</span>
                                </h1>

                                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                                    Platform tryout online dengan soal berkualitas, simulasi realistis, dan analisis performa mendalam untuk membantu kamu meraih PTN impian.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all inline-flex items-center justify-center gap-2"
                                    >
                                        Mulai Tryout Gratis
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all border border-gray-800"
                                    >
                                        Pelajari Lebih Lanjut
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center lg:text-left">
                                            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative">
                                <div className="relative z-10">
                                    <img
                                        src="/ui1.png"
                                        alt="Multi-device mockup"
                                        className="w-full h-auto drop-shadow-2xl"
                                    />
                                </div>
                                {/* Decorative blob */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-24 px-6 bg-gradient-to-b from-black to-gray-950">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                                Semua yang kamu butuhkan<br />
                                dalam <span className="text-red-500">satu platform</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK dengan fitur-fitur canggih
                            </p>
                        </div>

                        {/* Numbered Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex gap-8 items-start bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-800/50 hover:border-gray-700/50 transition-all group"
                                >
                                    <div className="flex-shrink-0">
                                        <span className="text-6xl font-black text-red-500/20 group-hover:text-red-500/40 transition-colors">
                                            {feature.number}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-lg text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Image Showcase */}
                        <div className="grid md:grid-cols-2 gap-8 mt-16">
                            <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
                                <img
                                    src="/ui2.png"
                                    alt="Checklist interface"
                                    className="w-full h-auto rounded-2xl"
                                />
                                <div className="mt-6">
                                    <h4 className="text-xl font-bold text-white mb-2">Tracking Progress</h4>
                                    <p className="text-gray-400">Monitor perkembangan belajar Anda secara real-time</p>
                                </div>
                            </div>
                            <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50">
                                <img
                                    src="/complete.png"
                                    alt="Completion screen"
                                    className="w-full h-auto rounded-2xl"
                                />
                                <div className="mt-6">
                                    <h4 className="text-xl font-bold text-white mb-2">Hasil Instan</h4>
                                    <p className="text-gray-400">Dapatkan hasil dan analisis lengkap setelah tryout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-4xl p-12 lg:p-16 text-center relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                    Siap Raih PTN Impianmu?
                                </h2>
                                <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                                    Bergabung dengan ribuan siswa yang sudah mempersiapkan diri untuk UTBK bersama kami
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-100 text-red-600 font-black rounded-2xl transition-all text-lg"
                                >
                                    Daftar Sekarang Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-800/50 py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-8 w-auto" />
                                <span className="text-lg font-black text-white">Gemaprest Tryout</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                © 2024 Gemaprest. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
