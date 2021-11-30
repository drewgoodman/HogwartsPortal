import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { closeTagCreateModal, createStudentTag } from '../../actions/tagActions';

function TagCreateModal() {

    const [newTagName, setNewTagName] = useState("")
    const dispatch = useDispatch();

    const { tagCreateModalOpen, tagData } = useSelector(state => state.tagModal)

    const handleCloseModal = () => {
        dispatch(closeTagCreateModal());
    }

    const handleCreateConfirm = () => {
        dispatch(createStudentTag({
            studentId: tagData.studentId,
            tagName: newTagName
        }));
    }

    return (
        <Dialog
            open={tagCreateModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="tag-update-title"
            aria-describedby="tag-update-description"
        >
            <DialogTitle id="tag-update-title">
                {"Create New Tag"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="tag-update-description">
                    Please name the new tag you wish to assign to this student:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tag Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewTagName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} >Cancel</Button>
                <Button onClick={handleCreateConfirm}>Create Tag</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TagCreateModal
