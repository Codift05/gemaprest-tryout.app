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
        if (confirm('Apakah kamu siap memulai ujian? Pastikan koneksi internet stabil dan tidak ada gangguan.')) {
            router.post(route('exam.start', tryout.id));
        }
    };

    const statusLabel = tryout.status === 'upcoming'
        ? 'Akan Datang'
        : tryout.status === 'ended'
            ? 'Berakhir'
            : 'Sedang Berlangsung';

    const statusClass = tryout.status === 'upcoming'
        ? 'bg-amber-100 text-amber-700'
        : tryout.status === 'ended'
            ? 'bg-red-100 text-red-700'
            : 'bg-emerald-100 text-emerald-700';

    const rules = [
        settings.enable_fullscreen && 'Ujian akan berlangsung dalam mode layar penuh (fullscreen).',
        settings.enable_proctoring && 'Dilarang berpindah tab atau keluar dari halaman ujian selama berlangsung.',
        settings.enable_proctoring && 'Fitur copy, paste, dan tangkapan layar (screenshot) dinonaktifkan.',
        settings.enable_proctoring && `Maksimal ${tryout.max_violations} pelanggaran sebelum ujian otomatis dihentikan.`,
        'Jawaban tersimpan otomatis setiap kali kamu memilih atau mengubah jawaban.',
    ].filter(Boolean);

    return (
        <MainLayout title={tryout.title} isFullWidth={true}>
            <Head title={tryout.title} />

            {/* Full-Width Emerald Header */}
            <div className="w-full bg-emerald-800 pt-8 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-emerald-300 text-sm mb-5">
                        <Link href={route('tryouts.index')} className="hover:text-white transition-colors">Tryout</Link>
                        <span>/</span>
                        <span className="text-white font-medium line-clamp-1">{tryout.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Thumbnail */}
                        {tryout.thumbnail && (
                            <div className="w-full md:w-40 lg:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                                <img
                                    src={`/storage/${tryout.thumbnail}`}
                                    alt={tryout.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Title + Meta */}
                        <div className="flex-1 min-w-0">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusClass}`}>
                                    {statusLabel}
                                </span>
                                {tryout.categories.map((cat) => (
                                    <span key={cat.id} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-emerald-100">
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                                {tryout.title}
                            </h1>
                            {tryout.description && (
                                <p className="text-emerald-200 text-sm md:text-base leading-relaxed max-w-2xl">
                                    {tryout.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Overlapping the header) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 pb-12">

                {/* Stats Cards Row (Overlapping) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Butir Soal', value: tryout.total_questions, icon: DocumentTextIcon },
                        { label: 'Durasi', value: `${tryout.duration_minutes} Menit`, icon: ClockIcon },
                        { label: 'Peserta', value: tryout.participant_count, icon: UserGroupIcon },
                        { label: 'Maks. Pelanggaran', value: tryout.max_violations, icon: ShieldExclamationIcon },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <stat.icon className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 leading-none">{stat.value}</p>
                                <p className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wide">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Left: Rules */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm">Peraturan &amp; Ketentuan Ujian</h3>
                            </div>
                            <ul className="divide-y divide-gray-50 px-5 py-2">
                                {rules.map((rule, idx) => (
                                    <li key={idx} className="flex items-start gap-3.5 py-3.5">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-bold mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <span className="text-sm text-gray-600 leading-relaxed">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: Action + History */}
                    <div className="space-y-4">

                        {/* Start Exam Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">Mulai Pengerjaan</h3>
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                Pastikan kamu berada di tempat yang kondusif dan memiliki koneksi internet yang stabil.
                            </p>

                            {/* Remaining Attempts */}
                            <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                                <span className="text-xs text-gray-500 font-medium">Sisa Percobaan</span>
                                <span className={`text-sm font-bold ${tryout.remaining_attempts > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {tryout.remaining_attempts} / {tryout.max_attempts}
                                </span>
                            </div>

                            {tryout.can_attempt ? (
                                <button
                                    onClick={handleStart}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
                                >
                                    Mulai Ujian
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            ) : (
                                <div className="w-full text-center py-3 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium select-none">
                                    {tryout.status === 'upcoming' ? 'Belum Dimulai' : 'Tidak Tersedia'}
                                </div>
                            )}

                            {tryout.show_leaderboard && (
                                <Link
                                    href={route('leaderboard.show', tryout.slug)}
                                    className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium border border-gray-200 rounded-xl transition-colors"
                                >
                                    <ChartBarIcon className="w-4 h-4 text-gray-400" />
                                    Lihat Peringkat
                                </Link>
                            )}
                        </div>

                        {/* Previous Attempts */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900 text-sm">Riwayat</h3>
                                {previousAttempts.length > 0 && (
                                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                                        {previousAttempts.length} Percobaan
                                    </span>
                                )}
                            </div>

                            {previousAttempts.length > 0 ? (
                                <div className="space-y-1">
                                    {previousAttempts.map((attempt, index) => (
                                        <Link
                                            key={attempt.id}
                                            href={route('exam.result', attempt.id)}
                                            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium">Percobaan #{previousAttempts.length - index}</p>
                                                <p className="text-sm font-bold text-gray-800">{attempt.percentage}%
                                                    <span className="text-gray-400 font-normal text-xs ml-1">Skor</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">
                                                    {formatDistanceToNow(new Date(attempt.finished_at), { addSuffix: true, locale: id })}
                                                </p>
                                                <p className="text-xs text-emerald-600 font-medium group-hover:underline">Detail</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <InformationCircleIcon className="w-5 h-5 text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-400">Belum ada riwayat pengerjaan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
