import React, { useState } from 'react';
import { Box, IconButton, Dialog, Slide } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import ChatBot from './ChatBot';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function ChatBotPopup() {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => setOpen((prev) => !prev);

  return (
    <>
      {/* Floating Chat Icon */}
      <Box sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1300
      }}>
        <IconButton
          color="primary"
          size="large"
          onClick={toggleDialog}
          sx={{ bgcolor: 'white', boxShadow: 3 }}
        >
          <ChatIcon />
        </IconButton>
      </Box>

      {/* Popup Chat Window */}
      <Dialog
        open={open}
        onClose={toggleDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <Box sx={{ position: 'relative', height: '100%' }}>
          {/* Close button */}
          <IconButton
            onClick={toggleDialog}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>

          {/* Chat UI */}
          <Box sx={{ pt: 5, px: 2, height: '100%' }}>
            <ChatBot />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
