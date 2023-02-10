import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "The first book I read",
    description: "lorem ipsum kfnd nkds flksndf knsf k",
  },
  {
    id: "p2",
    price: 5,
    title: "The last book I read",
    description: "lorem ipsum kjsnf idfs nis fniaisf sifhn ",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((prod) => (
          <ProductItem
            id={prod.id}
            key={prod.id}
            title={prod.title}
            price={prod.price}
            description={prod.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
