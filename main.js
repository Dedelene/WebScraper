import parquet from 'parquetjs-lite';

async function citireParquet() {
    const domenii = [];
    try {
        const reader = await parquet.ParquetReader.openFile('data.parquet');
        const cursor = reader.getCursor();
        let record = null;
        while(record = await cursor.next()){
            domenii.push(record.root_domain);
        }
        return domenii;
    } catch (error) {
        console.error('Error reading Parquet file:', error);
    }
}

async function main() {
    const domenii = await citireParquet();
    console.log(domenii);
}

main();