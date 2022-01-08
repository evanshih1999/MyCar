import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from "dotenv-defaults"
import bcrypt from "bcrypt"
import User from '../models/User'
import Vcode from '../models/Vcode'

dotenv.config();

// generate vcode
function makevcode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const router = express.Router()

router.post('/user/set_verify_code', async (req, res) => {
    const email = req.body.mail
    const vcode = makevcode(6)
    
    if (await Vcode.findOne({ email: email })) {
        try {
            await Vcode.updateOne({ email: email }, { $set: { vcode: vcode }})
        } catch(e) { throw new Error("Verification code update error")}
    } else {
        try {
            const newVcode = new Vcode({ email, vcode })
            await newVcode.save()
        } catch (e) { throw new Error("Verification code creation error")}
    }

    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
    })
      
    var mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'MyCar Website verification code',
        text: 'Your verification code is: ' + vcode
    }
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })

    res.json({msg: 'Verificaiton code sent to ' + email})
})

router.post('/user/register', async (req, res) => {
    const email = req.body.mail
    const vcode = req.body.vcode
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password,10)
    if (!vcode) {
        res.status(400).send({ msg: "Didn't click verify button!" })
        return
    }
    if (!(await Vcode.findOne({ email: email, vcode: vcode }))) {
        res.status(400).send({ msg: 'Wrong verify code!'})
        return
    }
    if (await User.findOne({ username: username })) {
        res.status(400).send({ msg: 'username exist!' })
        return
    }
    if (await User.findOne({ email: email })) {
        res.status(400).send({ msg: 'email exist!' })
        return
    }
    try {
        const newUser = new User({ username, email, password })
        await newUser.save()
        res.json({msg: 'User created'})
        await Vcode.deleteOne({email: email, vcode: vcode})
    } catch (e) { throw new Error("User creation error")}
})

router.post('/user/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({ username: username })
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            res.json({ msg: 'Success!' })
            return
        }
        res.status(400).send({ msg: 'Incorrect password' })
        return
    }
    res.status(400).send({ msg: "Username doesn't exist" })
})

router.post('/car/control', (req, res) => {
    const car = req.body.car
    const command = req.body.command
    console.log(car+' '+command)
    res.json({ msg: command })
})

export default router