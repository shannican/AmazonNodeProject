var express = require('express');
var passport  = require('passport');
var router = express.Router();
var userModel = require('./users');
const products  =require('./product')
const confii = require('../confii/multer')
var localStrategy = require('passport-local');
const multer = require('multer');
const productModel = require('./product');
const { response } = require('express');
const { update } = require('./users');
const product = require('./product');
// const app = require('../app');
passport.use(new localStrategy(userModel.authenticate()))
passport.use(userModel.createStrategy());

/* GET home page. */
const userImageUpload = multer({storage: confii.userImageUpload})
const productImageUpload= multer({storage: confii.productImageUpload})


router.post('/upload',isLoggedIn, userImageUpload.single("dpimage"),async function(req,res){
  let user = await userModel.findOne({email: req.user.email})
  user.dpimage = req.file.filename;
  await user.save();
  res.redirect('/profile')
})
// router.post('/update',isLoggedIn, userImageUpload.single("dpimage"),async function(req,res){
//   let user = await userModel.findOne({email: req.user.email})
//   user.dpimage = req.file.filename;
//   await user.save();
//   res.redirect('/editrofile')
// })
router.get('/pins',productImageUpload.single("pic"), isLoggedIn,function(req,res){
  res.render('pins',{data:req.user})
})
router.get('/cart',productImageUpload.single("pic"), isLoggedIn,function(req,res){
  res.render('cart',{data:req.user})
})
// router.get('/post',productImageUpload.single("pic"),isLoggedIn, async function(req,res){
//   let user = await userModel.findOne({email: req.user.email})
//   .populate('products')
//   .then((data)=>{
//     res.render('post',{data:data})
//   })
// })
// router.post('/post',isLoggedIn,productImageUpload.array("pic",5) ,async function(req,res,next){
//   let user = await userModel.findOne({email:req.session.passport.user})
//   if(user.isSeller){
//     let data={
//       sellerid:user._id,
//       productname:req.body.productname,
//       address:req.body.address,
//       price:req.body.price,
//       // pic:req.files.map(elm=>elm.filename),
//       desc:req.body.desc,
//       discount:req.body.discount,
//     }
//     let product = await productModel.create(data)
//     user.products.push(product._id)
//     await user.save();
//     res.redirect('/products')
//     console.log(user)
//     console.log(data)
//   }else{
//     res.send("you do not have vendor's account")
//   }
// })
router.get('/profile',userImageUpload.single("dpimage"),productImageUpload.array("pic",5),isLoggedIn,async function(req,res){
  let user = await userModel.findOne({email: req.user.email})
  .populate('products')
  .then((data)=>{
    res.render('profile',{data:data})
    // res.render('products',{data:data})
  })
  console.log(user)
})
router.get('/whishlist',userImageUpload.single('dpimage'),productImageUpload.array("pic",5),isLoggedIn,async function(req,res){
  res.render('whishlist',{data:req.user})
})


router.get('/editprofile',userImageUpload.single("dpimage"),isLoggedIn, function(req,res){
  res.render('editprofile',{data:req.user,user:req.user})
})
router.get('/', function(req, res) {
  res.render('login');
});
router.get('/login',isRedirect, function(req,res){
  res.render('login')
})

router.get('/register',function(req,res){
  res.render('register')
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/register'
}));

router.post('/register',function(req,res){
  var boolean = Boolean(req.body.isSeller);
  console.log(boolean)
  var newUser = new userModel({
  name:req.body.name,
  email:req.body.email,
  contact:req.body.contact,
  isSeller:boolean,
 })
 userModel.register(newUser,req.body.password)
 .then(function(){
  passport.authenticate('local')(req,res,function(){
    res.redirect('/profile')
 })
 }).catch(function(error){
  res.send(error);
 })
})
// router.get('/change-password/:idd',function(req,res,next){
//   res.render("viewprofile",{_id:req.params.idd})
// })
// router.post('/change-password/:idd',function(req,res){
//   user.findById({_id:req.params.idd})
//   .then((user)=>{
//     if(user.resetPasswordToken===1){
//       user.setPassword(req.body.password,function(err){
//         if(err)return res.send(err);
//         user.resetPasswordToken=0;
//         user.save();
//         res.redirect("/create");
//       })
//     }else{
//       res.send("Link expired! <a href='/forget-password'>Try Again.</a>")
//     }
//   }).catch((err)=>res.send(err));
// })
router.post('/changepassword', function (req, res) {
  User.findOne({email: req.body.email}, (err, user) => {
      if (err) {
          res.send(err);
      } else {
          user.changePassword(req.body.password,req.body.newpassword, function (err) {
              if (err) {
                  res.send(err);
              } else {
                  res.send('successfully change password')
              }
          });
      }
  });
});
router.get('/verified',isLoggedIn, async function(req,res){
  res.render('verified',{user:req.user});
})
router.post('/verified',isLoggedIn, async function(req, res,next){
  let user = await userModel.findOne({email:req.session.passport.user})
  if(user.isSeller){
      user.gstin = req.body.gstin,
      user.address = req.body.address,
      user.name=req.body.name;
      user.age=req.body.age;
      user.birth=req.body.birth;
      user.proffession=req.body.proffession;
      user.contact = req.body.contact;
      user.gstin = req.body.gstin;
      user.address = req.body.address;
      user.verify='true'
      user.save()
      res.redirect('/profile')
      console.log(user)
  }else{
    res.send("you do not have vendor's account")
  }
})

