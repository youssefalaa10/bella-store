import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectOrder } from "../../Redux/Slices/OrdersSlice";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder, status, error } = useSelector(
    (state) => state.orders
  );
  const { items: products } = useSelector((state) => state.products); // Get products from state
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  const handleOrderClick = (orderId) => {
    dispatch(selectOrder(orderId));
    setCurrentOrder(orderId);
  };

  // Helper function to get product details by productId
  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId) || {};
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Order Details (Left) */}
        <div className="flex-1">
          {selectedOrder ? (
            <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
              <h2 className="text-xl font-semibold mb-4">
                Order #{selectedOrder.orderId}
              </h2>
              <div className="space-y-4">
                {selectedOrder.orderDetails.map((item, index) => {
                  const productDetails = getProductDetails(item.productId);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            productDetails.imageUrl ||
                            "https://via.placeholder.com/64"
                          }
                          alt={`Product ${item.productId}`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-lg font-medium">
                            {productDetails.title ||
                              `Product ${item.productId}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-medium">
                        USD{" "}
                        {(
                          item.quantity * (productDetails.price || item.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full border p-4 rounded-lg shadow-sm bg-white">
              <p className="text-xl font-semibold text-gray-500">
                Select an order to view details
              </p>
            </div>
          )}
        </div>

        {/* Orders Summary (Right) */}
        <div className="w-full lg:w-1/3">
          <div className="space-y-4">
            {status === "loading" && (
              <div className="flex items-center justify-center object-centerw-full mt-[25%]">
                <div className="">
                  <span className="loading loading-infinity loading-lg text-mainColor"></span>
                </div>
              </div>
            )}
            {status === "failed" && <p>{error}</p>}
            {orders.map((order) => (
              <div
                key={order.orderId}
                className={`border p-4 rounded-lg shadow-sm bg-white cursor-pointer ${
                  currentOrder === order.orderId ? "bg-gray-100" : ""
                }`}
                onClick={() => handleOrderClick(order.orderId)}
              >
                <p className="text-lg font-medium">Order #{order.orderId}</p>
                <p>{new Date(order.orderDate.toDate()).toLocaleDateString()}</p>
                <p
                  className={`text-${
                    order.orderStatusId === "TUgeq6U27JsTojE1XukC"
                      ? "green"
                      : "blue"
                  }-500`}
                >
                  {order.orderStatusId === "TUgeq6U27JsTojE1XukC"
                    ? "Delivered"
                    : "In Progress"}
                </p>
                <p>USD {order.totalAmount}</p>
                <p>{order.orderDetails.length} Items</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
