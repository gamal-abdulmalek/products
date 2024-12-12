import { Grid, Box } from '@mui/material';

import ProductManage from '../../components/productManage';

const Products = () => {
  return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
          < ProductManage />
          </Grid>
        </Grid>
      </Box>
  )
}

export default Products;
