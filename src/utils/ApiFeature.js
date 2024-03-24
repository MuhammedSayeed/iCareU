export class ApiFeatures {
    constructor(model, queryString, _id) {
        this.mongooseQuery = model.find(_id ? { _id } : {});
        this.queryString = queryString;
        this.model = model;
    }
    paginate(limit) {
        let page = parseInt(this.queryString.page);
        const isValidNumber = Number.isInteger(page) && page > 0;
        if (!isValidNumber) page = 1;
        let skip = (page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit);
        this.currentPage = page;
        this.totalDocs = this.model.countDocuments();
        this.limit = limit;
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            let sortedBy = this.queryString.sort.replace(',', ' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or:
                    [
                        { title: { $regex: this.queryString.keyword, $options: 'i' } },
                        { description: { $regex: this.queryString.keyword, $options: 'i' } }
                    ]
            })
        }
        return this;
    }
    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.replace(',', ' ');
            this.mongooseQuery.select(fields);
        }
        return this;
    }
}