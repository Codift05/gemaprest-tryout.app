import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const TryoutCard = ({ tryout }) => {
    const getStatusBadge = () => {
        if (tryout.status === 'upcoming') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    Akan Datang
                </span>
            );
        }
        if (tryout.status === 'ended') {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Berakhir
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                Aktif
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                {tryout.thumbnail && (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                    {getStatusBadge()}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-1 mb-2">
                        {tryout.categories?.slice(0, 2).map((cat) => (
                            <span
                                key={cat.id}
                                className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white/20 text-white backdrop-blur-sm border border-white/10"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                    <h3 className="font-bold text-white text-lg line-clamp-2 drop-shadow-md">
                        {tryout.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        <ClipboardDocumentListIcon className="w-4 h-4 text-gray-400" />
                        {tryout.total_questions} Soal
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        {tryout.duration_minutes} Menit
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <UserGroupIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.participant_count} Peserta</span>
                    </div>

                    <Link
                        href={route('tryout.show', tryout.slug)}
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function Index({ tryouts, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');

    const handleFilter = () => {
        router.get(route('tryouts.index'), {
            search,
            category: categoryFilter,
        }, { preserveState: true });
    };

    return (
        <MainLayout title="Daftar Tryout">
            <Head title="Daftar Tryout" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                    <div className="relative">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Jelajahi Tryout</h1>
                        <p className="text-gray-600 max-w-2xl">
                            Pilih dari berbagai paket tryout berkualitas tinggi yang disusun sesuai standar UTBK terbaru untuk memaksimalkan persiapanmu.
                        </p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm sticky top-20 z-30">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul tryout..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="">Semua Kategori</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleFilter}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                            <FunnelIcon className="w-4 h-4" />
                            Terapkan Filter
                        </button>
                    </div>
                </div>

                {/* Tryouts Grid */}
                {tryouts.data.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClipboardDocumentListIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Tidak Ada Tryout Ditemukan
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {search || categoryFilter
                                ? 'Coba sesuaikan kata kunci atau filter pencarian untuk menemukan tryout yang kamu cari.'
                                : 'Belum ada tryout yang tersedia saat ini. Silakan kembali lagi nanti.'}
                        </p>
                        {(search || categoryFilter) && (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setCategoryFilter('');
                                    router.get(route('tryouts.index'));
                                }}
                                className="mt-6 px-6 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl font-medium text-sm transition-colors"
                            >
                                Reset Pencarian
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tryouts.data.map((tryout) => (
                            <TryoutCard key={tryout.id} tryout={tryout} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {tryouts.last_page > 1 && (
                    <div className="flex justify-center pt-4">
                        <nav className="flex gap-2">
                            {tryouts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${link.active
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : link.url
                                            ? 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                            : 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed'
                                        }`}
                                    preserveState
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
