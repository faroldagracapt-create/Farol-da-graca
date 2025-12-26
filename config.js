<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin V2 | Farol da Graça</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="config.js"></script>
    <script src="auth-v2.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body class="bg-gray-50">

<div class="min-h-screen">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-red-600 rounded-lg text-white">
                    <i data-lucide="shield" class="w-5 h-5"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-gray-900">Painel Admin V2</h1>
                    <p class="text-xs text-gray-500">Base de Dados em Tempo Real</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-xs text-gray-600">Online</span>
                </div>
                <button onclick="AuthServiceV2.logout()" class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                    <i data-lucide="log-out" class="w-4 h-4 inline"></i> Sair
                </button>
            </div>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- Navigation Tabs -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <nav class="flex overflow-x-auto">
                <button onclick="showTab('dashboard')" class="tab-btn px-6 py-4 text-sm font-medium border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 inline mr-2"></i>Dashboard
                </button>
                <button onclick="showTab('users')" class="tab-btn px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 whitespace-nowrap">
                    <i data-lucide="users" class="w-4 h-4 inline mr-2"></i>Utilizadores
                </button>
                <button onclick="showTab('content')" class="tab-btn px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 whitespace-nowrap">
                    <i data-lucide="file-text" class="w-4 h-4 inline mr-2"></i>Editor de Conteúdo
                </button>
                <button onclick="showTab('resources')" class="tab-btn px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 whitespace-nowrap">
                    <i data-lucide="library" class="w-4 h-4 inline mr-2"></i>Recursos
                </button>
                <button onclick="showTab('settings')" class="tab-btn px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 whitespace-nowrap">
                    <i data-lucide="settings" class="w-4 h-4 inline mr-2"></i>Configurações
                </button>
            </nav>
        </div>

        <!-- Dashboard Tab -->
        <div id="dashboard" class="tab-content active">
            <div class="grid md:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <i data-lucide="users" class="w-8 h-8 opacity-80"></i>
                    </div>
                    <h3 class="text-3xl font-bold mb-1" id="total-users">0</h3>
                    <p class="text-blue-100 text-sm">Utilizadores Totais</p>
                </div>
                
                <div class="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <i data-lucide="user-plus" class="w-8 h-8 opacity-80"></i>
                    </div>
                    <h3 class="text-3xl font-bold mb-1" id="new-users">0</h3>
                    <p class="text-green-100 text-sm">Novos (Última Semana)</p>
                </div>
                
                <div class="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <i data-lucide="book-open" class="w-8 h-8 opacity-80"></i>
                    </div>
                    <h3 class="text-3xl font-bold mb-1" id="total-entries">0</h3>
                    <p class="text-purple-100 text-sm">Entradas de Diário</p>
                </div>
                
                <div class="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <i data-lucide="heart" class="w-8 h-8 opacity-80"></i>
                    </div>
                    <h3 class="text-3xl font-bold mb-1" id="total-moods">0</h3>
                    <p class="text-orange-100 text-sm">Check-ins de Humor</p>
                </div>
            </div>

            <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-6">
                <div class="flex items-start gap-3">
                    <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mt-0.5"></i>
                    <div>
                        <h4 class="font-bold text-green-900 mb-2">✅ Base de Dados Real Ativa!</h4>
                        <p class="text-sm text-green-800">Todos os dados estão sincronizados na cloud. Acesse de qualquer dispositivo e veja todos os utilizadores em tempo real.</p>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Últimos Registos</h3>
                    <div id="recent-users" class="space-y-3"></div>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">Estado de Humor Geral</h3>
                    <div id="mood-stats" class="space-y-2"></div>
                </div>
            </div>
        </div>

        <!-- Users Tab -->
        <div id="users" class="tab-content">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">Utilizadores Registados</h2>
                        <p class="text-sm text-gray-500 mt-1">Todos os pastores e líderes da plataforma</p>
                    </div>
                    <button onclick="refreshUsers()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        <i data-lucide="refresh-cw" class="w-4 h-4 inline mr-1"></i>Atualizar
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr class="text-left text-xs font-medium text-gray-500 uppercase">
                                <th class="px-6 py-3">Nome</th>
                                <th class="px-6 py-3">Email</th>
                                <th class="px-6 py-3">Igreja</th>
                                <th class="px-6 py-3">Registo</th>
                                <th class="px-6 py-3">Função</th>
                                <th class="px-6 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="users-table" class="divide-y divide-gray-100">
                            <tr>
                                <td colspan="6" class="px-6 py-8 text-center">
                                    <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                                    <p class="text-gray-500 mt-3">A carregar utilizadores...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Content Editor Tab -->
        <div id="content" class="tab-content">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-6">Editor de Conteúdo do Site</h2>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Título Principal (Hero)</label>
                        <input type="text" id="hero-title" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ex: Uma luz na tempestade ministerial">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Subtítulo Hero</label>
                        <textarea id="hero-subtitle" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Estatística 1</label>
                            <input type="text" id="stat1" class="w-full px-4 py-2 border rounded-lg" placeholder="56%">
                            <input type="text" id="stat1-desc" class="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Descrição">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Estatística 2</label>
                            <input type="text" id="stat2" class="w-full px-4 py-2 border rounded-lg" placeholder="1 em 3">
                            <input type="text" id="stat2-desc" class="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Descrição">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Estatística 3</label>
                            <input type="text" id="stat3" class="w-full px-4 py-2 border rounded-lg" placeholder="65%">
                            <input type="text" id="stat3-desc" class="w-full px-4 py-2 border rounded-lg mt-2" placeholder="Descrição">
                        </div>
                    </div>

                    <button onclick="saveContent()" class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg">
                        <i data-lucide="save" class="w-4 h-4 inline mr-2"></i>Guardar na Base de Dados
                    </button>
                </div>
            </div>
        </div>

        <!-- Resources Tab -->
        <div id="resources" class="tab-content">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-gray-900">Gestão de Recursos</h2>
                    <button onclick="showAddResourceModal()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                        <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i>Novo Recurso
                    </button>
                </div>
                <div id="resources-list" class="space-y-4">
                    <div class="text-center py-8">
                        <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                        <p class="text-gray-500 mt-3">A carregar recursos...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Settings Tab -->
        <div id="settings" class="tab-content">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-6">Configurações Gerais</h2>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Email de Contacto</label>
                        <input type="email" id="contact-email" class="w-full px-4 py-3 border rounded-lg">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Localização</label>
                        <input type="text" id="location" class="w-full px-4 py-3 border rounded-lg">
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Descrição do Rodapé</label>
                        <textarea id="footer-desc" rows="3" class="w-full px-4 py-3 border rounded-lg"></textarea>
                    </div>

                    <button onclick="saveSettings()" class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg">
                        <i data-lucide="save" class="w-4 h-4 inline mr-2"></i>Guardar Configurações
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- Modal para Adicionar Recurso -->
<div id="add-resource-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-bold">Novo Recurso</h3>
            <button onclick="closeAddResourceModal()" class="text-gray-400 hover:text-gray-600">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>
        <div class="p-6 space-y-4">
            <div>
                <label class="block text-sm font-bold mb-2">Título</label>
                <input type="text" id="new-res-title" class="w-full px-4 py-2 border rounded-lg">
            </div>
            <div>
                <label class="block text-sm font-bold mb-2">Categoria</label>
                <select id="new-res-category" class="w-full px-4 py-2 border rounded-lg">
                    <option>Bem-Estar</option>
                    <option>Saúde Mental</option>
                    <option>Espiritualidade</option>
                    <option>Burnout</option>
                    <option>Liderança</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold mb-2">Resumo</label>
                <textarea id="new-res-summary" rows="3" class="w-full px-4 py-2 border rounded-lg"></textarea>
            </div>
            <div>
                <label class="block text-sm font-bold mb-2">Conteúdo Completo</label>
                <textarea id="new-res-content" rows="6" class="w-full px-4 py-2 border rounded-lg"></textarea>
            </div>
            <div>
                <label class="block text-sm font-bold mb-2">URL da Imagem (opcional)</label>
                <input type="url" id="new-res-image" class="w-full px-4 py-2 border rounded-lg" placeholder="https://">
            </div>
        </div>
        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button onclick="closeAddResourceModal()" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onclick="createResource()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Criar Recurso</button>
        </div>
    </div>
