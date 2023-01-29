import { useCallback, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import MarkdownEditor from '../components/MarkdownEditor';
import ScrapboxEditor from '../components/ScrapboxEditor';
import Header from '../components/Header';

const Index = () => {
  const [outputScrapbox, setOutputScrapbox] = useState('');
  const [inputMarkdown, setInputMarkdown] = useState('');
  const compile2sb = async (md: string) => {
    const sb = await invoke('compile_md2scrap', { md });
    return sb;
  };

  const onImport = useCallback(async () => {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        { name: 'Markdown', extensions: ['md'] },
        { name: 'All', extensions: ['*'] },
      ],
    });

    if (typeof file === 'string') {
      await invoke('read_file', { path: file }).then((md: string) => {
        setInputMarkdown(md);
      }).catch((err: string) => {
        alert(err);
      });
    }
  }, [setInputMarkdown]);

  useEffect(() => {
    compile2sb(inputMarkdown).then((sb: string) => {
      setOutputScrapbox(sb);
    });
  }, [inputMarkdown]);

  useEffect(() => {
    const output = document.getElementById('sb-output') as HTMLTextAreaElement;
    if (output) {
      output.value = outputScrapbox;
    }
  }, [outputScrapbox]);

  return (
    <div className='pb-2'>
      <Header onImport={onImport} onExport={onImport} onSetting={onImport} />

      <div className="container h-screen w-screen m-2 mt-12">
        <div className='flex h-full w-full'>
          <div className='w-1/2 mr-2'>
            <h2 className='text-xl'>Markdown Input</h2>
            <MarkdownEditor md={inputMarkdown} onChange={(md) => setInputMarkdown(md)} />
          </div>

          <div className='w-1/2 ml-2'>
            <h2 className='text-xl'>Scrapbox Output</h2>
            <ScrapboxEditor sb={outputScrapbox} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
