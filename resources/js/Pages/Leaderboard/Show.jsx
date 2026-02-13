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
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Dashboard
                    </Link>

                    <div className="card bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
                                    <p className="text-emerald-100">{tryout.title}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'
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
                    <div className="card bg-indigo-900/30 border-indigo-500/30 mb-6">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                    <ChartBarIcon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Peringkat Anda</p>
                                    <p className="text-sm text-indigo-200">
                                        #{currentUserRank.rank} dengan skor {currentUserRank.percentage}%
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('exam.result', currentUserRank.session_id)}
                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
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
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-2xl ring-4 ring-gray-900/50">
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
                                <p className="font-semibold text-gray-300 truncate text-sm">
                                    {entries[1].user?.name || 'Anonim'}
                                </p>
                                <p className="text-xl font-bold text-gray-400">
                                    {entries[1].percentage}%
                                </p>
                            </div>
                            <div className="h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg mt-2 opacity-80" />
                        </div>

                        {/* 1st Place */}
                        <div className="flex-1 max-w-[160px]">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-3xl ring-4 ring-yellow-500/50 ring-offset-2 ring-offset-gray-900">
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
                                <p className="font-bold text-white truncate">
                                    {entries[0].user?.name || 'Anonim'}
                                </p>
                                <p className="text-2xl font-bold text-yellow-500">
                                    {entries[0].percentage}%
                                </p>
                            </div>
                            <div className="h-28 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-lg mt-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
                        </div>

                        {/* 3rd Place */}
                        <div className="flex-1 max-w-[140px]">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-2xl ring-4 ring-gray-900/50">
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
                                <p className="font-semibold text-gray-300 truncate text-sm">
                                    {entries[2].user?.name || 'Anonim'}
                                </p>
                                <p className="text-xl font-bold text-amber-700">
                                    {entries[2].percentage}%
                                </p>
                            </div>
                            <div className="h-14 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg mt-2 opacity-80" />
                        </div>
                    </div>
                )}

                {/* Full Leaderboard */}
                <div className="card bg-gray-900/50 border-gray-800">
                    <div className="card-header border-gray-800">
                        <h2 className="font-semibold text-white flex items-center gap-2">
                            <TrophyIcon className="w-5 h-5 text-amber-500" />
                            Peringkat Lengkap
                        </h2>
                    </div>

                    {entries.length === 0 ? (
                        <div className="p-12 text-center">
                            <UserCircleIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">Belum ada peserta yang menyelesaikan tryout ini</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-800">
                            {entries.map((entry, index) => {
                                const rank = index + 1;
                                const isCurrentUser = entry.is_current_user;

                                return (
                                    <div
                                        key={entry.id}
                                        className={`p-4 flex items-center gap-4 transition-colors ${isCurrentUser ? 'bg-indigo-900/20' : 'hover:bg-gray-800/50'
                                            }`}
                                    >
                                        {/* Rank */}
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${rank <= 3
                                                    ? `bg-gradient-to-br ${getMedalColor(rank)} text-white`
                                                    : 'bg-gray-800 text-gray-400'
                                                }`}
                                        >
                                            {getMedalEmoji(rank) || rank}
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-white truncate">
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
                                                className={`text-xl font-bold ${entry.percentage >= 80
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
