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
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    Akan Datang
                </span>
            );
        }
        if (tryout.status === 'ended') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    Berakhir
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                Aktif
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            {/* Thumbnail */}
            <div className="h-36 md:h-48 bg-indigo-50 relative overflow-hidden group-hover:bg-indigo-100/50 transition-colors">
                {tryout.thumbnail ? (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <DocumentTextIcon className="w-16 h-16 text-indigo-200" />
                    </div>
                )}

                <div className="absolute top-4 right-4">
                    {getStatusBadge()}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-1">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tryout.categories?.slice(0, 2).map((cat) => (
                        <span
                            key={cat.id}
                            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gray-50 text-gray-600 border border-gray-100"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>

                <h3 className="font-bold text-gray-900 text-sm md:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {tryout.title}
                </h3>

                <div className="flex items-center gap-2.5 md:gap-4 text-xs md:text-sm text-gray-500 mb-4 md:mb-6 mt-auto pt-3 md:pt-4">
                    <div className="flex items-center gap-1.5">
                        <ClipboardDocumentListIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.total_questions} Soal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.duration_minutes} Menit</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.participant_count}</span>
                    </div>
                </div>

                <Link
                    href={route('tryout.show', tryout.slug)}
                    className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn"
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
        <MainLayout title="Daftar Tryout">
            <Head title="Daftar Tryout" />

            <div className="space-y-5 md:space-y-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-indigo-600 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-xl shadow-indigo-200 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative z-10 w-full max-w-2xl">
                        <h1 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                            Jelajahi Tryout
                        </h1>
                        <p className="text-indigo-100 text-xs md:text-lg leading-relaxed">
                            Pilih dari berbagai paket tryout berkualitas tinggi yang disusun sesuai standar terbaru.
                        </p>
                    </div>

                    {/* Decoration/Icon */}
                    <div className="relative z-10 hidden md:block opacity-20 transform rotate-12">
                        <ClipboardDocumentListIcon className="w-48 h-48 text-white" />
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-100 shadow-sm sticky top-20 z-30">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul tryout..."
                                className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-indigo-500 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-medium"
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <div className="relative">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border-transparent focus:bg-white border focus:border-indigo-500 rounded-xl text-gray-900 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-medium appearance-none cursor-pointer"
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
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Terapkan
                        </button>
                    </div>
                </div>

                {/* Tryouts Grid */}
                {tryouts.data.length === 0 ? (
                    <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-16 text-center border border-gray-100 shadow-sm border-dashed">
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
                                className="px-6 py-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold text-sm transition-colors"
                            >
                                Reset Pencarian
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {tryouts.data.map((tryout) => (
                            <TryoutCard key={tryout.id} tryout={tryout} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {tryouts.last_page > 1 && (
                    <div className="flex justify-center pt-8 border-t border-gray-100">
                        <nav className="flex gap-2">
                            {tryouts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${link.active
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : link.url
                                            ? 'bg-white text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-100'
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
