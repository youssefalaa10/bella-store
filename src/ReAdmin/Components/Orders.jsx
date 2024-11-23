import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllOrders,
    updateOrderStatus,
} from "../../Redux/Slices/adminOrdersSlice";
import Pagination from "../../User/Components/Pagination"; // Assuming you have a Pagination component

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.adminOrders);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, newStatus }));
    };

    // Get the current orders based on pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users Orders</h2>
            {status === "loading" && (
                <div className="flex items-center justify-center object-centerw-full mt-[25%]">
                    <div className="">
                        <span className="loading loading-infinity loading-lg text-mainColor"></span>
                    </div>
                </div>
            )}
            {status === "failed" && <p>{error}</p>}
            {status === "succeeded" && (
                <div className="space-y-4">
                    {currentOrders.map((order) => (
                        <div
                            key={order.id}
                            className="border p-4 rounded-lg shadow-sm bg-white"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-lg font-medium">
                                        Order #{order.id}
                                    </p>
                                    <p>User: {order.userName}</p>
                                    <p>
                                        {new Date(
                                            order.orderDate.toDate()
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <select
                                        value={order.orderStatusId}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order.id,
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg p-2"
                                    >
                                        <option value="w3oNSy1Y2MrIX1coDIP0">
                                            Completed
                                        </option>
                                        <option value="TUgeq6U27JsTojE1XukC">
                                            In Progress
                                        </option>
                                        <option value="If1uJ5Dbm66w2V0b4CuU">
                                            Cancelled
                                        </option>
                                        {/* Add other statuses as needed */}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {order.orderDetails.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={
                                                    item.imageUrl ||
                                                    "https://via.placeholder.com/64"
                                                }
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div>
                                                <p className="text-lg font-medium">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-medium">
                                            USD{" "}
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Pagination */}
                    <Pagination
                        postsPerPage={ordersPerPage}
                        totalPosts={orders.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
