interface MarkdownEditorProps {
  md: string;
  onChange: (md: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ md, onChange }) => {
  return (
    <div className="w-full h-full rounded-md border-2 border-skdark-light p-4">
      <textarea
        className="w-full h-full bg-skdark focus:outline-none"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Input Your Markdown Here"
        defaultValue={md}
      />
    </div>
  );
};

export default MarkdownEditor;
