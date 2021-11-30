import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { closeTagDeleteModal, deleteStudentTag } from '../../actions/tagActions';

function TagDeleteModal() {

    const dispatch = useDispatch();

    const { tagDeleteModalOpen, tagData } = useSelector(state => state.tagModal)

    const handleCloseModal = () => {
        dispatch(closeTagDeleteModal());
    }

    const handleDeleteConfirm = () => {
        tagData.tagId && dispatch( deleteStudentTag(tagData.tagId));
    }

    return (
        <Dialog
            open={tagDeleteModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="tag-update-title"
            aria-describedby="tag-update-description"
        >
            <DialogTitle id="tag-update-title">
                {"Delete this tag?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="tag-update-description">
                    Are you sure you want to delete <strong>"{tagData?.tagName}"</strong> from this student's tags?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} >Keep Tag</Button>
                <Button onClick={handleDeleteConfirm} autoFocus>Delete Tag</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TagDeleteModal
