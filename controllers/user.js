const User = require("../models/User");
const Wish = require("../models/Wish");

const upload = require("../middlewares/uploads");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const register = async (req, res, next) => {
    try {
        const {username} = req.body;
        if(!username) return res.status(200).json({
            success: false,
            message: "Vui lòng nhập tên người dùng"
        }) 
        // check user
        const user = await User.findOne({username});
        if(user){
            return res.status(200).json({
                success: false,
                message: "Tên người dùng đã tồn tại"
            })
        }

        const newUser = new User({username});
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "Đăng ký tài khoản thành công",
            idUser: newUser._id,
        })
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {username} = req.body;
        if(!username) return res.status(200).json({
            success: false,
            message: "Vui lòng nhập tên người dùng"
        }) 
        // check user
        const user = await User.findOne({username});
        if(user){
            return res.status(200).json({
                success: true,
                message: "Đăng nhập tài khoản thành công",
                idUser: user._id
            })
        }
        return res.status(200).json({
            success: false,
            message: "Tên người dùng không chính xác",
        })
    } catch (error) {
        next(error);
    }
}

const updateAvatar = async (req, res, next) => {
    const fileData = req.file;
    try {
        const {idUser} = req.body;
        if(!idUser)  return res.status(200).json({
            success: false,
            message: "Bạn cần đăng ký tài khoản để thực hiện thao tác này"
        })
        const user = await User.findById(idUser);
        const avatar = fileData?.path;
        if(user){
            if(fileData){
                const divLastIndex = user.avatar.lastIndexOf('/');
                const nameFolder = "bestwishes";
                const str1 = nameFolder + user.avatar.substring(divLastIndex).toString();
                const filename = str1.split('.')[0];
                cloudinary.api.delete_resources([filename]) 
            }
            user.avatar = avatar;
            user.save();
            return res.status(200).json({
                success: true,
                message: "Cập nhật ảnh đại diện thành công",
            });
        }
    } catch (error) {
        if(fileData) cloudinary.uploader.destroy(fileData.filename);
        next(error)
    }
}

const getInfoUser = async(req, res, next) => {
    const {idUser} = req.body;
    const user = await User.findById(idUser);
    return res.status(200).json(
        user
    )
}

module.exports = {
    register,
    updateAvatar,
    getInfoUser,
    login,
}