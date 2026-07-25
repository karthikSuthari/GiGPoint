'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { 
  LayoutDashboard, 
  Upload, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Package, 
  ArrowLeft, 
  ShieldCheck,
  Building2,
  Trash2,
  Edit3
} from 'lucide-react';

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Form State for Upload
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertFileName(e.target.files[0].name);
    }
  };

  const handleUploadProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !priceInr || !grade) {
      alert('Please fill in all required product fields.');
      return;
    }

    setIsUploading(true);

    const newProduct: Product = {
      id: `pb-dist-${Date.now()}`,
      category_id: 'cat-1',
      category_slug: categorySlug,
      name: productName,
      brand,
      grade,
      description: description || `${productName} supplied by PetroBazaar authorized regional stockist.`,
      price_inr: parseFloat(priceInr),
      unit,
      stock_qty: parseInt(stockQty) || 1000,
      image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
      spec_sheet: {
        'Gross Calorific Value': gcv,
        'Kinematic Viscosity': viscosity,
        'Flash Point': flashPoint,
        'Batch Certificate': certFileName ? `Verified (${certFileName})` : 'Attached PDF Report'
      },
      is_bulk_available: true
    };

    setTimeout(() => {
      setProducts([newProduct, ...products]);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      // Reset form
      setProductName('');
      setPriceInr('');
      setDescription('');
      setCertFileName('');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" /> Merchant & Distributor Vendor Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Distributor Product & Batch Upload Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Upload new industrial fuel lots, bitumen batches, or engine oils with batch test reports directly to the PetroBazaar database.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Product successfully uploaded to PetroBazaar Live Database & Catalog!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form (2 Cols) */}
        <form onSubmit={handleUploadProduct} className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Upload className="w-5 h-5 text-[#0A4D8C]" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Upload New Product / Liquid Fuel Batch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. PetroBazaar Low Viscosity Fuel Oil (LVFO)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              >
                <option value="industrial-fuel">Industrial Fuel Oils (FO/LDO)</option>
                <option value="engine-oil">Engine & Diesel Oils</option>
                <option value="bitumen">Bitumen & Construction</option>
                <option value="pyrolysis-bio">Pyrolysis & Bio-Fuels</option>
                <option value="grease">Grease & Special Lubricants</option>
                <option value="coolant-brake">Brake Fluids & Coolants</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Brand Name</label>
              <input
                type="text"
                placeholder="e.g. PetroBazaar / Servo / HP"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Grade / SAE Rating *</label>
              <input
                type="text"
                required
                placeholder="e.g. FO 180 cSt / VG-30"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Price (₹ INR) *</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="e.g. 54.20"
                value={priceInr}
                onChange={(e) => setPriceInr(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Unit / Packaging</label>
              <input
                type="text"
                placeholder="e.g. Liter (Bulk Tanker) / 15L Can"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stock Quantity</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Product Description</label>
            <textarea
              rows={2}
              placeholder="Enter details about calorific value, pumpability, or engine application..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
            />
          </div>

          {/* Technical Specs Inputs */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Technical Specs Sheet Inputs
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Calorific Value (GCV)</label>
                <input
                  type="text"
                  placeholder="10,200 kcal/kg"
                  value={gcv}
                  onChange={(e) => setGcv(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Viscosity</label>
                <input
                  type="text"
                  placeholder="180 cSt @ 50°C"
                  value={viscosity}
                  onChange={(e) => setViscosity(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Flash Point</label>
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

          {/* Upload Certificate PDF / Image */}
          <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 text-center space-y-2">
            <FileText className="w-8 h-8 text-[#0A4D8C] mx-auto" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Attach Batch Quality & Viscosity Test Report (PDF / Certificate)
              </span>
              <span className="text-[11px] text-slate-500">
                {certFileName ? `Attached: ${certFileName}` : 'Drag and drop file or click to browse'}
              </span>
            </div>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
              id="batch-cert-input"
            />
            <label
              htmlFor="batch-cert-input"
              className="inline-block bg-[#0A4D8C] text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-[#083C6E]"
            >
              Select Batch PDF Certificate
            </label>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-bold py-3.5 rounded-xl shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-[#F5A623]" />
            {isUploading ? 'Publishing to Database...' : 'Publish Product Listing to PetroBazaar Live DB'}
          </button>
        </form>

        {/* Live Distributor Listings Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Your Active DB Listings</span>
              <span className="bg-blue-50 text-[#0A4D8C] text-xs font-bold px-2 py-0.5 rounded">
                {products.length} Items
              </span>
            </h3>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase bg-[#0A4D8C] text-white px-2 py-0.5 rounded">
                      {p.grade}
                    </span>
                    <span className="text-xs font-bold text-[#0A4D8C]">
                      ₹ {p.price_inr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                  <p className="text-[11px] text-slate-500">{p.unit} • Stock: {p.stock_qty.toLocaleString('en-IN')}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Certificate Verified
                    </span>
                    <button
                      onClick={() => setProducts(products.filter((item) => item.id !== p.id))}
                      className="text-slate-400 hover:text-rose-600"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
