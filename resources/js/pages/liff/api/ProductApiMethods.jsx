import noImage from "@img/img/noimage.jpg"

export const getProducts = async (setProducts, setIsLoading) => {
  return await axios.get('/api/v1/products')
    .then((response) => {
      setProducts(response.data.products);
      console.log(response.data.products);
      setIsLoading(false)
    })
    .catch(error => {
      setIsLoading(false)
      console.error(error);
    });
};

export const showProduct = async (id, setProduct) => {
  return await axios.get(`/api/v1/products/${id}`)
    .then((response) => {
      setProduct(response.data.product);
    })
    .catch(error => {
      console.error(error);
    });
};

export const getProductImages = async (id, setProductImages) => {
  return await axios.get(`/api/v1/products/${id}/images`)
    .then((response) => {
      if (response.data.product_images.length > 0) {
        setProductImages(response.data.product_images);
      } else {
        setProductImages([
          { id: 1, product_id: id, image_path: noImage }
        ]);
      }
      console.log(response.data.product_images);
    })
    .catch(error => {
      console.error(error);
    });
};

export const getProductCategory = async (id, setCategory) => {
  return await axios.get(`/api/v1/products/${id}/category`)
    .then((response) => {
      setCategory(response.data.category)
      console.log(response.data.category);
    })
    .catch(error => {
      console.error(error);
    });
};

export const getProductCategories = async (setCategories) => {
  await axios.get('/api/v1/product-categories')
    .then(({ data }) => {
      setCategories(data.categories);
    })
    .catch(error => {
      console.error(error);
    })
}