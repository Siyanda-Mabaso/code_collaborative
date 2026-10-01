import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



interface jwtPayload {
  userId: number;
  email: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers, "request headers");
      console.log(req.headers.authorization.split, "token");
      token = req.headers.authorization.split("")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log(decoded, "decoded token");

      //find user in token
    //   const user: User | null = await findUserByEmail(decoded.email);
    //   req.user = user || undefined;

    //   if (!req.user) {
    //     return res
    //       .status(401)
    //       .json({ message: "NOT authorize, user not found" });
    //   }
      return next();
      //we failed to retrive the user
    } catch (error) {
      return res.status(401).json({ message: "Not found, token failed" });
    }
    //authorization header is not found
  } else {
    res.status(401).json({ message: "Not found ,no token" });
  }
  return  res.status(401).json({ message:" Not authorized"})
};