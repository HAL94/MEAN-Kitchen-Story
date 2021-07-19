// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HTTP_URLS: {
    SIGN_UP: 'http://localhost:3000/api/users/signup',
    SIGN_IN: 'http://localhost:3000/api/users/login',
    GET_USER: 'http://localhost:3000/api/users/',

    PRODUCTS: 'http://localhost:3000/api/products/',
    PRODUCTS_SEARCH: 'http://localhost:3000/api/products/search',
    CATEGORIES: 'http://localhost:3000/api/categories/',
    CUSTOMERS: 'http://localhost:3000/api/users',
    RESET_PW: 'http://localhost:3000/api/users/reset-password/',
    CART: 'http://localhost:3000/api/cart',
    CART_DELETE: 'http://localhost:3000/api/cart/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
