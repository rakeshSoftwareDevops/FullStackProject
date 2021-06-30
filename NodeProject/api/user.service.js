const pool=require("../Config/database");
module.exports={
    create: (data, callBack) => {
        pool.query(
          `insert into registration(firstName, lastName, gender, email, password, number) 
                    values(?,?,?,?,?,?)`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    createSnippet: (data, callBack) => {
        pool.query(
          `insert into snippet_manager(title, description, code, user_id) 
                    values(?,?,?,?)`,
          [
            data.title,
            data.description,
            data.code,
            data.user_id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUserByUserId: (id, callBack) => {
        pool.query(
          `select id,firstName,lastName,gender,email,number from registration where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getSnippetByUserId: (data, callBack) => {
        console.log("just");
        pool.query(
          `select * from snippet_manager where user_id = ?`,
          [data.user_id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
              console.log("we got"+error);

            }
            console.log("we got"+results);
            return callBack(null, results);
          }
        );
      },
      getUsers: callBack => {
        pool.query(
          `select id,firstName,lastName,gender,email,number from registration`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      updateUser: (data, callBack) => {
        pool.query(
          `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      updateSnippet: (data, callBack) => {
        pool.query(
          `update snippet_manager set title=?, description=?, code=? where user_id = ?`,
          [
            data.title,
            data.description,
            data.code,
            data.user_id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteUser: (data, callBack) => {
        pool.query(
          `delete from registration where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteSnippet: (data, callBack) => {
        pool.query(
          `delete from snippet_manager where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
}