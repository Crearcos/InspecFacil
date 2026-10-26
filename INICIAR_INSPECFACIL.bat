@echo off
title InspecFacil - Servidor de Demostracion
echo ===================================================================
echo               INSPECFACIL - PROTOTIPO DEMO INDUSTRIAL
echo    Checklists Digitales, Mantenimiento Preventivo y Reportes PDF
echo ===================================================================
echo.
echo [1/2] Iniciando servidor web de alta velocidad...
echo [2/2] Abriendo el navegador en http://localhost:3000 ...
echo.
start http://localhost:3000
npm run dev
pause
