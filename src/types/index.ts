export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrls?: string[];
  createdAt: Date;
}

export interface Basket {
    productId: number;
    price: number;
    quantity: number;
    createdAt: Date;
}

