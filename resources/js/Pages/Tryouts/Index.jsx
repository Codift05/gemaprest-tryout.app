import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    DocumentTextIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const TryoutCard = ({ tryout }) => {
    const getStatusBadge = () => {
        if (tryout.status === 'upcoming') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    Akan Datang
                </span>
            );
        }
        if (tryout.status === 'ended') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                    Berakhir
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                Aktif
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            {/* Thumbnail */}
            <div className="h-36 md:h-44 bg-gray-50 relative overflow-hidden group-hover:bg-gray-100 transition-colors border-b border-gray-100">
                {tryout.thumbnail ? (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <DocumentTextIcon className="w-16 h-16 text-gray-300" />
                    </div>
                )}

                <div className="absolute top-4 right-4 shadow-sm rounded-md">
                    {getStatusBadge()}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-5 flex flex-col flex-1">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tryout.categories?.slice(0, 2).map((cat) => (
                        <span
                            key={cat.id}
                            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-100 text-gray-600 border border-gray-200"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>

                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {tryout.title}
                </h3>

                <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-500 mb-4 md:mb-6 mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5" title="Jumlah Soal">
                        <ClipboardDocumentListIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.total_questions} Soal</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Durasi">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.duration_minutes} Menit</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Jumlah Peserta">
                        <UserGroupIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.participant_count}</span>
                    </div>
                </div>

                <Link
                    href={route('tryout.show', tryout.slug)}
                    className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn"
                >
                    Lihat Detail
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
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
        <MainLayout title="Daftar Tryout" isFullWidth={true}>
            <Head title="Daftar Tryout" />

            {/* Hero Section (Full Width, Emerald Background) */}
            <div className="w-full bg-emerald-800 pb-20 md:pb-28 pt-8 md:pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative z-10 w-full max-w-2xl text-center md:text-left">
                        <h1 className="text-2xl md:text-[32px] font-bold text-white mb-2 md:mb-3 tracking-tight">
                            Jelajahi Tryout
                        </h1>
                        <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                            Pilih dari berbagai paket tryout berkualitas tinggi yang disusun sesuai standar terbaru.
                        </p>
                    </div>
                    {/* Decoration/Icon */}
                    <div className="relative z-10 hidden md:block opacity-20 transform rotate-6">
                        <ClipboardDocumentListIcon className="w-32 h-32 text-white" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                {/* Search & Filter (Floating Overlap) */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 -mt-10 md:-mt-14 relative z-20 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-600 transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul tryout..."
                                className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border-gray-200 focus:bg-white border focus:border-emerald-500 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <div className="relative">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full pl-4 pr-10 py-2.5 md:py-3 bg-gray-50 border-gray-200 focus:bg-white border focus:border-emerald-500 rounded-lg text-gray-900 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium appearance-none cursor-pointer"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <FunnelIcon className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <button
                            onClick={handleFilter}
                            className="px-8 py-2.5 md:py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
                        >
                            Terapkan
                        </button>
                    </div>
                </div>

                {/* Tryouts Grid */}
                {tryouts.data.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 md:p-16 text-center border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Tidak Ada Tryout Ditemukan
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
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
                                className="px-6 py-2.5 text-emerald-700 hover:bg-emerald-50 rounded-lg font-semibold text-sm transition-colors"
                            >
                                Reset Pencarian
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {tryouts.data.map((tryout) => (
                            <TryoutCard key={tryout.id} tryout={tryout} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {tryouts.last_page > 1 && (
                    <div className="flex justify-center pt-10 border-t border-gray-100 mt-10">
                        <nav className="flex gap-2">
                            {tryouts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${link.active
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : link.url
                                            ? 'bg-white text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 border border-gray-200'
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
