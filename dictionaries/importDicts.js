// import {COLLECTION} from '../src/firebaseActions.js';
import {db} from '../src//firebase';
import fs from 'fs';

const locales = ['en', 'ru'];

for (const locale of locales) {
    const files = fs.readdirSync(`./${locale}`);
    console.log(files)
    files.forEach(f => {
        const data = fs.readFileSync(`./${locale}/${f}`, {encoding: 'utf8'});
        const wordsInFile = data.split("\n");
        //COLLECTION.DICTS_RU.doc(f.split('.')[0]).set({words: wordsInFile});
        db.collection(`dicts_${locale}`).doc(f.split('.')[0]).set({words: wordsInFile});
    })
}
