import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { HttpClient } from '@/api/client/http-client';

const RolesPermissionsPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: '', permissions: [] });
  const [isEditing, setIsEditing] = useState(false);

  const fetchRolesAndPermissions = async () => {
    try {
      const [rolesResponse, permissionsResponse] = await Promise.all([
        HttpClient.get(`api/roles`),
        HttpClient.get(`api/permissions`),
      ]);
      

      setRoles(rolesResponse);
      setPermissions(permissionsResponse);
    } catch (error) {
      console.error('Failed to fetch roles or permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesAndPermissions();
  }, []);

  const handleOpenDialog = (role = { name: '', permissions: [] }) => {
    setCurrentRole(role);
    setIsEditing(!!role.id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentRole({ name: '', permissions: [] });
  };

  const handleSaveRole = async () => {
    try {
      if (isEditing) {
        await HttpClient.put(
          `api/roles/${currentRole.id}`,
          currentRole,
        );
      } else {
        await HttpClient.post(`api/roles`, currentRole);
      }
      fetchRolesAndPermissions();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save role:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await HttpClient.delete(`api/roles/${roleId}`, );
      fetchRolesAndPermissions();
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const handlePermissionChange = (permission) => {
    const permissions = [...currentRole.permissions];
    if (permissions.includes(permission)) {
      setCurrentRole({
        ...currentRole,
        permissions: permissions.filter((p) => p !== permission),
      });
    } else {
      setCurrentRole({ ...currentRole, permissions: [...permissions, permission] });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Roles & Permissions Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Create New Role
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((permission) => permission.name).join(', ')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenDialog(role)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Role' : 'Create Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
            margin="normal"
          />
          <Typography variant="subtitle1" gutterBottom>
            Permissions
          </Typography>
          <FormGroup>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={currentRole.permissions.includes(permission.name)}
                    onChange={() => handlePermissionChange(permission.name)}
                  />
                }
                label={permission.name}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveRole} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolesPermissionsPage;