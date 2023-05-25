import {Disclosure} from '@headlessui/react';
import { Link } from './Link';

export function Filter({filters}) {
  return (
    <div className="filter-wrap">
      <FiltersDrawer filters={filters} />
    </div>
  )
}

export function SortMenu() {
  return (
    <div className="sort-wrap">
       
    </div>
  )
}

export function FiltersDrawer({filters = []}) {
  const filterMarkup = (filter, option) => {
    switch (filter.type) {
      case 'PRICE_RANGE':
        const min =
          params.has('minPrice') && !isNaN(Number(params.get('minPrice')))
            ? Number(params.get('minPrice'))
            : undefined;

        const max =
          params.has('maxPrice') && !isNaN(Number(params.get('maxPrice')))
            ? Number(params.get('maxPrice'))
            : undefined;

        return <PriceRangeFilter min={min} max={max} />;

      default:
        console.log(filter);
        const to = ''
        return (
          <Link
            className="focus:underline hover:underline"
            prefetch="intent"
            to={to}
          >
            {option.label}
          </Link>
        );
    }
  };
  
  return (
    <div className="divide-y">
      {filters.map(
        (filter) =>
          filter.values.length > 1 && (
            <Disclosure as="div" key={filter.id} className="w-full">
              {({open}) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full py-4">
                    <span size="lead">{filter.label}</span>
                  </Disclosure.Button>
                  <Disclosure.Panel key={filter.id}>
                    <ul key={filter.id} className="py-2">
                      {filter.values?.map((option) => {
                        return (
                          <li key={option.id} className="pb-4">
                            {filterMarkup(filter, option)}
                          </li>
                        );
                      })}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ),
      )}
    </div>
  )
}