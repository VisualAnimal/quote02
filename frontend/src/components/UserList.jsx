import React from 'react'

const UserList = ({ users }) => {
    return (
        <div>
            <h2>全部商家</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default UserList