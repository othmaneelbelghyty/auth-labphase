const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
// UserSchema.pre("save", async function (next) {
//   try {
//     // Vérifier si le mot de passe a été modifié
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // Génération du sel et hachage du mot de passe
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);

//     // Remplacement du mot de passe en clair par le mot de passe haché
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     next(error);
//   }
// });

// // Méthode pour comparer les mots de passe
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     // Comparer le mot de passe candidat avec le mot de passe haché stocké dans la base de données
//     const isPasswordValid = await bcrypt.compare(
//       candidatePassword,
//       this.password
//     );

//     if (!isPasswordValid) {
//       console.error("Invalid password");
//     }

//     return isPasswordValid;
//   } catch (error) {
//     console.error("Error comparing passwords:", error);
//     throw error;
//   }
// };

// // Créer des index uniques pour les champs username et email
// UserSchema.index({ username: 1 }, { unique: true });
// UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
