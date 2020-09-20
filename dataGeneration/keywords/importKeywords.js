import {COLLECTION} from '../../src/firebaseActions.js';
import fs from 'fs';

const locales = ['en', 'ru'];

for (const locale of locales) {

    const data = fs.readFileSync(`./${locale}.txt`, {encoding: 'utf8'});
    const wordsInFile = data.split("\n");
    COLLECTION.KEYWORD[locale].doc('keywords').set({words: wordsInFile});

}
