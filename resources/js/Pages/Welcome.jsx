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
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Performa',
            description: 'Statistik lengkap dan rekomendasi personal untuk meningkatkan skor.',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Real-time',
            description: 'Bandingkan skormu dengan ribuan peserta lain secara real-time.',
        },
        {
            icon: AcademicCapIcon,
            title: 'Pembahasan Lengkap',
            description: 'Setiap soal dilengkapi pembahasan detail untuk pemahaman maksimal.',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti Kecurangan',
            description: 'Sistem monitoring canggih untuk memastikan integritas ujian.',
        },
    ];



    return (
        <>
            <Head title="Platform Tryout UTBK Online - Gemaprest" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
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
                                <Link href={route('register')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Persiapan UTBK Terbaik<br />
                                untuk Raih PTN Impian
                            </h1>

                            <p className="text-xl text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto">
                                Platform tryout online dari <span className="font-bold text-blue-600">Beasiswa Karya Salembah Empat (KSE) UNSRAT</span>
                            </p>

                            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                                Kami hadir untuk membantu adik-adik SMA dalam mempersiapkan diri menghadapi UTBK dengan menyediakan soal berkualitas, simulasi realistis, dan analisis performa mendalam
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Mulai Tryout Gratis
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-all border border-gray-200 shadow-sm"
                                >
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>


                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Fitur Unggulan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl p-12 lg:p-16 shadow-lg border border-gray-100">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Program KSE UNSRAT untuk Adik-Adik SMA
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Beasiswa Karya Salembah Empat hadir untuk mendukung persiapan UTBK kamu
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-blue-600 rounded-3xl p-12 lg:p-16 text-center shadow-xl">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                Siap Raih PTN Impianmu?
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                Mulai persiapan UTBK kamu sekarang dengan tryout gratis
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-xl transition-all text-lg shadow-lg"
                            >
                                Daftar Sekarang Gratis
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
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
