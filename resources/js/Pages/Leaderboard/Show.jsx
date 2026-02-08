import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useLeaderboardRealtime } from '@/hooks';
import {
    TrophyIcon,
    ArrowLeftIcon,
    UserCircleIcon,
    ChartBarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Show({ tryout, entries: initialEntries, currentUserRank }) {
    const { entries, isConnected } = useLeaderboardRealtime(tryout.slug, initialEntries);

    const getMedalColor = (rank) => {
        switch (rank) {
            case 1:
                return 'from-yellow-400 to-yellow-600';
            case 2:
                return 'from-gray-300 to-gray-500';
            case 3:
                return 'from-amber-500 to-amber-700';
            default:
                return 'from-gray-100 to-gray-200';
        }
    };

    const getMedalEmoji = (rank) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <Head title={`Leaderboard - ${tryout.title}`} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Dashboard
                    </Link>

                    <div className="card bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
                                    <p className="text-emerald-100">{tryout.title}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            isConnected ? 'bg-green-400' : 'bg-red-400'
                                        }`}
                                    />
                                    <span className="text-sm text-emerald-100">
                                        {isConnected ? 'Live' : 'Offline'}
                                    </span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-white/10 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold">{entries.length}</p>
                                    <p className="text-sm text-emerald-100">Peserta</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold">
                                        {entries.length > 0 ? entries[0].percentage : 0}%
                                    </p>
                                    <p className="text-sm text-emerald-100">Nilai Tertinggi</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 text-center">
                                    <p className="text-3xl font-bold">
                                        {entries.length > 0
                                            ? Math.round(
                                                  entries.reduce((acc, e) => acc + e.percentage, 0) /
                                                      entries.length
                                              )
                                            : 0}%
                                    </p>
                                    <p className="text-sm text-emerald-100">Rata-rata</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current User Rank */}
                {currentUserRank && (
                    <div className="card bg-indigo-50 border-indigo-200 mb-6">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Peringkat Anda</p>
                                    <p className="text-sm text-gray-600">
                                        #{currentUserRank.rank} dengan skor {currentUserRank.percentage}%
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('exam.result', currentUserRank.session_id)}
                                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                                Lihat Detail →
                            </Link>
                        </div>
                    </div>
                )}

                {/* Top 3 Podium */}
                {entries.length >= 3 && (
                    <div className="flex items-end justify-center gap-4 mb-8">
                        {/* 2nd Place */}
                        <div className="flex-1 max-w-[140px]">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-2xl">
                                    {entries[1].user?.avatar ? (
                                        <img
                                            src={`/storage/${entries[1].user.avatar}`}
                                            alt=""
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        '🥈'
                                    )}
                                </div>
                                <p className="font-semibold text-gray-900 truncate text-sm">
                                    {entries[1].user?.name || 'Anonim'}
                                </p>
                                <p className="text-xl font-bold text-gray-700">
                                    {entries[1].percentage}%
                                </p>
                            </div>
                            <div className="h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg mt-2" />
                        </div>

                        {/* 1st Place */}
                        <div className="flex-1 max-w-[160px]">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-3xl ring-4 ring-yellow-300 ring-offset-2">
                                    {entries[0].user?.avatar ? (
                                        <img
                                            src={`/storage/${entries[0].user.avatar}`}
                                            alt=""
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        '🥇'
                                    )}
                                </div>
                                <p className="font-bold text-gray-900 truncate">
                                    {entries[0].user?.name || 'Anonim'}
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {entries[0].percentage}%
                                </p>
                            </div>
                            <div className="h-28 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg mt-2" />
                        </div>

                        {/* 3rd Place */}
                        <div className="flex-1 max-w-[140px]">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-2xl">
                                    {entries[2].user?.avatar ? (
                                        <img
                                            src={`/storage/${entries[2].user.avatar}`}
                                            alt=""
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        '🥉'
                                    )}
                                </div>
                                <p className="font-semibold text-gray-900 truncate text-sm">
                                    {entries[2].user?.name || 'Anonim'}
                                </p>
                                <p className="text-xl font-bold text-amber-700">
                                    {entries[2].percentage}%
                                </p>
                            </div>
                            <div className="h-14 bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-lg mt-2" />
                        </div>
                    </div>
                )}

                {/* Full Leaderboard */}
                <div className="card">
                    <div className="card-header">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <TrophyIcon className="w-5 h-5 text-amber-500" />
                            Peringkat Lengkap
                        </h2>
                    </div>

                    {entries.length === 0 ? (
                        <div className="p-12 text-center">
                            <UserCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada peserta yang menyelesaikan tryout ini</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {entries.map((entry, index) => {
                                const rank = index + 1;
                                const isCurrentUser = entry.is_current_user;

                                return (
                                    <div
                                        key={entry.id}
                                        className={`p-4 flex items-center gap-4 transition-colors ${
                                            isCurrentUser ? 'bg-indigo-50' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {/* Rank */}
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                                rank <= 3
                                                    ? `bg-gradient-to-br ${getMedalColor(rank)} text-white`
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {getMedalEmoji(rank) || rank}
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-gray-900 truncate">
                                                    {entry.user?.name || 'Anonim'}
                                                </p>
                                                {isCurrentUser && (
                                                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                                        Anda
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <ClockIcon className="w-4 h-4" />
                                                    {entry.duration_minutes} menit
                                                </span>
                                                {entry.finished_at && (
                                                    <span>
                                                        {formatDistanceToNow(new Date(entry.finished_at), {
                                                            addSuffix: true,
                                                            locale: id,
                                                        })}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Score */}
                                        <div className="text-right">
                                            <p
                                                className={`text-xl font-bold ${
                                                    entry.percentage >= 80
                                                        ? 'text-emerald-600'
                                                        : entry.percentage >= 60
                                                        ? 'text-amber-600'
                                                        : 'text-red-600'
                                                }`}
                                            >
                                                {entry.percentage}%
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {entry.score} poin
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
