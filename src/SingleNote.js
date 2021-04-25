import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useParams } from 'react-router';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './Loader/Loader';
import Login from './Authentication/Login';

const SingleNote = () => {
  const { userId, id } = useParams();
  const [note, setNote] = useState('');

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const noteRef = firestore.collection(userId).doc(id).get();
    noteRef.then((d) => setNote(d.data())).catch((e) => e);
  }, [userId, id]);

  if (loading) return <Loader />;

  return (
    <div>
      {user ? (
        <Quill
          readOnly
          theme='snow'
          value={note.body}
          style={{ height: '94vh' }}
        />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default SingleNote;
