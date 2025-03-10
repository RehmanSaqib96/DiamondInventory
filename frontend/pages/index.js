// frontend/pages/index.js
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Diamond Inventory System</h1>
            <nav>
                <ul>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                </ul>
            </nav>
        </div>
    );
}
