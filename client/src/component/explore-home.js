import "../asset/css/explore-home.css";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styles from "../asset/css/explore-nav.module.css";


export function Explore() {
  const [loading,setLoading]= useState([true]); 
  const { addToast } = useToasts();
  const [posts, setPosts] = useState([]);
  const [vote, setVote] = useState(0);
  const callaboutPage = async () => {
    try {
      
      const url="http://18.237.56.192:6000/explore"
      const res = await fetch(url);

      const data = await res.json();
      setPosts(data.message);
       setLoading(false);
      if (!res.status === 200) {
        return addToast("Error Contact Admin ‼️", {
          appearances: false,
          autoDismiss: true,
        });
      }
    } catch (e) {
    
    }
  };

  const upvote = async () => {};

  const downvote = async () => {};

  const problem = async () => {
    try {
      const res = await fetch("/different/problem", {
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
      const res = await fetch("/different/carrer", {
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
      const res = await fetch("/different/study-guide", {
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
      const res = await fetch("/different/gd", {
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
      const res = await fetch("/different/feedback", {
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
  useEffect(() => {
    console.log(posts.length);
  }, [posts]);

 
  const upward = async (e) => {

    const fromdata= new FormData();
    const b = e.target.getAttribute('value');
   
     fromdata.append('id',b);
  
    const response= await fetch('/upvote',{
      method:"POST",
             
      credentials:"include",

      body:fromdata
    })

    const data= await response.json();

    if(response.status!==200){
      return addToast(" Login Invalid‼️", {
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
   
    const fromdata= new FormData();
    const b = e.target.getAttribute('value');
   
     fromdata.append('id',b);
  
    const response= await fetch('/downvote',{
      method:"POST",
             
      credentials:"include",

      body:fromdata
    })
    const data= await response.json();

    if(response.status!==200){
      return addToast("Login Invalid‼️", {
        appearances: false,
        autoDismiss: true,
      });
    }

    return addToast("Response will be Updated soon ‼️", {
      appearances: false,
      autoDismiss: true,
    });
    
    
  };
  if(loading){
    return <Loading />
  }

  return (
    <section>
       
       <div className={styles.buttonarea}>
  <button className={styles.button} onClick={problem} type="submit">Problem </button>
    <button className={styles.button} onClick={study} type="submit">Study Guide</button>
     <button className={styles.button} onClick={gd} type="submit"> Group Discussion </button>
   <button className={styles.button} onClick={career} type="submit">    Career </button>
   <button className={styles.button} onClick={feedback} type="submit"> Feedback & Support</button>
   <Link to="/rank"> <button className={styles.button}>  Rank  </button></Link>
   <Link to="/create-post"> <button className={styles.button} > Create-post</button></Link>
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
                      src="https://cdn-icons-png.flaticon.com/512/545/545679.png"
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
                      src="https://cdn-icons.flaticon.com/png/512/2989/premium/2989995.png?token=exp=1660895128~hmac=9bdf7d9fbbf31ba5860935b32423975e"
                    />
                  </button>
                </icon>

                <h6>Vote: {item.vote} </h6>
                <h5 className="subject">{item.heading}</h5>

                {item.avatar ? (
                  <img src={item.avatar} className="card-img" />
                ) : (
                  <p></p>
                )}
                <div className="text">
                  <h5>{item.subject}</h5>
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
