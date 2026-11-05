export const environment = {
  production: import.meta.env.PROD,
  businessEmail: import.meta.env.VITE_BUSINESS_EMAIL || '',
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
    feedbackTemplateId: import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};
