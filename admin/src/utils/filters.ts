import { FilterState } from "@/components/molecules/filter/interface";

export function parseFiltersFromSearchParams(sp: URLSearchParams): FilterState[] {
const entries = sp.getAll('filter');
return entries
.map((raw) => {
const [key, operator, value] = raw.split(':');
if (!key || !operator) return undefined;
// Support array values (comma separated)
const parsedValue = value?.includes(',') ? value.split(',') : value ?? '';
return { key, operator: operator as FilterState['operator'], value: parsedValue } as FilterState;
})
.filter(Boolean) as FilterState[];
}


export function upsertFilter(list: FilterState[], next: FilterState): FilterState[] {
const others = list.filter((f) => f.key !== next.key);
return [...others, next];
}


export function removeFilter(list: FilterState[], key: string): FilterState[] {
return list.filter((f) => f.key !== key);
}


export function buildSearchParamsWithFilters(
current: URLSearchParams,
filters: FilterState[],
{ resetPage = true }: { resetPage?: boolean } = {}
): URLSearchParams {
const params = new URLSearchParams(current.toString());
params.delete('filter');
if (resetPage) params.set('page', '1');
for (const f of filters) {
const val = Array.isArray(f.value) ? f.value.join(',') : String(f.value ?? '');
params.append('filter', `${f.key}:${f.operator}:${val}`);
}
return params;
}