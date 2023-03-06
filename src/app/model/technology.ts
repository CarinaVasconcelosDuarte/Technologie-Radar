export interface Technology {
    name : string;
    category : string;
    ring : string;
    descTech : string;
    descRing : string;
    published : boolean;
    publishedAt : Date;
    createdAt : Date;
    createdBy : string;
    history : [{
        name : string,
        changedBy : string,
        updatedAt : Date
    }];
}