export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

const fbq = (...args) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
};

export const pageview = () => {
  fbq("track", "PageView");
};

export const event = (name, options = {}) => {
  fbq("track", name, options);
};

// --- E-commerce events ---

export const viewContent = (product) => {
  fbq("track", "ViewContent", {
    content_name: product.name,
    content_ids: [product.id || product._id],
    content_type: "product",
    value: product.price,
    currency: "BDT",
  });
};

export const addToCart = (product) => {
  fbq("track", "AddToCart", {
    content_name: product.name,
    content_ids: [product.id || product._id],
    content_type: "product",
    value: product.price,
    currency: "BDT",
  });
};

export const initiateCheckout = (products, total) => {
  fbq("track", "InitiateCheckout", {
    content_ids: products.map((p) => p.id || p._id),
    content_type: "product",
    value: total,
    currency: "BDT",
    num_items: products.length,
  });
};

export const addPaymentInfo = (total, options = {}) => {
  fbq("track", "AddPaymentInfo", {
    value: total,
    currency: "BDT",
    ...options,
  });
};

export const purchase = (order) => {
  fbq("track", "Purchase", {
    content_ids: order.products.map((p) => p.id || p._id),
    content_type: "product",
    value: order.total,
    currency: "BDT",
    num_items: order.products.length,
  });
};

export const trackDownloadInvoice = (order) => {
  fbq("trackCustom", "DownloadInvoice", {
    order_id: order.id || order._id,
    value: order.total || order.value,
    currency: "BDT",
  });
};

export const contact = (name = "Contact") => {
  fbq("track", "Contact", {
    content_name: name,
  });
};

export const lead = (name, category) => {
  fbq("track", "Lead", {
    content_name: name,
    content_category: category,
  });
};

export const trackCustom = (name, options = {}) => {
  fbq("trackCustom", name, options);
};