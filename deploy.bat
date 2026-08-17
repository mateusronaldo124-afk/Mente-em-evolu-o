@echo off
REM Script para preparar e fazer deploy no GitHub Pages
REM Use: deploy.bat seu_usuario seu_repositorio

setlocal enabledelayedexpansion

if "%~1"=="" (
    echo.
    echo Uso: deploy.bat SEU_USUARIO SEU_REPOSITORIO
    echo.
    echo Exemplo:
    echo   deploy.bat meuusuario pagina-vendas
    echo.
    exit /b 1
)

set USER=%~1
set REPO=%~2
set REMOTE_URL=https://github.com/%USER%/%REPO%.git

echo.
echo ====================================
echo  Deploy para GitHub Pages
echo ====================================
echo.

REM Verificar se Git está instalado
where git >nul 2>nul
if errorlevel 1 (
    echo ❌ Git não está instalado. Por favor, instale Git primeiro.
    echo    Baixe em: https://git-scm.com/download/win
    exit /b 1
)

REM Inicializar repositório se não existir
if not exist .git (
    echo 📦 Inicializando repositório Git...
    git init
    git branch -M main
)

REM Adicionar remoto se não existir
git remote | findstr /c:"origin" >nul
if errorlevel 1 (
    echo 🔗 Adicionando remoto do GitHub...
    git remote add origin %REMOTE_URL%
) else (
    echo 🔄 Atualizando URL do remoto...
    git remote set-url origin %REMOTE_URL%
)

REM Adicionar arquivos
echo 📝 Adicionando arquivos...
git add .

REM Verificar se há mudanças
git diff-index --quiet HEAD
if not errorlevel 1 (
    echo 💾 Commitando mudanças...
    git commit -m "Atualização: preparado para GitHub Pages"
)

REM Push para main
echo 🚀 Enviando para GitHub...
git push -u origin main

echo.
echo ====================================
echo ✅ Deploy concluído!
echo ====================================
echo.
echo Próximos passos:
echo 1. Acesse: https://github.com/%USER%/%REPO%/settings
echo 2. Procure por "GitHub Pages"
echo 3. Selecione Source: main branch /docs folder
echo 4. Seu site estará em: https://%USER%.github.io/%REPO%/
echo.
