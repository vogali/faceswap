var gm = require('gm');

gm()
  .composite()
  .compose("in")
  .in("male_post.png")
  .in("male_mask.png")
  .write('male_output.png', function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Success! Image " + " was masked with mask ");
        }
    });
