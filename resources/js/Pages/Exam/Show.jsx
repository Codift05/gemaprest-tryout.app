import { Head, Link, router, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClockIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldExclamationIcon,
    ExclamationTriangleIcon,
    ArrowRightIcon,
    ChartBarIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Show({ tryout, previousAttempts }) {
    const { settings } = usePage().props;
    const handleStart = () => {
        if (!tryout.can_attempt) return;

        if (confirm('Apakah Anda siap memulai ujian? Pastikan koneksi internet stabil dan tidak ada gangguan.')) {
            router.post(route('exam.start', tryout.id));
        }
    };

    return (
        <MainLayout title={tryout.title}>
            <Head title={tryout.title} />

            <div className="max-w-7xl mx-auto space-y-5 md:space-y-8">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-indigo-600 p-5 md:p-10 text-white shadow-xl">
                    {/* Subtle Texture/Pattern - drastically simplified from blobs */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="shrink-0 w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-white/10 ring-4 ring-white/20 shadow-lg">
                            {tryout.thumbnail ? (
                                <img
                                    src={`/storage/${tryout.thumbnail}`}
                                    alt={tryout.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-indigo-700">
                                    <DocumentTextIcon className="w-16 h-16 text-indigo-300" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {tryout.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-indigo-600 shadow-sm"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${tryout.status === 'upcoming'
                                    ? 'bg-amber-100 text-amber-800'
                                    : tryout.status === 'ended'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                    {tryout.status === 'upcoming' ? 'Akan Datang' : tryout.status === 'ended' ? 'Berakhir' : 'Sedang Berlangsung'}
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl md:text-4xl font-bold font-display leading-tight drop-shadow-sm mb-2">
                                    {tryout.title}
                                </h1>
                                {tryout.description && (
                                    <p className="text-indigo-100 text-xs md:text-lg leading-relaxed max-w-3xl">
                                        {tryout.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                    {/* Left Column: Stats & Rules */}
                    <div className="lg:col-span-2 space-y-5 md:space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                            {[
                                { label: 'Butir Soal', value: tryout.total_questions, icon: DocumentTextIcon, color: 'blue' },
                                { label: 'Durasi', value: `${tryout.duration_minutes} Menit`, icon: ClockIcon, color: 'amber' },
                                { label: 'Peserta', value: tryout.participant_count, icon: UserGroupIcon, color: 'emerald' },
                                { label: 'Maks. Pelanggaran', value: tryout.max_violations, icon: ShieldExclamationIcon, color: 'red' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group">
                                    <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-2 md:mb-3 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                                    </div>
                                    <span className="text-base md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1">{stat.value}</span>
                                    <span className="text-[9px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rules Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Peraturan & Ketentuan Ujian</h3>
                            </div>
                            <div className="p-4 md:p-6 md:p-8">
                                <ul className="space-y-4">
                                    {[
                                        settings.enable_fullscreen && 'Ujian akan berlangsung dalam mode layar penuh (fullscreen).',
                                        settings.enable_proctoring && 'Dilarang berpindah tab atau keluar dari halaman ujian selama berlangsung.',
                                        settings.enable_proctoring && 'Fitur copy, paste, dan tangkapan layar (screenshot) dinonaktifkan.',
                                        settings.enable_proctoring && `Maksimal ${tryout.max_violations} pelanggaran sebelum ujian otomatis diserahkan/dihentikan.`,
                                        'Jawaban akan tersimpan otomatis setiap kali Anda memilih atau mengubah jawaban.'
                                    ].filter(Boolean).map((rule, idx) => (
                                        <li key={idx} className="flex gap-4 items-start group">
                                            <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </div>
                                            <span className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                                                {rule}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & History */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Action Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-indigo-500/5 p-6 relative overflow-hidden">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">Mulai Pengerjaan</h3>
                            <p className="text-sm text-gray-500 mb-6 relative z-10 leading-relaxed">
                                Pastikan Anda berada di tempat yang kondusif dan memiliki koneksi internet yang stabil.
                            </p>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-sm text-gray-600 font-medium">Sisa Percobaan</span>
                                    <span className={`text-sm font-bold ${tryout.remaining_attempts > 0 ? 'text-indigo-600' : 'text-red-500'}`}>
                                        {tryout.remaining_attempts} / {tryout.max_attempts}
                                    </span>
                                </div>

                                {tryout.can_attempt ? (
                                    <button
                                        onClick={handleStart}
                                        className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                                    >
                                        <span>Mulai Ujian</span>
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200 border-dashed text-gray-400 text-sm font-medium cursor-not-allowed select-none">
                                        {tryout.status === 'upcoming' ? 'Belum Dimulai' : 'Tidak Tersedia'}
                                    </div>
                                )}

                                {tryout.show_leaderboard && (
                                    <Link
                                        href={route('leaderboard.show', tryout.slug)}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl font-medium transition-all text-sm"
                                    >
                                        <ChartBarIcon className="w-4 h-4 text-gray-500" />
                                        Lihat Peringkat
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Previous Attempts */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5 text-gray-400" />
                                    Riwayat
                                </h3>
                                {previousAttempts.length > 0 && (
                                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
                                        {previousAttempts.length} Percobaan
                                    </span>
                                )}
                            </div>

                            {previousAttempts.length > 0 ? (
                                <div className="space-y-3">
                                    {previousAttempts.map((attempt, index) => (
                                        <Link
                                            key={attempt.id}
                                            href={route('exam.result', attempt.id)}
                                            className="block p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-500">Percobaan #{previousAttempts.length - index}</span>
                                                <span className="text-xs text-indigo-600 font-medium group-hover:underline">Detail</span>
                                            </div>
                                            <div className="flex items-center justification-between gap-3">
                                                <span className="text-sm font-bold text-gray-900">{attempt.percentage}% <span className="text-gray-400 font-normal text-xs">Skor</span></span>
                                                <span className="text-xs text-gray-400">
                                                    {formatDistanceToNow(new Date(attempt.finished_at), { addSuffix: true, locale: id })}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <InformationCircleIcon className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-500">Belum ada riwayat pengerjaan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
