// // eslint-disable-next-line import/no-extraneous-dependencies
// import { ProductImageCreateInput } from '.keystone/types';
// import { KeystoneContext } from '@keystone-6/core/types';
// // import { Upload } from 'graphql-upload';
// import { Upload } from 'graphql-upload';
// import { Session } from '../types';

// async function uploadImage(
//   root: any,
//   { title, photo }: { title: string; photo: any },
//   context: KeystoneContext
// ): Promise<ProductImageCreateInput> {
//   const sesh = context.session as Session;

//   if (!sesh.itemId) {
//     throw new Error('You must be logged in to do this!');
//   }

//   console.log('base area');

//   // in your resolver
//   const upload = new Upload();
//   photo
//     .catch((reason) => {
//       upload.reject(reason);
//     })
//     .then((data) => {
//       if (data !== undefined) {
//         upload.resolve(data);
//       }
//     });
//   context.query.Post.createOne({
//     data: {
//       photo: { upload },
//     },
//   });

//   if (photo) {
//     console.log('arriving at photo upload area');

//     createPost = await context.lists.Post.createOne({
//       data: {
//         title,
//         photo: { upload: photo },
//       },
//       resolveFields: 'id title',
//     });
//   } else {
//     console.log('arriving at normal post area');

//     createPost = await context.lists.Post.createOne({
//       data: {
//         title,
//       },
//       resolveFields: 'id title',
//     });
//   }

//   return createPost;
// }
