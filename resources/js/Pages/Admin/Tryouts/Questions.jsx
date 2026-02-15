import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowsUpDownIcon,
    DocumentDuplicateIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Questions({ tryout, assignedQuestions, availableQuestions }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');

    const handleRemoveQuestion = (questionId) => {
        if (confirm('Hapus soal dari tryout ini?')) {
            router.delete(route('admin.tryouts.questions.remove', [tryout.id, questionId]));
        }
    };

    const handleAddQuestions = () => {
        if (selectedQuestions.length === 0) return;

        router.post(route('admin.tryouts.questions.add', tryout.id), {
            question_ids: selectedQuestions,
        }, {
            onSuccess: () => {
                setShowAddModal(false);
                setSelectedQuestions([]);
            },
        });
    };

    const toggleQuestionSelection = (questionId) => {
        if (selectedQuestions.includes(questionId)) {
            setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
        } else {
            setSelectedQuestions([...selectedQuestions, questionId]);
        }
    };

    const filteredAvailable = availableQuestions.filter((q) => {
        if (!filterCategory) return true;
        return q.subcategory?.category_id == filterCategory;
    });

    const categories = [...new Map(
        availableQuestions
            .filter((q) => q.subcategory?.category)
            .map((q) => [q.subcategory.category.id, q.subcategory.category])
    ).values()];

    return (
        <AdminLayout>
            <Head title={`Soal - ${tryout.title}`} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={route('admin.tryouts.index')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Daftar Tryout
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{tryout.title}</h1>
                            <p className="text-gray-600">
                                {assignedQuestions.length} soal • Durasi {tryout.duration_minutes} menit
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-primary"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Tambah Soal
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Daftar Soal</h2>
                    </div>

                    {assignedQuestions.length === 0 ? (
                        <div className="p-12 text-center">
                            <DocumentDuplicateIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum Ada Soal
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tambahkan soal dari bank soal untuk tryout ini
                            </p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="btn btn-primary"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Tambah Soal
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {assignedQuestions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="p-4 flex items-start gap-4 hover:bg-gray-50"
                                >
                                    {/* Order Number */}
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
                                        {index + 1}
                                    </div>

                                    {/* Question Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            {question.subcategory && (
                                                <span
                                                    className="px-2 py-0.5 rounded text-xs font-medium"
                                                    style={{
                                                        backgroundColor: `${question.subcategory.category?.color}20`,
                                                        color: question.subcategory.category?.color,
                                                    }}
                                                >
                                                    {question.subcategory.name}
                                                </span>
                                            )}
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${question.difficulty === 'easy'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : question.difficulty === 'medium'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {question.difficulty === 'easy' ? 'Mudah' :
                                                    question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                                            </span>
                                        </div>

                                        <div
                                            className="prose prose-sm max-w-none text-gray-900 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: question.content }}
                                        />

                                        <p className="text-sm text-gray-500 mt-2">
                                            Jawaban: <span className="font-medium">{question.correct_answer}</span>
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={route('admin.questions.edit', question.id)}
                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleRemoveQuestion(question.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Questions Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="p-6 border-b flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Tambah Soal dari Bank Soal
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {selectedQuestions.length} soal dipilih
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Filter */}
                        <div className="p-4 border-b bg-gray-50">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-all"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Questions List */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {filteredAvailable.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Tidak ada soal tersedia
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filteredAvailable.map((question) => (
                                        <button
                                            key={question.id}
                                            onClick={() => toggleQuestionSelection(question.id)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${selectedQuestions.includes(question.id)
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${selectedQuestions.includes(question.id)
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-200'
                                                        }`}
                                                >
                                                    {selectedQuestions.includes(question.id) && (
                                                        <CheckCircleIcon className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {question.subcategory && (
                                                            <span className="text-xs text-gray-500">
                                                                {question.subcategory.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="prose prose-sm max-w-none text-gray-900 line-clamp-2"
                                                        dangerouslySetInnerHTML={{ __html: question.content }}
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t flex items-center justify-end gap-4">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="btn btn-secondary"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAddQuestions}
                                disabled={selectedQuestions.length === 0}
                                className="btn btn-primary"
                            >
                                Tambah {selectedQuestions.length} Soal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
