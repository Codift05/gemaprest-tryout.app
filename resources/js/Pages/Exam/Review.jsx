import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
    Bars3Icon,
    XMarkIcon,
    CheckIcon,
    MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Review({ session, tryout, questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Safety check if questions are missing or empty
    if (!questions || questions.length === 0) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center max-w-sm mx-auto px-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <BookOpenIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Pembahasan Tidak Tersedia</h2>
                        <p className="text-gray-500 text-sm mb-6">Maaf, data soal untuk pembahasan ini tidak ditemukan.</p>
                        <Link href={route('dashboard')} className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const getAnswerStatus = (question) => {
        if (!question.user_answer) return { status: 'unanswered', label: 'Tidak Dijawab', badgeClass: 'bg-gray-100 text-gray-600', icon: MinusCircleIcon };
        if (question.is_correct) return { status: 'correct', label: 'Benar', badgeClass: 'bg-emerald-100 text-emerald-700', icon: CheckCircleIcon };
        return { status: 'incorrect', label: 'Salah', badgeClass: 'bg-red-100 text-red-700', icon: XCircleIcon };
    };

    const currentStatus = getAnswerStatus(currentQuestion);

    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            setIsSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const stats = {
        correct: questions.filter(q => q.is_correct).length,
        incorrect: questions.filter(q => !q.is_correct && q.user_answer).length,
        unanswered: questions.filter(q => !q.user_answer).length,
    };

    const StatusIcon = currentStatus.icon;

    return (
        <MainLayout isFullWidth={true}>
            <Head title={`Pembahasan - ${tryout?.title || 'Ujian'}`} />

            <div className="min-h-screen bg-gray-50">

                {/* Full-Width Sticky Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                        {/* Left: Back + Title */}
                        <div className="flex items-center gap-3 min-w-0">
                            <Link
                                href={route('exam.result', session.id)}
                                className="flex-shrink-0 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Mode Pembahasan</p>
                                <h1 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1">
                                    {tryout?.title || 'Pembahasan Soal'}
                                </h1>
                            </div>
                        </div>

                        {/* Right: Counter + Mobile Toggle */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="hidden sm:inline-flex items-center text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
                                <span className="font-bold text-gray-800">{currentIndex + 1}</span>
                                <span className="mx-1 text-gray-300">/</span>
                                <span>{totalQuestions}</span>
                            </span>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                {isSidebarOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Progress bar */}
                <div className="h-0.5 bg-gray-100">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                    />
                </div>

                {/* Main Content Layout */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 items-start">

                    {/* Center: Question Area */}
                    <main className="flex-1 min-w-0">

                        {/* Question Number + Category Row */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Soal {currentIndex + 1} dari {totalQuestions}
                                </span>
                                {currentQuestion.category && (
                                    <>
                                        <span className="text-gray-300">·</span>
                                        <span className="text-xs text-gray-500 font-medium">{currentQuestion.category}</span>
                                    </>
                                )}
                                {currentQuestion.subcategory && (
                                    <>
                                        <span className="text-gray-300">·</span>
                                        <span className="text-xs text-gray-400">{currentQuestion.subcategory}</span>
                                    </>
                                )}
                            </div>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${currentStatus.badgeClass}`}>
                                <StatusIcon className="w-3.5 h-3.5" />
                                {currentStatus.label}
                            </span>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">

                            {/* Question Content */}
                            <div className="p-6 md:p-8">
                                <div className="flex gap-5 mb-6">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                                        {currentIndex + 1}
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <div
                                            className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                                        />
                                    </div>
                                </div>

                                {currentQuestion.image && (
                                    <div className="mb-6 ml-14 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                        <img
                                            src={`/storage/${currentQuestion.image}`}
                                            alt="Gambar soal"
                                            className="w-full h-auto object-contain max-h-[360px]"
                                        />
                                    </div>
                                )}

                                {/* Answer Options */}
                                <div className="space-y-2.5 ml-14">
                                    {currentQuestion.options.map((option, idx) => {
                                        if (!option.text && !option.image && !option.key) return null;

                                        const isCorrect = currentQuestion.correct_answer === option.key;
                                        const isUserAnswer = currentQuestion.user_answer === option.key;
                                        const isWrong = isUserAnswer && !isCorrect;

                                        let containerClass = 'border-gray-200 bg-white hover:bg-gray-50';
                                        let keyClass = 'bg-gray-100 text-gray-500';
                                        let bottomLabel = null;

                                        if (isCorrect) {
                                            containerClass = 'border-emerald-400 bg-emerald-50';
                                            keyClass = 'bg-emerald-500 text-white';
                                            bottomLabel = (
                                                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1.5">
                                                    <CheckIcon className="w-3 h-3" /> Jawaban Benar
                                                </span>
                                            );
                                        } else if (isWrong) {
                                            containerClass = 'border-red-400 bg-red-50';
                                            keyClass = 'bg-red-500 text-white';
                                            bottomLabel = (
                                                <span className="text-[11px] font-semibold text-red-500 flex items-center gap-1 mt-1.5">
                                                    <XMarkIcon className="w-3 h-3" /> Jawaban Kamu
                                                </span>
                                            );
                                        }

                                        return (
                                            <div
                                                key={idx}
                                                className={`flex gap-3.5 p-4 rounded-xl border transition-colors ${containerClass}`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${keyClass}`}>
                                                    {option.key}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {option.text && (
                                                        <div
                                                            className="prose prose-sm max-w-none text-gray-700"
                                                            dangerouslySetInnerHTML={{ __html: option.text }}
                                                        />
                                                    )}
                                                    {option.image && (
                                                        <img
                                                            src={`/storage/${option.image}`}
                                                            className="mt-2 max-h-36 rounded-lg border border-gray-200"
                                                            alt="Gambar pilihan"
                                                        />
                                                    )}
                                                    {bottomLabel}
                                                </div>
                                                {(isCorrect || isWrong) && (
                                                    <div className="flex-shrink-0 self-center">
                                                        {isCorrect && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
                                                        {isWrong && <XCircleIcon className="w-5 h-5 text-red-400" />}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Explanation Section */}
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={() => setShowExplanation(!showExplanation)}
                                    className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <BookOpenIcon className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800">
                                            Pembahasan &amp; Kunci Jawaban
                                        </span>
                                    </div>
                                    <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showExplanation ? 'rotate-90' : ''}`} />
                                </button>

                                {showExplanation && (
                                    <div className="px-6 pb-6">
                                        <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="w-1 h-5 bg-emerald-500 rounded-full flex-shrink-0" />
                                                <h4 className="text-sm font-semibold text-gray-800">Penjelasan</h4>
                                            </div>

                                            {currentQuestion.explanation_image && (
                                                <div className="mb-4">
                                                    <img
                                                        src={`/storage/${currentQuestion.explanation_image}`}
                                                        className="max-w-full rounded-xl border border-gray-200"
                                                        alt="Gambar pembahasan"
                                                    />
                                                </div>
                                            )}

                                            {currentQuestion.explanation ? (
                                                <div
                                                    className="prose prose-sm max-w-none text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-400 italic">Tidak ada pembahasan untuk soal ini.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between gap-3 mb-12 lg:mb-0">
                            <button
                                onClick={() => goToQuestion(currentIndex - 1)}
                                disabled={currentIndex === 0}
                                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeftIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Soal </span>Sebelumnya
                            </button>

                            <span className="text-sm text-gray-400 font-medium sm:hidden">
                                {currentIndex + 1} / {totalQuestions}
                            </span>

                            <button
                                onClick={() => goToQuestion(currentIndex + 1)}
                                disabled={currentIndex === totalQuestions - 1}
                                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="hidden sm:inline">Soal </span>Selanjutnya
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside
                        className={`
                            fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200
                            lg:relative lg:translate-x-0 lg:z-0 lg:shadow-none lg:border-none lg:bg-transparent lg:w-72 lg:flex-shrink-0
                            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
                    >
                        <div className="h-full flex flex-col bg-white lg:rounded-2xl lg:border lg:border-gray-200 overflow-hidden sticky top-24">

                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800 text-sm">Navigasi Soal</h3>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Stats Summary */}
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-base font-bold text-emerald-600">{stats.correct}</p>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Benar</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-red-500">{stats.incorrect}</p>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Salah</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-gray-400">{stats.unanswered}</p>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Kosong</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((q, index) => {
                                        const status = getAnswerStatus(q);
                                        const isCurrent = index === currentIndex;

                                        let btnClass = 'border-gray-200 bg-white text-gray-500 hover:border-gray-300';
                                        if (status.status === 'correct') btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-700';
                                        if (status.status === 'incorrect') btnClass = 'border-red-300 bg-red-50 text-red-600';
                                        if (isCurrent) btnClass = 'border-emerald-600 bg-emerald-600 text-white shadow-sm';

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => goToQuestion(index)}
                                                className={`relative aspect-square rounded-lg text-xs font-semibold border transition-all flex items-center justify-center ${btnClass}`}
                                            >
                                                {index + 1}
                                                {status.status === 'correct' && !isCurrent && (
                                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-white flex items-center justify-center">
                                                        <CheckIcon className="w-1.5 h-1.5 text-white" />
                                                    </span>
                                                )}
                                                {status.status === 'incorrect' && !isCurrent && (
                                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center">
                                                        <XMarkIcon className="w-1.5 h-1.5 text-white" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer Link */}
                            <div className="px-4 py-3 border-t border-gray-100">
                                <Link
                                    href={route('exam.result', session.id)}
                                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                                >
                                    Lihat Hasil Ujian
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Overlay */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
