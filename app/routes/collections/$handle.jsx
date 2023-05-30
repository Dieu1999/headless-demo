import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {ProductGrid} from '../../components/ProductGrid';
import {Filter, SortMenu} from '../../components/SortFilter';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description,
});
export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const {handle} = params;

  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');
  console.log(handle);

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor
    },
  });
 
  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <div className='container'>
          <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
            {collection.title}
          </h1>

          {collection.description && (
            <div className="flex items-baseline justify-between w-full">
              <div>
                <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                  {collection.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className='container flex gap-6'>
        <div className='sidebar w-80'>
          <Filter filters={collection.products.filters}></Filter>
        </div>
        <div className='content'>
          <ProductGrid
              collection={collection}
              url={`/collections/${collection.handle}`}
            />
        </div>
      </div>
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      
      products(first: 3, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;