import { sanityClient } from "sanity:client"
import bcrypt from "bcryptjs"

export async function postIntentionToEnrollEBD(formData) {
  try {
    const response = await sanityClient.create(formData)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}


export async function signIn(formData) {
  console.log('formData', formData)
  try {
    const { email, password } = formData;
    const query = '*[_type == "userTeam" && email == $email][0]';
    const params = { email };
    const user = await sanityClient.fetch(query, params);

    if (!user) {
     console.log("User not found.");
    } else {
      console.log('user', user)
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Invalid password.");
      } else {
        console.log(true);
        return {
          success: true,
          status: 200
        }
      }
    }
  } catch (error) {
    console.log("error: ", error)
    return {
      success: false,
      status: 500
    }
  }
}

export async function signUp(formData) {
  try {
    const { name, email, password } = formData;

    // Verifica se o usuário já existe
    const query = '*[_type == "userTeam" && email == $email][0]';
    const params = { email };
    const existingUser = await sanityClient.fetch(query, params);

    if (existingUser) {
      console.log("User already exists.");
      return {
        success: false,
        status: 409, // Conflito
        message: "User already exists."
      };
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo documento de usuário no Sanity
    const newUser = {
      _type: "userTeam",
      name,
      email,
      password: hashedPassword
    };

    const response = await sanityClient.create(newUser);
    console.log("User created successfully:", response);

    return {
      success: true,
      status: 201, // Criado
      message: "User created successfully."
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
      status: 500,
      message: "An error occurred during sign-up."
    };
  }
}
