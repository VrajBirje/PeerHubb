



import "../asset/css/explore-home.css";
// import "../asset/css/explore-new.css";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styles from "../asset/css/explore-nav.module.css";
import { LuArrowUpCircle } from "react-icons/lu";
import { LuArrowDownCircle } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { FaRegPenToSquare } from "react-icons/fa6";
import backgroundImage from "../asset/images/backgroundImage.jpg";

import Cookies from "universal-cookie";

import { Url } from "../constants/link";
import { useTheme } from './ThemeContext';

export function Explore({ login }) {
  const [loading, setLoading] = useState([true]);
  const { addToast } = useToasts();
  const [posts, setPosts] = useState([]);
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate()
  var token = document.cookie.substring(6);
  const topArray = [
    "Explore",
    "Problem",
    "Study Guide",
    "Group Discussion",
    "Career",
    "New to Old",
    "Most Voted",
    "Feedback and Support",
  ];
  var loginEmail;
  if(login){
    loginEmail = login.email;
  }
  else{
    loginEmail = "";
  }
  const adminEmail = "internhoarway@gmail.com";
  const [type, settype] = useState("null");
  // const [vote, setVote] = useState(0);
  console.log(login)
  const callaboutPage = async () => {
    try {
      const url = Url + "/explore";

      const res = await fetch(url, { method: "GET" });

      const data = await res.json();
      console.log(data.message);
      setPosts(data.message);
      setLoading(false);
      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  const mostvoted = async () => {
    try {
      const fromdata = new FormData();
      fromdata.append("type", type);
      const res = await fetch(Url + "/most/votes", {
        method: "POST",
        body: fromdata
      });

      const data = await res.json();
      setPosts(data.message);

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }


    }
    catch (e) { }

  }
  const newtoold = async () => {
    try {
      const fromdata = new FormData();
      fromdata.append("type", type);
      const res = await fetch(Url + "/most/new", {
        method: "POST",
        body: fromdata
      });

      const data = await res.json();
      setPosts(data.message);

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }


    }
    catch (e) { }

  }

  const problem = async () => {
    try {
      const res = await fetch(Url + "/different/problem", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);
      settype("Problem");

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  const career = async () => {
    try {
      const res = await fetch(Url + "/different/carrer", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);
      settype("Career");

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  const study = async () => {
    try {
      const res = await fetch(Url + "/different/study-guide", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);
      settype("Study Guide");

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  const gd = async () => {
    try {
      const res = await fetch(Url + "/different/gd", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);
      settype("Group Discussion");

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  const feedback = async () => {
    try {
      const res = await fetch(Url + "/different/feedback", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);
      settype("Feedback And Support");

      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) { }
  };

  useEffect(() => {
    callaboutPage();
  }, []);
  useEffect(() => { }, [posts]);

  const upward = async (e) => {
    const cookies = new Cookies();
    const fromdata = new FormData();
    const b = e.target.getAttribute("value");
    const c = cookies.get("token");

    fromdata.append("cookies", c);
    fromdata.append("id", b);

    const response = await fetch(Url + "/upvote", {
      method: "POST",

      body: fromdata,
    });

    // const data = await response.json();

    if (response.status !== 200) {
      return addToast(" Login First", {
        appearances: false,
        autoDismiss: true,
      });
    }

    return addToast("Response will be Updated soon ‼️", {
      appearances: false,
      autoDismiss: true,
    });
  };

  const downward = async (e) => {
    const cookies = new Cookies();

    const fromdata = new FormData();

    const b = e.target.getAttribute("value");
    const c = cookies.get("token");

    fromdata.append("cookies", c);

    fromdata.append("id", b);

    const response = await fetch(Url + "/downvote", {
      method: "POST",

      body: fromdata,
    });
    // const data = await response.json();

    if (response.status !== 200) {
      return addToast("Login First", {
        appearances: false,
        autoDismiss: true,
      });
    }

    return addToast("Response will be Updated soon", {
      appearances: false,
      autoDismiss: true,
    });
  };

  const deletePost = async (postId) => {
    // Construct the request body
    const requestBody = {
      postId: postId,
      // Include any necessary cookies here
      // Example: cookieName: cookieValue
      // Replace 'cookieName' and 'cookieValue' with your actual cookie data
    };

    try {
      const response = await fetch(Url + '/delete-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers here
          // Example: 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        body: JSON.stringify(requestBody),
        // credentials: 'include', // Uncomment this line if you want to include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // If you expect a response from the server, you can handle it here
      // const responseData = await response.json();
      // Handle response data if needed

      console.log('Post deleted successfully');
      alert("post deleted")
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (

    <>
      <div className={`${theme === 'dark' ? 'text-white bg-[#121212]' : 'text-black bg-white'} h-[160px] max-sm:h-[200px] max-[370px]:h-[250px] w-full flex justify-center pb-10 `}>
        <img
          src={backgroundImage}
          className="w-full h-[160px] max-sm:h-[200px] max-[370px]:h-[250px] opacity-25"
          alt="image"
        />
        <div className="flex flex-col absolute top-1 justify-center pb-10">
          <div className=" text-center flex justify-center">
            <p className="text-[24px] text-center font-bold text-wrap w-[600px] max-[590px]:w-[90%]">
              Dive Deep, Discover Answers: Navigate Doubts, Illuminate Knowledge
              Together.
            </p>
          </div>
          <div
            className={`${theme === 'dark' ? 'text-white ' : 'text-black '} w-screen overflow-x-auto py-2 px-2 `}
            style={{ overflowX: "auto" }}
          >
            <div className="flex gap-2 md:px-2 justify-center items-center max-[778px]:justify-start">
              <button
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'}  hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Explore
              </button>
              <button
                onClick={problem}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Problem
              </button>
              <button
                onClick={gd}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Group Discussion
              </button>
              <button
                onClick={study}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Study Guide
              </button>
              <button
                onClick={mostvoted}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Most Voted
              </button>
              <button
                onClick={feedback}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                Feedback and Support
              </button>
              <button
                onClick={newtoold}
                className={`${theme === 'dark' ? 'text-white bg-gray-600' : 'text-[#808080] bg-white'} hover:bg-[#FFD700] hover:text-white text-[12px] font-semibold py-1 px-4 border-[1px] rounded-[40px] whitespace-nowrap`}
              >
                New to Old
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme === 'dark' ? 'text-white bg-[#121212]' : 'text-black bg-white'} p-2 flex flex-col justify-center items-center w-[100%] h-max max-md:pb-44`}>
        <div className="flex justify-between items-center md:w-[90%] w-[100%] px-2 ">
          <p className="text-[20px] font-semibold">New To Old:</p>
          <Link
            to="/create-post"
            className={`flex justify-center items-center gap-2 px-4 h-[30px] border-[1px] rounded-[6px]  hover:border-[#FFD700] ${theme === 'dark' ? 'border-white' : 'border-black'}`}
          >
            <FaRegPenToSquare size={16} />
            <p>Create Post</p>
          </Link>
        </div>
        <div className="overflow-y-auto w-[90%] md:h-[600px] pb-5" style={{ scrollbarWidth: "none" }}>
          <div className="flex justify-center items-center w-[100%]">
            <div className="grid  max-md:grid-col-1 lg:grid-cols-3 md:grid-cols-2 gap-20  w-full">
              {posts?.map((item, index) => (
                <div style={{height:"400px"}} key={index} className={`${theme === 'dark' ? ' bg-[#262525]' : 'bg-white'} shadow-lg p-2 rounded-md w-[100%]`}>
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <TbUserSquareRounded
                        size={24}
                        className="text-[#808080]"
                      />  
                      <p className="text-[15px] font-semibold">{item.hidden}</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <button style={{borderRadius:"50%",width:"30px", height:"30px",border: theme === "dark" ? "1px solid white" : "1px solid black"}} value={item._id} onClick={upward}>↑</button>
                      {/* <LuArrowDownCircle size={24} className="text-[#808080]"  /> */}
                      <p className="text-[12px] font-semibold">{item.vote}</p>
                      {/* <LuArrowUpCircle size={24} className="text-[#808080]"/> */}
                    <button style={{borderRadius:"50%",width:"30px", height:"30px",border: theme === "dark" ? "1px solid white" : "1px solid black"}} value={item._id} onClick={downward}>↓</button>
                    </div>
                  </div>
                  <hr />
                  <div style={{ width: "100%", height: "77%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div className="flex gap-2">
                      <p className="font-semibold text-[10px]">Heading: </p>
                      <p className="text-[10px]">{item.heading}</p>
                    </div>
                    <div>
                      <p className="text-[14px]">
                        {item.description.split(' ').slice(0, 20).join(' ')}...
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-semibold">
                        {/* {item.status === true ? 'Solved':'To be solved'} */}
                        {(loginEmail === adminEmail && item.isToxic ) &&
                          <button className="bg-[red] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-1 px-4 text-[14px]" target="_blank"
                            onClick={() => deletePost(item._id)}
                          >
                            Delete
                          </button>
                        }
                      </p>
                      <button className="bg-[#FFD700] text-black hover:border-black hover:bg-white font-bold border-[1px] rounded-md py-1 px-4 text-[14px]" target="_blank" onClick={() => navigate(`/post/${item._id}`)}>
                        Open It
                      </button>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;