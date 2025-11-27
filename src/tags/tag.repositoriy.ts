import { prisma } from "../database/prisma.service";
import { TagRepositoryContract } from "./tag.types";

export class TagRepository implements TagRepositoryContract{
  async getAll(skip: number, take: number) {
    return prisma.tag.findMany({
      skip,
      take,
    });
  }

  async getById(id: number) {
    return prisma.tag.findUnique({
      where: { id },
    });
  }
}