import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    FunnelIcon,
    Bars3CenterLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Index({ questions, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [difficultyFilter, setDifficultyFilter] = useState(filters.difficulty || '');

    const handleFilter = () => {
        router.get(route('admin.questions.index'), {
            search,
            category: categoryFilter,
            difficulty: difficultyFilter,
        }, { preserveState: true });
    };

    const handleDelete = (question) => {
        if (confirm('Hapus soal ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(route('admin.questions.destroy', question.id));
        }
    };

    const getDifficultyBadge = (difficulty) => {
        const styles = {
            easy: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            medium: 'bg-amber-50 text-amber-600 border-amber-100',
            hard: 'bg-red-50 text-red-600 border-red-100',
        };
        const labels = {
            easy: 'Mudah',
            medium: 'Sedang',
            hard: 'Sulit',
        };
        return (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${styles[difficulty]}`}>
                {labels[difficulty]}
            </span>
        );
    };

    return (
        <AdminLayout title="Bank Soal">
            <Head title="Bank Soal" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bank Soal</h1>
                    <p className="text-gray-500 mt-1">
                        Kelola data soal, kategori, dan tingkat kesulitan.
                    </p>
                </div>
                <Link
                    href={route('admin.questions.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                >
                    <PlusIcon className="w-5 h-5" />
                    Tambah Soal
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari pertanyaan..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-48">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="w-full md:w-40">
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Semua Tingkat</option>
                            <option value="easy">Mudah</option>
                            <option value="medium">Sedang</option>
                            <option value="hard">Sulit</option>
                        </select>
                    </div>

                    <button
                        onClick={handleFilter}
                        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <FunnelIcon className="w-4 h-4" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Questions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {questions.data.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Belum Ada Soal
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Mulai dengan membuat soal pertama Anda
                        </p>
                        <Link
                            href={route('admin.questions.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Buat Soal Baru
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Soal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Tingkat
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Kunci
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {questions.data.map((question) => (
                                    <tr key={question.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div
                                                className="prose prose-sm max-w-md text-gray-900 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: question.question_text }}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {question.subcategory ? (
                                                <div>
                                                    <span
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide border"
                                                        style={{
                                                            backgroundColor: `${question.subcategory.category?.color}10`,
                                                            color: question.subcategory.category?.color,
                                                            borderColor: `${question.subcategory.category?.color}20`
                                                        }}
                                                    >
                                                        {question.subcategory.category?.name}
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-1 font-medium">
                                                        {question.subcategory.name}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getDifficultyBadge(question.difficulty)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-200">
                                                    {question.correct_answer}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.questions.edit', question.id)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(question)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                    title="Hapus"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {questions.last_page > 1 && (
                <div className="mt-8 flex justify-center">
                    <nav className="flex gap-1.5 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                        {questions.links.map((link, index) => (
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
