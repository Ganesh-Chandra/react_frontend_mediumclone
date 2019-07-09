import React from 'react';
import { Redirect } from 'react-router';
import {Fragment} from 'react'
import './Page1.css'
import './Page2.css'
import './Page3.css'
import './Page4.css'
import './newpost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hai: 4
        }
    }
    render() {
        return (

            <Router>
                <div>
                    <Route exact path='/' component={Page1}></Route>

                    <Route exact path='/page2/:postId' component={Page2} />
                    <Route exact path='/page3/:postid' component={Page3} ></Route>
                    <Route exact path='/page4' component={Page4}></Route>
                    <Route exact path='/page5' component={page5}></Route>
                    <Route exact path='/page6' component={CreatePostEditor}></Route>
                </div>
            </Router>

        )
    }
}

class Page1 extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.fetch();
        if (window.sessionStorage.getItem("isLoggedIn") === null || window.sessionStorage.getItem("isLoggedIn") === "false") {
            console.log("clear!!")
        }
        else {
            document.getElementById("signupp").style.display = "none"
            //window.sessionStorage.setItem("isLoggedIn","false")
            document.getElementById("signinn").innerHTML = "Signout"
            //console.log("signed in!",window.sessionStorage.getItem("isLoggedIn"),window.sessionStorage.getItem("userName"))
        }
    }
    fetch() {

        var url = "http://localhost:3000/posts/";


        axios.get(url).then((response) => {
            // console.log(response)
            this.setState({
                data: response.data.data
            });
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }
    querytag = (event) => {

        var a = event.target
        console.log(a.innerHTML)
        var url = "http://localhost:3000/posts/tags/" + a.innerHTML;
        console.log(url)
        if (a.innerHTML !== "HOME") {
            axios.get(url).then((response) => {
                console.log(response)
                this.setState({
                    data: response.data.data
                });
            })
                .catch((e) => {
                    console.log("error");
                    console.log(e)
                });
        }
        else {
            this.fetch();
        }
    }

    handlsigninn = () => {

        document.getElementById("signupp").style.display = "none"
        //window.sessionStorage.setItem("isLoggedIn","false")
        document.getElementById("signinn").innerHTML = "Signin"
        window.sessionStorage.setItem("isLoggedIn", "false")

    }
    render() {

        var items = this.state.data.map(post => <Post key={post.id} post={post} />);
        return (

            <div className="parentpg1">
               <br /><br />
                <div className="container">
                    <div className="row" id="signinbar">
                        <div className="col-sm-2 " id="signinbar1">
                            <b>
                                <h1>Medium</h1>
                            </b>
                        </div>
                        <div className="col-sm-4 " id="signinbar2">

                        </div>
                        <div className="col-sm-1 " id="signinbar3">

                        </div>
                        <div className="col-sm-2 " id="signinbar4" style={{}}>

                            <Link to="/page5" style={{ textDecoration: 'none' }}><p id="signupp">Become a member</p></Link>

                        </div>
                        <div className="col-sm-1 " id="signinbar5">
                            <Link to="/page4" style={{ textDecoration: 'none' }}><p id="signinn" onClick={this.handlsigninn}>Sign in</p></Link>
                        </div>
                        <div className="col-sm-2 " id="signinbar6">
                            <button>
                                <Link to="/page6" style={{ textDecoration: "none" }}>Get started</Link>
                            </button>
                        </div>

                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12 " id="navbar">
                            <ul>
                                <li><p className="home_nav" onClick={this.querytag}>HOME</p></li>
                                <li><p className="onezero_nav" onClick={this.querytag}>ONEZERO</p></li>
                                <li><p className="elemental_nav" onClick={this.querytag}>ELEMENTAL</p></li>
                                <li><p className="heated_nav" onClick={this.querytag}>HEATED</p></li>
                                <li><p className="tech_nav" onClick={this.querytag}>TECH</p></li>
                                <li><p className="startups_nav" onClick={this.querytag}>STARTUPS</p></li>
                                <li><p className="self_nav" onClick={this.querytag}>SELF</p></li>
                                <li><p className="politics_nav" onClick={this.querytag}>POLITICS</p></li>
                                <li><p className="health_nav" onClick={this.querytag}>HEALTH</p></li>
                                <li><p className="design_nav" onClick={this.querytag}>DESIGN</p></li>
                                <li><p className="human_parts_nav" onClick={this.querytag}>HUMAN PARTS</p></li>
                                <li><p className="more_nav" onClick={this.querytag}>MORE</p></li>

                            </ul>
                        </div>
                    </div>
                </div>

<br /><br />

                <div className="container" id="post1">
                    {items}
                </div>


                <br /><br /><br />


            </div>

        )
    }
}

class Post extends React.Component {

    constructor() {
        super();


        this.state = {
            title: "Loading...",
            titledes: "Loading...",
            auth: "Loading...",
            readtimes: "Loading..."
        }
    }


    render() {

        var postId = this.props.post.id
        //console.log(postId)
        return (

            <Link to={`/page2/${postId}`} style={{ textDecoration: 'none', color: 'black' }} >

                <div className="container" id="post1">
                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-11 ">
                            <div className="title1">
                                <h1>{this.props.post.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-10 ">
                            <div className="desc1">
                                <p>{this.props.post.titleDescription}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-11 ">
                            <div className="auth1">
                                <p>{this.props.post.user.userName} in {this.props.post.subDomain} </p>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-8 ">
                            <div className="detail1">
                                <p>{this.props.post.createdAt.slice(0, 10)} . {this.props.post.readTime} read<i className="material-icons" style={{ fontSize: "13px", margin: "5px" }}>grade</i></p>

                            </div>

                        </div>
                        <div className="col-sm-1 ">

                        </div>
                        <div className="col-sm-1 ">
                            <i className="material-icons">bookmark_border</i>
                        </div>
                    </div>

                </div>
            </Link>
        )
    }
}

class Page2 extends React.Component {

    constructor(props) {

        super(props);
        console.log(props.match.params.postId);
        this.state = {
            id: props.match.params.postId,

            data: {
                createdAt: "..",
                id: 1,
                postDescription: "<h1>cool</h1>",
                readTime: "..",
                subDomain: "..",
                tag: "..",
                title: "..",
                titleDescription: "..",
                updatedAt: "..",
                user: {
                    createdAt: "..",
                    email: "..",
                    id: 1,
                    image: "..",
                    password: "..",
                    updatedAt: "..",
                    userName: "..",
                }

            }
        }
    }

    componentDidMount() {
        this.fetch();
        if (window.sessionStorage.getItem("isLoggedIn") === null || window.sessionStorage.getItem("isLoggedIn") === "false") {
            console.log("clear!!")
        }
        else {
            //document.getElementById("signupp").style.display="none"
            //window.sessionStorage.setItem("isLoggedIn","false")
            document.getElementById("signinn").innerHTML = "Signout"
            //console.log("signed in!",window.sessionStorage.getItem("isLoggedIn"),window.sessionStorage.getItem("userName"))
        }

        
    }

    fetch() {


        var url = "http://localhost:3000/posts/" + this.state.id.toString();


        axios.get(url).then((response) => {

            this.setState({
                data: response.data.data
            });
console.log(response.data.data)
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }
    handlsignout = () => {
        document.getElementById("signinn").innerHTML = "Signin"
        window.sessionStorage.setItem("isLoggedIn", "false")
    }

    render() {
        console.log(this.state.data)
        var datecreated = this.state.data.createdAt;
        datecreated = datecreated.slice(0, 10)
        var postid = this.props.match.params.postId


        var htmlToReactParser = new HtmlToReactParser();
var reactElement = htmlToReactParser.parse(this.state.data.postDescription);


        return (

            <div className="parentpg2">
                <br /><br />
                <div class="container">
                    <div class="row" id="signinbar">
                        <div id="signinbar1">
                            <b>
                                <Link to="/" style={{ textDecoration: 'none' }}><h1>M</h1></Link>
                            </b>
                        </div>
                        <div id="signingap">

                        </div>

                        <div id="signinbar5">
                            <Link to="/page4" style={{ textDecoration: 'none' }}><p id="signinn" onClick={this.handlsignout}>Sign in</p></Link>
                        </div>
                        <div id="signinbar6">
                        <Link to="/page6" style={{ textDecoration: 'none' }}><button>
                                Get started
                  </button>
                  </Link>
                        </div>

                    </div>

                </div>
                <hr />


                <br />


                <div class="container" id="titlebox">
                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>
                        <div class="col-lg-8 ">
                            <div class="post_title">
                                <h1>{this.state.data.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>



                        <div class="col-lg-8 ">
                            <div class="post_intro">
                                <p>{this.state.data.titleDescription}</p>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div class="row">
                        <div class="col-lg-2 ">

                        </div>
                      
                        

                        <div class="col-lg-1 " id="auth_img">
                            <img src={this.state.data.user.image} id="authimg" alt="noimg.png"></img>

                        </div>


                        <div class="col-lg-3 ">

                            <div class="auth1">
                                <p>{this.state.data.user.userName}
                                    {/* <button>
                                        Follow
                          </button> */}
                                </p>

                            </div>
                            <div class="detail1">
                                <p>{datecreated} .{this.state.data.readTime} read <i class="material-icons" style={{ fontSize: "16px", margin: "5px" }}>grade</i></p>

                            </div>

                        </div>


                    </div>
                </div>


                <br /><br />


                <div class="container" id="post_essay">

                    <div class="row">
                        <div class="col-lg-1 ">

                        </div>

                        <div class="col-lg-10 ">
                            <div class="postdes">
                            {reactElement}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1 ">

                        </div>
                        <br />

                        <div class="col-lg-9" id="cmnttpagetag">
                        <p>
                        <br /><br />
                       
                        <br /></p>
                            <Page3 postId={this.props.match.params.postId}/>
                        </div>

                        <div class="col-lg-1 ">

                        </div>
                    </div>


                </div>
            </div>

        )
    }
}

class Page3 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {

            data: []
        }

    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {


        var c = this.props.postId
        var url = "http://localhost:3000/posts/" + c.toString() + "/comments";


        axios.get(url).then((response) => {

            this.setState({
                data: response.data.data
            });
            console.log(response, "........")
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
    }

    handleSubmit = (event) => {
        if (window.sessionStorage.getItem("isLoggedIn") === "true") {
            console.log("data logged............")

            var c = this.props.postId
            const data = document.getElementById("newcomm").value

            var reqobj = {
                
                userId:window.sessionStorage.getItem('userId'),
                commentData: data,
                commentBy: window.sessionStorage.getItem("userName")
            }
            var url = "http://localhost:3000/posts/" + c.toString() + "/comment";
            console.log(reqobj)

            axios.post(url, reqobj).then((response) => {
                console.log(response)
            })
                .catch((e) => {
                    console.log("error");
                    console.log(e)
                });

            //event.preventDefault();
        }
        else {
            event.preventDefault();
            alert("please signin before adding a comment");
        }
    }


    render() {
        //console.log(this.props.post.location.state)
        console.log(this.state)
        var items = this.state.data.map(comment => <Comment key={comment.id} comment={comment} />);
        return (

            <div className="parentpg3">
                <div class="container" id="box">

                    <div class="row" id="new_comment">
                        <div class="col-sm-12 ">
                            <h5>Responses</h5>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="write a response" id="newcomm" />
                                <input type="submit" style={{ visibility: "hidden" }} />
                            </form>
                            <br />
                            <hr />
                            <br /><br />
                            <p id="convo_group">Conversations for the above post </p>
                            <br /><br />
                        </div>
                    </div>
                    {items}

                </div>

            </div>

        )
    }
}

class Comment extends React.Component {


    render() {
        console.log(this.props.comment, ".........")
        var datecreated = this.props.comment.createdAt
        datecreated = datecreated.slice(0, 10)
        return (
            <div class="row">
                <div class="container" id="comment">
                    <div class="row ">
                        <div class="col-lg-1 " id="auth_img">
                            <img src={this.props.comment.user.image} alt="noimg.png" />

                        </div>



                        <div class="col-lg-3 ">

                            <div>
                                <p id="auth1">{this.props.comment.commentBy}</p>

                            </div>
                            <div>
                                <p id="detail1">{datecreated} </p>


                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <p id="comment_text">{this.props.comment.commentData}</p>
                    </div>
                    <div class="row" id="claps_tags">
                        <div id="clap">
                        <svg class="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
    <path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fill-rule="evenodd"></path>
</svg>
          
                        </div>

                        <div id="clapcount">
                            
                        </div>
                        <div id="gap">

                        </div>

                        <div id="response">
                            {/* <p>1 response</p> */}
                        </div>

                        <div id="bookmark">

                            {/* <i class="material-icons" >bookmark_border</i> */}

                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
class Page4 extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false
        }
    }
    handlesignin = (e) => {
        e.preventDefault()
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        console.log(email, password)
        var reqob = {
            email: email,
            password: password
        }
        axios.post("http://localhost:3000/signin", reqob).then((response) => {
            if (response.data.length === 0) {
                alert("Invalid username or password")
                window.sessionStorage.setItem("isLoggedIn", false)
            }
            else {

                window.sessionStorage.setItem("isLoggedIn", true)
                window.sessionStorage.setItem("userName", response.data[0].userName)
                window.sessionStorage.setItem("userId", response.data[0].id)
                this.setState({ success: true })
            }
        })

    }
    render() {
        
        if (this.state.success) {
            
            return <Redirect to="/" />
        }
        else

            return (
                <div class="parentpg4">
                    <br />



                    <br /><br />




                    <div class="container" id="post_essay">

                        <div class="d-flex justify-content-center" id="post_essay1">

                            <h1>Sign in with email</h1>
                        </div>

                        <div class="d-flex justify-content-center" id="post_essay2">
                            <p> <br /> Welcome back! Enter your email address and<br /> password to sign in and have unlimited reading! <br />  <br />
                            </p>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p>Your email</p>
                        </div>
                        <form onSubmit={this.handlesignin}>
                       
                        <div class="d-flex justify-content-center" id="post_essay4">
                        
                            <input type="text" id="email" required/>
                            
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p>Password</p>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay4">
                            <input type="password" id="password" required/>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay5">
                            <input type="submit" value="Continue"  />
                        </div>
                        </form>
                        <div class="d-flex justify-content-center" id="post_essay6">
                            No account?<div>&nbsp;</div><div>&nbsp;</div><Link to="page5"> Create one</Link>
                        </div>
                    </div>
                    <br /><br /><br />

                </div>
            )
    }
}
class page5 extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false
        }
    }
    handlesignup = (e) => {
        e.preventDefault()
        var userName = document.getElementById("name").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var image = document.getElementById("profile_picture").value
        console.log(email, password)
        var reqob = {
            userName: userName,
            email: email,
            password: password,
            image: image
        }
        axios.post("http://localhost:3000/signup", reqob).then((response) => {
            console.log(response)
            this.setState({ success: true })
        })

    }

    render() {
        if (this.state.success) {
            return <Redirect push to="/page4" />
        }
        else
            return (
                <div class="parentpg4">
                    <br />


                    <br /><br />




                    <div class="container" id="post_essay">

                        <div class="d-flex justify-content-center" id="post_essay1">

                            <h1>Sign Up with email</h1>
                        </div>

                        <div class="d-flex justify-content-center" id="post_essay2">
                            <p><br />Enter the email address and other details<br /> for your account , Happy reading!!
            </p>
                        </div>
                        <br />
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p>User Name</p>
                        </div>
                        <form onSubmit={this.handlesignup}>
                        <div class="d-flex justify-content-center" id="post_essay4">
                            <input type="text" id="name" required/>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p>Your email</p>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay4">
                            <input type="text" id="email" required/>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p> password</p>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay4">
                            <input type="password" id="password" required/>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay3">
                            <p> profile picture</p>
                        </div>
                        <div class="d-flex justify-content-center" id="post_essay4">
                            <input type="password" id="profile_picture" required/>
                        </div>

                        <div class="d-flex justify-content-center" id="post_essay5">
                            <input type="submit" value="Sign Up" />
                        </div>
                        </form>
                        <div class="d-flex justify-content-center" id="post_essay6">
                            Already have account?<div>&nbsp;</div><Link to="page4">Sign in</Link>
                        </div>
                    </div>


                </div>
            )
    }
}
class CreatePostEditor extends React.Component {
    constructor(){
        super();
        this.state = { text: '' }
    }
    handleSubmit = (event) => {
        console.log("clickeddd!!")
        const postDescription = this.state.text
        const title = document.getElementById("title").value
        const titleDescription = document.getElementById("titledes").value
        const tag = document.getElementById("tags").value
        const userId = parseInt(window.sessionStorage.getItem("userId"), 10)
        const readTime = document.getElementById("readtime").value
        const subDomain = document.getElementById("subdomain").value
        var reqobj = { readTime, subDomain, userId, postDescription, title, titleDescription, tag }
        console.log(reqobj)
        var url = "http://localhost:3000/post";



        axios.post(url, reqobj).then((response) => {
            console.log(response)
        })
            .catch((e) => {
                console.log("error");
                console.log(e)
            });
        // window.location.href = 'http://localhost:3001';
        // event.preventDefault();
    }
    componentDidMount(){
        if(window.sessionStorage.getItem("isLoggedIn")==='true'){
            document.getElementById("signin6").innerHTML="Sign out"
        }
        else{
            document.getElementById("signin6").innerHTML="Sign in"
        }
    }
    editorhandler=(value)=>{
            
        this.setState({ text: value })
       // document.getElementById("data").innerHTML=window.quill.root.innerHTML;
    }
    handlesignin=(e)=>{
        window.sessionStorage.setItem("isLoggedIn",false)
    }
    render() {
      
        return (
           
            <div class="container newpost">
                
                
      
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                <div className="row" id="signinbar">
                    <div className="col-sm-2 " id="signinbar1">

                        <Link to="/" style={{ textDecoration: "none" }}><h1 style={{ backgroundColor: "black", color: "white", fontFamily: "times", display: "inline", paddingRight: "2%", paddingLeft: "2%", borderRadius: "3px" }}> <b>M </b></h1></Link>

                    </div>
                    <div className="col-sm-4 " id="signinbar2">

                    </div>
                    <div className="col-sm-1 " id="signinbar3">


                    </div>
                    <div className="col-sm-2 " id="signinbar4">



                    </div>
                    <div className="col-sm-1 " id="signinbar5">

                    </div>
                    <div className="col-sm-2 " id="signinbar6">
                    <Link to="/page4" style={{ textDecoration: 'none' }}>
                        <p onClick={this.handlesignin} id="signin6">Sign in </p>  </Link>
                        </div>
                     
                </div>
                <br /><br /><br />
                <div class="row">
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-4 ">
                        <b id="titlelabel">Story Prieview</b>
                    </div>
                    <div class="col-sm-2 ">

                    </div>
                    <div class="col-sm-5 ">
                        <p id="readtimeslabel"> Add Estimated time to go through your story so readers can have idea about post</p>

                    </div>
                    <div class="col-sm-2 ">

                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-6 ">
                        <div class="desc1">
                        <ReactQuill onChange={this.editorhandler}/>
                     
                        </div>
                    </div>
                    <div class="col-sm-5 ">

                        <input id="readtime" type="text" required/>
                        <p id="tagnote"> Add or change tags (up to 5) so readers know what your story is about</p>
                        <input id="tags" type="text" required/>
                        <p id="note">Add Your Blog name or channel name to your story and we would show that up along with your post! </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-5 ">
                        <input id="title" type="text" placeholder="title" required/>


                    </div>
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-5 ">
                        <input id="subdomain" type="text" required/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-5 ">
                        <input id="titledes" type="text" placeholder="title description" required/>

                        <p id="note"> <b>Note:</b>Changes here will affect how your story appears in public places like Medium’s
                            homepage — not the story
                        itself.</p>
                    </div>
                    <div class="col-sm-1 ">

                    </div>
                    <div class="col-sm-5 ">



                        <input id="publish" type="submit" value="Publish Now"  required/>
                    </div>
                </div>
                </form>
            </div>

        )
    }
}


export default App;


