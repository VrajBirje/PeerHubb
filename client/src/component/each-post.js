import { useEffect, useState } from "react";
import "../asset/css/each-post.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Url } from "../constants/link";

const EachPost = (props) => {
  const [buttonIn, setbuttonIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
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
        history("/login");
      }
    } catch (err) {
      addToast("Login First ‼️", {
        appearances: false,
        autoDismiss: true,
      });
      history("/login");
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
      setPosts(data.message);
      setAnswer(data.message2);
      props.setSolved(data.message2);

      if (!res.status === 200) {
        addToast("Error", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) {
      
    }
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

  return (
    <section className="main">
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
                  <select required onChange={(e) => sethidden(e.target.value)}>
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
                                <img src={ans.avatar} className="card-img" />
                              </p>
                            ) : (
                              <p></p>
                            )}
                            {/* <img src={ans.avatar} className="card-img" /> */}
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
    </section>
  );
};

export default EachPost;
