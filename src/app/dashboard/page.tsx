'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { INITIAL_DEALERS, Dealer } from '@/lib/dealers';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { RoutedOrder } from '@/lib/orderRouting';
import { 
  Building2, 
  ShoppingBag, 
  QrCode, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  PackageCheck, 
  Truck, 
  MapPin, 
  Search, 
  Plus, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  DollarSign,
  User,
  Phone,
  ScanLine,
  Layers,
  Sparkles
} from 'lucide-react';

export default function VendorDealerDashboardPage() {
  const routedOrders = useCartStore((state) => state.routedOrders);
  const updateOrderStatus = useCartStore((state) => state.updateOrderStatus);
  const addRoutedOrder = useCartStore((state) => state.addRoutedOrder);

  // Active Dealer Account Selector (Default: PetroBazaar HQ Nacharam)
  const [selectedDealerId, setSelectedDealerId] = useState<string>('dealer-hyd-hq');
  const activeDealer = INITIAL_DEALERS.find((d) => d.id === selectedDealerId) || INITIAL_DEALERS[0];

  // Active Tab: 'orders' | 'pos' | 'qr' | 'analytics'
  const [activeTab, setActiveTab] = useState<'orders' | 'pos' | 'qr' | 'analytics'>('orders');

  // Offline POS Form State
  const [selectedProductId, setSelectedProductId] = useState<string>(INITIAL_PRODUCTS[0]?.id || '');
  const [posQty, setPosQty] = useState<number>(1);
  const [posCustomerName, setPosCustomerName] = useState<string>('');
  const [isScanningQR, setIsScanningQR] = useState<boolean>(false);
  const [posSuccessMsg, setPosSuccessMsg] = useState<string>('');

  // Filter orders for selected dealer
  const dealerOrders = routedOrders.filter(
    (o) => o.assignedDealer.id === activeDealer.id || activeDealer.id === 'dealer-hyd-hq'
  );

  const onlineOrders = dealerOrders.filter((o) => o.source === 'Online Auto-Routed');
  const offlineOrders = dealerOrders.filter((o) => o.source === 'Offline Counter');

  const totalOnlineRevenue = onlineOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOfflineRevenue = offlineOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleProcessOfflineSale = (e: React.FormEvent) => {
    e.preventDefault();
    const product = INITIAL_PRODUCTS.find((p) => p.id === selectedProductId) || INITIAL_PRODUCTS[0];
    const totalAmount = product.price_inr * posQty;

    const newOfflineOrder: RoutedOrder = {
      orderId: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: posCustomerName.trim() || 'Walk-in Counter Customer',
      customerPhone: '+91 90000 00000',
      pincode: activeDealer.pincode,
      address: `Over-the-Counter Sale at ${activeDealer.name}`,
      items: [{ product, quantity: posQty }],
      totalAmount,
      assignedDealer: activeDealer,
      distanceKm: 0.0,
      estimatedDeliveryTime: 'Instant Counter Sale',
      source: 'Offline Counter',
      status: 'delivered',
      createdAt: 'Just now'
    };

    addRoutedOrder(newOfflineOrder);
    setPosSuccessMsg(`✓ Offline Sale Recorded! POS Invoice ${newOfflineOrder.orderId} (₹${totalAmount.toLocaleString('en-IN')})`);
    setPosCustomerName('');
    setPosQty(1);
    setTimeout(() => setPosSuccessMsg(''), 4000);
  };

  const handleSimulateQRScan = () => {
    setIsScanningQR(true);
    setTimeout(() => {
      // Randomly pick a product SKU
      const randomProduct = INITIAL_PRODUCTS[Math.floor(Math.random() * INITIAL_PRODUCTS.length)];
      setSelectedProductId(randomProduct.id);
      setIsScanningQR(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Top Banner & Stockist Outlet Selector */}
      <div className="bg-gradient-to-r from-[#0A4D8C] via-[#083C6E] to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F5A623] text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" /> Authorized Dealer & Stockist Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Stockist Fulfillment & POS Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Manage auto-routed online orders, process offline counter sales with QR scanner, and track sales revenue analytics.
          </p>
        </div>

        {/* Stockist Outlet Dropdown Switcher */}
        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl shrink-0 w-full md:w-auto space-y-1.5">
          <label className="block text-[11px] font-bold text-blue-200 uppercase tracking-wider">
            Active Stockist Outlet:
          </label>
          <select
            value={selectedDealerId}
            onChange={(e) => setSelectedDealerId(e.target.value)}
            className="w-full p-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            {INITIAL_DEALERS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.city}) – {d.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Executive Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 text-[#0A4D8C] p-3 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Total Auto-Routed Orders</span>
            <span className="text-xl font-black text-slate-900">{dealerOrders.length} Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Online Routed Revenue</span>
            <span className="text-xl font-black text-emerald-600">₹ {totalOnlineRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 text-amber-700 p-3 rounded-2xl">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Offline Counter Sales</span>
            <span className="text-xl font-black text-amber-600">₹ {totalOfflineRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 text-purple-700 p-3 rounded-2xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Delivery SLA Guarantee</span>
            <span className="text-xl font-black text-purple-900">2-Hour Express</span>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#0A4D8C] text-white shadow-md'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
          <span>Online Auto-Routed Orders ({onlineOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pos')}
          className={`px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'pos'
              ? 'bg-[#0A4D8C] text-white shadow-md'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <ScanLine className="w-4 h-4 text-[#F5A623]" />
          <span>Offline Counter POS (QR Scanner)</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-[#0A4D8C] text-white shadow-md'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#F5A623]" />
          <span>Sales & Volume Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'qr'
              ? 'bg-[#0A4D8C] text-white shadow-md'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4 text-[#F5A623]" />
          <span>Shop QR Code & Marketing</span>
        </button>
      </div>

      {/* TAB 1: ONLINE AUTO-ROUTED ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between text-xs text-blue-900 font-semibold">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F5A623] shrink-0" />
              <span>
                Smart Routing Algorithm assigned these orders based on closest distance ({activeDealer.city}) & local inventory availability.
              </span>
            </div>
            <span className="bg-[#0A4D8C] text-white px-2.5 py-1 rounded-full font-bold text-[10px]">
              Active Outlet: {activeDealer.name}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {dealerOrders.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="font-bold">No assigned orders for this stockist outlet yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {dealerOrders.map((order) => (
                  <div key={order.orderId} className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{order.orderId}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          order.source === 'Online Auto-Routed'
                            ? 'bg-blue-100 text-[#0A4D8C]'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {order.source}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">({order.createdAt})</span>
                      </div>

                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#0A4D8C]" /> {order.customerName}
                        <Phone className="w-3.5 h-3.5 text-slate-400 ml-2" /> {order.customerPhone}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{order.address} (Distance: {order.distanceKm} km)</span>
                      </div>

                      {/* Items list */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                            {item.quantity}x {item.product.name} (₹{item.product.price_inr.toLocaleString('en-IN')})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Order Total & Status Controls */}
                    <div className="text-right space-y-2 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                      <div className="text-lg font-black text-[#0A4D8C]">
                        ₹ {order.totalAmount.toLocaleString('en-IN')}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.orderId, e.target.value as RoutedOrder['status'])}
                          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                        >
                          <option value="assigned">Status: Assigned</option>
                          <option value="accepted">Accepted by Dealer</option>
                          <option value="packing">Packing Order</option>
                          <option value="out_for_delivery">Out for Delivery (2-Hour)</option>
                          <option value="delivered">Delivered & Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: OFFLINE COUNTER POS (QR SCANNER) */}
      {activeTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Offline POS Entry Form (7 cols) */}
          <form onSubmit={handleProcessOfflineSale} className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                  Offline Walk-in Counter Sale (POS)
                </h2>
                <p className="text-xs text-slate-500">Enter product name or scan item barcode to deduct stock & log offline sales</p>
              </div>

              {/* QR Scanner Trigger */}
              <button
                type="button"
                onClick={handleSimulateQRScan}
                disabled={isScanningQR}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                <ScanLine className="w-4 h-4" />
                {isScanningQR ? 'Scanning Camera...' : 'Scan QR Barcode'}
              </button>
            </div>

            {posSuccessMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{posSuccessMsg}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Product SKU *</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                >
                  {INITIAL_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} – {p.name} (₹{p.price_inr.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sale Quantity (Liters / Drums / Containers) *</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={posQty}
                    onChange={(e) => setPosQty(parseInt(e.target.value) || 1)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Walk-in Customer Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad Auto Garage"
                    value={posCustomerName}
                    onChange={(e) => setPosCustomerName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A4D8C]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              {selectedProductId && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  {(() => {
                    const selected = INITIAL_PRODUCTS.find((p) => p.id === selectedProductId);
                    if (!selected) return null;
                    const total = selected.price_inr * posQty;
                    return (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Unit Price:</span>
                          <span className="font-bold text-slate-900">₹ {selected.price_inr.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Inventory Stock Remaining:</span>
                          <span className="font-bold text-emerald-700">{selected.stock_qty - posQty} units</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black">
                          <span className="text-slate-900">Total Counter Invoice:</span>
                          <span className="text-[#0A4D8C]">₹ {total.toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-sm font-extrabold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
              Process Counter POS Invoice & Deduct Stock
            </button>
          </form>

          {/* Right Column: POS Instructions & Simulated QR Scanner Visual (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-md">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <QrCode className="w-5 h-5 text-[#F5A623]" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider">
                  Real-time Barcode / QR POS Scanner
                </h3>
              </div>

              <div className="relative aspect-video bg-slate-950 border-2 border-dashed border-amber-400/60 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                <ScanLine className="w-12 h-12 text-[#F5A623] animate-pulse mb-2" />
                <span className="text-xs font-extrabold text-slate-200">Point Camera at Product Barcode</span>
                <span className="text-[10px] text-slate-400 mt-1">Automatically identifies SKU & fetches live database price</span>
              </div>

              <button
                onClick={handleSimulateQRScan}
                disabled={isScanningQR}
                className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-3 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                Simulate Camera QR Barcode Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SALES & VOLUME ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Sales Revenue Breakdown (Online Auto-Routed vs Offline Counter)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Online Sales Widget */}
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Online Auto-Routed Sales</span>
                  <span className="bg-[#0A4D8C] text-white text-[10px] font-bold px-2 py-0.5 rounded">2-Hour Delivery</span>
                </div>
                <div className="text-3xl font-black text-[#0A4D8C]">
                  ₹ {totalOnlineRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-blue-800">
                  Generated via PetroBazaar smart routing algorithm based on buyer distance & local stock availability.
                </p>
              </div>

              {/* Offline Sales Widget */}
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Offline Counter Walk-in Sales</span>
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">QR POS</span>
                </div>
                <div className="text-3xl font-black text-amber-700">
                  ₹ {totalOfflineRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-amber-800">
                  Logged directly over the shop counter via Stockist POS Barcode scanner.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SHOP QR CODE & MARKETING */}
      {activeTab === 'qr' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center max-w-2xl mx-auto">
          <div>
            <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Stockist In-Store Placement QR
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              {activeDealer.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Print & display this official QR Code sticker at your shop counter. Customers scan to order online for 2-hour doorstep delivery!
            </p>
          </div>

          <div className="w-56 h-56 bg-slate-900 p-4 rounded-3xl mx-auto shadow-xl border-4 border-[#F5A623] flex flex-col items-center justify-center text-white">
            <QrCode className="w-36 h-36 text-white" />
            <span className="text-[10px] font-bold tracking-widest text-[#F5A623] uppercase mt-2">
              SCAN TO ORDER ONLINE
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-[#0A4D8C] hover:bg-[#083C6E] text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all"
            >
              Print Official Counter QR Sticker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
