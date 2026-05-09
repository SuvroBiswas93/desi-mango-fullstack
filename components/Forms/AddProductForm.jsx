// 'use client';
// import { useState, useEffect } from 'react';
// import { uploadImageToCloudinary } from '../../hooks';
// import toast from 'react-hot-toast';
// import { useAuth } from '../../lib/firebase/AuthContext';

// export default function AddProductForm() {
// 	const [name, setName] = useState('');
// 	const [price, setPrice] = useState('');
// 	const [weight, setWeight] = useState('');
// 	const [image, setImage] = useState(null);
// 	const [description, setDescription] = useState('');
// 	const [preview, setPreview] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [isPublish, setIsPublish] = useState(true);
// 	const { currentUser } = useAuth();

// 	// New states for product list and search
// 	const [products, setProducts] = useState([]);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const [editingProduct, setEditingProduct] = useState(null);
// 	const [showProductList, setShowProductList] = useState(false);
// 	const [deleteConfirm, setDeleteConfirm] = useState(null);
// 	const [filterStatus, setFilterStatus] = useState('all');

// 	// Fetch products on component mount
// 	useEffect(() => {
// 		if (!showProductList) return;
// 		fetchProducts();
// 	}, [showProductList]);

// 	const fetchProducts = async () => {
// 		try {
// 			const token = await currentUser?.getIdToken();
// 			const res = await fetch('/api/products/get?status=all', {
// 				headers: { 'Authorization': `Bearer ${token}` }
// 			});
// 			const data = await res.json();
// 			if (data.success) {
// 				setProducts(data.data);
// 			} else {
// 				toast.error('প্রোডাক্ট লোড করতে সমস্যা হয়েছে');
// 			}
// 		} catch (error) {
// 			console.error('Error fetching products:', error);
// 			toast.error('প্রোডাক্ট লোড করতে সমস্যা হয়েছে');
// 		}
// 	};

// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			setImage(file);
// 			setPreview(URL.createObjectURL(file));
// 		}
// 	};

