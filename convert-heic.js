const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(__dirname, 'images');
const folders = ['windt', 'cineforum', 'limoncillo'];

async function convertHeicToJpg() {
    console.log('🔄 Iniciando conversión de HEIC a JPG...\n');

    for (const folder of folders) {
        const folderPath = path.join(imageDir, folder);
        const files = fs.readdirSync(folderPath);

        const heicFiles = files.filter(file => file.toLowerCase().endsWith('.heic'));

        console.log(`📁 Carpeta: ${folder}`);
        console.log(`   Total de archivos HEIC: ${heicFiles.length}`);

        for (const file of heicFiles) {
            const inputPath = path.join(folderPath, file);
            const outputPath = path.join(folderPath, file.replace(/\.heic$/i, '.jpg'));

            try {
                await sharp(inputPath)
                    .jpeg({ quality: 85 })
                    .toFile(outputPath);

                console.log(`   ✅ ${file} → ${path.basename(outputPath)}`);
                
                // Eliminar archivo HEIC original después de conversión exitosa
                fs.unlinkSync(inputPath);
                console.log(`   🗑️  Archivo HEIC eliminado`);
            } catch (error) {
                console.log(`   ❌ Error en ${file}: ${error.message}`);
            }
        }
        console.log('');
    }

    console.log('✨ Conversión completada');
}

convertHeicToJpg().catch(console.error);
