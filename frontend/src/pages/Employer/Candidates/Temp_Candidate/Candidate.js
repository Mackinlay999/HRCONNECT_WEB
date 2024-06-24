import React, { useState } from 'react'
import candidatecss from './Candidate.css'
// import { map } from 'leaflet';
import { FaBookmark } from "react-icons/fa";
import { useEffect } from 'react';
// import axios from 'axios'
// import { FaArrowUp } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
// import CurrentResume from '../../../Job_Seeker/MyResume/CurrentResume/CurrentResume';
import axios from 'axios';
// import Loader from '../../../Common-Components/Loaders/Loader';


const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
function Candidate() {
    console.log(candidatecss)
    const hremail = localStorage.getItem("email")
    const [AllJobs, setAllJobs] = useState([])
    console.log(AllJobs);
    const [showBokkmarks, setBoomarks] = useState(true)
    const [showBkProfile, setshowBkProfile] = useState(true)
    const [toogleBookMark, setToggleBookmark] = useState(true)
    // const [progress, setProgress] = useState(20);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    // const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        axios.get(`${baseUrl}/jobs/get-job/${hremail}`).then((res) => {
            setAllJobs(res.data.jobs)
        }).catch((err) => console.log(err))
    }, [hremail, setAllJobs])

    const tableData = [
        {
            id: 2,
            name: "bywebuoCw",
            sName: "minub"
        },
        {
            id: 4,
            name: "bywebuoCw",
            sName: "minub"
        },
        {
            id: 5,
            name: "bywebuoCw",
            sName: "minub"
        },
        {
            id: 1,
            name: "bywebuoCw",
            sName: "minub"
        },
        {
            id: 3,
            name: "bywebuoCw",
            sName: "minub"
        },
    ]

    // to sort data based on the feilds

    // console.log("Before" + JSON.stringify(tableData))

    tableData.sort(function (a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    })


    // console.log("after" + JSON.stringify(tableData))

    const [testArr, setTstArr] = useState(
        [
            {
                "Candidate Name": "AA1d3fc1gnfg Sachdev",
                "Rating": 4,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "15.03.23",
                "Attachments": 3
            },
            {
                "Candidate Name": "ssss Sachdev",
                "Rating": 5,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "11.03.23",
                "Attachments": 3
            },
            {
                "Candidate Name": "NNNN Sachdev",
                "Rating": 3,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "03.03.23",
                "Attachments": 3
            },
            {
                "Candidate Name": "tepqwq Sachdev",
                "Rating": 1,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "25.03.23",
                "Attachments": 3
            },
            {
                "Candidate Name": "POEpwqd Sachdev",
                "Rating": 5,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "25.03.23",
                "Attachments": 3
            },
            {
                "Candidate Name": "DWQD Sachdev",
                "Rating": 2,
                "Stages": "Full Satck",
                "Applied Role": "Web developer",
                "Application Date": "12.03.23",
                "Attachments": 3
            },
        ])
    // const testArrewrwrwer = [
    //     {
    //         "Candidate Name": "Ayush Sachdev",
    //         "Rating": 4,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    //     {
    //         "Candidate Name": "ssss Sachdev",
    //         "Rating": 5,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    //     {
    //         "Candidate Name": "NNNN Sachdev",
    //         "Rating": 3,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    //     {
    //         "Candidate Name": "tepqwq Sachdev",
    //         "Rating": 1,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    //     {
    //         "Candidate Name": "POEpwqd Sachdev",
    //         "Rating": 5,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    //     {
    //         "Candidate Name": "DWQD Sachdev",
    //         "Rating": 2,
    //         "Stages": "Full Satck",
    //         "Applied Role": "Web developer",
    //         "Application Date": "12.03.23",
    //         "Attachments": 3
    //     },
    // ]


    const [isAscending, setIsAscending] = useState(true)

    const toggleSortOrder = () => {
        const newArr = testArr.sort((a, b) => b.Rating - a.Rating)
        if (isAscending === false) {
            setTstArr(newArr)
            setIsAscending(true)
        }
        if (isAscending === true) {
            const tempArr = newArr.reverse()
            setTstArr(tempArr)
            setIsAscending(false)
        }
    };
    const [isStageAscending, setIsStageAscending] = useState(true)

    const toggleStagesSortOrder = () => {
        const newArr = testArr.sort((a, b) => b.Stages - a.Stages)
        if (isStageAscending === false) {
            setTstArr(newArr)
            setIsStageAscending(true)
        }
        if (isStageAscending === true) {
            const tempArr = newArr.reverse()
            setTstArr(tempArr)
            setIsStageAscending(false)
        }
    };
    const [isDatAscending, setIsDateAscending] = useState(true)

    const toggleDateSortOrder = () => {
        const newArr = testArr.sort((a, b) => new Date(b['Application Date']) - new Date(a['Application Date']))
        if (isDatAscending === false) {
            setTstArr(newArr)
            setIsDateAscending(true)
        }
        if (isDatAscending === true) {
            const tempArr = newArr.reverse()
            setTstArr(tempArr)
            setIsDateAscending(false)
        }
    };

    const [appliedPerc] = useState(20)
    const [rejectedPerc] = useState(99)
    const [pBkmedPerc] = useState(35)
    const [shortlistedPerc] = useState(17)

    const [applied, setApplied] = useState()
    const [rejected, setRejected] = useState()
    const [pBkmed, setPBMED] = useState()
    const [shortlisted] = useState()
    const [Selectedid, setSelectedid] = useState()
    const [SeeResume, setSeeResume] = useState(false)


    useEffect(() => {
        setApplied(circumference - (appliedPerc / 100) * circumference)
        setRejected(circumference - (rejectedPerc / 100) * circumference)
        setPBMED(circumference - (pBkmedPerc / 100) * circumference)
        // setShortlisted(circumference - (shortlistedPerc / 100) * circumference)
    }, [appliedPerc, rejectedPerc, pBkmedPerc, circumference])

    useEffect(() => {
        const myDiv = document.querySelectorAll('.profile-map-div');
        // console.log(myDiv)
        myDiv.forEach((i) => {
            i.addEventListener('click', function () {
                // console.log('You clicked the div!');
                // console.log(i.getAttribute('data-id'))
                const CID = i.getAttribute('data-id')
                setSelectedid(CID)

                setshowBkProfile(false)
            })
        });
    }, [toogleBookMark])

    function toogleBookmarkDiv() {
        setBoomarks(false)
        setToggleBookmark(false)
    }

    function toogleBookmarkDiv2() {
        setBoomarks(true)
        setToggleBookmark(true)
        setshowBkProfile(true)
    }

    const itemsPerPage = 5;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(testArr.length / itemsPerPage)
    const handlePageChange = page => {
        console.log(page)
        setCurrentPage(page);
    };
    console.log(currentPage);
    // const [newArr, setNewArr] = useState([])
    // useEffect(() => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     const tempArr = testArr.slice(startIndex, endIndex)
    //     console.log(tempArr)
    //     setNewArr(tempArr)
    // }, [currentPage])


    // const [AllJobs, setAllJobs] = useState([]);
    // console.log(AllJobs);
    // useEffect(() => {
    //     const fetchUserData = async (email) => {
    //         try {
    //             const response = await axios.get(`${baseUrl}/user?email=${email}`);
    //             return response.data.userDetails;
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //             return null;
    //         }
    //     };

    //     const fetchDataForAppliedBy = async () => {
    //         console.log(AllJobs);
    //         const uniqueEmails = AllJobs
    //             .map((data) => data.appliedBy)
    //             .flat(2)
    //             .map((data2) => data2);
    //             console.log(uniqueEmails);

    //         const userDataPromises = Array.from(uniqueEmails).map(email => fetchUserData(email));
    //         const userDataArray = await Promise.all(userDataPromises);

    //         return userDataArray;
    //     };

    //     const fetchData = async () => {
    //         const data = await fetchDataForAppliedBy();
    //         setAllJobs(data);
    //     };

    //     fetchData();
    // }, []);

    const AppliedUsers = AllJobs
        .map((data) => data.appliedBy)
        .flat(2)
        .map((data2) => data2);

    console.log(AppliedUsers);

    return (

        <div>

            <div className='candidate-main'>
                <div className={showBokkmarks  ? 'candidate-sub-main-1' : 'candidate-sub-main-2'} id='bookmark-floating-2' onClick={toogleBookmarkDiv}>
                    <div>
                        <p>Total Appliation</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">

                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#ff9d56"
                                strokeWidth="5"
                                strokeDasharray={`${circumference} ${circumference}`}
                                style={{ strokeDashoffset: applied }}
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                {appliedPerc}%
                            </text>
                        </svg>

                    </div>
                </div>
                <div className={showBokkmarks  ? 'candidate-sub-main-1' : 'candidate-sub-main-2'} id='bookmark-floating-2' onClick={toogleBookmarkDiv}>
                    <div>
                        <p>Rejected Appliation</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>

                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#b82d0f"
                                strokeWidth="5"
                                strokeDasharray={`${circumference} ${circumference}`}
                                style={{ strokeDashoffset: rejected }}
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                {rejectedPerc}%
                            </text>
                        </svg>

                    </div>
                </div>
                <div className={showBokkmarks ? 'candidate-sub-main-1' : 'candidate-sub-main-2'} id='bookmark-floating-2' onClick={toogleBookmarkDiv}>
                    <div>
                        <p>Shortlisted Appliation</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#52c02c"
                                strokeWidth="5"
                                strokeDasharray={`${circumference} ${circumference}`}
                                style={{ strokeDashoffset: shortlisted }}
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                {shortlistedPerc}%
                            </text>
                        </svg>

                    </div>
                </div>
                {
                    showBokkmarks ?
                        <div className={showBokkmarks ? 'candidate-sub-main-1' : 'candidate-sub-main-2'} id='bookmark-floating-2' onClick={toogleBookmarkDiv}>
                    <div>
                        <p>Shortlisted Appliation</p>
                    </div>
                    <div className='candidate-progress-data'>
                        <h2>5421</h2>
                        <svg className="progress-ring" width="120" height="120">
                            <circle
                                className="progress-ring-circle"
                                stroke="#dddddd"
                                strokeWidth="5"
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                className="progress-ring-circle"
                                stroke="#52c02c"
                                strokeWidth="5"
                                strokeDasharray={`${circumference} ${circumference}`}
                                style={{ strokeDashoffset: shortlisted }}
                                fill="transparent"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                {shortlistedPerc}%
                            </text>
                        </svg>

                    </div>
                        </div> :
                        <div className={showBokkmarks ? 'candidate-sub-main-1' : 'candidate-sub-main-2'} id='bookmark-floating-2' onClick={toogleBookmarkDiv2}>
                            <div>
                                <p>Profile Bookmarked</p>
                                <h2>5421</h2>
                            </div>
                            <svg className="progress-ring" width="120" height="120">
                                <circle
                                    className="progress-ring-circle"
                                    stroke="#dddddd"
                                    strokeWidth="5"
                                    fill="transparent"
                                    r={radius}
                                    cx="60"
                                    cy="60"
                                />
                                <circle
                                    className="progress-ring-circle"
                                    stroke="#1554f6"
                                    strokeWidth="5"
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    style={{ strokeDashoffset: pBkmed }}
                                    fill="transparent"
                                    r={radius}
                                    cx="60"
                                    cy="60"
                                />
                                <text x="50%" y="55%" textAnchor="middle" fill="black" fontSize="20">
                                    {pBkmedPerc}%   
                                </text>
                            </svg>
                        </div>
                }
            </div>
            <div>
                {
                    showBokkmarks ? <div><div className='candidate-main-2'>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1%", marginTop: "1%" }}>
                            <h2>Candidates</h2>
                            <select>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                                <option>March 2023</option>
                            </select>
                        </div>
                        <div>
                            <table className='candidate-table'>
                                <thead style={{ backgroundColor: "#fa7902", height: "2%" }}>
                                    <tr>
                                        <th>Candidate Name</th>
                                        <th onClick={toggleSortOrder}>{isAscending ? 'D Rating' : 'A Rating'}</th>
                                        <th onClick={toggleStagesSortOrder}>{isStageAscending ? 'D Stages' : 'A Stages'}</th>
                                        <th>Applied Role</th>
                                        <th onClick={toggleDateSortOrder}>{isDatAscending ? 'D Date' : 'A Date'}</th>
                                        <th>Attachments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AppliedUsers.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ display: "flex", alignItems: "center", gap: "10px" }}><img src={item.profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'} height="50px" alt='pro' /> <p>{item.name}</p></td>
                                                <td>&#9734; {item.testResult} </td>
                                                <td>Pending</td>
                                                <td>{item.jobTitle}</td>
                                                <td>{item['Application Date']}</td>
                                                <td key={index} style={{ textAlign: "center" }}> files</td>




                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <div className='table-button-div'>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div></div> : null
                }
                {
                    toogleBookMark ? null :
                        <div>
                            {
                                showBkProfile ?
                                    <div className='profile-bookmark-div'>
                                        <h4 style={{paddingLeft:15}}>Profile Bookmarked</h4>
                                        <div className='profile-bookmark-cont'>
                                            {AppliedUsers && AppliedUsers.map((user, index) => {
                                                return (
                                                    <div className='profile-map-div' data-id={user._id} key={index}>
                                                        <div className='profile-name_box'>
                                                            <img src={user.profileImage ?? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'} alt='pro' width={"50px"} height={"50px"} />
                                                            <div className="profile-map-text">
                                                                <h5>{user.name}</h5>
                                                                {user.biography ? <p>{user.biography}..see more</p> : ""}
                                                            </div>
                                                            <p><FaBookmark /></p>
                                                        </div>
                                                        <div className='profile-map-div-loc'>
                                                            <p>Location -<span className='location'>{user.state}</span></p>
                                                            <p>Type - <span className='location'>Remote</span></p>
                                                        </div>
                                                        <hr></hr>
                                                        <div className='profile-map-skills'>
                                                            <h6>Skills</h6>
                                                            <div className='profile-map-skill-box' >
                                                                {user.skills?.map((skill, skillindex) => (
                                                                    <>{skillindex!=null? <p key={skillindex}>{skill.name}</p> : <p>Not Defined by Candidate</p>}</>
                                                                ))}


                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                    :
                                    <div className='bookmark-profile-div'>
                                        <div className='bookmark-profile-left-div'>

                                            {AllJobs && AllJobs.map((user, index) => {
                                                return (
                                                    <div className='profile-map-div' data-id={user._id} key={index}>
                                                        <div style={{ display: "flex", marginTop: "2%", marginLeft: "2%" }}>
                                                            <img src='https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png' alt='pro' height={"80px"} />
                                                            <div className="profile-map-text">
                                                                <h4>{user.name}</h4>
                                                                <p></p>
                                                            </div>
                                                            <p><FaBookmark /></p>
                                                        </div>
                                                        <div style={{ display: "flex" }} className='profile-map-div-loc'>
                                                            <p>Location - {user.state}</p>
                                                            <p>Type - Remote</p>
                                                        </div>
                                                        <hr></hr>
                                                        <div className='profile-map-skills'>
                                                            <h4>Skills</h4>
                                                            <div style={{ display: "flex" }}>
                                                                {user.skills?.map((skill, skillindex) => (
                                                                    <p key={skillindex}>{skill.name ? skill.name : "Not defined"}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {AllJobs?.filter((user, index) => user._id === Selectedid).map((user, index) => {
                                            console.log(user);
                                            return (
                                                <div className='bookmark-profile-right-div' key={index}>

                                                    <div className='bookmark-profile-info-div'>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                                            <img src='https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png' alt='pro' height={"107px"} />
                                                            <h3>{user.name}</h3>
                                                        </div>
                                                        <div style={{ display: "flex", gap: "10px" }}>
                                                            <p><FaBookmark /></p>
                                                            <p><FaEllipsisVertical /></p>
                                                        </div>
                                                    </div>
                                                    <p style={{ marginTop: "5%" }}>{user.biography}</p>
                                                    <div className='bookmark-profile-details'>
                                                        <p><span>City</span> <br></br>NY</p>
                                                        <p><span>State</span><br></br>{user.state}</p>
                                                        <p><span>Country</span><br></br>{user.country}</p>
                                                    </div>
                                                    <div className='boomark-profile-map-skills'>
                                                        <h4>Skills</h4>
                                                        <div style={{ display: "flex" }}>
                                                            {user.skills?.map((skill, skillindex) => (
                                                                <p key={skillindex}>{skill.name ? skill.name : "Not defined"}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className='bookmark-profile-apllication'>
                                                        <h4>Application Note : </h4>
                                                        <p>{user.biography}</p>                                                </div>
                                                    <div className='bookmark-profile-button'>
                                                        {SeeResume ?
                                                            <button onClick={() => setSeeResume(!SeeResume)}>Close Resume</button> :
                                                            <button onClick={() => setSeeResume(!SeeResume)}>See Resume</button>}
                                                        <button>Schedule Interview</button>
                                                    </div>
                                                   

                                                </div>
                                            )
                                        })}



                                    </div>
                            }
                        </div>
                }
            </div>
        </div>

    )
}

export default Candidate