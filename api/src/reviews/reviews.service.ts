import { Injectable } from '@nestjs/common';
import { Review } from "./interfaces/review.interface";

import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";


import { PubSub } from "graphql-subscriptions";

@Injectable()
export class ReviewsService {

    //not use
    private editing: string[] = [];

    private reviews: Review[] = [];

    public pubSub = new PubSub();

    constructor() {
        const pathDB = path.resolve(__dirname, '..', '..', 'db', 'test_file.csv');

        fs.createReadStream(pathDB, {encoding: 'utf8'})
            .pipe(csv.parse({ headers: true, delimiter: ';' }))
            .on('error', error => console.error(error))
            .on('data', row => this.reviews.push({ ...row, version: 0 }))
            // .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))

    }

    findAll(): Review[] {
        this.pubSub.publish('editing', { editing: this.editing });
        return this.reviews;
    }

    // check is is number ??  1a, aa
    findById(id: string): Review {
        // console.log("PJ-LOG: ReviewsService -> findById -> this.reviews", this.reviews)
        return this.reviews.find(({reviewID}) => reviewID===id);
    }

    findByKeyword(query: string): Review[] {
        if(query)
            return this.reviews.filter(({review}) => review.includes(query)).map(obj => ({
                reviewID: obj.reviewID,
                version: obj.version,
                review: obj.review.replace(new RegExp(query, 'g'), `<keyword>${query}</keyword>`)
            }));
        else
            return this.reviews.slice(0, 100);
    }

    editReviewById(id: string, review: string, version: number): Review {
        const foundIndex = this.reviews.findIndex(({reviewID}) => reviewID===id);
        if(foundIndex===-1) throw `can not find this id;${id}`;

        const target = this.reviews[foundIndex];
        if(target.version!==version) throw "version not match";

        target.review = review;
        target.version++;

        this.editing = this.editing.filter(v => v!==id);


        this.pubSub.publish('editing', { 
            editing: this.editing,
            updateData: target
        });
        return target;
    }


    //not use
    getEditing(): string[] {
        return this.editing;
    }

    //not use
    reserveEdit(id: string) {
        if(this.editing.includes(id)) {
            return false;
        } else {
            const { editing } = this;
            this.editing.push(id);
            this.pubSub.publish('editing', { editing: this.editing });
            return true;
        }
    }

}
