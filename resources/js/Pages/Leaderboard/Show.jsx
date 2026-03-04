import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    TrophyIcon,
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Show({ tryout, entries, userEntry, totalParticipants }) {
    const [search, setSearch] = useState('');

    const filteredEntries = entries.filter(entry =>
        entry.user.name.toLowerCase().includes(search.toLowerCase()) ||
        (entry.user.school && entry.user.school.toLowerCase().includes(search.toLowerCase()))
    );

    const getRankStyle = (rank) => {
        if (rank === 1) return { badge: 'bg-amber-400 text-white', row: 'bg-amber-50/50' };
        if (rank === 2) return { badge: 'bg-gray-400 text-white', row: 'bg-gray-50/50' };
        if (rank === 3) return { badge: 'bg-orange-400 text-white', row: 'bg-orange-50/30' };
        return { badge: 'bg-gray-100 text-gray-500', row: '' };
    };

    return (
        <MainLayout isFullWidth={true}>
            <Head title={`Leaderboard - ${tryout.title}`} />

            {/* Full-Width Emerald Header */}
            <div className="w-full bg-emerald-800 pt-8 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href={route('tryout.show', tryout.slug)}
                        className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white text-sm font-medium mb-5 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Kembali
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                Leaderboard
                            </h1>
                            <p className="text-emerald-300 text-sm">{tryout.title}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-emerald-200 bg-emerald-700/60 border border-emerald-600 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                            <UserGroupIcon className="w-4 h-4" />
                            <span className="font-semibold">{totalParticipants}</span>
                            <span>Peserta</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content (Overlapping) */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 pb-24">

                {/* Search (floating overlap) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari nama peserta atau sekolah..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Top 3 Podium (only shown when not searching and 3+ entries) */}
                {!search && entries.length >= 3 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">🏆 Top 3</p>
                        <div className="flex items-end justify-center gap-3">
                            {/* 2nd Place */}
                            <div className="flex-1 flex flex-col items-center">
                                <img
                                    src={`/storage/${entries[1].user.avatar}`}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 mb-2"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[1].user.name)}&background=e5e7eb&color=6b7280&bold=true` }}
                                    alt={entries[1].user.name}
                                />
                                <p className="text-xs font-bold text-gray-800 line-clamp-1 text-center mb-0.5">{entries[1].user.name}</p>
                                <p className="text-sm font-black text-emerald-600">{entries[1].score}</p>
                                <div className="w-full mt-2 h-16 bg-gray-100 rounded-t-lg flex items-center justify-center">
                                    <span className="text-2xl">🥈</span>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex-1 flex flex-col items-center -mt-4">
                                <img
                                    src={`/storage/${entries[0].user.avatar}`}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 mb-2 ring-2 ring-amber-200"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[0].user.name)}&background=fef3c7&color=d97706&bold=true` }}
                                    alt={entries[0].user.name}
                                />
                                <p className="text-xs font-bold text-gray-800 line-clamp-1 text-center mb-0.5">{entries[0].user.name}</p>
                                <p className="text-sm font-black text-emerald-600">{entries[0].score}</p>
                                <div className="w-full mt-2 h-24 bg-amber-50 border border-amber-100 rounded-t-lg flex items-center justify-center">
                                    <span className="text-3xl">🥇</span>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex-1 flex flex-col items-center">
                                <img
                                    src={`/storage/${entries[2].user.avatar}`}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-300 mb-2"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[2].user.name)}&background=ffedd5&color=ea580c&bold=true` }}
                                    alt={entries[2].user.name}
                                />
                                <p className="text-xs font-bold text-gray-800 line-clamp-1 text-center mb-0.5">{entries[2].user.name}</p>
                                <p className="text-sm font-black text-emerald-600">{entries[2].score}</p>
                                <div className="w-full mt-2 h-10 bg-orange-50 border border-orange-100 rounded-t-lg flex items-center justify-center">
                                    <span className="text-2xl">🥉</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-16 text-center">Rank</th>
                                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Peserta</th>
                                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Skor</th>
                                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right hidden md:table-cell">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredEntries.length > 0 ? (
                                    filteredEntries.map((entry) => {
                                        const style = getRankStyle(entry.rank);
                                        return (
                                            <tr
                                                key={entry.rank}
                                                className={`hover:bg-gray-50 transition-colors ${entry.user.is_current_user ? 'bg-emerald-50/60' : style.row}`}
                                            >
                                                <td className="px-4 py-3.5 text-center">
                                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${style.badge}`}>
                                                        {entry.rank <= 3 ? (
                                                            <TrophyIcon className="w-3.5 h-3.5" />
                                                        ) : entry.rank}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={`/storage/${entry.user.avatar}`}
                                                            className="w-8 h-8 rounded-full object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.user.name)}&background=e5e7eb&color=6b7280&bold=true` }}
                                                            alt=""
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-semibold text-gray-900">{entry.user.name}</span>
                                                                {entry.user.is_current_user && (
                                                                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">Kamu</span>
                                                                )}
                                                            </div>
                                                            {entry.user.school && (
                                                                <p className="text-xs text-gray-400">{entry.user.school}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3.5 text-right">
                                                    <p className="text-sm font-bold text-gray-900">{entry.score}</p>
                                                    <p className="text-xs text-gray-400">Benar {entry.correct_count}</p>
                                                </td>
                                                <td className="px-4 py-3.5 text-right hidden md:table-cell">
                                                    <div className="flex items-center justify-end gap-1 text-gray-400 text-sm">
                                                        <ClockIcon className="w-3.5 h-3.5" />
                                                        {entry.time_taken}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium">Tidak ada peserta ditemukan</p>
                                            <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sticky My Rank Bar */}
            {userEntry && (
                <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg px-4 py-3 z-40">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-center min-w-[48px]">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Peringkat</p>
                                <p className="text-lg font-black text-emerald-600">#{userEntry.rank}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-2.5">
                                <img
                                    src={`/storage/${userEntry.user.avatar}`}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userEntry.user.name)}&background=e5e7eb&color=6b7280&bold=true` }}
                                    alt=""
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{userEntry.user.name}</p>
                                    <p className="text-xs text-gray-400">Skor: <span className="font-semibold text-emerald-600">{userEntry.score}</span></p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('dashboard')}
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
