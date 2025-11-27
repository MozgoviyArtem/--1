import { prisma } from "../database/prisma.service";
import { CreatePostUnceked, UpdatePostUnchecked } from "./Post.types";
import { PostRepositoriuContract } from "./Post.types";

export class PostRepository implements PostRepositoriuContract {
  async create(data: CreatePostUnceked) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tagIds
          ? { connect: data.tagIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async update(id: number, data: UpdatePostUnchecked) {
    return prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        tags: data.tagIds
          ? { set: data.tagIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }

  async getAll() {
    return prisma.post.findMany({ include: { tags: true } });
  }

  async getById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });
  }
}