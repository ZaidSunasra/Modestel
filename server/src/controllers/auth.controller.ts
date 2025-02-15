import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validations/auth.validations";
import { addNewUser, deleteAccountService, findExistingUser, getAllUserService } from "../services/auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addUserController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { username, password, role } = req.body;

  const zodValidation = signupSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    const checkUser = await findExistingUser(username);
    if (checkUser.length > 0) {
      return res.status(409).json({
        msg: "Username already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await addNewUser({ username, hashedPassword, role });

    return res.status(201).json({
      msg: "User registered successfully",
      userData: {
        username,
        role,
      },
    });
  } catch (error) {
    console.log("Signup error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { username, password } = req.body;

  const zodValidation = loginSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }

  try {
    const getUser = await findExistingUser(username);
    if (getUser.length === 0) {
      return res.status(404).send({
        msg: "User not found",
      });
    }

    const verifyPassword = await bcrypt.compare(password, getUser[0].password);
    if (!verifyPassword) {
      return res.status(401).send({
        msg: "Incorrect Password",
      });
    }

    const role = getUser[0].role;
    const token = jwt.sign(
      { username, role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).send({
      msg: "Logged in successfully",
      userData: {
        username,
        role,
        token
      }
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    return res.status(200).send({
      msg: "Logout successful",
    });
  } catch (error) {
    console.log("Logout error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const deleteAccountController = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  try {
    await deleteAccountService(id);
    return res.status(200).send({
      msg: "Account successfully deleted",
    });
  } catch (error) {
    console.log("Account deletion error: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const getAllUserController = async(req: Request, res: Response): Promise<any> => {
  try {
    const response = await getAllUserService();
    return res.status(200).send({
     response
    });
  } catch (error) {
    console.log("Error getting user", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
