import { Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import Editor from '../Editor/Editor';
import { Box } from '@chakra-ui/layout';
import Loader from '../Loader/Loader';
import Sidebar from '../Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import notesimg from '../assets/notes.svg';
import Login from '../Authentication/Login';

const Home = () => {
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loader, setLoader] = useState(true);
  const [adding, setAdding] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('');

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setLoader(true);
    firestore.collection(`${user?.uid}`).onSnapshot((serverUpdate) => {
      const notes = serverUpdate.docs.map((_doc) => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      setNotes(notes);
      setLoader(false);
    });
  }, [user]);

  const selectNote = (note) => {
    setSelectedNote(note);
    onClose();
  };

  const newNote = async () => {
    setAdding(true);
    let note = {
      title: 'Untitled',
      body: '',
    };
    const newFromDB = await firestore.collection(`${user.uid}`).add({
      title: note.title,
      body: note.body,
    });

    const newId = newFromDB.id;
    note = { ...note, id: newId };
    setNotes([note, ...notes]);
    setAdding(false);
  };

  const deleteNote = async (note) => {
    setNotes(notes.filter((_note) => _note.id !== note.id));
    if (selectedNote && selectedNote?.id === note.id) {
      setSelectedNote(null);
    }

    await firestore.collection(`${user.uid}`).doc(note.id).delete();
  };

  const noteUpdate = async (id, note) => {
    if (id && note) {
      await firestore.collection(`${user.uid}`).doc(id).set(
        {
          title: note.title,
          body: note.body,
        },
        { merge: true }
      );
    }
  };

  const shareHandler = (id, onOpen) => {
    setId(id);
    onOpen();
  };

  if (loading || loader) return <Loader />;

  return (
    <>
      {user ? (
        <Box className='container'>
          <Box className='left-half'>
            <Box className='container'>
              <Sidebar
                newNote={newNote}
                adding={adding}
                notes={notes}
                selectNote={selectNote}
                shareHandler={shareHandler}
                id={id}
                deleteNote={deleteNote}
              />
            </Box>
          </Box>

          <Box className='mobile-home'>
            <Flex className='drawer-header'>
              <Text color='white' my='auto'>
                Notify
              </Text>
              <Button colorScheme='gray' onClick={onOpen} float='right' mt={2}>
                <GiHamburgerMenu size='20px' />
              </Button>
            </Flex>

            <Box mb={2}>
              <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton color='white' zIndex={2} />
                    <Box overflowY='scroll'>
                      <Sidebar
                        newNote={newNote}
                        adding={adding}
                        notes={notes}
                        selectNote={selectNote}
                        shareHandler={shareHandler}
                        id={id}
                        deleteNote={deleteNote}
                      />
                    </Box>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </Box>
          </Box>

          <Box className='right-half'>
            {selectedNote ? (
              <Editor selectedNote={selectedNote} noteUpdate={noteUpdate} />
            ) : (
              <Box className='note-img'>
                <Image className='image' src={notesimg} draggable={false} />
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
