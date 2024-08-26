export interface shippingRes {
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}


export interface cashRes {
  status: string;
  data: Data;
}

export interface Data {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface Shipping {
  details: string;
  phone: string;
  city: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}




export interface cardRes {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
}