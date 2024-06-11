import React, { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import InputMask from "react-input-mask"
import { postIntentionToEnrollEBD } from "../../actions/post"

interface Props {
  selectedClassName: string | undefined
}

interface FormInput {
  name: string
  email: string
  phone: string
  enrollmentIntention: string
  coursesParticipated: string[]
}

const phoneRegex = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FormIntentionToEnroll({ selectedClassName }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (data: FormInput) => {
    try {
      const { name, email, phone, enrollmentIntention, coursesParticipated } =
        data
      setIsLoading(true)
      const formData = {
        _type: "ebdRegistration",
        name,
        email,
        phone,
        enrollmentIntention,
        coursesParticipated,
      }

      const response = await postIntentionToEnrollEBD(formData)

      if (response) {
        setIsSubmitted(true)
      } else {
        console.error("Erro ao enviar o formulário:", response)
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
    }
  }

  if (isSubmitted) {
    // Redirecionar para a página de sucesso após a submissão bem-sucedida
    window.location.href = `/ebd/${selectedClassName}/success`
    return null // Evita a renderização do formulário após o redirecionamento
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nome</label>
        <input
          {...register("name", { required: true })}
          placeholder="jesus"
          className="border-b border-gray-600 p-4 focus:border-none"
        />
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs font-light">
            Nome é obrigatorio
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">E-mail</label>
        <input
          {...register("email", { required: true, pattern: emailRegex })}
          placeholder="jesus@atos29.com"
          className="border-b border-gray-600 p-4 focus:border-none"
        />
        {errors.email?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs font-light">
            E-mail é obrigatorio
          </p>
        )}
        {errors.email?.type === "pattern" && (
          <p role="alert" className="text-red-500 text-xs font-light">
            formato do email incorreto
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone">Telefone / WhatsApp</label>

        <InputMask
          mask="(99) 9 9999-9999"
          maskChar=""
          defaultValue=""
          {...register("phone", { required: true })}
        >
          {
            /* @ts-ignore */
            (inputProps: any) => {
              return (
                <input
                  {...inputProps}
                  type="tel"
                  placeholder="(99) 9 9999-9999"
                  className="border-b border-gray-600 p-4 focus:border-none"
                />
              )
            }
          }
        </InputMask>
        {errors.phone?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs font-light">
            Telefone / WhatsApp é obrigatorio
          </p>
        )}
        {errors.phone?.type === "pattern" && (
          <p role="alert" className="text-red-500 text-xs font-light">
            formato do Numero informato esta incorreto
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3>Qual curso você se interessou?</h3>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            defaultChecked={selectedClassName === "primeiros-atos"}
            {...register("enrollmentIntention")}
            value="primeiros atos"
            id="primeiros-atos"
            className="accent-primary-light"
          />
          <label htmlFor="primeiros-atos" className="text-sm">
            Primeiros Atos
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            defaultChecked={selectedClassName == "fundamentos"}
            {...register("enrollmentIntention")}
            value="fundamentos"
            id="fundamentos"
            className="accent-primary-light"
          />
          <label htmlFor="fundamentos" className="text-sm">
            Fundamentos
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            defaultChecked={selectedClassName == "estudos-biblicos"}
            {...register("enrollmentIntention")}
            value="estudo biblico"
            id="estudobiblico"
            className="accent-primary-light"
          />
          <label htmlFor="estudobiblico" className="text-sm">
            Estudo bíblico
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            defaultChecked={
              selectedClassName == "conhecendo-deus-e-fazendo-sua-vontede"
            }
            {...register("enrollmentIntention")}
            value="cdfsv"
            id="cdfsv"
            className="accent-primary-light"
          />
          <label htmlFor="cdfsv" className="text-sm">
            Conhecendo Deus e fazendo sua vontade
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            defaultChecked={selectedClassName == "telos"}
            {...register("enrollmentIntention")}
            value="telos"
            id="telos"
            className="accent-primary-light"
          />
          <label htmlFor="telos" className="text-sm">
            Telos
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Quais cursos você já participou?</h3>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            {...register("coursesParticipated")}
            id="primeiros-atos-jp"
            className="accent-primary-light"
            value="primeiros atos"
          />
          <label htmlFor="primeiros-atos-jp" className="text-sm">
            Primeiros Atos
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            {...register("coursesParticipated")}
            id="fundamentos-jp"
            className="accent-primary-light"
            value="fundamentos"
          />
          <label htmlFor="fundamentos-jp" className="text-sm">
            Fundamentos
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            {...register("coursesParticipated")}
            id="estudobiblico-jp"
            className="accent-primary-light"
            value="estudo biblico"
          />
          <label htmlFor="estudobiblico-jp" className="text-sm">
            Estudo bíblico
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            {...register("coursesParticipated")}
            id="cdfsv-jp"
            className="accent-primary-light"
            value="cdfsv"
          />
          <label htmlFor="cdfsv-jp" className="text-sm">
            Conhecendo Deus e fazendo sua vontade
          </label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            {...register("coursesParticipated")}
            id="telos-jp"
            className="accent-primary-light"
            value="telos"
          />
          <label htmlFor="telos-jp" className="text-sm">
            Telos
          </label>
        </div>
      </div>
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
          "Enviar"
        )}
      </button>
    </form>
  )
}
