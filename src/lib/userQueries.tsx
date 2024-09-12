
import { RowDataPacket } from 'mysql2';


interface User extends RowDataPacket {
  id: number;
  name: string;
  password: string; 
}


export async function queryUser(connection: any, name: string): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE name = ? LIMIT 1';  
    const [rows] = await connection.execute(query, [name]);

    const userRows = rows as User[]; 

    if (userRows.length > 0) {
      return userRows[0];  
    }
    return null;  
  } catch (err) {
    console.error('Error querying user:', err);
    throw err;
  }
}
