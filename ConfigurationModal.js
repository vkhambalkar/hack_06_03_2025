import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab, TextField, Button, Box, MenuItem, Typography
} from '@mui/material';

const attributeTypes = ['source', 'derived'];

function ConfigurationModal({ open, onClose }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [defaultAttrs, setDefaultAttrs] = useState([]);
  const [customGroups, setCustomGroups] = useState([]);

  const [newAttr, setNewAttr] = useState({ name: '', type: 'source', formula: '' });
  const [newGroup, setNewGroup] = useState({ name: '', attributes: [] });

  const handleAttrChange = (e) => {
    const { name, value } = e.target;
    setNewAttr((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  const addDefaultAttr = () => {
    if (!newAttr.name || !newAttr.type) return;
    setDefaultAttrs((prev) => [...prev, newAttr]);
    setNewAttr({ name: '', type: 'source', formula: '' });
  };

  const addCustomGroup = () => {
    if (!newGroup.name) return;
    setCustomGroups((prev) => [...prev, { ...newGroup, attributes: [] }]);
    setNewGroup({ name: '', attributes: [] });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>🛠️ Configure Attributes</DialogTitle>

      <DialogContent>
        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
          <Tab label="Default Attributes" />
          <Tab label="Custom Groups" />
        </Tabs>

        {/* --- Default Tab --- */}
        {tabIndex === 0 && (
          <Box mt={2}>
            <TextField
              label="Attribute Name"
              name="name"
              value={newAttr.name}
              onChange={handleAttrChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Type"
              name="type"
              value={newAttr.type}
              onChange={handleAttrChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              {attributeTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            {newAttr.type === 'derived' && (
              <TextField
                label="Formula"
                name="formula"
                value={newAttr.formula}
                onChange={handleAttrChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            )}

            <Button variant="contained" onClick={addDefaultAttr}>➕ Add Attribute</Button>

            {defaultAttrs.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6">🧩 Added Attributes</Typography>
                <ul>
                  {defaultAttrs.map((attr, idx) => (
                    <li key={idx}>
                      {attr.name} ({attr.type}) {attr.type === 'derived' && `= ${attr.formula}`}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}

        {/* --- Custom Tab --- */}
        {tabIndex === 1 && (
          <Box mt={2}>
            <TextField
              label="Group Name"
              name="name"
              value={newGroup.name}
              onChange={handleGroupChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={addCustomGroup}>➕ Add Group</Button>

            {customGroups.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6">📦 Custom Groups</Typography>
                <ul>
                  {customGroups.map((group, idx) => (
                    <li key={idx}>
                      {group.name} (0 attributes)
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>❌ Cancel</Button>
        <Button variant="contained" onClick={() => {
          console.log('📝 Default:', defaultAttrs);
          console.log('📦 Custom:', customGroups);
          onClose();
        }}>💾 Save All</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfigurationModal;
