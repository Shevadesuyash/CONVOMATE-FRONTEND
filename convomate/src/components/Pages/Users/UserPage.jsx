import React from 'react';

const UserPage = () => {
  return (
    <div>
      <h1>User Data for Admin</h1>
      <p>This page displays user data for the admin to view.</p>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JohnDoe</td>
            <td>johndoe@example.com</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>JaneDoe</td>
            <td>janedoe@example.com</td>
            <td>Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
