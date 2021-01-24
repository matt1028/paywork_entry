const { json } = require("body-parser");


module.exports = {
    
    async apiSignUp(req,res,next){
        const { email, password } = req.body;
        try {
            const existed = await User.findOne({ where: { email } });
            if (existed)  return res.status(403).json('이미 가입된 이메일입니다.');

            const hashed = await bcrypt.hash(password, 10);

            await User.create({
                email,
                password: hashed
            });

            return res.json({
              result : "success"
            });
        } catch (error) {
            console.error(err);
            return res.json({
              result : "fail"
            })
        }
    },

    async apiLogin(req,res,next){
        try {
            passport.authenticate('local', (err, user, info) => {

                if (err) {
                  console.error(err);
                  return next(err);
                }
                if (!user) {
                  return res.status(403).json({
                    info,
                    result: 'fail'
                  });
                }
                return req.login(user, err => {
                    if (err) {
                    console.error(err);
                    return next(err);
                  }
                  return res.json({
                    user,
                    result: 'success'
                  });
                });
              })(req, res, next);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }, 

    async apiLogout(req,res,next){
        req.logout();
        return res.json({
          result : "success"
        });
    }

}