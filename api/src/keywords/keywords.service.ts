import { Injectable } from '@nestjs/common';

import * as fs from "fs";
import * as path from 'path';

@Injectable()
export class KeywordsService {

    private keywords: string[] = [];

    constructor() {

        const pathDB = path.resolve(__dirname, '..', '..', 'db', 'food_dictionary.txt');

        const label = 'keywords';
        // console.time(label);
        const stream = fs.createReadStream(pathDB, {encoding: 'utf8'});
        stream.on('data', data => { 
            this.keywords = [
                ...this.keywords
                , ...data.toString().split(/\n/)
            ];
            if(this.keywords.length>2000) {
                this.keywords = this.keywords.slice(0, 2000);
                stream.destroy();
            }
        }); 
        
        stream.on('close', () => {
            // console.timeEnd(label);
        });
        
    }

    findAll(query): string[] {
        if(query)
            return this.keywords.filter(v => v.includes(query));
        return this.keywords;
    }

    vaild(query): boolean {
        return this.keywords.find(v => v===query) ? true : false;
    }

}
