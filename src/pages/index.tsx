import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [outputScrapbox, setOutputScrapbox] = useState("");
  const [inputMarkdown, setInputMarkdown] = useState("");
  const compile2sb = async (md: string) => {
    const sb = await invoke("compileMd2Scrap", { md });
    return sb;
  };

  useEffect(() => {
    compile2sb(inputMarkdown).then((sb: string) => {
      setOutputScrapbox(sb);
    });
  }, [inputMarkdown]);

  useEffect(() => {
    const output = document.getElementById("sb-output") as HTMLTextAreaElement;
    if (output) {
      output.value = outputScrapbox;
    }
  }, [outputScrapbox]);

  return (
    <div className="container h-screen w-full">
      <div className="flex bg-red-500">
        <div className="w-1/2">
          <textarea
            id="md-input"
            className="w-full h-full bg-blue-500"
            onChange={(e) => {setInputMarkdown(e.target.value)}}
          />
        </div>
        <div className="w-1/2">
          <textarea id="sb-output" readOnly className="w-full h-full bg-red-200"/>
        </div>
      </div>
    </div>
  );
}

export default App;
