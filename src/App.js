import { useEffect, useState } from 'react';
import './App.css';
import firebase from './firebase';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import 'react-quill/dist/quill.snow.css';

function App() {

  const [notes, setNotes] = useState(null)
  // const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  // const [selectedNote, setSelectedNote] = useState(null)

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        setNotes(notes)
      });
  }, [])

  const newNote = async () => {
    const note = {
      title: 'Untitled',
      body: ''
    };

    await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    setNotes([...notes, note]);
  }

  const text = "ays"
  return (
    <div className="App" >
      <button onClick={newNote}>Add Note</button>
      {
        notes && notes.map(n => <h1>{n.title}</h1>)
      }

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <BorderColorIcon />
          <input

            placeholder='Note title...'
          /></div>
        <ReactQuill value={text} style={{ width: '90%' }} />

      </div>
    </div>
  );
}

export default App;
