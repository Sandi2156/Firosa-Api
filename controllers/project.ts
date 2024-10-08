import { Request, Response } from "express";

import projectService from "../services/project";
import { ValidationError } from "../lib/exceptions";
import ApiResposne from "../lib/response";

type DeployProjectReqBody = {
  gitURL: string;
  existingSlug?: string;
  user: any;
};

type StoreProjectReqBody = {
  projectId: string;
  projectLink: string;
  userId: string;
  projectName: string;
};

type GetProjectsReqBody = {
  user: any;
};

type DeleteProjectReqBody = {
  user: string;
  projectId: string;
};

async function deployProject(req: Request, res: Response) {
  const { gitURL, existingSlug, user }: DeployProjectReqBody = req.body;

  if (!gitURL) throw new ValidationError("GIT Url is required!");

  const data = await projectService.deployProject(gitURL, existingSlug, user);

  return res
    .status(201)
    .json(
      new ApiResposne(true, "Project Deployment Initiated!", data).toDict()
    );
}

async function storeProject(req: Request, res: Response) {
  const { projectId, projectLink, projectName, userId }: StoreProjectReqBody =
    req.body;

  if (!projectId) throw new ValidationError("ProjectId is required!");
  if (!projectLink) throw new ValidationError("ProjectLink is required");
  if (!projectName) throw new ValidationError("Project Name is required");
  if (!userId) throw new ValidationError("User ID is required");

  await projectService.storeProject(
    projectId,
    projectLink,
    projectName,
    userId
  );

  return res
    .status(201)
    .json(new ApiResposne(true, "Project is stored!").toDict());
}

async function getProjects(req: Request, res: Response) {
  const { user }: GetProjectsReqBody = req.body;

  const data = await projectService.getProjectsByUserId(user);

  return res
    .status(201)
    .json(new ApiResposne(true, "Data is fetched!", data).toDict());
}

async function deleteProject(req: Request, res: Response) {
  const { user, projectId }: DeleteProjectReqBody = req.body;

  await projectService.deleteProject(projectId, user);

  return res
    .status(201)
    .json(
      new ApiResposne(true, `Project with id:${projectId} is deleted!`).toDict()
    );
}

export default { deployProject, storeProject, getProjects, deleteProject };
