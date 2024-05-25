


import { useEffect, useState } from "react";
// import "../asset/css/each-post.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Url } from "../constants/link";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbUserSquareRounded } from "react-icons/tb";
import { LuArrowUpCircle, LuArrowDownCircle } from "react-icons/lu";
import { CgFileAdd } from "react-icons/cg";
import { useTheme } from './ThemeContext';
const EachPost = (props) => {
  const [buttonIn, setbuttonIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const { theme, changeTheme } = useTheme();
  const callPost = async () => {
    const cookies = new Cookies();

    try {
      const fromdata = new FormData();
      const c = cookies.get("token");

      fromdata.append("cookies", c);
      const res = await fetch(Url + "/verify-user", {
        method: "POST",
        body: fromdata,
      });

      const data = await res.json();
      const a = data.message.username;
      setUsername(a);
      setUserid(data.message._id);

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

  const [selectedFiles, setSelectedFiles] = useState(null);

  const [hidden, sethidden] = useState("");
  const { addToast } = useToasts();
  const history = useNavigate();

  const pramas = useParams();
  const [posts, setPosts] = useState([]);
  const [answer, setAnswer] = useState([]);
  const postId = pramas.postId;
  console.log("postId", postId);
  const eachpost = async () => {
    try {
      const res = await fetch(Url + "/explore-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          postId,
        }),
      });

      const data = await res.json();
      console.log("Data", data.message);
      setPosts(data.message);
      setAnswer(data.message2);
      props.setSolved(data.message2);

      if (!res.status === 200) {
        addToast("Error", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  useEffect(() => {
    eachpost();
  }, []);

  const fromdata = new FormData();

  const handleInputChange = (event) => {
    event.preventDefault();

    setSelectedFiles(event.target.files[0]);
  };

  let name, value;
  const [comment1, setComment] = useState({ comment: "" });
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setComment({ ...comment1, [name]: value });
  };

  const Postcomment = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    const c = cookies.get("token");
    setbuttonIn(true);
    const { comment } = comment1;
    fromdata.append("img", selectedFiles);
    fromdata.append("hidden", hidden);
    fromdata.append("comment", comment);
    fromdata.append("postid", postId);

    fromdata.append("cookies", c);

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
  };

  var link;

  if (posts.status === "false" && answer.length >= 1 && userid === posts.user) {
    link = (
      <Link to="/solved">
        {" "}
        <button type="button" className="solved">
          Solved
        </button>
      </Link>
    );
  }
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  }

  return (
    <>
      <div className={`${theme === 'dark' ? ' bg-[#121212] text-white' : ' bg-white text-black'} w-[100%] flex justify-center pt-10 max-md:px-4`}>
        <div className="flex flex-col  md:w-[90%] gap-5 pb-5">
          <div className={`${theme === 'dark' ? ' bg-[#262525]' : 'bg-white'} shadow-lg rounded-md w-[100%] p-5 md:p-10`}>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                {posts.avatar ? (
                  <img src={posts.avatar} className="h-[100px] w-[100px]" />
                ) : (
                  <TbUserSquareRounded size={44} className="text-[#808080]" />
                )}
                <div className="flex flex-col ">
                  <span className="text-[15px] font-semibold">Anonymous</span>
                  <span className="text-[10px] text-[#808080]">
                    <span className={`${theme === 'dark' ? ' text-white' : 'text-black'}   font-semibold`}>
                      Created on:
                    </span>{" "}
                    {formatDate(posts.createdAt)}{" "}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* <LuArrowDownCircle size={24} className="text-red-500" />
                <p className="text-[12px] font-semibold">{posts.vote}</p>
                <LuArrowUpCircle size={24} className="text-green-500" /> */}
                {answer.length>0 && 
                <p style={{padding:"5px 10px",borderRadius:"10px",fontSize:"12px", background:"#FFD700"}}>solved</p>
                }
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-[20px] font-bold">{posts.heading}</p>
              <p className="text-[14px] font-semibold text-[#808080]">
                {posts.type}
              </p>
            </div>
            <div className="flex gap-10">
              <span className="font-bold ">Subject:</span>
              <span className="font-semibold">{posts.subject}</span>
            </div>
            <div>
              <p className="text-[14px]">{posts.description}</p>
            </div>
            <div className="flex justify-end items-center">
              <button className={`${theme === 'dark' ? ' border-white' : 'border-black'}   hover:bg-[#FFD700] border-[1px] border-black rounded-md py-1 px-4 text-[14px]`}>
                Attachment.pdf
              </button>
            </div>
          </div>
          <div className={`${theme === 'dark' ? ' bg-[#262525]' : 'bg-white'} shadow-lg rounded-md w-[100%] p-5 md:p-10 flex flex-col gap-6`}>
            <select required onChange={(e) => sethidden(e.target.value)} className={`${theme === 'dark' ? ' bg-[#262525]' : 'bg-white'} border border-gray-300 rounded-md w-[100%] p-2  flex flex-col gap-6`}>
              <option disabled selected hidden>
                Post as
              </option>
              <option>Anonymous</option>
              <option>{username} </option>
            </select>
            <textarea
              className={`${theme === 'dark' ? ' text-white bg-[#413f3f]' : 'text-black'}  border border-[#C1BBEB] h-36 rounded-md p-5 w-[100%]`}
              placeholder="Message"
              value={comment1.comment}
              onChange={handleInputs}
              name="comment"
            ></textarea>
            <div className="w-[100%] flex justify-end">
              <div className="flex gap-4 items-center">
                <input onChange={handleInputChange} type="file" className={`${theme === 'dark' ? ' text-white' : 'text-black'} hover:bg-[#FFD700] border-[1px]  rounded-md py-1 text-[14px] `} />

                <button onClick={Postcomment}
                  disabled={buttonIn} className="bg-[#FFD700]  hover:border-black  font-bold border-[1px] rounded-md py-1 px-4 text-[14px]">
                  {buttonIn ? "Please Wait.." : "Post Answer"}
                </button>
              </div>
            </div>
          </div>
          Answers:
          <div className={`${theme === 'dark' ? ' bg-[#262525]' : 'bg-white'} shadow-lg rounded-md w-[100%] p-5 md:p-10 flex flex-col gap-6`}>
            <ul id="list_comment" className="col-md-12">
              {/* Start List Comment 1 */}

              {answer.map((ans) => (
                <div>
                  <li className="box_result row">
                    <div className="result_comment col-md-11">
                      <h4>{ans.hidden}</h4>
                      <p>{ans.answer}</p>
                      <details>
                        <summary> Click Here</summary>
                        {ans.avatar ? (
                          <p>
                            <img src={ans.avatar} className="card-img" alt="no image uploaded"/>
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </details>
                    </div>
                  </li>
                  <hr></hr>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachPost;