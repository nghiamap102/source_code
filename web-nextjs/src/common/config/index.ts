// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const TALON_BASE_URL = 'https://talon.dev.bipbip.com'
// export const TALON_BASE_URL = process.env.NEXT_PUBLIC_BASE_TALON_URL;
// export const CHANNEL = process.env.NEXT_PUBLIC_CHANEL ?? "bipbipapp";
import { GET, POST, DELETE, PUT, PATCH, DEFAULT_URL } from './api.method'

export { GET, POST, DELETE, PUT, PATCH, DEFAULT_URL }
export const CHANNEL = 'bipbipweb'
export const PLATFORM_KEY = 'centralweb'

export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '1082242288020-f6s90mgc86irdjj4ro806nq6k8728je0.apps.googleusercontent.com'

export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '680709393381022'

export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || 'effa63de-0736-4082-8bd9-1361df2b3633'

export const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || '123456'

export const URL_ID = process.env.NEXT_PUBLIC_IDENTIFY_URL
const URL_CMS = process.env.NEXT_PUBLIC_CMS_URL
const URL_ECOM = process.env.NEXT_PUBLIC_ECOM_URL
const URL_MOCK = 'http://localhost:3004'
const LANG = {
  en: 'en'
}
const API = {
  CMS: {
    RECIPE_LIST_HOMEPAGE_CAROUSEL_URL: `${URL_CMS}/api/${LANG.en}/carousel`,
    RECIPE_LIST_MORE_RECIPES_URL: `${URL_CMS}/api/${LANG.en}/recipe/more-recipe`,
    RECIPE_LIST_TOP_RATING_RECIPES_URL: `${URL_CMS}/api/${LANG.en}/recipe/top-rating`,
    RECIPE_LIST_RECIPE_CATEGORY_URL: `${URL_CMS}/api/${LANG.en}/recipe/category`,
    RECIPE_LIST_RECIPE_RECOMMEND_ANONYMOUS_USER_URL: `${URL_CMS}/api/${LANG.en}/recipe/recommend/anonymous`,
    RECIPE_LIST_RECIPE_AUTHENTICATED_USER_URL: `${URL_CMS}/api/${LANG.en}/recipe/recommend/authenticated`,
    RECIPE_LIST_RECIPE_FEATURE_URL: `${URL_CMS}/api/${LANG.en}/recipe/featured`,
    MAIN_MENU_WEB_URL: `${URL_CMS}/api/${LANG.en}/menu_items_extras/web-main-menu`,
    RECIPE_DETAIL_URL: `${URL_CMS}/api/${LANG.en}/recipe`,
    RECIPE_DETAIL_UPLOAD_FILE_REVIEW_URL: `${URL_CMS}/file/upload/comment/recipe_review/field_image`,
    RECIPE_DETAIL_POST_REVIEW_URL: `${URL_CMS}/api/recipe/comment`,
    RECIPE_DETAIL_LIKE_REVIEW_URL: `${URL_CMS}/api/flag`,
    RECIPE_DETAIL_UNLIKE_REVIEW_URL: `${URL_CMS}/api/unflag`,
    RECIPE_SEARCH_RECIPE_URL: `${URL_CMS}/api/${LANG.en}/search/recipe/options`,
    RECIPE_SORT_RECIPE_URL: `${URL_CMS}/api/${LANG.en}/recipe/sort`,
    RECIPE_RELATED_DETAIL_URL: `${URL_CMS}/api/${LANG.en}/recipe`,
    SEARCH_RECIPE: `${URL_CMS}/api/${LANG.en}/search`,
    SEARCH_RECIPE_OPTION: `${URL_CMS}/api/${LANG.en}/search/recipe/options`,
    GET_DATA_COLLECTION: `${URL_CMS}/api/${LANG.en}/vocabulary`,

    GET_AD_BANNER_URL: `${URL_CMS}/api/${LANG.en}/ad-banner`,

    ARTICLE_LIST_GET_MOST_VIEW_ARTICLE_URL: `${URL_CMS}/api/${LANG.en}/article/most-view`,
    ARTICLE_LIST_ARTICLE_CATEGORY_URL: `${URL_CMS}/api/${LANG.en}/article/category`,
    ARTICLE_LIST_ARTICLE_RECOM_URL: `${URL_CMS}/api/${LANG.en}/article/recommend`,
    GET_POLL: `${URL_CMS}/api/${LANG.en}/poll`,
    POST_POLL: `${URL_CMS}/api/poll`,

    GET_ARTICLE_DETAILS: `${URL_CMS}/api/${LANG.en}/article`,

    // RECIPE_RELATED_DETAIL_URL: `http://localhost:3004/api/en/recipe/{ID}`
    CAROUSEL_URL: `${URL_CMS}/api/${LANG.en}/carousel`
  },
  ECOM: {},
  IDENTIFY: {
    LOGIN_URL: `${URL_ID}/oauth/token`,
    NEW_LOGIN_URL: `${URL_ID}/api/user/login`,
    REGISTER_URL: `${URL_ID}/api/user/register`,
    LOGOUT_URL: `${URL_ID}/api/user/logout`,
    SESSION_TOKEN_URL: `${URL_ID}/session/token`,
    VERIFYOTP_URL: `${URL_ID}/api/otp/{{uid}}/{{hash}}/verify`,
    VERIFY_OTP_EMAIL_URL: `${URL_ID}/api/otp/mail`,
    VERIFY_OTP_SMS_URL: `${URL_ID}/api/otp/sms`,
    OTP_URL: `${URL_ID}/api/otp`,
    FOGOTPASS_URL: `${URL_ID}/api/user/forgot-password`,
    RESETPASS_URL: `${URL_ID}/api/user/reset-password`,
    COUNTRIES_URL: `${URL_ID}/api/location/countries`,
    USER_INFO_URL: `${URL_ID}/api/user/info`,
    EDIT_USER_INFO_URL: `${URL_ID}/api/user/edit`
  },
  MOCK: {
    SEARCH_BAR: 'https://624268b0b6734894c150667a.mockapi.io/test/city/?name=',
    CAROUSEL: `${URL_MOCK}/carousel`,
    RECIPE_FETURE: `${URL_MOCK}/recipe-featured`
  }
}

