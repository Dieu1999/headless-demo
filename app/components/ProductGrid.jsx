import {useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {ProductCard} from './ProductCard';

export function ProductGrid({collection, url}) {
  
  const [nextPage, setNextPage] = useState(collection.products.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(collection.products.pageInfo.endCursor);
	const [products, setProducts] = useState(collection.products.nodes || []);
  const fetcher = useFetcher();
  
  function fetchMoreProducts() {
    fetcher.load(`${url}?index&cursor=${endCursor}`);
  }

  useEffect(() => {
    if (!fetcher.data) return;
    const {collection} = fetcher.data;
    console.log(6777);
    setProducts((prev) => [...prev, ...collection.products.nodes]);
    setNextPage(collection.products.pageInfo.hasNextPage);
    setEndCursor(collection.products.pageInfo.endCursor);
  }, [fetcher.data]);

  return (
    <section className="w-full grid">
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-3 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
      
      {nextPage && (
        <div className="flex items-center justify-center mb-8 mt-6">
          <button 
          	disabled={fetcher.state !== 'idle'}
            onClick={fetchMoreProducts}
            className="btn-secondary cursor-pointer">
          	{fetcher.state !== 'idle' ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  );
}
