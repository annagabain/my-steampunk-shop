export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  size?:string;
  availableSizes: string[];
}