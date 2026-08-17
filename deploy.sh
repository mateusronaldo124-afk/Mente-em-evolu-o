#!/bin/bash
# Script para preparar e fazer deploy no GitHub Pages
# Use: ./deploy.sh seu_usuario seu_repositorio

if [ -z "$1" ] || [ -z "$2" ]; then
    echo ""
    echo "Uso: ./deploy.sh SEU_USUARIO SEU_REPOSITORIO"
    echo ""
    echo "Exemplo:"
    echo "  ./deploy.sh meuusuario pagina-vendas"
    echo ""
    exit 1
fi

USER=$1
REPO=$2
REMOTE_URL="https://github.com/$USER/$REPO.git"

echo ""
echo "===================================="
echo " Deploy para GitHub Pages"
echo "===================================="
echo ""

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Por favor, instale Git primeiro."
    exit 1
fi

# Inicializar repositório se não existir
if [ ! -d .git ]; then
    echo "📦 Inicializando repositório Git..."
    git init
    git branch -M main
fi

# Adicionar remoto se não existir
if ! git remote | grep -q "^origin$"; then
    echo "🔗 Adicionando remoto do GitHub..."
    git remote add origin "$REMOTE_URL"
else
    echo "🔄 Atualizando URL do remoto..."
    git remote set-url origin "$REMOTE_URL"
fi

# Adicionar arquivos
echo "📝 Adicionando arquivos..."
git add .

# Verificar se há mudanças
if ! git diff-index --quiet HEAD; then
    echo "💾 Commitando mudanças..."
    git commit -m "Atualização: preparado para GitHub Pages"
fi

# Push para main
echo "🚀 Enviando para GitHub..."
git push -u origin main

echo ""
echo "===================================="
echo "✅ Deploy concluído!"
echo "===================================="
echo ""
echo "Próximos passos:"
echo "1. Acesse: https://github.com/$USER/$REPO/settings"
echo "2. Procure por 'GitHub Pages'"
echo "3. Selecione Source: main branch /docs folder"
echo "4. Seu site estará em: https://$USER.github.io/$REPO/"
echo ""
