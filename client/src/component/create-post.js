
// import "../asset/css/create-post.css";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Url } from "../constants/link";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useTheme } from "./ThemeContext";
import detectToxicity from './ToxicityDetector';
import { keyword } from "./keyword";

export function CreatePost() {
  const [buttonIn, setbuttonIn] = useState(false);
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const history = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Username'); // Default value is 'Username'

  let postId;

  // Handler function to update the selected value
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const callPost = async () => {
    const cookies = new Cookies();
    console.log("eerrr");
    try {
      const fromdata = new FormData();
      const c = cookies.get("token");
      console.log(c);
      fromdata.append("cookies", c);
      const res = await fetch(Url + "/verify-user", {
        method: "POST",
        body: fromdata,
      });

      const data = await res.json();
      const a = data.message.username;
      setUsername(a);

      if (!res.status === 200) {
        addToast("Login First ‼️", {
          appearances: false,
          autoDismiss: true,
        });
        // history('/login')
      }
    } catch (err) {
      addToast("Login First ‼️", {
        appearances: false,
        autoDismiss: true,
      });
      // history('/login')
    }
  };

  useEffect(() => {
    callPost();
  }, []);
  const { theme, changeTheme } = useTheme();
  //const options = ["Problem", "Group Discussion", "Study Guide","Feedback & Support"];
  const [user, setUser] = useState({
    heading: "",
    subject: "",
    fieldname: "",
    message: "",
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [type, settype] = useState("");
  const [hidden, sethidden] = useState("");

  let name, value;
  const fromdata = new FormData();
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    setSelectedFiles(event.target.files[0]);
  };

  const CreatePost = async (e) => {
    e.preventDefault();
    setbuttonIn(true);
    const cookies = new Cookies();
    const c = cookies.get("token");

    fromdata.append("cookies", c);

    const { heading, subject, fieldname, message } = user;
    fromdata.append("img", selectedFiles);
    fromdata.append("heading", heading);
    fromdata.append("subject", subject);
    fromdata.append("fieldname", fieldname);
    fromdata.append("message", message);
    fromdata.append("type", type);
    fromdata.append("hidden", hidden);

    // Check for toxicity in the message
    const mlResult = await detectToxicity(message);
    const matchedKeyword = keyword.find((item) =>
      user.message.toLowerCase().includes(item.key.toLowerCase())
    );

    // Store toxicity-related values along with other field values
    const toxicLabel = mlResult.label || null;
    const isToxic = mlResult.value || false;
    console.log("110 ", isToxic)
    fromdata.append("toxicLabel", toxicLabel);
    fromdata.append("isToxic", isToxic);
    console.log("113 ", isToxic)

    const res = await fetch(Url + "/create-post", {
      method: "POST",
      body: fromdata,
    });
    console.log("119 ", isToxic)

    if (res.status === 200) {
      // Post created successfully
      const responseData = await res.json();
      postId = responseData.post._id; // Assuming the server response includes postId
      console.log("postId")
      console.log(postId)
      if (matchedKeyword) {
        await Postcomment(matchedKeyword.value); // Call Postcomment function with matched keyword value
      }
      if (isToxic) {
        // Show alert for toxic post
        alert("The post created is toxic. Label: " + toxicLabel);
        addToast("Post Created", {
          appearances: true,
          autoDismiss: true,
        });
        history("/explore");
      } else {
        // If no toxicity detected
        addToast("Post Created", {
          appearances: true,
          autoDismiss: true,
        });
        history("/explore");
      }
    } else {
      // Error handling for server error
      setbuttonIn(false);
      addToast("Server Error ‼️", {
        appearances: false,
        autoDismiss: true,
      });
    }
  };

  const Postcomment = async (commentValue) => {
    try {
      const cookies = new Cookies();
      const c = cookies.get("token");
      const fromdata = new FormData();
      fromdata.append("cookies", c);
      fromdata.append("img", selectedFiles);
      fromdata.append("hidden", "admin"); // Set hidden as "admin"
      fromdata.append("comment", commentValue); // Set comment as the keyword value
      fromdata.append("postid", postId); // Assuming postId is accessible here

      const res = await fetch(Url + "/create-comment", {
        method: "POST",
        body: fromdata,
      });

      if (res.status === 200) {
        addToast("Comment Posted‼️", {
          appearances: true,
          autoDismiss: true,
        });
        setbuttonIn(false);
        history(`/explore`);
      } else {
        setbuttonIn(false);
        addToast("Invalid Information", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.error("Error in posting comment:", error);
      // Handle error
    }
  };



  const CreatePost2 = async (e) => {
    e.preventDefault();
    setbuttonIn(true);
    const cookies = new Cookies();
    const c = cookies.get("token");

    fromdata.append("cookies", c);

    const { heading, subject, fieldname, message } = user;
    fromdata.append("img", selectedFiles);
    fromdata.append("heading", heading);
    fromdata.append("subject", subject);
    fromdata.append("fieldname", fieldname);
    fromdata.append("message", message);
    fromdata.append("type", type);
    fromdata.append("hidden", hidden);

    const res = await fetch(Url + "/create-post", {
      method: "POST",

      body: fromdata,
    });

    if (res.status === 200) {
      addToast("Post Created", {
        appearances: true,
        autoDismiss: true,
      });
      setbuttonIn(false);
      history("/explore");
    } else {
      setbuttonIn(false);
      return addToast("Server Error ‼️", {
        appearances: false,
        autoDismiss: true,
      });
    }
  };

  const CreatePost1 = async (e) => {
    e.preventDefault();
    setbuttonIn(true);
    const cookies = new Cookies();
    const c = cookies.get("token");

    fromdata.append("cookies", c);

    const { heading, subject, fieldname, message } = user;
    fromdata.append("img", selectedFiles);
    fromdata.append("heading", heading);
    fromdata.append("subject", subject);
    fromdata.append("fieldname", fieldname);
    fromdata.append("message", message);
    fromdata.append("type", type);
    fromdata.append("hidden", hidden);

    const res = await fetch(Url + "/create-post", {
      method: "POST",
      body: fromdata,
    });

    if (res.status === 200) {
      // Post created successfully
      const mlResult = await detectToxicity(message); // Detect toxicity in the message

      if (mlResult.value && mlResult.label) {
        // If toxicity detected
        const toxicLabel = mlResult.label;
        const isToxic = mlResult.value;

        // Update the Post model with toxic label and value
        // Assuming you have a 'Post' model and 'toxicLabel' and 'isToxic' fields
        // Replace this with your actual logic to update the model
        // For example:
        // post.toxicLabel = toxicLabel;
        // post.isToxic = isToxic;

        // Show alert for toxic post
        alert("The post created is toxic. Label: " + toxicLabel);
      } else {
        // If no toxicity detected
        addToast("Post Created", {
          appearances: true,
          autoDismiss: true,
        });
        history("/explore");
      }
    } else {
      // Error handling for server error
      setbuttonIn(false);
      addToast("Server Error ‼️", {
        appearances: false,
        autoDismiss: true,
      });
    }
  };

  return (

    // New Ui
    <div className="w-[100%] h-[85.5%] flex justify-center items-center" style={{ backgroundColor: theme === "dark" ? "black" : "white" }}>
      <div className="flex flex-col w-[80%]">
        <div className="flex gap-2 justify-start items-center">
          <FaRegPenToSquare size={24} />
          <p className="font-semibold text-[20px]" style={{ color: theme === "dark" ? "white" : "black" }}>Create Post</p>
        </div>
        <form className="p-10 shadow-xl rounded-md flex flex-col gap-4" method="POST" style={{ color: theme === "dark" ? "white" : "black", border: theme === "dark" ? "1px solid white" : "none" }}>
          <div className="flex max-md:flex-col justify-between md:gap-10">
            <div className="w-[100%]">
              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Post as</p>
                <select
                  type="text"
                  placeholder="Heading"
                  className="border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                  onChange={(e) => sethidden(e.target.value)} defaultValue={value}
                  required
                  style={{ color: theme === "dark" ? "black" : "black" }}
                >
                  <option>{username}</option>
                  <option>Anonymous</option>
                </select>
              </div>

              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Heading</p>
                <input
                  type="text"
                  style={{ color: theme === "dark" ? "black" : "black" }}
                  placeholder="Heading"
                  value={user.heading}
                  onChange={handleInputs}
                  name="heading"
                  required
                  className="border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                />
              </div>

              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Type</p>
                <select
                  type="text"
                  placeholder="Heading"
                  className="border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                  onChange={(e) => settype(e.target.value)} defaultValue={value}
                  required
                  style={{ color: theme === "dark" ? "black" : "black" }}
                >
                  <option>Please Choose</option>
                  <option>Problem</option>
                  <option>Career</option>
                  <option>Study Guide</option>
                  <option>Group Discussion</option>
                  <option>Feedback And Support</option>
                </select>
              </div>
            </div>
            <div className="w-[100%]">
              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Subject</p>
                <input
                  style={{ color: theme === "dark" ? "black" : "black" }}
                  value={user.subject}
                  onChange={handleInputs}
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                />
              </div>
              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Attachment</p>
                <input
                  style={{ color: theme === "dark" ? "white" : "black" }}
                  type="file"
                  name="filefield"
                  onChange={handleInputs}
                  placeholder="Subject"
                  className="border border-dashed border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                  aria-label="Upload file"
                />
              </div>
            </div>
          </div>

          <div>
            <textarea
              style={{ color: theme === "dark" ? "black" : "black" }}
              placeholder="Message"
              className=" w-[100%] border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm h-24 "
              name="message"
              value={user.message}
              onChange={handleInputs}
            ></textarea>
          </div>

          <div className="flex w-[100%] justify-end">
            <button onClick={CreatePost} className=" w-max bg-[#FFD700] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-1 px-4 text-[14px]">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
