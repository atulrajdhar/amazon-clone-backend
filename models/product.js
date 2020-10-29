import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
            id: Number,  // different from product._id (as created by MongoDB)
            title: String,
            shortDescription: String,
            longDescription: String,
            primaryImage: String,
            moreImages: [String],
            price: Number  
});

export default mongoose.model("product", productSchema);