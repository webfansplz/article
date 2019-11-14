const forge = require("node-forge");
const pki = forge.pki;
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const CAServices = {
  // CA证书存放目录
  certPath: path.resolve("./", "CA"),
  // 公钥
  certPem: null,
  // 私钥
  keyPem: null,
  attrs: [
    {
      name: "commonName",
      value: "webfansplz"
    },
    {
      name: "countryName",
      value: "CN"
    },
    {
      shortName: "ST",
      value: "GuangDong"
    },
    {
      name: "localityName",
      value: "ShenZhen"
    },
    {
      name: "organizationName",
      value: "webfansplz"
    },
    {
      shortName: "OU",
      value: "https://github.com/webfansplz"
    }
  ],
  extensions: [
    {
      name: "basicConstraints",
      cA: true
    },
    {
      name: "keyUsage",
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true
    },
    {
      name: "nsCertType",
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true
    },
    {
      name: "subjectKeyIdentifier"
    }
  ],
  // 配置
  generateSetting(domain) {
    this.attrs[0] = {
      name: "commonName",
      value: domain
    };
    this.extensions = [
      {
        name: "basicConstraints",
        critical: true,
        cA: false
      },
      {
        name: "keyUsage",
        critical: true,
        digitalSignature: true,
        contentCommitment: true,
        keyEncipherment: true,
        dataEncipherment: true,
        keyAgreement: true,
        keyCertSign: true,
        cRLSign: true,
        encipherOnly: true,
        decipherOnly: true
      },
      {
        name: "subjectAltName",
        altNames: [
          {
            type: 2,
            value: domain
          }
        ]
      },
      {
        name: "subjectKeyIdentifier"
      },
      {
        name: "extKeyUsage",
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true
      },
      {
        name: "authorityKeyIdentifier"
      }
    ];
    return this;
  },

  // 生成
  generateKey(caKey, caCert) {
    const { publicKey, privateKey } = pki.rsa.generateKeyPair(2048);
    const cert = pki.createCertificate();
    //  setting
    Object.assign(cert, {
      publicKey,
      serialNumber: Date.now().toString(),
      validity: {
        notBefore: new Date(),
        notAfter: new Date()
      }
    });
    cert.validity.notAfter.setFullYear(
      cert.validity.notAfter.getFullYear() + 1
    );
    cert.setSubject(this.attrs);
    cert.setIssuer(caCert ? caCert.subject.attributes : this.attrs);
    cert.setExtensions(this.extensions);
    cert.sign(caKey ? caKey : privateKey, forge.md.sha256.create());
    this.certPem = pki.certificateToPem(cert);
    this.keyPem = pki.privateKeyToPem(privateKey);
    return this;
  },
  // 读取
  read() {
    const keyPem = fs.readFileSync("./CA/CA-webfansplz.key.pem", "utf8");
    const certPem = fs.readFileSync("./CA/CA-webfansplz.crt", "utf8");
    const caCert = forge.pki.certificateFromPem(certPem);
    const caKey = forge.pki.privateKeyFromPem(keyPem);
    return {
      caCert,
      caKey
    };
  },
  // 保存
  save() {
    // 存放CA目录
    if (shell.test("-d", this.certPath)) {
      shell.rm("-rf", this.certPath);
    }
    shell.mkdir("-p", this.certPath);
    fs.writeFileSync(
      path.join(this.certPath, "./CA-webfansplz.crt"),
      this.certPem
    );
    fs.writeFileSync(
      path.join(this.certPath, "./CA-webfansplz.key.pem"),
      this.keyPem
    );
  }
};

module.exports = CAServices;
