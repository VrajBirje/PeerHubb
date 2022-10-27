import "../asset/css/explore-home.css";
// import "../asset/css/explore-new.css";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styles from "../asset/css/explore-nav.module.css";

import Cookies from "universal-cookie";

import { Url } from "../constants/link";

export function Explore() {
  const [loading, setLoading] = useState([true]);
  const { addToast } = useToasts();
  const [posts, setPosts] = useState([]);

  const [type,settype]= useState("null");
  // const [vote, setVote] = useState(0);

  const callaboutPage = async () => {
    try {
      const url = Url + "/explore";

      const res = await fetch(url, { method: "GET" });

      const data = await res.json();
      setPosts(data.message);
      setLoading(false);
      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) {}
  };

  const mostvoted= async()=>{
    try {
      const fromdata= new FormData();
      fromdata.append("type",type);
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
      catch (e) {}
    
  }
  const newtoold= async()=>{
    try {
      const fromdata= new FormData();
      fromdata.append("type",type);
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
      catch (e) {}
    
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
    } catch (e) {}
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
    } catch (e) {}
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
    } catch (e) {}
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
    } catch (e) {}
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
    } catch (e) {}
  };

  useEffect(() => {
    callaboutPage();
  }, []);
  useEffect(() => {}, [posts]);

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
  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div className={styles.buttonarea}>
      
        <button className={styles.button} onClick={problem} type="submit">
          Problem{" "}
        </button>
        <button className={styles.button} onClick={study} type="submit">
          Study Guide
        </button>
        <button className={styles.button} onClick={gd} type="submit">
          {" "}
          Group Discussion{" "}
        </button>
        <button className={styles.button} onClick={career} type="submit">
          {" "}
          Career{" "}
        </button>
        <button className={styles.button} onClick={feedback} type="submit">
          {" "}
          Feedback & Support
        </button>
        <Link to="/rank">
          {" "}
          <button className={styles.button}> Rank </button>
        </Link>
        <Link to="/create-post">
          {" "}
          <button className={styles.button}>
            {" "}
            <spam className={styles.red}>Create-post</spam>
          </button>
        </Link>
        <button className={styles.button} onClick={mostvoted} type="submit">
          Most Voted{" "}
        </button>
        <button className={styles.button} onClick={newtoold} type="submit">
          New To Old{" "}
        </button>
      </div>

      <div className="whole-page">
        <div className="container">
          <main className="grid">
            {posts.map((item) => (
              <article>
                <h4 className="h4">{item.hidden}</h4>

                <icon className="icon">
                  <button
                    className="buttonarrow"
                    onClick={upward}
                    value={item._id}
                  >
                    <img
                      class="iconimg"
                      value={item._id}
                      src="https://img.icons8.com/ios-glyphs/344/up--v1.png"
                    />
                  </button>
                  <button
                    className="buttonarrow"
                    onClick={downward}
                    value={item._id}
                  >
                    <img
                      class="iconimg"
                      value={item._id}
                      src="https://img.icons8.com/ios-glyphs/344/down.png"
                    />
                  </button>
                </icon>

                <h6>Vote: {item.vote} </h6>
                <h5 className="subject">Heading: {item.heading}</h5>

                {item.avatar ? (
                  <img src={item.avatar} className="card-img" />
                ) : (
                  <p></p>
                )}
                <div className="text">
                  <h5>Subject: {item.subject}</h5>
                  <p />
                   {(() => {
                    if (item.status === true) {
                      return (
                        <Link to={`/post/${item._id}`}>
                          <div className="btn btn-primary btn-block">
                            Already Solved
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link to={`/post/${item._id}`}>
                          <div className="btn btn-primary btn-block">
                            Open It
                          </div>
                        </Link>
                      );
                    }
                  })()}
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>

      {/* <div>
        <header className="u-clearfix u-header u-header" id="sec-a8b7">
          <div className="u-align-left u-clearfix u-sheet u-sheet-1" />
        </header>
        <section
          className="u-align-center u-clearfix u-palette-5-dark-1 u-section-1"
          id="carousel_d031"
        >
          <div className="u-clearfix u-sheet u-sheet-1">
            <div className="u-border-3 u-border-palette-3-base u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-line u-line-horizontal u-line-1" />
            <div className="u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
              <div className="u-repeater u-repeater-1">
                {posts.map((item) => (
                  <div className="u-border-3 u-border-palette-3-base u-container-style u-list-item u-palette-1-light-3 u-repeater-item u-list-item-1">
                    <div className="u-container-layout u-similar-container u-container-layout-2">
                      <h3 className="u-text u-text-3">{item.hidden}</h3>
                      <span className="u-file-icon u-icon u-icon-2">
                        <button
                          className="buttonarrow"
                          onClick={upward}
                          value={item._id}
                        >
                          <img
                            value={item._id}
                            src="https://img.icons8.com/ios-glyphs/344/up--v1.png"
                            alt=""
                          />
                        </button>
                      </span>

                      <span className="u-file-icon u-icon u-icon-4">
                        <button
                          className="buttonarrow"
                          onClick={downward}
                          value={item._id}
                        >
                          <img
                            value={item._id}
                            src="https://img.icons8.com/ios-glyphs/344/down.png"
                            alt=""
                          />
                        </button>
                      </span>

                      <h4 className="u-text u-text-default u-text-4">
                        <span
                          className="u-text-palette-3-base"
                          style={{ fontWeight: 700 }}
                        >
                          Vote
                        </span>{" "}
                        : {item.vote}&nbsp;
                      </h4>
                      <h3 className="u-text u-text-default u-text-5">
                        <span
                          className="u-text-palette-3-base"
                          style={{
                            fontWeight: 700,
                            textDecoration: "underline !important",
                          }}
                        >
                          Subject
                        </span>{" "}
                        :{" "}
                        <span
                          className="u-text-black"
                          style={{ fontSize: "1.25rem", fontWeight: 700 }}
                        >
                         {item.subject}
                        </span>
                      </h3>
                      <h3 className="u-text u-text-6">
                        <span
                          style={{ fontWeight: 700 }}
                          className="u-text-palette-3-base"
                        >
                          Heading
                        </span>{" "}
                        :{" "}
                        <span
                          style={{ fontSize: "1.25rem", fontStyle: "italic" }}
                          className="u-text-black"
                        >
                          {item.heading}
                        </span>
                      </h3>

                      {/* <a
                        href="https://nicepage.dev"
                        className="u-border-none u-btn u-btn-round u-button-style u-hover-feature u-hover-palette-1-light-3 u-palette-1-base u-radius-14 u-btn-3"
                      >
                        OPEN IT&nbsp;
                      </a> */}

                      {/* {(() => {
                        if (item.status === true) {
                          return (
                            <Link to={`/post/${item._id}`}>
                              <div  className="u-border-none u-btn u-btn-round u-button-style u-hover-feature u-hover-palette-1-light-3 u-palette-1-base u-radius-14 u-btn-3">
                                Already Solved
                              </div>
                            </Link>
                          );
                        } else {
                          return (
                            <Link to={`/post/${item._id}`}>
                              <div  className="u-border-none u-btn u-btn-round u-button-style u-hover-feature u-hover-palette-1-light-3 u-palette-1-base u-radius-14 u-btn-3">
                                Open It
                              </div>
                            </Link>
                          );
                        }
                      })()} */}
                    {/* </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div> */} 
    </section>
  );
}

export default Explore;
