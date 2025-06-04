import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab, TextField, Button, Box, MenuItem, Typography, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const addAttributeToGroup = (groupIndex, attr) => {
    const updatedGroups = [...customGroups];
    updatedGroups[groupIndex].attributes.push(attr);
    setCustomGroups(updatedGroups);
  };

  const updateAttributeInGroup = (groupIndex, attrIndex, field, value) => {
    const updatedGroups = [...customGroups];
    updatedGroups[groupIndex].attributes[attrIndex][field] = value;
    setCustomGroups(updatedGroups);
  };

  const deleteAttributeFromGroup = (groupIndex, attrIndex) => {
    const updatedGroups = [...customGroups];
    updatedGroups[groupIndex].attributes.splice(attrIndex, 1);
    setCustomGroups(updatedGroups);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>🛠️ Configure Attributes</DialogTitle>

      <DialogContent>
        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
          <Tab label="Default Attributes" />
          <Tab label="Custom Groups" />
        </Tabs>

        {/* ----- Default Tab ----- */}
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

        {/* ----- Custom Tab ----- */}
        {tabIndex === 1 && (
          <Box mt={2}>
            {/* New Group Input */}
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="New Group Name"
                name="name"
                value={newGroup.name}
                onChange={handleGroupChange}
              />
              <Button variant="contained" onClick={addCustomGroup}>➕ Add Group</Button>
            </Box>

            {/* Group List */}
            {customGroups.map((group, groupIndex) => (
              <Box key={groupIndex} mb={4} p={2} border="1px solid #ddd" borderRadius={2}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>📦 {group.name}</Typography>

                {/* Add Attribute to Group */}
                <AddGroupAttrForm onAdd={(attr) => addAttributeToGroup(groupIndex, attr)} />

                {/* Attribute Table */}
                {group.attributes.length > 0 && group.attributes.map((attr, attrIndex) => (
                  <Box key={attrIndex} display="flex" gap={2} alignItems="center" mt={2}>
                    <TextField
                      label="Name"
                      value={attr.name}
                      onChange={(e) =>
                        updateAttributeInGroup(groupIndex, attrIndex, 'name', e.target.value)
                      }
                    />
                    <TextField
                      select
                      label="Type"
                      value={attr.type}
                      onChange={(e) =>
                        updateAttributeInGroup(groupIndex, attrIndex, 'type', e.target.value)
                      }
                      sx={{ width: 120 }}
                    >
                      {attributeTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </TextField>
                    {attr.type === 'derived' && (
                      <TextField
                        label="Formula"
                        value={attr.formula}
                        onChange={(e) =>
                          updateAttributeInGroup(groupIndex, attrIndex, 'formula', e.target.value)
                        }
                      />
                    )}
                    <IconButton
                      color="error"
                      onClick={() => deleteAttributeFromGroup(groupIndex, attrIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>❌ Cancel</Button>
        <Button variant="contained" onClick={() => {
          console.log('📝 Default Attributes:', defaultAttrs);
          console.log('📦 Custom Groups:', customGroups);
          onClose();
        }}>💾 Save All</Button>
      </DialogActions>
    </Dialog>
  );
}

// Reusable form for adding attribute to a group
const AddGroupAttrForm = ({ onAdd }) => {
  const [attr, setAttr] = useState({ name: '', type: 'source', formula: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttr((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!attr.name || !attr.type) return;
    onAdd(attr);
    setAttr({ name: '', type: 'source', formula: '' });
  };

  return (
    <Box display="flex" gap={2}>
      <TextField
        label="Attr Name"
        name="name"
        value={attr.name}
        onChange={handleChange}
      />
      <TextField
        select
        label="Type"
        name="type"
        value={attr.type}
        onChange={handleChange}
        sx={{ width: 120 }}
      >
        {attributeTypes.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>
      {attr.type === 'derived' && (
        <TextField
          label="Formula"
          name="formula"
          value={attr.formula}
          onChange={handleChange}
        />
      )}
      <Button variant="outlined" onClick={handleAdd}>➕</Button>
    </Box>
  );
};

export default ConfigurationModal;
