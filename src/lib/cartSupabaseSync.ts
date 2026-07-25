import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CartItem } from '@/types';

/**
 * Sync user cart items directly to Supabase DB 'cart_items' table
 */
export async function syncCartToSupabase(userId: string, cart: CartItem[]) {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    // Delete existing cart items for user
    await supabase.from('cart_items').delete().eq('user_id', userId);

    if (cart.length === 0) return;

    // Insert updated cart items
    const rows = cart.map((item) => ({
      user_id: userId,
      product_id: item.product.id,
      quantity: item.quantity,
      updated_at: new Date().toISOString()
    }));

    await supabase.from('cart_items').insert(rows);
  } catch (err) {
    console.warn('Supabase cart sync notice:', err);
  }
}

/**
 * Fetch saved cart items from Supabase DB for user
 */
export async function fetchCartFromSupabase(userId: string) {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('product_id, quantity, products(*)')
      .eq('user_id', userId);

    if (error || !data) return null;

    return data.map((row: any) => ({
      product: row.products,
      quantity: row.quantity
    }));
  } catch (err) {
    console.warn('Supabase cart fetch notice:', err);
    return null;
  }
}
