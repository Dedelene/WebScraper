import parquet from 'parquetjs-lite';
import Wappalyzer from 'wappalyzer';
import fs from 'fs/promises';

async function citireParquet() {
    const domenii = [];
    try {
        const reader = await parquet.ParquetReader.openFile('data.parquet');
        const cursor = reader.getCursor();
        let record = null;
        while(record = await cursor.next()){
            domenii.push(record.root_domain);
        }
        await reader.close();
        return domenii;
    } catch (error) {
        console.error('Error reading Parquet file:', error);
    }
}

async function fetchTehnologii(url){
        const wappalyzer = new Wappalyzer();
    try {
        await wappalyzer.init();
        const site = await wappalyzer.open("https://" + url);
        const rezultate = await site.analyze();
        await wappalyzer.destroy();

        return rezultate.technologies.map(tech => tech.name);
    } catch (error) {
        try {
            await wappalyzer.init();
            const site = await wappalyzer.open("http://" + url);
            const rezultate = await site.analyze();
            await wappalyzer.destroy();

            return rezultate.technologies.map(tech => tech.name);
        } catch (error) {

        console.error(`Eroare la scanarea domeniului ${url}:`, error.message);
        await wappalyzer.destroy();
        return [];
            
        }
    }
    
}

async function main() {
    const domenii = await citireParquet();
    const tehnologiiUnice = new Set();
    for(const domeniu of domenii){
        const tehnologiiGasite = await fetchTehnologii(domeniu);
        for(const tech of tehnologiiGasite) {
            tehnologiiUnice.add(tech);
        }
        console.log(tehnologiiUnice.size);
    }
    const tehnologiiFormatate = Array.from(tehnologiiUnice).join('\n');
    const continutFisier = `Total tehnologii: ${tehnologiiUnice.size}\n\n${tehnologiiFormatate}`;
    
    try {
        await fs.writeFile('tehnologii.txt', continutFisier, 'utf-8');
    } catch (error) {
        console.error('Eroare la incarcarea datelor in fisier:', error);
    }
}

main();