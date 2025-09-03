'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { buildSearchParamsWithFilters, parseFiltersFromSearchParams, removeFilter, upsertFilter } from '@/utils/filters';
import { FilterState } from '@/components/molecules/filter/interface';


export function useUrlFilters() {
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();


const filters = useMemo(() => parseFiltersFromSearchParams(new URLSearchParams(searchParams.toString())), [searchParams]);


const push = useCallback(
(next: FilterState[]) => {
const params = buildSearchParamsWithFilters(new URLSearchParams(searchParams.toString()), next);
router.push(`${pathname}?${params.toString()}`);
},
[pathname, router, searchParams]
);


const set = useCallback(
(f: FilterState) => {
const next = upsertFilter(filters, f);
push(next);
},
[filters, push]
);


const remove = useCallback(
(key: string) => {
const next = removeFilter(filters, key);
push(next);
},
[filters, push]
);


return { filters, set, remove, push } as const;
}