import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
    Bars3BottomLeftIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Review({ session, tryout, questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Safety check if questions are missing or empty
    if (!questions || questions.length === 0) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900">Data Pembahasan Tidak Tersedia</h2>
                        <Link href={route('dashboard')} className="mt-4 btn btn-primary">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const currentQuestion = questions[currentIndex];

    const getAnswerStatus = (question) => {
        if (!question.user_answer) return { status: 'unanswered', label: 'Tidak Dijawab', color: 'bg-gray-200 text-gray-600', border: 'border-gray-200' };
        if (question.is_correct) return { status: 'correct', label: 'Benar', color: 'bg-emerald-500 text-white', border: 'border-emerald-500' };
        return { status: 'incorrect', label: 'Salah', color: 'bg-red-500 text-white', border: 'border-red-500' };
    };

    const currentStatus = getAnswerStatus(currentQuestion);

    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            setIsSidebarOpen(false); // Close sidebar on mobile on selection
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <MainLayout>
            <Head title={`Pembahasan - ${tryout?.title || 'Ujian'}`} />

            <div className="min-h-screen bg-gray-50 font-sans pb-12">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('exam.result', session.id)}
                                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
                                    {tryout?.title || 'Pembahasan Soal'}
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Soal {currentIndex + 1} dari {questions.length}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100"
                        >
                            {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3BottomLeftIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Navigation */}
                        <aside className={`
                            fixed inset-y-0 left-0 bg-white w-72 transform transition-transform duration-300 ease-in-out z-40 border-r border-gray-200 lg:border-none lg:relative lg:translate-x-0 lg:w-80 lg:bg-transparent lg:z-0
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}>
                            <div className="h-full lg:h-auto lg:sticky lg:top-24 flex flex-col">
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full lg:h-[calc(100vh-8rem)] overflow-hidden">
                                    <div className="flex items-center justify-between mb-4 lg:hidden">
                                        <h3 className="font-bold text-gray-900">Navigasi Soal</h3>
                                        <button onClick={() => setIsSidebarOpen(false)}>
                                            <XMarkIcon className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-4 hidden lg:block">Navigasi Soal</h3>

                                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                        <div className="grid grid-cols-5 gap-2.5">
                                            {questions.map((q, index) => {
                                                const status = getAnswerStatus(q);
                                                const isCurrent = index === currentIndex;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => goToQuestion(index)}
                                                        className={`
                                                            aspect-square rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center
                                                            ${status.color}
                                                            ${isCurrent ? 'ring-2 ring-offset-2 ring-indigo-600 scale-105 shadow-md z-10' : 'hover:opacity-80'}
                                                        `}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                                    <span className="text-gray-600">Benar</span>
                                                </div>
                                                <span className="font-bold text-gray-900">{questions.filter(q => q.is_correct).length}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                                    <span className="text-gray-600">Salah</span>
                                                </div>
                                                <span className="font-bold text-gray-900">{questions.filter(q => !q.is_correct && q.user_answer).length}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" />
                                                    <span className="text-gray-600">Kosong</span>
                                                </div>
                                                <span className="font-bold text-gray-900">{questions.filter(q => !q.user_answer).length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Overlay for mobile sidebar */}
                        {isSidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                                onClick={() => setIsSidebarOpen(false)}
                            />
                        )}

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Question Header */}
                                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 md:gap-4 bg-gray-50/50">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wide">
                                            {currentQuestion.category || 'Soal'}
                                        </span>
                                        {currentQuestion.subcategory && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                                {currentQuestion.subcategory}
                                            </span>
                                        )}
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentStatus.status === 'correct' ? 'bg-emerald-100 text-emerald-700' :
                                        currentStatus.status === 'incorrect' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {currentStatus.label}
                                    </div>
                                </div>

                                {/* Question Body */}
                                <div className="p-4 md:p-8">
                                    <div
                                        className="prose prose-sm md:prose-lg max-w-none text-gray-800 mb-6 md:mb-8"
                                        dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                                    />

                                    {currentQuestion.image && (
                                        <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                            <img
                                                src={`/storage/${currentQuestion.image}`}
                                                alt="Gambar soal"
                                                className="w-full h-auto object-contain max-h-[400px] bg-gray-50"
                                            />
                                        </div>
                                    )}

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, idx) => {
                                            if (!option.text && !option.image && !option.key) return null;

                                            // Handling if options are array of objects with key, text, image
                                            // Check correctness
                                            const isCorrect = currentQuestion.correct_answer === option.key;
                                            const isSelected = currentQuestion.user_answer === option.key;
                                            const isWrongSelection = isSelected && !isCorrect;

                                            let containerClass = "border-gray-200 bg-white hover:bg-gray-50";
                                            let iconClass = "bg-gray-100 text-gray-500";
                                            let textClass = "text-gray-700";

                                            if (isCorrect) {
                                                containerClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                                                iconClass = "bg-emerald-500 text-white shadow-emerald-200";
                                                textClass = "text-emerald-900 font-medium";
                                            } else if (isWrongSelection) {
                                                containerClass = "border-red-500 bg-red-50 ring-1 ring-red-500";
                                                iconClass = "bg-red-500 text-white shadow-red-200";
                                                textClass = "text-red-900 font-medium";
                                            }

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${containerClass}`}
                                                >
                                                    <div className="flex gap-4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm shadow-sm transition-colors ${iconClass}`}>
                                                            {isCorrect ? <CheckCircleIcon className="w-5 h-5" /> :
                                                                isWrongSelection ? <XCircleIcon className="w-5 h-5" /> :
                                                                    option.key}
                                                        </div>
                                                        <div className="flex-1">
                                                            {option.text && (
                                                                <div
                                                                    className={`prose prose-sm max-w-none ${textClass}`}
                                                                    dangerouslySetInnerHTML={{ __html: option.text }}
                                                                />
                                                            )}
                                                            {option.image && (
                                                                <img
                                                                    src={`/storage/${option.image}`}
                                                                    className="mt-2 max-h-40 rounded-lg border border-gray-200"
                                                                    alt="Option"
                                                                />
                                                            )}

                                                            {/* Feedback Text */}
                                                            {isCorrect && (
                                                                <p className="text-xs font-bold text-emerald-600 mt-2 uppercase tracking-wide">Jawaban Benar</p>
                                                            )}
                                                            {isWrongSelection && (
                                                                <p className="text-xs font-bold text-red-600 mt-2 uppercase tracking-wide">Jawaban Kamu</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Explanation Section */}
                                <div className="bg-gray-50 border-t border-gray-100 p-4 md:p-8">
                                    <button
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors mb-4 group"
                                    >
                                        <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                            <BookOpenIcon className="w-5 h-5" />
                                        </div>
                                        <span>{showExplanation ? 'Sembunyikan' : 'Lihat'} Pembahasan & Kunci Jawaban</span>
                                    </button>

                                    {showExplanation && (
                                        <div className="bg-white rounded-xl md:rounded-2xl border border-indigo-100 p-4 md:p-6 shadow-sm ring-4 ring-indigo-50 animate-fadeIn">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                                Penjelasan Lengkap
                                            </h4>

                                            {currentQuestion.explanation_image && (
                                                <div className="mb-4">
                                                    <img
                                                        src={`/storage/${currentQuestion.explanation_image}`}
                                                        className="max-w-full rounded-xl border border-gray-100 shadow-sm"
                                                        alt="Gambar Pembahasan"
                                                    />
                                                </div>
                                            )}

                                            {currentQuestion.explanation ? (
                                                <div
                                                    className="prose prose-indigo max-w-none text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                                />
                                            ) : (
                                                <p className="text-gray-500 italic">Tidak ada pembahasan untuk soal ini.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={() => goToQuestion(currentIndex - 1)}
                                    disabled={currentIndex === 0}
                                    className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2.5 md:px-6 md:py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all flex items-center text-xs md:text-sm"
                                >
                                    <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                                    <span className="hidden sm:inline">Soal </span>Sebelumnya
                                </button>

                                <div className="hidden sm:block text-sm font-medium text-gray-500">
                                    Soal {currentIndex + 1} dari {questions.length}
                                </div>

                                <button
                                    onClick={() => goToQuestion(currentIndex + 1)}
                                    disabled={currentIndex === questions.length - 1}
                                    className="btn btn-primary px-3 py-2.5 md:px-6 md:py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center disabled:opacity-50 disabled:shadow-none text-xs md:text-sm"
                                >
                                    <span className="hidden sm:inline">Soal </span>Selanjutnya
                                    <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
