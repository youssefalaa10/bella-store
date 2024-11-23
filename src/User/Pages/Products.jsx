import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import CollectionCard from "../Components/CollectionCard";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice"; // Update this path if necessary
import Footer from "../Components/Footer";
import PageBanner from "../Components/PageBanner";

const Products = () => {
  const postsPerPage = 9;
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />

      <div className="mt-16 bg-[#f4f3ef] px-[7%]">
        <PageBanner title="Collection" />
      </div>

      {loading ? (
        <p className="text-center mt-16">
          <div className="flex items-center justify-center object-centerw-full mt-[25%]">
            <div className="">
              <span className="loading loading-infinity loading-lg text-mainColor"></span>
            </div>
          </div>
        </p>
      ) : (
        <div className="mt-16 flex flex-col lg:flex-row">
          {/* Products Container */}
          <div className="flex flex-wrap justify-center gap-16 sm:1/2 md:gap-8 w-full">
            {currentPosts.map((product) => (
              <CollectionCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
        currentPage={currentPage}
        className="mt-16"
      />
      <Footer />
    </div>
  );
};

export default Products;
