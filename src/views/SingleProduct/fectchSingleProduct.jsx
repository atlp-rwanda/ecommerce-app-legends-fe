import { useParams } from 'react-router-dom';

const URL = `https://ecommerce-app-legends-bn-production.up.railway.app`;
let products = [];
let variations = [];
let reviews = [];
let wholeProduct = {};
let categoryName;

const HandleRequests = async () => {
  const { id } = await useParams();

  return fetch(`${URL}/api/v1/products/${id}`)
    .then((res) => res.json())
    .then(async (data1) => {
      if (data1.data.ProductAttributes) {
        variations = data1.data.ProductAttributes;
        reviews = data1.reviews;
        wholeProduct = data1.data;

        await fetch(`${URL}/api/v1/category/all`)
          .then((res) => res.json())
          .then((data2) => {
            data2.data.forEach((category) => {
              if (category.id === data1.data.categoryId) {
                categoryName = category.name;
                products = category.Products;
              }
            });
          });
        const data3 = {
          id,
          products,
          variations,
          reviews,
          wholeProduct,
          categoryName,
        };
        return data3;
      }
    })
    .catch((error) => {});
};
export default HandleRequests;
