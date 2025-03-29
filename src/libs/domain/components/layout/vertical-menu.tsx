'use client';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaArrowRightArrowLeft,
  FaUsersGear,
  FaSquarePollVertical,
} from 'react-icons/fa6';
import { toast } from 'sonner';
import { useMe } from '@/libs/hooks/use-me';
import Image from 'next/image';
import { ROLES } from '@/libs/utils/constant';

interface Props {
  isMenuOpen: boolean;
}
export const VerticalMenu = ({ isMenuOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useMe();

  const handlerLogout = () => {
    toast('Logut in process...');
    setTimeout(() => {
      router.push('/api/auth/signout');
    }, 2000);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="z-10 h-screen w-[360px] bg-[#14171F] border-none transition-transform duration-300 lg:block">
      <div className="pt-10 px-4 space-y-4">
        <div>
          <Image src="/logo-app.webp" alt="Logo App" width={280} height={40} />
        </div>
        <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
          <FaCheckCircle className="text-[#E4E4E7] text-[20px]" />
          <span>
            User: <br />
            <strong>{user?.user.name}</strong>
          </span>
        </div>

        <Link
          href="/dashboard"
          aria-label="dashboard"
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                        ${isActive('/dashboard')
              ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]'
              : 'text-gray-500 hover:bg-gray-800'
            }`}
        >
          <FaArrowRightArrowLeft className="text-[#E4E4E7] text-[20px]" />
          <span className="-mr-1 font-medium">Ingresos y egresos</span>
        </Link>

        <Link
          href="/dashboard/users"
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                    ${isActive('/dashboard/users')
              ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]'
              : 'text-gray-500 hover:bg-gray-800'
            }`}
        >
          <FaUsersGear className="text-[#E4E4E7] text-[20px]" />
          <span>Usuarios</span>
        </Link>

        {user && user.user.role === ROLES.ADMIN &&
          <Link
            href="/dashboard/reports"
            className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                    ${isActive('/dashboard/reports')
                ? 'bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]'
                : 'text-gray-500 hover:bg-gray-800'
              }`}
          >
            <FaSquarePollVertical className="text-[#E4E4E7] text-[20px]" />
            <span>Reportes</span>
          </Link>
        }

        <a
          onClick={handlerLogout}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group cursor-pointer"
        >
          <MdLogout className="text-[#E4E4E7] text-[20px]" />
          <span>Cerrar sesión</span>
        </a>
      </div>
    </div>
  );
};
