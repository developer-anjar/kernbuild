export const environment = {
  production: false,
  apiBaseUrl: '/api',
  // Set to true when a Spring Boot backend is connected
  backendAvailable: false,
  // Configurable social links - hide if empty
  socialLinks: {
    linkedin: '',
    github: '',
    instagram: '',
  },
  // Configurable business email
  businessEmail: '',
  emailJs: {
    publicKey: '',
    serviceId: '',
    templateId: '',
  },
  // Demo mode flag - shows placeholder data with labels
  demoMode: true,
};
