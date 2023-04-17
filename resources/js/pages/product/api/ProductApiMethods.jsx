import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Paths } from "@/paths";
import Swal from "sweetalert2";
import axios from "axios";

export const getProducts = async (params, setProducts, setLinks, setPaginate) => {
  axios.get('/api/v1/management/products', params)
  .then((response) => {
    const products = response.data.products;
    setProducts(products.data);
    setLinks([...Array(products.last_page)].map((_, i) => i + 1))
    setPaginate({
      current_page: products.current_page, 
      per_page: products.per_page,
      from: products.from,
      to: products.to,
      total: products.total,
    })
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeProduct = async (formValue, storeProductImages, storeImages, history) => {
  axios.post(`/api/v1/management/products`, formValue)
  .then((response) => {
    const product = response.data.product;
    console.log(product);

    Swal.fire(
      '保存完了',
      '商品情報の保存に成功しました',
      'success'
    ).then(result => {
      if (result.isConfirmed) {
        history.push(Paths.EditProduct.path.replace(':id', product.id))
      }
    })

    // 画像保存stateに値があればAPI発火
    if (storeProductImages.length > 0) {
      const formData = new FormData();
      storeProductImages.forEach((image) => formData.append("files[]", image, image.name));
      storeImages(product.id, formData)
    }

  })
  .catch(error => {
      console.error(error);
  });
};


export const showProduct = async (id, setProduct, setPrivate, setIsPickedUp, setProductSale) => {
  axios.get(`/api/v1/management/products/${id}`)
  .then((response) => {
    const product = response.data.product;
    console.log(product);
    setProduct(product)
    setProductSale(product.product_sale)
    setPrivate(product.is_undisclosed == 1 ? true : false)
    setIsPickedUp(product.is_picked_up == 1 ? true : false)
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateProduct = (id, formValue) => {
  axios.put(`/api/v1/management/products/${id}`, formValue)
  .then((response) => {
    Swal.fire(
      '更新完了',
      '商品情報の更新に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteProduct = async (id, completeDelete) => {
  axios.delete(`/api/v1/management/products/${id}`)
  .then((response) => {
    completeDelete();
  })
  .catch(error => {
      console.error(error);
  });
};

export const sortProduct = async (id, formValue) => {
  axios.put(`/api/v1/management/products/${id}/sort`, formValue)
  .then((response) => {
    const displayOrder = response.data.display_order;
    console.log(displayOrder);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getProductImages = async (id, setProductImages) => {
  axios.get(`/api/v1/management/products/${id}/images`)
  .then((response) => {
    setProductImages(response.data.product_images);
    console.log(response.data.product_images);
  })
  .catch(error => {
      console.error(error);
  });
};

export const getRelatedProducts = (id, setRelatedProducts) => {
  axios.get(`/api/v1/management/products/${id}/related-product`)
  .then((response) => {
    setRelatedProducts(
      response.data.related_products.map(v => ({
        id: v.related_product_id,
        table_id: v.id,
        name: v.related_product.name,
        discountPrice: v.discount_price,
      }))
    )
  })
  .catch(error => {
    console.error(error);
  })
}

export const updateRelatedProduct = (id, formValue) => {
  axios.post(`/api/v1/management/products/${id}/related-product`, formValue)
  .then((response) => {
    console.log(response.data);
    Swal.fire(
      '保存完了',
      'ユーザー情報の保存に成功しました',
      'success'
    )
  })
  .catch(error => {
      console.error(error);
  });
};

export const deleteImages = async (id, params) => {
  axios.delete(`/api/v1/management/products/${id}/images`, {
    data: params
  })
  .then((response) => {
    console.log(response.data);
    console.log('削除に成功しました。');
  })
  .catch(error => {
      console.error(error);
  });
};

export const storeImages = async (id, formData) => {
  axios.post(`/api/v1/management/products/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
    console.log(response.data);
    console.log('保存に成功しました。');
  })
  .catch(error => {
      console.error(error);
  });
};

export const updateImages = async (id, formData) => {
  axios.post(`/api/v1/management/products/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    },
  })
  .then((response) => {
    console.log(response.data);
    console.log('更新に成功しました。');
  })
  .catch(error => {
      console.error(error);
  });
};