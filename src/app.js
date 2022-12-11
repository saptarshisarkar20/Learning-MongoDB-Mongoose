const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const validator = require("validator");

// console.log("Running..........??");

//* CONNECTING
// mongoose
//     .connect("mongodb://127.0.0.1/learnmongo", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to Mongo DB"))
//     .catch((err) => console.log(err));

const connectIT = async () => {

    try {
        const result = await mongoose.connect("mongodb://127.0.0.1/learnmongo", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log(result);
        console.log("Connection Successful");

    } catch (error) {
        console.log(error);
    }
}

connectIT();


//* MAKING SCHEMA
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        //* VALIDATION
        lowercase: true,
        trim: true
    },
    ctype: {
        type: String,
        //* VALIDATION 
        lowercase: true,
        enum: ["frontend", "backend", "database"],
    },
    videos:
    {


        type: Number,

        //* CUSTOM VALIDATOR
        validate(value) {
            if (value < 0) {
                throw new Error("Videos Count Should Not be Negative");
            }
        },
    },

    author: {
        type: String,
        //* VALIDATION
        minlength: [3, "MINIMUM 2 LETTERS REQUIRED"],       //? CUSTOM VALIDATION MESSEGE
        maxlength: 30

    },

    email: {
        type: String,
        required: true,
        lowercase: true,

        //* VALIDATION USING VALIDATOR NPM PACKAGE
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    },

    active: Boolean,
    date: {
        type: Date,
        default: Date.now,
    },
});

// * MAKING MODEL
// * CREATING COLLECTION - should be in pascal case (first letter capital)

const Playlist = mongoose.model("Playlist", playlistSchema);

//* INSERTING  & CREATING DOCUMENTS
//! old method

// const reactPlaylist = new Playlist({
//     name: "React JS",
//     ctype: "Front End",
//     videos: 80,
//     author: "IamSS",
//     active: true,
// });

// reactPlaylist.save();

// ? new method

const createDocument = async () => {
    try {
        const insertPlaylist = new Playlist({
            name: "NEW JS",
            ctype: "BackEnd",
            videos: 7,
            author: "IamSS",
            email: "ITSMYMAIL@gmail.com",
            active: true,
        });
        const result = await insertPlaylist.save();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

createDocument();

//* INSERTING MANY VALUES TOGETHER

// const createDocument = async () => {
//     try {
//         const jsPlaylist = new Playlist({
//             name: "Java Script",
//             ctype: "Front End",
//             videos: 150,
//             author: "IamSS",
//             active: true,
//         });

//         const mongoPlaylist = new Playlist({
//             name: "MongoDB",
//             ctype: "Database",
//             videos: 5,
//             author: "IamSS",
//             active: false,
//         });

//         const mongoosePlaylist = new Playlist({
//             name: "Mongoose",
//             ctype: "Database",
//             videos: 3,
//             author: "IamSS",
//             active: true,
//         });

//         const expressPlaylist = new Playlist({
//             name: "Express JS",
//             ctype: "Back End",
//             videos: 20,
//             author: "IamSS",
//             active: false,
//         });

//         const result = await Playlist.insertMany([
//             jsPlaylist,
//             mongoosePlaylist,
//             mongoPlaylist,
//             expressPlaylist,
//         ]);
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     }
// };

// createDocument();

//* QUEARY DOCUMENTS

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({ ctype: "Front End" }).select({
//             name: 1,
//             _id: 0,
//         });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// ?COMPARISON OPERATOR

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({ videos: { $gte: 50 } }).select({
//             name: 1,
//             _id: 0,
//             videos: 1,
//         });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({
//             ctype: { $in: ["Back End", "Database"] },
//         }).select({
//             _id: 0,
//             name: 1,
//             ctype: 1,
//         });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

//? LOGICAL OPERATOR

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({
//             $or: [{ ctype: "Back End" }, { active: true }],
//         }).select({
//             _id: 0,
//             name: 1,
//             ctype: 1,
//             active:1,
//         });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({
//             $and: [{ ctype: "Back End" }, { active: true }],
//         }).select({
//             _id: 0,
//             name: 1,
//             ctype: 1,
//             active: 1,
//         });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

//* COUNTING DOCUMENTS

// const getDocument = async () => {
//     try {
//         const result = await Playlist.find({
//             $or: [{ ctype: "Back End" }, { active: true }],
//         })
//             .select({
//                 _id: 0,
//                 name: 1,
//                 ctype: 1,
//                 active: 1,
//             })
//             .countDocuments();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

//* SORTING
// const getDocument = async () => {
//     try {
//         const result = await Playlist.find()
//             .select({
//                 _id: 0,
//                 name: 1,
//                 videos: 1,
//             })
//             .sort({ videos: -1 });
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// getDocument();

//* UPDATING DOCUMENT
// const updateDocument = async (id) => {
//     try {
//         const result = await Playlist.updateOne(
//             { _id: id },
//             { $set: { name: "JavaScript" } }
//         );
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// };

// updateDocument("6393799ce668aa2cc1130326");

//*FIND & UPDATE
// const updateDocument = async (id) => {
//     try {
//         const result = await Playlist.findOneAndUpdate(
//             { _id: id },
//             { $set: { name: "JavaScript" } },
//             { new: true }
//         );
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// };

// updateDocument("6393799ce668aa2cc1130326");


//* DELETING DOCUMENT
// const deleteDocument = async (_name) => {
//     try {
//         const result = await Playlist.deleteOne({ name: _name });
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }
// deleteDocument("Mongoose");





