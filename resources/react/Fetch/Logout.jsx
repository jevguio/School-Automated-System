export default function Logout(handleCloseUserMenu, setIsLoggedIn) {
    const handleLogout = async () => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch('/logout', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            const data = await response.json();
            if (response.ok) {
                // Logout successful, redirect to login page or do something else 
                if (handleCloseUserMenu != null) {

                    handleCloseUserMenu();
                }
                setIsLoggedIn(false);
            } else {
                // Logout failed, handle error
                console.error('Logout failed' + data.message);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return handleLogout();
}