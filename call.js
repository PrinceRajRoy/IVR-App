var xml = require('xml');

var count = 0;

module.exports = {
    getResponse : function(req){
        var res;
        var e = req.query.event;
        var data = parseInt(req.query.data);
        //console.log(req._parsedUrl);
        //console.log(count);
        if (e == 'NewCall') {
            res = {
                response:
                [{
                    playtext: 'Welcome To The Code Challenge'
                },
                {
                    collectdtmf: [ {
                        _attr: { t: "#"}
                    },
                    {
                        playtext: 'Please Enter 1 For Male And, 2 For Female, followed by a #'
                    }
                ]}]
            };
        } else if(e == 'GotDTMF'){
            if(count == 0){
                count++;
                if(data > 0 && data < 3){
                    if(data == 1)
                        ans = "Please Enter 1 If You're Older than 21 years And 2 if not, followed by a #";
                    else
                        ans = "Please Enter 1 If You're Older than 18 years And 2 if not, followed by a #";
                    res = {
                        response: [{
                            collectdtmf:[{
                            _attr: {t:"#"}
                        },
                        {
                            playtext: ans
                            }]
                        }]
                    };
            } else{
                    res = {
                        response: [{
                            playtext: "Sorry, Wrong Input",
                            hangup: ''
                        }]
                    };
                }
            } else if(count){
                count = 0;
                if(data > 0 && data < 3){
                    if(data == 1)
                        ans = "You are an adult";
                    else
                        ans = "Minors are not allowed";
                    res = {
                        response: [{
                                playtext: ans,
                                hangup: ''
                            }]
                    };
            } else{
                res = {
                    response: [{
                        playtext: "Sorry, Wrong Input",
                        hangup: ''
                    }]
                  };
                }
            }
        }
        return xml(res);
    }
}