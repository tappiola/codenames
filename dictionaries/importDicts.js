import {COLLECTION} from '../src/firebaseActions.js';
import fs from 'fs';

const locales = ['en', 'ru'];

for (const locale of locales) {
    const files = fs.readdirSync(`./${locale}`);
    files.forEach(f => {
        const data = fs.readFileSync(`./${locale}/${f}`, {encoding: 'utf8'});
        const wordsInFile = data.split("\n");
        COLLECTION.DICT[locale].doc(f.split('.')[0]).set({words: wordsInFile});
    })
}
