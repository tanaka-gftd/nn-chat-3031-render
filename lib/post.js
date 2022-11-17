'use strict';
const { Sequelize, DataTypes } = require('sequelize');

//renderでデータベースと接続する際の設定
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

//process.env.DATABASE_URLに値があるかどうかで、本番環境or開発環境下を判断し、使用するデータベースを使い分ける
const sequelize = process.env.DATABASE_URL ?
  
  //本番環境
  new Sequelize(
    process.env.DATABASE_URL,
    {
      logging: false,
      dialectOptions
    }
  )
  :
  //開発環境
  new Sequelize(
    'postgres://postgres:postgres@db/nn_chat',
    {
      logging: false
    }
  );

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT
    },
    postedBy: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Post.sync();
module.exports = Post;