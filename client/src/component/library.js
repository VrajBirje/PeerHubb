import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Url } from "../constants/link";

export function Library() {
  const [books, setbooks] = useState([]);
  const [type, setype] = useState("none");
  const [semester, setsemester] = useState("none");

  const filter = async () => {
    const fromdata = new FormData();
    fromdata.append("type", type);
    fromdata.append("semester", semester);
    const url = Url + "/libfilter";

    const res = await fetch(url, { method: "POST", body: fromdata });

    const mydata = await res.json();
    setbooks(mydata.msg);
  };

  const callaboutPage = async () => {
    try {
      const url = Url + "/explorelib";

      const res = await fetch(url, { method: "GET" });

      const mydata = await res.json();

      setbooks(mydata.msg);

      if (!res.status === 200) {
        // return addToast("Error Contact Admin ‼️", {
        //   appearances: false,
        //   autoDismiss: true,
        // });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    callaboutPage();
  }, []);
  useEffect(() => {}, [books]);

  return (
    <div>
      {/* Hello world */}
      <section className="u-clearfix u-section-1" id="carousel_33aa">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-left u-container-style u-layout-cell u-left-cell u-size-15 u-size-60-md u-layout-cell-1">
                  <div className="u-container-layout u-container-layout-1">
                    <h4 className="u-text u-text-1"> Digital Library</h4>
                    <p className="u-text u-text-2">
                    A Digital library cuts short the time and effort one would put into visiting a conventional library and finding the right book
                    </p>
                  </div>
                </div>
                <div className="u-align-left u-container-style u-layout-cell u-size-18-lg u-size-18-xl u-size-21-sm u-size-21-xs u-size-60-md u-layout-cell-2">
                  <div className="u-container-layout u-valign-bottom u-container-layout-2">
                    <span className="u-icon u-text-palette-3-base u-icon-1">
                      <svg
                        className="u-svg-link"
                        preserveAspectRatio="xMidYMin slice"
                        viewBox="0 0 95.333 95.332"
                        style={{}}
                      >
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="#svg-cbee"
                        />
                      </svg>
                      <svg
                        className="u-svg-content"
                        viewBox="0 0 95.333 95.332"
                        x="0px"
                        y="0px"
                        id="svg-cbee"
                        style={{}}
                      >
                        <g>
                          <g>
                            <path d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793    c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045    s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076    c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002    c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z" />
                            <path d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019    c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23    c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16    c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312    c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <p className="u-text u-text-3">
                    When in doubt go to the library or Doubt Mate.
                      <span style={{ fontStyle: "italic" }} />
                    </p>
                  </div>
                </div>
                <div className="u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-right-cell u-size-24-sm u-size-24-xs u-size-27-lg u-size-27-xl u-size-60-md u-layout-cell-3">
                  <div className="u-container-layout u-valign-middle-md u-container-layout-3">
                    <div className="u-expanded-width u-gradient u-shape u-shape-rectangle u-shape-1" />
                    <img
                      src="https://i.pinimg.com/564x/36/d1/30/36d130820b8dcfc89c8a398253308700.jpg"
                      alt=""
                      className="u-align-left u-image u-image-default u-image-1"
                      data-image-width={900}
                      data-image-height={946}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="u-align-center u-clearfix u-gradient u-section-2"
        id="carousel_acf5"
      >
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <h2 className="u-align-center u-text u-text-default u-text-1">
            We'll help manage your study
          </h2>
          <div className="u-expanded-width u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-align-center u-container-style u-custom-item u-list-item u-palette-3-base u-radius-20 u-repeater-item u-shape-round u-video-cover u-list-item-1">
                <div className="u-container-layout u-similar-container u-container-layout-1">
                  <h4 className="u-text u-text-2">
                    <span style={{ fontWeight: 700 }}>E-BOOK</span>
                    <br />
                    <span style={{ fontSize: "1.125rem" }} />
                    <span style={{ fontSize: "1.125rem" }}>
                    Books play a very important role in everyone’s life, especially in a students’ life. They are our best friends because they inspire us to do great things in life and overcome our failures. We learn a lot of things from them. Books are our best companions as they provide us knowledge unconditionally without asking anything in return.
                     Friendship with good books makes you a good person.
                    </span>
                    <br />
                    <br />
                  </h4>
                </div>
              </div>
              <div className="u-align-center u-container-style u-custom-item u-list-item u-palette-4-dark-1 u-radius-20 u-repeater-item u-video-cover u-list-item-2">
                <div className="u-container-layout u-similar-container u-container-layout-2">
                  <h4 className="u-text u-text-3">
                    <span style={{ fontWeight: 700 }} className="u-text-black">
                      {" "}
                    Question Paper
                    </span>
                    <br />
                    <span style={{ fontSize: "1.125rem" }}>
                      {" "}
                      Papers from previous years can help students improve their academic understanding. However, the advantages of going through them do not end there.
                      Furthermore, previous year’s question papers can assist students in developing a better grasp of which questions to answer immediately and which to save for later. By completing these papers, students can evaluate which type of questions to attempt first.
                    </span>
                  </h4>
                </div>
              </div>
              <div className="u-align-center u-container-style u-custom-item u-list-item u-palette-4-base u-radius-20 u-repeater-item u-shape-round u-video-cover u-list-item-3">
                <div className="u-container-layout u-similar-container u-container-layout-3">
                  <h4 className="u-text u-text-4">
                    <span style={{ fontWeight: 700 }} className="u-text-black">
                      {" "}
                      Notes
                    </span>
                    <br />
                    <span style={{ fontSize: "1.125rem" }}>
                      {" "}
                      Many of us struggle to make notes that are meaningful when we need to refer back to them, but now you can check your notes here or you can publish your notes also. 
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="u-clearfix u-section-3" id="sec-3ea0">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-1">
                <div className="u-container-layout u-similar-container u-container-layout-1">
                  <h4 className="u-text u-text-default u-text-2">
                    <select className="some-edit"
                      onChange={(e) => setype(e.target.value)}
                      defaultValue={type}
                    >
                      <option disabled selected>
                        Type 
                      </option>
                      <option>none</option>
                      <option>Answers</option>
                      <option>Notes</option>
                      <option>Assignment</option>
                      <option>Question Paper</option>
                      <option>Book</option>
                    </select>
                  </h4>
                </div>
              </div>
              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-2">
                <div className="u-container-layout u-similar-container u-container-layout-2">
                  <h4 className="u-text u-text-default u-text-2">
                    <select className="some-edit"
                      onChange={(e) => setsemester(e.target.value)}
                      defaultValue={semester}
                    >
                      <option disabled selected hidden>
                       Semester
                      </option>
                      <option>none</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                    </select>
                  </h4>
                </div>
              </div>
              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-3">
                <div className="u-container-layout u-similar-container u-container-layout-3">
                  <h4 className="u-text u-text-default u-text-3"></h4>
                </div>
              </div>
              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-4">
               <button className="some-edit" onClick={filter}>
                <div className="u-container-layout u-similar-container u-container-layout-4">
                  <h4 className="u-text u-text-default u-text-4">
                 Submit 
                  </h4>
                </div>
                </button>
              </div>
              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-5">
                <div className="u-container-layout u-similar-container u-container-layout-5">
                  <h4 className="u-text u-text-default u-text-5"></h4>
                </div>
              </div>

              <div className="u-container-style u-list-item u-palette-3-light-1 u-repeater-item u-list-item-6">
                <Link to="/library-from">
                  <div className="u-container-layout u-similar-container u-container-layout-6">
                    <h4 className="u-text u-text-default u-text-6">Publish</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="u-list u-list-2">
            <div className="u-repeater u-repeater-2">
              {books.map((y) => (
                <div className="u-border-5 u-border-palette-3-light-1 u-container-style u-list-item u-repeater-item u-shape-rectangle">
                  <div className="u-container-layout u-similar-container u-container-layout-7">
                    <h3 className="u-text u-text-7">PDF:{y.pdfname}</h3>
                    <p className="u-text u-text-8">
                      Subject:{y.subject}
                      <br></br>
                      <br></br>
                      Semester:{y.semester}
                      <br></br>
                      <br></br>
                      <a href={y.path} target="_blank">
                        <b>Read More</b>{" "}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Library;
