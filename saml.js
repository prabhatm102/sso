// saml.js

const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;

passport.use(
  new SamlStrategy(
    {
      logoutCallbackUrl: "http://localhost:8080/login/sso/logout",
      issuer: "urn:kite-suite.us.auth0.com",
      entryPoint:
        "https://kite-suite.us.auth0.com/samlp/sRXbD1Lt0F0Gf7xeqLndsNvwb9KLrfop",
      callbackUrl: "http://localhost:8080/login/sso/callback",
      cert: `-----BEGIN CERTIFICATE-----
MIIDCTCCAfGgAwIBAgIJSm/sf9HzlRmwMA0GCSqGSIb3DQEBCwUAMCIxIDAeBgNV
BAMTF2tpdGUtc3VpdGUudXMuYXV0aDAuY29tMB4XDTIzMDQwNzA1MjcyNFoXDTM2
MTIxNDA1MjcyNFowIjEgMB4GA1UEAxMXa2l0ZS1zdWl0ZS51cy5hdXRoMC5jb20w
ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCVz1LGcloaSaIvAUemM9zX
ljleR+f5/Wm33LEUtlV2SrzWCTPyWh4AacKaUaFpL2Y1q3rX76XAIIM87LEs5Y2l
G7KZajfKlWhdeAxpK9MqNoIFDkGrRTtrcrxC6NvbA0TgqFKQCE5PquvMnjQLcPS3
11Qw3qNjNZ5oH4p30QsoLzwSZq+n8bR1Q0sYTYb9v+R1C9qzPkNMfAGtvvXWpz9+
+stYC528mfic1MlbWXaG7Uj17y2hO4HxbQQec8+aogTXo4CBNgWEAr06P3Vy4be8
O59+GcwYDil4KXG0+8J0O4lBgayXaZE7d+7gEcnzUF6CvNIgfx3HS1U3PD2j2oQn
AgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFEqr3Gj4vXIb5Ad8
STv4vwLygd3JMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAgh+K
PCo8VhRb4kLS7tqsTve/oG2gvCJTwJJmPC9zl7HEekuGMPPDfFE3oEpAvUPuupA9
/U+FjqR4+MJ4nMEVcMSk/Q2srp2MNYCEzjpzE6yW4XfrKR/IZdDsVZCJdBi1yZXy
R1Y3WZENMzTPkO0BD/YAofqQRSoOQjsZmUi+PHBVOXvSQl9F/pwD+/CsRZsG5IML
QqcfMk+I+0pXUAE+WBEyIXhk+ogtshMvF2/Anyp4JqWwZ3Uvme9HFUaIk6TWNfix
tUklLL/V+ayqLDts6GVFOztrVSIAb+JOxRhhq7W3IHkYFf37ftV8Jcz8j0SR0S5l
axCYntPEqKY+Q+LYtQ==
-----END CERTIFICATE-----`,

      // callbackUrl: "http://localhost:8080/login/sso/callback", // Replace with your callback URL
      // entryPoint:
      //   "https://trial-4952624.okta.com/app/trial-4952624_kitesuitedev_1/exkbbpanifyXG6SBt697/sso/saml", // Replace with your Okta SSO URL
      // issuer: "http://www.okta.com/exkbbpanifyXG6SBt697", // Replace with your issuer
      //       cert: `-----BEGIN CERTIFICATE-----
      // MIIDqjCCApKgAwIBAgIGAY2Cf6bAMA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEG
      // A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
      // MBIGA1UECwwLU1NPUHJvdmlkZXIxFjAUBgNVBAMMDXRyaWFsLTQ5NTI2MjQxHDAaBgkqhkiG9w0B
      // CQEWDWluZm9Ab2t0YS5jb20wHhcNMjQwMjA3MDczNjAwWhcNMzQwMjA3MDczNzAwWjCBlTELMAkG
      // A1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTAL
      // BgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRYwFAYDVQQDDA10cmlhbC00OTUyNjI0
      // MRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
      // CgKCAQEAu9FiNzQzJwuM6jyMAOWptJvQvE4v81NWcEcXr6mlDorNtmOOTl5D9hvr68rIu4XLdiu8
      // W244Wy8YfIo9vhYa6oxiEU6p5BvFirMTDrSF6eHE3zP2CpqO/eE7qUL6sAidup1cZjCy2yt9007e
      // 486Hf5ZnHJR483z5CZo43omSO3KkETtthjvAvY9NyUFcUOtj1pga+comID4hYuHr74cBOzVURAMz
      // SUBcibiFNhQAb2pEo7IZF19ULp5GGi0BSCTZWjZ/hRWGA3iN47PySTyeVpYg5M0seZNdFEA9Wrpa
      // cezuYoONgKdr+4pbvkj6bDLuPPszGV6eleJ/fS9QoNr6fwIDAQABMA0GCSqGSIb3DQEBCwUAA4IB
      // AQCk7KSeh+LzzS6mqQD0K0shOgFxHdZWdsA5hfW9qj21uT8m3HFlVR4Dy3blDX2OcqZayY44qSPC
      // 684iJUtAcPtjhUBqvq8j3xIDm04RG4EgoAoWghR+bkd/yi3XkW3nCpVMjgFzWWEEo+/R8HH83QBV
      // yzYKodzTEufJthaORwX3mfo9Lj839TBf/b1m8icRUleGamo45a1Xz02jp/TgzVsSzcHmdUgSTPmY
      // w2uDNx1DF+WOt3CiXT1olZnFRplitc1TzGSs6e5QNjH2LV1zFCP8s2RwNfIE/ysJjbp3GZZBRMcr
      // kvR1NtY5ZZbxBqP9x4hLIl2ltPaAeK1h5auYO/Tw
      // -----END CERTIFICATE-----
      // `, // Replace with your certificate (if required)
    },
    (profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
