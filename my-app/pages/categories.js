import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { HttpClient } from '@/api/client/http-client';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState({});

  // Fetch categories data from Laravel backend
  useEffect(() => {
    HttpClient.get('api/categories') // Update with your Laravel API endpoint
      .then(response => {
        setCategories(response);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle toggle for opening/closing categories
  const handleToggle = (id) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Recursive rendering function for nested categories
  const renderCategories = (categories) => {
    return categories.map((category) => (
      <Box key={category.id}>
        <ListItem button onClick={() => handleToggle(category.id)}>
          <ListItemText primary={category.name} />
          {category.children && category.children.length > 0 ? (
            open[category.id] ? <ExpandLess /> : <ExpandMore />
          ) : null}
        </ListItem>
        {category.children && category.children.length > 0 && (
          <Collapse in={open[category.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              {renderCategories(category.children)}
            </List>
          </Collapse>
        )}
      </Box>
    ));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <List>
        {renderCategories(categories)}
      </List>
    </Box>
  );
};

export default CategoriesPage;

