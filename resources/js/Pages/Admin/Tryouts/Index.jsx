import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ClockIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Index({ tryouts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.tryouts.index'), { search }, { preserveState: true });
    };

    const handleDelete = (tryout) => {
        if (confirm(`Hapus tryout "${tryout.title}"? Semua data ujian terkait akan ikut terhapus.`)) {
            router.delete(route('admin.tryouts.destroy', tryout.id));
        }
    };

    const getStatusBadge = (tryout) => {
        const now = new Date();
        const start = tryout.start_date ? new Date(tryout.start_date) : null;
        const end = tryout.end_date ? new Date(tryout.end_date) : null;

        if (!tryout.is_active) {
            return <span className="badge badge-gray">Nonaktif</span>;
        }
        if (end && now > end) {
            return <span className="badge badge-red">Berakhir</span>;
        }
        if (start && now < start) {
            return <span className="badge badge-amber">Akan Datang</span>;
        }
        return <span className="badge badge-emerald">Aktif</span>;
    };

    return (
        <AdminLayout>
            <Head title="Kelola Tryout" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Tryout</h1>
                    <p className="text-gray-600">Daftar semua tryout dalam platform</p>
                </div>
                <Link href={route('admin.tryouts.create')} className="btn btn-primary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Tambah Tryout
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="card mb-6">
                <div className="p-4">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari tryout..."
                                className="input pl-10 w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary">
                            Cari
                        </button>
                    </form>
                </div>
            </div>

            {/* Tryouts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tryouts.data.length === 0 ? (
                    <div className="col-span-full">
                        <div className="card p-12 text-center">
                            <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum Ada Tryout
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Mulai dengan membuat tryout pertama Anda
                            </p>
                            <Link href={route('admin.tryouts.create')} className="btn btn-primary">
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Tambah Tryout
                            </Link>
                        </div>
                    </div>
                ) : (
                    tryouts.data.map((tryout) => (
                        <div key={tryout.id} className="card group">
                            {/* Thumbnail */}
                            <div className="h-36 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-xl relative overflow-hidden">
                                {tryout.thumbnail && (
                                    <img
                                        src={`/storage/${tryout.thumbnail}`}
                                        alt={tryout.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute top-3 right-3">
                                    {getStatusBadge(tryout)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                    {tryout.title}
                                </h3>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <DocumentTextIcon className="w-4 h-4" />
                                        {tryout.questions_count} Soal
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        {tryout.duration_minutes} Menit
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <UserGroupIcon className="w-4 h-4" />
                                        {tryout.sessions_count}
                                    </span>
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {(tryout.categories || []).slice(0, 3).map((cat) => (
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
                                    {(tryout.categories || []).length > 3 && (
                                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                            +{tryout.categories.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Dates */}
                                {(tryout.start_date || tryout.end_date) && (
                                    <p className="text-xs text-gray-500 mb-4">
                                        {tryout.start_date &&
                                            format(new Date(tryout.start_date), 'dd MMM', { locale: id })}
                                        {tryout.start_date && tryout.end_date && ' - '}
                                        {tryout.end_date &&
                                            format(new Date(tryout.end_date), 'dd MMM yyyy', { locale: id })}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <Link
                                        href={route('admin.tryouts.questions', tryout.id)}
                                        className="btn btn-secondary btn-sm flex-1"
                                    >
                                        <DocumentTextIcon className="w-4 h-4 mr-1" />
                                        Soal
                                    </Link>
                                    <Link
                                        href={route('admin.tryouts.edit', tryout.id)}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(tryout)}
                                        className="btn btn-secondary btn-sm text-red-600 hover:bg-red-50"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {tryouts.last_page > 1 && (
                <div className="mt-6 flex justify-center">
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
        </AdminLayout>
    );
}
