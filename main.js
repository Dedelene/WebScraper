import parquet from 'parquetjs-lite';
import Wappalyzer from 'wappalyzer';

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
        
        console.error(`Eroare la scanarea domeniului ${url}:`, error.message);
        await wappalyzer.destroy();
        return [];
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
}

main();