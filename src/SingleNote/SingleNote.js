import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { useParams } from 'react-router';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader/Loader';
import Login from '../Authentication/Login';
import { MdTitle } from 'react-icons/md';
import { Box } from '@chakra-ui/layout';
import { AiFillHome } from 'react-icons/ai';
import Error from '../Error404/Error';

const SingleNote = () => {
  const { userId, id } = useParams();
  const [note, setNote] = useState('');
  const [loader, setLoader] = useState(true);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setLoader(true);
    const noteRef = firestore.collection(userId).doc(id).get();
    noteRef
      .then((d) => {
        setNote(d.data());
        setLoader(false);
      })
      .catch((e) => e);
  }, [userId, id]);

  if (loading || loader) return <Loader />;
  if (!note) return <Error />;

  return user ? (
    <Box>
      <Box className='editor-header'>
        <Box className='editor-titleicon'>
          <MdTitle className='icon' />
        </Box>
        <input
          className='editor-title'
          defaultValue={note && note?.title}
          disabled
        />
        <Box className='editor-fullscreen'>
          <Link to='/'>
            <AiFillHome className='icon' />
          </Link>
        </Box>
      </Box>
      <Quill
        readOnly
        theme='snow'
        value={note && note?.body}
        style={{ height: '87vh' }}
      />
    </Box>
  ) : (
    <Login />
  );
};

export default SingleNote;
