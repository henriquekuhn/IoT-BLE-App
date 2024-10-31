@echo off
echo Starting deployment...

REM Execute ionic build
echo Running ionic build...
ionic build
IF ERRORLEVEL 1 (
    echo Build failed. Check for errors above.
    pause
    exit /b 1
) ELSE (
    echo Build completed successfully.
)

REM Execute ionic cap copy
echo Running ionic cap copy...
ionic cap copy
IF ERRORLEVEL 1 (
    echo Cap copy failed. Check for errors above.
    pause
    exit /b 1
) ELSE (
    echo Cap copy completed successfully.
)

REM Execute ionic cap sync
echo Running ionic cap sync...
ionic cap sync
IF ERRORLEVEL 1 (
    echo Cap sync failed. Check for errors above.
    pause
    exit /b 1
) ELSE (
    echo Cap sync completed successfully.
)

echo Deployment completed successfully!
pause
