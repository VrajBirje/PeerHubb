// import "../asset/css/libraryfrom.css";
// import Cookies from "universal-cookie";
// import { Url } from "../constants/link";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";

// export function Libraryform() {
//   const [buttonIn, setbuttonIn] = useState(false);

//   const history = useNavigate();
//   const { addToast } = useToasts();

//   const callPost = async () => {
//     const cookies = new Cookies();
//     console.log("eerrr");
//     try {
//       const fromdata = new FormData();
//       const c = cookies.get("token");
//       console.log(c);
//       fromdata.append("cookies", c);
//       const res = await fetch(Url + "/verify-user", {
//         method: "POST",
//         body: fromdata,
//       });

//       const data = await res.json();
//       const a = data.message.username;
//       //  setUsername(a);

//       if (!res.status === 200) {
//         addToast("Login First ‼️", {
//           appearances: false,
//           autoDismiss: true,
//         });
//         history("/login");
//       }
//     } catch (err) {
//       addToast("Login First ‼️", {
//         appearances: false,
//         autoDismiss: true,
//       });
//       history("/login");
//     }
//   };

//   useEffect(() => {
//     callPost();
//   }, []);

//   const [type, settype] = useState("");
//   const [semester, setsemester] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState(null);
//   const [user, setUser] = useState({
//     heading: "",
//     subject: "",
//   });
//   let name, value;
//   const handleInputs = (e) => {
//     name = e.target.name;
//     value = e.target.value;

//     setUser({ ...user, [name]: value });
//   };
//   const handleInputChange = (event) => {
//     event.preventDefault();
//     // console.log(event.target.files[0]);
//     setSelectedFiles(event.target.files[0]);
//   };

//   //

//   const libpost = async (e) => {
//     e.preventDefault();
//     setbuttonIn(true);
//     const cookies = new Cookies();
//     const c = cookies.get("token");
//     const fromdata = new FormData();
//     fromdata.append("cookies", c);

//     const { heading, subject, fieldname } = user;
//     // fromdata.append('img',selectedFiles);
//     fromdata.append("heading", heading);
//     fromdata.append("subject", subject);
//     fromdata.append("pdf", selectedFiles);
//     fromdata.append("type", type);
//     fromdata.append("semester", semester);

//     const res = await fetch(Url + "/create-libpost", {
//       method: "POST",

//       body: fromdata,
//     });

//     if (res.status === 200) {
//       addToast("Done", {
//         appearances: true,
//         autoDismiss: true,
//       });
//       setbuttonIn(false);
//       history("/explore");
//     } else {
//       setbuttonIn(false);
//       return addToast("Server Error ‼️", {
//         appearances: false,
//         autoDismiss: true,
//       });
//     }
//   };

//   return (
//     <div>
//       <form className="my-form" method="POST">
//         <div className="container">
//           <h1>Library Post</h1>
//           <ul>
//             <li></li>

//             <li>
//               <select
//                 onChange={(e) => settype(e.target.value)}
//                 defaultValue={value}
//                 required
//               >
//                 <option disabled selected hidden>
//                   Type...
//                 </option>
//                 <option>Book</option>
//                 <option>Notes</option>
//                 <option>Assignment</option>
//                 <option>Answers</option>
//                 <option>Question Paper</option>
//               </select>
//             </li>
//             <li>
//               <div className="grid grid-2">
//                 <input
//                   type="text"
//                   placeholder="PDF Name"
//                   name="heading"
//                   required
//                   value={user.heading}
//                   onChange={handleInputs}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   name="subject"
//                   value={user.subject}
//                   onChange={handleInputs}
//                 />
//                 <select
//                   onChange={(e) => setsemester(e.target.value)}
//                   defaultValue={value}
//                   required
//                 >
//                   <option disabled selected hidden>
//                     Please Choose Semester...
//                   </option>
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                   <option>4</option>
//                   <option>5</option>
//                   <option>6</option>
//                   <option>7</option>
//                   <option>8</option>
//                 </select>

