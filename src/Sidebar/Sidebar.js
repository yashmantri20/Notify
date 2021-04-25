import React from 'react';
import { AiFillDelete, AiOutlineShareAlt } from 'react-icons/ai';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Box,
  Center,
  Button,
  Flex,
  Text,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import './Sidebar.css';
import { removeHTMLTags } from '../utils/helper';
import { AiFillFileAdd, AiOutlineLogout } from 'react-icons/ai';
import { auth } from '../firebase';

const Sidebar = ({
  newNote,
  adding,
  notes,
  selectNote,
  shareHandler,
  id,
  deleteNote,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signOut = () => {
    auth.signOut();
  };

  const handleDeleteNote = (n) => {
    if (window.confirm(`Are you sure you want to delete: ${n.title}`)) {
      deleteNote(n);
    }
  };

  return (
    <Box>
      <Center className='add-notes'>
        <Text className='sidebar-title'>Notify</Text>
        <button onClick={newNote} disabled={adding} className='add-btn'>
          <AiFillFileAdd className='icon' />
        </button>
      </Center>

      <Box mt={16}>
        {notes &&
          notes.map((n) => (
            <Box key={n.id} pl='5px'>
              <Box className='all-notes'>
                <Box>
                  <Text cursor='pointer' onClick={() => selectNote(n)}>
                    {n.title}
                  </Text>
                  <Text mt={4}>{removeHTMLTags(n.body).slice(0, 15)}...</Text>
                </Box>
                <Flex>
                  <Box pr={2}>
                    <AiOutlineShareAlt
                      className='icon'
                      onClick={() => shareHandler(n.id, onOpen)}
                    />
                  </Box>
                  <Box pl={2}>
                    <AiFillDelete
                      className='icon'
                      onClick={() => handleDeleteNote(n)}
                    />
                  </Box>
                </Flex>
              </Box>
              <Divider colorScheme='whiteAlpha' />
            </Box>
          ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={700}>Sharable Link:</Text>
            <Text>{`${window.location.href}note/${auth.currentUser.uid}/${id}`}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box mt={16}>
        <Center className='auth-user'>
          <Text>
            Made with 💕 by{' '}
            <Link
              href='https://www.linkedin.com/in/yashmantri20/'
              isExternal
              color='blue.600'
            >
              Yash
            </Link>
          </Text>
          <button onClick={signOut} disabled={adding} className='add-btn'>
            <AiOutlineLogout className='icon' />
          </button>
        </Center>
      </Box>
    </Box>
  );
};

export default Sidebar;
