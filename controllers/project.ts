import { Request, Response } from "express";

import projectService from "../services/project";

async function deployProject(req: Request, res: Response) {
  const { gitURL, existingSlug }: { gitURL: string; existingSlug?: string } =
    req.body;

  if (!gitURL) {
    res.status(403).json({
      message: "GIT url is required.",
    });
  }

  const response = await projectService.deployProject(gitURL, existingSlug);

  return res.status(201).json(response);
}

export { deployProject };
