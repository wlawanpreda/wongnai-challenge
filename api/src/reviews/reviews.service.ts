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
            .on('data', row => this.reviews.push({ ...row, version: 0 }))
            .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))

    }

    // check is is number ??  1a, aa
    findById(id: number): Review {
        // console.log("PJ-LOG: ReviewsService -> findById -> this.reviews", this.reviews)
        return this.reviews.find(({reviewID}) => reviewID===id);
    }

    findByKeyword(query: string): Review[] {
        return this.reviews.filter(({review}) => review.includes(query))
    }

    editReviewById(id: number, review: string, version: number): Review {
        const foundIndex = this.reviews.findIndex(({reviewID}) => reviewID===id);
        const target = this.reviews[foundIndex];
        if(target.version!==version)
            throw "version not match";

        target.review = review;
        target.version++;
        return target;
    }

}
