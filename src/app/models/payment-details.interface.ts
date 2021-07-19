export interface PaymentDetails {
    userId?: string;
    cardHolderName?: string;
    cardNumber?: string;
    cardExpiration?: string;
    ccv?: string;
    address?: string;
    locale?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}