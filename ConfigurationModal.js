import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Paper, TextField, IconButton, Typography, CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now() + '-user',
      role: 'user',
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });

      const botReply = {
        id: Date.now() + '-bot',
        role: 'bot',
        content: res.data?.reply || '🤖 No response received'
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, {
        id: Date.now() + '-error',
        role: 'bot',
        content: '❌ Server Error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const renderBubble = (msg) => (
    <Box
      key={msg.id}
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
      }}
    >
      <Paper
        sx={{
          px: 2,
          py: 1,
          maxWidth: '75%',
          bgcolor: msg.role === 'user' ? '#e3f2fd' : '#f1f8e9',
          borderRadius: 2
        }}
      >
        <Typography variant="body1" fontWeight="500">
          {msg.content}
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" mb={2}>💬 Financial Chat Assistant</Typography>

        {/* Chat History */}
        <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
          {messages.map(renderBubble)}
          {loading && (
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={endRef} />
        </Box>

        {/* Input */}
        <Box mt={2} display="flex">
          <TextField
            fullWidth
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            size="small"
          />
          <IconButton onClick={handleSend} disabled={loading || !input.trim()}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
