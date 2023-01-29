interface HeaderProps {
  onImport: () => void;
  onExport: () => void;
  onSetting: () => void;
}

const Header: React.FC<HeaderProps> = ({ onImport, onExport, onSetting }) => {
  return (
    <div>
      <header
        className="fixed top-0 left-0 py-1 w-screen h-8 z-40 bg-skdark flex
        "
      >
        <button
          className="hover:bg-skdark-light px-2 transition-all duration-300 rounded-md"
          onClick={onImport}
        >
          Import
        </button>
        <button
          className="hover:bg-skdark-light px-2 transition-all duration-300 rounded-md"
          onClick={onExport}
        >
          Export
        </button>
        <button
          className="hover:bg-skdark-light px-2 transition-all duration-300 rounded-md"
          onClick={onSetting}
        >
          Setting
        </button>
      </header>
    </div>
  );
};

export default Header;
