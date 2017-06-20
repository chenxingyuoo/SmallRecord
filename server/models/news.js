/**
 * Created by chenxingyu on 2017/1/10.
 */
const mongoose = require('../db').mongoose;

const  newsSchema = new mongoose.Schema({
    title: String,
    cover : String,
    desc: String,
    content: String,
    editValue : String,
    createAt: String,
    updateAt: String,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;