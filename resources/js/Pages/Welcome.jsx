import { Head, Link } from '@inertiajs/react';
import {
    ClockIcon,
    ChartBarIcon,
    TrophyIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';

export default function Welcome() {
    const features = [
        {
            number: '01',
            title: 'Soal Berkualitas Tinggi',
            description: 'Akses ribuan soal yang disusun sesuai standar UTBK terbaru oleh tim ahli pendidikan profesional.',
            icon: BookOpenIcon,
        },
        {
            number: '02',
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya untuk pengalaman autentik.',
            icon: ClockIcon,
        },
        {
            number: '03',
            title: 'Analisis Performa Mendalam',
            description: 'Dapatkan statistik lengkap dan rekomendasi personal untuk meningkatkan skor Anda secara signifikan.',
            icon: ChartBarIcon,
        },
    ];

    const benefits = [
        'Akses unlimited ke semua paket tryout',
        'Pembahasan lengkap setiap soal',
        'Analisis performa real-time',
        'Leaderboard nasional'
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto" />
                                <span className="text-xl font-black text-gray-900">
                                    Gemaprest
                                </span>
                            </Link>
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                    Fitur
                                </a>
                                <a href="#benefits" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                    Keunggulan
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition-all">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-5xl">
                            {/* Badge */}
                            <div className="inline-block mb-8">
                                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                    Platform Tryout UTBK Terbaik
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-[1.1]">
                                Optimize,<br />
                                Outperform
                            </h1>

                            {/* Description */}
                            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl">
                                Platform tryout online dengan soal berkualitas, simulasi realistis, dan analisis performa mendalam untuk membantu kamu meraih PTN impian.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-16">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition-all inline-flex items-center justify-center gap-2 text-lg"
                                >
                                    Mulai Tryout Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-2xl transition-all border-2 border-gray-200 text-lg"
                                >
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 max-w-2xl">
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">10K+</div>
                                    <div className="text-sm text-gray-600 font-medium">Soal Berkualitas</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">95%</div>
                                    <div className="text-sm text-gray-600 font-medium">Tingkat Kepuasan</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">5K+</div>
                                    <div className="text-sm text-gray-600 font-medium">Siswa Aktif</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-20">
                            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                                Semua yang kamu<br />
                                butuhkan dalam satu<br />
                                platform
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        {/* Numbered Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex gap-8 items-start bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex-shrink-0">
                                        <span className="text-7xl font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                                            {feature.number}
                                        </span>
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="hidden lg:block flex-shrink-0">
                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                            <feature.icon className="w-8 h-8 text-gray-700" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="relative py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-4xl p-12 lg:p-16 border border-gray-200 shadow-xl">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <div>
                                    <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                        Raih skor<br />
                                        maksimal UTBK
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-8">
                                        Bergabung dengan ribuan siswa yang sudah mempersiapkan diri untuk UTBK bersama kami
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                    <CheckCircleIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-gray-700 font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition-all"
                                    >
                                        Mulai Sekarang
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </Link>
                                </div>

                                {/* Right Visual Element */}
                                <div className="relative">
                                    {/* Large percentage display */}
                                    <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-4xl p-12 text-center shadow-2xl">
                                        <div className="mb-6">
                                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                                <TrophyIcon className="w-12 h-12 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="text-8xl font-black text-white mb-4">
                                            95%
                                        </div>
                                        <div className="text-xl font-bold text-green-50">
                                            Siswa Lulus PTN Favorit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-4xl p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                                    Siap Raih PTN<br />
                                    Impianmu?
                                </h2>
                                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                    Bergabung dengan ribuan siswa yang sudah mempersiapkan diri untuk UTBK
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-100 text-gray-900 font-black rounded-2xl transition-all text-lg shadow-xl"
                                >
                                    Daftar Sekarang Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-200 py-12 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-8 w-auto" />
                                <span className="text-lg font-black text-gray-900">Gemaprest Tryout</span>
                            </div>
                            <div className="text-gray-600 text-sm font-medium">
                                © 2024 Gemaprest. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
