import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { 
    ClockIcon, 
    DocumentTextIcon, 
    UserGroupIcon,
    ShieldExclamationIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Show({ tryout, previousAttempts }) {
    const handleStart = () => {
        if (!tryout.can_attempt) return;

        if (confirm('Apakah Anda siap memulai ujian? Pastikan koneksi internet stabil dan tidak ada gangguan.')) {
            router.post(route('exam.start', tryout.id));
        }
    };

    return (
        <MainLayout>
            <Head title={tryout.title} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="card overflow-hidden mb-6">
                    <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                        {tryout.thumbnail && (
                            <img
                                src={`/storage/${tryout.thumbnail}`}
                                alt={tryout.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-2 mb-2">
                                {tryout.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="px-2 py-1 rounded text-xs font-medium text-white"
                                        style={{ backgroundColor: cat.color }}
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl font-bold text-white">{tryout.title}</h1>
                        </div>
                    </div>

                    <div className="p-6">
                        {tryout.description && (
                            <p className="text-gray-600 mb-6">{tryout.description}</p>
                        )}

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {tryout.total_questions}
                                    </p>
                                    <p className="text-sm text-gray-600">Soal</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <ClockIcon className="w-8 h-8 text-amber-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {tryout.duration_minutes}
                                    </p>
                                    <p className="text-sm text-gray-600">Menit</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <UserGroupIcon className="w-8 h-8 text-emerald-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {tryout.participant_count}
                                    </p>
                                    <p className="text-sm text-gray-600">Peserta</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <ShieldExclamationIcon className="w-8 h-8 text-red-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {tryout.max_violations}
                                    </p>
                                    <p className="text-sm text-gray-600">Maks. Pelanggaran</p>
                                </div>
                            </div>
                        </div>

                        {/* Rules */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                            <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-3">
                                <ExclamationTriangleIcon className="w-5 h-5" />
                                Peraturan Ujian
                            </h3>
                            <ul className="space-y-2 text-sm text-amber-800">
                                <li className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    Ujian akan berlangsung dalam mode fullscreen
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    Jangan berpindah tab atau keluar dari halaman ujian
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    Copy, paste, dan screenshot tidak diperbolehkan
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    Maksimal {tryout.max_violations} pelanggaran sebelum ujian otomatis diserahkan
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    Jawaban disimpan otomatis setiap kali Anda menjawab
                                </li>
                            </ul>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Percobaan tersisa:{' '}
                                    <span className="font-semibold">
                                        {tryout.remaining_attempts} dari {tryout.max_attempts}
                                    </span>
                                </p>
                            </div>

                            {tryout.can_attempt ? (
                                <button onClick={handleStart} className="btn btn-primary btn-lg">
                                    Mulai Ujian
                                </button>
                            ) : (
                                <div className="text-right">
                                    <p className="text-sm text-red-600 mb-2">
                                        {tryout.status === 'upcoming'
                                            ? 'Tryout belum dimulai'
                                            : tryout.status === 'ended'
                                            ? 'Tryout sudah berakhir'
                                            : 'Percobaan sudah habis'}
                                    </p>
                                    {tryout.show_leaderboard && (
                                        <Link
                                            href={route('leaderboard.show', tryout.slug)}
                                            className="btn btn-secondary"
                                        >
                                            Lihat Leaderboard
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Previous Attempts */}
                {previousAttempts.length > 0 && (
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Riwayat Percobaan</h2>
                        </div>
                        <div className="divide-y">
                            {previousAttempts.map((attempt, index) => (
                                <div
                                    key={attempt.id}
                                    className="p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-medium text-gray-600">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                Skor: {attempt.percentage}%
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {formatDistanceToNow(new Date(attempt.finished_at), {
                                                    addSuffix: true,
                                                    locale: id,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('exam.result', attempt.id)}
                                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