// 	const resetForm = () => {
// 		setName('');
// 		setPrice('');
// 		setWeight('');
// 		setImage(null);
// 		setPreview(null);
// 		setDescription('');
// 		setIsPublish(true);
// 		setEditingProduct(null);
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		if (!image && !editingProduct) {
// 			return toast.error('দয়া করে একটি ইমেজ সিলেক্ট করুন!');
// 		}

// 		setLoading(true);

// 		try {
// 			let imageUrl = editingProduct ? editingProduct.image : null;

// 			// If new image is selected, upload it
// 			if (image) {
// 				imageUrl = await uploadImageToCloudinary(image);
// 			}

// 			const endpoint = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products/post';

// 			const method = editingProduct ? 'PUT' : 'POST';
// 			const formattedData = {
// 				name,
// 				description,
// 				price,
// 				image: imageUrl,
// 				weight,
// 				isPublish,
// 			};
// 			const token = await currentUser?.getIdToken();
// 			const response = await fetch(endpoint, {
// 				method,
// 				headers: { 
// 					'Content-Type': 'application/json',
// 					'Authorization': `Bearer ${token}`
// 				},
// 				body: JSON.stringify(formattedData),
// 			});

// 			const responseData = await response.json();

// 			if (!response.ok || !responseData.success) {
// 				throw new Error(responseData.error || 'ডাটা সেভ করতে সমস্যা হয়েছে');
// 			}

// 			toast.success(editingProduct ? 'প্রোডাক্ট আপডেট হয়েছে!' : 'প্রোডাক্ট সফলভাবে যোগ হয়েছে!');

// 			resetForm();
// 			fetchProducts(); // Refresh product list
// 		} catch (error) {
// 			console.error('Error:', error);
// 			toast.error(error.message || 'আপলোডে সমস্যা হয়েছে!');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const togglePublishStatus = async (productId, currentStatus) => {
// 		try {
// 			const token = await currentUser?.getIdToken();
// 			const res = await fetch(`/api/products/${productId}/publish`, {
// 				method: 'PATCH',
// 				headers: { 
// 					'Content-Type': 'application/json',
// 					'Authorization': `Bearer ${token}`
// 				},
// 				body: JSON.stringify({ isPublish: !currentStatus }),
// 			});
// 			const data = await res.json();

// 			if (data.success) {
// 				toast.success(!currentStatus ? 'প্রোডাক্ট পাবলিশ হয়েছে!' : 'প্রোডাক্ট আনপাবলিশ হয়েছে!');
// 				fetchProducts();
// 			} else {
// 				toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
// 			}
// 		} catch (error) {
// 			console.error('Error toggling publish status:', error);
// 			toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
// 		}
// 	};

// 	const handleEdit = (product) => {
// 		setEditingProduct(product);
// 		setName(product.name);
// 		setPrice(product.price.toString());
// 		setWeight(product.weight);
// 		setDescription(product.description || '');
// 		setIsPublish(product.isPublish !== undefined ? product.isPublish : true);
// 		setPreview(product.image);
// 		setImage(null);
// 		window.scrollTo({ top: 0, behavior: 'smooth' });
// 		toast.success('প্রোডাক্ট এডিট এর জন্য ফর্মে যুক্ত হয়েছে');
// 	};

// 	const handleDelete = async (productId) => {
// 		try {
// 			const token = await currentUser?.getIdToken();
// 			const res = await fetch(`/api/products/${productId}`, {
// 				method: 'DELETE',
// 				headers: { 'Authorization': `Bearer ${token}` }
// 			});
// 			const data = await res.json();

// 			if (data.success) {
// 				toast.success('প্রোডাক্ট ডিলিট হয়েছে!');
// 				fetchProducts();
// 				setDeleteConfirm(null);
// 			} else {
// 				toast.error('ডিলিট করতে সমস্যা হয়েছে');
// 			}
// 		} catch (error) {
// 			console.error('Error deleting product:', error);
// 			toast.error('ডিলিট করতে সমস্যা হয়েছে');
// 		}
// 	};

// 	const cancelEdit = () => {
// 		resetForm();
// 		toast.success('এডিট বাতিল করা হয়েছে');
// 	};

// 	// Filter products based on search term
// 	const filteredProducts = products.filter((product) => {
// 		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description?.toLowerCase().includes(searchTerm.toLowerCase());
// 		const matchesFilter = filterStatus === 'all' || (filterStatus === 'published' && product.isPublish) || (filterStatus === 'unpublished' && !product.isPublish);
// 		return matchesSearch && matchesFilter;
// 	});

// 	return (
// 		<div className="space-y-8">
// 			{/* Toggle Product List Button */}
// 			<div className="flex justify-between items-center">
// 				<h2 className="text-2xl font-bold text-white">{editingProduct ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যুক্ত করুন'}</h2>
// 				<button onClick={() => setShowProductList(!showProductList)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer">
// 					{showProductList ? 'ফর্ম দেখুন' : 'প্রোডাক্ট লিস্ট দেখুন'}
// 				</button>
// 			</div>

// 			{/* Product List Section */}
// 			{showProductList && (
// 				<div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
// 					{/* Search Bar */}
// 					<div className="mb-6 space-y-4">
// 						<input
// 							type="text"
// 							placeholder="প্রোডাক্ট সার্চ করুন..."
// 							value={searchTerm}
// 							onChange={(e) => setSearchTerm(e.target.value)}
// 							className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition"
// 						/>

// 						{/* Filter Buttons */}
// 						<div className="flex gap-2 flex-wrap">
// 							<button
// 								onClick={() => setFilterStatus('all')}
// 								className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
// 									filterStatus === 'all' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
// 								}`}
// 							>
// 								সব ({products.length})
// 							</button>
// 							<button
// 								onClick={() => setFilterStatus('published')}
// 								className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
// 									filterStatus === 'published' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
// 								}`}
// 							>
// 								পাবলিশ ({products.filter((p) => p.isPublish).length})
// 							</button>
// 							<button
// 								onClick={() => setFilterStatus('unpublished')}
// 								className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
// 									filterStatus === 'unpublished' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
// 								}`}
// 							>
// 								আনপাবলিশ ({products.filter((p) => !p.isPublish).length})
// 							</button>
// 						</div>
// 					</div>

// 					{/* Products Grid */}
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
// 						{filteredProducts.length === 0 ? (
// 							<div className="col-span-2 text-center py-8 text-slate-400">{searchTerm ? 'কোনো প্রোডাক্ট পাওয়া যায়নি' : 'কোনো প্রোডাক্ট নেই'}</div>
// 						) : (
// 							filteredProducts.map((product) => (
// 								<div
// 									key={product._id}
// 									className={`p-4 rounded-xl border transition ${
// 										product.isPublish ? 'border-green-600/50 hover:border-green-500' : 'border-slate-700 hover:border-slate-600 opacity-75'
// 									}`}
// 								>
// 									<div className="flex flex-col gap-4">
// 										<div className="flex gap-4">
// 											<img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
// 											<div className="flex-1">
// 												<div className="flex justify-between items-start">
// 													<h3 className="font-bold text-white text-lg">{product.name}</h3>
// 												</div>
// 												<p className="text-slate-400 text-sm mt-1">{product.description}</p>
// 												<div className="flex justify-between items-center mt-3">
// 													<div>
// 														<p className="text-green-400 font-bold">৳{product.price}</p>
// 														<p className="text-slate-500 text-sm">{product.weight}</p>
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="flex gap-2">
// 											<button
// 												onClick={() => togglePublishStatus(product._id, product.isPublish)}
// 												className={`flex-1 px-3 py-1 rounded-lg text-sm cursor-pointer transition ${
// 													product.isPublish ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
// 												}`}
// 											>
// 												{product.isPublish ? 'আনপাবলিশ' : 'পাবলিশ'}
// 											</button>
// 											<button
// 												onClick={() => handleEdit(product)}
// 												className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm cursor-pointer transition"
// 											>
// 												এডিট
// 											</button>
// 											<button
// 												onClick={() => setDeleteConfirm(product._id)}
// 												className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm cursor-pointer transition"
// 											>
// 												ডিলিট
// 											</button>
// 										</div>
// 									</div>

// 									{/* Delete Confirmation */}
// 									{deleteConfirm === product._id && (
// 										<div className="mt-4 p-3 bg-red-900/20 border border-red-600 rounded-lg">
// 											<p className="text-red-400 text-sm mb-2">আপনি কি প্রোডাক্টটি ডিলিট করতে চান?</p>
// 											<div className="flex gap-2">
// 												<button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm cursor-pointer">
// 													হ্যাঁ, ডিলিট করুন
// 												</button>
// 												<button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm cursor-pointer">
// 													বাতিল
// 												</button>
// 											</div>
// 										</div>
// 									)}
// 								</div>
// 							))
// 						)}
// 					</div>

// 					<div className="mt-4 text-center text-slate-400 text-sm">মোট {filteredProducts.length} টি প্রোডাক্ট</div>
// 				</div>
// 			)}

// 			{/* Add/Edit Form */}
// 			{!showProductList && (
// 				<div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
// 					<form onSubmit={handleSubmit} className="space-y-6">
// 						{/* Name Input */}
// 						<div>
// 							<label className="block text-sm font-medium text-slate-400 mb-2">প্রোডাক্টের নাম</label>
// 							<input
// 								type="text"
// 								required
// 								placeholder="উদাহরণ: লেদার ব্যাগ"
// 								className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
// 								value={name}
// 								onChange={(e) => setName(e.target.value)}
// 							/>
// 						</div>

// 						{/* Price Input */}
// 						<div>
// 							<label className="block text-sm font-medium text-slate-400 mb-2">প্রাইস (টাকা)</label>
// 							<input
// 								type="number"
// 								required
// 								placeholder="উদাহরণ: ৫৫০"
// 								className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
// 								value={price}
// 								onChange={(e) => setPrice(e.target.value)}
// 							/>
// 						</div>

// 						{/* Weight Input */}
// 						<div>
// 							<label className="block text-sm font-medium text-slate-400 mb-2">ওজন (গ্রাম/কেজি)</label>
// 							<input
// 								type="text"
// 								required
// 								placeholder="উদাহরণ: ৫০০ গ্রাম"
// 								className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
// 								value={weight}
// 								onChange={(e) => setWeight(e.target.value)}
// 							/>
// 						</div>

// 						<div>
// 							<label className="block text-sm font-medium text-slate-400 mb-2">বিবরণ</label>
// 							<input
// 								type="text"
// 								required
// 								placeholder="প্রোডাক্টের বিবরণ"
// 								className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 							/>
// 						</div>

// 						{/* Image Upload */}
// 						<div className="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-green-500 hover:bg-slate-800/50 transition-all duration-300">
// 							<input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
// 							<label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-3">
// 								{preview ? (
// 									<img src={preview} className="h-32 w-32 object-cover rounded-lg shadow-lg border border-slate-700" alt="preview" />
// 								) : (
// 									<div className="py-4 text-slate-500">
// 										<span className="text-4xl block mb-2">+</span>
// 										ইমেজ আপলোড করুন
// 									</div>
// 								)}
// 							</label>
// 						</div>

// 						{/* Publish Status Toggle */}
// 						<div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
// 							<label className="block text-sm font-medium text-slate-400 mb-3">পাবলিশ স্ট্যাটাস</label>
// 							<div className="flex items-center gap-4">
// 								<div className="flex flex-col sm:flex-row gap-3 w-full">
//     {/* Publish Button */}
//     <button
//         type="button"
//         onClick={() => setIsPublish(true)}
//         className={`flex-1 py-2 px-3 sm:py-3 sm:px-4 rounded-lg border-2 transition cursor-pointer ${
//             isPublish 
//             ? 'bg-green-600 border-green-600 text-white' 
//             : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-green-600'
//         }`}
//     >
//         <div className="flex items-center justify-center gap-2">
//             <span className="text-lg sm:text-xl">✓</span>
//             <span className="font-bold text-sm sm:text-base">পাবলিশ</span>
//         </div>
//         <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 opacity-80">ওয়েবসাইটে দেখাবে</p>
//     </button>

//     {/* Unpublish Button */}
//     <button
//         type="button"
//         onClick={() => setIsPublish(false)}
//         className={`flex-1 py-2 px-3 sm:py-3 sm:px-4 rounded-lg border-2 transition cursor-pointer ${
//             !isPublish 
//             ? 'bg-red-600 border-red-600 text-white' 
//             : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-red-600'
//         }`}
//     >
//         <div className="flex items-center justify-center gap-2">
//             <span className="text-lg sm:text-xl">✗</span>
//             <span className="font-bold text-sm sm:text-base">আনপাবলিশ</span>
//         </div>
//         <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 opacity-80">ওয়েবসাইটে দেখাবে না</p>
//     </button>
// </div>
// 							</div>
// 						</div>

// 						{/* Buttons */}
// 						<div className="flex gap-3">
// 							<button
// 								disabled={loading}
// 								type="submit"
// 								className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-green-900/20 disabled:opacity-50 cursor-pointer"
// 							>
// 								{loading ? 'আপলোড হচ্ছে...' : editingProduct ? 'প্রোডাক্ট আপডেট করুন' : 'প্রোডাক্ট পাবলিশ করুন'}
// 							</button>

// 							{editingProduct && (
// 								<button type="button" onClick={cancelEdit} className="px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition cursor-pointer">
// 									বাতিল
// 								</button>
// 							)}
// 						</div>
// 					</form>
// 				</div>
// 			)}
// 		</div>
// 	);
// }



// new code start 
'use client';
import { useState, useEffect } from 'react';
import { uploadImageToCloudinary } from '../../hooks';
import toast from 'react-hot-toast';
import { useAuth } from '../../lib/firebase/AuthContext';
import { Package, Edit2, Trash2, Eye, EyeOff, Search, Plus, X, Upload, Check, Ban, ChevronLeft, Grid3x3, List } from 'lucide-react';

export default function AddProductForm() {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [weight, setWeight] = useState('');
	const [image, setImage] = useState(null);
	const [description, setDescription] = useState('');
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isPublish, setIsPublish] = useState(true);
	const { currentUser } = useAuth();

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [editingProduct, setEditingProduct] = useState(null);
	const [showProductList, setShowProductList] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [filterStatus, setFilterStatus] = useState('all');

	useEffect(() => {
		if (showProductList) {
			fetchProducts();
		}
	}, [showProductList]);

	const fetchProducts = async () => {
		try {
			const token = await currentUser?.getIdToken();
			const res = await fetch('/api/products/get?status=all', {
				headers: { 'Authorization': `Bearer ${token}` }
			});
			const data = await res.json();
			if (data.success) {
				setProducts(data.data);
			} else {
				toast.error('প্রোডাক্ট লোড করতে সমস্যা হয়েছে');
			}
		} catch (error) {
			console.error('Error fetching products:', error);
			toast.error('প্রোডাক্ট লোড করতে সমস্যা হয়েছে');
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast.error('Image size should be less than 5MB');
				return;
			}
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const resetForm = () => {
		setName('');
		setPrice('');
		setWeight('');
		setImage(null);
		if (preview) {
			URL.revokeObjectURL(preview);
		}
		setPreview(null);
		setDescription('');
		setIsPublish(true);
		setEditingProduct(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!image && !editingProduct) {
			return toast.error('দয়া করে একটি ইমেজ সিলেক্ট করুন!');
		}

		setLoading(true);

		try {
			let imageUrl = editingProduct ? editingProduct.image : null;

			if (image) {
				imageUrl = await uploadImageToCloudinary(image);
			}

			const endpoint = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products/post';
			const method = editingProduct ? 'PUT' : 'POST';
			const formattedData = {
				name,
				description,
				price: Number(price),
				image: imageUrl,
				weight,
				isPublish,
			};
			const token = await currentUser?.getIdToken();
			const response = await fetch(endpoint, {
				method,
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(formattedData),
			});

			const responseData = await response.json();

			if (!response.ok || !responseData.success) {
				throw new Error(responseData.error || 'ডাটা সেভ করতে সমস্যা হয়েছে');
			}

			toast.success(editingProduct ? 'প্রোডাক্ট আপডেট হয়েছে!' : 'প্রোডাক্ট সফলভাবে যোগ হয়েছে!');

			resetForm();
			if (showProductList) {
				fetchProducts();
			}
		} catch (error) {
			console.error('Error:', error);
			toast.error(error.message || 'আপলোডে সমস্যা হয়েছে!');
		} finally {
			setLoading(false);
		}
	};

	const togglePublishStatus = async (productId, currentStatus) => {
		try {
			const token = await currentUser?.getIdToken();
			const res = await fetch(`/api/products/${productId}/publish`, {
				method: 'PATCH',
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ isPublish: !currentStatus }),
			});
			const data = await res.json();

			if (data.success) {
				toast.success(!currentStatus ? 'প্রোডাক্ট পাবলিশ হয়েছে!' : 'প্রোডাক্ট আনপাবলিশ হয়েছে!');
				fetchProducts();
			} else {
				toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
			}
		} catch (error) {
			console.error('Error toggling publish status:', error);
			toast.error('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
		}
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
		setName(product.name);
		setPrice(product.price.toString());
		setWeight(product.weight);
		setDescription(product.description || '');
		setIsPublish(product.isPublish !== undefined ? product.isPublish : true);
		setPreview(product.image);
		setImage(null);
		setShowProductList(false);
		window.scrollTo({ top: 0, behavior: 'smooth' });
		toast.success('প্রোডাক্ট এডিট এর জন্য ফর্মে যুক্ত হয়েছে');
	};

	const handleDelete = async (productId) => {
		try {
			const token = await currentUser?.getIdToken();
			const res = await fetch(`/api/products/${productId}`, {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${token}` }
			});
			const data = await res.json();

			if (data.success) {
				toast.success('প্রোডাক্ট ডিলিট হয়েছে!');
				fetchProducts();
				setDeleteConfirm(null);
			} else {
				toast.error('ডিলিট করতে সমস্যা হয়েছে');
			}
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('ডিলিট করতে সমস্যা হয়েছে');
		}
	};

	const cancelEdit = () => {
		resetForm();
		toast.success('এডিট বাতিল করা হয়েছে');
	};

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
			product.description?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesFilter = filterStatus === 'all' || 
			(filterStatus === 'published' && product.isPublish) || 
			(filterStatus === 'unpublished' && !product.isPublish);
		return matchesSearch && matchesFilter;
	});

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
						{editingProduct ? 'Edit Product' : 'Product Management'}
					</h1>
					<p className="text-sm text-gray-500 mt-1">
						{editingProduct ? 'Update your product information' : 'Add new products to your store'}
					</p>
				</div>
				<button
					onClick={() => {
						setShowProductList(!showProductList);
						if (!showProductList) resetForm();
					}}
					className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
				>
					{showProductList ? <Plus className="w-4 h-4" /> : <Package className="w-4 h-4" />}
					<span className="text-sm font-medium">
						{showProductList ? 'Add New Product' : 'View All Products'}
					</span>
				</button>
			</div>

			{/* Product List Section */}
			{showProductList && (
				<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
					{/* Search and Filter Section */}
					<div className="p-4 sm:p-6 border-b border-gray-100">
						<div className="flex flex-col lg:flex-row gap-4">
							<div className="flex-1 relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search products by name or description..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
								/>
							</div>
							
							<div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
								<button
									onClick={() => setFilterStatus('all')}
									className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
										filterStatus === 'all'
											? 'bg-indigo-600 text-white shadow-sm'
											: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
									}`}
								>
									All ({products.length})
								</button>
								<button
									onClick={() => setFilterStatus('published')}
									className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
										filterStatus === 'published'
											? 'bg-emerald-600 text-white shadow-sm'
											: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
									}`}
								>
									Published ({products.filter((p) => p.isPublish).length})
								</button>
								<button
									onClick={() => setFilterStatus('unpublished')}
									className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
										filterStatus === 'unpublished'
											? 'bg-amber-600 text-white shadow-sm'
											: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
									}`}
								>
									Draft ({products.filter((p) => !p.isPublish).length})
								</button>
							</div>
						</div>
					</div>

					{/* Products Grid */}
					<div className="p-4 sm:p-6">
						{filteredProducts.length === 0 ? (
							<div className="text-center py-12 sm:py-16">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Package className="w-8 h-8 text-gray-400" />
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
								<p className="text-sm text-gray-500">
									{searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first product'}
								</p>
								{searchTerm && (
									<button
										onClick={() => setSearchTerm('')}
										className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
									>
										Clear search
									</button>
								)}
							</div>
						) : (
							<div className="space-y-4">
  {filteredProducts.map((product) => (
    <div
      key={product._id}
      className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Product Content */}
      <div className="p-4 sm:p-5">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                product.isPublish
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {product.isPublish ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-lg sm:text-xl font-bold text-indigo-600">৳{product.price}</p>
                <p className="text-xs text-gray-400">{product.weight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons - Clean and Professional */}
      <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Publish/Unpublish Button */}
          <button
            onClick={() => togglePublishStatus(product._id, product.isPublish)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:flex-1 ${
              product.isPublish
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {product.isPublish ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span>{product.isPublish ? 'Unpublish' : 'Publish'}</span>
          </button>

          {/* Edit Button */}
          <button
            onClick={() => handleEdit(product)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition w-full sm:flex-1"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setDeleteConfirm(product._id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition w-full sm:flex-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>

        {/* Delete Confirmation - Only shows when clicked */}
        {deleteConfirm === product._id && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-medium mb-3">Are you sure you want to delete this product?</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
						)}
					</div>

					{/* Footer */}
					{filteredProducts.length > 0 && (
						<div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-100">
							<p className="text-sm text-gray-500">
								Showing {filteredProducts.length} of {products.length} products
							</p>
						</div>
					)}
				</div>
			)}

			{/* Add/Edit Form */}
			{!showProductList && (
				<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
						<h2 className="text-xl sm:text-2xl font-bold text-gray-900">
							{editingProduct ? 'Edit Product' : 'Create New Product'}
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							{editingProduct ? 'Update the product details below' : 'Fill in the product information below'}
						</p>
					</div>

					<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 sm:space-y-6">
						<div className="grid grid-cols-1 gap-5 sm:gap-6">
							{/* Product Name */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1.5">
									Product Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									required
									placeholder="e.g., Premium Leather Bag"
									className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							{/* Price and Weight Row */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-1.5">
										Price (BDT) <span className="text-red-500">*</span>
									</label>
									<input
										type="number"
										required
										placeholder="e.g., 550"
										className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-1.5">
										Weight <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										placeholder="e.g., 500g, 1kg"
										className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
										value={weight}
										onChange={(e) => setWeight(e.target.value)}
									/>
								</div>
							</div>

							{/* Description */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1.5">
									Description <span className="text-red-500">*</span>
								</label>
								<textarea
									required
									placeholder="Describe your product in detail..."
									rows="4"
									className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							{/* Image Upload */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1.5">
									Product Image {!editingProduct && <span className="text-red-500">*</span>}
								</label>
								<div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition bg-gray-50">
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="hidden"
										id="fileInput"
									/>
									<label htmlFor="fileInput" className="cursor-pointer block">
										{preview ? (
											<div className="relative p-4">
												<img src={preview} className="h-32 w-32 object-cover rounded-lg mx-auto shadow-md" alt="preview" />
												<button
													type="button"
													onClick={(e) => {
														e.preventDefault();
														setPreview(null);
														setImage(null);
													}}
													className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
												>
													<X className="w-3 h-3" />
												</button>
											</div>
										) : (
											<div className="p-8 text-center">
												<Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
												<p className="text-gray-600 font-medium">Click to upload image</p>
												<p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
											</div>
										)}
									</label>
								</div>
							</div>

							{/* Publish Status */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">Publish Status</label>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<button
										type="button"
										onClick={() => setIsPublish(true)}
										className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition ${
											isPublish
												? 'border-emerald-500 bg-emerald-50 text-emerald-700'
												: 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
										}`}
									>
										<Check className="w-4 h-4" />
										<span className="font-medium">Publish Now</span>
									</button>
									<button
										type="button"
										onClick={() => setIsPublish(false)}
										className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition ${
											!isPublish
												? 'border-amber-500 bg-amber-50 text-amber-700'
												: 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
										}`}
									>
										<Ban className="w-4 h-4" />
										<span className="font-medium">Save as Draft</span>
									</button>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 pt-2">
								<button
									disabled={loading}
									type="submit"
									className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? (
										<div className="flex items-center justify-center gap-2">
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
											<span>Processing...</span>
										</div>
									) : (
										editingProduct ? 'Update Product' : 'Create Product'
									)}
								</button>

								{editingProduct && (
									<button
										type="button"
										onClick={cancelEdit}
										className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
									>
										Cancel
									</button>
								)}
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
//new code end 