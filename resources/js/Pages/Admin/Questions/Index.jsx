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
    CheckCircleIcon,
    ArrowUpTrayIcon,
    DocumentArrowUpIcon,
    XMarkIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

export default function Index({ questions, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [difficultyFilter, setDifficultyFilter] = useState(filters.difficulty || '');
    
    // Import modal state
    const [showImportModal, setShowImportModal] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importSubcategory, setImportSubcategory] = useState('');
    const [previewQuestions, setPreviewQuestions] = useState([]);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

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

    // Drag and drop handlers
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setImportFile(file);
                setImportError(null);
                setPreviewQuestions([]);
            } else {
                setImportError('Hanya file PDF yang diperbolehkan');
            }
        }
    }, []);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
            setImportError(null);
            setPreviewQuestions([]);
        }
    };

    const handlePreview = async () => {
        if (!importFile) return;
        
        setIsPreviewLoading(true);
        setImportError(null);
        
        const formData = new FormData();
        formData.append('file', importFile);
        
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            
            const response = await fetch(route('admin.questions.import.preview'), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                setPreviewQuestions(data.questions);
                if (data.questions.length === 0) {
                    setImportError('Tidak ada soal yang ditemukan. Pastikan format PDF sesuai.');
                }
            } else {
                setImportError(data.error || 'Gagal memproses PDF');
            }
        } catch (error) {
            console.error('Preview fetch error:', error);
            setImportError('Gagal mengunggah file. Pastikan ukuran file tidak melebihi 10MB.');
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const handleImport = () => {
        if (!importFile || !importSubcategory) return;
        
        setIsImporting(true);
        
        const formData = new FormData();
        formData.append('file', importFile);
        formData.append('subcategory_id', importSubcategory);
        
        router.post(route('admin.questions.import'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setShowImportModal(false);
                setImportFile(null);
                setPreviewQuestions([]);
                setImportSubcategory('');
                setIsImporting(false);
            },
            onError: (errors) => {
                setImportError(errors.file || errors.subcategory_id || 'Gagal import soal');
                setIsImporting(false);
            },
        });
    };

    const resetImportModal = () => {
        setShowImportModal(false);
        setImportFile(null);
        setPreviewQuestions([]);
        setImportSubcategory('');
        setImportError(null);
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
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
                    >
                        <ArrowUpTrayIcon className="w-5 h-5" />
                        Import PDF
                    </button>
                    <Link
                        href={route('admin.questions.create')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Tambah Soal
                    </Link>
                </div>
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
                                                dangerouslySetInnerHTML={{ __html: question.content }}
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

            {/* Import PDF Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                        <div className="fixed inset-0 bg-gray-900/50 transition-opacity" onClick={resetImportModal}></div>
                        
                        <div className="relative inline-block w-full max-w-2xl bg-white rounded-2xl text-left shadow-xl transform transition-all my-8">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Import Soal dari PDF</h3>
                                <button
                                    onClick={resetImportModal}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                                {/* Drag & Drop Area */}
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                        dragActive 
                                            ? 'border-emerald-500 bg-emerald-50' 
                                            : importFile 
                                                ? 'border-emerald-300 bg-emerald-50' 
                                                : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    {importFile ? (
                                        <div className="space-y-3">
                                            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                                                <DocumentTextIcon className="w-8 h-8 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{importFile.name}</p>
                                                <p className="text-xs text-gray-500">{(importFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setImportFile(null);
                                                    setPreviewQuestions([]);
                                                }}
                                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Ganti File
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                                <DocumentArrowUpIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Drag & drop file PDF di sini</p>
                                                <p className="text-xs text-gray-500 mt-1">atau klik untuk memilih file</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileSelect}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Error Message */}
                                {importError && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-700">{importError}</p>
                                    </div>
                                )}

                                {/* Subcategory Selection */}
                                <div className="mt-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pilih Subkategori Tujuan
                                    </label>
                                    <select
                                        value={importSubcategory}
                                        onChange={(e) => setImportSubcategory(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm"
                                    >
                                        <option value="">-- Pilih Subkategori --</option>
                                        {categories.map((cat) => (
                                            <optgroup key={cat.id} label={cat.name}>
                                                {cat.subcategories?.map((sub) => (
                                                    <option key={sub.id} value={sub.id}>
                                                        {sub.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>

                                {/* Preview Button */}
                                {importFile && previewQuestions.length === 0 && (
                                    <button
                                        onClick={handlePreview}
                                        disabled={isPreviewLoading}
                                        className="mt-4 w-full py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {isPreviewLoading ? 'Memproses...' : 'Preview Soal'}
                                    </button>
                                )}

                                {/* Preview Results */}
                                {previewQuestions.length > 0 && (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-bold text-gray-900">
                                                Preview: {previewQuestions.length} Soal Ditemukan
                                            </h4>
                                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg font-medium">
                                                Siap Import
                                            </span>
                                        </div>
                                        <div className="space-y-3 max-h-60 overflow-y-auto">
                                            {previewQuestions.slice(0, 5).map((q, idx) => (
                                                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                                    <div className="flex items-start gap-2">
                                                        <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                                            {idx + 1}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-900 line-clamp-2">{q.content}</p>
                                                            <div className="mt-2 flex flex-wrap gap-1">
                                                                {q.options.map((opt) => (
                                                                    <span
                                                                        key={opt.key}
                                                                        className={`text-xs px-2 py-0.5 rounded ${
                                                                            opt.key === q.correct_answer
                                                                                ? 'bg-emerald-100 text-emerald-700 font-semibold'
                                                                                : 'bg-gray-100 text-gray-600'
                                                                        }`}
                                                                    >
                                                                        {opt.key}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {previewQuestions.length > 5 && (
                                                <p className="text-xs text-gray-500 text-center py-2">
                                                    ... dan {previewQuestions.length - 5} soal lainnya
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Format Info */}
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                    <h4 className="text-xs font-bold text-blue-800 mb-1">Format PDF yang Didukung:</h4>
                                    <ul className="text-xs text-blue-700 space-y-0.5 list-disc list-inside">
                                        <li>Soal bernomor (1., 2., 3., ...)</li>
                                        <li>Pilihan jawaban A., B., C., D., E.</li>
                                        <li>Jawaban: A (Keterangan) atau Kunci: A</li>
                                        <li>Pembahasan: (opsional)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                                <button
                                    onClick={resetImportModal}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleImport}
                                    disabled={!importFile || !importSubcategory || isImporting}
                                    className="px-6 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isImporting ? 'Mengimport...' : `Import ${previewQuestions.length > 0 ? previewQuestions.length : ''} Soal`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