//                 <input
//                   onChange={handleInputChange}
//                   type="file"
//                   name="filefield"
//                   placeholder="Max one Img"
//                 />
//               </div>
//             </li>

//             <li>
//               <div className="grid grid-3">
//                 <button
//                   className="btn-grid"
//                   onClick={libpost}
//                   type="submit"
//                   disabled={buttonIn}
//                 >
//                   <span className="front">
//                     {buttonIn ? "Please Wait.." : "Create"}
//                   </span>
//                 </button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Libraryform;
import Cookies from "universal-cookie";
import { Url } from "../constants/link";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useTheme } from './ThemeContext';
export function Libraryform() {
  const [buttonIn, setbuttonIn] = useState(false);

  const history = useNavigate();
  const { addToast } = useToasts();
  const { theme, changeTheme } = useTheme();
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
      //  setUsername(a);

      if (!res.status === 200) {
        addToast("Login First ‼️", {
          appearances: false,
          autoDismiss: true,
        });
        // history("/login");
      }
    } catch (err) {
      addToast("Login First ‼️", {
        appearances: false,
        autoDismiss: true,
      });
      // history("/login");
    }
  };

  useEffect(() => {
    callPost();
  }, []);

  const [type, settype] = useState("");
  const [semester, setsemester] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [user, setUser] = useState({
    heading: "",
    subject: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    setSelectedFiles(event.target.files[0]);
  };

  //

  const libpost = async (e) => {
    e.preventDefault();
    setbuttonIn(true);
    const cookies = new Cookies();
    const c = cookies.get("token");
    const fromdata = new FormData();
    fromdata.append("cookies", c);

    const { heading, subject, fieldname } = user;
    // fromdata.append('img',selectedFiles);
    fromdata.append("heading", heading);
    fromdata.append("subject", subject);
    fromdata.append("pdf", selectedFiles);
    fromdata.append("type", type);
    fromdata.append("semester", semester);

    const res = await fetch(Url + "/create-libpost", {
      method: "POST",

      body: fromdata,
    });

    if (res.status === 200) {
      addToast("Done", {
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
    <div className={`${theme === 'dark' ? ' bg-[#121212] text-white':' bg-white text-black'} w-[100%] h-[90vh] flex justify-center`}>
      <div className="w-[90%] flex flex-col">
        {" "}
        <p className="font-semibold text-[20px]">Library Post</p>
        <form
          className={`${theme === 'dark' ? ' bg-[#262525]':'bg-white'} p-10 shadow-xl rounded-md flex flex-col gap-4`}
          method="POST"
        >
          <div className="flex max-md:flex-col justify-between gap-4 w-[100%]">
            <div className="flex flex-col gap-4 w-[100%]">
              <select
                onChange={(e) => settype(e.target.value)}
                defaultValue={value}
                required
                className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'} border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm `}
              >
                <option disabled selected hidden>
                  Type...
                </option>
                <option>Book</option>
                <option>Notes</option>
                <option>Assignment</option>
                <option>Answers</option>
                <option>Question Paper</option>
              </select>

              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={user.subject}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'} border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm `}
              />
            </div>

            <div className="flex flex-col gap-4 w-[100%]">
              <input
                type="text"
                placeholder="PDF Name"
                name="heading"
                required
                value={user.heading}
                onChange={handleInputs}
                className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'} border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm `}
              />

              <select
                onChange={(e) => setsemester(e.target.value)}
                defaultValue={value}
                required
                className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'} border border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm `}
              >
                <option disabled selected hidden>
                  Please Choose Semester...
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>

           
          </div>
          <input
              onChange={handleInputChange}
              type="file"
              name="filefield"
              placeholder="Max one Img"
              className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'} border border-dashed border-[#C1BBEB] p-1 px-2 rounded-md placeholder:text-sm md:w-[50%]`}
            />
          <div className="flex w-[100%] justify-end">
            <button
             className=" w-max bg-[#FFD700] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-1 px-4 text-[14px]"
              onClick={libpost}
              type="submit"
              disabled={buttonIn}
            >
              <span className="front">
                {buttonIn ? "Please Wait.." : "Create"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Libraryform;