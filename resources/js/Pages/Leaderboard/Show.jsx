import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    TrophyIcon,
    ArrowLeftIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    ChartBarIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Show({ tryout, entries, userEntry, totalParticipants }) {
    const [search, setSearch] = useState('');

    // Filter entries based on search
    const filteredEntries = entries.filter(entry =>
        entry.user.name.toLowerCase().includes(search.toLowerCase()) ||
        (entry.user.school && entry.user.school.toLowerCase().includes(search.toLowerCase()))
    );

    const getMedalColor = (rank) => {
        switch (rank) {
            case 1: return 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-200';
            case 2: return 'bg-gradient-to-br from-gray-300 to-gray-400 shadow-gray-200';
            case 3: return 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-200';
            default: return 'bg-gray-100 text-gray-600 font-bold';
        }
    };

    const getRankBadge = (rank) => {
        if (rank <= 3) {
            return <TrophyIcon className="w-5 h-5 text-white" />;
        }
        return <span>{rank}</span>;
    };

    return (
        <MainLayout>
            <Head title={`Leaderboard - ${tryout.title}`} />

            <div className="min-h-screen bg-gray-50 font-sans pb-20">
                {/* Header / Hero Section */}
                <div className="bg-white border-b border-gray-200 pb-8 pt-6 sticky top-0 z-30 shadow-sm/50 backdrop-blur-md bg-white/90">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm mb-2 group"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                                    Kembali ke Dashboard
                                </Link>
                                <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-2xl">
                                        <TrophyIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                                    </div>
                                    Leaderboard
                                </h1>
                                <p className="text-gray-500 mt-1 ml-14">{tryout.title}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm border border-blue-100 flex items-center gap-2">
                                    <UserCircleIcon className="w-5 h-5" />
                                    {totalParticipants} Peserta
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                                placeholder="Cari nama peserta..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    {/* Top 3 Podium */}
                    {!search && entries.length >= 3 && (
                        <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-10 min-h-[200px]">
                            {/* 2nd Place */}
                            <div className="order-2 md:order-1 flex-1 flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-xl overflow-hidden mb-3">
                                        <img
                                            src={`/storage/${entries[1].user.avatar}`}
                                            className="w-full h-full object-cover bg-gray-200"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[1].user.name)}&background=random` }}
                                            alt={entries[1].user.name}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                        <span className="bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">#2</span>
                                    </div>
                                </div>
                                <div className="text-center mt-2 mb-2">
                                    <p className="font-bold text-gray-900 line-clamp-1 text-sm">{entries[1].user.name}</p>
                                    <p className="text-blue-600 font-black">{entries[1].score}</p>
                                </div>
                                <div className="w-full h-24 bg-gradient-to-t from-gray-100 to-gray-50 rounded-t-2xl border-x border-t border-gray-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/40"></div>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="order-1 md:order-2 flex-1 flex flex-col items-center z-10 -mt-8 md:mt-0">
                                <div className="relative">
                                    <div className="absolute -top-6 inset-x-0 flex justify-center">
                                        <SparklesIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
                                    </div>
                                    <div className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-2xl shadow-yellow-200 overflow-hidden mb-3 ring-4 ring-yellow-100">
                                        <img
                                            src={`/storage/${entries[0].user.avatar}`}
                                            className="w-full h-full object-cover bg-yellow-50"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[0].user.name)}&background=random` }}
                                            alt={entries[0].user.name}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                        <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm border border-white">#1</span>
                                    </div>
                                </div>
                                <div className="text-center mt-2 mb-2">
                                    <p className="font-bold text-gray-900 line-clamp-1 text-base">{entries[0].user.name}</p>
                                    <p className="text-blue-600 font-black text-xl">{entries[0].score}</p>
                                </div>
                                <div className="w-full h-32 bg-gradient-to-t from-yellow-50 to-white rounded-t-2xl border-x border-t border-yellow-200 shadow-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-yellow-400/10"></div>
                                    <div className="absolute bottom-4 inset-x-0 text-center">
                                        <span className="text-6xl">🥇</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="order-3 md:order-3 flex-1 flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full border-4 border-orange-300 shadow-xl overflow-hidden mb-3">
                                        <img
                                            src={`/storage/${entries[2].user.avatar}`}
                                            className="w-full h-full object-cover bg-orange-50"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entries[2].user.name)}&background=random` }}
                                            alt={entries[2].user.name}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">#3</span>
                                    </div>
                                </div>
                                <div className="text-center mt-2 mb-2">
                                    <p className="font-bold text-gray-900 line-clamp-1 text-sm">{entries[2].user.name}</p>
                                    <p className="text-blue-600 font-black">{entries[2].score}</p>
                                </div>
                                <div className="w-full h-16 bg-gradient-to-t from-orange-50 to-white rounded-t-2xl border-x border-t border-orange-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute inset-0 bg-orange-400/10"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Leaderboard List */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider w-20 text-center">Rank</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Peserta</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Skor</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right hidden md:table-cell">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredEntries.length > 0 ? (
                                        filteredEntries.map((entry, index) => (
                                            <tr
                                                key={entry.rank}
                                                className={`group hover:bg-blue-50 transition-colors ${entry.user.is_current_user ? 'bg-blue-50/60' : ''}`}
                                            >
                                                <td className="px-6 py-4 text-center">
                                                    <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full shadow-sm ${getMedalColor(entry.rank)}`}>
                                                        {getRankBadge(entry.rank)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={`/storage/${entry.user.avatar}`}
                                                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm bg-gray-100"
                                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.user.name)}&background=random` }}
                                                            alt=""
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                                    {entry.user.name}
                                                                </p>
                                                                {entry.user.is_current_user && (
                                                                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">Anda</span>
                                                                )}
                                                            </div>
                                                            {entry.user.school && (
                                                                <p className="text-xs text-gray-500">{entry.user.school}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-lg font-black text-blue-600">{entry.score}</span>
                                                        <span className="text-xs text-gray-400 font-medium">Benar {entry.correct_count}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right hidden md:table-cell">
                                                    <div className="flex items-center justify-end gap-1.5 text-gray-500">
                                                        <ClockIcon className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{entry.time_taken}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                        <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <p className="font-medium">Tidak ada peserta ditemukan</p>
                                                    <p className="text-sm mt-1">Coba kata kunci pencarian lain</p>
                                                </div>
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
                    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] p-4 z-40 animate-slide-up">
                        <div className="max-w-5xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Peringkat</p>
                                    <p className="text-xl font-black text-blue-600">#{userEntry.rank}</p>
                                </div>
                                <div className="h-10 w-px bg-gray-200 mx-2 hidden sm:block"></div>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`/storage/${userEntry.user.avatar}`}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userEntry.user.name)}&background=random` }}
                                        alt=""
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-gray-900 line-clamp-1">{userEntry.user.name}</p>
                                            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">Anda</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium">Skor: {userEntry.score}</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={route('dashboard')}
                                className="hidden md:flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                            >
                                Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
