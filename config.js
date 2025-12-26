const SUPABASE_URL = 'https://hdqkczgbekklpcwvdrgq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWtjemdiZWtrbHBjd3ZkcmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MDg3MDYsImV4cCI6MjA4MjI4NDcwNn0.4xzMWcU4KzT6dm61x_AP4NFaEzZxtXbbt3tvTwk43sU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('users').select('count');
        if (error) throw error;
        console.log('✅ Conexão com Supabase estabelecida!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar:', error.message);
        alert('Erro de conexão com banco de dados. Verifique config.js');
        return false;
    }
}

testConnection();
```

5. **⚠️ Substitua** `COLE_SUA_URL_AQUI` e `COLE_SUA_KEY_AQUI` pelas suas chaves reais

6. **Clique em "Commit changes"**

---

## **✅ RESPOSTA CURTA:**

**SIM, PODE APAGAR!** O `config.js` antigo não serve mais. Substitua pelo novo com Supabase.

---

## **🎯 RESUMO DO QUE FAZER:**
```
1. Apagar config.js antigo ❌
2. Criar config.js novo ✅ (com Supabase)
3. Criar auth-v2.js ✅ (novo arquivo)
4. Criar admin-v2.html ✅ (novo arquivo)
