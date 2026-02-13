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
            color: 'bg-blue-600',
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
            color: 'bg-blue-600',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Performa',
            description: 'Statistik lengkap dan rekomendasi personal untuk meningkatkan skor.',
            color: 'bg-blue-600',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Real-time',
            description: 'Bandingkan skormu dengan ribuan peserta lain secara real-time.',
            color: 'bg-blue-600',
        },
        {
            icon: AcademicCapIcon,
            title: 'Pembahasan Lengkap',
            description: 'Setiap soal dilengkapi pembahasan detail untuk pemahaman maksimal.',
            color: 'bg-blue-600',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti Kecurangan',
            description: 'Sistem monitoring canggih untuk memastikan integritas ujian.',
            color: 'bg-blue-600',
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


                {/* Combined Benefits & CTA Section */}
                <section id="benefits" className="relative py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-6xl mx-auto">
                        {/* Main Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Left Side - Benefits */}
                                <div className="bg-blue-600 p-8 md:p-10 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                                        <SparklesIcon className="w-4 h-4" />
                                        <span>Program KSE UNSRAT</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                        Platform Tryout untuk Calon Mahasiswa
                                    </h3>
                                    <p className="text-blue-50 mb-6 leading-relaxed">
                                        Dari Beasiswa Karya Salembah Empat UNSRAT. Platform tryout online terlengkap untuk persiapan UTBK kamu.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-blue-50">Tryout gratis tanpa batas</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-blue-50">Pembahasan lengkap setiap soal</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-blue-50">Analisis performa real-time</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - CTA */}
                                <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 flex flex-col justify-center">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                        Siap Raih PTN Impianmu?
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Mulai persiapan UTBK kamu sekarang. Daftar gratis dan akses ribuan soal berkualitas.
                                    </p>

                                    {/* CTA Button */}
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                                    >
                                        Daftar Sekarang Gratis
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-200 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        {/* Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {/* About Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/logo.png" alt="Gemaprest Logo" className="h-8 w-auto" />
                                    <span className="text-lg font-bold text-gray-900">Gemaprest</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Platform tryout UTBK online terlengkap dari Program Beasiswa Karya Salembah Empat UNSRAT.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Menu</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            Fitur
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#benefits" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            Keunggulan
                                        </a>
                                    </li>
                                    <li>
                                        <Link href={route('register')} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            Daftar Gratis
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact/Info */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Informasi</h4>
                                <ul className="space-y-2">
                                    <li className="text-sm text-gray-600">
                                        Program KSE UNSRAT
                                    </li>
                                    <li className="text-sm text-gray-600">
                                        Universitas Sam Ratulangi
                                    </li>
                                    <li className="text-sm text-gray-600">
                                        Manado, Sulawesi Utara
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                                <div>
                                    © 2026 Gemaprest. All rights reserved.
                                </div>
                                <div className="flex items-center gap-2">
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
