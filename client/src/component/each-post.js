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
    } catch (e) {}
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
      <div className={`${theme === 'dark' ? ' bg-[#121212] text-white':' bg-white text-black'} w-[100%] flex justify-center pt-10 max-md:px-4`}>
        <div className="flex flex-col  md:w-[90%] gap-5 pb-5">
          <div className={`${theme === 'dark' ? ' bg-[#262525]':'bg-white'} shadow-lg rounded-md w-[100%] p-5 md:p-10`}>
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
                    <span className={`${theme === 'dark' ? ' text-white':'text-black'}   font-semibold`}>
                      Created on:
                    </span>{" "}
                    {formatDate(posts.createdAt)}{" "}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LuArrowDownCircle size={24} className="text-red-500" />
                <p className="text-[12px] font-semibold">{posts.vote}</p>
                <LuArrowUpCircle size={24} className="text-green-500" />
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
              <button className={`${theme === 'dark' ? ' border-white':'border-black'}   hover:bg-[#FFD700] border-[1px] border-black rounded-md py-1 px-4 text-[14px]`}>
                Attachment.pdf
              </button>
            </div>
          </div>
          <div className={`${theme === 'dark' ? ' bg-[#262525]':'bg-white'} shadow-lg rounded-md w-[100%] p-5 md:p-10 flex flex-col gap-6`}>
            <textarea
              className={`${theme === 'dark' ? ' text-white bg-[#413f3f]':'text-black'}  border border-[#C1BBEB] h-36 rounded-md p-5 w-[100%]`}
              placeholder="Message"
              value={comment1.comment}
                        onChange={handleInputs}
            ></textarea>
            <div className="w-[100%] flex justify-end">
              <div className="flex gap-4 items-center">
                  <input onChange={handleInputChange} type="file" className={`${theme === 'dark' ? ' text-white':'text-black'} hover:bg-[#FFD700] border-[1px]  rounded-md py-1 text-[14px] `}/>
                
                <button   onClick={Postcomment}
                            disabled={buttonIn} className="bg-[#FFD700]  hover:border-black  font-bold border-[1px] rounded-md py-1 px-4 text-[14px]">
                 {buttonIn ? "Please Wait.." : "Post Answer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="main">
        <div className="container2 cards-container">
          <div className="flex-container">
            <div href="#" className="card-box">
              {posts.avatar ? (
                <img src={posts.avatar} className="card-img" />
              ) : (
                <n></n>
              )}

              <div className="card-text">
                <div className="card-data">
                  <p className="data-text">{posts.subject}</p>
                  <p className="data-text   text-right">{posts.hidden}</p>
                  <p className="data-text">Vote :</p>
                </div>
                <div className="card-title">{posts.heading}</div>
                <p className="card-description">{posts.description}</p>
                {link}
              </div>
            </div>
          </div>
          <div className="container2">
            <div className="col-md-12" id="fbcomment">
              <div className="body_comment">
                <div className="row">
                  <form>
                    <select
                      required
                      onChange={(e) => sethidden(e.target.value)}
                    >
                      <option disabled selected hidden>
                        Please Choose...
                      </option>
                      <option>Post as Anonymous</option>
                      <option>Post as {username} </option>
                    </select>
                    <input
                      onChange={handleInputChange}
                      type="file"
                      name="filefield"
                      placeholder="Max one Img"
                    />
                    <div className="box_comment col-md-11">
                      <textarea
                        className="commentar"
                        placeholder="Add Solution ..."
                        name="comment"
                        required
                        value={comment1.comment}
                        onChange={handleInputs}
                      />
                      <div className="box_post">
                        <div className="pull-right">
                          <button
                            onClick={Postcomment}
                            disabled={buttonIn}
                            type="button"
                            value={1}
                          >
                            {buttonIn ? "Please Wait.." : "Post-Answer"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <ul id="list_comment" className="col-md-12">

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
                                  <img src={ans.avatar} className="card-img" />
                                </p>
                              ) : (
                                <p></p>
                              )}
                              {/* <img src={ans.avatar} className="card-img" /> 
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
          </div>
        </div>
      </section> */}
    </>
  );
};

export default EachPost;
