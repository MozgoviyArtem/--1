export interface TagRepositoryContract {
  getAll(skip: number, take: number): Promise<any[]>;
  getById(id: number): Promise<any | null>;
}