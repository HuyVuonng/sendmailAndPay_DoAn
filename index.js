const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const route = require("./src/route");
const moment = require("moment");
// const db = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override"); //để override sang method khác trong form
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");

app.use(cors());
app.use(morgan("combined"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Cho phép lấy ảnh từ file img
app.use("/img", express.static("img"));
//connetc to db
// db.connect();

app.get("/", function (req, res) {
  res.send("helo");
});

app.post("/sendMail", async (req, res, next) => {
  let html = "";
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sendmailerservices@gmail.com",
      pass: process.env.PassEmail,
    },
  });
  const option = {
    from: '"Hosted bank" <sendmailerservices@gmail.com>',
    to: `${req.body.email}`,
    subject: "Đăng bài thành công",
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng bài thành công</title>
  
  
    <style type="text/css">
      header {
       
        height: 20vh;
      }
  header div{
    margin: 0 auto;
    height: 100%;
    width: fit-content;
  }
      header div img {
        height: 100%;
        object-fit: cover;
      }
      div {
        margin: 0 auto;
        width: fit-content;
      }
  
      td{
        padding: 10px 40px 10px 0;
      }
      img.logo{
        width:100px;
      }
    </style>
  </head>
  
  <body>
    <header>
      <div><img class="logo" src="https://nganhangnhatro.vercel.app/assets/img/logoWeb.png" alt="Hosted bank"></div>
    </header>
     <div>
        <h4>Xin chào ${req.body.nameCustomer}, cảm ơn bạn đã đăng bài trên web site</h4>
        <p>Bài đăng của bạn sẽ được hiển thị trên hệ thống của chúng tôi. Chúc bạn sớm tìm được khách hàng phù hợp.</p>
      <div> <span>Bạn có thể xem lại các bài đăng của bạn </span><a href="${req.body.managerlink}"> tại đây</a></div>
       
     </div>
  </body>
  
  </html>
    `,
  };

  transporter.sendMail(option, (err, infor) => {
    if (err) {
      console.log("error" + err);
    } else {
      console.log("send" + infor.response);
      res.send("Gui tin thanh cong");
    }
  });
});

app.post("/sendMailActiveAccount", async (req, res, next) => {
  let html = "";
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sendmailerservices@gmail.com",
      pass: process.env.PassEmail,
    },
  });
  const option = {
    from: '"Hosted bank" <sendmailerservices@gmail.com>',
    to: `${req.body.email}`,
    subject: "Kích hoạt tài khoản",
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kích hoạt tài khoản</title>
  
  
    <style type="text/css">
      header {
       
        height: 20vh;
      }
  header div{
    margin: 0 auto;
    height: 100%;
    width: fit-content;
  }
      header div img {
        height: 100%;
        object-fit: cover;
      }
      div {
        margin: 0 auto;
        width: fit-content;
      }
  
      td{
        padding: 10px 40px 10px 0;
      }
      img.logo{
        width:100px;
      }
    </style>
  </head>
  
  <body>
    <header>
      <div><img class="logo" src="https://nganhangnhatro.vercel.app/assets/img/logoWeb.png" alt="Hosted bank"></div>
    </header>
     <div>
        <h4>Xin chào ${req.body.nameCustomer}, cảm ơn bạn đã đăng ký tài khoản trên website</h4>
       
      <div> <span>Vui lòng kích hoạt tài khoản </span><a href="${req.body.activeLink}"> tại đây</a></div>
       
     </div>
  </body>
  
  </html>
    `,
  };

  transporter.sendMail(option, (err, infor) => {
    if (err) {
      console.log("error" + err);
    } else {
      console.log("send" + infor.response);
      res.send("Gui tin thanh cong");
    }
  });
});

// route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.post("/create_payment_url", function (req, res, next) {
//   var ipAddr =
//     req.headers["x-forwarded-for"] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;

//   // var dateFormat = require("dateformat");

//   var tmnCode = "X8NQNSUB";
//   var secretKey = "DX3BNEQHPQQ3O5TT2I8KWAGAO8AD1BS4";
//   var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
//   var returnUrl = "http://localhost:3001";

//   // var date = new Date();

//   var createDate = moment().format("yyyyMMDDHHmmss");
//   var orderId = moment().format("HHmmss");
//   var amount = req.body.amount;
//   var bankCode = req.body.bankCode;

//   var orderInfo = req.body.orderDescription;
//   var orderType = req.body.orderType;
//   var locale = req.body.language;
//   if (locale === null || locale === "") {
//     locale = "vn";
//   }
//   var currCode = "VND";
//   var vnp_Params = {};
//   vnp_Params["vnp_Version"] = "2.1.0";
//   vnp_Params["vnp_Command"] = "pay";
//   vnp_Params["vnp_TmnCode"] = tmnCode;
//   // vnp_Params['vnp_Merchant'] = ''
//   vnp_Params["vnp_Locale"] = locale;
//   vnp_Params["vnp_CurrCode"] = currCode;
//   vnp_Params["vnp_TxnRef"] = orderId;
//   vnp_Params["vnp_OrderInfo"] = orderInfo;
//   vnp_Params["vnp_OrderType"] = orderType;
//   vnp_Params["vnp_Amount"] = amount * 100;
//   vnp_Params["vnp_ReturnUrl"] = returnUrl;
//   vnp_Params["vnp_IpAddr"] = "127.0.0.1";
//   vnp_Params["vnp_CreateDate"] = createDate;
//   if (bankCode !== null && bankCode !== "") {
//     vnp_Params["vnp_BankCode"] = bankCode;
//   }

//   // vnp_Params = sortObject(vnp_Params);

//   var querystring = require("qs");
//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var crypto = require("crypto");
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
//   vnp_Params["vnp_SecureHash"] = signed;
//   vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
//   console.log("A");
//   res.redirect(vnpUrl);
// });

app.post("/create_payment_url", function (req, res, next) {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = "X8NQNSUB";
  var secretKey = "DX3BNEQHPQQ3O5TT2I8KWAGAO8AD1BS4";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = req.body.redirect;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = "127.0.0.1";
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  console.log(vnpUrl);
  res.json({ link: vnpUrl });
});

app.get("/vnpay_ipn", function (req, res, next) {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = "DX3BNEQHPQQ3O5TT2I8KWAGAO8AD1BS4";
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
        if (rspCode == "00") {
          //thanh cong
          //paymentStatus = '1'
          // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
          res.status(200).json({ RspCode: "00", Message: "Success" });
        } else if (rspCode == "02") {
          //that bai
          //paymentStatus = '2'
          // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
          res.status(200).json({ RspCode: "02", Message: "False" });
        }

        // else {
        //   res.status(200).json({
        //     RspCode: "02",
        //     Message: "This order has been updated to the payment status",
        //   });
        // }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
