import Image from 'next/image'
import logo from './logo.png'

export default function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div className="flex justify-center">
        <Image
          src={ logo } // Substitua pelo seu logo
          alt="Logo"
          width={200}
          height={200}
          priority
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Gerencie seus alunos e aulas de forma eficiente
      </p>
    </div>
  )
}