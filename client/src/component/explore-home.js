import "../asset/css/explore-home.css";
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

  const problem = async () => {
    try {
      const res = await fetch(Url + "/different/problem", {
        method: "GET",
      });

      const data = await res.json();
      setPosts(data.message);

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
          <button className={styles.button}> <spam className={styles.red}>Create-post</spam></button>
        </Link>
       
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
    </section>
  );
}

export default Explore;
