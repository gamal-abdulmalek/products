import React, { useRef } from "react";
import { Container, Grid, Card, CardContent, Typography,CardMedia, Box, CircularProgress } from "@mui/material";
import { useQuery, useInfiniteQuery } from "react-query";
import { HttpClient } from "@/api/client/http-client";

const fetchProducts = async ({ pageParam = 1 }) => {
  const response = await HttpClient.get(`api/fetchproducts?page=${pageParam}`);
  return response.data;
};

export default function ProductGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    "products",
    fetchProducts,
    {
      getNextPageParam: (lastPage) => {
        
        if (lastPage.current_page < lastPage.last_page) {
          return lastPage.current_page + 1;
        }
        return undefined;
      },
    }
  );


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Product Grid
      </Typography>

      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {status === "error" && (
        <Typography color="error" align="center">
          Failed to load products.
        </Typography>
      )}

      {status === "success" && (
        <Grid container spacing={3}>
          {data.pages.map((page) =>
            page.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.photo}
                  alt={product.name}
                />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      
    </Container>
  );
}