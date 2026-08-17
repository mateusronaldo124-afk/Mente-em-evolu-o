# 🚀 Guia Completo: Hospedar no GitHub Pages

## Pré-requisitos

- ✅ Conta no [GitHub](https://github.com) (crie uma se ainda não tiver)
- ✅ [Git instalado](https://git-scm.com/download/win) no seu computador

## ⚡ Opção 1: Instalação Rápida (Recomendado)

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. **Escolha um nome para o repositório**
   - Exemplo: `pagina-vendas` ou `mente-em-evolucao`
3. Selecione **Public** (necessário para Pages grátis)
4. Clique em **Create repository**
5. **Copie a URL** do repositório (ex: `https://github.com/seu_usuario/seu_repositorio.git`)

### Passo 2: Usar o Script de Deploy

#### No Windows:

```cmd
cd "C:\Users\pc\Desktop\Página de Vendas"
deploy.bat seu_usuario seu_repositorio
```

Exemplo:
```cmd
deploy.bat joaosilva pagina-vendas
```

#### No Mac/Linux:

```bash
cd "Página de Vendas"
chmod +x deploy.sh
./deploy.sh seu_usuario seu_repositorio
```

Exemplo:
```bash
./deploy.sh joaosilva pagina-vendas
```

### Passo 3: Configurar GitHub Pages

1. Acesse seu repositório: `https://github.com/seu_usuario/seu_repositorio`
2. Vá em **⚙️ Settings** (Configurações)
3. No menu à esquerda, encontre **Pages**
4. Em **Source**, selecione:
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Clique em **Save**
6. Aguarde alguns minutos... ⏳

### Passo 4: Acessar seu Site

Seu site estará disponível em:
```
https://seu_usuario.github.io/seu_repositorio/
```

Exemplo:
```
https://joaosilva.github.io/pagina-vendas/
```

---

## 📋 Opção 2: Passo a Passo Manual

Se preferir fazer manualmente, abra o **Terminal/PowerShell** e execute:

```bash
# Navegue até a pasta do projeto
cd "C:\Users\pc\Desktop\Página de Vendas"

# Inicialize o repositório Git
git init

# Defina a branch principal como "main"
git branch -M main

# Adicione todos os arquivos
git add .

# Faça o commit inicial
git commit -m "Inicial: página de vendas"

# Adicione o remoto do GitHub
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Envie para o GitHub
git push -u origin main
```

Depois, siga os **Passos 3 e 4** acima.

---

## 🔄 Atualizações Futuras

Sempre que fizer mudanças no projeto:

```bash
# Adicione os arquivos modificados
git add .

# Faça um commit descritivo
git commit -m "Descrição da mudança"

# Envie para o GitHub
git push
```

---

## ❓ Troubleshooting

### "Git não é reconhecido"
- Baixe Git em: https://git-scm.com/download/win
- Reinicie o Terminal/PowerShell após instalar

### "Erro de autenticação (403)"
- GitHub exige autenticação por **Personal Access Token** (não senha)
- Gere um token em: https://github.com/settings/tokens
- Use o token como senha no terminal

### "Site não aparece depois de 5 minutos"
- Aguarde um pouco mais (GitHub Pages pode levar até 10 minutos)
- Verifique se selecionou a pasta `/docs` nas configurações de Pages
- Verifique se o repositório está **Public**

### "Quer atualizar apenas alguns arquivos?"
```bash
# Adicione apenas um arquivo
git add caminho/arquivo.html

# Ou múltiplos arquivos
git add docs/style.css docs/script.js

git commit -m "Atualizar estilos e scripts"
git push
```

---

## 💡 Dicas Úteis

✨ **Visualizar localmente antes de publicar:**
```bash
python -m http.server 8000
# Abra: http://localhost:8000/docs
```

🔒 **Proteger a branch main** (opcional):
1. Vá em **Settings** → **Branches**
2. Ative **Require a pull request before merging**

📊 **Monitorar acessos** (opcional):
1. Ative Google Analytics no `index.html`
2. Adicione as credenciais no head do arquivo

---

## 🎉 Pronto!

Seu site está no ar! Compartilhe a URL com seus clientes:
```
https://seu_usuario.github.io/seu_repositorio/
```

Boa sorte com sua página de vendas! 🚀
