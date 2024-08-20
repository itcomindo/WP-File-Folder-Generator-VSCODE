const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.generateWpTheme', function () {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Please open a folder first.');
            return;
        }

        // Struktur folder
        const folders = [
            'assets/css',
            'assets/images',
            'assets/js',
            'assets/libs',
            'inc/components',
            'inc/fields',
            'inc/sections',
            'inc/template-parts'
        ];

        // Struktur file
        const files = [
            // Assets Folder.
            'assets/index.php',
            'assets/assets.php',
            'assets/css/index.php',
            'assets/images/index.php',
            'assets/images/images.php',
            'assets/js/index.php',
            'assets/libs/index.php',
            // Inc Folder.
            'inc/index.php',
            'inc/inc.php',
            // Inc Components Folder.
            'inc/components/index.php',
            'inc/components/components.php',
            // Inc Fields Folder.
            'inc/fields/index.php',
            'inc/fields/fields.php',
            // Inc Sections Folder.
            'inc/sections/index.php',
            'inc/sections/sections.php',
            // Inc Template Parts Folder.
            'inc/template-parts/index.php',
            'inc/template-parts/template-part.php',
            '404.php',
            'author.php',
            'category.php',
            'footer.php',
            'front-page.php',
            'functions.php',
            'header.php',
            'home.php',
            'index.php',
            'page.php',
            'search.php',
            'single.php',
            'tag.php',
            'style.css',
            'screenshot.png'
        ];

        // Buat folder dan file
        folders.forEach(folder => {
            const folderPath = path.join(rootPath, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            // Buat index.php di setiap folder
            const indexFilePath = path.join(folderPath, 'index.php');
            if (!fs.existsSync(indexFilePath)) {
                const content = `<?php\n\n/**\n *\n * Silence is golden\n * @package gant-package\n */\n\ndefined('ABSPATH') || die('No script kiddies please!');\n`;
                fs.writeFileSync(indexFilePath, content, { encoding: 'utf8' });
            }
        });

        files.forEach(file => {
            const filePath = path.join(rootPath, file);
            if (!fs.existsSync(filePath)) {
                let content = '';
                const fileName = path.basename(file, '.php');

                if (file.endsWith('index.php')) {
                    content = `<?php\n\n/**\n *\n * Silence is golden\n * @package gant-package\n */\n\ndefined('ABSPATH') || die('No script kiddies please!');\n`;
                } else if (file.endsWith('.php')) {
                    if (fileName === 'functions' || fileName === 'header' || fileName === 'footer' || fileName === 'assets' || fileName === 'inc' || fileName === 'sections' || fileName === 'fields' || fileName === 'components' || fileName === 'template-parts') {
                        content = `<?php\n\n/**\n *\n * Functions\n * @package ganti-package\n */\n\ndefined('ABSPATH') || die('No script kiddies please!');\n`;
                    } else {
                        const capitalizedFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
                        content = `<?php\n\n/**\n *\n * ${capitalizedFileName}\n * @package ganti-package\n */\n\ndefined('ABSPATH') || die('No script kiddies please!');\n\nget_header();\nget_footer();\n`;
                    }
                } else if (file.endsWith('.css')) {
                    content = `/**\n=========================\n* Theme Name: \tTheme Name\n* Theme URI: \thttp://www.yourwebsite.com\n* Description: \tTheme Description\n* Author: \t\tAuthor Name\n* Author URI: \thttp://www.yourwebsite.com\n* Version: \t\t1.0.0\n*=========================\n*/\n`;
                } else if (file.endsWith('.png')) {
                    content = ''; // Kosongkan untuk file gambar
                }

                fs.writeFileSync(filePath, content, { encoding: 'utf8' });
            }
        });

        vscode.window.showInformationMessage('WordPress Theme Folders and Files Generated Successfully!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
