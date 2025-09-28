export interface CollectionProduct {
  id: number;
  primaryVariantId: number;
  vendor: string;
  variants: CollectionVariants[];
  title: string;
  handle: string;
  image: string;
  publishedAt: string;
  primaryPrice: string;
}

export interface CollectionVariants {
  id: number;
  available: boolean;
  title: string;
  price: string;
}
