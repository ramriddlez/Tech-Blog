const sequelize = require('../config/connection');
const { User, Comment, BlogPost } = require('../models');

const userData = require('../seeds/userData.json');
const commentData = require('../seeds/commentData.json');
const blogPostData = require('../seeds/blogPostData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log ("connected to db")
    await User.bulkCreate(userData, {
        individualhooks: true
    });
    console.log ("users seeded complete")
    await Comment.bulkCreate(commentData);

    console.log("comments created on blog post")
    await BlogPost.bulkCreate(blogPostData);
    console.log("blog post created")
    process.exit(0);
  };
  
  seedDatabase();
  