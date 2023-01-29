import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import MarkdownEditor from '../components/MarkdownEditor';
import ScrapboxEditor from '../components/ScrapboxEditor';

const Index = () => {
  const [outputScrapbox, setOutputScrapbox] = useState('');
  const [inputMarkdown, setInputMarkdown] = useState('');
  const compile2sb = async (md: string) => {
    const sb = await invoke('compile_md2scrap', { md });
    return sb;
  };

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
    <div className="container h-screen w-screen m-2">
      <div className='flex h-full w-full'>
        <div className='w-1/2 mr-2'>
          <h2 className='text-xl'>Markdown Input</h2>
          <MarkdownEditor md={''} onChange={(md) => setInputMarkdown(md)} />
        </div>

        <div className='w-1/2 ml-2'>
          <h2 className='text-xl'>Scrapbox Output</h2>
          <ScrapboxEditor sb={outputScrapbox} />
        </div>
      </div>
    </div>
  );
};

export default Index;
