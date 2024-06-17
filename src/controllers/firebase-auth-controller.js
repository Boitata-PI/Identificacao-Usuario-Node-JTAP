const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
} = require('../config/firebase');

const auth = getAuth();
const user = auth.currentUser;



class FirebaseAuthController 
{
  registerUser(req, res) 
  {
    const { email, password } = req.body;

    if (!email || !password) 
    {
      req.session.error = 'Campos Vázios!';

      return res.redirect("/register");
    }

    if(password.length < 6){ 
      req.session.error = 'A Senha deve ter no mínimo 6 caracteres!';

      return res.redirect("/login");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            const idToken = userCredential._tokenResponse.idToken;
            req.session.user = { email: userCredential.user.email };

            if (idToken) {
              res.cookie('access_token', idToken, {
                  httpOnly: true
              });

              req.session.success = 'Cadastro efetuado com Sucesso!';
              res.redirect("/dashboard");
            } 
            else {
              res.render("errors/error", {layout: "guest", codError: "500", textError: 'Erro no Servidor!'});
            }
          })
          .catch((error) => {
            console.error(error);
            res.render("errors/error", {layout: "guest", codError: "500", textError: 'Erro no Servidor!'});
          });
      })
      .catch((error) => {
        console.error("" + error);
        req.session.error = "Ocorreu um Erro ao Registrar o Bandido!";
        res.redirect("/register");
      });
  }



  loginUser(req, res) 
  {
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.error = 'Campos Vázios!';

      return res.redirect("/login");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        const idToken = userCredential._tokenResponse.idToken;
        req.session.user = { email: userCredential.user.email };
        
        if (idToken) {
          res.cookie('access_token', idToken, {
              httpOnly: true
          });

          req.session.success = 'Login efetuado com Sucesso!';
          res.redirect("/dashboard");
        } else {
          res.render("errors/error", {layout: "guest", codError: "500", textError: 'Erro no Servidor!'});
        }
      })
      .catch((error) => {
        console.error("" + error);
        req.session.error = "Credenciais Incorretas!";
        res.redirect("/login");
      });
  }



  logoutUser(req, res) 
  {
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token');
        req.session.success = 'Você saiu do seu E-Crime!';
        res.redirect("/");
      })
      .catch((error) => {
        console.error(error);
        res.render("errors/error", {layout: "guest", codError: "500", textError: 'Erro no Servidor!'});
      });
  }



  resetPassword(req, res)
  {
    const { email } = req.body;

    if (!email ) {
      req.session.error = 'Campos Vázios!';

      return res.redirect("/");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ codError: "Internal Server Error" });
      });
  }



  alterPassword(req, res) 
  {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !newPassword || !oldPassword) {
      req.session.error = 'Campos Vázios!';

      return res.redirect("/");
    }

    updatePassword(user, newPassword).then(() => {
      req.session.success = 'Senha Alterada com Sucesso!';
      res.redirect("/profile");
    }).catch(error => {
      console.error(error);
      res.render("errors/error", {layout: "guest", codError: "500", textError: 'Erro no Servidor!'});
    });
  }
}



module.exports = new FirebaseAuthController();