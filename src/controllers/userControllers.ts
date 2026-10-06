import { Request, Response } from "express";
import * as userService from "../services/userServices";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !role || !name) {
    return res
      .status(400)
      .json({ message: "Name, email, password, and role are required" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  try {
    const existingUser = await userService.findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await userService.createUser(
      normalizedEmail,
      password,
      name,
      role
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    // Two requests with the same email can both pass the check above;
    // the UNIQUE constraint catches the second one.
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Error registering the user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userService.findUserByEmail(
      String(email).trim().toLowerCase()
    );

    // Same message for both cases so attackers can't tell which emails exist
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log(`User ${user.email} logged in successfully`);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};
export const getAllUsers = async (req: Request, res:Response) => {
  try{
    const users = await userService.findAllUsers();
    return res.status(200).json(users)
  }catch(error){
    return res.status(500).json({message:"Error retrieving user"});
  }
};

export const getUsersById = async (req:Request, res:Response) =>{
  try{
    const id =parseInt(req.params.id as string);
     const user = await userService.findUserById(id)

    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
  }catch(error){
    res.status(500).json({message:"error retrieving user"})
  }
};

export const updateUserById = async(req: Request, res: Response) => {
  try{
  const id = parseInt (req.params.id as string)
  const updateUser = await userService.updateUser(id,req.body);
  if(!updateUser){
    return res.status(404).json({message:"user not found"});
     }
  res.status(200).json(updateUser)
  }catch(error){
 console.error(error)
 res.status(500).json({message:"error updating user"})
  }
};

export const deleteUserById = async(req:Request, res:Response) =>{
  try{
    const id = parseInt(req.params.id as string)
    const deletedUser = await userService.deleteUser(id);
    if(!deletedUser){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({message:"user deleted successfully"})
  }catch(error){
    res.status(500).json({message:"error deleting user"})
  };
};