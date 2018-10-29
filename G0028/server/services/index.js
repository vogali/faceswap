const
  bodyParser = require("body-parser"),
  cors = require('cors'),
  express = require('express'),
  gm = require('gm'),
  fetch = require('node-fetch'),
  fs = require("fs"),
  path = require("path"),
  ApiService = require("moleculer-web"),
  FormData = require('form-data'),
  { ServiceBroker } = require("moleculer"),
  nodeRouter = require('./NodeRouter');


let broker = new ServiceBroker({
  logger: console
});

// Create a service
broker.createService({
  name: "photo",
  actions: {
    process: {
      //params: {
        //data: "string"
      //},
      handler(ctx) {
        //console.log(Object.keys(ctx.params));
        return processAndUploadPhoto(ctx.params.sessionUuid, ctx.params.data)
          .then(result => {
            return result;
          })
          .catch(err => {
            return {};
          });
      }
    },
    saveQRCode: {
      handler(ctx) {
        //console.log(Object.keys(ctx.params));
        let data = {
          'result': 'succeed'
        };
        return saveQRCodePhoto(ctx.params.sessionUuid, ctx.params.data)
          .then(result => {
            return data;
          })
          .catch(err => {
            data.result = 'failed';
            return data;
          });
      }
    }

  },
});

function processAndUploadPhoto(sessionUuid, data) {
  return new Promise((resolve, reject) => {
    var base64Data = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('data/'+ sessionUuid + '_capture.png', base64Data, 'base64', function(err) {
      var form = new FormData();
      form.append('image', fs.createReadStream('data/'+ sessionUuid + '_capture.png'));
      form.append('Base', 'Base2');
      return fetch('http://192.168.6.101:8000/upload/image2', { method: 'POST', body: form })
        .then(function(res) {
          console.log(res);
          return res.json();
        }).then(function(json) {
            console.log(json);
            console.log(json.data.msg);
            let msg = json.data.msg;
            if (msg && msg.imageUrl1 && msg.imageUrl2) {
              return downloadImage(msg.imageUrl1, 'data/'+ sessionUuid + '_female.png', 'server/public/images/device/female_mask.png')
                .then(() => {
                  console.log("Downloaded female !");
                  return downloadImage(msg.imageUrl2, 'data/'+ sessionUuid + '_male.png', 'server/public/images/device/male_mask.png');
                })
                .then(() => {
                  console.log("Downloaded male !");
                  return resolve(msg);
                });
            } else {
              reject ("no face generated");
            }
        });
    });
  });
}

function downloadImage(url, target, mask) {
  return fetch(url)
    .then(res => {
      return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(target);
        res.body.pipe(dest);
        res.body.on('error', err => {
          reject(err);
        });
        dest.on('finish', () => {
          gm()
          .composite()
          .compose("in")
          .in(target)
          .in(mask)
          .write(target, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("Success! Image was masked with mask");
            }
          });
          resolve();
        });
        dest.on('error', err => {
          reject(err);
        });
      });
    });
}

function saveQRCodePhoto(sessionUuid, data) {
  return new Promise((resolve, reject) => {
    var base64Data = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('data/'+ sessionUuid + '.png', base64Data, 'base64', function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Load API Gateway
const svc = broker.createService({
  mixins: [ApiService],
  settings: {
     middleware: true
  }
});

const app = express();
// view engine setup
app.set('views', path.join(__dirname, '../../dist/views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(bodyParser.urlencoded({ limit:'50mb', extended: false }));
app.use(bodyParser.json({ limit:'50mb'}));

app.use(express.static(path.join(__dirname, '../../dist')));
app.use("/data", express.static(path.join(__dirname, '../../data')));

app.use("/services", svc.express());
app.use('/', nodeRouter);

let port = 60028;
app.listen(port, () => {
  console.log(`Listening on ${port} port !`)
})

// Start server
broker.start();
