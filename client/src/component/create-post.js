
// import "../asset/css/create-post.css";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Url } from "../constants/link";
import { FaRegPenToSquare } from "react-icons/fa6";

export function CreatePost() {
  const [buttonIn, setbuttonIn] = useState(false);
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const history = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Username'); // Default value is 'Username'

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

  return (
    //   <div>
    //   <form className="my-form" method="POST">
    //     <div className="container">
    //       <h1>Create A Post</h1>
    //       <ul>
    //       <li>
    //         <select
    //             onChange={(e) => sethidden(e.target.value)}
    //              required
    //              >
    //                <option  disabled selected hidden>Please Choose...</option>
    //             <option >Post as Anonymous</option>
    //             <option>Post as {username}</option>

    //            </select>

    //         </li>

    //         <li>
    //         <select
    //             onChange={(e) => settype(e.target.value)} defaultValue={value}
    //              required
    //              >
    //               <option  disabled selected hidden>Please Choose...</option>
    //             <option>Problem</option>
    //             <option>Career</option>
    //             <option>Study Guide</option>
    //             <option>Group Discussion</option>
    //             <option>Feedback And Support</option>
    //            </select>

    //         </li>
    //         <li>
    //           <div className="grid grid-2">
    //             <input type="text" placeholder="Heading (Required)" name="heading" required
    //                  value={user.heading}
    //                  onChange={handleInputs}
    //             />
    //             <input type="text" placeholder="Subject (Required) " name="subject"
    //                 value={user.subject}
    //                 onChange={handleInputs}
    //             />
    //           </div>
    //         </li>
    //         <li>
    //           <div className="grid grid-2">
    //              <input onChange={handleInputChange} type="file" name="filefield" placeholder="Max one Img"/>
    //           </div>
    //         </li>
    //         <li>
    //           <textarea placeholder="Message (Required)" defaultValue={""} required name="message"
    //              value={user.message}
    //              onChange={handleInputs}
    //           />
    //         </li>

    //         <li>
    //           <div className="grid grid-3">

    //             <button className="btn-grid" onClick={CreatePost} type="submit" disabled={buttonIn} >
    //                 <span className="front">{buttonIn? 'Please Wait..':'Create'}</span>
    //             </button>

    //           </div>
    //         </li>
    //       </ul>
    //     </div>
    //   </form>

    // </div>

    // New Ui
    <div className="w-[100%] flex justify-center items-center">
      <div className="flex flex-col w-[80%]">
        <div className="flex gap-2 justify-start items-center">
          <FaRegPenToSquare size={24} />
          <p className="font-semibold text-[20px]">Create Post</p>
        </div>
        <div className="p-10 shadow-xl rounded-md flex flex-col gap-4">
          <div className="flex max-md:flex-col justify-between md:gap-10">
            <div className="w-[100%]">
              <div className="flex md:w-[75%] justify-between">
                <p className="font-semibold">Post As</p>
                <div className="flex justify-center items-center gap-10">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value="Username" // Value for this radio button
                      className="form-radio text-yellow-500 checked:bg-yellow-400"
                      checked={selectedOption === 'Username'} // Check if this option is selected
                      onChange={handleOptionChange} // Call the handler function on change
                    />
                    <p>Username</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value="Anonymous" // Value for this radio button
                      className="form-radio checked:bg-yellow-500 text-yellow-500"
                      checked={selectedOption === 'Anonymous'} // Check if this option is selected
                      onChange={handleOptionChange} // Call the handler function on change
                    />
                    <p>Anonymous</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Heading</p>
                <input
                  type="text"
                  placeholder="Heading"
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
                  type="text"
                  placeholder="Subject"
                  className="border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                />
              </div>
              <div className="flex justify-between items-center  w-[100%]">
                <p className="font-semibold">Attachment</p>
                <input
                  type="file"
                  placeholder="Subject"
                  className="border border-dashed border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm w-[70%]"
                  aria-label="Upload file"
                />
              </div>
            </div>
          </div>

          <div>
            <textarea
              placeholder="Message"
              className=" w-[100%] border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm h-24 "
            ></textarea>
          </div>

          <div className="flex w-[100%] justify-end">
            <button className=" w-max bg-[#FFD700] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-1 px-4 text-[14px]">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
