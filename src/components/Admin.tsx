import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUser } from "../Types";
import { AiFillDelete, AiOutlineRollback } from "react-icons/ai";

function Admin() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((dt) => {
        setUsers(dt.data.users);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = (email: string) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/${encodeURI(email)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((dt) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleResetClick = (email: string) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/reset`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((dt) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h3>Admin panel</h3>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Group</th>
              <th>Invalid logins count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => {
              return (
                <tr key={`usr-${u.email}`}>
                  <td>{u.email}</td>
                  <td>{u.group}</td>
                  <td>{u.invalidLogins}</td>
                  <td>
                    <AiFillDelete
                      className="delete-user-btn"
                      onClick={() => {
                        handleClick(u.email);
                      }}
                    />
                    <AiOutlineRollback
                      className="invalid-logins-user-btn"
                      onClick={() => {
                        handleResetClick(u.email);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Admin;