</div>

<script>
// Verificar autenticação admin
AuthServiceV2.requireAdmin();

// Tab Navigation
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600');
        btn.classList.add('text-gray-600');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('border-blue-600', 'text-blue-600');
    event.target.classList.remove('text-gray-600');
    
    lucide.createIcons();
}

// Load Dashboard Stats
async function loadDashboard() {
    try {
        // Total de usuários
        const { count: usersCount } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
        document.getElementById('total-users').textContent = usersCount || 0;

        // Novos usuários (última semana)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const { count: newUsers } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', weekAgo.toISOString());
        document.getElementById('new-users').textContent = newUsers || 0;

        // Total de entradas de diário
        const { count: entriesCount } = await supabase
            .from('journal_entries')
            .select('*', { count: 'exact', head: true });
        document.getElementById('total-entries').textContent = entriesCount || 0;

        // Total de check-ins de humor
        const { count: moodsCount } = await supabase
            .from('mood_checkins')
            .select('*', { count: 'exact', head: true });
        document.getElementById('total-moods').textContent = moodsCount || 0;

        // Últimos registos
        const { data: recentUsers } = await supabase
            .from('users')
            .select('name, email, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        const recentUsersHtml = recentUsers && recentUsers.length > 0
            ? recentUsers.map(u => `
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        ${u.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-sm">${u.name}</p>
                        <p class="text-xs text-gray-500">${new Date(u.created_at).toLocaleDateString('pt-PT')}</p>
                    </div>
                </div>
            `).join('')
            : '<p class="text-gray-500 text-sm">Nenhum registo recente</p>';
        
        document.getElementById('recent-users').innerHTML = recentUsersHtml;

        // Estatísticas de humor
        const { data: moods } = await supabase
            .from('mood_checkins')
            .select('mood');

        const moodCounts = {};
        moods?.forEach(m => {
            moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
        });

        const moodIcons = {
            storm: '⛈️',
            rain: '🌧️',
            calm: '🌊',
            sunny: '☀️'
        };

        const moodStatsHtml = Object.entries(moodCounts).length > 0
            ? Object.entries(moodCounts).map(([mood, count]) => `
                <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span class="text-sm">${moodIcons[mood] || '😊'} ${mood}</span>
                    <span class="font-bold text-blue-600">${count}</span>
                </div>
            `).join('')
            : '<p class="text-gray-500 text-sm">Nenhum check-in ainda</p>';
        
        document.getElementById('mood-stats').innerHTML = moodStatsHtml;

    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Load Users Table
async function loadUsers() {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const tbody = document.getElementById('users-table');
        
        if (!users || users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                        <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
                        <p>Nenhum utilizador registado ainda</p>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = users.map(user => `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                ${user.name.charAt(0).toUpperCase()}
                            </div>
                            <span class="font-medium text-gray-900">${user.name}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${user.email}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${user.church || '-'}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">${new Date(user.created_at).toLocaleDateString('pt-PT')}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}">
                            ${user.role}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <button onclick="viewUserDetails('${user.id}')" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Ver Detalhes
                        </button>
                    </td>
                </tr>
            `).join('');
        }
        
        lucide.createIcons();
    } catch (error) {
        console.error('Erro ao carregar utilizadores:', error);
        document.getElementById('users-table').innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-red-500">
                    Erro ao carregar utilizadores
                </td>
            </tr>
        `;
    }
}

async function viewUserDetails(userId) {
    try {
        const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        const { count: entriesCount } = await supabase
            .from('journal_entries')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        const { count: moodsCount } = await supabase
            .from('mood_checkins')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        alert(`📋 Perfil de ${user.name}

Email: ${user.email}
Igreja: ${user.church || 'Não especificada'}
Função: ${user.role}
Registo: ${new Date(user.created_at).toLocaleDateString('pt-PT')}

📊 Atividade:
- Entradas no diário: ${entriesCount || 0}
- Check-ins de humor: ${moodsCount || 0}`);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar detalhes do utilizador');
    }
}

function refreshUsers() {
    loadUsers();
    alert('✅ Lista de utilizadores atualizada!');
}

// Save Content
async function saveContent() {
    try {
        const configs = [
            { key: 'hero_title', value: document.getElementById('hero-title').value },
            { key: 'hero_subtitle', value: document.getElementById('hero-subtitle').value },
            { key: 'stat1', value: document.getElementById('stat1').value },
            { key: 'stat1_desc', value: document.getElementById('stat1-desc').value },
            { key: 'stat2', value: document.getElementById('stat2').value },
            { key: 'stat2_desc', value: document.getElementById('stat2-desc').value },
            { key: 'stat3', value: document.getElementById('stat3').value },
            { key: 'stat3_desc', value: document.getElementById('stat3-desc').value }
        ];

        for (const config of configs) {
            await supabase
                .from('site_config')
                .upsert({ key: config.key, value: config.value, updated_at: new Date().toISOString() });
        }

        alert('✅ Conteúdo guardado na base de dados!\n\nPara aplicar no site, você precisará atualizar o ficheiro index.html.');
    } catch (error) {
        console.error('Erro ao guardar:', error);
        alert('❌ Erro ao guardar configurações');
    }
}

// Load and Save Resources
async function loadResources() {
    try {
        const { data: resources, error } = await supabase
            .from('resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const list = document.getElementById('resources-list');
        
        if (!resources || resources.length === 0) {
            list.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum recurso criado ainda</p>';
            return;
        }
        
        list.innerHTML = resources.map(res => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h3 class="font-bold text-gray-900 mb-1">${res.title}</h3>
                        <p class="text-sm text-gray-600 mb-2">${res.summary || 'Sem resumo'}</p>
                        <div class="flex gap-2 items-center">
                            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">${res.category}</span>
                            <span class="text-xs ${res.published ? 'text-green-600' : 'text-gray-400'}">${res.published ? '✓ Publicado' : '○ Rascunho'}</span>
                        </div>
                    </div>
                    <div class="flex gap-2 ml-4">
                        <button onclick="editResource('${res.id}')" class="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                        </button>
                        <button onclick="deleteResource('${res.id}')" class="p-2 text-red-600 hover:bg-red-50 rounded">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
    } catch (error) {
        console.error('Erro ao carregar recursos:', error);
    }
}

function showAddResourceModal() {
    document.getElementById('add-resource-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeAddResourceModal() {
    document.getElementById('add-resource-modal').classList.add('hidden');
    document.getElementById('new-res-title').value = '';
    document.getElementById('new-res-category').value = 'Bem-Estar';
    document.getElementById('new-res-summary').value = '';
    document.getElementById('new-res-content').value = '';
    document.getElementById('new-res-image').value = '';
}

async function createResource() {
    const title = document.getElementById('new-res-title').value;
    const category = document.getElementById('new-res-category').value;
    const summary = document.getElementById('new-res-summary').value;
    const content = document.getElementById('new-res-content').value;
    const image_url = document.getElementById('new-res-image').value;

    if (!title) {
        alert('Por favor, preencha pelo menos o título.');
        return;
    }

    try {
        const { error } = await supabase
            .from('resources')
            .insert([{
                title,
                category,
                summary,
                content,
                image_url: image_url || 'https://via.placeholder.com/400x300',
                published: true
            }]);

        if (error) throw error;

        alert('✅ Recurso criado com sucesso!');
        closeAddResourceModal();
        loadResources();
    } catch (error) {
        console.error('Erro ao criar recurso:', error);
        alert('❌ Erro ao criar recurso');
    }
}

async function editResource(id) {
    try {
        const { data: res } = await supabase
            .from('resources')
            .select('*')
            .eq('id', id)
            .single();

        const newTitle = prompt('Título:', res.title);
        if (!newTitle) return;

        const newCategory = prompt('Categoria:', res.category);
        const newSummary = prompt('Resumo:', res.summary);

        await supabase
            .from('resources')
            .update({
                title: newTitle,
                category: newCategory || res.category,
                summary: newSummary || res.summary
            })
            .eq('id', id);

        alert('✅ Recurso atualizado!');
        loadResources();
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao atualizar recurso');
    }
}

async function deleteResource(id) {
    if (!confirm('Tem certeza que deseja eliminar este recurso?')) return;

    try {
        const { error } = await supabase
            .from('resources')
            .delete()
            .eq('id', id);

        if (error) throw error;

        alert('✅ Recurso eliminado!');
        loadResources();
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao eliminar recurso');
    }
}

// Save Settings
async function saveSettings() {
    try {
        await supabase.from('site_config').upsert([
            { key: 'contact_email', value: document.getElementById('contact-email').value },
            { key: 'location', value: document.getElementById('location').value },
            { key: 'footer_desc', value: document.getElementById('footer-desc').value }
        ]);

        alert('✅ Configurações guardadas!');
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao guardar configurações');
    }
}

// Load Settings
async function loadSettings() {
    try {
        const { data } = await supabase
            .from('site_config')
            .select('*')
            .in('key', ['contact_email', 'location', 'footer_desc', 'hero_title', 'hero_subtitle', 'stat1', 'stat1_desc', 'stat2', 'stat2_desc', 'stat3', 'stat3_desc']);

        data?.forEach(config => {
            const el = document.getElementById(config.key.replace('_', '-'));
            if (el) el.value = config.value;
        });
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    
    await loadDashboard();
    await loadUsers();
    await loadResources();
    await loadSettings();
    
    // Refresh dashboard every 30 seconds
    setInterval(loadDashboard, 30000);
});
</script>

</body>
</html>
