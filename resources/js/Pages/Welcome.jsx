import { Head, Link } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    ClockIcon, 
    ChartBarIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    TrophyIcon 
} from '@heroicons/react/24/outline';

export default function Welcome() {
    const features = [
        {
            icon: ClockIcon,
            title: 'Timer Berbasis Server',
            description: 'Waktu ujian yang akurat dan tidak bisa dimanipulasi dengan sinkronisasi server.',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Anti-Kecurangan',
            description: 'Sistem deteksi otomatis untuk pindah tab, keluar fullscreen, dan aktivitas mencurigakan.',
        },
        {
            icon: ChartBarIcon,
            title: 'Penilaian Otomatis',
            description: 'Hasil dan pembahasan langsung tersedia setelah selesai mengerjakan.',
        },
        {
            icon: TrophyIcon,
            title: 'Leaderboard Realtime',
            description: 'Lihat peringkat Anda dibanding peserta lain secara langsung.',
        },
        {
            icon: UserGroupIcon,
            title: 'Ribuan Soal',
            description: 'Bank soal lengkap TPS dan TKA dengan pembahasan detail.',
        },
        {
            icon: AcademicCapIcon,
            title: 'Simulasi UTBK',
            description: 'Pengalaman tryout yang mirip dengan ujian UTBK sesungguhnya.',
        },
    ];

    return (
        <>
            <Head title="Platform Tryout UTBK Online" />

            <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900">
                                    Tryout UTBK
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="btn btn-primary"
                                >
                                    Daftar Gratis
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                                Persiapan UTBK
                                <span className="text-indigo-600"> Terbaik</span>
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                                Platform tryout online dengan sistem penilaian otomatis, 
                                anti-kecurangan, dan leaderboard realtime untuk memaksimalkan 
                                persiapan UTBK kamu.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="btn btn-primary btn-lg"
                                >
                                    Mulai Tryout Gratis
                                </Link>
                                <Link
                                    href="#features"
                                    className="btn btn-outline btn-lg"
                                >
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Peserta', value: '10,000+' },
                                { label: 'Tryout', value: '50+' },
                                { label: 'Soal', value: '5,000+' },
                                { label: 'Rating', value: '4.9/5' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-indigo-600">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Fitur Unggulan
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Semua yang kamu butuhkan untuk persiapan UTBK
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="p-6 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-indigo-600">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Siap Untuk Mulai?
                        </h2>
                        <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
                            Daftar sekarang dan mulai tryout pertamamu. 
                            Gratis tanpa biaya apapun!
                        </p>
                        <Link
                            href={route('register')}
                            className="mt-8 inline-flex btn btn-lg bg-white text-indigo-600 hover:bg-indigo-50"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">T</span>
                                </div>
                                <span className="font-bold text-white">Tryout UTBK</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Tryout UTBK. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
