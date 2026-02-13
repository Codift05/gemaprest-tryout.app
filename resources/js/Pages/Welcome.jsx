import { Head, Link } from '@inertiajs/react';
import {
    ClockIcon,
    ChartBarIcon,
    TrophyIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
    SparklesIcon,
    UserGroupIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Welcome() {
    const features = [
        {
            icon: BookOpenIcon,
            title: 'Soal Berkualitas Tinggi',
            description: 'Ribuan soal yang disusun sesuai standar UTBK terbaru oleh tim ahli pendidikan.',
            gradient: 'from-blue-400 to-blue-600',
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
            gradient: 'from-cyan-400 to-blue-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Performa',
            description: 'Statistik lengkap dan rekomendasi personal untuk meningkatkan skor.',
            gradient: 'from-blue-500 to-indigo-600',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Real-time',
            description: 'Bandingkan skormu dengan ribuan peserta lain secara real-time.',
            gradient: 'from-indigo-400 to-purple-600',
        },
        {
            icon: AcademicCapIcon,
            title: 'Pembahasan Lengkap',
            description: 'Setiap soal dilengkapi pembahasan detail untuk pemahaman maksimal.',
            gradient: 'from-cyan-500 to-blue-600',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti Kecurangan',
            description: 'Sistem monitoring canggih untuk memastikan integritas ujian.',
            gradient: 'from-blue-600 to-indigo-700',
        },
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest" />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto" />
                                <span className="text-xl font-bold text-gray-900">
                                    Gemaprest
                                </span>
                            </Link>
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Fitur
                                </a>
                                <a href="#benefits" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Keunggulan
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-semibold transition-colors">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-sm">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section with Blue Gradient */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    {/* Blue Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-b-[80px]"></div>

                    {/* Decorative Shapes */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                                Persiapan UTBK Terbaik<br />
                                untuk Raih PTN Impian
                            </h1>

                            <p className="text-xl lg:text-2xl text-blue-100 mb-6 leading-relaxed max-w-3xl mx-auto">
                                Platform tryout online dari <span className="font-bold text-white">Beasiswa Karya Salembah Empat (KSE) UNSRAT</span>
                            </p>

                            <p className="text-lg lg:text-xl text-blue-50 mb-12 leading-relaxed max-w-2xl mx-auto">
                                Kami hadir untuk membantu adik-adik SMA dalam mempersiapkan diri menghadapi UTBK dengan menyediakan soal berkualitas, simulasi realistis, dan analisis performa mendalam
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-xl"
                                >
                                    Mulai Tryout Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full transition-all border border-white/30"
                                >
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>
                        </div>

                        {/* Featured Cards with Glassmorphism */}
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                                <div className="flex items-start gap-6">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <BookOpenIcon className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Soal Berkualitas</h3>
                                        <p className="text-blue-100 leading-relaxed">
                                            Ribuan soal yang disusun sesuai standar UTBK terbaru
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                                <div className="flex items-start gap-6">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <ChartBarIcon className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Analisis Mendalam</h3>
                                        <p className="text-blue-100 leading-relaxed">
                                            Statistik lengkap dan rekomendasi personal untuk meningkatkan skor
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-32 px-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Fitur <span className="text-blue-600">Unggulan</span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Gradient Icon Background */}
                                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="relative py-32 px-6 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[60px] p-16 lg:p-20 border border-blue-100">
                            <div className="text-center">
                                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    Program <span className="text-blue-600">KSE UNSRAT</span><br />
                                    untuk Adik-Adik SMA
                                </h3>
                                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                                    Beasiswa Karya Salembah Empat hadir untuk mendukung persiapan UTBK kamu
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-32 px-6 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[60px] p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl"></div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                                    Siap Raih PTN Impianmu?
                                </h2>
                                <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                                    Mulai persiapan UTBK kamu sekarang dengan tryout gratis
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-full transition-all text-lg shadow-2xl"
                                >
                                    Daftar Sekarang Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-100 py-12 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-8 w-auto" />
                                <span className="text-lg font-bold text-gray-900">Gemaprest Tryout</span>
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
