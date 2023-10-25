const Wish = require("../models/Wish");
const User = require("../models/User");

const publishWish = async (req, res, next) => {
    const {idUser, name, content} = req.body;
    if(!idUser){
        return res.status(200).json({
            success: false,
            message: "Bạn cần đăng nhập tài khoản để thực hiện thao tác này"
        })
    }
    if(!name || !content){
        return res.status(200).json({
            success: false,
            message: "Vui lòng nhập đủ các trường"
        })
    }
    const user = await User.findById(idUser);
    if(!user){
        return res.status(200).json({
            success: false,
            message: "Bạn cần đăng nhập tài khoản để thực hiện thao tác này"
        })
    }
    const wish = new Wish({owner: idUser, name, content});
    await wish.save();
    return res.status(201).json({
        success: true,
        message: "Điều ước đã được ghi nhận",
    })
}

const updateWish = async (req, res, next) => {
    const {idUser, idWish, name, content} = req.body;
    const user = await User.findById(idUser);
    if(!user){
        return res.status(200).json({
            success: false,
            message: "Bạn cần đăng nhập để thực hiện thao tác này",
        })
    }
    const wish = await Wish.findById(idWish);
    if(!wish){
        return res.status(200).json({
            success: false,
            message: "Điều ước này không tồn tại hoặc đã bị xóa",
        })
    }

    const ownerId = wish.owner._id;
    const userId = user._id;
    if(!ownerId.equals(userId)){
        return res.status(200).json({
            success: false,
            message: "Bạn không thể thay đổi điều ước của người khác",
        })
    }
    if(name){
        wish.name = name;
        await wish.save();
    }
    if(content){
        wish.content = content;
        await wish.save();
    }
    return res.status(200).json({
        success: true,
        message: "Điều ước đã được thay đổi"
    })
}

const deleteWish = async (req, res, next) => {
    const {idUser, idWish} = req.body;
    const user = await User.findById(idUser);

    if(!user){
        return res.status(200).json({
            success: false,
            message: "Bạn cần đăng nhập để thực hiện thao tác này",
        })
    }
    const wish = await Wish.findById(idWish);
    if(!wish){
        return res.status(200).json({
            success: false,
            message: "Điều ước này không tồn tại hoặc đã bị xóa",
        })
    }

    const ownerId = wish.owner._id;
    const userId = user._id;
    if(!ownerId.equals(userId)){
        return res.status(200).json({
            success: false,
            message: "Bạn không thể xóa điều ước của người khác",
        })
    }

    await wish.deleteOne();
    // return for client
    return res.status(200).json({
        success: true,
        message: "Điều ước của bạn đã được xóa"
    })
}

const getAllWishes = async (req, res, next) => {
    var {page, limit} = req.query;
    const wishes = await Wish.find({}).sort({updatedAt: -1}).skip((page - 1) * limit).limit(limit)
    .populate("owner", "-createdAt -updatedAt -__v");
    return res.status(200).json(wishes);
}

module.exports = {
    publishWish,
    getAllWishes,
    updateWish,
    deleteWish,
}