export default API

// export const API_SKU_URL = `${BASE_URL}/ms-sku/api`
// export const API_CATEGORY_URL = `${BASE_URL}/ms-category/api`
// export const API_LIST_SKU_STORAGE_URL = `${BASE_URL}/ms-list-sku-storage/api`
// export const API_ELASTICSEARCH_URL = `${BASE_URL}/ms-elasticsearch/api`
// export const API_LOCATION_URL = `${BASE_URL}/ms-location-tree/api`
// export const API_CUSTOMER_URL = `${BASE_URL}/ms-customer/api`
// export const API_ORDER_MANAGEMENT_URL = `${BASE_URL}/ms-order-management/api`
// export const API_STATION_URL = `${BASE_URL}/ms-station/api`
// export const API_SETTING_URL = `${BASE_URL}/ms-setting/api`
// export const API_SHIPPING_URL = `${BASE_URL}/ms-shipping/api`
// export const API_CART_MANAGEMENT_URL = `${BASE_URL}/ms-cart-management/api`
// export const API_CART_STOCK_URL = `${BASE_URL}/ms-stock/api`
// export const API_NOTIFICATION_URL = `${BASE_URL}/ms-notification/api`
// export const API_FAVORITE_MANAGEMENT_URL = `${BASE_URL}/ms-favorite-management/api`
// export const API_PRODUCT_URL = `${BASE_URL}/ms-product/api`
// export const API_META_DATA_URL = `${BASE_URL}/ms-setting/api/meta-data`
// /ms-stock/api/stock/check-stock-prior-order

// export const API_COUPONS_URL = `${TALON_BASE_URL}/api/talon/coupons`
