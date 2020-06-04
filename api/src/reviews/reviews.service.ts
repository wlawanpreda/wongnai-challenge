import { Injectable } from '@nestjs/common';
import { Review } from "./interfaces/review.interface";

import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

@Injectable()
export class ReviewsService {

    private reviews: Review[] = [];

     constructor() {
        console.log('constructor');

        const pathDB = path.resolve(__dirname, '..', '..', 'db', 'test_file.csv');

        fs.createReadStream(pathDB)
            .pipe(csv.parse({ headers: true, delimiter: ';' }))
            .on('error', error => console.error(error))
            .on('data', row => this.reviews.push(row))
            .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))

    }

    // check is is number ??  1a, aa
    findById(id: Number): Review {
        console.log("PJ-LOG: ReviewsService -> findById -> this.reviews", this.reviews)
        return this.reviews.find(({reviewID}) => reviewID==id);
    }

    findByKeyword(query: string): Review[] {
        return this.reviews.filter(({review}) => review.includes(query))
    }

}
