import { AuthService } from './auth.js';
import { DataService } from './data.js';


AuthService.requireAuth();

const user = AuthService.getCurrentUser();
const greetingEl = document.getElementById('user-greeting');
const moodOptions = document.querySelectorAll('.mood-btn');
const journalText = document.getElementById('journal-entry');
const saveJournalBtn = document.getElementById('save-journal');
const entriesList = document.getElementById('journal-history');

if (greetingEl) greetingEl.textContent = `A paz seja consigo, ${user.name}.`;


moodOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        const today = new Date().toISOString().split('T')[0];
        

        moodOptions.forEach(b => b.classList.remove('ring-4', 'ring-blue-200'));
        btn.classList.add('ring-4', 'ring-blue-200');


        user.moodHistory = user.moodHistory || [];
        user.moodHistory.push({ date: new Date().toISOString(), mood });
        DataService.updateUser(user);
        

        alert('Estado de espírito registado. O Senhor é a sua força.');
    });
});


const encrypt = (text) => btoa(unescape(encodeURIComponent(text)));
const decrypt = (encoded) => decodeURIComponent(escape(atob(encoded)));


if (saveJournalBtn) {
    saveJournalBtn.addEventListener('click', () => {
        const content = journalText.value;
        if (!content.trim()) return;

        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            content: encrypt(content)
        };

        user.journal = user.journal || [];
        user.journal.unshift(entry); // Add to top
        DataService.updateUser(user);
        
        journalText.value = '';
        renderEntries();
        alert('Entrada guardada com segurança no seu diário privado.');
    });
}


const renderEntries = () => {
    if (!entriesList) return;
    entriesList.innerHTML = '';
    
    (user.journal || []).forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('pt-PT', { 
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
        });
        
        const div = document.createElement('div');
        div.className = 'bg-white p-4 rounded-lg shadow border-l-4 border-blue-600 mb-4';
        

        const decryptedContent = decrypt(entry.content);
        
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-500 font-semibold">${date}</span>
                <i data-lucide="lock" class="w-4 h-4 text-gray-400"></i>
            </div>
            <p class="text-gray-700 whitespace-pre-wrap font-serif">${decryptedContent}</p>
        `;
        entriesList.appendChild(div);
    });
    
    if (window.lucide) window.lucide.createIcons();
};


renderEntries();


document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    AuthService.logout();
});
