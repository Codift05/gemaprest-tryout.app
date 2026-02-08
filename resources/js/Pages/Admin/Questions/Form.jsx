import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PhotoIcon,
    XMarkIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

export default function Form({ question = null, categories = [] }) {
    const isEditing = !!question;
    const [imagePreview, setImagePreview] = useState(
        question?.image ? `/storage/${question.image}` : null
    );
    const editorRef = useRef(null);

    const { data, setData, post, put, processing, errors } = useForm({
        question_text: question?.question_text || '',
        option_a: question?.option_a || '',
        option_b: question?.option_b || '',
        option_c: question?.option_c || '',
        option_d: question?.option_d || '',
        option_e: question?.option_e || '',
        correct_answer: question?.correct_answer || 'A',
        explanation: question?.explanation || '',
        difficulty: question?.difficulty || 'medium',
        subcategory_id: question?.subcategory_id || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'image' && value) {
                formData.append('image', value);
            } else if (value !== null && value !== '') {
                formData.append(key, value);
            }
        });

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

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    // Get all subcategories from categories
    const allSubcategories = categories.flatMap((cat) =>
        (cat.subcategories || []).map((sub) => ({
            ...sub,
            categoryName: cat.name,
            categoryColor: cat.color,
        }))
    );

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Soal' : 'Tambah Soal'} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={route('admin.questions.index')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Bank Soal
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Soal' : 'Tambah Soal Baru'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Question Text */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Pertanyaan</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Question Text Editor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teks Soal <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    ref={editorRef}
                                    value={data.question_text}
                                    onChange={(e) => setData('question_text', e.target.value)}
                                    rows={5}
                                    className={`input w-full font-mono text-sm ${errors.question_text ? 'border-red-500' : ''}`}
                                    placeholder="Masukkan soal di sini. Anda bisa menggunakan HTML untuk formatting..."
                                />
                                {errors.question_text && (
                                    <p className="text-red-500 text-sm mt-1">{errors.question_text}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    💡 Tip: Gunakan tag HTML seperti &lt;b&gt;, &lt;i&gt;, &lt;sup&gt;, &lt;sub&gt; untuk formatting
                                </p>
                            </div>

                            {/* Question Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gambar (Opsional)
                                </label>
                                {imagePreview ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-w-md h-auto rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                                        <PhotoIcon className="w-10 h-10 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-2">
                                            Klik untuk upload gambar
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Answer Options */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Pilihan Jawaban</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {['A', 'B', 'C', 'D', 'E'].map((option) => (
                                <div key={option} className="flex items-start gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('correct_answer', option)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors ${
                                            data.correct_answer === option
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                        title={`Tandai ${option} sebagai jawaban benar`}
                                    >
                                        {option}
                                    </button>
                                    <div className="flex-1">
                                        <textarea
                                            value={data[`option_${option.toLowerCase()}`]}
                                            onChange={(e) =>
                                                setData(`option_${option.toLowerCase()}`, e.target.value)
                                            }
                                            rows={2}
                                            className={`input w-full text-sm ${
                                                data.correct_answer === option
                                                    ? 'border-emerald-300 bg-emerald-50'
                                                    : ''
                                            }`}
                                            placeholder={`Pilihan ${option}...`}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
                                <InformationCircleIcon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-700">
                                    Klik huruf untuk menandai sebagai jawaban yang benar. 
                                    Opsi E bersifat opsional untuk soal dengan 4 pilihan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Pembahasan</h2>
                        </div>
                        <div className="p-6">
                            <textarea
                                value={data.explanation}
                                onChange={(e) => setData('explanation', e.target.value)}
                                rows={4}
                                className="input w-full"
                                placeholder="Jelaskan bagaimana mendapatkan jawaban yang benar..."
                            />
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Pengaturan</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Subcategory */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subkategori
                                </label>
                                <select
                                    value={data.subcategory_id}
                                    onChange={(e) => setData('subcategory_id', e.target.value)}
                                    className="input w-full"
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
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tingkat Kesulitan
                                </label>
                                <select
                                    value={data.difficulty}
                                    onChange={(e) => setData('difficulty', e.target.value)}
                                    className="input w-full"
                                >
                                    <option value="easy">Mudah</option>
                                    <option value="medium">Sedang</option>
                                    <option value="hard">Sulit</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('admin.questions.index')} className="btn btn-secondary">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Simpan Soal'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
