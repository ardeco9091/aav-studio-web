@echo off
REM Script para hacer commit de todas las mejoras y preparar deploy

cd C:\desarrollo\agencia

echo.
echo 🔄 Configurando Git...
git config --global user.email "copilot@github.com"
git config --global user.name "Copilot"

echo.
echo 📦 Preparando cambios...
git add -A

echo.
echo 📋 Estado de cambios:
git status

echo.
echo 💾 Haciendo commit...
git commit -m "✨ Mejoras Performance + SEO + Accesibilidad + FAQ + Testimonios

- Removido AOS (30KB CDN) → IntersectionObserver + CSS (2KB)
- Agregado schema.json para SEO (LocalBusiness + 3 Services)
- Creado robots.txt y sitemap.xml para indexación
- WCAG 2.1 AA: focus-visible, aria-labels, skip links
- Sección FAQ con 4 preguntas interactivas
- Sección Testimonios con 3 clientes ficticios
- css/animations.css y css/accessibility.css creados
- _headers para cache-control en Netlify
- convert-images.js para optimización WebP (próximo paso)

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo 📤 Haciendo push a GitHub...
git push origin main

echo.
echo ✅ ¡Listo para deploy en Netlify!
echo 📍 URL: https://app.netlify.com/sites/aav-studio
echo.
pause
