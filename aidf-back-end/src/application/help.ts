import Help from "../infrastructure/schemas/Help";
import { Request, Response, NextFunction } from "express";
import { createHelpDTO } from "../domain/dtos/help";
import { clerkClient } from "@clerk/express";

export const createHelp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(400).json({ message: "Please provide a user ID" });
    return;
  }
  const clerkUser = await clerkClient.users.getUser(userId);
  if (!clerkUser) {
    res.status(400).json({ message: "Please provide a valid user ID" });
    return;
  }
  const newHelp = createHelpDTO.safeParse(req.body);
  if (!newHelp.success) {
    res.status(400).json({ message: newHelp.error });
    return;
  }

  const hasHelp = await Help.findOne({
    userId: clerkUser.id,
  });

  if (hasHelp) {
    res.status(400).json({
      message: "You already have a help request wait until it is resolved",
    });
    return;
  }
  const savedHelp = await Help.create({
    userId: clerkUser.id,
    name: newHelp.data.name,
    email: newHelp.data.email,
    subject: newHelp.data.subject,
    message: newHelp.data.message,
  });

  res.status(201).json(savedHelp);
};

export const getAllHelp = async (req: Request, res: Response) => {
  const help = await Help.find({});
  if (!help || help.length === 0) {
    res.json([]);
    return;
  }
  res.status(200).json(help);
  return;
};

export const deleteHelp = async (req: Request, res: Response) => {
  const helpId = req.params.id;
  if (!helpId) {
    res.status(400).send("Please provide a help ID");
    return;
  }
  const deletedHelp = await Help.findByIdAndDelete(helpId);
  if (!deletedHelp) {
    res.status(404).send("Help not found");
    return;
  }
  res.status(200).send("Help deleted successfully");
  return;
};
