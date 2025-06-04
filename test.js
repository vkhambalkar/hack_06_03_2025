import React, { useState } from 'react';
import ConfigurationModal from './components/ConfigurationModal';
import { Button } from '@mui/material';

function App() {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setConfigOpen(true)}>
        ⚙️ Configure Attributes
      </Button>
      <ConfigurationModal open={configOpen} onClose={() => setConfigOpen(false)} />
    </>
  );
}

export default App;
