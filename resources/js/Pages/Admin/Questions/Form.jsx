import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import RichTextEditor from '@/Components/RichTextEditor';
import {
    ArrowLeftIcon,
    PhotoIcon,
    XMarkIcon,
    CheckCircleIcon,
    TrashIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Form({ question = null, categories = [] }) {
    const isEditing = !!question;
    const [imagePreview, setImagePreview] = useState(
        question?.image ? `/storage/${question.image}` : null
    );
    const [isDragOver, setIsDragOver] = useState(false);

    // Default options structure
    const defaultOptions = [
        { key: 'A', text: '', image: null },
        { key: 'B', text: '', image: null },
        { key: 'C', text: '', image: null },
        { key: 'D', text: '', image: null },
        { key: 'E', text: '', image: null },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        content: question?.content || '',
        type: question?.type || 'single', // multiple, single, essay
        options: question?.options || defaultOptions,
        correct_answer: question?.correct_answer || 'A',
        explanation: question?.explanation || '',
        difficulty: question?.difficulty || 'medium',
        subcategory_id: question?.subcategory_id || '',
        image: null,
        score: question?.score || 4, // Default score
    });

    // Helper to update specific option text
    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index].text = value;
        setData('options', newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append basic fields
        formData.append('content', data.content);
        formData.append('type', data.type);
        formData.append('correct_answer', data.correct_answer);
        formData.append('explanation', data.explanation || '');
        formData.append('difficulty', data.difficulty);
        formData.append('subcategory_id', data.subcategory_id);
        formData.append('score', data.score);

        // Append Options (as array)
        data.options.forEach((option, index) => {
            formData.append(`options[${index}][key]`, option.key);
            formData.append(`options[${index}][text]`, option.text);
            if (option.image) {
                // If we implement option images later
                // formData.append(`options[${index}][image]`, option.image);
            }
        });

        // Append Main Image
        if (data.image) {
            formData.append('image', data.image);
        }

        if (isEditing) {
            formData.append('_method', 'PUT');
            router.post(route('admin.questions.update', question.id), formData);
        } else {
            router.post(route('admin.questions.store'), formData);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Soal' : 'Tambah Soal'} />

            <div className="max-w-4xl mx-auto pb-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={route('admin.questions.index')}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-4 transition-colors p-2 -ml-2 rounded-lg hover:bg-indigo-50"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Kembali ke Bank Soal
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {isEditing ? 'Edit Soal' : 'Buat Soal Baru'}
                    </h1>
                    <p className="mt-2 text-gray-500">
                        {isEditing ? 'Perbarui detail pertanyaan dan jawaban.' : 'Isi form di bawah untuk menambahkan soal baru.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Question Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900">Pertanyaan</h2>
                        </div>
                        <div className="p-8 space-y-6">
                            {/* Content Editor */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Teks Soal <span className="text-red-500">*</span>
                                </label>
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(html) => setData('content', html)}
                                    placeholder="Masukkan soal di sini..."
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Gambar (Opsional)
                                </label>
                                {imagePreview ? (
                                    <div className="relative w-full max-w-md rounded-2xl overflow-hidden group border border-gray-200 shadow-sm">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                                            >
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label
                                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${isDragOver
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-indigo-400'
                                            }`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                        onDragLeave={() => setIsDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                            <PhotoIcon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            Klik untuk upload gambar
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            atau drag & drop file gambar di sini
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Answer Options */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900">Pilihan Jawaban</h2>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                {data.options.map((option, index) => (
                                    <div key={option.key} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${data.correct_answer === option.key ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-indigo-200'}`}>
                                        <button
                                            type="button"
                                            onClick={() => setData('correct_answer', option.key)}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${data.correct_answer === option.key
                                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                                }`}
                                            title={`Tandai ${option.key} sebagai jawaban benar`}
                                        >
                                            {option.key}
                                        </button>
                                        <div className="flex-1">
                                            <textarea
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                rows={2}
                                                className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all ${data.correct_answer === option.key
                                                    ? 'border-emerald-300'
                                                    : 'border-gray-200'
                                                    }`}
                                                placeholder={`Masukkan isi pilihan jawaban ${option.key}...`}
                                            />
                                            {errors[`options.${index}.text`] && (
                                                <p className="text-red-500 text-xs mt-1">{errors[`options.${index}.text`]}</p>
                                            )}
                                        </div>
                                        {data.correct_answer === option.key && (
                                            <div className="hidden sm:flex items-center text-emerald-600 text-sm font-medium mt-2">
                                                <CheckCircleIcon className="w-5 h-5 mr-1" />
                                                Jawaban Benar
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {errors.correct_answer && (
                                <p className="text-red-500 text-sm mt-1">{errors.correct_answer}</p>
                            )}
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900">Pembahasan</h2>
                        </div>
                        <div className="p-8">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Penjelasan Jawaban
                            </label>
                            <RichTextEditor
                                value={data.explanation}
                                onChange={(html) => setData('explanation', html)}
                                placeholder="Jelaskan secara rinci bagaimana cara mendapatkan jawaban yang benar..."
                            />
                            {errors.explanation && (
                                <p className="text-red-500 text-sm mt-1">{errors.explanation}</p>
                            )}
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900">Pengaturan</h2>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Subcategory */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Subkategori
                                </label>
                                <select
                                    value={data.subcategory_id}
                                    onChange={(e) => setData('subcategory_id', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-all"
                                >
                                    <option value="">Pilih Subkategori</option>
                                    {categories.map((cat) => (
                                        <optgroup key={cat.id} label={cat.name}>
                                            {(cat.subcategories || []).map((sub) => (
                                                <option key={sub.id} value={sub.id}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                {errors.subcategory_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.subcategory_id}</p>
                                )}
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tingkat Kesulitan
                                </label>
                                <select
                                    value={data.difficulty}
                                    onChange={(e) => setData('difficulty', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-all"
                                >
                                    <option value="easy">Mudah</option>
                                    <option value="medium">Sedang</option>
                                    <option value="hard">Sulit</option>
                                </select>
                            </div>

                            {/* Score */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Skor Jawaban Benar
                                </label>
                                <input
                                    type="number"
                                    value={data.score}
                                    onChange={(e) => setData('score', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-sm transition-all"
                                    min="0"
                                />
                                {errors.score && (
                                    <p className="text-red-500 text-sm mt-1">{errors.score}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                        <Link
                            href={route('admin.questions.index')}
                            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Simpan Soal'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
