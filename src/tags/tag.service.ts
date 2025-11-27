import { TagRepository } from "./tag.repositoriy";

const reposit = new TagRepository();

export const tagService = {
  async getAll(skip: number, take: number) {
    return reposit.getAll(skip, take);
  },

  async getById(id: number) {
    return reposit.getById(id);
  },
};