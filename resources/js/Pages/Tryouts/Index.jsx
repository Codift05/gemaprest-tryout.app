import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { router } from '@inertiajs/react';

const TryoutCard = ({ tryout }) => {
    const getStatusBadge = () => {
        if (tryout.status === 'upcoming') {
            return <span className="badge badge-amber">Akan Datang</span>;
        }
        if (tryout.status === 'ended') {
            return <span className="badge badge-red">Berakhir</span>;
        }
        return <span className="badge badge-emerald">Aktif</span>;
    };

    return (
        <Link
            href={route('tryout.show', tryout.slug)}
            className="card group hover:shadow-lg transition-all"
        >
            {/* Thumbnail */}
            <div className="h-36 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-xl relative overflow-hidden">
                {tryout.thumbnail && (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                <div className="absolute top-3 right-3">
                    {getStatusBadge()}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-2">
                    {tryout.categories?.slice(0, 2).map((cat) => (
                        <span
                            key={cat.id}
                            className="px-2 py-0.5 text-xs rounded"
                            style={{
                                backgroundColor: `${cat.color}20`,
                                color: cat.color,
                            }}
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>

                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-3">
                    {tryout.title}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <ClipboardDocumentListIcon className="w-4 h-4" />
                        {tryout.total_questions} Soal
                    </span>
                    <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {tryout.duration_minutes} Menit
                    </span>
                    <span className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        {tryout.participant_count}
                    </span>
                </div>
            </div>
        </Link>
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
        <MainLayout>
            <Head title="Daftar Tryout" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Tryout</h1>
                <p className="text-gray-600">
                    Pilih tryout yang ingin dikerjakan untuk persiapan UTBK kamu
                </p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari tryout..."
                                className="input pl-10 w-full"
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                            />
                        </div>
                    </div>

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="input min-w-[150px]"
                    >
                        <option value="">Semua Kategori</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleFilter} className="btn btn-primary">
                        <FunnelIcon className="w-5 h-5 mr-1" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Tryouts Grid */}
            {tryouts.data.length === 0 ? (
                <div className="card p-12 text-center">
                    <ClipboardDocumentListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Tidak Ada Tryout
                    </h3>
                    <p className="text-gray-600">
                        {search || categoryFilter
                            ? 'Coba ubah filter pencarian'
                            : 'Belum ada tryout yang tersedia saat ini'}
                    </p>
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
                <div className="mt-8 flex justify-center">
                    <nav className="flex gap-1">
                        {tryouts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-2 rounded text-sm ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-600 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </MainLayout>
    );
}
