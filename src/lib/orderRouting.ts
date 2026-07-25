import { INITIAL_DEALERS, Dealer } from './dealers';
import { Product } from '@/types';

export interface RoutedOrder {
  orderId: string;
  customerName: string;
  customerPhone: string;
  pincode: string;
  address: string;
  items: { product: Product; quantity: number }[];
  totalAmount: number;
  assignedDealer: Dealer;
  distanceKm: number;
  estimatedDeliveryTime: string;
  source: 'Online Auto-Routed' | 'Offline Counter';
  status: 'assigned' | 'accepted' | 'packing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
}

/**
 * Smart Order Routing Algorithm:
 * Finds the nearest stockist/dealer that has stock available
 * based on buyer pincode / location distance & stock inventory.
 */
export function routeOrderToNearestDealer(
  pincode: string,
  city: string,
  items: { product: Product; quantity: number }[]
): { assignedDealer: Dealer; distanceKm: number; estimatedDeliveryTime: string } {
  // 1. Calculate matching score or distance for each dealer
  const scoredDealers = INITIAL_DEALERS.map((dealer) => {
    let distanceKm = dealer.distance_km;

    // Check pincode proximity (Hyderabad 500xxx, Pune 411xxx, Mumbai 421xxx, etc.)
    const userPrefix = pincode.slice(0, 3);
    const dealerPrefix = dealer.pincode.slice(0, 3);

    if (userPrefix === dealerPrefix) {
      distanceKm = Math.min(distanceKm, 3.5);
    } else if (dealer.city.toLowerCase() === city.toLowerCase()) {
      distanceKm = Math.min(distanceKm, 8.0);
    } else {
      distanceKm += 25.0; // Penalty for out-of-city dealers
    }

    // 2. Check stock availability score
    const hasAllProducts = items.every(
      (item) => item.product.stock_qty >= item.quantity
    );

    return {
      dealer,
      distanceKm: parseFloat(distanceKm.toFixed(1)),
      hasStock: hasAllProducts
    };
  });

  // Sort by stock availability first, then by closest distance
  scoredDealers.sort((a, b) => {
    if (a.hasStock !== b.hasStock) return a.hasStock ? -1 : 1;
    return a.distanceKm - b.distanceKm;
  });

  const bestMatch = scoredDealers[0] || {
    dealer: INITIAL_DEALERS[0],
    distanceKm: 4.2,
    hasStock: true
  };

  let estimatedDeliveryTime = '2-Hour Local Express Delivery';
  if (bestMatch.distanceKm > 15) {
    estimatedDeliveryTime = 'Same-Day Regional Tanker Dispatch';
  } else if (bestMatch.distanceKm > 30) {
    estimatedDeliveryTime = '24-Hour Interstate Dispatch';
  }

  return {
    assignedDealer: bestMatch.dealer,
    distanceKm: bestMatch.distanceKm,
    estimatedDeliveryTime
  };
}
