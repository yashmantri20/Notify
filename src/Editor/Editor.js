import { useState, useEffect, useRef } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdTitle } from 'react-icons/md';
import { Box } from '@chakra-ui/layout';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['link', 'image', 'blockquote', 'code-block'],
  ['clean'],
];

const Editor = ({ selectedNote, noteUpdate }) => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setBody(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      noteUpdate(id, { title, body });
    }, 1500);

    return () => clearTimeout(timer);
  }, [noteUpdate, title, body, id]);

  const updateBody = (val) => {
    setBody(val);
  };

  const updateTitle = (val) => {
    setTitle(val);
  };

  const handleFullscreen = () => {
    if (ref.current) {
      if (document.fullscreenElement === null) {
        ref.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <Box ref={ref} bg='white'>
      <Box className='editor-container'>
        <Box className='editor-header'>
          <Box className='editor-titleicon'>
            <MdTitle className='icon' />
          </Box>
          <input
            className='editor-title'
            value={title ? title : ''}
            onChange={(e) => updateTitle(e.target.value)}
          />

          <Box onClick={handleFullscreen} className='editor-fullscreen'>
            {isFullscreen ? (
              <AiOutlineFullscreenExit className='icon' />
            ) : (
              <AiOutlineFullscreen className='icon' />
            )}
          </Box>
        </Box>
        <Quill
          theme='snow'
          value={body}
          style={{ height: '87vh' }}
          onChange={updateBody}
          modules={{ toolbar: TOOLBAR_OPTIONS }}
        />
      </Box>
    </Box>
  );
};

export default Editor;
