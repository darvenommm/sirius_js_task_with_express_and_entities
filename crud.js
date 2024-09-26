import { Router } from "express";

import { Owner, Cat } from "./db.js";

export const ownersRouter = new Router();
export const catsRouter = new Router();

ownersRouter.post("/owners", async (req, res) => {
  try {
    const owner = await Owner.create(req.body);
    res.status(201).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

ownersRouter.get("/owners", async (_, res) => {
  try {
    const owners = await Owner.findAll({
      include: { model: Cat, as: "cats" },
    });

    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

ownersRouter.get("/owners/:id", async (req, res) => {
  try {
    const owner = await Owner.findByPk(req.params.id, {
      include: { model: Cat, as: "cats" },
    });

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

ownersRouter.put("/owners/:id", async (req, res) => {
  try {
    const owner = await Owner.findByPk(req.params.id);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    await owner.update(req.body);
    res.json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

ownersRouter.delete("/owners/:id", async (req, res) => {
  try {
    const owner = await Owner.findByPk(req.params.id);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    await owner.destroy();
    res.json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --------------------------------: cats

catsRouter.post("/cats", async (req, res) => {
  try {
    const cat = await Cat.create(req.body);
    res.status(201).json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

catsRouter.get("/cats", async (_, res) => {
  try {
    const cats = await Cat.findAll({
      include: { model: Owner, as: "owner" },
    });
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

catsRouter.get("/cats/:id", async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id, {
      include: { model: Owner, as: "owner" },
    });

    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }

    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

catsRouter.put("/cats/:id", async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);

    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }

    await cat.update(req.body);
    res.json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

catsRouter.delete("/cats/:id", async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);

    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }

    await cat.destroy();
    res.json({ message: "Cat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
