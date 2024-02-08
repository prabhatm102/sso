const express = require("express");
const passport = require("passport");
const saml = require("./saml");
const xmljs = require("xml-js");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  session({
    secret: "s",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function decodeSamlResponse(samlResponse) {
  const decodedResponse = Buffer.from(samlResponse, "base64").toString("utf-8");
  const xmlObj = xmljs.xml2js(decodedResponse, { compact: true });
  return xmlObj;
}

app.get("/login", passport.authenticate("saml"));

app.post(
  "/login/sso/callback",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  (req, res) => {
    console.log(req.user)
    if (!req.body || !req.body.SAMLResponse) {
      return res.status(400).send("SAMLResponse parameter is missing");
    }
    // console.log(req.body.SAMLResponse);
    // console.log("first------------------------------>")
    try {
      const decodedResponse = decodeSamlResponse(req.body.SAMLResponse);
      // console.log(decodedResponse);
      res
        .writeHead(301, {
          Location: `http://localhost:4200/users/login?SAMLResponse=${req.body.SAMLResponse}`,
        })
        .end();
      // return res.status(200).json(req.user);

    } catch (error) {
      console.error("Error processing SAML response:", error);
      return res.status(500).send("Error processing SAML response");
    }
  }
);


app.post(
  "/login/sso",
  (req, res) => {
    if (!req.body || !req.body.SAMLResponse) {
      return res.status(400).send("SAMLResponse parameter is missing");
    }
    req.body.SAMLResponse = decodeURIComponent(req.body.SAMLResponse)?.replace(/ /g,'+');
  
    try {
      const decodedResponse = decodeSamlResponse(req.body.SAMLResponse);
     
      return res.status(200).json(decodedResponse);
    } catch (error) {
      console.error("Error processing SAML response:", error);
      return res.status(500).send("Error processing SAML response");
    }
  }
);




app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
