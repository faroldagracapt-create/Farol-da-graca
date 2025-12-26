const SUPABASE_URL = 'https://hdqkczgbekklpcwvdrgq.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWtjemdiZWtrbHBjd3ZkcmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MDg3MDYsImV4cCI6MjA4MjI4NDcwNn0.4xzMWcU4KzT6dm61x_AP4NFaEzZxtXbbt3tvTwk43sU';
```
   
   ⚠️ **Substitua `SUA_CHAVE_ANON_AQUI` pela chave real que você copiou**

5. **Clique em "Commit changes"**

---

### **PASSO 3: CRIAR AS 5 TABELAS NO SUPABASE**

Agora vamos criar as tabelas para guardar os dados.

1. **No Supabase, clique em 🗄️ Table Editor** (menu lateral esquerdo)

2. **Clique no botão verde "New table"**

---

#### **TABELA 1: users** (Utilizadores)

**Preencha:**
- **Name:** `users`
- **Description:** Dados dos utilizadores (opcional)
- **Enable Row Level Security (RLS):** ✅ **ATIVE**

**Colunas (clique em "+" para adicionar cada uma):**

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | `gen_random_uuid()` | Primary Key ✅ |
| created_at | timestamptz | `now()` | - |
| name | text | - | - |
| email | text | - | - |
| password | text | - | - |
| church | text | `NULL` | Is Nullable ✅ |
| role | text | `'user'` | - |

**Clique em "Save"**

---

#### **TABELA 2: journal_entries** (Entradas de Diário)

**Clique em "New table" novamente**

- **Name:** `journal_entries`
- **Enable RLS:** ✅

**Colunas:**

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | `gen_random_uuid()` | Primary Key ✅ |
| created_at | timestamptz | `now()` | - |
| user_id | uuid | - | - |
| content | text | - | - |
| encrypted | bool | `true` | - |

**Clique em "Save"**

---

#### **TABELA 3: mood_checkins** (Check-ins de Humor)

**Clique em "New table"**

- **Name:** `mood_checkins`
- **Enable RLS:** ✅

**Colunas:**

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | `gen_random_uuid()` | Primary Key ✅ |
| created_at | timestamptz | `now()` | - |
| user_id | uuid | - | - |
| mood | text | - | - |

**Clique em "Save"**

---

#### **TABELA 4: resources** (Recursos/Artigos)

**Clique em "New table"**

- **Name:** `resources`
- **Enable RLS:** ✅

**Colunas:**

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | `gen_random_uuid()` | Primary Key ✅ |
| created_at | timestamptz | `now()` | - |
| title | text | - | - |
| category | text | - | - |
| summary | text | `NULL` | Is Nullable ✅ |
| content | text | `NULL` | Is Nullable ✅ |
| image_url | text | `NULL` | Is Nullable ✅ |
| published | bool | `true` | - |

**Clique em "Save"**

---

#### **TABELA 5: site_config** (Configurações do Site)

**Clique em "New table"**

- **Name:** `site_config`
- **Enable RLS:** ✅

**Colunas:**

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | `gen_random_uuid()` | Primary Key ✅ |
| key | text | - | Is Unique ✅ |
| value | text | - | - |
| updated_at | timestamptz | `now()` | - |

**Clique em "Save"**

---

### **PASSO 4: CRIAR POLÍTICAS DE SEGURANÇA**

Para CADA uma das 5 tabelas que você criou:

1. **Clique na tabela** (ex: `users`)
2. **Clique na aba "Policies"** (ao lado de "Definition")
3. **Clique em "New Policy"**
4. **Clique em "Get started quickly"**
5. **Escolha a opção:** "Enable read access for all users"
6. **Clique em "Review"**
7. **Clique em "Save policy"**

**Repita isso para as 5 tabelas:**
- users
- journal_entries
- mood_checkins
- resources
- site_config

---

## **✅ CHECKLIST - MARQUE O QUE JÁ FEZ:**

- [ ] Copiei a URL do projeto Supabase
- [ ] Copiei a API Key (anon/public)
- [ ] Coloquei ambas no `config.js` do GitHub
- [ ] Criei a tabela `users`
- [ ] Criei a tabela `journal_entries`
- [ ] Criei a tabela `mood_checkins`
- [ ] Criei a tabela `resources`
- [ ] Criei a tabela `site_config`
- [ ] Criei políticas (policies) para todas as 5 tabelas

---

## **🎯 DEPOIS DE TUDO ISSO:**

**Acesse seu painel admin:**
```
https://faroldagracapt-create.github.io/Farol-da-graca/admin-v2.html
