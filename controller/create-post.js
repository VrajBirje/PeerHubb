const PostContainer = require("../models/PostContainer");
const Library = require("../models/library");
const Post = require("../models/PostContainer");

// module.exports.CreatePost = async function (req, res) {
//   try {
//     console.log(req.rootUser._id);
//     console.log(req.body);
//     const uid = req.rootUser._id;
//     const heading = req.body.heading;
//     const description = req.body.message;
//     const type = req.body.type;
//     const status = "false";
//     const hidden = req.body.hidden;
//     const sub = req.body.subject;
//     const isToxic = req.body.isToxic;
//     if (!uid || !heading || !description || !type || !hidden || !sub) {
//       console.log("invalid ");
//       return res.json(400, {
//         message: "Invalid",
//       });
//     }

//     PostContainer.create(
//       {
//         user: uid,
//         heading: heading,
//         description: description,
//         type: type,
//         hidden: hidden,
//         status: status,
//         isToxic: isToxic,
//       },
//       function (err, post) {
//         if (err) {
//           console.log(err);
//           return res.status(400).json({ message: err });
//         }

//         if (req.files) {
//           var files = req.files.img;
//           files.mv("uploads/users/" + files.name, function (err) {
//             if (err) {
//               console.log(err);
//             }
//           });

//           const pathimg =
//             "http://52.89.33.49:7780/uploads/users" + "/" + files.name;
//           post.avatar = pathimg;
//           console.log(post.avatar);
//           console.log(pathimg);
//         }

//         if (sub) {
//           post.subject = sub;
//         }

//         post.vote = 0;
//         post.save();
//       }
//     );

//     console.log("Kamm ");
//     return res.json(200, {
//       message: "Post completed",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ message: err });
//   }
// };

module.exports.CreatePost = async function (req, res) {
  try {
    console.log(req.rootUser._id);
    console.log(req.body);
    const uid = req.rootUser._id;
    const heading = req.body.heading;
    const description = req.body.message;
    const type = req.body.type;
    const status = "false";
    const hidden = req.body.hidden;
    const sub = req.body.subject;
    const isToxic = req.body.isToxic;
    if (!uid || !heading || !description || !type || !hidden || !sub) {
      console.log("invalid ");
      return res.status(400).json({
        message: "Invalid",
      });
    }

    PostContainer.create(
      {
        user: uid,
        heading: heading,
        description: description,
        type: type,
        hidden: hidden,
        status: status,
        isToxic: isToxic,
      },
      function (err, post) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err });
        }

        if (req.files) {
          var files = req.files.img;
          files.mv("uploads/users/" + files.name, function (err) {
            if (err) {
              console.log(err);
            }
          });

          const pathimg =
            "http://52.89.33.49:7780/uploads/users" + "/" + files.name;
          post.avatar = pathimg;
          console.log(post.avatar);
          console.log(pathimg);
        }

        if (sub) {
          post.subject = sub;
        }

        post.vote = 0;
        post.save();

        // Send the created post object in the response
        return res.status(200).json({
          message: "Post completed",
          post: post, // Include the created post object
        });
      }
    );

    console.log("Kamm ");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.library = async function (req, res) {
  try {
    console.log("Hello");
    const uid = req.rootUser._id;
    const heading = req.body.heading;
    const subject = req.body.subject;
    const semester = req.body.semester;
    const type = req.body.type;
    if (!uid || !heading || !subject || !semester || !type || !req.files) {
      return res.json(400, {
        message: "Invalid Information",
      });
    }


    var files = req.files.pdf;

    const time = Date.now();
    files.mv("uploads/" + time + " " + files.name, function (err) {
      if (err) {
        console.log(err);
      }
    });

    Library.create(
      {
        user: uid,
        pdfname: heading,
        subject: subject,
        type: type,
        semester: semester,
        path: "http://52.89.33.49:7780/uploads/" + time + " " + files.name,
      },
      function (err, post) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: err });
        }
      }
    );

    return res.json(200, {
      message: "Published",
    });
  } catch (e) { }
};

module.exports.DeletePost =  async (req, res)=>{
  const postId = req.body.postId
  try {
    const post = await Post.findOneAndDelete({ _id: postId });

    res.status(200).json({success: true, message: "post deleted"})
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}