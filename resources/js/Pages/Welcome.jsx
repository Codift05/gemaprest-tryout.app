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

            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
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

                {/* Hero Section with Banner Image */}
                <section className="relative pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Banner Image Container */}
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl mb-12">
                            <img
                                src="/Banner Web.png"
                                alt="Gemaprest Try Out UTBK - Platform tryout online dari Beasiswa Karya Salembah Empat (KSE) UNSRAT"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link
                                href={route('register')}
                                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                                Mulai Tryout Gratis
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-10 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all border-2 border-gray-200 hover:border-gray-300 shadow-sm"
                            >
                                Masuk ke Platform
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-32 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Fitur <span className="text-blue-600">Unggulan</span>
                            </h2>
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-gray-50 rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:bg-white"
                                >
                                    {/* Gradient Icon Background */}
                                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
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
                <section id="benefits" className="relative py-32 px-6 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[60px] p-16 lg:p-20 border border-blue-100 shadow-lg">
                            <div className="text-center">
                                <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Program <span className="text-blue-600">KSE UNSRAT</span><br />
                                    untuk Adik-Adik SMA
                                </h3>
                                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                    Beasiswa Karya Salembah Empat hadir untuk mendukung persiapan UTBK kamu
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-32 px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[60px] p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl"></div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                                    Siap Raih PTN Impianmu?
                                </h2>
                                <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                                    Mulai persiapan UTBK kamu sekarang dengan tryout gratis
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-full transition-all text-lg shadow-2xl hover:shadow-3xl"
                                >
                                    Daftar Sekarang Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-200 py-12 px-6 bg-gray-50">
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
