import { Router } from "express";
import { tagService } from "./tag.service";

export const tagRouter = Router();

tagRouter.get("/tags", async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 10;

    const tags = await tagService.getAll(skip, take);
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

tagRouter.get("/tags/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const tag = await tagService.getById(id);

    if (!tag) return res.status(404).json({ error: "Tag not found" });

    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});