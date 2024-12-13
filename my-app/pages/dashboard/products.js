import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProductManage from '../../components/productManage';
import { getServerSideProps } from "../../api/products.ssr";

export { getServerSideProps };
const Products = (props) => {
    const data = props.data;
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/authentication/login');
      }
    }, []);
  return (
      <Box>
        {/* {{data.length()}} */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
          < ProductManage data={data} />
          </Grid>
        </Grid>
      </Box>
  )
}

export default Products;
