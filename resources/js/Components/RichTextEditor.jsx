import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
    BoldIcon,
    ItalicIcon,
    ListBulletIcon,
    NumberedListIcon,
    CodeBracketIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    LinkIcon
} from '@heroicons/react/24/outline';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const Button = ({ onClick, isActive, disabled, title, children }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            type="button"
            title={title}
            className={`p-1.5 rounded-lg transition-colors ${isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50/50">
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
            >
                <BoldIcon className="w-5 h-5" />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
            >
                <ItalicIcon className="w-5 h-5" />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                title="Underline"
            >
                <span className="w-5 h-5 flex items-center justify-center font-serif text-lg leading-none underline decoration-2">U</span>
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <ListBulletIcon className="w-5 h-5" />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Ordered List"
            >
                <NumberedListIcon className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
                title="Code Block"
            >
                <CodeBracketIcon className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo"
            >
                <ArrowUturnLeftIcon className="w-5 h-5" />
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo"
            >
                <ArrowUturnRightIcon className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default function RichTextEditor({ value, onChange, placeholder = '' }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose max-w-none px-4 py-3 focus:outline-none min-h-[150px]',
            },
        },
    });

    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="cursor-text" />
        </div>
    );
}
