import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
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
    const [clickCount, setClickCount] = useState(0);
    const clickTimerRef = useRef(null);

    const handleLogoClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // Clear previous timer
        if (clickTimerRef.current) {
            clearTimeout(clickTimerRef.current);
        }

        // Check if reached 3 clicks
        if (newCount >= 3) {
            setClickCount(0);
            router.visit('/admin-portal-secret');
            return;
        }

        // Reset counter after 3 seconds
        clickTimerRef.current = setTimeout(() => {
            setClickCount(0);
        }, 3000);
    };

    const features = [
        {
            icon: BookOpenIcon,
            title: 'Soal Berkualitas Tinggi',
            description: 'Ribuan soal yang disusun sesuai standar UTBK terbaru oleh tim ahli pendidikan.',
            color: 'bg-gray-700',
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
            color: 'bg-gray-700',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Performa',
            description: 'Statistik lengkap dan rekomendasi personal untuk meningkatkan skor.',
            color: 'bg-gray-700',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Real-time',
            description: 'Bandingkan skormu dengan ribuan peserta lain secara real-time.',
            color: 'bg-gray-700',
        },
        {
            icon: AcademicCapIcon,
            title: 'Pembahasan Lengkap',
            description: 'Setiap soal dilengkapi pembahasan detail untuk pemahaman maksimal.',
            color: 'bg-gray-700',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti Kecurangan',
            description: 'Sistem monitoring canggih untuk memastikan integritas ujian.',
            color: 'bg-gray-700',
        },
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div
                                onClick={handleLogoClick}
                                className="cursor-pointer"
                            >
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto" />
                            </div>
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Fitur
                                </a>
                                <a href="#benefits" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Keunggulan
                                </a>
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
                        <div className="flex flex-row gap-3 justify-center items-center">
                            <Link
                                href={route('register')}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base"
                            >
                                Mulai Tryout Gratis
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all border-2 border-gray-200 hover:border-gray-300 shadow-sm text-sm md:text-base"
                            >
                                Masuk ke Platform
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-16 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Fitur <span className="text-blue-600">Unggulan</span>
                            </h2>
                            <p className="text-base text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
                                >
                                    {/* Solid Color Icon Background */}
                                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Leaderboard Section */}
                <section id="benefits" className="relative py-20 px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                                <TrophyIcon className="w-4 h-4" />
                                <span>Leaderboard Real-time</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Siswa <span className="text-blue-600">Terbaik</span> Minggu Ini
                            </h2>
                            <p className="text-sm text-gray-600 max-w-xl mx-auto">
                                Selesaikan tryout dan lihat namamu di leaderboard bersama peserta lainnya
                            </p>
                        </div>

                        {/* Leaderboard Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Leaderboard Header */}
                            <div className="bg-blue-600 px-8 py-4">
                                <div className="grid grid-cols-12 gap-4 text-white text-xs font-semibold uppercase tracking-wide">
                                    <div className="col-span-1 text-center">Rank</div>
                                    <div className="col-span-7 md:col-span-8">Nama Siswa</div>
                                    <div className="col-span-4 md:col-span-3 text-right">Skor</div>
                                </div>
                            </div>

                            {/* Leaderboard Items */}
                            <div className="divide-y divide-gray-100 bg-gray-50">
                                {/* Rank 1 */}
                                <div className="px-8 py-5 bg-white hover:bg-blue-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                                                <TrophyIcon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="col-span-7 md:col-span-8">
                                            <div className="font-semibold text-gray-900 text-sm">Ahmad Rizki Pratama</div>
                                            <div className="text-xs text-gray-500 mt-0.5">SMA Negeri 1 Manado</div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <div className="text-xl font-bold text-blue-600">985</div>
                                            <div className="text-xs text-gray-500 mt-0.5">dari 1000</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rank 2 */}
                                <div className="px-8 py-5 bg-white hover:bg-blue-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-md">
                                                <TrophyIcon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="col-span-7 md:col-span-8">
                                            <div className="font-semibold text-gray-900 text-sm">Siti Nurhaliza</div>
                                            <div className="text-xs text-gray-500 mt-0.5">SMA Negeri 3 Manado</div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <div className="text-xl font-bold text-blue-600">978</div>
                                            <div className="text-xs text-gray-500 mt-0.5">dari 1000</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rank 3 */}
                                <div className="px-8 py-5 bg-white hover:bg-blue-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                                                <TrophyIcon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="col-span-7 md:col-span-8">
                                            <div className="font-semibold text-gray-900 text-sm">Budi Santoso</div>
                                            <div className="text-xs text-gray-500 mt-0.5">SMA Negeri 2 Manado</div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <div className="text-xl font-bold text-blue-600">972</div>
                                            <div className="text-xs text-gray-500 mt-0.5">dari 1000</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rank 4 */}
                                <div className="px-8 py-5 bg-white hover:bg-blue-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                                                4
                                            </div>
                                        </div>
                                        <div className="col-span-7 md:col-span-8">
                                            <div className="font-semibold text-gray-900 text-sm">Dewi Lestari</div>
                                            <div className="text-xs text-gray-500 mt-0.5">SMA Negeri 5 Manado</div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <div className="text-xl font-bold text-blue-600">965</div>
                                            <div className="text-xs text-gray-500 mt-0.5">dari 1000</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rank 5 */}
                                <div className="px-8 py-5 bg-white hover:bg-blue-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-1 flex justify-center">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                                                5
                                            </div>
                                        </div>
                                        <div className="col-span-7 md:col-span-8">
                                            <div className="font-semibold text-gray-900 text-sm">Andi Wijaya</div>
                                            <div className="text-xs text-gray-500 mt-0.5">SMA Negeri 4 Manado</div>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <div className="text-xl font-bold text-blue-600">958</div>
                                            <div className="text-xs text-gray-500 mt-0.5">dari 1000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Footer */}
                            <div className="bg-gray-50 px-6 py-6 text-center border-t border-gray-100">
                                <p className="text-sm text-gray-600 mb-4">
                                    Ingin namamu muncul di leaderboard? Daftar sekarang dan mulai tryout!
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                                >
                                    Daftar Sekarang Gratis
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-200 bg-white">
                    <div className="max-w-4xl mx-auto px-6 py-10">
                        {/* Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                            {/* About Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <img src="/logo.png" alt="Gemaprest Logo" className="h-7 w-auto" />
                                    <span className="text-base font-bold text-gray-900">Gemaprest</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Platform tryout UTBK online terlengkap dari Program Beasiswa Karya Salembah Empat UNSRAT.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Menu</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#features" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                                            Fitur
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#benefits" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                                            Keunggulan
                                        </a>
                                    </li>
                                    <li>
                                        <Link href={route('register')} className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                                            Daftar Gratis
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact/Info */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wide">Informasi</h4>
                                <ul className="space-y-2">
                                    <li className="text-xs text-gray-600">
                                        Program KSE UNSRAT
                                    </li>
                                    <li className="text-xs text-gray-600">
                                        Universitas Sam Ratulangi
                                    </li>
                                    <li className="text-xs text-gray-600">
                                        Manado, Sulawesi Utara
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                                <div>
                                    © 2026 Gemaprest. All rights reserved.
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span>Developed by</span>
                                    <span className="font-semibold text-gray-900">mfthsarsyd</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
