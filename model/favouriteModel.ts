import mongoose from "mongoose";

interface Favourite {
  favUserName: string;
  favProject: {};
}

interface iFaourite extends Favourite, mongoose.Document {}

const favouriteSchema = new mongoose.Schema({
  favUserName: {
    type: String,
  },
  favProject: {
    type: {
      type: Object,
    },
  },
});

const favouriteModule = mongoose.model<iFaourite>("favourite", favouriteSchema);
export default favouriteModule;
