import { Request, Response } from "express";

import projectService from "../services/project";
import { ValidationError } from "../lib/exceptions";
import ApiResposne from "../lib/response";

type DeployProjectReqBody = { gitURL: string; existingSlug?: string };
type StoreProjectReqBody = {
  projectId: string;
  projectLink: string;
  user: any;
  projectName: string;
};

async function deployProject(req: Request, res: Response) {
  const { gitURL, existingSlug }: DeployProjectReqBody = req.body;

  if (!gitURL) throw new ValidationError("GIT Url is required!");

  const data = await projectService.deployProject(gitURL, existingSlug);

  return res
    .status(201)
    .json(
      new ApiResposne(true, "Project Deployment Initiated!", data).toDict()
    );
}

async function storeProject(req: Request, res: Response) {
  const { projectId, projectLink, projectName, user }: StoreProjectReqBody =
    req.body;

  if (!projectId) throw new ValidationError("ProjectId is required!");
  if (!projectLink) throw new ValidationError("ProjectLink is required");
  if (!projectName) throw new ValidationError("Project Name is required");

  await projectService.storeProject(
    projectId,
    projectLink,
    projectName,
    user._id
  );

  return res
    .status(201)
    .json(new ApiResposne(true, "Project is stored!").toDict());
}

async function getProjects(req: Request, res: Response) {
  const { user }: StoreProjectReqBody = req.body;

  const data = await projectService.getProjectsByUserId(user._id);

  return res
    .status(201)
    .json(new ApiResposne(true, "Data is fetched!", data).toDict());
}

export default { deployProject, storeProject, getProjects };
