import { Head, Link } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    ClockIcon, 
    ChartBarIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    TrophyIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    SparklesIcon,
    BookOpenIcon
} from '@heroicons/react/24/outline';

export default function Welcome() {
    const features = [
        {
            icon: BookOpenIcon,
            title: 'Soal Berkualitas',
            description: 'Ribuan soal yang disusun sesuai dengan standar UTBK terbaru oleh tim ahli pendidikan.',
        },
        {
            icon: ClockIcon,
            title: 'Simulasi Waktu Nyata',
            description: 'Latihan dengan timer yang sama persis seperti ujian sesungguhnya.',
        },
        {
            icon: ChartBarIcon,
            title: 'Analisis Mendalam',
            description: 'Lihat statistik performa dan rekomendasi untuk meningkatkan skor.',
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
        }
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

            <div className="min-h-screen bg-slate-50 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/15 to-emerald-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                </div>

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-18 py-4">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto drop-shadow-sm" />
                                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Gemaprest Tryout
                                </span>
                            </Link>
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="btn btn-ghost">
                                    Masuk
                                </Link>
                                <Link href={route('register')} className="btn btn-primary">
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-36 pb-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-100">
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                                    Persiapan UTBK
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Terbaik untuk</span>
                                    <br />
                                    Masa Depanmu
                                </h1>
                                <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    Platform tryout online dengan soal berkualitas, simulasi realistis, 
                                    dan analisis performa mendalam untuk membantu kamu meraih PTN impian.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link href={route('register')} className="btn btn-primary btn-lg group">
                                        Mulai Tryout Gratis
                                        <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition" />
                                    </Link>
                                    <a href="#features" className="btn btn-secondary btn-lg">
                                        Pelajari Lebih Lanjut
                                    </a>
                                </div>

                                {/* Trust Indicators */}
                                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">50K+</div>
                                        <div className="text-sm text-gray-500">Pengguna</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">10K+</div>
                                        <div className="text-sm text-gray-500">Soal</div>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">4.9</div>
                                        <div className="text-sm text-gray-500">Rating</div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Visual - Floating Cards */}
                            <div className="relative hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl" />
                                
                                {/* Main Card */}
                                <div className="floating-card relative z-10 p-8 animate-float">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">Tryout UTBK 2025</h3>
                                            <p className="text-sm text-gray-500">Paket Lengkap TPS + TKA</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-700">
                                                <CheckCircleIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                                <span className="text-sm">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Mini Cards */}
                                <div className="absolute -top-4 -right-4 floating-card p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                                            <ChartBarIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">750</div>
                                            <div className="text-xs text-gray-500">Skor Rata-rata</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -left-4 floating-card p-4 animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center">
                                            <UserGroupIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">1,234</div>
                                            <div className="text-xs text-gray-500">Online Sekarang</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-4 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-100">
                                Fitur Unggulan
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                Semua yang kamu butuhkan
                                <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">dalam satu platform</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Platform tryout paling lengkap untuk persiapan UTBK dengan fitur-fitur canggih
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="feature-card group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                                        <feature.icon className="h-7 w-7 text-white" />
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

                {/* Stats Section */}
                <section className="py-24 px-4 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-12 lg:p-16">
                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                            
                            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center text-white">
                                {[
                                    { value: '50,000+', label: 'Pengguna Aktif' },
                                    { value: '10,000+', label: 'Soal Tersedia' },
                                    { value: '95%', label: 'Tingkat Kepuasan' },
                                    { value: '500+', label: 'Lolos PTN Favorit' }
                                ].map((stat, index) => (
                                    <div key={index} className="p-4">
                                        <div className="text-3xl sm:text-5xl font-bold mb-3">{stat.value}</div>
                                        <div className="text-emerald-200 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card p-12 lg:p-16 text-center relative overflow-hidden">
                            {/* Decorative */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-teal-400/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-full blur-3xl" />
                            
                            <div className="relative">
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                    Siap Raih PTN Impianmu?
                                </h2>
                                <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                                    Bergabung dengan ribuan siswa yang sudah mempersiapkan UTBK bersama kami. Mulai perjalananmu sekarang!
                                </p>
                                <Link href={route('register')} className="btn btn-primary btn-lg group">
                                    Mulai Sekarang - Gratis!
                                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-16 px-4 relative overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    
                    <div className="max-w-7xl mx-auto relative">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Gemaprest Logo" className="h-10 w-auto" />
                                <span className="text-white font-bold text-lg">Gemaprest Tryout</span>
                            </div>
                            <div className="flex gap-10 text-sm">
                                <a href="#" className="hover:text-white transition-colors">Tentang</a>
                                <a href="#" className="hover:text-white transition-colors">Kontak</a>
                                <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                                <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-10 pt-10 text-center text-sm">
                            &copy; {new Date().getFullYear()} Gemaprest Tryout. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
