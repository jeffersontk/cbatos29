import { useState } from "react"
import { useForm } from "react-hook-form"
import { signIn, signUp } from "../../../actions/post" // Certifique-se de que este caminho está correto

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AuthForm() {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm()
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm()

  const [signUpVisible, setSignUpVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [signupError, setSignupError] = useState(null)

  const onLoginSubmit = async (data) => {
    setIsLoading(true)
    setLoginError(null)

    try {
      const response = await signIn(data)
      console.log(response)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error during authentication:", error)
      setLoginError("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupSubmit = async (data) => {
    setIsLoading(true)
    setSignupError(null)

    if (data.password !== data.confirmPassword) {
      setSignupError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await signUp(data)
      console.log(response)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error during signup:", error)
      setSignupError("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    console.log("handleRegister")
    setSignUpVisible(!signUpVisible)
  }

  if (isSubmitted) {
    window.location.href = "/dashboard/painel"
  }

  return (
    <div className="w-full flex flex-col h-screen justify-center items-center gap-4">
      {signUpVisible ? (
        <form
          onSubmit={handleSignupSubmit(onSignupSubmit)}
          method="POST"
          className="flex flex-col gap-4 mt-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="signupName" class="text-bage">
              Nome
            </label>
            <input
              {...signupRegister("name", { required: true })}
              placeholder="Seu nome"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {signupErrors.name && (
              <p role="alert" className="text-red-500 text-xs font-light">
                Nome é obrigatório
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="signupEmail" class="text-bage">
              E-mail
            </label>
            <input
              {...signupRegister("email", {
                required: true,
                pattern: emailRegex,
              })}
              placeholder="seuemail@dominio.com"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {signupErrors.email && (
              <p role="alert" className="text-red-500 text-xs font-light">
                {signupErrors.email.type === "required"
                  ? "E-mail é obrigatório"
                  : "Formato do email incorreto"}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="signupPassword" class="text-bage">
              Senha
            </label>
            <input
              {...signupRegister("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="******"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {signupErrors.password && (
              <p role="alert" className="text-red-500 text-xs font-light">
                {signupErrors.password.type === "required"
                  ? "Senha é obrigatória"
                  : "Senha deve ter pelo menos 6 caracteres"}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" class="text-bage">
              Confirme a Senha
            </label>
            <input
              {...signupRegister("confirmPassword", { required: true })}
              type="password"
              placeholder="******"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {signupErrors.confirmPassword && (
              <p role="alert" className="text-red-500 text-xs font-light">
                Confirmação de senha é obrigatória
              </p>
            )}
          </div>
          {signupError && (
            <p role="alert" className="text-red-500 text-xs font-light">
              {signupError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-secondary-blue h-12 w-full flex items-center justify-center rounded-md text-white font-medium"
          >
            {isLoading ? (
              <div className="animate-spin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#fff"
                  viewBox="0 0 256 256"
                >
                  <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                </svg>
              </div>
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleLoginSubmit(onLoginSubmit)}
          method="POST"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="loginEmail" class="text-bage">
              E-mail
            </label>
            <input
              {...loginRegister("email", {
                required: true,
                pattern: emailRegex,
              })}
              placeholder="jesus@atos29.com"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {loginErrors.email && (
              <p role="alert" className="text-red-500 text-xs font-light">
                {loginErrors.email.type === "required"
                  ? "E-mail é obrigatório"
                  : "Formato do email incorreto"}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="loginPassword" class="text-bage">
              Senha
            </label>
            <input
              {...loginRegister("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="******"
              className="border-b border-gray-600 p-4 focus:border-none"
            />
            {loginErrors.password && (
              <p role="alert" className="text-red-500 text-xs font-light">
                {loginErrors.password.type === "required"
                  ? "Senha é obrigatória"
                  : "Senha deve ter pelo menos 6 caracteres"}
              </p>
            )}
          </div>
          {loginError && (
            <p role="alert" className="text-red-500 text-xs font-light">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-light h-12 w-full flex items-center justify-center rounded-md text-white font-medium"
          >
            {isLoading ? (
              <div className="animate-spin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#fff"
                  viewBox="0 0 256 256"
                >
                  <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                </svg>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      )}
      <button onClick={() => handleRegister()} class="text-bage">
        {signUpVisible ? "Fazer login" : "Cadastrar"}
      </button>
    </div>
  )
}
