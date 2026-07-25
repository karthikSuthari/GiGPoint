'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { 
  ShieldCheck, 
  Upload, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Package, 
  ArrowLeft, 
  Building2,
  Trash2,
  Edit3,
  Search,
  User,
  LayoutDashboard,
  Layers,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function AdminAddItemsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState('');

  // Form State for Add Item
  const [productName, setProductName] = useState('');
  const [categorySlug, setCategorySlug] = useState('industrial-fuel');
  const [brand, setBrand] = useState('PetroBazaar');
  const [grade, setGrade] = useState('FO 180 cSt');
  const [priceInr, setPriceInr] = useState('');
  const [unit, setUnit] = useState('Liter (Bulk Tanker)');
  const [stockQty, setStockQty] = useState('50000');
  const [description, setDescription] = useState('');
  const [gcv, setGcv] = useState('10,200 kcal/kg');
  const [viscosity, setViscosity] = useState('180 cSt');
  const [flashPoint, setFlashPoint] = useState('66°C');
  const [certFileName, setCertFileName] = useState('');
  const [isBulkAvailable, setIsBulkAvailable] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertFileName(e.target.files[0].name);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !priceInr || !grade) {
      alert('Please fill in all required product fields (Product Title, Grade, and Price).');
      return;
    }

    setIsUploading(true);

    const newProduct: Product = {
      id: `pb-admin-${Date.now()}`,
      category_id: 'cat-1',
      category_slug: categorySlug,
      name: productName,
      brand,
      grade,
      description: description || `${productName} added by PetroBazaar Admin Portal. Guaranteed certified batch.`,
      price_inr: parseFloat(priceInr),
      unit,
      stock_qty: parseInt(stockQty) || 1000,
      image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
      spec_sheet: {
        'Gross Calorific Value': gcv || '10,200 kcal/kg',
        'Kinematic Viscosity': viscosity || '180 cSt',
        'Flash Point': flashPoint || '66°C',
        'Batch Certificate': certFileName ? `Verified (${certFileName})` : 'Attached PDF Report'
      },
      is_bulk_available: isBulkAvailable
    };

    setTimeout(() => {
      setProducts([newProduct, ...products]);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);

      // Reset form
      setProductName('');
      setPriceInr('');
      setDescription('');
      setCertFileName('');
      setGrade('');
    }, 600);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product listing from the database?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSavePriceEdit = (id: string) => {
    const numericPrice = parseFloat(editPriceValue);
    if (!isNaN(numericPrice) && numericPrice > 0) {
      setProducts(
        products.map((p) => (p.id === id ? { ...p, price_inr: numericPrice } : p))
      );
    }
    setEditingPriceId(null);
    setEditPriceValue('');
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category_slug === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalStockVolume = products.reduce((sum, p) => sum + p.stock_qty, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl transition-colors"
        >
          <User className="w-4 h-4 text-[#0A4D8C]" /> View Admin Profile
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin & Merchant Management Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Add New Products & Manage Inventory
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Direct access page for PetroBazaar admins to publish new lubricants, industrial fuel lots, bitumen batches, and update prices in real time.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur border border-white/20 p-3.5 rounded-2xl text-center">
            <span className="text-2xl font-black text-[#F5A623]">{products.length}</span>
            <span className="text-[11px] block text-slate-200 font-semibold mt-0.5">Live Items</span>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 p-3.5 rounded-2xl text-center">
            <span className="text-2xl font-black text-emerald-400">
              {(totalStockVolume / 1000).toFixed(0)}k
            </span>
            <span className="text-[11px] block text-slate-200 font-semibold mt-0.5">Stock Volume</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {uploadSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Product successfully created and published to PetroBazaar Live Database & Catalog!</span>
        </div>
      )}

      {/* Main Grid: Add Product Form + Inventory Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Add New Item (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-2 bg-blue-50 text-[#0A4D8C] rounded-xl font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Add New Item / Batch
              </h2>
              <p className="text-[11px] text-slate-500">Fill details to add a new product to catalog</p>
            </div>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Servo Futura Synthetic Engine Oil 5W-40"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                >
                  <option value="industrial-fuel">Industrial Fuels (FO/LDO)</option>
                  <option value="engine-oil">Engine & Diesel Oils</option>
                  <option value="bitumen">Bitumen & Construction</option>
                  <option value="pyrolysis-bio">Pyrolysis & Bio-Fuels</option>
                  <option value="grease">Grease & Special Lubes</option>
                  <option value="coolant-brake">Coolants & Brake Fluids</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PetroBazaar / Servo / Mobil"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grade / Rating *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FO 180 cSt / SAE 15W-40"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Price (₹ INR) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="e.g. 350.00"
                  value={priceInr}
                  onChange={(e) => setPriceInr(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Packaging / Unit</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Liter Can / Liter Bulk"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Available Stock Qty</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Product description, applications, and specs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            {/* Technical Specs Accordion */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Technical Specifications & Testing
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <label className="block text-slate-500 mb-0.5">GCV</label>
                  <input
                    type="text"
                    placeholder="10,200 kcal"
                    value={gcv}
                    onChange={(e) => setGcv(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-0.5">Viscosity</label>
                  <input
                    type="text"
                    placeholder="180 cSt"
                    value={viscosity}
                    onChange={(e) => setViscosity(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-0.5">Flash Point</label>
                  <input
                    type="text"
                    placeholder="66°C"
                    value={flashPoint}
                    onChange={(e) => setFlashPoint(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Upload PDF Certificate */}
            <div className="p-3 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 text-center">
              <FileText className="w-6 h-6 text-[#0A4D8C] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-900 block">
                {certFileName ? `Attached: ${certFileName}` : 'Attach Batch Quality Report (PDF)'}
              </span>
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                className="hidden"
                id="admin-cert-input"
              />
              <label
                htmlFor="admin-cert-input"
                className="inline-block mt-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[11px] px-3 py-1 rounded-lg cursor-pointer"
              >
                Browse File
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#F5A623]" />
              {isUploading ? 'Adding Product to Database...' : 'Add Item to Catalog'}
            </button>
          </form>
        </div>

        {/* Right Listing Table: Manage Items (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Live Admin Catalog ({filteredProducts.length})
              </h2>
              <p className="text-[11px] text-slate-500">Edit prices, adjust stock, or remove items</p>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0A4D8C]"
                />
              </div>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No products found matching your search.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#0A4D8C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        {product.grade}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">{product.brand}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{product.name}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Unit: {product.unit}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">Stock: {product.stock_qty.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <div className="text-right">
                      {editingPriceId === product.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold">₹</span>
                          <input
                            type="number"
                            step="0.1"
                            value={editPriceValue}
                            onChange={(e) => setEditPriceValue(e.target.value)}
                            className="w-20 p-1 border border-[#0A4D8C] rounded text-xs font-bold"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSavePriceEdit(product.id)}
                            className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-black text-[#0A4D8C] flex items-center gap-1 justify-end">
                            ₹ {product.price_inr.toLocaleString('en-IN')}
                            <button
                              onClick={() => {
                                setEditingPriceId(product.id);
                                setEditPriceValue(product.price_inr.toString());
                              }}
                              className="text-slate-400 hover:text-[#0A4D8C]"
                              title="Quick edit price"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 justify-end">
                            <ShieldCheck className="w-3 h-3" /> Certified Batch
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete product item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
