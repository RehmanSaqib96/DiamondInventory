import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if a user is logged in and if they're an admin.
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        const user = JSON.parse(storedUser);
        if (user.role !== 'seller') {
            router.push('/'); // non-admins get redirected away
            return;
        }
        fetchUsers();
    }, [router]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Fetch users error:', error);
            setErrorMsg('Error fetching users');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`http://localhost:5000/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error updating role');
            }
            // Refresh user list to reflect changes
            fetchUsers();
        } catch (error) {
            console.error('Role update error:', error);
            setErrorMsg(error.message);
        }
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard | DiamondStore</title>
                <meta name="description" content="Manage user access roles at DiamondStore" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>Change Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((usr) => (
                        <tr key={usr.id}>
                            <td>{usr.id}</td>
                            <td>{usr.name}</td>
                            <td>{usr.email}</td>
                            <td>{usr.role}</td>
                            <td>
                                <select
                                    defaultValue={usr.role}
                                    onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="seller">Seller</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
        .admin-dashboard {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background: #f2f2f2;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 10px;
        }
      `}</style>
        </>
    );
}
