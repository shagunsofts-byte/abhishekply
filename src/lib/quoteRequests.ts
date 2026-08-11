import { QuoteItem } from '../context/QuoteContext';

export interface QuoteRequestPayload {
  customerName: string;
  customerPhone: string;
  note?: string;
  items: {
    productId: string;
    name: string;
    brand: string;
    qty: number;
  }[];
}

/**
 * Writes a new quote request to Firestore so it shows up for the admin in real time
 * on the /admin/quotes dashboard. This is best-effort: if it fails (e.g. offline,
 * or Firestore rules reject it), we swallow the error because the WhatsApp message
 * is the guaranteed delivery path for the enquiry.
 *
 * Firebase is dynamically imported here so the ~700KB SDK only loads when a customer
 * actually submits a quote, instead of bloating the main app bundle for everyone.
 */
export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<boolean> {
  try {
    const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
      import('firebase/firestore'),
      import('../firebase_config'),
    ]);
    await addDoc(collection(db, 'quoteRequests'), {
      ...payload,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.warn('Quote request could not be saved to Firestore (WhatsApp message still sent):', err);
    return false;
  }
}

export function buildQuoteWhatsAppMessage(items: QuoteItem[], customerName?: string): string {
  const lines = [
    `Hi, I would like a quote for the following item${items.length !== 1 ? 's' : ''}:`,
    '',
    ...items.map(
      (i, idx) => `${idx + 1}. ${i.product.name} (${i.product.brand}) — Qty: ${i.qty}`
    ),
    '',
    customerName ? `Name: ${customerName}` : '',
    'Please share pricing and availability. Thank you!',
  ].filter(Boolean);
  return lines.join('\n');
}
