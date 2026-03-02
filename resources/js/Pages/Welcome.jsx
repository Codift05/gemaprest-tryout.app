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

export default function Welcome({ leaderboard, tryoutTitle }) {
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
                    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16 md:h-20">
                            <div
                                onClick={handleLogoClick}
                                className="cursor-pointer"
                            >
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-8 md:h-10 w-auto" />
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
                <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Banner Image Container */}
                        <div className="relative rounded-2xl md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl mb-8 md:mb-12">
                            <img
                                src="/Banner Web 2.png"
                                alt="Gemaprest Try Out UTBK - Platform tryout online dari Beasiswa Karya Salembah Empat (KSE) UNSRAT"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <Link
                                href={route('register')}
                                className="w-full sm:w-auto px-5 md:px-6 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm"
                            >
                                Mulai Tryout Gratis
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                href={route('login')}
                                className="w-full sm:w-auto px-5 md:px-6 py-2.5 md:py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all border-2 border-gray-200 hover:border-gray-300 shadow-sm text-sm"
                            >
                                Masuk ke Platform
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-12 md:py-16 px-4 md:px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                                Fitur <span className="text-blue-600">Unggulan</span>
                            </h2>
                            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 flex items-center gap-3"
                                >
                                    {/* Icon */}
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>

                                    {/* Title Only */}
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                                        {feature.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Leaderboard Section */}
                <section id="benefits" className="relative py-12 md:py-20 px-4 md:px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                                Siswa <span className="text-blue-600">Terbaik</span>
                            </h2>
                            {tryoutTitle && <p className="text-xs md:text-sm text-gray-700 font-medium">{tryoutTitle}</p>}
                            <p className="text-xs text-gray-600 max-w-xl mx-auto mt-2">
                                Selesaikan tryout dan lihat namamu di leaderboard
                            </p>
                        </div>

                        {/* Leaderboard Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Leaderboard Header */}
                            <div className="bg-blue-600 px-4 md:px-8 py-3">
                                <div className="flex items-center text-white text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                                    <div className="w-12 text-center shrink-0">#</div>
                                    <div className="flex-1 min-w-0">Nama</div>
                                    <div className="w-16 text-right shrink-0">Skor</div>
                                </div>
                            </div>

                            {/* Leaderboard Items */}
                            <div className="divide-y divide-gray-100 bg-gray-50">
                                {leaderboard && leaderboard.length > 0 ? (
                                    leaderboard.map((entry, index) => (
                                        <div key={index} className="px-4 md:px-8 py-3 md:py-4 bg-white hover:bg-blue-50 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 flex justify-center shrink-0">
                                                    {entry.rank === 1 && (
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                                                            <TrophyIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                    )}
                                                    {entry.rank === 2 && (
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-md">
                                                            <TrophyIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                    )}
                                                    {entry.rank === 3 && (
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                                                            <TrophyIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                    )}
                                                    {entry.rank > 3 && (
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs md:text-sm">
                                                            {entry.rank}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-gray-900 text-xs md:text-sm truncate">{entry.user.name}</div>
                                                    <div className="text-[10px] md:text-xs text-gray-500 truncate">{entry.user.school || '-'}</div>
                                                </div>
                                                <div className="w-16 text-right shrink-0">
                                                    <div className="text-base md:text-xl font-bold text-blue-600">{Math.round(entry.score)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                                            <TrophyIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">Belum Ada Data</h3>
                                        <p className="text-xs text-gray-500">
                                            Jadilah yang pertama!
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* CTA Footer */}
                            <div className="bg-gray-50 px-4 py-4 text-center border-t border-gray-100">
                                <p className="text-xs text-gray-600 mb-3">
                                    Daftar sekarang dan mulai tryout!
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                                >
                                    Daftar Gratis
                                    <ArrowRightIcon className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative border-t border-gray-200 bg-white">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        {/* Footer Content */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {/* About Section */}
                            <div className="col-span-2 md:col-span-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src="/logo.png" alt="Gemaprest Logo" className="h-6 w-auto" />
                                    <span className="text-sm font-bold text-gray-900">Gemaprest</span>
                                </div>
                                <p className="text-[10px] text-gray-600 leading-snug">
                                    Platform tryout UTBK online dari Program KSE UNSRAT.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-900 mb-2 uppercase tracking-wide">Menu</h4>
                                <ul className="space-y-1">
                                    <li>
                                        <a href="#features" className="text-[10px] text-gray-600 hover:text-blue-600 transition-colors">
                                            Fitur
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#benefits" className="text-[10px] text-gray-600 hover:text-blue-600 transition-colors">
                                            Keunggulan
                                        </a>
                                    </li>
                                    <li>
                                        <Link href={route('register')} className="text-[10px] text-gray-600 hover:text-blue-600 transition-colors">
                                            Daftar
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact/Info */}
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-900 mb-2 uppercase tracking-wide">Info</h4>
                                <ul className="space-y-1">
                                    <li className="text-[10px] text-gray-600">
                                        KSE UNSRAT
                                    </li>
                                    <li className="text-[10px] text-gray-600">
                                        Manado, Sulut
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex flex-row justify-between items-center text-[10px] text-gray-600">
                                <span>© 2026 Gemaprest</span>
                                <span>by <span className="font-semibold text-gray-900">mfthsarsyd</span></span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
