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
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Performa',
            description: 'Statistik lengkap dan rekomendasi personal untuk meningkatkan skor.',
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Real-time',
            description: 'Bandingkan skormu dengan ribuan peserta lain secara real-time.',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
        },
        {
            icon: AcademicCapIcon,
            title: 'Pembahasan Lengkap',
            description: 'Setiap soal dilengkapi pembahasan detail untuk pemahaman maksimal.',
            color: 'from-indigo-500 to-blue-500',
            bgColor: 'bg-indigo-50',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti Kecurangan',
            description: 'Sistem monitoring canggih untuk memastikan integritas ujian.',
            color: 'from-red-500 to-pink-500',
            bgColor: 'bg-red-50',
        },
    ];

    const stats = [
        { value: '10,000+', label: 'Soal Berkualitas', icon: BookOpenIcon },
        { value: '95%', label: 'Tingkat Kepuasan', icon: TrophyIcon },
        { value: '5,000+', label: 'Siswa Aktif', icon: UserGroupIcon },
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest" />

            <div className="min-h-screen bg-white">
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
                                <Link href={route('register')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                    {/* Decorative SVG Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <svg className="absolute top-0 right-0 w-96 h-96 text-blue-100 opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.4C26.4,83.8,10,86,-6.5,85.1C-23,84.2,-46,80.2,-61.8,69.8C-77.6,59.4,-86.2,42.6,-89.7,25.1C-93.2,7.6,-91.6,-10.6,-85.3,-26.8C-79,-43,-68,-57.2,-54.2,-64.5C-40.4,-71.8,-24.8,-72.2,-9.8,-75.6C5.2,-79,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                        <svg className="absolute bottom-0 left-0 w-80 h-80 text-cyan-100 opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M39.5,-65.5C51.4,-58.1,61.3,-47.3,68.1,-34.8C74.9,-22.3,78.6,-8.1,77.8,5.7C77,19.5,71.7,33,63.4,44.8C55.1,56.6,43.8,66.7,30.8,72.4C17.8,78.1,3.1,79.4,-11.5,77.9C-26.1,76.4,-40.6,72.1,-53.4,64.1C-66.2,56.1,-77.3,44.4,-82.8,30.4C-88.3,16.4,-88.2,0.1,-84.1,-14.8C-80,-29.7,-71.9,-43.2,-60.5,-51.1C-49.1,-59,-34.4,-61.3,-20.8,-68.2C-7.2,-75.1,5.3,-86.6,17.7,-88.9C30.1,-91.2,27.6,-72.9,39.5,-65.5Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-200">
                                    <SparklesIcon className="w-4 h-4" />
                                    Platform Tryout UTBK #1 di Indonesia
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                                    Raih PTN Impian dengan
                                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Persiapan Terbaik</span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Platform tryout online dengan soal berkualitas, simulasi realistis, dan analisis performa mendalam untuk membantu kamu meraih PTN impian.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
                                    >
                                        Mulai Tryout Gratis
                                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl transition-all border-2 border-gray-200 hover:border-gray-300 shadow-sm"
                                    >
                                        Pelajari Lebih Lanjut
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center lg:text-left">
                                            <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Illustration */}
                            <div className="relative">
                                {/* Floating Cards Animation */}
                                <div className="relative">
                                    {/* Main Card */}
                                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                                <AcademicCapIcon className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500 font-medium">Tryout UTBK 2025</div>
                                                <div className="text-lg font-bold text-gray-900">Paket Lengkap TPS</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                                    <span className="text-sm font-semibold text-gray-700">Soal 1-20</span>
                                                </div>
                                                <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Selesai</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-blue-600"></div>
                                                    <span className="text-sm font-semibold text-gray-700">Soal 21-40</span>
                                                </div>
                                                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Sedang</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                                    <span className="text-sm font-semibold text-gray-500">Soal 41-60</span>
                                                </div>
                                                <span className="text-xs font-medium text-gray-500">Belum</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Stats Card */}
                                    <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-xl animate-float">
                                        <div className="text-center">
                                            <div className="text-4xl font-black text-white mb-1">85%</div>
                                            <div className="text-sm font-bold text-orange-100">Akurasi</div>
                                        </div>
                                    </div>

                                    {/* Floating Trophy */}
                                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float-slow">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                                <TrophyIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 font-medium">Ranking</div>
                                                <div className="text-lg font-black text-gray-900">#12</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-block mb-4">
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                    Fitur Unggulan
                                </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                                Semua yang Kamu Butuhkan<br />
                                dalam <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Satu Platform</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK dengan fitur-fitur canggih
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity -z-10`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                            Siap Raih PTN Impianmu?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Bergabung dengan ribuan siswa yang sudah mempersiapkan diri untuk UTBK bersama kami
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-50 text-blue-600 font-black rounded-xl transition-all text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1"
                        >
                            Daftar Sekarang Gratis
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-100 py-12 px-6 bg-gray-50">
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
