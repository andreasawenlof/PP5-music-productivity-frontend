import useHomeRedirect from '../hooks/useHomeRedirect';

const HomePage = () => {
    useHomeRedirect(); // 👈 Automatically redirects user based on role

    return (
        <div>
            <h1>🏡 Welcome to the Home Page</h1>
            <p>If you see this, you're **not redirected yet**.</p>
        </div>
    );
};

export default HomePage;
