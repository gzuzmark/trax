/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { KeystoneContext } from '@keystone-6/core/types';
import { FileUpload, Upload } from '../node_modules/graphql-upload';
// import { Upload } from '../node_modules/graphql-upload/';
import { ProductImage } from '../schemas/ProductImage';
// import Upload = require('graphql-upload/Upload.js');
import { products } from './data';

// type ProductProps = {
//   name: string;
//   description: string;
//   status: string;
//   photo: any;
// };

// type ProductImageProps = Record<string | number, string> & {
//   _meta: Record<any, any>;
// };
// export async function insertSeedData2(context: KeystoneContext) {
//   // Keystone API changed, so we need to check for both versions to get keystone
//   // console.log('🌱 Inserting seed data');

//   const createProductImage = async (productData: ProductProps) => {
//     console.log('🌱 Creating product image', { productData });
//     // let productImage = await context.query.ProductImage.findOne({
//     //   where: { id: productImageData.id },
//     //   query: 'id',
//     // });

//     // const upload = new Upload();
//     // upload.file = productData.photo;
//     // upload.promise.then(async (data) => {
//     //   if (data !== undefined) {
//     //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     //     console.log('🌱 Uploaded file', data);
//     //     const productImage = await context.query.ProductImage.createOne({
//     //       data: { image: data, altText: productData.description },
//     //       query: 'id',
//     //     });

//     //     console.log({ productImage });
//     //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     //     // productData.photo = { connect: { id: productImage[0].id } };
//     //     // await context.query.Product.createOne({
//     //     //   data: productData,
//     //     //   query: 'id',
//     //     // });

//     //     // await createProduct(productData);
//     //   }
//     // });
//     // productData.photo
//     //   .catch((reason) => {
//     //     upload.promise.then(reason);
//     //   })
//     //   .then((data) => {
//     //     if (data !== undefined) {
//     //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     //       upload.resolve(data);
//     //     }
//     //   });

//     // if (!productImage) {

//     // }
//   };

//   const createProduct = async (productData: ProductProps) => {
//     const productImage = await context.query.productImage.findMany({
//       where: { filename: { equals: productData.photo } },
//       query: 'id',
//     });

//     productData.photo = { connect: { id: productImage[0].id } };
//     await context.query.Product.createOne({
//       data: productData,
//       query: 'id',
//     });
//   };

//   console.log(`🌱 Inserting Seed Data: ${products.length} Products`);

//   for (const product of products) {
//     console.log(`👩 Adding productImage: ${product.name}`);
//     await createProductImage(product);
//   }
//   // for (const product of products) {
//   //   console.log(`📝 Adding products: ${product.name}`);
//   //   await createProduct(product);
//   // }

//   console.log(`✅ Seed Data Inserted: ${products.length} Products`);
//   console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
//   process.exit();
// }

// export async function insertSeedData(context: KeystoneContext) {
//   console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
//   for (const product of products) {
//     console.log(`  🛍️ Adding Product: ${product.name}`);

//     // const fileToUpload: FileUpload = product.photo;
//     const upload = new Upload();
//     const upload2 = new Upload();
//     const fileToUpload: FileUpload = {
//       ...product.photo,
//       createReadStream: undefined,
//     };

//     upload.file = fileToUpload;
//     upload.promise = new Promise((resolve, reject) => {
//       upload2.resolve = (data) => {
//         resolve(data);
//       };
//       upload2.reject = (reason) => {
//         reject(reason);
//       };
//     });

//     // upload2 = await upload;
//     // upload.file = { ...product.photo, createReadStream: null };
//     // upload.promise.then(async (data) => {});
//     // product.photo.then((data) => {
//     //   if (data !== undefined) {
//     //     upload.resolve(data);
//     //   }
//     // });
//     console.log({ upload2 });
//     const { id } = await context.query.ProductImage.createOne({
//       data: {
//         image: upload2,
//         altText: product.description,
//       },
//     });

//     delete product.photo;

//     product.photoId = id;
//     await context.query.Product.createOne({
//       data: product,
//       query: 'id',
//     });
//   }
//   console.log(`✅ Seed Data Inserted: ${products.length} Products`);
//   console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
//   process.exit();
// }

export async function insertSeedData({ prisma }: KeystoneContext) {
  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const image = await prisma.productImage.create({
      data: {
        image: product.photo,
        altText: product.description,
      },
    });
    console.log({ image });
    delete product.photo;

    product.photoId = image.id;
    await prisma.product.create({ data: product });
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
