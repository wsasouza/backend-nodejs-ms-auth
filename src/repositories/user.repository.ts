import db from '../db';
import User from 'models/user.model';
import DatabaseError from 'models/errors/database.error.model';


class UserRepository {  

  async findAll(): Promise<User[]> {
    try {
      const query = `SELECT id, username FROM application_user`;

      const { rows } = await db.query<User>(query);    
  
      return rows || [];
    } catch(error) {
      throw new DatabaseError('Erro ao buscar os registros no banco.', error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const query = `SELECT id, username 
                     FROM application_user
                     WHERE id = $1`;
      const values = [id]
      const { rows } = await db.query<User>(query, values);  
      const [ user ] = rows;  

      return user;

    } catch(error) {
      throw new DatabaseError(`Erro na busca por ${id}`, error)
    }
   
  }

  async createUser(user: User): Promise<User> {
    try {
      const secret = process.env.SECRET;    
      const script = `INSERT INTO application_user (
                        username,
                        password
                      )
                      VALUES ($1, crypt($2, '${secret}'))
                      RETURNING *`;
      const values = [user.username, user.password]
      const { rows } = await db.query<User>(script, values); 
      const [newUser] = rows;  
      newUser.password = '';  
  
      return newUser; 
    } catch(error) {
      throw new DatabaseError('Erro ao tentar salvar registro.', error)
    }    
  }

  async updateUser(user: User): Promise<void> {
    try {
      const secret = process.env.SECRET;    
      const script = `UPDATE application_user 
                      SET 
                        username = $1,
                        password = crypt($2, '${secret}')                    
                      WHERE id = $3
                     `;
      const values = [user.username, user.password, user.id]
      await db.query(script, values);
    } catch(error) {
      throw new DatabaseError(`Erro na busca por ${user.id}`, error)
    }     
  }

  async removeUser(id: string): Promise<void> {
    try {
      const script = `DELETE FROM application_user 
                    WHERE id = $1`;
      const values = [id];
      await db.query(script, values);
    } catch(error) {
      throw new DatabaseError(`Erro ao tentar remover o ${id}`, error)
    }
  }

}

export default new UserRepository();