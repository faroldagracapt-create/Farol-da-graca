/**
 * Mock Data & Storage Utility
 * Handles LocalStorage persistence for Users and Content.
 */

const STORAGE_KEY_USERS = 'farol_users_v1';
const STORAGE_KEY_CONTENT = 'farol_content_v1';
const CURRENT_USER_KEY = 'farol_current_user';


const initialContent = {
    resources: [
        {
            id: 'res_1',
            title: 'Vencendo a Solidão Ministerial',
            category: 'Bem-Estar',
            image: 'https://r2.flowith.net/files/jpeg/8T4FF-portuguese_cultural_wellbeing_scene_index_4@1024x1024.jpeg',
            summary: 'A liderança não precisa ser um caminho solitário. Descubra estratégias para criar conexões autênticas.',
            content: 'A solidão é um dos maiores desafios do ministério pastoral em Portugal. Estudos indicam que 65% dos líderes sentem-se isolados...'
        },
        {
            id: 'res_2',
            title: 'Burnout: Sinais de Alerta',
            category: 'Saúde Mental',
            image: 'https://r2.flowith.net/files/jpeg/O9GBD-wellbeing_icons_portugal_index_2@1024x1024.jpeg',
            summary: 'Reconhecer a exaustão antes do colapso. O cuidado com o templo do Espírito começa em si.',
            content: 'Cansaço crónico, cinismo e ineficácia não são sinais de fraqueza espiritual, mas alertas do corpo...'
        },
        {
            id: 'res_3',
            title: 'A Graça no Descanso',
            category: 'Espiritualidade',
            image: 'https://r2.flowith.net/files/jpeg/NDR3H-portuguese_sea_lighthouse_dawn_index_1@1024x1024.jpeg',
            summary: 'Redescobrir o Sabbat como um presente de Deus, não uma obrigação legalista.',
            content: 'Deus descansou. Porque é que nós corremos? O descanso é um ato de confiança na soberania divina...'
        }
    ]
};


export const DataService = {
    init() {
        if (!localStorage.getItem(STORAGE_KEY_CONTENT)) {
            localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(initialContent));
        }
        if (!localStorage.getItem(STORAGE_KEY_USERS)) {
            localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([]));
        }
    },

    getUsers() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    },

    addUser(user) {
        const users = this.getUsers();
        if (users.find(u => u.email === user.email)) {
            throw new Error('Email já registado.');
        }
        users.push(user);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
        return user;
    },

    updateUser(updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

            const session = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
            if (session && session.id === updatedUser.id) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
            }
        }
    },

    getContent() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_CONTENT));
    },

    updateContent(newContent) {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
    }
};

DataService.init();
