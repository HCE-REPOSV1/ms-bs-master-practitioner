export interface PageMeta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

export class PagedResult<T> {
  constructor(
    public readonly items: T[],
    public readonly meta: PageMeta,
  ) {}

  static of<T>(items: T[], total: number, page: number, limit: number): PagedResult<T> {
    return new PagedResult(items, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }
}
