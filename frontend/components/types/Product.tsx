export interface IProduct {
  id: string;
  name: string;
  description: string;
  photo: { image: { publicUrlTransformed: string }; altText: string };
  image: string;
  price: number;
  status: string;
}
