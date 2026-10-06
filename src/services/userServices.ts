import { query } from "../confing/database";
import bcrypt from "bcryptjs";
import { User } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0] || null;
};

export const createUserTable = async (): Promise<void> => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("users table is ready");
  } catch (error) {
    console.error("Failed to create users table:", error);
    throw error;
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: string
): Promise<User> => {
   
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const { rows } = await query(
    "INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at",
    [email, password_hash, name, role]
  );

  return rows[0];
};

export const findAllUsers = async (): Promise<User[]> => {
  const { rows } = await query(
    "SELECT id, email, name, role, created_at FROM users ORDER BY id ASC"
  );
  return rows;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const { rows } = await query(
    "SELECT id, email, name, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

export const updateUser = async (id: number, appData: User):Promise <User | null> =>{
  const {email,name,password_hash,role}= appData
  const {rows}=await query (`UPDATE users SET 
    name= COALESCE($1,name),
     email=COALESCE($2,email),
      password_hash=COALESCE($3,password_hash),
       role=COALESCE($4,role),
       WHERE id=$5
       RETURNING *`,
       [name,email,password_hash,role,id],
        );
return rows[0] || null
   
};
export const deleteUser = async (id: number): Promise<boolean> => {
  const { rows } = await query("DELETE FROM users WHERE id =  $1 RETURNING *" ,  [id]);
  return rows[0] || null
};