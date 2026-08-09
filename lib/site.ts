export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://barokah-group.vercel.app';
export const whatsappSalesNumber = process.env.NEXT_PUBLIC_WHATSAPP_SALES_NUMBER || '201515311259';
export const whatsappGroupUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/G3F2MojXZLnG728TQ3nxV5?s=cl&p=i&mlu=4&amv=1';
export function whatsappUrl(message: string) { return `https://wa.me/${whatsappSalesNumber}?text=${encodeURIComponent(message)}`; }
