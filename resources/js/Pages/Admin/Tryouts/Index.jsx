import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ClockIcon,
    CalendarIcon,
    PhotoIcon
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
            return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">Nonaktif</span>;
        }
        if (end && now > end) {
            return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-100">Berakhir</span>;
        }
        if (start && now < start) {
            return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100">Akan Datang</span>;
        }
        return <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">Aktif</span>;
    };

    return (
        <AdminLayout title="Kelola Tryout">
            <Head title="Kelola Tryout" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Tryout</h1>
                    <p className="text-gray-500 mt-1">Daftar semua paket tryout yang tersedia.</p>
                </div>
                <Link
                    href={route('admin.tryouts.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                >
                    <PlusIcon className="w-5 h-5" />
                    Tambah Tryout
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
                <form onSubmit={handleSearch} className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul tryout..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 rounded-xl text-sm transition-all text-gray-900 placeholder-gray-500"
                    />
                </form>
            </div>

            {/* Tryouts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tryouts.data.length === 0 ? (
                    <div className="col-span-full">
                        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                Belum Ada Tryout
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Mulai dengan membuat paket tryout pertama Anda.
                            </p>
                            <Link
                                href={route('admin.tryouts.create')}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Buat Tryout Baru
                            </Link>
                        </div>
                    </div>
                ) : (
                    tryouts.data.map((tryout) => (
                        <div key={tryout.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                            {/* Thumbnail */}
                            <div className="h-40 bg-indigo-600 relative overflow-hidden group-hover:opacity-95 transition-opacity">
                                {tryout.thumbnail ? (
                                    <img
                                        src={`/storage/${tryout.thumbnail}`}
                                        alt={tryout.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                        <PhotoIcon className="w-12 h-12 text-white/30" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    {getStatusBadge(tryout)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1" title={tryout.title}>
                                        {tryout.title}
                                    </h3>

                                    {/* Dates */}
                                    {(tryout.start_date || tryout.end_date) && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <CalendarIcon className="w-3.5 h-3.5" />
                                            <span>
                                                {tryout.start_date && format(new Date(tryout.start_date), 'd MMM', { locale: id })}
                                                {tryout.start_date && tryout.end_date && ' - '}
                                                {tryout.end_date && format(new Date(tryout.end_date), 'd MMM yyyy', { locale: id })}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {(tryout.categories || []).length > 0 ? (
                                        (tryout.categories || []).slice(0, 3).map((cat) => (
                                            <span
                                                key={cat.id}
                                                className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border"
                                                style={{
                                                    backgroundColor: `${cat.color}10`,
                                                    color: cat.color,
                                                    borderColor: `${cat.color}20`
                                                }}
                                            >
                                                {cat.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">Tanpa kategori</span>
                                    )}
                                    {(tryout.categories || []).length > 3 && (
                                        <span className="px-2 py-0.5 text-[10px] font-bold text-gray-500 bg-gray-50 rounded border border-gray-100">
                                            +{tryout.categories.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-auto">
                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-50 mb-4">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-sm">
                                                <DocumentTextIcon className="w-4 h-4 text-indigo-500" />
                                                {tryout.questions_count}
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Soal</div>
                                        </div>
                                        <div className="text-center border-l border-gray-50">
                                            <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-sm">
                                                <ClockIcon className="w-4 h-4 text-indigo-500" />
                                                {tryout.duration_minutes}
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Menit</div>
                                        </div>
                                        <div className="text-center border-l border-gray-50">
                                            <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold text-sm">
                                                <UserGroupIcon className="w-4 h-4 text-indigo-500" />
                                                {tryout.sessions_count}
                                            </div>
                                            <div className="text-[10px] text-gray-500 uppercase font-medium mt-0.5">Peserta</div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('admin.tryouts.questions', tryout.id)}
                                            className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                                        >
                                            <DocumentTextIcon className="w-4 h-4" />
                                            Soal
                                        </Link>
                                        <Link
                                            href={route('admin.tryouts.edit', tryout.id)}
                                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                                            title="Edit"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tryout)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                            title="Hapus"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {tryouts.last_page > 1 && (
                <div className="mt-8 flex justify-center">
                    <nav className="flex gap-1.5 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                        {tryouts.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${link.active
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : link.url
                                        ? 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                        : 'text-gray-300 cursor-not-allowed'
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
