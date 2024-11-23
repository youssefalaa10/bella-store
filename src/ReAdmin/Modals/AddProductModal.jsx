/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, updateProducts } from "../../Redux/Slices/ProductsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";

const AddProductModal = ({ closeModal, productToUpdate }) => {
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const [newProduct, setNewProduct] = useState({
        id: productToUpdate ? productToUpdate.id : "",
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        price: 0,
        quantity: 0,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (productToUpdate) {
            setNewProduct({
                id: productToUpdate.id,
                title: productToUpdate.title,
                category: productToUpdate.category,
                description: productToUpdate.description,
                imageUrl: productToUpdate.imageUrl,
                price: productToUpdate.price,
                quantity: productToUpdate.quantity,
            });
            setPreview(productToUpdate.imageUrl);
        } else {
            resetForm();
        }
    }, [productToUpdate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // const handleFileChange = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     if (file.size > 2000000) {
    //       toast.error("File size exceeds 2MB");
    //       return;
    //     }
    //     if (!file.type.startsWith("image/")) {
    //       toast.error("Please upload a valid image file");
    //       return;
    //     }
    //     setImageFile(file);
    //     setPreview(URL.createObjectURL(file));
    //   }
    // };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return null;

        const storageRef = ref(storage, `/product_images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                null,
                (error) => reject(error),
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };

    const resetForm = () => {
        setNewProduct({
            title: "",
            category: "",
            description: "",
            imageUrl: "",
            price: 0,
            quantity: 0,
        });
        setPreview(null);
        setImageFile(null);
    };

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        setIsDisabled(true);

        try {
            const downloadURL = imageFile
                ? await uploadImage()
                : productToUpdate?.imageUrl;

            const productData = { ...newProduct, imageUrl: downloadURL };

            if (productToUpdate) {
                await dispatch(
                    updateProducts({
                        productId: productToUpdate.id,
                        updatedData: productData,
                    })
                );
                toast.success("Product updated successfully!");
            } else {
                await dispatch(addProducts(productData));
                toast.success("Product added successfully!");
            }

            resetForm();
            closeModal(
                
            );
        } catch (error) {
            toast.error("Error saving product, please try again");
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <div className="fixed w-full z-[99999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                        {productToUpdate ? "Update Product" : "Add Product"}
                    </h2>
                    <button
                        className="btn btn-circle btn-ghost hover:bg-mainColor hover:text-white"
                        onClick={closeModal}
                        aria-label="Close Modal"
                    >
                        <IoCloseOutline size={18} />
                    </button>
                </div>

                <form onSubmit={handleAddOrUpdateProduct} className="space-y-3">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newProduct.title}
                            onChange={handleInputChange}
                            className="input input-bordered w-full focus:border-0"
                            placeholder="Product Name"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            className="input input-bordered w-full focus:border-0 mb-3"
                            min={1}
                            placeholder="Price"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            className="input input-bordered w-full focus:border-0"
                            min={1}
                            placeholder="Quantity"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            className="select select-bordered w-full focus:border-0"
                            required
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option value="Bed Room">Bed Room</option>
                            <option value="Decoration">Decoration</option>
                            <option value="Living Room">Living Room</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Product Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered w-full focus:border-0"
                            placeholder="Product Description"
                            rows="2"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="imgFile"
                            className="cursor-pointer flex items-center gap-2 mb-3"
                        >
                            <GoFileMedia />
                            Add Image
                        </label>
                        <input
                            id="imgFile"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="object-cover h-[20rem]"
                        />
                    )}
                    <div className="flex justify-end mt-3">
                        <button
                            disabled={isDisabled}
                            className={`bg-mainColor text-white p-2 px-7 rounded ${
                                isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            type="submit"
                        >
                            {isDisabled
                                ? productToUpdate
                                    ? "Updating..."
                                    : "Adding..."
                                : productToUpdate
                                ? "Update"
                                : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
