interface ScrapboxEditorProps {
  sb: string;
};

const ScrapboxEditor: React.FC<ScrapboxEditorProps> = ({ sb }) => {
  return (
    <div className="w-full h-full rounded-md border-2 border-skdark-light p-4">
      <textarea
        className="w-full h-full bg-skdark focus:outline-none"
        readOnly
        defaultValue={sb}
      />
    </div>
  );
};

export default ScrapboxEditor;
