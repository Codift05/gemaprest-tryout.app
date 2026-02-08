import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    FunnelIcon,
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
            easy: 'bg-emerald-100 text-emerald-700',
            medium: 'bg-amber-100 text-amber-700',
            hard: 'bg-red-100 text-red-700',
        };
        const labels = {
            easy: 'Mudah',
            medium: 'Sedang',
            hard: 'Sulit',
        };
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[difficulty]}`}>
                {labels[difficulty]}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title="Bank Soal" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bank Soal</h1>
                    <p className="text-gray-600">
                        {questions.total} soal tersedia
                    </p>
                </div>
                <Link href={route('admin.questions.create')} className="btn btn-primary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Tambah Soal
                </Link>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="p-4">
                    <div className="flex flex-wrap gap-4">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari soal..."
                                    className="input pl-10 w-full"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="input min-w-[150px]"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Difficulty Filter */}
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="input min-w-[130px]"
                        >
                            <option value="">Semua Tingkat</option>
                            <option value="easy">Mudah</option>
                            <option value="medium">Sedang</option>
                            <option value="hard">Sulit</option>
                        </select>

                        <button onClick={handleFilter} className="btn btn-secondary">
                            <FunnelIcon className="w-5 h-5 mr-1" />
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Questions Table */}
            <div className="card overflow-hidden">
                {questions.data.length === 0 ? (
                    <div className="p-12 text-center">
                        <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Belum Ada Soal
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Mulai dengan membuat soal pertama Anda
                        </p>
                        <Link href={route('admin.questions.create')} className="btn btn-primary">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Tambah Soal
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Soal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tingkat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Jawaban
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {questions.data.map((question) => (
                                    <tr key={question.id} className="hover:bg-gray-50">
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
                                                        className="px-2 py-0.5 rounded text-xs font-medium"
                                                        style={{
                                                            backgroundColor: `${question.subcategory.category?.color}20`,
                                                            color: question.subcategory.category?.color,
                                                        }}
                                                    >
                                                        {question.subcategory.category?.name}
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {question.subcategory.name}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getDifficultyBadge(question.difficulty)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-gray-900">
                                                {question.correct_answer}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.questions.edit', question.id)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(question)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
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
                <div className="mt-6 flex justify-center">
                    <nav className="flex gap-1">
                        {questions.links.map((link, index) => (
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
