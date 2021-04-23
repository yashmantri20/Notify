// const deleteNote = async (note) => {
//     const noteIndex = notes.indexOf(note);

//     setNotes(notes.filter(_note => _note !== note));

//     if (selectedNoteIndex === noteIndex) {
//         setSelectedNoteIndex(null)
//         setSelectedNote(null)
//     } else {
//         notes.length > 1 ?
//             selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
//             setSelectedNoteIndex(null)
//         setSelectedNote(null)
//     }

//     firebase
//         .firestore()
//         .collection('notes')
//         .doc(note.id)
//         .delete();
// }

// const noteUpdate = (id, noteObj) => {
//     firebase
//         .firestore()
//         .collection('notes')
//         .doc(id)
//         .update({
//             title: noteObj.title,
//             body: noteObj.body,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         });
// }

// const selectNote = (note, index) => {
//     setSelectedNote(note)
//     setSelectedNoteIndex(index)
// }