router.post('/updateProfile/:iddd',isLoggedIn, userImageUpload.single('dpimage'),async function(req,res){
  let updateuser = await userModel.findOne({email:req.session.passport.user})
  updateuser.dpimage = req.file.filename;
  const newuser = await updateuser.save()
  res.redirect('/editprofile')
  console.log(updateuser)
})
router.post('/update/:idd',isLoggedIn,async function(req,res){
  let updateuser = await userModel.findOne({email:req.session.passport.user})
  updateuser.name=req.body.name;
  updateuser.proffession=req.body.proffession;
  updateuser.contact = req.body.contact;
  updateuser.address = req.body.address;
  updateuser.age = req.body.age;
  updateuser.birth = req.body.birth;
  updateuser.contacts = req.body.Contact;
  const newuser = await updateuser.save()
  console.log(req.user)
  res.redirect('/editprofile')
  console.log(updateuser)
})
// router.get('/profile',productImageUpload.single("pic",5), async function(req,res){
//   let user = await userModel.findOne({email:req.session.passport.user})
//   .populate('products')
//   .then((data)=>{
//     res.render('profile',{data:data})
//   })
// })
router.get('/products',productImageUpload.single("pic",5), isLoggedIn, async function(req,res){
  let user = await userModel.findOne({email: req.user.email})
    .populate('products')
    .then((data)=>{
      res.render('products',{data:data})
    })
    console.log(user)
})
router.post('/create/products',isLoggedIn,productImageUpload.array("pic",5) ,async function(req,res,next){
  let user = await userModel.findOne({email:req.session.passport.user})
  if(user.isSeller){
    let data={
      sellerid:user._id,
      productname:req.body.productname,
      address:req.body.address,
      price:req.body.price,
      pic:req.files.map(elm=>elm.filename),
      desc:req.body.desc,
      discount:req.body.discount,
    }
    let product = await productModel.create(data)
    user.products.push(product._id)
    await user.save();
    res.redirect('/products')
  }else{
    res.send("you do not have vendor's account")
  }
})

router.get('/editproduct/:idd',isLoggedIn,productImageUpload.array("pic",5), async function(req,res){
  let product = await productModel.findOne({_id:req.params.idd})
  console.log(">>>>>>>",product);
  res.render('editproduct',{data:product})
})

// router.get('/editproduct',isLoggedIn,async function(req,res){
//   res.render('editproduct')
// })

router.post('/editproduct/product/:idd',isLoggedIn,async function(req,res){
  let user = await userModel.findOne({email:req.session.passport.user})
  let product = await productModel.findOne({_id:req.params.idd}).populate("sellerid")
  console.log(product);
  // console.log()
  if(product.sellerid.email === user.email){
    productname=req.body.productname;
    address=req.body.address;
    price=req.body.price;
    pic=req.files.map(elm=>elm.filename);
    desc=req.body.desc;
    discount=req.body.discount;
    res.redirect('/products')
  }else{
    res.send("error")
  }
})
router.get('/delete/product/:id',isLoggedIn, async function(req,res){
  const productIndex = req.user.products.findIndex(product => product._id === req.params.id);
  req.user.products.splice(productIndex,1);
  await productModel.findOneAndDelete({_id:req.params.id}).exec();
  await req.user.save();
  res.redirect('/products')
})
// router.get('/edit/product/:id',isLoggedIn, async function(req,res){
//   const productIndex = req.user.products.findIndex(product => product._id === req.params.id);
//   req.user.products.splice(productIndex,1);
//   await productModel.findOneAndUpdate({_id:req.params.id}).exec();
//   await req.user.save();
//   res.redirect('/products')
// })

router.get('/wishlist/product/:id',isLoggedIn, async function(req,res){
  var user = await userModel.findOne({email:req.session.passport.user})
  var product = productModel.findOne({_id:req.params.id})
  user.wishlist.push(product._id)
  await user.save()
})

router.post('/mart',isLoggedIn,async function(req,res){
  let allproducts = await productModel.find().limit(5).populate("sellerid")
  res.render('mart',{allproducts})
  console.log(allproducts)
})

router.get('/logout',function(req,res,next){
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/login');
  }); 
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/login');
  } 
}

function isRedirect(req,res,next){
  if(req.isAuthenticated()){
    res.redirect('/profile')
  }else{
    return next();
  }
}

module.exports = router;
