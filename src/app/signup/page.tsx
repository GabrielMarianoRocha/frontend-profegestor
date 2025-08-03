'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type FormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Dados do login:', data)
      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Credenciais inválidas. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        className="space-y-6 w-full max-w-md bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="E-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Senha"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Lembrar de mim
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="/recuperar-senha"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  )
}
