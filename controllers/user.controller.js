
const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);
        // other tasks such as - email sending, profile creation code will be placed here

        res.status(200).json({
            status: "success",
            message: "successfully signed up",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error,
        })
    }
};

/*
1.check if email and password are given
2.Load user with email
3.if not user send res
4.compare password
5. if password not correct send res
6. check if user is active
7. if not active send res
8. generate token
9. send user and token
10. 
*/
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "status fail",
                error: "please provide your credentials"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No User found.Please create an account"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                error: "Password is not valid"
            })
        }

        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active yet"
            });
        }

        const token = generateToken(user);

        const { password: pwd, ...others } = user.toObject();



        res.status(200).json({
            status: "success",
            message: "successfully logged in",
            data: {
                user: others,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error,
        })
    }
};