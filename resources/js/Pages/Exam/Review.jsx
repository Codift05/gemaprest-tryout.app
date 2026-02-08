import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Review({ session, questions, answers }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);

    const currentQuestion = questions[currentIndex];
    const currentAnswer = answers.find((a) => a.question_id === currentQuestion.id);

    const getAnswerStatus = (answer) => {
        if (!answer) return { status: 'unanswered', label: 'Tidak Dijawab', color: 'gray' };
        if (answer.is_correct) return { status: 'correct', label: 'Benar', color: 'emerald' };
        return { status: 'incorrect', label: 'Salah', color: 'red' };
    };

    const answerStatus = getAnswerStatus(currentAnswer);

    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
        }
    };

    return (
        <MainLayout>
            <Head title={`Pembahasan - ${session.tryout.title}`} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link
                            href={route('exam.result', session.id)}
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-1" />
                            Kembali ke Hasil
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Pembahasan: {session.tryout.title}
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">
                            Soal {currentIndex + 1} dari {questions.length}
                        </p>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Question Card */}
                        <div className="card mb-6">
                            <div className="card-header flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-600">
                                        Soal #{currentIndex + 1}
                                    </span>
                                    {currentQuestion.subcategory && (
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                            {currentQuestion.subcategory.name}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        answerStatus.color === 'emerald'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : answerStatus.color === 'red'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {answerStatus.label}
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Question Text */}
                                <div
                                    className="prose prose-lg max-w-none mb-6"
                                    dangerouslySetInnerHTML={{ __html: currentQuestion.question_text }}
                                />

                                {/* Question Image */}
                                {currentQuestion.image && (
                                    <div className="mb-6">
                                        <img
                                            src={`/storage/${currentQuestion.image}`}
                                            alt="Gambar soal"
                                            className="max-w-full h-auto rounded-lg border"
                                        />
                                    </div>
                                )}

                                {/* Options */}
                                <div className="space-y-3 mb-6">
                                    {['A', 'B', 'C', 'D', 'E'].map((option) => {
                                        const optionText = currentQuestion[`option_${option.toLowerCase()}`];
                                        if (!optionText) return null;

                                        const isCorrect = currentQuestion.correct_answer === option;
                                        const isSelected = currentAnswer?.selected_option === option;
                                        const isWrongSelection = isSelected && !isCorrect;

                                        let bgColor = 'bg-white border-gray-200';
                                        let iconColor = 'bg-gray-100 text-gray-600';

                                        if (isCorrect) {
                                            bgColor = 'bg-emerald-50 border-emerald-300';
                                            iconColor = 'bg-emerald-600 text-white';
                                        } else if (isWrongSelection) {
                                            bgColor = 'bg-red-50 border-red-300';
                                            iconColor = 'bg-red-600 text-white';
                                        }

                                        return (
                                            <div
                                                key={option}
                                                className={`p-4 rounded-xl border-2 ${bgColor}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${iconColor}`}
                                                    >
                                                        {isCorrect ? (
                                                            <CheckCircleIcon className="w-5 h-5" />
                                                        ) : isWrongSelection ? (
                                                            <XCircleIcon className="w-5 h-5" />
                                                        ) : (
                                                            option
                                                        )}
                                                    </span>
                                                    <div className="flex-1">
                                                        <span
                                                            className="prose prose-sm max-w-none"
                                                            dangerouslySetInnerHTML={{ __html: optionText }}
                                                        />
                                                        {isCorrect && (
                                                            <span className="ml-2 text-emerald-600 text-sm font-medium">
                                                                (Jawaban Benar)
                                                            </span>
                                                        )}
                                                        {isWrongSelection && (
                                                            <span className="ml-2 text-red-600 text-sm font-medium">
                                                                (Jawaban Anda)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Explanation */}
                                {currentQuestion.explanation && (
                                    <div className="border-t pt-6">
                                        <button
                                            onClick={() => setShowExplanation(!showExplanation)}
                                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4"
                                        >
                                            <BookOpenIcon className="w-5 h-5" />
                                            {showExplanation ? 'Sembunyikan' : 'Tampilkan'} Pembahasan
                                        </button>

                                        {showExplanation && (
                                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                                <h4 className="font-semibold text-indigo-900 mb-2">
                                                    Pembahasan
                                                </h4>
                                                <div
                                                    className="prose prose-sm max-w-none text-indigo-800"
                                                    dangerouslySetInnerHTML={{
                                                        __html: currentQuestion.explanation,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => goToQuestion(currentIndex - 1)}
                                disabled={currentIndex === 0}
                                className="btn btn-secondary"
                            >
                                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                                Sebelumnya
                            </button>

                            <button
                                onClick={() => goToQuestion(currentIndex + 1)}
                                disabled={currentIndex === questions.length - 1}
                                className="btn btn-secondary"
                            >
                                Selanjutnya
                                <ChevronRightIcon className="w-5 h-5 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Navigation */}
                    <aside className="w-64 shrink-0">
                        <div className="card sticky top-24">
                            <div className="card-header">
                                <h3 className="font-semibold text-gray-900">Navigasi Soal</h3>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((q, index) => {
                                        const answer = answers.find((a) => a.question_id === q.id);
                                        const status = getAnswerStatus(answer);
                                        const isCurrent = index === currentIndex;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => goToQuestion(index)}
                                                className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                                                    isCurrent
                                                        ? 'ring-2 ring-indigo-600 ring-offset-2'
                                                        : ''
                                                } ${
                                                    status.status === 'correct'
                                                        ? 'bg-emerald-500 text-white'
                                                        : status.status === 'incorrect'
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="mt-4 pt-4 border-t text-xs text-gray-600 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded bg-emerald-500" />
                                        <span>Benar</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded bg-red-500" />
                                        <span>Salah</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded bg-gray-200" />
                                        <span>Tidak Dijawab</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mt-4 pt-4 border-t">
                                    <div className="text-sm space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Benar:</span>
                                            <span className="font-medium text-emerald-600">
                                                {answers.filter((a) => a.is_correct).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Salah:</span>
                                            <span className="font-medium text-red-600">
                                                {answers.filter((a) => !a.is_correct && a.selected_option).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tidak Dijawab:</span>
                                            <span className="font-medium text-gray-600">
                                                {questions.length - answers.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
}
