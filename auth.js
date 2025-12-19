import { DataService } from './data.js';

const SESSION_KEY = 'farol_current_user';

export const AuthService = {
    register(name, email, password, church) {
        const newUser = {
            id: 'usr_' + Date.now(),
            name,
            email,
            password, // In a real app, hash this!
            church,
            role: email.includes('admin') ? 'admin' : 'user', // Simple admin detection for demo
            journal: [],
            moodHistory: []
        };
        try {
            DataService.addUser(newUser);
            this.login(email, password);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    login(email, password) {
        const users = DataService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Credenciais inválidas.' };
    },

    logout() {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'index.html';
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(SESSION_KEY));
    },

    requireAuth() {
        if (!this.getCurrentUser()) {
            window.location.href = 'login.html';
        }
    },

    requireAdmin() {
        const user = this.getCurrentUser();
        if (!user || user.role !== 'admin') {
            window.location.href = 'dashboard.html';
        }
    }
};
