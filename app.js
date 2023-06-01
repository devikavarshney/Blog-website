//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
 };
 
const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
  "Welcome to BlogZilla, your ultimate web app for composing and posting captivating blogs! Whether you're a seasoned writer or just starting your blogging journey, BlogZilla is here to empower you with a seamless and user-friendly platform to express your thoughts, share your expertise, and engage with a wider audience. With BlogZilla, crafting a compelling blog has never been easier. Our intuitive and feature-rich editor provides you with all the tools you need to create stunning content. From formatting options like bold, italics, headings, and bullet points to inserting images, videos, and hyperlinks, BlogZilla empowers you to bring your ideas to life. With a wide array of customizable templates and themes, you can ensure your blog reflects your unique style and personality. BlogZilla goes beyond just writing and editing. We understand the importance of reaching a larger audience, and that's why we offer seamless integration with popular social media platforms. With just a few clicks, you can instantly share your blogs across Facebook, Twitter, and more, maximizing your reach and driving traffic to your website. Additionally, BlogZilla provides powerful analytics and insights to help you understand your readers better. Track the performance of your blogs, measure engagement, and gain valuable feedback to continuously improve your writing and connect with your audience on a deeper level. Join the BlogZilla community today and unlock the full potential of your blogging prowess. Whether you're a hobbyist, an influencer, or a professional, BlogZilla is your go-to platform for creating and sharing remarkable blogs that captivate and inspire. Start writing your success story with BlogZilla now!";
const aboutContent =
  "Hi, I'm Devika Varshney, a curious learner from India!"+
  "💻 I have worked as a Technical Blog Writer for 9 months and as a Technical Blog Reviewer for 3 months."+
  "🚀 I’m currently looking for a Job with a role of MERN Stack Web Developer."+
  "🔭 I’m currently working with MongoDB, ExpressJS, ReactJS, NodeJS."+
  "🌱 I’m currently learning MERN Stack & building Projects in public."+
  "👯 I’m looking to collaborate with people with Amazing Ideas."+
  "⚡ Fun fact: I love connecting & socializing with new people."+
  "🔥 Amongst top 10 contributor in SWOC'21 ";
const contactContent ="Email ID - devikavarshney003@gmail.com";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
 
 
});

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res)
 {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  // const requestedPostName = _.lowerCase(req.params.postName);
  // posts.forEach(function (post) {
  //   const currentPost = _.lowerCase(post.title);
  //   if (requestedPostName === currentPost) {
  //     res.render("blogPost", {
  //       postTitle: post.title,
  //       postContent: post.content,
  //     });
  //   }
  // });
});

app.listen(3001, function () {
  console.log("Server started on port 3001");
});
