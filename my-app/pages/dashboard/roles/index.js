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
  const [loading, setLoading] = useState(true);

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





  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Roles & Permissions Management
      </Typography>
      
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
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      
    </Box>
  );
};

export default RolesPermissionsPage;